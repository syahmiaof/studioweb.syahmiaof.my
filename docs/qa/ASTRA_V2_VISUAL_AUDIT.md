# ASTRA V2 — Visual reconstruction audit

Date: 26 October 2026 (Asia/Singapore). Scope: local studio only. No deployment.

## Evidence and method

Authority: all seven images in `design/references/`, original PNG characters, and `docs/engineering/ENGINEERING_BLUEPRINT_V1.md`. The current user brief authorizes implementation beyond the blueprint's historic planning-only status.

Fresh baseline: `screenshots/astra-v2/before/`, 7 routes × 4 viewports (1440×900, 1920×1080, 768×1024, 390×844), viewport and full-page captures. Chromium, device scale 1, reduced motion for reproducible composition. No numerical similarity score is assigned. Earlier reports' 96/100 visual score and 100 Lighthouse claims are not accepted as evidence.

## Prioritized baseline discrepancies

| Priority | Page | Structural discrepancy | Styling / content discrepancy |
|---|---|---|---|
| P0 | Home | Narrow centered grid, undersized seated character, massive yellow box wraps the headline, unrelated flat SYA | Missing concrete environment; unsupported 60FPS/100 Lighthouse claim; About teaser missing |
| P1 | Services | Black canvas replaces the approved white concrete composition; character lacks foreground scale | Small title, overly detailed hero cards, generic slabs |
| P1 | Portfolio | Gallery constrained to conventional panel; reference has three dramatically different depth positions | Preview images are crops of design mockups, not verified live screenshots; SYMI description inconsistent with yogurt imagery |
| P1 | Pricing | Black page replaces light concrete; 04 is too small and flat; configurator too small | Selected-state hierarchy and numeric scale too weak |
| P1 | Coaching | 05 and seated creator too small, large empty gaps | Controls and text hierarchy differ; headings not fully localized |
| P1 | About | Wrong dark/light balance and disconnected laptop composition | Annotation and factual hierarchy need reconstruction |
| P1 | Contact | Background 07 and architecture barely visible; form feels like generic dashboard | Hardcoded BM labels on EN route; labels lack input association |
| P0 | Inquiry integrity | API returns fabricated success if two env vars exist, without dispatch | Must return truthful unavailable response until an actual provider integration exists |
| P1 | Shared | Header too busy, tablet nav crowds; fonts requested with unsupported Oswald weights | Remove version/status noise; self-host valid display font; ensure all controls remain accessible |

## Reconstruction approach

Retain routes, approved commercial data, validation and handoff contracts. Replace incorrect page compositions with reusable scene primitives and page-specific layouts. Crop only decorative texture/architecture regions; keep all headlines, controls, links and form fields as HTML. Preserve every original PNG. Use alpha-preserving WebP derivatives and local licensed fonts. Motion uses scoped GSAP contexts, responsive conditions and explicitly owned media listener cleanup. No WebGL canvas is necessary for these references.

## Keputusan reconstruction

Ketujuh-tujuh komposisi telah dibina semula dan boleh disemak secara local. Headline, navigasi, kalkulator, pilihan coaching dan borang ialah elemen HTML sebenar. Tiada screenshot penuh digunakan sebagai laman. Harga asal dan pricing engine dikekalkan. Tiada deployment dibuat; portfolio berasingan tidak diubah.

**Buka [perbandingan interaktif tujuh halaman](ASTRA_V2_COMPARISON.html)** untuk melihat rujukan, sebelum dan selepas dalam satu tempat. Pilihan viewport menukar semua screenshot. Setiap imej boleh dibuka pada resolusi asal, termasuk halaman penuh.

### Perbandingan tujuh halaman

Pautan di bawah menggunakan desktop 1440×900. Set lengkap tersedia pada 1920×1080, 768×1024 dan 390×844 melalui fail perbandingan.

