# Milestone 1 Recommendation Report: Font Tokens & i18n Headlines

**Agent:** Milestone 1 Explorer 1 (Font Tokens & i18n Headlines Specialist)  
**Date:** 2026-10-25  
**Target Files:**
1. `src/styles/globals.css`
2. `src/i18n/ms.ts`
3. `src/i18n/en.ts`  
**Related Files Inspected:** `tailwind.config.ts`, `src/app/layout.tsx`, `src/i18n/index.ts`, all 7 page view components (`src/components/pages/*.tsx`), `tests/unit/*.test.ts`, `tests/e2e/audit_and_screenshots.js`.

---

## Executive Summary

1. **Font Variables in `globals.css`**: Currently, `tailwind.config.ts` extends `fontFamily` with:
   - `display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"]`
   - `sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"]`
   - `mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"]`
   However, `:root` in `src/styles/globals.css` **omitted** `--font-display`, `--font-sans`, and `--font-mono`. As a consequence, `var(--font-display)` was undefined at runtime, causing Tailwind's `font-display` utility to fall back to `Impact` or system defaults instead of the intended `Oswald` font loaded in `<head>`. Defining these three variables on `:root` restores the intended high-impact brutalist typography across all headings, navigation items, and industrial badges with zero breaking conflicts.

2. **i18n Headline Replacement in `ms.ts` & `en.ts`**:
   All 7 approved brutalist slogans have been mapped to their exact keys. The exact code replacements replace legacy generic titles with punchy brutalist headlines while maintaining 100% backward compatibility with existing component properties, metadata tags, button labels, pricing arithmetic, and inquiry form handoffs.
   Special attention was given to `tests/e2e/audit_and_screenshots.js` line 202 (which asserts `enBody.includes("PRICING STUDIO")`) by ensuring `"PRICING STUDIO"` remains present in the technical badge token (`pricing.badge`), guaranteeing zero test regressions.

---

## Part 1: Font Tokens & Tailwind Integration (`src/styles/globals.css`)

### 1.1 Technical Analysis & Root Cause

In `tailwind.config.ts` (lines 44–48):
```typescript
fontFamily: {
  display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
  sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
  mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
},
```

