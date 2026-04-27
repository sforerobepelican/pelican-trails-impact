import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExperienceCard } from "@/components/ExperienceCard";
import { FiltersBar, type Filters } from "@/components/FiltersBar";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { EXPERIENCES } from "@/data/experiences";
import { Link } from "react-router-dom";
import { useLang, useLocalizedPath } from "@/hooks/useLang";

const DEFAULT_FILTERS: Filters = { zone: "all", theme: "all", duration: "all", price: "all", search: "" };

export default function Destinations() {
  const { t } = useTranslation();
  const lang = useLang();
  const lp = useLocalizedPath();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const guideHighlights = t("destinations.guideHighlights", { returnObjects: true }) as string[];

  const filtered = useMemo(() => {
    return EXPERIENCES.filter(e => {
      if (filters.zone !== "all" && e.zone !== filters.zone) return false;
      if (filters.theme !== "all" && !e.themes.includes(filters.theme)) return false;
      if (filters.duration !== "all") {
        if (filters.duration === "1" && e.durationDays !== 1) return false;
        if (filters.duration === "2-3" && (e.durationDays < 2 || e.durationDays > 3)) return false;
        if (filters.duration === "4+" && e.durationDays < 4) return false;
      }
      if (filters.price !== "all") {
        if (filters.price === "soon" && e.priceCOP !== null) return false;
        if (filters.price === "lt1" && (!e.priceCOP || e.priceCOP >= 1_000_000)) return false;
        if (filters.price === "1to2" && (!e.priceCOP || e.priceCOP < 1_000_000 || e.priceCOP > 2_000_000)) return false;
        if (filters.price === "gt2" && (!e.priceCOP || e.priceCOP <= 2_000_000)) return false;
      }
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const hay = `${e.name[lang]} ${e.hook[lang]} ${e.description[lang]}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filters, lang]);

  return (
    <>
      <Seo
        title={lang === "es" ? "Tours y Experiencias de Turismo Comunitario en Colombia | BePelican" : "Community Tourism Tours & Experiences in Colombia | BePelican"}
        description={lang === "es" ? "Descubre tours y experiencias de turismo comunitario en Colombia: Amazonas, Guajira, Sierra Nevada, Medellín, Bogotá y más, con comunidades locales." : "Discover community tourism tours and experiences in Colombia: Amazon, Guajira, Sierra Nevada, Medellin, Bogota and more, designed with local communities."}
        path={`/${lang}/destinos`}
      />
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mb-10">
          <h1 className="text-5xl md:text-6xl mb-4 text-balance">{t("destinations.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("destinations.subtitle")}</p>
        </div>

        <div className="mb-10 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl mb-3">{t("destinations.guideTitle")}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("destinations.guideBody")}</p>
          <ul className="space-y-3 mb-4">
            {guideHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">{item}</strong></span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            <Link to={lp("tematicas")} className="font-semibold text-primary hover:underline">
              {t("destinations.themesLink")}
            </Link>{" "}
            ·{" "}
            <Link to={lp("contacto")} className="font-semibold text-primary hover:underline">
              {t("destinations.contactLink")}
            </Link>
          </p>
        </div>

        <FiltersBar value={filters} onChange={setFilters} onClear={() => setFilters(DEFAULT_FILTERS)} />

        <p className="text-sm text-muted-foreground mt-6 mb-6">
          {t("destinations.showing")} <strong>{filtered.length}</strong> {t("destinations.of")} {EXPERIENCES.length} {t("destinations.results")}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">{t("destinations.empty")}</p>
            <Button onClick={() => setFilters(DEFAULT_FILTERS)}>{t("destinations.clear")}</Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(e => <ExperienceCard key={e.slug} experience={e} />)}
          </div>
        )}
      </section>
    </>
  );
}
