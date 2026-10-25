# Plan: Project Orchestrator Generation 2

## Phase 1: Milestone 2 Verification Wave
1. Dispatch Reviewer M2-1:
   - Scope: HomeView, ServicesView, PortfolioView (3D CSS gallery), PricingView (hardware terminal).
   - Verify layout parity against reference mockups, typography, tokens, unit test compliance.
2. Dispatch Reviewer M2-2:
   - Scope: CoachingView (colossal 05 plinth), AboutView (yellow banner, annotation, laptop), ContactView (curved arrow, terminal).
   - Verify parameter handoff, honeypot, mailto fallback, build stability.
3. Dispatch Challenger M2-1:
   - Scope: Responsive adaptation at 390px (iPhone viewport), horizontal scroll checks (0 overflow), interactive state resilience.
4. Dispatch Challenger M2-2:
   - Scope: Pricing arithmetic invariants, edge cases in package/addon toggles, parameter persistence on language switch.
5. Dispatch Forensic Auditor M2-1:
   - Scope: Full forensic integrity scan across all 7 routes (zero hardcoded fakes, authentic unboxed characters, genuine CSS 3D, authentic screenshots).
6. Gate M2: Record verdicts in `GATE_STATUS.md`. On PASS, mark M2 as DONE in `PROJECT.md` and `progress.md`.

## Phase 2: Milestone 3 Execution (GSAP Motion, Responsive Polish, Final E2E QA)
1. Dispatch Explorer M3:
   - Explore GSAP setup (`@gsap/react`, `useGSAP`), motion reveals on headlines/plinths/characters, subtle scroll parallax, `prefers-reduced-motion` implementation.
   - Explore 390px responsive fine-tuning across all routes.
2. Dispatch Worker M3:
   - Implement motion hooks with GSAP and reduced-motion safety.
   - Refine 390px mobile stacking and spacing.
   - Run Vitest (14/14), static build (18 routes), Playwright E2E on port 3456/3002, capture fresh full-page desktop & mobile screenshots.
3. Dispatch Verification Wave M3:
   - Reviewer M3-1 & M3-2.
   - Challenger M3-1 & M3-2.
   - Forensic Auditor M3-1.
4. Gate M3: Verify all pass criteria.

## Phase 3: Sentinel Completion Reporting
1. Compile final synthesized verification report with complete evidence chains, test scores, visual artifacts.
2. Send report to Sentinel (`78d6c5de-d032-472e-94df-fdb67f5739b5`).
