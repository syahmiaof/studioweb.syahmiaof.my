import { PricingPackage, PricingAddon } from "../types";

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "landing",
    name: {
      ms: "Frontend Landing",
      en: "Frontend Landing",
    },
    tagline: {
      ms: "Halaman pendaratan tunggal berimpak tinggi & konversi maksimum.",
      en: "High-impact single landing page designed for maximum conversion.",
    },
    basePrice: 645,
    priceDisplay: "RM645",
    scopeSummary: {
      ms: "1 Halaman Fokus • Responsif Penuh • Integrasi WhatsApp • SEO Asas",
      en: "1 Focus Page • Fully Responsive • WhatsApp Integration • Basic SEO",
    },
    deliverables: {
      ms: [
        "1 Halaman responsif desktop & mobile",
        "Hero section brutalist berimpak tinggi",
        "Salinan jualan & borang ringkas / butang WhatsApp",
        "Optimum kelajuan Core Web Vitals",
        "Penyerahan kod sumber penuh",
      ],
      en: [
        "1 responsive page (desktop & mobile)",
        "High-impact brutalist hero section",
        "Sales copy layout & quick WhatsApp/contact CTA",
        "Core Web Vitals speed optimization",
        "Full clean source code delivery",
      ],
    },
  },
  {
    id: "business",
    name: {
      ms: "Frontend Business",
      en: "Frontend Business",
    },
    tagline: {
      ms: "Laman web perniagaan lengkap ~5 halaman dengan identiti visual tersendiri.",
      en: "Complete ~5-page corporate website with distinctive brand identity.",
    },
    basePrice: 1745,
    priceDisplay: "RM1,745",
    scopeSummary: {
      ms: "~5 Halaman (Utama, Servis, Tentang, Portfolio, Hubungi) • Navigasi Penuh",
      en: "~5 Pages (Home, Services, About, Portfolio, Contact) • Full Navigation",
    },
    deliverables: {
      ms: [
        "Struktur ~5 halaman tersusun",
        "Seni visual Digital Brutalism konsisten",
        "Borang pertanyaan interaktif dengan pengesahan",
        "Integrasi analitik & metadata SEO lengkap",
        "Penyelarasan micro-interactions asas",
      ],
      en: [
        "Structured ~5-page architecture",
        "Consistent Digital Brutalism art direction",
        "Interactive inquiry form with validation",
        "Analytics integration & full SEO metadata",
        "Subtle UI micro-interactions",
      ],
    },
  },
  {
    id: "premium",
    name: {
      ms: "Frontend Premium",
      en: "Frontend Premium",
    },
    tagline: {
      ms: "Pengalaman web bertaraf galeri antarabangsa dengan visual sinematik tersuai.",
      en: "International gallery-grade web experience with custom cinematic visuals.",
    },
    basePrice: 2995,
    priceDisplay: "RM2,995",
    scopeSummary: {
      ms: "Skop Tersuai • Interaktiviti Penuh • Arahan Seni Eksklusif",
      en: "Custom Scope • Full Interactivity • Exclusive Art Direction",
    },
    deliverables: {
      ms: [
        "Struktur halaman komprehensif & interaktif",
        "Animasi tersuai GSAP ScrollTrigger",
        "Komposisi visual 3D & perspektif dinamik",
        "Audit kebolehcapaian & ujian prestasi mendalam",
        "Sokongan teknikal keutamaan selepas pelancaran",
      ],
      en: [
        "Comprehensive & interactive page structure",
        "Custom GSAP ScrollTrigger timelines",
        "3D visual composition & dynamic perspective",
        "Accessibility audit & in-depth performance tests",
        "Priority post-launch technical support",
      ],
    },
  },
  {
    id: "custom-system",
    name: {
      ms: "Sistem Khas / Full-Stack",
      en: "Custom Full-Stack System",
    },
    tagline: {
      ms: "Aplikasi web berpusat pangkalan data, panel kawalan admin & automasi.",
      en: "Database-backed web application, admin dashboards & custom workflows.",
    },
    basePrice: 3250,
    priceDisplay: "Bermula RM3,250",
    isFullStack: true,
    scopeSummary: {
      ms: "Pangkalan Data • Autentikasi Pengguna • Dashboard Pengurusan • Integrasi API",
      en: "Database • User Auth • Management Dashboard • API Integrations",
    },
    deliverables: {
      ms: [
        "Senibina Next.js + Pangkalan Data (PostgreSQL/Supabase/Cloud SQL)",
        "Sistem pengesahan identiti pengguna & peranan (RBAC)",
        "Panel kawalan pentadbir (Admin Dashboard)",
        "Integrasi API pihak ketiga / Webhooks",
        "Sesi penemuan skop teknikal & sebut harga terperinci",
      ],
      en: [
        "Next.js + Database Architecture (PostgreSQL/Supabase/Cloud SQL)",
        "User authentication & role-based access control (RBAC)",
        "Secure Admin Management Dashboard",
        "Third-party API & Webhook integrations",
        "Technical discovery session & detailed formal quotation",
      ],
    },
  },
];

export const PRICING_ADDONS: PricingAddon[] = [
  {
    id: "animation",
    name: {
      ms: "Animasi Interaktif Lanjutan (GSAP)",
      en: "Advanced Interactive Animation (GSAP)",
    },
    description: {
      ms: "Peralihan skrol sinematik, efek perspektif kad 3D & micro-interactions interaktif.",
      en: "Cinematic scroll transitions, 3D card perspective effects & interactive micro-interactions.",
    },
    price: 400,
  },
  {
    id: "second-lang",
    name: {
      ms: "Bahasa Tambahan Laman Web (Klien)",
      en: "Client Website Additional Language",
    },
    description: {
      ms: "Sokongan dwibahasa (cth: BM + EN) untuk laman web anda dengan penukar bahasa lancar.",
      en: "Bilingual support (e.g. BM + EN) for your website with seamless language toggle.",
    },
    price: 250,
  },
];

export function getPackageById(id: string): PricingPackage | undefined {
  return PRICING_PACKAGES.find((pkg) => pkg.id === id);
}

export function getAddonById(id: string): PricingAddon | undefined {
  return PRICING_ADDONS.find((addon) => addon.id === id);
}

export function calculateFrontendEstimate(
  packageId: string,
  selectedAddonIds: string[] = []
): {
  basePrice: number;
  addonsTotal: number;
  total: number;
  isFullStack: boolean;
  breakdown: Array<{ name: string; price: number }>;
} {
  const pkg = getPackageById(packageId) || PRICING_PACKAGES[0];
  const isFullStack = Boolean(pkg.isFullStack);

  if (isFullStack) {
    return {
      basePrice: pkg.basePrice,
      addonsTotal: 0,
      total: pkg.basePrice,
      isFullStack: true,
      breakdown: [{ name: pkg.name.ms, price: pkg.basePrice }],
    };
  }

  const basePrice = pkg.basePrice;
  let addonsTotal = 0;
  const breakdown: Array<{ name: string; price: number }> = [
    { name: pkg.name.ms, price: basePrice },
  ];

  for (const addonId of selectedAddonIds) {
    const addon = getAddonById(addonId);
    if (addon) {
      addonsTotal += addon.price;
      breakdown.push({ name: addon.name.ms, price: addon.price });
    }
  }

  return {
    basePrice,
    addonsTotal,
    total: basePrice + addonsTotal,
    isFullStack: false,
    breakdown,
  };
}

export function formatMYR(amount: number): string {
  if (isNaN(amount)) return "RM0";
  return `RM${amount.toLocaleString("en-MY")}`;
}
