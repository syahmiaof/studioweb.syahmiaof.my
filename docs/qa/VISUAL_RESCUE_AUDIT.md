# SYAHMIAOF STUDIO — VISUAL RESCUE AUDIT (V1.0 BASELINE vs APPROVED REFERENCES)

**Date:** 2026-10-25  
**Auditor:** JEBAT (Lead Engineering Owner)  
**Status:** **FAILED — COMPLETE VISUAL RECONSTRUCTION MANDATED**  
**Resolution Audited:** Desktop (1440 × 900) & Mobile (390 × 844)  
**Baseline Captures:** `docs/qa/screenshots/v1_desktop_1440/` & `docs/qa/screenshots/v1_mobile_390/`  
**Authoritative References:** `design/references/01-home.png` to `07-contact.png`  

---

## 1. Executive Failure Summary

The V1.0 implementation fundamentally failed visual QA because it defaulted to a **generic Next.js template layout** (standard flex rows, centered container grids, flat dark cards) instead of faithfully constructing the **cinematic, architectural Digital Brutalism compositions** established in the seven approved mockup artworks.

### Critical Systemic Discrepancies:
1. **Wrong Headlines & Typography Hierarchy:**
   - Home had *"BANGUN LAMAN WEB BERIMPAK TINGGI"* instead of the authoritative **"WEB YANG BUKAN BIASA."**
   - Services had *"PERKHIDMATAN WEB & SISTEM"* instead of **"BINA IDEA. LANCAR WEB."**
   - Portfolio had *"PORTFOLIO & EKSPERIMEN DIGITAL"* instead of **"IDEA JADI REALITI."**
   - Pricing had *"PRICING STUDIO"* instead of **"BINA IKUT BAJET."**
   - Coaching had *"SESI COACHING 1:1"* instead of **"BELAJAR. BINA. DEPLOY."**
   - About had *"TENTANG SAYA"* instead of **"SAYA SYAHMI AOF."**
   - Contact had *"MULA PROJEK ANDA"* instead of **"IDEA KAU. KITA BINA."**
2. **Absence of Monumental Architectural Geometry:**
   - Missing the giant 3D angled **"SYA"** typographic backdrop on Home.
   - Missing the colossal cobalt **"05"** concrete plinth on Coaching.
   - Missing the monumental **"04"** numeral and angled brutalist framing on Pricing.
   - Missing the 3D perspective rotated cards and depth angles on Portfolio.
   - Missing the yellow title badge blocks, caution hash stripes, and industrial decals present in the mockups.
3. **Character Composition & Integration:**
   - Characters were placed as floating thumbnails or passive sidebar graphics, rather than deeply integrated into the architectural perspective and concrete pedestals.
4. **Cinematic Impact & Depth:**
   - V1 felt like a standard flat SaaS website. The approved mockups are aggressive, three-dimensional, spatial, and editorial.

---

## 2. Detailed Page-by-Page Discrepancy Breakdown

### Page 01 — Home (`/` & `/en`)
* **Reference Mockup:** `design/references/01-home.png`
* **V1.0 Baseline:** `docs/qa/screenshots/v1_desktop_1440/01-home.png`
* **Discrepancies Identified:**
  1. **Headline:** V1 uses *"BANGUN LAMAN WEB BERIMPAK TINGGI"*. Reference strictly features **"WEB YANG BUKAN BIASA."** enclosed in an electric yellow rectangular brutalist badge with black condensed grotesque font.
  2. **Monumental Background 3D Typography:** Reference features massive, architectural, angled letters **"SYA"** looming in high-contrast greyscale/concrete behind the hero character. V1 had none.
  3. **Character Stance & Pedestal:** Reference features the seated techwear character anchored on dark concrete geometry with hazard yellow line markings. V1 had the character floating in a generic card on the right.
  4. **Action Badges & Ticker:** Reference features industrial crosshairs, coordinate badges `[01/07]`, and bold CTA buttons with high-contrast brutalist offsets.
