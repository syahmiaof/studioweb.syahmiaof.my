const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");
async function main() {
  const out = "public/assets/optimized";
  fs.mkdirSync(out, { recursive: true });
  const manifest = [];
  for (const name of fs
    .readdirSync("public/assets/characters")
    .filter((n) => n.endsWith(".png"))) {
    const source = path.join("public/assets/characters", name);
    const target = path.join(out, name.replace(".png", ".webp"));
    // Trim only transparent padding, never the character itself.
    await sharp(source)
      .trim({ background: "#00000000", threshold: 10 })
      .resize({ width: 1100, withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(target);
    manifest.push({
      source,
      target,
      originalBytes: fs.statSync(source).size,
      bytes: fs.statSync(target).size,
      ...(await sharp(target).metadata()),
    });
  }
  const crops = [
    [
      "concrete",
      "06-about.png",
      { left: 1450, top: 650, width: 180, height: 95 },
    ],
    [
      "paper",
      "02-services.png",
      { left: 260, top: 80, width: 430, height: 60 },
    ],
    [
      "carbon",
      "05-coaching.png",
      { left: 290, top: 80, width: 340, height: 55 },
    ],
    [
      "home-terrace",
      "01-home.png",
      { left: 100, top: 590, width: 650, height: 198 },
    ],
    [
      "pricing-monument",
      "04-pricing.png",
      { left: 0, top: 490, width: 760, height: 451 },
    ],
  ];
  for (const [name, ref, region] of crops) {
    const target = `${out}/${name}.webp`;
    await sharp(`design/references/${ref}`)
      .extract(region)
      .webp({ quality: 88 })
      .toFile(target);
    manifest.push({
      source: `design/references/${ref}`,
      target,
      region,
      role: "Decorative crop only; no live UI",
      bytes: fs.statSync(target).size,
    });
  }
  for (const name of fs
    .readdirSync("public/assets/projects")
    .filter((n) => n.endsWith(".png"))) {
    await sharp(`public/assets/projects/${name}`)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(`${out}/${name.replace(".png", ".webp")}`);
  }
  fs.writeFileSync(
    "docs/qa/astra-asset-manifest.json",
    JSON.stringify(manifest, null, 2),
  );
  console.log(
    manifest.map((m) => ({
      target: m.target,
      bytes: m.bytes,
      original: m.originalBytes,
    })),
  );
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
