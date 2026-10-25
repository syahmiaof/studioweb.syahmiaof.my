import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://studio.syahmiaof.my"),
  title: "SYAHMIAOF STUDIO — Digital Brutalism Web Development & 1:1 Coaching",
  description:
    "Studio pembangunan web oleh Syahmi AOF. Rekaan Digital Brutalism berimpak tinggi, pantas, interaktif & sistem khas berprestasi tinggi di Besut, Terengganu.",
  keywords: [
    "Syahmi AOF",
    "SYAHMIAOF STUDIO",
    "Digital Brutalism",
    "Web Developer Malaysia",
    "Next.js Developer",
    "Coaching Web Development",
    "TVETMARA Besut",
  ],
  authors: [{ name: "Syahmi AOF", url: "https://studio.syahmiaof.my" }],
  openGraph: {
    title: "SYAHMIAOF STUDIO — WEB YANG BUKAN BIASA",
    description:
      "Rekaan web Digital Brutalism sinematik, pantas & berorientasikan konversi oleh Syahmi AOF.",
    url: "https://studio.syahmiaof.my",
    siteName: "SYAHMIAOF STUDIO",
    images: [
      {
        url: "/assets/references/01-home.png",
        width: 1672,
        height: 941,
        alt: "SYAHMIAOF STUDIO Hero B",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYAHMIAOF STUDIO — WEB YANG BUKAN BIASA",
    description: "Digital Brutalism web development & bespoke systems by Syahmi AOF.",
    images: ["/assets/references/01-home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Oswald:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-ink text-white font-sans selection:bg-acid selection:text-ink">
        {children}
      </body>
    </html>
  );
}
