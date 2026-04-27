import { notFound, redirect } from "next/navigation";
import ContactClient from "../../_clients/Contact";
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
    pathEs: "/es/contacto",
    pathEn: "/en/contact",
    title:
      locale === "es"
        ? "Planear Viaje a Colombia | BePelican"
        : "Plan a Community Tourism Trip to Colombia | BePelican",
    description:
      locale === "es"
        ? "Habla con BePelican para diseñar tours y experiencias auténticas en Colombia con comunidades locales. Respuesta en menos de 24 horas."
        : "Talk to BePelican to design tours and authentic experiences in Colombia with local communities. Reply within 24 hours.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "es") redirect("/es/contacto");
  return <ContactClient />;
}
