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
        ? "Temáticas de Viaje en Colombia | BePelican"
        : "Travel Themes in Colombia | BePelican",
    description:
      locale === "es"
        ? "Encuentra el viaje según lo que te mueve: aventura, ecoturismo, cultura ancestral, gastronomía, patrimonio y más."
        : "Find the trip that matches what moves you: adventure, ecotourism, ancestral culture, food, heritage and more.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ThemesClient />;
}
