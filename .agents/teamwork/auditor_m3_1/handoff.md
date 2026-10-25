# Milestone 3 Forensic Integrity Audit Report — SYAHMIAOF STUDIO

**Auditor**: Forensic Auditor M3-1 (`auditor_m3_1`)  
**Parent Orchestrator**: `9558a00f-cdc8-4d5a-b2f8-8aa671a99dc9`  
**Date**: 2026-10-25T18:26:00Z  
**Target**: Milestone 3 / Full SYAHMIAOF STUDIO Codebase  
**Integrity Mode**: Development (with zero tolerance for hardcoded test facades, fake screenshots, and unhonest fallbacks)  
**Verdict**: **CLEAN**

---

## 1. Observation

### Check A: No Hardcoded Test Facades
- **`src/lib/pricing/calculator.ts`**:
  - Inspected lines 1-224.
  - The pricing engine calculates arithmetic purely using `PRICING_PACKAGES` (Landing RM645, Business RM1,745, Premium RM2,995, Full-Stack RM3,250) and `PRICING_ADDONS` (GSAP Animation +RM400, Second Language +RM250).
  - In `calculateFrontendEstimate(packageId, selectedAddonIds)` (lines 174-218):
    ```typescript
    const pkg = getPackageById(packageId) || PRICING_PACKAGES[0];
    const isFullStack = Boolean(pkg.isFullStack);

    if (isFullStack) {
      return {
        basePrice: pkg.basePrice,
        addonsTotal: 0,
        total: pkg.basePrice,
        isFullStack: true,
        breakdown: [{ name: pkg.name.ms, price: pkg.basePrice }],
      };
    }

    const basePrice = pkg.basePrice;
    let addonsTotal = 0;
    const breakdown: Array<{ name: string; price: number }> = [
      { name: pkg.name.ms, price: basePrice },
    ];

    for (const addonId of selectedAddonIds) {
      const addon = getAddonById(addonId);
      if (addon) {
        addonsTotal += addon.price;
        breakdown.push({ name: addon.name.ms, price: addon.price });
      }
    }

    return {
      basePrice,
      addonsTotal,
      total: basePrice + addonsTotal,
      isFullStack: false,
      breakdown,
    };
    ```
  - Zero test conditional branches (`process.env.NODE_ENV === "test"`, `if (isTest)`) exist.
  - `formatMYR(amount)` strictly delegates to `amount.toLocaleString("en-MY")` with defensive NaN handling returning `"RM0"`.
- **`src/lib/validation/inquiry.ts`**:
  - Inspected lines 1-47.
  - Zod schema `InquirySchema` purely enforces Malaysian (`/^(\+?60|0)[0-9]{8,11}$/`) and standard email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) regex validation, minimum 2 characters for name, minimum 10 characters for brief, and honeypot max length 0 (`z.string().max(0).optional()`).
  - No dummy bypass branches exist.

### Check B: No Fake Webpage Screenshots / Authentic DOM & GSAP
- Inspected all 7 route client views:
  1. `src/components/pages/HomeView.tsx`: Authentic React DOM nodes, `IndustrialGrid`, `ArchitecturalSYA` angled typography, `ConcretePlinth`, `MetadataTicker`, seated techwear character cutout (`07_hero_seated_character.png`), GSAP entrance reveals and desktop scroll parallax (`yPercent: 12`).
  2. `src/components/pages/ServicesView.tsx`: Dual brutalist architectural service panels (`01 / WEBSITE FRONTEND` & `02 / SISTEM FULL-STACK`), layered cobalt blue geometric slabs, hazard yellow chevron arrow SVG stencil, unboxed standing builder character with laptop (`02_character_builder_laptop.png`), GSAP scroll parallax.
  3. `src/components/pages/PortfolioView.tsx`: Authentic CSS 3D perspective stage (`[perspective:1200px]`, `preserve-3d`), dynamic card rotation transforms (`[transform:translate3d(0,-20px,60px)_rotateY(0deg)_rotateX(4deg)]`, left card `rotateY(16deg)`, right card `rotateY(-16deg)`), interactive navigation buttons (44x44px), honest badges (`KONSEP DEMO`, `EKSPERIMENTAL`, `FRONTEND DEMO`), and project details drawer.
  4. `src/components/pages/PricingView.tsx`: Monumental numeral `04`, industrial hardware terminal configurator, package selection buttons, brutalist add-on toggles, live invoice calculation, GSAP hardware recalculation pulse hook (`scale: 1.07 -> 1, color: #F3FF00`), and parameter handoff link.
  5. `src/components/pages/CoachingView.tsx`: Monumental 3-line headline (`BELAJAR. BINA. DEPLOY.`), colossal cobalt blue plinth `05`, seated techwear creator mascot (`03_character_creator_laptop.png`), interactive 60m / 90m duration selector pins, parameter handoff link.
  6. `src/components/pages/AboutView.tsx`: High-contrast yellow banner (`SAYA SYAHMI AOF.`), dual-asset composition (pointing character `05_character_pointing_throw.png` and suspended closed laptop `06_laptop_closed_floating.png`), GSAP ambient levitation idle loop (`y: -10, rotation: -8, yoyo: true`), SVG technical leader line, and protected stenciled annotation box (`KARAKTER VISUAL JENAMA`) beside the character's thigh.
  7. `src/components/pages/ContactView.tsx`: Monumental headline (`IDEA KAU. KITA BINA.`), yellow curved directional arrow pointing to the industrial terminal console, active quote/coaching summary banners, and interactive form.
