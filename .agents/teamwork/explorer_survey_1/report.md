# SYAHMIAOF STUDIO — VISUAL & REFERENCE SPECIFICATION SURVEY REPORT

**Surveyor:** Survey Spec Miner 1 (Visual & Reference Spec Investigator)  
**Date:** 2026-10-25  
**Integrity Mode:** Development (Read-Only Analysis)  
**Authoritative Sources:**
- `design/references/` (01-home.png ... 07-contact.png)
- `public/assets/characters/` (02_character_builder_laptop.png ... 07_hero_seated_character.png)
- `design/originals/ENGINEERING_BLUEPRINT_V1.md` & `design/originals/README.md`
- `ORIGINAL_REQUEST.md`
- Shipped code in `src/` and captured test run screenshots in `docs/qa/screenshots/`

---

## 1. Executive Summary

This survey provides an exhaustive audit of all 7 reference mockups, character assets, current codebase implementations, and visual discrepancies across SYAHMIAOF STUDIO (`studio.syahmiaof.my`).

### Primary Finding
The current codebase functions correctly on business logic (Vitest passes 14/14 unit tests, pricing arithmetic is intact), but exhibits a **severe visual fidelity gap** against the approved reference mockups:
1. **Generic Container UI vs Architectural Brutalism:** Current page views render standard dark-mode SaaS layouts with small nested cards (`bg-surface`, `bg-grid-pattern`), whereas the approved references are dramatic, edge-to-edge architectural environments featuring colossal 3D concrete sculptures, extruded numerals (`04`, `05`, `07`), giant 3D typography ("SYA"), directional hazard chevrons, and physical plinths.
2. **Character Cutout Integration:** Characters are currently trapped inside small rectangular portrait cards with arbitrary borders, rather than standing or sitting directly on monumental concrete architectural plinths integrated with the scene.
3. **Mismatched Headlines & Annotations:** Several route titles in `src/i18n/` deviate from the approved headlines (e.g., Services currently says "PERKHIDMATAN WEB & SISTEM" instead of "BINA IDEA. LANCAR WEB."; Pricing currently says "PRICING STUDIO" instead of "BINA IKUT BAJET.").
4. **Missing Discrete Project Assets:** `public/assets/projects/` is completely empty (0 files). The 3 featured projects (SYMI, Lamborghini Concept, UberPokmi UI) currently point to the static reference screenshot rather than standalone asset layers.

---

## 2. Design References Survey (`design/references/`)

All 7 reference mockups were programmatically inspected for dimensions, color types, aspect ratios, and visual composition.

| File | Resolution | Aspect Ratio | Color Type | File Size | Core Brutalist & Architectural Composition |
|---|---|---|---|---|---|
| `01-home.png` | 1672 x 941 px | 16:9 (1.777) | RGB (24-bit, No Alpha) | 2.18 MB | Colossal 3D angled concrete "SYA" typography, cobalt blue spray slash, seated techwear hero on concrete plinth, industrial metal plaque "IDEA CODE EXPERIENCE", yellow hazard chevron, bottom-left scroll chevron indicator pointing to "01 / SERVIS". |
| `02-services.png` | 1672 x 941 px | 16:9 (1.777) | RGB (24-bit, No Alpha) | 2.22 MB | Standing builder character with laptop on the right, layered concrete and electric cobalt geometric slabs, two side-by-side brutalist cards (Website Frontend RM645 & Sistem Full-Stack RM3,250), yellow directional chevrons. |
| `03-portfolio.png` | 1672 x 941 px | 16:9 (1.777) | RGB (24-bit, No Alpha) | 2.24 MB | Dramatic CSS 3D perspective gallery showing 3 rotated floating viewport cards (01/SYMI, 02/LAMBORGHINI with "KONSEP TIDAK RASMI", 03/UBERPOKMI with "DEMO UI"), stepped concrete plinths, cobalt spray, bottom slider bar with "01 / 03" and `< >` buttons. |
| `04-pricing.png` | 1672 x 941 px | 16:9 (1.777) | RGB (24-bit, No Alpha) | 2.20 MB | Monumental 3D concrete extruded numeral "04", giant bright acid yellow directional arrow pointing diagonally up-right into a massive hardware terminal console "KIRA HARGA WEBSITE", 3 horizontal package selector cards, add-on toggles, dynamic live total RM2,145, custom full-stack banner Dari RM3,250. |
| `05-coaching.png` | 1672 x 941 px | 16:9 (1.777) | RGB (24-bit, No Alpha) | 2.50 MB | Colossal 3D concrete architectural numeral "05" with diagonal yellow hazard stripes, intense cobalt blue grid backdrop, seated creator character typing on laptop on concrete plinth, left terminal console with 3 topic options, 2 duration buttons (60m/90m), "Tanya Slot Coaching" CTA. |
| `06-about.png` | 1672 x 941 px | 16:9 (1.777) | RGB (24-bit, No Alpha) | 2.22 MB | Headline with high-contrast acid yellow solid banner for "SYAHMI" ("SAYA [SYAHMI] AOF."), dual-asset composition (pointing character + floating closed laptop), precision technical leader line pointing to thigh: "KARAKTER VISUAL JENAMA", 3 credential cards, 4 skill pills. |
| `07-contact.png` | 1671 x 941 px | ~16:9 (1.776) | RGB (24-bit, No Alpha) | 1.96 MB | Colossal 3D concrete numeral "07" in background with blue rim lighting, reflective wet concrete floor, sweeping bright yellow brutalist curved arrow, left WhatsApp button, right industrial terminal console "MULA PROJEK ANDA" with 4 structured fields, clean bottom footer bar. |

