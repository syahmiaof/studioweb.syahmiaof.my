# SYAHMIAOF STUDIO — ENGINEERING BLUEPRINT V1

**Status:** Approved design / pre-production only. **NO CODE HAS BEEN AUTHORIZED BY THIS DOCUMENT.**  
**Prepared:** 25 October 2026 (Malaysia time)  
**Project:** SYAHMIAOF Studio  
**Target domain:** `studio.syahmiaof.my`  
**Primary language:** Bahasa Melayu (`ms`)  
**Secondary language:** English (`en`)  
**Visual direction:** Digital Brutalism / cinematic interactive web  
**Primary services:** Website development and 1:1 web-development coaching  
**Implementation handoff (after approval):** Antigravity V1 → Astra V2 → QA → deployment

---

## 0. Executive decisions — LOCKED

1. **Seven approved visual references:** Hero/Home, Website Services, Portfolio, Pricing Studio, Coaching 1:1, About Me, Contact/Start Project.
2. **Normal website navigation.** Anyone should be able to scroll, browse and click; there must be no complicated game-like navigation or forced interaction.
3. **Experiential but usable:** roughly equal emphasis on memorable scroll motion and conversion/business information. Interactivity is mostly entrance/exit animation, scrolling, small hover/cursor effects, and a few intentionally chosen 3D scenes.
4. **Language:** Malay by default with prominent BM/EN selector. Both languages must be authored and reviewed; do not ship raw machine-translated interface copy.
5. **Visual assets:** existing approved mockups are references, while transparent character PNGs are standalone foreground assets. A reference screenshot is **not** a single flat webpage background.
6. **Domain:** `studio.syahmiaof.my`. The existing recruiter-facing `syahmiaof.my` portfolio must remain untouched unless Syahmi separately authorizes changes.
7. **Contact:** both inquiry form and WhatsApp quick contact.
8. **Coaching:** 1:1, topics and 60/90-minute choices. Pricing is **not yet finalized**; show “Tanya Slot Coaching,” never invent a price.
9. **No coding, no deployment, no purchases and no outside messages** under this blueprint request. It is the specification for a later build request.

## 1. Product intent and audience

**Primary conversion goal:** visitor chooses a relevant web-development service, sees honest pricing/examples, then contacts Syahmi with a useful brief.  
**Secondary conversion goal:** visitor requests a 1:1 web-development coaching slot.  
**Target audiences:** Malaysian SMEs, entrepreneurs, personal brands, community/education organizations, international customers, beginner/intermediate students seeking coaching.

Value proposition: premium, modern, cinematic websites and practical systems developed by Syahmi AOF. The brand voice is confident, direct, friendly and understandable to nontechnical buyers. Keep technical jargon in detail sections or tooltips.

Success criteria:

- A new visitor can identify **what Syahmi sells**, starting prices, and how to enquire within ~30 seconds.
- Every visual CTA navigates to a real destination or a working action; **no dead or decorative buttons**.
- BM and EN cover the full customer journey, including inquiry validation and transactional responses.
- Designs retain the approved brutalist style across desktop and mobile without unreadable text, overlap or severe lag.

## 2. Information architecture: seven routes plus a scroll-story homepage

| Route | Page | Approved design role | Core action |
|---|---|---|---|
| `/` | Utama / Home | `01` cinematic original B hero | Explore work / Start Project |
| `/servis` | Pembangunan Website | `02` service showcase | View packages / Request quote |
| `/portfolio` | Portfolio | `03` layered project gallery | Open genuine case study / View live work |
| `/harga` | Pricing Studio | `04` live configurator | Calculate estimate / Request quote |
| `/coaching` | Coaching 1:1 | `05` learning showcase | Choose topic + duration / Ask for a slot |
| `/tentang` | Tentang Saya | `06` pointing/throw character pose | Build trust / Discuss a project |
| `/hubungi` | Hubungi / Start Project | `07` dramatic contact finale | Submit inquiry / Chat on WhatsApp |

The **Home page is also a cinematic scrolling journey**: approved hero, short service/portfolio/pricing/coaching/about teasers, and a strong final contact CTA. Dedicated routes contain richer details. Do not duplicate seven enormous, fully interactive pages inside Home; reuse lightweight teaser components and link to dedicated routes. All pages use a consistent header, language switcher and footer.

