# Audit perjalanan pelanggan — 27 Oktober 2026

## Skop dan bukti

- Build produksi tempatan diuji di `http://127.0.0.1:3461` dengan Playwright Chromium pada 1440×900 dan mobile 390×844. Skrip ulangan: `tests/e2e/client-journey-audit.cjs`.
- Kesemua 19 kumpulan semakan perjalanan lulus selepas pertukaran borang ke WhatsApp, termasuk borang pada mobile; tiada ralat halaman browser. Sebanyak 45 ujian unit, typecheck, lint dan build produksi turut lulus.
- Sebanyak 46 URL portfolio/contact disemak format pautannya tanpa membuka servis luar. Audit ini tidak mengesahkan laman luar tersebut masih aktif.
- Borang sintetik menghasilkan URL `wa.me/60107965236` dengan nama, contact, servis dan butiran projek yang diisi. Ujian menangkap URL sebelum tab luar dibuka; tiada pertanyaan pelanggan sebenar, mesej WhatsApp, bayaran atau perubahan portfolio dihantar.
- Tiga pertanyaan API MIBOT diuji: harga website dijawab daripada FAQ, Nemo dijawab dengan caveat status live, dan cadangan website kedai makan menggunakan maklumat servis serta harga studio. Soalan jaminan jualan dijawab tanpa jaminan palsu.

## Dibaiki dalam audit

1. CTA coaching sebelum ini kehilangan `service=coaching` ketika ke Contact. Ringkasan pakej hilang dan borang kembali ke Website UI. CTA berkonteks kini mengemas kini URL dan scroll ke Contact tanpa refresh halaman.
2. MIBOT hanya tahu FAQ jualan. Sebab itu Gemini menjawab “siapa syahmi” dengan penafian generik walaupun jawapannya ada di seksyen Tentang. Pengetahuan yang diluluskan kini meliputi bio Syahmi, harga website umum dan servis studio. Soalan ini dijawab terus sebelum model dipanggil.
3. Sapaan MIBOT sebelum ini berputar setiap beberapa saat. Kini ia muncul sekali bagi setiap sesi browser. Soalan cadangan kekal selepas satu jawapan, manakala ringkasan projek ada butang ubah servis, ubah pakej dan batal.
4. Footer chat kini menyatakan apabila mod FAQ + AI aktif, bukan melabelkannya sebagai FAQ sahaja.
5. Borang Contact kini menyediakan draf WhatsApp berformat, termasuk pakej, add-on, penjagaan, coaching atau rujukan projek apabila dipilih. Pengunjung masih perlu tekan Hantar di WhatsApp. Pautan buka semula dipaparkan jika tab luar disekat.
6. MIBOT kini membekalkan konteks servis, portfolio dan proses contact kepada model. Soalan harga tetap dijawab oleh data harga studio, manakala soalan bebas menggunakan Gemini apabila provider tersedia. Had panggilan diselaraskan untuk perbualan sebenar.
7. Fallback password admin dan token tulis portfolio dibuang daripada kod. Password admin dan token baharu diset dalam Vercel environment; polisi RLS Supabase telah diputar kepada hash token baharu. Login admin dan bacaan 23 projek daripada Supabase disahkan pada preview produksi tempatan.

## Geseran client yang masih ada

| Keutamaan | Pemerhatian | Kesan |
| --- | --- | --- |
| P1 | Pengunjung masih perlu tekan Hantar dalam WhatsApp selepas borang disiapkan. | Ini sifat pautan `wa.me`; ukur kadar klik dan pertanyaan diterima untuk melihat sama ada ada yang berhenti pada langkah ini. |
| P2 | Borang Contact dan ringkasan projek MIBOT meminta maklumat hampir sama. Kedua-duanya kini ke WhatsApp. | Dua titik mula ini boleh membantu client berbeza, tetapi jejak kadar siap setiap satu sebelum menyatukannya. |
| P2 | Butang pemilik “Urus projek” muncul dalam portfolio awam. | Pelawat boleh menyangkanya sebahagian showcase. Ia dikekalkan kerana pemilik memang meminta akses melalui password gate di sini. |
| P2 | Intro lima saat melambatkan paparan tawaran pada lawatan pertama. | Butang skip berfungsi, tetapi kadar keluar lawatan pertama perlu diukur sebelum mengubah tempoh yang diluluskan pemilik. |
| P3 | Panel MIBOT tinggi dan banyak ruang transkrip kosong semasa mula dibuka. | Pada mobile ia boleh terasa kurang seperti perbualan walaupun muat viewport. Mockup visual tidak dirombak dalam audit fungsi ini. |

## Had pengesahan

- Ini audit preview produksi tempatan; deployment live belum disahkan.
- FAQ MIBOT masih dibatasi maklumat yang diluluskan. Ia tidak tahu fakta peribadi, projek atau komersial yang tiada dalam konteks itu.
- Respons model boleh berubah dan bergantung pada provider; semakan API ini ialah sampel tempatan, bukan jaminan setiap ayat akan sempurna.
- Suite sejarah `tests/e2e/v34-assistant.cjs` tidak mewakili keputusan reka bentuk semasa: ia masih mengandaikan artwork bahagian atas Portfolio telah dibuang. Suite itu gagal pada assertion lama tersebut dan tidak digunakan sebagai bukti lulus untuk perubahan ini.
- Tiada analytics produksi digunakan di sini. Kesan conversion di atas ialah hipotesis, bukan kadar yang telah diukur.
