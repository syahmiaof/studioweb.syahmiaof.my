import type {
  MaintenanceOption,
  PricingAddon,
  PricingPackage,
  SystemOffer,
} from "../types";

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "landing",
    name: { ms: "Landing Page", en: "Landing Page" },
    tagline: {
      ms: "Satu halaman responsif untuk terangkan tawaran dan mudahkan pelanggan menghubungi anda.",
      en: "One responsive page to explain your offer and help customers get in touch.",
    },
    basePrice: 299,
    priceDisplay: "RM299",
    scopeSummary: {
      ms: "1 halaman responsif · Hingga 6 seksyen · 2 pusingan revisi",
      en: "1 responsive page · Up to 6 sections · 2 revision rounds",
    },
    deliverables: {
      ms: [
        "1 halaman responsif dengan sehingga 6 seksyen kandungan",
        "Penyesuaian reka bentuk asas",
        "Pautan WhatsApp dan media sosial",
        "SEO asas pada halaman",
        "2 pusingan revisi terkumpul",
      ],
      en: [
        "1 responsive page with up to 6 content sections",
        "Basic design customization",
        "WhatsApp and social media links",
        "Basic on-page SEO",
        "2 consolidated revision rounds",
      ],
    },
  },
  {
    id: "business",
    name: { ms: "Laman Web Bisnes", en: "Business Website" },
    tagline: {
      ms: "Laman beberapa halaman untuk memperkenalkan bisnes, servis dan cara pelanggan menghubungi anda.",
      en: "A multi-page site to introduce your business, services and contact options.",
    },
    basePrice: 499,
    priceDisplay: "RM499",
    scopeSummary: {
      ms: "Hingga 5 halaman responsif · Navigasi · 2 pusingan revisi",
      en: "Up to 5 responsive pages · Navigation · 2 revision rounds",
    },
    deliverables: {
      ms: [
        "Hingga 5 halaman responsif",
        "Sistem reka bentuk standard yang konsisten",
        "Navigasi dan pautan hubungan",
        "SEO asas pada halaman",
        "2 pusingan revisi terkumpul",
      ],
      en: [
        "Up to 5 responsive pages",
        "Consistent standard design system",
        "Navigation and contact links",
        "Basic on-page SEO",
        "2 consolidated revision rounds",
      ],
    },
  },
  {
    id: "premium",
    name: { ms: "Laman Web Premium", en: "Premium Custom Website" },
    tagline: {
      ms: "Arah visual tersuai dengan kemasan UI/UX yang lebih terperinci.",
      en: "A custom visual direction with more refined UI/UX.",
    },
    basePrice: 999,
    priceDisplay: "RM999",
    scopeSummary: {
      ms: "Hingga 5 halaman responsif · Arah visual tersuai · 2 pusingan revisi",
      en: "Up to 5 responsive pages · Custom visual direction · 2 revision rounds",
    },
    deliverables: {
      ms: [
        "Hingga 5 halaman responsif",
        "Arah visual tersuai dan UI/UX lebih terperinci",
        "Animasi hover dan entrance asas",
        "SEO asas pada halaman",
        "2 pusingan revisi terkumpul",
      ],
      en: [
        "Up to 5 responsive pages",
        "Custom visual direction and refined UI/UX",
        "Basic hover and entrance animations",
        "Basic on-page SEO",
        "2 consolidated revision rounds",
      ],
    },
  },
];

