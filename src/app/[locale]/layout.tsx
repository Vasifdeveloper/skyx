import type { ReactNode } from "react";
import { isLocale } from "@/i18n/site";
import "../global.css";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={isLocale(locale) ? locale : "az"} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('skyx-motion')==='off'?'off':'on'}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
