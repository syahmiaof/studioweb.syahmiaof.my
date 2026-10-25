import { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "About Syahmi AOF — SYAHMIAOF STUDIO",
  description:
    "Factual background of Syahmi AOF, Web Developer & IT (Cloud Computing) student at TVETMARA Besut. Engineering integrity and no false claims.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/en/tentang",
    languages: {
      ms: "https://studio.syahmiaof.my/tentang",
      en: "https://studio.syahmiaof.my/en/tentang",
    },
  },
};

export default function EnglishAboutPage() {
  return <AboutView locale="en" />;
}
