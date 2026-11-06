import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createContactHandler } from "../src/contact/server";

const origin = "https://studio.example";
const payload = {
  locale: "az",
  name: "Əli Şükürlü",
  company: "",
  email: "demo@example.com",
  phone: "+994 (55) 123-45-67",
  service: "ai-architecture",
  project: "We would like to connect two local systems.",
  consent: true,
  website: "",
};
const key = (time = Date.now()) => time + "." + randomUUID();
const local = { NODE_ENV: "test", CONTACT_TRANSPORT: "test" };
const production = {
  NODE_ENV: "production",
  CONTACT_ORIGIN: origin,
  CONTACT_FROM: "studio@example.com",
  RESEND_API_KEY: "test-key",
  UPSTASH_REDIS_REST_URL: "https://redis.example",
  UPSTASH_REDIS_REST_TOKEN: "test-token",
  CONTACT_TRUSTED_IP_HEADER: "x-trusted-ip",
};

function request(
  data: unknown = payload,
  headers: HeadersInit = {},
  id = key(),
) {
  return new Request(origin + "/api/contact", {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "Idempotency-Key": id,
      ...headers,
    },
    body: JSON.stringify(data),
  });
}
const neverFetch: typeof fetch = async () => {
  throw new Error("Unexpected network request");
};

test("local transport accepts a valid multilingual enquiry and returns a distinct test receipt", async () => {
  const handle = createContactHandler(local, neverFetch);
  for (const locale of ["az", "ru", "en"]) {
    const res = await handle(request({ ...payload, locale }));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.code, "tested");
    assert.ok(!body.message.includes(payload.email));
  }
});

test("validation enforces input bounds, all expected fields, service, consent and supported locale", async () => {
  const handle = createContactHandler(local, neverFetch);
  const invalid = await handle(
    request({
      ...payload,
      name: " ",
      company: "x".repeat(161),
      email: "broken",
      phone: " ++45word",
      service: "fake",
      project: "too short",
      consent: false,
    }),
  );
  assert.equal(invalid.status, 422);
  assert.deepEqual((await invalid.json()).fields, [
    "name",
    "company",
    "email",
    "phone",
    "service",
    "project",
    "consent",
  ]);
  for (const data of [
    { locale: "de" },
    { tracking: "x" },
    { website: "https://example.com" },
    { project: "a".repeat(3001) },
    { name: "A\nB" },
  ]) {
    assert.equal((await handle(request({ ...payload, ...data }))).status, 422);
  }
  const edges = await handle(
    request({ ...payload, name: "𐐷𐐷", project: "ü".repeat(3000), phone: "" }),
  );
  assert.equal(edges.status, 200);
});

