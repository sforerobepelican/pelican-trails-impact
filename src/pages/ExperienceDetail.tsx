import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, MapPin, TrendingUp, Heart, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { ExperienceCard } from "@/components/ExperienceCard";
import { CTASection } from "@/components/CTASection";
import { EXPERIENCES, getExperienceBySlug, ZONES, THEMES } from "@/data/experiences";
import { useLang, useLocalizedPath, formatPriceLocalized, useTrm } from "@/hooks/useLang";

export default function ExperienceDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useLang();
  const lp = useLocalizedPath();
  const trm = useTrm();
  const e = slug ? getExperienceBySlug(slug) : undefined;

  if (!e) return <Navigate to={lp("destinos")} replace />;
  const zone = ZONES[e.zone];
  const similar = EXPERIENCES.filter(x => x.slug !== e.slug && (x.zone === e.zone || x.themes.some(th => e.themes.includes(th)))).slice(0, 3);

  return (
    <>
      <Seo
        title={`${e.name[lang]} · ${zone.name[lang]} | BePelican`}
        description={e.hook[lang]}
        path={`/${lang}/tour/${e.slug}`}
        image={e.image}
        type="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: e.name[lang],
          description: e.description[lang],
          touristType: e.themes.map(th => THEMES[th].name[lang]),
          itinerary: { "@type": "ItemList", numberOfItems: e.durationDays },
          provider: { "@type": "TravelAgency", name: "BePelican", url: "https://bepelican.com" },
          ...(e.priceCOP && { offers: { "@type": "Offer", price: e.priceCOP, priceCurrency: "COP", availability: "https://schema.org/InStock" } }),
        }}
      />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img src={e.image} alt={e.name[lang]} width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
        </div>
        <div className="container -mt-32 relative z-10">
          <Link to={lp("destinos")} className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground text-sm mb-4">
            <ArrowLeft className="h-4 w-4" /> {t("nav.destinations")}
          </Link>
          <div className="bg-card rounded-3xl shadow-card p-8 md:p-10 border border-border">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                <MapPin className="h-3 w-3" /> {zone.name[lang]}
              </span>
              {e.themes.map(th => (
                <span key={th} className="inline-flex items-center rounded-full bg-muted text-muted-foreground px-3 py-1 text-xs font-semibold">
                  {THEMES[th].name[lang]}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl mb-4 text-balance">{e.name[lang]}</h1>
            <p className="text-lg text-muted-foreground mb-6">{e.hook[lang]}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{t("experience.duration")}</div>
                <div className="font-semibold flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{e.duration[lang]}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{t("experience.pace")}</div>
                <div className="font-semibold flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-primary" />{e.pace[lang]}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{t("experience.location")}</div>
                <div className="font-semibold flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{zone.name[lang]}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{t("destinations.filterPrice")}</div>
                {e.priceCOP ? (
                  <div className="font-display text-2xl text-primary leading-tight">{formatPriceLocalized(e.priceCOP, lang, trm)}</div>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-semibold">{t("experience.comingSoon")}</span>
                )}
                {e.priceNote && <div className="text-xs text-muted-foreground">{e.priceNote[lang]}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-3xl mb-4">{t("experience.insights")}</h2>
            <ul className="space-y-3">
              {e.insights[lang].map(ins => (
                <li key={ins} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-leaf/15 text-leaf shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90">{ins}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl mb-4">{t("experience.fullDescription")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{e.description[lang]}</p>
          </div>

          <div className="rounded-2xl bg-leaf/10 border border-leaf/20 p-6 md:p-8">
            <div className="flex items-center gap-2 text-leaf font-semibold uppercase tracking-wider text-xs mb-3">
              <Heart className="h-4 w-4" /> {t("experience.impactSection")}
            </div>
            <p className="text-foreground/90">{e.impact[lang]}</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit space-y-4">
          <div className="rounded-2xl bg-card border border-border shadow-card p-6">
            <h3 className="text-2xl mb-2">{t("experience.bookCta")}</h3>
            <p className="text-sm text-muted-foreground mb-5">{t("contact.subtitle")}</p>
            <Button asChild size="lg" className="w-full mb-2">
              <Link to={lp("contacto")}>{t("experience.bookCta")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full">
              <a href={`https://wa.me/573135525944?text=${encodeURIComponent(`Hola, me interesa la experiencia: ${e.name[lang]}`)}`} target="_blank" rel="noopener noreferrer">
                {t("experience.contactCta")}
              </a>
            </Button>
          </div>
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="container my-16">
          <h2 className="text-3xl md:text-4xl mb-8">{t("experience.similar")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map(s => <ExperienceCard key={s.slug} experience={s} />)}
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
