# Layout Recommendation Report: Coaching, About & Contact Views
**Milestone 2 Explorer 3 (Layout Specialist)**  
**Target Routes**: `/coaching`, `/tentang`, `/hubungi` (and bilingual `/en/*` counterparts)  
**Date**: 2026-10-25  

---

## 1. Executive Summary & Architectural Vision

This report provides the exact layout architectures, component restructurings, DOM trees, CSS/Tailwind specifications, and interface contracts for the final three routes of the SYAHMIAOF Studio application:
- **Route 05 — Coaching (`CoachingView.tsx`)**: Reconstructed from the approved mockup `design/references/05-coaching.png`. Integrates the colossal cobalt blue plinth (`ArchitecturalPlinth05`), the seated techwear creator character (`03_character_creator_laptop.png`) anchored on a concrete cube platform, high-density 60m/90m duration selector pins, topic selector pills, parameter handoffs to `/hubungi`, and detailed curriculum track cards.
- **Route 06 — About Me (`AboutView.tsx`)**: Reconstructed from `design/references/06-about.png`. Introduces the high-contrast **Light Concrete Brutalist Canvas** with deep cobalt polygons and yellow diagonal hazard stripes, the iconic headline `"SAYA SYAHMI AOF."` with `"SYAHMI"` encased in the acid yellow `BrutalistBanner` block, dual-asset staging (pointing creator `05_character_pointing_throw.png` + suspended laptop `06_laptop_closed_floating.png`), the protected brand annotation `"KARAKTER VISUAL JENAMA"` with a technical leader line, 3 credential badges, and factual biography.
- **Route 07 — Contact (`ContactView.tsx`)**: Reconstructed from `design/references/07-contact.png`. Features the monumental 3D architectural numeral `"07"` (`ArchitecturalNumeral07`), the dynamic sweeping yellow brutalist curved arrow (`BrutalistArrow variant="curved-contact"`), the industrial terminal console (`MULA PROJEK ANDA`), active quote/coaching context extraction from URL parameters, an anti-spam honeypot (`website_pot`), and an honest HTTP 503 mailto fallback.

---

## 2. Route 05: Coaching Studio (`CoachingView.tsx`)

### 2.1 Visual Reference vs Current State Gap Analysis
| Element | Reference Mockup (`05-coaching.png`) | Current Implementation (`CoachingView.tsx`) | Required Restructuring |
|---|---|---|---|
| **Atmosphere / Floor** | Deep dark concrete backdrop with cobalt architectural panels, hazard yellow diagonal light beams, reflective floor with specular glow | Flat dark `#09090b` page, standard vertical spacing, no reflective floor | Add `ReflectiveFloor` at base, slicing diagonal hazard beam (`-rotate-25 bg-acid`), cobalt grid backdrop |
| **Headline** | Condensed monumental 3-line headline: `BELAJAR.` (white), `BINA.` (acid yellow), `DEPLOY.` (white) | Standard 1-line `text-4xl sm:text-7xl` uppercase title | Restructure to 3 stacked display lines with Oswald font-black, tight line height `leading-[0.88]` |
| **Architectural Plinth & Numeral** | Colossal cobalt blue "05" plinth with concrete 3D numerals in the right half | None. Standard 2-column layout with character in a small aspect-square box | Integrate `ArchitecturalPlinth05` with colossal 3D numerals and concrete cube platform |
| **Character Cutout** | `03_character_creator_laptop.png` seated naturally on top of the concrete cube pedestal | Character placed inside a regular card frame on right column | Position cutout anchored directly on top of the concrete platform slot of `ArchitecturalPlinth05` |
| **Configurator Console** | Compact brutalist card with 2 horizontal selection rows: `1. PILIH TOPIK` (3 pills) and `2. DURASI SESI` (2 pins), yellow button `Tanya Slot Coaching →` | Large vertical card list taking up 7 columns on desktop | Implement high-density horizontal radio pill rows matching the mockup; move comprehensive curriculum breakdown below hero |
| **Parameter Handoff** | Clean link to `/hubungi?service=coaching&topic=[id]&duration=[duration]` | Working function exists | Retain exact parameters and ensure duration values match (`"60"` and `"90"`) |

