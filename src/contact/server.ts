import { createHash, createHmac } from "node:crypto";
import { isIP } from "node:net";
import { z } from "zod";
import { contactCopy } from "./copy";
import { allowedFields, lengthInRange, services, validPhone } from "./shared";
import type { ContactLocale, Field, StatusCode } from "./shared";

type Env = Record<string, string | undefined>;
const bodyLimit = 24 * 1024;
const retryWindow = 23 * 60 * 60 * 1000;
const rateWindowSeconds = 15 * 60;
const rateLimit = 5;
const idPattern =
  /^(\d{13})\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const singleLine = z
  .string()
  .trim()
  .regex(/^[^\u0000-\u001F\u007F]*$/u);
const schema = z.strictObject({
  locale: z.enum(["az", "ru", "en"]),
  name: singleLine.refine((value) => lengthInRange(value, 2, 120)),
  company: singleLine
    .refine((value) => lengthInRange(value, 0, 160))
    .optional()
    .default(""),
  email: z.email().max(254),
  phone: z.string().trim().refine(validPhone).optional().default(""),
  service: z.enum(services),
  project: z
    .string()
    .trim()
    .refine((value) => lengthInRange(value, 20, 3000)),
  consent: z.literal(true),
  website: z.literal("").optional().default(""),
});

export type Enquiry = z.infer<typeof schema>;
export interface EmailTransport {
  send(
    enquiry: Enquiry,
    key: string,
  ): Promise<"accepted" | "tested" | "unknown" | "provider" | "invalidRequest">;
}

function reply(
  status: number,
  code: StatusCode,
  locale: ContactLocale,
  fields: Field[] = [],
) {
  return Response.json(
    {
      code,
      message: contactCopy[locale].status[code],
      ...(fields.length ? { fields } : {}),
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(code === "limited"
          ? { "Retry-After": String(rateWindowSeconds) }
          : {}),
      },
    },
  );
}

function getLocale(value: unknown): ContactLocale {
  return value === "en" || value === "ru" ? value : "az";
}

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > bodyLimit)
    return { error: 413 } as const;
  const reader = request.body?.getReader();
  if (!reader) return { error: 400 } as const;
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > bodyLimit) {
        await reader.cancel();
        return { error: 413 } as const;
      }
      chunks.push(value);
    }
    return {
      data: JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)),
      ) as unknown,
    };
  } catch {
    return { error: 400 } as const;
  } finally {
    reader.releaseLock();
  }
}

export class ResendTransport implements EmailTransport {
  constructor(
    private key: string,
    private from: string,
    private request: typeof fetch = fetch,
  ) {}

  async send(enquiry: Enquiry, key: string) {
    const t = contactCopy[enquiry.locale];
    const fields = [
      "name",
      "company",
      "email",
      "phone",
      "service",
      "project",
    ] as const;
    const text =
      fields
        .map((field) => {
          const value =
            field === "service" ? t.services[enquiry.service] : enquiry[field];
          return value ? t.form[field] + "\n" + value : null;
        })
        .filter(Boolean)
        .join("\n\n") +
      "\n\n" +
      t.form.consent;
    try {
      const response = await this.request("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.key,
          "Content-Type": "application/json",
          "Idempotency-Key": "skyx-contact/" + key,
        },
        body: JSON.stringify({
          from: this.from,
          to: ["info@sky-x.az"],
          reply_to: enquiry.email,
          subject: "SKYX · " + t.services[enquiry.service],
          text,
        }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(8000),
      });
      if (response.status >= 500 || response.status === 408)
        return "unknown" as const;
      if (response.status === 409) {
        const error = await response.json().catch(() => ({}));
        return error?.name === "invalid_idempotent_request"
          ? ("invalidRequest" as const)
          : ("unknown" as const);
      }
      if (!response.ok) return "provider" as const;
      const result = await response.json();
      return typeof result?.id === "string" && result.id.length > 0
        ? ("accepted" as const)
        : ("unknown" as const);
    } catch {
      return "unknown" as const;
    }
  }
}

// Test receipts store a fingerprint only. This adapter is unreachable in production.
class TestTransport implements EmailTransport {
  private attempts = new Map<string, { digest: string; until: number }>();
  async send(enquiry: Enquiry, key: string) {
    const now = Date.now();
    for (const [id, item] of this.attempts)
      if (item.until <= now) this.attempts.delete(id);
    const digest = createHash("sha256")
      .update(JSON.stringify(enquiry))
      .digest("hex");
    const sent = this.attempts.get(key);
    if (sent && sent.digest !== digest) return "invalidRequest" as const;
    this.attempts.set(key, { digest, until: now + retryWindow });
    return "tested" as const;
  }
}

// Keep the counter increment and its initial expiry in a single Redis operation.
const rateScript =
  "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n";

