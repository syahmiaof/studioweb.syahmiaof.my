import type { Locale } from "../types";
import { localized } from "../localized";
import { COACHING_PACKAGES } from "../../content/coaching";
import { PROJECTS } from "../../content/projects";
import {
  INCLUDED_FREEBIES,
  MAINTENANCE_OPTIONS,
  PRICING_ADDONS,
  PRICING_PACKAGES,
  SYSTEM_OFFERS,
  formatMYR,
} from "../pricing/calculator";

export type FaqId = `F${string}`;
export type FaqEntry = {
  id: FaqId;
  examples: { ms: string[]; en: string[]; "zh-Hans"?: string[] };
  aliases: { ms: string[]; en: string[]; "zh-Hans"?: string[] };
  answer: (locale: Locale) => string;
};

const p = (id: string) => PRICING_PACKAGES.find((item) => item.id === id)!;
const s = (id: string) => SYSTEM_OFFERS.find((item) => item.id === id)!;
const addon = (id: string) => PRICING_ADDONS.find((item) => item.id === id)!;
const care = (id: string) => MAINTENANCE_OPTIONS.find((item) => item.id === id)!;
const money = (amount: number) => formatMYR(amount);
const local = (locale: Locale, ms: string, en: string) => locale === "ms" ? ms : en;

