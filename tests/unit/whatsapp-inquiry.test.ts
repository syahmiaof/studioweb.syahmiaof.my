import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "../../src/lib/assistant/lead";
import { buildInquiryWhatsAppMessage } from "../../src/lib/whatsapp/inquiry";

describe("Contact form WhatsApp handoff", () => {
  it("keeps every filled customer field and selected quote detail in a readable draft", () => {
    const summary = buildInquiryWhatsAppMessage({
      locale: "ms",
      name: "Aina Ahmad",
      contact: "aina@example.com",
      service: "website-ui",
      message: "Saya perlukan laman untuk kelas dalam talian.",
      packageDetail: "Landing Page — RM299 (sekali bayar)",
      addons: ["Halaman tambahan"],
      maintenance: "Website Care — RM59 / bulan",
      project: "Nemo",
    });
    expect(summary).toContain("Nama: Aina Ahmad");
    expect(summary).toContain("Emel / WhatsApp: aina@example.com");
    expect(summary).toContain("Servis: Website UI");
    expect(summary).toContain("Pakej / anggaran: Landing Page — RM299 (sekali bayar)");
    expect(summary).toContain("Ciri tambahan: Halaman tambahan");
    expect(summary).toContain("Penjagaan: Website Care — RM59 / bulan");
    expect(summary).toContain("Rujukan projek: Nemo");
    expect(summary).toContain("Butiran projek:\nSaya perlukan laman untuk kelas dalam talian.");
    const url = new URL(buildWhatsAppUrl("0107965236".replace(/^0/, "60"), summary));
    expect(url.hostname).toBe("wa.me");
    expect(url.pathname).toBe("/60107965236");
    expect(url.searchParams.get("text")).toBe(summary);
  });

  it("localizes the same handoff for English and Chinese visitors", () => {
    const base = { name: "Tan Mei", contact: "+60123456789", service: "coaching" as const, message: "I want to learn React and Next.js." };
    expect(buildInquiryWhatsAppMessage({ ...base, locale: "en" })).toContain("Service: 1:1 Coaching");
    expect(buildInquiryWhatsAppMessage({ ...base, locale: "zh-Hans" })).toContain("服务: 一对一辅导");
  });
});
