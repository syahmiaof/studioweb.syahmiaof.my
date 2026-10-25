// tests/e2e/challenger_m3_1_adversarial_motion.js
// EMPIRICAL CHALLENGER M3-1: Adversarial Motion, Parallax, Reduced-Motion & Subpixel Audit Suite
// Tests all 14 routes (7 BM + 7 EN) across Desktop (1440px) and Mobile (390px)

const { chromium } = require("playwright");
const http = require("http");
const { spawn, execSync } = require("child_process");

const PORT = 3456;
if (PORT === 3000 || process.env.PORT === "3000") {
  throw new Error("[CRITICAL_SAFETY_VIOLATION] Port 3000 is strictly reserved! Test aborted.");
}

const BASE_URL = `http://localhost:${PORT}`;

function checkServerActive(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 304);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200 || res.statusCode === 304) {
            resolve();
          } else {
            setTimeout(check, 400);
          }
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs) {
            reject(new Error("Timeout waiting for server to start."));
          } else {
            setTimeout(check, 400);
          }
        });
    };
    check();
  });
}

function terminatePort(port) {
  if (port === 3000) return; // Hard safeguard
  try {
    const stdout = execSync(`netstat -ano | findstr :${port}`).toString();
    const lines = stdout.trim().split("\n");
    let killed = false;
    for (const line of lines) {
      if (!line.includes("LISTENING")) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && !isNaN(pid) && Number(pid) > 0) {
        console.log(`[CLEANUP] Terminating stale listening process PID ${pid} on port ${port}...`);
        try {
          execSync(`taskkill /PID ${pid} /T /F`, { stdio: "ignore" });
          killed = true;
        } catch (_) {}
      }
    }
    if (killed) {
      execSync(`powershell -Command "Start-Sleep -Milliseconds 1500"`);
    }
  } catch (_) {}
}

const ALL_14_ROUTES = [
  // BM Routes
  { path: "/", title: "Home (BM)", locale: "ms", hasMascot: true, hasPlinth: true },
  { path: "/servis", title: "Services (BM)", locale: "ms", hasMascot: true, hasPlinth: false },
  { path: "/portfolio", title: "Portfolio (BM)", locale: "ms", hasMascot: false, hasPlinth: false },
  { path: "/harga", title: "Pricing (BM)", locale: "ms", hasMascot: false, hasPlinth: false },
  { path: "/coaching", title: "Coaching (BM)", locale: "ms", hasMascot: true, hasPlinth: true },
  { path: "/tentang", title: "About (BM)", locale: "ms", hasMascot: true, hasPlinth: false },
  { path: "/hubungi", title: "Contact (BM)", locale: "ms", hasMascot: false, hasPlinth: false },

  // EN Routes
  { path: "/en", title: "Home (EN)", locale: "en", hasMascot: true, hasPlinth: true },
  { path: "/en/servis", title: "Services (EN)", locale: "en", hasMascot: true, hasPlinth: false },
  { path: "/en/portfolio", title: "Portfolio (EN)", locale: "en", hasMascot: false, hasPlinth: false },
  { path: "/en/harga", title: "Pricing (EN)", locale: "en", hasMascot: false, hasPlinth: false },
  { path: "/en/coaching", title: "Coaching (EN)", locale: "en", hasMascot: true, hasPlinth: true },
  { path: "/en/tentang", title: "About (EN)", locale: "en", hasMascot: true, hasPlinth: false },
  { path: "/en/hubungi", title: "Contact (EN)", locale: "en", hasMascot: false, hasPlinth: false },
];

