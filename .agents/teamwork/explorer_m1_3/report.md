# Project Assets & Character Positioning Specification Report

**Date:** 2026-10-25  
**Author:** Milestone 1 Explorer 3 (Project Assets & Character Positioning Specialist)  
**Target:** SYAHMIAOF STUDIO (`studio.syahmiaof.my`)  
**Scope:** `public/assets/projects/` discrete mockups & `public/assets/characters/` positioning specifications across all 7 routes  
**Status:** COMPLETE — Ready for Implementation Waves (M1/M2)

---

## 1. Executive Summary

This investigation resolves two critical visual fidelity deficits identified in the V1 baseline:
1. **Placeholder Project Assets:** `src/content/projects.ts` currently maps all three projects (`symi-ui`, `lamborghini-concept`, `uberpokmi-ui`) directly to the full portfolio page reference mockup (`/assets/references/03-portfolio.png`). Furthermore, `PortfolioView.tsx` neglects `project.image` entirely, rendering generic editorial placeholder text inside cards. `public/assets/projects/` is completely empty.
2. **"Trapped in a Card" Character Antipattern:** In the V1 baseline, characters were stuffed inside small boxed cards (`<div className="border-2 border-zinc-800 bg-surface ... overflow-hidden">`), creating an e-commerce thumbnail aesthetic with clipped limbs and awkward frames. In the approved reference mockups (`01-home.png`, `02-services.png`, `05-coaching.png`, `06-about.png`), characters are **unboxed, freestanding 2D alpha cutouts** physically integrated with 3D concrete plinths, colossal numerals, and architectural typography.

This report delivers concrete specifications, image generation parameters, fallback scripts, mathematical alpha bounds, and precise Tailwind CSS/z-index recipes for each route.

---

## 2. Specification Discovery Tables

### Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Assets | Discrete Project Screenshots | High-resolution UI screenshots for `symi-ui`, `lamborghini-concept`, `uberpokmi-ui` in `public/assets/projects/` | Generation prompts / source mockups | PNG files (1600x1000) | Missing file fallback in Next.js Image | `ORIGINAL_REQUEST.md` R3, `03-portfolio.png` |
| 2 | Content | `PROJECTS` Array Mapping | Update `src/content/projects.ts` `image` paths to valid discrete assets | Project ID, file paths | Valid static asset URLs | Fails visual QA if pointing to `03-portfolio.png` | `src/content/projects.ts` |
| 3 | Portfolio UI | Card Image Rendering | Render `<Image src={project.image} ...>` inside CSS 3D perspective cards | `ProjectItem.image` | Rendered 16:10 preview frame with status badge | Broken image icon if path invalid | `src/components/pages/PortfolioView.tsx` |
| 4 | Character | Home Seated Plinth Hero | Seated character (`07`) resting on concrete plinth in front of 3D "SYA" | `07_hero_seated_character.png` | Freestanding cutout at `bottom-0` on plinth | Head/feet clipped if put in `overflow-hidden` | `01-home.png` |
| 5 | Character | Services Builder Stance | Standing builder character (`02`) typing on laptop against cobalt wedge | `02_character_builder_laptop.png` | Right-anchored standing figure pointing left | Obscures cards if unstacked on mobile | `02-services.png` |
| 6 | Character | Coaching Concrete "05" Plinth | Seated creator character (`03`) perched on horizontal base of colossal "05" | `03_character_creator_laptop.png` | Figure seated inside/on numeral 0 ledge | Floats above plinth if bottom padding ignored | `05-coaching.png` |
| 7 | Character | About Dual-Asset Composition | Pointing character (`05`) + floating closed laptop (`06`) + thigh annotation | `05_...png`, `06_...png` | Character pointing at bio, laptop in air, label | Laptop overlays label if unanchored | `06-about.png` |
| 8 | Brand Safety | Protected Thigh Annotation | `KARAKTER VISUAL JENAMA` badge with leader line pointing to mascot's thigh | Text string, anchor coordinates | Monospace badge beside character's thigh | Legal risk if character mistaken for Syahmi | `ENGINEERING_BLUEPRINT_V1.md` §5.6 |
| 9 | Exclusion | No Character on 03, 04, 07 | Routes 03 (Portfolio), 04 (Pricing), 07 (Contact) have NO character cutouts | Route pathname | Zero character images rendered | Layout clutter if character added | References `03`, `04`, `07` |

