# SYAHMIAOF Studio V3.4 — Local Review

Date: 2026-10-26  
Checkpoint base: `ae51e99` (V3.3.1).  
Deployment and Git push: not performed.

## Delivered

- Reordered the one-page experience to Home, About, Services, Portfolio, Pricing, Coaching and Contact. The legacy `#utama` anchor remains available.
- Added `SYAHMIAOF Assistant`, closed by default, with Malay/English copy, FAQ chips, FAQ-only responses and an optional bounded project-brief flow.
- Added the 28-intent bilingual deterministic FAQ. Approved price answers use existing pricing, maintenance and coaching data.
- Added an editable WhatsApp handoff summary. It opens a `wa.me` link only after a visitor clicks; the visitor still reviews and sends the message in WhatsApp.
- Added an OpenAI-compatible server adapter behind explicit environment settings. It is disabled by default and also hard-disabled in production until shared rate limiting and usage controls exist.
- Added the black/acid-yellow S mark, favicon sizes, Apple touch icon, app icons and a 1200×630 branded OG image.
- Added request-size limits and inquiry field/array caps; no dependencies were upgraded.

## Verification

- `npm run typecheck`: passed.
- `npm run lint`: passed with no warnings or errors.
- `npm test`: 35 tests across 4 files passed (includes all 28 FAQ intents, Malay/English examples and aliases).
- `npm run build`: passed on Next.js 14.2.35.
- `npm run test:e2e:v34` against the final `http://127.0.0.1:3461` preview: passed. Report: [e2e-results.json](after/e2e-results.json).
- `npm run test:e2e` (V3.3 one-page regression) against `http://127.0.0.1:3462`: passed. Report: `docs/qa/v33/after/e2e-results.json`.
- Browser runtime errors: zero in both E2E suites.
- Tested section navigation, legacy links, pricing calculator invariants, language switch, WhatsApp link handoff, assistant keyboard behavior and all five requested viewport widths.
- Browser checked the rendered BM/EN canonical, Open Graph and Twitter tags. Favicon, icon, SVG mark and OG image endpoints all returned HTTP 200 with image content types.
- Visual review compared the 1440×900 baseline and V3.4 capture: Home hero image and composition remain unchanged; the About artwork follows Home; each other section retains its approved image plate.

## Evidence

Baseline captures: [before](before/). V3.4 captures: [after](after/).

After captures include Malay and English home at 1440×900, 1024×900, 768×1024, 390×844 and 375×812; full-page Malay/English at desktop and 390px; and the assistant open at desktop and mobile. [port-3461-preview.png](after/port-3461-preview.png) records the final preview smoke check after replacing the stale local server. The UI capture is browser emulation; the on-device mobile keyboard was not tested on a physical phone.

## Remaining before production

- Resolve the critical Next.js advisory and high-severity dependency findings documented in [SECURITY.md](SECURITY.md); do not deploy this checkpoint.
- Keep assistant LLM disabled. Select a provider, approve a spend limit, add shared rate limiting/usage controls, then run a provider integration test and privacy review.
- Configure Resend credentials and verified sender/recipient values, then run a real end-to-end inquiry delivery test. `/api/inquiries` returned the expected unconfigured HTTP 503 during local QA.
- Review final desktop/mobile UI in the browser at `http://127.0.0.1:3461`.