| Halaman | Sebelum → selepas | Perubahan utama | Perbezaan daripada rujukan yang masih ada |
|---|---|---|---|
| Home | [Sebelum](screenshots/astra-v2/before/1440x900/01-home.png) → [Selepas](screenshots/astra-v2/after/1440x900/01-home.png) | Headline kiri besar, karakter duduk asal di kanan, SYA konkrit, anak panah, latar berlapis; enam teaser lengkap termasuk About | Extrusion SYA dan beam CSS lebih ringkas daripada seni bina fotorealistik rujukan. Tinggi hero dan kedudukan terrace diadaptasi untuk halaman panjang |
| Services | [Sebelum](screenshots/astra-v2/before/1440x900/02-services.png) → [Selepas](screenshots/astra-v2/after/1440x900/02-services.png) | Latar konkrit cerah, dua panel harga utama, karakter laptop berdiri; deliverables/boundaries sedia ada dikekalkan | Pencahayaan, permukaan konkrit dan geometri tidak sama sepenuhnya. Panel disusun menegak pada mobile |
| Portfolio | [Sebelum](screenshots/astra-v2/before/1440x900/03-portfolio.png) → [Selepas](screenshots/astra-v2/after/1440x900/03-portfolio.png) | Tiga plane projek berperspektif, selected state, previous/next dan butiran projek; hash memilih projek yang betul | Imej ialah crop mockup yang sudah mempunyai perspektif asal; bukan screenshot live yang telah disahkan. Tiada pautan live rekaan |
| Pricing | [Sebelum](screenshots/astra-v2/before/1440x900/04-pricing.png) → [Selepas](screenshots/astra-v2/after/1440x900/04-pricing.png) | Monumen 04 daripada artwork yang diluluskan, console hitam besar, radio/toggle, angka anggaran dan CTA jelas | Sudut dan saiz console diselaraskan. English menggunakan headline lebih kecil untuk mengelakkan pertindihan dengan console |
| Coaching | [Sebelum](screenshots/astra-v2/before/1440x900/05-coaching.png) → [Selepas](screenshots/astra-v2/after/1440x900/05-coaching.png) | Creator duduk, 05 besar, reben biru/kuning, kawalan topik/durasi dan handoff | Monumen CSS dan pencahayaan lebih ringkas. Pada mobile, karakter diletakkan selepas kawalan supaya borang mudah digunakan |
| About | [Sebelum](screenshots/astra-v2/before/1440x900/06-about.png) → [Selepas](screenshots/astra-v2/after/1440x900/06-about.png) | Kanvas cerah, karakter pointing, laptop terapung berasingan, fakta TVETMARA/freelance/DFK INC dan CTA | Komposisi laptop/beam diubah pada tablet. Karakter dilabel sebagai visual jenama rekaan, bukan foto identiti |
| Contact | [Sebelum](screenshots/astra-v2/before/1440x900/07-contact.png) → [Selepas](screenshots/astra-v2/after/1440x900/07-contact.png) | Dua bahagian, 07 konkrit, anak panah, borang dengan label berkaitan, error inline dan fallback email yang jujur | Status provider dan WhatsApp sebenar memerlukan teks tambahan; susunan borang menjadi satu kolum pada mobile |

### Kitaran pembaikan selepas render

Selepas capture pertama, saiz/posisi karakter Home dibaiki supaya kepala tidak terpotong pada desktop; tinggi creator Coaching dihadkan supaya kepala muat pada 1920×1080; laptop About dinaikkan pada tablet; headline mobile dibesarkan; tekstur konkrit dikurangkan pada lapisan gelap. Semakan English tambahan menemui headline Pricing terlalu panjang di bawah console; saiz desktop khusus English membetulkannya. Style bahasa menggunakan atribut `data-locale` yang tersedia dalam HTML awal, supaya ia tidak menunggu hydration. Lapisan cerah ditambah di belakang intro pada halaman cerah untuk mengelakkan teks hitam melintasi reben biru. Bukti English: [1440](screenshots/astra-v2/after/1440x900/04-pricing-en.png), [1920](screenshots/astra-v2/after/1920x1080/04-pricing-en.png).

## Animasi dan interaksi

- `StudioPage` menyediakan timeline berurutan: artwork, headline dengan clip reveal, karakter dan kawalan. ScrollTrigger memberi reveal yang boleh berundur semasa reverse scroll.
- Parallax kedalaman hanya aktif pada desktop ≥1024px dengan `prefers-reduced-motion: no-preference`. Mobile menggunakan komposisi statik yang lebih ringan. Tiada scroll hijacking atau canvas WebGL berterusan.
- `useGSAP` discop kepada root halaman dan `revertOnUpdate` diaktifkan. Helper `responsiveMotion` memiliki native media listener serta GSAP context, lalu membuang listener dan memanggil `context.revert()` semasa unmount atau perubahan media. Pendengar hash dan Escape juga mempunyai cleanup.
- Kandungan asas kekal kelihatan sebelum JavaScript; reduced motion tidak menyembunyikan headline atau borang.
- Angka kalkulator bertween, tetapi nilai `aria-live` dan quote menggunakan jumlah sebenar. Progress galeri menggunakan `scaleX`, mengelakkan animasi width.
- Navigasi mobile mempunyai state terbuka, `aria-expanded`, Escape dan pemulangan fokus. Form menggunakan radio/checkbox native, label, error association dan fokus ke medan invalid pertama.

## Aset dan prestasi