### Edge Cases
| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Mobile Viewport (390px) | `HomeView.tsx` hero character | Character box pushed CTAs down 600px or overlapped headline when unconstrained. |
| 2 | Mobile Viewport (390px) | `ServicesView.tsx` standing builder | Character height (1536px) overwhelmed mobile screen, hiding packages. |
| 3 | Mobile Viewport (390px) | `CoachingView.tsx` 60m/90m selectors | Character box occupied entire screen, forcing duration chips below the fold. |
| 4 | Alpha Padding | `03_character_creator_laptop.png` bottom padding | Canvas has 61px of empty alpha at bottom; setting `bottom: 0` causes feet to float above plinth. |
| 5 | Alpha Padding | `06_laptop_closed_floating.png` margins | Canvas is 1254x1254, but laptop is only 840x831 (200px transparent border); container must be oversized. |
| 6 | Touch Interactivity | Full-body PNG cutouts over links/buttons | Large transparent bounds block touch/click events unless `pointer-events: none` is applied. |

---

## 3. Part 1: Strategy for Discrete Project Screenshots

### 3.1 Investigation of Current Assets & Mockups
In `design/references/03-portfolio.png`, three project prototypes are displayed inside a dramatic 3D perspective gallery:
1. **01 / SYMI**: High-Performance UI Component System for frozen yogurt brand ("SIMPLE YOGURT HAPPIER DAYS").
2. **02 / LAMBORGHINI [KONSEP TIDAK RASMI]**: High-performance landing page experiment for Italian supercar ("ENGINEERED EMOTION", "DRIVEN BY A HIGHER STANDARD").
3. **03 / UBERPOKMI [DEMO UI]**: Multi-service on-demand superapp prototype ("Your Everyday Ride, Food & More.").

### 3.2 Evaluation of Population Strategies

| Evaluation Metric | Option A: Direct Bounding Box Crop | Option B: Perspective Rectification Crop | Option C: High-Fidelity Discrete UI Generation (RECOMMENDED) | Option D: Headless HTML Playwright Capture |
|---|---|---|---|---|
| **Perspective Alignment** | ❌ Double-skewed (already tilted in 3D in source) | ⚠️ Distorted edges, warped typography | ✅ Perfectly flat (orthographic); CSS 3D handles perspective dynamically | ✅ Perfectly flat; CSS 3D handles perspective dynamically |
| **Occlusion** | ❌ Concrete blocks cut through bottom; phone covers UberPokmi | ❌ Inpainting creates muddy visual artifacts | ✅ 100% clean, unoccluded full interface layout | ✅ 100% clean, unoccluded full interface layout |
| **Resolution on Retina/4K** | ❌ Blurry (~500x350px extracted from 1672px mockup) | ❌ Blurry and pixelated | ✅ Razor-sharp 1600x1000px native | ✅ Razor-sharp 1600x1000px native |
| **Brutalist Integrity** | ❌ Nested badges (`01 / SYMI` inside card) | ⚠️ Inconsistent branding | ✅ Faithful replication of typography and color tokens | ✅ 100% faithful code-driven component rendering |

**Verdict**: **Option C (High-Fidelity Discrete UI Generation)** is the primary recommendation. Option D is an excellent programmatic alternative, and an automated Sharp script (Option A) serves as an emergency offline fallback.

---

### 3.3 Detailed Asset Specifications

#### Asset 1: `public/assets/projects/symi-ui.png`
* **Slug / ID**: `symi-ui`
* **Resolution**: 1600 × 1000 px (16:10 aspect ratio)
* **Background Color**: Midnight Navy `#0A1128` / `#0D1527`
* **Header / Window Bar**:
  - Dark slate window title bar (`#111A30`) with three window control dots (red `#FF5F56`, yellow `#FFBD2E`, green `#27C93F`) on left.
  - White bold brand wordmark: **SYMI**.
  - Nav links: `Home`, `Menu`, `About`, `Locations`.
  - Right controls: Search icon, pill CTA button `Order Now` (dark navy with white text).
* **Hero Content Layout (50/50 Split)**:
  - **Left Column**:
    - Headline: Condensed display font in pure white: **SIMPLE YOGURT HAPPIER DAYS**.
    - Tagline: `Premium frozen yogurt for a brighter you.` in soft white/grey (`#CBD5E1`).
    - Stamp Badge: Circular graphic stamp with text `GOOD YOGURT • BRIGHTER DAYS` and eight-point flower star icon in center.
    - CTA Button: Cream-white button `Explore Menu ->` (`#F8F9FA` background, `#0A1128` text).
  - **Right Column**:
    - Crisp high-key photograph of a white paper cup filled with swirled frozen yogurt, topped with granola crumbles and fresh sliced strawberries, labeled with bold black `SYMI` typography.
