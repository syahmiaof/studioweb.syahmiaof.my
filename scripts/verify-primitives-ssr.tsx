import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import sharp from "sharp";

// Import all 12 primitives from index
import {
  ConcretePlinth,
  HazardMarking,
  IndustrialGrid,
  ReflectiveFloor,
  ArchitecturalSYA,
  ArchitecturalNumeral04,
  ArchitecturalPlinth05,
  ArchitecturalNumeral07,
  BrutalistBanner,
  BrutalistArrow,
  DemoBadge,
  MetadataTicker,
  DEFAULT_TICKER_ITEMS,
} from "../src/components/ui";

interface TestResult {
  category: string;
  test: string;
  passed: boolean;
  details?: any;
  error?: string;
}

const results: TestResult[] = [];

function record(category: string, test: string, passed: boolean, details?: any, error?: string) {
  results.push({ category, test, passed, details, error });
  const status = passed ? "✓ PASS" : "✗ FAIL";
  console.log(`[${status}] [${category}] ${test}`);
  if (error) {
    console.error(`       Error: ${error}`);
  }
}

// -------------------------------------------------------------
// PART 1: Static Source Code Analysis for SSR Hydration & SVG Safety
// -------------------------------------------------------------
console.log("\n=== PART 1: STATIC CODE AUDIT (SSR & REACT SVG SAFETY) ===");

const uiDir = path.join(process.cwd(), "src", "components", "ui");
const uiFiles = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx"));

