const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const phase = process.argv[2] || "after";
const base = process.env.BASE_URL || "http://localhost:3460";
const routes = [
  "/",
  "/servis",
  "/portfolio",
  "/harga",
  "/coaching",
  "/tentang",
  "/hubungi",
];
const names = [
  "01-home",
  "02-services",
  "03-portfolio",
  "04-pricing",
  "05-coaching",
  "06-about",
  "07-contact",
];
const sizes = [
  [1440, 900],
  [1920, 1080],
  [768, 1024],
  [390, 844],
];
(async () => {
  const browser = await chromium.launch();
  const report = [];
  for (const [width, height] of sizes) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (let i = 0; i < routes.length; i++) {
      const response = await page.goto(base + routes[i], {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        document.querySelectorAll("img").forEach((img) => {
          img.loading = "eager";
        });
        await Promise.all(
          Array.from(document.images, (img) => img.decode().catch(() => {})),
        );
      });
      const dir = path.join(
        "docs/qa/screenshots/astra-v2",
        phase,
        `${width}x${height}`,
      );
      fs.mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, names[i] + ".png") });
      await page.screenshot({
        path: path.join(dir, names[i] + "-full.png"),
        fullPage: true,
      });
      report.push({
        route: routes[i],
        width,
        height,
        status: response.status(),
        ...(await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          brokenImages: [...document.images]
            .filter((i) => !i.complete || i.naturalWidth === 0)
            .map((i) => i.src),
          font: getComputedStyle(document.querySelector("h1")).fontFamily,
        }))),
        errors: [...errors],
      });
      console.log(`${phase} ${width} ${routes[i]}`);
    }
    await context.close();
  }
  fs.writeFileSync(
    `docs/qa/screenshots/astra-v2/${phase}/results.json`,
    JSON.stringify(report, null, 2),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
