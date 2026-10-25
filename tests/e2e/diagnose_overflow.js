const { chromium } = require("playwright");

async function diagnose() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  const testRoutes = ["/", "/servis", "/coaching", "/tentang", "/portfolio", "/harga", "/hubungi"];

  for (const r of testRoutes) {
    await page.goto(`http://localhost:3002${r}`, { waitUntil: "networkidle" });
    const report = await page.evaluate(() => {
      const winW = window.innerWidth;
      const docScrollW = document.documentElement.scrollWidth;
      const bodyScrollW = document.body.scrollWidth;
      
      const offenders = [];
      const els = document.querySelectorAll("*");
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        if (computed.display === "none") continue;

        // Check if element itself extends beyond viewport
        if (rect.right > winW + 1) {
          offenders.push({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            rectLeft: rect.left,
            rectRight: rect.right,
            rectWidth: rect.width,
            overflowX: computed.overflowX,
            overflowY: computed.overflowY,
            position: computed.position,
            parentTag: el.parentElement ? el.parentElement.tagName : null,
            parentClass: el.parentElement ? el.parentElement.className : null,
          });
        }
      }

      return {
        winW,
        docScrollW,
        bodyScrollW,
        offenderCount: offenders.length,
        topOffenders: offenders.slice(0, 8),
      };
    });

    console.log(`\n=== ROUTE ${r} ===`);
    console.log(`winW: ${report.winW}, docScrollW: ${report.docScrollW}, bodyScrollW: ${report.bodyScrollW}`);
    console.log(`Offenders count: ${report.offenderCount}`);
    if (report.topOffenders.length > 0) {
      console.log("Top offenders:", JSON.stringify(report.topOffenders, null, 2));
    }
  }

  await browser.close();
}

diagnose();
