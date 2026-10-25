# Handoff Report — Survey Explorer 2 (Codebase & Architecture Investigator)

**Date:** 2026-10-25  
**From:** Survey Explorer 2 (Codebase & Architecture Investigator)  
**To:** Lead Orchestrator (`f3b06806-8dcb-4a8b-aeee-c389836ecf70`)  
**Status:** Hard Handoff (Investigation & Survey Complete)  
**Artifact Generated:** `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_survey_2\report.md`

---

## 1. Observation

1. **Framework & Runtime:**
   - `package.json` specifies Next.js `^14.2.25` (resolved to `14.2.35`), React `^18.3.1`, TypeScript `^5.6.3`, Tailwind CSS `^3.4.14`.
   - `package.json` includes `"gsap": "^3.12.5"` and `"@gsap/react": "^2.1.1"`.
2. **Test & Build Execution Results:**
   - Command `npm test` executed `vitest run` and passed **14 of 14 unit tests** (`tests/unit/pricing.test.ts` 8 passed, `tests/unit/inquiry.test.ts` 6 passed) in 558ms with exit code 0.
   - Command `npm run build` executed `next build` and generated 18 static routes (`/`, `/servis`, `/portfolio`, `/harga`, `/coaching`, `/tentang`, `/hubungi`, `/en`, `/en/servis`, `/en/portfolio`, `/en/harga`, `/en/coaching`, `/en/tentang`, `/en/hubungi`, `/_not-found`, and dynamic `/api/inquiries`) with exit code 0.
   - Command `npm run test:e2e` executed `node tests/e2e/audit_and_screenshots.js` on port 3456, validated arithmetic (`Landing RM645`, `Business RM1,745`, `+ Animation RM2,145`, `+ 2nd Lang RM2,395`), validated URL handoffs to `/hubungi`, tested bilingual switching with query param retention, tested inquiry honeypot/mailto fallback, and exited with code 0.
3. **Route & Bilingual Implementation:**
   - 7 primary routes each have a bilingual pair in `src/app/` (`/` & `/en`, `/servis` & `/en/servis`, `/portfolio` & `/en/portfolio`, `/harga` & `/en/harga`, `/coaching` & `/en/coaching`, `/tentang` & `/en/tentang`, `/hubungi` & `/en/hubungi`).
   - Page files are thin Server Components that render client views from `src/components/pages/` passing `locale="ms"` or `locale="en"`.
   - `src/app/layout.tsx` hardcodes `<html lang="ms">`.
   - `src/components/layout/Header.tsx` preserves URL query parameters when switching languages via `getToggleUrl()`.
4. **Typography & Styling Configuration:**
   - In `src/app/layout.tsx` (lines 58-61), Google Fonts imports `JetBrains Mono`, `Oswald`, and `Plus Jakarta Sans`.
   - In `tailwind.config.ts` (lines 44-48), `fontFamily` maps `display` to `["var(--font-display)", "Impact", "Arial Black", "sans-serif"]`, `sans` to `["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"]`, and `mono` to `["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"]`.
   - In `src/styles/globals.css`, `:root` (lines 5-17) defines color variables (`--color-ink`, `--color-acid`, etc.), but **neither `--font-display`, `--font-sans`, nor `--font-mono` is defined**.
5. **CSS 3D Transform Utilities:**
   - `src/styles/globals.css` defines `.perspective-1000 { perspective: 1000px; }` (lines 67-69) and `.preserve-3d { transform-style: preserve-3d; }` (lines 71-73).
   - Grep search for `preserve-3d`, `perspective-1000`, `rotateY`, and `rotateX` across `src/components/` and `src/app/` returned **zero instances** of usage in actual UI elements.
6. **GSAP & Motion Codebase Presence:**
   - Case-insensitive grep search for `gsap` across `src/` returned **zero import statements** (`import ... from "gsap"` or `@gsap/react`).
   - Grep search for `prefers-reduced-motion` or `reduced-motion` returned **zero occurrences**.
   - Animations in code are limited to Tailwind utility classes (`animate-ping`, `animate-bounce`, `transition-transform`).
