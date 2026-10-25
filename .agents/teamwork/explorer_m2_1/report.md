# Milestone 2 Explorer 1: Layout & Component Restructuring Report
**Target Routes**: `HomeView.tsx` (`/` & `/en`) and `ServicesView.tsx` (`/servis` & `/en/servis`)
**Specialist Role**: Home & Services Layout Specialist
**Status**: Ready for Implementation (Read-Only Investigation)

---

## Executive Summary

This report establishes the comprehensive architectural and visual layout reconstruction for **HomeView** (`01 — Home`) and **ServicesView** (`02 — Services`) to achieve 100% fidelity with approved mockups `design/references/01-home.png` and `design/references/02-services.png`.

### Core Architectural Discoveries & Layout Directives:
1. **HomeView Hero Section**:
   - **Current Flaw**: The seated character is enclosed inside a generic rectangular container card (`border-2 border-zinc-800 ... aspect-[4/5] overflow-hidden`) with a dark gradient, isolating it from the page environment.
   - **Required Solution**: **Unbox** the seated techwear character (`07_hero_seated_character.png`) and physically anchor it atop the stepped 3D concrete plinth (`ConcretePlinth` with `variant="hero-stepped"`, formwork tie-holes, hazard stripes, and yellow arrow stencil).
   - **Background Architecture**: Integrate `ArchitecturalSYA` (the giant 3D axonometric concrete typography with cobalt/acid paint slashes) across the mid-to-upper background, with specular floor reflections (`ReflectiveFloor`) at the base.
   - **Brutalist Headline**: Render `WEB YANG` in towering white condensed typography paired with `BUKAN BIASA.` in a high-contrast yellow brutalist block (`bg-acid text-ink px-4 sm:px-6 py-1 -skew-x-2 shadow-brutal-dark`).
   - **Metadata Ticker**: Integrate `MetadataTicker` at the bottom boundary of the hero section as an industrial transition bar.
   - **390px Mobile Viewport**: Eliminate overlapping character positioning through an unconstrained vertical stack hierarchy.

2. **ServicesView Showcase**:
   - **Current Flaw**: Relies on a legacy interactive tab toggle (`useState<"frontend" | "fullstack">("frontend")`) that completely hides one service category when the other is active, and houses the builder character inside a restrictive boxed card.
   - **Required Solution**: **Replace the tab toggle with dual concurrent brutalist architectural panels** side-by-side (`01 / WEBSITE FRONTEND` with yellow accent & RM645, and `02 / SISTEM FULL-STACK` with cobalt accent & RM3,250).
   - **Builder Character Integration**: Unbox the standing builder character (`02_character_builder_laptop.png`) on the right half, composited against layered cobalt blue geometric slabs (`bg-cobalt` / `#103BFF`), giant yellow chevron arrows, and brutalist concrete plinth monoliths.
   - **Direct CTA Handoffs**: Panel 01 directs immediately to `/harga` (Pricing Studio), while Panel 02 directs to `/hubungi?service=full-stack&package=custom-system`.

---

## 1. HomeView (`src/components/pages/HomeView.tsx`) Layout Reconstruction

### 1.1 Visual Hierarchy & Layer Composition
The hero section must be engineered using a 5-layer z-index composition:

| Layer | Z-Index | Component / Element | Styling & Attributes | Purpose |
|---|---|---|---|---|
| **Layer 0 (Base)** | `z-0` | `IndustrialGrid` | `density="standard" showCrosshairs={true} coordinates="05.83° N, 102.55° E"` | Underlying technical drafting grid |
| **Layer 1 (Architecture)** | `z-0` | `ArchitecturalSYA` | `absolute top-1/2 -translate-y-1/2 right-[-5%] lg:right-[0%] w-[110%] sm:w-[95%] lg:w-[68%] max-w-[1050px] opacity-90 pointer-events-none` | Monumental 3D concrete letters "SYA" with cobalt/acid splashes |
| **Layer 2 (Plinth & Floor)** | `z-10` | `ConcretePlinth` + `ReflectiveFloor` | `ConcretePlinth variant="hero-stepped" hasHazardMarkings={true} hazardPattern="both" cobaltSplash={true}` at base; `ReflectiveFloor glowColor="dual"` at bottom boundary | Volumetric concrete stepping that creates physical support for character |
| **Layer 3 (Character)** | `z-20` | `/assets/characters/07_hero_seated_character.png` | `relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]` | Unboxed techwear character seated realistically on the concrete plinth |
| **Layer 4 (Typography & CTAs)** | `z-30` | Category badges, Headline, Subhead, CTAs | Monospace tags, Oswald condensed typography, yellow brutalist block, brutalist shadow buttons | High-contrast readable foreground content |
| **Layer 5 (Transition Ticker)** | `z-30` | `MetadataTicker` | `border-t border-b border-zinc-800 bg-ink relative z-30` | Live performance, location, and system status bar |

