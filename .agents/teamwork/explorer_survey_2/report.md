# SYAHMIAOF STUDIO — CODEBASE & ARCHITECTURE SURVEY REPORT

**Date:** 2026-10-25  
**Investigator:** Survey Explorer 2 (Codebase & Architecture Investigator)  
**Status:** COMPLETED — READ-ONLY SURVEY  
**Project Workspace:** `C:\Users\USER\Desktop\studio.syahmiaof.my`  
**Reference Standards:** `ORIGINAL_REQUEST.md`, `docs/qa/VISUAL_RESCUE_AUDIT.md`, `docs/engineering/ENGINEERING_BLUEPRINT_V1.md`

---

## Executive Summary

This investigation conducted a full, rigorous architectural inspection of the `studio.syahmiaof.my` codebase. 

### Core Assessment:
1. **Functional Core is Solid:** The pricing engine arithmetic, query parameter handoffs (`/harga` & `/coaching` -> `/hubungi`), Zod inquiry validation, honeypot anti-spam, honest mailto fallback, and bilingual switcher logic are fully functional and pass 100% of the 14 Vitest unit tests, `npm run build` static compilation (18 static routes), and Playwright E2E browser tests.
2. **Visual Fidelity Deficit (V1.0 Template State):** The current frontend implementation uses a generic flat SaaS container layout (standard 2-column/3-column CSS flex/grid rows) and outdated headline text tokens instead of the monumental, cinematic Digital Brutalism artwork defined in the 7 approved references (`design/references/01-home.png` to `07-contact.png`).
3. **GSAP & Motion Gap:** Although `gsap` (3.12.5) and `@gsap/react` (2.1.1) are installed in `package.json`, there is **zero GSAP code** in `src/`. No timelines, no ScrollTrigger registrations, and no `prefers-reduced-motion` fallbacks exist.
4. **CSS 3D & Typography Inconsistencies:** `.perspective-1000` and `.preserve-3d` classes exist in `globals.css` but are never applied to any elements. Google Fonts loads `Oswald`, `JetBrains Mono`, and `Plus Jakarta Sans`, but the CSS variables `--font-display`, `--font-sans`, and `--font-mono` are undeclared in CSS, causing the display font to fall back to `Impact`/`Arial Black`.

---

## 1. Project Architecture & File Structure

### 1.1 Technical Stack & Dependencies
* **Framework:** Next.js `14.2.35` (App Router)
* **Runtime / Engine:** React `18.3.1`, React-DOM `18.3.1`, TypeScript `5.6.3`
* **Styling:** Tailwind CSS `3.4.14`, PostCSS `8.4.47`, Autoprefixer `10.4.20`, `clsx` `2.1.1`, `tailwind-merge` `2.5.4`
* **Icons:** `lucide-react` `0.454.0`
* **Schema Validation:** `zod` `3.23.8`
* **Image Processing:** `sharp` `0.35.5`
* **Animation Libraries (Installed):** `gsap` `3.12.5`, `@gsap/react` `2.1.1`
* **Testing:** `vitest` `2.1.9`, `playwright` `1.64.1`

### 1.2 Directory & File Inventory
The workspace follows a clean Next.js App Router layout:

