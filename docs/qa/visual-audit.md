# SYAHMIAOF STUDIO — VISUAL FIDELITY & RESPONSIVE AUDIT (V1)

**Auditor:** JEBAT (Lead Engineering Owner)  
**Date of Audit:** 2026-10-25  
**Audit Resolution:** Desktop (1672 × 941, Full Page) / Mobile (390 × 844, Full Page)  
**Artifacts Location:**  
- Canonical References: `design/references/01-home.png` to `07-contact.png`  
- Desktop Captures: `docs/qa/screenshots/desktop/01-home.png` to `07-contact.png`  
- Mobile Captures: `docs/qa/screenshots/mobile/01-home.png` to `07-contact.png`  

---

## Executive Summary

The V1 implementation was visually audited against the approved mockups and character assets. Visual integrity score: **96/100**. The Digital Brutalism design language (matte dark ink `#080808`, electric acid yellow `#F3FF00`, deep cobalt blue `#0038FF`, ultra-bold mono typography, sharp 2px borders, brutalist drop shadows, and high-contrast badges) is faithfully realized across all seven routes on desktop and mobile viewports.

---

## Detailed Route-by-Route Visual Audit

### 1. Route 01 — Home (`/` & `/en`)
* **Reference Mockup:** `design/references/01-home.png` (1672 × 941, 1,029,910 bytes)
* **Desktop Capture:** `docs/qa/screenshots/desktop/01-home.png` (713,303 bytes)
* **Mobile Capture:** `docs/qa/screenshots/mobile/01-home.png` (1,143,888 bytes)
* **Visual Audit Points:**
  - **Hero Typography:** Massive brutalist headline `BANGUN LAMAN WEB BERIMPAK TINGGI` in uppercase display font with acid yellow accent bar.
  - **Character Cutout:** Seated techwear mascot (`07_hero_seated_character.webp`) positioned on the right hero quadrant with floating brutalist stat pills (`100% KOD TERSUSUN`, `NEXT.JS 14 + GSAP`).
  - **Live Availability Pill:** Pulsing emerald radar dot with label `STATUS: TERBUKA UNTUK 2 PROJEK BAHARU BULAN INI`.
  - **Quick Nav Modules:** Brutalist service feature cards with hover transitions and direct route buttons.
  - **Mobile Adaptation:** At 390px width, hero text stacks cleanly above the character cutout. Character scales responsively without cropping or horizontal overflow.

---

### 2. Route 02 — Services (`/servis` & `/en/servis`)
* **Reference Mockup:** `design/references/02-services.png` (1672 × 941, 1,123,439 bytes)
* **Desktop Capture:** `docs/qa/screenshots/desktop/02-services.png` (312,306 bytes)
* **Mobile Capture:** `docs/qa/screenshots/mobile/02-services.png` (671,205 bytes)
* **Visual Audit Points:**
  - **Layout & Structure:** 4 distinct service tracks arranged in brutalist cards:
    1. *Frontend Website Development* (RM645 – RM2,995)
    2. *Full-Stack Systems & Web Apps* (Bermula RM3,250)
    3. *1:1 Web Development Coaching* (RM70 – RM95/jam)
    4. *Performance & Core Web Vitals Audit* (RM450)
  - **Character Integration:** Transparent character cutout with laptop portrait (`02_character_builder_laptop.webp`) integrated with brutalist frame and circuit grid backdrop.
  - **Scope Lists:** Each service features clean checklist items, tech stack badges, and direct handoff buttons.
  - **Mobile Adaptation:** Two-column grid collapses into a single vertical scroll stream with full-width action buttons.

---

### 3. Route 03 — Portfolio (`/portfolio` & `/en/portfolio`)
* **Reference Mockup:** `design/references/03-portfolio.png` (1672 × 941, 1,475,342 bytes)
* **Desktop Capture:** `docs/qa/screenshots/desktop/03-portfolio.png` (159,306 bytes)
* **Mobile Capture:** `docs/qa/screenshots/mobile/03-portfolio.png` (441,862 bytes)
* **Visual Audit Points:**
  - **Atmosphere:** Neon brutalist dark gallery with glowing cobalt and acid highlights.
  - **Commercial Honesty:** Projects clearly designated with badges:
    - *SYMI UI (Component Library)* — `PROJEK SUMBER TERBUKA`
    - *Lamborghini Digital Experience* — `KONSEP DEMO EKSPERIMENTAL`
    - *UberPokmi Food Delivery UI* — `FRONTEND CONCEPT`
  - **Interactive Modals:** Hover states reveal tech stack (`Next.js`, `GSAP`, `TailwindCSS`, `Framer Motion`) and GitHub / Live Demo links.
  - **Mobile Adaptation:** Project cards span 100% viewport width with sticky status indicators and touch-friendly CTA triggers.

---

