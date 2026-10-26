import { Metadata } from "next";
import { redirectLegacySection, type LegacySectionPageProps } from "@/lib/routing/legacySectionRedirect";

export const metadata: Metadata = {
  title: "1:1 Web Development Coaching — SYAHMIAOF STUDIO",
  description:
    "Personalized 1:1 mentorship sessions with Syahmi AOF. Web fundamentals, React/Next.js architecture, and real-world project code review.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/en/coaching",
    languages: {
      ms: "https://studio.syahmiaof.my/coaching",
      en: "https://studio.syahmiaof.my/en/coaching",
    },
  },
};

export default function EnglishCoachingPage({ searchParams }: LegacySectionPageProps) {
  return redirectLegacySection("en", "coaching", searchParams);
}
