import type { Locale, ProjectItem, ProjectStatus } from "../lib/types";

export const PROJECTS: ProjectItem[] = [
  { id: "sakura-store", slug: "sakura-store", title: "Sakura Store", category: { ms: "E-dagang · Kedai", en: "E-Commerce · Store", "zh-Hans": "电子商务 · 商店" }, status: "completed", liveUrl: "https://sakurastore.syahmiaof.my" },
  { id: "uber-pokmi", slug: "uber-pokmi", title: "Uber Pokmi", category: { ms: "UI Frontend · Aplikasi perjalanan", en: "Frontend UI · Ride App", "zh-Hans": "前端界面 · 出行应用" }, status: "completed", liveUrl: "https://uberpokmi.syahmiaof.my" },
  { id: "ayam-gepuk-pokmi", slug: "ayam-gepuk-pokmi", title: "Ayam Gepuk Pokmi", category: { ms: "UI Frontend · Makanan & minuman", en: "Frontend UI · Food & Beverage", "zh-Hans": "前端界面 · 餐饮" }, status: "completed", liveUrl: "https://ayamgepukpokmi.syahmiaof.my" },
  { id: "sistem-aduan-asrama", slug: "sistem-aduan-asrama-ikm-besut", title: "Sistem Aduan Asrama IKM Besut", category: { ms: "Sistem web · Pengurusan", en: "Web System · Management", "zh-Hans": "网站系统 · 管理" }, status: "completed", liveUrl: "https://sistemaduanasrama.syahmiaof.my" },
  { id: "nurizmabridal", slug: "nurizmabridal", title: "Nurizmabridal", category: { ms: "Servis pengantin & inai", en: "Bridal & Henna Service", "zh-Hans": "新娘与海娜服务" }, status: "completed", liveUrl: "https://henna.nurizmabridal.my" },
  { id: "gayongx-platform", slug: "gayongx-platform", title: "GayongX — Website, Account & CMS", category: { ms: "Platform web Silat Gayong", en: "Silat Gayong Web Platform", "zh-Hans": "Gayong 武术网站平台" }, status: "on-hold", liveUrl: "https://gayongx.syahmiaof.my" },
  { id: "gayongx-warisan", slug: "gayongx-warisan", title: "Game GayongX: WARISAN", category: { ms: "Permainan web · Warisan silat", en: "Web Game · Silat Heritage", "zh-Hans": "网页游戏 · 武术文化传承" }, status: "completed", liveUrl: "https://gamegayongx-warisan.syahmiaof.my" },
  { id: "gayongx-athlete-analytics", slug: "gayongx-athlete-analytics", title: "GayongX Athlete Analytics", category: { ms: "Sains sukan · Analitik atlet", en: "Sports Science · Athlete Analytics", "zh-Hans": "运动科学 · 运动员分析" }, status: "on-hold", liveUrl: "https://gxaa.syahmiaof.my" },
  { id: "lamborghini", slug: "lamborghini", title: "Lamborghini", category: { ms: "Showcase · Pengalaman web", en: "Showcase · Web Experience", "zh-Hans": "展示项目 · 网页体验" }, status: "completed", liveUrl: "https://lamborghini.syahmiaof.my" },
  { id: "modul-meta-ads-ai", slug: "modul-meta-ads-ai", title: "Modul Meta Ads + AI", category: { ms: "Pendidikan · Platform pemasaran", en: "Education · Marketing Platform", "zh-Hans": "教育 · 营销平台" }, status: "completed", liveUrl: "https://modul-meta-ads.syahmiaof.my" },
  { id: "statushd", slug: "statushd", title: "StatusHD", category: { ms: "Alat web · Utiliti media", en: "Web Tool · Media Utility", "zh-Hans": "网页工具 · 媒体实用工具" }, status: "on-hold", liveUrl: "https://statushd.syahmiaof.my" },
  { id: "jarvis", slug: "jarvis", title: "Jarvis", category: { ms: "Sistem pembantu AI", en: "AI Assistant System", "zh-Hans": "AI 助手系统" }, status: "on-hold", liveUrl: "https://jarvis.syahmiaof.my" },
  { id: "cerviscan-ai", slug: "cerviscan-ai", title: "CerviScan-AI", category: { ms: "HealthTech · Imbasan perubatan AI", en: "HealthTech · AI Medical Scan", "zh-Hans": "医疗科技 · AI 医学扫描" }, status: "on-hold", liveUrl: "https://cerviscan-ai.syahmiaof.my" },
  { id: "crypto-ai", slug: "crypto-ai", title: "Crypto AI", category: { ms: "Web3 · Analitik dagangan", en: "Web3 · Trading Analytics", "zh-Hans": "Web3 · 交易分析" }, status: "on-hold", liveUrl: "https://cryptoai.syahmiaof.my" },
  { id: "nemo", slug: "nemo", title: "Nemo", category: { ms: "Produktiviti peribadi · Second brain", en: "Personal Productivity · Second Brain", "zh-Hans": "个人效率 · 第二大脑" }, status: "completed", liveUrl: "https://nemo.syahmiaof.my" },
  { id: "siapsatu", slug: "siapsatu", title: "SiapSatu", category: { ms: "Automasi bisnes · Agensi", en: "Business Automation · Agency", "zh-Hans": "商业自动化 · 代理机构" }, status: "on-hold", liveUrl: "https://siapsatu.syahmiaof.my" },
  { id: "syahmiaof-portfolio", slug: "syahmiaof-portfolio", title: "Website Portfolio Syahmiaof", category: { ms: "Portfolio & bio peribadi", en: "Personal Portfolio & Bio", "zh-Hans": "个人作品集与简介" }, status: "completed", liveUrl: "https://syahmiaof.my" },
  { id: "symi-yogurt", slug: "symi-ui", title: "Symi Yogurt", category: { ms: "Makanan & minuman · Showcase jenama", en: "Food & Beverage · Brand Showcase", "zh-Hans": "餐饮 · 品牌展示" }, status: "on-hold", liveUrl: "https://symi.syahmiaof.my" },
  { id: "greetly", slug: "greetly", title: "Greetly", category: { ms: "SaaS · Penjana kad ucapan", en: "SaaS · Greeting Card Generator", "zh-Hans": "SaaS · 贺卡生成器" }, status: "completed", liveUrl: "https://greetly.syahmiaof.my" },
  { id: "daeng-kuning", slug: "daeng-kuning", title: "Daeng Kuning", category: { ms: "Jenama · Laman warisan", en: "Brand · Heritage Website", "zh-Hans": "品牌 · 文化传承网站" }, status: "completed", liveUrl: "https://daengkuning.my" },
  { id: "jiwa-fighter", slug: "jiwa-fighter-official", title: "Jiwa Fighter Official Website", category: { ms: "Platform jenama & media", en: "Brand & Media Platform", "zh-Hans": "品牌与媒体平台" }, status: "in-progress" },
  { id: "story-syahmiaof", slug: "story-syahmiaof", title: "Story Syahmiaof", category: { ms: "Cerita peribadi · Blog", en: "Personal Stories · Blog", "zh-Hans": "个人故事 · 博客" }, status: "in-progress" },
  { id: "studio-syahmiaof", slug: "studio-syahmiaof", title: "Studio Syahmiaof", category: { ms: "Studio kreatif · Agensi", en: "Creative Studio · Agency", "zh-Hans": "创意工作室 · 代理机构" }, status: "in-progress" },
];

export const PROJECT_STATUS_LABELS: Record<Locale, Record<ProjectStatus, string>> = {
  ms: { completed: "Selesai", "in-progress": "Sedang dibina", "on-hold": "Ditangguhkan" },
  en: { completed: "Completed", "in-progress": "In progress", "on-hold": "On hold" },
  "zh-Hans": { completed: "已完成", "in-progress": "进行中", "on-hold": "暂缓" },
};