### Color Palette Extracted from References
- **Ink / Void Black:** `#09090B` (Surfaces, terminal bodies, deep shadows)
- **Acid Yellow:** `#F3FF00` (High-contrast CTAs, emphasis words, directional arrows, active indicators)
- **Electric Cobalt Blue:** `#103BFF` (3D architectural blocks, background planes, full-stack accents)
- **Cast Concrete Light:** `#EEEDE8` (Highlight concrete surfaces, body typography)
- **Cast Concrete Shadow:** `#1A1A1E` / `#27272A` (Concrete recesses, bevels, grid lines)
- **Pure White:** `#FFFFFF` (Primary headlines, crisp borders)

---

## 3. Character Assets Survey (`public/assets/characters/`)

All character cutouts are pre-extracted transparent PNGs (RGBA) located in `public/assets/characters/`.

| Asset Filename | Resolution | Color Type / Alpha | Size | Pose & Visual Details | Route Assignment | Status & Notes |
|---|---|---|---|---|---|---|
| `07_hero_seated_character.png` | 1200 x 1310 px | RGBA (Alpha: True) | 1.25 MB | Seated low-angle pose, leaning back slightly on concrete blocks, hands resting on knees/lap, looking up and right through angular sunglasses. Black technical windbreaker, black utility cargo pants with straps, rugged black trainers. | Route 01: Home (`/`) | Verified transparent cutout; needs concrete plinth contact shadow. |
| `02_character_builder_laptop.png` | 1024 x 1536 px | RGBA (Alpha: True) | 1.52 MB | Full-height standing builder, holding open black laptop in both hands, typing with fingers, head tilted downward toward screen. Sunglasses, black hooded windbreaker, black cargo pants, chunky black sneakers. | Route 02: Services (`/servis`) | Verified transparent cutout; stands tall on right side. |
| `03_character_creator_laptop.png` | 1024 x 1536 px | RGBA (Alpha: True) | 2.12 MB | Seated creator pose: seated upright on concrete cube block, open laptop on thighs, typing on keyboard, looking down at screen through sunglasses, black hoodie windbreaker, cargo pants. | Route 05: Coaching (`/coaching`) | Verified transparent cutout; character includes the cube block he is seated on. |
| `05_character_pointing_throw.png` | 1116 x 1410 px | RGBA (Alpha: True) | 1.29 MB | Standing pose, torso angled, right hand pointing index finger to the left (toward credentials/headline), left arm raised and tossed upward to the right with open palm, head turned slightly right, sunglasses. | Route 06: About (`/tentang`) | Verified transparent cutout; primary half of About Me dual-asset composition. |
| `06_laptop_closed_floating.png` | 1254 x 1254 px | RGBA (Alpha: True) | 0.63 MB | Closed sleek modern black laptop, oriented diagonally (~45 degree tilt), floating in isolation with crisp edges. | Route 06: About (`/tentang`) | Verified transparent cutout; secondary half of About Me dual-asset composition (floats above left palm). |
| `04_character_consultant_laptop.png` | 1024 x 1536 px | RGBA (Alpha: True) | 1.40 MB | Standing pose, holding closed black laptop tucked under right arm / against chest, left hand in pocket, looking forward/up with sunglasses. | Alternate / Standby Asset | Reserved for custom consultation or secondary service view. |

---

## 4. Route-by-Route Authoritative Specification

### 4.1 Route 01 — Home (`/` & `/en`)
- **Approved Headline:**
  - Category Tag: `[ PEMBANGUNAN WEBSITE ]   [ COACHING 1:1 ]` (Monospace, Acid Yellow `#F3FF00`)
  - Headline Line 1: `WEB YANG` (Giant Ultra-Bold Condensed White `#FFFFFF`)
  - Headline Line 2: `BUKAN BIASA.` (Giant Ultra-Bold Condensed Acid Yellow `#F3FF00`)
  - Subhead: "Saya bina pengalaman digital yang hidup — pantas, interaktif dan berimpak."
