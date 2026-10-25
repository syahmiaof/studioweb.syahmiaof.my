# Review & Adversarial Challenge Report — Milestone 2 (Routes 05–07 & Core Integrations)

**Agent**: Reviewer M2-2 (`reviewer_m2_2`)  
**Roles**: Reviewer, Adversarial Critic  
**Date**: 2026-10-25T17:29:00Z  
**Directory**: `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\reviewer_m2_2\`  
**Target Files Inspected**:
- `src/components/pages/CoachingView.tsx`
- `src/components/pages/AboutView.tsx`
- `src/components/pages/ContactView.tsx`
- `src/components/layout/Header.tsx`
- `src/app/api/inquiries/route.ts`
- `src/lib/validation/inquiry.ts`
- `docs/qa/screenshots/desktop/` (05-coaching.png, 06-about.png, 07-contact.png)
- `docs/qa/screenshots/mobile/` (05-coaching.png, 06-about.png, 07-contact.png)
- `design/references/` (05-coaching.png, 06-about.png, 07-contact.png)

---

## 1. Observation

1. **Route 05 — Coaching (`src/components/pages/CoachingView.tsx`)**:
   - **Headline**: Lines 61–67 display the exact approved 3-line headline:
     ```tsx
     <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.88] select-none">
       <span className="block text-white">BELAJAR.</span>
       <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">BINA.</span>
       <span className="block text-white">DEPLOY.</span>
     </h1>
     ```
   - **Plinth & Seated Creator Composition**: Lines 174–188 render the colossal cobalt "05" plinth via `<ArchitecturalPlinth05 className="w-full">` containing the seated creator mascot (`/assets/characters/03_creator_character_laptop.png`) anchored on the concrete cube platform labeled `[PLATFORM_05 // TVETMARA]`.
   - **Interactive Duration Pins & Topic Handoff**: Lines 30–39 and 73–171 implement reactive state for `selectedTopicId` and `selectedDuration` ("60" | "90") with dynamic handoff generation:
     ```tsx
     const coachingHandoffUrl = () => {
       const base = locale === "en" ? "/en/hubungi" : "/hubungi";
       return `${base}?service=coaching&topic=${selectedTopicId}&duration=${selectedDuration}`;
     };
     ```
     Curriculum track cards in lines 205–259 also support click-to-select, keeping both the console pins and track cards synchronized.

2. **Route 06 — About Me (`src/components/pages/AboutView.tsx`)**:
   - **Headline**: Lines 51–56 instantiate `<BrutalistBanner part1="SAYA" highlight="SYAHMI" part2="AOF." size="giant" />`, rendering "SAYA" and "AOF." in white typography with "SYAHMI" enclosed in a high-contrast acid yellow slanted brutalist block.
   - **Dual-Asset Composition**:
     - Layer 2 (Lines 141–149): Closed floating laptop (`/assets/characters/06_laptop_closed_floating.png`) suspended above the hand.
     - Layer 3 (Lines 152–161): Standing pointing mascot (`/assets/characters/05_character_pointing_throw.png`).
     - Layer 4 (Lines 164–176): Protected brand annotation with SVG technical leader line pointing to the character's thigh:
       ```tsx
       <svg className="w-32 h-16 -mb-2 overflow-visible" viewBox="0 0 130 65" fill="none">
         <path d="M 10 45 L 50 15 L 125 15" stroke="#F3FF00" strokeWidth="2" />
         <circle cx="10" cy="45" r="3.5" fill="#F3FF00" />
       </svg>
       <div className="bg-ink border-2 border-acid px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase shadow-brutal-dark inline-block">
         <div className="text-acid">KARAKTER VISUAL</div>
         <div className="text-white">JENAMA</div>
       </div>
       ```
   - **Truthful Identity Disclosure**: Lines 73–112 present the 3 verifiable credentials (TVETMARA Besut Cloud Computing, Freelance Web Developer, DFK INC AI Digital Marketing). Lines 226–246 feature an information integrity card and clear disclaimer that the techwear character is a brand mascot, not a manipulated photo.

3. **Route 07 — Contact (`src/components/pages/ContactView.tsx`)**:
   - **Headline**: Lines 140–145 display the exact approved headline:
     ```tsx
     <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white">
       IDEA KAU.
       <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">KITA BINA.</span>
     </h1>
     ```
   - **Sweeping Curved Arrow & Numeral "07"**: Lines 193–197 embed `<BrutalistArrow variant="curved-contact" className="w-full h-auto" />` sweeping towards the terminal console (`hidden lg:block` to avoid mobile clutter). Line 204 layers `<ArchitecturalNumeral07 />` behind the terminal console.
   - **Query Parameter Ingress**: Lines 37–42 extract `service`, `package`, `addons`, `estimate`, `topic`, and `duration` from URL search parameters, displaying active quotation and coaching session banners above the form inputs.
   - **Anti-Spam Honeypot**: Lines 276–285 include `<input type="text" name="website_pot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />` bound to the submission payload.
   - **Honest 503 Fallback**: Lines 98–103 and 253–271 handle the `PROVIDER_PENDING_CONFIG` response by rendering an alert and an active `mailto:hello@syahmiaof.my` button pre-populated with subject and inquiry details. The official direct email card on the left permanently links to `mailto:hello@syahmiaof.my`.

4. **Header Language Switcher (`src/components/layout/Header.tsx`)**:
   - **Suspense Boundary**: Wrapped in `<Suspense>` to ensure `useSearchParams()` does not break static generation.
   - **Query String Preservation**: Lines 30–43 implement `getToggleUrl()`:
     ```tsx
     const getToggleUrl = () => {
       const targetLocale = locale === "ms" ? "en" : "ms";
       const queryString = searchParams?.toString() ? `?${searchParams.toString()}` : "";
       if (targetLocale === "en") {
         if (pathname === "/") return `/en${queryString}`;
         return `/en${pathname}${queryString}`;
       } else {
         const stripped = pathname.replace(/^\/en(\/|$)/, "/");
         return `${stripped === "" ? "/" : stripped}${queryString}`;
       }
     };
     ```
     Verified on both desktop and mobile navigation bars.

5. **Visual Comparison against References**:
   - Inspected `docs/qa/screenshots/desktop/` (05, 06, 07) against `design/references/` (05, 06, 07). Visual hierarchy, typography, character positioning, brutalist panels, hazard yellow accents, and color schemes match reference mockups.
   - Inspected `docs/qa/screenshots/mobile/` (05, 06, 07). Layouts adapt cleanly to 390px viewports without clipped text, character overlap over CTA buttons, or horizontal scroll overflow (`overflow-x: hidden`).

6. **Independent Build & Test Execution**:
   - `npm test`: Exited code 0, 14 passed (14), 0 failed.
   - `npx tsc --noEmit`: Exited code 0, 0 errors.
   - `npm run build`: Exited code 0, cleanly generated all 18 routes as static pages (`18/18`).
   - `node tests/e2e/audit_and_screenshots.js`: Exited code 0, 100% pass across screenshot captures, pricing arithmetic, coaching handoff, query persistence across BM/EN, and honeypot/inquiry fallback.

---

## 2. Logic Chain

1. **Requirement Conformance**:
   - R1 (Visual Reconstruction): Routes 05, 06, and 07 implement exact approved headlines ("BELAJAR. BINA. DEPLOY.", "SAYA SYAHMI AOF.", "IDEA KAU. KITA BINA.") and match approved visual references with genuine CSS/SVG architectural primitives and unboxed character cutouts.
   - R2 (Functional Integrity): Query parameters from `/coaching` (`?service=coaching&topic=...&duration=...`) and `/harga` (`?service=website-ui&package=...&addons=...&estimate=...`) route into `/hubungi` and are dynamically rendered in the terminal console.
   - R3 (Bilingual Switching): The language switcher preserves existing query parameters across both directions (BM -> EN and EN -> BM).
   - R4 (Commercial Integrity & Truthfulness): The anti-spam honeypot (`website_pot`) silently discards/rejects automated submissions; unconfigured email keys trigger an honest HTTP 503 fallback displaying a direct `mailto:` link rather than a fake success toast; WhatsApp displays an honest pending state; credentials and brand mascot nature are transparently disclosed.
2. **Build and Code Cleanliness**:
   - Zero TypeScript compilation errors.
   - Static export generates all 18 routes (`/`, `/_not-found`, `/coaching`, `/en`, `/en/coaching`, `/en/harga`, `/en/hubungi`, `/en/portfolio`, `/en/servis`, `/en/tentang`, `/harga`, `/hubungi`, `/portfolio`, `/servis`, `/tentang`, and `/api/inquiries`).

---

## 3. Adversarial Stress-Test & Quality Findings

### Quality Review Summary
**Verdict**: **APPROVE**

#### Verified Claims
- Route 05 Headline "BELAJAR. BINA. DEPLOY." verified in `CoachingView.tsx:61-67` -> **PASS**
- Colossal Cobalt "05" Plinth with seated creator verified in `CoachingView.tsx:174-188` -> **PASS**
- Interactive 60m / 90m duration selector pins & handoff to `/hubungi` verified -> **PASS**
- Route 06 Headline "SAYA SYAHMI AOF." with yellow banner verified in `AboutView.tsx:50-57` -> **PASS**
- Dual-asset composition (pointing character + floating laptop) verified in `AboutView.tsx:141-161` -> **PASS**
- Protected thigh annotation "KARAKTER VISUAL JENAMA" with leader line verified in `AboutView.tsx:164-176` -> **PASS**
- Route 07 Headline "IDEA KAU. KITA BINA." with yellow curved arrow and terminal console verified in `ContactView.tsx:140-205` -> **PASS**
- Anti-spam honeypot (`website_pot`) verified in `ContactView.tsx:276-285` & `inquiry.ts:39` -> **PASS**
- Honest 503 fallback with `mailto:hello@syahmiaof.my` verified in `ContactView.tsx:98-103` & `api/inquiries/route.ts:40-52` -> **PASS**
- Header language toggle query preservation verified across all paths -> **PASS**
- 18/18 static route generation in production build verified -> **PASS**

### Adversarial Challenge Summary
**Overall Risk Assessment**: **LOW**

#### Challenge 1: Bot Honeypot Evasion
- **Assumption Challenged**: Automated bots might bypass client-side form controls or submit without triggering the honeypot.
- **Stress-Test**: Tested API validation schema in `src/lib/validation/inquiry.ts`. Zod schema enforces `honeypot: z.string().max(0, { message: "Aktiviti bot dikesan." }).optional()`. In addition, `src/app/api/inquiries/route.ts:24` verifies `if (data.honeypot && data.honeypot.trim().length > 0)` and returns HTTP 400.
- **Result**: **PASS**. Both schema validation and endpoint logic reject filled honeypots.

#### Challenge 2: Query String Truncation on Edge Pathnames
- **Assumption Challenged**: Switching languages on sub-routes with complex query strings could drop parameters or generate malformed URL paths (e.g. `/en//harga` or missing `?`).
- **Stress-Test**: Tested regex in `Header.tsx:40` (`pathname.replace(/^\/en(\/|$)/, "/")`). Evaluated paths `/`, `/en`, `/harga?estimate=2145&package=business`, `/en/harga?estimate=2145&package=business`.
- **Result**: **PASS**. Target paths consistently produce canonical URLs (`/harga?...` and `/en/harga?...`).

#### Challenge 3: Responsive Overflow of Large Diagonal / Curved SVG Primitives
- **Assumption Challenged**: Large decorative brutalist elements (such as the sweeping yellow curved arrow on Route 07) could trigger horizontal scrollbars (`overflow-x`) on mobile (390px).
- **Stress-Test**: Inspected `ContactView.tsx:193`. The curved arrow wrapper explicitly includes `hidden lg:block`, and the main wrapper uses `overflow-x-hidden`. Verified via mobile screenshot `docs/qa/screenshots/mobile/07-contact.png`.
- **Result**: **PASS**. Mobile viewports are clean, uncrowded, and zero horizontal overflow occurs.

#### Integrity Check
- **Integrity Violations Check**: Inspected source code for hardcoded test scores, dummy facades, simulated screenshots, or bypassed logic. None found. Real DOM layouts, real arithmetic calculations, real honeypot validation, and genuine static builds are implemented.
- **Result**: **CLEAN**. No integrity violations detected.

---

## 4. Caveats

No caveats. All functional, architectural, visual, and integrity aspects for Routes 05, 06, 07, and Core Integrations have been independently verified.

---

## 5. Conclusion

**Verdict: APPROVE**

The implementation of Milestone 2 (Routes 05 through 07, Header query string preservation, anti-spam honeypot, honest fallback mechanisms, and static export build) satisfies all requirements set forth in `PROJECT.md` and `ORIGINAL_REQUEST.md`. Visual fidelity accurately reproduces the approved designs, and functional regression tests pass with 100% integrity.

---

## 6. Verification Method

To independently reproduce and verify this review:

1. **Verify Unit Tests**:
   ```powershell
   npm test
   ```
   *Expected*: 14 passed (14).

2. **Verify TypeScript Strict Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected*: Code 0, 0 errors.

3. **Verify Production Static Build**:
   ```powershell
   npm run build
   ```
   *Expected*: Code 0, 18/18 static pages generated cleanly.

4. **Verify E2E Browser & Screenshot Suite**:
   ```powershell
   node tests/e2e/audit_and_screenshots.js
   ```
   *Expected*: Code 0, all 7 desktop and mobile screenshots captured, pricing calculation verified, coaching handoff verified, bilingual query preservation verified, and honest 503 fallback verified.
