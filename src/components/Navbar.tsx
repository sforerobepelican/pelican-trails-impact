import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import logotype from "@/assets/logotype.png";
import { useLang, useLocalizedPath } from "@/hooks/useLang";
import { LangSwitcher } from "./LangSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useTranslation();
  const lang = useLang();
  const lp = useLocalizedPath();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { to: lp(""), label: t("nav.home") },
    { to: lp("destinos"), label: t("nav.destinations") },
    { to: lp("tematicas"), label: t("nav.themes") },
    { to: lp("contacto"), label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        scrolled ? "bg-background/90 backdrop-blur-md shadow-soft" : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between py-3 md:py-4">
        <Link to={`/${lang}`} className="flex items-center gap-2" aria-label="BePelican">
          <img src={logotype.src} alt="" aria-hidden="true" className="hidden md:block h-8 w-auto" />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === `/${lang}`}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-smooth hover:text-primary",
                    isActive ? "text-primary" : "text-foreground/80"
                  )
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
            <Link to={lp("contacto")}>{t("nav.bookNow")}</Link>
          </Button>
          <button
            className="lg:hidden p-2 rounded-md text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <ul className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === `/${lang}`}
                  className={({ isActive }) =>
                    cn(
                      "block py-3 px-2 rounded-md text-base font-medium transition-smooth",
                      isActive ? "text-primary bg-muted" : "text-foreground/90 hover:bg-muted"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
