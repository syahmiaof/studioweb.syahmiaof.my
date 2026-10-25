import { Metadata } from "next";
import { PricingView } from "@/components/pages/PricingView";

export const metadata: Metadata = {
  title: "Pricing Studio & Cost Estimator — SYAHMIAOF STUDIO",
  description:
    "Transparent pricing calculator for your next web project. Frontend packages from RM645, custom systems from RM3,250.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/en/harga",
    languages: {
      ms: "https://studio.syahmiaof.my/harga",
      en: "https://studio.syahmiaof.my/en/harga",
    },
  },
};

export default function EnglishPricingPage() {
  return <PricingView locale="en" />;
}
