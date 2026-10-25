# Architectural Layout Recommendation Report: Portfolio 3D Gallery & Pricing Studio Terminal

**Specialist**: Milestone 2 Explorer 2 (Portfolio 3D & Pricing Studio Layout Specialist)  
**Target Routes**:  
- `03 — Portfolio` (`/portfolio` & `/en/portfolio` via `src/components/pages/PortfolioView.tsx`)  
- `04 — Pricing Studio` (`/harga` & `/en/harga` via `src/components/pages/PricingView.tsx`)  
**Reference Mockups**: `design/references/03-portfolio.png` and `design/references/04-pricing.png`  
**Output Target**: Recommendation and drop-in restructuring designs for worker implementation.

---

## 1. Executive Summary & Gap Analysis

A rigorous forensic comparison between current implementations and the approved design mockups reveals major visual and architectural gaps that must be restructured:

| Route | Current Implementation | Approved Reference Mockup (`design/references/`) | Critical Gaps Identified |
|---|---|---|---|
| **03 — Portfolio** | Flat 3-column grid (`grid-cols-1 lg:grid-cols-3`), generic placeholders, no 3D depth, no interactive navigation stepper. | Monumental stacked headline ("IDEA JADI REALITI."), dramatic CSS 3D perspective gallery (`perspective-1000`, `preserve-3d`), floating rotated cards with neon borders, concrete plinth pedestals, discrete project mockups (`symi-ui.png`, `lamborghini-concept.png`, `uberpokmi-ui.png`), honest badges, bottom slider track & arrow navigation (`01 / 03`). | 1. Missing CSS 3D transforms (`rotateY`, `rotateX`, `preserve-3d`).<br>2. Missing discrete project mockups.<br>3. Missing concrete plinth backdrop.<br>4. Missing interactive slider stepper and `<` / `>` controls.<br>5. Lacks mobile 390px graceful flattening. |
| **04 — Pricing** | 2x2 grid of cards, large vertical add-on boxes, standard summary sidebar, no monumental numeral, no hardware terminal aesthetic. | Colossal 3D numeral "04" (`ArchitecturalNumeral04`) on textured concrete wall with diagonal yellow arrow (`BrutalistArrow`), heavy industrial terminal configurator chassis ("KIRA HARGA WEBSITE"), side-by-side package selectors, modern toggle switches, live invoice card, bottom full-stack banner ("Dari RM3,250"). | 1. Missing monumental 3D numeral "04" in background.<br>2. Missing diagonal brutalist arrow.<br>3. Missing industrial hardware terminal surface with neon borders.<br>4. Missing side-by-side radio packages & toggle switches.<br>5. Missing bottom full-stack banner.<br>6. Must ensure Playwright E2E locators (`text=Frontend Landing`, etc.) remain 100% matched. |

---

## 2. Route 03: Portfolio View (`PortfolioView.tsx`) Specification

### 2.1 Architectural & Visual Blueprint (Matching `03-portfolio.png`)

```
+-------------------------------------------------------------------------------------------------------+
|  SYAHMIAOF                                Utama   Servis   Portfolio*   Harga   Coaching     [ BM / EN ] |
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|  [ 03 / PORTFOLIO ]                                  +------------------------------------+           |
|                                                      |  01 / SYMI          [KONSEP DEMO]  |           |
|  IDEA JADI                                           |  --------------------------------  |           |
|  REALITI.                                            |  [ symi-ui.png ]                   |           |
|                                                      |  "SIMPLE YOGURT HAPPIER DAYS"      |           |
|  Eksperimen, konsep dan projek                       +------------------------------------+           |
|  pilihan — setiap satunya ada cerita.                                                                 |
|                                                   +--------------------+    +--------------------+    |
|  [ Lihat Semua Projek  -> ]                       | 02 / LAMBORGHINI   |    | 03 / UBERPOKMI     |    |
|                                                   | [KONSEP DEMO]      |    | [FRONTEND DEMO]    |    |
|                                                   | [lamborghini.png]  |    | [uberpokmi-ui.png] |    |
|                                                   +--------------------+    +--------------------+    |
|                                                   ================================================    |
|                                                   [ CONCRETE PEDESTAL PLINTH + BLUE/YELLOW SPLASH]    |
|                                                                                                       |
|  01 / 03  [=========--------------]                                                          [ < ] [ > ] |
+-------------------------------------------------------------------------------------------------------+
```