### 1.2 Exact Headline & Brutalist Block Specification
```tsx
{/* Technical Category Tags */}
<div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-6">
  <span className="px-3 py-1 bg-ink/90 border border-acid/50 text-acid font-bold tracking-wider">
    [ PEMBANGUNAN WEBSITE ]
  </span>
  <span className="px-3 py-1 bg-ink/90 border border-zinc-800 text-zinc-400 tracking-wider">
    [ COACHING 1:1 ]
  </span>
</div>

{/* Main Monumental Headline */}
<h1 className="font-display font-black tracking-tighter uppercase leading-[0.88] select-none">
  <span className="block text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white">
    {t.home.headlinePart1}
  </span>
  <span className="inline-block mt-2 bg-acid text-ink px-4 sm:px-6 py-1 sm:py-2 -skew-x-2 shadow-brutal-dark border-2 border-ink">
    <span className="block font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tighter uppercase leading-[0.88] text-ink">
      {t.home.headlinePart2}
    </span>
  </span>
</h1>
```
- In Malay (`ms`): `t.home.headlinePart1` = `"WEB YANG"`, `t.home.headlinePart2` = `"BUKAN BIASA."`
- In English (`en`): `t.home.headlinePart1` = `"WEBSITES"`, `t.home.headlinePart2` = `"BEYOND ORDINARY."`
- Both locales render with identical optical weight, ensuring no layout shifts or broken baselines.

### 1.3 Unboxed Character & Stepped Concrete Composition
```tsx
{/* Right Column: Unboxed Character Anchored on Concrete Plinth */}
<div className="lg:col-span-5 relative flex flex-col items-center justify-end min-h-[460px] sm:min-h-[560px] lg:min-h-[640px]">
  {/* Stepped Concrete Geometry Anchor */}
  <div className="absolute inset-x-0 bottom-0 flex justify-center z-10 pointer-events-none">
    <ConcretePlinth
      variant="hero-stepped"
      hasHazardMarkings={true}
      hazardPattern="both"
      cobaltSplash={true}
      className="w-full max-w-[560px] lg:max-w-[680px]"
    />
  </div>

  {/* Seated Techwear Character Cutout */}
  <div className="relative z-20 w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[520px] pb-4 sm:pb-8 flex items-end justify-center pointer-events-none">
    <Image
      src="/assets/characters/07_hero_seated_character.png"
      alt="SYAHMIAOF Studio Visual Brand Mascot - Seated Techwear Character"
      width={1200}
      height={1310}
      priority
      className="w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
    />
  </div>

  {/* Stenciled Industrial Label Tag (Right Edge) */}
  <div className="absolute right-0 top-1/4 hidden xl:block z-20">
    <div className="bg-ink/90 border border-zinc-800 px-3 py-2 space-y-0.5 text-right font-mono text-[10px]">
      <div className="text-acid font-bold tracking-widest">IDEA / CODE / EXPERIENCE</div>
      <div className="text-zinc-500">SYAHMIAOF // BESUT</div>
    </div>
  </div>
</div>
```

### 1.4 High-Contrast Brutalist CTA Buttons & Scroll Indicator
```tsx
<div className="flex flex-wrap items-center gap-4 pt-4">
  {/* Primary Yellow Brutalist Button */}
  <Link
    href={locale === "en" ? "/en/portfolio" : "/portfolio"}
    className="inline-flex items-center gap-3 px-8 py-4 bg-acid text-ink font-display font-black text-base sm:text-lg uppercase tracking-wider hover:bg-acid-hover transition-transform hover:-translate-y-0.5 shadow-brutal border-2 border-ink"
  >
    <span>{t.home.ctaPortfolio}</span>
    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
  </Link>

  {/* Secondary Outline Brutalist Button */}
  <Link
    href={locale === "en" ? "/en/hubungi" : "/hubungi"}
    className="inline-flex items-center gap-3 px-8 py-4 bg-surface text-white border-2 border-zinc-700 font-display font-bold text-base sm:text-lg uppercase tracking-wider hover:border-acid hover:text-acid transition-colors"
  >
    <span>{t.home.ctaProject}</span>
    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
  </Link>
</div>

{/* Downward Scroll Indicator (Desktop Only) */}
<div className="hidden lg:flex items-center gap-3 text-xs font-mono text-zinc-500 pt-8">
  <span className="text-acid font-bold text-sm">↓</span>
  <span>01 / SERVIS</span>
</div>
```

