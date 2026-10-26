# SYAHMIAOF STUDIO — Audit CRO, UX & Growth V3

Tarikh: 26 Oktober 2026  
Mod: perancangan sahaja. Tiada source, CSS, aset, harga atau tracking diubah.  
Asas bukti: engineering blueprint V1, pemeriksaan source, preview tempatan localhost:3461, tujuh route BM pada desktop 1440×900 dan mobile 390×844, serta ujian interaksi quote dan coaching. Audit ini bukan pengesahan deployment production.

## A. Ringkasan eksekutif

Kekalkan Digital Brutalism. Peluang utama ialah nyatakan tawaran dalam bahasa pelanggan, tunjuk skop dan bukti dengan terang, kemudian pastikan inquiry benar-benar sampai.

### 10 dapatan utama

1. **P0 — Form belum menghantar inquiry.** API valid POST pulang HTTP 503 / PROVIDER_PENDING_CONFIG. UI memberitahu pengguna supaya hantar melalui emel manual. Mesej tidak hilang secara senyap, tetapi pelanggan perlu buat satu langkah tambahan.
2. **P0 — Privacy belum diluluskan.** Form meminta nama, contact dan mesej; tujuan pemprosesan, retention dan notis belum tersedia.
3. **P1 — Hero kuat sebagai brand, lemah sebagai penjelasan servis.** “WEB YANG BUKAN BIASA.” dan “pengalaman digital yang hidup” tidak terus memberitahu SME apa yang boleh dibeli.
4. **P1 — Context portfolio tercicir.** CTA projek menghantar slug pada URL; ContactView tidak membaca parameter project, jadi nama projek tiada pada recap.
5. **P1 — Portfolio ialah konsep, bukan bukti pelanggan.** Tiga projek dilabel konsep/eksperimen/prototaip; tiada live URL disahkan. Disclosure sedia ada wajar dikekalkan.
6. **P1 — Scope pakej sukar dibandingkan.** Harga dan deliverables ada; tempoh, revisi, input pelanggan, handover, hosting/domain dan support selepas launch belum jelas secara pantas.
7. **P1 — Add-on “Bahasa Kedua” tidak menyebut siapa menterjemah.** RM250 jelas sebagai harga, tetapi hasil/limit belum cukup jelas.
8. **P1 — Full-stack guna jargon.** “Login · Database · Dashboard” belum menerangkan contoh kerja seperti tempahan, inventori atau operasi.
9. **P2 — Coaching belum menyatakan fit dan hasil sesi.** Topik dan 60/90 minit tersedia; tahap, persediaan, pendekatan mengajar dan hasil sesi belum kuat.
10. **P2 — SEO teknikal ada jurang.** Canonical/hreflang ditakrifkan pada route; RootLayout menetapkan lang=ms dan halaman EN menukar bahasa di client selepas hydration. Sitemap tidak ditemui dalam source. Core Web Vitals belum diukur dalam audit ini.

**Berfungsi:** tujuh route BM diperiksa pada desktop/mobile tanpa horizontal overflow atau ralat JS yang diperhatikan; nav mobile Escape berfungsi; BM/EN switch mengekalkan path/query. Estimator berfungsi (RM1,745 → RM2,145 dengan animasi → RM2,395 dengan kedua-dua add-on), dan quote recap mengekalkan pakej/add-on. Handoff coaching Mentor Projek/90 minit juga berfungsi. Harga diluluskan kekal RM645, RM1,745, RM2,995 dan full-stack dari RM3,250.

## B. Persona dan halangan

| Persona | Niat | Halangan utama | Laluan yang patut disokong |
|---|---|---|---|
| Pemilik SME | Website untuk tunjuk servis, menu/lokasi dan terima pertanyaan | Hero abstrak; istilah teknikal; tidak tahu pakej, kandungan dan domain siapa urus | Home → servis/harga → contoh → quote |
| Pemilik sistem | Tempahan, inventori atau pengurusan operasi | Sistem custom tidak diterangkan melalui use case; tiada calculator; brief belum kumpul aliran kerja | Servis → use case → brief → discovery |
| Pelajar coaching | Belajar asas/React atau semak projek | Topik/durasi ada, fit/tahap/hasil/persiapan kurang | Coaching → pilih topik/durasi → hasil sesi → tanya slot |

