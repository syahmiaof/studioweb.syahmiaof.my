import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "Pricing Studio & Cost Estimator — SYAHMIAOF STUDIO",
  description:
    "Website packages from RM299, a basic booking request for RM499 and scoped quotes for custom business systems.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/en/harga",
    languages: {
      ms: "https://studio.syahmiaof.my/harga",
      en: "https://studio.syahmiaof.my/en/harga",
    },
  },
};

export default function EnglishPricingPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("en", "harga", searchParams);
}
