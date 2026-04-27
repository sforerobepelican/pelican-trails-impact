import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "../_clients/Home";
import { buildMetadata, faqPageJsonLd, getDict, type Lang } from "@/lib/seo";

export const dynamic = "force-static";

const isLocale = (v: string): v is Lang => v === "es" || v === "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    lang: locale,
    pathEs: "/es",
    pathEn: "/en",
    title:
      locale === "es"
        ? "Turismo Comunitario Colombia | Tours Auténticos | BePelican"
        : "Community Tourism Colombia | Authentic Tours | BePelican",
    description:
      locale === "es"
        ? "Descubre tours de turismo comunitario en Colombia. Viaja con propósito, conecta con comunidades locales y vive una aventura auténtica. Reserva ya."
        : "Discover community tourism in Colombia. Travel with purpose, connect with local communities and book an authentic adventure with real impact.",
    keywords:
      locale === "es"
        ? ["turismo comunitario en Colombia", "tours en Colombia", "experiencias auténticas en Colombia", "viajes con propósito", "comunidades locales Colombia"]
        : ["community tourism in Colombia", "tours in Colombia", "authentic experiences in Colombia", "purposeful travel Colombia", "local communities Colombia"],
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const faqItems = dict.home.faqItems;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
      />
      <HomeClient />
    </>
  );
}
