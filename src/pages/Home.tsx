import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Compass, MessageCircle, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-colombia.jpg";
import { Button } from "@/components/ui/button";
import { ExperienceCard } from "@/components/ExperienceCard";
import { CTASection } from "@/components/CTASection";
import { ImpactSection } from "@/components/ImpactSection";
import { Seo } from "@/components/Seo";
import { EXPERIENCES } from "@/data/experiences";
import { useLang, useLocalizedPath } from "@/hooks/useLang";

export default function Home() {
  const { t } = useTranslation();
  const lang = useLang();
  const lp = useLocalizedPath();
  const featuredSlugs = ["cocuy-3-dias","ciudad-perdida-5-dias","inmersion-wayuu-4-dias","amazonas-6-dias","guaviare-5-dias","chingaza"];
  const featured = featuredSlugs
    .map(slug => EXPERIENCES.find(e => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const steps = t("home.howSteps", { returnObjects: true }) as { title: string; body: string }[];
  const stepIcons = [Compass, Sparkles, MessageCircle];

  return (
    <>
      <Seo
        title={lang === "es" ? "Turismo Comunitario en Colombia · Experiencias Auténticas | BePelican" : "Community Tourism in Colombia · Authentic Experiences | BePelican"}
        description={lang === "es"
          ? "Viaja por Colombia con propósito. BePelican conecta viajeros con comunidades locales en experiencias de turismo transformador. Reserva tu próxima aventura."
          : "Travel Colombia with purpose. BePelican connects travelers with local communities through transformative tourism experiences. Book your next adventure."}
        path={`/${lang}`}
        image={heroImg}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "BePelican",
          description: lang === "es" ? "Agencia de turismo comunitario en Colombia" : "Community tourism agency in Colombia",
          url: "https://bepelican.com",
          areaServed: "Colombia",
          slogan: t("footer.tagline"),
        }}
      />

      {/* Hero */}
      <section className="relative -mt-20 min-h-[92vh] flex items-end overflow-hidden">
        <img src={heroImg} alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative container pb-24 pt-40 text-primary-foreground">
          <p className="inline-block bg-background/15 backdrop-blur px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold mb-6 animate-float-up">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl max-w-4xl text-balance mb-6 animate-float-up" style={{animationDelay:"0.1s"}}>
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-primary-foreground/90 mb-8 animate-float-up" style={{animationDelay:"0.2s"}}>
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3 animate-float-up" style={{animationDelay:"0.3s"}}>
            <Button asChild size="lg">
              <Link to={lp("destinos")}>{t("hero.ctaPrimary")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-secondary">
              <Link to={lp("contacto")}>{t("hero.ctaSecondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container my-24 max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl mb-6 text-balance">{t("home.introTitle")}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{t("home.introBody")}</p>
      </section>

      {/* Featured */}
      <section className="container my-20">
        <div className="flex flex-wrap items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl mb-2">{t("home.featuredTitle")}</h2>
            <p className="text-muted-foreground">{t("home.featuredSubtitle")}</p>
          </div>
          <Button asChild variant="outline">
            <Link to={lp("destinos")}>{t("nav.destinations")} →</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(e => <ExperienceCard key={e.slug} experience={e} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/40 py-24 mt-24">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-16">{t("home.howTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={s.title} className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-5 shadow-glow">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ImpactSection />
      <CTASection />
    </>
  );
}
