const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const BASE = process.env.BASE_URL || "http://localhost:3461";
const results = { base: BASE, checks: [], routes: [], errors: [] };
const check = (name, condition) => {
  assert.ok(condition, name);
  results.checks.push(name);
  console.log("PASS", name);
};
const routes = ["/", "/servis", "/portfolio", "/harga", "/coaching", "/tentang", "/hubungi"];

async function open(page, route) {
  const response = await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.locator("main h1").waitFor({ timeout: 10000 });
  return response;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    page.on("pageerror", (error) => results.errors.push(error.message));

    await open(page, "/harga");
    check("Business default RM499", (await page.getByTestId("estimate").innerText()).trim() === "RM499");
    await page.getByRole("radio", { name: /Landing Page/ }).check();
    check("Landing Page RM299", (await page.getByTestId("estimate").innerText()).trim() === "RM299");
    await page.getByRole("radio", { name: /Laman Web Bisnes/ }).check();
    await page.getByRole("checkbox", { name: /Halaman Standard Tambahan/ }).check();
    check("Business plus standard page RM598", (await page.getByTestId("estimate").innerText()).trim() === "RM598");
    await page.getByRole("checkbox", { name: /Halaman Standard Tambahan/ }).uncheck();
    await page.getByRole("checkbox", { name: /Animasi Lanjutan/ }).check();
    check("Business plus advanced animation RM598", (await page.getByTestId("estimate").innerText()).trim() === "RM598");
    await page.getByRole("checkbox", { name: /Animasi Sinematik/ }).check();
    check("Animation tiers are exclusive", await page.getByRole("checkbox", { name: /Animasi Lanjutan/ }).isChecked() === false);
    check("Business plus cinematic animation RM698", (await page.getByTestId("estimate").innerText()).trim() === "RM698");
    await page.getByRole("radio", { name: /Laman Web Premium/ }).check();
    check("Premium plus cinematic animation RM1,198", (await page.getByTestId("estimate").innerText()).trim() === "RM1,198");

    await page.locator(".package-detail details").first().locator("summary").click();
    await page.getByRole("radio", { name: /Penjagaan Website/ }).check();
    check("Maintenance selection does not inflate one-time total", (await page.getByTestId("estimate").innerText()).trim() === "RM1,198");
    await page.getByRole("link", { name: "Dapatkan Sebut Harga", exact: true }).click();
    await page.waitForURL("**/hubungi**");
    check("Website Care handoff is monthly", (await page.getByTestId("maintenance-summary").innerText()).includes("RM59 / bulan"));
    check("Website Care stays separate from one-time estimate", (await page.getByTestId("quote-summary").innerText()).includes("RM1,198"));
    check("Privacy purpose shown before enquiry", (await page.getByText(/digunakan untuk memahami dan membalas/).count()) === 1);

    await open(page, "/harga");
    await page.locator(".package-detail details").first().locator("summary").click();
    await page.getByRole("radio", { name: /Penjagaan Sistem/ }).check();
    await page.getByRole("link", { name: "Dapatkan Sebut Harga", exact: true }).click();
    check("System Care handoff is from RM149/month", (await page.getByTestId("maintenance-summary").innerText()).includes("Dari RM149 / bulan"));

    await open(page, "/servis");
    const servicesText = await page.locator("main").innerText();
    check("Booking request price and manual confirmation are clear", servicesText.includes("RM499") && servicesText.includes("mengesahkan tempahan secara manual"));
    check("Dashboard Lite has a starting price", servicesText.includes("RM999"));
    check("Advanced system is quote-only above RM2,099", servicesText.toLowerCase().includes("lebih rm2,099") && servicesText.toLowerCase().includes("sebut harga"));
    await page.getByRole("link", { name: "Lihat Pilihan Sistem", exact: true }).first().click();
    check("Basic Booking offer reaches contact with price", (await page.getByTestId("system-summary").innerText()).includes("RM499"));

    await open(page, "/coaching");
    check("Basic Frontend coaching RM39 for one hour", (await page.locator(".topic-options").innerText()).includes("RM39") && (await page.locator(".duration-options").innerText()).includes("1 jam"));
    await page.getByRole("radio", { name: /Frontend Lanjutan/ }).check();
    check("Advanced Frontend coaching RM99 for two hours", (await page.locator(".duration-options").innerText()).includes("2 jam · RM99"));
    await page.getByRole("radio", { name: /Sistem Full-Stack/ }).check();
    check("Full-Stack System coaching RM99 for two hours", (await page.locator(".duration-options").innerText()).includes("2 jam · RM99"));
    check("Full-Stack coaching handoff keeps selected package", (await page.getByRole("link", { name: "Tanya Slot Coaching", exact: true }).getAttribute("href")).includes("coachingPackage=full-stack-system"));
    await page.getByRole("radio", { name: /Frontend Lanjutan/ }).check();
    await page.getByRole("link", { name: "Tanya Slot Coaching", exact: true }).click();
    check("Coaching package and duration carry into contact", (await page.getByTestId("coaching-summary").innerText()).includes("Frontend Lanjutan") && (await page.getByTestId("coaching-summary").innerText()).includes("2 jam"));

    await open(page, "/portfolio");
    check("Portfolio lists the 23 Nemo project records", await page.locator(".project-card").count() === 23);
    const lamborghini = page.locator(".project-card").filter({ hasText: "Lamborghini" });
    const projectLink = lamborghini.getByRole("link", { name: "Bincang projek ini", exact: true });
    check("Portfolio card CTA carries the Nemo project slug", (await projectLink.getAttribute("href")).includes("project=lamborghini"));
    await projectLink.click();
    check("Selected project is present in inquiry handoff", (await page.getByTestId("project-summary").innerText()).includes("Lamborghini"));

    await open(page, "/hubungi?service=website-ui&package=business&addons=cinematic-animation&estimate=1");
    check("Contact recomputes a spoofed total", (await page.getByTestId("quote-summary").innerText()).includes("RM698"));
    const whatsappLink = page.locator(".contact-channels a.whatsapp-link");
    check("Configured WhatsApp opens a wa.me chat", await whatsappLink.count() === 1 && /^https:\/\/wa\.me\/\d{8,15}\?text=/.test(await whatsappLink.getAttribute("href") || ""));
    let requests = 0;
    page.on("request", (request) => { if (request.url().endsWith("/api/inquiries")) requests++; });
    await page.getByRole("button", { name: "Sediakan Pertanyaan" }).click();
    check("Empty inquiry is rejected before API", (await page.locator(".field-error").count()) === 3 && requests === 0);
    await page.getByLabel("2. NAMA").fill("QA Local");
    await page.getByLabel("3. EMEL / WHATSAPP").fill("qa@example.com");
    await page.getByLabel("4. CERITAKAN IDEA ANDA").fill("Ujian tempatan sahaja, tiada pertanyaan dihantar.");
    const responsePromise = page.waitForResponse((response) => response.url().endsWith("/api/inquiries"));
    await page.getByRole("button", { name: "Sediakan Pertanyaan" }).click();
    const response = await responsePromise;
    check("Unavailable provider is disclosed as HTTP 503", response.status() === 503 && !(await response.json()).success);
    check("Email fallback keeps one-time total", decodeURIComponent(await page.getByRole("link", { name: "Buka Emel untuk Hantar" }).getAttribute("href")).includes("RM698"));
    check("No success message is fabricated", (await page.locator(".form-notice").innerText()).includes("belum dihantar"));

    for (const [width, height] of [[1440,900],[768,1024],[390,844],[360,800]]) {
      await page.setViewportSize({ width, height });
      for (const locale of ["ms", "en"]) for (const route of routes) {
        const pathname = locale === "en" ? "/en" + (route === "/" ? "" : route) : route;
        const response = await open(page, pathname);
        const measurement = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          headingsFit: [...document.querySelectorAll("main h1")].every((el) => {
            const rect = el.getBoundingClientRect();
            return rect.left >= -1 && rect.right <= innerWidth + 1;
          }),
          brokenVisibleImages: [...document.images].filter((img) => img.getBoundingClientRect().width > 0 && img.complete && img.naturalWidth === 0).length,
        }));
        check(`${locale} ${pathname} ${width}px responsive`, response.status() === 200 && !measurement.overflow && measurement.headingsFit && measurement.brokenVisibleImages === 0);
        results.routes.push({ locale, pathname, width, height, status: response.status(), ...measurement });
      }
      if (width <= 390) {
        await open(page, "/");
        await page.getByRole("button", { name: "Buka menu navigasi" }).click();
        check(`Mobile menu opens at ${width}px`, await page.locator(".studio-nav").isVisible());
        await page.keyboard.press("Escape");
        check(`Escape closes mobile menu at ${width}px`, !(await page.locator(".studio-nav").isVisible()));
      }
    }
    check("No uncaught browser runtime errors", results.errors.length === 0);
    fs.mkdirSync("docs/qa/v31", { recursive: true });
    fs.writeFileSync("docs/qa/v31/e2e-results.json", JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  results.failure = error.stack;
  fs.mkdirSync("docs/qa/v31", { recursive: true });
  fs.writeFileSync("docs/qa/v31/e2e-results.json", JSON.stringify(results, null, 2));
  console.error(error);
  process.exit(1);
});
