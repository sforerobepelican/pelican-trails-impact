import { useParams } from "react-router-dom";
import type { Lang } from "@/lib/i18n";

export function useLang(): Lang {
  const { lang } = useParams();
  return lang === "en" ? "en" : "es";
}

export function useLocalizedPath() {
  const lang = useLang();
  return (path: string) => {
    const clean = path.replace(/^\//, "");
    return clean ? `/${lang}/${clean}` : `/${lang}`;
  };
}

export function formatPriceCOP(value: number, lang: Lang) {
  const formatter = new Intl.NumberFormat(lang === "es" ? "es-CO" : "en-US", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}