Suggested navigation: **Utama, Servis, Portfolio, Harga, Coaching, Tentang, Hubungi**. On mobile, a conventional accessible menu replaces the full nav. Current-page state must be visible.

## 3. Design tokens and visual fidelity

### Core look

- Charcoal/near-black surfaces, vivid acid neon yellow, intense cobalt blue, tactile white/grey concrete architecture.
- Massive condensed editorial headings, strong block grids, sharp edge geometry, punchy lines and asymmetry; compact legible body text.
- Physically believable light, texture, shadows, material depth and architectural perspective.
- Sparse but high-impact 3D; deliberate composition rather than endless decorative particles.
- Preserve the personality and complexion/hair/clothing detail of the **fictional visual brand character**. Do **not** imply this is a verified photo or likeness of Syahmi.

**Provisional token examples — verify against selected PNG references before implementation:**

| Token | Starting value | Use |
|---|---|---|
| `color.ink` | `#09090B` | Main dark background |
| `color.concrete` | `#EEEDE8` | Light brutalist sections |
| `color.acid` | `#F3FF00` | Main emphasis / CTA |
| `color.cobalt` | `#103BFF` | 3D backdrop / selected option |
| `color.white` | `#FFFFFF` | Dark-section text |

Do not lock a font merely by guesswork. Identify a suitably licensed **ultra-bold condensed display face** by visual comparison with the seven mockups and a clear sans-serif for body text. Use one type scale and spacing system globally; avoid random one-off values.

### Reference fidelity rules

1. Recreate **real DOM elements**: headings, links, controls, forms, calculator cards. Do not hide functionality behind a screenshot.
2. The mockups have priority for art direction, hierarchy, contrast, balance and hero compositions—not exact desktop pixel coordinates on mobile.
3. Use actual transparent character cutouts as composited layers. Concrete geometry may be real optimized 3D, CSS perspective, image layers or a hybrid, depending on the visual-to-performance tradeoff.
4. Keep UI legible during every animation state; no overlapping typography, disappearing CTAs or layout shift.
5. Reserve enough safe area for responsive variants; mobile needs **designed** framing, not simple desktop downscaling.

## 4. Approved reference and asset manifest

Copy references into `design/references/` and cutouts into `public/assets/characters/` during the later build. Keep original high-quality PNGs unmodified in `design/`; optimized web derivatives go to `public/`. The user already has these files; do not assume they are magically present in a newly created repository.

| Ref | Canonical source filename | Purpose |
|---|---|---|
| 01 | `01_hero_B_realistic.png` | Home / hero B visual and layout |
| 02 | `02_servis_website_v1.png` | Services hero |
| 03 | `03_portfolio_showcase_v1.png` | Portfolio perspective gallery |
| 04 | `04_pricing_studio_v1.png` | Pricing calculator visual |
| 05 | `05_coaching_1on1_v1.png` | Coaching UI |
| 06 | `06_about_me_selected_master_label_moved.png` | **Final approved** About Me; do not use intermediate laptop revisions |
| 07 | `07_contact_start_project_v1.png` | Contact form / WhatsApp / footer |

| Cutout | Purpose |
|---|---|
| `02_character_builder_laptop.png` | Standing builder, services |
| `03_character_creator_laptop.png` | Seated laptop, coaching |
| `04_character_consultant_laptop.png` | Standing laptop, alternate visual |
| `05_character_pointing_throw.png` | Pointing left, About Me character |
| `06_laptop_closed_floating.png` | Independently animated tossed laptop |
| `07_hero_seated_character.png` | **Home hero cutout** with original seated pose |

Asset engineering requirements:

- Original assets are PNG. Keep master PNG intact; export AVIF/WebP at measured quality for website consumption if it saves substantial bytes and preserves hair/alpha quality.
- Correct intrinsic width and height; deliberate crop/object positioning. Prevent layout shift.
- Hero character is a **2D alpha cutout, not a rigged 3D character**. Use parallax/scroll transformation; do not promise physical joint animation.
- Position the separate About Me laptop via independent animation and screen-safe motion path. Do not overlay it on the annotation beside the thigh.
- Replace all generated illustrative portfolio thumbnails with authorized **real screenshots** before representing them as real work. Label demos and concept work truthfully.
- Track asset provenance, licensing, format, size, derivatives and usage on each page.

