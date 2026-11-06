export type ContactLocale = "az" | "ru" | "en";
export const services = [
  "digital-marketing",
  "ai-automation",
  "ai-architecture",
  "data-analytics",
  "other",
] as const;
export type Service = (typeof services)[number];
export const phonePattern = /^\+?[\d ()-]+$/u;
export const allowedFields = [
  "name",
  "company",
  "email",
  "phone",
  "service",
  "project",
  "consent",
] as const;
export type Field = (typeof allowedFields)[number];
export type FormValues = Record<Exclude<Field, "consent">, string> & {
  consent: boolean;
  website: string;
};

export function validService(value: string | null): value is Service {
  return services.some((service) => service === value);
}

export function lengthInRange(value: string, min: number, max: number) {
  const trimmed = value.trim();
  const length = Array.from(trimmed).length;
  return length >= min && length <= max;
}

export function validPhone(value: string) {
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "").length;
  return (
    !phone ||
    (phone.length <= 48 &&
      phonePattern.test(phone) &&
      digits >= 7 &&
      digits <= 15)
  );
}

export type StatusCode =
  | "accepted"
  | "tested"
  | "validation"
  | "limited"
  | "unavailable"
  | "provider"
  | "unknown"
  | "network"
  | "expired"
  | "invalidRequest";

export interface ContactCopy {
  label: string;
  title: string;
  intro: string;
  formTitle: string;
  optional: string;
  form: Record<Field, string>;
  services: Record<Service, string>;
  choose: string;
  example: string;
  privacy: string;
  send: string;
  sending: string;
  noJs: string;
  errors: Record<Field, string>;
  status: Record<StatusCode, string>;
}