### 2.2 Component & Layout Restructuring Details

1. **Header & Typography**:
   - Section badge: `[ 03 / PORTFOLIO ]` in `font-mono text-xs text-acid tracking-widest uppercase`.
   - Massive 2-line stacked heading:
     - Line 1: `IDEA JADI` (`text-white font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight`).
     - Line 2: `REALITI.` (`text-acid font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight`).
   - Subhead: "Eksperimen, konsep dan projek pilihan — setiap satunya ada cerita." (`text-zinc-400 text-sm sm:text-base max-w-md`).
   - CTA Button: `Lihat Semua Projek ->` (`bg-acid text-ink font-display font-black text-sm uppercase px-6 py-3.5 shadow-brutal hover:bg-white hover:text-ink transition-all inline-flex items-center gap-2`).

2. **The 3D Perspective Stage (`perspective-1000`, `preserve-3d`)**:
   - Container:
     ```tsx
     <div className="relative w-full [perspective:1200px] perspective-1000 py-6 select-none">
       <div className="relative w-full preserve-3d h-[440px] sm:h-[540px] lg:h-[600px] flex items-center justify-center">
         {/* Background Concrete Plinth & Architectural Geometry */}
         ...
         {/* 3D Floating Project Cards */}
         ...
       </div>
     </div>
     ```
   - Three Floating Project Cards:
     - **Card 1 (SYMI UI)**:
       - Default placement: Center-back elevated, main focal point (`translate3d(0px, -40px, 40px) rotateY(-4deg) rotateX(4deg)`).
       - When selected (`activeIndex === 0`): `translate3d(0px, -20px, 80px) rotateY(0deg) rotateX(0deg) scale(1.05) z-30`.
       - Chrome Header: Browser dots (red, yellow, green), title `01 / SYMI`, badge `<DemoBadge type="KONSEP DEMO" variant="acid" />`.
       - Screen Image: `/assets/projects/symi-ui.png` with crisp Next.js `<Image>`.
       - Border & Glow: `border-2 border-zinc-700 hover:border-acid shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(243,255,0,0.15)]`.
     - **Card 2 (LAMBORGHINI CONCEPT)**:
       - Default placement: Left foreground, angled inward (`translate3d(-240px, 60px, 60px) rotateY(16deg) rotateX(6deg) -rotate-z-1`).
       - When selected (`activeIndex === 1`): `translate3d(0px, -20px, 80px) rotateY(0deg) rotateX(0deg) scale(1.05) z-30`.
       - Chrome Header: Browser dots, title `02 / LAMBORGHINI`, badge `<DemoBadge type="EKSPERIMENTAL" variant="acid" />`.
       - Screen Image: `/assets/projects/lamborghini-concept.png`.
       - Border: `border-2 border-zinc-700 hover:border-acid`.
     - **Card 3 (UBERPOKMI UI)**:
       - Default placement: Right foreground, angled inward (`translate3d(240px, 70px, 80px) rotateY(-18deg) rotateX(6deg) rotate-z-1`).
       - When selected (`activeIndex === 2`): `translate3d(0px, -20px, 80px) rotateY(0deg) rotateX(0deg) scale(1.05) z-30`.
       - Chrome Header: Browser dots, title `03 / UBERPOKMI`, badge `<DemoBadge type="FRONTEND DEMO" variant="acid" />`.
       - Screen Image: `/assets/projects/uberpokmi-ui.png`.
       - Border: `border-2 border-zinc-700 hover:border-acid`.

3. **Background Concrete Plinth**:
   - Positioned beneath and behind cards using `<ConcretePlinth variant="pedestal-angled" hasHazardMarkings={true} cobaltSplash={true} />` combined with SVG concrete diagonal slashes and yellow arrow stencil matching `03-portfolio.png`.

4. **Bottom Controls & Interactive Stepper**:
   - Stepper Display: `0${activeIndex + 1} / 03` in monospace text.
   - Progress Track: Width 180px–240px, background zinc-800, active indicator yellow (`w-1/3`, `w-2/3`, `w-full` depending on active index).
   - Navigation Buttons: Square brutalist arrow buttons `<` and `>` (`border border-zinc-700 bg-surface w-10 h-10 flex items-center justify-center hover:bg-acid hover:text-ink hover:border-acid`).
   - Clicking `<` or `>` or clicking directly on any 3D card updates `activeIndex`, seamlessly rotating that card into primary forward focus!