export const FAQ_KNOWLEDGE: FaqEntry[] = [
  {
    id: "F01", examples: { ms: ["Website paling murah berapa?"], en: ["What is your cheapest website?"] },
    aliases: { ms: ["website paling murah", "harga website murah", "website murah berapa", "landing page paling murah"], en: ["cheapest website", "cheapest web package", "lowest website price"] },
    answer: (l) => local(l, `Landing Page bermula ${p("landing").priceDisplay}. Domain dan hosting dicaj berasingan.`, `Landing Page starts at ${p("landing").priceDisplay}. Domain and hosting are billed separately.`),
  },
  {
    id: "F02", examples: { ms: ["Apa termasuk dalam Landing Page RM299?"], en: ["What is included in the RM299 Landing Page?"] },
    aliases: { ms: ["termasuk landing page", "landing page rm299", "landing page dapat apa", "apa isi landing page"], en: ["landing page includes", "included in landing page", "included in rm299 landing page", "included in the rm299 landing page", "what comes with landing page"] },
    answer: (l) => {
      const item = p("landing");
      const contents = localized(item.deliverables, l).join("; ");
      return local(l, `${item.name.ms} ${item.priceDisplay} merangkumi ${contents}. Tidak termasuk database, login atau sistem pembayaran.`, `${item.name.en} at ${item.priceDisplay} includes ${contents}. It does not include a database, login or payment system.`);
    },
  },
  {
    id: "F03", examples: { ms: ["Apa termasuk Business Website RM499?"], en: ["What is included in the RM499 Business Website?"] },
    aliases: { ms: ["business website rm499", "laman web bisnes dapat apa", "apa termasuk website bisnes", "business website termasuk"], en: ["business website includes", "what comes with business website", "included in business website"] },
    answer: (l) => { const item = p("business"); return local(l, `${item.name.ms} ${item.priceDisplay}: ${item.deliverables.ms.join("; ")}. Database, payment gateway dan login pengguna tidak termasuk.`, `${item.name.en} ${item.priceDisplay}: ${item.deliverables.en.join("; ")}. A database, payment gateway and user login are not included.`); },
  },
  {
    id: "F04", examples: { ms: ["Apa beza Premium Custom RM999?"], en: ["What makes Premium Custom different?"] },
    aliases: { ms: ["premium custom rm999", "beza pakej premium", "apa beza website premium", "premium website termasuk"], en: ["premium custom different", "premium website includes", "premium package difference"] },
    answer: (l) => { const item = p("premium"); const tier = addon("advanced-animation"); return local(l, `${item.name.ms} ${item.priceDisplay} memberi sehingga 5 halaman, arah visual lebih tersuai dan animasi hover/entrance asas. Animasi lanjutan atau sinematik ialah tambahan berasingan (dari ${money(tier.price)}).`, `${item.name.en} ${item.priceDisplay} includes up to 5 pages, a more personal visual direction and basic hover/entrance animation. Advanced or cinematic animation is a separate add-on (from ${money(tier.price)}).`); },
  },
  {
    id: "F05", examples: { ms: ["Boleh buat booking system?"], en: ["Can you build a booking system?"] },
    aliases: { ms: ["booking system", "sistem booking", "sistem tempahan", "tempahan automatik"], en: ["booking system", "booking website", "appointment booking"] },
    answer: (l) => { const item = s("booking-request"); return local(l, `${item.name.ms} berharga ${item.priceDisplay} untuk satu servis. Ia menerima permintaan dan bisnes mengesahkan secara manual; bukan kalendar tempahan automatik atau sistem bayaran.`, `${item.name.en} costs ${item.priceDisplay} for one service. It collects requests for manual confirmation; it is not an automatic booking calendar or payment system.`); },
  },
  {
    id: "F06", examples: { ms: ["Ada dashboard?"], en: ["Do you build dashboards?"] },
    aliases: { ms: ["dashboard lite", "dashboard sistem", "buat dashboard", "ada dashboard"], en: ["dashboard lite", "build a dashboard", "do you build dashboards"] },
    answer: (l) => { const item = s("dashboard-lite"); return local(l, `${item.name.ms} bermula ${item.priceDisplay}: satu modul operasi kecil dan satu peranan admin. Skop sebenar perlu disahkan dahulu.`, `${item.name.en} starts ${item.priceDisplay}: one small operational module and one admin role. The final scope needs to be confirmed first.`); },
  },
  {
    id: "F07", examples: { ms: ["Boleh buat sistem custom besar?"], en: ["Can you build a larger custom system?"] },
    aliases: { ms: ["sistem custom besar", "sistem khas lanjutan", "custom system besar", "sistem lebih kompleks"], en: ["large custom system", "larger custom system", "advanced custom system", "complex custom system"] },
    answer: (l) => { const item = s("advanced-system"); return local(l, `${item.name.ms} bermula ${item.priceDisplay}; harga akhir melalui sebut harga selepas semakan fungsi, integrasi dan skop. Nilai ini bukan harga tetap.`, `${item.name.en} starts ${item.priceDisplay}; final pricing requires a quotation after reviewing features, integrations and scope. This is not a fixed price.`); },
  },
  {
    id: "F08", examples: { ms: ["WhatsApp button berbayar?"], en: ["Do WhatsApp buttons cost extra?"] },
    aliases: { ms: ["whatsapp button", "button whatsapp", "pautan whatsapp percuma", "whatsapp api"], en: ["whatsapp button", "whatsapp link", "whatsapp api automation"] },
    answer: (l) => local(l, "Sehingga tiga pautan asas WhatsApp/media sosial termasuk tanpa caj tambahan. Automasi WhatsApp API tidak termasuk.", "Up to three basic WhatsApp/social links are included at no extra charge. WhatsApp API automation is not included."),
  },
  {
    id: "F09", examples: { ms: ["SEO termasuk?"], en: ["Is SEO included?"] },
    aliases: { ms: ["seo termasuk", "seo asas", "ranking google", "jamin ranking"], en: ["seo included", "basic seo", "google ranking", "search ranking guarantee"] },
    answer: (l) => { const seo = INCLUDED_FREEBIES.find((item) => item.ms.toLowerCase().includes("seo"))!; return local(l, `${seo.ms} termasuk. Tiada jaminan kedudukan carian atau jumlah trafik.`, `${seo.en} is included. Search rankings and traffic volume are not guaranteed.`); },
  },
  {
    id: "F10", examples: { ms: ["Tambah halaman berapa?"], en: ["How much is an extra page?"] },
    aliases: { ms: ["tambah halaman", "halaman tambahan", "page tambahan", "harga satu page"], en: ["extra page", "additional page", "add a page", "price per page"] },
    answer: (l) => { const item = addon("extra-page"); return local(l, `Satu ${item.name.ms.toLowerCase()} berharga ${money(item.price)}. Harga ini untuk halaman kandungan standard; halaman kompleks perlu sebut harga berasingan.`, `One ${item.name.en.toLowerCase()} costs ${money(item.price)}. This is for a standard content page; complex pages need a separate quote.`); },
  },
  {
    id: "F11", examples: { ms: ["Animasi GSAP berapa?"], en: ["How much does GSAP animation cost?"] },
    aliases: { ms: ["animasi gsap", "harga animasi", "animasi lanjutan", "animasi sinematik"], en: ["gsap animation", "animation add-on", "advanced animation", "cinematic animation"] },
    answer: (l) => { const advanced = addon("advanced-animation"); const cinematic = addon("cinematic-animation"); return local(l, `Pilih satu tahap untuk satu urutan: ${advanced.name.ms} +${money(advanced.price)} atau ${cinematic.name.ms} +${money(cinematic.price)}. Kedua-duanya tidak dicaj serentak untuk urutan yang sama.`, `Choose one tier for one agreed sequence: ${advanced.name.en} +${money(advanced.price)} or ${cinematic.name.en} +${money(cinematic.price)}. They are not both charged for the same sequence.`); },
  },
  {
    id: "F12", examples: { ms: ["Domain dan hosting termasuk?"], en: ["Are domain and hosting included?"] },
    aliases: { ms: ["domain hosting termasuk", "domain dan hosting", "hosting termasuk", "emel domain"], en: ["domain and hosting", "hosting included", "domain included", "domain email"] },
    answer: (l) => local(l, "Tidak. Domain, hosting, emel dan langganan pihak ketiga dicaj berasingan.", "No. Domain, hosting, email and third-party subscriptions are billed separately."),
  },
  {
    id: "F13", examples: { ms: ["Saya dah ada domain. Boleh guna?"], en: ["Can I use the domain I already own?"] },
    aliases: { ms: ["dah ada domain", "domain sendiri", "guna domain sedia ada", "saya ada domain"], en: ["already own a domain", "use my domain", "existing domain", "domain i already have"] },
    answer: (l) => local(l, "Boleh, tertakluk pada akses domain dan konfigurasi teknikal yang diperlukan.", "Yes, subject to domain access and the required technical configuration."),
  },
  {
    id: "F14", examples: { ms: ["Maintenance wajib setiap bulan?"], en: ["Is monthly maintenance required?"] },
    aliases: { ms: ["maintenance wajib", "maintenance bulanan wajib", "wajib maintenance", "penjagaan bulanan wajib"], en: ["maintenance required", "monthly maintenance required", "must pay monthly maintenance"] },
    answer: (l) => { const none = care("none"); return local(l, `Tidak. ${none.name.ms} ialah pilihan; anda juga boleh pilih servis bulanan atau bayar ikut tugasan.`, `No. ${none.name.en} is an option; you can choose a monthly service or pay per task.`); },
  },
  {
    id: "F15", examples: { ms: ["Maintenance ikut tugasan berapa?"], en: ["How much is pay-per-task maintenance?"] },
    aliases: { ms: ["maintenance ikut tugasan", "bayar per task", "harga maintenance task", "edit website kecil"], en: ["pay per task maintenance", "maintenance per task", "small website edit"] },
    answer: (l) => { const item = care("pay-per-task"); return local(l, `${item.name.ms} bermula ${item.priceDisplay}. ${item.description.ms}`, `${item.name.en} starts ${item.priceDisplay}. ${item.description.en}`); },
  },
  {
    id: "F16", examples: { ms: ["Website Care RM59 termasuk apa?"], en: ["What does Website Care at RM59 include?"] },
    aliases: { ms: ["website care rm59", "penjagaan website", "website care termasuk", "care website bulanan"], en: ["website care rm59", "website care includes", "website care plan", "monthly website care"] },
    answer: (l) => { const item = care("website-care"); return local(l, `${item.name.ms}: ${item.priceDisplay}. ${item.includes.ms.join("; ")}. ${item.description.ms} ${item.excludes.ms.join("; ")}.`, `${item.name.en}: ${item.priceDisplay.en}. ${item.includes.en.join("; ")}. ${item.description.en} ${item.excludes.en.join("; ")}.`); },
  },
  {
    id: "F17", examples: { ms: ["System Care berapa?"], en: ["How much is System Care?"] },
    aliases: { ms: ["system care", "penjagaan sistem bulanan", "maintenance sistem", "harga system care"], en: ["system care", "monthly system maintenance", "system maintenance price"] },
    answer: (l) => { const item = care("system-care"); return local(l, `${item.name.ms} ${item.priceDisplay.ms}. ${item.description.ms}`, `${item.name.en} ${item.priceDisplay.en}. ${item.description.en}`); },
  },
  {
    id: "F18", examples: { ms: ["Kena bayar penuh terus?"], en: ["Do I have to pay everything upfront?"] },
    aliases: { ms: ["bayar penuh terus", "cara bayaran projek", "deposit projek", "bayaran 50 peratus"], en: ["pay everything upfront", "project payment terms", "project deposit", "50 percent deposit"] },
    answer: (l) => local(l, "Bayaran ialah deposit 50% sebelum pembangunan dan baki 50% sebelum serahan akhir, tertakluk pada sebut harga bertulis.", "Payment is a 50% deposit before development and the remaining 50% before final handover, subject to a written quotation."),
  },
  {
    id: "F19", examples: { ms: ["Berapa kali revision?"], en: ["How many revisions are included?"] },
    aliases: { ms: ["berapa kali revision", "pusingan revisi", "revision termasuk", "ubah suai berapa kali"], en: ["how many revisions", "revision rounds", "revisions included", "number of revisions"] },
    answer: (l) => local(l, `${p("landing").deliverables.ms.find((item) => item.includes("revisi"))}. Pindaan dikumpulkan dalam skop yang dipersetujui; pembaikan pepijat skop asal tidak menggunakan pusingan revisi.`, `${p("landing").deliverables.en.find((item) => item.includes("revision"))}. Changes are consolidated within the agreed scope; fixes for original-scope bugs do not use a revision round.`),
  },
  {
    id: "F20", examples: { ms: ["Ada warranty?"], en: ["Is there a warranty?"] },
    aliases: { ms: ["ada warranty", "jaminan website", "warranty berapa hari", "tempoh warranty"], en: ["is there a warranty", "website warranty", "warranty period", "how long is the warranty"] },
    answer: (l) => local(l, "Ada tempoh 14 hari selepas serahan untuk pepijat yang boleh diulang dan berpunca daripada skop asal yang dipersetujui.", "There is a 14-day period after handover for reproducible defects arising from the agreed original scope."),
  },
  {
    id: "F21", examples: { ms: ["Berapa lama website siap?"], en: ["How long will the website take?"] },
    aliases: { ms: ["berapa lama website siap", "timeline website", "bila website siap", "tempoh pembangunan"], en: ["how long will the website take", "website timeline", "when will it be ready", "development timeline"] },
    answer: (l) => local(l, "Tempoh bergantung pada skop, kerumitan, bahan yang anda sediakan dan kelancaran maklum balas. Timeline disahkan dalam sebut harga; aku tak akan teka tarikh siap.", "Timing depends on scope, complexity, supplied content and feedback availability. The timeline is confirmed in the quotation; I won't guess a delivery date."),
  },
  {
    id: "F22", examples: { ms: ["Boleh bagi website reference?"], en: ["Can I share a website reference?"] },
    aliases: { ms: ["website reference", "contoh website rujukan", "share reference website", "ikut design website"], en: ["website reference", "share a website example", "design reference", "reference site"] },
    answer: (l) => local(l, "Boleh kongsi beberapa contoh. Hasil akhir ikut skop yang dipersetujui dan perlu menghormati hak milik intelek; rujukan bukan salinan automatik.", "Yes, you can share examples. The final work follows the agreed scope and respects intellectual property; a reference is not copied automatically."),
  },
  {
    id: "F23", examples: { ms: ["Semua portfolio projek client sebenar?"], en: ["Are all portfolio projects real client work?"] },
    aliases: { ms: ["portfolio client sebenar", "projek pelanggan sebenar", "semua projek client", "demo konsep portfolio"], en: ["all portfolio projects real", "real client work", "client projects", "concept demo portfolio"] },
    answer: (l) => {
      const completed = PROJECTS.filter((item) => item.status === "completed").length;
      const onHold = PROJECTS.filter((item) => item.status === "on-hold").length;
      const inProgress = PROJECTS.filter((item) => item.status === "in-progress").length;
      const withoutLink = PROJECTS.filter((item) => !item.liveUrl).length;
      return local(l, `Portfolio memaparkan ${PROJECTS.length} rekod projek daripada Nemo: ${completed} selesai, ${onHold} ditangguhkan dan ${inProgress} sedang dibina. ${withoutLink} rekod belum ada URL live. Status ini bukan pengesahan bahawa setiap projek ialah kerja pelanggan berbayar.`, `The portfolio lists ${PROJECTS.length} project records from Nemo: ${completed} completed, ${onHold} on hold and ${inProgress} in progress. ${withoutLink} records do not have a live URL. These statuses do not verify that every project was paid client work.`);
    },
  },
  {
    id: "F24", examples: { ms: ["Coaching berapa?"], en: ["How much is coaching?"] },
    aliases: { ms: ["coaching berapa", "harga coaching", "coaching 1:1 harga", "pakej coaching"], en: ["coaching price", "how much coaching", "how much is coaching", "1:1 coaching price", "coaching packages"] },
    answer: (l) => { const list = COACHING_PACKAGES.map((item) => `${localized(item.name,l)} — ${money(item.price)} / ${item.durationMinutes === 60 ? (l === "ms" ? "1 jam" : l === "zh-Hans" ? "1 小时" : "1 hour") : (l === "ms" ? "2 jam" : l === "zh-Hans" ? "2 小时" : "2 hours")}`); return local(l, `Pilihan coaching: ${list.join("; ")}. Slot disahkan secara manual selepas pertanyaan.`, `Coaching options: ${list.join("; ")}. Session availability is confirmed manually after an enquiry.`); },
  },
  {
    id: "F25", examples: { ms: ["Beginner boleh join?"], en: ["Can a beginner join coaching?"] },
    aliases: { ms: ["beginner boleh join", "sesuai untuk beginner", "baru belajar coding", "coaching pemula"], en: ["beginner join coaching", "suitable for beginners", "new to coding", "coaching for beginners"] },
    answer: (l) => local(l, `${COACHING_PACKAGES[0].name.ms} sesuai untuk beginner yang mahu mula dengan HTML, CSS dan asas JavaScript.`, `${COACHING_PACKAGES[0].name.en} is suitable for beginners starting with HTML, CSS and JavaScript fundamentals.`),
  },
  {
    id: "F26", examples: { ms: ["Boleh book dan bayar terus?"], en: ["Can I book and pay immediately?"] },
    aliases: { ms: ["book dan bayar terus", "booking coaching", "bayar coaching terus", "slot coaching automatik"], en: ["book and pay immediately", "book coaching session", "pay for coaching now", "automatic coaching booking"] },
    answer: (l) => local(l, "Belum. Pertanyaan dan slot coaching disahkan manual oleh Syahmi; tiada tempahan atau pembayaran automatik.", "Not yet. Coaching enquiries and time slots are confirmed manually by Syahmi; there is no automatic booking or payment flow."),
  },
  {
    id: "F27", examples: { ms: ["Boleh buat login atau payment gateway?"], en: ["Can you build login or a payment gateway?"] },
    aliases: { ms: ["login payment gateway", "sistem login", "payment gateway website", "bayaran online website"], en: ["login or payment gateway", "user login system", "payment gateway website", "online payments"] },
    answer: (l) => local(l, "Boleh sebagai projek full-stack/custom dengan sebut harga berasingan. Login dan payment gateway bukan sebahagian pakej website frontend.", "Yes, as a separately quoted full-stack/custom project. Login and payment gateways are not part of the frontend website packages."),
  },
  {
    id: "F28", examples: { ms: ["Macam mana nak mula projek?"], en: ["How do I start a project?"] },
    aliases: { ms: ["macam mana nak mula projek", "nak mula projek", "mula website", "cara tempah website"], en: ["how do i start a project", "start a website project", "get a website quote", "how to hire you"] },
    answer: (l) => local(l, "Boleh mula dengan nama bisnes, jenis website yang dicari dan fungsi wajib. Tekan “Bincang Projek” untuk sediakan ringkasan WhatsApp yang boleh disemak dulu.", "Start with your business, the type of website you need and essential features. Choose “Start a Project” to prepare a WhatsApp summary for review first."),
  },
];