export const SYSTEM_OFFERS: SystemOffer[] = [
  {
    id: "booking-request",
    name: { ms: "Permintaan Tempahan Asas", en: "Basic Booking Request" },
    priceDisplay: "RM499",
    priceKind: "fixed",
    scopeSummary: {
      ms: "Satu servis · Borang permintaan · Pengesahan tempahan dibuat secara manual oleh bisnes",
      en: "One service · Request form · Booking confirmed manually by the business",
    },
    deliverables: {
      ms: [
        "Borang ringkas untuk meminta satu jenis servis",
        "Pengesahan input asas dan notifikasi",
        "Bisnes mengesahkan tempahan secara manual",
      ],
      en: [
        "Simple request form for one service",
        "Basic validation and notification",
        "The business confirms each booking manually",
      ],
    },
  },
  {
    id: "dashboard-lite",
    name: { ms: "Dashboard SME Lite", en: "SME Dashboard Lite" },
    priceDisplay: "Dari RM999",
    priceKind: "from",
    scopeSummary: {
      ms: "Satu modul operasi kecil · Satu peranan admin · Satu aliran rekod asas",
      en: "One small operational module · One admin role · One basic record workflow",
    },
    deliverables: {
      ms: [
        "Satu modul operasi kecil yang ditentukan bersama",
        "Satu peranan admin dan satu aliran pengurusan rekod asas",
        "Pengesahan asas dan antaramuka dashboard",
        "Fungsi akhir ditetapkan dalam skop bertulis",
      ],
      en: [
        "One small operational module defined together",
        "One admin role and one basic record-management workflow",
        "Basic validation and dashboard UI",
        "Final functions are defined in a written scope",
      ],
    },
  },
  {
    id: "advanced-system",
    name: { ms: "Sistem Khas Lanjutan", en: "Advanced Custom System" },
    priceDisplay: "Lebih RM2,099",
    priceKind: "quote",
    scopeSummary: {
      ms: "Sebut harga selepas semakan keperluan, integrasi dan kerumitan fungsi",
      en: "Custom quote after reviewing requirements, integrations and feature complexity",
    },
    deliverables: {
      ms: [
        "Keperluan dan aliran kerja ditentukan semasa discovery",
        "Fungsi, integrasi dan harga dipersetujui dalam sebut harga bertulis",
        "Tiada jumlah tetap sebelum skop diluluskan",
      ],
      en: [
        "Requirements and workflows are scoped during discovery",
        "Features, integrations and price are agreed in a written quotation",
        "No fixed total is shown before scope approval",
      ],
    },
  },
];

export const INCLUDED_FREEBIES = [
  { ms: "Pautan media sosial", en: "Social media buttons" },
  { ms: "SEO asas pada halaman", en: "Basic on-page SEO" },
] as const;

export const PRICING_ADDONS: PricingAddon[] = [
  {
    id: "extra-page",
    name: { ms: "Halaman Standard Tambahan", en: "Extra Standard Page" },
    description: {
      ms: "Untuk halaman kandungan standard sahaja; bukan modul dashboard tambahan.",
      en: "For standard content pages only; not additional dashboard modules.",
    },
    price: 99,
    group: "page",
  },
  {
    id: "advanced-animation",
    name: { ms: "Animasi Lanjutan", en: "Advanced Animation" },
    description: {
      ms: "Satu tahap animasi untuk hover, entrance dan peralihan yang dipersetujui.",
      en: "One animation tier for agreed hover, entrance and transition effects.",
    },
    price: 99,
    group: "animation",
  },
  {
    id: "cinematic-animation",
    name: { ms: "Animasi Sinematik", en: "Cinematic Animation" },
    description: {
      ms: "Alternatif kepada Animasi Lanjutan untuk satu urutan yang dipersetujui.",
      en: "An alternative to Advanced Animation for one agreed sequence.",
    },
    price: 199,
    group: "animation",
  },
];

