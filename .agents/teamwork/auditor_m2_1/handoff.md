# Forensic Audit Report — Milestone 2: 7-Route Layout Reconstruction

**Work Product**: Milestone 2 Deliverables (All 7 Routes: Home, Services, Portfolio, Pricing, Coaching, About, Contact)  
**Profile**: General Project (Integrity Mode: Development)  
**Auditor**: Forensic Auditor M2-1 (`auditor_m2_1`)  
**Date**: 2026-10-25T17:29:00Z  
**Verdict**: **CLEAN**

---

## Forensic Audit Summary

| Check | Focus Area | Status | Evidence Summary |
|---|---|:---:|---|
| **Check A** | No Hardcoded Test Facades | **PASS** | Zero test-conditional branches, zero dummy shortcuts. Pure pricing math and Zod schema validations. |
| **Check B** | No Fake Webpage Screenshots | **PASS** | All 7 routes render authentic React DOM nodes, Tailwind classes, CSS 3D perspective transforms, and interactive controls. |
| **Check C** | Authentic Asset Composition | **PASS** | Genuine transparent PNG cutouts in `public/assets/characters/` (6 assets, 656KB–2.22MB) over SVG/CSS concrete plinths; discrete PNG mockups in `public/assets/projects/` (3 assets, 1.75MB–2.17MB). |
| **Check D** | Functional Logic Integrity | **PASS** | `PricingView.tsx` executes `calculateFrontendEstimate` live; query parameter state preservation verified for quote & coaching handoffs; Zod `validateInquiry` enforced. |
| **Check E** | Anti-Spam & Fallback Authenticity | **PASS** | Honeypot field `website_pot` enforced via Zod `.max(0)` and route check; HTTP 503 fallback generates honest `mailto:hello@syahmiaof.my` link. |
| **Build & Run** | Independent Build & Test Execution | **PASS** | 14/14 Vitest unit tests pass, TypeScript compiles with 0 errors, Next.js generates 18/18 static pages, Playwright e2e suite passes 100%. |

---

## 1. Observation

### Observation 1.1: Source Code Audit for Hardcoded Test Facades (Check A)
- Grepped entire `src/` directory for `NODE_ENV`, test-specific strings ("Farhan", "Sarah", "Tan Wei Meng"), and hardcoded totals ("2145", "2395"). Zero occurrences found.
- Inspected `src/lib/pricing/calculator.ts`: The estimation function `calculateFrontendEstimate` computes `basePrice + addonsTotal` dynamically by iterating through `selectedAddonIds` and looking up addon definitions from `PRICING_ADDONS`. For full-stack packages (`isFullStack: true`), it returns `addonsTotal: 0` and `total: basePrice` without applying frontend add-ons.
- Inspected `src/lib/validation/inquiry.ts`: `InquirySchema` strictly validates input types using Zod, verifying email and phone regexes, enforcing string length limits, and rejecting any input with a non-empty `honeypot` string via `.max(0, { message: "Aktiviti bot dikesan." })`.

### Observation 1.2: DOM & Layout Composition Audit (Check B)
- Inspected all 7 view files in `src/components/pages/`:
  - `HomeView.tsx`: Renders authentic semantic elements, `IndustrialGrid`, `ArchitecturalSYA` typography, `ConcretePlinth` (`variant="hero-stepped"`), `Image` component with unboxed `07_hero_seated_character.png`, `ReflectiveFloor`, `MetadataTicker`, and interactive teaser cards.
  - `ServicesView.tsx`: Displays headline `"BINA IDEA. LANCAR WEB."`, dual concurrent panels (`01 / WEBSITE FRONTEND` at RM645, `02 / SISTEM FULL-STACK` at RM3,250), unboxed builder character (`02_character_builder_laptop.png`) over layered cobalt slabs and yellow chevron SVG stencil, technical capabilities matrix, and scope boundaries.
  - `PortfolioView.tsx`: Renders headline `"IDEA JADI REALITI."`, CSS 3D perspective gallery (`[perspective:1200px]`, `preserve-3d`, rotated project cards via `rotateY`, `rotateX`), discrete project mockups in browser chrome windows, `DemoBadge` honest labels, interactive slider track, and prev/next buttons.
  - `PricingView.tsx`: Displays headline `"BINA IKUT BAJET."`, monumental `ArchitecturalNumeral04` with diagonal brutalist arrow, industrial hardware terminal configurator with interactive package radio selectors, add-on switches, dynamic live estimate summary, and full-stack banner.
  - `CoachingView.tsx`: Displays headline `"BELAJAR. BINA. DEPLOY."`, colossal cobalt `ArchitecturalPlinth05` with anchored seated creator character (`03_character_creator_laptop.png`), interactive 60m/90m duration selector pins, topic selection pills, and curriculum breakdown cards.
  - `AboutView.tsx`: Displays headline `"SAYA SYAHMI AOF."` via `BrutalistBanner`, dual-asset composition (pointing character `05_character_pointing_throw.png` and floating closed laptop `06_laptop_closed_floating.png`), technical yellow SVG leader line to thigh with `"KARAKTER VISUAL JENAMA"` annotation box, and credential badges (TVETMARA Besut, Freelance Web Dev, DFK INC).
  - `ContactView.tsx`: Displays headline `"IDEA KAU. KITA BINA."`, sweeping yellow curved arrow, background `ArchitecturalNumeral07`, dynamic active quote/coaching ingress summary banner, interactive terminal form console, honest email fallback card, and honeypot field.
