import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLang } from "@/hooks/useLang";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function Layout() {
  const lang = useLang();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
