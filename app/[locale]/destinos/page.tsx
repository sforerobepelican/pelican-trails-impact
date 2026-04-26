import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
        ? "Destinos & Experiencias en Colombia | BePelican"
        : "Destinations & Experiences in Colombia | BePelican",
    description:
      locale === "es"
        ? "Explora todas las experiencias de turismo comunitario en Colombia: Amazonas, Guajira, Sierra Nevada, Medellín, Bogotá y más."
        : "Explore all community tourism experiences in Colombia: Amazon, Guajira, Sierra Nevada, Medellín, Bogotá and more.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DestinationsClient />;
}
