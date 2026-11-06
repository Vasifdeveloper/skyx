import type { ReactNode } from "react";

const paths = {
  enquiry: (
    <>
      <path d="M3.5 6h17v12h-17z" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  analysis: (
    <>
      <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3z" />
      <path d="m18 3 1 2.3L21 6l-2 1-1 2-.7-2L15 6l2.3-.7z" />
    </>
  ),
  crm: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M4 9h16M9 9v11m3-7h5m-5 3h3" />
    </>
  ),
  action: (
    <>
      <circle cx="7" cy="6" r="2.3" />
      <circle cx="17" cy="12" r="2.3" />
      <circle cx="7" cy="18" r="2.3" />
      <path d="M7 8.5v7m0-4h7.5" />
    </>
  ),
  result: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m7.5 12 3 3 6-6" />
    </>
  ),
  play: <path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <path d="M8 5v14m8-14v14" strokeWidth="3" />
    </>
  ),
  replay: (
    <>
      <path d="M4 9a8 8 0 1 1-.1 5M4 3v6h6" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </>
  ),
  link: (
    <>
      <path d="M5 18 18 5M6 5h12v12" />
    </>
  ),
  plus: (
    <>
      <path d="M5 12h14m-7-7v14" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export const stepIcons = [
  "enquiry",
  "analysis",
  "crm",
  "action",
  "result",
] as const;

export function Symbol({
  name,
  size = 22,
}: {
  name: keyof typeof paths;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
