import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ZONES, THEMES, type ZoneId, type ThemeId } from "@/data/experiences";
import { useLang } from "@/hooks/useLang";

export interface Filters {
  zone: ZoneId | "all";
  theme: ThemeId | "all";
  duration: "all" | "1" | "2-3" | "4+";
  price: "all" | "lt1" | "1to2" | "gt2" | "soon";
  search: string;
}

interface Props {
  value: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
}

export function FiltersBar({ value, onChange, onClear }: Props) {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <div className="bg-card rounded-2xl shadow-soft p-4 md:p-5 border border-border">
      <div className="grid gap-3 md:grid-cols-12 items-end">
        <div className="md:col-span-4">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            {t("destinations.search")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={value.search}
              onChange={(e) => onChange({ ...value, search: e.target.value })}
              placeholder={t("destinations.search")}
              className="pl-9"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            {t("destinations.filterZone")}
          </label>
          <Select value={value.zone} onValueChange={(v) => onChange({ ...value, zone: v as Filters["zone"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">{t("destinations.all")}</SelectItem>
              {Object.entries(ZONES).map(([id, z]) => (
                <SelectItem key={id} value={id}>{z.name[lang]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            {t("destinations.filterTheme")}
          </label>
          <Select value={value.theme} onValueChange={(v) => onChange({ ...value, theme: v as Filters["theme"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">{t("destinations.all")}</SelectItem>
              {Object.entries(THEMES).map(([id, th]) => (
                <SelectItem key={id} value={id}>{th.name[lang]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            {t("destinations.filterDuration")}
          </label>
          <Select value={value.duration} onValueChange={(v) => onChange({ ...value, duration: v as Filters["duration"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">{t("destinations.all")}</SelectItem>
              <SelectItem value="1">1 día</SelectItem>
              <SelectItem value="2-3">2–3 días</SelectItem>
              <SelectItem value="4+">4+ días</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
            {t("destinations.filterPrice")}
          </label>
          <Select value={value.price} onValueChange={(v) => onChange({ ...value, price: v as Filters["price"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">{t("destinations.all")}</SelectItem>
              <SelectItem value="lt1">&lt; $1.000.000</SelectItem>
              <SelectItem value="1to2">$1M – $2M</SelectItem>
              <SelectItem value="gt2">&gt; $2.000.000</SelectItem>
              <SelectItem value="soon">{t("experience.comingSoon")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4 mr-1" /> {t("destinations.clear")}
        </Button>
      </div>
    </div>
  );
}