- **Action CTAs:**
  - Primary CTA: Solid Acid Yellow button `Lihat Portfolio  →` (sharp 90° corners, black bold text, right arrow)
  - Secondary CTA: Transparent button with 2px solid white border `Mulakan Projek  →`
- **Architectural 3D & Scene Elements:**
  - Giant 3D concrete angled "SYA" architectural letters towering in background.
  - Cobalt blue spray paint streak (`#103BFF`) slashing across the "Y" and "A".
  - Acid yellow angled chevron/hazard stripe behind the "S".
  - Industrial metal plaque on upper right: Embossed text `IDEA / CODE / EXPERIENCE` with `SYAHMIAOF` and `+` crosshair below.
  - Lower right: Giant bright acid yellow directional arrow pointing diagonally up-right and down-left.
  - Lower left: Concrete cubes with window cutout framing sunny blue sky, human silhouette, and warm interior light.
  - Downward scroll indicator on bottom left: Thin vertical line with down arrow `↓` pointing to `01 / SERVIS`.
  - Next section preview at bottom edge: Concrete bar with `01` line `SERVIS`.
- **Character Asset:**
  - `07_hero_seated_character.png` anchored on concrete steps/plinths in center-right foreground.

### 4.2 Route 02 — Services (`/servis` & `/en/servis`)
- **Approved Headline:**
  - Category Badge: `[ 02 / SERVIS ]` (Acid Yellow monospace)
  - Headline Line 1: `BINA IDEA.` (Giant Ultra-Bold Condensed White)
  - Headline Line 2: `LANCAR WEB.` (Giant Ultra-Bold Condensed Acid Yellow)
  - Subhead: "Dari laman promosi ke sistem lengkap — dibina mengikut keperluan anda."
- **Brutalist Service Cards (Side-by-Side Dual Panels):**
  - **Panel 1 — `01 / WEBSITE FRONTEND`:**
    - Icon: Browser window outline `[🗔]`
    - Tag: "Bermula"
    - Giant Price: `RM645` (Acid Yellow)
    - Scope: "Landing Page • Business Website • Premium"
    - Button: Acid yellow button `Lihat Pakej  →`
    - Background: Dark concrete blocks with diagonal yellow hazard line.
  - **Panel 2 — `02 / SISTEM FULL-STACK`:**
    - Icon: Database disks outline `[🖴]`
    - Tag: "Bermula"
    - Giant Price: `RM3,250` (Electric Cobalt Blue)
    - Scope: "Login • Database • Dashboard"
    - Button: Cobalt blue button `Bincang Projek  →`
    - Background: Concrete blocks with intense cobalt blue lighting.
- **Architectural 3D & Character Elements:**
  - Giant electric cobalt blue geometric plane slicing through upper right.
  - Giant acid yellow directional chevron graphics behind character.
  - Standing builder character (`02_character_builder_laptop.png`) stands full height on the right third, typing on laptop.

### 4.3 Route 03 — Portfolio (`/portfolio` & `/en/portfolio`)
- **Approved Headline:**
  - Category Badge: `[ 03 / PORTFOLIO ]` (Acid Yellow monospace)
  - Headline Line 1: `IDEA JADI` (Giant Ultra-Bold Condensed White)
  - Headline Line 2: `REALITI.` (Giant Ultra-Bold Condensed Acid Yellow)
  - Subhead: "Eksperimen, konsep dan projek pilihan — setiap satunya ada cerita."
  - CTA Button: Acid yellow button `Lihat Semua Projek  →`
- **3D Perspective Floating Gallery:**
  - Dramatic CSS 3D perspective display with rotated floating viewport cards (using `rotateY`, `rotateX`, depth shadows, neon borders).
  - **Card 1 (Center-Top, Largest, angled):** `01 / SYMI` — Frozen yogurt brand website ("SIMPLE YOGURT HAPPIER DAYS", "Premium frozen yogurt for a brighter you.", yogurt cup with strawberries & granola, "Explore Menu →").
  - **Card 2 (Bottom-Left, angled back):** `02 / LAMBORGHINI` with honest pill badge `KONSEP TIDAK RASMI` — Supercar landing page ("LAMBORGHINI ENGINEERED EMOTION", black sports car on wet tarmac with glowing headlights).
  - **Card 3 (Bottom-Right, angled forward):** `03 / UBERPOKMI` with honest pill badge `DEMO UI` — Superapp prototype ("UberPokmi", "Your Everyday Ride, Food & More.", App Store / Google Play badges, delivery vehicle, food image, floating phone mockup with live map).
