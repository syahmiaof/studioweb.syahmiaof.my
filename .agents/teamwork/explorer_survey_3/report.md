# Survey Report: Functional Logic & Test Suite Investigation
**Agent**: Survey Explorer 3 (Functional Logic & Test Suite Investigator)  
**Date**: 2026-10-25  
**Working Directory**: `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_survey_3`  
**Target Codebase**: `C:\Users\USER\Desktop\studio.syahmiaof.my`  

---

## Executive Summary

An exhaustive investigation was conducted into the functional business logic, calculation engines, bilingual routing, anti-spam mechanisms, contact fallbacks, and the unit/E2E test suites of `studio.syahmiaof.my`.

Key findings:
1. **Pricing Engine Arithmetic**: Pure, deterministic arithmetic in `src/lib/pricing/calculator.ts` with strict isolation between frontend add-on calculations and full-stack bespoke quotes.
2. **Handoff Mechanism**: Explicit URL query parameter synchronization connects `/harga` and `/coaching` to `/hubungi` without client-side state loss.
3. **Bilingual Switcher**: Implemented in `src/components/layout/Header.tsx` via `getToggleUrl()`, cleanly preserving query strings across language toggles between Bahasa Melayu (`/`) and English (`/en`).
4. **Honeypot & Direct Mailto Fallback**: Multi-tier anti-spam validation via Zod schema (`max(0)`) and runtime route handlers (`src/app/api/inquiries/route.ts`), coupled with honest HTTP 503 fallback providing pre-formatted `mailto:` links when production email provider environment variables are absent.
5. **Vitest Unit Test Suite**: 14 tests across 2 test suites (`tests/unit/pricing.test.ts` with 8 tests, `tests/unit/inquiry.test.ts` with 6 tests). Verified executing with 100% pass rate in 1.52s (`npm test`).
6. **Playwright E2E Suite**: Configured in `tests/e2e/audit_and_screenshots.js` executing on **port 3456** (and baseline on **port 3002**), strictly avoiding port 3000. Covers screenshot captures (1440px desktop & 390px mobile across all 7 routes) and live browser automation verifying arithmetic, handoff, bilingual switching, and contact fallback.
7. **Build & Scripts**: `npm run build` verified: compiled in Next.js 14.2.35, generated 18 routes (14 public locale pages, 4 internal/API), 0 TypeScript errors, 0 lint warnings.

---

## 1. Existing Pricing Engine Arithmetic

### 1.1 Source Location
- **Primary file**: `src/lib/pricing/calculator.ts`
- **Type definitions**: `src/lib/types/index.ts` (lines 5–39)
- **UI Configurator View**: `src/components/pages/PricingView.tsx` (lines 30–55, 77–300)

### 1.2 Package Data Structures & Base Pricing
Defined in `PRICING_PACKAGES` (`src/lib/pricing/calculator.ts`: lines 3–137):

| Package ID | Package Name (MS / EN) | Base Price (MYR) | Display Label | Scope Summary / Characteristics |
|---|---|---|---|---|
| `landing` | Frontend Landing | **RM 645** | `RM645` | 1 Focus Page, Responsive, WhatsApp CTA, SEO Asas |
| `business` | Frontend Business | **RM 1,745** | `RM1,745` | ~5 Pages (Utama, Servis, Tentang, Portfolio, Hubungi) |
| `premium` | Frontend Premium | **RM 2,995** | `RM2,995` | Custom Scope, GSAP ScrollTrigger, 3D visual composition |
| `custom-system` | Sistem Khas / Full-Stack | **RM 3,250** (Quote minimum) | `Bermula RM3,250` | `isFullStack: true`, Database, Auth, Dashboard, REST APIs |

### 1.3 Add-on Definitions & Rates
Defined in `PRICING_ADDONS` (`src/lib/pricing/calculator.ts`: lines 139–164):

