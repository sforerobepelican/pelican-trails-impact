"use client";

import { type ReactNode, useEffect } from "react";
import "@/lib/i18n";
import i18n from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

/**
 * Minimal client-side wrapper for locale sync under the App Router.
 */
export function Providers({ locale, children }: { locale: Lang; children: ReactNode }) {
  // Keep i18next in sync with the URL locale immediately on the client.
  // Server-rendered HTML is already correct because [locale]/layout.tsx
  // calls i18n.changeLanguage() before this tree renders.
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