### 2.2 Component Hierarchy & DOM Structure
```
CoachingView (Root Container, min-h-screen bg-ink)
├── Header (locale)
├── main (flex-grow pt-20)
│   ├── Hero Stage (relative min-h-[90vh] flex items-center overflow-hidden border-b border-zinc-800 bg-grid-pattern)
│   │   ├── Background Atmosphere
│   │   │   ├── Slicing Diagonal Acid Beam (-rotate-25 bg-acid/20 h-16 w-[140%])
│   │   │   ├── Cobalt Ambient Glow (bg-cobalt/25 blur-3xl)
│   │   │   └── ReflectiveFloor (glowColor="cobalt", absolute bottom-0)
│   │   └── Container (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-12 gap-8)
│   │       ├── Left Column (lg:col-span-6 space-y-6 z-20)
│   │       │   ├── Technical Breadcrumb: [ 05 / COACHING 1:1 ]
│   │       │   ├── Monumental 3-Line Headline:
│   │       │   │   ├── BELAJAR. (text-white)
│   │       │   │   ├── BINA. (text-acid)
│   │       │   │   └── DEPLOY. (text-white)
│   │       │   ├── Subtitle: "Bimbingan hands-on, daripada asas web hingga projek sebenar."
│   │       │   └── Compact Configurator Console (border border-zinc-800 bg-surface/90 backdrop-blur)
│   │       │       ├── 1. PILIH TOPIK (Horizontal pill row: Asas Web | React / Next.js | Mentor Projek)
│   │       │       ├── 2. DURASI SESI (Horizontal pill row: 60 min | 90 min)
│   │       │       ├── Primary CTA Button: "Tanya Slot Coaching →" (bg-acid text-ink)
│   │       │       └── Microcopy: "Online • 1:1 • Bahasa Melayu / Harga dan jadual disahkan..."
│   │       └── Right Column (lg:col-span-6 relative flex items-center justify-center min-h-[460px] lg:min-h-[560px] z-10)
│   │           └── ArchitecturalPlinth05 (Colossal 05 + Concrete Cube Platform)
│   │               └── Anchored Seated Creator Cutout (03_character_creator_laptop.png)
│   └── Curriculum Track Details Section (py-16 bg-surface border-t border-zinc-800)
│       └── 3 Detailed Track Cards (HTML5/CSS -> React/Next.js -> Mentorship & Code Review)
└── Footer (locale)
```

### 2.3 Interactive Topic Selector & Duration Pins Specification
1. **Topic Selector Pills (`1. PILIH TOPIK`)**:
   - Array of 3 items:
     - `web-fundamentals` ("Asas Web")
     - `react-next` ("React / Next.js")
     - `project-mentorship` ("Mentor Projek")
   - Inactive Pill Style: `bg-ink/80 border border-zinc-800 text-zinc-300 hover:border-zinc-700 px-3 sm:px-4 py-2.5 text-xs font-mono flex items-center gap-2 cursor-pointer transition-all`
   - Active Pill Style: `bg-cobalt border-2 border-cobalt-light text-white font-bold shadow-[0_0_15px_rgba(16,59,255,0.4)] px-3 sm:px-4 py-2.5 text-xs font-mono flex items-center gap-2 cursor-pointer transition-all`
   - Radio indicator: Circle `w-3.5 h-3.5 rounded-full border border-zinc-600 flex items-center justify-center`. When active: contains an inner acid yellow dot `<span className="w-1.5 h-1.5 rounded-full bg-acid" />`.
2. **Duration Selector Pins (`2. DURASI SESI`)**:
   - Array of 2 items:
     - `60`: Label `"60 min"` (or `"60 Minit"` to preserve E2E selector compatibility)
     - `90`: Label `"90 min"` (or `"90 Minit"`)
   - Inactive Pill Style: `bg-ink/80 border border-zinc-800 text-zinc-300 hover:border-zinc-700 px-5 py-2.5 text-xs font-mono flex items-center gap-2 cursor-pointer`
   - Active Pill Style: `bg-cobalt border-2 border-cobalt-light text-white font-bold shadow-[0_0_15px_rgba(16,59,255,0.4)] px-5 py-2.5 text-xs font-mono flex items-center gap-2 cursor-pointer`
3. **Primary CTA & Handoff**:
   - Route URL: `${locale === "en" ? "/en/hubungi" : "/hubungi"}?service=coaching&topic=${selectedTopicId}&duration=${selectedDuration}`
   - Preserves exact parameter format verified in E2E tests: `service=coaching`, `topic=react-next`, `duration=90`.