* **Prescription:** Full architectural rebuild of Home Hero following Theme B composition.

---

### Page 02 — Services (`/servis` & `/en/servis`)
* **Reference Mockup:** `design/references/02-services.png`
* **V1.0 Baseline:** `docs/qa/screenshots/v1_desktop_1440/02-services.png`
* **Discrepancies Identified:**
  1. **Headline:** V1 uses *"PERKHIDMATAN WEB & SISTEM"*. Reference features bold yellow badge **"BINA IDEA. LANCAR WEB."**
  2. **Composition & Character:** Reference shows standing character (`02_character_builder_laptop.png`) integrated with sharp cobalt blue angled geometric panels on the right, with dark technical service cards on the left. V1 placed cards in a flat 2-column grid.
  3. **Service Track Separation:** The distinct boundary between Frontend Websites and Custom Full-Stack Systems must be presented via layered brutalist panels rather than plain list cards.
* **Prescription:** Rebuild layout with layered cobalt/acid architectural backdrop and prominent standing builder composition.

---

### Page 03 — Portfolio (`/portfolio` & `/en/portfolio`)
* **Reference Mockup:** `design/references/03-portfolio.png`
* **V1.0 Baseline:** `docs/qa/screenshots/v1_desktop_1440/03-portfolio.png`
* **Discrepancies Identified:**
  1. **Headline:** V1 uses *"PORTFOLIO & EKSPERIMEN DIGITAL"*. Reference features **"IDEA JADI REALITI."** in yellow brutalist block.
  2. **Perspective 3D Gallery:** Reference features dramatic rotated cards floating in isometric/perspective space (`rotateY(-12deg)`, `rotateX(6deg)` with depth shadows and neon acid/cobalt perimeter glow). V1 used a flat horizontal flex list.
  3. **Visual Depth:** Missing dark concrete architectural blocks and spatial layers.
* **Prescription:** Implement true CSS 3D perspective gallery showcase for SYMI UI, Lamborghini Concept, and UberPokmi UI while maintaining clickable interactive demo/code links.

---

### Page 04 — Pricing (`/harga` & `/en/harga`)
* **Reference Mockup:** `design/references/04-pricing.png`
* **V1.0 Baseline:** `docs/qa/screenshots/v1_desktop_1440/04-pricing.png`
* **Discrepancies Identified:**
  1. **Headline:** V1 uses *"PRICING STUDIO"*. Reference features bold yellow block **"BINA IKUT BAJET."**
  2. **Massive Numeral "04":** Reference features a towering, architectural numeral **"04"** anchored into the concrete/dark framework. V1 lacked this monumental anchor.
  3. **Terminal Configurator Surface:** Reference configurator looks like an industrial hardware console with neon borders, crisp switches, and high-visibility price readouts. V1 looked like a standard web form.
* **Prescription:** Rebuild configurator shell with monumental 04 graphic, high-contrast industrial toggle switches, and neon border framing while preserving 100% of the working pricing math.

---

### Page 05 — Coaching (`/coaching` & `/en/coaching`)
* **Reference Mockup:** `design/references/05-coaching.png`
* **V1.0 Baseline:** `docs/qa/screenshots/v1_desktop_1440/05-coaching.png`
* **Discrepancies Identified:**
  1. **Headline:** V1 uses *"SESI COACHING 1:1"*. Reference features yellow text in cobalt banner **"BELAJAR. BINA. DEPLOY."**
  2. **Giant Cobalt "05" Monument:** Reference features a massive, sculptural cobalt blue block `#0038FF` with a colossal white/concrete **"05"**, upon which the seated laptop character (`03_character_creator_laptop.png`) sits. V1 had no cobalt 05 plinth.
  3. **Duration Selector:** The 60m / 90m toggles in reference are styled as industrial selector pins.