function clientBucket(request: Request, env: Env) {
  const header = env.CONTACT_TRUSTED_IP_HEADER?.trim();
  const candidate = header ? request.headers.get(header)?.trim() : null;
  // The trusted reverse proxy must OVERWRITE this header with one client IP.
  // Unconfigured, missing or malformed values share one conservative site-wide bucket.
  return candidate && isIP(candidate) ? candidate.toLowerCase() : "shared";
}

export function createContactHandler(
  env: Env,
  requestFetch: typeof fetch = fetch,
) {
  const testTransport = new TestTransport();
  const localLimits = new Map<string, { count: number; until: number }>();

  async function allowed(request: Request) {
    const bucket = clientBucket(request, env);
    if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
      const url = new URL(env.UPSTASH_REDIS_REST_URL);
      if (url.protocol !== "https:")
        throw new Error("Redis URL requires HTTPS");
      const key =
        "skyx:contact:limit:" +
        createHmac("sha256", env.UPSTASH_REDIS_REST_TOKEN)
          .update(bucket)
          .digest("hex");
      const result = await requestFetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + env.UPSTASH_REDIS_REST_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "EVAL",
          rateScript,
          "1",
          key,
          String(rateWindowSeconds),
        ]),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(3500),
      });
      if (!result.ok) throw new Error("Limiter unavailable");
      const data = await result.json();
      if (!Number.isInteger(data.result) || data.result <= 0)
        throw new Error("Invalid limiter response");
      return data.result <= rateLimit;
    }
    if (env.NODE_ENV === "production")
      throw new Error("Distributed limiter required");
    const now = Date.now();
    for (const [id, item] of localLimits)
      if (item.until <= now) localLimits.delete(id);
    const key = createHash("sha256").update(bucket).digest("hex");
    const count = localLimits.get(key) ?? {
      count: 0,
      until: now + 1000 * rateWindowSeconds,
    };
    count.count++;
    localLimits.set(key, count);
    return count.count <= rateLimit;
  }

  return async function handleContact(request: Request) {
    // The language header also localizes errors raised before body parsing.
    let locale = getLocale(request.headers.get("X-SKYX-Locale"));
    if (env.NODE_ENV === "production" && !env.CONTACT_ORIGIN)
      return reply(503, "unavailable", locale);
    const requestUrl = new URL(request.url);
    const localHost = request.headers.get("Host");
    // Development frameworks can normalize request.url to localhost. The Host
    // header retains the browser's actual origin. Production pins CONTACT_ORIGIN.
    let expectedOrigin = env.CONTACT_ORIGIN || requestUrl.origin;
    try {
      if (!env.CONTACT_ORIGIN && localHost)
        expectedOrigin = new URL(requestUrl.protocol + "//" + localHost).origin;
    } catch {
      return reply(400, "invalidRequest", locale);
    }
    if (request.headers.get("Origin") !== expectedOrigin)
      return reply(403, "invalidRequest", locale);
    if (
      request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "application/json"
    )
      return reply(415, "invalidRequest", locale);
    const body = await readBody(request);
    if ("error" in body)
      return reply(body.error ?? 400, "invalidRequest", locale);
    const raw = body.data;
    if (raw && typeof raw === "object" && "locale" in raw)
      locale = getLocale(raw.locale);
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fields = allowedFields.filter((field) =>
        parsed.error.issues.some((issue) => issue.path[0] === field),
      );
      return reply(
        422,
        fields.length ? "validation" : "invalidRequest",
        locale,
        fields,
      );
    }
    const key = request.headers.get("Idempotency-Key") ?? "";
    const timestamp = idPattern.exec(key)?.[1];
    if (!timestamp) return reply(400, "invalidRequest", locale);
    const age = Date.now() - Number(timestamp);
    if (age < -120_000 || age >= retryWindow)
      return reply(409, "expired", locale);

    const isTest =
      env.CONTACT_TRANSPORT === "test" &&
      (env.NODE_ENV === "test" || env.NODE_ENV === "development");
    const isLive = !env.CONTACT_TRANSPORT || env.CONTACT_TRANSPORT === "resend";
    let transport: EmailTransport;
    if (isTest) transport = testTransport;
    else if (
      isLive &&
      env.RESEND_API_KEY &&
      env.CONTACT_FROM &&
      (env.NODE_ENV !== "production" || env.CONTACT_ORIGIN)
    ) {
      transport = new ResendTransport(
        env.RESEND_API_KEY,
        env.CONTACT_FROM,
        requestFetch,
      );
    } else return reply(503, "unavailable", locale);

    try {
      if (!(await allowed(request))) return reply(429, "limited", locale);
    } catch {
      return reply(503, "unavailable", locale);
    }

    const state = await transport.send(parsed.data, key);
    if (state === "unknown") return reply(504, state, locale);
    if (state === "invalidRequest") return reply(409, state, locale);
    if (state === "provider") return reply(502, state, locale);
    return reply(200, state, locale);
  };
}
