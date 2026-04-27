import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExperienceDetailClient from "../../../_clients/ExperienceDetail";
import { getExperienceBySlug, ZONES } from "@/data/experiences";
import { breadcrumbJsonLd, buildMetadata, touristTripJsonLd, tourStaticParams, type Lang } from "@/lib/seo";

export const dynamic = "force-static";

const isLocale = (v: string): v is Lang => v === "es" || v === "en";

export function generateStaticParams() {
  return tourStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  const zone = ZONES[exp.zone];

  return buildMetadata({
    lang: locale,
    pathEs: `/es/tour/${slug}`,
    pathEn: `/en/tour/${slug}`,
    title:
      locale === "es"
        ? `${exp.name[locale]} en ${zone.name[locale]} | Tour de turismo comunitario en Colombia | BePelican`
        : `${exp.name[locale]} in ${zone.name[locale]} | Community tourism tour in Colombia | BePelican`,
    description:
      locale === "es"
        ? `${exp.hook[locale]} Reserva esta experiencia en ${zone.name[locale]} y viaja por Colombia con comunidades locales.`
        : `${exp.hook[locale]} Book this experience in ${zone.name[locale]} and travel Colombia with local communities.`,
    image: exp.image,
    type: "product",
    keywords:
      locale === "es"
        ? [exp.name[locale], `tour en ${zone.name[locale]}`, "turismo comunitario en Colombia", "experiencia auténtica en Colombia"]
        : [exp.name[locale], `tour in ${zone.name[locale]}`, "community tourism in Colombia", "authentic experience in Colombia"],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd(exp, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: locale === "es" ? "Inicio" : "Home", path: `/${locale}` },
              {
                name: locale === "es" ? "Destinos" : "Destinations",
                path: locale === "es" ? "/es/destinos" : "/en/destinations",
              },
              { name: exp.name[locale], path: `/${locale}/tour/${exp.slug}` },
            ]),
          ),
        }}
      />
      <ExperienceDetailClient />
    </>
  );
}