- **Finding**: 0 static screenshot facades detected. 100% genuine interactive React DOM and GSAP motion implementation.

### Check C: Authentic Asset Composition
- Verified files in `public/assets/characters/`:
  - `02_character_builder_laptop.png`: 1,595,569 bytes (genuine transparent PNG cutout)
  - `03_character_creator_laptop.png`: 2,223,500 bytes (genuine transparent PNG cutout)
  - `04_character_consultant_laptop.png`: 1,470,124 bytes (genuine transparent PNG cutout)
  - `05_character_pointing_throw.png`: 1,351,138 bytes (genuine transparent PNG cutout)
  - `06_laptop_closed_floating.png`: 656,478 bytes (genuine transparent PNG cutout)
  - `07_hero_seated_character.png`: 1,306,317 bytes (genuine transparent PNG cutout)
- Verified discrete project screenshot assets in `public/assets/projects/`:
  - `symi-ui.png`: 2,167,496 bytes
  - `lamborghini-concept.png`: 1,758,893 bytes
  - `uberpokmi-ui.png`: 1,851,446 bytes
- Referenced and rendered genuinely through Next.js `<Image>` components with layout priority, drop-shadows, and honest labeling in `src/content/projects.ts`.

### Check D: Functional Logic & Parameter Persistence
- **Quote Handoff (`PricingView.tsx` -> `ContactView.tsx`)**:
  - `quoteHandoffUrl()` serializes:
    `${baseRoute}?service=website-ui&package=${selectedPackageId}&addons=${addonsParam}&estimate=${calculation.total}`
  - Verified in Playwright E2E: Selecting Business + Animation + Second Language navigates to:
    `http://localhost:3456/hubungi?service=website-ui&package=business&addons=animation%2Csecond-lang&estimate=2395`
  - Contact page accurately renders active quote banner: `[ SEBUT HARGA AKTIF: Frontend Business ]` with `Anggaran: RM2,395`.
- **Coaching Handoff (`CoachingView.tsx` -> `ContactView.tsx`)**:
  - `coachingHandoffUrl()` serializes:
    `${base}?service=coaching&topic=${selectedTopicId}&duration=${selectedDuration}`
  - Verified in Playwright E2E: Selecting React & Next.js and 90 Minit navigates to:
    `http://localhost:3456/hubungi?service=coaching&topic=react-next&duration=90`
  - Contact page renders active coaching banner: `[ SESI COACHING AKTIF: REACT-NEXT ] Tempoh: 90 Minit`.
- **Bilingual Switcher Query Retention (`Header.tsx`)**:
  - `getToggleUrl()` extracts `searchParams?.toString()` and preserves query strings across locale switches (`/harga?estimate=2145` -> `/en/harga?estimate=2145` -> `/harga?estimate=2145`). Verified symmetrically on both desktop and mobile headers.

### Check E: Anti-Spam & Honest Fallback
- **Honeypot Protection**:
  - `ContactView.tsx` renders hidden input `<input type="text" name="website_pot" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />`.
  - `src/app/api/inquiries/route.ts` rejects non-empty honeypots with HTTP 400 (`{ success: false, error: "Spam bot detected." }`). Tested and confirmed in `tests/unit/inquiry.test.ts`.
- **Truthful HTTP 503 Fallback**:
  - In `src/app/api/inquiries/route.ts`:
    ```typescript
    const emailProviderConfigured = Boolean(
      process.env.INQUIRY_EMAIL_PROVIDER && process.env.INQUIRY_EMAIL_API_KEY
    );

    if (!emailProviderConfigured) {
      return NextResponse.json(
        {
          success: false,
          status: "PROVIDER_PENDING_CONFIG",
          message:
            "Konfigurasi penghantaran emel pelayan pengeluaran masih dalam penyediaan. Sila hubungi kami terus melalui emel hello@syahmiaof.my.",
          directMailto: `mailto:hello@syahmiaof.my?subject=${encodeURIComponent(
            `Taklimat Projek Studio: ${data.name}`
          )}&body=${encodeURIComponent(
            `Nama: ${data.name}\nHubungi: ${data.contact}\nKategori: ${data.service}\n\nMesej:\n${data.message}`
          )}`,
        },
        { status: 503 }
      );
    }
    ```
  - In `ContactView.tsx`: Displays high-contrast amber alert banner with clickable button (`min-h-[44px]`) linking directly to `mailto:hello@syahmiaof.my` with prefilled subject and body. Client catch block provides symmetric mailto fallback.

