import { Metadata } from "next";
import { StudioJourney } from "@/components/pages/StudioJourney";

export const metadata: Metadata = {
  title: "Freelance Web Services — SYAHMIAOF STUDIO",
  description:
    "Premium, interactive and responsive landing pages, business websites and custom systems by Syahmi AOF.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/en",
    languages: {
      ms: "https://studio.syahmiaof.my/",
      en: "https://studio.syahmiaof.my/en",
    },
  },
};

export default function EnglishHomePage() {
  return <StudioJourney locale="en" />;
}
