import { ProjectItem } from "../lib/types";

export const PROJECTS: ProjectItem[] = [
  {
    id: "symi-ui",
    slug: "symi-ui",
    title: "SYMI UI",
    category: "Design System",
    status: "KONSEP DEMO",
    statusEn: "CONCEPT DEMO",
    tagline: {
      ms: "Sistem Komponen & Antaramuka Web Berprestasi Tinggi",
      en: "High-Performance Web UI Component System",
    },
    description: {
      ms: "Eksplorasi sistem reka bentuk digital brutalist untuk pembangun web moden, menggabungkan token tema ultra-kontras, komponen boleh diakses dan interaksi mikro yang lancar.",
      en: "Exploration of a digital brutalist design system for modern web builders, combining ultra-contrast theme tokens, accessible components, and smooth micro-interactions.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Radix UI"],
    role: "Frontend Architecture & UI Engineering",
    image: "/assets/references/03-portfolio.png",
    demoNote: {
      ms: "Projek inisiatif kendiri bagi mendemonstrasikan seni bina rekaan komponen brutalist.",
      en: "Self-initiated showcase demonstrating brutalist component architecture.",
    },
  },
  {
    id: "lamborghini-concept",
    slug: "lamborghini-concept",
    title: "LAMBORGHINI CONCEPT",
    category: "Frontend UI",
    status: "EKSPERIMENTAL",
    statusEn: "EXPERIMENTAL",
    tagline: {
      ms: "Pengalaman Pendaratan Jenama Supercar Tidak Rasmi",
      en: "Unofficial Supercar High-Performance Landing Experience",
    },
    description: {
      ms: "Eksperimen interaktif web sinematik bertemakan jentera prestasi tinggi dengan peralihan skrol 3D, tipografi gergasi dan kesan visual agresif.",
      en: "Cinematic interactive web experiment themed around high-performance supercars featuring 3D scroll transitions, massive typography, and aggressive visuals.",
    },
    stack: ["React", "GSAP ScrollTrigger", "CSS 3D Transforms", "Web Audio API"],
    role: "Creative Development & Motion Design",
    image: "/assets/references/03-portfolio.png",
    demoNote: {
      ms: "Eksperimen konsep reka bentuk tidak rasmi; tiada kaitan atau tajaan rasmi daripada jenama automotif tersebut.",
      en: "Unofficial design concept experiment; no official affiliation or endorsement by the automotive brand.",
    },
  },
  {
    id: "uberpokmi-ui",
    slug: "uberpokmi-ui",
    title: "UBERPOKMI UI",
    category: "Mobile Prototype",
    status: "FRONTEND DEMO",
    statusEn: "FRONTEND DEMO",
    tagline: {
      ms: "Prototaip Antaramuka Superapp Penghantaran & Tempahan",
      en: "On-Demand Ride & Delivery Superapp UI Prototype",
    },
    description: {
      ms: "Prototaip UI web responsif mudah alih untuk ekosistem tempahan perkhidmatan, menampilkan penjejakan status masa nyata, kad pesanan dinamik dan navigasi intuitif.",
      en: "Mobile-responsive web UI prototype for an on-demand service ecosystem, featuring real-time status tracking, dynamic order cards, and intuitive navigation.",
    },
    stack: ["Next.js", "Tailwind CSS", "Zustand", "Lucide Icons"],
    role: "UI/UX Prototyping & Frontend Engineering",
    image: "/assets/references/03-portfolio.png",
    demoNote: {
      ms: "Prototaip simulasi aliran antaramuka pengguna; tidak disambungkan kepada pangkalan data pengeluaran sebenar.",
      en: "Simulated UI flow prototype; not connected to a live production backend.",
    },
  },
];
