import { ProjectItem } from "../lib/types";

export const PROJECTS: ProjectItem[] = [
  {
    id: "symi-ui",
    slug: "symi-ui",
    title: "SYMI UI",
    category: "Frontend UI",
    status: "DEMO KONSEP",
    statusEn: "CONCEPT DEMO",
    tagline: {
      ms: "Konsep Pengalaman Web Frozen Yogurt",
      en: "Frozen Yogurt Website Concept",
    },
    description: {
      ms: "Visual konsep laman frozen yogurt dengan tipografi editorial, fotografi produk dan komposisi biru navy serta krim, seperti yang ditunjukkan dalam mockup diluluskan.",
      en: "A frozen yogurt website concept with editorial typography, product imagery and a navy-and-cream composition, as shown in the approved mockup.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Radix UI"],
    role: "Frontend Architecture & UI Engineering",
    image: "/assets/projects/symi-ui.png",
    demoNote: {
      ms: "Paparan konsep daripada rujukan reka bentuk; bukan bukti projek pelanggan berbayar.",
      en: "Concept presentation from the design reference; not evidence of a paid client engagement.",
    },
  },
  {
    id: "lamborghini-concept",
    slug: "lamborghini-concept",
    title: "LAMBORGHINI CONCEPT",
    category: "Frontend UI",
    status: "DEMO KONSEP",
    statusEn: "CONCEPT DEMO",
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
    image: "/assets/projects/lamborghini-concept.png",
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
    status: "DEMO KONSEP",
    statusEn: "CONCEPT DEMO",
    tagline: {
      ms: "Prototaip Antaramuka Superapp Penghantaran & Tempahan",
      en: "On-Demand Ride & Delivery Superapp UI Prototype",
    },
    description: {
      ms: "Konsep antaramuka tempahan perjalanan dan penghantaran. Paparan ini menunjukkan arah visual, bukan perkhidmatan tempahan atau penjejakan langsung.",
      en: "A ride and delivery interface concept. This presentation shows the visual direction, not a live booking or tracking service.",
    },
    stack: ["Next.js", "Tailwind CSS", "Zustand", "Lucide Icons"],
    role: "UI/UX Prototyping & Frontend Engineering",
    image: "/assets/projects/uberpokmi-ui.png",
    demoNote: {
      ms: "Prototaip simulasi aliran antaramuka pengguna; tidak disambungkan kepada pangkalan data pengeluaran sebenar.",
      en: "Simulated UI flow prototype; not connected to a live production backend.",
    },
  },
];
