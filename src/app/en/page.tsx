import { Metadata } from "next";
import { StudioJourney } from "@/components/pages/StudioJourney";

export const metadata: Metadata = {
  title: "Freelance Web Services — SYAHMIAOF STUDIO",
  description:
    "Premium, interactive and responsive landing pages, business websites and custom systems by Syahmi AOF.",
  alternates: {
    canonical: "https://studioweb.syahmiaof.my/en",
    languages: {
      ms: "https://studioweb.syahmiaof.my/",
      en: "https://studioweb.syahmiaof.my/en",
      "zh-Hans": "https://studioweb.syahmiaof.my/zh",
    },
  },
  openGraph: {
    title: "Freelance Web Services — SYAHMIAOF STUDIO",
    description: "Premium landing pages, business websites and custom systems by Syahmi AOF.",
    url: "https://studioweb.syahmiaof.my/en",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Freelance Web Services — SYAHMIAOF Studio" }],
  },
  twitter: { card: "summary_large_image", title: "Freelance Web Services — SYAHMIAOF STUDIO", images: ["/opengraph-image.png"] },
};

export default function EnglishHomePage() {
  return <StudioJourney locale="en" />;
}