const zhFaq: Record<string, { example: string; aliases: string[]; answer: string }> = {
  F01:{example:"最便宜的网站配套多少钱？",aliases:["最便宜网站","网站价格","便宜网站","着陆页价格"],answer:`Landing Page 起价 ${p("landing").priceDisplay}。域名和托管费用另计。`},
  F02:{example:"RM299 Landing Page 包含什么？",aliases:["着陆页包含什么","RM299着陆页","着陆页内容"],answer:`${p("landing").name.en} ${p("landing").priceDisplay} 包含：${p("landing").deliverables.en.join("；")}。不包含数据库、登录或支付系统。`},
  F03:{example:"RM499 Business Website 包含什么？",aliases:["商业网站包含什么","RM499网站","商业网站配套"],answer:`${p("business").name.en} ${p("business").priceDisplay}：${p("business").deliverables.en.join("；")}。不包含数据库、支付网关和用户登录。`},
  F04:{example:"RM999 Premium Website 有什么不同？",aliases:["高级网站","Premium配套","高级网站包含"],answer:`${p("premium").name.en} ${p("premium").priceDisplay}，最多 5 个页面，提供更定制化的视觉方向及基础悬停/入场动画。高级或电影感动画需另加费用（${money(addon("advanced-animation").price)} 起）。`},
  F05:{example:"可以制作预约系统吗？",aliases:["预约系统","预订网站","预约服务"],answer:`${s("booking-request").name.en} 费用为 ${s("booking-request").priceDisplay}，适用于一项服务。系统收集预约请求，由商家人工确认；不包含自动预约日历或支付系统。`},
  F06:{example:"可以制作管理面板吗？",aliases:["管理面板","dashboard lite","后台面板"],answer:`${s("dashboard-lite").name.en} 起价 ${s("dashboard-lite").priceDisplay}：一个小型运营模块和一个管理员角色。最终范围须先确认。`},
  F07:{example:"可以开发大型定制系统吗？",aliases:["大型定制系统","复杂系统","进阶定制系统"],answer:`${s("advanced-system").name.en} 起价 ${s("advanced-system").priceDisplay}；需确认功能、集成与范围后再提供报价，这不是固定价格。`},
  F08:{example:"WhatsApp 按钮要额外收费吗？",aliases:["WhatsApp按钮","WhatsApp链接","WhatsApp自动化"],answer:"最多三个基础 WhatsApp/社交媒体链接免费包含。WhatsApp API 自动化不包含。"},
  F09:{example:"包含 SEO 吗？",aliases:["SEO","搜索排名","Google排名保证"],answer:"包含基础 SEO。我们不保证搜索排名或流量数量。"},
  F10:{example:"增加一个页面多少钱？",aliases:["额外页面价格","增加网页","每页收费"],answer:`一个${addon("extra-page").name.en}收费 ${money(addon("extra-page").price)}。此价格适用于标准内容页面；复杂页面需另行报价。`},
  F11:{example:"GSAP 动画多少钱？",aliases:["GSAP动画","动画附加项","高级动画价格","电影感动画"],answer:`每个约定动画序列选择一个等级：${addon("advanced-animation").name.en} +${money(addon("advanced-animation").price)}，或 ${addon("cinematic-animation").name.en} +${money(addon("cinematic-animation").price)}。同一序列不会同时收取两项费用。`},
  F12:{example:"域名和托管包含在内吗？",aliases:["域名托管","托管费用","域名电子邮件"],answer:"不包含。域名、托管、电子邮件和第三方订阅另行收费。"},
  F13:{example:"我可以使用已有域名吗？",aliases:["已有域名","自己的域名","使用现有域名"],answer:"可以，但需提供域名访问权限并完成必要的技术配置。"},
  F14:{example:"每月维护是必须的吗？",aliases:["必须维护吗","月度维护","维护服务必需"],answer:"不需要。可选择不维护、按任务付费，或选择月度维护服务。"},
  F15:{example:"按任务维护多少钱？",aliases:["按次维护","单项任务价格","小型网站修改"],answer:`${care("pay-per-task").name.en} 起价 ${care("pay-per-task").priceDisplay}。${care("pay-per-task").description.en}`},
  F16:{example:"RM59 Website Care 包含什么？",aliases:["网站维护套餐","月度网站维护","RM59维护"],answer:`${care("website-care").name.en}：${care("website-care").priceDisplay.en}。${care("website-care").includes.en.join("；")}。${care("website-care").description.en} ${care("website-care").excludes.en.join("；")}。`},
  F17:{example:"System Care 多少钱？",aliases:["系统维护","月度系统维护","System Care价格"],answer:`${care("system-care").name.en} ${care("system-care").priceDisplay.en}。${care("system-care").description.en}`},
  F18:{example:"需要一次付清吗？",aliases:["付款方式","项目订金","先付全款"],answer:"开发前支付 50% 订金，最终交付前支付余下 50%，具体以书面报价为准。"},
  F19:{example:"包含几轮修改？",aliases:["修改次数","包含修改","修改轮数"],answer:`${p("landing").deliverables.en.find(x=>x.toLowerCase().includes("revision"))}。修改会集中在已确认范围内；原范围内可复现的错误修复不占用修改轮次。`},
  F20:{example:"有保修期吗？",aliases:["网站保修","保修多少天","保修期限"],answer:"交付后 14 天内，可报告与已确认原始范围有关且可复现的缺陷。"},
  F21:{example:"网站需要多久完成？",aliases:["网站工期","何时完成","开发周期"],answer:"时间取决于范围、复杂度、你提供的资料及反馈速度。交付时间会写入报价，我们不会猜测完成日期。"},
  F22:{example:"可以提供网站参考吗？",aliases:["网站设计参考","分享网页案例","参考网站"],answer:"可以分享几个案例。最终成果依照约定范围并尊重知识产权；参考网站不会被自动照抄。"},
  F23:{example:"作品集有多少个项目？",aliases:["所有项目都是客户项目吗","Nemo 项目列表","项目状态"],answer:`作品集收录了 Nemo 中的 ${PROJECTS.length} 个项目记录：${PROJECTS.filter((x)=>x.status === "completed").length} 个已完成，${PROJECTS.filter((x)=>x.status === "on-hold").length} 个暂缓，${PROJECTS.filter((x)=>x.status === "in-progress").length} 个进行中。其中 ${PROJECTS.filter((x)=>!x.liveUrl).length} 个暂未提供线上链接。状态本身不能证明每个项目都是付费客户项目。`},
  F24:{example:"一对一辅导多少钱？",aliases:["辅导价格","一对一辅导配套","辅导费用"],answer:`辅导选择：${COACHING_PACKAGES.map(x=>`${x.name.en} — ${money(x.price)} / ${x.durationMinutes===60?"1 hour":"2 hours"}`).join("；")}。时段将在收到咨询后人工确认。`},
  F25:{example:"初学者可以参加辅导吗？",aliases:["适合初学者吗","刚学编程","编程入门辅导"],answer:`${COACHING_PACKAGES[0].name.en}适合从 HTML、CSS 与 JavaScript 基础开始的初学者。`},
  F26:{example:"可以直接预约并付款吗？",aliases:["直接预约","自动预约辅导","立即付款"],answer:"目前不可以。Syahmi 会人工确认辅导咨询与时段；没有自动预约或付款流程。"},
  F27:{example:"可以制作登录或支付网关吗？",aliases:["用户登录系统","支付网关","网站在线支付"],answer:"可以作为单独报价的全栈/定制项目。登录和支付网关不属于前端网站配套。"},
  F28:{example:"如何开始一个项目？",aliases:["开始网站项目","索取网站报价","聘请开发者"],answer:"请先准备公司/商店名称、所需网站类型及必要功能。点击“开始项目”即可准备 WhatsApp 摘要，并在发送前自行检查。"},
};