test("origin, content type, malformed or oversized bodies, timestamp and id are checked", async () => {
  const handle = createContactHandler(local, neverFetch);
  assert.equal(
    (await handle(request(payload, { Origin: "https://other.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handle(request(payload, { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal((await handle(request("x".repeat(25 * 1024)))).status, 413);
  assert.equal(
    (await handle(request(payload, { "Content-Length": "99999999" }))).status,
    413,
  );
  const invalid = new Request(origin + "/api/contact", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal((await handle(invalid)).status, 400);
  assert.equal((await handle(request(payload, {}, "abc"))).status, 400);
  for (const offset of [-24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000]) {
    const res = await handle(request(payload, {}, key(Date.now() + offset)));
    assert.equal(res.status, 409);
    assert.equal((await res.json()).code, "expired");
  }
});

test("local test receipt replays an unchanged attempt and rejects a different payload for its key", async () => {
  const handle = createContactHandler(local, neverFetch);
  const id = key();
  for (let i = 0; i < 2; i++)
    assert.equal((await handle(request(payload, {}, id))).status, 200);
  const conflict = await handle(
    request({ ...payload, name: "New name" }, {}, id),
  );
  assert.equal(conflict.status, 409);
});

test("site-wide fallback limits retries even when callers spoof ordinary proxy headers", async () => {
  const handle = createContactHandler(local, neverFetch);
  const responses = await Promise.all(
    Array.from({ length: 6 }, (_, i) =>
      handle(request(payload, { "X-Forwarded-For": "192.0.2." + i })),
    ),
  );
  assert.deepEqual(
    responses.map((res) => res.status).sort(),
    [200, 200, 200, 200, 200, 429],
  );
  assert.equal(
    responses.find((res) => res.status === 429)?.headers.get("Retry-After"),
    "900",
  );
});

test("production with missing credentials, disabled limiter, or a test transport fails closed", async () => {
  for (const env of [
    { NODE_ENV: "production" },
    { ...production, RESEND_API_KEY: "" },
    { ...production, UPSTASH_REDIS_REST_TOKEN: "" },
    { ...production, CONTACT_TRANSPORT: "test" },
    { ...production, CONTACT_ORIGIN: "" },
  ]) {
    const res = await createContactHandler(env, neverFetch)(request());
    assert.equal(res.status, 503);
    assert.equal((await res.json()).code, "unavailable");
  }
});

test("production uses hashed limiter buckets, fixed recipient, plain text and stable provider idempotency", async () => {
  const captured: { url: string; init: RequestInit }[] = [];
  const mockFetch: typeof fetch = async (url, init = {}) => {
    captured.push({ url: String(url), init });
    return Response.json(
      String(url).includes("redis.example")
        ? { result: 1 }
        : { id: "sample-receipt" },
    );
  };
  const handle = createContactHandler(production, mockFetch);
  const id = key();
  const input = {
    ...payload,
    project: "We would like to connect <b>two</b> systems.",
  };
  const headers = { "x-trusted-ip": "192.0.2.1" };
  for (let i = 0; i < 2; i++) {
    const res = await handle(request(input, headers, id));
    assert.equal(res.status, 200);
    assert.equal((await res.json()).code, "accepted");
  }
  assert.equal(captured.length, 4);
  assert.ok(!String(captured[0].init.body).includes(headers["x-trusted-ip"]));
  assert.ok(!String(captured[0].init.body).includes(input.email));
  assert.match(
    String(captured[0].init.body),
    /skyx:contact:limit:[0-9a-f]{64}/,
  );
  const mail = JSON.parse(String(captured[1].init.body));
  assert.deepEqual(mail.to, ["info@sky-x.az"]);
  assert.equal(mail.from, production.CONTACT_FROM);
  assert.equal(mail.reply_to, input.email);
  assert.ok(!("html" in mail));
  assert.ok(mail.text.includes(input.project));
  assert.equal(captured[1].init.body, captured[3].init.body);
  for (const index of [1, 3])
    assert.equal(
      new Headers(captured[index].init.headers).get("Idempotency-Key"),
      "skyx-contact/" + id,
    );
});

test("production handles distributed limits and limiter failures without contacting mail service", async () => {
  for (const [result, status] of [
    [6, 429],
    ["bad result", 503],
  ] as const) {
    let calls = 0;
    const handle = createContactHandler(production, async (url) => {
      calls++;
      assert.match(String(url), /redis.example/);
      return Response.json({ result });
    });
    assert.equal((await handle(request())).status, status);
    assert.equal(calls, 1);
  }
});

test("provider rejection and ambiguous outcomes never produce a success receipt", async () => {
  for (const [resend, status, code] of [
    [
      () => Response.json({ error: "declined" }, { status: 422 }),
      502,
      "provider",
    ],
    [
      () =>
        Response.json(
          { name: "concurrent_idempotent_requests" },
          { status: 409 },
        ),
      504,
      "unknown",
    ],
    [
      () =>
        Response.json({ name: "invalid_idempotent_request" }, { status: 409 }),
      409,
      "invalidRequest",
    ],
    [() => Response.json({ message: "queued" }), 504, "unknown"],
    [
      () => Response.json({ message: "upstream failure" }, { status: 502 }),
      504,
      "unknown",
    ],
    [
      () => {
        throw new TypeError("network unavailable");
      },
      504,
      "unknown",
    ],
  ] as const) {
    const handle = createContactHandler(production, async (url) =>
      String(url).includes("redis.example")
        ? Response.json({ result: 1 })
        : resend(),
    );
    const result = await handle(request());
    assert.equal(result.status, status);
    assert.equal((await result.json()).code, code);
  }
});

test("development honors the actual Host when Next normalizes its internal URL", async () => {
  const handle = createContactHandler(local, neverFetch);
  const headers = {
    Origin: "http://127.0.0.1:4386",
    Host: "127.0.0.1:4386",
    "Content-Type": "application/json",
    "Idempotency-Key": key(),
  };
  const data = { method: "POST", headers, body: JSON.stringify(payload) };
  const result = await handle(
    new Request("http://localhost:4386/api/contact", data),
  );
  assert.equal(result.status, 200);
  headers.Origin = "https://other.example";
  assert.equal(
    (await handle(new Request("http://localhost:4386/api/contact", data)))
      .status,
    403,
  );
});
