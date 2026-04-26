import { notFound } from "next/navigation";
import { Providers } from "../_clients/Providers";
import LayoutClient from "../_clients/LayoutClient";
import { organizationJsonLd } from "@/lib/seo";
import type { Lang } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

const isLocale = (v: string): v is Lang => v === "es" || v === "en";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Providers locale={locale}>
        <LayoutClient>{children}</LayoutClient>
      </Providers>
    </>
  );
}