export const MAINTENANCE_OPTIONS: MaintenanceOption[] = [
  {
    id: "none",
    name: { ms: "Tiada penjagaan tambahan", en: "No additional care" },
    priceDisplay: { ms: "Pilihan", en: "Optional" },
    cadence: "none",
    description: {
      ms: "Pakej penjagaan tidak ditambah secara automatik.",
      en: "A care plan is not added automatically.",
    },
    includes: { ms: [], en: [] },
    excludes: { ms: [], en: [] },
  },
  {
    id: "pay-per-task",
    name: { ms: "Bayar Ikut Tugasan", en: "Pay Per Task" },
    priceDisplay: { ms: "Dari RM29 / tugasan", en: "From RM29 / task" },
    cadence: "per-task",
    description: {
      ms: "Satu perubahan kecil pada teks, imej atau pautan; sekitar 15 minit maksimum.",
      en: "One minor text, image or link change; approximately 15 minutes maximum.",
    },
    includes: {
      ms: ["Satu perubahan kandungan kecil yang diminta"],
      en: ["One requested minor content change"],
    },
    excludes: {
      ms: ["Halaman/ciri baharu, reka bentuk semula, backend atau kerja kecemasan"],
      en: ["New pages/features, redesign, backend changes or urgent troubleshooting"],
    },
  },
  {
    id: "website-care",
    name: { ms: "Penjagaan Website", en: "Website Care" },
    priceDisplay: { ms: "RM59 / bulan", en: "RM59 / month" },
    cadence: "monthly",
    description: {
      ms: "Penjagaan pilihan untuk website; bukan hosting, uptime atau sokongan kecemasan.",
      en: "Optional website care; it is not hosting, uptime coverage or emergency support.",
    },
    includes: {
      ms: ["Satu pemeriksaan asas bulanan untuk pautan dan tindakan contact", "Satu kemas kini kecil sehingga sekitar 15 minit"],
      en: ["One basic monthly check of links and contact actions", "One small content update of approximately 15 minutes"],
    },
    excludes: {
      ms: ["Hosting/domain, suntingan tanpa had, ciri baharu atau sokongan 24/7"],
      en: ["Hosting/domain, unlimited editing, new features or 24/7 support"],
    },
  },
  {
    id: "system-care",
    name: { ms: "Penjagaan Sistem", en: "System Care" },
    priceDisplay: { ms: "Dari RM149 / bulan", en: "From RM149 / month" },
    cadence: "monthly",
    description: {
      ms: "Skop bulanan dipersetujui mengikut sistem; bukan jaminan keselamatan atau uptime menyeluruh.",
      en: "Monthly scope is agreed for the system; this is not a full security or uptime guarantee.",
    },
    includes: {
      ms: ["Satu semakan teknikal dan fungsi utama sebulan", "Semak status backup yang tersedia", "Sehingga sekitar 30 minit kerja penyelenggaraan ringan"],
      en: ["One monthly technical review of key functions", "Review available backup status", "Up to approximately 30 minutes of light maintenance"],
    },
    excludes: {
      ms: ["Modul baharu, pembaikan besar, migrasi kompleks, pemulihan insiden, 24/7, hosting/database/API"],
      en: ["New modules, major repairs, complex migrations, incident recovery, 24/7, hosting/database/API charges"],
    },
  },
];

export function getPackageById(id: string): PricingPackage | undefined {
  return PRICING_PACKAGES.find((pkg) => pkg.id === id);
}

export function getSystemOfferById(id: string): SystemOffer | undefined {
  return SYSTEM_OFFERS.find((offer) => offer.id === id);
}

export function getAddonById(id: string): PricingAddon | undefined {
  return PRICING_ADDONS.find((addon) => addon.id === id);
}

export function normalizeFrontendAddonIds(selectedAddonIds: string[]): string[] {
  const validIds = Array.from(new Set(selectedAddonIds)).filter((id) => getAddonById(id));
  const hasCinematic = validIds.includes("cinematic-animation");
  return validIds.filter((id) =>
    id === "advanced-animation" ? !hasCinematic : true,
  );
}

export function getMaintenanceOptionById(id: string): MaintenanceOption | undefined {
  return MAINTENANCE_OPTIONS.find((option) => option.id === id);
}

export function calculateFrontendEstimate(
  packageId: string,
  selectedAddonIds: string[] = [],
): {
  basePrice: number;
  addonsTotal: number;
  total: number;
  isFullStack: boolean;
  breakdown: Array<{ name: string; price: number }>;
} {
  const pkg = getPackageById(packageId) || PRICING_PACKAGES[0];
  const addonIds = normalizeFrontendAddonIds(selectedAddonIds);
  const breakdown = [
    { name: pkg.name.ms, price: pkg.basePrice },
    ...addonIds.map((id) => {
      const addon = getAddonById(id)!;
      return { name: addon.name.ms, price: addon.price };
    }),
  ];
  const addonsTotal = breakdown.slice(1).reduce((sum, item) => sum + item.price, 0);

  return {
    basePrice: pkg.basePrice,
    addonsTotal,
    total: pkg.basePrice + addonsTotal,
    isFullStack: false,
    breakdown,
  };
}

export function formatMYR(amount: number): string {
  if (!Number.isFinite(amount)) return "RM0";
  return `RM${amount.toLocaleString("en-MY")}`;
}
