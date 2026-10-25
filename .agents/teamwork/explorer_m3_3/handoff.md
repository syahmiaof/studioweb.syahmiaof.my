# Handoff Report — Explorer M3-3 (E2E Test Architecture & Visual QA)

**Agent**: Explorer M3-3 (`explorer_m3_3`)  
**Role**: E2E Test Architecture & Visual QA Strategy Specialist  
**Date**: 2026-10-25T17:45:00Z  
**Working Directory**: `C:\Users\USER\Desktop\studio.syahmiaof.my\.agents\teamwork\explorer_m3_3\`  
**Milestone**: Milestone 3 (GSAP Motion, Responsive Polish, E2E & Visual QA)

---

## 1. Observation

Direct empirical evidence gathered across project requirements, test codebases, browser execution scripts, and OS process runtime:

1. **Authoritative Requirements & Constraints**:
   - `ORIGINAL_REQUEST.md` (lines 38-47, 50-75):
     - R4: "Layered GSAP entrance reveals and subtle scroll parallax on architectural elements. Fluid mobile adaptation at 390px (iPhone standard) ensuring character cutouts stack naturally without overlapping text or CTAs, and no horizontal scroll overflows (`overflow-x: hidden`). Reduced-motion support (`prefers-reduced-motion`)."
     - R5: "Run and test on port 3456 or 3002 (do NOT touch port 3000). Zero deployments to production, zero DNS modifications."
     - Acceptance Criteria: Full-page desktop (1440px/1672px) and mobile (390px) screenshots for all 7 routes captured in `docs/qa/screenshots/`; 14 unit tests passing; Playwright E2E passing on port 3456; zero fake client testimonials; honest fallback displaying `mailto:hello@syahmiaof.my`.
   - `PROJECT.md` (lines 27-30):
     - Feature 14: GSAP entrance & parallax motion with reduced-motion compliance.
     - Feature 15: Responsive adaptation at 390px with zero overflow.
     - Feature 16: E2E & visual QA pass on port 3456/3002.
   - `TEST_INFRA.md` (lines 3-8, 26-30):
     - "Opaque-box browser validation on dedicated port 3456 (or 3002 baseline), strictly avoiding port 3000."
     - Dual testing layers: Vitest unit tests and Playwright E2E tests.

2. **Operating System Port & Process Runtime State**:
   - Live query executed via PowerShell (`Get-NetTCPConnection -LocalPort 3000, 3002, 3456`):
     ```
     LocalPort OwningProcess  State
     --------- -------------  -----
          3002         32248  Listen
          3000         22932  Listen
     ```
   - **Crucial Discovery**: Port 3000 is currently occupied by an active process (`PID 22932`, an external user process). Port 3002 is occupied by an older background node instance (`PID 32248`). Port **3456 is completely FREE**.
   - Any inadvertent kill command targeting `node.exe` indiscriminately or binding to port 3000 would cause catastrophic collateral failure to the user's external environment.

3. **Current Unit Test Suite State (`npm test`)**:
   - Verbatim terminal execution:
     ```
     RUN  v2.1.9 C:/Users/USER/Desktop/studio.syahmiaof.my
     ✓ tests/unit/adversarial_pricing.test.ts (26 tests) 23ms
     ✓ tests/unit/inquiry.test.ts (6 tests) 5ms
     ✓ tests/unit/pricing.test.ts (8 tests) 28ms
     Test Files  3 passed (3)
          Tests  40 passed (40)
       Duration  1.08s
     ```
   - Exceeds the minimum 14 test requirement (40/40 tests passing with zero failures).

4. **Existing E2E Test Files Inspection**:
   - `tests/e2e/audit_and_screenshots.js`:
     - Hardcoded `PORT = 3456`, starts Next.js server via `spawn("npx.cmd", ["next", "start", "-p", String(PORT)])`.
     - Reuses server if already responding (`checkServerActive`), which poses a risk if code was edited but an old server is running.
     - Captures desktop (1672x941) and mobile (390x844) full-page screenshots.
     - Performs 5-step pricing calculation check, coaching handoff, bilingual switch, and form submission fallback.
   - `tests/e2e/challenger_stress_test.js`:
     - Comprehensive 50-assertion state machine on port 3456: tests 16 pricing combinations, coaching handoffs, English route calculations, and mobile hamburger drawer.
   - `tests/e2e/challenger_m2_1_responsive.js`:
     - Comprehensive 70-test matrix across 5 viewports (390, 375, 360, 320, 414px) and 14 routes.
     - Automated DOM hit-testing via `document.elementFromPoint` confirming 0 blocked buttons and zero horizontal scroll (`scrollX === 0`).

5. **GSAP & Reduced Motion Gap**:
   - `package.json` installs `"gsap": "^3.12.5"` and `"@gsap/react": "^2.1.1"`.
   - Currently, there are NO automated E2E tests validating:
     a) GSAP entrance reveal timeline completion.
     b) Subtle scroll parallax on architectural elements.
     c) Emulation of `prefers-reduced-motion: reduce` in Playwright to verify that motion is bypassed and no elements are left stranded at `opacity: 0`.

---

## 2. Logic Chain

1. **Step 1: Dedicating Port 3456 with an Immutable Safety Guard**:
   - Observation: Port 3000 is actively used by PID 22932 on the user's host machine.
   - Inference: To prevent accidental collision or disruption, all test runners must enforce an immutable programmatic guard (`if (PORT === 3000) throw new Error(...)`).
   - Action: Port 3456 is verified free and must remain the sole target port for all Milestone 3 testing.

2. **Step 2: Addressing Stale Server Re-use in E2E Testing**:
   - Observation: Existing scripts reuse an active server if `http.get(url)` responds. If a worker rebuilds the application (`npm run build`) while an old process is running on 3456, the tests will evaluate stale bundles without the new GSAP code.
   - Inference: The test lifecycle must safely query the specific PID bound to port 3456, terminate ONLY that PID using Windows tree termination (`taskkill /PID <pid> /T /F`), and spawn a fresh production server.

3. **Step 3: Playwright Dual-Mode Motion & Accessibility Testing**:
   - Observation: GSAP animations animate properties such as `opacity`, `y`, and `transform`. If Playwright captures screenshots or asserts DOM states immediately after navigation, race conditions occur where elements are partially faded or misaligned. Furthermore, WCAG 2.1 Criterion 2.3.3 requires compliance with `prefers-reduced-motion`.
   - Inference: Playwright provides native emulation via `page.emulateMedia({ reducedMotion: 'reduce' })`. We must run two distinct test passes:
     - **Pass A (Standard Motion)**: Wait for entrance timeline resolution (600-800ms), verify final opacity is 1, verify `clearProps` removes inline matrix transforms on text, and verify scroll parallax translations.
     - **Pass B (Reduced Motion)**: Emulate `reducedMotion: 'reduce'`, assert elements are immediately visible (`opacity: 1`) without delay, and confirm zero motion lag or trapped opacity.

4. **Step 4: Authoritative Screenshot Pipeline Across All 7 Routes**:
   - Observation: The mockups in `design/references/` are rendered at 1672x941 desktop and 390x844 mobile.
   - Inference: The visual capture pipeline must snapshot both 1672px (mockup reference standard) and 1440px (common desktop benchmark), alongside 390px mobile, for all 7 routes in both Bahasa Melayu and English (14 routes total). A pre-capture settling sequence (image hydration check, scroll exercise, 600ms settling delay) ensures 100% rendered fidelity.

5. **Step 5: Complete Acceptance Criteria Traceability**:
   - Observation: `ORIGINAL_REQUEST.md` contains 32 distinct functional, visual, and architectural requirements.
   - Inference: A comprehensive test strategy requires an explicit matrix linking every single criterion to an automated script, assertion, or visual inspection gate.

---

## 3. Caveats

1. **GPU Acceleration Headless Emulation**:
   - In headless Chromium, CSS 3D transforms (`rotateY`, `perspective`) and GSAP RAF updates run via software rasterization. A fixed settle timeout of 600ms is necessary to ensure consistent frame rendering prior to full-page screenshot capture.
2. **Port 3002 Zombie Process**:
   - Port 3002 is held by PID 32248. While port 3002 is an allowed alternative, port 3456 is clean, unoccupied, and standard. Milestone 3 should standardize exclusively on port 3456. Under no circumstances should port 3000 be queried or modified.

---

## 4. Conclusion & Test Blueprint

### A. Dedicated GSAP Motion & Reduced Motion Test Harness

We specify a new dedicated test suite: `tests/e2e/test_motion_and_reduced_motion.js`.

#### Architecture & Methodology:
1. **Standard Motion Suite (`reducedMotion: 'no-preference'`)**:
   - Launches browser context with standard motion enabled.
   - Navigates to `/` (Home), `/harga` (Pricing), `/portfolio` (Portfolio), and `/tentang` (About).
   - **Entrance Reveal Verification**:
     - Waits for networkidle and GSAP entrance completion (800ms).
     - Asserts that all primary headings (`h1`), concrete plinths (`[data-plinth]`), and character mascots (`img[src*='character']`) achieve computed `opacity: 1`.
     - Asserts that `clearProps` successfully removes non-essential inline transform matrices from typography.
   - **Scroll Parallax Verification**:
     - Queries architectural background elements (`ArchitecturalSYA`, `ArchitecturalNumeral04`, `ArchitecturalPlinth05`).
     - Records initial bounding box: `rectBefore = await el.boundingBox()`.
     - Performs controlled scroll: `await page.evaluate(() => window.scrollTo(0, 400)); await page.waitForTimeout(250);`.
     - Records new bounding box: `rectAfter = await el.boundingBox()`.
     - Asserts relative translation: element shifted along Y-axis smoothly without jumping (`rectAfter.y !== rectBefore.y`).

2. **Reduced Motion Suite (`reducedMotion: 'reduce'`)**:
   - Creates context with `reducedMotion: 'reduce'`:
     ```javascript
     const reducedContext = await browser.newContext({
       viewport: { width: 1440, height: 900 },
       reducedMotion: "reduce",
     });
     ```
   - **Instantaneous Rendering (Zero Waiting)**:
     - Immediately upon `domcontentloaded` (within 50ms):
       - Asserts `window.matchMedia('(prefers-reduced-motion: reduce)').matches === true`.
       - Queries all animated elements: asserts computed style `opacity === '1'`.
       - Asserts computed style `animationDuration === '0s'` or `transitionDuration === '0s'`.
       - Asserts NO elements are trapped at `opacity: 0` or `visibility: hidden`.
   - **Visual Snapshot Integrity**:
     - Confirms full text and layout are completely legible and interactable instantly.

```javascript
// Blueprint for tests/e2e/test_motion_and_reduced_motion.js
const { chromium } = require("playwright");