```text
C:\Users\USER\Desktop\studio.syahmiaof.my\
├── .agents/                          # Teamwork coordination & agent metadata
├── design/
│   ├── incoming/                     # Raw initial design uploads
│   ├── originals/                    # Original high-res artwork
│   └── references/                   # 7 Authoritative Reference Mockups (01-home.png to 07-contact.png)
├── docs/
│   ├── design/                       # APPROVED_REFERENCES.md, ASSET_INVENTORY.md
│   ├── engineering/                  # ENGINEERING_BLUEPRINT_V1.md, ANTIGRAVITY_V1_MASTER_PROMPT.md
│   └── qa/                           # VISUAL_RESCUE_AUDIT.md, acceptance-checklist.md, visual-audit.md, screenshots/
├── public/
│   └── assets/
│       ├── characters/               # 6 transparent PNG character cutouts (02, 03, 04, 05, 06, 07)
│       ├── og/                       # OpenGraph graphics (empty)
│       ├── projects/                 # Verified project screenshot assets (currently EMPTY)
│       ├── references/               # Web copies of 01-home.png to 07-contact.png
│       └── textures/                 # Concrete & noise textures (currently EMPTY)
├── src/
│   ├── app/
│   │   ├── api/inquiries/route.ts    # POST /api/inquiries (Zod validation, honeypot, honest 503 fallback)
│   │   ├── layout.tsx                # Root HTML layout with Google Fonts links & metadata
│   │   ├── page.tsx                  # Route: / (BM Home) -> <HomeView locale="ms" />
│   │   ├── servis/page.tsx           # Route: /servis (BM Services) -> <ServicesView locale="ms" />
│   │   ├── portfolio/page.tsx        # Route: /portfolio (BM Portfolio) -> <PortfolioView locale="ms" />
│   │   ├── harga/page.tsx            # Route: /harga (BM Pricing) -> <PricingView locale="ms" />
│   │   ├── coaching/page.tsx         # Route: /coaching (BM Coaching) -> <CoachingView locale="ms" />
│   │   ├── tentang/page.tsx          # Route: /tentang (BM About) -> <AboutView locale="ms" />
│   │   ├── hubungi/page.tsx          # Route: /hubungi (BM Contact) -> <ContactView locale="ms" />
│   │   └── en/                       # English route mirrors
│   │       ├── page.tsx              # Route: /en (EN Home) -> <HomeView locale="en" />
│   │       ├── servis/page.tsx       # Route: /en/servis (EN Services) -> <ServicesView locale="en" />
│   │       ├── portfolio/page.tsx    # Route: /en/portfolio (EN Portfolio) -> <PortfolioView locale="en" />
│   │       ├── harga/page.tsx        # Route: /en/harga (EN Pricing) -> <PricingView locale="en" />
│   │       ├── coaching/page.tsx     # Route: /en/coaching (EN Coaching) -> <CoachingView locale="en" />
│   │       ├── tentang/page.tsx      # Route: /en/tentang (EN About) -> <AboutView locale="en" />
│   │       └── hubungi/page.tsx      # Route: /en/hubungi (EN Contact) -> <ContactView locale="en" />
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Sticky header, navigation, language toggle, mobile drawer
│   │   │   └── Footer.tsx            # 4-column brutalist footer with coordinates & links
│   │   └── pages/
│   │       ├── HomeView.tsx          # 433 lines: Hero B + 5 teaser chapters + final CTA
│   │       ├── ServicesView.tsx      # 213 lines: Category switcher, specifications, builder cutout
│   │       ├── PortfolioView.tsx     # 193 lines: Category pills, project card grid
│   │       ├── PricingView.tsx       # 309 lines: Interactive base package & addon toggles, live invoice
│   │       ├── CoachingView.tsx      # 225 lines: Topic cards, duration pins, mentor cutout
│   │       ├── AboutView.tsx         # 167 lines: Bio, skills radar, pointing character + floating laptop
│   │       └── ContactView.tsx       # 365 lines: Brief form, parameter prefill, mailto fallback
│   ├── content/
│   │   ├── coaching.ts               # Topics (web-fundamentals, react-next, project-mentorship), durations (60, 90)
│   │   ├── projects.ts               # Projects (symi-ui, lamborghini-concept, uberpokmi-ui)
│   │   └── services.ts               # Categories (frontend, fullstack), deliverables, boundaries
│   ├── i18n/
│   │   ├── index.ts                  # getTranslations(locale), SUPPORTED_LOCALES, DEFAULT_LOCALE
│   │   ├── ms.ts                     # Malay dictionary (171 lines)
│   │   └── en.ts                     # English dictionary (171 lines)
│   ├── lib/
│   │   ├── pricing/calculator.ts     # PRICING_PACKAGES, PRICING_ADDONS, calculateFrontendEstimate(), formatMYR()
│   │   ├── types/index.ts            # Locale, ServiceCategory, PricingPackage, ProjectItem, CoachingTopic
│   │   └── validation/inquiry.ts     # Zod schema for inquiry validation & honeypot check
│   └── styles/
│       └── globals.css               # Tailwind directives, CSS variables, brutalist scrollbar, 3D classes
└── tests/
    ├── e2e/
    │   ├── audit_and_screenshots.js  # Playwright E2E audit & full-page screenshot capture
    │   └── capture_v1_baseline.js    # V1.0 baseline capture script
    └── unit/
        ├── inquiry.test.ts           # 6 Vitest tests for Zod validation & honeypot
        └── pricing.test.ts           # 8 Vitest tests for calculator math & edge cases
```