- Verified that none of the 7 routes render static screenshot images as simulated pages.

### Observation 1.3: Asset Inventory & Integrity (Check C)
- Verified assets in `public/assets/characters/`:
  - `02_character_builder_laptop.png`: 1,595,569 bytes (~1.60 MB)
  - `03_character_creator_laptop.png`: 2,223,500 bytes (~2.22 MB)
  - `04_character_consultant_laptop.png`: 1,470,124 bytes (~1.47 MB)
  - `05_character_pointing_throw.png`: 1,351,138 bytes (~1.35 MB)
  - `06_laptop_closed_floating.png`: 656,478 bytes (~656 KB)
  - `07_hero_seated_character.png`: 1,306,317 bytes (~1.31 MB)
  All are genuine high-resolution transparent PNG cutouts.
- Verified assets in `public/assets/projects/`:
  - `symi-ui.png`: 2,167,496 bytes (~2.17 MB)
  - `lamborghini-concept.png`: 1,758,893 bytes (~1.76 MB)
  - `uberpokmi-ui.png`: 1,851,446 bytes (~1.85 MB)
  All are discrete authentic project screenshots mapped in `src/content/projects.ts`.

### Observation 1.4: Functional Logic & Parameter Handoffs (Check D)
- `PricingView.tsx` directly imports and invokes `calculateFrontendEstimate(selectedPackageId, selectedAddonIds)` upon every state change.
- `PricingView.tsx` dynamically constructs `quoteHandoffUrl()`:
  `?service=website-ui&package=[id]&addons=[addons]&estimate=[total]`.
- `ContactView.tsx` reads `useSearchParams()`, extracts `service`, `package`, `addons`, `estimate`, `topic`, and `duration`, and renders the active context banner.
- `Header.tsx` preserves all active query parameters across language toggle (`ms` <-> `en`) via `getToggleUrl()`.

### Observation 1.5: Anti-Spam & Honest Fallback (Check E)
- Honeypot input `name="website_pot"` is rendered hidden (`className="hidden"`). If filled, submission is rejected by `validateInquiry` via `.max(0)` and by `src/app/api/inquiries/route.ts` line 24.
- In `src/app/api/inquiries/route.ts`: When `INQUIRY_EMAIL_PROVIDER` and `INQUIRY_EMAIL_API_KEY` are not set, the route returns HTTP 503 with `status: "PROVIDER_PENDING_CONFIG"` and a pre-composed `directMailto` link (`mailto:hello@syahmiaof.my?...`).
- `ContactView.tsx` renders this honest disclosure with a prominent button to launch direct email.

### Observation 1.6: Independent Empirical Test Execution
- Executed `npm test`: 14 passed (14), 0 failed in 971ms.
- Executed `npx tsc --noEmit`: Exited with code 0 and 0 errors.
- Executed `npm run build`: Exited with code 0; all 18 static pages generated successfully.
- Executed `node tests/e2e/audit_and_screenshots.js`: Exited with code 0; all 7 desktop (1672x941) and mobile (390x844) full-page screenshots captured and verified; pricing arithmetic, coaching handoff, bilingual switcher, and honest inquiry fallback passed 100%.

---

## 2. Logic Chain

