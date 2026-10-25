import { Metadata } from "next";
import { CoachingView } from "@/components/pages/CoachingView";

export const metadata: Metadata = {
  title: "Sesi Coaching 1:1 Web Development — SYAHMIAOF STUDIO",
  description:
    "Bimbingan peribadi 1:1 bersama Syahmi AOF. Asas Web, React/Next.js moden, dan mentor ulasan kod projek sebenar.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/coaching",
    languages: {
      ms: "https://studio.syahmiaof.my/coaching",
      en: "https://studio.syahmiaof.my/en/coaching",
    },
  },
};

export default function CoachingPage() {
  return <CoachingView locale="ms" />;
}
