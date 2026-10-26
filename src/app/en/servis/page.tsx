import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "Web Services & Bespoke Systems — SYAHMIAOF STUDIO",
  description:
    "High-impact Frontend UI development, GSAP animation choreography, and custom database-backed full-stack systems by Syahmi AOF.",
  alternates: {
    canonical: "https://studioweb.syahmiaof.my/en/servis",
    languages: {
      ms: "https://studioweb.syahmiaof.my/servis",
      en: "https://studioweb.syahmiaof.my/en/servis",
    },
  },
};

export default function EnglishServicesPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("en", "servis", searchParams);
}
