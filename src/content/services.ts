export interface ServiceFeature {
  title: {
    ms: string;
    en: string;
  };
  description: {
    ms: string;
    en: string;
  };
}

export interface ServiceCategoryDetail {
  id: "frontend" | "fullstack";
  badge: {
    ms: string;
    en: string;
  };
  title: {
    ms: string;
    en: string;
  };
  tagline: {
    ms: string;
    en: string;
  };
  description: {
    ms: string;
    en: string;
  };
  features: ServiceFeature[];
  deliverables: {
    ms: string[];
    en: string[];
  };
  boundaries: {
    ms: string[];
    en: string[];
  };
  startingPrice: string;
  ctaText: {
    ms: string;
    en: string;
  };
  ctaLink: string;
}

export const SERVICES_DATA: ServiceCategoryDetail[] = [
  {
    id: "frontend",
    badge: {
      ms: "KATEGORI 01",
      en: "CATEGORY 01",
    },
    title: {
      ms: "Pembangunan Frontend & Antaramuka UI",
      en: "Frontend & UI Website Development",
    },
    tagline: {
      ms: "Laman web berimpak visual tinggi, pantas, interaktif & berorientasikan konversi.",
      en: "High-visual impact, lightning-fast, interactive & conversion-oriented websites.",
    },
    description: {
      ms: "Khusus untuk perniagaan, jenama peribadi, dan produk digital yang inginkan penampilan web bertaraf antarabangsa dengan identiti Digital Brutalism yang memukau dan navigasi yang mudah.",
      en: "Built specifically for businesses, personal brands, and digital products demanding world-class web presence with stunning Digital Brutalism aesthetics and intuitive navigation.",
    },
    features: [
      {
        title: {
          ms: "Landing Page & Web Korporat",
          en: "Landing Pages & Corporate Sites",
        },
        description: {
          ms: "Struktur visual terancang untuk menyampaikan nilai tawaran anda dengan jelas dan mendorong tindakan pelawat.",
          en: "Engineered page structure designed to articulate your value proposition and drive visitor conversion.",
        },
      },
      {
        title: {
          ms: "Animasi Sinematik GSAP",
          en: "Cinematic GSAP Animations",
        },
        description: {
          ms: "Peralihan skrol interaktif, efek kedalaman perspektif dan mikro-interaksi tanpa mengorbankan kelajuan.",
          en: "Interactive scroll timelines, perspective depth effects, and micro-interactions without performance loss.",
        },
      },
      {
        title: {
          ms: "Responsif Desktop & Mudah Alih",
          en: "Desktop & Mobile Responsive",
        },
        description: {
          ms: "Pengalaman paparan kemas di semua saiz skrin: 360px hingga skrin ultra-lebar 1920px+.",
          en: "Pixel-disciplined experience across all viewport sizes from 360px mobile up to ultra-wide displays.",
        },
      },
      {
        title: {
          ms: "Kelajuan Core Web Vitals",
          en: "Core Web Vitals Speed",
        },
        description: {
          ms: "Kod bersih Next.js, aset imej dioptimumkan dan masa pemuatan pantas (LCP & CLS terkawal).",
          en: "Clean Next.js architecture, optimized assets, and rapid load times with controlled LCP and CLS.",
        },
      },
    ],
    deliverables: {
      ms: [
        "Kod sumber penuh (Next.js / TypeScript / Tailwind)",
        "Struktur komponen kemas & mudah diselenggara",
        "Integrasi borang pertanyaan & pautan WhatsApp",
        "Konfigurasi SEO & metadata perkongsian sosial",
        "Penyerahan dan panduan pelancaran tempatan",
      ],
      en: [
        "Complete source code (Next.js / TypeScript / Tailwind)",
        "Clean, modular, and maintainable component structure",
        "Inquiry form & WhatsApp action integrations",
        "SEO configuration & social sharing metadata",
        "Deployment handover and local setup guide",
      ],
    },
    boundaries: {
      ms: [
        "Tidak merangkumi pangkalan data atau autentikasi pengguna (disediakan dalam pakej Full-Stack)",
        "Tidak merangkumi gerbang pembayaran langsung (payment gateway)",
        "Domain dan langganan hosting diuruskan atau dibil secara berasingan",
      ],
      en: [
        "Does not include custom database or user authentication (scoped in Full-Stack)",
        "Does not include integrated payment gateway transactions",
        "Domain name registration and hosting infrastructure billed separately",
      ],
    },
    startingPrice: "Bermula RM645",
    ctaText: {
      ms: "Kira Anggaran di Pricing Studio",
      en: "Calculate Estimate in Pricing Studio",
    },
    ctaLink: "/harga",
  },
  {
    id: "fullstack",
    badge: {
      ms: "KATEGORI 02",
      en: "CATEGORY 02",
    },
    title: {
      ms: "Sistem Khas & Seni Bina Full-Stack",
      en: "Custom Full-Stack Systems & Architecture",
    },
    tagline: {
      ms: "Aplikasi web dengan pangkalan data, peranan pengguna, dashboard pentadbir & automasi.",
      en: "Web applications featuring databases, user roles, admin dashboards & automations.",
    },
    description: {
      ms: "Penyelesaian digital tersuai untuk operasi perniagaan yang memerlukan logik pelayan, penyimpanan data selamat, pengurusan pesanan, atau integrasi API kompleks.",
      en: "Tailored digital solutions for operations requiring server-side logic, secure persistent storage, workflow management, or complex API integrations.",
    },
    features: [
      {
        title: {
          ms: "Pangkalan Data & Pengurusan Data",
          en: "Databases & Data Architecture",
        },
        description: {
          ms: "Seni bina pangkalan data relasional (PostgreSQL / Supabase / Cloud SQL) yang pantas dan selamat.",
          en: "Robust relational database design (PostgreSQL / Supabase / Cloud SQL) built for integrity and speed.",
        },
      },
      {
        title: {
          ms: "Autentikasi & Kawalan Akses (RBAC)",
          en: "Authentication & Role Access",
        },
        description: {
          ms: "Daftar masuk selamat, pengesahan e-mel, dan penetapan kuasa akses berperingkat (admin, staf, klien).",
          en: "Secure login, session control, and granular role-based permissions (admin, staff, client).",
        },
      },
      {
        title: {
          ms: "Panel Kawalan Pentadbir (Dashboard)",
          en: "Admin Control Dashboards",
        },
        description: {
          ms: "Antaramuka pengurusan data, analitik operasi, dan visualisasi metrik utama secara langsung.",
          en: "Intuitive data management tables, operation analytics, and real-time business metrics.",
        },
      },
      {
        title: {
          ms: "Integrasi API & Webhook Automasi",
          en: "API & Webhook Automations",
        },
        description: {
          ms: "Penyambungan sistem luar, automasi pemberitahuan e-mel/WhatsApp, dan pengurusan aliran data.",
          en: "Seamless third-party connectivity, email/WhatsApp notification dispatch, and data pipelines.",
        },
      },
    ],
    deliverables: {
      ms: [
        "Seni bina sistem penuh (Frontend + Backend API + Database)",
        "Skema pangkalan data dan fail migrasi",
        "Dokumentasi API dan aliran logik sistem",
        "Sesi penemuan skop teknikal terperinci",
        "Sokongan audit keselamatan dan pengujian fungsi",
      ],
      en: [
        "Complete system architecture (Frontend + API Routes + Database)",
        "Relational database schemas and migration scripts",
        "API endpoint documentation and system flow diagrams",
        "In-depth technical discovery and requirements specification",
        "Security audit support and comprehensive functional testing",
      ],
    },
    boundaries: {
      ms: [
        "Skop dan harga bergantung kepada spesifikasi teknikal selepas sesi penemuan",
        "Kos pelayan awan (Cloud/DB hosting) ditanggung oleh pemilik projek mengikut penggunaan",
      ],
      en: [
        "Scope and quotation finalized following formal discovery assessment",
        "Cloud database and server compute costs are billed directly to client accounts",
      ],
    },
    startingPrice: "Bermula RM3,250 (Sebut Harga Manual)",
    ctaText: {
      ms: "Bincang Keperluan Sistem",
      en: "Discuss System Requirements",
    },
    ctaLink: "/hubungi?service=full-stack",
  },
];