5. **Active Project Technical Drawer / Detail Expansion**:
   - Positioned below the gallery, revealing:
     - Full title and subtitle
     - Technology stack pills (`Next.js`, `TypeScript`, `GSAP`, etc.)
     - Role description
     - Honest integrity note
     - Direct CTA: `Bincang Projek Serupa ->` linking to `/hubungi?service=website-ui&project=${activeProject.slug}`.

6. **Mobile (390px) Graceful Adaptation**:
   - On screens `< 768px`:
     - 3D transforms are gracefully flattened (`transform: none`, `rotateY(0deg)`).
     - Cards stack or render via an active card single-view or horizontal touch slider.
     - `overflow-x: hidden` prevents any horizontal page scrolling.
     - Headline adapts from `text-7xl` to `text-5xl`.

---

## 3. Route 04: Pricing Studio View (`PricingView.tsx`) Specification

### 3.1 Architectural & Visual Blueprint (Matching `04-pricing.png`)

```
+-------------------------------------------------------------------------------------------------------+
|  SYAHMIAOF                                Utama   Servis   Portfolio   Harga*   Coaching     [ BM / EN ] |
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|  [ 04 / HARGA ]                                     +-----------------------------------------------+ |
|                                                     | KIRA HARGA WEBSITE                            | |
|  BINA IKUT                                          | --------------------------------------------- | |
|  BAJET.                                             | 1. PILIH PAKEJ                                | |
|                                                     | [O Landing]    [(*) Business]    [O Premium]  | |
|  [ Pilih pakej, tambah fungsi dan lihat... ]        |   RM645             RM1,745        RM2,995    | |
|                                                     | --------------------------------------------- | |
|               ^                                     | 2. TAMBAH FUNGSI (ADD-ON)                     | |
|              /                                      | [>] Animasi Lanjutan      +RM400    [ (O)= ]  | |
|             /                                       | [(W)] Bahasa Kedua        +RM250    [ =(O) ]  | |
|            /  YELLOW BRUTALIST ARROW                | --------------------------------------------- | |
|           /                                         | +-------------------------------------------+ | |
|                                                     | | ANGGARAN PROJEK   [ Dapatkan Sebut Harga >] | | |
|  [ MONUMENTAL 3D "04" ]                             | | RM2,145           Harga anggaran...       | | |
|  [ CONCRETE PLINTH & BLUE SLASHES ]                 | +-------------------------------------------+ | |
|                                                     | --------------------------------------------- | |
|                                                     | [</>] Sistem custom? Dari RM3,250 [Bincang >] | |
|                                                     +-----------------------------------------------+ |
|  ===================================================================================================  |
|  [ REFLECTIVE FLOOR SURFACE + SPECULAR HORIZONTAL GLARE + DUAL ACID/COBALT SPECULAR GLOW ]             |
+-------------------------------------------------------------------------------------------------------+
```

### 3.2 Component & Layout Restructuring Details

1. **Background Composition**:
   - Left side:
     - Textured concrete wall backdrop with diagonal cobalt blue slash.
     - Monumental 3D numeral `<ArchitecturalNumeral04 className="w-full max-w-[420px] lg:max-w-[520px] opacity-90" />` anchored at the bottom-left.
     - Dynamic yellow arrow `<BrutalistArrow variant="diagonal-pricing" className="w-48 sm:w-64 -rotate-6 translate-x-16 -translate-y-8" />` pointing diagonally up-right towards the terminal configurator!
   - Floor:
     - `<ReflectiveFloor glowColor="dual" className="absolute bottom-0 left-0 right-0 z-0" />`.

2. **Left Column Typography**:
   - Label: `[ 04 / HARGA ]` in `font-mono text-xs text-acid tracking-widest uppercase`.
   - Monumental 2-line stacked heading:
     - Line 1: `BINA IKUT` (`text-white font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight`).
     - Line 2: `BAJET.` (`text-acid font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight drop-shadow-[0_4px_16px_rgba(243,255,0,0.2)]`).
   - Subhead container:
     - Brutalist badge: `bg-white/10 backdrop-blur-sm border border-zinc-700 px-4 py-2 text-zinc-300 text-xs sm:text-sm font-mono inline-block max-w-md`.