- **Bottom Navigation & Gallery Controls:**
  - Counter: `01 / 03` in monospace font.
  - Horizontal progress slider line.
  - Square navigation buttons `[ < ]` and `[ > ]`.

### 4.4 Route 04 — Pricing Studio (`/harga` & `/en/harga`)
- **Approved Headline:**
  - Category Badge: `[ 04 / HARGA ]` (Acid Yellow monospace)
  - Headline Line 1: `BINA IKUT` (Giant Ultra-Bold Condensed White)
  - Headline Line 2: `BAJET.` (Giant Ultra-Bold Condensed Acid Yellow)
  - Subhead Banner: "Pilih pakej, tambah fungsi dan lihat anggaran projek anda." in dark pill banner.
- **Architectural 3D & Visual Elements:**
  - Monumental 3D concrete architectural numeral `04` occupying the lower-left to mid-left with blue spray stripes.
  - Giant bright acid yellow directional arrow shooting diagonally from numeral `04` towards the configurator console.
- **Industrial Hardware Terminal Configurator Surface (Right Side):**
  - Heavy black textured console enclosure titled: `KIRA HARGA WEBSITE` (`WEBSITE` in Acid Yellow).
  - **1. PILIH PAKEJ (Horizontal Cards):**
    - `Landing`: `RM645` (Radio unselected)
    - `Business`: `RM1,745` (Radio selected with yellow dot, yellow border box, acid yellow price)
    - `Premium`: `RM2,995` (Radio unselected)
  - **2. TAMBAH FUNGSI (ADD-ON):**
    - `[▷] Animasi Lanjutan`: `+RM400` (Toggle switch ON: blue track, yellow thumb)
    - `[🌐] Bahasa Kedua`: `+RM250` (Toggle switch OFF: dark track, grey thumb)
  - **3. ANGGARAN PROJEK Summary Block:**
    - Live Total: `RM2,145` in colossal acid yellow font.
    - CTA Button: Solid acid yellow button `Dapatkan Sebut Harga  →`
    - Subtext: "Harga anggaran. Domain dan hosting berasingan."
  - **4. Custom Full-Stack Bar (Bottom of Console):**
    - Left: `[</>] Sistem custom? Dari RM3,250` (in cobalt blue)
    - Right: Cobalt blue button `Bincang Projek  →`

### 4.5 Route 05 — Coaching 1:1 (`/coaching` & `/en/coaching`)
- **Approved Headline:**
  - Category Badge: `[ 05 / COACHING 1:1 ]` (Acid Yellow monospace)
  - Headline Line 1: `BELAJAR.` (Giant Ultra-Bold Condensed White)
  - Headline Line 2: `BINA.` (Giant Ultra-Bold Condensed Acid Yellow)
  - Headline Line 3: `DEPLOY.` (Giant Ultra-Bold Condensed White)
  - Subhead: "Bimbingan hands-on, daripada asas web hingga projek sebenar."
- **Architectural 3D & Character Elements:**
  - Intense cobalt blue grid background (`#103BFF`) with diagonal acid yellow hazard stripes.
  - Colossal 3D concrete architectural numeral `05` on the right half of the frame.
  - Seated creator character (`03_character_creator_laptop.png`) seated on concrete plinth typing on laptop directly in front of numeral `05`.
- **Interactive Duration & Topic Selector Console (Left Side):**
  - Dark brutalist console card:
    - **1. PILIH TOPIK:**
      - `( ) Asas Web`
      - `(•) React / Next.js` (Active: blue box with bright yellow border and yellow dot)
      - `( ) Mentor Projek`
    - **2. DURASI SESI:**
      - `(•) 60 min` (Active: solid cobalt blue fill with yellow dot)
      - `( ) 90 min`
    - **Action Button:** Full-width acid yellow button `Tanya Slot Coaching  →`
    - **Disclosures:**
      - `Online • 1:1 • Bahasa Melayu`
      - `Harga dan jadual disahkan selepas perbincangan.` (Strict adherence to unconfirmed price rule).

### 4.6 Route 06 — About Me (`/tentang` & `/en/tentang`)
- **Approved Headline:**
  - Category Badge: `[ 06 / TENTANG SAYA ]` (Acid Yellow monospace)
  - Monumental 3-tier Headline:
    - Row 1: `SAYA` (Giant Ultra-Bold Condensed White)
    - Row 2: `SYAHMI` (Giant Ultra-Bold Condensed Black text inside a solid, high-contrast ACID YELLOW RECTANGULAR BANNER block `#F3FF00`)
    - Row 3: `AOF.` (Giant Ultra-Bold Condensed White)
  - Subhead Title: `Pembangun Web & Pelajar IT (Cloud Computing)` (bold white text)
  - Subhead Description: "Saya reka dan bina website yang unik, responsif dan berfungsi untuk bisnes dan individu."
