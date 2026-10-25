# Project: SYAHMIAOF STUDIO Visual & Functional Restoration

## Architecture
- **Framework**: Next.js 14 App Router (React 18, TypeScript 5, Tailwind CSS 3.4).
- **Design Language**: High-Impact Digital Brutalism — monumental architectural numerals, concrete plinths, hazard yellow accents, cobalt blue blocks, industrial terminal configurators, transparent techwear character cutouts, CSS 3D perspective transforms.
- **Styling & Fonts**: Tailwind CSS, CSS Custom Properties (`--font-display: 'Oswald'`, `--font-sans: 'Plus Jakarta Sans'`, `--font-mono: 'JetBrains Mono'`), CSS 3D perspective (`preserve-3d`, `perspective: 1000px`).
- **Motion Engine**: GSAP 3 + `@gsap/react` with scroll parallax and `prefers-reduced-motion` guards.
- **Localization**: Dual-locale routing (`/` ms, `/en` en) with shared translation schemas in `src/i18n/{ms,en}.ts` and query parameter preservation.
- **Functional Core**: Pure pricing calculator (`src/lib/pricing/calculator.ts`), Zod inquiry validator (`src/lib/validation/inquiry.ts`), honeypot bot trap (`website_pot`), and 503 `PROVIDER_PENDING_CONFIG` with `mailto:hello@syahmiaof.my` fallback.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Typography & Font Variables | Define `--font-display`, `--font-sans`, `--font-mono` on `:root` in `globals.css` | M1 (DONE) | survey |
| 2 | Brutalist Slogan Headings in i18n | Update `ms.ts` and `en.ts` with all 7 exact approved slogans | M1 (DONE) | survey |
| 3 | Shared Architectural Components | Brutalist plinths, concrete blocks, hazard markings, 3D numeral primitives | M1 (DONE) | survey |
| 4 | Project Screenshot Assets | Extract / generate individual screenshots for SYMI, Lamborghini, UberPokmi in `public/assets/projects/` | M1 (DONE) | survey |
| 5 | Home Visual Reconstruction | "WEB YANG BUKAN BIASA." in yellow block, 3D "SYA", seated character on plinth, ticker | M2 | survey |
| 6 | Services Visual Reconstruction | "BINA IDEA. LANCAR WEB.", cobalt blocks, standing builder character, dual panels | M2 | survey |
| 7 | Portfolio 3D Reconstruction | "IDEA JADI REALITI.", CSS 3D perspective card gallery, honest badges | M2 | survey |
| 8 | Pricing Studio Reconstruction | "BINA IKUT BAJET.", monumental "04", terminal configurator, live invoice, handoff | M2 | survey |
| 9 | Pricing Arithmetic Preservation | RM645 Landing, RM1,745 Business, RM2,995 Premium, RM3,250 Full-Stack, add-ons | M2 | survey |
| 10 | Coaching Visual Reconstruction | "BELAJAR. BINA. DEPLOY.", colossal cobalt "05" plinth, seated creator, duration pins | M2 | survey |
| 11 | About Visual Reconstruction | "SAYA SYAHMI AOF.", yellow banner, pointing character, laptop, thigh annotation | M2 | survey |
| 12 | Contact Visual Reconstruction | "IDEA KAU. KITA BINA.", yellow curved arrow, terminal console, form handoff | M2 | survey |
| 13 | Anti-Spam & Honest Fallback | Honeypot field `website_pot` max(0), honest 503 fallback with `mailto:` | M2 | survey |
| 14 | GSAP Entrance & Parallax Motion | Layered reveals, subtle scroll parallax, reduced-motion compliance | M3 | survey |
| 15 | Responsive Adaptation at 390px | iPhone standard layout, zero horizontal overflow (`overflow-x: hidden`), stacked cutouts | M3 | survey |
| 16 | E2E & Visual QA Test Pass | 14/14 Vitest tests pass, Playwright E2E passes on port 3456/3002, 1440px & 390px screenshots | M3 | survey |
| 17 | Forensic Integrity Verification | Zero hardcoded fakes, zero dummy screenshots, zero fabricated credentials | M3 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation: Design Tokens, Typography, i18n & Primitives | Fix font variables in `globals.css`, update headlines in `src/i18n/{ms,en}.ts`, shared brutalist plinths/numerals, populate project assets | none | **DONE** (14/14 tests pass, 18 routes static build, 12 primitives verified, Clean Forensic Audit) |
| M2 | Visual & Layout Reconstruction of All 7 Routes | Rebuild Home, Services, Portfolio (3D), Pricing (terminal), Coaching (05 plinth), About (banner+annotation), Contact (curved arrow) | M1 | **IN_PROGRESS** |
| M3 | GSAP Motion, Responsive Polish, E2E & Forensic Verification | Entrance & parallax GSAP motion, 390px mobile optimization, Vitest + Playwright E2E pass, screenshot visual QA, forensic audit | M2 | PLANNED |

## Interface Contracts
### `PricingCalculator` (`src/lib/pricing/calculator.ts`) ↔ `PricingView` (`src/components/pages/PricingView.tsx`)
- Package IDs: `"landing" | "business" | "premium" | "custom-system"`
- Add-on IDs: `"animation" | "second-lang"`
- Returns: `{ basePrice: number, addonsTotal: number, total: number, isFullStack: boolean, breakdown: Array<{ name: string, price: number }> }`
- Full-stack behavior: Add-ons total is 0, add-on cards disabled in UI.

### `Header` (`src/components/layout/Header.tsx`) ↔ Locale Routing
- `getToggleUrl()` must append active query string (`?${searchParams.toString()}`) to target URL.
- Malay -> English: `/` -> `/en`, `/harga?estimate=2145` -> `/en/harga?estimate=2145`
- English -> Malay: `/en/harga?estimate=2145` -> `/harga?estimate=2145`

### Query Parameter Handoffs ↔ `ContactView` (`src/components/pages/ContactView.tsx`)
- Pricing handoff: `?service=website-ui&package=[id]&addons=[addons]&estimate=[total]`
- Full-stack handoff: `?service=full-stack&package=custom-system`
- Coaching handoff: `?service=coaching&topic=[id]&duration=[duration]`
- Form fields: `category`, `name`, `contact`, `message`, `website_pot` (honeypot, must be empty).

## Code Layout
- `src/styles/globals.css`: Design tokens, CSS custom properties, utility classes.
- `src/i18n/{ms,en}.ts`: Translation dictionaries with approved headlines.
- `src/components/ui/`: Brutalist shared primitives (12 components + `index.ts`).
- `src/components/layout/`: Header, Footer, Navigation.
- `src/components/pages/`: Page client views (`HomeView`, `ServicesView`, `PortfolioView`, `PricingView`, `CoachingView`, `AboutView`, `ContactView`).
- `src/content/projects.ts`: Project demo metadata and discrete screenshots.
- `public/assets/characters/`: Character PNG cutouts.
- `public/assets/projects/`: Discrete project screenshot assets (`symi-ui.png`, `lamborghini-concept.png`, `uberpokmi-ui.png`).
- `tests/unit/`: Vitest test specifications (14 tests).
- `tests/e2e/`: Playwright test scripts.