### 1.5 390px Mobile Viewport Layout Strategy (iPhone Standard)
- **Container Structure**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-20 relative z-20`.
- **Stacking Flow**:
  1. Category Tags: `text-[10px] sm:text-xs`, tight gap.
  2. Headline: `text-5xl` for line 1; line 2 yellow block has `px-3 py-1` padding to stay within the 390px viewport without truncation or horizontal overflow.
  3. Subhead: `text-sm text-zinc-300 max-w-full leading-normal`.
  4. CTA Buttons: Stack vertically with full width (`w-full text-center justify-center`) to provide comfortable thumb tap targets.
  5. Character Composition: Sits naturally below the CTAs (`mt-8 relative w-full max-w-[320px] mx-auto min-h-[360px]`). Plinth geometry renders at full width of the mobile column without clipping.
  6. Reflective Floor: `h-24` positioned underneath plinth.
  7. Metadata Ticker: Wrapped in a horizontal scrolling container (`overflow-x-auto no-scrollbar`) or stacked cleanly with `text-[10px]`.

---

## 2. ServicesView (`src/components/pages/ServicesView.tsx`) Layout Reconstruction

### 2.1 Dual Architectural Panels Replacing Tab Switcher
The interactive tab toggle must be completely removed. In its place, render **both core service offerings concurrently** as dual architectural panels side-by-side:

```tsx
{/* Dual Brutalist Architectural Panels Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-4">
  {/* Panel 01: 01 / WEBSITE FRONTEND */}
  <div className="bg-ink/90 border-2 border-zinc-800 p-6 sm:p-8 relative flex flex-col justify-between hover:border-acid transition-all duration-300 group shadow-xl">
    {/* Top Header Bar */}
    <div>
      <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-zinc-800">
        <span className="text-acid font-black text-sm tracking-wider uppercase">
          01 / WEBSITE FRONTEND
        </span>
        <div className="w-5 h-5 text-zinc-500 group-hover:text-acid transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <line x1="2" y1="9" x2="22" y2="9" />
            <line x1="6" y1="6" x2="6" y2="6" />
            <line x1="10" y1="6" x2="10" y2="6" />
          </svg>
        </div>
      </div>

      {/* Pricing & Offer Summary */}
      <div className="pt-6 pb-4">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
          Bermula
        </span>
        <span className="font-display font-black text-4xl sm:text-5xl text-acid tracking-tight block">
          RM645
        </span>
        <p className="text-xs font-mono text-zinc-300 mt-3">
          Landing Page <span className="text-zinc-600">•</span> Business Website <span className="text-zinc-600">•</span> Premium
        </p>
      </div>
    </div>

    {/* Action CTA Button */}
    <div className="pt-6 border-t border-zinc-800/80">
      <Link
        href={locale === "en" ? "/en/harga" : "/harga"}
        className="inline-flex items-center justify-between w-full px-6 py-3.5 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-acid-hover transition-transform hover:-translate-y-0.5 shadow-brutal"
      >
        <span>Lihat Pakej</span>
        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
      </Link>
    </div>
  </div>

  {/* Panel 02: 02 / SISTEM FULL-STACK */}
  <div className="bg-ink/90 border-2 border-zinc-800 p-6 sm:p-8 relative flex flex-col justify-between hover:border-cobalt transition-all duration-300 group shadow-xl">
    {/* Top Header Bar */}
    <div>
      <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-zinc-800">
        <span className="text-cobalt-light font-black text-sm tracking-wider uppercase">
          02 / SISTEM FULL-STACK
        </span>
        <Database className="w-5 h-5 text-zinc-500 group-hover:text-cobalt-light transition-colors" />
      </div>

      {/* Pricing & Offer Summary */}
      <div className="pt-6 pb-4">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
          Bermula
        </span>
        <span className="font-display font-black text-4xl sm:text-5xl text-cobalt-light tracking-tight block">
          RM3,250
        </span>
        <p className="text-xs font-mono text-zinc-300 mt-3">
          Login <span className="text-zinc-600">•</span> Database <span className="text-zinc-600">•</span> Dashboard
        </p>
      </div>
    </div>

    {/* Action CTA Button */}
    <div className="pt-6 border-t border-zinc-800/80">
      <Link
        href={
          locale === "en"
            ? "/en/hubungi?service=full-stack&package=custom-system"
            : "/hubungi?service=full-stack&package=custom-system"
        }
        className="inline-flex items-center justify-between w-full px-6 py-3.5 bg-cobalt text-white font-display font-black text-sm uppercase tracking-wider hover:bg-cobalt-light transition-transform hover:-translate-y-0.5 shadow-brutal-cobalt"
      >
        <span>Bincang Projek</span>
        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
      </Link>
    </div>
  </div>