### 1.3 Build & Runtime Verification
* Running `npm test` executes Vitest and passes **14 of 14 unit tests** in `558ms`.
* Running `npm run build` runs `next build` and generates **18 static HTML routes** with zero TypeScript or lint errors. Shared First Load JS is `87.3 kB`, and total page JS sizes are all under `115 kB`.
* Running `npm run test:e2e` spawns the Next.js server on port 3456, runs Playwright against all 7 routes in desktop (1672×941) and mobile (390×844), validates the interactive calculator math, tests URL handoffs, and saves screenshots to `docs/qa/screenshots/`.

---

## 2. Implementation of the 7 Routes and Bilingual Pairs

### 2.1 Route Mapping Table

| Logical Route | Malay Path (`ms`) | English Path (`en`) | Component View | Current Metadata Title (BM) |
|---|---|---|---|---|
| 01. Home | `/` | `/en` | `HomeView` | `SYAHMIAOF STUDIO — WEB YANG BUKAN BIASA` |
| 02. Services | `/servis` | `/en/servis` | `ServicesView` | `Pembangunan Laman Web & Sistem Khas — SYAHMIAOF STUDIO` |
| 03. Portfolio | `/portfolio` | `/en/portfolio` | `PortfolioView` | `Portfolio & Eksperimen Digital — SYAHMIAOF STUDIO` |
| 04. Pricing | `/harga` | `/en/harga` | `PricingView` | `Pricing Studio & Pengira Anggaran — SYAHMIAOF STUDIO` |
| 05. Coaching | `/coaching` | `/en/coaching` | `CoachingView` | `Sesi Coaching 1:1 Web Development — SYAHMIAOF STUDIO` |
| 06. About | `/tentang` | `/en/tentang` | `AboutView` | `Tentang Syahmi AOF — Pembangun Web & Pelajar IT` |
| 07. Contact | `/hubungi` | `/en/hubungi` | `ContactView` | `Mula Projek Anda & Hubungi — SYAHMIAOF STUDIO` |

### 2.2 Internationalization Architecture
* **Routing Strategy:** Static directory mirroring (`/` vs `/en`). Each page file in `src/app/` is a thin Server Component exporting metadata and rendering the respective client view with `locale="ms"` or `locale="en"`.
* **Dictionary Lookup:** `src/i18n/index.ts` exports `getTranslations(locale)` which returns typed dictionary objects from `src/i18n/ms.ts` or `src/i18n/en.ts`.
* **State Preservation on Language Switch:** In `src/components/layout/Header.tsx`, `getToggleUrl()` dynamically inspects `usePathname()` and `useSearchParams()`. When toggling from BM to EN or EN to BM, active query parameters (such as `?package=business&estimate=2145` or `?service=coaching&duration=90`) are strictly preserved.
* **Architecture Anomaly (HTML Lang):** In `src/app/layout.tsx`, `<html lang="ms">` is hardcoded at root layout. English pages at `/en/*` still render `<html lang="ms">`. A dynamic lang attribute or nested layout structure should ideally set `lang="en"` on English routes.
* **Content Discrepancy in Dictionaries:**
  The translation files `ms.ts` and `en.ts` currently contain legacy descriptive headlines instead of the punchy approved headlines mandated in `ORIGINAL_REQUEST.md`:
  - `services.title`: `"PERKHIDMATAN WEB & SISTEM"` (Required: `"BINA IDEA. LANCAR WEB."`)
  - `portfolio.title`: `"PORTFOLIO & EKSPERIMEN DIGITAL"` (Required: `"IDEA JADI REALITI."`)
  - `pricing.title`: `"PRICING STUDIO"` (Required: `"BINA IKUT BAJET."`)
  - `coaching.title`: `"SESI COACHING WEB DEVELOPMENT"` (Required: `"BELAJAR. BINA. DEPLOY."`)
  - `about.title`: `"TENTANG SAYA — SYAHMI AOF"` (Required: `"SAYA SYAHMI AOF."`)

