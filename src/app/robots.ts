import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return process.env.SITE_INDEXABLE === "true"
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: "https://sky-x.az/sitemap.xml",
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