* **Generation Prompt Specification**:
  > "A pristine, ultra-clean digital web UI screenshot of a modern artisanal frozen yogurt brand website named 'SYMI'. Flat frontal viewport screenshot, 16:10 aspect ratio, dark midnight navy background (#0A1128). Dark header bar with Mac window control dots and white navigation links (Home, Menu, About, Locations) and a dark pill button 'Order Now'. Hero section features large bold condensed white typography saying 'SIMPLE YOGURT HAPPIER DAYS' and subtext 'Premium frozen yogurt for a brighter you.' with a circular stamp badge 'GOOD YOGURT BRIGHTER DAYS' and a light cream button 'Explore Menu'. Right side displays an artisanal cup of vanilla frozen yogurt with sliced fresh strawberries and crunchy granola crumbles. Ultra-high resolution, sharp vector typography, realistic UI mockup, no perspective tilt."

---

#### Asset 2: `public/assets/projects/lamborghini-concept.png`
* **Slug / ID**: `lamborghini-concept`
* **Resolution**: 1600 × 1000 px (16:10 aspect ratio)
* **Background Color**: Stealth Carbon / Obsidian Black (`#050505` to `#0D0D0D`)
* **Header / Window Bar**:
  - Dark carbon top bar with subtle window control dots.
  - Center/Left: Gold Lamborghini raging bull shield emblem.
  - Monospace uppercase nav links: `MODELS`, `HERITAGE`, `TECHNOLOGY`, `NEWS`.
  - Right: Minimalist triple-line hamburger menu icon.
* **Hero Content Layout**:
  - **Center / Upper**:
    - Monumental architectural display typography in white: **LAMBORGHINI**.
    - Subtitle in refined geometric uppercase tracking: `ENGINEERED EMOTION`.
  - **Center / Visual**:
    - Cinematic, high-contrast photograph of a matte black Lamborghini supercar (low slung, angular geometry) positioned front-three-quarter view on rain-drenched reflective asphalt.
    - Aggressive glowing LED daytime running lights (Y-shaped headlights) casting reflections across the wet tarmac.
  - **Bottom Left**:
    - High-contrast industrial caption in condensed uppercase: `DRIVEN BY A HIGHER STANDARD`.
* **Generation Prompt Specification**:
  > "A cinematic digital web UI screenshot for an unofficial luxury supercar landing page named 'LAMBORGHINI'. Flat frontal viewport screenshot, 16:10 aspect ratio, deep obsidian black and dark carbon background (#080808). Dark browser header bar with gold Lamborghini bull shield logo and sleek uppercase navigation links (MODELS, HERITAGE, TECHNOLOGY, NEWS). Center hero features monumental white architectural typography 'LAMBORGHINI' with sub-headline 'ENGINEERED EMOTION'. Below is a cinematic photograph of a menacing matte-black Lamborghini supercar on wet rain-slicked asphalt at night with glowing sharp LED headlights reflecting on the puddle-strewn ground. Bottom corner displays bold condensed caption 'DRIVEN BY A HIGHER STANDARD'. High-contrast digital brutalist aesthetic, ultra-sharp."

---

#### Asset 3: `public/assets/projects/uberpokmi-ui.png`
* **Slug / ID**: `uberpokmi-ui`
* **Resolution**: 1600 × 1000 px (16:10 aspect ratio)
* **Background Color**: Vibrant Electric Cobalt Blue (`#103BFF`) & Industrial Yellow (`#F3FF00`)
* **Header / Window Bar**:
  - Window control dots (orange/yellow/green).
  - Yellow brutalist block icon with bold wordmark: **UberPokmi**.
  - Nav links: `Home`, `Ride`, `Food`, `More`.
  - Right controls: Search icon, bright yellow button `Get App`.
* **Hero Content Layout**:
  - **Left Section**:
    - Massive bold white display typography: **Your Everyday Ride, Food & More.**
    - Bilingual sub-heading in Bahasa Melayu: `Satu aplikasi, lebih banyak kemungkinan.`
    - App Store Badges: Black rounded rectangles with Apple App Store and Google Play logos.
  - **Center Section**:
    - Modern dark metallic SUV ride-hailing vehicle rendered on a vibrant yellow angular geometric brutalist plinth.
  - **Right Section (Mobile App Overlay)**:
    - Floating smartphone mockup showcasing the mobile app UI:
      - Search bar: `Where to?` with location pin icon.
      - 4 Service tiles in a 4-column row: Ride (car icon), Food (burger icon), Mart (bag icon), More (dots icon).
      - Card component: "Nasi Lemak Special" with thumbnail, rating `★ 4.9`, and price `RM 12.50`.
