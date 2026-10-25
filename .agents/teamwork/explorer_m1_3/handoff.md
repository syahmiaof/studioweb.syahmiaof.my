# Handoff Report — Milestone 1 Explorer 3

**Author:** Milestone 1 Explorer 3 (Project Assets & Character Positioning Specialist)  
**Date:** 2026-10-25  
**Working Directory:** `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m1_3`  
**Handoff Type:** Hard (Task Complete)

---

## 1. Observation

1. **`public/assets/projects/` directory state:**
   - Command `list_dir` on `C:\Users\USER\Desktop\studio.syahmiaof.my\public\assets\projects` returned:
     `Empty directory`
2. **`src/content/projects.ts` references:**
   - Line 21 (`symi-ui`): `image: "/assets/references/03-portfolio.png",`
   - Line 44 (`lamborghini-concept`): `image: "/assets/references/03-portfolio.png",`
   - Line 67 (`uberpokmi-ui`): `image: "/assets/references/03-portfolio.png",`
   - All 3 project items point to the full-page portfolio reference mockup rather than discrete project screenshots.
3. **`src/components/pages/PortfolioView.tsx` rendering:**
   - Lines 79–102 render an editorial placeholder frame with `bg-zinc-950`, `EKSPERIMEN #{idx + 1}`, and `PRJ_0{idx + 1}` without rendering `<Image src={project.image} ...>`.
4. **`design/references/03-portfolio.png` visual content:**
   - Node/Sharp metadata confirmed resolution is `1672 x 941 px`, 3 channels, RGB.
   - Multimodal inspection revealed 3 distinct project screens:
     - Center-top: `01 / SYMI` — Navy blue yogurt e-commerce interface with headline "SIMPLE YOGURT HAPPIER DAYS", cup of strawberry yogurt, and navigation.
     - Bottom-left: `02 / LAMBORGHINI` — Dark carbon interface with gold emblem, "LAMBORGHINI ENGINEERED EMOTION", black supercar on wet asphalt.
     - Bottom-right: `03 / UBERPOKMI` — Cobalt blue superapp interface with yellow branding, "Your Everyday Ride, Food & More.", and mobile phone mockup.
     - All 3 screens in the mockup are already rotated in 3D perspective and partially occluded by concrete blocks.
5. **Character assets in `public/assets/characters/` (Sharp RGBA analysis):**
   - `07_hero_seated_character.png`: Canvas `1200x1310`, content `1031x1299` (x=77..1107, y=11..1309). Bottom padding is `0px` (touches bottom edge).
   - `02_character_builder_laptop.png`: Canvas `1024x1536`, content `731x1474` (x=180..910, y=32..1505). Aspect ratio `0.496`.
   - `03_character_creator_laptop.png`: Canvas `1024x1536`, content `908x1408` (x=56..963, y=67..1474). Bottom padding is `61px`.
   - `05_character_pointing_throw.png`: Canvas `1116x1410`, content `1104x1306` (x=12..1115, y=104..1409). Bottom padding `0px`, right padding `0px`.
   - `06_laptop_closed_floating.png`: Canvas `1254x1254`, content `840x831` (x=202..1041, y=219..1049). ~200px transparent padding on all 4 sides.
6. **V1 "Trapped in a Card" Character Antipattern:**
   - `HomeView.tsx` line 113: `<div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[4/5] bg-gradient-to-b from-zinc-900 to-ink border-2 border-zinc-800 p-2 shadow-2xl overflow-hidden group">`
   - `ServicesView.tsx` line 177: `<div className="border-2 border-zinc-800 bg-gradient-to-b from-surface to-ink p-4 relative overflow-hidden group shadow-2xl">`
   - `CoachingView.tsx` line 169: `<div className="border-2 border-zinc-800 bg-surface p-4 relative overflow-hidden group shadow-2xl">`
   - `AboutView.tsx` line 115: `<div className="border-2 border-zinc-800 bg-gradient-to-b from-surface to-ink p-4 relative overflow-hidden group shadow-2xl">`
   - All four views wrapped characters inside boxed border frames with `overflow-hidden`, contrasting with the approved mockups where characters are unboxed and seated/standing naturally on concrete architecture.
7. **Character Presence Across All 7 Routes:**
   - Route 01 (Home): Seated character `07` on concrete plinth.
   - Route 02 (Services): Standing builder `02` typing on laptop against cobalt wedge.
   - Route 03 (Portfolio): **NO character** (3D project screens only).
   - Route 04 (Pricing): **NO character** (Monumental 04 + terminal configurator).
   - Route 05 (Coaching): Seated creator `03` typing on laptop on concrete 05 plinth.
   - Route 06 (About): Standing character `05` pointing left + floating laptop `06` + `KARAKTER VISUAL JENAMA` thigh label.
   - Route 07 (Contact): **NO character** (Monumental 07 + yellow arrow + terminal console).

