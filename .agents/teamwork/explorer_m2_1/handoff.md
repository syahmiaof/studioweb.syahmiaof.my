# Handoff Report: Milestone 2 Explorer 1 (Home & Services Layout Reconstruction)

## 1. Observation
1. **Reference Mockup Inspection**:
   - `design/references/01-home.png`: Shows "WEB YANG BUKAN BIASA." with "BUKAN BIASA." in a high-impact yellow brutalist block. Giant 3D concrete letters "SYA" with cobalt/yellow paint slashes span the background. A seated techwear character (`07_hero_seated_character.png`) is completely **unboxed** and sits directly on a stepped concrete plinth (`variant="hero-stepped"`) with hazard yellow markings and a reflective specular floor.
   - `design/references/02-services.png`: Shows headline "BINA IDEA. LANCAR WEB." against layered cobalt blue architectural slabs and textured concrete. It displays **two distinct brutalist panels side-by-side**: `01 / WEBSITE FRONTEND` (Bermula RM645, yellow button "Lihat Pakej" linking to `/harga`) and `02 / SISTEM FULL-STACK` (Bermula RM3,250, cobalt button "Bincang Projek" linking to `/hubungi?service=full-stack&package=custom-system`). On the right, a standing builder character with laptop (`02_character_builder_laptop.png`) is unboxed and integrated into the cobalt architecture.

2. **Current Codebase Deficiencies**:
   - `src/components/pages/HomeView.tsx` lines 111-144: The seated character is enclosed inside a generic framed box (`border-2 border-zinc-800 ... aspect-[4/5] overflow-hidden`) with a dark gradient, rather than being unboxed and sitting on the stepped concrete geometry.
   - `src/components/pages/HomeView.tsx` line 61: The headline does not use the high-contrast yellow brutalist block container with skew/shadow.
   - `src/components/pages/HomeView.tsx`: Neither `ArchitecturalSYA` nor `ConcretePlinth` nor `ReflectiveFloor` nor `MetadataTicker` from `src/components/ui/` are currently imported or rendered in the hero.
   - `src/components/pages/ServicesView.tsx` lines 28, 52-79: Implements a single active tab toggle `const [activeTab, setActiveTab] = useState<"frontend" | "fullstack">("frontend");`, hiding one category whenever the other is selected, completely contradicting the side-by-side dual-panel architecture shown in `02-services.png`.
   - `src/components/pages/ServicesView.tsx` lines 176-204: Wraps `02_character_builder_laptop.png` in a card box (`border-2 border-zinc-800 bg-gradient-to-b ... p-4`) rather than integrating it freely onto layered cobalt blocks.

3. **Shared Primitives Available in `src/components/ui/`**:
   - `ArchitecturalSYA.tsx` (lines 7-108): 3D axonometric concrete SVG letters "S", "Y", "A" with cobalt (`#103BFF`) and yellow (`#F3FF00`) paint slashes.
   - `ConcretePlinth.tsx` (lines 12-137): Volumetric stepped concrete platform (`variant="hero-stepped"`) with tie-holes, hazard stripes, hazard stencil arrow, and cobalt splash.
   - `HazardMarking.tsx` (lines 9-58): Striped and caution bar patterns.
   - `IndustrialGrid.tsx` (lines 10-57): Background drafting grid with crosshairs.
   - `ReflectiveFloor.tsx` (lines 9-33): Specular floor reflection with acid and cobalt glare.
   - `MetadataTicker.tsx` (lines 22-46): Industrial status ticker.

4. **Build & Test Verification**:
   - `npm test`: 14 passed (14/14 unit tests in Vitest).
   - `npm run build`: Exit code 0, 18 static routes compiled cleanly.

