import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "Contact & Start Project — SYAHMIAOF STUDIO",
  description:
    "YOUR VISION. WE BUILD. Send your web development project brief, bespoke systems inquiry, or 1:1 coaching request to Syahmi AOF.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/en/hubungi",
    languages: {
      ms: "https://studio.syahmiaof.my/hubungi",
      en: "https://studio.syahmiaof.my/en/hubungi",
    },
  },
};

export default function EnglishContactPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("en", "hubungi", searchParams);
}