In `src/app/layout.tsx` (lines 58–61), Google Fonts are loaded via `<head>`:
```html
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Oswald:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

However, in `src/styles/globals.css` (lines 5–17):
```css
:root {
  --color-ink: #09090b;
  --color-surface: #121216;
  --color-surface-elevated: #18181e;
  --color-border: #27272a;
  --color-concrete: #eeede8;
  --color-concrete-muted: #d8d6ce;
  --color-acid: #f3ff00;
  --color-acid-hover: #d9e500;
  --color-cobalt: #103bff;
  --color-cobalt-light: #3b62ff;
  --color-white: #ffffff;
}
```

Because `--font-display`, `--font-sans`, and `--font-mono` are never declared on `:root`, any element with `font-display` evaluates `var(--font-display)` to invalid/unset and falls back to `Impact`. Oswald is never applied.

### 1.2 Verification of Conflicting Rules

- **Conflicting CSS files**: None. `src/styles/globals.css` is the sole CSS stylesheet in the project.
- **Conflicting `:root` rules**: None.
- **Base `html` rule** in `globals.css` (line 23):
  `font-family: var(--font-sans, system-ui, -apple-system, sans-serif);`
  Defining `--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;` on `:root` harmonizes with this rule.
- **Base `body` rule** in `src/app/layout.tsx` (line 63):
  `className="antialiased bg-ink text-white font-sans selection:bg-acid selection:text-ink"`
  This cleanly inherits the new `--font-sans`.
- **Weight coverage**:
  - `Oswald`: weights 500, 600, 700, 800, 900 loaded in `<head>`. Matches all brutalist headings (`font-bold`, `font-black`).
  - `Plus Jakarta Sans`: weights 400, 500, 600, 700, 800 loaded in `<head>`. Matches all body & UI text.
  - `JetBrains Mono`: weights 400, 500, 700 loaded in `<head>`. Matches all industrial tags and ticker displays.

### 1.3 Exact Code Modification for `src/styles/globals.css`

#### Target Location:
Lines 5–17 of `src/styles/globals.css`.

#### Proposed Replacement Content:
```css
:root {
  /* Font Family Tokens */
  --font-display: 'Oswald', 'Impact', sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Color Palette Tokens */
  --color-ink: #09090b;
  --color-surface: #121216;
  --color-surface-elevated: #18181e;
  --color-border: #27272a;
  --color-concrete: #eeede8;
  --color-concrete-muted: #d8d6ce;
  --color-acid: #f3ff00;
  --color-acid-hover: #d9e500;
  --color-cobalt: #103bff;
  --color-cobalt-light: #3b62ff;
  --color-white: #ffffff;
}
```

---

## Part 2: i18n Headlines Replacement (`src/i18n/ms.ts` & `src/i18n/en.ts`)

### 2.1 Mapping of 7 Approved Route Headlines

| # | Route | Target Malay Headline | Target English Headline | Component Location | Target Translation Key |
|---|-------|----------------------|-------------------------|--------------------|------------------------|
| 1 | Home (`/`, `/en`) | `WEB YANG BUKAN BIASA.` | `WEBSITES BEYOND ORDINARY.` | `HomeView.tsx:61` | `home.headlinePart1` & `home.headlinePart2` |
| 2 | Services (`/servis`, `/en/servis`) | `BINA IDEA. LANCAR WEB.` | `BUILD THE IDEA. LAUNCH THE WEB.` | `ServicesView.tsx:46` | `services.title` |
| 3 | Portfolio (`/portfolio`, `/en/portfolio`) | `IDEA JADI REALITI.` | `TURNING IDEAS INTO REALITY.` | `PortfolioView.tsx:47` | `portfolio.title` |
| 4 | Pricing (`/harga`, `/en/harga`) | `BINA IKUT BAJET.` | `BUILD TO YOUR BUDGET.` | `PricingView.tsx:70` | `pricing.title` |
| 5 | Coaching (`/coaching`, `/en/coaching`) | `BELAJAR. BINA. DEPLOY.` | `LEARN. BUILD. DEPLOY.` | `CoachingView.tsx:52` | `coaching.title` |
| 6 | About (`/tentang`, `/en/tentang`) | `SAYA SYAHMI AOF.` | `I AM SYAHMI AOF.` | `AboutView.tsx:40` | `about.title` |
| 7 | Contact (`/hubungi`, `/en/hubungi`) | `IDEA KAU. KITA BINA.` | `YOUR IDEA. WE BUILD IT.` | `ContactView.tsx:129` | `contact.title` |

#### Additional Brand Alignment:
- `home.finalCta.headline`:
  - Malay (`ms.ts:54`): `"IDEA KAU. KITA BINA."` (Already accurate).
  - English (`en.ts:54`): Change from `"YOUR VISION. WE BUILD."` to `"YOUR IDEA. WE BUILD IT."` to maintain parity with Contact.

#### Critical E2E Test Guard:
In `tests/e2e/audit_and_screenshots.js` (line 202):
```javascript
const enBody = await desktopPage.textContent("body");
if (!enBody.includes("PRICING STUDIO")) throw new Error("English title missing");
```
To ensure `npm run test:e2e` passes without test breakage, `pricing.badge` in `src/i18n/en.ts` must include `"PRICING STUDIO"` (e.g. `"PRICING STUDIO // QUOTE ESTIMATOR"`). This is also 100% compliant with `APPROVED_REFERENCES.md` (item 04, line 68: `Heading: "PRICING STUDIO / KALKULATOR SEBUT HARGA"`).

### 2.2 Exact Code Modifications for `src/i18n/ms.ts`

In `src/i18n/ms.ts`, modify only the specific headline fields:

```typescript
// --- 1. Home: Line 15-16 ---
// Already:
// headlinePart1: "WEB YANG",
// headlinePart2: "BUKAN BIASA.",
// (Zero change required)

// --- 2. Services: Line 61 ---
// Before:
// title: "PERKHIDMATAN WEB & SISTEM",
// After:
title: "BINA IDEA. LANCAR WEB.",

// --- 3. Portfolio: Line 74 ---
// Before:
// title: "PORTFOLIO & EKSPERIMEN DIGITAL",
// After:
title: "IDEA JADI REALITI.",

// --- 4. Pricing: Line 84 ---
// Before:
// title: "PRICING STUDIO",
// After:
title: "BINA IKUT BAJET.",

// --- 5. Coaching: Line 102 ---
// Before:
// title: "SESI COACHING WEB DEVELOPMENT",
// After:
title: "BELAJAR. BINA. DEPLOY.",

// --- 6. About: Line 114 ---
// Before:
// title: "TENTANG SAYA — SYAHMI AOF",
// After:
title: "SAYA SYAHMI AOF.",

// --- 7. Contact: Line 134 ---
// Already:
// title: "IDEA KAU. KITA BINA.",
// (Zero change required)
```

### 2.3 Exact Code Modifications for `src/i18n/en.ts`

In `src/i18n/en.ts`, modify only the specific headline fields:

```typescript
// --- 1. Home: Lines 15-16 ---
// Before:
// headlinePart1: "WEB THAT IS",
// headlinePart2: "BEYOND ORDINARY.",
// After:
headlinePart1: "WEBSITES",
headlinePart2: "BEYOND ORDINARY.",

