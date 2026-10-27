"use client";
import { localized, localizedPriceLabel } from "@/lib/localized";
import { Monitor, Database } from "lucide-react";
import type { Locale } from "@/lib/types";
import { SERVICES_DATA } from "@/content/services";
import {
  MAINTENANCE_OPTIONS,
  PRICING_PACKAGES,
  SYSTEM_OFFERS,
  formatMYR,
} from "@/lib/pricing/calculator";
import {
  StudioPage,
  DisplayTitle,
  SceneLabel,
  ActionLink,
  Architecture,
  copy,
  sectionPath,
} from "@/components/scene/StudioScene";
export function ServicesView({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const c = (ms: string, en: string) => copy(locale, ms, en);
  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene scene-light services-scene" id="servis">
        <Architecture variant="services" priority={!embedded} />
        <div className="services-copy">
          <SceneLabel number="04">{c("SERVIS", "SERVICES")}</SceneLabel>
          <DisplayTitle
            level={2}
            lines={
              locale === "ms"
                ? ["BINA IDEA.", "LANCAR WEB."]
                : locale === "zh-Hans"
                  ? ["构思创意。", "发布网站。"]
                  : ["BUILD IDEAS.", "LAUNCH WEB."]
            }
          />
          <p className="scene-intro">
            {c(
              "Dari laman promosi ke sistem lengkap — dibina mengikut keperluan anda.",
              "From landing pages to complete systems — built around your needs.",
            )}
          </p>
          <div className="service-panels scene-actions">
            {[0, 1].map((i) => (
              <article
                className={"service-panel " + (i ? "service-blue" : "")}
                key={i}
              >
                <div className="service-panel-heading">
                  <div>
                    <span className="service-number">0{i + 1}/</span>
                    <h2>
                      {i
                        ? c("SISTEM TEMPAHAN", "BOOKING REQUEST")
                        : locale === "zh-Hans" ? "网站前端" : "WEBSITE FRONTEND"}
                    </h2>
                  </div>
                  {i ? <Database /> : <Monitor />}
                </div>
                <span>{i ? c("Harga", "Price") : c("Bermula", "From")}</span>
                <strong className="service-price">
                  {i
                    ? localizedPriceLabel(SYSTEM_OFFERS[0].priceDisplay, locale)
                    : formatMYR(PRICING_PACKAGES[0].basePrice)}
                </strong>
                <p>
                  {i
                    ? c("Satu servis · pengesahan manual", "One service · manual confirmation")
                    : c("Laman promosi · bisnes · premium", "Landing · business · premium websites")}
                </p>
                <ActionLink
                  href={i
                    ? sectionPath(locale, "hubungi", new URLSearchParams({ service: "full-stack", package: "booking-request" }))
                    : sectionPath(locale, "harga")}
                  blue={!!i}
                >
                  {i
                    ? c("Lihat Pilihan Sistem", "View System Options")
                    : c("Lihat Pakej", "View Packages")}
                </ActionLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="service-details">
        {SERVICES_DATA.map((service) => (
          <article key={service.id} id={service.id === "fullstack" ? "fullstack" : "frontend"} data-reveal>
            <h2>{localized(service.title, locale)}</h2>
            <p>{localized(service.description, locale)}</p>
            <h3>{c("Apa yang diserahkan", "What you receive")}</h3>
            <ul>
              {localized(service.deliverables, locale).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <details>
              <summary>{c("Skop & batasan", "Scope & boundaries")}</summary>
              <ul>
                {localized(service.boundaries, locale).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
            {service.id === "fullstack" && (
              <details>
                <summary>{c("Pilihan sistem dan harga", "System options and prices")}</summary>
                {SYSTEM_OFFERS.map((offer) => (
                  <div key={offer.id}>
                    <h3>{localized(offer.name, locale)} — {localizedPriceLabel(offer.priceDisplay, locale)}</h3>
                    <p>{localized(offer.scopeSummary, locale)}</p>
                    <ul>{localized(offer.deliverables, locale).map((item) => <li key={item}>{item}</li>)}</ul>
                    <ActionLink blue href={sectionPath(locale, "hubungi", new URLSearchParams({ service: "full-stack", package: offer.id }))}>
                      {c("Hubungi untuk Sebut Harga", "Contact for a Quote")}
                    </ActionLink>
                  </div>
                ))}
              </details>
            )}
            {service.id === "fullstack" && (
              <details>
                <summary>{c("Pelan penjagaan pilihan", "Optional maintenance plans")}</summary>
                {MAINTENANCE_OPTIONS.filter((option) => option.id !== "none").map((option) => (
                  <div key={option.id}>
                    <h3>{localized(option.name, locale)} — {localized(option.priceDisplay, locale)}</h3>
                    <p>{localized(option.description, locale)}</p>
                    <ul>{localized(option.includes, locale).map((item) => <li key={item}>{item}</li>)}</ul>
                    <p>{c("Tidak termasuk:", "Excludes:")} {localized(option.excludes, locale).join(" · ")}</p>
                    <ActionLink blue href={sectionPath(locale, "hubungi", new URLSearchParams({ service: "full-stack", maintenance: option.id }))}>
                      {c("Tanya Tentang Penjagaan", "Ask About Maintenance")}
                    </ActionLink>
                  </div>
                ))}
              </details>
            )}
          </article>
        ))}
        <article data-reveal>
          <h2>{c("Bayaran & serahan", "Payment & handover")}</h2>
          <ul>
            <li>{c("Deposit 50% sebelum pembangunan bermula; baki 50% sebelum serahan akhir.", "50% deposit before development starts; remaining 50% before final handover.")}</li>
            <li>{c("Dua pusingan revisi terkumpul. Revisi tambahan di luar skop dikenakan caj. Pembetulan kecacatan dalam skop yang dipersetujui tidak menggunakan pusingan revisi.", "Two consolidated revision rounds. Extra out-of-scope revisions are chargeable. Fixing an agreed-scope defect does not use a revision round.")}</li>
            <li>{c("Jaminan pembaikan pepijat 14 hari selepas serahan meliputi kecacatan yang boleh dihasilkan semula dalam deliverable dipersetujui. Ia tidak meliputi ciri baharu, reka bentuk semula, gangguan pihak luar atau perubahan pelanggan.", "The 14-day post-handover bug-fix warranty covers reproducible defects in agreed deliverables. It excludes new features, redesigns, external outages or client changes.")}</li>
            <li>{c("Deliverable akhir ditetapkan dalam sebut harga bertulis. Kerja tambahan perlukan kelulusan terdahulu. Domain, hosting dan langganan pihak ketiga berasingan.", "Final deliverables are defined in a written quote. Extra work requires prior approval. Domain, hosting and third-party subscriptions are separate.")}</li>
          </ul>
        </article>
      </section>
    </StudioPage>
  );
}
