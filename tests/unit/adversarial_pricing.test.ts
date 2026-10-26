import { describe, expect, it } from "vitest";
import {
  calculateFrontendEstimate,
  getAddonById,
  normalizeFrontendAddonIds,
  PRICING_PACKAGES,
} from "../../src/lib/pricing/calculator";

describe("pricing input normalization and quote integrity", () => {
  it("never charges two mutually exclusive animation tiers regardless of input order", () => {
    for (const ids of [
      ["advanced-animation", "cinematic-animation"],
      ["cinematic-animation", "advanced-animation"],
      ["cinematic-animation", "advanced-animation", "cinematic-animation"],
    ]) {
      expect(normalizeFrontendAddonIds(ids)).toEqual(["cinematic-animation"]);
      expect(calculateFrontendEstimate("business", ids).total).toBe(698);
    }
  });

  it("ignores unknown package and addon values safely", () => {
    const estimate = calculateFrontendEstimate("untrusted-package", ["extra-page", "<script>"]);
    expect(estimate.basePrice).toBe(PRICING_PACKAGES[0].basePrice);
    expect(estimate.total).toBe(398);
    expect(Number.isFinite(estimate.total)).toBe(true);
  });

  it("contains no legacy translation add-on or price", () => {
    expect(getAddonById("second-lang")).toBeUndefined();
    expect(getAddonById("cinematic-animation")?.price).toBe(199);
    expect(getAddonById("advanced-animation")?.price).toBe(99);
  });

  it("uses only the supported frontend package ids in the customer estimator", () => {
    expect(PRICING_PACKAGES.map((pkg) => pkg.id)).toEqual(["landing", "business", "premium"]);
  });

  it("normalizes repeated ids but preserves separate page and animation selections", () => {
    expect(normalizeFrontendAddonIds([
      "extra-page",
      "extra-page",
      "advanced-animation",
      "advanced-animation",
    ])).toEqual(["extra-page", "advanced-animation"]);
    expect(calculateFrontendEstimate("business", ["extra-page", "advanced-animation"]).total).toBe(697);
  });
});
