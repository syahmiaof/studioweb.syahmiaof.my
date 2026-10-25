import { CoachingTopic } from "../lib/types";

export const COACHING_TOPICS: CoachingTopic[] = [
  {
    id: "web-fundamentals",
    title: {
      ms: "Asas Pembangunan Web Moden",
      en: "Modern Web Fundamentals",
    },
    subtitle: {
      ms: "HTML5 Semantik, CSS Moden (Flexbox/Grid/Tailwind) & JavaScript ES6+",
      en: "Semantic HTML5, Modern CSS (Flexbox/Grid/Tailwind) & JavaScript ES6+",
    },
    description: {
      ms: "Sesi bimbingan intensif bagi mengukuhkan asas pengaturcaraan web: pemahaman DOM, gaya reka bentuk responsif, dan logik pengaturcaraan JavaScript tanpa jalan pintas rapuh.",
      en: "Intensive 1:1 mentoring to solidify core web fundamentals: DOM manipulation, responsive design layout, and solid JavaScript logic without brittle shortcuts.",
    },
    points: {
      ms: [
        "Penguasaan struktur HTML5 dan kebolehcapaian (a11y)",
        "CSS Layout praktikal: Flexbox, CSS Grid & Tailwind CSS",
        "Logik JavaScript: Promises, Async/Await, Array Methods & Fetch API",
        "Penyahpepijatan menggunakan Chrome DevTools",
      ],
      en: [
        "Mastering semantic HTML5 and accessibility (a11y)",
        "Practical CSS layouts: Flexbox, CSS Grid & Tailwind CSS",
        "JavaScript logic: Promises, Async/Await, Array Methods & Fetch API",
        "Effective debugging with Chrome DevTools",
      ],
    },
  },
  {
    id: "react-next",
    title: {
      ms: "React / Next.js & Seni Bina UI",
      en: "React / Next.js & UI Architecture",
    },
    subtitle: {
      ms: "Komponen Moden, Next.js App Router, Pengurusan Keadaan & GSAP",
      en: "Modern Components, Next.js App Router, State Management & GSAP",
    },
    description: {
      ms: "Bimbingan mendalam untuk membina aplikasi web moden berprestasi tinggi menggunakan ekosistem Next.js App Router, TypeScript, dan seni bina komponen yang kemas.",
      en: "In-depth guidance on building high-performance modern web applications using the Next.js App Router ecosystem, TypeScript, and clean component patterns.",
    },
    points: {
      ms: [
        "Konsep React Hooks, Lifecycle & Server vs Client Components",
        "Seni bina Next.js App Router: Dynamic Routing, Layouts & Server Actions",
        "Integrasi animasi interaktif GSAP & ScrollTrigger dalam React",
        "Amalan terbaik TypeScript untuk projek skala sederhana & besar",
      ],
      en: [
        "React Hooks, Lifecycle & Server vs Client Component boundaries",
        "Next.js App Router architecture: Dynamic Routing, Layouts & Route Handlers",
        "Integrating interactive GSAP & ScrollTrigger animations cleanly",
        "TypeScript best practices for scalable front-end codebases",
      ],
    },
  },
  {
    id: "project-mentorship",
    title: {
      ms: "Mentor Projek & Ulasan Kod (Code Review)",
      en: "Project Mentorship & Code Review",
    },
    subtitle: {
      ms: "Bimbingan Projek Akhir, Penyahpepijatan Masalah Sebenar & Kerjaya Web",
      en: "Capstone Mentoring, Real-World Problem Solving & Web Career Prep",
    },
    description: {
      ms: "Bawa kod projek anda sendiri untuk diulas baris demi baris, selesaikan pepijat sukar bersama-sama, dan pelajari standard kejuruteraan industri sebenar.",
      en: "Bring your own project codebase for line-by-line review, troubleshoot complex blockers together, and adopt real-world industry engineering workflows.",
    },
    points: {
      ms: [
        "Ulasan kod mendalam: pengoptimuman prestasi & struktur folder",
        "Penyelesaian ralat logik atau isu integrasi pihak ketiga",
        "Aliran kerja Git, GitHub & strategi pelancaran Vercel / Cloud",
        "Panduan membina portfolio web yang memikat prospek atau penemuduga",
      ],
      en: [
        "In-depth code review: performance tuning and architectural refactoring",
        "Targeted troubleshooting for tricky bugs and API integration errors",
        "Git workflows, branch discipline & Vercel / Cloud deployment setups",
        "Constructive feedback on crafting high-converting developer portfolios",
      ],
    },
  },
];

export const COACHING_DURATIONS = [
  {
    value: "60" as const,
    label: {
      ms: "60 Minit (Sesi Fokus)",
      en: "60 Minutes (Focused Session)",
    },
    description: {
      ms: "Sesuai untuk menyelesaikan masalah khusus, ulasan kod pantas atau penerangan topik terarah.",
      en: "Ideal for tackling a specific blocker, quick code audit, or targeted concept walkthrough.",
    },
  },
  {
    value: "90" as const,
    label: {
      ms: "90 Minit (Sesi Mendalam)",
      en: "90 Minutes (Deep Dive Session)",
    },
    description: {
      ms: "Sesuai untuk pembinaan komponen bersama, seni bina projek menyeluruh atau semakan kod komprehensif.",
      en: "Best for pair-programming, full project architecture design, or comprehensive code teardowns.",
    },
  },
];