### 2.4 Concrete Plinth & Character Anchoring Details
- The component `ArchitecturalPlinth05` contains:
  1. Deep cobalt architectural panel backdrop (`bg-cobalt` with industrial seam lines and diagonal hazard yellow light beam).
  2. Colossal 3D concrete "05" structure via SVG polygon extrusions.
  3. Foreground concrete cube platform at `bottom-0 right-10` with tag `[PLATFORM_05 // TVETMARA]`.
- Inside the platform slot, render:
  ```tsx
  <div className="absolute -top-32 sm:-top-44 -left-6 sm:-left-10 w-72 sm:w-96 aspect-square pointer-events-none z-30">
    <Image
      src="/assets/characters/03_character_creator_laptop.png"
      alt="Syahmi AOF Coaching Mentor"
      width={1024}
      height={1536}
      priority
      className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
    />
  </div>
  ```
  This creates the visual anchoring where the character is seated directly on top of the concrete cube pedestal in front of the colossal "05".

---

## 3. Route 06: About Me (`AboutView.tsx`)

### 3.1 Visual Reference vs Current State Gap Analysis
| Element | Reference Mockup (`06-about.png`) | Current Implementation (`AboutView.tsx`) | Required Restructuring |
|---|---|---|---|
| **Canvas & Theme** | High-contrast **Light Concrete Architectural Wall** (`#E4E4DE` / `#DCDCD6`) with bold cobalt polygon blocks and yellow hazard bands | Dark ink `#09090b` theme with standard text cards | Implement the Light Concrete Brutalist theme for the hero canvas, contrasting black typography with vivid yellow & cobalt accents |
| **Headline** | `SAYA` (black), `SYAHMI` (acid yellow block), `AOF.` (black) | Standard white title `t.about.title` | Integrate `BrutalistBanner` with exact 3-line layout and skewed acid yellow block |
| **Dual-Asset Composition** | Pointing character (`05_character_pointing_throw.png`) on the right pointing left, and floating closed laptop (`06_laptop_closed_floating.png`) suspended above hand | Character inside a dark card with floating laptop bouncing directly over character's face | Separate into full-bleed dual-asset staging with character standing on concrete base and laptop floating dynamically |
| **Protected Annotation** | Technical leader line beside character's thigh labeled `KARAKTER VISUAL JENAMA` | Small flat badge stuck at bottom of image card | Implement precision SVG leader line pointing at character's thigh with crisp brutalist 2-line label |
| **Credential Badges** | 3 horizontal dark brutalist cards: TVETMARA Besut (cap), Freelance Web Dev (laptop), DFK INC (chart) | Vertical stacked list in left column | Lay out 3 high-contrast credential cards in a responsive horizontal grid |
| **Capability Badges & CTAs** | 4 code/UI/cloud/AI chips + dual buttons `Lihat Portfolio →` and `Bincang Projek →` | Generic skill list and single button | Implement exact 4 category chips and dual high-contrast action buttons |

