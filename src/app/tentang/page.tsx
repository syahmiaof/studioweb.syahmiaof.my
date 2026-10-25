import { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "Tentang Syahmi AOF — SYAHMIAOF STUDIO",
  description:
    "Latar belakang sebenar Syahmi AOF, Pembangun Web & pelajar IT (Cloud Computing) di TVETMARA Besut. Standard integriti kejuruteraan tanpa dakwaan palsu.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/tentang",
    languages: {
      ms: "https://studio.syahmiaof.my/tentang",
      en: "https://studio.syahmiaof.my/en/tentang",
    },
  },
};

export default function AboutPage() {
  return <AboutView locale="ms" />;
}
