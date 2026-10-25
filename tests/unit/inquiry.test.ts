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
      estimatedTotal: 645,
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(true);
  });

  it("passes validation with valid Malaysian phone number format", () => {
    const input = {
      service: "coaching",
      name: "Siti Sarah",
      contact: "0123456789",
      message: "Ingin bertanya tentang kekosongan slot mentoring Next.js 90 minit.",
      coachingTopic: "react-next",
      coachingDuration: "90",
    };
    const res = validateInquiry(input);
    expect(res.success).toBe(true);
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
});