* **Generation Prompt Specification**:
  > "A vibrant digital web UI screenshot for an on-demand ride-hailing and food delivery superapp prototype named 'UberPokmi'. Flat frontal viewport screenshot, 16:10 aspect ratio. Bold electric cobalt blue background (#103BFF) with acid yellow accents. Header features yellow UberPokmi logo and nav links (Home, Ride, Food, More) with 'Get App' button. Hero section features massive bold white headline 'Your Everyday Ride, Food & More.' and subtitle 'Satu aplikasi, lebih banyak kemungkinan.' with Apple and Google Play download badges. Center shows a sleek black SUV car on a yellow geometric shape. Right side displays a crisp smartphone mobile app interface showing 'Where to?' search bar, four service icons (Ride, Food, Mart, More), and a featured food delivery card for 'Nasi Lemak Special (4.9 rating)'. High contrast, clean vector digital brutalism."

---

### 3.4 Fallback: Automated Crop & Rectification Script
If offline build environments cannot access external generation tools, implement the following Node.js `sharp` script to extract discrete assets directly from `design/references/03-portfolio.png`:

```javascript
// scripts/extract-project-mockups.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'projects');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const sourcePath = path.join(__dirname, '..', 'design', 'references', '03-portfolio.png');

async function extractMockups() {
  console.log('Extracting project mockups from 03-portfolio.png...');

  // 1. SYMI UI (Center-Top Browser)
  await sharp(sourcePath)
    .extract({ left: 710, top: 110, width: 620, height: 490 })
    .resize(1600, 1000, { fit: 'cover', position: 'top' })
    .toFile(path.join(targetDir, 'symi-ui.png'));

  // 2. LAMBORGHINI CONCEPT (Bottom-Left Browser)
  await sharp(sourcePath)
    .extract({ left: 350, top: 540, width: 440, height: 320 })
    .resize(1600, 1000, { fit: 'cover', position: 'center' })
    .toFile(path.join(targetDir, 'lamborghini-concept.png'));

  // 3. UBERPOKMI UI (Bottom-Right Composite)
  await sharp(sourcePath)
    .extract({ left: 1240, top: 430, width: 420, height: 420 })
    .resize(1600, 1000, { fit: 'cover', position: 'top' })
    .toFile(path.join(targetDir, 'uberpokmi-ui.png'));

  console.log('Extracted 3 mockups to public/assets/projects/');
}

extractMockups().catch(console.error);
```

---

### 3.5 Codebase Updates for Implementation Wave

#### File: `src/content/projects.ts`
Update the `image` property on lines 21, 44, and 67:
```typescript
// src/content/projects.ts
export const PROJECTS: ProjectItem[] = [
  {
    id: "symi-ui",
    // ...
    image: "/assets/projects/symi-ui.png", // Replaces /assets/references/03-portfolio.png
  },
  {
    id: "lamborghini-concept",
    // ...
    image: "/assets/projects/lamborghini-concept.png", // Replaces /assets/references/03-portfolio.png
  },
  {
    id: "uberpokmi-ui",
    // ...
    image: "/assets/projects/uberpokmi-ui.png", // Replaces /assets/references/03-portfolio.png
  },
];
```

#### File: `src/components/pages/PortfolioView.tsx`
Replace lines 79-102 with the real project image renderer:
```tsx
{/* Visual Top Preview Frame with Real Image Asset */}
<div className="relative aspect-[16/10] bg-zinc-950 border-b border-zinc-800 overflow-hidden group">
  <Image
    src={project.image}
    alt={project.title}
    width={1600}
    height={1000}
    priority={idx === 0}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
  {/* Honest Status Badge Overlay */}
  <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono font-bold bg-ink/90 border border-zinc-700 text-acid uppercase tracking-wider shadow-md backdrop-blur-sm">
    {locale === "en" ? project.statusEn : project.status}
  </div>
  {/* Project Counter Tab */}
  <div className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono text-zinc-300 bg-ink/80 border border-zinc-800">
    PRJ_0{idx + 1}
  </div>
</div>
```

---

## 4. Part 2: Character Cutouts Inspection & Natural Positioning

### 4.1 Character Alpha & Bounding Box Inspection

Using Node.js and `sharp` on the RGBA channels of `public/assets/characters/`, the exact content bounds and alpha padding were measured:

| Asset Filename | Canvas Size | Content Bounding Box | Content Dimensions | Aspect Ratio | Alpha Padding (T, B, L, R) | Critical Anchor Insight |
|---|---|---|---|---|---|---|
| `07_hero_seated_character.png` | 1200 × 1310 | x=77..1107, y=11..1309 | 1031 × 1299 | 0.794 (~4:5) | T: 11px, **B: 0px**, L: 77px, R: 92px | Bottom touches edge! `bottom-0` anchors boots perfectly to plinth. |
| `02_character_builder_laptop.png` | 1024 × 1536 | x=180..910, y=32..1505 | 731 × 1474 | 0.496 (~1:2) | T: 32px, B: 30px, L: 180px, R: 113px | Very tall and narrow. Lower body belongs against architecture. |
| `03_character_creator_laptop.png` | 1024 × 1536 | x=56..963, y=67..1474 | 908 × 1408 | 0.645 (~2:3) | T: 67px, **B: 61px**, L: 56px, R: 60px | **61px bottom padding**. Requires `-bottom-4` to sit soles flush on floor. |
| `05_character_pointing_throw.png` | 1116 × 1410 | x=12..1115, y=104..1409 | 1104 × 1306 | 0.845 (~5:6) | T: 104px, **B: 0px**, L: 12px, **R: 0px** | Bottom & right edge reach canvas boundary. |
| `06_laptop_closed_floating.png` | 1254 × 1254 | x=202..1041, y=219..1049 | 840 × 831 | 1.011 (1:1) | **T: 219, B: 204, L: 202, R: 212** | ~200px transparent padding all around. Laptop is only ~67% of frame. |
| `04_character_consultant_laptop.png` | 1024 × 1536 | x=261..747, y=30..1504 | 487 × 1475 | 0.330 (~1:3) | T: 30, B: 31, L: 261, R: 276 | Alternate asset (not used in primary approved 7 routes). |

---

### 4.2 Principles of Unboxed Digital Brutalism Positioning

1. **Eliminate Boxed Card Frames**:
   - ❌ Never wrap characters in `border-2 border-zinc-800 bg-surface ... overflow-hidden rounded-*`.
   - ✅ Freestanding alpha cutout positioned directly in the spatial container.
2. **True Architectural Anchor**:
   - The character must sit or stand upon a physical brutalist plinth (concrete texture or CSS stepped block).
   - Use `bottom-0` (or negative offset for alpha margins) so the feet or pelvic seat touch the concrete surface.
3. **Contact Shadows & Ambient Occlusion**:
   - Layer 1: CSS drop shadow on image: `filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]`.
   - Layer 2: Ambient contact shadow pill under the contact point: `<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/80 blur-xl rounded-full -z-10" />`.
4. **Touch & Click Safety (`pointer-events-none`)**:
   - Character cutouts have large transparent bounds that must NEVER intercept clicks or touch taps meant for buttons, links, or form controls.
   - Apply `pointer-events-none select-none` to all character wrapper containers.
5. **Layering Architecture (Z-Index Rules)**:
   - `z-0`: Background grids, texture overlays, angled cobalt/acid geometric blocks.
   - `z-10`: Concrete plinths, hazard stripe blocks, monumental 3D numerals ("04", "05", "07", "SYA").
   - `z-20`: Freestanding Character Cutouts (`07`, `02`, `03`, `05`).
   - `z-30`: Floating companion objects (`06_laptop_closed_floating.png`), leader lines, protected brand annotation (`KARAKTER VISUAL JENAMA`).
   - `z-40`: Interactive UI controls (Form inputs, CTA buttons, Duration pins, Option cards).
   - `z-50`: Fixed Header, Navigation menus, Language switchers.

---

### 4.3 Route-by-Route Layout & CSS Specifications

#### Route 01: Home (`/` & `/en`)
* **Reference**: `01-home.png`
* **Character**: `07_hero_seated_character.png` (1200 × 1310)
* **Scene Architecture**: Seated techwear figure resting upon a stepped concrete terrace in front of giant 3D concrete "SYA" letters and acid yellow directional arrow.
* **Anchor Point**: Pelvic base on upper step, boots resting on lower step (`bottom-0`).
* **Desktop CSS Specification (>= 1024px)**:
  ```tsx
  {/* Right Column: Hero Freestanding Character & Concrete Plinth Stage */}
  <div className="lg:col-span-5 relative h-[640px] lg:h-[720px] flex items-end justify-center pointer-events-none select-none">
    {/* Concrete Architectural Plinth Base */}
    <div className="absolute bottom-0 right-0 w-[520px] lg:w-[620px] h-[160px] bg-zinc-800/90 border-t-4 border-l-4 border-zinc-700 shadow-2xl z-10 flex flex-col justify-end p-4">
      {/* Hazard Yellow Stripe Accent */}
      <div className="w-full h-3 bg-[repeating-linear-gradient(45deg,#f3ff00,#f3ff00_12px,#09090b_12px,#09090b_24px)] opacity-90 mb-2" />
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
        <span>ARCHITECTURAL CONCRETE PLINTH</span>
        <span className="text-acid font-bold">POS: 01_HERO_SURFACE</span>
      </div>
    </div>

    {/* Seated Freestanding Character */}
    <div className="relative w-full max-w-[560px] lg:max-w-[660px] h-full flex items-end justify-center z-20">
      <Image
        src="/assets/characters/07_hero_seated_character.png"
        alt="SYAHMIAOF Studio Visual Brand Mascot - Seated Techwear Character"
        width={1200}
        height={1310}
        priority
        className="w-full h-auto object-contain max-h-[96%] filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
      />
      {/* Contact Shadow on Concrete Step */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/90 blur-xl rounded-full -z-10" />
    </div>
  </div>
  ```
