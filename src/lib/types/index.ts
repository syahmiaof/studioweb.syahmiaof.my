export type Locale = "ms" | "en";

export type ServiceCategory = "website-ui" | "full-stack" | "coaching";
export type MaintenanceId =
  | "none"
  | "pay-per-task"
  | "website-care"
  | "system-care";
export type CoachingPackageId =
  | "basic-frontend"
  | "advanced-frontend"
  | "full-stack-system";

export interface PricingPackage {
  id: "landing" | "business" | "premium";
  name: {
    ms: string;
    en: string;
  };
  tagline: {
    ms: string;
    en: string;
  };
  basePrice: number; // 0 for custom system or custom quote
  priceDisplay: string;
  scopeSummary: {
    ms: string;
    en: string;
  };
  deliverables: {
    ms: string[];
    en: string[];
  };
}

export interface PricingAddon {
  id: "extra-page" | "advanced-animation" | "cinematic-animation";
  name: {
    ms: string;
    en: string;
  };
  description: {
    ms: string;
    en: string;
  };
  price: number;
  group: "page" | "animation";
}

export interface SystemOffer {
  id: "booking-request" | "dashboard-lite" | "advanced-system";
  name: { ms: string; en: string };
  priceDisplay: string;
  priceKind: "fixed" | "from" | "quote";
  scopeSummary: { ms: string; en: string };
  deliverables: { ms: string[]; en: string[] };
}

export interface MaintenanceOption {
  id: MaintenanceId;
  name: { ms: string; en: string };
  priceDisplay: { ms: string; en: string };
  cadence: "none" | "per-task" | "monthly";
  description: { ms: string; en: string };
  includes: { ms: string[]; en: string[] };
  excludes: { ms: string[]; en: string[] };
}

export interface ServiceFeature {
  title: { ms: string; en: string };
  description: { ms: string; en: string };
}

export interface ServiceCategoryDetail {
  id: "frontend" | "fullstack";
  badge: { ms: string; en: string };
  title: { ms: string; en: string };
  tagline: { ms: string; en: string };
  description: { ms: string; en: string };
  features: ServiceFeature[];
  deliverables: { ms: string[]; en: string[] };
  boundaries: { ms: string[]; en: string[] };
  startingPrice: string;
  ctaText: { ms: string; en: string };
  ctaLink: string;
}

export interface CoachingPackage {
  id: CoachingPackageId;
  name: { ms: string; en: string };
  durationMinutes: 60 | 120;
  price: 39 | 99;
  description: { ms: string; en: string };
  includes: { ms: string[]; en: string[] };
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Frontend UI" | "Full-Stack Concept" | "Design System" | "Mobile Prototype";
  status: "DEMO KONSEP" | "PROJEK SEBENAR";
  statusEn: "CONCEPT DEMO" | "REAL PROJECT";
  tagline: {
    ms: string;
    en: string;
  };
  description: {
    ms: string;
    en: string;
  };
  stack: string[];
  role: string;
  image: string;
  liveUrl?: string;
  demoNote?: {
    ms: string;
    en: string;
  };
}

export interface CoachingTopic {
  id: "web-fundamentals" | "react-next" | "project-mentorship";
  title: {
    ms: string;
    en: string;
  };
  subtitle: {
    ms: string;
    en: string;
  };
  description: {
    ms: string;
    en: string;
  };
  points: {
    ms: string[];
    en: string[];
  };
}

export interface InquiryPayload {
  service: ServiceCategory;
  name: string;
  contact: string;
  message: string;
  packageId?: string;
  packageName?: string;
  addons?: string[];
  estimatedTotal?: number;
  coachingTopic?: string;
  coachingDuration?: "60" | "90" | "120";
  coachingPackageId?: CoachingPackageId;
  maintenanceId?: MaintenanceId;
  honeypot?: string;
}