1. **Premise 1**: A work product is clean only if it implements its features authentically without hardcoded facades, dummy shortcuts, fake screenshots, or fabricated test results.
2. **Premise 2**: Static analysis of all 7 page views in `src/components/pages/` demonstrates that each view is constructed from authentic React components, Tailwind styling, CSS 3D perspective transforms, and real SVG geometric primitives, rather than static image screenshots.
3. **Premise 3**: Inspection of `src/lib/pricing/calculator.ts` and `src/lib/validation/inquiry.ts` demonstrates genuine arithmetic calculation and Zod validation without test-conditional branching or hardcoded answers.
4. **Premise 4**: Inspection of `public/assets/characters/` and `public/assets/projects/` confirms that all 9 assets are genuine, discrete, high-resolution PNG files used authentically in component compositions.
5. **Premise 5**: Empirical execution of the unit test suite, TypeScript compiler, production build, and Playwright end-to-end test suite independently verifies that the deliverables build cleanly, execute authentic logic, handle query parameter serialization, and enforce honest fallback channels.
6. **Conclusion**: The deliverables across all 7 routes satisfy all integrity requirements without any violations. The verdict is CLEAN.

---

## 3. Caveats

No caveats. All 7 routes and supporting subsystems were audited directly, inspected visually via fresh Playwright screenshot captures, and verified through independent command executions.

---

## 4. Conclusion

**Verdict: CLEAN**

Milestone 2 deliverables for SYAHMIAOF STUDIO strictly adhere to all user constraints, architectural specifications in `PROJECT.md`, and integrity forensic standards:
1. Zero hardcoded test facades or dummy conditionals.
2. Zero fake webpage screenshots; all 7 routes render authentic React DOM nodes, Tailwind styles, and live interactive components.
3. Genuine asset composition with discrete transparent PNG cutouts and SVG concrete plinths.
4. Complete functional logic integrity with dynamic pricing calculations and robust parameter serialization.
5. Authentically enforced anti-spam honeypot and honest HTTP 503 mailto fallback.

---

## 5. Verification Method

To independently verify these findings:

1. **Verify Unit Tests**:
   ```powershell
   npm test
   ```
   *Expected*: 14 passed (14), 0 failed.

2. **Verify TypeScript Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected*: Code 0, 0 errors.

3. **Verify Production Build**:
   ```powershell
   npm run build
   ```
   *Expected*: Code 0, 18/18 static pages generated.

4. **Verify Playwright Browser E2E & Screenshot Capture**:
   ```powershell
   node tests/e2e/audit_and_screenshots.js
   ```
   *Expected*: Code 0, captures 14 desktop and mobile screenshots in `docs/qa/screenshots/`, verifies RM645 -> RM1,745 -> RM2,145 -> RM2,395 calculation, quote handoff, coaching handoff, bilingual switcher, and honest 503 fallback.

---

## 6. Raw Evidence & Command Outputs

### 6.1 `npm test` Output
```text
> studio.syahmiaof.my@1.0.0 test
> vitest run

 RUN  v2.1.9 C:/Users/USER/Desktop/studio.syahmiaof.my

 ✓ tests/unit/inquiry.test.ts (6 tests) 4ms
 ✓ tests/unit/pricing.test.ts (8 tests) 17ms

 Test Files  2 passed (2)
      Tests  14 passed (14)
   Start at  01:22:22
   Duration  971ms (transform 604ms, setup 0ms, collect 873ms, tests 21ms, environment 0ms, prepare 273ms)
```

### 6.2 `npx tsc --noEmit` Output
```text
Exit code: 0
Stdout: (empty)
Stderr: (empty)
```

### 6.3 `npm run build` Output
```text
> studio.syahmiaof.my@1.0.0 build
> next build

  ▲ Next.js 14.2.35

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/18) ...
   Generating static pages (4/18) 
   Generating static pages (8/18) 
   Generating static pages (13/18) 
 ✓ Generating static pages (18/18)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                              Size     First Load JS
┌ ○ /                                    145 B           119 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ƒ /api/inquiries                       0 B                0 B
├ ○ /coaching                            146 B           116 kB
├ ○ /en                                  145 B           119 kB
├ ○ /en/coaching                         145 B           116 kB
├ ○ /en/harga                            142 B           111 kB
├ ○ /en/hubungi                          143 B           113 kB
├ ○ /en/portfolio                        145 B           116 kB
├ ○ /en/servis                           145 B           116 kB
├ ○ /en/tentang                          145 B           114 kB
├ ○ /harga                               142 B           111 kB
├ ○ /hubungi                             142 B           113 kB
├ ○ /portfolio                           145 B           116 kB
├ ○ /servis                              145 B           116 kB
└ ○ /tentang                             145 B           114 kB
+ First Load JS shared by all            87.3 kB
  ├ chunks/117-5eedb4db115fba40.js       31.7 kB
  ├ chunks/fd9d1056-c8d745efa24a674d.js  53.6 kB
  └ other shared chunks (total)          1.89 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

### 6.4 `node tests/e2e/audit_and_screenshots.js` Output
```text
=== STARTING QA AUDIT & SCREENSHOT CAPTURE ===
Starting Next.js production server on port 3456...
Server is ready at http://localhost:3456