---

## 3. Styling, Theming, Typography & CSS 3D Transforms

### 3.1 Design Tokens & Tailwind Configuration
`tailwind.config.ts` extends the theme with precise brutalist tokens:
* **Palette:**
  - `ink`: `DEFAULT: "#09090B"`, `50: "#18181B"`, `100: "#121216"`, `200: "#1A1A20"`, `border: "#27272A"`, `muted: "#3F3F46"`
  - `surface`: `DEFAULT: "#121216"`, `elevated: "#18181E"`, `hover: "#22222A"`
  - `acid`: `DEFAULT: "#F3FF00"`, `hover: "#D9E500"`, `muted: "rgba(243, 255, 0, 0.12)"`, `border: "rgba(243, 255, 0, 0.4)"`
  - `cobalt`: `DEFAULT: "#103BFF"`, `hover: "#0D30D9"`, `light: "#3B62FF"`, `muted: "rgba(16, 59, 255, 0.15)"`, `border: "rgba(16, 59, 255, 0.4)"`
  - `concrete`: `DEFAULT: "#EEEDE8"`, `muted: "#D8D6CE"`, `dark: "#1A1A1E"`
* **Hard Brutalist Box Shadows:**
  - `shadow-brutal`: `4px 4px 0px 0px #F3FF00`
  - `shadow-brutal-cobalt`: `4px 4px 0px 0px #103BFF`
  - `shadow-brutal-white`: `4px 4px 0px 0px #FFFFFF`
  - `shadow-brutal-dark`: `6px 6px 0px 0px #09090B`
  - `shadow-brutal-lg`: `8px 8px 0px 0px #F3FF00`
* **Custom Scrollbar:** Configured in `globals.css` with 8px width, dark track `#09090b`, zinc thumb `#27272a`, and acid hover `#f3ff00`.

### 3.2 Critical Font Setup Discrepancy
In `src/app/layout.tsx` (lines 58-61), Google Fonts loads:
```html
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Oswald:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```
However, in `tailwind.config.ts`:
```typescript
fontFamily: {
  display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
  sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
  mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
}
```
**Observation & Root Cause:** Neither `globals.css` nor `layout.tsx` defines `--font-display`, `--font-sans`, or `--font-mono` on `:root`!  
Consequently:
* Every element with `font-display` falls back to `Impact` or `Arial Black`, completely ignoring the loaded `Oswald` font.
* Every element with `font-sans` falls back to `system-ui`, ignoring `Plus Jakarta Sans`.
* **Fix needed:** Define `:root { --font-display: 'Oswald', sans-serif; --font-sans: 'Plus Jakarta Sans', sans-serif; --font-mono: 'JetBrains Mono', monospace; }` in `globals.css`.

