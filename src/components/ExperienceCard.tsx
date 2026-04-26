import { Link } from "react-router-dom";
import { Clock, MapPin, TrendingUp } from "lucide-react";
import type { Experience } from "@/data/experiences";
import { ZONES, THEMES } from "@/data/experiences";
import { useLang, useLocalizedPath, formatPriceLocalized, useTrm } from "@/hooks/useLang";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface Props {
  experience: Experience;
  className?: string;
}

export function ExperienceCard({ experience: e, className }: Props) {
  const lang = useLang();
  const lp = useLocalizedPath();
  const { t } = useTranslation();
  const trm = useTrm();
  const zone = ZONES[e.zone];
  const mainTheme = THEMES[e.themes[0]];

  return (
    <Link
      to={lp(`tour/${e.slug}`)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-card transition-smooth",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={e.image}
          alt={e.name[lang]}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
          <MapPin className="h-3 w-3 text-primary" />
          {zone.name[lang]}
        </div>
        <div className="absolute top-3 right-3 inline-flex items-center rounded-full bg-primary/95 text-primary-foreground px-3 py-1 text-xs font-semibold">
          {mainTheme.name[lang]}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl leading-tight text-foreground group-hover:text-primary transition-smooth">
          {e.name[lang]}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{e.hook[lang]}</p>

        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{e.duration[lang]}</span>
          <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" />{t(`difficulty.${e.difficulty}`)}</span>
        </div>

        <div className="flex items-baseline justify-between">
          {e.priceCOP ? (
            <div>
              <span className="text-xs text-muted-foreground">{t("experience.from")} </span>
              <span className="font-display text-2xl text-primary">{formatPriceLocalized(e.priceCOP, lang, trm)}</span>
            </div>
          ) : (
            <span className="inline-flex items-center rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-semibold">
              {t("experience.comingSoon")}
            </span>
          )}
          <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-smooth">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