### Check F: Port Isolation & Host Integrity
- Tested port 3000 status using `netstat -ano | findstr 3000`:
  ```
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       22932
  TCP    [::]:3000              [::]:0                 LISTENING       22932
  ```
- Port 3000 host PID 22932 was verified untouched before starting the audit, during test runs, and after test completion.
- All test runners, Next.js production server, and Playwright browser instances strictly operated on port 3456.

### Check G: Build & Test Authenticity
1. **Vitest Unit Test Suite (`npm test`)**:
   - Command: `npm test`
   - Output:
     ```
     ✓ tests/unit/inquiry.test.ts (6 tests) 9ms
     ✓ tests/unit/pricing.test.ts (8 tests) 40ms
     ✓ tests/unit/adversarial_pricing.test.ts (26 tests) 50ms

     Test Files  3 passed (3)
          Tests  40 passed (40)
       Duration  1.74s
     ```
   - Exit code: 0 (40/40 tests passed).
2. **TypeScript Typecheck (`npx tsc --noEmit`)**:
   - Command: `npx tsc --noEmit`
   - Exit code: 0 (0 compilation errors).
3. **Next.js Production Build (`npm run build`)**:
   - Command: `npx cross-env NEXT_CPU_COUNT=1 next build`
   - Output:
     ```
     ✓ Compiled successfully
       Linting and checking validity of types ...
       Collecting page data ...
       Generating static pages (0/18) ...
     ✓ Generating static pages (18/18)
       Finalizing page optimization ...
       Collecting build traces ...

     Route (app)                              Size     First Load JS
     ┌ ○ /                                    149 B           164 kB
     ├ ○ /_not-found                          873 B          88.1 kB
     ├ ƒ /api/inquiries                       0 B                0 B
     ├ ○ /coaching                            148 B           161 kB
     ├ ○ /en                                  148 B           164 kB
     ├ ○ /en/coaching                         148 B           161 kB
     ├ ○ /en/harga                            144 B           156 kB
     ├ ○ /en/hubungi                          145 B           158 kB
     ├ ○ /en/portfolio                        148 B           161 kB
     ├ ○ /en/servis                           148 B           161 kB
     ├ ○ /en/tentang                          148 B           159 kB
     ├ ○ /harga                               145 B           156 kB
     ├ ○ /hubungi                             145 B           158 kB
     ├ ○ /portfolio                           148 B           161 kB
     ├ ○ /servis                              148 B           161 kB
     └ ○ /tentang                             148 B           159 kB
     + First Load JS shared by all            87.3 kB
     ```
   - Exit code: 0 (All 18 static/dynamic routes generated cleanly).
4. **Motion & Reduced-Motion Playwright Suite (`test_motion_and_reduced_motion.js`)**:
   - Command: `node tests/e2e/test_motion_and_reduced_motion.js`
   - Output:
     - Test Pass 1: Standard motion & entrance reveals on all 7 routes — PASSED
     - Test Pass 2: Desktop scroll parallax & floating laptop levitation loop — PASSED
     - Test Pass 3: Pricing hardware recalculation pulse — PASSED
     - Test Pass 4: Strict reduced-motion compliance (instant opacity 1, zero motion delays) — PASSED
     - Test Pass 5: 390px mobile layout zero horizontal overflow & WCAG >= 44x44px touch targets — PASSED
   - Result: All 41/41 checks passed cleanly (exit code 0).
5. **Adversarial State & Machine Suite (`challenger_stress_test.js`)**:
   - Command: `node tests/e2e/challenger_stress_test.js`
   - Output:
     - Interactive pricing configurator state transitions (Landing, Business, Premium, Animation, Second Language) — PASSED
     - Custom full-stack quote handoff — PASSED
     - Coaching duration and topic handoff — PASSED
     - English pricing and coaching calculations — PASSED
     - Language switcher query parameter preservation — PASSED
     - Mobile (390px) drawer and switcher — PASSED
   - Result: All 50/50 assertions passed with 0 errors (exit code 0).
