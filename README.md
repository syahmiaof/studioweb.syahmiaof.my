# SYAHMIAOF STUDIO — ASTRA V2

**Live Local Production Build:** Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP 3.  
**Target Domain:** `studio.syahmiaof.my` (local build only; not yet connected).  
**Brand:** SYAHMIAOF STUDIO — Frontend Development, Custom Full-Stack Systems & 1:1 Web-Dev Coaching.  

Current local reconstruction evidence: [ASTRA V2 audit](docs/qa/ASTRA_V2_VISUAL_AUDIT.md) and [seven-page before/after comparison](docs/qa/ASTRA_V2_COMPARISON.html). Open the HTML file in a browser. Original references and PNGs are preserved. Earlier QA documents describe V1 and are not current verification.

No deployment was performed. Direct inquiry delivery is not integrated; the UI offers an explicit email-app handoff and never claims a message was sent. WhatsApp stays disabled until a real `NEXT_PUBLIC_WHATSAPP_NUMBER` is configured.

---

## 1. Quick Start & Local Commands

```bash
# Install dependencies
npm install

# Run Vitest unit tests
npm test

# Run local development server (separate .next-dev output)
npm run dev -- --port 3460

# Run production build and start production server
npm run build
npm start -- --port 3461

# In another terminal, with the production server running on 3461
npm run test:e2e
npm run test:e2e:focused
npm run typecheck

# Capture all 7 BM pages at 4 sizes (defaults to dev port 3460)
npm run test:visual -- after
```

Override the browser scripts' server in PowerShell with `$env:BASE_URL='http://localhost:3461'`. Production and development use separate build folders. The old V1 audit remains available as `npm run test:e2e:legacy`; its selectors describe the old UI.

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
      characters/                      # Preserved original transparent PNG cutouts
      optimized/                       # Alpha WebP derivatives and decorative crops
      projects/                        # Concept imagery cropped from approved mockups
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
      layout/                          # Bilingual responsive Header & Footer
      scene/                           # Scoped GSAP scene, architecture and character primitives
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

1. **Deterministic Pricing Engine:** Landing Page RM299, Business Website RM499, Premium Custom Website RM999. Add-ons: Extra standard page (+RM99), Advanced Animation (+RM99) or Cinematic Animation (+RM199; mutually exclusive). Booking request RM499, SME Dashboard Lite from RM999, and advanced systems above RM2,099 require scoped contact flows. Maintenance remains optional and separately billed.
2. **Seamless URL Handoff:** Parameter state is preserved when moving from `/harga` or `/coaching` to `/hubungi`, and across `ms` ↔ `en` language switches.
3. **No Fake Reviews or Testimonials:** Zero fabricated five-star quotes. Concepts are clearly labeled as `KONSEP DEMO` / `EKSPERIMENTAL`.
4. **Mascot Transparency:** Techwear character is explicitly declared as a visual brand mascot, not a photo of Syahmi AOF.
5. **Truthful Inquiry Fallback:** No email provider adapter is integrated. Valid requests receive HTTP 503 with `success: false` and a prefilled `mailto:hello@syahmiaof.my` fallback. Submissions are not stored or logged. Users must complete sending in their email application; environment keys alone do not enable delivery.

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

## ASTRA V2.1 — image-first reconstruction (26 October 2026)

- Approved originals: `design/references/01-home.png` through `07-contact.png`.
- Live UI: `src/components/pages/`, `src/components/scene/StudioScene.tsx`, and `src/styles/astra-v21.css`.
- Runtime plates/crops: `public/assets/astra-v21/`. Lossless clean masters, edit masks and inpaint inputs: `design/derived/astra-v21/`.
- Review: `docs/qa/ASTRA_V21_COMPARISON.html` and `docs/qa/ASTRA_V21_VISUAL_AUDIT.md`.
- Rebuild assets: `node scripts/prepare-astra-v21.cjs`; verify originals and unchanged pixels outside masks: `node scripts/audit-astra-v21-assets.cjs`.
- Visual QA: `node tests/e2e/astra-v21-capture.cjs after`. Set `BASE_URL` for the server, `DPR=2` and `WIDTHS=1440,390` for high-density checks. Do not reuse a stale Next image cache after regenerating plates; update the image version query when changing artwork.
- Production smoke/performance: `node tests/e2e/astra-v21-production.cjs` (default localhost:3461).
- No deployment performed. Original raster resolution limits remain; the project does not claim 4K artwork.
