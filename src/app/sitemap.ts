import type { MetadataRoute } from "next";
import { locales, paths } from "@/i18n/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const urls = Object.fromEntries(
      locales.map((l) => [
        l,
        "https://sky-x.az/" + l + (path ? "/" + path : ""),
      ]),
    );
    return locales.map((l) => ({
      url: urls[l],
      alternates: { languages: { ...urls, "x-default": urls.az } },
    }));
  });
}
