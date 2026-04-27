import { notFound, redirect } from "next/navigation";
import DestinationsClient from "../../_clients/Destinations";
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
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "es") redirect("/es/destinos");
  return <DestinationsClient />;
}
