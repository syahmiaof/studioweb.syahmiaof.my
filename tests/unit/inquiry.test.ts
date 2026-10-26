import { describe, it, expect } from "vitest";
import { validateInquiry } from "../../src/lib/validation/inquiry";

describe("Inquiry Form & API Schema Validation", () => {
  it("passes validation with valid email and complete fields", () => {
    const input = {
      service: "website-ui",
      name: "Ahmad Farhan",
      contact: "farhan@example.com",
      message: "Kami berminat untuk membina landing page syarikat baru.",
      packageId: "landing",
      estimatedTotal: 299,
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(true);
  });

  it("passes validation with valid Malaysian phone number format", () => {
    const input = {
      service: "coaching",
      name: "Siti Sarah",
      contact: "0123456789",
      message: "Ingin bertanya tentang slot coaching Frontend Lanjutan dua jam.",
      coachingPackageId: "advanced-frontend",
      coachingTopic: "advanced-frontend",
      coachingDuration: "120",
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(true);
  });

  it("accepts a scoped system offer and optional recurring maintenance", () => {
    const res = validateInquiry({
      service: "full-stack",
      name: "Tan Wei Meng",
      contact: "tan@example.com",
      message: "Saya mahu tanya tentang dashboard rekod pelanggan.",
      packageId: "dashboard-lite",
      maintenanceId: "system-care",
    });
    expect(res.success).toBe(true);
  });

  it("rejects unsupported coaching packages and maintenance values", () => {
    const res = validateInquiry({
      service: "coaching",
      name: "Ali Ahmad",
      contact: "ali@example.com",
      message: "Saya ingin bertanya tentang sesi coaching.",
      coachingPackageId: "unapproved-package",
      maintenanceId: "unapproved-plan",
    });
    expect(res.success).toBe(false);
  });

  it("passes validation with international phone number format", () => {
    const input = {
      service: "full-stack",
      name: "Tan Wei Meng",
      contact: "+60198765432",
      message: "Perlukan pembangunan dashboard pentadbir dan integrasi pangkalan data.",
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(true);
  });

  it("rejects invalid contact format (neither valid email nor phone)", () => {
    const input = {
      service: "website-ui",
      name: "Test User",
      contact: "bukan_emel_dan_bukan_telefon",
      message: "Testing validation error detection.",
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(false);
  });

  it("rejects short message under 10 characters", () => {
    const input = {
      service: "website-ui",
      name: "Ali",
      contact: "ali@test.com",
      message: "Pendek",
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(false);
  });

  it("rejects bot submissions when honeypot field is filled", () => {
    const input = {
      service: "website-ui",
      name: "Spam Bot",
      contact: "spammer@bot.org",
      message: "Buy cheap backlinks now from our server.",
      honeypot: "http://spam-link.ru",
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(false);
  });

  it("caps add-on collection size and text length before pricing normalization", () => {
    const base = {
      service: "website-ui",
      name: "QA User",
      contact: "qa@example.com",
      message: "Saya ingin bertanya tentang landing page untuk bisnes.",
      packageId: "landing",
    };
    expect(validateInquiry({ ...base, addons: Array.from({ length: 9 }, () => "extra-page") }).success).toBe(false);
    expect(validateInquiry({ ...base, addons: ["x".repeat(81)] }).success).toBe(false);
  });
});
