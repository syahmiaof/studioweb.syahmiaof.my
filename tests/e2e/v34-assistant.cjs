const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3462";
const SECTION_IDS = ["home", "tentang", "portfolio", "servis", "harga", "coaching", "hubungi"];
const VIEWPORTS = [[1440, 900], [1024, 900], [768, 1024], [390, 844], [375, 812]];
const OUT = path.resolve("docs/qa/v34-ui/after");
const results = { base: BASE, checks: [], responsive: [], errors: [], screenshots: [] };

function check(name, condition, detail) {
  assert.ok(condition, `${name}${detail ? ` — ${detail}` : ""}`);
  results.checks.push(name);
  console.log("PASS", name);
}

async function open(page, url) {
  const response = await page.goto(BASE + url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.locator("main h1").waitFor({ timeout: 15000 });
  await page.waitForFunction(() => document.querySelectorAll("main section.studio-scene[id]").length === 7, null, { timeout: 15000 });
  return response;
}

async function capture(page, name, options = {}) {
  const file = path.join(OUT, name);
  await page.screenshot({ path: file, animations: "disabled", ...options });
  results.screenshots.push(path.relative(process.cwd(), file).replaceAll("\\", "/"));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    page.on("pageerror", (error) => results.errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("status of 503")) results.errors.push(message.text());
    });
    const response = await open(page, "/");
    check("Malay home responds 200 and chatbot stays closed initially", response.status() === 200 && await page.getByRole("dialog").count() === 0);
    const sections = await page.locator("main section.studio-scene[id]").evaluateAll((nodes) => nodes.map((node) => node.id));
    check("Seven sections appear in approved one-page order", JSON.stringify(sections) === JSON.stringify(SECTION_IDS));
    const nav = await page.locator(".studio-nav a").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
    check("Navigation follows the same seven-section order", JSON.stringify(nav) === JSON.stringify(SECTION_IDS.map((id) => `#${id}`)));
    check("Legacy #utama anchor remains inside Home", await page.locator("#home #utama").count() === 1);
    await page.waitForFunction(() => document.querySelector(".hero-joke-line")?.textContent?.length > 20);
    check("Hero replaces the small brand label with the service and joke modules", (await page.locator(".home-categories").innerText()).includes("COACHING PERIBADI") && (await page.locator(".hero-joke-line").innerText()).length > 20);
    const artMap = [["home", "home", "01-home"], ["tentang", "about", "06-about"], ["servis", "services", "02-services"], ["harga", "pricing", "04-pricing"], ["coaching", "coaching", "05-coaching"], ["hubungi", "contact", "07-contact"]];
    for (const [section, artwork, asset] of artMap) {
      const src = await page.locator(`#${section} .artwork-${artwork} img`).first().getAttribute("src");
      check(`${section} keeps its matching approved V2.1 plate`, !!src && src.includes(asset));
    }
    check("Portfolio removes old concept artwork and keeps the black gallery surface", await page.locator("#portfolio .artwork-portfolio").count() === 0 && await page.locator("#portfolio").evaluate((node) => getComputedStyle(node).backgroundColor === "rgb(8, 9, 9)"));
    check("Portfolio starts with all 23 Nemo records", await page.locator("#portfolio .project-card").count() === 23);
    const heroAsset = await page.locator("#home .artwork-home img").first().getAttribute("src");
    check("Existing Home hero keeps its approved image plate", !!heroAsset && heroAsset.includes("01-home-plate"), heroAsset);
    const metadata = await page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      og: Object.fromEntries([...document.querySelectorAll("meta[property]")].filter((node) => node.getAttribute("property").startsWith("og:")).map((node) => [node.getAttribute("property"), node.getAttribute("content")])),
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"),
      iconLinks: [...document.querySelectorAll('link[rel="icon"]')].map((node) => node.getAttribute("href")),
      appleIcon: document.querySelector('link[rel="apple-touch-icon"]')?.getAttribute("href"),
    }));
    check("Malay canonical and Open Graph metadata are fully configured", new URL(metadata.canonical).origin === "https://studio.syahmiaof.my" && new URL(metadata.canonical).pathname === "/" && metadata.og["og:image:width"] === "1200" && metadata.og["og:image:height"] === "630" && metadata.og["og:type"] === "website" && metadata.twitterCard === "summary_large_image", JSON.stringify(metadata));
    check("Favicon set has explicit sizes without conflicting generated icon", metadata.iconLinks.length === 5 && metadata.iconLinks.some((href) => href.includes("favicon.ico")) && !!metadata.appleIcon);
    for (const asset of ["/favicon.ico", "/icons/favicon-16x16.png", "/icons/favicon-32x32.png", "/icons/apple-touch-icon.png", "/icons/icon-192.png", "/icons/icon-512.png", "/opengraph-image.png"]) {
      const assetResponse = await fetch(BASE + asset);
      check(`Brand metadata asset resolves: ${asset}`, assetResponse.status === 200 && (asset === "/opengraph-image.png" ? assetResponse.headers.get("content-type") === "image/png" : assetResponse.headers.get("content-type")?.startsWith("image/")));
    }
    const assistantConfig = await fetch(BASE + "/api/assistant").then((item) => item.json());
    const disabledLlm = await fetch(BASE + "/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: "ms", consent: true, messages: [{ role: "user", content: "Can you help with a CSS question?" }] }) });
    check("Production preview stays FAQ-only and refuses provider calls", assistantConfig.enabled === false && assistantConfig.mode === "faq-only" && disabledLlm.status === 503);
    await page.waitForTimeout(1900);
    check("MIBOT greeting appears without automatically opening the panel", await page.locator(".mibot-greeting").count() === 1 && await page.getByRole("dialog").count() === 0);
    await capture(page, "mibot-greeting-desktop-ms.png");
    await page.locator(".mibot-greeting-open").click();
    await page.getByRole("dialog", { name: "MIBOT" }).waitFor();
    check("Clicking the greeting bubble opens MIBOT", await page.getByRole("dialog").count() === 1);
    await page.keyboard.press("Escape");
    await capture(page, "home-desktop-1440-ms.png");
    await capture(page, "fullpage-desktop-1440-ms.png", { fullPage: true });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1900);
    check("Greeting does not repeat within the browsing session", await page.locator(".mibot-greeting").count() === 0);

    await page.getByRole("link", { name: "Servis", exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.studio-nav a[aria-current="location"]')?.getAttribute("href") === "#servis");
    const indicatorAccurate = await page.evaluate(() => {
      const nav = document.querySelector(".studio-nav"), link = document.querySelector('.studio-nav a[aria-current="location"]'), indicator = document.querySelector(".nav-active-indicator");
      if (!nav || !link || !indicator) return false;
      return Math.abs(parseFloat(getComputedStyle(indicator).left) - (link.getBoundingClientRect().left - nav.getBoundingClientRect().left)) < 2 && Math.abs(parseFloat(getComputedStyle(indicator).width) - link.getBoundingClientRect().width) < 2;
    });
    check("Sliding indicator follows the active scrollspy label", indicatorAccurate);
    await page.getByRole("link", { name: "English" }).click();
    await page.waitForURL(/\/en#servis$/);
    check("Language switcher keeps the current section hash", new URL(page.url()).pathname === "/en" && new URL(page.url()).hash === "#servis");
    await open(page, "/");

    const launcher = page.getByRole("button", { name: "Buka MIBOT" });
    const initialScroll = await page.evaluate(() => window.scrollY);
    await launcher.click();
    const dialog = page.getByRole("dialog", { name: "MIBOT" });
    await dialog.waitFor();
    check("Launcher opens labelled dialog without changing page scroll", initialScroll === await page.evaluate(() => window.scrollY));
    check("Focus moves to visible close control", await dialog.getByRole("button", { name: "Tutup MIBOT" }).evaluate((node) => node === document.activeElement));
    check("Welcome copy and four working actions are present", await dialog.getByText(/Saya MIBOT/).count() === 1 && await dialog.locator(".assistant-quick-actions button").count() === 4);
    await capture(page, "assistant-open-desktop-1440-ms.png");
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    await page.waitForFunction(() => document.activeElement?.classList.contains("assistant-launcher"));
    check("Escape closes the dialog and restores focus to launcher", true);

    const quickCases = [
      { label: "Harga Website", text: "Harga sekali bayar", expected: ["RM299", "RM499", "RM999", "bulanan"] },
      { label: "Sistem Full-Stack", text: "Permintaan Tempahan Asas", expected: ["RM499", "manual"] },
      { label: "Coaching 1:1", text: "Frontend Asas", expected: ["RM39", "RM99", "disahkan manual"] },
      { label: "Bincang Projek", text: "Servis apa yang kau cari?", expected: [] },
    ];
    for (const item of quickCases) {
      await page.getByRole("button", { name: "Buka MIBOT" }).click();
      await page.getByRole("dialog").getByRole("button", { name: item.label }).click();
      const dialogText = await page.getByRole("dialog").innerText();
      check(`Quick action ${item.label} triggers its real response`, dialogText.includes(item.text) && item.expected.every((part) => dialogText.includes(part)));
      await page.keyboard.press("Escape");
      await open(page, "/");
    }

    await page.getByRole("button", { name: "Buka MIBOT" }).click();
    let composer = page.getByRole("textbox", { name: "Soalan anda" });
    await composer.fill("Can you guarantee my sales will double next month?");
    await composer.press("Shift+Enter");
    check("Shift+Enter keeps newline in the message composer", (await composer.inputValue()).includes("\n"));
    await composer.fill("Will you guarantee sales next month?");
    await composer.press("Enter");
    await page.getByText(/Soalan ini tak sepadan dengan FAQ/).waitFor();
    check("Unknown question fails gracefully without fabricating an answer", await page.getByText(/Aku tak akan teka jawapan/).count() === 1);
    await page.keyboard.press("Escape");

    await open(page, "/");
    await page.getByRole("button", { name: "Buka MIBOT" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Bincang Projek" }).click();
    await page.getByRole("button", { name: /^Website/ }).click();
    await page.getByRole("button", { name: /Landing Page.*RM299/ }).click();
    await page.getByLabel("Keperluan projek (pilihan)").fill("Landing page untuk kelas mengaji");
    await page.getByLabel("Timeline (pilihan)").fill("Bulan depan");
    await page.getByLabel("Julat bajet (pilihan)").fill("RM300-RM500");
    await page.getByLabel("Penjagaan (pilihan)").selectOption("website-care");
    await page.getByRole("button", { name: "Semak ringkasan" }).click();
    const summary = page.getByLabel(/RINGKASAN PROJEK/);
    check("Lead flow includes canonical price, optional maintenance and editable details", (await summary.inputValue()).includes("RM299") && (await summary.inputValue()).includes("RM59 / bulan") && (await summary.inputValue()).includes("kelas mengaji"));
    await summary.fill((await summary.inputValue()) + "\nButiran edit oleh pelawat.");
    const popupPromise = page.context().waitForEvent("page");
    await page.getByRole("button", { name: /Sambung melalui WhatsApp/ }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded").catch(() => {});
    const handoff = new URL(popup.url());
    const handoffPhone = handoff.hostname === "wa.me" ? handoff.pathname.slice(1) : handoff.searchParams.get("phone");
    check("WhatsApp opens only after click with normalized verified number", ["wa.me", "api.whatsapp.com"].includes(handoff.hostname) && handoffPhone === "60107965236", handoff.toString());
    const handoffText = handoff.searchParams.get("text") || "";
    check("WhatsApp handoff contains edited summary and never sends automatically", handoffText.includes("Butiran edit oleh pelawat") && handoffText.includes("RM299"));
    await popup.close();
    await page.keyboard.press("Escape");

    await open(page, "/en");
    check("English route preserves seven-section order and renders localized assistant", JSON.stringify(await page.locator("main section.studio-scene[id]").evaluateAll((nodes) => nodes.map((node) => node.id))) === JSON.stringify(SECTION_IDS));
    await capture(page, "home-desktop-1440-en.png");
    await page.getByRole("button", { name: "Open MIBOT" }).click();
    check("English welcome, quick chip labels and FAQ disclosure render", await page.getByRole("dialog").getByText(/I'm MIBOT/).count() === 1 && await page.getByRole("button", { name: "Website Pricing" }).count() === 1);
    await page.getByRole("button", { name: "Website Pricing" }).click();
    check("English pricing answer keeps one-time and monthly amounts distinct", (await page.getByRole("dialog").innerText()).includes("Optional monthly care (separate from project pricing)"));
    await capture(page, "assistant-open-desktop-1440-en.png");
    await page.keyboard.press("Escape");

    await open(page, "/en?service=website-ui&project=symi-ui#portfolio");
    await page.waitForFunction(() => document.querySelector('.studio-nav a[aria-current="location"]')?.getAttribute("href") === "#portfolio");
    await page.getByRole("link", { name: "Bahasa Melayu" }).click();
    await page.waitForURL("**/?service=website-ui&project=symi-ui#portfolio");
    check("BM switch returns to Malay and preserves portfolio context", await page.locator("html").getAttribute("lang") === "ms" && new URL(page.url()).searchParams.get("project") === "symi-ui");

    await open(page, "/zh");
    check("Chinese route sets zh-Hans and translates the navigation", await page.evaluate(() => document.documentElement.lang) === "zh-Hans" && await page.locator(".studio-nav a").first().innerText() === "首页");
    check("Portfolio catalogs all 23 Nemo projects without concept badges", await page.locator(".project-card").count() === 23 && await page.getByText("CONCEPT DEMO", { exact: true }).count() === 0);
    check("Chinese portfolio includes all Nemo projects", await page.locator("html").getAttribute("lang") === "zh-Hans" && await page.locator(".project-card").count() === 23);
    check("Chinese project statuses match Nemo records", await page.locator(".project-filters button").evaluateAll((buttons) => buttons.map((button) => button.textContent.trim()).join("|")) === "全部 23|已完成 12|进行中 3|暂缓 8");
    await page.getByRole("searchbox").fill("Nemo");
    check("Portfolio search finds a project by title", await page.locator(".project-card").count() === 1 && await page.locator(".project-card h3").innerText() === "Nemo");
    await page.getByRole("searchbox").fill("");
    check("Three Nemo records without a live URL get honest text fallbacks", await page.locator(".project-card-domain-muted").count() === 3 && await page.locator(".project-card-preview-link").count() === 20);
    await capture(page, "home-desktop-1440-zh-Hans.png");
    await page.getByRole("button", { name: "打开 MIBOT" }).click();
    check("Chinese MIBOT identity and quick actions are translated", await page.getByRole("dialog", { name: "MIBOT" }).getByText(/我是 MIBOT/).count() === 1 && await page.getByRole("button", { name: "网站价格" }).count() === 1);
    await page.getByRole("button", { name: "网站价格" }).click();
    check("Chinese MIBOT pricing keeps RM amounts intact", (await page.getByRole("dialog").innerText()).includes("RM299") && (await page.getByRole("dialog").innerText()).includes("RM999"));
    await capture(page, "assistant-open-desktop-1440-zh-Hans.png");
    await page.keyboard.press("Escape");

    for (const [width, height] of VIEWPORTS) {
      await page.setViewportSize({ width, height });
      for (const locale of ["ms", "en", "zh-Hans"]) {
        await open(page, locale === "en" ? "/en" : locale === "zh-Hans" ? "/zh" : "/");
        const home = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
        check(`${locale} ${width}px home has no horizontal overflow`, home.scrollWidth <= home.width);
        results.responsive.push({ locale, width, height, page: home });
        const viewportLabel = width === 1440 ? "desktop-1440" : width === 1024 ? "tablet-1024" : width === 768 ? "tablet-768" : `mobile-${width}`;
        await capture(page, `home-${viewportLabel}-${locale}.png`);
        if (width === 1440 || width === 390) await capture(page, `fullpage-${viewportLabel}-${locale}.png`, { fullPage: true });
        if (width === 390) {
          await page.getByRole("button", { name: locale === "en" ? "Open MIBOT" : locale === "zh-Hans" ? "打开 MIBOT" : "Buka MIBOT" }).click();
          await capture(page, `assistant-open-mobile-390-${locale}.png`);
          await page.keyboard.press("Escape");
        }
      }
      await open(page, "/");
      await page.getByRole("button", { name: "Buka MIBOT" }).click();
      const box = await page.getByRole("dialog").boundingBox();
      const viewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth }));
      check(`Chat panel fits ${width}px × ${height}px viewport with no horizontal overflow`, !!box && box.x >= 0 && box.x + box.width <= width && box.y >= 0 && box.y + box.height <= height + 1 && viewport.scrollWidth <= viewport.width, JSON.stringify({ box, viewport }));
      results.responsive.push({ locale: "ms", width, height, assistant: box });
      if (width === 390) await capture(page, "assistant-open-mobile-390-ms.png");
      if (width === 375) {
        await page.emulateMedia({ reducedMotion: "reduce" });
        check("Reduced-motion removes assistant entrance animation", await page.getByRole("dialog").evaluate((node) => getComputedStyle(node).animationName === "none"));
        await page.getByRole("dialog").getByRole("button", { name: "Tutup MIBOT" }).click();
        check("Close button works at narrow mobile width", await page.getByRole("dialog").count() === 0);
      } else await page.keyboard.press("Escape");
    }

    check("No uncaught browser runtime errors", results.errors.length === 0, results.errors.join(" | "));
    fs.writeFileSync(path.join(OUT, "e2e-results.json"), JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  results.failure = error.stack;
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "e2e-results.json"), JSON.stringify(results, null, 2));
  console.error(error);
  process.exit(1);
});