async function testReducedMotion(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  const testRoutes = ["/", "/servis", "/portfolio", "/harga", "/coaching", "/tentang", "/hubungi"];
  for (const r of testRoutes) {
    await page.goto(`${baseUrl}${r}`, { waitUntil: "domcontentloaded" });

    // 1. Verify reduced motion media query is recognized
    const isReduced = await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!isReduced) throw new Error(`Reduced motion media query not matched on ${r}`);

    // 2. Verify all headings and mascots are instantly visible without motion delay
    const visibilityCheck = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const mascot = document.querySelector("img[src*='character']");
      const h1Opacity = h1 ? window.getComputedStyle(h1).opacity : "1";
      const mascotOpacity = mascot ? window.getComputedStyle(mascot).opacity : "1";
      return {
        h1Opacity,
        mascotOpacity,
        h1Found: !!h1,
        mascotFound: !!mascot,
      };
    });

    if (visibilityCheck.h1Opacity !== "1") {
      throw new Error(`Heading trapped at opacity ${visibilityCheck.h1Opacity} on ${r} under reduced-motion`);
    }
    if (visibilityCheck.mascotFound && visibilityCheck.mascotOpacity !== "1") {
      throw new Error(`Mascot trapped at opacity ${visibilityCheck.mascotOpacity} on ${r} under reduced-motion`);
    }
  }
  await browser.close();
}
```

---

### B. Final Dual-Resolution Screenshot Capture Pipeline

Screenshots must be generated as final QA artifacts matching the reference mockups:

1. **Resolution Targets**:
   - **Desktop Primary (Reference Mockup Match)**: `1672 x 941`, `deviceScaleFactor: 1`. Output: `docs/qa/screenshots/desktop/`.
   - **Desktop Standard (1440 Benchmark)**: `1440 x 900`, `deviceScaleFactor: 1`. Output: `docs/qa/screenshots/desktop_1440/`.
   - **Mobile Standard (iPhone 14/15 Viewport)**: `390 x 844`, `deviceScaleFactor: 2`, `isMobile: true`, `hasTouch: true`. Output: `docs/qa/screenshots/mobile/`.

2. **Pre-Capture Settling Protocol**:
   To guarantee zero rendering artifacts, blurred text, or partially loaded images:
   ```javascript
   // Pre-capture stabilization routine
   await page.goto(url, { waitUntil: "networkidle" });
   
   // 1. Wait for mascot and project images to complete loading
   await page.evaluate(async () => {
     const images = Array.from(document.querySelectorAll("img"));
     await Promise.all(
       images.map((img) => {
         if (img.complete) return Promise.resolve();
         return new Promise((resolve) => {
           img.onload = resolve;
           img.onerror = resolve;
         });
       })
     );
   });

   // 2. Scroll cycle to trigger any lazy-loaded elements / ScrollTrigger instances
   await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
   await page.waitForTimeout(200);
   await page.evaluate(() => window.scrollTo(0, 0));

   // 3. Allow GSAP entrance timeline and clearProps to settle
   await page.waitForTimeout(600);
   ```

3. **Required Capture Routes**:
   | # | File Name | Route (BM) | Route (EN) |
   |---|---|---|---|
   | 01 | `01-home.png` / `01-home-en.png` | `/` | `/en` |
   | 02 | `02-services.png` / `02-services-en.png` | `/servis` | `/en/servis` |
   | 03 | `03-portfolio.png` / `03-portfolio-en.png` | `/portfolio` | `/en/portfolio` |
   | 04 | `04-pricing.png` / `04-pricing-en.png` | `/harga` | `/en/harga` |
   | 05 | `05-coaching.png` / `05-coaching-en.png` | `/coaching` | `/en/coaching` |
   | 06 | `06-about.png` / `06-about-en.png` | `/tentang` | `/en/tentang` |
   | 07 | `07-contact.png` / `07-contact-en.png` | `/hubungi` | `/en/hubungi` |

---

### C. Comprehensive Acceptance Criteria Traceability Matrix

Every single requirement from `ORIGINAL_REQUEST.md` is mapped below to an exact verification mechanism:

| Criterion ID | Requirement / Scope | Tier | Automated Test / Assertion Location | Pass / Fail Condition |
|---|---|---|---|---|
| **AC-01** | Home approved headline: `"WEB YANG BUKAN BIASA."` | Visual / E2E | `tests/e2e/audit_and_screenshots.js` | `page.locator('h1').textContent().includes("WEB YANG BUKAN BIASA.")` |
| **AC-02** | Services approved headline: `"BINA IDEA. LANCAR WEB."` | Visual / E2E | `tests/e2e/audit_and_screenshots.js` | `page.locator('h1').textContent().includes("BINA IDEA. LANCAR WEB.")` |
| **AC-03** | Portfolio approved headline: `"IDEA JADI REALITI."` | Visual / E2E | `tests/e2e/audit_and_screenshots.js` | `page.locator('h1').textContent().includes("IDEA JADI REALITI.")` |
| **AC-04** | Pricing approved headline: `"BINA IKUT BAJET."` | Visual / E2E | `tests/e2e/audit_and_screenshots.js` | `page.locator('h1').textContent().includes("BINA IKUT BAJET.")` |
| **AC-05** | Coaching approved headline: `"BELAJAR. BINA. DEPLOY."` | Visual / E2E | `tests/e2e/audit_and_screenshots.js` | `page.locator('h1').textContent().includes("BELAJAR. BINA. DEPLOY.")` |
| **AC-06** | About approved headline: `"SAYA SYAHMI AOF."` | Visual / E2E | `tests/e2e/audit_and_screenshots.js` | `page.locator('h1').textContent().includes("SAYA SYAHMI AOF.")` |
| **AC-07** | Contact approved headline: `"IDEA KAU. KITA BINA."` | Visual / E2E | `tests/e2e/audit_and_screenshots.js` | `page.locator('h1').textContent().includes("IDEA KAU. KITA BINA.")` |
| **AC-08** | Home 3D "SYA" & seated mascot on concrete geometry | Visual / DOM | `tests/e2e/challenger_m2_1_responsive.js` | `ArchitecturalSYA` SVG present, `07_hero_seated_character` loaded |
| **AC-09** | Services builder mascot + cobalt architectural blocks | Visual / DOM | `tests/e2e/challenger_m2_1_responsive.js` | `02_character_builder_laptop` loaded, dual pricing panels present |
| **AC-10** | Portfolio 3D cards + neon glow + honest badges | Visual / DOM | `tests/e2e/audit_and_screenshots.js` | Badges: `KONSEP DEMO`, `EKSPERIMENTAL`, `FRONTEND DEMO` visible |
| **AC-11** | Pricing monumental "04" & hardware terminal configurator | Visual / DOM | `tests/e2e/challenger_stress_test.js` | `ArchitecturalNumeral04` rendered, interactive selectors visible |
| **AC-12** | Coaching colossal "05" plinth & seated creator mascot | Visual / DOM | `tests/e2e/challenger_m2_1_responsive.js` | `ArchitecturalPlinth05` rendered, `03_character_creator_laptop` loaded |
| **AC-13** | About pointing mascot, laptop, & thigh annotation | Visual / DOM | `tests/e2e/challenger_m2_1_responsive.js` | `05_character_pointing_throw`, `06_laptop_closed_floating`, and "KARAKTER VISUAL JENAMA" present |
| **AC-14** | Contact curved yellow arrow & terminal console form | Visual / DOM | `tests/e2e/audit_and_screenshots.js` | Arrow element rendered, form console visible with input fields |
| **AC-15** | Full-page desktop & mobile screenshots captured | Artifact QA | `audit_and_screenshots.js` post-run check | All 14 screenshot files exist in `docs/qa/screenshots/`, size > 50KB |
| **AC-16** | Unit tests pass in Vitest with 0 failures | Unit | `npm test` | Exit code 0, 40 passed (0 failed) |
| **AC-17** | Pricing base arithmetic (RM645, RM1,745, RM2,995, RM3,250) | Unit & E2E | `adversarial_pricing.test.ts` & `challenger_stress_test.js` | Exact MYR strings match base rates |
| **AC-18** | Pricing add-ons math (GSAP +RM400, 2nd Lang +RM250) | Unit & E2E | `pricing.test.ts` & `challenger_stress_test.js` | Business + GSAP = RM2,145; Business + Both = RM2,395 |
| **AC-19** | Full-stack disables frontend add-ons | Unit & E2E | `adversarial_pricing.test.ts` & `challenger_stress_test.js` | `addonsTotal === 0`, `isFullStack === true`, total === 3250 |
| **AC-20** | Parameter handoff `/harga` -> `/hubungi` | E2E Browser | `challenger_stress_test.js` (Test 1.8-1.9) | URL preserves `package`, `estimate`, `addons`; prefilled banner rendered |
| **AC-21** | Parameter handoff `/coaching` -> `/hubungi` | E2E Browser | `challenger_stress_test.js` (Test 3) | URL preserves `topic`, `duration=90`; prefilled banner rendered |
| **AC-22** | Bilingual switcher preserves active query parameters | E2E Browser | `challenger_stress_test.js` (Test 5) | Switching `/harga?estimate=2145` between BM and EN retains `estimate=2145` |
| **AC-23** | Honeypot anti-spam protection (`website_pot`) | Unit & API | `inquiry.test.ts` (test 6) | Submission with `website_pot` filled returns `success: false` |
| **AC-24** | Honest email fallback: HTTP 503 with direct `mailto:` link | E2E Browser | `audit_and_screenshots.js` & `challenger_m2_1_responsive.js` | Form submission renders `mailto:hello@syahmiaof.my` link |
| **AC-25** | `npm run build` exits code 0 with 0 TypeScript/lint errors | Build / Types | `npm run build` & `npx tsc --noEmit` | Exit code 0, 18/18 static pages generated |
| **AC-26** | Zero fake testimonials; concept demos strictly labeled | Content QA | Automated codebase regex grep | 0 results for fake review author names; 100% demo badge presence |
| **AC-27** | WhatsApp CTA displays honest pending configuration notice | Content / UI | `audit_and_screenshots.js` (contact page) | Displays pending notice, no non-functional placeholder links |
| **AC-28** | No fake screenshots (real interactive HTML/CSS components) | Architecture | `challenger_stress_test.js` interactive clicks | Button clicks trigger reactive state updates |
| **AC-29** | Layered GSAP entrance reveals & scroll parallax | Motion E2E | `test_motion_and_reduced_motion.js` | Elements reveal smoothly, parallax translateY verified |
| **AC-30** | Reduced-motion compliance (`prefers-reduced-motion`) | A11y E2E | `test_motion_and_reduced_motion.js` | Elements immediately visible (`opacity: 1`), duration bypassed |
| **AC-31** | Fluid mobile adaptation at 390px (no overflow, clean stacking) | Responsive E2E | `challenger_m2_1_responsive.js` | 70/70 checks pass: `scrollX === 0`, 0 intercepted buttons |
| **AC-32** | Safe server lifecycle on port 3456 (never touch port 3000) | Infra / Ops | Process lifecycle manager harness | Port 3000 untouched; port 3456 safely started, queried, and freed |

---

### D. Safe Server Process Lifecycle Management Architecture

#### 1. Immutable Port 3000 Protection Guard
Every test script MUST start with an explicit, non-bypassable guard:
```javascript
const PORT = 3456;
if (PORT === 3000 || process.env.PORT === "3000") {
  throw new Error("[CRITICAL_SAFETY_VIOLATION] Port 3000 is strictly reserved! Test aborted.");
}
```

#### 2. Deterministic Startup & Old Instance Teardown on Port 3456
Rather than reusing an unknown server on port 3456 (which may be running stale code), the runner should:
1. Check if port 3456 is responding.
2. If responding, inspect the specific PID listening on 3456 using Windows `netstat` and terminate ONLY that PID:
   ```javascript
   function terminatePort(port) {
     if (port === 3000) return; // Hard safeguard
     try {
       const stdout = execSync(`netstat -ano | findstr :${port}`).toString();
       const lines = stdout.trim().split("\n");
       for (const line of lines) {
         const parts = line.trim().split(/\s+/);
         const pid = parts[parts.length - 1];
         if (pid && !isNaN(pid) && Number(pid) > 0) {
           console.log(`[CLEANUP] Terminating stale process PID ${pid} on port ${port}...`);
           execSync(`taskkill /PID ${pid} /T /F`, { stdio: "ignore" });
         }
       }
     } catch (_) {}
   }
   ```
3. Spawn a clean Next.js server instance:
   ```javascript
   const server = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
     stdio: "inherit",
     shell: true,
     env: { ...process.env, PORT: String(PORT) },
   });
   ```
4. Wait for server readiness using resilient polling with exponential backoff (up to 30 seconds).

#### 3. Guaranteed Teardown in `finally` Block
On Windows, standard `server.kill()` only terminates the parent `cmd.exe`/`npx.cmd` process, leaving child `node.exe` worker processes alive.
The runner MUST execute tree termination:
```javascript
finally {
  if (server && server.pid) {
    try {
      execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: "ignore" });
    } catch (_) {
      try { server.kill("SIGTERM"); } catch (_) {}
    }
  }
}
```

---

## 5. Verification Method

To independently verify the test infrastructure and all validation rules:

1. **Verify Unit Tests (Vitest)**:
   ```powershell
   npm test
   ```
   *Expected*: Code 0, 40 passed (0 failed).

2. **Verify Port Safety State**:
   ```powershell
   powershell -Command "Get-NetTCPConnection -LocalPort 3000, 3456 -ErrorAction SilentlyContinue | Select-Object LocalPort, OwningProcess, State"
   ```
   *Expected*: Port 3000 remains untouched (PID 22932); Port 3456 is free.

3. **Verify TypeScript Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected*: Code 0, zero diagnostic errors.

4. **Run Full Milestone 3 E2E Test Suite (Playwright on Port 3456)**:
   ```powershell
   node tests/e2e/challenger_stress_test.js
   node tests/e2e/challenger_m2_1_responsive.js
   node tests/e2e/audit_and_screenshots.js
   ```
   *Expected*: Code 0 across all runs, 50 adversarial assertions passed, 70 responsive checks passed, all 14 full-page screenshots captured in `docs/qa/screenshots/`.