## 5. Functional page requirements

### 5.1 Home `/`

**Hero:** visual B original, large “WEB YANG BUKAN BIASA.” statement, yellow/cobalt architectural forms, seated cutout foreground. Primary CTA “Lihat Portfolio”, secondary “Mulakan Projek”. Navigation and BM/EN visible. Initial hero should be meaningful before JavaScript animation runs.

**Below hero:** short interactive service showcase, selected real portfolio case studies, price entry point, coaching teaser, trust/about story, concluding project CTA. Use the seven approved visual systems coherently without over-repeating the full forms.

**Motion:** layered heading masks, subtle character vertical parallax, architectural depth on scroll, yellow directional accents. Keep normal browser scroll and back navigation intact.

### 5.2 Servis `/servis`

Two **distinct product categories**:

1. **Frontend / Website UI:** marketing websites, portfolios, landing pages, official-looking presentations, animations, responsive design, links/WhatsApp and client-facing interfaces. Do not imply a functioning database, admin panel or payment system unless separately scoped.
2. **Custom Full-Stack Systems:** accounts/roles, database, dashboards, CMS, booking/order, integrations and business processes subject to an individual specification and quotation.

Show actual package inclusions, exclusions, deliverables, revision limits, responsibility for copy/images, and ownership/handover terms in concise client-friendly language. Add-ons must have clear price effects.

### 5.3 Portfolio `/portfolio`

Real work with images, links and descriptions. Candidate projects from prior context: **SYMI** UI, **Lamborghini** unofficial front-end concept, **UberPokmi** superapp UI demo; add other verified projects once their real URLs, screenshots and usage rights are supplied.

Each project card should store: `slug`, title, short summary, category, **status** (`client` / `self-initiated` / `concept` / `frontend-demo`), stack, role, verified image paths, optional live URL and optional case-study details. If a live link is unavailable, do not render an empty “Live Demo” button. Do not suggest Lamborghini concept is an official affiliated store.

Desktop perspective cards can animate into place, but the gallery must remain easy to inspect and keyboard accessible. Mobile uses a simple stacked/swipe-safe presentation.

### 5.4 Pricing Studio `/harga`

**Current approved pricing configuration (MYR):**

| Website package | Base price |
|---|---:|
| Frontend Landing | RM645 |
| Frontend Business / ~5-page scope | RM1,745 |
| Frontend Premium | RM2,995 |
| Custom full-stack system | **From RM3,250**, manual discovery/quote |

**Available add-ons for frontend calculator:**

| Add-on | Price |
|---|---:|
| Advanced animation | +RM400 |
| Second language for **client website** | +RM250 |

Calculator must be derived from one source of truth, never manually hardcoded separately in cards and total. Formula: `frontend subtotal = selected base package + enabled add-on prices`. Example: Business RM1,745 + animation RM400 + second language OFF = **RM2,145**. Changing package/add-ons updates estimate immediately, accessibly and without jumping layout. The studio's own BM/EN toggle is free website navigation and **unrelated** to the second-language add-on sold to clients.

“Dapatkan Sebut Harga” must transfer selected package, add-ons and computed estimated total into Contact URL state or preserved form state. Show **“Anggaran sahaja. Domain, hosting dan skop tambahan berasingan.”** Make it clear quotes can change after requirements are confirmed. Full-stack is **not** priced by the frontend calculator; CTA sends visitor to custom consultation.

### 5.5 Coaching `/coaching`

Topics: **Asas Web**, **React / Next.js**, **Mentor Projek**. Duration options: **60 min** / **90 min**. No unapproved payment or instant reservation system. Primary action **“Tanya Slot Coaching”** opens `/hubungi` with `service=coaching`, selected topic and duration prefilled, or opens a prefilled WhatsApp enquiry. Explicitly say the schedule and price are confirmed after discussion.

### 5.6 Tentang `/tentang`

