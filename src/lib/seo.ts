/**
 * Server-safe SEO helpers used by Next App Router page modules.
 * They read the same i18n dictionaries the client uses, so wording
 * stays identical to what react-i18next would render.
 */

import type { Metadata } from "next";
import { es } from "@/lib/i18n/es";
import { en } from "@/lib/i18n/en";
import { EXPERIENCES } from "@/data/experiences";
import type { Experience } from "@/data/experiences";

export const SITE_URL = "https://bepelican.com";
export const SITE_NAME = "BePelican";
export const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/686b45ff-3af1-465a-b659-8e1e9e64c52b/id-preview-aa25fa1a--5ce8b5bf-464d-40ba-8f9c-0325cd18f4db.lovable.app-1777168061381.png";

export type Lang = "es" | "en";

export const dicts = { es, en } as const;
export const getDict = (lang: Lang) => (lang === "en" ? en : es);

/**
 * Build a Next Metadata object for a route, including hreflang alternates
 * and Open Graph / Twitter cards. Path is the locale-less path
 * (e.g. "/destinos"); we generate /es/... and /en/... variants.
 */
export function buildMetadata({
  lang,
  pathEs,
  pathEn,
  title,
  description,
  image,
  type = "website",
}: {
  lang: Lang;
  pathEs: string;
  pathEn: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "product";
}): Metadata {
  const path = lang === "es" ? pathEs : pathEn;
  const url = `${SITE_URL}${path}`;
  const og = image ?? DEFAULT_OG_IMAGE;
  const openGraphType = type === "product" ? "article" : type;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}${pathEs}`,
        en: `${SITE_URL}${pathEn}`,
        "x-default": `${SITE_URL}/es`,
      },
    },
    openGraph: {
      title,
      description,
      type: openGraphType,
      url,
      siteName: SITE_NAME,
      locale: lang === "es" ? "es_CO" : "en_US",
      alternateLocale: lang === "es" ? ["en_US"] : ["es_CO"],
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * JSON-LD: TravelAgency (Organization) — emitted on every page from the
 * locale layout, so it travels with every URL Google crawls.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      "Community-based travel agency in Colombia. Authentic experiences with local communities, with measurable social impact.",
    areaServed: { "@type": "Country", name: "Colombia" },
    sameAs: [
      "https://www.instagram.com/bepelican/",
      "https://www.facebook.com/bepelican",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "comunicaciones@bepelican.com",
      telephone: "+57-313-552-5944",
      availableLanguage: ["es", "en"],
    },
  };
}

/**
 * JSON-LD: TouristTrip — one per experience detail page.
 */
export function touristTripJsonLd(exp: Experience, lang: Lang) {
  const url = `${SITE_URL}/${lang}/tour/${exp.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: exp.name[lang],
    description: exp.hook[lang],
    url,
    image: exp.image,
    touristType: exp.themes,
    itinerary: { "@type": "ItemList", numberOfItems: exp.durationDays },
    provider: { "@id": `${SITE_URL}#organization` },
    ...(exp.priceCOP !== null
      ? {
          offers: {
            "@type": "Offer",
            price: exp.priceCOP,
            priceCurrency: "COP",
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
  };
}

/**
 * Collect every (lang, slug) pair for static generation of
 * /[locale]/tour/[slug]/page.tsx.
 */
export function tourStaticParams() {
  const langs: Lang[] = ["es", "en"];
  return langs.flatMap((locale) =>
    EXPERIENCES.map((e) => ({ locale, slug: e.slug })),
  );
}
