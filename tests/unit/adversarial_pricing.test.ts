import { describe, it, expect } from "vitest";
import {
  calculateFrontendEstimate,
  formatMYR,
  getPackageById,
  getAddonById,
  PRICING_PACKAGES,
  PRICING_ADDONS,
} from "../../src/lib/pricing/calculator";

describe("Adversarial Pricing & State Calculations", () => {
  // 1. Exhaustive 4x4 matrix test (16 package/addon permutations)
  const packages = [
    { id: "landing", base: 645, isFullStack: false },
    { id: "business", base: 1745, isFullStack: false },
    { id: "premium", base: 2995, isFullStack: false },
    { id: "custom-system", base: 3250, isFullStack: true },
  ];

  const addonCombos = [
    { addons: [], addonTotal: 0, label: "no addons" },
    { addons: ["animation"], addonTotal: 400, label: "+ animation (400)" },
    { addons: ["second-lang"], addonTotal: 250, label: "+ second-lang (250)" },
    {
      addons: ["animation", "second-lang"],
      addonTotal: 650,
      label: "+ both addons (650)",
    },
    {
      addons: ["second-lang", "animation"],
      addonTotal: 650,
      label: "+ inverted order addons (650)",
    },
  ];

  for (const pkg of packages) {
    for (const combo of addonCombos) {
      it(`evaluates ${pkg.id} (${pkg.base}) with ${combo.label}`, () => {
        const res = calculateFrontendEstimate(pkg.id, combo.addons);

        if (pkg.isFullStack) {
          // Full-Stack must disable addons arithmetic completely
          expect(res.isFullStack).toBe(true);
          expect(res.basePrice).toBe(3250);
          expect(res.addonsTotal).toBe(0);
          expect(res.total).toBe(3250);
          expect(res.breakdown).toHaveLength(1);
          expect(res.breakdown[0].price).toBe(3250);
        } else {
          expect(res.isFullStack).toBe(false);
          expect(res.basePrice).toBe(pkg.base);
          expect(res.addonsTotal).toBe(combo.addonTotal);
          expect(res.total).toBe(pkg.base + combo.addonTotal);

          // Sum of breakdown items must exactly equal total
          const sumBreakdown = res.breakdown.reduce((acc, b) => acc + b.price, 0);
          expect(sumBreakdown).toBe(res.total);
          expect(res.breakdown).toHaveLength(1 + combo.addons.length);
        }
      });
    }
  }

  // 2. Exact Authoritative Target Verification
  it("strictly validates all key target pricing from prompt", () => {
    // Landing RM645
    expect(calculateFrontendEstimate("landing", []).total).toBe(645);
    expect(formatMYR(645)).toBe("RM645");

    // Business RM1,745
    expect(calculateFrontendEstimate("business", []).total).toBe(1745);
    expect(formatMYR(1745)).toBe("RM1,745");

    // Premium RM2,995
    expect(calculateFrontendEstimate("premium", []).total).toBe(2995);
    expect(formatMYR(2995)).toBe("RM2,995");

    // Full-Stack RM3,250 quote (add-ons disabled)
    const fs = calculateFrontendEstimate("custom-system", ["animation", "second-lang"]);
    expect(fs.total).toBe(3250);
    expect(fs.addonsTotal).toBe(0);
    expect(fs.isFullStack).toBe(true);
    expect(formatMYR(3250)).toBe("RM3,250");

    // Add-on Animation (+RM400)
    expect(getAddonById("animation")?.price).toBe(400);

    // Add-on Second Language (+RM250)
    expect(getAddonById("second-lang")?.price).toBe(250);

    // Business + Animation = RM2,145
    const bizAnim = calculateFrontendEstimate("business", ["animation"]);
    expect(bizAnim.total).toBe(2145);
    expect(formatMYR(bizAnim.total)).toBe("RM2,145");

    // Business + Both = RM2,395
    const bizBoth = calculateFrontendEstimate("business", ["animation", "second-lang"]);
    expect(bizBoth.total).toBe(2395);
    expect(formatMYR(bizBoth.total)).toBe("RM2,395");
  });

  // 3. Robustness against unknown/garbage inputs
  it("gracefully falls back on unknown packages or non-existent add-ons", () => {
    // Non-existent package should fall back to PRICING_PACKAGES[0] (landing)
    const fallback = calculateFrontendEstimate("cyber-deluxe", []);
    expect(fallback.basePrice).toBe(645);
    expect(fallback.total).toBe(645);

    // Unknown add-on IDs are ignored (0 price contribution)
    const ignoredAddon = calculateFrontendEstimate("business", ["mystery-addon", "hologram"]);
    expect(ignoredAddon.basePrice).toBe(1745);
    expect(ignoredAddon.addonsTotal).toBe(0);
    expect(ignoredAddon.total).toBe(1745);
    expect(ignoredAddon.breakdown).toHaveLength(1);
  });

  // 4. Currency Formatter Boundary Stress Test
  it("formats zero, large amounts, and handles NaN defensively", () => {
    expect(formatMYR(0)).toBe("RM0");
    expect(formatMYR(NaN)).toBe("RM0");
    expect(formatMYR(1000000)).toBe("RM1,000,000");
  });

  // 5. Query Parameter Handoff Generation & Ingress Simulation
  it("generates and parses pricing handoff query string symmetrically", () => {
    const pkgId = "business";
    const addons = ["animation", "second-lang"];
    const calc = calculateFrontendEstimate(pkgId, addons);

    // Build URL query string like PricingView.tsx
    const params = new URLSearchParams({
      service: "website-ui",
      package: pkgId,
      addons: addons.join(","),
      estimate: String(calc.total),
    });

    const queryString = params.toString();
    expect(queryString).toBe(
      "service=website-ui&package=business&addons=animation%2Csecond-lang&estimate=2395"
    );

    // Parse like ContactView.tsx
    const parsed = new URLSearchParams(queryString);
    expect(parsed.get("service")).toBe("website-ui");
    expect(parsed.get("package")).toBe("business");
    expect(parsed.get("addons")?.split(",")).toEqual(["animation", "second-lang"]);
    expect(Number(parsed.get("estimate"))).toBe(2395);

    // Check package lookup from parsed ID
    const foundPkg = getPackageById(parsed.get("package")!);
    expect(foundPkg?.name.ms).toBe("Frontend Business");
    expect(foundPkg?.name.en).toBe("Frontend Business");
  });

  it("generates and parses coaching handoff query string symmetrically", () => {
    const topicId = "react-next";
    const duration = "90";

    const params = new URLSearchParams({
      service: "coaching",
      topic: topicId,
      duration: duration,
    });

    const queryString = params.toString();
    expect(queryString).toBe("service=coaching&topic=react-next&duration=90");

    const parsed = new URLSearchParams(queryString);
    expect(parsed.get("service")).toBe("coaching");
    expect(parsed.get("topic")).toBe("react-next");
    expect(parsed.get("duration")).toBe("90");
  });

  // 6. Language Switcher Query Preservation Logic Oracle
  it("preserves query parameters across locale toggle logic from Header.tsx", () => {
    // Emulate getToggleUrl() from Header.tsx
    function getToggleUrl(pathname: string, locale: "ms" | "en", searchParams: URLSearchParams) {
      const targetLocale = locale === "ms" ? "en" : "ms";
      const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";

      if (targetLocale === "en") {
        if (pathname === "/") return `/en${queryString}`;
        return `/en${pathname}${queryString}`;
      } else {
        const stripped = pathname.replace(/^\/en(\/|$)/, "/");
        return `${stripped === "" ? "/" : stripped}${queryString}`;
      }
    }

    // Scenario A: /harga?estimate=2145 (ms -> en)
    const paramsA = new URLSearchParams("estimate=2145");
    const toEnA = getToggleUrl("/harga", "ms", paramsA);
    expect(toEnA).toBe("/en/harga?estimate=2145");

    // Scenario B: /en/harga?estimate=2145 (en -> ms)
    const toMsB = getToggleUrl("/en/harga", "en", paramsA);
    expect(toMsB).toBe("/harga?estimate=2145");

    // Scenario C: Root route / (ms -> en)
    const paramsEmpty = new URLSearchParams();
    expect(getToggleUrl("/", "ms", paramsEmpty)).toBe("/en");
    expect(getToggleUrl("/en", "en", paramsEmpty)).toBe("/");

    // Scenario D: Full pricing handoff query
    const paramsFull = new URLSearchParams({
      service: "website-ui",
      package: "business",
      addons: "animation,second-lang",
      estimate: "2395",
    });
    const toEnFull = getToggleUrl("/harga", "ms", paramsFull);
    expect(toEnFull).toContain("/en/harga?");
    expect(toEnFull).toContain("estimate=2395");
    expect(toEnFull).toContain("package=business");

    const toMsFull = getToggleUrl("/en/harga", "en", paramsFull);
    expect(toMsFull).toContain("/harga?");
    expect(toMsFull).toContain("estimate=2395");
  });
});
