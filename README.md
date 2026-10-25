# SYAHMIAOF STUDIO — Digital Brutalism Web Platform (V1)

**Live Local Production Build:** Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP 3.  
**Target Domain:** `studio.syahmiaof.my` (local build only; not yet connected).  
**Lead Engineering Owner:** JEBAT.  
**Brand:** SYAHMIAOF STUDIO — Frontend Development, Custom Full-Stack Systems & 1:1 Web-Dev Coaching.  

---

## 1. Quick Start & Local Commands

```bash
# Install dependencies
npm install

# Run Vitest unit tests (14/14 tests passing)
npm test

# Run full automated Playwright E2E audit & capture fresh screenshots
npm run test:e2e

# Run local development server
npm run dev

# Run production build and start production server
npm run build
npm start
```

---

## 2. Architecture & File Structure

```text
studio.syahmiaof.my/
  README.md                            # Complete project guide and preserved notes
  package.json                         # Dependencies & run scripts
  tsconfig.json                        # TypeScript strict configuration
  tailwind.config.ts                   # Digital Brutalism theme & palette
  docs/
    engineering/
      ENGINEERING_BLUEPRINT_V1.md      # Authoritative functional specification
      ANTIGRAVITY_V1_MASTER_PROMPT.md  # Governance prompt & instructions
    design/
      APPROVED_REFERENCES.md           # Visual contract for all 7 routes
      ASSET_INVENTORY.md               # Asset provenance, hashes, and destinations
    qa/
      acceptance-checklist.md          # Complete QA scenario verification matrix
      visual-audit.md                  # Side-by-side visual audit report
      issue-log.md                     # Blockers, fallbacks, and pending inputs
      build-report.md                  # Build metrics, bundle sizes, and test logs
      screenshots/
        desktop/                       # 14 full-page desktop captures (1672x941)
        mobile/                        # 14 full-page mobile captures (390x844)
  design/
    originals/                         # Untouched byte-identical originals with SHA256 hashes
    references/                        # 7 canonical approved reference mockups (01-07)
    incoming/                          # Safely relocated loose assets
  public/
    assets/
      characters/                      # Optimized transparent character cutouts (WebP)
      projects/                        # Verified project screenshot assets
  src/
    app/                               # Next.js 14 App Router routes (BM & EN)
      api/inquiries/route.ts           # Zod-validated inquiry Route Handler
      page.tsx                         # Route 01 Home (BM)
      servis/page.tsx                  # Route 02 Services (BM)
      portfolio/page.tsx               # Route 03 Portfolio (BM)
      harga/page.tsx                   # Route 04 Pricing (BM)
      coaching/page.tsx                # Route 05 Coaching (BM)
      tentang/page.tsx                 # Route 06 About (BM)
      hubungi/page.tsx                 # Route 07 Contact (BM)
      en/                              # Full English routes (/en, /en/servis, etc.)
    components/
      layout/                          # Header (bilingual, sticky) & Footer
      pages/                           # Reusable view components for each route
    content/                           # Structured TypeScript content (projects, services, coaching)
    i18n/                              # Bilingual dictionary (ms.ts, en.ts, index.ts)
    lib/
      pricing/                         # Deterministic pricing engine & add-on arithmetic
      validation/                      # Zod inquiry schema with honeypot validation
      types/                           # Core TypeScript interfaces
  tests/
    unit/                              # Vitest unit test suites
    e2e/                               # Playwright browser test & screenshot script
```

---

## 3. Commercial & Technical Integrity Decisions

1. **Deterministic Pricing Engine:** Base Landing RM645, Business RM1,745, Premium RM2,995. Add-ons: GSAP Animation (+RM400), Second Language (+RM250). Business + Animation = RM2,145; Business + Both = RM2,395. Full-Stack package (from RM3,250) is isolated for custom scoping.
2. **Seamless URL Handoff:** Parameter state is preserved when moving from `/harga` or `/coaching` to `/hubungi`, and across `ms` ↔ `en` language switches.
3. **No Fake Reviews or Testimonials:** Zero fabricated five-star quotes. Concepts are clearly labeled as `KONSEP DEMO` / `EKSPERIMENTAL`.
4. **Mascot Transparency:** Techwear character is explicitly declared as a visual brand mascot, not a photo of Syahmi AOF.
5. **Zero Data-Loss Inquiry Fallback:** When server email keys are absent, the system logs submissions locally and provides a prefilled one-click `mailto:hello@syahmiaof.my` fallback.

---

## 4. Preserved Original Reference Notes

The following original documentation from the initial character exploration has been preserved intact:

### Digital Brutalism Character Pack V1 Reference

Visual reference pack for the planned SYAHMIAOF website. Design exploration only; no website code is included.

#### Assets

| File | Intended use |
| --- | --- |
| `00_original_B_reference.png` | Original, user-selected Digital Brutalism hero; keep as the art-direction reference |
| `01_hero_B_realistic.png` | Polished original hero with more natural human skin, hair, fabric and lighting |
| `02_character_builder_laptop.png` | Standing, typing on laptop; Services / Web Development sections |
| `03_character_creator_laptop.png` | Seated, typing on laptop; 1:1 Coaching section |
| `04_character_consultant_laptop.png` | Standing, holding closed laptop; About / Contact sections |

The three individual character assets are RGBA PNGs with transparent backgrounds. The full hero screenshots are nontransparent compositions. Preserve their transparency when exporting or optimizing.

#### Visual continuity

- Fictional character, **not a likeness of Syahmi**: adult man with natural tan skin, messy black medium-length hair and angular black sunglasses.
- Wardrobe: black technical windbreaker, black utility trousers and rugged black trainers.
- Art direction: black, concrete textures, acid neon yellow, electric cobalt blue, oversized condensed typography, strong editorial 3D shapes.
- Use the approved original B as the design reference for all future sections. The later browser-sculpture revision is **not** the selected direction.

#### Implementation notes for later

- These are 2D bitmap cutouts, **not actual 3D models**. Use modest parallax, layered reveals and responsive positioning instead of treating them as rigged objects.
- Keep the character from obscuring text or CTAs, especially on mobile.
- Load large images only when needed, provide appropriately sized variants and avoid continuous GPU-heavy effects.
- Visually check face, hands, laptop anatomy and hair-cutout edges before production use. AI-created variants can have small continuity differences.
