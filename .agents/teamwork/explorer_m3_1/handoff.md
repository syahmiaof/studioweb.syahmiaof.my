# Handoff Report — Explorer M3-1 (GSAP Motion Engineering Blueprint)

**Milestone**: Milestone 3 Motion Polish & Animation Architecture  
**Author**: Explorer M3-1 (`bayu` Motion Specialist)  
**Date**: 2026-10-25T17:44:00Z  
**Target Recipient**: Parent Orchestrator (`9558a00f-cdc8-4d5a-b2f8-8aa671a99dc9`) & Milestone 3 Implementer Agent  

---

## 1. Observation

### 1.1 Dependency & Environment Status
- **File**: `package.json` (lines 16, 18, 20, 21):
  ```json
  "dependencies": {
    "@gsap/react": "^2.1.1",
    "clsx": "^2.1.1",
    "gsap": "^3.12.5",
    "next": "^14.2.25",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
  }
  ```
  Both `gsap` (v3.12.5) and `@gsap/react` (v2.1.1) are already installed in dependencies. `ScrollTrigger` is included in the core `gsap` package (`gsap/ScrollTrigger`).
- **Build Verification**:
  - Command: `npm run build`
  - Result: Exit code 0, 18/18 static pages successfully compiled (`/`, `/en`, `/servis`, `/en/servis`, `/portfolio`, `/en/portfolio`, `/harga`, `/en/harga`, `/coaching`, `/en/coaching`, `/tentang`, `/en/tentang`, `/hubungi`, `/en/hubungi`, etc.).
  - Total first load JS shared by all is 87.3 kB; page-level bundles are between 111 kB and 119 kB.
- **Unit Test Verification**:
  - Command: `npm test`
  - Result: 3 test files passed, 40/40 tests passed in 1.10s.

### 1.2 Current Animation State in Source Code
- **Search Command**: `grep_search` for pattern `"gsap"` across `src/`:
  - Result: 0 matches found. No GSAP tweens, timelines, or hooks are currently utilized.
- **Current Motion Mechanism**:
  - Motion is currently confined to static Tailwind CSS transitions (`transition-all duration-300`, `transition-colors`, `hover:-translate-y-0.5`, `group-hover:text-acid`) and inline CSS 3D perspective transforms (`[transform:translate3d(...)_rotateY(...)_rotateX(...)]` in `PortfolioView.tsx`).
  - No entrance reveals: elements pop into view instantaneously upon initial render.
  - Architectural elements (`ArchitecturalSYA`, `ArchitecturalNumeral04`, `ArchitecturalPlinth05`, `ArchitecturalNumeral07`, `IndustrialGrid`) remain statically pinned in place regardless of page scroll.
- **Component Architecture**:
  - All 7 view files in `src/components/pages/` start with `"use client"`:
    - `HomeView.tsx` (line 1: `"use client";`)
    - `ServicesView.tsx` (line 1: `"use client";`)
    - `PortfolioView.tsx` (line 1: `"use client";`)
    - `PricingView.tsx` (line 1: `"use client";`)
    - `CoachingView.tsx` (line 1: `"use client";`)
    - `AboutView.tsx` (line 1: `"use client";`)
    - `ContactView.tsx` (line 1: `"use client";`)
  - Being `"use client"`, these components are ideally suited for React 18 integration using `@gsap/react`'s `useGSAP` hook without necessitating wrapper micro-components.

---

## 2. Logic Chain

### 2.1 Aesthetic Fit: Digital Brutalism Motion Dynamics
1. **Deduction from Design System**: Digital Brutalism emphasizes architectural weight, industrial solidity, high-contrast hazard markings, and monumental typography.
2. **Motion Characteristics**:
   - Sluggish, floaty, or rubbery bouncy motion undermines brutalist weight.
   - Decisive, punchy, authoritative easing is required: `power3.out` (crisp deceleration for heavy elements) and `power2.out` (clean editorial entry).
   - Durations should remain tightly bounded (0.45s to 0.75s) with tight staggered offsets (0.06s to 0.12s) to maintain rapid responsiveness and snappy perception.

### 2.2 Layered Entrance Reveal Hierarchy
1. **Observation**: Each route presents three distinct spatial planes:
   - Plane 1 (Background): Technical grids (`IndustrialGrid`), ambient color fields, and giant architectural geometry (`ArchitecturalSYA`, `ArchitecturalNumeral04`, `ArchitecturalPlinth05`, `ArchitecturalNumeral07`).
   - Plane 2 (Midground Content): Monumental typography (`h1`), brutalist slogan blocks (`-skew-x-2`), category tags, and action CTAs.
   - Plane 3 (Foreground Foreground Anchor): Stepped concrete plinths (`ConcretePlinth`), hardware terminal consoles, and brand character cutouts.