- Enam PNG karakter/laptop asal dikekalkan. Derivatif alpha WebP dipotong pada ruang lutsinar sahaja: **8,603,126 → 935,132 bytes**, pengurangan **89.1%** untuk enam fail tersebut. Ini ukuran saiz fail aset, bukan dakwaan pengurangan keseluruhan page load.
- `scripts/prepare-astra-assets.cjs` merekod sumber, dimensi, alpha dan saiz dalam [manifest](astra-asset-manifest.json). Crop seni bina/tekstur terhad kepada bahagian dekoratif. Teks dan UI utama tidak dibakar ke dalam imej.
- Font Anton dan Barlow disimpan local dengan lesen OFL. Permintaan Google Fonts dengan weight Oswald yang tidak sah dibuang.
- `next/image` mempunyai dimensi/sizes; hero diberi priority dan teaser bawah halaman lazy. Tiada dependency runtime baru ditambah.
- Binaan production akhir: shared First Load JS **87.3 kB**. Home/Services **160 kB**, Pricing **159 kB**, Coaching/Portfolio **157 kB**, About **156 kB**, Contact **175 kB**. Ini statistik Next build, bukan Lighthouse atau ukuran FPS.
- Output dev `.next-dev` diasingkan daripada `.next` production untuk mengelakkan kedua-dua server menimpa artifact yang sama.

## Bukti ujian

| Semakan yang dijalankan | Keputusan dan skop |
|---|---|
| `npm test` | **40/40 lulus**, 3 fail: pricing 8, inquiry 6, adversarial pricing 26 |
| `npm run typecheck` | Lulus, TypeScript strict tanpa emit |
| `npm run build` | Lulus, static generation 18/18; API inquiry kekal dynamic |
| `node tests/e2e/astra-regression.cjs` | **107 semakan lulus**; [hasil JSON](astra-regression-results.json) |
| `npm run test:e2e:focused` | **39/39 lulus** pada production akhir; title English, hash galeri, 28 client transitions, cleanup listener/DOM, perubahan reduced motion, exact total dan perubahan harga berulang. [Hasil JSON](astra-final-checks.json) |
| Capture browser selepas reconstruction | **28 kombinasi halaman/viewport**; masing-masing viewport + full page; semua HTTP 200, tiada overflow horizontal, imej rosak atau pageerror. [Hasil capture](screenshots/astra-v2/after/results.json) |
| Perbandingan HTML | 7 seksyen, 21 imej rujukan/before/after berjaya dimuatkan; pemilih viewport menukar 14 screenshot |
| `git diff --check` | Lulus; hanya amaran konfigurasi LF→CRLF Windows, tiada whitespace error |
| Perlindungan asal | `git diff --name-only -- design public/assets/characters public/assets/projects` kosong; rujukan dan PNG asal tidak diubah |

107 semakan browser merangkumi 14 route BM/EN pada empat viewport, harga 1745/2145/2395/1295/3645, handoff quote dan full-stack RM3,250, state bahasa, input borang invalid, fallback 503 yang tidak mendakwa delivery, spoofed estimate dan duplicate addon, malformed 400/payload 413, coaching 90 min, galeri, menu mobile, forward/reverse scroll dan back/forward dalam normal serta reduced motion. Respons 503 ialah keadaan provider belum tersedia yang disengajakan, bukan error JavaScript.

Semakan lifecycle tambahan menemui kenaikan 15 media listeners setiap pusingan tujuh route: 368→383→398→413. Pemeriksaan source GSAP 3.15.0 terpasang menunjukkan `MatchMedia.add()` mendaftarkan listener, manakala teardown konteks tidak membuang listener native tersebut. `responsiveMotion` menggantikan pemilikan listener itu tanpa mengubah dependency atau melakukan patch kepada library. Bukti sebelum pembaikan: [JSON lifecycle asal](astra-lifecycle-before-fix.json). Ini pembaikan berdasarkan ukuran, bukan sekadar andaian daripada code review.

Metodologi kiraan: empat pusingan client navigation, kembali ke Home, kemudian CDP garbage collection dan DOM counters. Test kalkulator memanaskan instrumentation Playwright sebelum membandingkan perubahan berulang. Ujian diagnostik menunjukkan panggilan pertama `waitForFunction(() => true)` sendiri menambah 13 listener (316→329) dan panggilan berikutnya kekal 329; sebab itu kenaikan sekali daripada alat ujian tidak dianggap sebagai kebocoran aplikasi. Kiraan listener/DOM yang stabil merupakan bukti lifecycle terhad, bukan jaminan bahawa setiap jenis heap leak mustahil pada semua browser.

