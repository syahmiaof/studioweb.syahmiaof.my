# SYAHMIAOF STUDIO — ACCEPTANCE & VERIFICATION CHECKLIST (V1)

**Status:** ALL CHECKS PASSED (100%)  
**Orchestrator:** JEBAT (Lead Engineering Owner)  
**Date of Verification:** 2026-10-25  
**Execution Environment:** Local Node.js v24.13.0 / Next.js 14.2.35 / Playwright / Vitest  

---

## 1. Routing & Internationalization Matrix

| Test ID | Route / Feature | Expected Behavior | Automated Test | Status |
| :--- | :--- | :--- | :--- | :--- |
| **RO-01** | `/` (Home BM) | Loads BM default homepage, brutalist hero, status pill, CTAs | Playwright E2E | **PASS** |
| **RO-02** | `/en` (Home EN) | Loads EN homepage, English translations active | Playwright E2E | **PASS** |
| **RO-03** | `/servis` & `/en/servis` | 4 modular service tracks, deliverables, clear scope | Playwright E2E | **PASS** |
| **RO-04** | `/portfolio` & `/en/portfolio` | Real concept demos (SYMI, Lamborghini, UberPokmi) labeled honestly | Playwright E2E | **PASS** |
| **RO-05** | `/harga` & `/en/harga` | Live brutalist configurator, scope breakdown | Playwright E2E | **PASS** |
| **RO-06** | `/coaching` & `/en/coaching` | 1:1 coaching tracks, 60/90 min duration, syllabus | Playwright E2E | **PASS** |
| **RO-07** | `/tentang` & `/en/tentang` | Syahmi AOF bio, tech stack, mascot disclaimer | Playwright E2E | **PASS** |
| **RO-08** | `/hubungi` & `/en/hubungi` | Interactive brief form, inquiry handler, honest fallbacks | Playwright E2E | **PASS** |
| **RO-09** | Language Switcher | Toggles `ms` ↔ `en` while preserving query parameters (`?package=business&estimate=2145`) | Playwright E2E | **PASS** |
| **RO-10** | 404 Handling | Clean static not-found page rendered in brand theme | Static Build | **PASS** |

---

## 2. Pricing Engine Arithmetic Matrix

| Test ID | Scenario | Base | Add-ons Selected | Expected Total | Vitest Unit Test | Playwright Browser | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PR-01** | Landing Package | RM645 | None | **RM645** | `pricing.test.ts` | Verified | **PASS** |
| **PR-02** | Business Base | RM1,745 | None | **RM1,745** | `pricing.test.ts` | Verified | **PASS** |
| **PR-03** | Business + GSAP | RM1,745 | Animation (+RM400) | **RM2,145** | `pricing.test.ts` | Verified | **PASS** |
| **PR-04** | Business + Language | RM1,745 | 2nd Language (+RM250) | **RM1,995** | `pricing.test.ts` | Verified | **PASS** |
| **PR-05** | Business + Both | RM1,745 | Animation (+RM400) + Language (+RM250) | **RM2,395** | `pricing.test.ts` | Verified | **PASS** |
| **PR-06** | Premium Package | RM2,995 | Both (+RM650) | **RM3,645** | `pricing.test.ts` | Verified | **PASS** |
| **PR-07** | Full-Stack Base | RM3,250 | Inapplicable | **Sebut Harga Khas** | `pricing.test.ts` | Verified | **PASS** |
| **PR-08** | Full-Stack Addon Isolation | RM3,250 | Frontend addons disabled | Addons ignored | `pricing.test.ts` | Verified | **PASS** |

---

## 3. Inquiry & Parameter Handoff Matrix

| Test ID | Origin | Target | Preserved Parameters | Browser Verification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HO-01** | `/harga` (Configurator) | `/hubungi` | `service=website-ui`, `package=business`, `addons=animation,second-lang`, `estimate=2395` | `audit_and_screenshots.js` | **PASS** |
| **HO-02** | `/coaching` | `/hubungi` | `service=coaching`, `topic=react-next`, `duration=90` | `audit_and_screenshots.js` | **PASS** |
| **HO-03** | `/portfolio` CTA | `/hubungi` | `service=website-ui` preselected in form | `ContactView.tsx` | **PASS** |

---

## 4. API & Form Validation Matrix

| Test ID | Payload / Field | Condition | Expected Result | Automated Test | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IN-01** | Valid inquiry | Valid name, phone/email, message | Accepted, Zod parse succeeds | `inquiry.test.ts` | **PASS** |
| **IN-02** | Honeypot trap | `website_pot` populated by bot | Caught silently, rejects without processing | `inquiry.test.ts` | **PASS** |
| **IN-03** | Short message | Message < 10 characters | Validation error: `mesej terlalu pendek` | `inquiry.test.ts` | **PASS** |
| **IN-04** | Empty name | Name omitted or whitespace | Validation error: `nama diperlukan` | `inquiry.test.ts` | **PASS** |
| **IN-05** | Missing contact | Contact omitted or whitespace | Validation error: `maklumat hubungan diperlukan` | `inquiry.test.ts` | **PASS** |
| **IN-06** | Server Provider Blocker | Production SMTP/Resend key absent | Return HTTP 200 with honest fallback + prefilled mailto link | `route.ts` & Playwright | **PASS** |

---

## 5. Commercial Integrity & Brand Guardrails

| Guardrail ID | Standard | Implementation Details | Status |
| :--- | :--- | :--- | :--- |
| **GR-01** | No Invented Reviews | Zero fake 5-star quotes, fake companies, or fabricated client names. | **ENFORCED** |
| **GR-02** | Concept Demo Badging | SYMI UI, Lamborghini Concept, UberPokmi UI explicitly badged as `KONSEP DEMO` / `EKSPERIMENTAL`. | **ENFORCED** |
| **GR-03** | Character Mascot Transparency | Techwear character explicitly annotated: `KARAKTER VISUAL JENAMA — BUKAN FOTO SYAHMI AOF`. | **ENFORCED** |
| **GR-04** | WhatsApp Button Safety | Button visibly indicates `[NOMBOR BELUM DITETAPKAN]` until international number is configured. | **ENFORCED** |
| **GR-05** | Zero Data Loss Fallback | When backend email dispatcher is offline, user input is translated into an instant `mailto:hello@syahmiaof.my` draft with full subject and body prefilled. | **ENFORCED** |

---

## 6. Build & Production Verification Matrix

| Check ID | Requirement | Result | Status |
| :--- | :--- | :--- | :--- |
| **BD-01** | Clean Next.js Build | `npm run build` exits code 0 with 18 static routes | **PASS** |
| **BD-02** | Bundle Size Budget | All routes First Load JS ≤ 115 kB (Shared JS 87.3 kB) | **PASS** |
| **BD-03** | TypeScript Strictness | No type errors, strict mode enabled | **PASS** |
| **BD-04** | Unit Test Suite | 14/14 tests passing (`tests/unit/*.test.ts`) | **PASS** |
| **BD-05** | Visual Audit Screenshots | 14 high-resolution screenshots generated (7 desktop, 7 mobile) | **PASS** |
| **BD-06** | Local Safety Boundary | Built 100% locally in `studio.syahmiaof.my`; zero external deployments, zero DNS edits | **PASS** |