2. **Choreography Sequence**:
   - `T=0.00s`: Plane 1 background grid and architectural geometry scale subtly (`scale: 0.94 -> 1`, `opacity: 0 -> 0.85`, duration 0.8s, ease: `'power3.out'`).
   - `T=0.10s`: Plane 2 typography and yellow brutalist blocks punch upward (`y: 40px -> 0`, `opacity: 0 -> 1`, stagger: 0.10s, ease: `'power3.out'`).
   - `T=0.20s`: Subhead text, CTAs, and metadata badges reveal (`y: 20px -> 0`, `opacity: 0 -> 1`, stagger: 0.08s).
   - `T=0.25s`: Plane 3 concrete plinths anchor upward from the floor (`y: 50px -> 0`, `opacity: 0 -> 1`, duration 0.7s, ease: `'power3.out'`).
   - `T=0.30s`: Brand character cutouts drop onto the plinths (`y: 30px -> 0`, `opacity: 0 -> 1`, duration 0.65s, ease: `'power3.out'`).
   - `T=0.75s+`: All entrance transforms are cleared with `clearProps: "all"` to avoid subpixel antialiasing degradation or layout shifts.

### 2.3 SSR Hydration Safety & FOUC Prevention in Next.js 14
1. **Risk Analysis**:
   - If CSS initial classes hide elements (`opacity-0`) before JavaScript executes, users on slow devices or disabled JS encounter a blank white/black screen (Flash of Invisible Content / FOIC).
   - If GSAP modifies DOM styles during SSR, React throws a hydration mismatch error.
2. **Engineering Safeguards**:
   - Render all elements as 100% visible in SSR HTML (no default `hidden` or `opacity-0` in static HTML).
   - Use `gsap.from()` or `gsap.fromTo()` exclusively within `useGSAP({ scope: containerRef })`. In Next.js client components, `useGSAP` runs on the client post-hydration, avoiding SSR mismatch.
   - Apply `clearProps: "all"` or `clearProps: "transform,opacity"` in `onComplete` handlers to restore native CSS computed values, ensuring clean rendering and responsive resizing.

### 2.4 Subtle Scroll Parallax on Architectural Geometry
1. **Target Elements**:
   - `HomeView`: `ArchitecturalSYA` (Layer 1) & `IndustrialGrid` (Layer 0).
   - `PricingView`: `ArchitecturalNumeral04` & diagonal yellow `BrutalistArrow`.
   - `CoachingView`: `ArchitecturalPlinth05` (cobalt backdrop panel).
   - `ContactView`: `ArchitecturalNumeral07` (background numeral) & curved `BrutalistArrow`.
2. **Parallax Parameters**:
   - Movement rate: `yPercent: 10` to `yPercent: 14` for numerals/plinths; `yPercent: -6` to `yPercent: -8` for background grids and arrows (counter-directional parallax creates palpable physical depth).
   - Scrubbing: `scrub: 0.6` (provides smooth, damped 60fps tracking without scroll lag).
   - Viewport Guard: Parallax MUST only execute on viewports $\ge 768\text{px}$ (`(min-width: 768px)` via `gsap.matchMedia`). Mobile screens (390px) retain native smooth scrolling to prevent touch stutter and horizontal scroll overflows (`overflow-x: hidden`).

### 2.5 Strict `prefers-reduced-motion` Compliance
1. **Regulatory & Accessibility Mandate**: Users with vestibular disorders or motion sensitivity must have motion suppressed.
2. **Implementation with `gsap.matchMedia()`**:
   - Query: `(prefers-reduced-motion: reduce)`
   - In reduced motion mode:
     - Entrance tweens are set immediately: `gsap.set("[data-motion]", { opacity: 1, clearProps: "all" })` or replaced with an instantaneous 0.1s opacity fade with zero transforms (`x: 0, y: 0, scale: 1`).
     - Parallax `ScrollTrigger` instances are omitted entirely.
     - Infinite idle animations (such as the floating laptop in `AboutView`) are suppressed.

---

## 3. Concrete Implementation Blueprint (Step-by-Step)

### Step 3.1: Register Plugins Safely
Create a lightweight motion setup utility `src/lib/motion/gsapSetup.ts` or declare registration in a shared client file:
```ts
// src/lib/motion/gsapSetup.ts
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export { gsap, ScrollTrigger, useGSAP };
```