## 2. Logic Chain
1. *From Observation 1 & 2*: Because `01-home.png` shows an unboxed seated character sitting on a multi-tiered concrete plinth with "SYA" in the background, keeping the current `<div className="... aspect-[4/5] overflow-hidden">` in `HomeView.tsx` creates visual dissimilarity and fails the approved design standard.
2. *From Observation 1 & 3*: The primitive `ConcretePlinth` with `variant="hero-stepped"` already provides the exact geometry, tie-holes, hazard stripes, and cobalt splashes needed to anchor `07_hero_seated_character.png`. Combining `ArchitecturalSYA` in the background layer, `ConcretePlinth` in the mid-layer, and `07_hero_seated_character.png` in the foreground achieves the composition of `01-home.png`.
3. *From Observation 1 & 2*: Because `02-services.png` shows `01 / WEBSITE FRONTEND` (RM645) and `02 / SISTEM FULL-STACK` (RM3,250) rendered simultaneously side-by-side, maintaining `useState("frontend" | "fullstack")` in `ServicesView.tsx` prevents users from comparing both offerings at a glance as designed.
4. *From Observation 1 & 2*: Removing the tab switcher and placing both panels in an equal-height dual grid (`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8`) allows direct CTA routing: Panel 01 navigates to `/harga` (Pricing Studio), and Panel 02 navigates to `/hubungi?service=full-stack&package=custom-system` (Contact Form pre-filled for custom systems).
5. *From Observation 2 & 4*: Unboxing `02_character_builder_laptop.png` and layering it with cobalt blue geometric planes (`bg-cobalt`, `bg-cobalt-light`) and yellow chevron arrows restores the visual impact of `02-services.png` without impacting any business logic or test passes.

## 3. Caveats
- **Motion Integration**: Detailed GSAP animations and entrance timelines are scheduled for Milestone 3. The layout structure recommended here is engineered with GSAP target markers and clean DOM hierarchy to allow smooth GSAP integration without refactoring layout markup later.
- **Mobile Viewport Font Sizing**: On ultra-narrow screens (360px - 390px), headlines must use `text-5xl` to prevent word-break issues. This has been factored into the CSS recommendations.
- **No Scope Drift**: The existing comprehensive technical feature data in `SERVICES_DATA` and bilingual dictionaries in `src/i18n/{ms,en}.ts` are preserved in full.

## 4. Conclusion
1. `HomeView.tsx` must be restructured to:
   - Unbox `07_hero_seated_character.png` and anchor it onto `<ConcretePlinth variant="hero-stepped" />`.
   - Render `ArchitecturalSYA` in the background with `IndustrialGrid` and `ReflectiveFloor`.
   - Wrap `BUKAN BIASA.` / `BEYOND ORDINARY.` in a yellow brutalist block (`bg-acid text-ink px-4 sm:px-6 py-1 -skew-x-2 shadow-brutal-dark`).
   - Append `MetadataTicker` at the base of the hero.
2. `ServicesView.tsx` must be restructured to:
   - Eliminate the `activeTab` toggle.
   - Render dual concurrent panels side-by-side (`01 / WEBSITE FRONTEND` with yellow CTA to `/harga` and `02 / SISTEM FULL-STACK` with cobalt CTA to `/hubungi?service=full-stack&package=custom-system`).
   - Unbox `02_character_builder_laptop.png` against layered cobalt architectural slabs and yellow chevrons.
3. The complete layout recommendation report is documented in `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m2_1\report.md`.

## 5. Verification Method
1. **Unit Test Pass**:
   - Run `npm test` from project root. Must pass 14/14 tests.
2. **Static Build Pass**:
   - Run `npm run build`. Must exit with code 0 and 0 TypeScript errors.
3. **Visual Verification**:
   - Verify `01 — Home`: Desktop view displays "SYA" typography, unboxed seated character on concrete steps with hazard markings, and bottom metadata ticker. Mobile view (390px) stacks character cleanly below CTAs without horizontal scroll.
   - Verify `02 — Services`: Desktop view displays dual panels (`01 / WEBSITE FRONTEND` and `02 / SISTEM FULL-STACK`) simultaneously side-by-side with builder character on the right. Both CTAs link to their respective destinations (`/harga` and `/hubungi`).