Factual positioning: **Syahmi AOF**, Web Developer and IT (Cloud Computing) student at **TVETMARA Besut**; freelance web/digital project work; DFK INC involvement in UI/AI digital marketing as supported by Syahmi's own content. Skill themes: Web Development, UI/UX, Cloud & Deployment, AI Automation.

**No fake credentials, years of professional experience, customer counts, certifications, or awards.** The fictional man is a visual character; tiny annotation “KARAKTER VISUAL JENAMA” at the side of his thigh may remain as in approved mockup. Composite `05_character_pointing_throw.png` plus separate `06_laptop_closed_floating.png`; animate the closed laptop with transform-only motion, in a restrained arc above the open palm.

### 5.7 Hubungi `/hubungi`

Approved concept: giant heading “IDEA KAU. KITA BINA.”, black industrial inquiry panel, category chips, WhatsApp CTA, complete footer and `hello@syahmiaof.my`.

Form fields:

- `service`: `website-ui` | `full-stack` | `coaching` (required; default from CTA when known).
- `name`: required, sensible maximum length.
- `contact`: required **email OR WhatsApp number**; detect and validate the submitted contact format, show an inline error if invalid.
- `message`: required, sensible min/max length.
- Optional pricing context: package ID, add-ons and estimate; it must be revalidated server-side if included.
- Coaching context: topic and duration (if selected).
- Consent checkbox/privacy notice appropriate to the final collection/retention policy (privacy copy pending).

**Two paths:**

1. **WhatsApp:** user-initiated `wa.me` link with a prefilled, readable message assembled from selected service and form context; use Syahmi's verified number when provided. Never hardcode a placeholder as if it were real.
2. **Send inquiry:** validated form submits to a minimal **Next.js Route Handler / Vercel Function** (`POST /api/inquiries`) which dispatches a notification to `hello@syahmiaof.my` via a provider configured later. No database needed for first release unless Syahmi chooses lead history/CRM.

**Critical release rule:** do not show “message sent” unless a real provider confirms success. If the provider or secret is unavailable, leave the public submit path disabled with a truthful alternative (email link/WhatsApp) in development, and mark production launch **blocked** for the inquiry form until configured and end-to-end tested. Never silently discard leads, fake send success or expose provider secrets in the client bundle.

Server-side validation, request size limits, basic abuse/rate protection, honeypot, proper error handling and limited diagnostic logging are mandatory. Do not log full customer personal details in client analytics.

## 6. Internationalization (BM/EN)

- Locales: `ms` (default), `en`; both manually authored translation dictionaries. Proposed implementation: Next.js App Router with `next-intl` or equivalently small, maintainable locale routing. Choose one route strategy before build; preferred visible URLs: `/` as Malay default and `/en` for English, or consistent redirect to `/ms` with explicit hreflang/canonical metadata.
- All seven pages, CTA labels, input validation, FAQs, metadata and success/failure copy included in translation coverage.
- Preserve current route and query state when switching language (e.g. selected pricing package).
- Format MYR prices consistently; do not automatically convert currency or silently change service scope for international visitors.
- English text must read naturally, not mix random Malay except for relevant Malaysian brand/proper nouns.

## 7. Recommended architecture

| Layer | Choice | Reason |
|---|---|---|
| Core | Next.js App Router + TypeScript | Multi-route marketing website, SEO/metadata, typed data, small contact backend |
| Styling | Tailwind CSS + CSS custom properties | Shared design tokens and responsive utilities |
| Motion | GSAP + ScrollTrigger + React integration | Sequenced entrance/exit timelines, responsive scroll triggers |
| 3D | CSS perspective first; selective Three.js/React Three Fiber | High visual impact without permanent heavy WebGL scenes |
| i18n | `next-intl` + reviewed BM/EN dictionaries (subject to integration check) | Structured translations and routing |
| Data | Local typed config + content objects | No CMS/database needed for V1 marketing content |
| Contact server | Next.js Route Handler on Vercel Functions | Lightweight server-side email dispatch and validation |
| Testing | Unit tests + Playwright browser checks | Calculator logic, navigation, form, responsive QA |
| Deploy | Vercel preview → reviewed production | Isolated preview/production and domain linking |

