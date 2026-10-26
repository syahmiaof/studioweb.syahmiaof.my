const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const BASE = process.env.BASE_URL || "http://localhost:3461";
const SECTION_IDS = ["utama", "servis", "portfolio", "harga", "coaching", "tentang", "hubungi"];
const VIEWPORTS = [[1440, 900], [768, 1024], [390, 844], [360, 800]];
const results = { base: BASE, checks: [], responsive: [], errors: [] };

function check(name, condition, detail) {
  assert.ok(condition, `${name}${detail ? ` — ${detail}` : ""}`);
  results.checks.push(name);
  console.log("PASS", name);
}

async function open(page, path) {
  const response = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.locator("main h1").waitFor({ timeout: 15000 });
  return response;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    page.on("pageerror", (error) => results.errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && message.text() !== "Failed to load resource: the server responded with a status of 503 (Service Unavailable)") results.errors.push(message.text());
    });

    let response = await open(page, "/");
    check("Malay homepage returns one rendered page", response.status() === 200 && await page.locator("main").count() === 1);
    check("Hero copy uses the approved V3.3 headline", (await page.locator("main h1").innerText()) === "FREELANCE\nWEB SERVICES.");
    check("Hero CTAs target service and contact sections", (await page.locator("#utama .scene-actions a").evaluateAll((links) => links.map((link) => link.getAttribute("href")))).join(",") === "#servis,#hubungi");
    check("Professional title sits above the existing wordmark", await page.locator(".brand-role").innerText() === "FULL-STACK DEVELOPER" && await page.locator(".brand-role").evaluate((el) => el.nextElementSibling?.textContent?.startsWith("SYAHMIAOF")));
    check("One header and footer wrap the whole experience", await page.locator(".studio-header").count() === 1 && await page.locator(".studio-footer").count() === 1);
    const sectionOrder = await page.locator("main .studio-page-fragment > section[id]").evaluateAll((sections, ids) => sections.map((section) => section.id).filter((id) => ids.includes(id)), SECTION_IDS);
    check("All seven real sections render in required order", JSON.stringify(sectionOrder) === JSON.stringify(SECTION_IDS));
    check("Legacy homepage teaser sections are removed", await page.locator(".story-section, .story-finale, .service-index").count() === 0);
    check("Only the hero is an H1", await page.locator("main h1").count() === 1);

    for (const id of SECTION_IDS) {
      await page.locator(`.studio-nav a[href="#${id}"]`).click();
      await page.waitForFunction((expected) => location.hash === `#${expected}` && document.querySelector('.studio-nav [aria-current="location"]')?.getAttribute("href") === `#${expected}`, id);
      const layout = await page.evaluate((expected) => {
        const section = document.getElementById(expected).getBoundingClientRect();
        const header = document.querySelector(".studio-header").getBoundingClientRect();
        return { sectionTop: Math.round(section.top), headerBottom: Math.round(header.bottom), headerTop: Math.round(header.top), viewportHeight: innerHeight };
      }, id);
      check(`Anchor ${id} scrolls with sticky-header offset and active indicator`, layout.headerTop === 0 && layout.sectionTop >= layout.headerBottom - 2 && layout.sectionTop < layout.viewportHeight);
    }
    await page.locator('.studio-nav a[href="#servis"]').click();
    await page.waitForFunction(() => location.hash === "#servis");
    await page.locator('.studio-nav a[href="#portfolio"]').click();
    await page.waitForFunction(() => location.hash === "#portfolio");
    await page.goBack();
    await page.waitForFunction(() => location.hash === "#servis");
    await page.goForward();
    await page.waitForFunction(() => location.hash === "#portfolio");
    check("Browser back and forward restore anchor history", page.url().endsWith("#portfolio"));

    response = await open(page, "/servis?service=full-stack&package=booking-request");
    check("Legacy route redirects to its section and preserves quote context", response.status() === 200 && new URL(page.url()).pathname === "/" && new URL(page.url()).hash === "#servis" && new URL(page.url()).searchParams.get("package") === "booking-request");
    await open(page, "/hubungi?service=full-stack&package=booking-request");
    check("Legacy contact deep link lands on contact with system context", new URL(page.url()).hash === "#hubungi" && (await page.getByTestId("system-summary").innerText()).includes("RM499"));
    const whatsapp = page.locator(".contact-channels a.whatsapp-link");
    check("WhatsApp enquiry points to the configured wa.me number", (await whatsapp.getAttribute("href")).startsWith("https://wa.me/60107965236?text="));
    check("Contact privacy purpose remains visible", await page.getByText(/digunakan untuk memahami dan membalas/).count() === 1);

    await open(page, "/#harga");
    await page.getByRole("radio", { name: /Landing Page/ }).check();
    check("Landing package calculates RM299 and keeps section hash", (await page.getByTestId("estimate").innerText()).trim() === "RM299" && new URL(page.url()).hash === "#harga");
    await page.getByRole("radio", { name: /Laman Web Bisnes/ }).check();
    await page.getByRole("checkbox", { name: /Halaman Standard Tambahan/ }).check();
    check("Business plus page calculates RM598", (await page.getByTestId("estimate").innerText()).trim() === "RM598");
    await page.getByRole("checkbox", { name: /Halaman Standard Tambahan/ }).uncheck();
    await page.getByRole("checkbox", { name: /Animasi Lanjutan/ }).check();
    await page.getByRole("checkbox", { name: /Animasi Sinematik/ }).check();
    check("Animation tiers stay exclusive and cinematic totals RM698", await page.getByRole("checkbox", { name: /Animasi Lanjutan/ }).isChecked() === false && (await page.getByTestId("estimate").innerText()).trim() === "RM698");
    await page.locator(".package-detail details").first().locator("summary").click();
    await page.getByRole("radio", { name: /Penjagaan Website/ }).check();
    check("Website Care is separate from one-time total", (await page.getByTestId("estimate").innerText()).trim() === "RM698");
    await page.getByRole("link", { name: "Dapatkan Sebut Harga", exact: true }).click();
    await page.waitForFunction(() => location.hash === "#hubungi");
    check("Quote handoff carries package, add-on and care context", (await page.getByTestId("quote-summary").innerText()).includes("RM698") && (await page.getByTestId("maintenance-summary").innerText()).includes("RM59 / bulan"));

    await open(page, "/#coaching");
    await page.getByRole("radio", { name: /Sistem Full-Stack/ }).check();
    check("Full-Stack coaching shows RM99 for two hours", (await page.locator(".duration-options").innerText()).includes("2 jam · RM99") && new URL(page.url()).hash === "#coaching");
    await page.getByRole("link", { name: "Tanya Slot Coaching", exact: true }).click();
    await page.waitForFunction(() => location.hash === "#hubungi");
    check("Coaching handoff carries selected package", (await page.getByTestId("coaching-summary").innerText()).includes("Sistem Full-Stack"));

    await open(page, "/#coaching");
    await page.waitForFunction(() => window.scrollY > 1000 && document.querySelector('.studio-nav [aria-current="location"]')?.getAttribute("href") === "#coaching" && document.querySelector('.language-switch')?.getAttribute("href") === "/en#coaching");
    check("Refreshing a direct section hash restores its scroll position", new URL(page.url()).hash === "#coaching");
    await Promise.all([
      page.waitForURL("**/en#coaching", { waitUntil: "commit" }),
      page.locator(".language-switch").click(),
    ]);
    await page.waitForFunction(() => document.querySelector('.studio-nav [aria-current="location"]')?.getAttribute("href") === "#coaching");
    check("BM/EN switch preserves current section and renders English copy", await page.locator(".studio-nav [aria-current='location']").getAttribute("href") === "#coaching" && (await page.locator("#coaching .scene-intro").innerText()).includes("Choose a 1:1 session"));

    await open(page, "/#hubungi");
    await page.getByRole("button", { name: "Sediakan Pertanyaan" }).click();
    check("Empty contact form is blocked before API submission", await page.locator(".field-error").count() === 3);
    let apiCalls = 0;
    page.on("request", (request) => { if (request.url().endsWith("/api/inquiries")) apiCalls += 1; });
    await page.getByLabel("2. NAMA").fill("QA Local");
    await page.getByLabel("3. EMEL / WHATSAPP").fill("qa@example.com");
    await page.getByLabel("4. CERITAKAN IDEA ANDA").fill("Ujian lokal V3.3, tiada pertanyaan pelanggan dihantar.");
    const apiResponse = page.waitForResponse((item) => item.url().endsWith("/api/inquiries"));
    await page.getByRole("button", { name: "Sediakan Pertanyaan" }).click();
    const api = await apiResponse;
    check("Unconfigured inquiry provider remains honestly disclosed as HTTP 503", api.status() === 503 && !(await api.json()).success && apiCalls === 1 && (await page.locator(".form-notice").innerText()).includes("belum dihantar"));

    for (const [width, height] of VIEWPORTS) {
      await page.setViewportSize({ width, height });
      for (const locale of ["ms", "en"]) {
        const path = locale === "en" ? "/en" : "/";
        await open(page, path);
        await page.locator("main .studio-page-fragment > section[id='hubungi']").waitFor({ timeout: 15000 });
        const layout = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1: [...document.querySelectorAll("main h1")].map((node) => {
            const rect = node.getBoundingClientRect();
            return { left: Math.round(rect.left), right: Math.round(rect.right) };
          }),
          sectionIds: [...document.querySelectorAll("main .studio-page-fragment > section[id]")].map((node) => node.id).filter((id) => ["utama","servis","portfolio","harga","coaching","tentang","hubungi"].includes(id)),
        }));
        check(`${locale} ${width}px one-page layout fits without horizontal overflow`, layout.scrollWidth <= layout.width && layout.h1.every((rect) => rect.left >= -1 && rect.right <= layout.width + 1) && JSON.stringify(layout.sectionIds) === JSON.stringify(SECTION_IDS));
        results.responsive.push({ locale, width, height, ...layout });
        if (width <= 390) {
          await page.getByRole("button", { name: locale === "ms" ? "Buka menu navigasi" : "Toggle navigation menu" }).click();
          check(`${locale} mobile menu opens at ${width}px`, await page.locator(".studio-nav").isVisible());
          await page.locator(`.studio-nav a[href="#harga"]`).click();
          await page.waitForFunction(() => location.hash === "#harga");
          await page.waitForFunction(() => document.querySelector('.studio-nav [aria-current="location"]')?.getAttribute("href") === "#harga");
          check(`${locale} mobile anchor closes menu and reaches pricing`, !(await page.locator(".studio-nav").isVisible()) && await page.locator(".studio-nav [aria-current='location']").getAttribute("href") === "#harga");
        }
      }
    }

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page, "/");
    for (const id of SECTION_IDS) {
      await page.locator(`.studio-nav a[href="#${id}"]`).click();
      await page.waitForFunction((expected) => document.querySelector(`#${expected} .display-line`) && Number.parseFloat(getComputedStyle(document.querySelector(`#${expected} .display-line`)).opacity) > 0.95, id);
    }
    check("GSAP section entrances complete during forward scroll", true);
    check("No uncaught browser runtime errors", results.errors.length === 0, results.errors.join(" | "));

    fs.mkdirSync("docs/qa/v33/after", { recursive: true });
    fs.writeFileSync("docs/qa/v33/after/e2e-results.json", JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  results.failure = error.stack;
  fs.mkdirSync("docs/qa/v33/after", { recursive: true });
  fs.writeFileSync("docs/qa/v33/after/e2e-results.json", JSON.stringify(results, null, 2));
  console.error(error);
  process.exit(1);
});
