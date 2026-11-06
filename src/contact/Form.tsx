"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  allowedFields,
  lengthInRange,
  services,
  validPhone,
  validService,
} from "./shared";
import type {
  ContactCopy,
  ContactLocale,
  Field,
  FormValues,
  StatusCode,
} from "./shared";

const emptyValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  project: "",
  consent: false,
  website: "",
};

export default function ContactForm({
  locale,
  copy: t,
  standalone,
}: {
  locale: ContactLocale;
  copy: ContactCopy;
  standalone: boolean;
}) {
  const Heading = standalone ? "h2" : "h3";
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: emptyValues });
  const [result, setResult] = useState<StatusCode | null>(null);
  const attempt = useRef<{ body: string; key: string } | null>(null);
  const inFlight = useRef(false);
  const accepted = useRef<{ body: string; code: "accepted" | "tested" } | null>(
    null,
  );

  useEffect(() => {
    const readService = () => {
      const service = new URLSearchParams(window.location.search).get(
        "service",
      );
      if (validService(service)) setValue("service", service);
    };
    readService();
    window.addEventListener("popstate", readService);
    return () => window.removeEventListener("popstate", readService);
  }, [setValue]);

  function fieldProps(field: Field) {
    return {
      id: "contact-" + field,
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? "contact-error-" + field : undefined,
    };
  }
  function label(field: Field, optional = false) {
    return (
      <label htmlFor={"contact-" + field}>
        {t.form[field]} {optional && <small>({t.optional})</small>}
      </label>
    );
  }
  function error(field: Field) {
    return (
      errors[field] && (
        <span className="sky-contact-error" id={"contact-error-" + field}>
          {t.errors[field]}
        </span>
      )
    );
  }

  async function send(values: FormValues) {
    if (inFlight.current) return;
    const body = JSON.stringify({
      locale,
      ...values,
      name: values.name.trim(),
      company: values.company.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      project: values.project.trim(),
    });
    if (accepted.current?.body === body) {
      setResult(accepted.current.code);
      return;
    }
    inFlight.current = true;
    setResult(null);
    try {
      if (attempt.current?.body !== body) {
        attempt.current = { body, key: Date.now() + "." + crypto.randomUUID() };
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attempt.current.key,
          "X-SKYX-Locale": locale,
        },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(18000),
      });
      const data = await response.json().catch(() => null);
      if (
        !data ||
        typeof data.code !== "string" ||
        !Object.hasOwn(t.status, data.code)
      ) {
        setResult("unknown");
        return;
      }
      if (response.ok && (data.code === "accepted" || data.code === "tested")) {
        accepted.current = { body, code: data.code };
        setResult(data.code);
        return;
      }
      if (data.code === "validation" && Array.isArray(data.fields)) {
        const fields = allowedFields.filter((field) =>
          data.fields.includes(field),
        );
        fields.forEach((field) => setError(field, { type: "server" }));
        if (fields.length) requestAnimationFrame(() => setFocus(fields[0]));
      }
      setResult(
        data.code === "accepted" || data.code === "tested"
          ? "unknown"
          : (data.code as StatusCode),
      );
    } catch {
      setResult("network");
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form
      className="sky-contact-form"
      method="post"
      action="/api/contact"
      noValidate
      onChange={() => {
        if (!inFlight.current) setResult(null);
      }}
      onSubmit={handleSubmit(send, () => setResult("validation"))}
      aria-labelledby="contact-form-heading"
    >
      <Heading id="contact-form-heading">{t.formTitle}</Heading>
      <fieldset disabled={isSubmitting} className="sky-contact-fields">
        <div className="sky-contact-field">
          {label("name")}
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            {...register("name", {
              validate: (value) => lengthInRange(value, 2, 120),
            })}
          />
          {error("name")}
        </div>
        <div className="sky-contact-field">
          {label("company", true)}
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            {...register("company", {
              validate: (value) => lengthInRange(value, 0, 160),
            })}
          />
          {error("company")}
        </div>
        <div className="sky-contact-field">
          {label("email")}
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            {...register("email", {
              validate: (value) =>
                /^\S+@[^\s@]+\.[^\s@]+$/.test(value.trim()) &&
                value.trim().length <= 254,
            })}
          />
          {error("email")}
        </div>
        <div className="sky-contact-field">
          {label("phone", true)}
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            maxLength={48}
            {...register("phone", { validate: validPhone })}
          />
          {error("phone")}
        </div>
        <div className="sky-contact-field sky-contact-wide">
          {label("service")}
          <select
            {...fieldProps("service")}
            defaultValue=""
            required
            {...register("service", { validate: validService })}
          >
            <option value="" disabled>
              {t.choose}
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {t.services[service]}
              </option>
            ))}
          </select>
          {error("service")}
        </div>
        <div className="sky-contact-field sky-contact-wide">
          {label("project")}
          <textarea
            {...fieldProps("project")}
            rows={4}
            placeholder={t.example}
            required
            {...register("project", {
              validate: (value) => lengthInRange(value, 20, 3000),
            })}
          />
          {error("project")}
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <div className="sky-contact-wide sky-contact-terms">
          <label className="sky-contact-consent" htmlFor="contact-consent">
            <input
              {...fieldProps("consent")}
              type="checkbox"
              required
              {...register("consent", { required: true })}
            />
            <span>{t.form.consent}</span>
          </label>
          <a href={"/" + locale + "/privacy"}>{t.privacy}</a>
          {error("consent")}
        </div>
        <button
          className="sky-contact-submit sky-contact-wide"
          type="submit"
          disabled={
            isSubmitting || result === "accepted" || result === "tested"
          }
        >
          {isSubmitting ? t.sending : t.send} <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={
          "sky-contact-status" + (result ? " sky-contact-status-visible" : "")
        }
      >
        {result && t.status[result]}
      </div>
    </form>
  );
}