| Add-on ID | Name (MS / EN) | Price (MYR) | Description |
|---|---|---|---|
| `animation` | Animasi Interaktif Lanjutan (GSAP) / Advanced Interactive Animation (GSAP) | **+RM 400** | Cinematic scroll transitions, 3D card perspective, micro-interactions |
| `second-lang` | Bahasa Tambahan Laman Web (Klien) / Client Website Additional Language | **+RM 250** | Bilingual support (e.g. BM + EN) for client's website with toggle |

### 1.4 Calculation Function & Business Logic
Function `calculateFrontendEstimate(packageId: string, selectedAddonIds: string[] = [])` (`src/lib/pricing/calculator.ts`: lines 174–218):

```ts
export function calculateFrontendEstimate(
  packageId: string,
  selectedAddonIds: string[] = []
): {
  basePrice: number;
  addonsTotal: number;
  total: number;
  isFullStack: boolean;
  breakdown: Array<{ name: string; price: number }>;
} {
  const pkg = getPackageById(packageId) || PRICING_PACKAGES[0];
  const isFullStack = Boolean(pkg.isFullStack);

  if (isFullStack) {
    return {
      basePrice: pkg.basePrice,
      addonsTotal: 0,
      total: pkg.basePrice,
      isFullStack: true,
      breakdown: [{ name: pkg.name.ms, price: pkg.basePrice }],
    };
  }

  const basePrice = pkg.basePrice;
  let addonsTotal = 0;
  const breakdown: Array<{ name: string; price: number }> = [
    { name: pkg.name.ms, price: basePrice },
  ];

  for (const addonId of selectedAddonIds) {
    const addon = getAddonById(addonId);
    if (addon) {
      addonsTotal += addon.price;
      breakdown.push({ name: addon.name.ms, price: addon.price });
    }
  }

  return {
    basePrice,
    addonsTotal,
    total: basePrice + addonsTotal,
    isFullStack: false,
    breakdown,
  };
}
```

### 1.5 Arithmetic Rules & Combination Verification
- **Landing standalone**: `645 + 0 = RM 645`
- **Business standalone**: `1,745 + 0 = RM 1,745`
- **Premium standalone**: `2,995 + 0 = RM 2,995`
- **Business + Animation**: `1,745 + 400 = RM 2,145`
- **Business + Second Language**: `1,745 + 250 = RM 1,995`
- **Business + Both Add-ons**: `1,745 + 400 + 250 = RM 2,395`
- **Landing + Both Add-ons**: `645 + 400 + 250 = RM 1,295`
- **Premium + Both Add-ons**: `2,995 + 400 + 250 = RM 3,645`
- **Full-Stack Isolation Rule**: When `custom-system` is chosen, `isFullStack: true` forces `addonsTotal: 0` and `total: 3250`. In the UI (`src/components/pages/PricingView.tsx`: line 149), `{!selectedPackage.isFullStack && ...}` completely hides the add-on selector cards, preventing invalid combinations.
- **Defensive Fallback**: Unknown package defaults to `PRICING_PACKAGES[0]` (`landing`), unknown add-ons are ignored, and `formatMYR(amount)` guards against `NaN` by returning `"RM0"`.

---

## 2. Parameter Handoff Mechanisms (`/harga` and `/coaching` into `/hubungi`)

### 2.1 Egress from `/harga` (`src/components/pages/PricingView.tsx`: lines 46–55)
The quote handoff URL generator computes destination path and query parameters dynamically:

```ts
const quoteHandoffUrl = () => {
  const baseRoute = locale === "en" ? "/en/hubungi" : "/hubungi";
  if (selectedPackage.isFullStack) {
    return `${baseRoute}?service=full-stack&package=custom-system`;
  }
  const addonsParam = selectedAddonIds.join(",");
  return `${baseRoute}?service=website-ui&package=${selectedPackageId}&addons=${encodeURIComponent(
    addonsParam
  )}&estimate=${calculation.total}`;
};
```
- For Frontend packages, passes:
  - `service=website-ui`
  - `package=[landing|business|premium]`
  - `addons=[comma-separated list, e.g. animation,second-lang]`
  - `estimate=[total numeric integer, e.g. 2395]`
