import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { useLang } from "@/hooks/useLang";
import { createClient } from "@/utils/supabase/client";

const WHATSAPP_NUMBER = "+573135525944";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export default function Contact() {
  const { t } = useTranslation();
  const lang = useLang();
  const supabase = createClient();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const planningHighlights = t("contact.planningHighlights", { returnObjects: true }) as string[];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? t("contact.error"));
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        whatsapp: parsed.data.whatsapp || null,
        message: parsed.data.message,
        language: lang,
        source: "contact-page",
      });
      if (error) throw error;
      toast.success(t("contact.success"));
      const waMsg = encodeURIComponent(`${parsed.data.name}: ${parsed.data.message}`);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, "_blank", "noopener,noreferrer");
      setForm({ name: "", email: "", whatsapp: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(t("contact.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={lang === "es" ? "Planear Viaje a Colombia con Turismo Comunitario | BePelican" : "Plan a Community Tourism Trip to Colombia | BePelican"}
        description={lang === "es" ? "Habla con BePelican para diseñar tours y experiencias auténticas en Colombia con comunidades locales. Respuesta en menos de 24 horas." : "Talk to BePelican to design tours and authentic experiences in Colombia with local communities. Reply within 24 hours."}
        path={`/${lang}/contacto`}
      />
      <section className="container py-12 md:py-20 max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-5xl md:text-6xl mb-4 text-balance">{t("contact.title")}</h1>
            <p className="text-lg text-muted-foreground mb-8">{t("contact.subtitle")}</p>
            <h2 className="text-2xl mb-3">{t("contact.planningTitle")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">{t("contact.planningBody")}</p>
            <ul className="space-y-3 mb-8">
              {planningHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span><strong className="text-foreground">{item}</strong></span>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">WhatsApp</span>
              </a>
              <a href="mailto:comunicaciones@bepelican.com" className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary transition-smooth">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-semibold">comunicaciones@bepelican.com</span>
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 space-y-5">
            <div>
              <Label htmlFor="name">{t("contact.name")} *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={120} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">{t("contact.email")} *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
              </div>
              <div>
                <Label htmlFor="whatsapp">{t("contact.whatsapp")}</Label>
                <Input id="whatsapp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} maxLength={40} />
              </div>
            </div>
            <div>
              <Label htmlFor="message">{t("contact.message")} *</Label>
              <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} placeholder={t("contact.messagePlaceholder")} required />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? t("contact.submitting") : (<><Send className="h-4 w-4 mr-2" />{t("contact.submit")}</>)}
            </Button>
            <p className="text-xs text-muted-foreground text-center">{t("contact.privacy")}</p>
          </form>
        </div>
      </section>
    </>
  );
}