- **Factual Credentials & Skills:**
  - 3 Badges:
    1. Graduation Cap: `TVETMARA BESUT` / `Cloud Computing`
    2. Laptop: `FREELANCE WEB DEV` / `Design • Build • Deploy`
    3. Bar Chart: `DFK INC` / `AI Digital Marketing`
  - 4 Skill Tags: `</> Web Development`, `✏ UI/UX`, `☁ Cloud & Deployment`, `⚙ Automasi AI`
  - Buttons: Primary yellow `Lihat Portfolio  →`, Secondary dark `Bincang Projek  →`
- **Dual-Asset Character & Thigh Annotation:**
  - Character Asset 1: `05_character_pointing_throw.png` pointing right hand to the left toward credentials.
  - Character Asset 2: `06_laptop_closed_floating.png` floating in arc above open left palm with motion blur trail.
  - **Protected Thigh Annotation:** Precision technical leader line with angular elbow pointing directly to the character's left thigh, terminating in uppercase text:
    ```
    KARAKTER VISUAL
    JENAMA
    ```

### 4.7 Route 07 — Contact (`/hubungi` & `/en/hubungi`)
- **Approved Headline:**
  - Category Badge: `[ 07 / HUBUNGI ]` (Acid Yellow monospace)
  - Headline Line 1: `IDEA KAU.` (Giant Ultra-Bold Condensed White)
  - Headline Line 2: `KITA BINA.` (Giant Ultra-Bold Condensed Acid Yellow)
  - Subhead: "Ceritakan projek anda. Saya bantu jadikan ia realiti."
- **Quick Contact (Left Side):**
  - Dark button with bright acid yellow border: `Chat WhatsApp  →` (with WhatsApp icon).
  - Subtext: "Pertanyaan awal adalah percuma."
- **Architectural 3D & Curved Arrow Elements:**
  - Colossal 3D concrete architectural numeral `07` in background with blue neon rim.
  - Shiny reflective wet concrete floor.
  - **Dynamic Yellow Brutalist Curved Arrow:** Sweeps dramatically from bottom-left across the floor, curving up and pointing directly at the terminal form console on the right!
- **Industrial Terminal Console (Right Side):**
  - Heavy hardware console titled: `MULA PROJEK ANDA` (`PROJEK ANDA` in Acid Yellow).
  - Field 1: `1. SERVIS DIPERLUKAN` (3 radio pills: `Website UI`, `Sistem Lengkap`, `Coaching 1:1`)
  - Field 2: `2. NAMA` (Input with user icon, placeholder: "Contoh: Ali bin Ahmad")
  - Field 3: `3. EMEL / WHATSAPP` (Input with envelope icon, placeholder: "Contoh: ali@email.com atau 012-345 6789")
  - Field 4: `4. CERITAKAN IDEA ANDA` (Textarea with document icon, placeholder: "Contoh: Saya ingin bina website portfolio dengan reka bentuk moden dan fungsi tempahan.")
  - Action Button: Full-width acid yellow button `Hantar Pertanyaan  →`
- **Bottom Footer Bar:**
  - `© 2026 SYAHMIAOF  |  hello@syahmiaof.my  |  Dibina dengan idea, kod & kopi.`

---

## 5. Visual Discrepancy & Gap Analysis (Codebase vs References)

### 5.1 Architecture & Layout Paradigm
| Area | Approved Reference Mockup | Current Codebase Implementation | Discrepancy Level |
|---|---|---|---|
| **Layout Canvas** | Edge-to-edge cinematic architectural canvas with 3D concrete sculptures, extruded numerals, and textured surfaces. | Standard vertically scrolling SaaS web layout inside centered `max-w-7xl` Tailwind containers. | **CRITICAL** |
| **Character Presentation** | Characters stand/sit naturally on large concrete plinths and platforms as integrated compositional elements. | Characters are encased in small rectangular card frames (`border-2 border-zinc-800 p-2`) with decorative corner text. | **CRITICAL** |
| **Architectural 3D Elements** | Massive 3D "SYA", 3D "04", 3D "05", 3D "07", concrete stepped plinths, and directional arrows. | Plain flat CSS gradients (`bg-acid/10 blur-3xl`, `bg-grid-pattern`), completely lacking 3D architectural geometry. | **CRITICAL** |
| **Portfolio Presentation** | Floating 3D perspective browser cards (`rotateY`, `rotateX`, depth shadows, neon borders). | Flat 3-column grid cards with generic placeholder cards. | **CRITICAL** |
| **Pricing Configurator** | Dedicated heavy hardware console with chamfered bevels, horizontal package cards, and total RM2,145. | Standard vertical form split across multiple separate grid boxes. | **HIGH** |
| **Coaching Interface** | Integrated console with 3 topic boxes and 2 duration selector buttons (60m/90m) in front of 3D "05". | Separate card lists and accordion items; character cutout is completely omitted from the page. | **CRITICAL** |
| **About Headline & Thigh Annotation** | "SAYA [SYAHMI] AOF." with yellow solid banner block; technical leader line to thigh. | Plain text "TENTANG SAYA — SYAHMI AOF"; badge in corner of framed image box. | **HIGH** |
| **Contact Curved Arrow & Console** | Sweeping yellow curved arrow pointing to `MULA PROJEK ANDA` console. | No curved arrow; standard 2-column form layout. | **HIGH** |