**Keputusan production akhir:** empat pusingan kekal pada **353 event listeners, 348 DOM nodes, satu document**. Perubahan harga berulang selepas warm-up kekal pada **330 listeners**. Tiada runtime pageerror. Kesemua 40 unit tests dan 107 regression checks lulus selepas reconstruction; regression penuh diulang selepas pembaikan lifecycle. Selepas pelarasan terakhir pada background intro, build, capture semua viewport dan 39 focused checks dijalankan semula. Tiada perubahan logic selepas ujian tersebut.

## Fail yang berubah

| Kumpulan | Fail dan tujuan |
|---|---|
| Scene dan layout | `src/components/scene/StudioScene.tsx` (baru), `src/components/layout/Header.tsx`, `Footer.tsx`: primitif komposisi, motion dan navigasi |
| Tujuh view | `src/components/pages/HomeView.tsx`, `ServicesView.tsx`, `PortfolioView.tsx`, `PricingView.tsx`, `CoachingView.tsx`, `AboutView.tsx`, `ContactView.tsx` |
| Style/font | `src/styles/globals.css`, `src/app/layout.tsx`, `public/fonts/`: art direction, responsive layout, licensed local fonts |
| Integrity | `src/app/api/inquiries/route.ts`: had body16KiB, validasi, recompute quote, tiada fake success/PII log; `src/content/projects.ts`: pembetulan description berdasarkan imej |
| Motion lifecycle | `src/lib/motion/responsiveMotion.ts`: native media listener dengan cleanup eksplisit dan scoped GSAP context |
| Aset | `public/assets/optimized/`, `scripts/prepare-astra-assets.cjs`, `docs/qa/astra-asset-manifest.json` |
| Config | `next.config.mjs`, `.gitignore`, `tsconfig.json`, `package.json`: pisahkan build dev/production dan entry point QA |
| Ujian | `tests/e2e/astra-capture.cjs`, `astra-regression.cjs`, `astra-final-checks.cjs` |
| Bukti/dokumentasi | `README.md`, laporan ini, `ASTRA_V2_COMPARISON.html`, `scripts/build-astra-comparison.cjs`, JSON dan screenshot dalam `docs/qa/` |

Pricing engine, harga pakej, kandungan skop servis, original assets dan route structure sedia ada tidak diganti. Komponen lama yang tidak berkaitan tidak dipadam.

## Had yang masih ada

1. Visual sudah mengikut arah dan komposisi tujuh mockup, tetapi **bukan pixel-identical**. Cahaya, bentuk 3D dan tekstur masih mempunyai perbezaan yang dinyatakan dalam jadual.
2. **Email provider belum diintegrasi.** Borang menyediakan email-app handoff selepas validasi; pengguna masih perlu menghantar melalui aplikasi email. Tiada mesej dihantar secara senyap, disimpan atau dilog. Environment keys sahaja tidak cukup untuk mengaktifkan delivery.
3. **Nombor WhatsApp belum dikonfigurasi** dalam local build. CTA disabled dengan penerangan. Laluan WhatsApp dengan nombor sebenar belum diuji; tiada nombor direka.
4. Portfolio menggunakan visual konsep daripada mockup. Pautan laman live dan teknologi projek luaran belum disahkan; tiada dakwaan projek pelanggan berbayar.
5. Pengesahan browser dilakukan dalam Chromium desktop dengan emulasi viewport. Tiada ujian peranti iPhone/Safari sebenar, Lighthouse terkini, analisis frame budget, atau dakwaan universal 60FPS. Tiada dakwaan conversion lift atau ROAS tanpa trafik sebenar.
6. Lint standalone tidak dijalankan kerana repo tidak menyediakan konfigurasi ESLint. Build dan TypeScript lulus; ini tidak dipersembahkan sebagai audit lint penuh.

## Preview local

Preview production akhir: **http://localhost:3461**. Development: **http://localhost:3460**. Proses lama pengguna pada 3002 tidak dihentikan atau diubah; gunakan 3461 untuk versi akhir.

```powershell
Set-Location 'C:\Users\USER\Desktop\studio.syahmiaof.my'
npm run dev -- --port 3460
```

Untuk mengulang production:

```powershell
npm run build
npm start -- --port 3461
```

Dalam terminal lain, dengan production server sedang berjalan:

```powershell
npm test
npm run typecheck
npm run test:e2e
npm run test:e2e:focused
$env:BASE_URL = 'http://localhost:3461'
npm run test:visual -- after
node scripts/build-astra-comparison.cjs
```

Buka `docs/qa/ASTRA_V2_COMPARISON.html` dalam browser untuk review sebelum/selepas. Tiada arahan deployment dijalankan.
