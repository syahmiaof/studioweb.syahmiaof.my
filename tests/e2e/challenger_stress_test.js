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

async function runChallengerStressTest() {
  console.log("==================================================================");
  console.log("=== EMPIRICAL CHALLENGER: ADVERSARIAL PRICING & STATE SUITE ===");
  console.log("==================================================================");

  let server = null;
  const isAlreadyUp = await checkServerActive(BASE_URL);

  if (isAlreadyUp) {
    console.log(`[INIT] Server already running at ${BASE_URL}. Reusing existing instance.`);
  } else {
    console.log(`[INIT] Starting Next.js production server on port ${PORT}...`);
    server = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, PORT: String(PORT) },
    });
    await waitForServer(BASE_URL);
    console.log(`[INIT] Server verified active at ${BASE_URL}`);
  }

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    let passedAssertions = 0;
    const assert = (condition, msg) => {
      if (!condition) {
        throw new Error(`[ASSERTION_FAILED] ${msg}`);
      }
      passedAssertions++;
      console.log(`  [PASS] ${msg}`);
    };

    // -------------------------------------------------------------------------
    // TEST SECTION 1: Exhaustive Interactive Pricing Transitions (BM)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 1: Interactive Pricing Configurator State Machine (/harga) ---");
    await page.goto(`${BASE_URL}/harga`, { waitUntil: "networkidle" });

    // 1.1 Verify default state is Business (RM1,745)
    let bodyText = await page.textContent("body");
    assert(bodyText.includes("RM1,745"), "Default state displays base price RM1,745");
    let ctaHref = await page.locator("a:has-text('Dapatkan Sebut Harga')").getAttribute("href");
    assert(ctaHref.includes("package=business"), "Default CTA href targets package=business");
    assert(ctaHref.includes("estimate=1745"), "Default CTA href targets estimate=1745");

    // 1.2 Switch to Frontend Landing
    console.log("  Transition: Click 'Frontend Landing'...");
    await page.locator("text=Frontend Landing").first().click();
    await page.waitForTimeout(200);
    bodyText = await page.textContent("body");
    assert(bodyText.includes("RM645"), "Selecting Landing updates price to RM645");
    ctaHref = await page.locator("a:has-text('Dapatkan Sebut Harga')").getAttribute("href");
    assert(ctaHref.includes("package=landing"), "CTA updates to package=landing");
    assert(ctaHref.includes("estimate=645"), "CTA updates to estimate=645");

    // 1.3 Switch to Frontend Premium
    console.log("  Transition: Click 'Frontend Premium'...");
    await page.locator("text=Frontend Premium").first().click();
    await page.waitForTimeout(200);
    bodyText = await page.textContent("body");
    assert(bodyText.includes("RM2,995"), "Selecting Premium updates price to RM2,995");
    ctaHref = await page.locator("a:has-text('Dapatkan Sebut Harga')").getAttribute("href");
    assert(ctaHref.includes("package=premium"), "CTA updates to package=premium");
    assert(ctaHref.includes("estimate=2995"), "CTA updates to estimate=2995");

    // 1.4 Add Animation to Premium (2995 + 400 = 3395)
    console.log("  Transition: Toggle 'Animasi Interaktif Lanjutan (GSAP)' ON...");
    await page.locator("text=Animasi Interaktif Lanjutan (GSAP)").first().click();
    await page.waitForTimeout(200);
    bodyText = await page.textContent("body");
    assert(bodyText.includes("RM3,395"), "Premium + Animation calculates RM3,395");
    ctaHref = await page.locator("a:has-text('Dapatkan Sebut Harga')").getAttribute("href");
    assert(ctaHref.includes("addons=animation"), "CTA href includes addons=animation");
    assert(ctaHref.includes("estimate=3395"), "CTA href includes estimate=3395");

    // 1.5 Add Second Language to Premium (3395 + 250 = 3645)
    console.log("  Transition: Toggle 'Bahasa Tambahan Laman Web (Klien)' ON...");
    await page.locator("text=Bahasa Tambahan Laman Web (Klien)").first().click();
    await page.waitForTimeout(200);
    bodyText = await page.textContent("body");
    assert(bodyText.includes("RM3,645"), "Premium + Both Add-ons calculates RM3,645");
    ctaHref = await page.locator("a:has-text('Dapatkan Sebut Harga')").getAttribute("href");
    assert(ctaHref.includes("estimate=3645"), "CTA href includes estimate=3645");

    // 1.6 Switch back to Frontend Business with both add-ons active (1745 + 400 + 250 = 2395)
    console.log("  Transition: Click 'Frontend Business' with both add-ons preserved...");
    await page.locator("text=Frontend Business").first().click();
    await page.waitForTimeout(200);
    bodyText = await page.textContent("body");
    assert(bodyText.includes("RM2,395"), "Business + Both Add-ons calculates RM2,395");
    ctaHref = await page.locator("a:has-text('Dapatkan Sebut Harga')").getAttribute("href");
    assert(ctaHref.includes("package=business"), "CTA preserves package=business");
    assert(ctaHref.includes("estimate=2395"), "CTA updates to estimate=2395");

    // 1.7 Toggle OFF Second Language (2395 - 250 = 2145)
    console.log("  Transition: Toggle 'Bahasa Tambahan Laman Web (Klien)' OFF...");
    await page.locator("text=Bahasa Tambahan Laman Web (Klien)").first().click();
    await page.waitForTimeout(200);
    bodyText = await page.textContent("body");
    assert(bodyText.includes("RM2,145"), "Business + Animation alone calculates RM2,145");
    ctaHref = await page.locator("a:has-text('Dapatkan Sebut Harga')").getAttribute("href");
    assert(ctaHref.includes("addons=animation"), "CTA has addons=animation");
    assert(ctaHref.includes("estimate=2145"), "CTA updates to estimate=2145");

    // 1.8 Click CTA to test parameter handoff to /hubungi
    console.log("  Action: Click 'Dapatkan Sebut Harga' -> navigate to /hubungi...");
    await page.locator("a:has-text('Dapatkan Sebut Harga')").first().click();
    await page.waitForURL("**/hubungi**");
    const navigatedUrl = page.url();
    assert(
      navigatedUrl.includes("/hubungi?service=website-ui&package=business&addons=animation&estimate=2145"),
      `Exact handoff URL verified: ${navigatedUrl}`
    );

    // 1.9 Verify Contact page correctly ingested the active quote parameters
    const contactText = await page.textContent("body");
    assert(
      contactText.includes("SEBUT HARGA AKTIF: Frontend Business"),
      "Contact page displays 'SEBUT HARGA AKTIF: Frontend Business'"
    );
    assert(contactText.includes("RM2,145"), "Contact page displays estimate RM2,145");
    assert(contactText.includes("animation"), "Contact page displays addon animation");

    // -------------------------------------------------------------------------
    // TEST SECTION 2: Custom Full-Stack Quote Handoff (/harga -> /hubungi)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 2: Custom Full-Stack Quote Handoff ---");
    await page.goto(`${BASE_URL}/harga`, { waitUntil: "networkidle" });
    const fullstackLink = page.locator("a[href*='service=full-stack']").first();
    assert(await fullstackLink.isVisible(), "Full-Stack banner link is visible");
    await fullstackLink.click();
    await page.waitForURL("**/hubungi**");
    const fsUrl = page.url();
    assert(
      fsUrl.includes("service=full-stack&package=custom-system"),
      `Full-stack handoff URL verified: ${fsUrl}`
    );

    // -------------------------------------------------------------------------
    // TEST SECTION 3: Coaching Configurator State & Handoff (/coaching -> /hubungi)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 3: Coaching Duration & Topic Handoff ---");
    await page.goto(`${BASE_URL}/coaching`, { waitUntil: "networkidle" });

    // 3.1 Verify default coaching handoff link (react-next, 90)
    let coachCta = await page.locator("a:has-text('Tanya Slot Coaching')").getAttribute("href");
    assert(coachCta.includes("topic=react-next"), "Default coaching topic is react-next");
    assert(coachCta.includes("duration=90"), "Default coaching duration is 90");

    // 3.2 Change to topic: web-fundamentals (Asas Web) and duration: 60 Minit
    console.log("  Transition: Select 'Asas Web' and '60 Minit'...");
    await page.locator("button:has-text('Asas Web')").click();
    await page.locator("button:has-text('60 Minit')").click();
    await page.waitForTimeout(200);

    coachCta = await page.locator("a:has-text('Tanya Slot Coaching')").getAttribute("href");
    assert(coachCta.includes("topic=web-fundamentals"), "CTA updated to topic=web-fundamentals");
    assert(coachCta.includes("duration=60"), "CTA updated to duration=60");

    // 3.3 Click CTA and verify arrival at /hubungi with coaching context
    console.log("  Action: Click 'Tanya Slot Coaching'...");
    await page.locator("a:has-text('Tanya Slot Coaching')").click();
    await page.waitForURL("**/hubungi**");
    const arrivedCoachUrl = page.url();
    assert(
      arrivedCoachUrl.includes("service=coaching&topic=web-fundamentals&duration=60"),
      `Coaching handoff URL verified: ${arrivedCoachUrl}`
    );

    const coachContactText = await page.textContent("body");
    assert(
      coachContactText.includes("SESI COACHING AKTIF: WEB-FUNDAMENTALS"),
      "Contact page displays 'SESI COACHING AKTIF: WEB-FUNDAMENTALS'"
    );
    assert(coachContactText.includes("60 Minit"), "Contact page displays '60 Minit'");

    // -------------------------------------------------------------------------
    // TEST SECTION 4: English Routes (/en/harga & /en/coaching & /en/hubungi)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 4: English Pricing & Coaching Calculations (/en/harga) ---");
    await page.goto(`${BASE_URL}/en/harga`, { waitUntil: "networkidle" });

    const enBodyText = await page.textContent("body");
    assert(enBodyText.includes("PRICING STUDIO"), "English page has 'PRICING STUDIO'");
    assert(enBodyText.includes("SELECT BASE PACKAGE"), "English page has 'SELECT BASE PACKAGE'");
    assert(enBodyText.includes("RM1,745"), "English default shows RM1,745");

    // Test calculation on English route: Select Landing -> RM645
    await page.locator("text=Frontend Landing").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM645"), "EN: Landing calculates RM645");

    // Add Animation: 645 + 400 = 1045
    await page.locator("text=Advanced Interactive Animation (GSAP)").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM1,045"), "EN: Landing + Animation calculates RM1,045");

    // Add Second Language: 1045 + 250 = 1295
    await page.locator("text=Client Website Additional Language").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM1,295"), "EN: Landing + Both calculates RM1,295");

    // Select Business: 1745 + 650 = 2395
    await page.locator("text=Frontend Business").first().click();
    await page.waitForTimeout(200);
    assert((await page.textContent("body")).includes("RM2,395"), "EN: Business + Both calculates RM2,395");

    // Click English quote CTA -> must go to /en/hubungi with parameters
    const enCta = page.locator("a:has-text('Request Formal Quote')").first();
    assert(await enCta.isVisible(), "English quote CTA 'Request Formal Quote' is visible");
    await enCta.click();
    await page.waitForURL("**/en/hubungi**");
    const enHandoffUrl = page.url();
    assert(
      enHandoffUrl.includes("/en/hubungi?service=website-ui&package=business&addons=animation%2Csecond-lang&estimate=2395"),
      `English quote handoff URL verified: ${enHandoffUrl}`
    );

    // -------------------------------------------------------------------------
    // TEST SECTION 5: Language Switcher Query Parameter Preservation
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 5: Language Switcher Query Parameter Preservation ---");

    // 5.1 Simple estimate query: /harga?estimate=2145
    await page.goto(`${BASE_URL}/harga?estimate=2145`, { waitUntil: "networkidle" });
    const enSwitcher = page.locator("header").getByRole("link", { name: "EN", exact: true }).first();
    await enSwitcher.click();
    await page.waitForURL("**/en/harga**");
    assert(
      page.url().includes("/en/harga?estimate=2145"),
      `Query preserved when switching BM -> EN: ${page.url()}`
    );

    // 5.2 Switch back: /en/harga?estimate=2145 -> /harga?estimate=2145
    const bmSwitcher = page.locator("header").getByRole("link", { name: "BM", exact: true }).first();
    await bmSwitcher.click();
    await page.waitForURL(`${BASE_URL}/harga*`);
    assert(
      page.url().includes("/harga?estimate=2145"),
      `Query preserved when switching EN -> BM: ${page.url()}`
    );

    // 5.3 Complex multi-parameter query handoff on /hubungi
    const complexParams = "service=website-ui&package=business&addons=animation%2Csecond-lang&estimate=2395";
    await page.goto(`${BASE_URL}/hubungi?${complexParams}`, { waitUntil: "networkidle" });

    await page.locator("header").getByRole("link", { name: "EN", exact: true }).first().click();
    await page.waitForURL("**/en/hubungi**");
    assert(
      page.url().includes(`/en/hubungi?${complexParams}`),
      `Complex query preserved on EN switch: ${page.url()}`
    );

    await page.locator("header").getByRole("link", { name: "BM", exact: true }).first().click();
    await page.waitForURL(`${BASE_URL}/hubungi*`);
    assert(
      page.url().includes(`/hubungi?${complexParams}`),
      `Complex query preserved on BM switch: ${page.url()}`
    );

    // -------------------------------------------------------------------------
    // TEST SECTION 6: Mobile (390px Viewport) State & Interaction Test
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 6: Mobile Viewport (390px) Interaction & Language Switcher ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(`${BASE_URL}/harga?estimate=2145`, { waitUntil: "networkidle" });

    // Mobile header language toggle
    const mobileEnToggle = mobilePage.locator("header a:has-text('EN'):visible");
    assert(await mobileEnToggle.isVisible(), "Mobile EN toggle is visible in header");
    await mobileEnToggle.click();
    await mobilePage.waitForURL("**/en/harga**");
    assert(
      mobilePage.url().includes("/en/harga?estimate=2145"),
      `Mobile query preserved BM -> EN: ${mobilePage.url()}`
    );

    // Mobile hamburger menu toggle
    const hamburgerBtn = mobilePage.locator("button[aria-label='Toggle navigation menu']");
    assert(await hamburgerBtn.isVisible(), "Mobile hamburger menu button is visible");
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(200);
    const mobileNavAbout = mobilePage.locator("header a:has-text('About'):visible");
    assert(await mobileNavAbout.isVisible(), "Mobile navigation drawer opened successfully");
    await hamburgerBtn.click(); // Close drawer
    await mobilePage.waitForTimeout(200);

    await mobileContext.close();
    await context.close();
    await browser.close();

    console.log("\n==================================================================");
    console.log(`=== ALL ${passedAssertions} ADVERSARIAL ASSERTIONS PASSED WITH ZERO ERRORS ===`);
    console.log("==================================================================");
  } finally {
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
}

runChallengerStressTest()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[CHALLENGER_TEST_ERROR]", err);
    process.exit(1);
  });
