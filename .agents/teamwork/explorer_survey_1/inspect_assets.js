const fs = require('fs');
const path = require('path');

function getPngInfo(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    if (buf.toString('ascii', 1, 4) !== 'PNG') return { error: 'Not a PNG' };
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    const bitDepth = buf.readUInt8(24);
    const colorType = buf.readUInt8(25);
    const colorTypes = { 0: 'Grayscale', 2: 'RGB', 3: 'Indexed', 4: 'Grayscale+Alpha', 6: 'RGBA' };
    return {
      width,
      height,
      bitDepth,
      colorType: colorTypes[colorType] || colorType,
      hasAlpha: colorType === 4 || colorType === 6,
      sizeBytes: buf.length
    };
  } catch (e) {
    return { error: e.message };
  }
}

console.log('=== DESIGN REFERENCES ===');
const refDir = path.join(process.cwd(), 'design', 'references');
if (fs.existsSync(refDir)) {
  fs.readdirSync(refDir).forEach(f => {
    const info = getPngInfo(path.join(refDir, f));
    console.log(`${f} | ${info.width}x${info.height} | ${info.colorType} | Alpha: ${info.hasAlpha} | Size: ${(info.sizeBytes / 1024 / 1024).toFixed(2)} MB`);
  });
}

console.log('\n=== PUBLIC CHARACTERS ===');
const charDir = path.join(process.cwd(), 'public', 'assets', 'characters');
if (fs.existsSync(charDir)) {
  fs.readdirSync(charDir).forEach(f => {
    const info = getPngInfo(path.join(charDir, f));
    console.log(`${f} | ${info.width}x${info.height} | ${info.colorType} | Alpha: ${info.hasAlpha} | Size: ${(info.sizeBytes / 1024 / 1024).toFixed(2)} MB`);
  });
}

console.log('\n=== OTHER PUBLIC ASSETS ===');
['projects', 'textures', 'references', 'og'].forEach(sub => {
  const p = path.join(process.cwd(), 'public', 'assets', sub);
  if (fs.existsSync(p)) {
    const files = fs.readdirSync(p);
    console.log(`public/assets/${sub}: (${files.length} files) -> ${files.join(', ')}`);
  } else {
    console.log(`public/assets/${sub}: DOES NOT EXIST`);
  }
});