### 5.2 Headlines & Typography Gap
| Route | Approved Mockup Headline | Current `src/i18n/ms.ts` Title | Status |
|---|---|---|---|
| **01 — Home** | `WEB YANG BUKAN BIASA.` | `WEB YANG BUKAN BIASA.` | MATCHES |
| **02 — Services** | `BINA IDEA. LANCAR WEB.` | `PERKHIDMATAN WEB & SISTEM` | **MISMATCH** |
| **03 — Portfolio** | `IDEA JADI REALITI.` | `PORTFOLIO & EKSPERIMEN DIGITAL` | **MISMATCH** |
| **04 — Pricing** | `BINA IKUT BAJET.` | `PRICING STUDIO` | **MISMATCH** |
| **05 — Coaching** | `BELAJAR. BINA. DEPLOY.` | `SESI COACHING WEB DEVELOPMENT` | **MISMATCH** |
| **06 — About** | `SAYA SYAHMI AOF.` (with `SYAHMI` in yellow banner) | `TENTANG SAYA — SYAHMI AOF` | **MISMATCH** |
| **07 — Contact** | `IDEA KAU. KITA BINA.` | `IDEA KAU. KITA BINA.` | MATCHES |

### 5.3 Missing & Required Assets Inventory
1. **`public/assets/projects/` (Currently 0 files):**
   - Need standalone high-fidelity screenshots for:
     - `symi_yogurt_preview.png` (Simple Yogurt Happier Days website UI)
     - `lamborghini_concept_preview.png` (Dark supercar landing page UI)
     - `uberpokmi_superapp_preview.png` (Ride/food delivery UI + mobile map)
2. **`public/assets/textures/` (Currently 0 files):**
   - Need concrete textures, concrete wall panels, and grunge overlays for brutalist plinths.
3. **Architectural Backdrops / 3D Canvas:**
   - The colossal 3D "SYA", "04", "05", and "07" must be composited either via CSS 3D perspective / SVG geometry, WebGL / Three.js, or layered high-resolution architectural plate slices.
4. **Directional Arrow Assets:**
   - Giant straight yellow arrow for Route 04 (Pricing).
   - Sweeping brutalist curved yellow arrow for Route 07 (Contact).
5. **Technical Leader Line Annotation:**
   - SVG/CSS elbow leader line for Route 06 thigh annotation: `KARAKTER VISUAL JENAMA`.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|---|---|---|---|---|---|---|
