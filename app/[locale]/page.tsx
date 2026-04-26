import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "../_clients/Home";
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
    pathEs: "/es",
    pathEn: "/en",
    title:
      locale === "es"
        ? "Turismo Comunitario en Colombia · Experiencias Auténticas | BePelican"
        : "Community Tourism in Colombia · Authentic Experiences | BePelican",
    description:
      locale === "es"
        ? "Viaja por Colombia con propósito. BePelican conecta viajeros con comunidades locales en experiencias de turismo transformador. Reserva tu próxima aventura."
        : "Travel Colombia with purpose. BePelican connects travelers with local communities through transformative tourism experiences. Book your next adventure.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomeClient />;
}