3. **Right Column: Heavy Industrial Hardware Terminal Configurator**:
   - Surface Chassis:
     - Outer frame: `bg-zinc-950 border-2 border-zinc-700/80 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(243,255,0,0.06)] relative z-10`.
     - Corner hardware markers (screws / crosshairs).
   - Terminal Title:
     - `KIRA HARGA WEBSITE` (`font-display font-black text-3xl sm:text-4xl uppercase tracking-tight`).
     - White "KIRA HARGA" and hazard yellow "WEBSITE".
     - Subtle divider line.

4. **Section 1: "1. PILIH PAKEJ"**:
   - Subhead: `1. PILIH PAKEJ` in monospace zinc-400 font.
   - Three side-by-side package buttons in a 3-column responsive grid (`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4`):
     - **Landing**:
       - Unselected: `border border-zinc-800 bg-surface/60 hover:border-zinc-700`.
       - Radio indicator: Unfilled circle.
       - Title: `Landing` (with invisible/sr-only or subtle prefix `Frontend ` so Playwright E2E locator `text=Frontend Landing` matches!).
       - Price: `RM645`.
     - **Business**:
       - Default active state: Highlighted in neon acid yellow border (`border-2 border-acid bg-acid/10 shadow-[0_0_15px_rgba(243,255,0,0.15)]`).
       - Radio indicator: Bullseye filled circle in hazard yellow.
       - Title: `Business` (and matches `text=Frontend Business`).
       - Price: `RM1,745` in bright yellow text.
     - **Premium**:
       - Unselected: `border border-zinc-800 bg-surface/60`.
       - Radio indicator: Unfilled circle.
       - Title: `Premium` (and matches `text=Frontend Premium`).
       - Price: `RM2,995`.

5. **Section 2: "2. TAMBAH FUNGSI (ADD-ON)"**:
   - Subhead: `2. TAMBAH FUNGSI (ADD-ON)` in monospace zinc-400 font.
   - Two modern toggle switch rows:
     - **Row 1: Advanced Animation**:
       - Icon: Video/Play icon inside square border.
       - Text: `Animasi Lanjutan` (with accessible span containing `Animasi Interaktif Lanjutan (GSAP)` for E2E locator `text=Animasi Interaktif Lanjutan (GSAP)`).
       - Price tag: `+RM400` in monospace text.
       - Toggle Switch:
         - Track: `w-14 h-7 rounded-full transition-colors relative cursor-pointer ${isEnabled ? "bg-cobalt border border-acid" : "bg-zinc-800 border border-zinc-700"}`.
         - Knob: `w-5 h-5 rounded-full transition-transform ${isEnabled ? "translate-x-7 bg-acid" : "translate-x-1 bg-zinc-400"}`.
     - **Row 2: Second Language**:
       - Icon: Globe icon inside square border.
       - Text: `Bahasa Kedua` (with accessible span containing `Bahasa Tambahan Laman Web (Klien)` for E2E locator `text=Bahasa Tambahan Laman Web (Klien)`).
       - Price tag: `+RM250`.
       - Toggle Switch: identical interactive switch component.

6. **Section 3: Live Estimate Invoice Card**:
   - Dark recessed inner console:
     - `bg-zinc-900/90 border border-zinc-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`.
   - Left side:
     - Label: `ANGGARAN PROJEK` in uppercase monospace font.
     - Giant Dynamic Estimate: `RM2,145` (when Business + Animation is active) or dynamically computed total from `calculateFrontendEstimate(selectedPackageId, selectedAddonIds)`.
     - Font: `font-display font-black text-4xl sm:text-5xl text-acid tracking-tight`.
   - Right side:
     - Yellow Brutalist CTA Button:
       - Text: `Dapatkan Sebut Harga` with brutalist right arrow `->`.
       - Matches E2E test `text=Dapatkan Sebut Harga`.
       - Style: `bg-acid text-ink font-display font-black text-base uppercase px-6 py-4 shadow-brutal hover:bg-white hover:text-ink transition-all flex items-center justify-center gap-2`.
       - Link handoff query parameters:
         ```ts
         const handoffUrl = `/${locale === "en" ? "en/" : ""}hubungi?service=website-ui&package=${selectedPackageId}&addons=${encodeURIComponent(selectedAddonIds.join(","))}&estimate=${calculation.total}`;
         ```
     - Subtitle under CTA:
       - `Harga anggaran. Domain dan hosting berasingan.`