* **Mobile CSS Specification (390px)**:
  - Vertical stack order:
    1. Headline block: `WEB YANG BUKAN BIASA.` (font size `text-4xl sm:text-5xl`).
    2. Subtitle paragraph and CTAs (`Lihat Portfolio`, `Mulakan Projek`).
    3. Character Stage: Positioned immediately below CTAs, resting on compact plinth:
       ```tsx
       <div className="w-full max-w-[340px] h-[360px] mx-auto relative flex items-end justify-center z-20 mt-6 pointer-events-none select-none">
         <Image
           src="/assets/characters/07_hero_seated_character.png"
           alt="Mascot Seated"
           width={1200}
           height={1310}
           priority
           className="w-full h-auto object-contain max-h-[95%] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
         />
       </div>
       ```
    4. Technical ticker bar placed beneath character stage.
  - Guarantees zero text collision and zero horizontal scroll overflow.

---

#### Route 02: Services (`/servis` & `/en/servis`)
* **Reference**: `02-services.png`
* **Character**: `02_character_builder_laptop.png` (1024 × 1536)
* **Scene Architecture**: Standing builder typing on laptop, angled left towards the service packages (`01 / WEBSITE FRONTEND` and `02 / SISTEM FULL-STACK`), standing beside cobalt blue architectural slashes and yellow arrow.
* **Anchor Point**: Feet grounded at `bottom-0` on concrete base.
* **Desktop CSS Specification (>= 1024px)**:
  ```tsx
  {/* Right Column: Standing Builder Composition */}
  <div className="lg:col-span-5 relative h-[720px] flex items-end justify-end pointer-events-none select-none z-20">
    {/* Cobalt Blue Architectural Wedge Layer */}
    <div className="absolute top-12 right-6 w-80 h-[560px] bg-cobalt -skew-x-6 border-r-4 border-acid shadow-2xl opacity-90 -z-10" />
    
    {/* Standing Character */}
    <div className="relative w-full max-w-[500px] h-full flex items-end justify-center">
      <Image
        src="/assets/characters/02_character_builder_laptop.png"
        alt="SYAHMIAOF Studio Standing Builder Character"
        width={1024}
        height={1536}
        priority
        className="w-auto h-full max-h-[700px] object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
      />
    </div>
  </div>
  ```
* **Mobile CSS Specification (390px)**:
  - Both service cards (`01 / WEBSITE FRONTEND` and `02 / SISTEM FULL-STACK`) are high-conversion touch targets.
  - Desktop standing character is hidden on small mobile (`hidden lg:flex`) to prevent scrolling fatigue, or rendered as an ambient background architectural watermark:
    `<div className="lg:hidden absolute top-24 right-0 w-44 h-auto opacity-20 -z-10 pointer-events-none select-none"><Image src="/assets/characters/02_character_builder_laptop.png" ... /></div>`

---

#### Route 03: Portfolio (`/portfolio` & `/en/portfolio`)
* **Reference**: `03-portfolio.png`
* **Character**: **NONE**.
* **Specification**: Strictly preserve clean architectural 3D gallery space without any character cutouts.

---

#### Route 04: Pricing Studio (`/harga` & `/en/harga`)
* **Reference**: `04-pricing.png`
* **Character**: **NONE**.
* **Specification**: Strictly preserve monumental 3D concrete "04" and industrial hardware console configurator without any character cutouts.

---

