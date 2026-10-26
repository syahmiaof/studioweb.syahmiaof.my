import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "Pricing Studio & Pengira Anggaran — SYAHMIAOF STUDIO",
  description:
    "Pakej website dari RM299, sistem tempahan RM499 dan sebut harga untuk sistem bisnes tersuai.",
  alternates: {
    canonical: "https://studioweb.syahmiaof.my/harga",
    languages: {
      ms: "https://studioweb.syahmiaof.my/harga",
      en: "https://studioweb.syahmiaof.my/en/harga",
    },
  },
};

export default function PricingPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("ms", "harga", searchParams);
}
