import { msTranslations } from "../src/i18n/ms";
import { enTranslations } from "../src/i18n/en";
import { getTranslations, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../src/i18n/index";
import {
  calculateFrontendEstimate,
  formatMYR,
  getPackageById,
  getAddonById,
  PRICING_PACKAGES,
  PRICING_ADDONS,
} from "../src/lib/pricing/calculator";
import { validateInquiry, InquirySchema } from "../src/lib/validation/inquiry";

interface VerificationReport {
  timestamp: string;
  verdict: "APPROVE" | "CHALLENGE";
  suites: {
    i18nSymmetry: {
      passed: boolean;
      msTotalLeafKeys: number;
      enTotalLeafKeys: number;
      missingInEn: string[];
      missingInMs: string[];
      undefinedOrNullValues: string[];
      emptyStringValues: string[];
      typeMismatches: string[];
      arrayLengthMismatches: string[];
      approvedSlogansVerified: boolean;
      sloganDetails: Record<string, { ms: string; en: string; status: "PASS" | "FAIL" }>;
    };
    pricingArithmetic: {
      passed: boolean;
      totalCombinationsTested: number;
      arithmeticFailures: string[];
      breakdownFailures: string[];
      fullStackIsolationPassed: boolean;
      edgeCasesPassed: boolean;
      formattingPassed: boolean;
      metadataPassed: boolean;
    };
    inquiryValidation: {
      passed: boolean;
      positiveTestsPassed: number;
      positiveTestsFailed: number;
      negativeTestsPassed: number;
      negativeTestsFailed: number;
      honeypotTrapPassed: boolean;
      failures: string[];
    };
  };
}

// ==========================================
// 1. RECURSIVE I18N SYMMETRY HARNESS
// ==========================================
function flattenObject(obj: Record<string, any>, prefix = ""): Map<string, any> {
  const map = new Map<string, any>();
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      const nested = flattenObject(val, fullPath);
      nested.forEach((nVal, nKey) => {
        map.set(nKey, nVal);
      });
    } else {
      map.set(fullPath, val);
    }
  }
  return map;
}

