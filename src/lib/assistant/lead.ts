import { localized } from "../localized";
import type { Locale } from "../types";
import { COACHING_PACKAGES } from "../../content/coaching";
import { MAINTENANCE_OPTIONS, PRICING_PACKAGES, SYSTEM_OFFERS, formatMYR } from "../pricing/calculator";

export type LeadService = "website" | "system" | "coaching";
export type LeadPackage = { id: string; label: string; price: string };

export function getLeadPackages(service: LeadService, locale: Locale): LeadPackage[] {
  if (service === "website") return PRICING_PACKAGES.map((item) => ({ id: item.id, label: localized(item.name, locale), price: item.priceDisplay }));
  if (service === "system") return SYSTEM_OFFERS.map((item) => ({ id: item.id, label: localized(item.name, locale), price: item.priceDisplay }));
  return COACHING_PACKAGES.map((item) => ({ id: item.id, label: localized(item.name, locale), price: `${formatMYR(item.price)} / ${item.durationMinutes === 60 ? (locale === "ms" ? "1 jam" : locale === "zh-Hans" ? "1 小时" : "1 hour") : (locale === "ms" ? "2 jam" : locale === "zh-Hans" ? "2 小时" : "2 hours")}` }));
}

export function getLeadServiceLabel(service: LeadService, locale: Locale): string {
  const labels: Record<LeadService, { ms: string; en: string }> = {
    website: { ms: "Website", en: "Website" },
    system: { ms: "Sistem Full-Stack", en: "Full-Stack System" },
    coaching: { ms: "Coaching 1:1", en: "1:1 Coaching" },
  };
  return localized(labels[service], locale);
}

export function buildLeadSummary(input: {
  locale: Locale;
  service: LeadService;
  package?: LeadPackage;
  requirements: string;
  timeline?: string;
  budget?: string;
}): string {
  const { locale, service, package: selected, requirements, timeline, budget } = input;
  const greeting = locale === "ms" ? "Hai Syahmi, saya datang dari SYAHMIAOF Studio." : locale === "zh-Hans" ? "你好 Syahmi，我通过 SYAHMIAOF Studio 找到你。" : "Hi Syahmi, I found you through SYAHMIAOF Studio.";
  const lines = [
    greeting,
    "",
    `${locale === "ms" ? "Servis" : locale === "zh-Hans" ? "服务" : "Service"}: ${getLeadServiceLabel(service, locale)}`,
    selected ? `${locale === "ms" ? "Pakej" : locale === "zh-Hans" ? "配套" : "Package"}: ${selected.label} — ${selected.price}` : "",
    requirements.trim() ? `${locale === "ms" ? "Keperluan projek" : locale === "zh-Hans" ? "项目需求" : "Project needs"}: ${requirements.trim()}` : "",
    timeline?.trim() ? `${locale === "ms" ? "Timeline pilihan" : locale === "zh-Hans" ? "期望时间" : "Preferred timeline"}: ${timeline.trim()}` : "",
    budget?.trim() ? `${locale === "ms" ? "Bajet pilihan" : locale === "zh-Hans" ? "预算范围" : "Optional budget"}: ${budget.trim()}` : "",
    "",
    locale === "ms" ? "Boleh kita bincang lanjut?" : locale === "zh-Hans" ? "我们可以进一步讨论吗？" : "Could we discuss this further?",
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(phone: string, summary: string): string {
  const normalizedPhone = phone.replace(/\D/g, "");
  if (!/^[1-9]\d{7,14}$/.test(normalizedPhone)) throw new Error("WhatsApp number is not configured correctly.");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(summary)}`;
}

export function maintenanceLabel(id: string, locale: Locale): string | undefined {
  const option = MAINTENANCE_OPTIONS.find((item) => item.id === id && id !== "none");
  return option ? `${localized(option.name, locale)} — ${localized(option.priceDisplay, locale)}` : undefined;
}
