import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ThemesClient from "../../_clients/Themes";
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
    pathEs: "/es/tematicas",
    pathEn: "/en/themes",
    title:
      locale === "es"
        ? "Temáticas de Turismo Comunitario en Colombia | BePelican"
        : "Community Tourism Travel Themes in Colombia | BePelican",
    description:
      locale === "es"
        ? "Explora temáticas de turismo comunitario en Colombia: aventura, ecoturismo, gastronomía local, patrimonio, cultura ancestral y más."
        : "Explore community tourism travel themes in Colombia: adventure, ecotourism, local food, heritage, ancestral culture and more.",
    keywords:
      locale === "es"
        ? ["temáticas de viaje en Colombia", "turismo comunitario en Colombia", "ecoturismo Colombia", "cultura ancestral Colombia", "gastronomía local Colombia"]
        : ["travel themes in Colombia", "community tourism in Colombia", "ecotourism Colombia", "ancestral culture Colombia", "local food Colombia"],
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ThemesClient />;
}
