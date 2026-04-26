import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, MapPin, TrendingUp, Heart, Check, X, ArrowLeft, Users, Languages, PawPrint, Calendar, Thermometer, ExternalLink } from "lucide-react";
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
          {e.details?.about && (
            <div>
              <h2 className="text-3xl mb-4">{t("experience.aboutTitle")}</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {e.details.about[lang]}
              </div>
              {(e.details.difficultyNote || e.details.maxPeople || e.details.languages || e.details.petsAllowed) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {e.details.difficultyNote && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      {t("experience.difficultyLevel")}: {e.details.difficultyNote[lang]}
                    </span>
                  )}
                  {typeof e.details.maxPeople === "number" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      {t("experience.maxPeople", { count: e.details.maxPeople })}
                    </span>
                  )}
                  {e.details.languages && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
                      <Languages className="h-3.5 w-3.5 text-primary" />
                      {e.details.languages[lang]}
                    </span>
                  )}
                  {e.details.petsAllowed && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
                      <PawPrint className="h-3.5 w-3.5 text-primary" />
                      {t("experience.petsAllowed")}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {e.details?.itinerary && e.details.itinerary.length > 0 && (
            <div>
              <h2 className="text-3xl mb-6">{t("experience.itinerary")}</h2>
              <ol className="space-y-6">
                {e.details.itinerary.map((day, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl mb-2 text-foreground">{day.title[lang]}</h3>
                      <div className="space-y-2 text-foreground/80">
                        {day.body[lang].map((para, j) => (
                          <p key={j} className="leading-relaxed">{para}</p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {e.details?.includes && (
            <div>
              <h2 className="text-3xl mb-4">{t("experience.includes")}</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {e.details.includes[lang].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-leaf/15 text-leaf shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {e.details?.notIncluded && (
            <div>
              <h2 className="text-3xl mb-4">{t("experience.notIncluded")}</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {e.details.notIncluded[lang].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive shrink-0">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(e.details?.meetingPoint || e.details?.endingPoint || e.details?.startTime || e.details?.flexibleSchedule) && (
            <div className="rounded-2xl bg-muted/40 border border-border p-6 md:p-8 space-y-4">
              {e.details?.meetingPoint && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {t("experience.meetingPoint")}
                  </div>
                  <p className="text-foreground">{e.details.meetingPoint[lang]}</p>
                  {e.details.meetingPointMapUrl && (
                    <a href={e.details.meetingPointMapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-1 hover:underline">
                      {t("experience.viewOnMap")} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
              {e.details?.endingPoint && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {t("experience.endingPoint")}
                  </div>
                  <p className="text-foreground">{e.details.endingPoint[lang]}</p>
                </div>
              )}
              {e.details?.startTime && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {t("experience.startTime")}
                  </div>
                  <p className="text-foreground">{e.details.startTime}</p>
                </div>
              )}
              {e.details?.flexibleSchedule && !e.details?.startTime && (
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{t("experience.flexibleSchedule")}</span>
                </div>
              )}
            </div>
          )}

          {e.details?.climate && (e.details.climate.temperature || e.details.climate.bestSeason) && (
            <div>
              <h2 className="text-3xl mb-4 flex items-center gap-2">
                <Thermometer className="h-7 w-7 text-primary" /> {t("experience.climate")}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {e.details.climate.temperature && (
                  <div className="rounded-2xl border border-border p-5 bg-card">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">{t("experience.temperature")}</div>
                    <p className="text-foreground">{e.details.climate.temperature[lang]}</p>
                  </div>
                )}
                {e.details.climate.bestSeason && (
                  <div className="rounded-2xl border border-border p-5 bg-card">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">{t("experience.bestSeason")}</div>
                    <p className="text-foreground">{e.details.climate.bestSeason[lang]}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {e.details?.recommendations && (
            <div>
              <h2 className="text-3xl mb-4">{t("experience.recommendations")}</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {e.details.recommendations[lang].map(item => (
                  <li key={item} className="flex items-start gap-3 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {e.details?.arrivalTips && (
            <div className="rounded-2xl bg-accent/10 border border-accent/20 p-6">
              <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{t("experience.arrivalTips")}</div>
              <p className="text-foreground/90">{e.details.arrivalTips[lang]}</p>
            </div>
          )}

          {e.details?.cancellation && (
            <div>
              <h2 className="text-2xl mb-3">{t("experience.cancellation")}</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{e.details.cancellation[lang]}</p>
            </div>
          )}

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
