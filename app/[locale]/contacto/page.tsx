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
        ? "Contacto · Diseña tu viaje | BePelican"
        : "Contact · Design your trip | BePelican",
    description:
      locale === "es"
        ? "Cuéntanos sobre tu viaje a Colombia. Te respondemos en menos de 24 horas."
        : "Tell us about your trip to Colombia. We reply within 24 hours.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactClient />;
}