for (const entry of FAQ_KNOWLEDGE) {
  const originalAnswer = entry.answer;
  entry.examples["zh-Hans"] = [zhFaq[entry.id]?.example ?? "常见问题"];
  entry.aliases["zh-Hans"] = zhFaq[entry.id] ? [zhFaq[entry.id].example, ...zhFaq[entry.id].aliases] : [];
  entry.answer = (locale) => locale === "zh-Hans" ? (zhFaq[entry.id]?.answer ?? "请通过 WhatsApp 联系我们，进一步确认此问题。") : originalAnswer(locale);
}

export function normalizeAssistantText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase().replace(/[^a-z0-9\s\u0080-\uFFFF]/g, " ").replace(/\s+/g, " ").trim();
}

const STOP_WORDS = new Set(["a", "an", "the", "is", "are", "do", "does", "can", "could", "what", "how", "much", "in", "for", "to", "and", "my", "your", "apa", "ada", "boleh", "saya", "dalam", "untuk", "berapa", "kah", "yang", "dan", "dah", "ke"]);
function intentTokens(value: string): string[] {
  return normalizeAssistantText(value).split(" ").filter((token) => token.length > 1 && !STOP_WORDS.has(token)).map((token) => {
    if (token.length > 5 && token.endsWith("ed")) return token.slice(0, -2) + "e";
    if (token.length > 5 && token.endsWith("es")) return token.slice(0, -2) + "e";
    if (token.length > 4 && token.endsWith("s")) return token.slice(0, -1);
    return token;
  });
}