**Avoid unnecessary V1 infrastructure:** no auth, no customer account database, no queue, no workflow engine, no n8n pipeline, no payment gateway or CMS until there is a proven use case. A small inquiry API does **not** make the whole service website a client-oriented full-stack product.

## 8. Proposed repository layout (target, not yet created)

```text
syahmiaof-studio/
  docs/
    engineering/ENGINEERING_BLUEPRINT_V1.md
    design/APPROVED_REFERENCES.md
    qa/ACCEPTANCE_CHECKLIST.md
  design/
    references/01-hero.png ... 07-contact.png
  public/
    assets/
      characters/02-...png ... 07-...png
      projects/<verified-screenshots>/
      textures/<licensed-and-optimized>/
      og/<social-preview-images>/
  src/
    app/
      [locale]/
        page.tsx
        servis/page.tsx
        portfolio/page.tsx
        harga/page.tsx
        coaching/page.tsx
        tentang/page.tsx
        hubungi/page.tsx
      api/inquiries/route.ts
    components/
      layout/
      ui/
      scenes/
      motion/
      forms/
      pricing/
    content/
      projects.ts
      services.ts
      pricing.ts
      coaching.ts
    i18n/
      ms.json
      en.json
    lib/
      validation/
      contact/
      pricing/
    styles/
      tokens.css
  tests/
    unit/
    e2e/
```

**Routing reconciliation:** the example tree illustrates locale route grouping; route visibility policy (`/` vs `/ms`) must be fixed during bootstrap, including locale switcher and canonical URLs. The real code structure must align with the chosen i18n integration; no duplicate route copies.

## 9. Motion & 3D storyboard / performance guardrails

| Surface | Desktop experience | Mobile / reduced-motion fallback |
|---|---|---|
| Hero | Staggered typographic reveal, slow layered character parallax, concrete depth | Fast simple fade, cropped foreground character, no continuous heavy 3D |
| Services | Angular wipe transition, card stagger, short perspective shift | Sequential reveal, readable stacked cards |
| Portfolio | Perspective panels enter with GSAP, hover lift | Static/staggered cards; swipe optional only if accessible |
| Pricing | Highlight and estimate-number transition | No motion that interrupts input; static math updates |
| Coaching | Topic chip micro-interaction, seated character reveal | Simple selected state, no complex scene |
| About | Label/title reveal, pointing character + independent flying closed laptop | Safe anchored pose; simplify laptop motion |
| Contact | Concrete 07 depth, yellow arrow sweep, form entrance | Static form immediately usable, WhatsApp accessible |

Engineering constraints:

1. Prioritize **opacity/transforms** over expensive layout/property animation; stagger modestly. Reuse shared motion variants.
2. Use GSAP cleanup/scoping correctly with React and media-condition choreography; tear down ScrollTriggers on route changes/unmounts.
3. Respect `prefers-reduced-motion` including reduced parallax/cursor followers. Never make content contingent on animation completing.
4. No mandatory scroll-jacking or giant pinned sequences preventing navigation. Keep browser native scrolling.
5. Limit real-time WebGL to one or two scenes that materially improve the site. Render on demand when appropriate, cap device pixel ratio, pause offscreen, provide static fallback for mobile/low-power.
6. Prevent title/body overlaps at responsive breakpoints; test when loading fonts late and during scroll reversal.
7. Cursor-follow effects are desktop-only decorative layers; `pointer-events: none`, no interference with controls, no added latency to scrolling.
8. Asset files need correct sizes, compression and lazy loading. Preload only the true LCP hero media; lazy-load below-fold textures/3D.

## 10. Quality, accessibility, SEO and security acceptance

### Accessibility & UX

- Semantic heading order, correct landmarks, skip-to-content, keyboard navigation and visible focus.
- All form controls have programmatic labels, inline validation and actionable errors; no color-only indicators.
- Hover effects have keyboard/touch equivalents. Anchor/link click areas remain comfortably tappable.
- Responsive layouts at **360, 390, 768, 1024, 1440 and 1920 px**; check no clipped critical text or horizontal overflow.
- Reduced-motion option leaves all CTAs/forms functional. Avoid autoplay sound and flashing effects.

### Performance targets (aspirational, measured—not claimed)

