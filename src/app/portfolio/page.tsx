import { Metadata } from "next";
import { PortfolioView } from "@/components/pages/PortfolioView";

export const metadata: Metadata = {
  title: "Portfolio & Eksperimen Digital — SYAHMIAOF STUDIO",
  description:
    "Koleksi prototaip, konsep reka bentuk antaramuka dan sistem komponen web oleh Syahmi AOF. Dilabelkan secara telus & jujur.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/portfolio",
    languages: {
      ms: "https://studio.syahmiaof.my/portfolio",
      en: "https://studio.syahmiaof.my/en/portfolio",
    },
  },
};

export default function PortfolioPage() {
  return <PortfolioView locale="ms" />;
}