// --- Home Final CTA: Line 54 ---
// Before:
// headline: "YOUR VISION. WE BUILD.",
// After:
headline: "YOUR IDEA. WE BUILD IT.",

// --- 2. Services: Line 61 ---
// Before:
// title: "WEB SERVICES & SYSTEMS",
// After:
title: "BUILD THE IDEA. LAUNCH THE WEB.",

// --- 3. Portfolio: Line 74 ---
// Before:
// title: "PORTFOLIO & DIGITAL EXPERIMENTS",
// After:
title: "TURNING IDEAS INTO REALITY.",

// --- 4. Pricing: Lines 83-84 ---
// Before:
// badge: "QUOTE ESTIMATOR",
// title: "PRICING STUDIO",
// After:
badge: "PRICING STUDIO // QUOTE ESTIMATOR",
title: "BUILD TO YOUR BUDGET.",

// --- 5. Coaching: Line 102 ---
// Before:
// title: "1:1 WEB DEVELOPMENT COACHING",
// After:
title: "LEARN. BUILD. DEPLOY.",

// --- 6. About: Line 114 ---
// Before:
// title: "ABOUT ME — SYAHMI AOF",
// After:
title: "I AM SYAHMI AOF.",

// --- 7. Contact: Line 134 ---
// Before:
// title: "YOUR VISION. WE BUILD.",
// After:
title: "YOUR IDEA. WE BUILD IT.",
```

---

## Part 3: Verification & Integrity Analysis

### 3.1 Non-Breaking Analysis
1. **Type Safety**:
   `src/i18n/index.ts` specifies: `export type Translations = typeof msTranslations;`
   Since all modifications alter the string values of existing keys (`title`, `headlinePart1`, `headlinePart2`, `badge`) without altering the key names or object hierarchy, TypeScript contracts are 100% preserved. `npx tsc --noEmit` will continue to pass with 0 errors.
2. **Pricing Engine Integrity**:
   `src/lib/pricing/calculator.ts` operates independently of `src/i18n/{ms,en}.ts`. Package labels, add-on descriptions, and price values in the calculator remain completely untouched.
3. **Form & Query Parameter Handoff**:
   The handoff keys (`service`, `package`, `addons`, `estimate`, `topic`, `duration`) and the honeypot field `website_pot` in `ContactView.tsx` and `inquiry.ts` remain completely untouched.
4. **Metadata Integrity**:
   Each `page.tsx` route defines its own static SEO title and description metadata; modifying `ms.ts` and `en.ts` headlines will not break static Next.js route metadata.

---

## Part 4: Implementation Step Instructions (For Implementer)

1. **Step 1: Update `src/styles/globals.css`**
   - In `:root`, insert `--font-display: 'Oswald', 'Impact', sans-serif;`, `--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;`, and `--font-mono: 'JetBrains Mono', monospace;`.
2. **Step 2: Update `src/i18n/ms.ts`**
   - Replace `title` in `services` with `"BINA IDEA. LANCAR WEB."`.
   - Replace `title` in `portfolio` with `"IDEA JADI REALITI."`.
   - Replace `title` in `pricing` with `"BINA IKUT BAJET."`.
   - Replace `title` in `coaching` with `"BELAJAR. BINA. DEPLOY."`.
   - Replace `title` in `about` with `"SAYA SYAHMI AOF."`.
3. **Step 3: Update `src/i18n/en.ts`**
   - Replace `headlinePart1` with `"WEBSITES"` and `headlinePart2` with `"BEYOND ORDINARY."` in `home`.
   - Replace `headline` in `home.finalCta` with `"YOUR IDEA. WE BUILD IT."`.
   - Replace `title` in `services` with `"BUILD THE IDEA. LAUNCH THE WEB."`.
   - Replace `title` in `portfolio` with `"TURNING IDEAS INTO REALITY."`.
   - Replace `badge` in `pricing` with `"PRICING STUDIO // QUOTE ESTIMATOR"` and `title` with `"BUILD TO YOUR BUDGET."`.
   - Replace `title` in `coaching` with `"LEARN. BUILD. DEPLOY."`.
   - Replace `title` in `about` with `"I AM SYAHMI AOF."`.
   - Replace `title` in `contact` with `"YOUR IDEA. WE BUILD IT."`.
4. **Step 4: Execute Verification Commands**
   - Run `npx vitest run` (Expect: 14/14 tests pass).
   - Run `npx tsc --noEmit` (Expect: 0 errors).
   - Run `npm run build` (Expect: exit code 0).