### 3.2 Component Hierarchy & DOM Structure
```
AboutView (Root Container, min-h-screen bg-ink)
├── Header (locale)
├── main (flex-grow pt-20)
│   ├── Hero Stage (relative min-h-[92vh] flex items-center overflow-hidden bg-[#DCDCD6] text-ink border-b-2 border-zinc-900)
│   │   ├── Architectural Concrete Backdrop
│   │   │   ├── Concrete Formwork Pattern (subtle grid & tie-rod anchors)
│   │   │   ├── Slanted Cobalt Blue Blocks (absolute polygon geometry fill="#103BFF")
│   │   │   └── Diagonal Hazard Yellow Speed Stripes (absolute -rotate-25 bg-acid)
│   │   └── Container (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-8 items-center)
│   │       ├── Left Column (lg:col-span-7 space-y-6 z-20)
│   │       │   ├── Technical Breadcrumb: [ 06 / TENTANG SAYA ]
│   │       │   ├── Brutalist Banner Headline:
│   │       │   │   ├── SAYA (colossal text-ink)
│   │       │   │   ├── SYAHMI (BrutalistBanner high-contrast acid yellow block)
│   │       │   │   └── AOF. (colossal text-ink)
│   │       │   ├── Subtitle: "Pembangun Web & Pelajar IT (Cloud Computing)"
│   │       │   ├── Bio Statement: "Saya reka dan bina website yang unik, responsif..."
│   │       │   ├── 3 Credential Badges Row (TVETMARA BESUT | FREELANCE WEB DEV | DFK INC)
│   │       │   ├── 4 Capability Chips (</> Web Dev | ✏️ UI/UX | ☁️ Cloud & Deploy | ⚙️ Automasi AI)
│   │       │   └── Dual Action Buttons:
│   │       │       ├── Primary: "Lihat Portfolio →" (bg-acid text-ink border-2 border-ink shadow-brutal)
│   │       │       └── Secondary: "Bincang Projek →" (bg-ink text-white border-2 border-ink)
│   │       └── Right Column (lg:col-span-5 relative flex items-center justify-center min-h-[520px] lg:min-h-[640px] z-10)
│   │           ├── Floating Closed Laptop (06_laptop_closed_floating.png at top right, -rotate-12)
│   │           ├── Standing Pointing Creator Cutout (05_character_pointing_throw.png)
│   │           └── Protected Annotation:
│   │               ├── SVG Leader Line (elbow pointer pointing to thigh)
│   │               └── Annotation Tag: "KARAKTER VISUAL \n JENAMA"
│   └── Deep Background & Integrity Section (py-16 bg-ink text-white border-t border-zinc-800)
│       └── Detailed Bio, Academic Background at TVETMARA Besut & Forensic Ethics Disclosure
└── Footer (locale)
```

### 3.3 Light Concrete Canvas & Typography Tokens
- Hero Canvas: `bg-[#DCDCD6]` (or `bg-[#E4E4DE]`).
- On this light canvas:
  - `SAYA`: `font-display font-black text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter text-ink leading-[0.85]`
  - `SYAHMI`: Encased in `BrutalistBanner` or styled block:
    `<div className="bg-acid text-ink px-4 sm:px-6 py-1 sm:py-2 border-4 border-ink shadow-brutal-dark inline-block transform -skew-x-2 my-1.5">`
  - `AOF.`: `font-display font-black text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter text-ink leading-[0.85]`
  - Subhead: `text-xl sm:text-2xl font-bold text-ink leading-snug`
  - Body: `text-base sm:text-lg text-zinc-800 max-w-xl leading-relaxed`

### 3.4 3 Credential Badges Specification
Rendered in a 3-column responsive card row:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
  {/* Badge 1: TVETMARA */}
  <div className="bg-ink text-white p-4 border border-zinc-800 flex items-start gap-3 shadow-md">
    <GraduationCap className="w-5 h-5 text-acid shrink-0 mt-0.5" />
    <div>
      <div className="font-display font-bold text-xs uppercase tracking-wider text-white">TVETMARA BESUT</div>
      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Cloud Computing</div>
    </div>
  </div>

  {/* Badge 2: Freelance */}
  <div className="bg-ink text-white p-4 border border-zinc-800 flex items-start gap-3 shadow-md">
    <Laptop className="w-5 h-5 text-acid shrink-0 mt-0.5" />
    <div>
      <div className="font-display font-bold text-xs uppercase tracking-wider text-white">FREELANCE WEB DEV</div>
      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Design • Build • Deploy</div>
    </div>
  </div>

  {/* Badge 3: DFK INC */}
  <div className="bg-ink text-white p-4 border border-zinc-800 flex items-start gap-3 shadow-md">
    <BarChart3 className="w-5 h-5 text-acid shrink-0 mt-0.5" />
    <div>
      <div className="font-display font-bold text-xs uppercase tracking-wider text-white">DFK INC</div>
      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">AI Digital Marketing</div>
    </div>
  </div>
</div>
```

### 3.5 Protected Annotation ("KARAKTER VISUAL JENAMA") Implementation
Beside the character's thigh (viewer's bottom right of the character cutout):
```tsx
<div className="absolute bottom-20 right-2 sm:right-6 z-30 pointer-events-none select-none">
  {/* Technical Pointer Leader Line */}
  <svg className="w-36 h-20 -mb-2 overflow-visible" viewBox="0 0 140 80" fill="none">
    <path d="M 10 55 L 60 20 L 135 20" stroke="#09090B" strokeWidth="2" />
    <circle cx="10" cy="55" r="3.5" fill="#09090B" />
  </svg>
  {/* Annotation Tag */}
  <div className="bg-ink text-white border-2 border-ink px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase shadow-brutal-dark inline-block">
    <div className="text-acid">KARAKTER VISUAL</div>
    <div>JENAMA</div>
  </div>
