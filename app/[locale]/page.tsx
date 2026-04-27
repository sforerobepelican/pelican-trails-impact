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
        ? "Turismo Comunitario en Colombia | Tours y Experiencias Auténticas | BePelican"
        : "Community Tourism in Colombia | Authentic Tours & Experiences | BePelican",
    description:
      locale === "es"
        ? "Descubre tours y experiencias de turismo comunitario en Colombia. Viaja con propósito, conecta con comunidades locales y reserva una aventura auténtica con impacto real."
        : "Discover community tourism tours and experiences in Colombia. Travel with purpose, connect with local communities and book an authentic adventure with real impact.",
    keywords:
      locale === "es"
        ? ["turismo comunitario en Colombia", "tours en Colombia", "experiencias auténticas en Colombia", "viajes con propósito", "comunidades locales Colombia"]
        : ["community tourism in Colombia", "tours in Colombia", "authentic experiences in Colombia", "purposeful travel Colombia", "local communities Colombia"],
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomeClient />;
}
