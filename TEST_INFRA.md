# E2E Test Infra: SYAHMIAOF STUDIO

## Test Philosophy
- Requirement-driven visual and functional verification.
- Opaque-box browser validation on dedicated port 3456 (or 3002 baseline), strictly avoiding port 3000.
- Dual testing layers:
  1. Unit tests (Vitest) for arithmetic purity, Zod validation, and honeypot rejection.
  2. E2E browser tests (Playwright) for interactive calculations, parameter handoff, bilingual switcher, form fallback, and visual screenshot comparisons (1440px desktop & 390px mobile).

## Feature Inventory & Test Coverage
| # | Feature | Source | Tier 1: Unit / Contract | Tier 2: Boundary / Edge | Tier 3: Cross-Feature Handoff | Tier 4: Visual QA Mockup Match |
|---|---------|--------|:-----------------------:|:-----------------------:|:-----------------------------:|:------------------------------:|
| 1 | Pricing Engine Arithmetic | R2 | 8 Vitest unit tests | NaN / Empty addons | Business + GSAP + 2nd Lang | Live invoice rendering |
| 2 | Inquiries & Anti-Spam | R2 | 6 Vitest unit tests | Honeypot string injection | 503 mailto fallback CTA | Terminal console form layout |
| 3 | Parameter Handoff (/harga -> /hubungi) | R2 | Query string parsing | Special char encoding | Live summary card in /hubungi | Prefilled contact category |
| 4 | Parameter Handoff (/coaching -> /hubungi) | R2 | Topic & duration query | 60m vs 90m toggles | Coaching summary card | Prefilled contact category |
| 5 | Bilingual Switcher | R2 | / <-> /en toggle | Retain query string | Estimate preserved in /en | Oswald display typography |
| 6 | Home Visual Fidelity | R1 | Page render | Mobile 390px no overflow | CTA click routing | 3D SYA + Seated Character |
| 7 | Services Visual Fidelity | R1 | Dual panel render | Mobile stacking | Package inquiry CTA | Builder Character + Cobalt |
| 8 | Portfolio Visual Fidelity | R1 | Project card render | Badges displayed | Demo external links | CSS 3D Perspective Gallery |
| 9 | Pricing Visual Fidelity | R1 | Configurator render | Full-stack disables addons | Quote handoff link | 3D 04 + Terminal Console |
| 10 | Coaching Visual Fidelity | R1 | Track card render | Duration toggle (60/90m) | Slot inquiry link | Colossal 05 + Seated Creator |
| 11 | About Visual Fidelity | R1 | Bio & credentials | Thigh annotation leader | Contact CTA | Pointing Character + Laptop |
| 12 | Contact Visual Fidelity | R1 | Terminal console | Form input validation | Direct mailto fallback | 3D 07 + Yellow Curved Arrow |

## Test Architecture
- **Unit Runner**: Vitest (`npm test`). Pass criteria: 14/14 tests pass, 0 failures.
- **E2E Runner**: Playwright (`node tests/e2e/audit_and_screenshots.js` or `npm run test:e2e`). Pass criteria: exit code 0, all interactive checks pass on port 3456.
- **Visual Capture**: Screenshots captured at 1672x941 (desktop) and 390x844 (mobile) stored in `docs/qa/screenshots/`.