</div>
```

---

## 4. Route 07: Contact Terminal (`ContactView.tsx`)

### 4.1 Visual Reference vs Current State Gap Analysis
| Element | Reference Mockup (`07-contact.png`) | Current Implementation (`ContactView.tsx`) | Required Restructuring |
|---|---|---|---|
| **Atmosphere & Floor** | Dark reflective wet floor with yellow and cobalt specular gloss reflections | Standard flat dark page, no reflective floor | Add `ReflectiveFloor glowColor="dual"` at the base |
| **Monumental 3D Numeral** | Massive 3D extruded numeral `"07"` (`ArchitecturalNumeral07`) with cobalt rim lighting behind console | None. Standard form layout | Integrate `ArchitecturalNumeral07` positioned dramatically behind the terminal console |
| **Dynamic Curved Arrow** | Sweeping dynamic yellow brutalist curved arrow (`BrutalistArrow variant="curved-contact"`) sweeping across plinths and pointing at the console | None | Integrate `BrutalistArrow variant="curved-contact"` spanning from bottom-left to center-right |
| **Terminal Console Header** | High-contrast industrial header: `MULA PROJEK ANDA` (`MULA` in white, `PROJEK ANDA` in acid yellow) | Standard title: `t.contact.formTitle` | Rebuild terminal header with monumental Oswald typography and neon yellow accent |
| **Service Selector (Field 1)** | 3 horizontal radio cards with icons: `Website UI` (selected), `Sistem Lengkap`, `Coaching 1:1` | Standard 3-column button group | Style as industrial radio cards with icons (`Laptop`, `Cog`, `User`) and selected indicator dot |
| **Active Ingress Card** | Displays quote/coaching context directly inside the terminal console | Placed in left column outside the form | Position active quote/coaching summary card directly at the top of the terminal console |
| **WhatsApp Button** | Dark pill with yellow border `Chat WhatsApp →` and microcopy `Pertanyaan awal adalah percuma.` | Standard card with disabled status | Rebuild as prominent action button with honest status modal/pill for unconfigured number |
| **Anti-Spam & Fallback** | Hidden `website_pot` honeypot and honest 503 fallback button `mailto:hello@syahmiaof.my` | Existing logic works | Preserve 100% of the working API submission, honeypot, and mailto fallback |

### 4.2 Component Hierarchy & DOM Structure
```
ContactView (Root Container, min-h-screen bg-ink)
├── Header (locale)
├── main (flex-grow pt-20)
│   ├── Stage Canvas (relative min-h-[92vh] flex items-center overflow-hidden border-b border-zinc-800 bg-grid-pattern)
│   │   ├── Reflective Floor (ReflectiveFloor glowColor="dual", absolute bottom-0)
│   │   ├── Monumental Numeral "07" (ArchitecturalNumeral07, absolute center-right opacity-30)
│   │   ├── Dynamic Curved Arrow (BrutalistArrow variant="curved-contact", absolute bottom-12 left-6 z-20)
│   │   └── Container (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-12 gap-8 items-start)
│   │       ├── Left Column (lg:col-span-5 space-y-8 relative z-20)
│   │       │   ├── Technical Breadcrumb: [ 07 / HUBUNGI ]
│   │       │   ├── Monumental 2-Line Headline:
│   │       │   │   ├── IDEA KAU. (text-white)
│   │       │   │   └── KITA BINA. (text-acid)
│   │       │   ├── Subtitle: "Ceritakan projek anda. Saya bantu jadikan ia realiti."
│   │       │   ├── WhatsApp Action Block:
│   │       │   │   ├── Button: "Chat WhatsApp →" (border-2 border-acid bg-ink)
│   │       │   │   └── Microcopy: "Pertanyaan awal adalah percuma."
│   │       │   └── Direct Email Card: hello@syahmiaof.my
│   │       └── Right Column: Industrial Terminal Console (lg:col-span-7 relative z-20)
│   │           └── Terminal Console Container (border-2 border-zinc-800 bg-surface/95 backdrop-blur-md p-6 sm:p-8)
│   │               ├── Terminal Header: "MULA PROJEK ANDA"
│   │               ├── Ingress Parameter Context Card (if ?estimate=... or ?coaching=...)
│   │               └── Form (onSubmit={handleSubmit})
│   │                   ├── Honeypot Trap (<input name="website_pot" className="hidden" />)
│   │                   ├── 1. SERVIS DIPERLUKAN (3 Cards: Website UI | Sistem Lengkap | Coaching 1:1)
│   │                   ├── 2. NAMA (Input with User Icon)
│   │                   ├── 3. EMEL / WHATSAPP (Input with Mail Icon)
│   │                   ├── 4. CERITAKAN IDEA ANDA (Textarea with FileText Icon)
│   │                   ├── Submit Button: "Hantar Pertanyaan →" (bg-acid text-ink shadow-brutal)
│   │                   └── Honest Fallback Alert (HTTP 503 Provider Pending Config + direct mailto button)
└── Footer (locale)
```

### 4.3 Ingress URL Parameter Handling Specification
The terminal console must dynamically read and display incoming parameters:
1. **From `/harga` (Pricing Studio)**:
   - Parameters: `?service=website-ui&package=[id]&addons=[addons]&estimate=[total]`
   - Render Active Quote Banner:
     ```tsx
     {paramEstimate && (
       <div className="p-4 bg-acid/10 border border-acid font-mono text-xs space-y-1 mb-6">
         <div className="flex items-center gap-2 text-acid font-bold">
           <Calculator className="w-4 h-4" />
           <span>[ SEBUT HARGA AKTIF: {packageInfo?.name[locale] || paramPackage} ]</span>
         </div>
         <div className="text-zinc-200">
           Anggaran: <span className="font-bold text-acid">{formatMYR(Number(paramEstimate))}</span>
           {paramAddons && <span className="text-zinc-400"> • Ciri: {paramAddons}</span>}
         </div>
       </div>
     )}
     ```
2. **From `/coaching` (Coaching Studio)**:
   - Parameters: `?service=coaching&topic=[id]&duration=[duration]`
   - Render Active Coaching Banner:
     ```tsx
     {paramTopic && (
       <div className="p-4 bg-cobalt/15 border border-cobalt font-mono text-xs space-y-1 mb-6">
         <div className="flex items-center gap-2 text-cobalt-light font-bold">
           <GraduationCap className="w-4 h-4" />
           <span>[ SESI COACHING AKTIF: {paramTopic.toUpperCase()} ]</span>
         </div>
         <div className="text-zinc-200">
           Durasi: <span className="font-bold text-cobalt-light">{paramDuration || "90"} Minit</span>
         </div>
       </div>
     )}
     ```

### 4.4 Form Fields, Honeypot & Honest HTTP 503 Fallback
1. **Field 1: Service Category Selection**:
   - Radio cards for `website-ui`, `full-stack`, `coaching`.
   - Selected state: `border-2 border-acid bg-ink text-white shadow-brutal`.
2. **Input Compatibility Guard for E2E Tests**:
   - Name input: placeholder `"Nama anda atau syarikat"` (or `"Nama anda atau syarikat (Contoh: Ali bin Ahmad)"`).
   - Contact input: placeholder `"cth: nama@emel.com atau +60123456789"`.
   - Textarea: placeholder `"Ceritakan serba sedikit tentang matlamat projek anda..."` (or `"Contoh: Saya ingin bina website portfolio dengan reka bentuk moden..."`).
   - Submit button text: Keep `"Hantar Taklimat Projek"` or `"Hantar Pertanyaan"` accessible so `locator("button:has-text('Hantar Taklimat Projek')")` and `button:has-text('Hantar Pertanyaan')` both succeed.
3. **Anti-Spam Trap**:
   - `<input type="text" name="website_pot" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />`
   - Validated server-side in `/api/inquiries/route.ts` via Zod schema (`honeypot?: string`). Any submission with non-empty honeypot is immediately rejected.
4. **Honest HTTP 503 Fallback**:
   - When server keys are unconfigured, `/api/inquiries` returns 503 `PROVIDER_PENDING_CONFIG`.
   - The UI displays an amber alert banner explaining that the server provider is in pending configuration, with a one-click button:
     `<a href={submitResult.mailtoFallback} className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 text-ink font-bold uppercase text-xs hover:bg-amber-300">`
     `<Mail className="w-4 h-4" />`
     `<span>Hantar Terus Melalui Emel (hello@syahmiaof.my)</span>`
     `</a>`

