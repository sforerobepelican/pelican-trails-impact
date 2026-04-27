import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactClient from "../../_clients/Contact";
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
    pathEs: "/es/contacto",
    pathEn: "/en/contact",
    title:
      locale === "es"
        ? "Planear Viaje a Colombia con Turismo Comunitario | BePelican"
        : "Plan a Community Tourism Trip to Colombia | BePelican",
    description:
      locale === "es"
        ? "Habla con BePelican para diseñar tours y experiencias auténticas en Colombia con comunidades locales. Respuesta en menos de 24 horas."
        : "Talk to BePelican to design tours and authentic experiences in Colombia with local communities. Reply within 24 hours.",
    keywords:
      locale === "es"
        ? ["planear viaje a Colombia", "agencia de turismo comunitario", "viaje a medida Colombia", "reservar tours en Colombia"]
        : ["plan a trip to Colombia", "community tourism agency", "custom trip Colombia", "book tours in Colombia"],
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactClient />;
}
