import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExperienceDetailClient from "../../../_clients/ExperienceDetail";
import { getExperienceBySlug, ZONES } from "@/data/experiences";
import { buildMetadata, touristTripJsonLd, tourStaticParams, type Lang } from "@/lib/seo";

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
    title: `${exp.name[locale]} · ${zone.name[locale]} | BePelican`,
    description: exp.hook[locale],
    image: exp.image,
    type: "product",
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
      <ExperienceDetailClient />
    </>
  );
}
