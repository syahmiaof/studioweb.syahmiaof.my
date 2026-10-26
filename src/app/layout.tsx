import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/astra-v21.css";
import "@/styles/assistant.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://studioweb.syahmiaof.my"),
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
  authors: [{ name: "Syahmi AOF", url: "https://studioweb.syahmiaof.my" }],
  alternates: { canonical: "https://studioweb.syahmiaof.my/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Freelance Web Services — SYAHMIAOF STUDIO",
    description:
      "Landing page, websites and custom systems crafted by SYAHMIAOF Studio.",
    url: "https://studioweb.syahmiaof.my",
    siteName: "SYAHMIAOF STUDIO",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Freelance Web Services — SYAHMIAOF Studio",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Services — SYAHMIAOF STUDIO",
    description: "Landing page, website bisnes dan sistem custom premium oleh Syahmi AOF.",
    images: ["/opengraph-image.png"],
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