- Aim for good Core Web Vitals at real users' 75th percentile: **LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1**. Animated desktop visuals are not permission to disregard low-end mobile.
- Check with production builds, browser performance profiles and field metrics after launch. Set explicit budgets for hero assets, page JS and costly animation effects during V1; document measured tradeoffs.
- Avoid blocking font/CDN loads and unnecessary third-party scripts. Never ship original multi-megabyte reference mockups as the entire page image.

### SEO

- Unique BM/EN title and meta description per route, canonical/hreflang links, sitemap, robots rules and social preview.
- Meaningful alt text for informative images; empty alt for purely decorative images.
- No unsupported structured data such as fake company registration, reviews or awards.

### Security, privacy & integrity

- Keep secret tokens server-side, validated form input, spam/rate protection, no source maps or logs exposing visitor messages.
- Show privacy notice for submitted contact details, retain only what is necessary, obtain approval for final policy copy before public deployment.
- Production must not contain fake portfolios/testimonials, placeholder WhatsApp number or stubbed email submission.

## 11. Functional acceptance scenarios

1. **Pricing:** select Business → RM1,745; enable Advanced Animation → RM2,145; enable Second Language → RM2,395; disable one → correct subtraction. Switching package updates total; never negative, never `NaN`.
2. **Quote handoff:** select Business+Animation → “Dapatkan Sebut Harga” → `/hubungi` preserves service, package and RM2,145 estimate in customer-facing summary and inquiry payload.
3. **Coaching handoff:** select React/Next.js + 90 min → “Tanya Slot Coaching” → correct topic/duration prefill, no invented price.
4. **BM/EN:** switch language on `/harga` with package selected; route and pricing state survive, labels change consistently, currency remains RM.
5. **Contact email:** invalid email/phone blocks submission with error; valid form calls real endpoint; success only on provider acknowledgment; provider outage yields explicit retry/WhatsApp alternative.
6. **WhatsApp:** checked real number; text correctly encodes the enquiry and opens an external WhatsApp destination only on direct user action.
7. **Portfolio:** concept/demo cards clearly labeled; broken/unverified live links not rendered.
8. **Navigation:** all seven routes, header, footer, CTAs and browser back/forward work on desktop and mobile.
9. **Accessibility:** tab through menu, cards and form; reduced-motion viewport still shows all content and controls.
10. **Visual QA:** screenshot compare each approved reference at desktop; mobile QA guided by brand principles, not forced 1:1 crop.

## 12. Build governance & named agent ownership (later Antigravity V1)

**Jebat — Lead Orchestrator:** source of truth for all seven design references, this blueprint, decisions and integration gates.

Suggested named agents / scopes after Syahmi authorizes coding:

| Agent | Responsibility | Ownership boundary |
|---|---|---|
| **Bentara — Repo & Architecture** | Inspect environment, bootstrap, routing, shared tokens, types, translations strategy | Shared architecture files; finishes bootstrap before page agents integrate |
| **Wira — Home & Services** | Hero, Home teasers, Services route | Own page/scene files only |
| **Panglima — Portfolio** | Real screenshot gallery, case study/data components | Portfolio route and content models |
| **Laksamana — Pricing & Contact** | Pricing math, quote handoff, inquiry form / validation | Pricing/Contact modules and tests |
| **Cendekia — Coaching & About** | Coaching selection flow and factual About | Coaching/About route files |
| **Bayu — Motion & 3D** | Shared GSAP motion direction, performance overlays | Motion modules; integrates through component APIs |
| **Mata — Visual QA & Accessibility** | Screenshot review, regression tests, reduced motion, mobile | Read-only audit reports, test files; fixes routed to owner |

The user prefers **multi-agent parallel development**, but agents must **not simultaneously edit shared routing/layout/config**. Jebat assigns component contracts, file ownership and merge order before parallel work. Subagents do not install arbitrary GitHub skills without provenance/licensing review. Reuse applicable existing GSAP/Next.js **skills and engineering patterns** from prior projects (e.g. Nemo), **not previous project's UI designs**.

Build waves:

