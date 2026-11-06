import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, paths, site, type Locale } from "@/i18n/site";
import Home from "@/ui/Home";
import { Header, Footer } from "@/ui/Shell";
import Contact from "@/contact/Contact";
import InnerPage, { getInnerMeta } from "@/inner/InnerPage";

type Params = Promise<{ locale: string; segments?: string[] }>;
const url = "https://sky-x.az";
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    paths.map((path) => ({ locale, segments: path ? path.split("/") : [] })),
  );
}
function meta(locale: Locale, path: string) {
  const t = site[locale];
  if (!path)
    return {
      title: t.h1.join(" ") + " | SKYX",
      description: t.h1.join(" ") + " " + t.intro,
    };
  if (path === "contact")
    return { title: t.contactTitle + " | SKYX", description: t.contactDesc };
  const info = getInnerMeta(locale, path);
  return info ? { ...info, title: info.title + " | SKYX" } : undefined;
}
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, segments } = await params;
  const path = (segments || []).join("/");
  if (!isLocale(locale)) return { title: site.az.nf, robots: { index: false } };
  const data = meta(locale, path);
  if (!data) return { title: site[locale].nf, robots: { index: false } };
  const suffix = path ? "/" + path : "",
    canonical = url + "/" + locale + suffix;
  const langMap = Object.fromEntries(
    locales.map((l) => [l, url + "/" + l + suffix]),
  );
  const index = process.env.SITE_INDEXABLE === "true";
  return {
    ...data,
    metadataBase: new URL(url),
    alternates: {
      canonical,
      languages: { ...langMap, "x-default": url + "/az" + suffix },
    },
    robots: { index, follow: index },
    icons: { icon: "/brand/mark.svg" },
    openGraph: {
      ...data,
      type: "website",
      locale: { az: "az_AZ", ru: "ru_RU", en: "en_US" }[locale],
      url: canonical,
      siteName: "SKYX",
      images: [
        {
          url: "/brand/social.png",
          width: 1200,
          height: 630,
          alt: "SKYX · Digital Growth Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["/brand/social.png"],
    },
  };
}
export default async function Page({ params }: { params: Params }) {
  const { locale, segments } = await params;
  const path = (segments || []).join("/");
  if (!isLocale(locale) || !paths.includes(path)) notFound();
  const t = site[locale],
    info = meta(locale, path)!;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": url + "/#studio",
      name: "SKYX",
      url,
      logo: url + "/brand/skyx.png",
      email: "info@sky-x.az",
      telephone: "+994556118850",
    },
    {
      "@type": "WebSite",
      "@id": url + "/#website",
      name: "SKYX Digital Growth Studio",
      url,
      inLanguage: locales,
      publisher: { "@id": url + "/#studio" },
    },
  ];
  if (path.startsWith("services/"))
    graph.push({
      "@type": "Service",
      name: info.title.split(" |")[0],
      description: info.description,
      url: url + "/" + locale + "/" + path,
      provider: { "@id": url + "/#studio" },
    });
  return (
    <>
      <Header locale={locale} path={path} />
      <main id="main" tabIndex={-1} aria-label={path ? undefined : t.home}>
        {!path ? (
          <Home locale={locale} />
        ) : path === "contact" ? (
          <Contact locale={locale} standalone />
        ) : (
          <InnerPage locale={locale} path={path} />
        )}
      </main>
      <Footer locale={locale} path={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph,
          }).replaceAll("<", "\\u003c"),
        }}
      />
    </>
  );
}