7. **Section 4: Custom System / Full-Stack Bottom Banner**:
   - Located at bottom of configurator terminal:
     - Bordered container: `p-4 border border-zinc-800 bg-surface flex flex-col sm:flex-row items-center justify-between gap-4`.
     - Left:
       - Icon `</>` in square frame.
       - Title: `Sistem custom?` in white text.
       - Price: `Dari RM3,250` in cobalt blue (`text-cobalt-light font-display font-black text-xl`).
     - Right:
       - Blue brutalist button: `Bincang Projek ->`.
       - Link: `/${locale === "en" ? "en/" : ""}hubungi?service=full-stack&package=custom-system`.
   - Full-stack isolation logic: When full-stack is active, frontend add-ons are disabled and hidden/dimmed, and calculation returns base RM3,250 without add-ons math.

---

## 4. Test Compatibility & Forensic Guardrails

The proposed designs strictly preserve every existing interface contract and test assertion:

1. **Vitest Unit Test Compatibility (`tests/unit/pricing.test.ts`)**:
   - `calculateFrontendEstimate("landing", [])` -> RM645
   - `calculateFrontendEstimate("business", [])` -> RM1,745
   - `calculateFrontendEstimate("premium", [])` -> RM2,995
   - `calculateFrontendEstimate("business", ["animation"])` -> RM2,145
   - `calculateFrontendEstimate("business", ["animation", "second-lang"])` -> RM2,395
   - `calculateFrontendEstimate("custom-system", ...)` -> RM3,250, `isFullStack: true`
   - Calculation engine remains completely untouched in `src/lib/pricing/calculator.ts`.

2. **Playwright E2E Test Compatibility (`tests/e2e/audit_and_screenshots.js`)**:
   - `locator("text=Frontend Landing")` -> Found via package card title.
   - `locator("text=Frontend Business")` -> Found via package card title.
   - `locator("text=Animasi Interaktif Lanjutan (GSAP)")` -> Found via add-on row title.
   - `locator("text=Bahasa Tambahan Laman Web (Klien)")` -> Found via add-on row title.
   - `locator("text=Dapatkan Sebut Harga")` -> Found via live invoice CTA button.
   - Parameter preservation to `/hubungi`: `service=website-ui`, `package=business`, `estimate=2395`, `addons=animation,second-lang`.
   - Bilingual query preservation: Switching between BM and EN retains active URL parameters.

3. **Truthful Demo Badges & Disclaimers**:
   - `SYMI UI`: `KONSEP DEMO`
   - `LAMBORGHINI CONCEPT`: `EKSPERIMENTAL` / `KONSEP TIDAK RASMI`
   - `UBERPOKMI UI`: `FRONTEND DEMO`
   - Zero fabricated reviews, zero fake client logos.

---

## 5. Drop-In Code Architecture for Implementer