- For Full-Stack system, passes:
  - `service=full-stack`
  - `package=custom-system`

### 2.2 Egress from `/coaching` (`src/components/pages/CoachingView.tsx`: lines 34–37)
```ts
const coachingHandoffUrl = () => {
  const base = locale === "en" ? "/en/hubungi" : "/hubungi";
  return `${base}?service=coaching&topic=${selectedTopicId}&duration=${selectedDuration}`;
};
```
- Passes:
  - `service=coaching`
  - `topic=[web-fundamentals|react-next|project-mentorship]`
  - `duration=[60|90]`

### 2.3 Ingress at `/hubungi` (`src/components/pages/ContactView.tsx`: lines 28–56, 180–205)
1. **Extraction via `useSearchParams()`**:
   ```ts
   const searchParams = useSearchParams();
   const paramService = (searchParams?.get("service") as ServiceCategory) || "website-ui";
   const paramPackage = searchParams?.get("package") || "";
   const paramAddons = searchParams?.get("addons") || "";
   const paramEstimate = searchParams?.get("estimate") || "";
   const paramTopic = searchParams?.get("topic") || "";
   const paramDuration = (searchParams?.get("duration") as "60" | "90") || undefined;
   ```
2. **Context Banner Rendering**:
   - If `paramEstimate` is populated: renders industrial context block displaying the chosen package name, formatted estimate in MYR (`formatMYR(Number(paramEstimate))`), and active add-on keys.
   - If `paramTopic` is populated: renders coaching context block displaying topic name and chosen duration (`60 Minit` / `90 Minit`).
3. **Payload Synchronization**:
   On form submission (`handleSubmit`), all query-injected values are packaged into the JSON payload sent to `/api/inquiries`.

---

## 3. Bilingual Dictionary and Switcher Implementation

### 3.1 Architecture Overview
- Supported Locales: `"ms"` (Bahasa Melayu, default) and `"en"` (English).
- Routing Structure:
  - Malay routes live at root paths: `/`, `/servis`, `/portfolio`, `/harga`, `/coaching`, `/tentang`, `/hubungi`.
  - English routes live under the `/en` prefix: `/en`, `/en/servis`, `/en/portfolio`, `/en/harga`, `/en/coaching`, `/en/tentang`, `/en/hubungi`.

### 3.2 Dictionaries & Typings
- `src/i18n/index.ts`:
  - `getTranslations(locale: Locale): Translations` returns `enTranslations` when `locale === "en"` and `msTranslations` otherwise.
  - `SUPPORTED_LOCALES: Locale[] = ["ms", "en"]`
  - `DEFAULT_LOCALE: Locale = "ms"`
- `src/i18n/ms.ts`: Complete Malay dictionary (171 lines) providing keys for:
  - `nav`, `home`, `services`, `portfolio`, `pricing`, `coaching`, `about`, `contact`, `footer`.
- `src/i18n/en.ts`: Complete English dictionary (171 lines) mirroring identical structure and keys for strict type parity.

### 3.3 Query-Preserving Language Switcher (`src/components/layout/Header.tsx`: lines 29–43, 110–118)
```ts
// Compute alternate locale URL while preserving search parameters
const getToggleUrl = () => {
  const targetLocale = locale === "ms" ? "en" : "ms";
  const queryString = searchParams?.toString() ? `?${searchParams.toString()}` : "";

  if (targetLocale === "en") {
    // Switching from ms to en: prefix with /en
    if (pathname === "/") return `/en${queryString}`;
    return `/en${pathname}${queryString}`;
  } else {
    // Switching from en to ms: strip /en prefix
    const stripped = pathname.replace(/^\/en(\/|$)/, "/");
    return `${stripped === "" ? "/" : stripped}${queryString}`;
  }
};
```
- **Label Display**:
  - Displays `"EN"` when currently viewing Malay (`locale === "ms"`).
  - Displays `"BM"` when currently viewing English (`locale === "en"`).
