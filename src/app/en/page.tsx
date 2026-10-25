import { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "SYAHMIAOF STUDIO — WEB THAT IS BEYOND ORDINARY",
  description:
    "Web engineering studio led by Syahmi AOF. High-impact Digital Brutalism web development, extreme speed & bespoke systems.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/en",
    languages: {
      ms: "https://studio.syahmiaof.my/",
      en: "https://studio.syahmiaof.my/en",
    },
  },
};

export default function EnglishHomePage() {
  return <HomeView locale="en" />;
}
