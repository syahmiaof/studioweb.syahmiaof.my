export type Locale = "ms" | "en";

export type ServiceCategory = "website-ui" | "full-stack" | "coaching";

export interface PricingPackage {
  id: "landing" | "business" | "premium" | "custom-system";
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
  isFullStack?: boolean;
}

export interface PricingAddon {
  id: "animation" | "second-lang";
  name: {
    ms: string;
    en: string;
  };
  description: {
    ms: string;
    en: string;
  };
  price: number;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Frontend UI" | "Full-Stack Concept" | "Design System" | "Mobile Prototype";
  status: "KONSEP DEMO" | "EKSPERIMENTAL" | "FRONTEND DEMO";
  statusEn: "CONCEPT DEMO" | "EXPERIMENTAL" | "FRONTEND DEMO";
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
  coachingDuration?: "60" | "90";
  honeypot?: string;
}
