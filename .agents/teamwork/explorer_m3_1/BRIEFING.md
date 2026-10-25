# BRIEFING — 2026-10-25T17:43:00Z

## Mission
Formulate a concrete GSAP motion engineering technical blueprint for Milestone 3 Motion Polish for SYAHMIAOF STUDIO.

## 🔒 My Identity
- Archetype: explorer
- Roles: motion engineering analysis, technical blueprint specification
- Working directory: C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m3_1
- Original parent: 9558a00f-cdc8-4d5a-b2f8-8aa671a99dc9
- Milestone: Milestone 3 Motion Polish

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Do NOT write code to production source files
- Focus on layered GSAP entrance reveals, subtle scroll parallax, prefers-reduced-motion compliance, Next.js 14 SSR/hydration safety

## Current Parent
- Conversation ID: 9558a00f-cdc8-4d5a-b2f8-8aa671a99dc9
- Updated: 2026-10-25T17:43:00Z

## Investigation State
- **Explored paths**:
  - `package.json` (verified `gsap` 3.12.5 and `@gsap/react` 2.1.1 are installed)
  - `src/components/pages/` (HomeView, ServicesView, PortfolioView, PricingView, CoachingView, AboutView, ContactView)
  - `src/components/ui/` (ArchitecturalSYA, ArchitecturalNumeral04, ArchitecturalPlinth05, ArchitecturalNumeral07, ConcretePlinth, BrutalistArrow, BrutalistBanner, IndustrialGrid, ReflectiveFloor, MetadataTicker)
  - `src/styles/globals.css` (tokens, perspective-1000, preserve-3d)
  - `tests/unit/` (40/40 tests pass)
  - `npm run build` (18/18 static routes compile with code 0)
- **Key findings**:
  - No GSAP animations currently exist in `src/`; current pages load statically with basic CSS transitions.
  - Page components are all client components (`"use client"`), ideal for `@gsap/react`'s `useGSAP`.
  - Next.js 14 App Router SSR requires zero initial inline style concealment to prevent hydration mismatch and FOUC; use `fromTo` or `from` with `clearProps: "all"` on completion.
  - Brutalist aesthetic requires punchy, decisive motion (`power3.out`, `power2.out`, 0.5s–0.8s) rather than soft bounce.
  - Architectural elements (`ArchitecturalSYA`, `ArchitecturalNumeral04`, `ArchitecturalPlinth05`, `ArchitecturalNumeral07`) and background grids require subtle scroll parallax (`yPercent: -8` to `12`, scrub: 0.6) gated to desktop viewports (`min-width: 768px`) to ensure 60fps smoothness and no mobile touch interference at 390px.
  - Strict accessibility compliance achievable via `gsap.matchMedia()`: instant `gsap.set` on reduced motion with all triggers killed.
- **Unexplored areas**:
  - Playwright visual regression threshold tuning during motion capture (ensure screenshots wait for `requestAnimationFrame` or reduced-motion emulation during automated audits).

## Key Decisions Made
- Use `gsap.matchMedia()` within `@gsap/react` `useGSAP` in all 7 views.
- Separate desktop parallax from mobile viewport using `(min-width: 768px)` media queries to prevent touch scroll jank on 390px mobile screens.
- Use `clearProps: 'all'` after all entrance tweens so that font smoothing, stacking contexts, and interactive hitboxes remain completely unhindered.
- Keep PortfolioView's 3D perspective cards state-driven in React; only animate stage container entrance with GSAP, then let React CSS transforms manage card switching.

## Artifact Index
- DISPATCH.md — Received dispatch records
- progress.md — Liveness heartbeat and milestone tasks
- handoff.md — 5-component handoff report