- **Query Parameter Preservation**:
  `searchParams.toString()` is appended. A user visiting `/harga?package=business&estimate=2145` switching to English lands precisely at `/en/harga?package=business&estimate=2145`.
- **Suspense Boundary Protection**:
  Because `useSearchParams()` requires a Suspense boundary in Next.js App Router, `Header` exports a `<Suspense>` wrapper around `HeaderBar` (`src/components/layout/Header.tsx`: lines 186–200).

---

## 4. Contact Form Submission, Honeypot Anti-Spam & Direct Mailto Fallback

### 4.1 Schema Validation (`src/lib/validation/inquiry.ts`)
Uses Zod (`zod@^3.23.8`) for input sanitization and boundary checks:
```ts
const PHONE_REGEX = /^(\+?60|0)[0-9]{8,11}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const InquirySchema = z.object({
  service: z.enum(["website-ui", "full-stack", "coaching"], {
    errorMap: () => ({ message: "Sila pilih kategori perkhidmatan yang sah." }),
  }),
  name: z.string().trim().min(2).max(100),
  contact: z.string().trim().refine(
    (val) => {
      const clean = val.replace(/[\s-]/g, "");
      return EMAIL_REGEX.test(val) || PHONE_REGEX.test(clean);
    },
    { message: "Sila masukkan alamat emel yang sah atau nombor WhatsApp yang tepat." }
  ),
  message: z.string().trim().min(10).max(2000),
  packageId: z.string().optional(),
  packageName: z.string().optional(),
  addons: z.array(z.string()).optional(),
  estimatedTotal: z.number().optional(),
  coachingTopic: z.string().optional(),
  coachingDuration: z.enum(["60", "90"]).optional(),
  honeypot: z.string().max(0, { message: "Aktiviti bot dikesan." }).optional(),
});
```

### 4.2 Multi-Tier Honeypot Anti-Spam Protection
1. **Hidden DOM Element** (`src/components/pages/ContactView.tsx`: lines 244–253):
   ```tsx
   <input
     type="text"
     name="website_pot"
     tabIndex={-1}
     autoComplete="off"
     value={honeypot}
     onChange={(e) => setHoneypot(e.target.value)}
     className="hidden"
   />
   ```
2. **Schema Level Rejection**: `honeypot: z.string().max(0)` fails validation immediately if filled by automated form fillers.
3. **Route Handler Rejection** (`src/app/api/inquiries/route.ts`: lines 24–29):
   ```ts
   if (data.honeypot && data.honeypot.trim().length > 0) {
     return NextResponse.json(
       { success: false, error: "Spam bot detected." },
       { status: 400 }
     );
   }
   ```

### 4.3 Honest Direct Mailto Fallback Logic
In accordance with honest brutalism principles (no fake success messages or silent dropping of client briefs):
- **Server check** (`src/app/api/inquiries/route.ts`: lines 32–52):
  ```ts
  const emailProviderConfigured = Boolean(
    process.env.INQUIRY_EMAIL_PROVIDER && process.env.INQUIRY_EMAIL_API_KEY
  );

  if (!emailProviderConfigured) {
    return NextResponse.json(
      {
        success: false,
        status: "PROVIDER_PENDING_CONFIG",
        message:
          "Konfigurasi penghantaran emel pelayan pengeluaran masih dalam penyediaan. Sila hubungi kami terus melalui emel hello@syahmiaof.my.",
        directMailto: `mailto:hello@syahmiaof.my?subject=${encodeURIComponent(
          `Taklimat Projek Studio: ${data.name}`
        )}&body=${encodeURIComponent(
          `Nama: ${data.name}\nHubungi: ${data.contact}\nKategori: ${data.service}\n\nMesej:\n${data.message}`
        )}`,
      },
      { status: 503 }
    );
  }
  ```