// Forbidden browser-only globals in SSR without guards
const FORBIDDEN_GLOBALS = [
  /\bwindow\b(?!\s*[:=]\s*["']|\s*\.\.\.)/, // match 'window' not in comment/string
  /\bdocument\b/,
  /\bnavigator\b/,
  /\blocalStorage\b/,
  /\bsessionStorage\b/,
  /\baddEventListener\b/,
  /\bremoveEventListener\b/,
];

// SVG attributes that MUST be camelCase in React, not kebab-case or all-lowercase
const INVALID_SVG_ATTRIBUTES = [
  { regex: /\bclip-path\s*=/g, valid: "clipPath" },
  { regex: /\bfill-opacity\s*=/g, valid: "fillOpacity" },
  { regex: /\bstroke-width\s*=/g, valid: "strokeWidth" },
  { regex: /\bstroke-linecap\s*=/g, valid: "strokeLinecap" },
  { regex: /\bstroke-linejoin\s*=/g, valid: "strokeLinejoin" },
  { regex: /\bstroke-miterlimit\s*=/g, valid: "strokeMiterlimit" },
  { regex: /\bstroke-dasharray\s*=/g, valid: "strokeDasharray" },
  { regex: /\bstroke-dashoffset\s*=/g, valid: "strokeDashoffset" },
  { regex: /\bstroke-opacity\s*=/g, valid: "strokeOpacity" },
  { regex: /\bstop-color\s*=/g, valid: "stopColor" },
  { regex: /\bstop-opacity\s*=/g, valid: "stopOpacity" },
  { regex: /\bdominant-baseline\s*=/g, valid: "dominantBaseline" },
  { regex: /\btext-anchor\s*=/g, valid: "textAnchor" },
  { regex: /\bflood-color\s*=/g, valid: "floodColor" },
  { regex: /\bflood-opacity\s*=/g, valid: "floodOpacity" },
  { regex: /\bletter-spacing\s*=/g, valid: "letterSpacing" },
  { regex: /\bfont-family\s*=/g, valid: "fontFamily" },
  { regex: /\bfont-size\s*=/g, valid: "fontSize" },
  { regex: /\bfont-weight\s*=/g, valid: "fontWeight" },
  { regex: /\bpatternunits\s*=/g, valid: "patternUnits" },
  { regex: /\bpatterntransform\s*=/g, valid: "patternTransform" },
  { regex: /\bpreserveaspectratio\s*=/g, valid: "preserveAspectRatio" },
  { regex: /\bstddeviation\s*=/g, valid: "stdDeviation" },
  { regex: /\bbasefrequency\s*=/g, valid: "baseFrequency" },
  { regex: /\bnumoctaves\s*=/g, valid: "numOctaves" },
  { regex: /\bviewbox\s*=/g, valid: "viewBox" },
  { regex: /\bclass\s*=/g, valid: "className" },
  { regex: /\bfor\s*=/g, valid: "htmlFor" },
];

for (const file of uiFiles) {
  const content = fs.readFileSync(path.join(uiDir, file), "utf8");
  
  // Remove comments before regex search
  const cleanContent = content
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*/g, "");

  // Check globals
  for (const globRegex of FORBIDDEN_GLOBALS) {
    const match = cleanContent.match(globRegex);
    if (match) {
      record("Static Analysis", `${file}: Browser global '${match[0]}' found`, false, null, `Forbidden global in SSR: ${match[0]}`);
    }
  }

  // Check invalid SVG attributes
  let hasInvalidSvgAttr = false;
  for (const { regex, valid } of INVALID_SVG_ATTRIBUTES) {
    const match = cleanContent.match(regex);
    if (match) {
      hasInvalidSvgAttr = true;
      record("Static Analysis", `${file}: Invalid attribute casing '${match[0]}'`, false, null, `Should be ${valid}`);
    }
  }

  // Check non-deterministic SSR values
  if (cleanContent.includes("Math.random()") || cleanContent.includes("Date.now()")) {
    record("Static Analysis", `${file}: Non-deterministic SSR function found`, false, null, "Found Math.random() or Date.now()");
  }

  record("Static Analysis", `${file} clean of forbidden globals and invalid casing`, !hasInvalidSvgAttr);
}

// -------------------------------------------------------------
// PART 2: SSR DOM Rendering Harness (renderToString & Console Trap)
// -------------------------------------------------------------
console.log("\n=== PART 2: EMPIRICAL SSR RENDERING HARNESS ===");

let trappedWarnings: string[] = [];
let trappedErrors: string[] = [];

const originalWarn = console.warn;
const originalError = console.error;

function startConsoleTrap() {
  trappedWarnings = [];
  trappedErrors = [];
  console.warn = (...args: any[]) => {
    trappedWarnings.push(args.map((a) => String(a)).join(" "));
    originalWarn(...args);
  };
  console.error = (...args: any[]) => {
    trappedErrors.push(args.map((a) => String(a)).join(" "));
    originalError(...args);
  };
}

function stopConsoleTrap() {
  console.warn = originalWarn;
  console.error = originalError;
  return { warnings: [...trappedWarnings], errors: [...trappedErrors] };
}

function testSSRComponent(name: string, element: React.ReactElement, expectedSnippets: string[]) {
  startConsoleTrap();
  try {
    const html = renderToString(element);
    const { warnings, errors } = stopConsoleTrap();

    const clean = warnings.length === 0 && errors.length === 0;
    const hasSnippets = expectedSnippets.every((snip) => html.includes(snip));

    if (!clean) {
      record("SSR Render", `${name} render without React warnings/errors`, false, { warnings, errors }, "React emitted warnings/errors during SSR");
    } else if (!hasSnippets) {
      record("SSR Render", `${name} output contains expected elements`, false, { html: html.slice(0, 300) }, "Missing expected HTML snippet");
    } else {
      record("SSR Render", `${name} rendered successfully to string`, true, { htmlLength: html.length });
    }
  } catch (err: any) {
    stopConsoleTrap();
    record("SSR Render", `${name} threw exception`, false, null, err.message);
  }
}

// 1. ConcretePlinth
testSSRComponent("ConcretePlinth (hero-stepped default)", <ConcretePlinth />, ["<svg", "viewBox=\"0 0 700 440\"", "hazard-pattern-plinth"]);
testSSRComponent("ConcretePlinth (cube-monolith)", <ConcretePlinth variant="cube-monolith" />, ["viewBox=\"0 0 500 280\"", "[PLINTH_05 // COBALT_CORE]"]);
testSSRComponent("ConcretePlinth (pedestal-angled)", <ConcretePlinth variant="pedestal-angled" />, ["viewBox=\"0 0 500 250\"", "[PEDESTAL // 3D_GALLERY_MOUNT]"]);
testSSRComponent("ConcretePlinth (with children)", <ConcretePlinth><span id="child-node">MOUNTED</span></ConcretePlinth>, ["id=\"child-node\"", "MOUNTED"]);
testSSRComponent("ConcretePlinth (no hazards, no cobalt)", <ConcretePlinth hasHazardMarkings={false} cobaltSplash={false} />, ["viewBox=\"0 0 700 440\""]);

// 2. HazardMarking
testSSRComponent("HazardMarking (stripes default)", <HazardMarking />, ["repeating-linear-gradient"]);
testSSRComponent("HazardMarking (chevrons)", <HazardMarking variant="chevrons" />, ["viewBox=\"0 0 24 24\"", "polygon points=\"6,2 18,12 6,22 10,22 22,12 10,2\""]);
testSSRComponent("HazardMarking (caution-bar)", <HazardMarking variant="caution-bar" />, ["CAUTION // BRUTALIST_SURFACE"]);
testSSRComponent("HazardMarking (numeric height)", <HazardMarking height={32} />, ["height:32px"]);

// 3. IndustrialGrid
testSSRComponent("IndustrialGrid (standard)", <IndustrialGrid />, ["grid-pattern-40", "05.83° N, 102.55° E"]);
testSSRComponent("IndustrialGrid (dense, no crosshairs)", <IndustrialGrid density="dense" showCrosshairs={false} />, ["grid-pattern-24"]);
testSSRComponent("IndustrialGrid (loose, custom coords)", <IndustrialGrid density="loose" coordinates="03.14° N, 101.69° E" />, ["grid-pattern-64", "03.14° N, 101.69° E"]);

// 4. ReflectiveFloor
testSSRComponent("ReflectiveFloor (dual)", <ReflectiveFloor />, ["bg-acid/15", "bg-cobalt/25"]);
testSSRComponent("ReflectiveFloor (acid only)", <ReflectiveFloor glowColor="acid" />, ["bg-acid/15"]);
testSSRComponent("ReflectiveFloor (cobalt only)", <ReflectiveFloor glowColor="cobalt" />, ["bg-cobalt/25"]);

// 5. ArchitecturalSYA
testSSRComponent("ArchitecturalSYA", <ArchitecturalSYA />, ["viewBox=\"0 0 1000 700\"", "letter-S", "letter-Y", "letter-A", "SYAHMIAOF"]);

// 6. ArchitecturalNumeral04
testSSRComponent("ArchitecturalNumeral04", <ArchitecturalNumeral04 />, ["viewBox=\"0 0 650 500\"", "numeral-0", "numeral-4"]);

// 7. ArchitecturalPlinth05
testSSRComponent("ArchitecturalPlinth05 (default)", <ArchitecturalPlinth05 />, ["viewBox=\"0 0 600 450\"", "[PLATFORM_05 // TVETMARA]"]);
testSSRComponent("ArchitecturalPlinth05 (with children)", <ArchitecturalPlinth05><div id="seated-char">CHAR</div></ArchitecturalPlinth05>, ["id=\"seated-char\"", "CHAR"]);

// 8. ArchitecturalNumeral07
testSSRComponent("ArchitecturalNumeral07", <ArchitecturalNumeral07 />, ["viewBox=\"0 0 500 500\"", "cobalt-rim-glow", "feDropShadow"]);

// 9. BrutalistBanner
testSSRComponent("BrutalistBanner (default)", <BrutalistBanner highlight="SYAHMI" />, ["SAYA", "SYAHMI", "AOF."]);
testSSRComponent("BrutalistBanner (custom parts, sm)", <BrutalistBanner part1="WEB" highlight="BUKAN BIASA" part2="" size="sm" />, ["WEB", "BUKAN BIASA"]);

// 10. BrutalistArrow
testSSRComponent("BrutalistArrow (curved-contact)", <BrutalistArrow variant="curved-contact" />, ["viewBox=\"0 0 500 280\""]);
testSSRComponent("BrutalistArrow (diagonal-pricing)", <BrutalistArrow variant="diagonal-pricing" />, ["viewBox=\"0 0 350 200\""]);
testSSRComponent("BrutalistArrow (stencil-plinth)", <BrutalistArrow variant="stencil-plinth" />, ["viewBox=\"0 0 200 120\""]);

// 11. DemoBadge
testSSRComponent("DemoBadge (KONSEP DEMO)", <DemoBadge type="KONSEP DEMO" />, ["KONSEP DEMO", "animate-ping"]);
testSSRComponent("DemoBadge (EKSPERIMENTAL cobalt)", <DemoBadge type="EKSPERIMENTAL" variant="cobalt" />, ["EKSPERIMENTAL"]);
testSSRComponent("DemoBadge (FRONTEND DEMO no pulse)", <DemoBadge type="FRONTEND DEMO" showPulse={false} />, ["FRONTEND DEMO"]);
testSSRComponent("DemoBadge (KARAKTER VISUAL JENAMA)", <DemoBadge type="KARAKTER VISUAL JENAMA" />, ["KARAKTER VISUAL JENAMA"]);

// 12. MetadataTicker
testSSRComponent("MetadataTicker (default items)", <MetadataTicker />, ["LOKASI", "BESUT, TERENGGANU", "60FPS // 100 LIGHTHOUSE", "ONLINE"]);
testSSRComponent("MetadataTicker (custom items)", <MetadataTicker items={[{ label: "CUSTOM", value: "VAL", isStatus: true }]} />, ["CUSTOM", "VAL", "animate-pulse"]);


// -------------------------------------------------------------
// PART 3: Project Image Binary and Raster Integrity Audit
// -------------------------------------------------------------
console.log("\n=== PART 3: PROJECT MOCKUPS INTEGRITY AUDIT ===");

const projectAssets = [
  { name: "symi-ui.png", minSize: 1000000, expectedW: 1600, expectedH: 1000 },
  { name: "lamborghini-concept.png", minSize: 1000000, expectedW: 1600, expectedH: 1000 },
  { name: "uberpokmi-ui.png", minSize: 1000000, expectedW: 1600, expectedH: 1000 },
];

const projectsDir = path.join(process.cwd(), "public", "assets", "projects");

async function verifyProjectAssets() {
  for (const asset of projectAssets) {
    const assetPath = path.join(projectsDir, asset.name);
    if (!fs.existsSync(assetPath)) {
      record("Asset Integrity", `${asset.name} exists in public/assets/projects/`, false, null, "File does not exist");
      continue;
    }

    const stat = fs.statSync(assetPath);
    if (stat.size < asset.minSize) {
      record("Asset Integrity", `${asset.name} non-empty binary (> 1MB)`, false, { size: stat.size }, `File size too small: ${stat.size} bytes`);
    } else {
      record("Asset Integrity", `${asset.name} non-empty binary (> 1MB)`, true, { size: stat.size });
    }

    // Verify PNG magic bytes
    const fd = fs.openSync(assetPath, "r");
    const header = Buffer.alloc(8);
    fs.readSync(fd, header, 0, 8, 0);
    fs.closeSync(fd);

    const isPng =
      header[0] === 0x89 &&
      header[1] === 0x50 &&
      header[2] === 0x4e &&
      header[3] === 0x47 &&
      header[4] === 0x0d &&
      header[5] === 0x0a &&
      header[6] === 0x1a &&
      header[7] === 0x0a;

    record("Asset Integrity", `${asset.name} valid PNG signature`, isPng);

    // Deep raster decode with sharp
    try {
      const meta = await sharp(assetPath).metadata();
      const stats = await sharp(assetPath).stats();

      const dimsMatch = meta.width === asset.expectedW && meta.height === asset.expectedH;
      record(
        "Asset Integrity",
        `${asset.name} resolution matches ${asset.expectedW}x${asset.expectedH}`,
        dimsMatch,
        { width: meta.width, height: meta.height, channels: meta.channels }
      );

      const rasterHealthy = !stats.isOpaque || meta.channels === 3 || meta.channels === 4;
      record(
        "Asset Integrity",
        `${asset.name} raster fully decodable by Sharp`,
        rasterHealthy,
        { format: meta.format, space: meta.space }
      );
    } catch (err: any) {
      record("Asset Integrity", `${asset.name} sharp decode error`, false, null, err.message);
    }
  }

  // Summary
  console.log("\n=== AUDIT SUMMARY ===");
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log(`Total Checks: ${total} | Passed: ${passed} | Failed: ${failed}`);

  if (failed > 0) {
    console.error(`FAILED ${failed} CHECKS!`);
    process.exit(1);
  } else {
    console.log("ALL SSR HYDRATION AND ASSET INTEGRITY CHECKS PASSED EMPIRICALLY (100%)!");
    process.exit(0);
  }
}

verifyProjectAssets().catch((err) => {
  console.error("Verification script crash:", err);
  process.exit(1);
});
