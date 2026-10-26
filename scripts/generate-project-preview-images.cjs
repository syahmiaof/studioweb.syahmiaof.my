const fs = require("node:fs/promises");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const { chromium } = require("playwright");
const sharp = require("sharp");

const projectRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(projectRoot, "src", "content", "projects.ts");
const outputDir = path.join(projectRoot, "public", "assets", "portfolio-previews");

async function loadProjects() {
  const source = await fs.readFile(sourcePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const loaded = new Module(sourcePath, module);
  loaded.filename = sourcePath;
  loaded.paths = Module._nodeModulePaths(path.dirname(sourcePath));
  loaded._compile(compiled, sourcePath);
  return loaded.exports.PROJECTS;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const projects = (await loadProjects()).filter((project) => project.liveUrl);
  const browser = await chromium.launch({ headless: true });
  const results = [];
  let next = 0;

  async function worker() {
    while (next < projects.length) {
      const project = projects[next++];
      const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
      try {
        const response = await page.goto(project.liveUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(1200);
        await page.evaluate(() => document.fonts?.ready);
        if (!response || response.status() >= 400) {
          results.push({ id: project.id, status: response?.status() ?? "navigation-failed", saved: false });
          continue;
        }
        const image = await page.screenshot({ type: "png", animations: "disabled", timeout: 15000 });
        await sharp(image).resize(720, 405, { fit: "cover", position: "top" }).webp({ quality: 78, effort: 5 }).toFile(path.join(outputDir, `${project.id}.webp`));
        results.push({ id: project.id, status: response.status(), saved: true });
      } catch (error) {
        results.push({ id: project.id, status: error instanceof Error ? error.message : "screenshot-failed", saved: false });
      } finally {
        await page.close();
      }
    }
  }

  await Promise.all(Array.from({ length: 3 }, worker));
  await browser.close();
  process.stdout.write(`${JSON.stringify({ total: projects.length, saved: results.filter((result) => result.saved).length, results }, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : error}\n`);
  process.exitCode = 1;
});
