const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const phase = process.argv[2] || "after";
const base = process.env.BASE_URL || "http://localhost:3460";
const density = Number(process.env.DPR || 1);
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
  [1672, 941],
  [1440, 900],
  [1920, 1080],
  [768, 1024],
  [390, 844],
];
(async () => {
  const browser = await chromium.launch();
  const report = [];
  for (const [width, height] of sizes.filter(([w]) => !process.env.WIDTHS || process.env.WIDTHS.split(',').includes(String(w)))) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
      deviceScaleFactor: density,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (let i = 0; i < routes.length; i++) {
      const response = await page.goto(base + routes[i], {
        waitUntil: "networkidle",
        timeout: 90000,
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
        "docs/qa/astra-v21",
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
        density,
        status: response.status(),
        ...(await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          brokenImages: [...document.images]
            .filter((i) => i.getBoundingClientRect().width > 0 && (!i.complete || i.naturalWidth === 0))
            .map((i) => i.src),
          clippedPrices: [...document.querySelectorAll('.service-price')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent),
          font: getComputedStyle(document.querySelector("h1")).fontFamily,
          imageResources: performance.getEntriesByType('resource').filter(r => r.initiatorType === 'img' || r.name.includes('/_next/image')).map(r => ({url:r.name,bytes:r.transferSize,duration:r.duration})),
          navigation: (() => {const n=performance.getEntriesByType('navigation')[0];return {domContentLoaded:n.domContentLoadedEventEnd,load:n.loadEventEnd};})(),
        }))),
        errors: [...errors],
      });
      console.log(`${phase} ${width} ${routes[i]}`);
    }
    await context.close();
  }
  fs.writeFileSync(
    `docs/qa/astra-v21/${phase}/results.json`,
    JSON.stringify(report, null, 2),
  );
  await browser.close();
  if (report.some(r => r.status !== 200 || r.overflow || r.brokenImages.length || r.clippedPrices.length || r.errors.length)) throw new Error('Visual capture detected a rendering failure; inspect results.json');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
