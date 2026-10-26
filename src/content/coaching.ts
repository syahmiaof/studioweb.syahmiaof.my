import type { CoachingPackage } from "../lib/types";

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    id: "basic-frontend",
    name: { ms: "Frontend Asas", en: "Basic Frontend" },
    durationMinutes: 60,
    price: 39,
    description: {
      ms: "Sesi fokus untuk mula membina halaman web dengan HTML, CSS dan asas JavaScript.",
      en: "A focused session to start building web pages with HTML, CSS and JavaScript fundamentals.",
    },
    includes: {
      ms: ["1 jam coaching 1:1", "Asas struktur halaman dan gaya responsif", "Slot disahkan selepas pertanyaan"],
      en: ["1 hour of 1:1 coaching", "Page structure and responsive styling basics", "Session slot confirmed after enquiry"],
    },
  },
  {
    id: "advanced-frontend",
    name: { ms: "Frontend Lanjutan", en: "Advanced Frontend" },
    durationMinutes: 120,
    price: 99,
    description: {
      ms: "Sesi dua jam tentang React/Next.js atau semakan projek frontend mengikut matlamat anda.",
      en: "A two-hour session on React/Next.js or a frontend project review shaped around your goal.",
    },
    includes: {
      ms: ["2 jam coaching 1:1", "React/Next.js dan seni bina UI", "Slot disahkan selepas pertanyaan"],
      en: ["2 hours of 1:1 coaching", "React/Next.js and UI architecture", "Session slot confirmed after enquiry"],
    },
  },
  {
    id: "full-stack-system",
    name: { ms: "Sistem Full-Stack", en: "Full-Stack System" },
    durationMinutes: 120,
    price: 99,
    description: {
      ms: "Sesi dua jam untuk bincang atau menyemak asas aliran sistem frontend dan backend.",
      en: "A two-hour session to discuss or review the foundations of a frontend and backend system flow.",
    },
    includes: {
      ms: ["2 jam coaching 1:1", "Asas aliran sistem dan semakan projek", "Slot disahkan selepas pertanyaan"],
      en: ["2 hours of 1:1 coaching", "System-flow fundamentals and project review", "Session slot confirmed after enquiry"],
    },
  },
];