1. **Bootstrap wave:** Jebat/Bentara set repo structure, tokens, routes, data, i18n skeleton and quality scripts; baseline build passes.
2. **Page wave:** independent page agents implement their owned routes against locked references; regular short integration checkpoints.
3. **Motion wave:** Bayu attaches unified timelines without breaking SSR, mobile or forms; performance budgets measured.
4. **Verification wave:** Mata compares screenshots, keyboard/mobile paths and interactive flows; owners repair; rerun tests. Repeat repair → test → repair until gates pass.
5. **Freeze V1:** generate a concise report, list deviations/TODOs and screenshots; then only Syahmi may approve handoff to Astra V2.

**Astra V2 scope:** fidelity polish, typography/spacing, coherent transitions, subtle 3D, asset composition, performance tuning, rigorous visual diff and cross-device QA. It must not invent new product requirements or silently change pricing/business policy.

## 13. Required files/reports from each future build iteration

1. Clean build/test results and local preview instructions.
2. Screenshot QA: desktop and mobile for all seven routes, with visual diff notes against approved mockups.
3. Function checklist: calculator, BM/EN, nav, coaching handoff, contact, WhatsApp, error states.
4. Asset/performance budget report; top expensive images/JS/3D and fixes applied.
5. Open issue log with severity and owner; no “all done” claim while a blocking requirement is unverified.
6. Deployed preview URL only after local pass and Syahmi's authorization; domain production only after final sign-off.

## 14. Outstanding user inputs — DO NOT INVENT

| Item | Current status | Blocks |
|---|---|---|
| WhatsApp destination number (international format) | **Missing** | Functional quick-chat launch |
| Inquiry email delivery provider/credentials, e.g. SMTP/email API | **Missing** | Functional server-backed form launch |
| Coaching final price, slot availability and booking policy | **Unconfirmed** | Public price/instant booking; inquiry-only page can ship |
| Real portfolio screenshots, verified URLs, rights and project labels | **Needs final asset verification** | Honest production portfolio publishing |
| Final client package scope, revision policy, domain/hosting terms | **Needs copy/contract review** | Public purchase commitments; not needed for visual MVP |
| Final EN translations | **Not yet written** | Bilingual production release |
| Privacy notice, inquiry data retention | **Needs final approval** | Public lead-collection release |
| Repo hosting / GitHub access | **Verify** (previously reported account suspension) | Remote CI/push; local development can still proceed |
| Vercel account plan and subdomain DNS access | **Verify later** | Production publication |

Defaults pending input: coach price remains **inquiry-only**, production email route remains **blocked until provider verification**, live link only on verified projects, domain/hosting costs disclosed separately. Do not assume missing data from the visual mockups.

## 15. Definition of Done and handoff sequence

**Blueprint V1 done** when Syahmi approves this document and outstanding choices are accurately labeled. This document's existence alone **does not authorize coding**.

**Antigravity V1 done** when every route functions, reference hierarchy is recognizable, responsive layouts pass, calculator math and request state work, contact paths are truthful, build and tests pass, and all known blockers are reported.

**Astra V2 done** when all critical visual gaps are addressed, desktop/mobile motion is polished, performance is verified, no text overlaps occur and a final audit report exists.

**Launch ready** when Syahmi approves V2, actual portfolio/live links, WhatsApp number, email delivery, privacy copy, deployment plan, security and device QA. Domain switch to `studio.syahmiaof.my` must not change or overwrite `syahmiaof.my`.

### Immediate next action

1. Syahmi reviews and approves/edits **this blueprint**.
2. Resolve non-blocking final choices where convenient; prioritize WhatsApp, email provider, actual project screenshots before production.
3. On a **separate explicit coding request**, write Antigravity's V1 master implementation prompt with file ownership, acceptance checks and approved asset references.
4. Antigravity builds V1 → repair/test cycles → Syahmi reviews → Astra V2 polish.

---

## Reference documentation (verified in October 2026)

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)
- [next-intl routing configuration](https://next-intl.dev/docs/routing/configuration)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)
- [React Three Fiber performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Core Web Vitals](https://web.dev/articles/vitals)

**Change control:** Any later decisions supersede a specific item only when recorded with date and rationale in this document. Keep approved source mockups intact and version the blueprint (`V1.1`, `V2`) rather than silently altering scope.
