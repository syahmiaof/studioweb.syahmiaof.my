# Handoff Report — Explorer M3-2 (Responsive Mobile Polish at 390px)

**Agent**: Explorer M3-2 (`explorer_m3_2`)  
**Role**: READ-ONLY INVESTIGATOR & SYNTHESIS SPECIALIST  
**Date**: 2026-10-25T17:46:00Z  
**Working Directory**: `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m3_2\`  
**Scope**: 390px Mobile Viewport Fine-Tuning across all 7 routes, Mobile Navigation Drawer Usability, Touch Targets (>=44x44px), Character Cutouts Vertical Rhythm, and Zero Horizontal Overflow (`overflow-x: hidden`).

---

## 1. Observation

### 1.1 Empirical Automated Test Observations
- Executed `node tests/e2e/challenger_m2_1_responsive.js` against Next.js production build on port 3456:
  - **70/70 Viewport Overflow Checks PASSED**: Verified across 5 viewport boundaries (390x844, 375x667, 360x800, 320x568, 414x896) on all 14 routes (7 BM, 7 EN) that `document.documentElement.scrollWidth <= window.innerWidth` and `window.scrollX === 0`.
  - **Character Cutout Stacking & Hit-Testing PASSED**: Center-point hit-testing via `document.elementFromPoint(cx, cy)` across all interactive buttons/links confirmed `interceptedCount: 0` (zero blocked buttons or intercepted clicks).
  - **Mobile Touch Interactivity PASSED**: 390px touch emulation confirmed pricing calculation updates (RM645 -> RM2,145 -> RM2,395), quote parameter handoff to `/hubungi`, coaching topic/duration selection, 3D carousel rotation, and contact honeypot/honest fallback.
- Executed `npm test`: 3 test files, 40 passed (40), 0 failed.
- Executed `npx tsc --noEmit`: Exited code 0 with 0 TypeScript errors.

### 1.2 Component Code & Visual Screenshot Observations (`docs/qa/screenshots/mobile/`)

#### Observation 1: Header Mobile Navigation Drawer & Action Controls (`src/components/layout/Header.tsx`)
1. **Language Switcher Tap Target**:
   - `Header.tsx:132-137`:
     ```tsx
     <Link
       href={getToggleUrl()}
       className="flex items-center gap-1 px-2 py-1 text-xs font-mono border border-zinc-800 text-zinc-300 hover:text-acid"
     >
       <span className="font-bold">{locale === "ms" ? "EN" : "BM"}</span>
     </Link>
     ```
     Observed computed dimensions: ~34px width × 24px height. Substantially smaller than the 44×44px Apple HIG / WCAG 2.5.5 minimum touch target recommendation.
2. **Mobile Hamburger Menu Button**:
   - `Header.tsx:138-146`:
     ```tsx
     <button
       type="button"
       onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
       className="p-2 border border-zinc-800 text-zinc-200 hover:text-acid hover:border-acid transition-colors"
       aria-label="Toggle navigation menu"
       aria-expanded={mobileMenuOpen}
     >
       {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
     </button>
     ```
     Observed computed dimensions: 20px icon + 16px padding = 36×36px. Below 44×44px touch target standard.
3. **Drawer Route Navigation Links**:
   - `Header.tsx:156-168`:
     ```tsx
     <Link
       key={link.href}
       href={link.href}
       onClick={() => setMobileMenuOpen(false)}
       className={`block px-3 py-2 text-sm font-semibold uppercase tracking-wider border-l-2 transition-colors ${
         active
           ? "border-acid text-acid bg-zinc-900/40"
           : "border-transparent text-zinc-300 hover:text-white hover:border-zinc-500"
       }`}
     >
       {link.label}
     </Link>
     ```
     Observed height: `py-2` (8px top/bottom) + 20px line-height = ~36px height. Tightly spaced in `space-y-2`, increasing accidental tap rate on mobile thumbs.
4. **Drawer CTA Button**:
   - `Header.tsx:174`:
     ```tsx
     <Link
       href={locale === "en" ? "/en/hubungi" : "/hubungi"}
       onClick={() => setMobileMenuOpen(false)}
       className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider bg-acid text-ink hover:bg-acid-hover transition-colors shadow-brutal"
     >
     ```
     Observed height: `py-2.5` = ~36px height. Needs expansion to minimum 44px.
5. **Drawer Viewport Safety**:
   - `Header.tsx:152`: The overlay is `<div className="md:hidden bg-ink/98 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">`. On short screens (e.g. landscape or smaller mobile displays), links could extend below the screen without vertical scrolling capability (`overflow-y-auto`).

#### Observation 2: CSS Root Horizontal Containment (`src/styles/globals.css`)
- `src/styles/globals.css:25-40`:
  ```css
  html {
    scroll-behavior: smooth;
    background-color: var(--color-ink);
    color: var(--color-white);
    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    overflow-x: hidden;
    min-height: 100vh;
    background-color: var(--color-ink);
    color: var(--color-white);
    position: relative;
  }
  ```
  `body` has `overflow-x: hidden`, but `html` does not have `overflow-x: hidden; max-width: 100%`. In iOS Safari (WebKit), 3D perspective transforms on child elements can cause lateral rubber-banding unless the `html` root explicitly declares `overflow-x: hidden; max-width: 100%`.

#### Observation 3: Route 01 — Home (`HomeView.tsx` & `01-home.png`)
- `HomeView.tsx:54-56`:
  ```tsx
  <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] sm:right-[-5%] lg:right-[0%] w-[120%] sm:w-[95%] lg:w-[68%] max-w-[1100px] opacity-85 pointer-events-none z-0">
    <ArchitecturalSYA />
  </div>
  ```
  On 390px mobile, `top-1/2 -translate-y-1/2` places the center of the giant 3D SYA directly behind the Technical Meta Bar (`HomeView.tsx:117-130: LOKASI / KADAR PRESTASI / STATUS`). The bright blue architectural polygon behind the text reduces contrast on small viewports.
- `HomeView.tsx:171`:
  ```tsx
  <ReflectiveFloor glowColor="dual" height="h-28 sm:h-36" />
  ```
  `h-28` produces 112px of vertical dark spacing between the character plinth and the `MetadataTicker` on mobile.
- `HomeView.tsx:98-114`: Hero CTAs (`LIHAT PORTFOLIO` and `MULAKAN PROJEK`) use `px-8 py-4` and span partially across mobile width rather than full-width `w-full sm:w-auto`.

#### Observation 4: Route 02 — Services (`ServicesView.tsx` & `02-services.png`)
- `ServicesView.tsx:90, 128`: Dual panel buttons ("Lihat Pakej" & "Bincang Projek") use `px-5 py-3 text-xs`, computing to ~42px height, just shy of 44px.
- `ServicesView.tsx:311-325`: Bottom strip CTAs ("Buka Pricing Studio" & "Hubungi Studio") use `px-6 py-3 text-xs` (~42px) and do not have `w-full sm:w-auto justify-center` on mobile.

#### Observation 5: Route 03 — Portfolio (`PortfolioView.tsx` & `03-portfolio.png`)
- `PortfolioView.tsx:196, 204`: Slider Prev/Next navigation controls:
  ```tsx
  <button
    type="button"
    onClick={handlePrev}
    aria-label="Previous project"
    className="w-10 h-10 border border-zinc-700 bg-surface flex items-center justify-center text-zinc-300 hover:bg-acid hover:text-ink hover:border-acid transition-colors"
  >
  ```
  `w-10 h-10` produces exactly 40×40px tap target, below the 44×44px standard.
- `PortfolioView.tsx:212`: `#project-details` uses `mt-16` (64px) top margin on mobile, creating excessive vertical scroll before reaching specifications.