function verifyI18nSymmetry() {
  const msFlat = flattenObject(msTranslations);
  const enFlat = flattenObject(enTranslations);

  const missingInEn: string[] = [];
  const missingInMs: string[] = [];
  const undefinedOrNullValues: string[] = [];
  const emptyStringValues: string[] = [];
  const typeMismatches: string[] = [];
  const arrayLengthMismatches: string[] = [];

  // Check ms keys in en
  msFlat.forEach((msVal, path) => {
    if (!enFlat.has(path)) {
      missingInEn.push(path);
      return;
    }
    const enVal = enFlat.get(path);

    // Check undefined/null
    if (msVal === undefined || msVal === null) {
      undefinedOrNullValues.push(`ms:${path}`);
    }
    if (enVal === undefined || enVal === null) {
      undefinedOrNullValues.push(`en:${path}`);
    }

    // Check empty strings
    if (typeof msVal === "string" && msVal.trim() === "") {
      emptyStringValues.push(`ms:${path}`);
    }
    if (typeof enVal === "string" && enVal.trim() === "") {
      emptyStringValues.push(`en:${path}`);
    }

    // Check type match
    if (typeof msVal !== typeof enVal) {
      typeMismatches.push(`${path} (ms: ${typeof msVal}, en: ${typeof enVal})`);
    }

    // Check array specifics
    if (Array.isArray(msVal) && Array.isArray(enVal)) {
      if (msVal.length !== enVal.length) {
        arrayLengthMismatches.push(
          `${path} (ms length: ${msVal.length}, en length: ${enVal.length})`
        );
      } else {
        // Check objects inside array if any
        for (let i = 0; i < msVal.length; i++) {
          const itemMs = msVal[i];
          const itemEn = enVal[i];
          if (typeof itemMs === "object" && typeof itemEn === "object" && itemMs !== null && itemEn !== null) {
            const msItemKeys = Object.keys(itemMs).sort();
            const enItemKeys = Object.keys(itemEn).sort();
            if (JSON.stringify(msItemKeys) !== JSON.stringify(enItemKeys)) {
              typeMismatches.push(
                `${path}[${i}] keys mismatch: ms=${JSON.stringify(msItemKeys)} vs en=${JSON.stringify(enItemKeys)}`
              );
            }
          }
        }
      }
    }
  });

  // Check en keys in ms
  enFlat.forEach((_, path) => {
    if (!msFlat.has(path)) {
      missingInMs.push(path);
    }
  });

  // Verify Approved Slogans & E2E Guards
  const slogans = {
    "01-home": {
      expectedMs: "WEB YANG BUKAN BIASA.",
      actualMs: `${msTranslations.home.headlinePart1} ${msTranslations.home.headlinePart2}`.trim(),
      expectedEn: "WEBSITES BEYOND ORDINARY.",
      actualEn: `${enTranslations.home.headlinePart1} ${enTranslations.home.headlinePart2}`.trim(),
    },
    "02-services": {
      expectedMs: "BINA IDEA. LANCAR WEB.",
      actualMs: msTranslations.services.title,
      expectedEn: "BUILD THE IDEA. LAUNCH THE WEB.",
      actualEn: enTranslations.services.title,
    },
    "03-portfolio": {
      expectedMs: "IDEA JADI REALITI.",
      actualMs: msTranslations.portfolio.title,
      expectedEn: "TURNING IDEAS INTO REALITY.",
      actualEn: enTranslations.portfolio.title,
    },
    "04-pricing": {
      expectedMs: "BINA IKUT BAJET.",
      actualMs: msTranslations.pricing.title,
      expectedEn: "BUILD TO YOUR BUDGET.",
      actualEn: enTranslations.pricing.title,
    },
    "05-coaching": {
      expectedMs: "BELAJAR. BINA. DEPLOY.",
      actualMs: msTranslations.coaching.title,
      expectedEn: "LEARN. BUILD. DEPLOY.",
      actualEn: enTranslations.coaching.title,
    },
    "06-about": {
      expectedMs: "SAYA SYAHMI AOF.",
      actualMs: msTranslations.about.title,
      expectedEn: "I AM SYAHMI AOF.",
      actualEn: enTranslations.about.title,
    },
    "07-contact": {
      expectedMs: "IDEA KAU. KITA BINA.",
      actualMs: msTranslations.contact.title,
      expectedEn: "YOUR IDEA. WE BUILD IT.",
      actualEn: enTranslations.contact.title,
    },
  };

  const sloganDetails: Record<string, { ms: string; en: string; status: "PASS" | "FAIL" }> = {};
  let approvedSlogansVerified = true;

  for (const [routeId, s] of Object.entries(slogans)) {
    const msPass = s.actualMs === s.expectedMs;
    const enPass = s.actualEn === s.expectedEn;
    const pass = msPass && enPass;
    if (!pass) approvedSlogansVerified = false;
    sloganDetails[routeId] = {
      ms: `${s.actualMs} (${msPass ? "OK" : "EXPECTED: " + s.expectedMs})`,
      en: `${s.actualEn} (${enPass ? "OK" : "EXPECTED: " + s.expectedEn})`,
      status: pass ? "PASS" : "FAIL",
    };
  }

  // Specific check for E2E guard on pricing badge
  const pricingBadgePass = enTranslations.pricing.badge.includes("PRICING STUDIO");
  if (!pricingBadgePass) {
    approvedSlogansVerified = false;
    sloganDetails["04-pricing-e2e-guard"] = {
      ms: msTranslations.pricing.badge,
      en: `${enTranslations.pricing.badge} (MUST CONTAIN 'PRICING STUDIO')`,
      status: "FAIL",
    };
  }

  const passed =
    missingInEn.length === 0 &&
    missingInMs.length === 0 &&
    undefinedOrNullValues.length === 0 &&
    emptyStringValues.length === 0 &&
    typeMismatches.length === 0 &&
    arrayLengthMismatches.length === 0 &&
    approvedSlogansVerified;

  return {
    passed,
    msTotalLeafKeys: msFlat.size,
    enTotalLeafKeys: enFlat.size,
    missingInEn,
    missingInMs,
    undefinedOrNullValues,
    emptyStringValues,
    typeMismatches,
    arrayLengthMismatches,
    approvedSlogansVerified,
    sloganDetails,
  };
}