### 3.3 CSS 3D Transform Utilities
In `src/styles/globals.css`:
```css
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}
```
**Observation:** Although these classes are declared in `globals.css`, **they are not used in any component or page file in `src/`**. In `PortfolioView.tsx`, project cards are rendered inside a flat 3-column CSS grid (`grid grid-cols-1 lg:grid-cols-3 gap-8`) with standard 2D translateY hover (`group hover:-translate-y-1.5`). The dramatic 3D perspective gallery requested in R1/R3 (`rotateY(-12deg)`, `rotateX(6deg)`, `preserve-3d`, depth shadows) is entirely missing from the implementation.

---

## 4. GSAP Setup, Animations & Motion Polish

### 4.1 Dependency & Codebase Scan
* `package.json` includes:
  - `"gsap": "^3.12.5"`
  - `"@gsap/react": "^2.1.1"`
* **Direct Inspection:** A case-insensitive grep across `src/` for `gsap` reveals:
  - **Zero JavaScript/TypeScript imports** (`import gsap from "gsap"`, `import { useGSAP } from "@gsap/react"`, or `import { ScrollTrigger } from "gsap/ScrollTrigger"`).
  - The word "GSAP" appears exclusively in content text strings, feature bullet points, and pricing descriptions.

### 4.2 Current State of Animations
All page interactions currently rely on basic CSS/Tailwind transitions:
* Hover translation: `hover:-translate-y-0.5`, `group-hover:scale-105`
* Pulse: `animate-ping` on status dot
* Laptop toss on About page: Tailwind's stock `animate-bounce` class (`duration-1000`), which causes a comical vertical bouncing effect rather than a controlled, cinematic floating arc above the character's open palm.
* Page reveals: No entrance timelines, no staggered text reveals, and no scroll-triggered depth transitions exist.

### 4.3 Reduced-Motion Status
* Neither `globals.css` nor any component handles `@media (prefers-reduced-motion: reduce)`.
* Although current CSS animations are minimal, there is no formal mechanism to disable transitions or respect accessibility preferences as required by R4.

---

## 5. Shared Layout Components & Atomic Blocks

### 5.1 Header Component (`src/components/layout/Header.tsx`)
* **Behavior:** Fixed sticky bar with scroll-listener (`window.scrollY > 20`) that toggles translucent dark background blur and border.
* **Brutalist Elements:** `w-3 h-3 bg-acid` yellow accent square, `SYAHMIAOF.STUDIO` condensed logo, `[01/07]` coordinate badges, and `shadow-brutal` on CTA button.
* **Active Indicator:** Evaluates `pathname.startsWith(href)` and renders an underline: `<span className="absolute bottom-0 left-3 right-3 h-[2px] bg-acid shadow-[0_0_8px_#F3FF00]" />`.
* **Query String Retention:** When switching language (`EN` / `BM`), `getToggleUrl()` dynamically appends the current search parameters.
* **SSR Safety:** Uses `<Suspense>` wrapper around `HeaderBar` to satisfy Next.js App Router requirements for client components reading `useSearchParams()`.

### 5.2 Footer Component (`src/components/layout/Footer.tsx`)
* **Grid Layout:** 4-column responsive grid on desktop (`Brand`, `Quick Links`, `Contact Info`, `Technical Metadata`).
* **Visual Treatment:** Subdued `.bg-grid-pattern` background, industrial coordinate badge (`BESUT, MY // 05.83° N, 102.55° E`), direct email anchor (`mailto:hello@syahmiaof.my`), and year copyright.

### 5.3 Lack of Reusable Atomic Component Library
* There is no `src/components/ui/` directory.
* Brutalist design blocks (yellow highlight bars, caution stripes, crosshairs, coordinate badges, terminal consoles, and interactive buttons) are directly hardcoded and duplicated as raw Tailwind string lists inside each `*View.tsx` file.
* Centralizing these primitives (e.g. `BrutalistButton`, `BrutalistBadge`, `IndustrialTerminal`, `HazardStripe`) would significantly improve consistency, maintainability, and code reuse across the 7 pages.

---

## 6. Gap Analysis Against ORIGINAL_REQUEST.md

The table below contrasts the current implementation against the authoritative requirements in `ORIGINAL_REQUEST.md`:

| Route / Item | Requirement in ORIGINAL_REQUEST.md | Current Implementation State | Gap Severity | Required Remediation |
|---|---|---|---|---|
| **01 — Home** (`/` & `/en`) | Headline `"WEB YANG BUKAN BIASA."` in yellow brutalist block. Giant 3D angled "SYA" architectural typography in background. Seated techwear character on dark concrete geometry with hazard yellow line markings. High-contrast CTAs & industrial metadata ticker. | Headline split into raw text (`WEB YANG` in white, `BUKAN BIASA.` in yellow text). No yellow brutalist block. **No 3D angled "SYA" typography.** Character sits in a generic 2D aspect-ratio card on the right. | **CRITICAL** | Rebuild Home Hero with yellow rectangular headline badge, composite monumental architectural "SYA" background typography, and seat character on concrete plinth with hazard stripes. |
| **02 — Services** (`/servis` & `/en/servis`) | Headline `"BINA IDEA. LANCAR WEB."` Layered cobalt blue architectural blocks, standing builder character (`02_character_builder_laptop.png`) on the right, distinct brutalist panels for Frontend Websites and Custom Full-Stack Systems. | Headline is `"PERKHIDMATAN WEB & SISTEM"`. Layout is a basic 2-column flex with tab toggle (`frontend` vs `fullstack`). Missing layered cobalt blue architectural blocks behind the builder. | **HIGH** | Update headline to `"BINA IDEA. LANCAR WEB."`. Construct layered cobalt/acid architectural backdrop panels for standing builder character. |
| **03 — Portfolio** (`/portfolio` & `/en/portfolio`) | Headline `"IDEA JADI REALITI."` Dramatic CSS 3D perspective gallery with rotated floating cards (`rotateY`, `rotateX`, depth shadows, neon acid/cobalt borders). Honest badges for SYMI UI, Lamborghini Concept, UberPokmi UI. | Headline is `"PORTFOLIO & EKSPERIMEN DIGITAL"`. Layout is a flat 3-column CSS grid. No 3D rotation (`rotateY`, `rotateX`). `public/assets/projects/` directory is empty. | **CRITICAL** | Update headline to `"IDEA JADI REALITI."`. Implement CSS 3D perspective gallery with `preserve-3d`, `rotateY(-12deg)`, `rotateX(6deg)`, neon border glow, and interactive inspection triggers. |
| **04 — Pricing** (`/harga` & `/en/harga`) | Headline `"BINA IKUT BAJET."` Monumental architectural numeral `"04"`, industrial terminal configurator surface with neon borders, interactive base selector, add-on toggles, dynamic live invoice summary, quote handoff. | Headline is `"PRICING STUDIO"`. Math and quote handoff work 100%, but **monumental architectural numeral "04" is missing**. Configurator looks like a standard web form rather than an industrial terminal console. | **HIGH** | Update headline to `"BINA IKUT BAJET."`. Inject monumental background numeral "04" and restyle controls into an industrial hardware console surface. |
| **05 — Coaching** (`/coaching` & `/en/coaching`) | Headline `"BELAJAR. BINA. DEPLOY."` Colossal cobalt blue `"05"` concrete plinth with seated creator character (`03_character_creator_laptop.png`), interactive 60m / 90m selector pins, curriculum cards. | Headline is `"SESI COACHING WEB DEVELOPMENT"`. **Colossal cobalt "05" plinth is completely missing.** Duration selector uses generic rectangular cards. Character sits in a flat bordered box. | **CRITICAL** | Update headline to `"BELAJAR. BINA. DEPLOY."`. Render colossal cobalt blue `#0038FF` concrete plinth with white "05" graphic, and anchor seated character atop the plinth. |
| **06 — About** (`/tentang` & `/en/tentang`) | Headline `"SAYA SYAHMI AOF."` in high-contrast yellow banner. Dual-asset composition: pointing character (`05_character_pointing_throw.png`) and floating closed laptop (`06_laptop_closed_floating.png`). Protected annotation `"KARAKTER VISUAL JENAMA"` beside character's thigh. | Headline is `"TENTANG SAYA — SYAHMI AOF"` (no yellow banner). Dual assets exist, but floating laptop uses raw Tailwind `animate-bounce` which jerks unnaturally. Thigh annotation is present. | **MEDIUM** | Update headline to `"SAYA SYAHMI AOF."` in yellow brutalist banner. Replace `animate-bounce` with smooth, spatial CSS/GSAP floating transform above the character's hand. |
| **07 — Contact** (`/hubungi` & `/en/hubungi`) | Headline `"IDEA KAU. KITA BINA."` with dynamic yellow brutalist curved arrow pointing to industrial terminal console. Form with Category, Name, Contact, Brief fields, preserving quote/coaching query parameters. | Headline is `"IDEA KAU. KITA BINA."`. Functional prefill and mailto fallback work 100%, but **curved yellow directional arrow is missing**, and form styling is standard flat dark cards. | **MEDIUM** | Add the yellow brutalist curved directional arrow pointing to the console; encase the form within a high-impact industrial terminal shell. |
| **R2: Functional Logic & Arithmetic** | Pricing math: Landing RM645, Business RM1,745, Premium RM2,995, Full-Stack from RM3,250 quote. Addons: GSAP (+RM400), 2nd Lang (+RM250). Quote & coaching parameter handoffs to `/hubungi`. Honeypot anti-spam. Honest mailto fallback. | **100% OPERATIONAL & VERIFIED.** All 14 Vitest unit tests pass; Playwright E2E verifies interactive calculations, URL parameter preservation, honeypot trapping, and 503 fallback. | **NONE (Preserve)** | **STRICT PRESERVATION MANDATED.** Any layout reconstruction must not touch or break `calculator.ts`, `inquiry.ts`, or the query parameter prefill logic. |
| **R3: Asset Engineering** | Use real interactive HTML/CSS components with Tailwind and CSS variables. Composite transparent PNG character cutouts. No static fake screenshots. | All character cutouts (`02` to `07`) exist in `public/assets/characters/`. No fake screenshots used. Architectural background typography and textures remain unbuilt. | **MEDIUM** | Implement SVG/CSS architectural typography layers ("SYA", "04", "05 plinth", hazard stripes, arrows) directly in code. |
| **R4: Motion Polish** | Layered GSAP entrance reveals and subtle scroll parallax on architectural elements. Responsive 390px mobile adaptation. `prefers-reduced-motion` support. | GSAP is installed but **0 lines of GSAP code exist**. No scroll parallax. No `prefers-reduced-motion` handling. Mobile responsive layout exists but lacks tailored framing. | **HIGH** | Register GSAP ScrollTrigger, attach subtle entrance timelines and parallax to background geometry/cutouts, and wrap in `matchMedia` / reduced-motion checks. |
| **R5: Local Build** | Pure local build in `C:\Users\USER\Desktop\studio.syahmiaof.my`. Test on port 3456 or 3002. Zero external deployments. | Builds cleanly locally on port 3456. Zero external network calls or deployments. | **NONE** | Maintain current local build discipline. |

