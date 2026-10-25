const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'projects');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const sourcePath = path.join(__dirname, '..', 'design', 'references', '03-portfolio.png');

async function extractMockups() {
  console.log('Extracting project mockups from 03-portfolio.png...');

  // 1. SYMI UI (Center-Top Browser)
  await sharp(sourcePath)
    .extract({ left: 725, top: 135, width: 600, height: 450 })
    .resize(1600, 1000, { fit: 'cover', position: 'top' })
    .toFile(path.join(targetDir, 'symi-ui.png'));

  // 2. LAMBORGHINI CONCEPT (Bottom-Left Browser)
  await sharp(sourcePath)
    .extract({ left: 355, top: 575, width: 430, height: 285 })
    .resize(1600, 1000, { fit: 'cover', position: 'center' })
    .toFile(path.join(targetDir, 'lamborghini-concept.png'));

  // 3. UBERPOKMI UI (Bottom-Right Composite)
  await sharp(sourcePath)
    .extract({ left: 1242, top: 455, width: 418, height: 385 })
    .resize(1600, 1000, { fit: 'cover', position: 'top' })
    .toFile(path.join(targetDir, 'uberpokmi-ui.png'));

  console.log('Extracted 3 mockups to public/assets/projects/');
}

extractMockups().catch((err) => {
  console.error('Error extracting mockups:', err);
  process.exit(1);
});
