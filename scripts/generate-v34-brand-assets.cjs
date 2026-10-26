const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
const root = process.cwd();
const iconSource = path.join(root, "src", "app", "icon.svg");
const iconSvg = await fs.readFile(iconSource);
const iconOut = path.join(root, "public", "icons");
await fs.mkdir(iconOut, { recursive: true });
const sizes = [16, 32, 180, 192, 512];
const pngs = new Map();

for (const size of sizes) {
  const output = await sharp(iconSvg).resize(size, size, { fit: "contain" }).png({ compressionLevel: 9 }).toBuffer();
  pngs.set(size, output);
}

await Promise.all([
  fs.writeFile(path.join(iconOut, "favicon-16x16.png"), pngs.get(16)),
  fs.writeFile(path.join(iconOut, "favicon-32x32.png"), pngs.get(32)),
  fs.writeFile(path.join(iconOut, "apple-touch-icon.png"), pngs.get(180)),
  fs.writeFile(path.join(iconOut, "icon-192.png"), pngs.get(192)),
  fs.writeFile(path.join(iconOut, "icon-512.png"), pngs.get(512)),
]);

function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const image of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(image.size, 0);
    entry.writeUInt8(image.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(image.data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += image.data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

await fs.writeFile(path.join(root, "public", "favicon.ico"), createIco([
  { size: 16, data: pngs.get(16) },
  { size: 32, data: pngs.get(32) },
]));

const [anton, barlow] = await Promise.all([
  fs.readFile(path.join(root, "public", "fonts", "Anton-Regular.ttf")),
  fs.readFile(path.join(root, "public", "fonts", "Barlow-Regular.ttf")),
]);
const antonData = "data:font/ttf;base64," + anton.toString("base64");
const barlowData = "data:font/ttf;base64," + barlow.toString("base64");
const overlaySvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">' +
  '<defs><linearGradient id="shade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#09090b" stop-opacity=".94"/><stop offset=".53" stop-color="#09090b" stop-opacity=".72"/><stop offset=".75" stop-color="#09090b" stop-opacity="0"/></linearGradient>' +
  '<style>@font-face{font-family:StudioDisplay;src:url(' + antonData + ')}@font-face{font-family:StudioBody;src:url(' + barlowData + ')}</style></defs>' +
  '<rect width="1200" height="630" fill="url(#shade)"/><rect width="12" height="630" fill="#f3ff00"/>' +
  '<text x="62" y="118" fill="#f3ff00" font-family="StudioBody,Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="4">SYAHMIAOF STUDIO</text>' +
  '<path d="M62 140H380" stroke="#f3ff00" stroke-width="2"/>' +
  '<text x="58" y="322" fill="#fff" font-family="StudioDisplay,Impact,sans-serif" font-size="105">FREELANCE</text>' +
  '<text x="58" y="420" fill="#f3ff00" font-family="StudioDisplay,Impact,sans-serif" font-size="89">WEB SERVICES</text>' +
  '<text x="64" y="470" fill="#fff" font-family="StudioBody,Arial,sans-serif" font-size="19" letter-spacing="2">DESIGN · DEVELOPMENT · CUSTOM SYSTEMS</text></svg>';
const heroPlate = path.join(root, "public", "assets", "astra-v21", "01-home-plate.webp");
const metadata = await sharp(heroPlate).metadata();
const cropWidth = Math.round(metadata.height * 1200 / 630);

await sharp(heroPlate)
  .extract({ left: 0, top: 0, width: Math.min(cropWidth, metadata.width), height: metadata.height })
  .resize(1200, 630, { fit: "cover", position: "left" })
  .composite([{ input: Buffer.from(overlaySvg) }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public", "opengraph-image.png"));

console.log("Generated favicons, app icons and 1200x630 Open Graph image from the approved hero artwork.");
}

main().catch((error) => {
  console.error("Brand asset generation failed:", error);
  process.exitCode = 1;
});