#### Route 05: Coaching (`/coaching` & `/en/coaching`)
* **Reference**: `05-coaching.png`
* **Character**: `03_character_creator_laptop.png` (1024 × 1536)
* **Scene Architecture**: Seated creator character typing on laptop, resting directly on the horizontal concrete ledge of a colossal cobalt blue "05" plinth sculpture.
* **Anchor Point**: Pelvic base on numeral 0 base ledge. Due to 61px transparent alpha at bottom of cutout, apply `-bottom-4` or `-mb-4` so boots align with floor plane.
* **Desktop CSS Specification (>= 1024px)**:
  ```tsx
  {/* Right Column: Colossal Cobalt 05 Plinth with Seated Creator */}
  <div className="lg:col-span-7 relative h-[680px] lg:h-[740px] flex items-end justify-center pointer-events-none select-none z-20">
    {/* Colossal 3D Concrete Numeral 05 Plinth in Background */}
    <div className="absolute inset-0 flex items-center justify-end -z-10 pr-6 select-none">
      <div className="font-display font-black text-[240px] lg:text-[320px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-concrete via-zinc-400 to-zinc-700 tracking-tighter drop-shadow-2xl">
        05
      </div>
      {/* Cobalt Inset Accent */}
      <div className="absolute right-12 top-1/4 w-72 h-72 bg-cobalt/30 rounded-full blur-3xl -z-20" />
    </div>

    {/* Seated Mentor Character */}
    <div className="relative w-full max-w-[540px] lg:max-w-[620px] h-full flex items-end justify-center">
      <Image
        src="/assets/characters/03_character_creator_laptop.png"
        alt="SYAHMIAOF Coaching Mentor Character Seated on Concrete 05 Plinth"
        width={1024}
        height={1536}
        priority
        className="w-full h-auto object-contain max-h-[94%] -mb-4 filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
      />
      {/* Contact Shadow under Character Base */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/90 blur-xl rounded-full -z-10" />
    </div>
  </div>
  ```
* **Mobile CSS Specification (390px)**:
  - Topic selector (Asas Web, React/Next.js, Mentor Projek) and duration pins (60m, 90m) must be accessible above the fold.
  - Character is rendered as a compact stage below the headline:
    `w-full max-w-[280px] h-[280px] mx-auto relative flex items-end justify-center z-10 mb-6`
  - Interactive configurator follows directly below with large touch targets (`min-h-[48px]`).

---

#### Route 06: About Me (`/tentang` & `/en/tentang`)
* **Reference**: `06-about.png`
* **Character**: `05_character_pointing_throw.png` (1116 × 1410)
* **Companion Asset**: `06_laptop_closed_floating.png` (1254 × 1254)
* **Protected Annotation**: `KARAKTER VISUAL JENAMA`
* **Scene Architecture**: Character standing foreground, right arm pointing left at bio credentials, left arm raised with open palm gesturing up towards the floating closed laptop. Protected brand annotation anchored to his thigh.
* **Anchor Points**:
  - Feet at `bottom-0`.
  - Floating laptop hovering at `top-4 right-10 lg:right-16` above his left palm.
  - Thigh label anchored at `bottom-28 right-2 lg:-right-4`.
* **Desktop CSS Specification (>= 1024px)**:
  ```tsx
  {/* Right Column: Dual-Asset Composition & Thigh Annotation */}
  <div className="lg:col-span-5 relative h-[720px] lg:h-[760px] flex items-end justify-center pointer-events-none select-none z-20">
    {/* 1. Suspended Floating Tossed Closed Laptop */}
    <div className="absolute top-4 right-8 lg:right-14 w-44 lg:w-52 aspect-square z-30 animate-pulse duration-1000">
      <Image
        src="/assets/characters/06_laptop_closed_floating.png"
        alt="Floating Closed Laptop Asset"
        width={1254}
        height={1254}
        className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] -rotate-12 transition-transform duration-500 hover:rotate-0"
      />
    </div>

    {/* 2. Standing Pointing/Throw Character */}
    <div className="relative w-full max-w-[540px] lg:max-w-[620px] h-full flex items-end justify-center z-20">
      <Image
        src="/assets/characters/05_character_pointing_throw.png"
        alt="SYAHMIAOF Brand Mascot Character - Pointing Throw Pose"
        width={1116}
        height={1410}
        priority
        className="w-full h-auto object-contain max-h-[96%] filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
      />

      {/* 3. Protected Brand Mascot Annotation beside Thigh */}
      <div className="absolute bottom-28 right-0 lg:-right-6 flex items-center gap-2 pointer-events-auto select-none z-30">
        <div className="w-10 h-[1.5px] bg-acid shadow-[0_0_8px_#f3ff00]" />
        <div className="w-2 h-2 bg-acid rounded-full shadow-[0_0_8px_#f3ff00]" />
        <span className="px-2.5 py-1 bg-ink/95 border border-zinc-700 text-[10px] font-mono font-bold text-acid uppercase tracking-wider shadow-2xl backdrop-blur-sm">
          KARAKTER VISUAL JENAMA
        </span>
      </div>

      {/* Contact Shadow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/90 blur-xl rounded-full -z-10" />
    </div>
  </div>
  ```