---

## 5. UI Primitives & Asset Reuse Matrix

| Primitive / Cutout Asset | Source File | Route 05 (Coaching) | Route 06 (About) | Route 07 (Contact) |
|---|---|---|---|---|
| `ArchitecturalPlinth05` | `src/components/ui/ArchitecturalPlinth05.tsx` | **Primary 3D Plinth** | — | — |
| `ArchitecturalNumeral07` | `src/components/ui/ArchitecturalNumeral07.tsx` | — | — | **Background Monumental 3D Numeral** |
| `BrutalistBanner` | `src/components/ui/BrutalistBanner.tsx` | — | **Primary Headline Banner ("SYAHMI")** | — |
| `BrutalistArrow` | `src/components/ui/BrutalistArrow.tsx` | — | — | **Dynamic Curved Arrow (`curved-contact`)** |
| `ReflectiveFloor` | `src/components/ui/ReflectiveFloor.tsx` | `glowColor="cobalt"` | — | `glowColor="dual"` |
| `DemoBadge` | `src/components/ui/DemoBadge.tsx` | Status tags | `type="KARAKTER VISUAL JENAMA"` | Status badges |
| `03_character_creator_laptop.png` | `public/assets/characters/` | **Seated on Concrete Cube Platform** | — | — |
| `05_character_pointing_throw.png` | `public/assets/characters/` | — | **Standing Pointing Pose** | — |
| `06_laptop_closed_floating.png` | `public/assets/characters/` | — | **Floating Closed Laptop** | — |

