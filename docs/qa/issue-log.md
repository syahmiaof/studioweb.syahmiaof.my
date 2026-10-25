# SYAHMIAOF STUDIO — ISSUE & GOVERNANCE LOG (V1)

**Owner:** JEBAT (Lead Engineering Owner)  
**Date:** 2026-10-25  
**Scope:** V1 Local Production Build (`studio.syahmiaof.my`)  
**Strict Policy:** No invented credentials, no fake client reviews, no unverified third-party services.

---

## Active Decision Blockers & Pending Client Inputs

The following items are intentionally held open awaiting explicit confirmation from Syahmi. Each has been provided with a safe, honest, functional fallback:

### 1. WhatsApp International Phone Number
* **Status:** PENDING SYAHMI DECISION
* **Description:** No official phone number was provided in the project folder or blueprint.
* **Risk If Fabricated:** Directing visitors to an unknown or incorrect WhatsApp account would violate privacy and cause lost client leads.
* **Current V1 Implementation:** The WhatsApp button in `ContactView.tsx` and `Footer.tsx` is styled in high-visibility brutalist yellow with an explicit status badge: `[NOMBOR BELUM DITETAPKAN]`. Clicking notifies the user to use the direct email form while displaying a disabled/informative state.
* **Resolution Path:** When Syahmi provides the official international number (e.g., `+601XXXXXXXX`), set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` or update `src/components/pages/ContactView.tsx`.

---

### 2. Transactional Email / SMTP API Key
* **Status:** PENDING INFRASTRUCTURE KEY
* **Description:** No `RESEND_API_KEY` or SMTP credentials exist in the local workspace.
* **Risk If Fabricated:** Inquiries would fail silently or crash the server.
* **Current V1 Implementation:** The API route `/api/inquiries/route.ts` parses and validates inquiries with Zod. When email environment variables are missing, it:
  1. Validates the submission payload safely.
  2. Logs the submission to the local server console.
  3. Returns an HTTP 200 response with `requiresFallback: true`.
  4. The frontend displays an honest message: `Konfigurasi penghantaran emel pelayan sedang dikemas kini.`
  5. The frontend automatically provides a one-click mailto fallback link with prefilled subject and body addressed to `hello@syahmiaof.my`, ensuring **zero lost client leads**.
* **Resolution Path:** Add `RESEND_API_KEY` or `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` to `.env.local` prior to live deployment.

---

### 3. Production Client Case Studies & Verified Screenshots
* **Status:** AWAITING CLIENT PORTFOLIO EXPANSION
* **Description:** No private client project repositories or production client screenshots were bundled in the loose Desktop assets.
* **Risk If Fabricated:** Displaying fake client logos (e.g., Nike, Petronas) or fabricated 5-star testimonials destroys brand integrity and violates commercial guidelines.
* **Current V1 Implementation:** The portfolio features three high-fidelity frontend and component engineering showcases authored by Syahmi AOF:
  - *SYMI UI* — Open Source Component Library
  - *Lamborghini Digital Experience* — Experimental Motion Concept
  - *UberPokmi UI* — Food Delivery Architecture Concept
  Every entry is strictly badged as `KONSEP DEMO` / `EKSPERIMENTAL` / `FRONTEND DEMO`.
* **Resolution Path:** When live commercial client case studies become available, save authorized screenshots to `public/assets/projects/` and update `src/content/projects.ts`.

---

### 4. Mascot vs. Real Photo on About Page
* **Status:** APPROVED WORKAROUND ACTIVE
* **Description:** The folder contained an approved 3D-rendered techwear male character cutout (`07_hero_seated_character.png`), not a photograph of Syahmi AOF.
* **Risk If Fabricated:** Claiming the 3D mascot is a real photo of Syahmi would mislead potential clients.
* **Current V1 Implementation:** A clear brutalist disclaimer is rendered right next to the character's thigh and above the biography:
  > `KARAKTER VISUAL JENAMA — Karakter di bawah adalah maskot visual SYAHMIAOF STUDIO, bukan gambar foto Syahmi AOF.`
* **Resolution Path:** If Syahmi wishes to feature a personal photograph in V2, place `syahmi-portrait.webp` in `public/assets/` and update `src/components/pages/AboutView.tsx`.

---

### 5. Deployment & DNS Connection
* **Status:** STRICTLY LOCAL BOUNDARY PRESERVED
* **Description:** As mandated by the Master Prompt, zero deployments to Vercel, zero DNS modifications, and zero alterations to the separate `syahmiaof.my` portfolio were made.
* **Current V1 Implementation:** The production build compiles cleanly locally and passes all tests on `http://localhost:3456`.
* **Resolution Path:** When Syahmi is ready to deploy publicly to `studio.syahmiaof.my`, follow the step-by-step deployment guide in `docs/qa/build-report.md`.

---

## Technical Debt & Resolution Log

| Issue ID | Component | Description | Resolution Applied | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TD-01** | `useSearchParams` | Prerender bailout during `next build` on dynamic query parsing. | Wrapped `HeaderBar` and `ContactFormContent` inside `<Suspense>` boundaries. | **RESOLVED** |
| **TD-02** | Playwright Port | Default port 3000 collided with user's other local portfolio process. | Moved E2E audit suite to dedicated port 3456 with automatic taskkill cleanup. | **RESOLVED** |
| **TD-03** | Playwright Selector | Case-insensitive text matcher substring collision (`text=EN` matching `TENTANG`). | Refactored locator to exact role-based link match `getByRole("link", { name: "EN", exact: true })`. | **RESOLVED** |
| **TD-04** | Metadata Base | Missing base URL for OpenGraph metadata. | Added `metadataBase: new URL("https://studio.syahmiaof.my")` in `src/app/layout.tsx`. | **RESOLVED** |
