import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "Portfolio & Digital Experiments — SYAHMIAOF STUDIO",
  description:
    "Curated collection of UI prototypes, design systems, and component architectures by Syahmi AOF. Transparently labeled.",
  alternates: {
    canonical: "https://studioweb.syahmiaof.my/en/portfolio",
    languages: {
      ms: "https://studioweb.syahmiaof.my/portfolio",
      en: "https://studioweb.syahmiaof.my/en/portfolio",
    },
  },
};

export default function EnglishPortfolioPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("en", "portfolio", searchParams);
}