| 1 | Architecture | Full-Viewport 3D Architectural Scene | Edge-to-edge canvas with 3D concrete sculptures, extruded numerals, and plinths. | Viewport resolution (1672x941 desktop, 390x844 mobile) | Rendered 3D brutalist environment | Mobile gracefully stacks without horizontal overflow | `design/references/01-07.png` |
| 2 | Typography | Headline "WEB YANG BUKAN BIASA." | Monumental ultra-bold condensed headline with acid yellow emphasis block on Home. | Route `/` or `/en` | Rendered 2-line headline | Fallback display font Impact/Arial Black if Oswald fails | `01-home.png` |
| 3 | Typography | Headline "BINA IDEA. LANCAR WEB." | Services route headline with white line 1 and yellow line 2. | Route `/servis` or `/en/servis` | Rendered 2-line headline | Falls back to English equivalent on locale switch | `02-services.png` |
| 4 | Typography | Headline "IDEA JADI REALITI." | Portfolio route headline with white line 1 and yellow line 2. | Route `/portfolio` or `/en/portfolio` | Rendered 2-line headline | Consistent across BM/EN | `03-portfolio.png` |
| 5 | Typography | Headline "BINA IKUT BAJET." | Pricing Studio headline with white line 1 and yellow line 2. | Route `/harga` or `/en/harga` | Rendered 2-line headline | Maintained with query params | `04-pricing.png` |
| 6 | Typography | Headline "BELAJAR. BINA. DEPLOY." | 3-line vertical rhythmic headline on Coaching page. | Route `/coaching` or `/en/coaching` | Rendered 3-line headline | Stacked cleanly on mobile | `05-coaching.png` |
| 7 | Typography | Headline "SAYA [SYAHMI] AOF." | 3-tier About Me headline with high-contrast acid yellow solid banner for "SYAHMI". | Route `/tentang` or `/en/tentang` | High-contrast yellow banner block with black text | Resizes without banner clipping | `06-about.png` |
| 8 | Typography | Headline "IDEA KAU. KITA BINA." | Contact route headline with white line 1 and yellow line 2. | Route `/hubungi` or `/en/hubungi` | Rendered 2-line headline | Consistent across BM/EN | `07-contact.png` |
| 9 | 3D Element | Giant 3D Angled "SYA" Typography | Monumental concrete word sculpture angled into 3D space with cast shadows and blue spray slash. | Scroll position, mouse coordinates | 3D perspective depth layer behind hero | Disables continuous heavy 3D on low-power devices | `01-home.png` |
| 10 | 3D Element | Monumental 3D Concrete Numeral "04" | Architectural numeral 04 anchoring the pricing page with blue stripes. | Route `/harga` | 3D extruded concrete numeral | Static fallback on mobile | `04-pricing.png` |
| 11 | 3D Element | Colossal 3D Concrete Numeral "05" | Architectural numeral 05 standing behind the seated creator on coaching page. | Route `/coaching` | 3D extruded concrete numeral | Repositions behind text on narrow screens | `05-coaching.png` |
| 12 | 3D Element | Colossal 3D Concrete Numeral "07" | Architectural numeral 07 looming in contact scene with blue rim glow. | Route `/hubungi` | 3D extruded concrete numeral | Repositions behind console on mobile | `07-contact.png` |
| 13 | 3D Element | CSS 3D Perspective Portfolio Gallery | Rotated floating cards in 3D perspective (rotateY, rotateX, depth shadows, neon borders). | Active slide index (01/03), hover | Transformed 3D card layout | Fallback to stacked cards on mobile / touch | `03-portfolio.png` |
| 14 | Asset Composition | Seated Hero on Concrete Plinth | Cutout `07_hero_seated_character.png` composited directly onto concrete geometry. | Screen size | Seamlessly anchored character | Re-crops and scales on mobile without obscuring CTAs | `01-home.png` |
| 15 | Asset Composition | Standing Builder Character with Laptop | Cutout `02_character_builder_laptop.png` standing full height on Services page. | Screen size | Foreground character layer | Moves below service cards on mobile | `02-services.png` |
| 16 | Asset Composition | Seated Creator on Concrete Plinth | Cutout `03_character_creator_laptop.png` seated typing on laptop on Coaching page. | Screen size | Foreground character layer | Stacks cleanly on mobile | `05-coaching.png` |
| 17 | Asset Composition | Pointing Character + Tossed Laptop | Cutout `05_character_pointing_throw.png` paired with independently floating `06_laptop_closed_floating.png`. | Transform timeline | Floating laptop hovering above open palm | Transform-only animation, no layout shift | `06-about.png` |
| 18 | Annotation | Protected Thigh Annotation | Precision technical leader line pointing to character's thigh: "KARAKTER VISUAL JENAMA". | Screen size | Technical annotation with leader line | Stays attached to character across breakpoints | `06-about.png` |
| 19 | Graphic Element | Directional Yellow Arrow (Pricing) | Bright acid yellow straight arrow pointing from numeral "04" to configurator console. | Viewport | Scaled directional SVG graphic | Hides or adjusts on mobile | `04-pricing.png` |
| 20 | Graphic Element | Brutalist Curved Yellow Arrow (Contact) | Sweeping bright yellow arrow curving from floor towards terminal console. | Viewport | Scaled curved SVG path | Hides or adjusts on mobile | `07-contact.png` |
| 21 | Industrial Element | Metal Plaque "IDEA CODE EXPERIENCE" | Wall-mounted dark metal plate with embossed text and `SYAHMIAOF` with `+` crosshair. | Home route | Industrial plaque graphic | Hides on mobile to conserve space | `01-home.png` |
| 22 | Industrial Element | Hardware Terminal Configurator "KIRA HARGA WEBSITE" | Thick beveled dark terminal enclosure housing package options, add-on switches, and live invoice. | Package selection, add-on toggles | Live computed total (e.g. RM2,145) | Disables frontend add-ons on full-stack package | `04-pricing.png` |
| 23 | Industrial Element | Hardware Console "MULA PROJEK ANDA" | Thick beveled dark terminal housing 4 structured inquiry fields and submit button. | User form inputs, query params | Validated payload / mailto fallback | Shows inline error on invalid email/phone | `07-contact.png` |
| 24 | Commercial Logic | Honest Concept Badges | Clear disclaimers ("KONSEP TIDAK RASMI", "DEMO UI", "KONSEP DEMO") on portfolio projects. | Project status data | Rendered badge pills | Never claims fake client affiliation | `03-portfolio.png` |
| 25 | Commercial Logic | Honest Unconfirmed Coaching Price | Coaching page specifies "Harga dan jadual disahkan selepas perbincangan" with "Tanya Slot Coaching" CTA. | Topic and duration query params | Prefilled inquiry in contact form | Never displays invented price | `05-coaching.png` |
| 26 | Navigation | Persistent Brutalist Header with Active Underline | Header with uppercase `SYAHMIAOF` logo, 7 route links, active yellow underline, and `[ BM / EN ]` toggle. | Pathname, active locale | Highlighted active page link | Preserves query parameters across language switch | All 7 mockups |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---|---|---|
| 1 | Reference Aspect Ratio | Viewport width 1671px vs 1672px | `07-contact.png` has width 1671px while all others are 1672px. Design components must use flexible flex/grid scaling rather than hardcoding 1672px. |
| 2 | Mobile Breakpoint (390px) | iPhone standard (390 x 844 px) | Characters must gracefully re-stack beneath or above headlines without obscuring text or CTA click areas, with `overflow-x: hidden`. |
| 3 | Reduced Motion | `prefers-reduced-motion: reduce` | 3D perspective rotations, floating laptop animation, and scroll parallax must collapse to static readable states. |
| 4 | Pricing Calculation | Business (RM1,745) + Advanced Animation (+RM400) | Computes strictly to RM2,145 matching the exact mockup invoice display. |
| 5 | Pricing Add-on Toggle | Switching from Business to Full-Stack | Full-Stack package disables frontend add-ons and replaces invoice total with "Dari RM3,250" and CTA "Bincang Projek". |
| 6 | Quote Handoff | Clicking "Dapatkan Sebut Harga" with Business + Animation | Navigates to `/hubungi?service=website-ui&package=business&addons=animation&estimate=2145` and prefills contact form. |
| 7 | Coaching Handoff | Selecting React/Next.js + 60 min | Navigates to `/hubungi?service=coaching&topic=react-next&duration=60` without inventing any price. |
| 8 | Contact Form Submission | Valid inputs without backend SMTP configured | Displays honest fallback with direct `mailto:hello@syahmiaof.my` link and prefilled subject/body. |
| 9 | WhatsApp CTA | Clicking "Chat WhatsApp" | Displays honest pending status until real international phone number is configured. |
| 10 | Locale Switching | Switching BM <-> EN on `/harga` with selections active | Preserves active package selection, add-on toggles, and query params without resetting. |

