import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLocalizedPath, useLang } from "@/hooks/useLang";

export function Footer() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const lang = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-24">
      <div className="container py-14 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo.src} alt="BePelican" width={48} height={48} className="h-12 w-12 brightness-0 invert" />
            <span className="font-display text-2xl">BePelican</span>
          </div>
          <p className="text-sm text-secondary-foreground/80 max-w-md">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg mb-3">{t("footer.explore")}</h3>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link to={lp("destinos")} className="hover:text-primary-glow transition-smooth">{t("nav.destinations")}</Link></li>
            <li><Link to={lp("tematicas")} className="hover:text-primary-glow transition-smooth">{t("nav.themes")}</Link></li>
            <li><Link to={lp("contacto")} className="hover:text-primary-glow transition-smooth">{t("nav.contact")}</Link></li>
            <li><Link to={`/${lang}/privacidad`} className="hover:text-primary-glow transition-smooth">{t("footer.privacy")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-3">{t("footer.follow")}</h3>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/bepelican/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary transition-smooth">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/bepelican" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary transition-smooth">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="mailto:comunicaciones@bepelican.com" aria-label="Email" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary transition-smooth">
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs text-secondary-foreground/70 mt-4">comunicaciones@bepelican.com</p>
          <p className="text-xs text-secondary-foreground/70">WhatsApp: +57 313 5525944</p>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="container py-5 text-center text-xs text-secondary-foreground/70">
          © {year} BePelican. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
