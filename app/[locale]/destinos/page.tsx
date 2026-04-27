import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import DestinationsClient from "../../_clients/Destinations";
import { buildMetadata, type Lang } from "@/lib/seo";

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
    pathEs: "/es/destinos",
    pathEn: "/en/destinations",
    title:
      locale === "es"
        ? "Tours de Turismo Comunitario en Colombia | BePelican"
        : "Colombia Community Tourism Destinations | BePelican",
    description:
      locale === "es"
        ? "Explora tours y experiencias de turismo comunitario en Colombia: Amazonas, Guajira, Sierra Nevada, Medellín, Bogotá y más, con comunidades locales."
        : "Explore community tourism tours and experiences in Colombia: Amazon, Guajira, Sierra Nevada, Medellin, Bogota and more, designed with local communities.",
    keywords:
      locale === "es"
        ? ["tours en Colombia", "experiencias en Colombia", "turismo comunitario en Colombia", "viajes en Amazonas y Guajira", "ecoturismo Colombia"]
        : ["tours in Colombia", "experiences in Colombia", "community tourism in Colombia", "Amazon and Guajira trips", "ecotourism Colombia"],
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "en") redirect("/en/destinations");
  return <DestinationsClient />;
}
