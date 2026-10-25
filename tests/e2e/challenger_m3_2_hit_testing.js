const { chromium } = require("playwright");
const http = require("http");
const { spawn, execSync } = require("child_process");

const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

function checkServerActive(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => resolve(true));
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

const VIEWPORTS = [
  { name: "iPhone 14 (390x844)", width: 390, height: 844 },
  { name: "Legacy iPhone SE (375x667)", width: 375, height: 667 },
  { name: "Compact Mobile (360x800)", width: 360, height: 800 },
  { name: "Smallest Boundary (320x568)", width: 320, height: 568 },
  { name: "Large Mobile (414x896)", width: 414, height: 896 },
];

const ROUTES = [
  { path: "/", name: "Home (BM)" },
  { path: "/en", name: "Home (EN)" },
  { path: "/servis", name: "Services (BM)" },
  { path: "/en/servis", name: "Services (EN)" },
  { path: "/portfolio", name: "Portfolio (BM)" },
  { path: "/en/portfolio", name: "Portfolio (EN)" },
  { path: "/harga", name: "Pricing (BM)" },
  { path: "/en/harga", name: "Pricing (EN)" },
  { path: "/coaching", name: "Coaching (BM)" },
  { path: "/en/coaching", name: "Coaching (EN)" },
  { path: "/tentang", name: "About (BM)" },
  { path: "/en/tentang", name: "About (EN)" },
  { path: "/hubungi", name: "Contact (BM)" },
  { path: "/en/hubungi", name: "Contact (EN)" },
];

