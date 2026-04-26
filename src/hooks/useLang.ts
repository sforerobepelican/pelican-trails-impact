import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

export function useLang(): Lang {
  // Next App Router uses the dynamic segment name [locale]; the legacy
  // react-router-dom routes used :lang. The shim returns whatever Next
  // exposes, so we accept both keys.
  const params = useParams() as { locale?: string; lang?: string };
  const value = params.locale ?? params.lang;
  return value === "en" ? "en" : "es";
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
  // Append explicit "COP" suffix for clarity
  return `${formatter.format(value)} COP`;
}

// Fallback TRM (COP per 1 USD) used if the live rate cannot be fetched.
const FALLBACK_TRM = 4000;
let cachedTrm: number | null = null;
let cachedTrmDate: string | null = null;
let inflight: Promise<number> | null = null;

async function fetchTrm(): Promise<number> {
  const today = new Date().toISOString().slice(0, 10);
  if (cachedTrm && cachedTrmDate === today) return cachedTrm;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      // Official Colombian government dataset (Datos Abiertos) — TRM diaria
      const res = await fetch(
        "https://www.datos.gov.co/resource/32sa-8pi3.json?$query=SELECT%20valor,vigenciadesde%20ORDER%20BY%20vigenciadesde%20DESC%20LIMIT%201",
      );
      if (res.ok) {
        const data = (await res.json()) as Array<{ valor: string }>;
        const v = data?.[0]?.valor ? parseFloat(data[0].valor) : NaN;
        if (Number.isFinite(v) && v > 0) {
          cachedTrm = v;
          cachedTrmDate = today;
          return v;
        }
      }
    } catch {
      // ignore, use fallback
    }
    cachedTrm = FALLBACK_TRM;
    cachedTrmDate = today;
    return FALLBACK_TRM;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export function useTrm() {
  const [trm, setTrm] = useState<number | null>(cachedTrm);
  useEffect(() => {
    let cancelled = false;
    fetchTrm().then((v) => {
      if (!cancelled) setTrm(v);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return trm;
}

/**
 * Convert a COP price to USD using the day's TRM, round UP to the next integer
 * and add a fixed 5 USD surcharge.
 */
export function copToUsd(valueCOP: number, trm: number): number {
  if (!trm || trm <= 0) return 0;
  return Math.ceil(valueCOP / trm) + 5;
}

export function formatPriceLocalized(valueCOP: number, lang: Lang, trm: number | null) {
  if (lang === "en") {
    if (!trm) {
      // While loading, show a neutral placeholder to avoid layout shift surprises
      return "—";
    }
    const usd = copToUsd(valueCOP, trm);
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(usd);
    return `${formatted} USD`;
  }
  return formatPriceCOP(valueCOP, lang);
}