* **Prescription:** Reconstruct the cobalt 05 monument and position the seated character atop the plinth with matching typography hierarchy.

---

### Page 06 — About Me (`/tentang` & `/en/tentang`)
* **Reference Mockup:** `design/references/06-about.png`
* **V1.0 Baseline:** `docs/qa/screenshots/v1_desktop_1440/06-about.png`
* **Discrepancies Identified:**
  1. **Headline:** V1 uses *"TENTANG SAYA"*. Reference features high-contrast yellow horizontal banner **"SAYA SYAHMI AOF."**
  2. **Dual Asset Composition:** Reference features pointing character (`05_character_pointing_throw.png`) on the left and a floating closed laptop (`06_laptop_closed_floating.png`) suspended to the right, against a concrete and cobalt angled backdrop. V1 only had a single asset.
  3. **Annotation Position:** The tag `KARAKTER VISUAL JENAMA` must sit precisely beside the character's thigh without obscuring the UI.
* **Prescription:** Rebuild with dual-asset layout (pointing character + floating laptop), yellow banner header, and exact thigh annotation placement.

---

### Page 07 — Contact (`/hubungi` & `/en/hubungi`)
* **Reference Mockup:** `design/references/07-contact.png`
* **V1.0 Baseline:** `docs/qa/screenshots/v1_desktop_1440/07-contact.png`
* **Discrepancies Identified:**
  1. **Headline:** V1 uses *"MULA PROJEK ANDA"*. Reference features giant yellow/black brutalist block **"IDEA KAU. KITA BINA."**
  2. **Directional Arrow Graphic:** Reference features a dynamic yellow curved brutalist arrow arcing from the headline toward the contact terminal.
  3. **Industrial Terminal Frame:** The form in the reference is encased in a dark industrial console with glowing status indicators and technical grid lines.
* **Prescription:** Reconstruct header with "IDEA KAU. KITA BINA.", integrate brutalist directional arrow, and restyle the form into an industrial console.

---

## 3. Action Plan for Visual Rescue Sprint (V1.1)

1. **Phase 1: Shared Architectural Components & Assets Preparation**
   - Extract/prepare vector and high-res assets: monumental typographic elements, hazard stripes, yellow banner blocks, directional arrows.
   - Update typography tokens to support ultra-condensed brutalist display sizing (`text-7xl` to `text-9xl`, tight tracking `-0.05em`).
2. **Phase 2: Page-by-Page Architectural Rebuild**
   - **Step 1: Home (`/`)** — Headline `"WEB YANG BUKAN BIASA."`, giant angled "SYA", seated character on concrete plinth.
   - **Step 2: Services (`/servis`)** — Headline `"BINA IDEA. LANCAR WEB."`, standing character, cobalt layered panels.
   - **Step 3: Portfolio (`/portfolio`)** — Headline `"IDEA JADI REALITI."`, 3D perspective rotated project cards.
   - **Step 4: Pricing (`/harga`)** — Headline `"BINA IKUT BAJET."`, monumental "04", industrial console configurator.
   - **Step 5: Coaching (`/coaching`)** — Headline `"BELAJAR. BINA. DEPLOY."`, giant cobalt "05" plinth, seated character.
   - **Step 6: About (`/tentang`)** — Headline `"SAYA SYAHMI AOF."`, pointing character + floating laptop, thigh badge.
   - **Step 7: Contact (`/hubungi`)** — Headline `"IDEA KAU. KITA BINA."`, curved yellow arrow, industrial terminal console.
3. **Phase 3: Automated Visual Re-Audit & Iterative Tuning**
   - Run Playwright to capture fresh screenshots after each page rebuild.
   - Compare side-by-side with approved references until visual fidelity reaches ≥ 95%.
4. **Phase 4: Functional Regression Verification**
   - Verify pricing math, quote handoff, coaching selection, bilingual switch, honeypot validation, and mailto fallback remain 100% operational.