Risiko abandonment tertinggi ialah tak faham tawaran, tak percaya portfolio relevan, ragu scope/harga, atau berhenti selepas tahu inquiry tidak dihantar oleh form. CTA click bukan lead.

## C. Audit setiap halaman dan seksyen

### 01 Home

| Seks­yen | Bukti/pemerhatian | Cadangan |
|---|---|---|
| Nav | 7 pautan dan BM/EN; menu mobile diuji | Kekalkan; nyatakan current page dan pastikan contact mudah dicapai |
| Hero/headline | “WEB YANG BUKAN BIASA.” | Kekalkan sebagai brand; tambah descriptor bisnes yang spesifik |
| Supporting copy | “Saya bina pengalaman digital yang hidup — pantas, interaktif dan berimpak.” | Terangkan website, sistem custom dan siapa dibantu |
| CTA | “Lihat Portfolio” / “Mulakan Projek” | “Lihat contoh konsep” / “Bincang keperluan bisnes” |
| Services preview | Landing page hingga sistem; frontend/full-stack dan harga mula | Terangkan hasil dalam bahasa SME; label use case sebagai contoh |
| Portfolio showcase | 3 visual konsep dan label “Visual konsep” | Papar status pada setiap kad |
| Pricing preview | Harga frontend dan estimator | Kekalkan harga; naikkan visibility nota domain/hosting/skop |
| Coaching preview | “BELAJAR. BINA. DEPLOY.”, hands-on | Nyatakan tahap sasaran dan contoh hasil sesi |
| About/trust | Syahmi, pelajar Cloud Computing, TVETMARA, freelance, DFK INC | Bezakan pendidikan/peranan; sahkan DFK INC sebelum guna sebagai proof |
| Final CTA | “IDEA KAU. KITA BINA.” / “Bincang Projek” | Tambah pilihan jelas: website, sistem atau coaching |
| Footer | About, Contact, emel | Tambah privacy link selepas dasar diluluskan |

Story panjang tetapi ada pautan ke route khusus. Belum ada bukti animasi menghalang tindakan. Kekalkan motion; uji timing, reduced-motion, LCP/INP/CLS sebelum ubah.

### 02 Services

| Seksyen | Bukti/pemerhatian | Cadangan |
|---|---|---|
| Hero | “BINA IDEA. LANCAR WEB.” | Tambah siapa dibantu dan jenis hasil |
| Frontend card | “Landing Page · Business Website · Premium”, dari RM645 | BM mudah: laman promosi, laman bisnes, laman interaktif |
| Full-stack card | “Login · Database · Dashboard”, dari RM3,250 | Terangkan contoh tempahan/inventori/dashboard operasi; quote selepas discovery |
| Service details | Deskripsi, deliverables dan scope/boundaries dalam disclosure | Jadikan inclusions/exclusions penting mudah scan |
| Add-ons | Huraian servis menyebut integrasi | Terangkan siapa sediakan terjemahan dan batas animasi RM400 |
| FAQ | Tiada seksyen FAQ berasingan ditemui | Jangan tambah accordion generik; kumpul bantahan sebenar dahulu |
| CTA placement | Frontend ke pricing; full-stack ke contact | Gunakan label “Lihat harga laman web” dan “Ceritakan sistem anda” |

### 03 Portfolio

| Seksyen | Bukti/pemerhatian | Cadangan |
|---|---|---|
| Projek | SYMI UI, Lamborghini Concept, UberPokmi UI; status konsep/eksperimen/prototaip | Jangan bingkaikan sebagai client case study |
| Imej | Mockup/concept, bukan bukti live screenshot | Status ditunjukkan pada thumbnail |
| Detail | Role, stack, deskripsi dan disclosure | Tambah mini case: objektif konsep, sumbangan, keputusan reka bentuk, fungsi demo |
| Live links | Tiada URL disahkan; butang kosong tidak dipaparkan | Tunjuk demo selepas URL dan batas simulasi disahkan |
| CTA projek | CTA membina service=website-ui dan project=slug | Contact perlu membaca slug dan memaparkan tajuk projek |
| Credibility | Lamborghini disclaimer; UberPokmi nyatakan bukan booking live | Kekalkan disclosure pada semua item |

### 04 Pricing Studio