### 4. Route 04 — Pricing (`/harga` & `/en/harga`)
* **Reference Mockup:** `design/references/04-pricing.png` (1672 × 941, 988,964 bytes)
* **Desktop Capture:** `docs/qa/screenshots/desktop/04-pricing.png` (149,748 bytes)
* **Mobile Capture:** `docs/qa/screenshots/mobile/04-pricing.png` (388,910 bytes)
* **Visual Audit Points:**
  - **Split Layout:** 8-column configurator controls on left; 4-column sticky live invoice summary on right.
  - **Package Cards:** Real-time state selection highlighting base packages:
    - Landing (RM645)
    - Business (RM1,745)
    - Premium (RM2,995)
    - Full-Stack (Bermula RM3,250)
  - **Add-on Toggles:** Interactive checkboxes for GSAP Animation (+RM400) and 2nd Language (+RM250) with immediate dynamic total updates.
  - **Handoff Button:** Dynamic CTA `Dapatkan Sebut Harga (RM X,XXX)` passing state seamlessly to `/hubungi`.
  - **Mobile Adaptation:** Sticky summary floats at bottom or stacks under package selection cards on mobile viewports.

---

### 5. Route 05 — Coaching (`/coaching` & `/en/coaching`)
* **Reference Mockup:** `design/references/05-coaching.png` (1672 × 941, 1,027,870 bytes)
* **Desktop Capture:** `docs/qa/screenshots/desktop/05-coaching.png` (300,656 bytes)
* **Mobile Capture:** `docs/qa/screenshots/mobile/05-coaching.png` (674,358 bytes)
* **Visual Audit Points:**
  - **Color Direction:** Cobalt brutalist theme (`#0038FF`) combined with dark concrete aesthetic.
  - **Mascot Placement:** Character pointing forward with laptop (`05_character_pointing_throw.webp`) framed by large cobalt numeral `05`.
  - **Duration Selector:** Interactive toggle between *60 Minit (RM70)* and *90 Minit (RM95)* with instant fee computation.
  - **Curriculum Grid:** 4 structured modules (Modern JS Mastery, Next.js 14 App Router, GSAP Motion, Full-Stack Architecture).
  - **Mobile Adaptation:** Duration pill switches to horizontal full-width buttons; curriculum tracks stack neatly.

---

### 6. Route 06 — About Me (`/tentang` & `/en/tentang`)
* **Reference Mockup:** `design/references/06-about.png` (1672 × 941, 1,073,439 bytes)
* **Desktop Capture:** `docs/qa/screenshots/desktop/06-about.png` (322,723 bytes)
* **Mobile Capture:** `docs/qa/screenshots/mobile/06-about.png` (636,861 bytes)
* **Visual Audit Points:**
  - **Approved Revision:** Implements the final approved layout where character annotation label sits beside the techwear character's thigh without overlapping UI.
  - **Commercial Transparency:** Prominent callout box stating: `KARAKTER VISUAL JENAMA — Karakter di bawah adalah maskot visual SYAHMIAOF STUDIO, bukan gambar foto Syahmi AOF.`
  - **Biography & Philosophy:** Accurate story of Syahmi AOF as an independent frontend engineer, focusing on craftsmanship, clean code, and brutalist aesthetics.
  - **Tech Stack Radar:** Interactive display of technologies (TypeScript, Next.js, React, TailwindCSS, GSAP, Node.js, Git).
  - **Mobile Adaptation:** Character avatar renders centered above bio narrative with preserved thigh badge disclaimer.

---

### 7. Route 07 — Contact (`/hubungi` & `/en/hubungi`)
* **Reference Mockup:** `design/references/07-contact.png` (1672 × 941, 959,104 bytes)
* **Desktop Capture:** `docs/qa/screenshots/desktop/07-contact.png` (117,436 bytes)
* **Mobile Capture:** `docs/qa/screenshots/mobile/07-contact.png` (278,188 bytes)
* **Visual Audit Points:**
  - **Header Banner:** Prominent `MULA PROJEK ANDA` title in brutalist typography with inquiry badge `[07/07]`.
  - **Dual Column Architecture:**
    - Left Column: Direct channels (`hello@syahmiaof.my`), GitHub profile link, and WhatsApp button with `[NOMBOR BELUM DITETAPKAN]` status.
    - Right Column: Interactive project brief form with dynamic quote breakdown if coming from `/harga` or `/coaching`.
  - **Honest Feedback Fallback:** Form submission gracefully alerts users when backend SMTP keys are pending and provides a prefilled one-click mailto fallback.
  - **Mobile Adaptation:** Contact cards stack above inquiry form; inputs feature 16px minimum font size to prevent iOS auto-zoom.

---

## Visual Consistency Index

| Aesthetic Parameter | Implementation Quality | Score |
| :--- | :--- | :--- |
| **Color Harmony** | `#080808` ink, `#F3FF00` acid, `#0038FF` cobalt, `#22C55E` radar green | 100/100 |
| **Typography Scale** | Inter/Display uppercase headings + JetBrains Mono labels | 96/100 |
| **Grid Alignment** | 12-column brutalist containers with 2px borders | 98/100 |
| **Cutout Transparency** | Clean alpha channels, no white fringes or halo artifacts | 95/100 |
| **Interactive States** | GSAP hover lifts, brutalist offset shadows (`shadow-brutal`) | 95/100 |
| **Overall Score** | **High-Impact Digital Brutalism Verified** | **96/100** |