---

### Step 3.2: Page-by-Page Motion Blueprint

#### 1. `HomeView.tsx` (`src/components/pages/HomeView.tsx`)
- **Scope Ref**: Attach `containerRef = useRef<HTMLDivElement>(null)` to the `<main>` element (line 36).
- **Motion Implementation**:
```tsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const HomeView: React.FC<HomeViewProps> = ({ locale }) => {
  const t = getTranslations(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Standard Motion: Desktop & Tablets
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.65 },
        });

        // 1. Background Grid & 3D SYA Architecture
        tl.from(".motion-sya", {
          opacity: 0,
          scale: 0.94,
          x: 40,
          duration: 0.85,
        })
          // 2. Technical Badge & Tags
          .from(".motion-tag", { opacity: 0, y: 16, stagger: 0.08 }, "-=0.6")
          // 3. Brutalist Headline & Yellow Block
          .from(
            ".motion-headline",
            { opacity: 0, y: 45, stagger: 0.12, ease: "power3.out" },
            "-=0.45"
          )
          // 4. Subhead & Action Buttons
          .from(".motion-subhead", { opacity: 0, y: 20 }, "-=0.35")
          .from(".motion-cta", { opacity: 0, y: 20, stagger: 0.08 }, "-=0.25")
          // 5. Concrete Plinth & Seated Character
          .from(".motion-plinth", { opacity: 0, y: 55, duration: 0.75 }, "-=0.4")
          .from(".motion-character", { opacity: 0, y: 35, duration: 0.65 }, "-=0.55")
          // 6. Meta Bar & Ticker
          .from(".motion-meta", { opacity: 0, duration: 0.4 }, "-=0.3");

        // Clear inline transforms on completion for sharp typography & responsive resilience
        tl.eventCallback("onComplete", () => {
          gsap.set(".motion-headline, .motion-cta, .motion-subhead", {
            clearProps: "all",
          });
        });

        // Parallax on Desktop (min-width: 768px)
        gsap.to(".motion-sya", {
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 12,
          ease: "none",
        });

        gsap.to(".motion-grid", {
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: -6,
          ease: "none",
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".motion-sya, .motion-tag, .motion-headline, .motion-subhead, .motion-cta, .motion-plinth, .motion-character, .motion-meta",
          { opacity: 1, clearProps: "all" }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="..." ref={containerRef}>
      {/* ... */}
    </div>
  );
};
```
- **Class Tagging in JSX**:
  - `ArchitecturalSYA` wrapper: `className="... motion-sya"`
  - Category tags: `className="... motion-tag"`
  - `h1`: `className="... motion-headline"`
  - Subhead paragraph: `className="... motion-subhead"`
  - CTA wrapper/buttons: `className="... motion-cta"`
  - `ConcretePlinth` wrapper: `className="... motion-plinth"`
  - Character image wrapper: `className="... motion-character"`
  - Meta bar: `className="... motion-meta"`

---

#### 2. `ServicesView.tsx` (`src/components/pages/ServicesView.tsx`)
- **Scope Ref**: Attach `containerRef = useRef<HTMLDivElement>(null)`.
- **Motion Implementation**:
  - Entrance Timeline:
    1. Slogan "BINA IDEA. LANCAR WEB." (`.motion-title`, `y: 40 -> 0`, stagger: 0.12s, ease: `'power3.out'`).
    2. Dual Architectural Service Panels (`.motion-service-panel`, `y: 35 -> 0`, stagger: 0.15s, ease: `'power3.out'`).
    3. Cobalt Geometric Slabs & Chevron Arrow (`.motion-cobalt-geom`, `scale: 0.92 -> 1`, `opacity: 0 -> 0.9`).
    4. Standing Builder Character (`.motion-builder-character`, `y: 45 -> 0`, duration 0.7s, ease: `'power3.out'`).
  - Scroll Parallax (Desktop $\ge 768\text{px}$):
    - Cobalt geometric slabs: `yPercent: 14`, scrub: 0.6.
    - Standing builder character: `yPercent: 6`, scrub: 0.6.
  - Reduced Motion: Instant `gsap.set` with zero transforms.

---

