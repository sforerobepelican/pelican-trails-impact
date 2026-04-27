import { notFound, redirect } from "next/navigation";
import ThemesClient from "../../_clients/Themes";
import { buildMetadata, type Lang } from "@/lib/seo";

export const dynamic = "force-static";

const isLocale = (v: string): v is Lang => v === "es" || v === "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "es") redirect("/es/tematicas");
  return <ThemesClient />;
}