---

## 6. Mobile Responsiveness at 390px (iPhone Standard)

To satisfy **R4** and prevent horizontal overflow (`overflow-x: hidden`):
1. **CoachingView at 390px**:
   - Headline scales smoothly: `text-5xl sm:text-7xl lg:text-8xl`.
   - Configurator card buttons stack or wrap cleanly (`grid grid-cols-1 sm:grid-cols-3 gap-2`).
   - Colossal plinth scales with `w-full max-w-full aspect-[4/3]` and sits below the configurator without horizontal clipping.
2. **AboutView at 390px**:
   - `BrutalistBanner` scales smoothly (`text-5xl sm:text-7xl lg:text-9xl`).
   - 3 Credential Badges stack into a single column (`grid-cols-1 sm:grid-cols-3`).
   - Character cutout (`05_character_pointing_throw.png`) stacks below the headline with `max-h-[420px]`, floating laptop scales proportionally (`w-28 sm:w-44`), and the thigh annotation leader line remains anchored to the character container.
3. **ContactView at 390px**:
   - Numeral `07` remains scaled within `max-w-[320px]` in background.
   - Sweeping curved arrow scales to `w-48 sm:w-72` or stays positioned behind the terminal.
   - Terminal console fields stack vertically with full-width inputs and submit button.

---

## 7. Verification & Implementation Roadmap for Implementer

When the implementer (WIRA / Layout Implementer) applies these restructuring changes:
1. **File Edits**:
   - Edit `src/components/pages/CoachingView.tsx` with Section 2 architecture.
   - Edit `src/components/pages/AboutView.tsx` with Section 3 architecture.
   - Edit `src/components/pages/ContactView.tsx` with Section 4 architecture.
2. **Unit Test Pass**:
   - Run `npx vitest run tests/unit/inquiry.test.ts` -> ensure 6/6 tests pass.
   - Run `npx vitest run tests/unit/pricing.test.ts` -> ensure 8/8 tests pass.
3. **Playwright E2E Verification**:
   - Run `node tests/e2e/audit_and_screenshots.js` on port 3456 or 3002.
   - Verify coaching duration selection, coaching handoff URL (`/hubungi?service=coaching...`), inquiry form honeypot, and honest mailto fallback.
4. **Visual QA Screenshot Audit**:
   - Inspect desktop and mobile screenshots in `docs/qa/screenshots/desktop/` and `mobile/` for routes `05-coaching.png`, `06-about.png`, `07-contact.png`.
