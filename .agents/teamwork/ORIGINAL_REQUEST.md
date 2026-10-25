# Original User Request

## Initial Request — 2026-10-25T14:15:51Z

Specialist team of frontend engineers for each section: MATA (Visual QA), WIRA (Layout Reconstruction), BAYU (GSAP Motion), PANGLIMA (3D/Asset Composition), BENTARA (Performance & Responsive), CENDEKIA (Functional Regression).

Rebuild and recover the high-impact Digital Brutalism visual fidelity of all seven routes for SYAHMIAOF STUDIO to match the seven approved reference mockups, while preserving existing pricing calculation logic, bilingual support, and commercial integrity.

Working directory: C:\Users\USER\Desktop\studio.syahmiaof.my
Integrity mode: development

## Requirements

### R1. Visual Reconstruction of All Seven Routes (Visual Source of Truth)
Rebuild the visual layout and composition of all seven routes to match their respective approved mockups in design/references/:
- 01 — Home (/ & /en): Headline "WEB YANG BUKAN BIASA." in yellow brutalist block. Giant 3D angled "SYA" architectural typography in the background. Seated techwear character (07_hero_seated_character.png) anchored on dark concrete geometry with hazard yellow line markings. High-contrast CTA buttons and industrial metadata ticker.
- 02 — Services (/servis & /en/servis): Headline "BINA IDEA. LANCAR WEB." Layered cobalt blue architectural blocks, standing builder character (02_character_builder_laptop.png) with laptop on the right, distinct brutalist panels for Frontend Websites and Custom Full-Stack Systems.
- 03 — Portfolio (/portfolio & /en/portfolio): Headline "IDEA JADI REALITI." Dramatic CSS 3D perspective gallery with rotated floating cards (rotateY, rotateX, depth shadows, neon acid/cobalt borders). Honest badges (KONSEP DEMO / EKSPERIMENTAL / FRONTEND DEMO) for SYMI UI, Lamborghini Concept, and UberPokmi UI.
- 04 — Pricing Studio (/harga & /en/harga): Headline "BINA IKUT BAJET." Monumental architectural numeral "04", industrial terminal configurator surface with neon borders, interactive base package selector and add-on toggles, dynamic live invoice summary, and quote handoff.
- 05 — Coaching (/coaching & /en/coaching): Headline "BELAJAR. BINA. DEPLOY." Colossal cobalt blue "05" concrete plinth with seated creator character (03_character_creator_laptop.png), interactive 60m / 90m duration selector pins, curriculum track cards.
- 06 — About Me (/tentang & /en/tentang): Headline "SAYA SYAHMI AOF." in high-contrast yellow banner. Dual-asset composition: pointing character (05_character_pointing_throw.png) and floating closed laptop (06_laptop_closed_floating.png). Protected annotation "KARAKTER VISUAL JENAMA" positioned beside the character's thigh. Accurate biography of Syahmi AOF.
- 07 — Contact (/hubungi & /en/hubungi): Headline "IDEA KAU. KITA BINA." with dynamic yellow brutalist curved arrow pointing to industrial terminal console. Form with Category, Name, Contact, and Brief fields, preserving quote/coaching query parameters.

### R2. Strict Preservation of Functional Logic & Arithmetic
Preserve 100% of the existing working application logic:
- Pricing engine arithmetic: Landing RM645, Business RM1,745, Premium RM2,995, Full-Stack from RM3,250 quote. Add-ons: GSAP Animation (+RM400), Second Language (+RM250). Business + Animation = RM2,145; Business + Both = RM2,395. Full-stack disables frontend add-ons.
- Parameter handoff from /harga and /coaching into /hubungi (preserving service, package, addons, estimate, duration).
- Bilingual dictionary and switcher (ms <-> en) preserving query parameters.
- Honeypot anti-spam protection on contact form.
- Honest email fallback displaying direct mailto:hello@syahmiaof.my link when backend SMTP/Resend keys are unconfigured.

### R3. Asset & Composition Engineering (No Fake Screenshots)
- Use real interactive HTML/CSS components with Tailwind and CSS variables.
- Separate and composite background architectures, industrial textures, concrete plinths, and supplied transparent PNG character cutouts (public/assets/characters/).
- Use CSS 3D perspective transforms (perspective, transform-style: preserve-3d) for architectural depth.
- Never render a static image screenshot as a fake non-interactive webpage.

### R4. Motion Polish & Responsive Adaptation
- Layered GSAP entrance reveals and subtle scroll parallax on architectural elements.
- Fluid mobile adaptation at 390px (iPhone standard) ensuring character cutouts stack naturally without overlapping text or CTAs, and no horizontal scroll overflows (overflow-x: hidden).
- Reduced-motion support (prefers-reduced-motion).

### R5. Local Build & Boundary Constraints
- Pure local build in C:\Users\USER\Desktop\studio.syahmiaof.my.
- Run and test on port 3456 or 3002 (do NOT touch port 3000).
- Zero deployments to production, zero DNS modifications, zero changes to the separate syahmiaof.my portfolio.

## Acceptance Criteria

### Visual Fidelity & Layout Verification
- [ ] Every page displays its exact approved headline:
  - Home: "WEB YANG BUKAN BIASA."
  - Services: "BINA IDEA. LANCAR WEB."
  - Portfolio: "IDEA JADI REALITI."
  - Pricing: "BINA IKUT BAJET."
  - Coaching: "BELAJAR. BINA. DEPLOY."
  - About: "SAYA SYAHMI AOF."
  - Contact: "IDEA KAU. KITA BINA."
- [ ] Home features the giant 3D angled "SYA" architectural typography and seated character on concrete blocks.
- [ ] Services features standing builder character with laptop integrated with cobalt architectural panels.
- [ ] Portfolio features 3D perspective rotated project cards with neon border glow and interactive demo buttons.
- [ ] Pricing features monumental "04" and industrial hardware terminal configurator.
- [ ] Coaching features colossal cobalt "05" plinth with seated character.
- [ ] About features pointing character, floating closed laptop, yellow banner headline, and "KARAKTER VISUAL JENAMA" thigh annotation.
- [ ] Contact features "IDEA KAU. KITA BINA.", yellow curved directional arrow, and industrial terminal console.
- [ ] Full-page desktop (1440px) and mobile (390px) screenshots for all 7 routes captured in docs/qa/screenshots/ showing visual fidelity matching approved references.

### Functional Integrity
- [ ] npm test passes all 14 unit tests in Vitest with 0 failures.
- [ ] npm run test:e2e passes all interactive checks in Playwright (Pricing calculation, quote handoff, coaching handoff, bilingual switch, form validation).
- [ ] npm run build exits with code 0 and 0 TypeScript/lint errors.
- [ ] Zero fake client testimonials; all concept demos strictly labeled.
- [ ] WhatsApp CTA displays honest pending state until real international number is configured.
- [ ] Direct mailto fallback active when email API keys are absent.