</div>
```

### 2.2 Standing Builder Character & Cobalt Architectural Backdrop
- **Asset**: `/assets/characters/02_character_builder_laptop.png`.
- **Right Side Hero Composition**:
```tsx
{/* Right Column: Standing Builder Character with Layered Cobalt Architecture */}
<div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px] lg:min-h-[620px]">
  {/* Layer 1: Layered Cobalt Blue Geometric Slabs */}
  <div className="absolute top-10 right-4 w-72 sm:w-88 h-72 sm:h-88 bg-cobalt -rotate-6 opacity-90 blur-[1px] pointer-events-none" />
  <div className="absolute bottom-16 left-6 w-60 h-60 bg-cobalt-light/40 skew-y-6 pointer-events-none" />

  {/* Layer 2: Giant Hazard Yellow Chevron Arrow Stencil */}
  <div className="absolute top-1/4 right-0 w-64 sm:w-80 pointer-events-none opacity-85">
    <svg viewBox="0 0 300 180" fill="none" className="w-full h-auto drop-shadow-[0_8px_20px_rgba(243,255,0,0.3)]">
      <path d="M 20 160 L 220 40 L 200 30 L 280 20 L 260 100 L 245 85 L 35 175 Z" fill="#F3FF00" />
    </svg>
  </div>

  {/* Layer 3: Concrete Monolith Backdrop */}
  <div className="absolute bottom-0 right-1/4 w-52 h-64 bg-zinc-900 border border-zinc-800 -skew-x-3 pointer-events-none opacity-60" />

  {/* Layer 4: Unboxed Standing Builder Character Cutout */}
  <div className="relative z-10 w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] flex items-end justify-center pointer-events-none">
    <Image
      src="/assets/characters/02_character_builder_laptop.png"
      alt="SYAHMIAOF Studio Standing Builder Character"
      width={1024}
      height={1536}
      priority
      className="w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
    />
  </div>
</div>
```

### 2.3 Detailed Specifications Section (Retaining Full Scope)
Directly beneath the hero dual-panel showcase, maintain the deep technical capabilities and scope boundaries:
1. **Technical Capabilities Grid**:
   - 4 Frontend cards (Landing & Corporate, GSAP Motion, Responsive, Core Web Vitals).
   - 4 Full-Stack cards (Databases & Architecture, RBAC Authentication, Admin Dashboards, API & Webhook Automation).
2. **Deliverables vs Boundaries Side-by-Side Comparison**:
   - Deliverables checklist with green indicators.
   - Engineering boundaries with amber shield alerts.
3. **Bottom Routing Continuity**:
   - Secondary CTA strip pointing to `/harga` and `/coaching`.

---

## 3. Implementation Plan for Implementer Agent

| Step | Target File | Action | Key Verification |
|---|---|---|---|
| **1** | `src/components/pages/HomeView.tsx` | - Replace boxed character card with unboxed `ConcretePlinth` (variant="hero-stepped") + `07_hero_seated_character.png`.<br>- Insert `ArchitecturalSYA` in background layer.<br>- Restructure headline to use high-contrast yellow brutalist block for `BUKAN BIASA.` / `BEYOND ORDINARY.`.<br>- Embed `ReflectiveFloor` and `MetadataTicker`. | Check visually that character sits on concrete steps, letters "SYA" appear behind, and ticker spans bottom. |
| **2** | `src/components/pages/ServicesView.tsx` | - Remove `useState` tab toggle.<br>- Render dual side-by-side panels: `01 / WEBSITE FRONTEND` (RM645) & `02 / SISTEM FULL-STACK` (RM3,250).<br>- Unbox `02_character_builder_laptop.png` with layered cobalt blue background blocks and yellow chevrons.<br>- Wire up direct CTA links: `/harga` and `/hubungi?service=full-stack&package=custom-system`. | Check that both panels are visible simultaneously, buttons navigate correctly. |
| **3** | `src/styles/globals.css` (if needed) | Verify that `--font-display`, `--color-acid`, and `--color-cobalt` apply consistently. | No stylesheet regressions. |
| **4** | Build & Test | Run `npm test` and `npm run build`. | 14/14 unit tests pass, static build completes with 0 errors. |

---

## 4. Mobile (390px) Viewport Safety & Layout Integrity
- Zero horizontal overflow: enforce `overflow-x-hidden` on parent wrappers.
- No absolute positioning traps: on viewports `< 1024px`, character elements must be placed in normal document flow below headlines/CTAs.
- Finger-friendly hit targets: Minimum `48px` button height on mobile for all CTAs.
- Legible typography: Ensure `text-5xl` does not overflow 390px screen width.

---

*Report prepared by Milestone 2 Explorer 1 (Home & Services Layout Specialist).*
