## 2026-10-25T15:11:41Z
You are Milestone 1 Worker (Foundation, Tokens, i18n Headlines & Brutalist Primitives Specialist).
Your working directory is: C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\worker_m1_1
Read ORIGINAL_REQUEST.md at: C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\ORIGINAL_REQUEST.md
Read PROJECT.md at: C:\Users\USER\Desktop\studio.syahmiaof.my\PROJECT.md
Read the Explorer recommendation reports:
- C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m1_1\report.md (Font tokens & i18n headlines)
- C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m1_2\report.md (12 Brutalist architectural primitives)
- C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m1_3\report.md (Project assets & character positioning)

Write ownership: You exclusively own:
- `src/styles/globals.css`
- `src/i18n/ms.ts` and `src/i18n/en.ts`
- `src/components/ui/` (all shared brutalist components)
- `public/assets/projects/` and `src/content/projects.ts`

Tasks:
1. `src/styles/globals.css`: Define `--font-display: 'Oswald', 'Impact', sans-serif;`, `--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;`, `--font-mono: 'JetBrains Mono', monospace;` on `:root`.
2. `src/i18n/ms.ts` and `src/i18n/en.ts`: Update all 7 route headlines to the approved brutalist slogans as specified in `explorer_m1_1/report.md`. Strictly preserve `pricing.badge` containing 'PRICING STUDIO' in `en.ts` for Playwright test compatibility. Ensure zero changes to arithmetic, form validation, or meta keys.
3. `src/components/ui/`: Implement the 12 production-grade Brutalist architectural primitives specified in `explorer_m1_2/report.md`:
   - `ConcretePlinth.tsx`
   - `HazardMarking.tsx`
   - `IndustrialGrid.tsx`
   - `ReflectiveFloor.tsx`
   - `ArchitecturalSYA.tsx`
   - `ArchitecturalNumeral04.tsx`
   - `ArchitecturalPlinth05.tsx`
   - `ArchitecturalNumeral07.tsx`
   - `BrutalistBanner.tsx`
   - `BrutalistArrow.tsx`
   - `DemoBadge.tsx`
   - `MetadataTicker.tsx`
   Create `src/components/ui/index.ts` re-exporting all 12 primitives.
4. `public/assets/projects/`: Extract / create discrete project mockups (`symi-ui.png`, `lamborghini-concept.png`, `uberpokmi-ui.png`) per `explorer_m1_3/report.md` (e.g. using sharp script or rendering brutalist SVG/PNG previews), and update `src/content/projects.ts` to reference them.
5. Verification:
   - Run `npm test` and verify all 14 unit tests pass with 0 failures.
   - Run `npx tsc --noEmit` and verify 0 TypeScript errors.
   - Run `npm run build` and verify Next.js build exits 0 across all 18 routes.