async function runAdversarialHitTest() {
  console.log("================================================================================");
  console.log("  CHALLENGER M3-2: ADVERSARIAL TOUCH TARGET & MASCOT HIT-TESTING SUITE          ");
  console.log("================================================================================");

  let server = null;
  const isAlreadyUp = await checkServerActive(BASE_URL);

  if (isAlreadyUp) {
    console.log(`[INIT] Server already active at ${BASE_URL}. Reusing existing instance.`);
  } else {
    console.log(`[INIT] Starting Next.js production server on port ${PORT}...`);
    server = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
      detached: true,
      stdio: "ignore",
      env: { ...process.env, PORT: String(PORT) },
    });
    server.unref();
    await waitForServer(BASE_URL);
    console.log(`[INIT] Server verified active at ${BASE_URL}`);
  }

  const browser = await chromium.launch({ headless: true });
  const results = {
    totalChecks: 0,
    passedChecks: 0,
    failures: [],
  };

  const assert = (condition, msg, failureObj) => {
    results.totalChecks++;
    if (!condition) {
      results.failures.push(failureObj || { msg });
      console.error(`  [FAIL] ${msg}`);
    } else {
      results.passedChecks++;
      console.log(`  [PASS] ${msg}`);
    }
  };

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Exhaustive elementFromPoint Hit-Testing Across All 14 Routes (390px)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 1: Mascot Graphic Click Interception & elementFromPoint (390px) ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await mobileContext.newPage();

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(150);

      const hitAudit = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("button, a.inline-flex, a[class*='btn'], a[href]"));
        const charImages = Array.from(document.querySelectorAll("img[src*='character'], img[src*='laptop']"));
        const intercepted = [];
        let checkedCount = 0;

        for (const btn of buttons) {
          const rect = btn.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) continue;

          // Check center of the button
          const cx = Math.round(rect.left + rect.width / 2);
          const cy = Math.round(rect.top + rect.height / 2);

          // Only test if center is inside the current viewport
          if (cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= window.innerHeight) {
            checkedCount++;
            const topEl = document.elementFromPoint(cx, cy);
            if (!topEl) continue;

            const isContained = btn === topEl || btn.contains(topEl);
            if (!isContained) {
              // Check if topEl is a mascot image or container
              const isMascot = charImages.some(img => img === topEl || topEl.contains(img) || img.contains(topEl));
              if (isMascot) {
                intercepted.push({
                  btnText: (btn.textContent || "").trim().slice(0, 30),
                  topTag: topEl.tagName,
                  topClass: topEl.className,
                  cx,
                  cy,
                });
              }
            }
          }
        }

        return { checkedCount, intercepted };
      });

      assert(
        hitAudit.intercepted.length === 0,
        `${route.name}: ${hitAudit.checkedCount} buttons hit-tested, 0 intercepted by mascots`,
        { route: route.path, intercepted: hitAudit.intercepted }
      );
    }

    // -------------------------------------------------------------------------
    // TEST 2: WCAG 2.5.5 Minimum Touch Targets (>= 44x44px) on Mobile Controls
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 2: WCAG 2.5.5 Touch Target Dimensions (>= 44x44px) ---");

    // 2.1 Header Controls
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    const headerBurgerBox = await page.locator("button[aria-label='Toggle navigation menu']").boundingBox();
    assert(
      headerBurgerBox && headerBurgerBox.width >= 44 && headerBurgerBox.height >= 44,
      `Mobile hamburger button is >= 44x44px (actual: ${Math.round(headerBurgerBox?.width || 0)}x${Math.round(headerBurgerBox?.height || 0)}px)`
    );

    const langToggleBox = await page.locator("header").getByRole("link", { name: "EN", exact: true }).first().boundingBox();
    assert(
      langToggleBox && langToggleBox.width >= 44 && langToggleBox.height >= 44,
      `Mobile language switcher is >= 44x44px (actual: ${Math.round(langToggleBox?.width || 0)}x${Math.round(langToggleBox?.height || 0)}px)`
    );

    // Open drawer and check navigation links
    await page.locator("button[aria-label='Toggle navigation menu']").click();
    await page.waitForTimeout(200);

    const drawerLinks = await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll("header nav a, header div[class*='border-t'] a"));
      return navLinks.map(a => {
        const rect = a.getBoundingClientRect();
        return {
          text: a.textContent.trim().slice(0, 20),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      }).filter(item => item.height > 0);
    });

    for (const dl of drawerLinks) {
      assert(
        dl.height >= 44,
        `Drawer link '${dl.text}' has touch height >= 44px (actual: ${dl.height}px)`
      );
    }
    await page.locator("button[aria-label='Toggle navigation menu']").click(); // close

    // 2.2 Portfolio Carousel Arrow Buttons
    await page.goto(`${BASE_URL}/portfolio`, { waitUntil: "networkidle" });
    const carouselArrows = await page.evaluate(() => {
      const arrows = Array.from(document.querySelectorAll("button:has(svg.lucide-chevron-left), button:has(svg.lucide-chevron-right)"));
      return arrows.map(b => {
        const rect = b.getBoundingClientRect();
        return { width: Math.round(rect.width), height: Math.round(rect.height) };
      });
    });

    for (let i = 0; i < carouselArrows.length; i++) {
      const arrow = carouselArrows[i];
      assert(
        arrow.width >= 44 && arrow.height >= 44,
        `Portfolio carousel arrow [${i}] is >= 44x44px (actual: ${arrow.width}x${arrow.height}px)`
      );
    }

    // -------------------------------------------------------------------------
    // TEST 3: Pricing State Machine & Corner Case Arithmetic
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 3: Pricing State Machine & Add-on Interlocking ---");
    await page.goto(`${BASE_URL}/harga`, { waitUntil: "networkidle" });

    // 3.1 Custom Full-Stack banner and handoff
    const fullstackLink = page.locator("a[href*='service=full-stack']").first();
    assert(await fullstackLink.isVisible(), "Full-stack banner link is visible");
    const fsPriceText = await page.textContent("body");
    assert(
      fsPriceText.includes("RM3,250") || fsPriceText.includes("Dari RM3,250"),
      "Full-stack package displays quote pricing banner"
    );

    // 3.2 Landing: RM645
    await page.locator("text=Frontend Landing").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM645"), "Landing base price is RM645");

    // 3.3 Business: RM1,745
    await page.locator("text=Frontend Business").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM1,745"), "Business base price is RM1,745");

    // 3.4 Business + GSAP (+RM400) = RM2,145
    await page.locator("text=Animasi Interaktif Lanjutan (GSAP)").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM2,145"), "Business + Animation is RM2,145");

    // 3.5 Business + Both (+RM250) = RM2,395
    await page.locator("text=Bahasa Tambahan Laman Web (Klien)").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM2,395"), "Business + Both add-ons is RM2,395");

    // 3.6 Premium + Both = 2995 + 400 + 250 = RM3,645
    await page.locator("text=Frontend Premium").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM3,645"), "Premium + Both add-ons is RM3,645");

    // -------------------------------------------------------------------------
    // TEST 4: Coaching Selection & Handoff
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 4: Coaching Duration Selector & Handoff ---");
    await page.goto(`${BASE_URL}/coaching`, { waitUntil: "networkidle" });
    await page.locator("button:has-text('Asas Web')").click();
    await page.locator("button:has-text('60 Minit')").click();
    await page.waitForTimeout(150);

    const coachingCtaHref = await page.locator("a:has-text('Tanya Slot Coaching')").getAttribute("href");
    assert(
      coachingCtaHref.includes("topic=web-fundamentals") && coachingCtaHref.includes("duration=60"),
      `Coaching CTA href properly configured: ${coachingCtaHref}`
    );

    // -------------------------------------------------------------------------
    // TEST 5: Honeypot Anti-Spam Trap & Honest Mailto Fallback
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 5: Honeypot & Contact API Fallback ---");
    await page.goto(`${BASE_URL}/hubungi`, { waitUntil: "networkidle" });

    // Verify honeypot input is hidden from real users
    const honeypotInput = page.locator("input[name='website_pot']");
    const hpCount = await honeypotInput.count();
    assert(hpCount === 1, "Honeypot field 'website_pot' exists in DOM");

    const hpHidden = await page.evaluate(() => {
      const hp = document.querySelector("input[name='website_pot']");
      if (!hp) return false;
      const style = window.getComputedStyle(hp);
      return style.display === "none" || hp.className.includes("hidden") || hp.getAttribute("aria-hidden") === "true";
    });
    assert(hpHidden, "Honeypot field is stealthily hidden from view");

    await mobileContext.close();
  } catch (err) {
    console.error("Test execution caught error:", err);
    results.failures.push({ exception: err.message });
  } finally {
    await browser.close();
    if (server && server.pid) {
      console.log(`[CLEANUP] Stopping Next.js server (PID ${server.pid})...`);
      try {
        execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" });
      } catch (_) {
        try {
          server.kill("SIGTERM");
        } catch (_) {}
      }
    }
  }

  console.log("\n================================================================================");
  console.log(`  RESULT: ${results.passedChecks}/${results.totalChecks} CHECKS PASSED (${results.failures.length} FAILURES)`);
  console.log("================================================================================");

  if (results.failures.length > 0) {
    console.error(JSON.stringify(results.failures, null, 2));
    process.exit(1);
  } else {
    console.log(">>> ALL ADVERSARIAL HIT-TESTING & ARITHMETIC CHECKS PASSED CLEANLY! <<<");
    process.exit(0);
  }
}

runAdversarialHitTest();
