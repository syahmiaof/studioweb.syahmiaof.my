import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "Tentang Syahmi AOF — SYAHMIAOF STUDIO",
  description:
    "Latar belakang sebenar Syahmi AOF, Pembangun Web & pelajar IT (Cloud Computing) di TVETMARA Besut. Standard integriti kejuruteraan tanpa dakwaan palsu.",
  alternates: {
    canonical: "https://studioweb.syahmiaof.my/tentang",
    languages: {
      ms: "https://studioweb.syahmiaof.my/tentang",
      en: "https://studioweb.syahmiaof.my/en/tentang",
    },
  },
};

export default function AboutPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("ms", "tentang", searchParams);
}