#### Observation 6: Route 04 — Pricing (`PricingView.tsx` & `04-pricing.png`)
- `PricingView.tsx:90-95`:
  ```tsx
  <div className="relative pt-6 sm:pt-10">
    <ArchitecturalNumeral04 className="w-full max-w-[380px] sm:max-w-[460px] opacity-90" />
    <div className="absolute top-1/2 left-1/3 w-48 sm:w-64 -translate-y-12 translate-x-4 pointer-events-none z-20">
      <BrutalistArrow variant="diagonal-pricing" className="w-full h-auto" />
    </div>
  </div>
  ```
  On 390px mobile, the monumental 04 numeral is rendered with `pt-6` and `max-w-[380px]`, occupying ~340px vertical space before the user can see or interact with base packages.
- `PricingView.tsx:268`: Custom fullstack CTA button uses `px-5 py-3 text-xs` (~42px height).

#### Observation 7: Route 05 — Coaching (`CoachingView.tsx` & `05-coaching.png`)
- `CoachingView.tsx:96`: Topic selection buttons (`Asas Web`, `React / Next.js`, `Mentor Projek`) use `p-3 text-left border-2`, computing to ~42-44px depending on text wrapping.
- Plinth 05 and seated creator character stack naturally below the booking card (`CoachingView.tsx:174-188`), perfectly visible in `05-coaching.png`.

