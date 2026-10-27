"use client";

import { localized, localizedPriceLabel } from "@/lib/localized";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight, MessageCircle, Send, X } from "lucide-react";
import { MibotRobot } from "@/components/assistant/MibotRobot";
import { answerFaq } from "@/lib/assistant/faq";
import { buildLeadSummary, buildWhatsAppUrl, getLeadPackages, type LeadPackage, type LeadService } from "@/lib/assistant/lead";
import { COACHING_PACKAGES } from "@/content/coaching";
import { MAINTENANCE_OPTIONS, PRICING_PACKAGES, SYSTEM_OFFERS } from "@/lib/pricing/calculator";
import type { Locale } from "@/lib/types";

type ChatMessage = { id: number; role: "assistant" | "user"; content: string; handoff?: boolean };
type LeadFlow =
  | { step: "service" }
  | { step: "package"; service: LeadService }
  | { step: "details"; service: LeadService; selected?: LeadPackage }
  | { step: "review"; summary: string; service: LeadService; selected?: LeadPackage };

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "60107965236").replace(/\D/g, "");

function greeting(locale: Locale): string {
  return locale === "ms" ? "Hai! 👋 Saya MIBOT, pembantu maya anda. Nak semak harga website, pilih pakej atau bincang projek?"
    : locale === "zh-Hans" ? "你好！👋 我是 MIBOT，你的虚拟助手。想了解网站配套、价格，还是讨论你的项目？"
    : "Hi! 👋 I'm MIBOT, your virtual assistant. Need help choosing a website package, checking prices or discussing your project?";
}

const POPUP_MESSAGES: Record<Locale, string[]> = {
  ms: [
    "Hai! 👋 Nak tanya apa-apa? Saya boleh bantu.",
    "Nak semak anggaran bajet atau pakej website? 💰",
    "Tertarik dengan projek macam Lamborghini & Uber Pokmi? 🚀",
    "Berminat coaching 1-on-1 Web Dev dengan Syahmi? 👨‍💻",
    "Perlukan sebut harga pantas dalam 5 minit? 📲",
    "Website bisnes kau slow atau nampak lama? ⚡ MIBOT sedia tolong!",
  ],
  en: [
    "Hi! 👋 Need any help? I'm here for you.",
    "Want to check website packages or budget estimates? 💰",
    "Curious about projects like Lamborghini & Uber Pokmi? 🚀",
    "Looking for 1-on-1 coaching on Web Dev with Syahmi? 👨‍💻",
    "Need a quick project quote in under 5 minutes? 📲",
    "Is your website feeling slow or outdated? ⚡",
  ],
  "zh-Hans": [
    "嗨! 👋 有任何疑问吗？我随时可以协助你。",
    "想了解网站开发配套或预算报价吗？💰",
    "对兰博基尼或 Uber Pokmi 等项目感兴趣？🚀",
    "想与 Syahmi 进行 Web 开发 1 对 1 指导？👨‍💻",
    "需要 5 分钟内快速获取项目报价方案吗？📲",
    "网站加载慢或设计过时？⚡ MIBOT 帮你免费评估！",
  ],
};


function quickPricing(locale: Locale): string {
  const website = PRICING_PACKAGES.map((item) => localized(item.name, locale) + " " + item.priceDisplay).join(" · ");
  const systems = SYSTEM_OFFERS.map((item) => localized(item.name, locale) + " " + localizedPriceLabel(item.priceDisplay, locale)).join(" · ");
  const maintenance = MAINTENANCE_OPTIONS.filter((item) => item.id === "website-care" || item.id === "system-care")
    .map((item) => localized(item.name, locale) + " " + localized(item.priceDisplay, locale)).join(" · ");
  return locale === "ms"
    ? "Harga sekali bayar: " + website + ". Sistem: " + systems + ".\n\nPenjagaan bulanan pilihan (asing daripada harga projek): " + maintenance + ". Domain dan hosting berasingan."
    : locale === "zh-Hans" ? `网站一次性费用：${website}。系统：${systems}。\n\n可选月度维护（与项目费用分开）：${maintenance}。域名与托管另计。`
    : "One-time website pricing: " + website + ". Systems: " + systems + ".\n\nOptional monthly care (separate from project pricing): " + maintenance + ". Domain and hosting are separate.";
}

