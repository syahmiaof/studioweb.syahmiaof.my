import { afterEach, describe, expect, it, vi } from "vitest";
import { answerFaq, FAQ_KNOWLEDGE, resolveFaqIntent } from "../../src/lib/assistant/faq";
import { buildLeadSummary, buildWhatsAppUrl, getLeadPackages } from "../../src/lib/assistant/lead";
import { buildAssistantSystemPrompt, getLlmConfig, isPriceSensitive } from "../../src/lib/assistant/llm";
import { answerUnmatchedPriceQuestion } from "../../src/lib/assistant/pricing";
import { HERO_JOKES } from "../../src/content/hero-jokes";
import { PROJECTS } from "../../src/content/projects";

afterEach(() => vi.unstubAllEnvs());

describe("SYAHMIAOF Assistant FAQ", () => {
  it("recognizes every approved question example in Malay, English and Simplified Chinese", () => {
    for (const entry of FAQ_KNOWLEDGE) {
      for (const locale of ["ms", "en", "zh-Hans"] as const) {
        for (const question of entry.examples[locale] ?? []) {
          expect(resolveFaqIntent(question, locale)?.entry.id).toBe(entry.id);
          expect(answerFaq(question, locale)?.answer.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("maps every configured wording variation to its own intent in all locales", () => {
    for (const entry of FAQ_KNOWLEDGE) {
      for (const locale of ["ms", "en", "zh-Hans"] as const) {
        for (const alias of entry.aliases[locale] ?? []) {
          expect(resolveFaqIntent(alias, locale)?.entry.id).toBe(entry.id);
        }
      }
    }
  });

  it("keeps official price answers linked to canonical package data", () => {
    expect(answerFaq("website paling murah berapa", "ms")?.answer).toContain("RM299");
    expect(answerFaq("Business website includes", "en")?.answer).toContain("RM499");
    expect(answerFaq("System Care price", "en")?.answer).toContain("RM149");
    expect(answerFaq("berapa harga coaching", "ms")?.answer).toContain("RM39 / 1 jam");
    expect(answerFaq("berapa harga coaching", "ms")?.answer).toContain("RM99 / 2 jam");
  });

  it("answers Chinese FAQ with Chinese copy and preserves Malaysian Ringgit prices", () => {
    expect(answerFaq("最便宜的网站配套多少钱", "zh-Hans")?.answer).toContain("RM299");
    expect(answerFaq("RM499 Business Website 包含什么", "zh-Hans")?.answer).toContain("RM499");
    expect(answerFaq("一对一辅导多少钱", "zh-Hans")?.answer).toContain("RM39");
    expect(FAQ_KNOWLEDGE).toHaveLength(31);
  });

  it("answers who Syahmi is from the approved About copy in every locale", () => {
    expect(answerFaq("siapa syahmi", "ms")?.answer).toContain("TVETMARA Besut");
    expect(answerFaq("who is syahmi", "en")?.answer).toContain("TVETMARA Besut");
    expect(answerFaq("Syahmi 是谁", "zh-Hans")?.answer).toContain("TVETMARA Besut");
  });

  it("handles broad first-time buyer questions without a generic fallback", () => {
    expect(answerFaq("berapa harga website", "ms")?.answer).toContain("RM299");
    expect(answerFaq("what services do you offer", "en")?.answer).toContain("full-stack");
  });

  it("answers project-count questions from the Nemo portfolio records", () => {
    expect(answerFaq("Semua portfolio projek client sebenar?", "ms")?.answer).toContain("23 rekod projek daripada Nemo");
    expect(answerFaq("Are all portfolio projects real client work?", "en")?.answer).toContain("23 project records from Nemo");
    expect(answerFaq("作品集有多少个项目？", "zh-Hans")?.answer).toContain("23 个项目记录");
    expect(PROJECTS).toHaveLength(23);
  });

  it("keeps all ten owner-provided jokes present in each locale", () => {
    for (const locale of ["ms", "en", "zh-Hans"] as const) {
      expect(HERO_JOKES[locale].jokes).toHaveLength(10);
      expect(HERO_JOKES[locale].intro.length).toBeGreaterThan(5);
    }
  });

  it("does not guess when the question has no approved intent", () => {
    expect(answerFaq("Can you guarantee my sales will double next month?", "en")).toBeNull();
    expect(answerFaq("website", "ms")).toBeNull();
  });

  it("builds optional lead data from canonical package choices", () => {
    const pkg = getLeadPackages("website", "ms").find((item) => item.id === "landing");
    expect(pkg?.price).toBe("RM299");
    const summary = buildLeadSummary({ locale: "ms", service: "website", package: pkg, requirements: "Landing untuk kelas mengaji" });
    expect(summary).toContain("RM299");
    expect(summary).toContain("Keperluan projek: Landing untuk kelas mengaji");
    expect(summary).not.toContain("Timeline pilihan");
    expect(summary).not.toContain("Bajet pilihan");
  });

  it("URL-encodes WhatsApp summaries and rejects invalid phone numbers", () => {
    const url = buildWhatsAppUrl("+60 10-796 5236", "Hai Syahmi\nWebsite — RM299 & test");
    expect(url.startsWith("https://wa.me/60107965236?text=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Hai Syahmi\nWebsite");
    expect(() => buildWhatsAppUrl("abc", "message")).toThrow();
  });

  it("blocks LLM fallback for price-sensitive messages and keeps provider calls disabled by default", () => {
    expect(isPriceSensitive("How much for ten pages?")).toBe(true);
    expect(isPriceSensitive("Can you do a discount?")).toBe(true);
    expect(isPriceSensitive("Do you support dark mode?")).toBe(false);
    const original = process.env.STUDIO_ASSISTANT_LLM_ENABLED;
    delete process.env.STUDIO_ASSISTANT_LLM_ENABLED;
    expect(getLlmConfig().enabled).toBe(false);
    if (original !== undefined) process.env.STUDIO_ASSISTANT_LLM_ENABLED = original;
  });

  it("answers unmatched price questions from canonical prices and conversation context", () => {
    expect(answerUnmatchedPriceQuestion("berapa kos buat 10 halaman?", "ms")).toContain("RM299");
    expect(answerUnmatchedPriceQuestion("berapa?", "ms", ["Saya nak coaching React"])).toContain("RM99");
    expect(answerUnmatchedPriceQuestion("Can I get a discount?", "en")).toContain("No official discount");
    expect(answerUnmatchedPriceQuestion("系统多少钱？", "zh-Hans")).toContain("RM499");
  });

  it("keeps provider calls disabled in production until shared rate limiting exists", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("STUDIO_ASSISTANT_LLM_ENABLED", "true");
    vi.stubEnv("STUDIO_ASSISTANT_LLM_API_KEY", "test-key");
    vi.stubEnv("STUDIO_ASSISTANT_LLM_MODEL", "test-model");
    vi.stubEnv("STUDIO_ASSISTANT_LLM_ENDPOINT", "https://provider.example/v1");
    expect(getLlmConfig().enabled).toBe(false);
  });

  it("grounds optional AI fallback in approved FAQ and forbids invented commercial claims", () => {
    const prompt = buildAssistantSystemPrompt("en");
    expect(prompt).toContain("Do not invent or estimate prices");
    expect(prompt).toContain("Landing Page starts at RM299");
    expect(prompt).toContain("Never claim to be Syahmi");
    expect(prompt).toContain("TVETMARA Besut");
    expect(prompt).toContain("Nemo");
    expect(prompt).toContain("WhatsApp draft");
  });
});