#### Observation 8: Route 06 — About (`AboutView.tsx` & `06-about.png`)
- `AboutView.tsx:116-131`: Dual action CTAs ("Lihat Portfolio", "Bincang Projek") stack nicely in `06-about.png`, but could be styled with `w-full sm:w-auto justify-center` for consistent full-width mobile ergonomics.
- Protected annotation `KARAKTER VISUAL JENAMA` and leader line (`AboutView.tsx:164-176`) sit cleanly at `bottom-16 right-0 sm:right-4` without clipping or horizontal overflow.

#### Observation 9: Route 07 — Contact (`ContactView.tsx` & `07-contact.png`)
- `ContactView.tsx:305`: Service category buttons (`Website UI`, `Sistem Lengkap`, `Coaching 1:1`) use `p-3 text-left text-xs font-mono`, computing to ~44px.
- `ContactView.tsx:263`: Direct mailto fallback button uses `px-4 py-2.5 text-xs` (~38px height).
- `ContactView.tsx:193`: Brutalist curved arrow is already hidden on mobile (`hidden lg:block`), preserving mobile vertical flow.

---

## 2. Logic Chain

1. **Step 1: Baseline Verification via Automated E2E & Screen Audits**
   - Observations 1.1 confirm that the application is functional and free from structural overflow (`0/70 overflow errors`), with zero character-button click interception.
   - Therefore, no radical layout restructuring is required; the focus must be on **ergonomic touch refinement**, **vertical cadence tuning**, and **defensive root containment**.

2. **Step 2: Touch Target Sizing (WCAG 2.5.5 Level AAA & Apple HIG)**
   - Apple's Human Interface Guidelines and WCAG 2.5.5 mandate a minimum interactive target size of 44×44 CSS pixels.
   - Observations 1.2.1, 1.2.4, 1.2.5, 1.2.6, 1.2.7, and 1.2.9 identify specific controls measuring between 24px and 42px:
     - Header hamburger: 36×36px
     - Header language toggle: 34×24px
     - Header drawer links: ~36px height
     - Portfolio carousel buttons: 40×40px
     - Services & Pricing secondary action buttons: ~42px height
   - Logic: Upgrading these elements with `min-h-[44px] min-w-[44px]` or `py-3.5` resolves all touch target deficiencies without altering the digital brutalist visual appearance.

3. **Step 3: Mobile Navigation Drawer Ergonomics**
   - Observation 1.2.1 shows that drawer links have `py-2` with `space-y-2`.
   - Expanding link padding to `py-3 px-4 min-h-[44px] flex items-center` provides comfortable thumb spacing.
   - Adding `max-h-[calc(100vh-4rem)] overflow-y-auto` guarantees drawer accessibility across all viewport heights (e.g. landscape mode or smaller phones).

4. **Step 4: Character Cutout Rhythm & Contrast Tuning**
   - On Route 01 (Home), Observation 1.2.3 shows that `ArchitecturalSYA` at `opacity-85` intersects with the technical metadata bar on 390px screens. Setting `opacity-40 sm:opacity-85` on the 3D SYA preserves the architectural depth while maximizing metadata text legibility.
   - Adjusting `ReflectiveFloor` from `h-28` to `h-16 sm:h-28` eliminates 48px of dead vertical gap on mobile.
   - On Route 04 (Pricing), Observation 1.2.6 shows that the 04 numeral can be scaled to `max-w-[280px] sm:max-w-[380px]` with `pt-3 sm:pt-8` so the interactive configurator appears closer to the fold.

