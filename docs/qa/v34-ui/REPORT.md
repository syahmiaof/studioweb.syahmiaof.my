# SYAHMIAOF Studio V3.4 — UI/UX Refinement QA

**Tarikh:** 26 Oktober 2026  
**Status:** siap untuk semakan local  
**Preview:** http://127.0.0.1:3461  
**Deployment / push:** tiada

## Sambungan V3.4.1 — pembetulan portfolio

- Susun atur portfolio asal dikembalikan: art plate, tajuk “IDEAS MADE REAL”, tiga project plane dan controls dikekalkan. Panel detail hitam yang memaparkan “SYMI UI / CONCEPT DEMO” sahaja diganti dengan showcase 23 rekod Nemo.
- Semua 20 pautan live yang tersedia menghasilkan preview WebP tempatan; halaman tak lagi memanggil Microlink atau Thum.io semasa pelawat membuka portfolio. Tiga rekod tanpa pautan kekal dengan fallback teks yang jelas.
- “Tambah projek” membuka borang owner. Password diperiksa pada API server, sesi menggunakan cookie `HttpOnly`/`SameSite=Strict` selama lapan jam, cubaan password dihadkan, dan projek baharu disimpan ke Supabase `public.portfolio_projects`.
- Database Supabase `studio.syahmiaof.my` kini mempunyai 23 rekod awal: 20 dengan URL live, 3 tanpa URL. RLS membenarkan bacaan portfolio awam; insert hanya lulus apabila API menghantar token rawak server-only yang hash-nya dipadankan oleh policy. Tiada service-role key digunakan oleh aplikasi.
- API `/api/projects` membaca senarai terus dari Supabase. Aliran owner telah diuji pada preview: unlock berjaya, projek ujian mendapat HTTP 201 dan muncul sebagai rekod ke-24; rekod ujian kemudian dipadam, jumlah akhir kekal 23.
- **Sebelum deploy:** tetapkan `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_WRITE_TOKEN` dan `PORTFOLIO_ADMIN_PASSWORD` dalam environment hosting. Token tulis dan password mesti kekal server-only. Tiada deploy/push dibuat.
- MIBOT, bahasa, dan WhatsApp tidak diubah dalam patch sambungan ini.

**Bukti visual sambungan:** [Portfolio asal dipulihkan](after/portfolio-top-restored.png) · [Panel hitam diganti showcase](after/portfolio-showcase-panel.png)

**Semakan sambungan:** `npm run lint`, `npm run build`, dan `npm run typecheck` lulus. Security advisor tiada finding. Performance advisor memberi satu warning init-plan pada polisi header token; polisi itu hanya menilai satu rekod ketika insert. Semakan E2E terdahulu tidak diulang selepas V3.4.1.

## Sambungan V3.4.2 — intro dan akses owner

- Artwork intro baru disimpan sebagai `public/assets/studio-intro.webp`. Overlay BM/EN/Cina memaparkan sambutan 5 saat, progress bar, butang masuk untuk skip, dan transition GSAP menolak panel ke atas untuk reveal homepage. Intro hanya muncul sekali setiap tab/session; jika reduced motion aktif, ia terus ke homepage.
- Password owner dalam env local memang sepadan dengan nilai yang pernah diberi. Punca unlock gagal ialah semakan origin membandingkan browser `127.0.0.1` dengan origin Next yang dinormalkan sebagai `localhost`, lalu API pulangkan 403 sebelum password diperiksa. Semakan kini padankan Origin dengan Host sebenar, dan cookie `Secure` hanya aktif melalui HTTPS.
- Password salah kini pulangkan mesej `HAHAHAHA password kau salah`. Browser verification pada preview sahkan mesej itu muncul, password betul unlock, projek ujian tersimpan ke Supabase dan boleh dibaca semula; rekod ujian dipadam selepas semakan.
- **Bukti visual:** [Intro desktop](after/intro-welcome-desktop.png) · [Homepage selepas intro](after/intro-home-desktop.png) · [Intro mudah alih 390px](after/intro-welcome-mobile-390.png)
- **Semakan V3.4.2:** `npm run typecheck`, `npm run lint`, dan `npm run build` lulus. Aliran browser di `127.0.0.1:3461` berjaya dari intro hingga simpan projek.

## Perubahan yang siap

- Assistant kini beridentiti **MIBOT**, menggunakan robot SVG, blink mata ringan, greeting bubble sekali setiap sesi dan panel chat yang boleh dibuka daripada bubble atau launcher.
- Greeting dan launcher dikekang pada reduced motion; dialog menyokong Escape, pulangan fokus, quick actions dan ringkasan WhatsApp yang hanya dibuka selepas klik pengguna.
- Nav active indicator mengikut seksyen aktif; switch BM / EN / 中文 mengekalkan seksyen dan query semasa.
- Route `/zh` menggunakan Simplified Chinese untuk navigasi, hero, servis, harga, portfolio, coaching, contact dan MIBOT. Nama produk/jenama, React/Next.js, WhatsApp dan amaun RM dikekalkan.
- Hero mengekalkan plate artwork asal. CTA diberi jarak tambahan, label coaching dipaparkan, dan typewriter humor menyediakan 10 baris dalam BM, EN dan Cina dengan kawalan pause/next serta sokongan reduced motion.
- Nombor WhatsApp lalai disimpan sebagai `60107965236` daripada nombor yang diberi; teks pertanyaan boleh disunting dan tiada mesej dihantar secara automatik.

## Bukti visual

- [Hero desktop Cina 1440px](after/home-desktop-1440-zh-Hans.png)
- [Hero mudah alih Cina 390px](after/home-mobile-390-zh-Hans.png)
- [Greeting MIBOT desktop](after/mibot-greeting-desktop-ms.png)
- [Panel MIBOT mudah alih Cina](after/assistant-open-mobile-390-zh-Hans.png)
- [Halaman penuh desktop Cina](after/fullpage-desktop-1440-zh-Hans.png)
- [Keputusan V3.4 E2E dan senarai screenshot](after/e2e-results.json)
- [Keputusan regression V3.3](../v33/after/e2e-results.json)

## Pengesahan

| Semakan | Keputusan |
|---|---|
| `npm run typecheck` | Lulus |
| `npm run lint` | Lulus, tiada warning ESLint |
| `npm test` | Lulus, 37 ujian dalam 4 fail |
| `npm run build` | Lulus; `/zh` dijana sebagai route statik |
| V3.3 `npm run test:e2e` | Lulus: 50 semakan fungsi, 8 semakan responsive, 0 ralat runtime |
| V3.4 `npm run test:e2e:v34` | Lulus: 71 semakan fungsi, 20 semakan responsive, 33 screenshot, 0 ralat runtime |
| Viewport | Tiada horizontal overflow pada 1440, 1024, 768, 390 dan 375px dalam BM/EN/Cina |
| Perbandingan artwork | Tujuh seksyen kekalkan plate rujukan V2.1 yang sepadan |

## Had yang disahkan

- MIBOT kekal dalam mod FAQ sahaja; fallback AI provider dimatikan dan request ujian menerima HTTP 503 seperti dikonfigurasi.
- API pertanyaan terus belum diaktifkan; borang menyatakan had itu dan menyediakan aliran email. WhatsApp membuka ringkasan melalui aplikasi selepas klik, bukan menghantar sendiri.
- Detector visual manual terkini memberi tiga warning sedia ada pada fallback font, gradient teks dan transisi lebar indicator. Style tersebut dikekalkan kerana berasal daripada sistem visual incumbent.