- **Frontend Presentation** (`src/components/pages/ContactView.tsx`: lines 222–240):
  When the HTTP 503 response with `PROVIDER_PENDING_CONFIG` returns, the UI displays an amber notification banner disclosing that server email credentials are in configuration, accompanied by an explicit button:
  `<a href={submitResult.mailtoFallback} className="...">Hantar Terus Melalui Emel Anda</a>`
- **Network Crash Fallback** (`src/components/pages/ContactView.tsx`: lines 102–113):
  If the network request encounters a total network failure or 500 error, the client `catch` block independently constructs the exact same `mailto:hello@syahmiaof.my` URI with user inputs pre-filled into `subject` and `body`.

---

## 5. Vitest Unit Test Suite (`npm test`, 14 Tests)

### 5.1 Test Runner & Configuration
- **Runner command**: `npm test` -> maps to `vitest run` in `package.json`.
- **Vitest version**: `vitest@^2.1.4` (resolved `2.1.9`).
- **Config**: Out-of-the-box Vitest resolution against `tsconfig.json` paths; no separate `vitest.config.ts` required.

### 5.2 Test Inventory (14 Tests in Total)

#### Suite 1: `tests/unit/pricing.test.ts` (8 Tests)
1. `calculates Landing base price without add-ons correctly as RM645`
   - Verifies: `total === 645`, `basePrice === 645`, `addonsTotal === 0`, `formatMYR(res.total) === "RM645"`
2. `calculates Business base price without add-ons correctly as RM1,745`
   - Verifies: `total === 1745`, `basePrice === 1745`, `addonsTotal === 0`, `formatMYR(res.total) === "RM1,745"`
3. `calculates Premium base price without add-ons correctly as RM2,995`
   - Verifies: `total === 2995`, `basePrice === 2995`, `addonsTotal === 0`, `formatMYR(res.total) === "RM2,995"`
4. `calculates Business + Advanced Animation as RM2,145 (1745 + 400)`
   - Verifies: `addonsTotal === 400`, `total === 2145`, `formatMYR(res.total) === "RM2,145"`
5. `calculates Business + Both Add-ons (Animation + Second Language) as RM2,395 (1745 + 400 + 250)`
   - Verifies: `addonsTotal === 650`, `total === 2395`, `formatMYR(res.total) === "RM2,395"`
6. `re-calculates properly when an add-on is deselected/toggled off`
   - Verifies state transitions: 2395 -> 1995 (animation toggled off) -> 1745 (all toggled off).
7. `handles Custom Full-Stack System as manual quote and does not apply frontend add-on math`
   - Verifies: `isFullStack === true`, `basePrice === 3250`, `addonsTotal === 0`, `total === 3250` despite passing addon IDs.
8. `never returns NaN or invalid string for any combination`
   - Verifies: fallback handles invalid strings without crashing or returning `NaN`.

#### Suite 2: `tests/unit/inquiry.test.ts` (6 Tests)
1. `passes validation with valid email and complete fields`
   - Input with email, message, packageId, estimatedTotal -> `res.success === true`
2. `passes validation with valid Malaysian phone number format`
   - Input with contact `"0123456789"` -> `res.success === true`
3. `passes validation with international phone number format`
   - Input with contact `"+60198765432"` -> `res.success === true`
4. `rejects invalid contact format (neither valid email nor phone)`
   - Input with `"bukan_emel_dan_bukan_telefon"` -> `res.success === false`
5. `rejects short message under 10 characters`
   - Input with message `"Pendek"` -> `res.success === false`
6. `rejects bot submissions when honeypot field is filled`
   - Input with honeypot `"http://spam-link.ru"` -> `res.success === false`

