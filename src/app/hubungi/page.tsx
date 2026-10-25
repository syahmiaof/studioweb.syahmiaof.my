import { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Hubungi & Mulakan Projek — SYAHMIAOF STUDIO",
  description:
    "IDEA KAU. KITA BINA. Hantar taklimat projek pembangunan web, sistem khas atau pertanyaan sesi coaching kepada Syahmi AOF.",
  alternates: {
    canonical: "https://studio.syahmiaof.my/hubungi",
    languages: {
      ms: "https://studio.syahmiaof.my/hubungi",
      en: "https://studio.syahmiaof.my/en/hubungi",
    },
  },
};

export default function ContactPage() {
  return <ContactView locale="ms" />;
}
