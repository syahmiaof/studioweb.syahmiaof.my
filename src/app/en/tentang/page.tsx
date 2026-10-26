import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

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

export default function EnglishAboutPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("en", "tentang", searchParams);
}