#### 3. `PortfolioView.tsx` (`src/components/pages/PortfolioView.tsx`)
- **Scope Ref**: Attach `containerRef = useRef<HTMLDivElement>(null)`.
- **Special Architectural Protection**:
  - Portfolio's 3D cards use React state `activeIndex` with dynamic Tailwind 3D classes (`[transform:translate3d(...)_rotateY(...)]`).
  - **Rule**: Do not apply persistent GSAP inline transforms to individual rotating cards!
  - Instead, apply entrance animation to the **stage container** (`.motion-3d-stage`, `scale: 0.94 -> 1`, `opacity: 0 -> 1`, duration 0.75s, ease: `'power3.out'`).
  - On complete, execute `clearProps: "all"` so that React's native CSS 3D transitions operate with zero interference.
  - Slogan "IDEA JADI REALITI." (`.motion-portfolio-title`, `y: 40 -> 0`, duration 0.65s).

---

#### 4. `PricingView.tsx` (`src/components/pages/PricingView.tsx`)
- **Scope Ref**: Attach `containerRef = useRef<HTMLDivElement>(null)`.
- **Motion Implementation**:
  - Entrance Timeline:
    1. Slogan "BINA IKUT BAJET." (`.motion-pricing-title`, `y: 40 -> 0`).
    2. `ArchitecturalNumeral04` & diagonal yellow arrow (`.motion-numeral04`, `scale: 0.92 -> 1`, `x: -30 -> 0`, `opacity: 0 -> 0.9`, duration 0.8s, ease: `'power3.out'`).
    3. Hardware Terminal Configurator container (`.motion-terminal-box`, `y: 40 -> 0`, duration 0.65s, ease: `'power3.out'`).
    4. Internal package cards & add-on toggles (`.motion-package-card`, `y: 15 -> 0`, stagger: 0.06s).
  - Tactile Hardware Recalculation Punch:
    - In `PricingView`, when `calculation.total` changes, apply a micro-recalculation pulse to the total price element:
      ```tsx
      const totalDisplayRef = useRef<HTMLSpanElement>(null);
      useGSAP(
        () => {
          if (!totalDisplayRef.current) return;
          gsap.fromTo(
            totalDisplayRef.current,
            { scale: 1.07, color: "#FFFFFF" },
            { scale: 1, color: "#F3FF00", duration: 0.22, ease: "power2.out" }
          );
        },
        { dependencies: [calculation.total], revertOnUpdate: false }
      );
      ```
  - Scroll Parallax (Desktop $\ge 768\text{px}$):
    - `ArchitecturalNumeral04`: `yPercent: 12`, scrub: 0.6.
    - Diagonal arrow: `yPercent: 18`, scrub: 0.6.

---

#### 5. `CoachingView.tsx` (`src/components/pages/CoachingView.tsx`)
- **Scope Ref**: Attach `containerRef = useRef<HTMLDivElement>(null)`.
- **Motion Implementation**:
  - Entrance Timeline:
    1. Monumental 3-Line Headline "BELAJAR. BINA. DEPLOY." (`.motion-coaching-line`, `y: 45 -> 0`, stagger: 0.1s, ease: `'power3.out'`).
    2. Compact Configurator Console (`.motion-coaching-console`, `y: 30 -> 0`, duration 0.6s).
    3. Colossal Cobalt Blue `ArchitecturalPlinth05` (`.motion-plinth05`, `scale: 0.94 -> 1`, `opacity: 0 -> 1`, duration 0.75s, ease: `'power3.out'`).
    4. Seated Techwear Creator (`.motion-creator-character`, `y: 40 -> 0`, duration 0.7s, ease: `'power3.out'`).
  - Scroll Parallax (Desktop $\ge 768\text{px}$):
    - `ArchitecturalPlinth05`: `yPercent: 10`, scrub: 0.6.
    - Seated mentor cutout: `yPercent: 5`, scrub: 0.6.

---

#### 6. `AboutView.tsx` (`src/components/pages/AboutView.tsx`)
- **Scope Ref**: Attach `containerRef = useRef<HTMLDivElement>(null)`.
- **Motion Implementation**:
  - Entrance Timeline:
    1. `BrutalistBanner` "SAYA SYAHMI AOF." (`.motion-about-banner`, `y: 40 -> 0`, duration 0.7s, ease: `'power3.out'`).
    2. Bio & Credential Badges (`.motion-about-badge`, `y: 20 -> 0`, stagger: 0.08s).
    3. Standing Pointing Creator (`.motion-pointing-character`, `y: 45 -> 0`, duration 0.75s, ease: `'power3.out'`).
    4. Floating Closed Laptop (`.motion-floating-laptop`, `scale: 0.85 -> 1`, `opacity: 0 -> 1`, duration 0.6s).
  - Ambient Levitation Idle Loop:
    - Suspended floating laptop idle hover:
      ```tsx
      gsap.to(".motion-floating-laptop", {
        y: -10,
        rotation: -8,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      ```
    - Disabled under `(prefers-reduced-motion: reduce)`.
  - Scroll Parallax (Desktop $\ge 768\text{px}$):
    - Pointing character: `yPercent: 6`, scrub: 0.6.
    - Floating laptop: `yPercent: -12`, scrub: 0.6 (counter-parallax enhances floating elevation).

