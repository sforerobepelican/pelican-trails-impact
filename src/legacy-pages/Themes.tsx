import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { THEMES, EXPERIENCES, type ThemeId } from "@/data/experiences";
import { useLang, useLocalizedPath } from "@/hooks/useLang";

export default function Themes() {
  const { t } = useTranslation();
  const lang = useLang();
  const lp = useLocalizedPath();

  return (
    <>
      <Seo
        title={lang === "es" ? "Temáticas de Viaje en Colombia | BePelican" : "Travel Themes in Colombia | BePelican"}
        description={lang === "es" ? "Encuentra el viaje según lo que te mueve: aventura, ecoturismo, cultura ancestral, gastronomía, patrimonio y más." : "Find the trip that matches what moves you: adventure, ecotourism, ancestral culture, food, heritage and more."}
        path={`/${lang}/tematicas`}
      />
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl mb-4 text-balance">{t("themes.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("themes.subtitle")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(THEMES) as [ThemeId, typeof THEMES[ThemeId]][]).map(([id, theme]) => {
            const count = EXPERIENCES.filter(e => e.themes.includes(id)).length;
            return (
              <Link
                key={id}
                to={`${lp("destinos")}?theme=${id}`}
                className="group relative h-80 overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-smooth"
              >
                <img src={theme.image} alt={theme.name[lang]} loading="lazy" width={800} height={600} className="absolute inset-0 h-full w-full object-cover transition-smooth group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                  <div className="text-xs uppercase tracking-wider opacity-80 mb-2">{count} {t("destinations.results")}</div>
                  <h2 className="text-2xl md:text-3xl mb-2">{theme.name[lang]}</h2>
                  <p className="text-sm text-primary-foreground/90">{theme.tagline[lang]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
