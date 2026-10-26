import { Metadata } from "next";
import { StudioJourney } from "@/components/pages/StudioJourney";

export const metadata: Metadata = {
  title: "Freelance Web Services — SYAHMIAOF STUDIO",
  description:
    "Landing page, website bisnes dan sistem custom premium, interaktif dan responsif oleh Syahmi AOF.",
  alternates: {
    canonical: "https://studioweb.syahmiaof.my/",
    languages: {
      ms: "https://studioweb.syahmiaof.my/",
      en: "https://studioweb.syahmiaof.my/en",
      "zh-Hans": "https://studioweb.syahmiaof.my/zh",
    },
  },
  openGraph: {
    title: "Freelance Web Services — SYAHMIAOF STUDIO",
    description: "Landing page, website bisnes dan sistem custom premium oleh Syahmi AOF.",
    url: "https://studioweb.syahmiaof.my/",
    locale: "ms_MY",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Freelance Web Services — SYAHMIAOF Studio" }],
  },
  twitter: { card: "summary_large_image", title: "Freelance Web Services — SYAHMIAOF STUDIO", images: ["/opengraph-image.png"] },
};

export default function HomePage() {
  return <StudioJourney locale="ms" />;
}