5. **Step 5: Defensive Zero-Horizontal-Overflow Hardening**
   - Observation 1.2.2 shows `body` has `overflow-x: hidden`, but `html` lacks root containment.
   - Adding `overflow-x: hidden; max-width: 100%` to `html` in `globals.css` shields the site from iOS Safari edge-swipe bounce effects caused by CSS 3D transforms.

---

## 3. Caveats

1. **Port Constraint**: Dev and test execution must use port 3456 or 3002. Never touch port 3000.
2. **Read-Only Investigation**: As Explorer M3-2, no direct modifications have been made to production source files. All proposals below are precise, actionable recipes for Worker M3-2.
3. **Preservation of Functional Arithmetic**: None of the proposed CSS and padding changes alter or touch `src/lib/pricing/calculator.ts`, form submission logic, or query string handoffs.

---

## 4. Conclusion & Actionable Worker Recommendations

### Summary Matrix of Recommended Polish Changes

| # | File Path | Lines | Element | Current Code | Proposed Replacement | Rationale |
|---|---|---|---|---|---|---|
| **1** | `src/styles/globals.css` | 25–33 | `html` selector | `html { scroll-behavior: smooth; ... }` | Add `overflow-x: hidden; max-width: 100%;` | Prevents iOS Safari horizontal rubber-banding |
| **2** | `src/components/layout/Header.tsx` | 131–137 | Language Switcher | `className="flex items-center gap-1 px-2 py-1 text-xs font-mono border border-zinc-800 text-zinc-300 hover:text-acid"` | `className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2.5 py-2 text-xs font-mono border border-zinc-800 text-zinc-300 hover:text-acid hover:border-acid transition-colors"` | Meets 44×44px touch target standard |
| **3** | `src/components/layout/Header.tsx` | 138–146 | Hamburger Button | `className="p-2 border border-zinc-800 text-zinc-200 hover:text-acid hover:border-acid transition-colors"` | `className="min-h-[44px] min-w-[44px] p-2.5 flex items-center justify-center border border-zinc-800 text-zinc-200 hover:text-acid hover:border-acid transition-colors"` | Meets 44×44px touch target standard |
| **4** | `src/components/layout/Header.tsx` | 151–153 | Mobile Overlay Container | `<div className="md:hidden bg-ink/98 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">` | `<div className="md:hidden bg-ink/98 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto">` | Prevents clipping on short screens |
| **5** | `src/components/layout/Header.tsx` | 160 | Mobile Nav Links | `className="... block px-3 py-2 text-sm ..."` | `className="... min-h-[44px] flex items-center px-4 py-3 text-sm ..."` | 44px touch target with generous thumb area |
| **6** | `src/components/layout/Header.tsx` | 174 | Mobile Drawer CTA | `className="... py-2.5 text-xs font-bold ..."` | `className="... min-h-[44px] py-3.5 text-xs font-bold ..."` | Prominent 44px primary action button |
| **7** | `src/components/layout/Footer.tsx` | 66 | Footer Quick Links | `className="text-sm text-zinc-400 hover:text-acid transition-colors inline-flex items-center gap-1 group"` | `className="text-sm text-zinc-400 hover:text-acid transition-colors inline-flex items-center gap-1 py-1 group"` | Better touch separation between stacked links |
| **8** | `src/components/pages/HomeView.tsx` | 54 | 3D SYA Backdrop | `... opacity-85 pointer-events-none z-0` | `... opacity-40 sm:opacity-85 pointer-events-none z-0` | Improves metadata text readability on 390px |
| **9** | `src/components/pages/HomeView.tsx` | 98–114 | Hero Action CTAs | `flex flex-wrap items-center gap-4 pt-2` | Add `w-full sm:w-auto` to both `<Link>` tags | Consistent full-width buttons on mobile |
| **10** | `src/components/pages/HomeView.tsx` | 171 | Reflective Floor | `height="h-28 sm:h-36"` | `height="h-16 sm:h-28 lg:h-36"` | Tightens vertical cadence before ticker |
| **11** | `src/components/pages/ServicesView.tsx` | 90, 128 | Dual Panel Buttons | `px-5 py-3 bg-acid ...` | `min-h-[44px] px-5 py-3.5 bg-acid ...` | Guarantees >=44px touch target |
| **12** | `src/components/pages/ServicesView.tsx` | 313, 320 | Bottom Strip CTAs | `px-6 py-3 ...` | `min-h-[44px] px-6 py-3.5 w-full sm:w-auto justify-center ...` | Full-width 44px touch targets on mobile |
| **13** | `src/components/pages/PortfolioView.tsx` | 196, 204 | Carousel Slider Arrows | `className="w-10 h-10 border ..."` | `className="w-11 h-11 min-w-[44px] min-h-[44px] border ..."` | Meets 44×44px touch target standard |
| **14** | `src/components/pages/PortfolioView.tsx` | 212 | Project Details Spacing | `className="mt-16 p-6 sm:p-8 ..."` | `className="mt-8 sm:mt-16 p-6 sm:p-8 ..."` | Reduces dead scroll on mobile |
| **15** | `src/components/pages/PortfolioView.tsx` | 266 | Project CTA Button | `className="px-6 py-4 bg-acid ..."` | `className="w-full sm:w-auto justify-center px-6 py-4 bg-acid ..."` | Full-width mobile touch target |
| **16** | `src/components/pages/PricingView.tsx` | 90 | Architectural 04 Spacing | `className="relative pt-6 sm:pt-10"` | `className="relative pt-3 sm:pt-10"` and `max-w-[280px] sm:max-w-[380px]` | Brings configurator closer to fold on mobile |
| **17** | `src/components/pages/PricingView.tsx` | 268 | Fullstack CTA Button | `className="w-full sm:w-auto ... px-5 py-3 ..."` | `className="w-full sm:w-auto ... min-h-[44px] px-5 py-3.5 ..."` | Meets 44px touch target standard |
| **18** | `src/components/pages/CoachingView.tsx` | 96 | Topic Selector Buttons | `className="p-3 text-left ..."` | `className="min-h-[44px] p-3.5 text-left ..."` | Guarantees >=44px across all font scalings |
| **19** | `src/components/pages/AboutView.tsx` | 118, 126 | Dual Action CTAs | `className="px-6 sm:px-8 py-3.5 sm:py-4 ..."` | Add `w-full sm:w-auto justify-center` | Full-width mobile buttons |
| **20** | `src/components/pages/ContactView.tsx` | 305 | Category Radio Buttons | `className="p-3 text-left ..."` | `className="min-h-[44px] p-3.5 text-left ..."` | Guarantees >=44px touch height |
| **21** | `src/components/pages/ContactView.tsx` | 263 | Mailto Fallback Button | `className="... px-4 py-2.5 ..."` | `className="... min-h-[44px] px-4 py-3 ..."` | Comfortable fallback touch target |