| Seksyen | Bukti/pemerhatian | Cadangan |
|---|---|---|
| Headline | “BINA IKUT BAJET.” | Nyatakan estimator ini untuk frontend |
| Packages | Landing RM645, Business RM1,745, Premium RM2,995; Business default | Tambah “sesuai untuk” tanpa ubah harga |
| Add-ons | Animasi +RM400, Bahasa Kedua +RM250 | Nyatakan deliverable, had dan pihak penyedia terjemahan |
| Calculator/quote | Jumlah betul; CTA quote bawa pilihan dan harga | Kekalkan recap; label sebagai anggaran awal |
| Domain/hosting | Dinyatakan berasingan | Tambah pada comparison supaya mudah dilihat |
| Full-stack | Dari RM3,250; tiada calculator | Kekalkan sebagai starting price, bukan janji semua skop |
| Package detail | Deliverables pakej terpilih | Bandingkan included/excluded, input klien, revisi, tempoh, handover |
| Mobile | Viewport 390 tanpa overflow; interaksi calculator diuji di desktop | Sahkan tap-target dan urutan pada device sebenar |
| Objections | Revisi, timeline, support, kandungan kurang jelas | Jawab sebelum CTA |

### 05 Coaching

| Seksyen | Bukti/pemerhatian | Cadangan |
|---|---|---|
| Hero | “BELAJAR. BINA. DEPLOY.”, hands-on | Sebut sasaran beginner, React/Next learner dan pemilik projek |
| Topics | Asas Web, React/Next.js, Mentor Projek | Nyatakan prasyarat dan hasil setiap pilihan |
| Duration | 60/90 minit | Kekalkan; tambah format dan persediaan |
| Price/schedule | Disahkan selepas perbincangan | Kekalkan sehingga keputusan harga |
| Handoff | Topic/duration dibawa ke contact dan diuji | Kekalkan; objektif/URL projek boleh pilihan |
| Approach/trust | Online, 1:1, Bahasa Melayu | Terangkan gaya sesi berasaskan fakta |
| FAQ | Tiada FAQ khusus | Tambah daripada soalan berulang sebenar |

### 06 About Me

| Seksyen | Bukti/pemerhatian | Cadangan |
|---|---|---|
| Positioning | Pembangun Web & Pelajar IT (Cloud Computing) | Kekalkan; terbitkan kelayakan tepat sahaja |
| Story | Bina website untuk bisnes/individu | Terangkan cara kerja tanpa mencipta pengalaman/tahun |
| Credentials | TVETMARA Besut, freelance, DFK INC AI Digital Marketing | Sahkan status, jawatan dan izin |
| Skills | Web dev, UI/UX, cloud/deployment, AI automation | Sambungkan dengan projek yang benar-benar boleh ditunjuk |
| Character | Dilabel karakter jenama fiksyen | Kekalkan label |
| CTA | Portfolio dan contact | “Lihat demo konsep” dan “Bincang keperluan anda” |

### 07 Contact

| Seksyen | Bukti/pemerhatian | Cadangan |
|---|---|---|
| Intro | “Ceritakan projek anda. Saya bantu jadikan ia realiti.” | Nyatakan info minimum untuk anggaran |
| WhatsApp | Disabled, nombor belum ada; email tersedia | Aktifkan dengan nombor sah dan mesej prefill selepas diluluskan |
| Handoff recap | Pakej/add-on dan coaching topic/duration muncul | Tambah project slug; pastikan servis full-stack jelas |
| Form fields | Nama, contact, mesej; validation/honeypot | Kekalkan ringkas; medan ikut servis bersifat optional |
| Submission | API 503, manual email fallback | Provider sebenar dan acknowledgment end-to-end sebelum success |
| Privacy | Tujuan dan retention belum diputuskan | Notis dan dasar sebelum form public |
| Error/mobile | Tiada overflow; perlu langkah tambahan | Butang “Buka emel dengan draf ini”, simpan input, nyatakan retry |

## D. Cadangan copy

