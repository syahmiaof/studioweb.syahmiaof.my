import { Metadata } from "next";
import { CoachingView } from "@/components/pages/CoachingView";

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

export default function EnglishCoachingPage() {
  return <CoachingView locale="en" />;
}
