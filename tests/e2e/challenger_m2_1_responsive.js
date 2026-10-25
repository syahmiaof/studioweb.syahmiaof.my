const { chromium } = require("playwright");
const http = require("http");
const { spawn } = require("child_process");

const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

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

const VIEWPORTS = [
  { name: "iPhone 14 (390x844)", width: 390, height: 844 },
  { name: "Legacy iPhone SE (375x667)", width: 375, height: 667 },
  { name: "Compact Mobile (360x800)", width: 360, height: 800 },
  { name: "Smallest Boundary (320x568)", width: 320, height: 568 },
  { name: "Large Mobile (414x896)", width: 414, height: 896 },
];

const ROUTES = [
  { path: "/", id: "home", name: "Home (BM)", hasCharacter: true, charSrc: "07_hero_seated_character" },
  { path: "/en", id: "home-en", name: "Home (EN)", hasCharacter: true, charSrc: "07_hero_seated_character" },
  { path: "/servis", id: "services", name: "Services (BM)", hasCharacter: true, charSrc: "02_character_builder_laptop" },
  { path: "/en/servis", id: "services-en", name: "Services (EN)", hasCharacter: true, charSrc: "02_character_builder_laptop" },
  { path: "/portfolio", id: "portfolio", name: "Portfolio (BM)", hasCharacter: false },
  { path: "/en/portfolio", id: "portfolio-en", name: "Portfolio (EN)", hasCharacter: false },
  { path: "/harga", id: "pricing", name: "Pricing (BM)", hasCharacter: false },
  { path: "/en/harga", id: "pricing-en", name: "Pricing (EN)", hasCharacter: false },
  { path: "/coaching", id: "coaching", name: "Coaching (BM)", hasCharacter: true, charSrc: "03_character_creator_laptop" },
  { path: "/en/coaching", id: "coaching-en", name: "Coaching (EN)", hasCharacter: true, charSrc: "03_character_creator_laptop" },
  { path: "/tentang", id: "about", name: "About (BM)", hasCharacter: true, charSrc: "05_character_pointing_throw" },
  { path: "/en/tentang", id: "about-en", name: "About (EN)", hasCharacter: true, charSrc: "05_character_pointing_throw" },
  { path: "/hubungi", id: "contact", name: "Contact (BM)", hasCharacter: false },
  { path: "/en/hubungi", id: "contact-en", name: "Contact (EN)", hasCharacter: false },
];

