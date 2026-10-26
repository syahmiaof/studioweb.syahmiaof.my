import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/astra-v21.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://studio.syahmiaof.my"),
  title: "Freelance Web Services — SYAHMIAOF STUDIO",
  description:
    "Landing page, website bisnes dan sistem custom premium, interaktif dan responsif oleh Syahmi AOF.",
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
    title: "Freelance Web Services — SYAHMIAOF STUDIO",
    description:
      "Landing page, websites and custom systems crafted by SYAHMIAOF Studio.",
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
        <link rel="preload" href="/fonts/Anton-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-ink text-white font-sans selection:bg-acid selection:text-ink">
        {children}
      </body>
    </html>
  );
}
