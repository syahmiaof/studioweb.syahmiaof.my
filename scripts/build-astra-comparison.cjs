const fs = require("node:fs");
const pages = [
  [
    "01-home",
    "Home",
    "Komposisi kiri/kanan dibina semula: headline besar, karakter duduk asal, monumen SYA, anak panah dan enam bab teaser.",
    "Struktur SYA dan bayang CSS lebih ringkas daripada seni bina fotorealistik mockup; tinggi hero disesuaikan supaya aliran halaman terus kelihatan.",
  ],
  [
    "02-services",
    "Services",
    "Kanvas konkrit cerah, dua panel servis dan karakter laptop berdiri menggantikan layout hitam lama.",
    "Bentuk beam, pencahayaan dan butiran konkrit masih berbeza; panel disusun menegak pada mobile.",
  ],
  [
    "03-portfolio",
    "Portfolio",
    "Tiga panel projek berperspektif, pilihan projek dan kawalan sebelumnya/seterusnya berfungsi.",
    "Preview ialah crop visual mockup, bukan screenshot laman live; perspektif imej asal masih kelihatan. Mobile menggunakan susunan menegak.",
  ],
  [
    "04-pricing",
    "Pricing",
    "Monumen 04 daripada crop seni bina yang diluluskan, console hitam besar, radio/toggle sebenar dan harga berpusat.",
    "Saiz dan sudut console diubah mengikut viewport. Tajuk English dikecilkan sedikit supaya tidak bertindih.",
  ],
  [
    "05-coaching",
    "Coaching",
    "Karakter creator duduk, monumen 05, reben biru/kuning serta pilihan topik dan durasi yang dibawa ke borang.",
    "Monumen CSS dan arah cahaya lebih ringkas. Karakter diletakkan selepas kawalan pada mobile.",
  ],
  [
    "06-about",
    "About",
    "Kanvas cerah, karakter pointing, laptop terapung berasingan, latar fakta dan CTA dibina semula.",
    "Susunan beam dan laptop diselaraskan pada tablet/mobile; karakter dilabel visual jenama rekaan.",
  ],
  [
    "07-contact",
    "Contact",
    "Komposisi dua bahagian, monumen 07, anak panah, label borang dan error yang boleh diakses.",
    "Console disesuaikan untuk teks status sebenar: penghantaran terus belum aktif dan WhatsApp belum dikonfigurasi.",
  ],
];
const html = `<!doctype html>
<html lang="ms"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ASTRA V2 — Perbandingan visual</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#111;color:#eee;font:16px/1.55 system-ui,sans-serif}header{padding:40px max(24px,4vw);background:#eaff00;color:#111}h1{font-size:clamp(28px,4vw,56px);line-height:1.1;margin:8px 0}header p{max-width:850px}a{color:inherit;text-underline-offset:4px}nav{position:sticky;top:0;z-index:2;background:#202020;padding:14px 4vw;display:flex;gap:16px;align-items:center;flex-wrap:wrap;border-bottom:1px solid #555}select{background:#eee;color:#111;font:inherit;padding:8px}main{padding:24px 4vw}section{padding:24px 0 48px;border-bottom:1px solid #444}h2{font-size:30px;margin:8px 0}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}figure{margin:0;background:#222;padding:12px}figcaption{font-size:14px;margin-bottom:10px}figure img{display:block;width:100%;height:auto}.note{display:grid;grid-template-columns:1fr 1fr;gap:24px}p{max-width:1100px}.muted{color:#bbb}footer{padding:24px 4vw}button{font:inherit;cursor:pointer}@media(max-width:900px){.grid,.note{grid-template-columns:1fr}nav{position:static}}
</style>
<header><span>LOCAL REVIEW · 26 OCT 2026</span><h1>ASTRA V2 / Bukti visual</h1><p>Tujuh rujukan asal berbanding screenshot browser sebelum dan selepas reconstruction. Pilih viewport; klik imej untuk melihat resolusi asal. Tiada skor persamaan rekaan.</p><a href="ASTRA_V2_VISUAL_AUDIT.md">Laporan audit penuh</a></header>
<nav><label for="viewport">Viewport screenshot</label><select id="viewport"><option>1440x900</option><option>1920x1080</option><option>768x1024</option><option>390x844</option></select><span class="muted">Rujukan asal kekal desktop. Mobile ialah adaptasi.</span></nav>
<main>${pages.map(([slug, title, change, limit]) => `<section id="${slug}"><h2>${title}</h2><div class="grid"><figure><figcaption>RUJUKAN DILULUSKAN</figcaption><a href="../../design/references/${slug}.png"><img loading="lazy" src="../../design/references/${slug}.png" alt="Rujukan ${title}"></a></figure>${["before", "after"].map((phase) => `<figure data-phase="${phase}" data-slug="${slug}"><figcaption>${phase === "before" ? "SEBELUM" : "SELEPAS"} · <span class="size">1440x900</span> · <a class="full" href="screenshots/astra-v2/${phase}/1440x900/${slug}-full.png">Halaman penuh</a></figcaption><a class="shot" href="screenshots/astra-v2/${phase}/1440x900/${slug}.png"><img loading="lazy" src="screenshots/astra-v2/${phase}/1440x900/${slug}.png" alt="${phase} ${title}"></a></figure>`).join("")}</div><div class="note"><p><strong>Dibaiki:</strong> ${change}</p><p class="muted"><strong>Perbezaan yang tinggal:</strong> ${limit}</p></div></section>`).join("")}</main>
<footer>Chromium · device scale 1 · reduced motion untuk capture yang konsisten. Normal motion dan reverse scroll diuji berasingan. Screenshot bukan bukti penghantaran email atau deployment.</footer>
<script>document.querySelector('#viewport').addEventListener('change',function(){document.querySelectorAll('figure[data-phase]').forEach(figure=>{const stem='screenshots/astra-v2/'+figure.dataset.phase+'/'+this.value+'/'+figure.dataset.slug;figure.querySelector('img').src=stem+'.png';figure.querySelector('.shot').href=stem+'.png';figure.querySelector('.full').href=stem+'-full.png';figure.querySelector('.size').textContent=this.value})});</script></html>`;
fs.writeFileSync("docs/qa/ASTRA_V2_COMPARISON.html", html);
console.log(
  "Generated seven-page comparison: docs/qa/ASTRA_V2_COMPARISON.html",
);