### 5.3 Execution Verification
Command `npm test` executed on host system:
```text
> studio.syahmiaof.my@1.0.0 test
> vitest run

 RUN  v2.1.9 C:/Users/USER/Desktop/studio.syahmiaof.my

 ✓ tests/unit/inquiry.test.ts (6 tests) 7ms
 ✓ tests/unit/pricing.test.ts (8 tests) 38ms

 Test Files  2 passed (2)
      Tests  14 passed (14)
   Start at  22:23:12
   Duration  1.52s
```
**Result**: 100% passed (14/14), 0 failures, Exit code 0.

---

## 6. Playwright E2E Test Suite (`npm run test:e2e`)

### 6.1 Runner & Port Configuration
- **Script**: `npm run test:e2e` -> `node tests/e2e/audit_and_screenshots.js`
- **Port Allocation**:
  - `tests/e2e/audit_and_screenshots.js` (lines 7–8):
    ```javascript
    const PORT = 3456;
    const BASE_URL = `http://localhost:${PORT}`;
    ```
  - `tests/e2e/capture_v1_baseline.js` (line 5):
    ```javascript
    const BASE_URL = "http://localhost:3002";
    ```
  - **Port 3000 Policy**: Verified zero usage of port 3000. All execution is bound to port **3456** (with secondary script on port **3002**), maintaining isolation from any potential local services running on port 3000.
- **Server Lifecycle**:
  Checks if server is already running via `checkServerActive()`. If not, spawns `next start -p 3456` with Windows shell handling, polls until HTTP 200/304, executes test suites, and gracefully terminates via `taskkill /pid ... /T /F` in the `finally` block.

### 6.2 Browser Test Viewports
- **Desktop Context**: Viewport `1672 x 941`, scale factor 1 (matching reference mockup resolution).
- **Mobile Context**: iPhone 14 standard: `390 x 844`, `isMobile: true`, `hasTouch: true`, scale factor 2.

### 6.3 E2E Test Sequences Covered in `audit_and_screenshots.js`
1. **Full-Page Screenshot Capture**:
   Iterates through all 7 routes (`/`, `/servis`, `/portfolio`, `/harga`, `/coaching`, `/tentang`, `/hubungi`) saving desktop shots to `docs/qa/screenshots/desktop/*.png` and mobile shots to `docs/qa/screenshots/mobile/*.png`.
2. **Interactive Pricing Calculator Arithmetic Test**:
   - Clicks "Frontend Landing" -> asserts text contains `"RM645"`.
   - Clicks "Frontend Business" -> asserts base text contains `"RM1,745"`.
   - Clicks "Animasi Interaktif Lanjutan (GSAP)" -> asserts total text contains `"RM2,145"`.
   - Clicks "Bahasa Tambahan Laman Web (Klien)" -> asserts total text contains `"RM2,395"`.
   - Clicks "Dapatkan Sebut Harga" -> asserts navigation to `/hubungi` and URL contains `service=website-ui`, `package=business`, `estimate=2395`.
3. **Coaching Selection & Handoff Test**:
   - Navigates to `/coaching`.
   - Clicks "90 Minit".
   - Clicks "Tanya Slot Coaching".
   - Asserts navigation to `/hubungi` and URL contains `service=coaching` and `duration=90`.
4. **Bilingual Switcher & Query Preservation Test**:
   - Navigates to `/harga?package=business&estimate=2145`.
   - Clicks "EN" language switch in Header.
   - Asserts URL is `**/en/harga**` and still contains `estimate=2145`.
   - Asserts page body contains English strings `"PRICING STUDIO"` and `"SELECT BASE PACKAGE"`.
   - Clicks "BM" language switch and asserts navigation back to `/harga*`.
5. **Inquiry Form Submission & Honest Validation Fallback Test**:
   - Navigates to `/hubungi`.
   - Fills Name (`"Siti Nurhaliza"`), Contact (`"+60192345678"`), and Message.
   - Clicks "Hantar Taklimat Projek".
   - Asserts response triggers honest fallback: body includes `"Konfigurasi penghantaran emel"` or `"hello@syahmiaof.my"`.

---

## 7. Package Scripts, Dependencies & Build Command

### 7.1 `package.json` Overview
```json
{
  "name": "studio.syahmiaof.my",
  "version": "1.0.0",
  "private": true,
  "description": "SYAHMIAOF STUDIO — Digital Brutalism Web Development & 1:1 Coaching",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "node tests/e2e/audit_and_screenshots.js"
  },
  "dependencies": {
    "@gsap/react": "^2.1.1",
    "clsx": "^2.1.1",
    "gsap": "^3.12.5",
    "lucide-react": "^0.454.0",
    "next": "^14.2.25",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "sharp": "^0.35.5",
    "tailwind-merge": "^2.5.4",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "playwright": "^1.64.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vitest": "^2.1.4"
  }
}
```

### 7.2 Production Build Verification (`npm run build`)
`npm run build` executed directly in Next.js 14.2.35.
- Output summary:
  ```text
  ▲ Next.js 14.2.35

     Creating an optimized production build ...
   ✓ Compiled successfully
     Linting and checking validity of types ...
     Collecting page data ...
   ✓ Generating static pages (18/18)
     Finalizing page optimization ...
     Collecting build traces ...

  Route (app)                              Size     First Load JS
  ┌ ○ /                                    144 B           114 kB
  ├ ○ /_not-found                          873 B          88.1 kB
  ├ ƒ /api/inquiries                       0 B                0 B
  ├ ○ /coaching                            145 B           114 kB
  ├ ○ /en                                  144 B           114 kB
  ├ ○ /en/coaching                         144 B           114 kB
  ├ ○ /en/harga                            141 B           110 kB
  ├ ○ /en/hubungi                          142 B           111 kB
  ├ ○ /en/portfolio                        142 B           108 kB
  ├ ○ /en/servis                           144 B           115 kB
  ├ ○ /en/tentang                          2.38 kB         112 kB
  ├ ○ /harga                               142 B           110 kB
  ├ ○ /hubungi                             142 B           111 kB
  ├ ○ /portfolio                           141 B           108 kB
  ├ ○ /servis                              144 B           115 kB
  └ ○ /tentang                             2.38 kB         112 kB
  + First Load JS shared by all            87.3 kB

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- **Exit Code**: 0
- **Errors/Warnings**: 0 TypeScript compilation errors, 0 ESLint errors.
- **Route Breakdown**:
  - 14 customer-facing pages (7 in Malay, 7 in English) prerendered statically (`○`).
  - 1 dynamic API route handler (`/api/inquiries`, `ƒ`).
  - 1 static `_not-found` page (`○`).

