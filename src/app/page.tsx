import { Metadata } from "next";
import { StudioJourney } from "@/components/pages/StudioJourney";

export const metadata: Metadata = {
  title: "Freelance Web Services — SYAHMIAOF STUDIO",
  description:
    "Landing page, website bisnes dan sistem custom premium, interaktif dan responsif oleh Syahmi AOF.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/",
    languages: {
      ms: "https://studio.syahmiaof.my/",
      en: "https://studio.syahmiaof.my/en",
    },
  },
};

export default function HomePage() {
  return <StudioJourney locale="ms" />;
}
