import { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "SYAHMIAOF STUDIO — WEB YANG BUKAN BIASA",
  description:
    "Studio pembangunan web oleh Syahmi AOF. Rekaan Digital Brutalism berimpak tinggi, kelajuan ekstrem & sistem khas berprestasi tinggi.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/",
    languages: {
      ms: "https://studio.syahmiaof.my/",
      en: "https://studio.syahmiaof.my/en",
    },
  },
};

export default function HomePage() {
  return <HomeView locale="ms" />;
}
