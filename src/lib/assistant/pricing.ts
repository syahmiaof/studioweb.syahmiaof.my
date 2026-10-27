import { COACHING_PACKAGES } from "../../content/coaching";
import { localized, localizedPriceLabel } from "../localized";
import { MAINTENANCE_OPTIONS, PRICING_PACKAGES, SYSTEM_OFFERS } from "../pricing/calculator";
import type { Locale } from "../types";

type Topic = "website" | "system" | "coaching" | "maintenance";

function topicFrom(text: string): Topic | null {
  if (/(coaching|kelas|belajar|mentor|辅导|课程)/i.test(text)) return "coaching";
  if (/(maintenance|penjagaan|care|维护)/i.test(text)) return "maintenance";
  if (/(sistem|system|full.stack|dashboard|booking|tempahan|系统|预约)/i.test(text)) return "system";
  if (/(website|web|landing|laman|page|site|网站|网页)/i.test(text)) return "website";
  return null;
}

export function answerUnmatchedPriceQuestion(question: string, locale: Locale, previousUserMessages: string[] = []): string {
  const prior = previousUserMessages.slice(-3).reverse().find((message) => topicFrom(message));
  const topic = topicFrom(question) ?? (prior ? topicFrom(prior) : null) ?? "website";
  const discount = /(discount|diskaun|potongan|折扣|优惠)/i.test(question);
  if (discount) {
    return locale === "ms"
      ? "Tiada diskaun rasmi yang diterbitkan. Harga akhir ikut skop dalam sebut harga bertulis; terangkan keperluan projek melalui borang WhatsApp untuk dibincang."
      : locale === "zh-Hans"
        ? "目前没有公布的折扣。最终价格以书面报价及项目范围为准；可通过 WhatsApp 表单说明需求。"
        : "No official discount is published. The final price follows a written quote based on scope; share your project needs through the WhatsApp form.";
  }

  if (topic === "coaching") {
    const options = COACHING_PACKAGES.map((item) => `${localized(item.name, locale)} RM${item.price} / ${item.durationMinutes} min`).join(" · ");
    return locale === "ms" ? `Pilihan coaching: ${options}. Slot disahkan manual selepas pertanyaan.`
      : locale === "zh-Hans" ? `辅导配套：${options}。时段需在咨询后人工确认。`
        : `Coaching options: ${options}. Session slots are confirmed manually after an enquiry.`;
  }
  if (topic === "maintenance") {
    const options = MAINTENANCE_OPTIONS.filter((item) => item.id !== "none")
      .map((item) => `${localized(item.name, locale)} ${localized(item.priceDisplay, locale)}`).join(" · ");
    return locale === "ms" ? `Penjagaan ialah pilihan berasingan: ${options}. Harga ini bukan sebahagian bayaran binaan sekali bayar.`
      : locale === "zh-Hans" ? `维护服务为额外选项：${options}。这些费用不包含在一次性开发费中。`
        : `Maintenance is optional and separate: ${options}. These charges are not part of the one-time build price.`;
  }
  if (topic === "system") {
    const options = SYSTEM_OFFERS.map((item) => `${localized(item.name, locale)} ${localizedPriceLabel(item.priceDisplay, locale)}`).join(" · ");
    return locale === "ms" ? `Pilihan sistem: ${options}. Fungsi di luar skop pakej perlu sebut harga bertulis.`
      : locale === "zh-Hans" ? `系统选项：${options}。套餐范围之外的功能需要书面报价。`
        : `System options: ${options}. Features outside the listed scope need a written quote.`;
  }
  const options = PRICING_PACKAGES.map((item) => `${localized(item.name, locale)} ${item.priceDisplay}`).join(" · ");
  return locale === "ms" ? `Harga website sekali bayar: ${options}. Domain, hosting dan penjagaan pilihan berasingan. Untuk skop khas, isi borang WhatsApp.`
    : locale === "zh-Hans" ? `网站一次性价格：${options}。域名、托管和可选维护另计。定制范围可通过 WhatsApp 表单咨询。`
      : `One-time website prices: ${options}. Domain, hosting and optional care are separate. Use the WhatsApp form for a custom scope.`;
}
