"use client";
import { localized, localizedPriceLabel } from "@/lib/localized";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Monitor,
  Database,
  UserRound,
} from "lucide-react";
import type { Locale, ServiceCategory } from "@/lib/types";
import { validateInquiry } from "@/lib/validation/inquiry";
import {
  calculateFrontendEstimate,
  formatMYR,
  getMaintenanceOptionById,
  getPackageById,
  getSystemOfferById,
  normalizeFrontendAddonIds,
  PRICING_ADDONS,
} from "@/lib/pricing/calculator";
import { COACHING_PACKAGES } from "@/content/coaching";
import { PROJECTS, PROJECT_STATUS_LABELS } from "@/content/projects";
import {
  StudioPage,
  DisplayTitle,
  SceneLabel,
  Architecture,
  copy,
} from "@/components/scene/StudioScene";
const services = ["website-ui", "full-stack", "coaching"] as const;
function ContactForm({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const params = useSearchParams(),
    c = (ms: string, en: string) => copy(locale, ms, en);
  const paramService = params.get("service");
  const initialService = services.includes(paramService as ServiceCategory)
    ? (paramService as ServiceCategory)
    : "website-ui";
  const [service, setService] = useState<ServiceCategory>(initialService);
  const [name, setName] = useState(""),
    [contact, setContact] = useState(""),
    [message, setMessage] = useState(""),
    [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({}),
    [busy, setBusy] = useState(false),
    [fallback, setFallback] = useState(""),
    [notice, setNotice] = useState("");
  useEffect(() => {
    setService(initialService);
  }, [initialService]);
  const packageId = params.get("package") || "";
  const pkg = getPackageById(packageId);
  const systemOffer = getSystemOfferById(packageId);
  const addons = normalizeFrontendAddonIds((params.get("addons") || "").split(","));
  const quoteActive = service === "website-ui" && !!pkg;
  const systemOfferActive = service === "full-stack" && !!systemOffer;
  const total = quoteActive ? calculateFrontendEstimate(pkg!.id, addons).total : undefined;
  const maintenanceId = params.get("maintenance") || "none";
  const maintenance = getMaintenanceOptionById(maintenanceId);
  const maintenanceActive = service !== "coaching" && !!maintenance && maintenance.id !== "none";
  const coachingPackage = service === "coaching"
    ? COACHING_PACKAGES.find((item) => item.id === params.get("coachingPackage"))
    : undefined;
  const project = PROJECTS.find((item) => item.slug === params.get("project"));
  const contextText = [
    quoteActive ? localized(pkg!.name, locale) + " — " + formatMYR(total!) + c(" (sekali bayar)", " (one-time)") : "",
    systemOfferActive ? localized(systemOffer!.name, locale) + " — " + localizedPriceLabel(systemOffer!.priceDisplay, locale) : "",
    quoteActive
      ? addons
          .map((id) => localized(PRICING_ADDONS.find((a) => a.id === id)!.name, locale))
          .join(", ")
      : "",
    maintenanceActive ? localized(maintenance!.name, locale) + " — " + localized(maintenance!.priceDisplay, locale) : "",
    coachingPackage ? localized(coachingPackage.name, locale) + " / " + (coachingPackage.durationMinutes / 60) + c(" jam — RM", " hours — RM") + coachingPackage.price : "",
    project ? c("Rujukan projek: ", "Project reference: ") + project.title : "",
  ]
    .filter(Boolean)
    .join("\n");
  const body = [
    c("Nama: ", "Name: ") + name,
    c("Hubungi: ", "Contact: ") + contact,
    c("Servis: ", "Service: ") + service,
    contextText,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");
  const whatsappBody = [
    c("Pertanyaan SYAHMIAOF Studio", "SYAHMIAOF Studio enquiry"),
    c("Servis: ", "Service: ") + service,
    contextText,
    c("Saya ingin bertanya tentang slot dan langkah seterusnya.", "I would like to ask about availability and next steps."),
  ].filter(Boolean).join("\n");
  const mailto =
    "mailto:hello@syahmiaof.my?subject=" +
    encodeURIComponent(c("Pertanyaan Studio: ", "Studio Inquiry: ") + name) +
    "&body=" +
    encodeURIComponent(body);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "60107965236").replace(
    /[+\s-]/g,
    "",
  );
  const whatsappReady = /^[1-9]\d{7,14}$/.test(number);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFallback("");
    setNotice("");
    const payload = {
      service,
      name,
      contact,
      message,
      honeypot,
      locale,
      packageId: quoteActive ? pkg!.id : systemOfferActive ? systemOffer!.id : undefined,
      addons: quoteActive ? addons : undefined,
      estimatedTotal: total,
      coachingTopic: coachingPackage?.id,
      coachingPackageId: coachingPackage?.id,
      coachingDuration: coachingPackage
        ? String(coachingPackage.durationMinutes) as "60" | "120"
        : undefined,
      maintenanceId: maintenanceActive ? maintenance!.id : undefined,
    };
    const validation = validateInquiry(payload);
    if (!validation.success) {
      const next: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const key = String(issue.path[0]);
        next[key] =
          locale === "ms"
            ? issue.message
            : {
                name: locale === "zh-Hans" ? "请输入 2 至 100 个字符的姓名。" : "Enter a name with 2–100 characters.",
                contact: locale === "zh-Hans" ? "请输入有效的电子邮件或 WhatsApp 号码。" : "Enter a valid email or WhatsApp number.",
                message: locale === "zh-Hans" ? "请填写 10 至 2,000 个字符的项目简介。" : "Write a brief with 10–2,000 characters.",
              }[key] || (locale === "zh-Hans" ? "请检查此栏位。" : "Check this field.");
      }
      setErrors(next);
      document.getElementById("inquiry-" + Object.keys(next)[0])?.focus();
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok && result.success === true) {
        setNotice(c("Pertanyaan berjaya dihantar.", "Inquiry delivered."));
      } else {
        setNotice(
          c(
            "Pertanyaan belum dihantar. Buka aplikasi emel untuk menghantarnya kepada kami.",
            "Your inquiry has not been sent. Open your email app to send it to us.",
          ),
        );
        setFallback(mailto);
      }
    } catch {
      setNotice(
        c(
          "Sambungan gagal. Anda masih boleh teruskan melalui emel.",
          "Connection failed. You can still continue by email.",
        ),
      );
      setFallback(mailto);
    } finally {
      setBusy(false);
    }
  };
  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene contact-scene" id="hubungi">
        <Architecture variant="contact" word="07" priority={!embedded} />
        <div className="contact-copy">
          <SceneLabel number="07">{c("HUBUNGI", "CONTACT")}</SceneLabel>
          <DisplayTitle
            level={2}
            lines={locale === "ms" ? ["IDEA KAU.", "KITA BINA."] : locale === "zh-Hans" ? ["你的想法。", "我们来实现。"] : ["YOUR IDEA.", "LET’S BUILD."]}
          />
          <p className="scene-intro">
            {c(
              "Ceritakan projek anda. Saya bantu jadikan ia realiti.",
              "Tell me about your project. Let’s bring it to life.",
            )}
          </p>
          <div className="contact-channels scene-actions">
            {whatsappReady ? (
              <a
                className="whatsapp-link"
                href={
                  "https://wa.me/" +
                  number +
                  "?text=" +
                  encodeURIComponent(whatsappBody)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                {c("Chat WhatsApp", "Chat WhatsApp")}
                <ArrowRight />
              </a>
            ) : (
              <div>
                <button className="whatsapp-link" disabled>
                  <MessageCircle />
                  {c("Chat WhatsApp", "Chat WhatsApp")}
                  <ArrowRight />
                </button>
                <small>
                  {c(
                    "Nombor belum ditetapkan. Hubungi melalui emel.",
                    "Number not configured. Please use email.",
                  )}
                </small>
              </div>
            )}
            <a className="email-channel" href="mailto:hello@syahmiaof.my">
              <Mail size={20} />
              hello@syahmiaof.my
            </a>
          </div>
        </div>
        <div className="console contact-console">
          <h2>
            {c("MULA", "START")} <span>{c("PROJEK ANDA", "YOUR PROJECT")}</span>
          </h2>
          {quoteActive && (
            <div className="handoff-summary" data-testid="quote-summary">
              <strong>{localized(pkg!.name, locale)}</strong>
              <span>{c("Anggaran sekali bayar: ", "One-time estimate: ")}{formatMYR(total!)}</span>
              {addons.length > 0 && (
                <small>
                  {addons
                    .map(
                      (id) =>
                        localized(PRICING_ADDONS.find((a) => a.id === id)!.name, locale),
                    )
                    .join(" · ")}
                </small>
              )}
            </div>
          )}
          {systemOfferActive && (
            <div className="handoff-summary" data-testid="system-summary">
              <strong>{localized(systemOffer!.name, locale)}</strong>
              <span>{localizedPriceLabel(systemOffer!.priceDisplay, locale)}</span>
              <small>{localized(systemOffer!.scopeSummary, locale)}</small>
            </div>
          )}
          {maintenanceActive && (
            <div className="handoff-summary" data-testid="maintenance-summary">
              <strong>{localized(maintenance!.name, locale)}</strong>
              <span>{localized(maintenance!.priceDisplay, locale)}</span>
              <small>{maintenance!.cadence === "monthly" ? c("Caj berulang bulanan; berasingan daripada jumlah sekali bayar.", "Recurring monthly charge; separate from the one-time total.") : c("Caj ikut tugasan; berasingan daripada jumlah sekali bayar.", "Per-task charge; separate from the one-time total.")}</small>
            </div>
          )}
          {coachingPackage && (
            <div className="handoff-summary" data-testid="coaching-summary">
              <strong>{localized(coachingPackage.name, locale)}</strong>
              <span>RM{coachingPackage.price} · {coachingPackage.durationMinutes / 60} {c("jam", "hours")}</span>
            </div>
          )}
          {project && (
            <div className="handoff-summary" data-testid="project-summary">
              <strong>{c("Rujukan projek", "Project reference")}</strong>
              <span>{project.title}</span>
              <small>{PROJECT_STATUS_LABELS[locale][project.status]}</small>
            </div>
          )}
          <form onSubmit={submit} noValidate>
            <input
              name="website_pot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />
            <p className="form-note">
              {c(
                "Butiran ini digunakan untuk memahami dan membalas pertanyaan anda. Jangan sertakan kata laluan atau maklumat sulit.",
                "These details help us understand and respond to your enquiry. Do not include passwords or sensitive information.",
              )}
            </p>
            <fieldset>
              <legend>1. {c("SERVIS DIPERLUKAN", "SERVICE REQUIRED")}</legend>
              <div className="contact-services">
                {services.map((value, i) => {
                  const Icon = [Monitor, Database, UserRound][i];
                  return (
                    <label
                      key={value}
                      className={
                        "choice-option " + (service === value ? "selected" : "")
                      }
                    >
                      <input
                        type="radio"
                        name="service"
                        value={value}
                        checked={service === value}
                        onChange={() => setService(value)}
                      />
                      <Icon size={18} />
                      <span>
                        {
                          [
                            locale === "zh-Hans" ? "网站界面" : "Website UI",
                            c("Sistem Lengkap", "Full-Stack"),
                            locale === "zh-Hans" ? "一对一辅导" : "Coaching 1:1",
                          ][i]
                        }
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="form-field">
              <label htmlFor="inquiry-name">2. {c("NAMA", "NAME")}</label>
              <input
                id="inquiry-name"
                name="name"
                autoComplete="name"
                maxLength={100}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={c("Contoh: Ali bin Ahmad", "Your full name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "error-name" : undefined}
              />
              {errors.name && (
                <p className="field-error" id="error-name">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="inquiry-contact">
                3. {c("EMEL / WHATSAPP", "EMAIL / WHATSAPP")}
              </label>
              <input
                id="inquiry-contact"
                name="contact"
                autoComplete="email"
                maxLength={254}
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="ali@email.com / 012-345 6789"
                aria-invalid={!!errors.contact}
                aria-describedby={errors.contact ? "error-contact" : undefined}
              />
              {errors.contact && (
                <p className="field-error" id="error-contact">
                  {errors.contact}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="inquiry-message">
                4. {c("CERITAKAN IDEA ANDA", "TELL ME YOUR IDEA")}
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={3}
                maxLength={2000}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={c(
                  "Apa yang anda nak bina? Ceritakan matlamat dan skop projek.",
                  "What would you like to build? Share your goals and project scope.",
                )}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "error-message" : undefined}
              />
              {errors.message && (
                <p className="field-error" id="error-message">
                  {errors.message}
                </p>
              )}
            </div>
            <button className="studio-button" type="submit" disabled={busy}>
              {busy
                ? c("Menyemak…", "Checking…")
                : c("Sediakan Pertanyaan", "Prepare Inquiry")}
              <ArrowRight />
            </button>
            <p className="form-note">
              {c(
                "Penghantaran terus belum diaktifkan. Semak butiran dan teruskan melalui aplikasi emel anda.",
                "Direct delivery is not enabled. Check your details and continue through your email app.",
              )}
            </p>
            <div aria-live="polite">
              {notice && <p className="form-notice">{notice}</p>}
              {fallback && (
                <a className="studio-button button-secondary" href={fallback}>
                  <Mail />
                  {c("Buka Emel untuk Hantar", "Open Email to Send")}
                </a>
              )}
            </div>
          </form>
        </div>
      </section>
    </StudioPage>
  );
}
export function ContactView({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  return (
    <Suspense
      fallback={
        <div className="route-loading">
          {locale === "ms" ? "Memuatkan borang…" : "Loading form…"}
        </div>
      }
    >
      <ContactForm locale={locale} embedded={embedded} />
    </Suspense>
  );
}
