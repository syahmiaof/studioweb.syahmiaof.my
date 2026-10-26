const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.BASE_URL || "http://localhost:3461";
const report = { base, checks: [], lifecycle: [], errors: [] };
function check(name, passed) {
  assert.ok(passed, name);
  report.checks.push(name);
  console.log("PASS", name);
}
async function main() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (error) => report.errors.push(error.message));
    for (const width of [1440, 1920]) {
      await page.setViewportSize({
        width,
        height: width === 1440 ? 900 : 1080,
      });
      await page.goto(base + "/en/harga", { waitUntil: "networkidle" });
      await page.waitForFunction(() => document.documentElement.lang === "en");
      await page.evaluate(() => document.fonts.ready);
      const boxes = await page.evaluate(() => {
        const titleRight = Math.max(
          ...Array.from(
            document.querySelectorAll(".pricing-copy .display-line"),
            (line) => line.getBoundingClientRect().right,
          ),
        );
        const console = document
          .querySelector(".pricing-console")
          .getBoundingClientRect();
        return { titleRight, consoleLeft: console.left };
      });
      check(
        "English pricing title clears console at " + width,
        boxes.titleRight + 16 <= boxes.consoleLeft,
      );
      await page.screenshot({
        path: `docs/qa/screenshots/astra-v2/after/${width}x${width === 1440 ? 900 : 1080}/04-pricing-en.png`,
      });
    }
    await page.goto(base + "/portfolio", { waitUntil: "networkidle" });
    await page.locator(".project-card").first().waitFor();
    check("Portfolio loads all Nemo records", (await page.locator(".project-card").count()) === 23);
    await page.getByRole("searchbox").fill("Uber Pokmi");
    check("Portfolio search narrows to Uber Pokmi", (await page.locator(".project-card").count()) === 1 && (await page.locator(".project-card h3").innerText()) === "Uber Pokmi");
    await page.getByRole("searchbox").fill("");
    await page.getByRole("button", { name: /Ditangguhkan/ }).click();
    check("Status filter returns the eight on-hold Nemo records", (await page.locator(".project-card").count()) === 8);
    await page.getByRole("button", { name: /Semua/ }).click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Performance.enable");
    // Same-document navigation exercises React/useGSAP cleanup; reloads would hide leaks.
    for (let cycle = 0; cycle < 4; cycle++) {
      for (const label of [
        "Servis",
        "Portfolio",
        "Harga",
        "Coaching",
        "Tentang",
        "Hubungi",
        "Utama",
      ]) {
        const route = {
          Servis: "/servis",
          Portfolio: "/portfolio",
          Harga: "/harga",
          Coaching: "/coaching",
          Tentang: "/tentang",
          Hubungi: "/hubungi",
          Utama: "/",
        }[label];
        await page
          .locator(".studio-nav")
          .getByRole("link", { name: label, exact: true })
          .click();
        await page.waitForURL((url) => url.pathname === route);
        await page.waitForTimeout(1150);
        check(
          `One mounted scene: cycle ${cycle + 1}, ${label}`,
          (await page.locator(".studio-page").count()) === 1,
        );
      }
      await cdp.send("HeapProfiler.collectGarbage");
      const counters = await cdp.send("Memory.getDOMCounters");
      const { metrics } = await cdp.send("Performance.getMetrics");
      report.lifecycle.push({
        cycle: cycle + 1,
        ...counters,
        heapUsedBytes: metrics.find((m) => m.name === "JSHeapUsedSize").value,
      });
    }
    const settled = report.lifecycle.slice(1);
    check(
      "Media listeners do not accumulate after route cycles",
      settled.every(
        (sample) => sample.jsEventListeners === settled[0].jsEventListeners,
      ),
    );
    check(
      "DOM nodes do not accumulate after route cycles",
      settled.every((sample) => sample.nodes === settled[0].nodes),
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(300);
    check(
      "Reduced motion media change leaves headline visible",
      await page
        .locator(".display-line")
        .first()
        .evaluate((el) => getComputedStyle(el).clipPath === "none"),
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(base + "/harga", { waitUntil: "networkidle" });
    await page.getByRole("checkbox", { name: /Animasi Lanjutan/ }).waitFor();
    // Initialize Playwright's main-world poller before counting native listeners.
    // Its first waitForFunction call installs 13 listeners independently of this app.
    await page.waitForFunction(() => !!document.querySelector(".estimate-number"));
    await page.waitForTimeout(1200);
    await cdp.send("HeapProfiler.collectGarbage");
    const pricingInitial = await cdp.send("Memory.getDOMCounters");
    // Warm the first interactive update before testing repeated-update growth.
    await page.getByRole("checkbox", { name: /Animasi Lanjutan/ }).check();
    await page.getByRole("checkbox", { name: /Animasi Lanjutan/ }).uncheck();
    await page.waitForTimeout(600);
    await cdp.send("HeapProfiler.collectGarbage");
    const pricingBefore = await cdp.send("Memory.getDOMCounters");
    for (let i = 0; i < 10; i++) {
      await page
        .getByRole("checkbox", { name: /Animasi Lanjutan/ })
        .setChecked(i % 2 === 0);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(
      () =>
        document.querySelector(".estimate-number")?.textContent === "RM499",
    );
    check(
      "Mid-tween reduced motion shows exact total",
      (await page.locator(".estimate-number").textContent()) === "RM499",
    );
    // Let the last animation frame and React update release transient references.
    await page.waitForTimeout(600);
    await cdp.send("HeapProfiler.collectGarbage");
    const pricingAfter = await cdp.send("Memory.getDOMCounters");
    report.pricingListeners = {
      initial: pricingInitial.jsEventListeners,
      before: pricingBefore.jsEventListeners,
      after: pricingAfter.jsEventListeners,
    };
    check(
      "Price updates do not accumulate media listeners",
      pricingBefore.jsEventListeners === pricingAfter.jsEventListeners,
    );
    check("No runtime errors in focused checks", report.errors.length === 0);
  } finally {
    await browser.close();
  }
}
main()
  .then(() => {
    fs.writeFileSync(
      "docs/qa/astra-final-checks.json",
      JSON.stringify(report, null, 2),
    );
    console.log(
      "COMPLETE",
      report.checks.length,
      "checks",
      JSON.stringify(report.lifecycle),
    );
  })
  .catch((error) => {
    report.failure = error.stack;
    fs.writeFileSync(
      "docs/qa/astra-final-checks.json",
      JSON.stringify(report, null, 2),
    );
    console.error(error);
    process.exitCode = 1;
  });