---

## 6. Architectural Recommendations for Implementation Agents

1. **WIRA (Layout Reconstruction):**
   - Shift layout paradigm from nested SaaS container cards to full-width architectural viewports.
   - Reconstruct the dual-card services section (`01 / WEBSITE FRONTEND` and `02 / SISTEM FULL-STACK`) and integrate the standing builder character.
   - Build the high-contrast yellow banner for `SYAHMI` on the About page and connect the thigh leader annotation.
2. **PANGLIMA (3D & Asset Composition):**
   - Implement the CSS 3D perspective gallery for Portfolio with rotated floating cards and glowing borders.
   - Anchor character cutouts directly on concrete plinth geometry rather than inside boxed frames.
   - Extract or composite high-resolution project previews for SYMI, Lamborghini, and UberPokmi into `public/assets/projects/`.
   - Render the 3D concrete numerals (`04`, `05`, `07`) and 3D "SYA" sculpture.
3. **BAYU (GSAP Motion):**
   - Create subtle scroll parallax on background concrete and character layers.
   - Implement floating transform animation for `06_laptop_closed_floating.png` above character's palm.
   - Ensure complete `prefers-reduced-motion` compliance.
4. **LAKSAMANA / CENDEKIA (Functional & Copy Integrity):**
   - Update `src/i18n/ms.ts` and `src/i18n/en.ts` to match the exact approved headlines.
   - Preserve 100% of the pricing math and parameter handoffs.
5. **MATA (Visual QA):**
   - Re-capture Playwright desktop (1672x941 / 1440px) and mobile (390px) screenshots to verify 1:1 visual fidelity against `design/references/`.
