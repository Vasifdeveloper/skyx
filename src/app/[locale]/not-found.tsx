"use client";
import { usePathname } from "next/navigation";
import { site, isLocale } from "@/i18n/site";
import { Header, Footer } from "@/ui/Shell";
export default function NotFound() {
  const candidate = (usePathname() || "/az").split("/")[1];
  const locale = isLocale(candidate) ? candidate : "az",
    t = site[locale];
  return (
    <>
      <Header locale={locale} path="" />
      <main tabIndex={-1} id="main" className="nf wrap">
        <span className="section-code">404 / SKYX</span>
        <h1>{t.nf}</h1>
        <p>{t.nfText}</p>
        <a className="button-primary" href={"/" + locale}>
          {t.home} ↗
        </a>
      </main>
      <Footer locale={locale} path="" />
    </>
  );
}