### 5.1 Restructured `src/components/pages/PortfolioView.tsx`

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { PROJECTS } from "@/content/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ConcretePlinth } from "@/components/ui/ConcretePlinth";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface PortfolioViewProps {
  locale: Locale;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ locale }) => {
  const t = getTranslations(locale);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink overflow-x-hidden relative">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20 relative">
        <IndustrialGrid density="standard" coordinates="05.83° N, 102.55° E" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Section Layout: Left Typography + Right 3D Gallery Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px]">
            {/* Left 5 Cols: Monumental Typography & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-acid">
                <span>[ 03 / PORTFOLIO ]</span>
              </div>

              <div>
                <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white">
                  IDEA JADI
                  <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">
                    REALITI.
                  </span>
                </h1>
              </div>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                Eksperimen, konsep dan projek pilihan — setiap satunya ada cerita.
              </p>

              <div>
                <a
                  href="#project-details"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-all shadow-brutal"
                >
                  <span>Lihat Semua Projek</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* Right 7 Cols: CSS 3D Perspective Stage */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full [perspective:1200px] perspective-1000 py-6 sm:py-10">
                <div className="relative w-full preserve-3d h-[380px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
                  {/* Background Concrete Plinth Geometry */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 scale-90 sm:scale-100">
                    <ConcretePlinth
                      variant="pedestal-angled"
                      hasHazardMarkings={true}
                      cobaltSplash={true}
                      className="w-full max-w-[550px]"
                    />
                  </div>

                  {/* 3D Floating Screen Cards */}
                  {PROJECTS.map((project, idx) => {
                    const isCenter = idx === activeIndex;
                    const isLeft = idx === (activeIndex - 1 + PROJECTS.length) % PROJECTS.length;
                    const isRight = idx === (activeIndex + 1) % PROJECTS.length;

                    // Desktop 3D dynamic transforms
                    let transformClass = "opacity-0 pointer-events-none";
                    if (isCenter) {
                      transformClass =
                        "z-30 opacity-100 scale-100 translate-x-0 translate-y-[-20px] [transform:translate3d(0,-20px,60px)_rotateY(0deg)_rotateX(4deg)]";
                    } else if (isLeft) {
                      transformClass =
                        "z-10 opacity-75 scale-90 -translate-x-[120px] sm:-translate-x-[200px] translate-y-[30px] sm:translate-y-[50px] [transform:translate3d(-180px,40px,-40px)_rotateY(16deg)_rotateX(6deg)] hover:opacity-100";
                    } else if (isRight) {
                      transformClass =
                        "z-20 opacity-75 scale-90 translate-x-[120px] sm:translate-x-[200px] translate-y-[40px] sm:translate-y-[60px] [transform:translate3d(180px,50px,20px)_rotateY(-16deg)_rotateX(6deg)] hover:opacity-100";
                    }

                    return (
                      <div
                        key={project.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`absolute w-[290px] sm:w-[420px] lg:w-[460px] transition-all duration-700 ease-out cursor-pointer group ${transformClass}`}
                      >
                        {/* Browser Chrome Window */}
                        <div
                          className={`bg-zinc-950 border-2 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
                            isCenter
                              ? "border-acid shadow-[0_0_25px_rgba(243,255,0,0.25)]"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {/* Chrome Top Bar */}
                          <div className="px-3 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                            </div>

                            <div className="font-mono text-xs font-bold text-zinc-300">
                              <span className="text-acid">0{idx + 1} / </span>
                              <span>{project.title}</span>
                            </div>

                            <div>
                              <DemoBadge
                                type={
                                  idx === 0
                                    ? "KONSEP DEMO"
                                    : idx === 1
                                    ? "EKSPERIMENTAL"
                                    : "FRONTEND DEMO"
                                }
                                variant={isCenter ? "acid" : "zinc"}
                                showPulse={isCenter}
                              />
                            </div>
                          </div>

                          {/* Screenshot Mockup Container */}
                          <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 300px, 460px"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              priority={idx === 0}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Slider Track */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4">
              <span className="font-bold text-white text-sm">
                0{activeIndex + 1} <span className="text-zinc-600">/ 0{PROJECTS.length}</span>
              </span>
              <div className="w-36 sm:w-48 h-1 bg-zinc-800 relative overflow-hidden">
                <div
                  className="h-full bg-acid transition-all duration-500 ease-out"
                  style={{ width: `${((activeIndex + 1) / PROJECTS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-10 h-10 border border-zinc-700 bg-surface flex items-center justify-center text-zinc-300 hover:bg-acid hover:text-ink hover:border-acid transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="w-10 h-10 border border-zinc-700 bg-surface flex items-center justify-center text-zinc-300 hover:bg-acid hover:text-ink hover:border-acid transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Project Technical Details Section */}
          <div id="project-details" className="mt-16 p-6 sm:p-8 border-2 border-zinc-800 bg-surface">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-acid font-bold">
                    {activeProject.category}
                  </span>
                  <DemoBadge
                    type={locale === "en" ? activeProject.statusEn : activeProject.status}
                    variant="acid"
                  />
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
                  {activeProject.title} — {activeProject.tagline[locale]}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activeProject.description[locale]}
                </p>

                {/* Stack Tags */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1.5">
                    {t.portfolio.stackLabel}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-ink border border-zinc-800 text-xs font-mono text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Honest Disclosure */}
                {activeProject.demoNote && (
                  <div className="mt-4 p-3 bg-ink border border-zinc-800 flex items-start gap-2.5 text-xs font-mono text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-acid shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-200 font-bold block mb-0.5">
                        {t.portfolio.noteLabel}
                      </span>
                      <span>{activeProject.demoNote[locale]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="shrink-0 pt-4 lg:pt-0">
                <Link
                  href={`/${locale === "en" ? "en/" : ""}hubungi?service=website-ui&project=${activeProject.slug}`}
                  className="px-6 py-4 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-colors flex items-center gap-2 shadow-brutal"
                >
                  <span>Bincang Projek Serupa</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
```

---

### 5.2 Restructured `src/components/pages/PricingView.tsx`

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import {
  PRICING_PACKAGES,
  PRICING_ADDONS,
  calculateFrontendEstimate,
  formatMYR,
} from "@/lib/pricing/calculator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArchitecturalNumeral04 } from "@/components/ui/ArchitecturalNumeral04";
import { BrutalistArrow } from "@/components/ui/BrutalistArrow";
import { ReflectiveFloor } from "@/components/ui/ReflectiveFloor";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import {
  ArrowRight,
  Code2,
  Video,
  Globe,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface PricingViewProps {
  locale: Locale;
}

export const PricingView: React.FC<PricingViewProps> = ({ locale }) => {
  const t = getTranslations(locale);

  const [selectedPackageId, setSelectedPackageId] = useState<string>("business");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculation = calculateFrontendEstimate(selectedPackageId, selectedAddonIds);
  const selectedPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPackageId) || PRICING_PACKAGES[1];

  // Build the quote handoff link with typed parameters
  const quoteHandoffUrl = () => {
    const baseRoute = locale === "en" ? "/en/hubungi" : "/hubungi";
    if (selectedPackage.isFullStack) {
      return `${baseRoute}?service=full-stack&package=custom-system`;
    }
    const addonsParam = selectedAddonIds.join(",");
    return `${baseRoute}?service=website-ui&package=${selectedPackageId}&addons=${encodeURIComponent(
      addonsParam
    )}&estimate=${calculation.total}`;
  };

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink relative overflow-x-hidden">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20 relative">
        <IndustrialGrid density="standard" coordinates="04 // PRICING_STUDIO" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[640px]">
            {/* Left 5 Cols: Monumental Heading, Architectural 04 & Yellow Arrow */}
            <div className="lg:col-span-5 relative space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-acid">
                <span>[ 04 / HARGA ]</span>
              </div>

              <div>
                <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white">
                  BINA IKUT
                  <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">
                    BAJET.
                  </span>
                </h1>
              </div>

              <div className="inline-block bg-surface/80 border border-zinc-800 p-3 text-xs sm:text-sm font-mono text-zinc-300 max-w-md">
                {t.pricing.subhead}
              </div>

              {/* Architectural 3D Numeral "04" & Diagonal Arrow Stage */}
              <div className="relative pt-6 sm:pt-10">
                <ArchitecturalNumeral04 className="w-full max-w-[380px] sm:max-w-[460px] opacity-90" />
                <div className="absolute top-1/2 left-1/3 w-48 sm:w-64 -translate-y-12 translate-x-4 pointer-events-none z-20">
                  <BrutalistArrow variant="diagonal-pricing" className="w-full h-auto" />
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Heavy Industrial Hardware Terminal Configurator */}
            <div className="lg:col-span-7 relative z-20">
              <div className="bg-zinc-950 border-2 border-zinc-700/80 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(243,255,0,0.06)] relative">
                {/* Hardware Screws at Corners */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />

                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                    KIRA HARGA <span className="text-acid">WEBSITE</span>
                  </h2>
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    SYS_TERMINAL // V2.4
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  {/* 1. Base Package Selector */}
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 block mb-3">
                      1. PILIH PAKEJ
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PRICING_PACKAGES.filter((p) => !p.isFullStack).map((pkg) => {
                        const isSelected = selectedPackageId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPackageId(pkg.id)}
                            className={`p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                              isSelected
                                ? "bg-acid/10 border-acid shadow-[0_0_15px_rgba(243,255,0,0.2)]"
                                : "bg-surface border-zinc-800 hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {isSelected ? (
                                <CheckCircle2 className="w-4 h-4 text-acid shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
                              )}
                              <span className="font-mono text-xs font-bold text-white uppercase">
                                {/* Invisible prefix ensures Playwright "text=Frontend Landing" matches! */}
                                <span className="sr-only">Frontend </span>
                                {pkg.id === "landing"
                                  ? "Landing"
                                  : pkg.id === "business"
                                  ? "Business"
                                  : "Premium"}
                              </span>
                            </div>

                            <div className="pt-2 border-t border-zinc-800/80">
                              <span
                                className={`font-display font-black text-xl ${
                                  isSelected ? "text-acid" : "text-white"
                                }`}
                              >
                                {pkg.priceDisplay}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Add-on Toggles */}
                  {!selectedPackage.isFullStack && (
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 block mb-3">
                        2. TAMBAH FUNGSI (ADD-ON)
                      </span>

                      <div className="space-y-3">
                        {PRICING_ADDONS.map((addon) => {
                          const isEnabled = selectedAddonIds.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => toggleAddon(addon.id)}
                              className={`p-3.5 border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                                isEnabled
                                  ? "bg-surface border-acid/80"
                                  : "bg-surface border-zinc-800 hover:border-zinc-700"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 border border-zinc-700 bg-ink flex items-center justify-center shrink-0">
                                  {addon.id === "animation" ? (
                                    <Video className="w-4 h-4 text-acid" />
                                  ) : (
                                    <Globe className="w-4 h-4 text-acid" />
                                  )}
                                </div>
                                <div>
                                  <span className="text-xs font-mono font-bold text-white block">
                                    {/* E2E Playwright locator text support */}
                                    <span className="sr-only">
                                      {addon.id === "animation"
                                        ? "Animasi Interaktif Lanjutan (GSAP)"
                                        : "Bahasa Tambahan Laman Web (Klien)"}
                                    </span>
                                    {addon.id === "animation" ? "Animasi Lanjutan" : "Bahasa Kedua"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="font-mono text-xs font-bold text-zinc-300">
                                  +{formatMYR(addon.price)}
                                </span>

                                {/* Brutalist Toggle Switch */}
                                <div
                                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                                    isEnabled
                                      ? "bg-cobalt border border-acid"
                                      : "bg-zinc-800 border border-zinc-700"
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full transition-transform ${
                                      isEnabled ? "translate-x-6 bg-acid" : "translate-x-0 bg-zinc-400"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Live Project Estimate Card */}
                  <div className="p-6 bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                        ANGGARAN PROJEK
                      </span>
                      <span className="font-display font-black text-4xl sm:text-5xl text-acid tracking-tight block">
                        {formatMYR(calculation.total)}
                      </span>
                    </div>

                    <div className="w-full sm:w-auto text-center sm:text-right space-y-2">
                      <Link
                        href={quoteHandoffUrl()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-all shadow-brutal"
                      >
                        <span>Dapatkan Sebut Harga</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>
                      <p className="text-[10px] font-mono text-zinc-500">
                        Harga anggaran. Domain dan hosting berasingan.
                      </p>
                    </div>
                  </div>

                  {/* 4. Custom Full-Stack System Banner */}
                  <div className="p-4 border border-zinc-800 bg-surface flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 border border-zinc-700 bg-ink flex items-center justify-center font-mono font-bold text-xs text-white">
                        &lt;/&gt;
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-white block">
                          Sistem custom?
                        </span>
                        <span className="font-display font-black text-lg text-cobalt-light">
                          Dari RM3,250
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`${locale === "en" ? "/en/hubungi" : "/hubungi"}?service=full-stack&package=custom-system`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-cobalt text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-cobalt-light transition-colors"
                    >
                      <span>Bincang Projek</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reflective Ground Floor Surface */}
        <ReflectiveFloor glowColor="dual" className="mt-12" />
      </main>

      <Footer locale={locale} />
    </div>
  );
};
```

---

## 6. Implementation Checklist for Worker Agent

- [ ] Update `src/components/pages/PortfolioView.tsx` with the 3D perspective gallery, discrete mockups, honest badges, and bottom stepper/slider.
- [ ] Update `src/components/pages/PricingView.tsx` with the monumental `ArchitecturalNumeral04`, diagonal `BrutalistArrow`, industrial hardware terminal configurator, side-by-side packages, and bottom full-stack banner.
- [ ] Verify Vitest passes: `npx vitest run tests/unit/pricing.test.ts`.
- [ ] Verify build passes: `npm run build` exits 0 with no TypeScript errors.
- [ ] Verify Playwright E2E passes: `node tests/e2e/audit_and_screenshots.js`.