| Lokasi | Semasa | Cadangan | Sebab |
|---|---|---|---|
| Hero | “Saya bina pengalaman digital yang hidup — pantas, interaktif dan berimpak.” | “Saya bina laman web bisnes dan sistem custom yang bantu pelanggan faham tawaran anda dan mula bertanya.” | Tawaran jelas; tiada jaminan jualan |
| Home CTA | Lihat Portfolio / Mulakan Projek | Lihat contoh konsep / Bincang keperluan bisnes | Selaras dengan bukti dan niat |
| Frontend | Landing Page · Business Website · Premium | Laman promosi, laman bisnes dan laman interaktif mengikut skop | Kurang jargon |
| Full-stack | Login · Database · Dashboard | Sistem tempahan, rekod inventori atau dashboard operasi. Skop disahkan selepas faham aliran kerja. | Use case mudah faham; contoh bukan projek yang didakwa siap |
| CTA full-stack | Bincang Projek | Ceritakan sistem yang anda perlukan | Mendorong brief relevan |
| Portfolio | Visual konsep | Konsep UI — mockup, bukan laman pelanggan live | Status terus nampak |
| Add-on | Bahasa Kedua | Versi bahasa kedua pada laman — RM250. Teks terjemahan disediakan oleh [pihak yang dipersetujui]. | Lengkapkan keputusan komersial sebelum publish |
| Pricing | Anggaran sahaja. Domain, hosting dan skop tambahan berasingan. | Anggaran awal. Domain, hosting, kandungan dan fungsi luar pakej boleh mengubah jumlah selepas skop disahkan. | Jangkaan lebih jelas |
| Coaching | Bimbingan hands-on, daripada asas web hingga projek sebenar. | Pilih sesi untuk faham asas web, belajar React/Next.js atau semak projek yang sedang dibina. | Membantu pilih laluan |
| Contact | Ceritakan projek anda. Saya bantu jadikan ia realiti. | Nyatakan apa yang mahu dibina, siapa yang akan menggunakannya dan bila anda sasarkan untuk mula. | Mengumpul konteks berguna |
| Fallback | Pertanyaan belum dihantar. Buka aplikasi emel untuk menghantarnya kepada kami. | Draf pertanyaan sudah disediakan. Tekan “Buka emel” untuk menghantarnya. | Guna hanya jika butang mailto berfungsi |
| About | Pembangun Web & Pelajar IT (Cloud Computing) | Kekalkan; tambah cara kerja sebenar selepas disahkan | Trust tanpa exaggeration |
| DFK INC | DFK INC — AI Digital Marketing | Kekalkan selepas role/status/izin disahkan | Elak credential mengelirukan |

**English:** Route EN mempunyai metadata sendiri. Audit copy semula selepas BM supaya natural, konsisten dan menerangkan portfolio sebagai konsep. Frasa “impactful/launch web” lebih kepada brand berbanding servis. Jangan terbitkan skop terjemahan sebelum diputuskan.

## E. Feature review

| Feature | Manfaat/hipotesis | Build / maintenance | Prioriti |
|---|---|---|---|
| Form provider + acknowledgment | Inquiry sampai; success hanya selepas confirm | Sederhana / sederhana | P0 |
| Privacy notice + retention | Pengguna tahu data digunakan bagaimana | Rendah teknikal / sederhana operasi | P0 |
| Project slug recap | Kurang taip ulang, konteks tak hilang | Rendah / rendah | P1 |
| Package compare | Bantu SME pilih dan kurangkan ragu | Sederhana / rendah selepas scope diluluskan | P1 |
| Full-stack brief berperingkat | Kumpul proses, pengguna, fungsi dan integrasi | Sederhana / sederhana | P1 |
| WhatsApp prefill | Mesej lebih berkonteks | Rendah / rendah; tunggu nombor sah | P1 |
| FAQ dari bantahan sebenar | Jawab keraguan berulang | Rendah / rendah | P2 |
| Coaching fit guide | Pelajar tahu sesi mana sesuai | Rendah / rendah | P2 |
| Sticky mobile CTA | Kurang scroll | Rendah-sederhana; boleh tutup konten | P2 selepas usability evidence |
| Analytics tanpa PII | Ukur funnel | Sederhana / sederhana | P2 selepas privacy approval |
| PDF quote/instant full-stack calc | Automasi skop belum standard | Tinggi / tinggi; risiko anggaran salah | P3 |
| Coaching bot/CRM kompleks | Automasi sebelum volume terbukti | Tinggi / tinggi | P3, tangguh |

## F. Conversion funnel

