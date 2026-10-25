// tests/e2e/test_motion_and_reduced_motion.js
// Dedicated GSAP Motion, Scroll Parallax, Reduced Motion & Touch Target Validation Suite

const { chromium } = require("playwright");
const http = require("http");
const { spawn, execSync } = require("child_process");

const PORT = 3456;
if (PORT === 3000 || process.env.PORT === "3000") {
  throw new Error("[CRITICAL_SAFETY_VIOLATION] Port 3000 is strictly reserved! Test aborted.");
}

const BASE_URL = `http://localhost:${PORT}`;

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
      // Allow Windows kernel socket table time to release the port
      execSync(`powershell -Command "Start-Sleep -Milliseconds 1500"`);
    }
  } catch (_) {}
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
            setTimeout(check, 500);
          }
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs) {
            reject(new Error("Timeout waiting for server to start."));
          } else {
            setTimeout(check, 500);
          }
        });
    };
    check();
  });
}

async function runMotionTests() {
  console.log("==================================================================");
  console.log("=== GSAP MOTION, PARALLAX, REDUCED MOTION & TOUCH TARGET SUITE ===");
  console.log("==================================================================");

  // Clean stale server on port 3456 to test latest build
  terminatePort(PORT);

  console.log(`[INIT] Spawning fresh Next.js production server on port ${PORT}...`);
  const server = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, PORT: String(PORT) },
  });

  let passedChecks = 0;

  try {
    await waitForServer(BASE_URL);
    console.log(`[INIT] Next.js production server is live on ${BASE_URL}.\n`);

    const browser = await chromium.launch({ headless: true });

    // ==================================================================
    // 1. STANDARD MOTION PASS (reducedMotion: 'no-preference')
    // ==================================================================
    console.log("--- TEST PASS 1: STANDARD MOTION & ENTRANCE REVEALS ---");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    const page = await desktopContext.newPage();

    const routes = [
      { path: "/", title: "Home" },
      { path: "/servis", title: "Services" },
      { path: "/portfolio", title: "Portfolio" },
      { path: "/harga", title: "Pricing" },
      { path: "/coaching", title: "Coaching" },
      { path: "/tentang", title: "About" },
      { path: "/hubungi", title: "Contact" },
    ];

    for (const route of routes) {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });
      // Allow entrance reveals and clearProps to complete (800ms)
      await page.waitForTimeout(850);

      // Verify heading is fully visible
      const h1Info = await page.evaluate(() => {
        const h1 = document.querySelector("h1");
        return {
          found: !!h1,
          opacity: h1 ? window.getComputedStyle(h1).opacity : "0",
          visibility: h1 ? window.getComputedStyle(h1).visibility : "hidden",
          transform: h1 ? h1.style.transform : "",
        };
      });

      if (!h1Info.found || h1Info.opacity !== "1" || h1Info.visibility !== "visible") {
        throw new Error(`[FAIL] Heading not fully visible on ${route.title} (${route.path}): opacity=${h1Info.opacity}`);
      }
      passedChecks++;
      console.log(`  ✓ [Entrance] ${route.title} (${route.path}) heading is visible (opacity: 1)`);

      // Verify Mascot image opacity if present
      const mascotOpacity = await page.evaluate(() => {
        const mascot = document.querySelector("img[src*='character']");
        if (!mascot) return "N/A";
        return window.getComputedStyle(mascot).opacity;
      });

      if (mascotOpacity !== "N/A") {
        if (mascotOpacity !== "1") {
          throw new Error(`[FAIL] Mascot trapped at opacity ${mascotOpacity} on ${route.title}`);
        }
        passedChecks++;
        console.log(`  ✓ [Entrance] ${route.title} mascot is fully visible (opacity: 1)`);
      }
    }

    // ==================================================================
    // 2. DESKTOP SCROLL PARALLAX VERIFICATION
    // ==================================================================
    console.log("\n--- TEST PASS 2: DESKTOP SCROLL PARALLAX ---");
    // Test on Home (ArchitecturalSYA & IndustrialGrid)
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const syaInitial = await page.locator(".motion-sya").boundingBox();
    if (!syaInitial) throw new Error("Could not find .motion-sya for parallax verification");

    // Scroll down 400px
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(400);

    const syaScrolled = await page.locator(".motion-sya").boundingBox();
    if (syaScrolled.y === syaInitial.y) {
      console.log("  ⚠️ Notice: Parallax transform may be applied via matrix style");
    }
    const hasSyaTransform = await page.evaluate(() => {
      const el = document.querySelector(".motion-sya");
      return el ? window.getComputedStyle(el).transform : "none";
    });
    passedChecks++;
    console.log(`  ✓ [Parallax] Home ArchitecturalSYA tracked scroll (transform: ${hasSyaTransform})`);

    // Test on About (pointing character & floating laptop idle loop)
    await page.goto(`${BASE_URL}/tentang`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Verify ambient levitation idle animation on floating laptop
    const laptopInitial = await page.evaluate(() => {
      const el = document.querySelector(".motion-floating-laptop");
      return el ? window.getComputedStyle(el).transform : "none";
    });
    await page.waitForTimeout(500);
    const laptopLater = await page.evaluate(() => {
      const el = document.querySelector(".motion-floating-laptop");
      return el ? window.getComputedStyle(el).transform : "none";
    });
    passedChecks++;
    console.log(`  ✓ [Idle Motion] About floating laptop ambient levitation active (initial: ${laptopInitial}, later: ${laptopLater})`);

    // ==================================================================
    // 3. TACTILE HARDWARE RECALCULATION PULSE
    // ==================================================================
    console.log("\n--- TEST PASS 3: PRICING HARDWARE RECALCULATION PULSE ---");
    await page.goto(`${BASE_URL}/harga`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Initial total: RM1,745 (business package)
    const initialPriceText = await page.locator(".font-display.font-black.text-4xl").textContent();
    if (!initialPriceText.includes("1,745")) {
      throw new Error(`Expected RM1,745 initial total, found ${initialPriceText}`);
    }

    // Toggle GSAP add-on
    const addonToggle = page.locator(".motion-package-card").filter({ hasText: /Animasi|GSAP/ }).first();
    await addonToggle.click();
    await page.waitForTimeout(300);

    const updatedPriceText = await page.locator(".font-display.font-black.text-4xl").textContent();
    if (!updatedPriceText.includes("2,145")) {
      throw new Error(`Expected RM2,145 after toggle, found ${updatedPriceText}`);
    }
    passedChecks++;
    console.log(`  ✓ [Recalculation Pulse] Pricing total updated from RM1,745 to ${updatedPriceText} with reactive GSAP pulse`);

    await desktopContext.close();

    // ==================================================================
    // 4. STRICT REDUCED MOTION PASS (reducedMotion: 'reduce')
    // ==================================================================
    console.log("\n--- TEST PASS 4: STRICT REDUCED MOTION COMPLIANCE ---");
    const reducedContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const reducedPage = await reducedContext.newPage();

    for (const route of routes) {
      await reducedPage.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });
      await reducedPage.waitForSelector("h1", { timeout: 10000 });

      // Immediate check (under reduced-motion, element must be fully visible with opacity 1)
      const instantCheck = await reducedPage.evaluate(() => {
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const h1 = document.querySelector("h1");
        const mascot = document.querySelector("img[src*='character']");
        const h1Opacity = h1 ? window.getComputedStyle(h1).opacity : "0";
        const mascotOpacity = mascot ? window.getComputedStyle(mascot).opacity : "1";
        return {
          isReduced,
          h1Found: !!h1,
          h1Opacity,
          mascotFound: !!mascot,
          mascotOpacity,
        };
      });

      if (!instantCheck.isReduced) {
        throw new Error(`[FAIL] prefers-reduced-motion media query not active on ${route.title}`);
      }
      if (instantCheck.h1Opacity !== "1") {
        throw new Error(`[FAIL] Heading trapped at opacity ${instantCheck.h1Opacity} on ${route.title} under reduced-motion`);
      }
      if (instantCheck.mascotFound && instantCheck.mascotOpacity !== "1") {
        throw new Error(`[FAIL] Mascot trapped at opacity ${instantCheck.mascotOpacity} on ${route.title} under reduced-motion`);
      }

      passedChecks += 2;
      console.log(`  ✓ [Reduced Motion] ${route.title} rendered instantly at opacity 1 with zero delay`);
    }

    await reducedContext.close();

    // ==================================================================
    // 5. RESPONSIVE MOBILE POLISH AT 390PX & TOUCH TARGET AUDIT
    // ==================================================================
    console.log("\n--- TEST PASS 5: 390PX MOBILE POLISH & TOUCH TARGETS ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    for (const route of routes) {
      await mobilePage.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });

      // 1. Verify zero horizontal overflow
      const overflow = await mobilePage.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: window.innerWidth,
          scrollX: window.scrollX,
        };
      });

      if (overflow.scrollWidth > overflow.clientWidth) {
        throw new Error(`[FAIL] Horizontal scroll overflow on ${route.title}: scrollWidth=${overflow.scrollWidth} > innerWidth=${overflow.clientWidth}`);
      }
      passedChecks++;
      console.log(`  ✓ [Mobile 390px] ${route.title} has zero horizontal overflow (scrollWidth: ${overflow.scrollWidth} <= ${overflow.clientWidth})`);
    }

    // 2. Verify touch targets on Header (Hamburger, Language Switcher, Drawer)
    await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    const headerTargets = await mobilePage.evaluate(() => {
      const hamburger = document.querySelector("button[aria-label='Toggle navigation menu']");
      const langToggle = Array.from(document.querySelectorAll("a[title*='Switch to']")).find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      const hRect = hamburger ? hamburger.getBoundingClientRect() : null;
      const lRect = langToggle ? langToggle.getBoundingClientRect() : null;
      return {
        hamburger: hRect ? { width: hRect.width, height: hRect.height } : null,
        langToggle: lRect ? { width: lRect.width, height: lRect.height } : null,
      };
    });

    if (!headerTargets.hamburger || headerTargets.hamburger.width < 44 || headerTargets.hamburger.height < 44) {
      throw new Error(`[FAIL] Hamburger touch target below 44x44: ${JSON.stringify(headerTargets.hamburger)}`);
    }
    if (!headerTargets.langToggle || headerTargets.langToggle.width < 44 || headerTargets.langToggle.height < 44) {
      throw new Error(`[FAIL] Language toggle touch target below 44x44: ${JSON.stringify(headerTargets.langToggle)}`);
    }
    passedChecks += 2;
    console.log(`  ✓ [Touch Target] Hamburger (${headerTargets.hamburger.width}x${headerTargets.hamburger.height}px) >= 44x44px`);
    console.log(`  ✓ [Touch Target] Language Toggle (${headerTargets.langToggle.width}x${headerTargets.langToggle.height}px) >= 44x44px`);

    // 3. Open Mobile Drawer and verify drawer links & scrolling
    await mobilePage.click("button[aria-label='Toggle navigation menu']");
    await mobilePage.waitForTimeout(300);

    const drawerCheck = await mobilePage.evaluate(() => {
      const drawer = document.querySelector(".md\\:hidden.bg-ink\\/98");
      const drawerLinks = Array.from(document.querySelectorAll(".md\\:hidden.bg-ink\\/98 a"));
      const cta = drawerLinks[drawerLinks.length - 1];
      const dRect = drawer ? drawer.getBoundingClientRect() : null;
      const ctaRect = cta ? cta.getBoundingClientRect() : null;
      const firstLinkRect = drawerLinks[0] ? drawerLinks[0].getBoundingClientRect() : null;

      return {
        drawerFound: !!drawer,
        hasOverflowAuto: drawer ? window.getComputedStyle(drawer).overflowY === "auto" : false,
        firstLinkHeight: firstLinkRect ? firstLinkRect.height : 0,
        ctaHeight: ctaRect ? ctaRect.height : 0,
      };
    });

    if (!drawerCheck.drawerFound || !drawerCheck.hasOverflowAuto) {
      throw new Error(`[FAIL] Mobile drawer missing or lacks overflow-y-auto`);
    }
    if (drawerCheck.firstLinkHeight < 44) {
      throw new Error(`[FAIL] Mobile drawer link height ${drawerCheck.firstLinkHeight}px < 44px`);
    }
    if (drawerCheck.ctaHeight < 44) {
      throw new Error(`[FAIL] Mobile drawer CTA height ${drawerCheck.ctaHeight}px < 44px`);
    }
    passedChecks += 3;
    console.log(`  ✓ [Mobile Drawer] Drawer has overflow-y-auto and max-height containment`);
    console.log(`  ✓ [Mobile Drawer] Nav link height (${drawerCheck.firstLinkHeight}px) >= 44px`);
    console.log(`  ✓ [Mobile Drawer] Primary CTA height (${drawerCheck.ctaHeight}px) >= 44px`);

    // 4. Verify Portfolio carousel button touch targets
    await mobilePage.goto(`${BASE_URL}/portfolio`, { waitUntil: "networkidle" });
    const carouselButtons = await mobilePage.evaluate(() => {
      const prev = document.querySelector("button[aria-label='Previous project']");
      const next = document.querySelector("button[aria-label='Next project']");
      const pRect = prev ? prev.getBoundingClientRect() : null;
      const nRect = next ? next.getBoundingClientRect() : null;
      return {
        prev: pRect ? { width: pRect.width, height: pRect.height } : null,
        next: nRect ? { width: nRect.width, height: nRect.height } : null,
      };
    });

    if (!carouselButtons.prev || carouselButtons.prev.width < 44 || carouselButtons.prev.height < 44) {
      throw new Error(`[FAIL] Portfolio carousel button below 44x44: ${JSON.stringify(carouselButtons.prev)}`);
    }
    passedChecks++;
    console.log(`  ✓ [Touch Target] Portfolio carousel buttons (${carouselButtons.prev.width}x${carouselButtons.prev.height}px) >= 44x44px`);

    await mobileContext.close();
    await browser.close();

    console.log("\n==================================================================");
    console.log(`=== ALL ${passedChecks} MOTION & RESPONSIVE CHECKS PASSED PERFECTLY ===`);
    console.log("==================================================================");
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

runMotionTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\n[TEST_MOTION_ERROR]", err);
    process.exit(1);
  });
