import { Metadata } from "next";
import { PricingView } from "@/components/pages/PricingView";

export const metadata: Metadata = {
  title: "Pricing Studio & Pengira Anggaran — SYAHMIAOF STUDIO",
  description:
    "Kalkulator sebut harga telus untuk laman web anda. Pakej Frontend bermula RM645, sistem khas bermula RM3,250.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/harga",
    languages: {
      ms: "https://studio.syahmiaof.my/harga",
      en: "https://studio.syahmiaof.my/en/harga",
    },
  },
};

export default function PricingPage() {
  return <PricingView locale="ms" />;
}
