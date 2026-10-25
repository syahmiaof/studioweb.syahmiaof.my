## 2026-10-25T17:46:27Z
You are Worker M3-1 for SYAHMIAOF STUDIO.
Working directory: C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\worker_m3_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

PORT & BOUNDARY CONSTRAINTS:
- Run and test ONLY on port 3456 (or 3002). NEVER TOUCH PORT 3000 (occupied by user host process PID 22932).
- Zero deployments to production, zero DNS modifications.

Your Mission:
Implement Milestone 3:
1. GSAP Motion Polish across all 7 routes (`HomeView.tsx`, `ServicesView.tsx`, `PortfolioView.tsx`, `PricingView.tsx`, `CoachingView.tsx`, `AboutView.tsx`, `ContactView.tsx`):
   - Read GSAP Motion Blueprint from Explorer M3-1:
     `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m3_1\handoff.md`
   - Read GSAP skill instructions:
     `C:\Users\USER\.gemini\config\skills\gsap\SKILL.md`
   - Implement layered entrance reveals using `@gsap/react`'s `useGSAP` with `{ scope: containerRef }`.
   - Implement subtle scroll parallax on desktop (`(min-width: 768px)` via `gsap.matchMedia`).
   - Implement strict reduced motion compliance (`(prefers-reduced-motion: reduce)`): instant opacity 1, zero motion delays, no trapped invisible elements.
   - Include tactile hardware recalculation pulse in `PricingView.tsx` on price updates.
   - Include ambient levitation idle hover for floating laptop in `AboutView.tsx`.
   - Ensure clean SSR hydration safety: zero initial inline hidden styles, `clearProps: "all"` on completion.

2. Responsive Mobile Polish at 390px (iPhone standard):
   - Read Explorer M3-2 recommendations:
     `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m3_2\handoff.md`
   - Add `overflow-x: hidden; max-width: 100%;` to `html` in `src/styles/globals.css`.
   - Ensure all interactive buttons, language toggles, hamburger menus, drawer links, and carousel buttons meet the >=44x44px touch target standard.
   - Ensure mobile navigation drawer has `max-h-[calc(100vh-4rem)] overflow-y-auto`.
   - Polish character cutout vertical cadence and contrast.

3. E2E Test Suite & Visual QA Capture:
   - Read Explorer M3-3 test blueprint:
     `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m3_3\handoff.md`
   - Create `tests/e2e/test_motion_and_reduced_motion.js` as specified by Explorer M3-3.
   - Run and verify all suites:
     a) `npm test` (all 40 Vitest unit tests pass)
     b) `npx tsc --noEmit` (0 errors)
     c) `npm run build` (18/18 static pages generated)
     d) `node tests/e2e/test_motion_and_reduced_motion.js` (motion & reduced motion tests pass on port 3456)
     e) `node tests/e2e/challenger_stress_test.js` (all 50 assertions pass on port 3456)
     f) `node tests/e2e/challenger_m2_1_responsive.js` (all 70 responsive checks pass on port 3456)
     g) `node tests/e2e/audit_and_screenshots.js` (generate fresh desktop and mobile screenshots in `docs/qa/screenshots/`)

4. Write your detailed handoff report in `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\worker_m3_1\handoff.md`.
5. Send a completion message to caller with test results, command outputs, and screenshot file paths.