---

## 2. Logic Chain

1. **Premise 1 (Assets):** Because `public/assets/projects/` is empty and `projects.ts` references the entire 7-page portfolio mockup, displaying these projects in individual cards displays an image of the whole page inside its own child card, violating project integrity and visual QA.
2. **Premise 2 (Distortion & Occlusion):** In `03-portfolio.png`, each screen is rendered at an angle with baked-in 3D skew and occlusions (concrete blocks covering SYMI's base; phone covering 40% of UberPokmi). Cropping them produces low-res (~500px), double-skewed, occluded images.
3. **Inference 1:** Generating or rendering discrete, flat 1600x1000px orthographic UI mockups matching the exact layout, colors, and typography of each project eliminates perspective clash, removes occlusions, and enables the CSS 3D cards in `PortfolioView` to rotate them naturally in real-time.
4. **Premise 3 (Character Composition):** The approved references (`01`, `02`, `05`, `06`) present characters as physical inhabitants of an architectural scene, resting their weight on concrete plinths or standing on the floor plane.
5. **Premise 4 (Card Antipattern):** Enclosing cutouts in `<div className="border-2 border-zinc-800 ... overflow-hidden">` treats them as flat boxed pictures rather than spatial layers, clipping hands/feet and creating a generic e-commerce layout.
6. **Inference 2:** Removing the outer border and `overflow-hidden`, anchoring images with `bottom-0` (or `-bottom-4` for `03`'s 61px transparent margin) onto real concrete plinth layers, adding contact shadows, and setting `pointer-events-none` restores the authentic Digital Brutalism composition while eliminating mobile text collisions.

---

## 3. Caveats

1. **Asset Generation Execution:** As an Explorer agent adhering strictly to "Do NOT implement the changes yourself", I designed the generation prompts, fallback extraction scripts, and CSS specifications in `report.md`, but did not generate the binary image files or edit `projects.ts` or `PortfolioView.tsx`.
2. **Character 04 (`04_character_consultant_laptop.png`):** Discovered in `public/assets/characters/`, but confirmed via `design/originals/README.md` to be an alternate visual. None of the 7 approved references utilize `04`. It should remain preserved in the asset folder for potential future marketing needs.
3. **Mobile Screen Variations:** Mobile styling specifications are optimized for standard 390px (iPhone 12/13/14/15/16). On narrow viewports (360px), font sizes for headings must remain responsive (`text-4xl sm:text-5xl`).

---

## 4. Conclusion

1. Discrete project screenshots for `symi-ui.png`, `lamborghini-concept.png`, and `uberpokmi-ui.png` must be populated in `public/assets/projects/` as clean 1600x1000 (16:10) frontal UI previews, following the detailed prompt specifications in Section 3.3 of `report.md`.
2. `src/content/projects.ts` must be updated to reference `/assets/projects/{slug}.png` instead of `/assets/references/03-portfolio.png`.
3. `PortfolioView.tsx` must be updated to render `<Image src={project.image} ...>` with honest status badges overlaying the top-right corner.
4. All character cutout containers across Routes 01, 02, 05, and 06 must be unboxed: remove outer borders, remove `overflow-hidden`, anchor to concrete plinths, apply contact shadows, set `pointer-events-none`, and enforce proper mobile vertical stacking to ensure zero text overlaps at 390px.
5. Routes 03, 04, and 07 must strictly render zero character cutouts.

---

## 5. Verification Method

1. **Verify Report & Specifications:**
   - Inspect `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m1_3\report.md` to verify all prompt specifications, fallback scripts, and Tailwind CSS recipes are complete and self-contained.
2. **Verify Unit Test Baseline:**
   - Run `npm test` in `c:\Users\USER\Desktop\studio.syahmiaof.my` to confirm 14/14 unit tests pass:
     `✓ tests/unit/pricing.test.ts (8 tests)`
     `✓ tests/unit/inquiry.test.ts (6 tests)`
3. **Post-Implementation Verification (by downstream implementers):**
   - Confirm 3 files exist in `public/assets/projects/`: `symi-ui.png`, `lamborghini-concept.png`, `uberpokmi-ui.png`.
   - Confirm `npm test` passes without regression.
   - Run `npm run test:e2e` to capture fresh screenshots in `docs/qa/screenshots/` and inspect desktop (1440px) and mobile (390px) captures against `design/references/`.
