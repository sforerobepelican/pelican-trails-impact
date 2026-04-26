import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/hooks/useLang";

export function CTASection() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  return (
    <section className="container my-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-leaf p-10 md:p-16 text-primary-foreground shadow-glow">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
        <div className="relative max-w-2xl">
          <h2 className="text-4xl md:text-5xl mb-4 text-balance">{t("home.ctaTitle")}</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">{t("home.ctaBody")}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to={lp("contacto")}>{t("hero.ctaSecondary")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to={lp("destinos")}>{t("hero.ctaPrimary")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