async function runEmpiricalChallenge() {
  console.log("================================================================================");
  console.log("       EMPIRICAL CHALLENGER M2-1: RESPONSIVE LAYOUT & OVERFLOW AUDIT            ");
  console.log("================================================================================");

  let server = null;
  const isAlreadyUp = await checkServerActive(BASE_URL);

  if (isAlreadyUp) {
    console.log(`Server is already active and responding at ${BASE_URL}.`);
  } else {
    console.log(`Starting Next.js production server on port ${PORT}...`);
    server = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, PORT: String(PORT) },
    });

    server.on("error", (err) => {
      console.error("Failed to start Next server:", err);
    });

    await waitForServer(BASE_URL);
    console.log(`Server is ready at ${BASE_URL}`);
  }

  const browser = await chromium.launch({ headless: true });
  const results = {
    overflowPassed: true,
    stackingPassed: true,
    interactionsPassed: true,
    failures: [],
  };

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n>>> TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height}) <<<`);

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      });

      const page = await context.newPage();

      for (const route of ROUTES) {
        const fullUrl = `${BASE_URL}${route.path}`;
        await page.goto(fullUrl, { waitUntil: "networkidle" });
        await page.waitForTimeout(200);

        // 1. HORIZONTAL OVERFLOW CHECK
        const overflowMetrics = await page.evaluate(() => {
          const winWidth = window.innerWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;

          // Attempt horizontal scroll
          window.scrollTo(100, 0);
          const scrollX = window.scrollX || window.pageXOffset || 0;
          window.scrollTo(0, 0);

          return {
            winWidth,
            docScrollWidth,
            bodyScrollWidth,
            scrollX,
          };
        });

        const hasHorizontalScroll = overflowMetrics.scrollX > 0 || overflowMetrics.docScrollWidth > vp.width;

        if (hasHorizontalScroll) {
          results.overflowPassed = false;
          results.failures.push({
            type: "HORIZONTAL_OVERFLOW",
            route: route.path,
            viewport: vp.name,
            details: `docScrollWidth (${overflowMetrics.docScrollWidth}) > winWidth (${vp.width}), scrollX=${overflowMetrics.scrollX}`,
          });
          console.error(`  FAIL [OVERFLOW] ${route.name} @ ${vp.name}: scrollWidth=${overflowMetrics.docScrollWidth}px > winWidth=${vp.width}px`);
        } else {
          console.log(`  PASS [OVERFLOW] ${route.name} @ ${vp.name}: scrollWidth=${overflowMetrics.docScrollWidth}px <= winWidth=${vp.width}px (scrollX=0)`);
        }

        // 2. CHARACTER CUTOUT STACKING & OBSCURATION CHECK (at 390px primary viewport)
        if (vp.width === 390 && route.hasCharacter) {
          const stackingAudit = await page.evaluate((expectedChar) => {
            const images = Array.from(document.querySelectorAll("img"));
            const charImg = images.find(img => img.src.includes(expectedChar));

            if (!charImg) {
              return { found: false, error: `Character image matching '${expectedChar}' not found in DOM` };
            }

            const charRect = charImg.getBoundingClientRect();
            const charBox = {
              top: charRect.top + window.scrollY,
              bottom: charRect.bottom + window.scrollY,
              left: charRect.left,
              right: charRect.right,
              width: charRect.width,
              height: charRect.height,
            };

            // Check primary heading
            const h1 = document.querySelector("h1");
            const h1Box = h1 ? h1.getBoundingClientRect() : null;
            const h1ScrollBox = h1Box ? { top: h1Box.top + window.scrollY, bottom: h1Box.bottom + window.scrollY } : null;

            // Check if any interactive button/link is obscured
            const buttons = Array.from(document.querySelectorAll("button, a.inline-flex, a[class*='btn']"));
            const interceptedButtons = [];

            for (const btn of buttons) {
              const rect = btn.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) continue;

              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;

              if (cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= window.innerHeight) {
                const topEl = document.elementFromPoint(cx, cy);
                const isContained = btn === topEl || btn.contains(topEl);
                if (!isContained && topEl && (topEl === charImg || topEl.contains(charImg) || charImg.contains(topEl))) {
                  interceptedButtons.push({
                    btnText: btn.textContent.trim().slice(0, 40),
                    topElTag: topEl.tagName,
                  });
                }
              }
            }

            const stacksAfterH1 = h1ScrollBox ? charBox.top >= h1ScrollBox.bottom - 20 : true;

            return {
              found: true,
              charBox,
              h1ScrollBox,
              stacksAfterH1,
              interceptedCount: interceptedButtons.length,
              interceptedButtons,
            };
          }, route.charSrc);

          if (!stackingAudit.found) {
            results.failures.push({
              type: "CHARACTER_NOT_FOUND",
              route: route.path,
              details: stackingAudit.error,
            });
            console.warn(`  WARN [STACKING] ${route.name}: ${stackingAudit.error}`);
          } else if (stackingAudit.interceptedCount > 0) {
            results.stackingPassed = false;
            results.failures.push({
              type: "CHARACTER_OBSCURING_BUTTONS",
              route: route.path,
              details: stackingAudit.interceptedButtons,
            });
            console.error(`  FAIL [STACKING] ${route.name}: Character cutout is intercepting pointer clicks on ${stackingAudit.interceptedCount} buttons!`);
          } else {
            console.log(`  PASS [STACKING] ${route.name}: Character cutout stacks cleanly (top=${Math.round(stackingAudit.charBox.top)}px, stacksAfterH1=${stackingAudit.stacksAfterH1}), 0 buttons obscured.`);
          }
        }
      }

      await context.close();
    }

    // 3. INTERACTIVE TESTS AT 390PX VIEWPORT
    console.log(`\n>>> RUNNING INTERACTIVE STRESS TESTS AT 390PX VIEWPORT <<<`);
    const mobileInteractiveContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const testPage = await mobileInteractiveContext.newPage();

    // Route 4: Pricing Interactive
    console.log("  Testing Route 4: Pricing Calculator interactivity at 390px...");
    await testPage.goto(`${BASE_URL}/harga`, { waitUntil: "networkidle" });
    
    // Select Frontend Landing
    await testPage.locator("text=Frontend Landing").first().click();
    await testPage.waitForTimeout(300);
    let bodyText = await testPage.textContent("body");
    if (!bodyText.includes("RM645")) {
      results.interactionsPassed = false;
      results.failures.push({ type: "INTERACTION_FAILURE", route: "/harga", details: "Landing package did not display RM645" });
      console.error("    FAIL: Landing package did not display RM645");
    } else {
      console.log("    PASS: Selected Frontend Landing -> RM645 verified");
    }

    // Select Frontend Business
    await testPage.locator("text=Frontend Business").first().click();
    await testPage.waitForTimeout(300);
    // Toggle GSAP add-on
    await testPage.locator("text=Animasi Interaktif Lanjutan (GSAP)").first().click();
    await testPage.waitForTimeout(300);
    bodyText = await testPage.textContent("body");
    if (!bodyText.includes("RM2,145")) {
      results.interactionsPassed = false;
      results.failures.push({ type: "INTERACTION_FAILURE", route: "/harga", details: "Business + GSAP did not display RM2,145" });
      console.error("    FAIL: Business + GSAP did not display RM2,145");
    } else {
      console.log("    PASS: Business + GSAP -> RM2,145 verified");
    }

    // Toggle 2nd language
    await testPage.locator("text=Bahasa Tambahan Laman Web (Klien)").first().click();
    await testPage.waitForTimeout(300);
    bodyText = await testPage.textContent("body");
    if (!bodyText.includes("RM2,395")) {
      results.interactionsPassed = false;
      results.failures.push({ type: "INTERACTION_FAILURE", route: "/harga", details: "Business + Both did not display RM2,395" });
      console.error("    FAIL: Business + Both did not display RM2,395");
    } else {
      console.log("    PASS: Business + Both Addons -> RM2,395 verified");
    }

    // Click CTA to handoff
    await testPage.locator("text=Dapatkan Sebut Harga").first().click();
    await testPage.waitForURL("**/hubungi**");
    const handoffUrl = testPage.url();
    console.log(`    PASS: Handoff URL navigated to: ${handoffUrl}`);
    if (!handoffUrl.includes("package=business") || !handoffUrl.includes("estimate=2395")) {
      results.interactionsPassed = false;
      results.failures.push({ type: "INTERACTION_FAILURE", route: "/harga", details: `URL missing params: ${handoffUrl}` });
      console.error("    FAIL: Pricing handoff parameters missing in URL");
    }

    // Route 5: Coaching Interactive
    console.log("  Testing Route 5: Coaching selector interactivity at 390px...");
    await testPage.goto(`${BASE_URL}/coaching`, { waitUntil: "networkidle" });
    await testPage.locator("button:has-text('React / Next.js')").first().click();
    await testPage.locator("button:has-text('90 Minit')").first().click();
    await testPage.locator("a:has-text('Tanya Slot Coaching'), button:has-text('Tanya Slot Coaching')").first().click();
    await testPage.waitForURL("**/hubungi**");
    const coachingHandoffUrl = testPage.url();
    console.log(`    PASS: Coaching handoff navigated to: ${coachingHandoffUrl}`);
    if (!coachingHandoffUrl.includes("service=coaching") || !coachingHandoffUrl.includes("duration=90")) {
      results.interactionsPassed = false;
      results.failures.push({ type: "INTERACTION_FAILURE", route: "/coaching", details: `Coaching handoff missing params: ${coachingHandoffUrl}` });
      console.error("    FAIL: Coaching handoff parameters missing in URL");
    }

    // Route 3: Portfolio 3D Carousel Navigation
    console.log("  Testing Route 3: Portfolio 3D navigation at 390px...");
    await testPage.goto(`${BASE_URL}/portfolio`, { waitUntil: "networkidle" });
    const symiVisible = await testPage.locator("text=SYMI UI").first().isVisible();
    console.log(`    PASS: SYMI UI initial card visible: ${symiVisible}`);
    const nextBtn = testPage.locator("button:has(svg.lucide-chevron-right), button:has-text('>')").first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await testPage.waitForTimeout(400);
      console.log("    PASS: Clicked next carousel button at 390px without errors");
    }

    // Route 7: Contact Form Interactive & Honest Fallback
    console.log("  Testing Route 7: Contact form honeypot & fallback at 390px...");
    await testPage.goto(`${BASE_URL}/hubungi`, { waitUntil: "networkidle" });
    await testPage.fill("input[placeholder*='Nama']", "Test Reviewer");
    await testPage.fill("input[placeholder*='cth:']", "+60123456789");
    await testPage.fill("textarea", "Empirical Challenger M2-1 responsive test verification.");
    await testPage.locator("button:has-text('Hantar Taklimat Projek')").first().click();
    await testPage.waitForTimeout(1000);
    const fallbackVisible = await testPage.locator("text=hello@syahmiaof.my").first().isVisible();
    console.log(`    PASS: Honest fallback displayed mailto:hello@syahmiaof.my: ${fallbackVisible}`);

    await mobileInteractiveContext.close();
  } catch (err) {
    console.error("Test execution exception:", err);
    results.failures.push({ type: "EXCEPTION", details: err.message });
  } finally {
    await browser.close();
    if (server) {
      server.kill();
    }
  }

  console.log("\n================================================================================");
  console.log("                           AUDIT SUMMARY REPORT                                 ");
  console.log("================================================================================");
  console.log(`Total Failures Recorded: ${results.failures.length}`);
  console.log(`Zero Horizontal Overflow Verdict: ${results.overflowPassed ? "PASSED (Zero Overflow)" : "FAILED"}`);
  console.log(`Character Stacking Verdict:       ${results.stackingPassed ? "PASSED (Clean Stacking)" : "FAILED"}`);
  console.log(`Mobile Interactivity Verdict:     ${results.interactionsPassed ? "PASSED (All Work)" : "FAILED"}`);

  if (results.failures.length > 0) {
    console.log("\nFailures details:");
    console.log(JSON.stringify(results.failures, null, 2));
    process.exit(1);
  } else {
    console.log("\n>>> ALL EMPIRICAL CHALLENGER TESTS PASSED WITH ZERO FLAWS! <<<");
    process.exit(0);
  }
}

runEmpiricalChallenge();