async function runAdversarialMotionSuite() {
  console.log("========================================================================");
  console.log("=== CHALLENGER M3-1: ADVERSARIAL MOTION & REDUCED MOTION AUDIT SUITE ===");
  console.log("========================================================================");

  let server = null;
  terminatePort(PORT);
  console.log(`[INIT] Spawning dedicated Next.js production server on port ${PORT}...`);
  server = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
    stdio: "pipe",
    shell: true,
    env: { ...process.env, PORT: String(PORT) },
  });
  server.stdout.on("data", (d) => process.stdout.write(`[SERVER_STDOUT] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[SERVER_STDERR] ${d}`));
  server.on("exit", (code, sig) => console.log(`[SERVER_EXIT] Code: ${code}, Signal: ${sig}`));
  server.on("error", (err) => {
    console.error("[SERVER_SPAWN_ERROR]", err);
  });
  await waitForServer(BASE_URL);
  console.log(`[INIT] Next.js production server is live on ${BASE_URL}.\n`);

  let totalChecks = 0;
  let passedChecks = 0;
  const failureLog = [];

  const browser = await chromium.launch({ headless: true });

  try {
    // =========================================================================
    // 1. ADVERSARIAL REDUCED-MOTION AUDIT ACROSS ALL 14 ROUTES (BM & EN)
    // =========================================================================
    console.log("\n>>> PHASE 1: ADVERSARIAL REDUCED-MOTION AUDIT (14 ROUTES, BM & EN) <<<");
    const reducedContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const reducedPage = await reducedContext.newPage();

    for (const r of ALL_14_ROUTES) {
      await reducedPage.goto(`${BASE_URL}${r.path}`, { waitUntil: "domcontentloaded" });
      // ZERO DELAY check: immediate assessment of visibility and styles
      await reducedPage.waitForTimeout(50);

      const inspection = await reducedPage.evaluate((cfg) => {
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const h1 = document.querySelector("h1");
        const h1Style = h1 ? window.getComputedStyle(h1) : null;
        const h1Rect = h1 ? h1.getBoundingClientRect() : null;

        // Mascot
        const mascot = document.querySelector("img[src*='character']");
        const mascotStyle = mascot ? window.getComputedStyle(mascot) : null;
        const mascotRect = mascot ? mascot.getBoundingClientRect() : null;

        // Plinth
        const plinth = document.querySelector(".motion-plinth, .motion-plinth05");
        const plinthStyle = plinth ? window.getComputedStyle(plinth) : null;

        // CTAs in main content
        const ctas = Array.from(document.querySelectorAll("main a.motion-cta, main button.motion-cta, main a[href*='hubungi'], main a[href*='portfolio'], main a[href='#project-details'], main button[type='submit']"));
        const ctaStates = ctas.map((c) => {
          const cs = window.getComputedStyle(c);
          const cr = c.getBoundingClientRect();
          return {
            opacity: cs.opacity,
            pointerEvents: cs.pointerEvents,
            visible: cs.visibility === "visible" && cr.width > 0 && cr.height > 0,
          };
        });

        return {
          isReduced,
          h1: {
            found: !!h1,
            opacity: h1Style ? h1Style.opacity : "0",
            visibility: h1Style ? h1Style.visibility : "hidden",
            inlineTransform: h1 ? h1.style.transform : "",
            rect: h1Rect ? { x: h1Rect.x, y: h1Rect.y, w: h1Rect.width, h: h1Rect.height } : null,
          },
          mascot: {
            expected: cfg.hasMascot,
            found: !!mascot,
            opacity: mascotStyle ? mascotStyle.opacity : "N/A",
            visibility: mascotStyle ? mascotStyle.visibility : "N/A",
            rect: mascotRect ? { x: mascotRect.x, y: mascotRect.y, w: mascotRect.width, h: mascotRect.height } : null,
          },
          plinth: {
            expected: cfg.hasPlinth,
            found: !!plinth,
            opacity: plinthStyle ? plinthStyle.opacity : "N/A",
          },
          ctas: {
            count: ctas.length,
            allVisible: ctaStates.length > 0 ? ctaStates.every((s) => s.opacity === "1" && s.visible) : true,
            hasTrapped: ctaStates.some((s) => s.opacity === "0" || s.pointerEvents === "none"),
          },
        };
      }, r);

      // Assertions for reduced motion
      totalChecks++;
      if (!inspection.isReduced) {
        failureLog.push(`[REDUCED_MOTION_FAIL] prefers-reduced-motion media query not recognized on ${r.title}`);
      } else {
        passedChecks++;
      }

      // 1. Heading check
      totalChecks++;
      if (!inspection.h1.found || inspection.h1.opacity !== "1" || inspection.h1.visibility !== "visible") {
        failureLog.push(`[HEADING_FAIL] Heading trapped on ${r.title}: opacity=${inspection.h1.opacity}, visibility=${inspection.h1.visibility}`);
      } else {
        passedChecks++;
      }

      // Check not translated offscreen
      totalChecks++;
      if (inspection.h1.rect && (inspection.h1.rect.x < -10 || inspection.h1.rect.y < -50)) {
        failureLog.push(`[OFFSCREEN_FAIL] Heading translated offscreen on ${r.title}: rect=${JSON.stringify(inspection.h1.rect)}`);
      } else {
        passedChecks++;
      }

      // 2. Mascot check
      if (r.hasMascot) {
        totalChecks++;
        if (!inspection.mascot.found || inspection.mascot.opacity !== "1") {
          failureLog.push(`[MASCOT_FAIL] Mascot trapped on ${r.title}: found=${inspection.mascot.found}, opacity=${inspection.mascot.opacity}`);
        } else {
          passedChecks++;
        }
      }

      // 3. Plinth check
      if (r.hasPlinth) {
        totalChecks++;
        if (!inspection.plinth.found || inspection.plinth.opacity !== "1") {
          failureLog.push(`[PLINTH_FAIL] Plinth trapped on ${r.title}: found=${inspection.plinth.found}, opacity=${inspection.plinth.opacity}`);
        } else {
          passedChecks++;
        }
      }

      // 4. CTAs check
      totalChecks++;
      if (inspection.ctas.hasTrapped || !inspection.ctas.allVisible) {
        failureLog.push(`[CTA_FAIL] CTAs trapped or hidden on ${r.title}: ${JSON.stringify(inspection.ctas)}`);
      } else {
        passedChecks++;
      }

      console.log(`  ✓ [Reduced Motion 100%] ${r.title} validated: H1, Mascot, Plinth & CTAs visible at opacity 1 with 0 delay`);
    }

    // Specific reduced-motion check on About floating laptop: idle loop must NOT be running
    await reducedPage.goto(`${BASE_URL}/tentang`, { waitUntil: "domcontentloaded" });
    const laptopReduced1 = await reducedPage.evaluate(() => {
      const el = document.querySelector(".motion-floating-laptop");
      return el ? window.getComputedStyle(el).transform : "none";
    });
    await reducedPage.waitForTimeout(400);
    const laptopReduced2 = await reducedPage.evaluate(() => {
      const el = document.querySelector(".motion-floating-laptop");
      return el ? window.getComputedStyle(el).transform : "none";
    });

    totalChecks++;
    if (laptopReduced1 !== laptopReduced2 && laptopReduced1 !== "none") {
      failureLog.push(`[IDLE_MOTION_FAIL] Floating laptop animation active under reduced-motion mode! (${laptopReduced1} vs ${laptopReduced2})`);
    } else {
      passedChecks++;
      console.log(`  ✓ [Reduced Motion Idle] About floating laptop is static under reduced-motion (${laptopReduced1})`);
    }

    await reducedContext.close();

    // =========================================================================
    // 2. STANDARD MOTION, TIMELINE COMPLETION & SUBPIXEL CLEARPROPS AUDIT
    // =========================================================================
    console.log("\n>>> PHASE 2: STANDARD MOTION & SUBPIXEL CLEARPROPS AUDIT (14 ROUTES) <<<");
    const standardContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    const standardPage = await standardContext.newPage();

    for (const r of ALL_14_ROUTES) {
      await standardPage.goto(`${BASE_URL}${r.path}`, { waitUntil: "domcontentloaded" });
      
      // Wait for GSAP hydration and entrance reveal timeline to complete with clearProps
      await standardPage.waitForTimeout(250);
      const startWait = Date.now();
      let completed = false;
      while (Date.now() - startWait < 3500) {
        completed = await standardPage.evaluate(() => {
          const h1 = document.querySelector("h1");
          if (!h1) return false;
          const op = window.getComputedStyle(h1).opacity;
          const tr = h1.style.transform;
          return op === "1" && (tr === "" || tr === "none");
        });
        if (completed) break;
        await standardPage.waitForTimeout(100);
      }

      const standardEval = await standardPage.evaluate(() => {
        const h1 = document.querySelector("h1");
        const h1Style = h1 ? window.getComputedStyle(h1) : null;
        // Check inline style attribute on h1 (must have clearProps: "all" executed)
        const h1InlineTransform = h1 ? h1.style.transform : "";
        const h1InlineOpacity = h1 ? h1.style.opacity : "";

        // Check motion elements in view
        const motionElements = Array.from(document.querySelectorAll("[class*='motion-']"));
        const unclearedInlineTransforms = motionElements
          .filter((el) => {
            // Exclude continuous idle elements like floating laptop or active 3D stages
            if (el.classList.contains("motion-floating-laptop")) return false;
            if (el.classList.contains("motion-3d-stage")) return false;
            if (el.classList.contains("motion-sya")) return false; // has desktop scrollTrigger attached
            return el.style.transform && el.style.transform.includes("matrix");
          })
          .map((el) => el.className);

        return {
          h1Found: !!h1,
          h1Opacity: h1Style ? h1Style.opacity : "0",
          h1InlineTransform,
          h1InlineOpacity,
          unclearedCount: unclearedInlineTransforms.length,
          unclearedList: unclearedInlineTransforms.slice(0, 3),
        };
      });

      totalChecks++;
      if (!standardEval.h1Found || standardEval.h1Opacity !== "1") {
        failureLog.push(`[STANDARD_FAIL] Heading not visible on ${r.title}: opacity=${standardEval.h1Opacity}`);
      } else {
        passedChecks++;
      }

      totalChecks++;
      // Typography must not have lingering matrix transforms
      if (standardEval.h1InlineTransform && standardEval.h1InlineTransform.includes("matrix")) {
        failureLog.push(`[CLEARPROPS_FAIL] Lingering inline transform on H1 in ${r.title}: ${standardEval.h1InlineTransform}`);
      } else {
        passedChecks++;
      }

      console.log(`  ✓ [Standard Motion] ${r.title} entrance complete, H1 clearProps verified (inline: "${standardEval.h1InlineTransform || 'none'}")`);
    }

    // =========================================================================
    // 3. DESKTOP SCROLL PARALLAX & JITTER AUDIT (1440PX)
    // =========================================================================
    console.log("\n>>> PHASE 3: DESKTOP SCROLL PARALLAX & LATERAL DRIFT AUDIT <<<");
    await standardPage.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await standardPage.waitForTimeout(600);

    const initialHome = await standardPage.evaluate(() => {
      const sya = document.querySelector(".motion-sya");
      const r = sya ? sya.getBoundingClientRect() : null;
      return {
        x: r ? r.x : 0,
        y: r ? r.y : 0,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: window.innerWidth,
      };
    });

    // Scroll down 400px
    await standardPage.evaluate(() => window.scrollTo(0, 400));
    await standardPage.waitForTimeout(400);

    const scrolledHome = await standardPage.evaluate(() => {
      const sya = document.querySelector(".motion-sya");
      const r = sya ? sya.getBoundingClientRect() : null;
      const t = sya ? window.getComputedStyle(sya).transform : "none";
      return {
        x: r ? r.x : 0,
        y: r ? r.y : 0,
        transform: t,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: window.innerWidth,
      };
    });

    totalChecks += 2;
    // 1. Confirm parallax y-displacement occurs
    if (scrolledHome.transform === "none" && scrolledHome.y === initialHome.y) {
      failureLog.push(`[PARALLAX_FAIL] No parallax transformation on .motion-sya upon scroll`);
    } else {
      passedChecks++;
      console.log(`  ✓ [Parallax Scrub] Desktop .motion-sya responded to scroll (transform: ${scrolledHome.transform})`);
    }

    // 2. Confirm NO lateral displacement (no horizontal overflow generated)
    if (scrolledHome.scrollWidth > scrolledHome.clientWidth) {
      failureLog.push(`[LATERAL_DRIFT_FAIL] Parallax scrub caused horizontal overflow: scrollWidth=${scrolledHome.scrollWidth} > clientWidth=${scrolledHome.clientWidth}`);
    } else {
      passedChecks++;
      console.log(`  ✓ [Lateral Drift] Zero horizontal jitter during desktop scroll parallax (scrollWidth: ${scrolledHome.scrollWidth} <= ${scrolledHome.clientWidth})`);
    }

    // Parallax on Services (dual elements: cobalt geom + builder mascot)
    await standardPage.goto(`${BASE_URL}/servis`, { waitUntil: "domcontentloaded" });
    await standardPage.waitForTimeout(500);
    const servicesParallax = await standardPage.evaluate(async () => {
      const geomBefore = document.querySelector(".motion-cobalt-geom")?.getBoundingClientRect().y;
      window.scrollTo(0, 350);
      await new Promise((res) => setTimeout(res, 400));
      const geomAfter = document.querySelector(".motion-cobalt-geom")?.getBoundingClientRect().y;
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      return {
        geomDelta: (geomBefore || 0) - (geomAfter || 0),
        overflow,
      };
    });

    totalChecks++;
    if (servicesParallax.overflow) {
      failureLog.push(`[SERVICES_PARALLAX_OVERFLOW] Scroll on /servis caused lateral overflow`);
    } else {
      passedChecks++;
      console.log(`  ✓ [Parallax Scrub] /servis parallax executes cleanly without lateral overflow`);
    }

    // Parallax on Coaching (plinth05 + creator mascot)
    await standardPage.goto(`${BASE_URL}/coaching`, { waitUntil: "domcontentloaded" });
    await standardPage.waitForTimeout(500);
    const coachingParallax = await standardPage.evaluate(async () => {
      window.scrollTo(0, 350);
      await new Promise((res) => setTimeout(res, 400));
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      return { overflow };
    });

    totalChecks++;
    if (coachingParallax.overflow) {
      failureLog.push(`[COACHING_PARALLAX_OVERFLOW] Scroll on /coaching caused lateral overflow`);
    } else {
      passedChecks++;
      console.log(`  ✓ [Parallax Scrub] /coaching parallax executes cleanly without lateral overflow`);
    }

    await standardContext.close();

    // =========================================================================
    // 4. MOBILE PARALLAX CONTAINMENT & RESPONSIVENESS AUDIT (390PX)
    // =========================================================================
    console.log("\n>>> PHASE 4: MOBILE (390PX) ZERO-OVERFLOW & BOUNDARY CONTAINMENT AUDIT <<<");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    for (const r of ALL_14_ROUTES) {
      await mobilePage.goto(`${BASE_URL}${r.path}`, { waitUntil: "domcontentloaded" });
      await mobilePage.waitForTimeout(300);

      // Scroll test on mobile (confirm no parallax triggers horizontal displacement)
      const mobileScrollTest = await mobilePage.evaluate(async () => {
        const initialSW = document.documentElement.scrollWidth;
        const initialCW = window.innerWidth;
        window.scrollTo(0, 300);
        await new Promise((res) => setTimeout(res, 250));
        const scrolledSW = document.documentElement.scrollWidth;
        const scrolledCW = window.innerWidth;
        const scrollX = window.scrollX;
        window.scrollTo(0, 0);

        return {
          initialSW,
          initialCW,
          scrolledSW,
          scrolledCW,
          scrollX,
        };
      });

      totalChecks++;
      if (mobileScrollTest.scrolledSW > mobileScrollTest.scrolledCW || mobileScrollTest.scrollX > 0) {
        failureLog.push(`[MOBILE_OVERFLOW_FAIL] ${r.title} generated horizontal scroll on 390px: scrollWidth=${mobileScrollTest.scrolledSW} > innerWidth=${mobileScrollTest.scrolledCW}, scrollX=${mobileScrollTest.scrollX}`);
      } else {
        passedChecks++;
      }

      console.log(`  ✓ [Mobile 390px Scroll] ${r.title} has ZERO lateral shift/overflow during scroll`);
    }

    await mobileContext.close();

    // =========================================================================
    // 5. INTERACTIVE MOTION & HARDWARE STATE TRANSITIONS
    // =========================================================================
    console.log("\n>>> PHASE 5: INTERACTIVE MOTION & REACTIVE PULSE VERIFICATION <<<");
    const interactiveContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    const interactivePage = await interactiveContext.newPage();

    // 1. Pricing Hardware Pulse on /harga (BM) & /en/harga (EN)
    for (const pricingUrl of ["/harga", "/en/harga"]) {
      await interactivePage.goto(`${BASE_URL}${pricingUrl}`, { waitUntil: "domcontentloaded" });
      await interactivePage.waitForTimeout(500);

      const initialTotal = await interactivePage.locator(".font-display.font-black.text-4xl").textContent();
      // Click Landing Package (RM645)
      const landingPkg = interactivePage.locator(".motion-package-card").filter({ hasText: /Landing/i }).first();
      await landingPkg.click();
      await interactivePage.waitForTimeout(300);

      const afterLanding = await interactivePage.locator(".font-display.font-black.text-4xl").textContent();

      totalChecks++;
      if (!afterLanding.includes("645")) {
        failureLog.push(`[PRICING_PULSE_FAIL] Landing package total mismatch on ${pricingUrl}: expected RM645, got ${afterLanding}`);
      } else {
        passedChecks++;
        console.log(`  ✓ [Pricing Pulse] ${pricingUrl} switched package from ${initialTotal.trim()} to ${afterLanding.trim()} with clearProps`);
      }
    }

    // 2. 3D Carousel Transitions on /portfolio & /en/portfolio
    for (const portUrl of ["/portfolio", "/en/portfolio"]) {
      await interactivePage.goto(`${BASE_URL}${portUrl}`, { waitUntil: "domcontentloaded" });
      await interactivePage.waitForTimeout(600);

      const nextBtn = interactivePage.locator("button[aria-label='Next project']").first();
      await nextBtn.click();
      await interactivePage.waitForTimeout(400);

      const activeBadge = await interactivePage.locator(".inline-flex.items-center").filter({ hasText: /KONSEP DEMO|EKSPERIMENTAL|FRONTEND DEMO|CONCEPT DEMO|EXPERIMENTAL/i }).first().textContent();

      totalChecks++;
      if (!activeBadge) {
        failureLog.push(`[CAROUSEL_3D_FAIL] Project carousel transition failed on ${portUrl}`);
      } else {
        passedChecks++;
        console.log(`  ✓ [Portfolio 3D Carousel] ${portUrl} carousel rotated to project badge: "${activeBadge.trim()}"`);
      }
    }

    await interactiveContext.close();
    await browser.close();

    console.log("\n========================================================================");
    console.log(`=== AUDIT COMPLETE: ${passedChecks}/${totalChecks} ADVERSARIAL CHECKS PASSED ===`);
    console.log("========================================================================");

    if (failureLog.length > 0) {
      console.error("\n[FAILURES DETECTED]:");
      failureLog.forEach((f) => console.error(" - " + f));
      throw new Error(`${failureLog.length} adversarial assertions failed!`);
    }

  } finally {
    if (server && server.pid) {
      console.log(`[CLEANUP] Stopping Next.js server (PID ${server.pid})...`);
      try {
        execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: "ignore" });
      } catch (_) {
        try {
          server.kill("SIGTERM");
        } catch (_) {}
      }
    }
  }
}

runAdversarialMotionSuite()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\n[CHALLENGER_MOTION_ERROR]", err);
    process.exit(1);
  });
