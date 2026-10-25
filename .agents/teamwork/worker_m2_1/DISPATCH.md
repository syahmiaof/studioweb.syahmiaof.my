## 2026-10-25T15:50:31Z
You are Milestone 2 Worker (7-Route Layout Reconstruction Specialist).
Your working directory is: C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\worker_m2_1
Read ORIGINAL_REQUEST.md at: C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\ORIGINAL_REQUEST.md
Read PROJECT.md at: C:\Users\USER\Desktop\studio.syahmiaof.my\PROJECT.md
Read the three Explorer layout reports:
- C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m2_1\report.md (Home & Services layout)
- C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m2_2\report.md (Portfolio 3D & Pricing Studio layout)
- C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m2_3\report.md (Coaching, About & Contact layout)

Write ownership: You exclusively own:
- `src/components/pages/HomeView.tsx`
- `src/components/pages/ServicesView.tsx`
- `src/components/pages/PortfolioView.tsx`
- `src/components/pages/PricingView.tsx`
- `src/components/pages/CoachingView.tsx`
- `src/components/pages/AboutView.tsx`
- `src/components/pages/ContactView.tsx`

Tasks:
1. `HomeView.tsx`:
   - Headline 'WEB YANG BUKAN BIASA.' with 'BUKAN BIASA.' in yellow brutalist block (`bg-acid text-ink px-4 sm:px-6 py-1 -skew-x-2 shadow-brutal-dark`).
   - Giant 3D angled 'SYA' architectural typography (`ArchitecturalSYA`) in background with `IndustrialGrid` and `ReflectiveFloor`.
   - Seated techwear character (`07_hero_seated_character.png`) UNBOXED and physically anchored on stepped concrete geometry (`ConcretePlinth` variant='hero-stepped') with hazard markings.
   - High-contrast brutalist CTA buttons and industrial metadata ticker (`MetadataTicker`).
2. `ServicesView.tsx`:
   - Headline 'BINA IDEA. LANCAR WEB.'
   - Layered cobalt blue architectural blocks and standing builder character (`02_character_builder_laptop.png`) with laptop integrated on the right.
   - Eliminate tab toggle; render distinct brutalist side-by-side panels: `01 / WEBSITE FRONTEND` (RM645, CTA links to `/harga`) and `02 / SISTEM FULL-STACK` (RM3,250, CTA links to `/hubungi?service=full-stack&package=custom-system`).
3. `PortfolioView.tsx`:
   - Headline 'IDEA JADI REALITI.'
   - Dramatic CSS 3D perspective gallery (`perspective-1000`, `preserve-3d`, rotated project cards with `rotateY`, `rotateX`, depth shadows, neon borders).
   - Display discrete mockups from `public/assets/projects/` for SYMI UI, Lamborghini Concept, and UberPokmi UI.
   - Honest badges (`DemoBadge` with `KONSEP DEMO` / `EKSPERIMENTAL` / `FRONTEND DEMO`), bottom slider navigation controls (`<` and `>`), and technical details drawer.
4. `PricingView.tsx`:
   - Headline 'BINA IKUT BAJET.'
   - Monumental 3D numeral '04' (`ArchitecturalNumeral04`) with diagonal arrow (`BrutalistArrow` variant='diagonal-pricing').
   - Industrial terminal configurator surface ('KIRA HARGA WEBSITE') with side-by-side package selectors and add-on toggles (strictly preserving `calculateFrontendEstimate`).
   - Live invoice breakdown card with dynamic sum and quote handoff link passing query parameters (`service`, `package`, `addons`, `estimate`) to `/hubungi`.
   - Bottom full-stack callout banner ('Sistem custom? Dari RM3,250').
   - Preserve Playwright locators (`text=Frontend Landing`, `text=Frontend Business`, etc., using sr-only if needed).
5. `CoachingView.tsx`:
   - Headline 'BELAJAR. BINA. DEPLOY.'
   - Colossal cobalt blue '05' plinth (`ArchitecturalPlinth05`) with seated creator character (`03_character_creator_laptop.png`) anchored on concrete cube pedestal.
   - Interactive 60m / 90m duration selector pins and curriculum track cards.
   - Parameter handoff link to `/hubungi?service=coaching&topic=[id]&duration=[duration]`.
6. `AboutView.tsx`:
   - Headline 'SAYA SYAHMI AOF.' with 'SYAHMI' in high-contrast yellow brutalist banner block (`BrutalistBanner`).
   - Dual-asset composition: pointing character (`05_character_pointing_throw.png`) on the left and floating closed laptop (`06_laptop_closed_floating.png`) in the air.
   - Protected annotation 'KARAKTER VISUAL JENAMA' positioned beside character's thigh with technical leader line / pointer pin.
   - 3 credential badges, accurate biography.
7. `ContactView.tsx`:
   - Headline 'IDEA KAU. KITA BINA.'
   - Monumental 3D numeral '07' (`ArchitecturalNumeral07`) and dynamic sweeping yellow brutalist curved arrow (`BrutalistArrow` variant='curved-contact') pointing to industrial terminal console.
   - Ingress parameter handling: extract `service`, `package`, `addons`, `estimate`, `topic`, `duration` from URL and display active quote summary card.
   - Terminal console form with Category, Name, Contact, Brief fields.
   - Anti-spam honeypot field (`name="website_pot"`) and honest HTTP 503 fallback displaying `mailto:hello@syahmiaof.my` direct button.
8. Verification:
   - Run `npm test` and verify 14/14 unit tests pass with 0 failures.
   - Run `npx tsc --noEmit` and verify 0 TypeScript errors.
   - Run `npm run build` and verify Next.js build exits 0 across all 18 routes.
