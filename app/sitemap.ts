import type { MetadataRoute } from "next";
import { EXPERIENCES } from "@/data/experiences";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS_BY_LOCALE = {
  es: ["", "/destinos", "/tematicas", "/contacto", "/privacidad"],
  en: ["", "/destinations", "/themes", "/contact", "/privacy"],
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  (Object.keys(STATIC_PATHS_BY_LOCALE) as Array<keyof typeof STATIC_PATHS_BY_LOCALE>).forEach(
    (locale) => {
      for (const p of STATIC_PATHS_BY_LOCALE[locale]) {
        out.push({
          url: `${SITE_URL}/${locale}${p}`,
          lastModified: now,
          changeFrequency: p === "" ? "weekly" : "monthly",
          priority: p === "" ? 1.0 : 0.7,
        });
      }
      for (const exp of EXPERIENCES) {
        out.push({
          url: `${SITE_URL}/${locale}/tour/${exp.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    },
  );

  return out;
}
