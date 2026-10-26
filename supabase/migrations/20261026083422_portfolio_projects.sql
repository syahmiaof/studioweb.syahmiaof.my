create table public.portfolio_projects (
  id text primary key check (id ~ '^[a-z0-9-]{1,90}$'),
  slug text not null unique check (slug ~ '^[a-z0-9-]{1,90}$'),
  title text not null check (char_length(btrim(title)) between 2 and 100),
  category_ms text not null check (char_length(btrim(category_ms)) between 2 and 140),
  category_en text not null check (char_length(btrim(category_en)) between 2 and 140),
  category_zh text not null check (char_length(btrim(category_zh)) between 2 and 140),
  status text not null check (status in ('completed', 'in-progress', 'on-hold')),
  live_url text check (live_url is null or live_url ~* '^https?://'),
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index portfolio_projects_sort_order_idx
  on public.portfolio_projects (sort_order, created_at, id);

alter table public.portfolio_projects enable row level security;

grant usage on schema public to anon, authenticated;
grant select on table public.portfolio_projects to anon, authenticated;
grant select, insert, update, delete on table public.portfolio_projects to service_role;

create policy "Public portfolio projects are readable"
  on public.portfolio_projects
  for select
  to anon, authenticated
  using (true);

insert into public.portfolio_projects (
  id, slug, title, category_ms, category_en, category_zh, status, live_url, sort_order
)
select
  item.id, item.slug, item.title, item.category_ms, item.category_en, item.category_zh,
  item.status, item.live_url, item.sort_order
from jsonb_to_recordset(
  $projects$[
    {"id":"sakura-store","slug":"sakura-store","title":"Sakura Store","category_ms":"E-dagang · Kedai","category_en":"E-Commerce · Store","category_zh":"电子商务 · 商店","status":"completed","live_url":"https://sakurastore.syahmiaof.my","sort_order":0},
    {"id":"uber-pokmi","slug":"uber-pokmi","title":"Uber Pokmi","category_ms":"UI Frontend · Aplikasi perjalanan","category_en":"Frontend UI · Ride App","category_zh":"前端界面 · 出行应用","status":"completed","live_url":"https://uberpokmi.syahmiaof.my","sort_order":1},
    {"id":"ayam-gepuk-pokmi","slug":"ayam-gepuk-pokmi","title":"Ayam Gepuk Pokmi","category_ms":"UI Frontend · Makanan & minuman","category_en":"Frontend UI · Food & Beverage","category_zh":"前端界面 · 餐饮","status":"completed","live_url":"https://ayamgepukpokmi.syahmiaof.my","sort_order":2},
    {"id":"sistem-aduan-asrama","slug":"sistem-aduan-asrama-ikm-besut","title":"Sistem Aduan Asrama IKM Besut","category_ms":"Sistem web · Pengurusan","category_en":"Web System · Management","category_zh":"网站系统 · 管理","status":"completed","live_url":"https://sistemaduanasrama.syahmiaof.my","sort_order":3},
    {"id":"nurizmabridal","slug":"nurizmabridal","title":"Nurizmabridal","category_ms":"Servis pengantin & inai","category_en":"Bridal & Henna Service","category_zh":"新娘与海娜服务","status":"completed","live_url":"https://henna.nurizmabridal.my","sort_order":4},
    {"id":"gayongx-platform","slug":"gayongx-platform","title":"GayongX — Website, Account & CMS","category_ms":"Platform web Silat Gayong","category_en":"Silat Gayong Web Platform","category_zh":"Gayong 武术网站平台","status":"on-hold","live_url":"https://gayongx.syahmiaof.my","sort_order":5},
    {"id":"gayongx-warisan","slug":"gayongx-warisan","title":"Game GayongX: WARISAN","category_ms":"Permainan web · Warisan silat","category_en":"Web Game · Silat Heritage","category_zh":"网页游戏 · 武术文化传承","status":"completed","live_url":"https://gamegayongx-warisan.syahmiaof.my","sort_order":6},
    {"id":"gayongx-athlete-analytics","slug":"gayongx-athlete-analytics","title":"GayongX Athlete Analytics","category_ms":"Sains sukan · Analitik atlet","category_en":"Sports Science · Athlete Analytics","category_zh":"运动科学 · 运动员分析","status":"on-hold","live_url":"https://gxaa.syahmiaof.my","sort_order":7},
    {"id":"lamborghini","slug":"lamborghini","title":"Lamborghini","category_ms":"Showcase · Pengalaman web","category_en":"Showcase · Web Experience","category_zh":"展示项目 · 网页体验","status":"completed","live_url":"https://lamborghini.syahmiaof.my","sort_order":8},
    {"id":"modul-meta-ads-ai","slug":"modul-meta-ads-ai","title":"Modul Meta Ads + AI","category_ms":"Pendidikan · Platform pemasaran","category_en":"Education · Marketing Platform","category_zh":"教育 · 营销平台","status":"completed","live_url":"https://modul-meta-ads.syahmiaof.my","sort_order":9},
    {"id":"statushd","slug":"statushd","title":"StatusHD","category_ms":"Alat web · Utiliti media","category_en":"Web Tool · Media Utility","category_zh":"网页工具 · 媒体实用工具","status":"on-hold","live_url":"https://statushd.syahmiaof.my","sort_order":10},
    {"id":"jarvis","slug":"jarvis","title":"Jarvis","category_ms":"Sistem pembantu AI","category_en":"AI Assistant System","category_zh":"AI 助手系统","status":"on-hold","live_url":"https://jarvis.syahmiaof.my","sort_order":11},
    {"id":"cerviscan-ai","slug":"cerviscan-ai","title":"CerviScan-AI","category_ms":"HealthTech · Imbasan perubatan AI","category_en":"HealthTech · AI Medical Scan","category_zh":"医疗科技 · AI 医学扫描","status":"on-hold","live_url":"https://cerviscan-ai.syahmiaof.my","sort_order":12},
    {"id":"crypto-ai","slug":"crypto-ai","title":"Crypto AI","category_ms":"Web3 · Analitik dagangan","category_en":"Web3 · Trading Analytics","category_zh":"Web3 · 交易分析","status":"on-hold","live_url":"https://cryptoai.syahmiaof.my","sort_order":13},
    {"id":"nemo","slug":"nemo","title":"Nemo","category_ms":"Produktiviti peribadi · Second brain","category_en":"Personal Productivity · Second Brain","category_zh":"个人效率 · 第二大脑","status":"completed","live_url":"https://nemo.syahmiaof.my","sort_order":14},
    {"id":"siapsatu","slug":"siapsatu","title":"SiapSatu","category_ms":"Automasi bisnes · Agensi","category_en":"Business Automation · Agency","category_zh":"商业自动化 · 代理机构","status":"on-hold","live_url":"https://siapsatu.syahmiaof.my","sort_order":15},
    {"id":"syahmiaof-portfolio","slug":"syahmiaof-portfolio","title":"Website Portfolio Syahmiaof","category_ms":"Portfolio & bio peribadi","category_en":"Personal Portfolio & Bio","category_zh":"个人作品集与简介","status":"completed","live_url":"https://syahmiaof.my","sort_order":16},
    {"id":"symi-yogurt","slug":"symi-ui","title":"Symi Yogurt","category_ms":"Makanan & minuman · Showcase jenama","category_en":"Food & Beverage · Brand Showcase","category_zh":"餐饮 · 品牌展示","status":"on-hold","live_url":"https://symi.syahmiaof.my","sort_order":17},
    {"id":"greetly","slug":"greetly","title":"Greetly","category_ms":"SaaS · Penjana kad ucapan","category_en":"SaaS · Greeting Card Generator","category_zh":"SaaS · 贺卡生成器","status":"completed","live_url":"https://greetly.syahmiaof.my","sort_order":18},
    {"id":"daeng-kuning","slug":"daeng-kuning","title":"Daeng Kuning","category_ms":"Jenama · Laman warisan","category_en":"Brand · Heritage Website","category_zh":"品牌 · 文化传承网站","status":"completed","live_url":"https://daengkuning.my","sort_order":19},
    {"id":"jiwa-fighter","slug":"jiwa-fighter-official","title":"Jiwa Fighter Official Website","category_ms":"Platform jenama & media","category_en":"Brand & Media Platform","category_zh":"品牌与媒体平台","status":"in-progress","live_url":null,"sort_order":20},
    {"id":"story-syahmiaof","slug":"story-syahmiaof","title":"Story Syahmiaof","category_ms":"Cerita peribadi · Blog","category_en":"Personal Stories · Blog","category_zh":"个人故事 · 博客","status":"in-progress","live_url":null,"sort_order":21},
    {"id":"studio-syahmiaof","slug":"studio-syahmiaof","title":"Studio Syahmiaof","category_ms":"Studio kreatif · Agensi","category_en":"Creative Studio · Agency","category_zh":"创意工作室 · 代理机构","status":"in-progress","live_url":null,"sort_order":22}
  ]$projects$::jsonb
) as item(
  id text, slug text, title text, category_ms text, category_en text,
  category_zh text, status text, live_url text, sort_order integer
)
on conflict (id) do nothing;
