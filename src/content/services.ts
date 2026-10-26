import type { ServiceCategoryDetail } from "../lib/types";

export const SERVICES_DATA: ServiceCategoryDetail[] = [
  {
    id: "frontend",
    badge: { ms: "KATEGORI 01", en: "CATEGORY 01" },
    title: { ms: "Website Frontend", en: "Frontend Websites" },
    tagline: {
      ms: "Laman responsif untuk memperkenalkan bisnes, servis atau kempen anda.",
      en: "Responsive websites to introduce your business, services or campaign.",
    },
    description: {
      ms: "Pilih Landing Page RM299, Laman Web Bisnes RM499 atau Laman Web Premium RM999. Harga pakej dan skop ringkas dipaparkan di Pricing Studio.",
      en: "Choose a RM299 Landing Page, RM499 Business Website or RM999 Premium Custom Website. Package prices and scope are listed in Pricing Studio.",
    },
    features: [
      {
        title: { ms: "Reka Bentuk Responsif", en: "Responsive Design" },
        description: { ms: "Susun atur disesuaikan untuk telefon dan desktop.", en: "Layouts adapted for mobile and desktop." },
      },
      {
        title: { ms: "Pautan Hubungan", en: "Contact Links" },
        description: { ms: "Pautan WhatsApp dan media sosial termasuk tanpa caj.", en: "WhatsApp and social media links are included at no extra charge." },
      },
      {
        title: { ms: "SEO Asas", en: "Basic SEO" },
        description: { ms: "SEO asas pada halaman disertakan; tiada jaminan kedudukan Google.", en: "Basic on-page SEO is included; Google rankings are not guaranteed." },
      },
    ],
    deliverables: {
      ms: [
        "Landing Page: 1 halaman, hingga 6 seksyen, penyesuaian asas dan 2 pusingan revisi",
        "Laman Web Bisnes: hingga 5 halaman responsif dan 2 pusingan revisi",
        "Premium: hingga 5 halaman, arah visual tersuai, animasi asas dan 2 pusingan revisi",
        "Pautan media sosial dan SEO asas termasuk tanpa caj",
      ],
      en: [
        "Landing Page: 1 page, up to 6 sections, basic customization and 2 revision rounds",
        "Business Website: up to 5 responsive pages and 2 revision rounds",
        "Premium: up to 5 pages, custom visual direction, basic animation and 2 revision rounds",
        "Social media links and basic SEO included at no extra charge",
      ],
    },
    boundaries: {
      ms: [
        "Halaman standard tambahan RM99; tidak termasuk modul dashboard",
        "Animasi Lanjutan RM99 atau Animasi Sinematik RM199 untuk urutan yang sama — pilih satu sahaja",
        "Domain, hosting dan langganan pihak ketiga tidak termasuk; sebut harga berasingan atau dibayar pelanggan",
        "SEO asas tidak menjamin kedudukan dalam Google",
        "Laman pelbagai bahasa memerlukan sebut harga berasingan",
      ],
      en: [
        "Extra standard page RM99; dashboard modules are excluded",
        "Advanced Animation RM99 or Cinematic Animation RM199 for the same sequence — choose one",
        "Domain, hosting and third-party subscriptions are excluded; quoted separately or client-paid",
        "Basic SEO does not guarantee Google rankings",
        "Multilingual websites require a separate quotation",
      ],
    },
    startingPrice: "Bermula RM299",
    ctaText: { ms: "Kira Anggaran Website", en: "Estimate a Website" },
    ctaLink: "/harga",
  },
  {
    id: "fullstack",
    badge: { ms: "KATEGORI 02", en: "CATEGORY 02" },
    title: { ms: "Sistem Bisnes", en: "Business Systems" },
    tagline: {
      ms: "Daripada permintaan tempahan ringkas kepada modul pengurusan tersuai.",
      en: "From a simple booking request to a custom management module.",
    },
    description: {
      ms: "Permintaan Tempahan Asas RM499 menggunakan satu borang untuk satu servis dan bisnes mengesahkan tempahan secara manual. Dashboard SME Lite bermula RM999 untuk satu modul kecil. Sistem lanjutan berharga lebih RM2,099 dan memerlukan sebut harga selepas skop ditentukan.",
      en: "The RM499 Basic Booking Request uses one form for one service; the business confirms bookings manually. SME Dashboard Lite starts at RM999 for one small module. Advanced systems cost more than RM2,099 and require a scoped quotation.",
    },
    features: [
      {
        title: { ms: "Permintaan Tempahan", en: "Booking Requests" },
        description: { ms: "Borang permintaan asas; pengesahan dibuat manual oleh bisnes.", en: "A basic request form; the business confirms each booking manually." },
      },
      {
        title: { ms: "Dashboard SME Lite", en: "SME Dashboard Lite" },
        description: { ms: "Satu modul kecil, satu role admin dan satu aliran pengurusan rekod asas.", en: "One small module, one admin role and one basic record-management workflow." },
      },
      {
        title: { ms: "Sistem Tersuai", en: "Custom Systems" },
        description: { ms: "Fungsi dan integrasi lanjutan ditentukan selepas discovery bertulis.", en: "Advanced features and integrations are scoped after written discovery." },
      },
    ],
    deliverables: {
      ms: [
        "Booking Asas RM499: satu servis, borang permintaan, validasi/notifikasi asas dan pengesahan manual",
        "Dashboard SME Lite dari RM999: satu modul kecil, satu peranan admin dan satu workflow rekod asas",
        "Sistem Lanjutan lebih RM2,099: sebut harga selepas semakan keperluan, integrasi dan kerumitan",
      ],
      en: [
        "Basic Booking RM499: one service, request form, basic validation/notification and manual confirmation",
        "SME Dashboard Lite from RM999: one small module, one admin role and one basic record workflow",
        "Advanced System above RM2,099: quoted after reviewing requirements, integrations and complexity",
      ],
    },
    boundaries: {
      ms: [
        "Booking Asas bukan platform pengurusan tempahan lengkap: tiada kalendar, pengesahan automatik, akaun, bayaran atau sejarah database",
        "Dashboard Lite tidak merangkumi lebih daripada satu modul atau fungsi yang belum dipersetujui dalam skop bertulis",
        "Domain, hosting, database dan penggunaan API dibil atau dibayar berasingan",
        "Integrasi, modul baharu dan kerja di luar skop memerlukan kelulusan serta sebut harga",
      ],
      en: [
        "Basic Booking is not a full booking platform: no calendar, automatic confirmation, accounts, payments or database history",
        "Dashboard Lite excludes more than one module and any function not agreed in the written scope",
        "Domain, hosting, database and API usage are quoted separately or client-paid",
        "Integrations, new modules and out-of-scope work require approval and a separate quote",
      ],
    },
    startingPrice: "Dari RM499",
    ctaText: { ms: "Bincang Keperluan Sistem", en: "Discuss a System" },
    ctaLink: "/hubungi?service=full-stack",
  },
];
