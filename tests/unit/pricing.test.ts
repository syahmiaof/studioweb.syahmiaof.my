import { describe, expect, it } from "vitest";
import {
  calculateFrontendEstimate,
  formatMYR,
  getMaintenanceOptionById,
  getSystemOfferById,
} from "../../src/lib/pricing/calculator";

describe("V3.1 approved pricing", () => {
  it.each([
    ["landing", [], 299],
    ["business", [], 499],
    ["business", ["extra-page"], 598],
    ["business", ["advanced-animation"], 598],
    ["business", ["cinematic-animation"], 698],
    ["premium", [], 999],
    ["premium", ["cinematic-animation"], 1198],
  ] as const)("calculates %s with %j as RM%s", (packageId, addons, expected) => {
    const estimate = calculateFrontendEstimate(packageId, [...addons]);
    expect(estimate.total).toBe(expected);
    expect(estimate.isFullStack).toBe(false);
    expect(formatMYR(estimate.total)).toBe(`RM${expected.toLocaleString("en-MY")}`);
    expect(estimate.breakdown.reduce((sum, item) => sum + item.price, 0)).toBe(expected);
  });

  it("never charges both animation tiers for the same sequence", () => {
    const estimate = calculateFrontendEstimate("business", [
      "advanced-animation",
      "cinematic-animation",
    ]);
    expect(estimate.total).toBe(698);
    expect(estimate.addonsTotal).toBe(199);
    expect(estimate.breakdown.map((item) => item.price)).toEqual([499, 199]);
  });

  it("deduplicates add-ons and ignores unrecognized ids", () => {
    const estimate = calculateFrontendEstimate("business", [
      "extra-page",
      "extra-page",
      "old-addon",
    ]);
    expect(estimate.total).toBe(598);
    expect(estimate.breakdown).toHaveLength(2);
  });

  it("keeps system offers out of the fixed website calculator", () => {
    expect(getSystemOfferById("booking-request")?.priceDisplay).toBe("RM499");
    expect(getSystemOfferById("dashboard-lite")?.priceDisplay).toBe("Dari RM999");
    expect(getSystemOfferById("advanced-system")?.priceDisplay).toBe("Lebih RM2,099");
    expect(calculateFrontendEstimate("advanced-system").total).toBe(299);
  });

  it("keeps optional maintenance as separately billed and unadded to estimates", () => {
    expect(getMaintenanceOptionById("pay-per-task")?.priceDisplay.ms).toBe("Dari RM29 / tugasan");
    expect(getMaintenanceOptionById("website-care")?.priceDisplay.ms).toBe("RM59 / bulan");
    expect(getMaintenanceOptionById("system-care")?.priceDisplay.ms).toBe("Dari RM149 / bulan");
    expect(calculateFrontendEstimate("business", []).total).toBe(499);
  });

  it("formats boundary values without NaN", () => {
    expect(formatMYR(0)).toBe("RM0");
    expect(formatMYR(1000000)).toBe("RM1,000,000");
    expect(formatMYR(Number.NaN)).toBe("RM0");
  });
});