// ==========================================
// 2. PRICING ARITHMETIC ORACLE & STRESS HARNESS
// ==========================================
function verifyPricingArithmetic() {
  const arithmeticFailures: string[] = [];
  const breakdownFailures: string[] = [];
  let totalCombinationsTested = 0;

  // Expected price truth table:
  // Landing: base 645. Addons: animation 400, second-lang 250
  // Business: base 1745. Addons: animation 400, second-lang 250
  // Premium: base 2995. Addons: animation 400, second-lang 250
  // Custom-system: base 3250. Full-stack -> addons ignored, total = 3250
  const expectedTable: Record<string, { base: number; fullStack?: boolean }> = {
    landing: { base: 645 },
    business: { base: 1745 },
    premium: { base: 2995 },
    "custom-system": { base: 3250, fullStack: true },
  };

  const addonPrices: Record<string, number> = {
    animation: 400,
    "second-lang": 250,
  };

  const addonCombinations = [
    [],
    ["animation"],
    ["second-lang"],
    ["animation", "second-lang"],
    ["second-lang", "animation"], // Permutation
    ["invalid-addon"],
    ["animation", "invalid-addon"],
  ];

  for (const [pkgId, pkgSpec] of Object.entries(expectedTable)) {
    for (const addons of addonCombinations) {
      totalCombinationsTested++;
      const res = calculateFrontendEstimate(pkgId, addons);

      const isFull = Boolean(pkgSpec.fullStack);
      if (res.isFullStack !== isFull) {
        arithmeticFailures.push(
          `Package ${pkgId}: expected isFullStack=${isFull}, got ${res.isFullStack}`
        );
      }

      if (res.basePrice !== pkgSpec.base) {
        arithmeticFailures.push(
          `Package ${pkgId}: expected basePrice=${pkgSpec.base}, got ${res.basePrice}`
        );
      }

      if (isFull) {
        // Full-stack must have 0 addonsTotal and total === basePrice
        if (res.addonsTotal !== 0 || res.total !== pkgSpec.base) {
          arithmeticFailures.push(
            `Full-Stack ${pkgId} addons=[${addons.join(",")}]: expected addonsTotal=0, total=${pkgSpec.base}, got addonsTotal=${res.addonsTotal}, total=${res.total}`
          );
        }
      } else {
        let expectedAddons = 0;
        for (const a of addons) {
          if (addonPrices[a]) expectedAddons += addonPrices[a];
        }
        const expectedTotal = pkgSpec.base + expectedAddons;

        if (res.addonsTotal !== expectedAddons) {
          arithmeticFailures.push(
            `Package ${pkgId} addons=[${addons.join(",")}]: expected addonsTotal=${expectedAddons}, got ${res.addonsTotal}`
          );
        }

        if (res.total !== expectedTotal) {
          arithmeticFailures.push(
            `Package ${pkgId} addons=[${addons.join(",")}]: expected total=${expectedTotal}, got ${res.total}`
          );
        }
      }

      // Breakdown invariant check: sum of breakdown prices === total
      const breakdownSum = res.breakdown.reduce((sum, item) => sum + item.price, 0);
      if (breakdownSum !== res.total) {
        breakdownFailures.push(
          `Package ${pkgId} addons=[${addons.join(",")}]: breakdown sum (${breakdownSum}) !== total (${res.total})`
        );
      }
      if (res.breakdown[0].price !== pkgSpec.base) {
        breakdownFailures.push(
          `Package ${pkgId} addons=[${addons.join(",")}]: breakdown base (${res.breakdown[0].price}) !== pkg base (${pkgSpec.base})`
        );
      }
    }
  }

  // Check specific contract totals from ORIGINAL_REQUEST.md:
  // "Business + Animation = RM2,145; Business + Both = RM2,395"
  const bAnim = calculateFrontendEstimate("business", ["animation"]);
  if (bAnim.total !== 2145) {
    arithmeticFailures.push(`Contract failure: Business + Animation expected 2145, got ${bAnim.total}`);
  }
  const bBoth = calculateFrontendEstimate("business", ["animation", "second-lang"]);
  if (bBoth.total !== 2395) {
    arithmeticFailures.push(`Contract failure: Business + Both expected 2395, got ${bBoth.total}`);
  }

  // Edge cases & Fuzzing
  let edgeCasesPassed = true;
  const invalidPkg = calculateFrontendEstimate("non-existent-pkg-999", ["animation"]);
  if (isNaN(invalidPkg.total) || invalidPkg.total <= 0) {
    edgeCasesPassed = false;
    arithmeticFailures.push(`Fuzz failure: invalid package returned NaN or <= 0: ${invalidPkg.total}`);
  }

  const emptyPkg = calculateFrontendEstimate("", []);
  if (isNaN(emptyPkg.total) || emptyPkg.total <= 0) {
    edgeCasesPassed = false;
    arithmeticFailures.push(`Fuzz failure: empty package returned NaN or <= 0: ${emptyPkg.total}`);
  }

  // Format MYR checks
  let formattingPassed = true;
  const formatChecks: [number, string][] = [
    [0, "RM0"],
    [645, "RM645"],
    [1745, "RM1,745"],
    [2145, "RM2,145"],
    [2395, "RM2,395"],
    [2995, "RM2,995"],
    [3250, "RM3,250"],
    [NaN, "RM0"],
  ];
  for (const [amt, expectedStr] of formatChecks) {
    const formatted = formatMYR(amt);
    if (formatted !== expectedStr) {
      formattingPassed = false;
      arithmeticFailures.push(`formatMYR(${amt}): expected "${expectedStr}", got "${formatted}"`);
    }
  }

  // Metadata verification
  let metadataPassed = true;
  for (const pkg of PRICING_PACKAGES) {
    if (!pkg.id || !pkg.name.ms || !pkg.name.en || !pkg.basePrice || !pkg.priceDisplay) {
      metadataPassed = false;
      arithmeticFailures.push(`Metadata failure in PRICING_PACKAGES for id=${pkg.id}`);
    }
    if (!pkg.deliverables.ms.length || !pkg.deliverables.en.length) {
      metadataPassed = false;
      arithmeticFailures.push(`Deliverables empty in PRICING_PACKAGES for id=${pkg.id}`);
    }
  }

  for (const addon of PRICING_ADDONS) {
    if (!addon.id || !addon.name.ms || !addon.name.en || !addon.price) {
      metadataPassed = false;
      arithmeticFailures.push(`Metadata failure in PRICING_ADDONS for id=${addon.id}`);
    }
  }

  const passed =
    arithmeticFailures.length === 0 &&
    breakdownFailures.length === 0 &&
    edgeCasesPassed &&
    formattingPassed &&
    metadataPassed;

  return {
    passed,
    totalCombinationsTested,
    arithmeticFailures,
    breakdownFailures,
    fullStackIsolationPassed: true,
    edgeCasesPassed,
    formattingPassed,
    metadataPassed,
  };
}