---

## 7. Actionable Roadmap & Recommendations for Specialist Agents

Based on these findings, the visual recovery sprint can be cleanly partitioned among the specialist frontend engineers:

### 1. Bentara (Repo & Shared Foundations)
* Fix the Google Fonts CSS variable definitions in `src/styles/globals.css`:
  ```css
  :root {
    --font-display: 'Oswald', Impact, sans-serif;
    --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  ```
* Update `src/i18n/ms.ts` and `src/i18n/en.ts` dictionaries with the authoritative headline tokens:
  - Services: `"BINA IDEA. LANCAR WEB."`
  - Portfolio: `"IDEA JADI REALITI."`
  - Pricing: `"BINA IKUT BAJET."`
  - Coaching: `"BELAJAR. BINA. DEPLOY."`
  - About: `"SAYA SYAHMI AOF."`
* Create shared SVG/CSS brutalist visual primitives in `src/components/ui/` (Yellow Banner, Monumental Numerals, Hazard Stripes, Curved Directional Arrow).

### 2. Wira (Home & Services Reconstruction)
* **Home (`/`):** Replace raw text heading with yellow brutalist block holding `"WEB YANG BUKAN BIASA."`. Build the giant 3D angled `"SYA"` architectural typography background behind the seated techwear character. Anchor character on concrete pedestal with hazard diagonal stripes.
* **Services (`/servis`):** Apply headline `"BINA IDEA. LANCAR WEB."`. Build the layered cobalt blue `#103BFF` angled panels and composite the standing builder character (`02_character_builder_laptop.png`) on the right.

