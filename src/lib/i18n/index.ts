import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "./es";
import { en } from "./en";

export const SUPPORTED_LANGS = ["es", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

// Single, lazy-initialized instance. The browser language detector was
// removed during the Next.js migration: language is driven by the URL
// segment ([locale]) on both server and client, so detection is redundant
// and the browser-only plugin would crash during SSR.
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: { es: { translation: es }, en: { translation: en } },
      lng: "es",
      fallbackLng: "es",
      supportedLngs: SUPPORTED_LANGS as unknown as string[],
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
}

export default i18n;
