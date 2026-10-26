# ASTRA V2.1 — rekod inpainting

Mod: built-in image_gen; tiada fallback CLI/API key. Semua input ialah tujuh mockup yang diluluskan. Output model bukan pengganti keseluruhan artwork: hanya piksel dalam mask suntingan dikomposit ke sumber asal.

## Arahan reproduksi untuk pass awal

Ini ringkasan arahan pass awal, bukan transkrip verbatim: edit mockup yang dilampirkan menjadi clean background plate. Buang typography Studio, navigation, body copy, harga, label, ikon dan kawalan UI. Kekalkan dimensi, perspektif, pencahayaan, tekstur, seni bina, warna cobalt/neon, karakter, tangan, laptop dan bayang. Isi kawasan teks menggunakan permukaan sekeliling; jangan blur, tambah objek, reka karakter atau ubah komposisi. Kekalkan nombor/monumen 04, 05, 07 dan SYA sebagai seni bina. Bagi Portfolio, kekalkan screenshot di dalam preview projek sebagai imej arkib, tetapi buang caption Studio di luar preview.

| Halaman | Output dipilih | Salinan workspace |
|---|---|---|
| Home | exec-328efc5f-be53-4f37-8d07-74c614fc6f8b.png | design/derived/astra-v21/01-home-inpaint-source.png |
| Services | exec-fbd953fa-2640-4538-a9d0-1600e6c680e6.png | design/derived/astra-v21/02-services-inpaint-source.png |
| Portfolio | exec-53294dcd-33ed-4bbd-a758-9ed049229e0a.png | design/derived/astra-v21/03-portfolio-inpaint-source.png |
| Pricing | exec-64034d64-0e43-46be-9f3b-8c731cd6c3b7.png | design/derived/astra-v21/04-pricing-inpaint-source.png |
| Coaching | exec-f31bad58-68f3-4c22-93be-269112b02733.png | design/derived/astra-v21/05-coaching-inpaint-source.png |
| About | exec-5aba4c9c-68bf-422e-80f2-5f176a374827.png | design/derived/astra-v21/06-about-inpaint-source.png |
| Contact, panel kanan | exec-6b8e63b8-56df-4851-a61b-ebc11deb9aee.png | design/derived/astra-v21/07-contact-inpaint-source.png |
| Contact, kawasan kiri sahaja | exec-4372a4a0-402a-4d76-8058-c83ded958f33.png | design/derived/astra-v21/07-contact-left-inpaint-source.png |

Pass pembetulan Contact exec-811a5dc8-3efc-45bf-842b-26295ec514ab.png tidak dipakai dalam hasil akhir kerana masih mencipta sambungan konkrit di bawah headline.

## Prompt tepat untuk pembetulan Contact terakhir

Edit target: the attached approved website mockup. Produce a clean background plate by erasing ONLY the website UI lettering and controls: all header/footer text, all left label/headline/body/button, all right panel lettering/form boxes/icons/button/divider. CRITICAL LEFT REGION: the entire rectangle x=55 to 640, y=140 to 655 must be dark charcoal/BLACK industrial wall, matching the visible black textured wall immediately above and left. Do NOT invent the pale concrete left side of a 0 underneath the erased headline. The original visible concrete 07 starts around x=650; keep that original visible boundary at x=650 and beyond exactly as shown. Behind the big original headline there is black negative space. Keep the original visible blue diagonal beam, yellow arrow, floor reflections, right black tilted board and concrete 07. No new objects. No letters other than the sculptural 07. Keep texture sharp and original perspective, colors, light and image dimensions. Inpaint the text regions with their adjacent surface, no blur, no rectangular seams. This is a restoration of this exact composition, not a redesign.

## Komposit deterministik

`scripts/prepare-astra-v21.cjs` menyenaraikan koordinat mask. Persegi menggunakan feather 4 px pada pinggir; polygon caption menggunakan mask khusus. Piksel di luar mask diambil daripada original tanpa perubahan pada master PNG. Header/footer baked dicrop keluar. WebP quality 96 dihasilkan daripada master; Next.js menghantar variant quality 95.

Bagi Contact, output pembetulan terakhir hanya menjadi sumber inpaint untuk x < 800; panel kanan menggunakan output pertama. Kedua-duanya tetap terhad kepada mask. Tiada wajah atau karakter baru dipakai.