* **Mobile CSS Specification (390px)**:
  - Biography and credential cards (TVETMARA, Freelance, DFK INC) take precedence at top.
  - Character composition is stacked cleanly below:
    - Wrapper: `w-full max-w-[320px] h-[360px] mx-auto relative flex items-end justify-center z-20 mt-6`
    - Floating laptop scaled to: `w-24 h-24 absolute top-2 right-4`
    - Thigh label scaled to: `bottom-16 right-2 text-[8px] px-1.5 py-0.5`
  - Action buttons (`Lihat Portfolio`, `Bincang Projek`) remain unobstructed.

---

#### Route 07: Contact (`/hubungi` & `/en/hubungi`)
* **Reference**: `07-contact.png`
* **Character**: **NONE**.
* **Specification**: Strictly preserve colossal 3D concrete "07", curved yellow brutalist arrow, and industrial terminal console without any character cutouts.

---

## 5. Comprehensive Responsive Matrix

| Route | Viewport: Mobile (390px) | Viewport: Tablet (768px) | Viewport: Desktop (1440px) | Z-Index Layering |
|---|---|---|---|---|
| **01 — Home** | Stacked below CTAs, `max-w-[340px] h-[360px]`, seated on compact plinth | 2-col, `max-w-[440px] h-[480px]`, on plinth | `max-w-[660px] h-[720px]`, full concrete plinth stage | Cutout: `z-20`, Plinth: `z-10`, SYA: `z-0` |
| **02 — Services** | Ambient background watermark (`opacity-20 w-44`) or hidden | 2-col, `max-w-[360px] h-[520px]` | `max-w-[500px] h-[720px]`, standing against cobalt wedge | Cutout: `z-20`, Cobalt Wedge: `z-10`, BG: `z-0` |
| **03 — Portfolio** | Single-column swipe/stacked cards | 2-column grid | 3-card 3D perspective gallery (`rotateY`, `rotateX`) | Cards: `z-20`, 3D Plinths: `z-10` |
| **04 — Pricing** | Vertical stack: 04 header, terminal console | 2-col layout | 2-col: Monumental 04 left, Terminal console right | Console: `z-20`, 04: `z-10` |
| **05 — Coaching** | Compact character `max-w-[280px] h-[280px]`, controls below | 2-col, `max-w-[420px] h-[520px]` | `max-w-[620px] h-[740px]`, seated on colossal 05 | Cutout: `z-20`, Numeral 05: `z-10` |
| **06 — About** | Stacked: bio top, character `max-w-[320px] h-[360px]`, laptop `w-24` | 2-col, `max-w-[420px] h-[560px]`, laptop `w-32` | `max-w-[620px] h-[760px]`, laptop `w-48`, thigh label | Laptop: `z-30`, Cutout: `z-20`, Plinth: `z-10` |
| **07 — Contact** | Stacked: headline, WhatsApp CTA, terminal form | 2-col layout | 2-col: Headline + Arrow left, Terminal console right | Form: `z-20`, Curved Arrow: `z-15`, 07: `z-10` |

---

## 6. Implementation Action Plan & Ownership Handoff

| Action Item | Target File(s) | Owner Agent | Milestone | Verification Method |
|---|---|---|---|---|
| 1. Generate / Extract discrete screenshots | `public/assets/projects/{symi-ui,lamborghini-concept,uberpokmi-ui}.png` | M1 Implementer / Panglima | M1 | Verify 3 files exist and are > 100KB PNGs with 16:10 ratio |
| 2. Update project metadata | `src/content/projects.ts` | M1 Implementer / Panglima | M1 | `npm test` passes, `image` references valid files |
| 3. Unbox Home Hero character | `src/components/pages/HomeView.tsx` | Wira (Home Owner) | M2 | Visual QA screenshot matches `01-home.png` unboxed plinth |
| 4. Unbox Services Builder character | `src/components/pages/ServicesView.tsx` | Wira (Services Owner) | M2 | Visual QA screenshot matches `02-services.png` cobalt composition |
| 5. Reconstruct 3D Portfolio Gallery | `src/components/pages/PortfolioView.tsx` | Panglima (Portfolio Owner) | M2 | Project images rendered inside 3D cards, badges honest |
| 6. Unbox Coaching Seated character | `src/components/pages/CoachingView.tsx` | Cendekia (Coaching Owner) | M2 | Character sits naturally on concrete 05 plinth |
| 7. Unbox About Dual-Asset & Thigh Label | `src/components/pages/AboutView.tsx` | Cendekia (About Owner) | M2 | Laptop floats in air, `KARAKTER VISUAL JENAMA` beside thigh |
| 8. Verify Mobile 390px QA | All 7 Views | Bentara / Mata | M3 | Playwright mobile audit passes with zero horizontal overflow |