export function resolveFaqIntent(message: string, locale: Locale): { entry: FaqEntry; confidence: number } | null {
  const query = normalizeAssistantText(message);
  if (query.length < 3 || query.length > 1200) return null;
  let best: { entry: FaqEntry; score: number } | undefined;
  for (const entry of FAQ_KNOWLEDGE) {
    for (const alias of (entry.aliases[locale] ?? [])) {
      const phrase = normalizeAssistantText(alias);
      if (!phrase) continue;
      const exactPhrase = query.includes(phrase);
      const reversePhrase = phrase.length >= 13 && phrase.includes(query);
      const aliasWords = Array.from(new Set(intentTokens(alias)));
      const queryWords = Array.from(new Set(intentTokens(message)));
      const overlap = aliasWords.filter((word) => queryWords.includes(word));
      const coverage = aliasWords.length ? overlap.length / aliasWords.length : 0;
      const queryCoverage = queryWords.length ? overlap.length / queryWords.length : 0;
      const tokenMatch = overlap.length >= 2 && coverage >= 0.75 && queryCoverage >= 0.4;
      const score = exactPhrase ? 0.78 + Math.min(0.2, phrase.length / Math.max(query.length, phrase.length) * 0.2) : reversePhrase ? 0.7 : tokenMatch ? 0.7 + coverage * 0.24 + queryCoverage * 0.06 : 0;
      if (score > (best?.score ?? 0)) best = { entry, score };
    }
  }
  return best && best.score >= 0.76 ? { entry: best.entry, confidence: best.score } : null;
}

export function answerFaq(message: string, locale: Locale): { id: FaqId; answer: string; confidence: number } | null {
  const match = resolveFaqIntent(message, locale);
  return match ? { id: match.entry.id, answer: match.entry.answer(locale), confidence: match.confidence } : null;
}

export function getFaqGrounding(locale: Locale): Array<{ id: FaqId; question: string; answer: string }> {
  return FAQ_KNOWLEDGE.map((entry) => ({ id: entry.id, question: entry.examples[locale]?.[0] ?? entry.examples.en[0], answer: entry.answer(locale) }));
}
