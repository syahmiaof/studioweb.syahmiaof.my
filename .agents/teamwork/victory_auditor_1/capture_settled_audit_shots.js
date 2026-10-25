const { chromium } = require("playwright");
const http = require("http");
const { spawn, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const PORT = 3456;
if (PORT === 3000) throw new Error("PORT 3000 STRICTLY FORBIDDEN");
const BASE_URL = `http://localhost:${PORT}`;

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200 || res.statusCode === 304) resolve();
          else setTimeout(check, 500);
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs) reject(new Error("Timeout waiting for server."));
          else setTimeout(check, 500);
        });
    };
    check();
  });
}

async function capture() {
  console.log("Starting Next.js on port " + PORT);
  const server = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, PORT: String(PORT) },
  });

  await waitForServer(BASE_URL);
  console.log("Server ready at " + BASE_URL);

  const browser = await chromium.launch({ headless: true });

  const desktopContext = await browser.newContext({
    viewport: { width: 1672, height: 941 },
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

  const routes = [
    { path: "/", id: "01-home", name: "Home" },
    { path: "/servis", id: "02-services", name: "Services" },
    { path: "/portfolio", id: "03-portfolio", name: "Portfolio" },
    { path: "/harga", id: "04-pricing", name: "Pricing" },
    { path: "/coaching", id: "05-coaching", name: "Coaching" },
    { path: "/tentang", id: "06-about", name: "About" },
    { path: "/hubungi", id: "07-contact", name: "Contact" },
  ];

  for (const r of routes) {
    const url = `${BASE_URL}${r.path}`;
    console.log(`Capturing settled view: ${r.name} (${url})`);

    // Desktop
    await desktopPage.goto(url, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1400); // Wait for GSAP entrance timeline & clearProps to complete
    const dPath = path.join("docs", "qa", "screenshots", "desktop", `${r.id}.png`);
    await desktopPage.screenshot({ path: dPath, fullPage: true });
    console.log(`  ✓ Saved settled desktop: ${dPath}`);

    // Mobile
    await mobilePage.goto(url, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1400); // Wait for GSAP entrance timeline to complete
    const mPath = path.join("docs", "qa", "screenshots", "mobile", `${r.id}.png`);
    await mobilePage.screenshot({ path: mPath, fullPage: true });
    console.log(`  ✓ Saved settled mobile: ${mPath}`);
  }

  await browser.close();

  // Terminate server
  try {
    const stdout = execSync(`netstat -ano | findstr :${PORT}`).toString();
    for (const line of stdout.trim().split("\n")) {
      if (!line.includes("LISTENING")) continue;
      const pid = line.trim().split(/\s+/).pop();
      if (pid && Number(pid) > 0) {
        execSync(`taskkill /F /PID ${pid}`);
      }
    }
  } catch (e) {}

  console.log("Settled screenshot capture complete!");
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
