import { useTranslation } from "react-i18next";
import { Heart } from "lucide-react";

export function ImpactSection() {
  const { t } = useTranslation();
  const stats = t("home.impactStats", { returnObjects: true }) as { value: string; label: string }[];

  return (
    <section className="container my-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-float-up">
          <div className="inline-flex items-center gap-2 mb-4 text-primary text-sm font-semibold uppercase tracking-wider">
            <Heart className="h-4 w-4" /> Impact
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-balance">{t("home.impactTitle")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("home.impactBody")}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card border border-border p-6 text-center shadow-soft animate-scale-in">
              <div className="font-display text-4xl md:text-5xl text-primary mb-1">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