**Frontend:** Home → Servis/Harga → portfolio konsep → pilih pakej/add-on → contact recap → provider confirmation → qualified inquiry → discovery → quote → projek berbayar. Harga sebagai shortcut; konsep bukan client proof; CTA bukan lead.

**Full-stack:** Home/Servis → contoh aliran bisnes → skop → brief → contact → discovery → estimate → quote. Brief minta masalah/proses, pengguna, fungsi utama, integrasi dan tarikh sasaran secara ringkas; jangan minta data sensitif.

**Coaching:** Home/Coaching → tahap/topik → hasil sesi/persiapan → 60/90 min → contact recap → sahkan harga/jadual → sesi. Tiada booking automatik yang disahkan; nyatakan langkah sebenar.

Titik abandonment bersama: tawaran hero kabur; scope harga tidak lengkap; status portfolio; form delivery 503; mobile perlu scroll. Bukti semasa belum cukup untuk membina sticky CTA tanpa ujian.

## G. Analytics dan KPI selepas approval

Tiada tracking dipasang. Luluskan privacy, tujuan dan retention dahulu. Jika GA4 dipilih, gunakan event lead-generation seperti generate_lead hanya selepas provider mengesahkan delivery. Jangan hantar nama, emel, telefon, teks mesej atau data peribadi ke analytics.

| Event | Bila | Maksud |
|---|---|---|
| service_cta_click | CTA servis/harga/contact | Niat, bukan lead |
| pricing_package_selected | Pakej berubah | Minat harga |
| pricing_addon_selected | Add-on dipilih/dinyahpilih | Minat/kekeliruan |
| quote_started | Handoff quote ke contact | Start, bukan submit |
| coaching_enquiry_started | Handoff topic/duration | Funnel coaching |
| inquiry_validation_error | Jenis validation error sahaja | Friction |
| inquiry_submit_attempt | Form valid dihantar | Attempt |
| generate_lead / inquiry_delivery_confirmed | Provider ACK | Inquiry dihantar |
| whatsapp_intent_click | Klik wa.me | Niat sahaja, bukan mesej |
| qualified_inquiry / paid_project | Status manual selepas review | Kualiti dan hasil |

Kadar delivery = ACK ÷ attempts. Kadar inquiry layak = qualified ÷ sesi (lapor juga ÷ inquiry). Quote-start = quote_started ÷ sesi pricing. Close rate = paid project ÷ qualified inquiry. Respons = median jam kerja hingga balasan. Kumpul baseline dahulu; low-volume perlukan temu bual. Tetapkan sampel/tempoh/perbezaan bermakna sebelum A/B test.

## H. Roadmap keutamaan

| ID / P | Halaman, isu dan bukti | Cadangan & hipotesis | Effort | Risiko | Acceptance criteria |
|---|---|---|---|---|---|
| R1 / P0 | Contact: valid POST 503 PROVIDER_PENDING_CONFIG | Sambung provider supaya lead valid diterima | Sederhana | Outage/config | Email diterima end-to-end; outage/retry jelas; tiada success palsu |
| R2 / P0 | Privacy/retention pending | Luluskan notis, retention dan deletion process | Rendah teknikal | Polisi belum ditetapkan | Notis menyebut data, tujuan, retention dan cara padam |
| R3 / P1 | Hero abstrak untuk SME | Kekalkan h1, tambah descriptor servis | Rendah | Terlalu padat | 5 wakil sasaran boleh sebut servis/next step selepas 5 saat |
| R4 / P1 | Project query tidak dibaca | Masukkan tajuk projek dalam recap | Rendah | Slug invalid | CTA setiap projek tunjuk nama tepat; query salah diabaikan |
| R5 / P1 | 3 konsep tanpa live proof | Papar status, role dan breakdown | Sederhana | Jangan reka result | Status/peranan/batas demo jelas; live link diverifikasi |
| R6 / P1 | Scope komersial tak lengkap | Luluskan matrix deliverables/exclusions/revisi/timeline/handover | Sederhana | Perlu keputusan Syahmi | Semua pakej menjawab item tersebut |
| R7 / P1 | Add-ons kabur | Nyata deliverable, had, owner translation | Rendah | Skop belum disahkan | Copy BM dan EN menjelaskan included/excluded |
| R8 / P1 | Full-stack jargon | Guna use cases, brief ringkas | Rendah | Disalah anggap produk siap | Use case dilabel contoh; soalan brief optional |
| R9 / P1 | WhatsApp disabled | Tetapkan nombor dan prefill | Rendah | Nombor/privasi | Link tepat, mesej BM/EN tepat, dibuka atas klik |
| R10 / P2 | Coaching fit kurang | Tambah audience/outcome/persiapan | Rendah | Overpromise | Setiap topik ada hasil sesi realistik |
| R11 / P2 | Sitemap tiada; root lang=ms | Sitemap, server locale lang, audit robots/hreflang | Sederhana | SEO/aksesibiliti | EN HTML awal lang=en; sitemap semua canonical route |
| R12 / P2 | Tiada Core Web Vitals | Ukur mobile CWV, imej/font, reduced-motion | Sederhana | Lab vs field | Laporkan sumber data dan baiki bottleneck terukur |
| R13 / P2 | Funnel tak terukur | Event minimum tanpa PII | Sederhana | Low volume/dupe | Definisi event, dedupe; lead event selepas ACK |
| R14 / P3 | Quote PDF/assistant, tiada scope standard | Tangguh sehingga pola inquiry berulang | Tinggi | Quote salah | Build hanya jika data membuktikan keperluan |

