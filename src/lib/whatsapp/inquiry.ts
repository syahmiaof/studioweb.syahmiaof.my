import type { Locale, ServiceCategory } from "@/lib/types";

type InquiryWhatsAppInput = {
  locale: Locale;
  name: string;
  contact: string;
  service: ServiceCategory;
  message: string;
  packageDetail?: string;
  addons?: string[];
  maintenance?: string;
  coaching?: string;
  project?: string;
};

const labels = {
  ms: {
    greeting: "Hai Syahmi, saya isi borang di SYAHMIAOF Studio.",
    name: "Nama", contact: "Emel / WhatsApp", service: "Servis", package: "Pakej / anggaran",
    addons: "Ciri tambahan", maintenance: "Penjagaan", coaching: "Sesi coaching",
    project: "Rujukan projek", message: "Butiran projek", closing: "Boleh kita bincang langkah seterusnya?",
    services: { "website-ui": "Website UI", "full-stack": "Sistem Full-Stack", coaching: "Coaching 1:1" },
  },
  en: {
    greeting: "Hi Syahmi, I filled in the form on SYAHMIAOF Studio.",
    name: "Name", contact: "Email / WhatsApp", service: "Service", package: "Package / estimate",
    addons: "Extra features", maintenance: "Maintenance", coaching: "Coaching session",
    project: "Project reference", message: "Project details", closing: "Could we discuss the next steps?",
    services: { "website-ui": "Website UI", "full-stack": "Full-Stack System", coaching: "1:1 Coaching" },
  },
  "zh-Hans": {
    greeting: "你好 Syahmi，我填写了 SYAHMIAOF Studio 的表单。",
    name: "姓名", contact: "电邮 / WhatsApp", service: "服务", package: "配套 / 估价",
    addons: "附加功能", maintenance: "维护服务", coaching: "辅导课程",
    project: "项目参考", message: "项目需求", closing: "我们可以讨论下一步吗？",
    services: { "website-ui": "网站界面", "full-stack": "全栈系统", coaching: "一对一辅导" },
  },
} satisfies Record<Locale, {
  greeting: string; name: string; contact: string; service: string; package: string;
  addons: string; maintenance: string; coaching: string; project: string;
  message: string; closing: string; services: Record<ServiceCategory, string>;
}>;

export function buildInquiryWhatsAppMessage(input: InquiryWhatsAppInput): string {
  const copy = labels[input.locale];
  const detail = [
    input.packageDetail?.trim() ? `${copy.package}: ${input.packageDetail.trim()}` : "",
    input.addons?.length ? `${copy.addons}: ${input.addons.join(", ")}` : "",
    input.maintenance?.trim() ? `${copy.maintenance}: ${input.maintenance.trim()}` : "",
    input.coaching?.trim() ? `${copy.coaching}: ${input.coaching.trim()}` : "",
    input.project?.trim() ? `${copy.project}: ${input.project.trim()}` : "",
  ].filter(Boolean);

  return [
    copy.greeting,
    "",
    `${copy.name}: ${input.name.trim()}`,
    `${copy.contact}: ${input.contact.trim()}`,
    `${copy.service}: ${copy.services[input.service]}`,
    ...detail,
    "",
    `${copy.message}:`,
    input.message.trim(),
    "",
    copy.closing,
  ].join("\n");
}