### 3. Panglima (Portfolio & 3D Perspective Gallery)
* **Portfolio (`/portfolio`):** Apply headline `"IDEA JADI REALITI."`. Implement true CSS 3D perspective gallery using `.perspective-1000` and `.preserve-3d`, rotating cards along `rotateY(-12deg)` and `rotateX(6deg)` with depth shadows, neon acid/cobalt borders, and interactive card lift on hover/focus. Preserve truthful demo badges (`KONSEP DEMO`, `EKSPERIMENTAL`, `FRONTEND DEMO`).

### 4. Laksamana (Pricing & Contact Industrial Consoles)
* **Pricing (`/harga`):** Apply headline `"BINA IKUT BAJET."`. Embed the towering architectural numeral `"04"` in the background. Encase configurator in an industrial hardware terminal frame with neon accents while preserving 100% of `calculateFrontendEstimate()` and URL quote handoff.
* **Contact (`/hubungi`):** Add the dynamic yellow brutalist curved arrow sweeping from `"IDEA KAU. KITA BINA."` toward the form. Restyle form into an industrial terminal console with status lamps while keeping honeypot and mailto fallback intact.

### 5. Cendekia (Coaching & About Reconstruction)
* **Coaching (`/coaching`):** Apply headline `"BELAJAR. BINA. DEPLOY."`. Reconstruct the colossal cobalt blue `"05"` concrete plinth and anchor seated creator character (`03_character_creator_laptop.png`) atop it. Style 60m/90m selectors as industrial toggle pins.
* **About (`/tentang`):** Apply headline `"SAYA SYAHMI AOF."` in yellow banner. Position pointing character (`05_character_pointing_throw.png`) and refine floating closed laptop (`06_laptop_closed_floating.png`) motion path above the open palm. Protect the `"KARAKTER VISUAL JENAMA"` annotation beside the thigh.

### 6. Bayu (GSAP Motion & Reduced-Motion)
* Import and register GSAP and `ScrollTrigger` via `@gsap/react`.
* Implement subtle, high-performance entrance reveals and slight scroll parallax on background numerals ("SYA", "04", "05") and character cutouts.
* Guard all animations with `gsap.matchMedia()` and respect `(prefers-reduced-motion: reduce)`.

### 7. Mata (Visual QA & Regression Gate)
* Execute `npm test` after each page refactor to ensure 0 pricing or validation regressions.
* Run `npm run test:e2e` to capture updated full-page desktop and mobile screenshots in `docs/qa/screenshots/`.
* Compare captures side-by-side against `design/references/01-home.png` through `07-contact.png` to verify ≥ 95% visual fidelity matching.

---

## 8. Conclusion
The foundation of `studio.syahmiaof.my` is mathematically robust, clean, and fully typed. The primary failure is strictly visual and stylistic—an over-reliance on default Next.js dark cards rather than the aggressive, monumental, three-dimensional Digital Brutalism established in the approved reference artworks. By executing the targeted architectural and styling reconstructions outlined above, the engineering team can achieve 100% visual fidelity matching without risking any regression to commercial arithmetic or bilingual functionality.
