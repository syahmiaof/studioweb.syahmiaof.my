import type { Metadata } from "next";
import { StudioJourney } from "@/components/pages/StudioJourney";

export const metadata: Metadata = {
  title: "网站开发与定制系统 — SYAHMIAOF STUDIO",
  description: "Syahmi AOF 提供网站、商业网页与定制系统开发服务，起价 RM299。",
  alternates: { canonical: "https://studioweb.syahmiaof.my/zh", languages: { ms: "https://studioweb.syahmiaof.my/", en: "https://studioweb.syahmiaof.my/en", "zh-Hans": "https://studioweb.syahmiaof.my/zh" } },
  openGraph: { title: "网站开发与定制系统 — SYAHMIAOF STUDIO", description: "高品质着陆页、商业网站与定制系统，由 Syahmi AOF 打造。", url: "https://studioweb.syahmiaof.my/zh", locale: "zh_CN", type: "website", images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "SYAHMIAOF Studio 网站开发" }] },
  twitter: { card: "summary_large_image", title: "SYAHMIAOF STUDIO 网站开发", description: "着陆页、商业网站与定制系统开发。", images: ["/opengraph-image.png"] },
};

export default function ChineseHomePage() {
  return <StudioJourney locale="zh-Hans" />;
}