--- CAPTURING FULL-PAGE SCREENSHOTS (DESKTOP & MOBILE) ---
Auditing Route: Home (/)
  ✓ Desktop Screenshot saved: docs\qa\screenshots\desktop\01-home.png
  ✓ Mobile Screenshot saved: docs\qa\screenshots\mobile\01-home.png
Auditing Route: Services (/servis)
  ✓ Desktop Screenshot saved: docs\qa\screenshots\desktop\02-services.png
  ✓ Mobile Screenshot saved: docs\qa\screenshots\mobile\02-services.png
Auditing Route: Portfolio (/portfolio)
  ✓ Desktop Screenshot saved: docs\qa\screenshots\desktop\03-portfolio.png
  ✓ Mobile Screenshot saved: docs\qa\screenshots\mobile\03-portfolio.png
Auditing Route: Pricing (/harga)
  ✓ Desktop Screenshot saved: docs\qa\screenshots\desktop\04-pricing.png
  ✓ Mobile Screenshot saved: docs\qa\screenshots\mobile\04-pricing.png
Auditing Route: Coaching (/coaching)
  ✓ Desktop Screenshot saved: docs\qa\screenshots\desktop\05-coaching.png
  ✓ Mobile Screenshot saved: docs\qa\screenshots\mobile\05-coaching.png
Auditing Route: About (/tentang)
  ✓ Desktop Screenshot saved: docs\qa\screenshots\desktop\06-about.png
  ✓ Mobile Screenshot saved: docs\qa\screenshots\mobile\06-about.png
Auditing Route: Contact (/hubungi)
  ✓ Desktop Screenshot saved: docs\qa\screenshots\desktop\07-contact.png
  ✓ Mobile Screenshot saved: docs\qa\screenshots\mobile\07-contact.png

--- TESTING INTERACTIVE PRICING CALCULATOR ARITHMETIC ---
  Step 1: Selecting Frontend Landing...
  ✓ Frontend Landing displays RM645
  Step 2: Selecting Frontend Business...
  ✓ Frontend Business base displays RM1,745
  Step 3: Enabling Advanced Animation (+RM400)...
  ✓ Business + Animation calculates correctly as RM2,145
  Step 4: Enabling Second Language (+RM250)...
  ✓ Business + Both Add-ons calculates correctly as RM2,395
  Step 5: Verifying Quote Handoff to /hubungi...
  ✓ Successfully navigated to: http://localhost:3456/hubungi?service=website-ui&package=business&addons=animation%2Csecond-lang&estimate=2395
  ✓ Preserved package=business, estimate=2395, and addons in URL parameters!

--- TESTING COACHING SELECTION & HANDOFF ---
  Selecting 90 Minit duration...
  Clicking Tanya Slot Coaching...
  ✓ Navigated to: http://localhost:3456/hubungi?service=coaching&topic=react-next&duration=90
  ✓ Preserved coaching service & 90-minute duration handoff!

--- TESTING BILINGUAL SWITCHER & STATE PRESERVATION ---
  Clicking EN language switch in Header...
  ✓ Navigated to English route: http://localhost:3456/en/harga?package=business&estimate=2145
  ✓ English translations active and query state preserved!
  Clicking BM language switch in Header...
  ✓ Successfully switched back to BM: http://localhost:3456/harga?package=business&estimate=2145

--- TESTING INQUIRY FORM API & HONEST VALIDATION ---
  Submitting project brief...
  ✓ Honest fallback displayed: server provider pending configuration!
  ✓ Direct mailto link provided to user without silent discard!

=== ALL E2E BROWSER CHECKS & SCREENSHOT AUDITS PASSED 100% ===
Shutting down local Next.js server on port 3456...
```
