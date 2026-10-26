const fs=require('node:fs');
const a=JSON.parse(fs.readFileSync('docs/qa/astra-v21/source-integrity.json'));
const table=a.plates.map(p=>`| ${p.source.split('/').pop()} | ${p.originalFile.split('/').pop()} | ${p.width} × ${p.height} | ${(p.sourceBytes/1024).toFixed(0)} KiB | ${(p.targetBytes/1024).toFixed(0)} KiB |`).join('\n');
const originals=a.originals.map(p=>`| ${p.file.split('/').pop()} | ${p.width} × ${p.height} | ${(p.bytes/1024).toFixed(0)} KiB | ${p.alpha?'Ya':'Tidak'} |`).join('\n');
const derivatives=a.derivatives.map(p=>`| ${p.file.split('/').pop()} | ${p.width} × ${p.height} | ${(p.bytes/1024).toFixed(1)} KiB |`).join('\n');
const report=`# ASTRA V2.1 — audit visual dan fungsi

26 October 2026 · Local production preview: http://localhost:3461 · Tiada deployment.

- Ketujuh-tujuh komposisi utama kini menggunakan artwork diluluskan sebagai asas; headline, label, harga, CTA, form dan navigation ialah HTML/React.
- 40 unit tests, 107 regression checks, 39 focused checks dan 18 production checks lulus. Sembilan keadaan layout Contact turut diperiksa selepas pembaikan tinggi dinamik.
- 35 kombinasi viewport biasa dan 14 kombinasi DPR 2 dicapture melalui Chromium. Tiada overflow halaman, harga servis terpotong, imej yang kelihatan gagal dimuatkan atau page error dalam set akhir.
- Ini bukan dakwaan pixel-perfect keseluruhan halaman. Font live, kawasan inpaint, beberapa metrik kawalan dan sambungan Home di bawah hero masih berbeza daripada bitmap rujukan.

## 1. Bukti sebelum / selepas

Buka [perbandingan interaktif tujuh halaman](ASTRA_V21_COMPARISON.html). Pilih 1672×941 untuk framing rujukan, atau salah satu empat viewport wajib. Toggle halaman penuh untuk menyemak kandungan di bawah fold. Klik screenshot untuk saiz asal.

- [Checkpoint sebelum](astra-v21/before/): V2, 7 halaman × 4 viewport × viewport/full-page.
- [Selepas V2.1](astra-v21/after/): 7 halaman × 5 viewport × viewport/full-page.
- [DPR 2](astra-v21/high-density/): 7 halaman × 2 viewport × viewport/full-page.
- [Keadaan kod V2 yang boleh dipulihkan](astra-v21/source-v2-checkpoint.zip).
- Iteration 1, 2 dan 3 disimpan dalam folder audit untuk menunjukkan kitaran pembaikan. Checkpoint V2 tiada screenshot 1672×941; comparison melabel fallback 1440×900 dengan jelas.

## 2. Rujukan tepat dan pemeriksaan sumber

| Rujukan canonical | Fail asal | Resolusi | Saiz asal | Plate WebP |
|---|---|---|---:|---:|
${table}

Semua 7 canonical references dipadankan melalui SHA256 dengan original. Kesemua 13 PNG di design/originals sepadan byte-for-byte dengan salinan design/incoming. Tiada sumber approved yang lebih besar ditemui dalam inventori projek ini. [Rekod lengkap hash dan alpha](astra-v21/source-integrity.json).

| Original PNG | Resolusi sebenar | Saiz | Alpha |
|---|---|---:|---|
${originals}

Enam PNG cutout dikekalkan. Untuk komposisi utama, karakter sudah berada dalam artwork approved, jadi tidak ditampal dengan karakter berasingan. Ini mengekalkan pose, skala, shadow, rambut dan laptop asal. Cutout creator sedia ada masih digunakan pada teaser Coaching di bahagian bawah Home.

## 3. Aset yang diekstrak / diubah

Semua runtime derivative berada di public/assets/astra-v21/:

| Aset | Resolusi | Saiz |
|---|---|---:|
${derivatives}

Jumlah 17 derivative: **${(a.totalDerivativeBytes/1024/1024).toFixed(2)} MiB**. Ini jumlah fail semua halaman, bukan payload setiap lawatan.

Setiap halaman juga mempunyai clean-master.png, edit-mask.png dan inpaint-source.png di design/derived/astra-v21/. Contact mempunyai satu sumber inpaint tambahan untuk kiri. Master PNG lossless dan mask disimpan untuk audit dan regenerasi. [Manifest koordinat mask](astra-v21/asset-manifest.json), [skrip penyediaan](../../scripts/prepare-astra-v21.cjs), [rekod prompt](astra-v21/INPAINT_PROMPTS.md).

## 4. Cara teks baked dibuang

1. Header/footer baked dicrop keluar; navigation dan footer diganti dengan HTML.
2. Kawasan headline, copy, caption, harga, form, ikon dan CTA ditandakan sebagai rectangle/polygon pada kanvas asli. Mask merangkumi UI, bukan hanya glyph.
3. Built-in image_gen digunakan untuk localized background reconstruction. Hasil model tidak digunakan terus sebagai artwork halaman. Hanya piksel di dalam mask diterima; sumber asal digunakan di luar mask. Rectangle mempunyai feather 4 px untuk menyambung pinggir, tanpa blur besar.
4. Audit raw RGB mengesahkan **0 piksel berbeza di luar mask** bagi semua tujuh master PNG. Ini bukti preservation, bukan peratus visual similarity. WebP berikutnya ialah kompresi lossy, jadi jaminan byte/pixel-identical ini khusus kepada master PNG.
5. Contact memerlukan pembetulan tambahan: pass awal mencipta sambungan konkrit 0 di belakang headline. Hasil akhir menggunakan inpaint kiri yang memulihkan ruang hitam. Panel kanan menggunakan pass awal yang lebih sesuai dengan tekstur board.
6. Semua teks Studio dibina semula melalui HTML. Nombor monumen 04/05/07 dan bentuk SYA ialah artwork dekoratif. Teks di dalam screenshot portfolio kekal sebagai kandungan thumbnail arkib; ia bukan kawalan Studio atau bukti laman live.

Kawasan yang asalnya tertutup teks tidak mempunyai ground truth tanpa teks. Inpainting ialah rekonstruksi yang boleh berbeza daripada tekstur tersembunyi asal, bukan pemulihan yang dapat dibuktikan.

## 5. Hasil perbandingan visual

| Halaman | Tiga pembaikan utama | Perbezaan yang tinggal |
|---|---|---|
| Home | Scene approved dan seated character digunakan terus; kedudukan headline/CTA diselaraskan; tulisan kecil di seni bina dijadikan HTML | Font dan navigation berbeza sedikit. Kandungan bawah hero mengekalkan sambungan V2, bukan strip teaser tepat dalam mockup |
| Services | Character/geometry asal; panel harga live pada koordinat asal; tablet width 66% dibuang supaya RM3,250 tidak terpotong | Ikon dan glyph live berbeza sedikit |
| Portfolio | Perspective asal; baked caption dibersihkan; hit area, selection, hash dan butiran projek live | Perspective thumbnail dikekalkan pada mobile; teks dalam thumbnail bersifat arkib |
| Pricing | Plate 04 asal; UI live diselaraskan; bar putih di belakang body copy dikekalkan untuk contrast | Default RM1,745 tanpa addon dikekalkan; rujukan RM2,145 mempunyai addon animation aktif. Sudut/spacing kawalan tidak sama setiap piksel |
| Coaching | Scene 05 dan character asal; tiga baris headline dirapatkan; intro tidak lagi bertindih panel | Nota sebenar harga/jadual menambah sedikit kandungan |
| About | Pose dan laptop asal; headline tidak melanggar bio; annotation live di sisi paha | Line break, font dan ikon berbeza kecil |
| Contact | Ruang hitam kiri dibetulkan; gap berganda form dibuang; layout mengembang ikut quote/error/fallback | Copy status sebenar berbeza daripada mockup; UI memakai skew yang seragam, sedangkan perspektif asal lebih kompleks |

Semakan dilakukan pada kanvas 1672×941 (Contact asal 1671×941), kemudian 1440×900, 1920×1080, 768×1024 dan 390×844. Geometry, muka, pose dan objek utama mudah dikenal pasti sebagai artwork yang sama. Tiada skor persamaan numerik direka.

## 6. Responsive dan sharpness QA

- [35 hasil biasa](astra-v21/after/results.json): 7 halaman pada 5 viewport; HTTP 200, tiada horizontal overflow, tiada clipped service prices, tiada visible broken images atau runtime error.
- [14 hasil DPR 2](astra-v21/high-density/results.json): 1440×900 dan 390×844 pada deviceScaleFactor 2. Screenshot fizikal ialah 2880×1800 dan 780×1688.
- Tablet/mobile menggunakan crop artwork yang sama selepas kandungan live; wajah tidak dipotong dan karakter tidak diregangkan. Form, pilihan pricing/coaching dan navigation kekal dalam flow.
- Texture konkrit mobile lama 180×95 yang dibesarkan diganti crop 640×460 daripada master yang dibersihkan. Tiada filter blur pada hero.
- [Crop muka DPR 2 pada piksel 100%](astra-v21/inspection/home-face-dpr2-100percent.png) menunjukkan had detail raster; [crop typography DPR 2](astra-v21/inspection/about-type-dpr2-100percent.png) menunjukkan glyph HTML yang tajam.
- Next Image digunakan dengan dimensions/sizes dan quality 95; plate eksport quality 96. Sumber 1672 px tidak mengandungi detail 4K. Pada desktop DPR 2 artwork lebih lembut daripada HTML, walaupun tiada stretching aspect ratio.
- Pengesanan broken image mengambil kira imej yang dirender. Thumbnail mobile yang display:none pada desktop boleh mempunyai naturalWidth dibundarkan ke 0 oleh density srcset; itu bukan kegagalan HTTP. Semua thumbnail dirender dan diperiksa pada mobile.

Browser: Chromium desktop dengan viewport/device-density emulation. Safari/iPhone fizikal dan browser lain belum diuji.

## 7. Fungsi dan motion

| Semakan | Hasil | Bukti |
|---|---|---|
| npm test | 40 / 40 lulus | pricing, inquiry, adversarial pricing suites |
| npm run typecheck | Lulus | TypeScript tanpa emit |
| npm run build | Lulus | 18 static pages generated; API dinamik |
| Regression browser | 107 lulus | [JSON](astra-v21/regression-results.json) |
| Focused lifecycle / state | 39 lulus | [JSON](astra-v21/focused-results.json) |
| Production smoke/render | 18 lulus | [JSON](astra-v21/production-performance.json) |
| Contact layout | 9 keadaan muat dalam scene | [JSON](astra-v21/contact-state-layout.json) |

Harga kekal Landing RM645, Business RM1,745, Premium RM2,995, Full-Stack dari RM3,250; addons RM400/RM250. Business + animation RM2,145, kedua-dua addons RM2,395. URL handoff, deduplication addons, spoofed total rejection, BM/EN persistence, coaching topic/duration dan gallery hash/previous/next diuji.

Empty/invalid form, oversized payload, malformed JSON dan unavailable delivery diuji. Borang valid mengembalikan HTTP 503 dengan success:false dan email-app fallback. Tiada email provider adapter atau nombor WhatsApp sebenar dikonfigurasi; tiada penghantaran sebenar dibuat atau didakwa. Pengguna masih perlu menghantar melalui aplikasi emel. Pautan laman projek live belum disahkan.

GSAP masked headline reveal, staggered controls, lower-section scroll reveal, pricing count-up dan micro-interactions dikekalkan. Artwork utama statik dengan entrance opacity ringan supaya tidak kabur. Native scroll dan reduced motion dihormati. Empat kitaran navigation menunjukkan 338 DOM nodes dan 363 listeners yang stabil; pricing listeners 336 sebelum/selepas updates. Heap sample berubah, jadi ini bukan bukti bahawa semua jenis memory leak mustahil. [Screenshot normal/reduced motion](astra-v21/motion/).

Lint standalone tidak dijalankan kerana repo tiada konfigurasi ESLint lengkap; build/typecheck bukan dakwaan audit lint menyeluruh.

## 8. Performance dan saiz

- Tujuh desktop plates: kira-kira 277–468 KiB setiap satu; enam crop mobile 154–338 KiB. Thumbnail 41–106 KiB. Jumlah semua 17 asset 4.28 MiB.
- Build melaporkan first-load JavaScript kira-kira 156–175 kB mengikut route, shared 87.3 kB.
- 14 sampel local production, fresh browser context per route, optimized image cache sudah warm, tanpa network/CPU throttling: LCP 124–384 ms; CLS tertinggi sekitar 0.0078; resource transfer 565–843 KiB; imej sekitar 232–479 KiB.
- Angka ini sampel makmal localhost, bukan field Core Web Vitals atau prestasi internet sebenar. Tiada Lighthouse score, INP sebenar atau jaminan 60 fps didakwa. Tiada conversion lift diukur tanpa trafik.

## 9. Batas akhir dan cara semak

Had utama ialah font live yang tidak sama dengan raster rujukan, detail asal 1672 px, tekstur rekonstruksi dalam mask, UI perspektif yang disederhanakan, serta continuation Home di bawah hero. Perbezaan ini boleh dilihat terus dalam comparison; tiada label pixel-perfect digunakan.

Preview production: http://localhost:3461. Server pengguna pada port 3002 tidak disentuh. Tiada arahan deploy, push atau perubahan pada portfolio peribadi berasingan dilakukan.

Untuk ulang QA:

~~~powershell
npm test
npm run typecheck
npm run build
npm start -- --port 3461
# Terminal lain:
$env:BASE_URL = 'http://localhost:3461'
node tests/e2e/astra-regression.cjs
node tests/e2e/astra-final-checks.cjs
node tests/e2e/astra-v21-production.cjs
node tests/e2e/astra-v21-contact-layout.cjs
node tests/e2e/astra-v21-capture.cjs after
$env:DPR = '2'
$env:WIDTHS = '1440,390'
node tests/e2e/astra-v21-capture.cjs high-density
node scripts/audit-astra-v21-assets.cjs
node scripts/build-astra-v21-comparison.cjs
~~~
`;
fs.writeFileSync('docs/qa/ASTRA_V21_VISUAL_AUDIT.md',report);
console.log('V2.1 report written');