## I. Fasa pelaksanaan selepas kelulusan

1. **Lead/privacy:** provider, penerima, nombor WhatsApp, notis/retention, delivery dan fallback.
2. **Tawaran/scope:** lulus hero/use case, deliverables, revisi, tempoh, tanggungjawab kandungan, domain/hosting/handover; baiki project recap.
3. **Proof/coaching:** tambah aset dan URL yang disahkan; lengkapkan founder dan coaching information.
4. **SEO/performance:** server-side locale lang, sitemap/robots, ukur CWV mobile; jangan buang motion tanpa data.
5. **Measurement:** event minimum selepas privacy approval, baseline, kemudian satu A/B test pada satu masa.

## J. Soalan dan keputusan untuk Syahmi

1. Provider form/email, penerima inquiry, pemilik credentials?
2. Nombor WhatsApp rasmi format antarabangsa; bolehkah draf mesej diprefill?
3. Di mana inquiry disimpan, siapa akses, berapa lama dan cara minta padam?
4. Privacy copy BM/EN dan consent untuk reply sahaja atau marketing juga?
5. Untuk setiap pakej: revisi, timeline, kandungan pelanggan, handover, domain/hosting, support?
6. RM250 bahasa kedua: setup atau terjemahan juga; siapa sediakan dan berapa halaman?
7. RM400 animasi: deliverable, had, expectation performance?
8. URL/screenshot/status/role/izin dan hasil projek yang boleh diterbitkan?
9. Status dan peranan DFK INC serta izin guna nama?
10. Coaching: harga, tahap, persediaan, platform, cancel/reschedule?
11. Quote melalui email, WhatsApp atau pilihan pelanggan?
12. GA4 diterima selepas privacy siap; siapa owner/report?

### 5 perubahan disyorkan dahulu

1. Provider delivery dengan acknowledgment dan fallback sebenar.
2. Privacy notice, tujuan penggunaan dan retention.
3. Hero yang jelas untuk SME tanpa mengganti tajuk jenama.
4. Project name dari portfolio ke contact recap.
5. Scope matrix pakej dan penjelasan add-on.

### 5 perkara yang boleh tunggu

1. PDF quote atau full-stack calculator.
2. Coaching assistant/chatbot.
3. Sticky CTA mobile sehingga usability test menyokongnya.
4. Portfolio filter ketika baru tiga item.
5. CRM/automation sebelum volume dan proses diketahui.

### Kelulusan Syahmi diperlukan

- Provider email/form, penerima, WhatsApp.
- Privacy, retention, akses data dan consent.
- Skop pakej, revisi, timeline, kandungan, handover, domain/hosting/support.
- Skop terjemahan RM250 dan animasi RM400.
- Status/URL/izin portfolio; tiada testimonial atau metric rekaan.
- Peranan dan nama DFK INC.
- Harga/jadual/polisi coaching.
- Analytics dan pemilik KPI.

**Status:** laporan perancangan siap. Tiada perubahan selain fail laporan ini. Pelaksanaan menunggu keputusan di atas, selaras dengan arahan planning-only.

