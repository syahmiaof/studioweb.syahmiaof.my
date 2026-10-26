import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "Perkhidmatan Web & Sistem Khas — SYAHMIAOF STUDIO",
  description:
    "Pembangunan Frontend berimpak visual tinggi, animasi GSAP, dan Sistem Khas Full-Stack berasaskan pangkalan data oleh Syahmi AOF.",
  alternates: {
    canonical: "https://studioweb.syahmiaof.my/servis",
    languages: {
      ms: "https://studioweb.syahmiaof.my/servis",
      en: "https://studioweb.syahmiaof.my/en/servis",
    },
  },
};

export default function ServicesPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("ms", "servis", searchParams);
}