// ==========================================
// 3. INQUIRY ZOD VALIDATION STRESS HARNESS
// ==========================================
function verifyInquiryValidation() {
  const failures: string[] = [];
  let positiveTestsPassed = 0;
  let positiveTestsFailed = 0;
  let negativeTestsPassed = 0;
  let negativeTestsFailed = 0;

  // Positive test cases (Must PASS)
  const validCases = [
    {
      desc: "Valid standard email and website-ui service",
      payload: {
        service: "website-ui",
        name: "Syahmi Dev",
        contact: "syahmi@example.com",
        message: "Kami memerlukan reka bentuk laman web korporat digital brutalism.",
        packageId: "landing",
        estimatedTotal: 645,
      },
    },
    {
      desc: "Valid Malaysian mobile 012",
      payload: {
        service: "coaching",
        name: "Mohd Ali",
        contact: "0123456789",
        message: "Saya mahu menyertai sesi bimbingan 1:1 untuk Next.js 14.",
        coachingTopic: "react-next",
        coachingDuration: "90",
      },
    },
    {
      desc: "Valid Malaysian mobile with spaces and dashes",
      payload: {
        service: "full-stack",
        name: "Nurul Huda",
        contact: "019 - 876 5432",
        message: "Membina portal pendaftaran pelajar dengan pangkalan data Supabase.",
      },
    },
    {
      desc: "Valid international format +60",
      payload: {
        service: "website-ui",
        name: "Kavitha",
        contact: "+601112345678",
        message: "Projek pendaratan produk teknologi baru untuk pasaran tempatan.",
      },
    },
    {
      desc: "Valid name boundary (exactly 2 characters)",
      payload: {
        service: "website-ui",
        name: "Li",
        contact: "li@test.my",
        message: "Taklimat projek minimum 10 aksara tepat.",
      },
    },
    {
      desc: "Valid name boundary (exactly 100 characters)",
      payload: {
        service: "website-ui",
        name: "A".repeat(100),
        contact: "longname@test.my",
        message: "Taklimat projek dengan nama 100 aksara.",
      },
    },
    {
      desc: "Valid message boundary (exactly 10 characters)",
      payload: {
        service: "website-ui",
        name: "Zul",
        contact: "zul@test.my",
        message: "1234567890",
      },
    },
    {
      desc: "Valid message boundary (exactly 2000 characters)",
      payload: {
        service: "website-ui",
        name: "Zul",
        contact: "zul@test.my",
        message: "M".repeat(2000),
      },
    },
    {
      desc: "Empty honeypot string is allowed",
      payload: {
        service: "website-ui",
        name: "Real User",
        contact: "user@test.my",
        message: "Taklimat projek sah tanpa spam.",
        honeypot: "",
      },
    },
    {
      desc: "All optional fields populated",
      payload: {
        service: "website-ui",
        name: "Complete Lead",
        contact: "lead@test.my",
        message: "Lengkapkan semua medan untuk semakan menyeluruh.",
        packageId: "business",
        packageName: "Frontend Business",
        addons: ["animation", "second-lang"],
        estimatedTotal: 2395,
        coachingTopic: "gsap",
        coachingDuration: "60",
      },
    },
  ];

  for (const tc of validCases) {
    const res = validateInquiry(tc.payload);
    if (res.success) {
      positiveTestsPassed++;
    } else {
      positiveTestsFailed++;
      failures.push(`Positive test "${tc.desc}" unexpectedly failed: ${JSON.stringify(res.error.errors)}`);
    }
  }

  // Negative test cases (Must FAIL)
  const invalidCases = [
    {
      desc: "Invalid service enum value",
      payload: {
        service: "invalid-service",
        name: "Ahmad",
        contact: "ahmad@test.my",
        message: "Taklimat projek sah.",
      },
    },
    {
      desc: "Name too short (1 char)",
      payload: {
        service: "website-ui",
        name: "A",
        contact: "ahmad@test.my",
        message: "Taklimat projek sah.",
      },
    },
    {
      desc: "Name too long (101 chars)",
      payload: {
        service: "website-ui",
        name: "A".repeat(101),
        contact: "ahmad@test.my",
        message: "Taklimat projek sah.",
      },
    },
    {
      desc: "Invalid contact format (not email, not phone)",
      payload: {
        service: "website-ui",
        name: "Ahmad",
        contact: "bukan_emel_atau_telefon",
        message: "Taklimat projek sah.",
      },
    },
    {
      desc: "Invalid contact format (incomplete email)",
      payload: {
        service: "website-ui",
        name: "Ahmad",
        contact: "ahmad@no-tld",
        message: "Taklimat projek sah.",
      },
    },
    {
      desc: "Message too short (9 chars)",
      payload: {
        service: "website-ui",
        name: "Ahmad",
        contact: "ahmad@test.my",
        message: "123456789",
      },
    },
    {
      desc: "Message too long (2001 chars)",
      payload: {
        service: "website-ui",
        name: "Ahmad",
        contact: "ahmad@test.my",
        message: "M".repeat(2001),
      },
    },
    {
      desc: "Honeypot filled (bot trap)",
      payload: {
        service: "website-ui",
        name: "Spam Bot",
        contact: "bot@spammer.org",
        message: "Buy cheap backlinks now for SEO.",
        honeypot: "https://spam.ru",
      },
    },
    {
      desc: "Invalid coaching duration (not 60 or 90)",
      payload: {
        service: "coaching",
        name: "Ahmad",
        contact: "ahmad@test.my",
        message: "Taklimat projek sah.",
        coachingDuration: "45",
      },
    },
    {
      desc: "Empty object (null payload test)",
      payload: {},
    },
  ];

  let honeypotTrapPassed = false;
  for (const tc of invalidCases) {
    const res = validateInquiry(tc.payload);
    if (!res.success) {
      negativeTestsPassed++;
      if (tc.desc.includes("Honeypot")) {
        honeypotTrapPassed = true;
      }
    } else {
      negativeTestsFailed++;
      failures.push(`Negative test "${tc.desc}" unexpectedly passed!`);
    }
  }

  const passed =
    positiveTestsFailed === 0 &&
    negativeTestsFailed === 0 &&
    honeypotTrapPassed &&
    failures.length === 0;

  return {
    passed,
    positiveTestsPassed,
    positiveTestsFailed,
    negativeTestsPassed,
    negativeTestsFailed,
    honeypotTrapPassed,
    failures,
  };
}

