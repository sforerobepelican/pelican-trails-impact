import { useLocation, useNavigate } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LangSwitcher() {
  const lang = useLang();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  const toggle = () => {
    const next = lang === "es" ? "en" : "es";
    const newPath = pathname.replace(/^\/(es|en)/, `/${next}`);
    i18n.changeLanguage(next);
    navigate(newPath || `/${next}`);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:text-primary transition-smooth"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