function quickSystem(locale: Locale): string {
  return SYSTEM_OFFERS.map((item) => localized(item.name, locale) + " — " + localizedPriceLabel(item.priceDisplay, locale) + ". " + localized(item.scopeSummary, locale)).join("\n\n");
}

function quickCoaching(locale: Locale): string {
  const lines = COACHING_PACKAGES.map((item) => (localized(item.name, locale) ?? item.name.en) + " — RM" + item.price + " / " + (item.durationMinutes === 60 ? (locale === "ms" ? "1 jam" : locale === "zh-Hans" ? "1 小时" : "1 hour") : (locale === "ms" ? "2 jam" : locale === "zh-Hans" ? "2 小时" : "2 hours")));
  return locale === "ms" ? lines.join("\n") + "\n\nSlot coaching disahkan manual selepas pertanyaan." : locale === "zh-Hans" ? lines.join("\n") + "\n\n辅导时段将在收到咨询后人工确认。" : lines.join("\n") + "\n\nCoaching availability is confirmed manually after an enquiry.";
}

export function ChatbotWidget({ locale }: { locale: Locale }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [{ id: 1, role: "assistant", content: greeting(locale) }]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [llmEnabled, setLlmEnabled] = useState(false);
    const [lead, setLead] = useState<LeadFlow | null>(null);
  const [requirements, setRequirements] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [maintenance, setMaintenance] = useState("none");
  const [editableSummary, setEditableSummary] = useState("");
  const [notice, setNotice] = useState("");
  const [bubble, setBubble] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
    const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelId = uid + "-panel";
  const titleId = uid + "-title";
  const isEnglish = locale === "en";
  const isChinese = locale === "zh-Hans";
  const packageOptions = useMemo(() => lead?.step === "package" ? getLeadPackages(lead.service, locale) : [], [lead, locale]);
  const labels = {
    title: "MIBOT",
    disclosure: "VIRTUAL ASSISTANT",
    online: isEnglish ? "ONLINE" : isChinese ? "在线" : "AKTIF",
    placeholder: isEnglish ? "Ask about services or pricing…" : isChinese ? "询问服务或价格……" : "Tanya tentang servis atau harga…",
    send: isEnglish ? "Send message" : isChinese ? "发送消息" : "Hantar mesej",
    close: isEnglish ? "Close MIBOT" : isChinese ? "关闭 MIBOT" : "Tutup MIBOT",
    chips: isEnglish ? ["Website Pricing", "Full-Stack System", "1:1 Coaching", "Start a Project"] : isChinese ? ["网站价格", "全栈系统", "一对一辅导", "开始项目"] : ["Harga Website", "Sistem Full-Stack", "Coaching 1:1", "Bincang Projek"],
    fallback: isEnglish ? "I couldn't match that to an approved FAQ. I won't guess. You can rephrase it or prepare a short WhatsApp enquiry." : isChinese ? "这个问题不在已确认的常见问题中，我不会猜测答案。你可以换个说法，或准备 WhatsApp 咨询。" : "Soalan ini tak sepadan dengan FAQ yang disahkan. Aku tak akan teka jawapan. Cuba ayat lain atau sediakan ringkasan pertanyaan WhatsApp.",
    handoff: isEnglish ? "Prepare WhatsApp summary" : isChinese ? "准备 WhatsApp 摘要" : "Sediakan ringkasan WhatsApp",
    whatsApp: isEnglish ? "Continue in WhatsApp" : isChinese ? "继续使用 WhatsApp" : "Sambung melalui WhatsApp",
    leadLabel: isEnglish ? "PROJECT BRIEF" : isChinese ? "项目简介" : "RINGKASAN PROJEK",
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem("mibot-greeting-dismissed")) return;
    } catch {
      return;
    }

    if (open) {
      setBubble(false);
      return;
    }

    let timer: number;
    if (bubble) {
      // Stay visible for 5 seconds, then hide
      timer = window.setTimeout(() => {
        setBubble(false);
      }, 5000);
    } else {
      // Stay hidden for 3 seconds gap, then show next popup message
      timer = window.setTimeout(() => {
        setBubbleIndex((prev) => (prev + 1) % (POPUP_MESSAGES[locale]?.length || 1));
        setBubble(true);
      }, 3000);
    }

    return () => window.clearTimeout(timer);
  }, [bubble, open, locale]);

  useEffect(() => {
    setMessages([{ id: Date.now(), role: "assistant", content: greeting(locale) }]);
    setLead(null);
    setEditableSummary("");
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    let active = true;
    void fetch("/api/assistant", { cache: "no-store" }).then((response) => response.json())
      .then((config: { enabled?: boolean }) => { if (active) setLlmEnabled(config.enabled === true); })
      .catch(() => { if (active) setLlmEnabled(false); });
    const frame = requestAnimationFrame(() => {
      closeRef.current?.focus();
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
    });
    return () => { active = false; cancelAnimationFrame(frame); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" }));
    return () => cancelAnimationFrame(frame);
  }, [messages, lead, open]);

  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const updateViewport = () => {
      const height = viewport?.height ?? window.innerHeight;
      const top = viewport?.offsetTop ?? 0;
      document.documentElement.style.setProperty("--assistant-vv-height", height + "px");
      document.documentElement.style.setProperty("--assistant-vv-top", top + "px");
    };
    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      document.documentElement.style.removeProperty("--assistant-vv-height");
      document.documentElement.style.removeProperty("--assistant-vv-top");
    };
  }, [open]);

  function closePanel() {
    setOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closePanel(); return; }
      if (event.key !== "Tab") return;
      const panel = document.getElementById(panelId);
      const focusables = panel?.querySelectorAll<HTMLElement>("button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]");
      if (!focusables?.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, panelId]);

  function beginLead() {
    setNotice("");
    setLead({ step: "service" });
    setRequirements(""); setTimeline(""); setBudget(""); setMaintenance("none"); setEditableSummary("");
  }

  function addMessage(role: ChatMessage["role"], content: string, handoff = false) {
    setMessages((current) => [...current, { id: Date.now() + Math.random(), role, content, handoff }]);
  }

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const text = input.trim().slice(0, 1200);
    if (!text || pending) return;
    setInput(""); setNotice(""); addMessage("user", text);
    const match = answerFaq(text, locale);
    if (match) { addMessage("assistant", match.answer); return; }
    if (!llmEnabled) { addMessage("assistant", labels.fallback, true); return; }
        setPending(true);
    try {
      const history = messages.concat([{ id: Date.now(), role: "user" as const, content: text }])
        .filter((item) => item.role === "user" || item.content !== greeting(locale))
        .slice(-8).map(({ role, content }) => ({ role, content }));
      const response = await fetch("/api/assistant", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, consent: true, messages: history }),
      });
      const payload = await response.json() as { answer?: string; error?: string };
      if (response.ok && payload.answer) addMessage("assistant", payload.answer);
      else addMessage("assistant", labels.fallback, true);
    } catch {
      addMessage("assistant", labels.fallback, true);
    } finally { setPending(false); }
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(); }
  }

  function onQuickAction(index: number) {
    const label = labels.chips[index]; addMessage("user", label);
    if (index === 0) addMessage("assistant", quickPricing(locale));
    if (index === 1) addMessage("assistant", quickSystem(locale));
    if (index === 2) addMessage("assistant", quickCoaching(locale));
    if (index === 3) {
      addMessage("assistant", isEnglish ? "I'll help you prepare a short project brief. Share only what you're comfortable sharing." : isChinese ? "我会协助你准备简短的项目简介。只需分享你愿意提供的内容。" : "Aku bantu sediakan ringkasan projek. Kongsi maklumat yang kau selesa sahaja.");
      beginLead();
    }
  }

  function choosePackage(selected?: LeadPackage) {
    if (lead?.step !== "package") return;
    setLead({ step: "details", service: lead.service, selected });
  }

  function reviewLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lead?.step !== "details") return;
    let summary = buildLeadSummary({ locale, service: lead.service, package: lead.selected, requirements, timeline, budget });
    const care = MAINTENANCE_OPTIONS.find((item) => item.id === maintenance && item.id !== "none");
    if (care) {
      const handoff = isEnglish ? "Could we discuss this further?" : isChinese ? "我们可以进一步讨论吗？" : "Boleh kita bincang lanjut?";
      summary = summary.replace(handoff, (isEnglish ? "Maintenance" : isChinese ? "维护服务" : "Penjagaan") + ": " + localized(care.name, locale) + " — " + localized(care.priceDisplay, locale) + "\n\n" + handoff);
    }
    setEditableSummary(summary);
    setLead({ step: "review", summary, service: lead.service, selected: lead.selected });
  }

  function openWhatsApp() {
    try {
      const url = buildWhatsAppUrl(whatsappNumber, editableSummary);
      window.open(url, "_blank", "noopener,noreferrer");
      setNotice(isEnglish ? "WhatsApp opened. The message is still yours to review and send." : isChinese ? "WhatsApp 已打开。请自行检查并发送消息。" : "WhatsApp dibuka. Mesej masih perlu kau semak dan hantar sendiri.");
    } catch {
      setNotice(isEnglish ? "WhatsApp is not configured on this build." : isChinese ? "此版本尚未配置 WhatsApp。" : "WhatsApp belum dikonfigurasi untuk build ini.");
    }
  }

  return (
    <div className="assistant-widget">
      {open && <div className="assistant-scrim" aria-hidden="true" />}
      {open && (
        <section id={panelId} className="assistant-panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <header className="assistant-header">
            <span className="assistant-mark"><MibotRobot label="MIBOT" /></span>
            <div className="assistant-branding"><h2 id={titleId}>{labels.title}</h2><span>{labels.disclosure}</span></div>
            <span className="assistant-state"><i aria-hidden="true" />{labels.online}</span>
            <button className="assistant-close" ref={closeRef} type="button" onClick={closePanel} aria-label={labels.close}><X size={22} /></button>
          </header>
          <div className="assistant-transcript" ref={bodyRef} aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <div className={"assistant-message assistant-message-" + message.role} key={message.id}>
                <p>{message.content}</p>
                {message.handoff && <button type="button" className="assistant-inline-action" onClick={beginLead}>{labels.handoff}<ArrowRight size={16} /></button>}
              </div>
            ))}
            {messages.length === 1 && !lead && (
              <div className="assistant-quick-actions" aria-label={isEnglish ? "Suggested questions" : isChinese ? "推荐问题" : "Soalan cadangan"}>
                {labels.chips.map((label, index) => <button key={label} type="button" onClick={() => onQuickAction(index)}>{label}<ArrowRight size={14} /></button>)}
              </div>
            )}
            {pending && <p className="assistant-typing" role="status">{isEnglish ? "Checking the approved information…" : isChinese ? "正在检查已确认的信息……" : "Semak maklumat yang diluluskan…"}</p>}
            {lead?.step === "service" && (
              <div className="assistant-lead-step">
                <p>{isEnglish ? "01 / Which service are you looking for?" : isChinese ? "01 / 你正在寻找哪项服务？" : "01 / Servis apa yang kau cari?"}</p>
                <div className="assistant-choice-list">
                  {(["website", "system", "coaching"] as LeadService[]).map((service) => <button type="button" key={service} onClick={() => setLead({ step: "package", service })}>{service === "website" ? (isChinese ? "网站" : "Website") : service === "system" ? (isEnglish ? "Full-Stack system" : isChinese ? "全栈系统" : "Sistem Full-Stack") : (isEnglish ? "1:1 coaching" : isChinese ? "一对一辅导" : "Coaching 1:1")}<ArrowRight size={16} /></button>)}
                </div>
              </div>
            )}
            {lead?.step === "package" && (
              <div className="assistant-lead-step">
                <p>{isEnglish ? "02 / Choose a package or skip this step." : isChinese ? "02 / 选择配套，或跳过此步骤。" : "02 / Pilih pakej atau langkau dahulu."}</p>
                <div className="assistant-choice-list">
                  {packageOptions.map((item) => <button type="button" key={item.id} onClick={() => choosePackage(item)}><span>{item.label}<small>{item.price}</small></span><ArrowRight size={16} /></button>)}
                  <button type="button" onClick={() => choosePackage()}>{isEnglish ? "Not sure yet / custom quote" : isChinese ? "尚未确定 / 定制报价" : "Belum pasti / sebut harga khas"}<ArrowRight size={16} /></button>
                </div>
              </div>
            )}
            {lead?.step === "details" && (
              <form className="assistant-lead-step assistant-lead-form" onSubmit={reviewLead}>
                <p>{isEnglish ? "03 / Add only the details you want to share." : isChinese ? "03 / 仅填写你愿意分享的信息。" : "03 / Isi maklumat yang kau selesa kongsi sahaja."}</p>
                <label htmlFor={uid + "-requirements"}>{isEnglish ? "Project needs (optional)" : isChinese ? "项目需求（选填）" : "Keperluan projek (pilihan)"}</label>
                <textarea id={uid + "-requirements"} maxLength={600} rows={3} value={requirements} onChange={(event) => setRequirements(event.target.value)} placeholder={isEnglish ? "Business, page count or essential features" : isChinese ? "业务、页面数量或必要功能" : "Bisnes, bilangan halaman atau fungsi penting"} />
                <div className="assistant-optional-grid">
                  <label>{isEnglish ? "Timeline (optional)" : isChinese ? "期望时间（选填）" : "Timeline (pilihan)"}<input maxLength={80} value={timeline} onChange={(event) => setTimeline(event.target.value)} /></label>
                  <label>{isEnglish ? "Budget range (optional)" : isChinese ? "预算范围（选填）" : "Julat bajet (pilihan)"}<input maxLength={80} value={budget} onChange={(event) => setBudget(event.target.value)} /></label>
                </div>
                <label htmlFor={uid + "-maintenance"}>{isEnglish ? "Maintenance (optional)" : isChinese ? "维护服务（选填）" : "Penjagaan (pilihan)"}</label>
                <select id={uid + "-maintenance"} value={maintenance} onChange={(event) => setMaintenance(event.target.value)}>
                  <option value="none">{isEnglish ? "No selection" : isChinese ? "不选择" : "Tiada pilihan"}</option>
                  {MAINTENANCE_OPTIONS.filter((item) => item.id !== "none").map((item) => <option key={item.id} value={item.id}>{localized(item.name, locale)} — {localized(item.priceDisplay, locale)}</option>)}
                </select>
                <button className="assistant-primary-action" type="submit">{isEnglish ? "Review summary" : isChinese ? "检查摘要" : "Semak ringkasan"}<ArrowRight size={17} /></button>
              </form>
            )}
            {lead?.step === "review" && (
              <div className="assistant-lead-step assistant-summary-step">
                <label htmlFor={uid + "-summary"}>{labels.leadLabel} · {isEnglish ? "EDIT OR REMOVE ANY LINE" : isChinese ? "可编辑或删除任意内容" : "EDIT ATAU BUANG MANA-MANA BARIS"}</label>
                <textarea id={uid + "-summary"} rows={9} maxLength={1400} value={editableSummary} onChange={(event) => { setEditableSummary(event.target.value); if (lead?.step === "review") setLead({ step: "review", summary: event.target.value, service: lead.service, selected: lead.selected }); }} />
                <p>{isEnglish ? "Nothing is sent until you review and press send in WhatsApp." : isChinese ? "你检查并在 WhatsApp 按下发送前，不会发送任何内容。" : "Tiada mesej dihantar sehingga kau semak dan tekan hantar dalam WhatsApp."}</p>
                <button className="assistant-whatsapp-action" type="button" onClick={openWhatsApp}><MessageCircle size={18} />{labels.whatsApp}<ArrowRight size={17} /></button>
                <button type="button" className="assistant-back-action" onClick={() => { if (lead?.step === "review") setLead({ step: "details", service: lead.service, selected: lead.selected }); }}>{isEnglish ? "Edit project details" : isChinese ? "编辑项目资料" : "Edit butiran projek"}</button>
              </div>
            )}
            {notice && <p className="assistant-notice" role="status">{notice}</p>}
          </div>
                    <footer className="assistant-composer-wrap">
            <form className="assistant-composer" onSubmit={sendMessage}>
              <textarea value={input} maxLength={1200} rows={1} onChange={(event) => setInput(event.target.value)} onKeyDown={onComposerKeyDown} placeholder={labels.placeholder} aria-label={isEnglish ? "Your question" : isChinese ? "你的问题" : "Soalan anda"} />
              <button className="assistant-send" type="submit" disabled={!input.trim() || pending} aria-label={labels.send}><Send size={20} /></button>
            </form>
            <p>{isEnglish ? "FAQ mode · No chat history is saved." : isChinese ? "FAQ 模式 · 不会保存聊天记录。" : "Mod FAQ · Sejarah chat tidak disimpan."}</p>
          </footer>
        </section>
      )}
      {!open && bubble && (
        <div className="mibot-greeting" role="region" aria-label="MIBOT greeting">
          <button
            className="mibot-greeting-open"
            type="button"
            aria-label={isEnglish ? "Open MIBOT from greeting" : isChinese ? "通过问候打开 MIBOT" : "Buka MIBOT daripada ucapan"}
            onClick={() => { setBubble(false); setOpen(true); }}
          >
            <span className="mibot-greeting-text">
              {POPUP_MESSAGES[locale]?.[bubbleIndex] || POPUP_MESSAGES.ms[0]}
            </span>
            <div className="mibot-greeting-dots" aria-hidden="true">
              {(POPUP_MESSAGES[locale] || POPUP_MESSAGES.ms).map((_, idx) => (
                <span
                  key={idx}
                  className={"mibot-greeting-dot" + (idx === bubbleIndex ? " is-active" : "")}
                />
              ))}
            </div>
          </button>
          <button
            className="mibot-greeting-dismiss"
            type="button"
            aria-label={isEnglish ? "Dismiss greeting" : isChinese ? "关闭问候" : "Tutup ucapan"}
            onClick={() => {
              setBubble(false);
              try { sessionStorage.setItem("mibot-greeting-dismissed", "1"); } catch {}
            }}
          >
            ×
          </button>
        </div>
      )}
      <button ref={launcherRef} type="button" className={"assistant-launcher" + (open ? " is-open" : "")} onClick={() => { setBubble(false); if (open) closePanel(); else setOpen(true); }} aria-expanded={open} aria-controls={panelId} aria-label={open ? labels.close : (isEnglish ? "Open MIBOT" : isChinese ? "打开 MIBOT" : "Buka MIBOT")}>
        {open ? <X size={23} /> : <MibotRobot label="MIBOT" />}
      </button>
    </div>
  );
}