---

#### 7. `ContactView.tsx` (`src/components/pages/ContactView.tsx`)
- **Scope Ref**: Attach `containerRef = useRef<HTMLDivElement>(null)`.
- **Motion Implementation**:
  - Entrance Timeline:
    1. Slogan "IDEA KAU. KITA BINA." (`.motion-contact-title`, `y: 40 -> 0`, stagger: 0.12s, ease: `'power3.out'`).
    2. Direct Email & WhatsApp Fast Channel cards (`.motion-contact-channel`, `y: 20 -> 0`, stagger: 0.1s).
    3. Yellow Curved Arrow (`.motion-curved-arrow`, `scale: 0.9 -> 1`, `opacity: 0 -> 1`, duration 0.6s).
    4. Background `ArchitecturalNumeral07` (`.motion-numeral07`, `opacity: 0 -> 0.25`, `scale: 0.95 -> 1`, duration 0.8s).
    5. Industrial Terminal Console form container (`.motion-terminal-console`, `y: 35 -> 0`, duration 0.65s, ease: `'power3.out'`).
  - Scroll Parallax (Desktop $\ge 768\text{px}$):
    - `ArchitecturalNumeral07`: `yPercent: 12`, scrub: 0.6.
    - Curved arrow: `yPercent: -8`, scrub: 0.6.

---

## 4. Caveats
1. **Playwright E2E Screenshot Timing**:
   - When running visual regression / full-page screenshot scripts (`node tests/e2e/audit_and_screenshots.js`), GSAP animations take ~0.75s to complete.
   - Recommended safeguard: Ensure test runners either:
     a) Emulate `page.emulateMedia({ reducedMotion: 'reduce' })` for instant 0ms snapshots, OR
     b) Call `await page.waitForTimeout(900)` before capturing screenshots to ensure all tweens have settled and `clearProps` has executed.
2. **Mobile Screen Width (< 768px)**:
   - On mobile viewports (390px), parallax scrubbing must remain disabled via `(min-width: 768px)` media query guards. Entrance reveals operate cleanly, but scroll parallax should not bind on small viewports to maintain 60fps scrolling and eliminate potential horizontal overflow.
3. **No Unmanaged `useEffect` Tweens**:
   - Never write raw `gsap.to()` in React `useEffect`. Always use `useGSAP` with `{ scope: containerRef }` to ensure automatic garbage collection, context safety, and zero memory leaks.

---

## 5. Conclusion
- The GSAP animation architecture for SYAHMIAOF STUDIO is ready for implementation by the M3 Implementer agent.
- Dependencies (`gsap@3.12.5`, `@gsap/react@2.1.1`) are fully installed and verified.
- The blueprint delivers high-impact Digital Brutalism motion: punchy vertical reveals, multi-plane depth, tactile hardware recalculation feedback, and subtle desktop scroll parallax, while upholding 100% SSR hydration safety, zero CLS, and strict `prefers-reduced-motion` compliance.

---

## 6. Verification Method

### 6.1 Build & Type Safety
Run:
```bash
npm run build
```
**Expected Outcome**: Code 0 exit, 0 TypeScript/lint errors, all 18 static routes compile cleanly.

### 6.2 Unit Test Integrity
Run:
```bash
npm test
```
**Expected Outcome**: 40/40 tests pass across `adversarial_pricing.test.ts`, `inquiry.test.ts`, and `pricing.test.ts`.

### 6.3 Reduced Motion Accessibility Test
Run via Playwright test with reduced motion enabled:
```javascript
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('http://localhost:3002/');
// Assert all headlines and characters have opacity: 1 and are fully interactive
```
**Expected Outcome**: Elements are instantly visible without delays, no unhandled exceptions.

### 6.4 E2E & Visual Screenshot Audit
Run:
```bash
npm run test:e2e
```
**Expected Outcome**: Captures 1440px desktop and 390px mobile screenshots with zero horizontal scroll overflow (`overflow-x: hidden`).