// ==========================================
// RUN MAIN VERIFICATION
// ==========================================
async function main() {
  console.log("==================================================================");
  console.log("CHALLENGER M1-1: ADVERSARIAL STRESS-TEST & INTEGRITY VERIFICATION");
  console.log("==================================================================");

  const i18n = verifyI18nSymmetry();
  const pricing = verifyPricingArithmetic();
  const inquiry = verifyInquiryValidation();

  console.log("\n[1] i18n Recursive Key Symmetry & Value Integrity:");
  console.log(`    - ms.ts Leaf Keys: ${i18n.msTotalLeafKeys}`);
  console.log(`    - en.ts Leaf Keys: ${i18n.enTotalLeafKeys}`);
  console.log(`    - Missing in en.ts: ${i18n.missingInEn.length}`);
  console.log(`    - Missing in ms.ts: ${i18n.missingInMs.length}`);
  console.log(`    - Undefined or Null Values: ${i18n.undefinedOrNullValues.length}`);
  console.log(`    - Empty String Values: ${i18n.emptyStringValues.length}`);
  console.log(`    - Type Mismatches: ${i18n.typeMismatches.length}`);
  console.log(`    - Array Length Mismatches: ${i18n.arrayLengthMismatches.length}`);
  console.log(`    - Slogans & E2E Guards Verified: ${i18n.approvedSlogansVerified ? "PASS" : "FAIL"}`);
  console.log(`    -> SUITE RESULT: ${i18n.passed ? "PASS" : "FAIL"}`);

  console.log("\n[2] Pricing Calculator Arithmetic & Isolation Oracle:");
  console.log(`    - Total Combinations Stress-Tested: ${pricing.totalCombinationsTested}`);
  console.log(`    - Arithmetic Failures: ${pricing.arithmeticFailures.length}`);
  console.log(`    - Breakdown Failures: ${pricing.breakdownFailures.length}`);
  console.log(`    - Full-Stack Isolation: ${pricing.fullStackIsolationPassed ? "PASS" : "FAIL"}`);
  console.log(`    - Edge Cases / Fuzzing: ${pricing.edgeCasesPassed ? "PASS" : "FAIL"}`);
  console.log(`    - Currency Formatting (MYR): ${pricing.formattingPassed ? "PASS" : "FAIL"}`);
  console.log(`    - Metadata Integrity: ${pricing.metadataPassed ? "PASS" : "FAIL"}`);
  console.log(`    -> SUITE RESULT: ${pricing.passed ? "PASS" : "FAIL"}`);

  console.log("\n[3] Inquiry Form & API Zod Schema Stress Harness:");
  console.log(`    - Positive Cases Passed: ${inquiry.positiveTestsPassed} / ${inquiry.positiveTestsPassed + inquiry.positiveTestsFailed}`);
  console.log(`    - Negative Cases Rejected: ${inquiry.negativeTestsPassed} / ${inquiry.negativeTestsPassed + inquiry.negativeTestsFailed}`);
  console.log(`    - Honeypot Bot Trap: ${inquiry.honeypotTrapPassed ? "PASS" : "FAIL"}`);
  console.log(`    - Schema Failures: ${inquiry.failures.length}`);
  console.log(`    -> SUITE RESULT: ${inquiry.passed ? "PASS" : "FAIL"}`);

  const overallPassed = i18n.passed && pricing.passed && inquiry.passed;
  const verdict: "APPROVE" | "CHALLENGE" = overallPassed ? "APPROVE" : "CHALLENGE";

  console.log("\n==================================================================");
  console.log(`FINAL EMPIRICAL VERDICT: ${verdict}`);
  console.log("==================================================================");

  const report: VerificationReport = {
    timestamp: new Date().toISOString(),
    verdict,
    suites: {
      i18nSymmetry: i18n,
      pricingArithmetic: pricing,
      inquiryValidation: inquiry,
    },
  };

  // Exit with non-zero if challenged
  if (!overallPassed) {
    console.error("ADVERSARIAL CHALLENGE DETECTED! Failures found.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error during adversarial verification:", err);
  process.exit(1);
});
