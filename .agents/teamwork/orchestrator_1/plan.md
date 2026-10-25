# Orchestration Plan: SYAHMIAOF STUDIO

## Objective
Rebuild and recover the high-impact Digital Brutalism visual fidelity of all seven routes for SYAHMIAOF STUDIO to match the seven approved reference mockups in `design/references/`, while strictly preserving existing pricing calculation logic, bilingual support, and commercial integrity.

## Specialist Team & Roles
- **MATA (Visual QA)**: Visual inspection against references in `design/references/`, automated screenshots desktop (1440px) & mobile (390px), pixel-accurate alignment.
- **WIRA (Layout Reconstruction)**: HTML/Tailwind brutalist component structure, typography grids, architectural blocking.
- **BAYU (GSAP Motion)**: Entrance reveals, subtle scroll parallax, reduced-motion compliance.
- **PANGLIMA (3D/Asset Composition)**: Layering transparent character cutouts (`public/assets/characters/`), 3D perspective transforms (`transform-style: preserve-3d`), architectural numerals and plinths.
- **BENTARA (Performance & Responsive)**: 390px mobile responsiveness, overflow guards (`overflow-x: hidden`), asset optimization.
- **CENDEKIA (Functional Regression)**: Vitest unit tests (pricing engine, bilingual router), Playwright E2E tests (quote/coaching handoff, contact form, fallback mailto).

## Phase Plan
### Phase 0: Survey & Discovery (Top-Level Orchestrator)
- Spawn 3 parallel Explorers to map the codebase, inspect current routes, design references in `design/references/`, character assets in `public/assets/characters/`, existing tests, and dependencies.
- Synthesize findings into `PROJECT.md` with full Architecture, Feature Inventory, Milestones, and Interface Contracts.

### Phase 1: Dual Track Decomposition
- **Track A (E2E & Test Infra Track)**: Verify test suite and harness (Vitest, Playwright, screenshot capture runner on port 3456/3002).
- **Track B (Implementation Track)**: Route-by-route reconstruction milestones.
  - Milestone 1: Design System & Shared Architectural Components (Brutalist blocks, 3D CSS container, Typography, Header/Footer, Asset loader).
  - Milestone 2: Home (`/` & `/en`) & Services (`/servis` & `/en/servis`).
  - Milestone 3: Portfolio (`/portfolio` & `/en/portfolio`) & Pricing Studio (`/harga` & `/en/harga`).
  - Milestone 4: Coaching (`/coaching` & `/en/coaching`), About (`/tentang` & `/en/tentang`), and Contact (`/hubungi` & `/en/hubungi`).
  - Milestone 5 (Final Milestone): Full E2E verification, Visual QA verification across all 7 routes at 1440px and 390px, Vitest 14/14 tests, Playwright checks, and Forensic Integrity Audit.

### Phase 2: Execution & Verification Gate per Milestone
- For each milestone: Explorer recommendations -> Worker implementation -> 2 Reviewers -> 2 Challengers -> 1 Forensic Auditor -> Gate check (`GATE_STATUS.md`).