6. **E2E Visual Screenshot & Functional Audit (`npm run test:e2e` / `audit_and_screenshots.js`)**:
   - Command: `node tests/e2e/audit_and_screenshots.js`
   - Output:
     - Captured all 14 full-page screenshots (7 desktop in `docs/qa/screenshots/desktop/`, 7 mobile in `docs/qa/screenshots/mobile/`).
     - Interactive pricing calculator arithmetic verified.
     - Quote handoff verified.
     - Coaching handoff verified.
     - Bilingual switcher BM <-> EN state retention verified.
     - Inquiry form API honeypot and honest 503 fallback verified.
   - Result: 100% checks passed cleanly (exit code 0).

---

## 2. Logic Chain

1. **Absence of Facades Proves Real Computation**:
   - In `src/lib/pricing/calculator.ts`, the estimate is computed by retrieving the package object and summing the matching addon prices dynamically in a loop.
   - In `tests/unit/adversarial_pricing.test.ts`, all 16 permutations of packages and addons were tested against the engine, with each breakdown array item summing to the exact total. The arithmetic is 100% genuine and robust against unknown inputs.
2. **True Structural DOM Verification Eliminates Screenshot Facade Risk**:
   - Direct source code inspection confirmed that all 7 routes use semantic HTML, React components (`IndustrialGrid`, `ReflectiveFloor`, `BrutalistBanner`, `ConcretePlinth`), Tailwind utility classes, SVG geometries, and Next.js `<Image>` components for character cutouts.
   - No route contains full-page screenshot wrappers or non-interactive mock images.
3. **Parametric Consistency Guarantees Reliable Funnel Conversion**:
   - URL queries constructed in `PricingView.tsx` (`?service=website-ui&package=...&addons=...&estimate=...`) and `CoachingView.tsx` (`?service=coaching&topic=...&duration=...`) are symmetrically ingested by `useSearchParams()` in `ContactView.tsx`.
   - In Playwright tests, clicking the CTA buttons successfully transferred and displayed the selected configurations in the contact form, verifying that customer intent is preserved across page navigations.
4. **Honeypot and Honest Fallback Preserve Commercial Integrity**:
   - Automated bots filling the hidden `website_pot` field are rejected with HTTP 400.
   - In the absence of server environment variables for third-party email APIs, the server does not fabricate fake success, but returns HTTP 503 `PROVIDER_PENDING_CONFIG` and directly equips the user with a prefilled `mailto:hello@syahmiaof.my` link, upholding complete commercial honesty.
5. **Port 3000 Quarantine Maintained Host Safety**:
   - Throughout all test executions, port 3000 remained locked to host PID 22932. Every test server bound strictly to port 3456 and cleaned up its processes upon suite completion.

---

## 3. Caveats

- **Third-Party Email API Keys**: Local development and automated test environments do not contain live SMTP or Resend API credentials (`INQUIRY_EMAIL_PROVIDER`, `INQUIRY_EMAIL_API_KEY`). The application correctly handles this condition by returning HTTP 503 `PROVIDER_PENDING_CONFIG` with an interactive direct `mailto:` fallback link. Outbound email delivery will automatically activate once the owner configures credentials in production.
- **Port 3000 Boundary**: Port 3000 was strictly preserved for user host PID 22932 and was not touched.

---

## 4. Conclusion

Following exhaustive source code analysis, file system asset inspection, and independent empirical execution of all unit, typecheck, static build, and Playwright E2E suites:

**Verdict**: **CLEAN**

All 7 forensic integrity checks (Checks A through G) have PASSED with zero integrity violations detected. The SYAHMIAOF STUDIO codebase authentically fulfills all requirements of Milestone 3 and the authoritative user request.

---

## 5. Verification Method

To independently reproduce and verify this audit:

1. **Verify Port 3000 Quarantine**:
   ```powershell
   netstat -ano | findstr 3000
   ```
   *Expected*: Host PID 22932 listening.

2. **Run Vitest Unit Suite**:
   ```powershell
   npm test
   ```
   *Expected*: 40/40 tests pass across 3 test files.

3. **Run TypeScript Compiler**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected*: 0 compilation errors.

4. **Run Production Build**:
   ```powershell
   npx cross-env NEXT_CPU_COUNT=1 next build
   ```
   *Expected*: 18/18 static/dynamic routes generated, exit code 0.

5. **Run GSAP Motion & Reduced Motion Playwright Suite**:
   ```powershell
   node tests/e2e/test_motion_and_reduced_motion.js
   ```
   *Expected*: All 41 motion, reduced-motion, and touch target checks pass on port 3456.

6. **Run Adversarial State Suite**:
   ```powershell
   node tests/e2e/challenger_stress_test.js
   ```
   *Expected*: All 50 adversarial state assertions pass with zero errors.

7. **Run E2E Visual QA & Screenshot Suite**:
   ```powershell
   npm run test:e2e
   ```
   *Expected*: 14 screenshots saved in `docs/qa/screenshots/`, all interactive checks pass 100%.
