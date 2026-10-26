"use client";
import { Suspense, useRef, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Globe, Play, Code2 } from "lucide-react";
import type { Locale } from "@/lib/types";
import {
  INCLUDED_FREEBIES,
  MAINTENANCE_OPTIONS,
  PRICING_ADDONS,
  PRICING_PACKAGES,
  SYSTEM_OFFERS,
  calculateFrontendEstimate,
  formatMYR,
  getMaintenanceOptionById,
  normalizeFrontendAddonIds,
} from "@/lib/pricing/calculator";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import { responsiveMotion } from "@/lib/motion/responsiveMotion";
import {
  StudioPage,
  DisplayTitle,
  SceneLabel,
  ActionLink,
  Architecture,
  copy,
  sectionPath,
} from "@/components/scene/StudioScene";

function Configurator({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const [selected, setSelected] = useState(() => {
    const requested = params.get("package") || "";
    return PRICING_PACKAGES.some((pkg) => pkg.id === requested)
      ? requested
      : "business";
  });
  const [addons, setAddons] = useState(() =>
    normalizeFrontendAddonIds((params.get("addons") || "").split(",")),
  );
  const initialMaintenance = params.get("maintenance") || "none";
  const [maintenanceId, setMaintenanceId] = useState(() =>
    getMaintenanceOptionById(initialMaintenance) ? initialMaintenance : "none",
  );
  const total = calculateFrontendEstimate(selected, addons).total;
  const number = useRef<HTMLSpanElement>(null);
  const previous = useRef(total);
  const c = (ms: string, en: string) => copy(locale, ms, en);

  const updateUrl = (packageId: string, addonIds: string[], careId: string) => {
    const query = new URLSearchParams({
      package: packageId,
      addons: normalizeFrontendAddonIds(addonIds).join(","),
    });
    if (careId !== "none") query.set("maintenance", careId);
    window.history.replaceState(null, "", pathname + "?" + query.toString() + window.location.hash);
  };
  const selectPackage = (packageId: string) => {
    setSelected(packageId);
    updateUrl(packageId, addons, maintenanceId);
  };
  const selectMaintenance = (careId: string) => {
    setMaintenanceId(careId);
    updateUrl(selected, addons, careId);
  };
  const toggleAddon = (addonId: string) => {
    const next = addons.includes(addonId)
      ? addons.filter((id) => id !== addonId)
      : [...addons.filter((id) => {
          const current = PRICING_ADDONS.find((item) => item.id === id);
          const nextAddon = PRICING_ADDONS.find((item) => item.id === addonId);
          return !current || !nextAddon || current.group !== nextAddon.group;
        }), addonId];
    const normalized = normalizeFrontendAddonIds(next);
    setAddons(normalized);
    updateUrl(selected, normalized, maintenanceId);
  };

  useGSAP(
    () => {
      if (number.current) number.current.textContent = formatMYR(total);
      const dispose = responsiveMotion(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const value = { amount: previous.current };
          gsap.to(value, {
            amount: total,
            duration: 0.45,
            ease: "power2.out",
            onUpdate: () => {
              if (number.current)
                number.current.textContent = formatMYR(Math.round(value.amount));
            },
          });
          return () => {
            if (number.current) number.current.textContent = formatMYR(total);
          };
        },
      );
      previous.current = total;
      return dispose;
    },
    { dependencies: [total], revertOnUpdate: true },
  );

  const quoteParams = new URLSearchParams({
    service: "website-ui",
    package: selected,
    addons: normalizeFrontendAddonIds(addons).join(","),
    estimate: String(total),
  });
  if (maintenanceId !== "none") quoteParams.set("maintenance", maintenanceId);
  const quote = sectionPath(locale, "hubungi", quoteParams);
  const selectedCare = getMaintenanceOptionById(maintenanceId)!;

  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene scene-light pricing-scene" id="harga">
        <Architecture variant="pricing" priority={!embedded} />
        <div className="pricing-copy">
          <SceneLabel number="04">{c("HARGA", "PRICING")}</SceneLabel>
          <DisplayTitle
            level={2}
            lines={locale === "ms" ? ["BINA IKUT", "BAJET."] : ["BUILD TO", "YOUR BUDGET."]}
          />
          <p className="scene-intro">
            {c(
              "Pilih pakej website, tambah fungsi dan semak anggaran sekali bayar.",
              "Choose a website package, add features and see a one-time estimate.",
            )}
          </p>
        </div>
        <div className="pricing-console-wrap">
          <div className="console pricing-console">
            <h2>{c("KIRA HARGA", "PRICE YOUR")} <span>WEBSITE</span></h2>
            <fieldset>
              <legend>1. {c("PILIH PAKEJ", "CHOOSE A PACKAGE")}</legend>
              <div className="package-options">
                {PRICING_PACKAGES.map((pkg) => (
                  <label key={pkg.id} className={"package-option " + (selected === pkg.id ? "selected" : "")}>
                    <input
                      type="radio"
                      name="package"
                      value={pkg.id}
                      checked={selected === pkg.id}
                      onChange={() => selectPackage(pkg.id)}
                    />
                    <span>
                      <span>{pkg.name[locale]}</span>
                      <strong>{formatMYR(pkg.basePrice)}</strong>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>2. {c("TAMBAH CIRI WEBSITE", "ADD WEBSITE FEATURES")}</legend>
              <p className="form-note">
                {c(
                  "Termasuk percuma: ",
                  "Included free: ",
                ) + INCLUDED_FREEBIES.map((item) => item[locale]).join(" · ") + c(
                  ". SEO tidak menjamin kedudukan Google.",
                  ". SEO does not guarantee Google rankings.",
                )}
              </p>
              <div className="addon-options">
                {PRICING_ADDONS.map((addon, index) => (
                  <label className="addon-option" key={addon.id} title={addon.description[locale]}>
                    {index === 0 ? <Globe /> : <Play />}
                    <span>{addon.name[locale]}</span>
                    <strong>{addon.price === 0 ? c("Percuma", "Free") : "+" + formatMYR(addon.price)}</strong>
                    <input
                      type="checkbox"
                      checked={addons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      aria-label={addon.name[locale]}
                    />
                    <span className="switch" aria-hidden="true" />
                  </label>
                ))}
              </div>
              <p className="form-note">
                {c(
                  "Pilih satu tahap animasi sahaja untuk urutan yang sama. Fungsi 3D, aset atau urutan tambahan perlu sebut harga.",
                  "Choose one animation tier for the same sequence. 3D work, extra assets or sequences need a separate quote.",
                )}
              </p>
            </fieldset>
            <div className="estimate-panel">
              <div>
                <h3>{c("ANGGARAN SEKALI BAYAR", "ONE-TIME ESTIMATE")}</h3>
                <span className="estimate-number" ref={number} aria-hidden="true">{formatMYR(total)}</span>
                <output className="sr-only" aria-live="polite" data-testid="estimate">{formatMYR(total)}</output>
              </div>
              <div>
                <ActionLink href={quote}>{c("Dapatkan Sebut Harga", "Request a Quote")}</ActionLink>
                <p>{c("Anggaran awal. Domain, hosting dan kerja di luar skop berasingan.", "Initial estimate. Domain, hosting and out-of-scope work are separate.")}</p>
              </div>
            </div>
          </div>
          <div className="custom-system">
            <Code2 />
            <div>
              <span>{c("SISTEM BISNES · TEMPAHAN ASAS", "BUSINESS SYSTEMS · BASIC BOOKING")}</span>
              <strong>{SYSTEM_OFFERS[0].priceDisplay}</strong>
            </div>
            <ActionLink blue href={sectionPath(locale, "hubungi", new URLSearchParams({ service: "full-stack", package: "booking-request" }))}>
              {c("Lihat Pilihan Sistem", "View System Options")}
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="package-detail">
        <h2>{PRICING_PACKAGES.find((pkg) => pkg.id === selected)?.name[locale]}</h2>
        <p>{PRICING_PACKAGES.find((pkg) => pkg.id === selected)?.scopeSummary[locale]}</p>
        <ul>{PRICING_PACKAGES.find((pkg) => pkg.id === selected)?.deliverables[locale].map((item) => <li key={item}>{item}</li>)}</ul>
        <details>
          <summary>{c("Penjagaan pilihan — caj berasingan", "Optional maintenance — billed separately")}</summary>
          <p>{c("Penjagaan tidak termasuk dalam jumlah sekali bayar. Pilih satu pilihan untuk disertakan dalam pertanyaan; kerja tambahan perlukan kelulusan dan minit bulanan tidak dibawa ke bulan berikutnya.", "Maintenance is not included in the one-time total. Select one option to include in your enquiry; extra work requires approval and monthly minutes do not roll over.")}</p>
          <fieldset>
            <legend>{c("PILIHAN PENJAGAAN", "MAINTENANCE OPTIONS")}</legend>
            {MAINTENANCE_OPTIONS.map((option) => (
              <label className="choice-option" key={option.id}>
                <input
                  type="radio"
                  name="maintenance"
                  value={option.id}
                  checked={maintenanceId === option.id}
                  onChange={() => selectMaintenance(option.id)}
                />
                <span>{option.name[locale]} · {option.priceDisplay[locale]}</span>
              </label>
            ))}
          </fieldset>
          <p data-testid="maintenance-selection">
            {selectedCare.cadence === "none"
              ? selectedCare.description[locale]
              : c("Pilihan berasingan: ", "Separate option: ") + selectedCare.name[locale] + " — " + selectedCare.priceDisplay[locale]}
          </p>
          {selectedCare.cadence !== "none" && (
            <>
              <p>{selectedCare.description[locale]}</p>
              <ul>{selectedCare.includes[locale].map((item) => <li key={item}>{item}</li>)}</ul>
              <p>{c("Tidak termasuk:", "Excludes:")} {selectedCare.excludes[locale].join(" · ")}</p>
            </>
          )}
        </details>
        <details>
          <summary>{c("Sistem bisnes dan harga mula", "Business systems and starting prices")}</summary>
          {SYSTEM_OFFERS.map((offer) => (
            <div key={offer.id}>
              <h3>{offer.name[locale]} — {offer.priceDisplay}</h3>
              <p>{offer.scopeSummary[locale]}</p>
              <ul>{offer.deliverables[locale].map((item) => <li key={item}>{item}</li>)}</ul>
              <ActionLink blue href={sectionPath(locale, "hubungi", new URLSearchParams({ service: "full-stack", package: offer.id }))}>
                {c("Hubungi untuk Sebut Harga", "Contact for a Quote")}
              </ActionLink>
            </div>
          ))}
        </details>
        <details>
          <summary>{c("Bayaran, revisi dan jaminan pembaikan", "Payment, revisions and bug-fix warranty")}</summary>
          <ul>
            <li>{c("Deposit 50% sebelum pembangunan; baki 50% sebelum serahan akhir.", "50% deposit before development; remaining 50% before final handover.")}</li>
            <li>{c("Dua pusingan revisi terkumpul. Revisi tambahan di luar skop dikenakan caj; pembetulan kecacatan dalam skop yang dipersetujui tidak menggunakan pusingan revisi.", "Two consolidated revision rounds. Out-of-scope revisions are chargeable; fixing an agreed-scope defect does not use a revision round.")}</li>
            <li>{c("Jaminan pembaikan pepijat selama 14 hari selepas serahan untuk kecacatan yang boleh dihasilkan semula dalam deliverable dipersetujui.", "A 14-day bug-fix warranty after handover for reproducible defects in agreed deliverables.")}</li>
            <li>{c("Jaminan tidak meliputi ciri baharu, reka bentuk semula, gangguan pihak luar atau perubahan oleh pelanggan.", "The warranty excludes new features, redesigns, external outages or client-made changes.")}</li>
            <li>{c("Deliverable akhir ditetapkan dalam sebut harga bertulis. Kerja tambahan perlukan kelulusan dahulu. Domain, hosting dan langganan pihak ketiga berasingan.", "Final deliverables are defined in a written quote. Extra work requires prior approval. Domain, hosting and third-party subscriptions are separate.")}</li>
          </ul>
        </details>
      </section>
    </StudioPage>
  );
}

export function PricingView({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  return (
    <Suspense fallback={<div className="route-loading">Pricing Studio</div>}>
      <Configurator locale={locale} embedded={embedded} />
    </Suspense>
  );
}