---

## 5. Verification Method

To independently verify the implementation of these recommendations:

1. **Verify Unit Tests & TypeScript**:
   ```powershell
   npm test
   npx tsc --noEmit
   ```
   *Expected*: 40/40 Vitest unit tests pass, 0 TypeScript errors.

2. **Verify Mobile Overflow & Interactivity Test Suite**:
   ```powershell
   node tests/e2e/challenger_m2_1_responsive.js
   ```
   *Expected*: Code 0, 70/70 viewport checks PASS, 0 horizontal scroll on 390px, 375px, 360px, 320px, 414px.

3. **Verify DOM Element Dimensions (Touch Target Audit via Playwright/Console)**:
   In Chrome DevTools or Playwright at 390×844:
   ```javascript
   // Verify hamburger button
   const btn = document.querySelector("button[aria-label='Toggle navigation menu']");
   console.assert(btn.getBoundingClientRect().width >= 44 && btn.getBoundingClientRect().height >= 44);

   // Verify language toggle
   const lang = document.querySelector("a[title*='Switch to']");
   console.assert(lang.getBoundingClientRect().width >= 44 && lang.getBoundingClientRect().height >= 44);

   // Verify carousel buttons
   const prev = document.querySelector("button[aria-label='Previous project']");
   console.assert(prev.getBoundingClientRect().width >= 44 && prev.getBoundingClientRect().height >= 44);
   ```

4. **Verify Production Build**:
   ```powershell
   npm run build
   ```
   *Expected*: Code 0, 18/18 static routes generated.
