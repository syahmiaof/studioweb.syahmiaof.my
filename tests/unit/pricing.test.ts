import { describe, it, expect } from "vitest";
import {
  calculateFrontendEstimate,
  formatMYR,
  PRICING_PACKAGES,
} from "../../src/lib/pricing/calculator";

describe("Pricing Studio Calculator", () => {
  it("calculates Landing base price without add-ons correctly as RM645", () => {
    const res = calculateFrontendEstimate("landing", []);
    expect(res.total).toBe(645);
    expect(res.basePrice).toBe(645);
    expect(res.addonsTotal).toBe(0);
    expect(formatMYR(res.total)).toBe("RM645");
  });

  it("calculates Business base price without add-ons correctly as RM1,745", () => {
    const res = calculateFrontendEstimate("business", []);
    expect(res.total).toBe(1745);
    expect(res.basePrice).toBe(1745);
    expect(res.addonsTotal).toBe(0);
    expect(formatMYR(res.total)).toBe("RM1,745");
  });

  it("calculates Premium base price without add-ons correctly as RM2,995", () => {
    const res = calculateFrontendEstimate("premium", []);
    expect(res.total).toBe(2995);
    expect(res.basePrice).toBe(2995);
    expect(res.addonsTotal).toBe(0);
    expect(formatMYR(res.total)).toBe("RM2,995");
  });

  it("calculates Business + Advanced Animation as RM2,145 (1745 + 400)", () => {
    const res = calculateFrontendEstimate("business", ["animation"]);
    expect(res.basePrice).toBe(1745);
    expect(res.addonsTotal).toBe(400);
    expect(res.total).toBe(2145);
    expect(formatMYR(res.total)).toBe("RM2,145");
  });

  it("calculates Business + Both Add-ons (Animation + Second Language) as RM2,395 (1745 + 400 + 250)", () => {
    const res = calculateFrontendEstimate("business", ["animation", "second-lang"]);
    expect(res.basePrice).toBe(1745);
    expect(res.addonsTotal).toBe(650);
    expect(res.total).toBe(2395);
    expect(formatMYR(res.total)).toBe("RM2,395");
  });

  it("re-calculates properly when an add-on is deselected/toggled off", () => {
    const withBoth = calculateFrontendEstimate("business", ["animation", "second-lang"]);
    expect(withBoth.total).toBe(2395);

    // Toggling off animation
    const withoutAnimation = calculateFrontendEstimate("business", ["second-lang"]);
    expect(withoutAnimation.total).toBe(1995); // 1745 + 250

    // Toggling off second language
    const withoutAny = calculateFrontendEstimate("business", []);
    expect(withoutAny.total).toBe(1745);
  });

  it("handles Custom Full-Stack System as manual quote and does not apply frontend add-on math", () => {
    const res = calculateFrontendEstimate("custom-system", ["animation", "second-lang"]);
    expect(res.isFullStack).toBe(true);
    expect(res.basePrice).toBe(3250);
    expect(res.addonsTotal).toBe(0);
    expect(res.total).toBe(3250);
  });

  it("never returns NaN or invalid string for any combination", () => {
    const res = calculateFrontendEstimate("invalid-package", ["non-existent-addon"]);
    expect(isNaN(res.total)).toBe(false);
    expect(res.total).toBeGreaterThanOrEqual(0);
    expect(formatMYR(res.total)).not.toContain("NaN");
  });
});
