import { notFound, redirect } from "next/navigation";
import PrivacyClient from "../../_clients/Privacy";
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
    pathEs: "/es/privacidad",
    pathEn: "/en/privacy",
    title: locale === "es" ? "Política de Privacidad | BePelican" : "Privacy Policy | BePelican",
    description:
      locale === "es"
        ? "Política de Tratamiento de Datos Personales de BE PELICAN S.A.S. B.I.C."
        : "Personal Data Treatment Policy of BE PELICAN S.A.S. B.I.C.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === "es") redirect("/es/privacidad");
  return <PrivacyClient />;
}
