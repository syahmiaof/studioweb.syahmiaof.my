const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3002";
const routes = [
  { path: "/", id: "01-home", name: "Home" },
  { path: "/servis", id: "02-services", name: "Services" },
  { path: "/portfolio", id: "03-portfolio", name: "Portfolio" },
  { path: "/harga", id: "04-pricing", name: "Pricing" },
  { path: "/coaching", id: "05-coaching", name: "Coaching" },
  { path: "/tentang", id: "06-about", name: "About" },
  { path: "/hubungi", id: "07-contact", name: "Contact" },
];

async function captureBaseline() {
  const desktopDir = path.join("docs", "qa", "screenshots", "v1_desktop_1440");
  const mobileDir = path.join("docs", "qa", "screenshots", "v1_mobile_390");
  fs.mkdirSync(desktopDir, { recursive: true });
  fs.mkdirSync(mobileDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileContext.newPage();

  console.log("--- CAPTURING V1 BASELINE SCREENSHOTS (1440px Desktop & 390px Mobile) ---");
  for (const r of routes) {
    const url = `${BASE_URL}${r.path}`;
    console.log(`Capturing: ${r.name} (${url})`);

    // Desktop
    await desktopPage.goto(url, { waitUntil: "networkidle" });
    const dPath = path.join(desktopDir, `${r.id}.png`);
    await desktopPage.screenshot({ path: dPath, fullPage: true });
    console.log(`  ✓ Desktop: ${dPath}`);

    // Mobile
    await mobilePage.goto(url, { waitUntil: "networkidle" });
    const mPath = path.join(mobileDir, `${r.id}.png`);
    await mobilePage.screenshot({ path: mPath, fullPage: true });
    console.log(`  ✓ Mobile: ${mPath}`);
  }

  await browser.close();
  console.log("--- BASELINE CAPTURE COMPLETED ---");
}

captureBaseline().catch((err) => {
  console.error(err);
  process.exit(1);
});