7. **Headline Token Discrepancies:**
   - In `src/i18n/ms.ts`:
     - Line 61: `services.title = "PERKHIDMATAN WEB & SISTEM"` (Mockup R1 requires `"BINA IDEA. LANCAR WEB."`)
     - Line 74: `portfolio.title = "PORTFOLIO & EKSPERIMEN DIGITAL"` (Mockup R1 requires `"IDEA JADI REALITI."`)
     - Line 84: `pricing.title = "PRICING STUDIO"` (Mockup R1 requires `"BINA IKUT BAJET."`)
     - Line 102: `coaching.title = "SESI COACHING WEB DEVELOPMENT"` (Mockup R1 requires `"BELAJAR. BINA. DEPLOY."`)
     - Line 114: `about.title = "TENTANG SAYA — SYAHMI AOF"` (Mockup R1 requires `"SAYA SYAHMI AOF."`)

---

## 2. Logic Chain

1. **Step 1 (Functional Baseline):** Observations 2.1, 2.2, and 2.3 prove that the underlying business logic (pricing arithmetic, Zod validation, parameter handoff, honeypot, mailto fallback, build pipeline) is 100% operational and regression-free. Therefore, this core must be strictly safeguarded and preserved.
2. **Step 2 (Root Cause of Visual QA Failure):** Observations 4.3, 5.2, 6.1, and 7.1 explain why the site failed the visual rescue audit:
   - The headline strings in the i18n dictionaries are legacy descriptive titles rather than the approved high-impact brutalist statements.
   - The CSS 3D perspective transforms and GSAP motion stacks were never wired into the UI views, resulting in flat, conventional grid cards.
   - The Google Font `Oswald` loaded in `layout.tsx` is completely bypassed because `--font-display` was never declared in `:root`, falling back to standard `Impact`.
3. **Step 3 (Feasibility of Recovery):** Because all character assets are present in `public/assets/characters/`, the App Router structure is clean, and the dependencies (`gsap`, `@gsap/react`, Tailwind) are already installed, the visual recovery can be achieved purely through CSS, SVG, component-level composition, and GSAP timeline hooks without requiring new architectural dependencies.

---

## 3. Caveats

1. **WhatsApp Destination Number:** Still unconfigured in code (`[NOMBOR BELUM DITETAPKAN]`), as noted in `ORIGINAL_REQUEST.md` R2.
2. **Server SMTP/Resend API Keys:** Unconfigured in environment; the honest 503 fallback with `directMailto` handles this correctly as designed.
3. **Portfolio Live Screenshots:** `public/assets/projects/` is currently empty; cards currently reference `03-portfolio.png` or render styled code placeholders.
4. **Coaching Rate Confirmation:** Still listed as inquiry-based (`Tanya Slot Coaching`), consistent with locked executive decisions in `ENGINEERING_BLUEPRINT_V1.md`.

---

## 4. Conclusion

The application is functionally sound with flawless arithmetic, clean build metrics, and robust unit/E2E test suites. The gap between the current state and `ORIGINAL_REQUEST.md` is strictly visual and stylistic. The path forward requires:
1. Setting `--font-display`, `--font-sans`, and `--font-mono` in `src/styles/globals.css`.
2. Updating headline tokens in `src/i18n/ms.ts` and `src/i18n/en.ts` to match the 7 approved slogans.
3. Reconstructing the 7 page views with monumental architectural geometry (angled "SYA", 3D cards with `preserve-3d`, colossal cobalt "05" plinth, monumental "04", yellow curved arrow).
4. Integrating GSAP entrance timelines, scroll parallax, and `prefers-reduced-motion` guards.

---

## 5. Verification Method

To independently verify these observations:
1. **Run Unit Tests:**
   ```bash
   npm test
   ```
   *Expected:* 14 passed in `tests/unit/pricing.test.ts` and `tests/unit/inquiry.test.ts`.
2. **Run Production Build:**
   ```bash
   npm run build
   ```
   *Expected:* Exits code 0 with 18 static routes generated.
3. **Run E2E Suite & View Screenshots:**
   ```bash
   npm run test:e2e
   ```
   *Expected:* All interactive checks pass; inspect generated captures at `docs/qa/screenshots/desktop/` and `docs/qa/screenshots/mobile/`.
4. **Inspect Source Files:**
   - Inspect `src/styles/globals.css` lines 5-17 to confirm `--font-display` is missing.
   - Inspect `src/i18n/ms.ts` lines 61, 74, 84, 102, 114 to confirm legacy headline strings.
   - Run grep for `from "gsap"` in `src/` to confirm zero imports.
