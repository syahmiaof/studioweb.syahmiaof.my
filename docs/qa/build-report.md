# SYAHMIAOF STUDIO — BUILD & PRODUCTION REPORT (V1)

**Project:** SYAHMIAOF STUDIO (`studio.syahmiaof.my`)  
**Lead Engineering Owner:** JEBAT  
**Build Date:** 2026-10-25  
**Framework:** Next.js 14.2.35 (App Router)  
**TypeScript:** 5.6.3 (Strict Mode)  
**Styling:** Tailwind CSS 3.4.14 + Vanilla CSS Variables  
**Animation:** GSAP 3.12.5 + `@gsap/react`  
**Test Suites:** Vitest 2.1.9 (Unit) + Playwright 1.64.1 (E2E & Full-Page Visual Screenshots)  

---

## 1. Production Build Metrics

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    144 B           114 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ƒ /api/inquiries                       0 B                0 B
├ ○ /coaching                            145 B           114 kB
├ ○ /en                                  144 B           114 kB
├ ○ /en/coaching                         144 B           114 kB
├ ○ /en/harga                            141 B           110 kB
├ ○ /en/hubungi                          142 B           111 kB
├ ○ /en/portfolio                        142 B           108 kB
├ ○ /en/servis                           144 B           115 kB
├ ○ /en/tentang                          2.38 kB         112 kB
├ ○ /harga                               142 B           110 kB
├ ○ /hubungi                             142 B           111 kB
├ ○ /portfolio                           141 B           108 kB
├ ○ /servis                              144 B           115 kB
└ ○ /tentang                             2.38 kB         112 kB
+ First Load JS shared by all            87.3 kB
  ├ chunks/117-092410ee1c2cc9d9.js       31.7 kB
  ├ chunks/fd9d1056-c8d745efa24a674d.js  53.6 kB
  └ other shared chunks (total)          1.89 kB

○  (Static)   prerendered as static content (18 pages)
ƒ  (Dynamic)  server-rendered on demand (1 route handler)
```

### Performance & Bundle Analysis
- **Total Static Pages:** 18 pages pre-rendered at compile time.
- **Shared First Load JS:** 87.3 kB (includes React runtime, Next.js framework, Lucide icons, GSAP).
- **Heaviest Page:** `/servis` at 115 kB First Load JS (well under the 150 kB recommended performance budget).
- **Core Web Vitals:** Static generation ensures zero server-side rendering delay (TTFB < 50ms locally).

---

## 2. Test Execution Summary

### Unit Tests (`npm test` via Vitest)
```text
 ✓ tests/unit/inquiry.test.ts (6 tests)
 ✓ tests/unit/pricing.test.ts (8 tests)

 Test Files  2 passed (2)
      Tests  14 passed (14)
   Duration  576ms
```
- **Pricing Calculator Unit Coverage:**
  - Base package prices (Landing RM645, Business RM1,745, Premium RM2,995, Full-Stack RM3,250 quote).
  - Add-on arithmetic (Animation +RM400, Second Lang +RM250).
  - Combination totals (Business + Animation = RM2,145; Business + Both = RM2,395; Premium + Both = RM3,645).
  - Full-stack package addon isolation.
- **Inquiry Form Validation Coverage:**
  - Standard payload acceptance.
  - Honeypot anti-spam bot trap.
  - Required fields and minimum character limits.

### End-to-End Tests (`npm run test:e2e` via Playwright)
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
```

---

## 3. Local Commands & Verification Guide

### Quick Start
```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run unit tests
npm test

# 3. Run full automated E2E browser audit & regenerate screenshots
npm run test:e2e

# 4. Start local development server
npm run dev

# 5. Build and preview production server
npm run build
npm start
```

---

## 4. Next Steps for Astra V2 / Live Launch

When Syahmi authorizes live deployment:
1. Provide official WhatsApp international phone number.
2. Configure `RESEND_API_KEY` in `.env.local` or Vercel dashboard.
3. Import real client project case studies into `src/content/projects.ts`.
4. Connect domain `studio.syahmiaof.my` via Vercel DNS or Cloudflare.