---

## 8. Summary of Critical Constraints for Subsequent Team Roles

For peer agents (WIRA for layout reconstruction, BAYU for GSAP, CENDEKIA for regression verification):
1. **Preserve Calculator Exact Signatures**: Do not alter `calculateFrontendEstimate(packageId, selectedAddonIds)` or package IDs (`landing`, `business`, `premium`, `custom-system`) as both unit tests and E2E rely on exact return keys (`basePrice`, `addonsTotal`, `total`, `isFullStack`, `breakdown`).
2. **Preserve Query Parameter Keys**:
   - `/hubungi` requires: `service`, `package`, `addons`, `estimate`, `topic`, `duration`.
3. **Preserve Header Language Switcher Structure**:
   - The switcher uses `getToggleUrl()` preserving `searchParams.toString()`.
   - The desktop toggle anchor has text `"EN"` (on Malay page) or `"BM"` (on English page). The E2E test selects it via `getByRole("link", { name: "EN", exact: true })`.
4. **Preserve Contact Form Locators**:
   - E2E relies on:
     - Placeholder `"Nama anda atau syarikat"`
     - Placeholder `"cth: nama@emel.com atau +60123456789"`
     - Button text `"Hantar Taklimat Projek"`
     - Honeypot input `name="website_pot"`
5. **Port Safety**:
   - Run tests on **port 3456** or **port 3002**. Never run servers or tests on port 3000.
