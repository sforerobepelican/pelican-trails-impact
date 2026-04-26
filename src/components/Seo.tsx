import { Helmet } from "react-helmet-async";
import { useLang } from "@/hooks/useLang";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://bepelican.com";

export function Seo({ title, description, path = "/", image, type = "website", jsonLd }: SeoProps) {
  const lang = useLang();
  const url = `${SITE_URL}${path}`;
  const altLang = lang === "es" ? "en" : "es";
  const altPath = path.replace(/^\/(es|en)/, `/${altLang}`);

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}${path.replace(/^\/(es|en)/, "/es")}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path.replace(/^\/(es|en)/, "/en")}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/es`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={lang === "es" ? "es_CO" : "en_US"} />
      <meta property="og:locale:alternate" content={lang === "es" ? "en_US" : "es_CO"} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
