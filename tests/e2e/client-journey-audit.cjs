const { chromium } = require('playwright');

const base = process.env.AUDIT_BASE || 'http://127.0.0.1:3461';
const checks = [];
const errors = [];
async function check(name, task) {
  try {
    const detail = await task();
    checks.push({ name, ok: true, detail: detail ?? '' });
  } catch (error) {
    checks.push({ name, ok: false, detail: error.message });
  }
}
async function enter(page) {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  const intro = page.locator('.studio-intro');
  if (await intro.count()) {
    if (await intro.locator('button').isVisible()) await intro.locator('button').click({ timeout: 1500 }).catch(() => {});
    await intro.waitFor({ state: 'detached', timeout: 10000 });
  }
}
async function run() {
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await desktop.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await check('Home dan intro', async () => {
      await enter(page);
      if (await page.locator('main section.studio-scene[id]').count() !== 7) throw Error('Bukan tujuh seksyen');
    });
    await check('Navigasi tujuh seksyen', async () => {
      for (const id of ['home', 'tentang', 'servis', 'portfolio', 'harga', 'coaching', 'hubungi']) {
        await page.locator(`.studio-nav a[href="#${id}"]`).click();
        await page.waitForURL(`**/#${id}`);
      }
    });
    await check('Bahasa BM, EN, 中文', async () => {
      await page.getByRole('link', { name: 'English' }).click();
      await page.waitForURL(/\/en#/);
      await page.getByRole('link', { name: '简体中文' }).click();
      await page.waitForURL(/\/zh#/);
      await page.getByRole('link', { name: 'Bahasa Melayu' }).click();
      await page.waitForURL(/^http:\/\/127\.0\.0\.1:3461\/#/);
    });
    await check('Hero CTA servis dan contact', async () => {
      await page.locator('#home .scene-actions a[href="#servis"]').click();
      await page.waitForURL('**/#servis');
      await page.locator('#home .scene-actions a[href="#hubungi"]').click();
      await page.waitForURL('**/#hubungi');
    });
    await check('Hero joke next/pause dan scroll cue', async () => {
      const joke = page.locator('.hero-joke-line');
      await joke.waitFor();
      await page.locator('.hero-joke-controls button').first().click();
      await page.locator('.hero-joke-controls button').last().click();
      await page.locator('.hero-joke-controls button').last().click();
      const cue = page.locator('#home a.scroll-cue');
      await cue.click();
      await page.waitForURL('**/#servis');
    });
    await check('About dan Footer CTA', async () => {
      await page.locator('#tentang a').filter({ hasText: 'Lihat Portfolio' }).click();
      await page.waitForURL('**/#portfolio');
      await page.locator('#tentang a').filter({ hasText: 'Bincang Projek' }).click();
      await page.waitForURL('**/#hubungi');
      await page.locator('footer a[href*="#tentang"]').click();
      await page.waitForURL('**/#tentang');
      await page.locator('footer a[href*="#hubungi"]').click();
      await page.waitForURL('**/#hubungi');
    });
    await check('Servis CTA pakej dan sistem', async () => {
      await page.locator('#servis a').filter({ hasText: 'Lihat Pakej' }).click();
      await page.waitForURL('**/#harga');
      await page.locator('#servis a').filter({ hasText: 'Lihat Pilihan Sistem' }).click();
      await page.waitForURL(/#hubungi$/);
      await page.locator('[data-testid=system-summary]').waitFor({ timeout: 5000 });
    });
    await check('Portfolio CTA, galeri, carian dan filter', async () => {
      await page.locator('#portfolio a[href="#project-details"]').click();
      await page.waitForURL(/#project-details$/);
      const gallery = page.locator('.gallery-controls');
      const before = await gallery.locator('span[aria-live]').innerText();
      await gallery.getByRole('button', { name: 'Projek seterusnya' }).click();
      const after = await gallery.locator('span[aria-live]').innerText();
      if (before === after) throw Error('Galeri tidak berubah');
      await gallery.getByRole('button', { name: 'Projek sebelumnya' }).click();
      for (const plane of await page.locator('.project-plane').all()) await plane.click();
      const search = page.getByRole('searchbox');
      await search.fill('Nemo');
      const count = await page.locator('.project-card').count();
      if (count < 1) throw Error('Carian Nemo kosong');
      await search.fill('');
      for (const filter of await page.locator('.project-filters button').all()) await filter.click();
      await page.locator('.project-filters button').first().click();
      return `Nemo: ${count} projek`;
    });
    await check('Portfolio admin salah password', async () => {
      await page.getByRole('button', { name: /Urus projek/ }).click();
      const dialog = page.locator('.project-admin-dialog');
      await dialog.locator('input[type=password]').fill('incorrect-client-audit');
      await dialog.getByRole('button', { name: 'Buka akses' }).click();
      await dialog.getByText(/HAHAHAHA password kau salah/).waitFor();
      await dialog.getByRole('button', { name: 'Tutup' }).click();
    });
    await check('Harga pilihan, add-on, CTA quote', async () => {
      for (const radio of await page.locator('#harga input[name=package]').all()) await radio.check();
      const addon = page.locator('#harga .addon-option input[type=checkbox]').first();
      await addon.check();
      await addon.uncheck();
      for (const option of await page.locator('#harga .addon-option input[type=checkbox]').all()) {
        await option.check();
        await option.uncheck();
      }
      await page.locator('.package-detail details').first().locator('summary').click();
      for (const option of await page.locator('.package-detail input[name=maintenance]').all()) await option.check();
      const quoteLink = page.locator('#harga a').filter({ hasText: 'Dapatkan Sebut Harga' });
      const href = await quoteLink.getAttribute('href');
      await quoteLink.click();
      await page.waitForURL(/#hubungi$/);
      await page.locator('[data-testid=quote-summary]').waitFor({ timeout: 5000 })
        .catch(() => { throw Error(`Quote context hilang: href=${href}, current=${page.url()}`); });
    });
    await check('Coaching pilihan dan CTA slot', async () => {
      for (const radio of await page.locator('#coaching input[name="coaching-package"]').all()) await radio.check();
      const coachingLink = page.locator('#coaching a').filter({ hasText: 'Tanya Slot Coaching' });
      const href = await coachingLink.getAttribute('href');
      await coachingLink.click();
      await page.waitForURL(/#hubungi$/);
      await page.locator('[data-testid=coaching-summary]').waitFor({ timeout: 5000 })
        .catch(() => { throw Error(`Coaching context hilang: href=${href}, current=${page.url()}`); });
    });
    await check('Borang contact validasi kosong', async () => {
      for (const radio of await page.locator('#hubungi input[name=service]').all()) await radio.check();
      await page.locator('#hubungi button[type=submit]').click();
      if (!(await page.locator('#hubungi .field-error').count())) throw Error('Tiada mesej validasi');
    });
    await check('Borang contact lengkap ke draf WhatsApp', async () => {
      await page.locator('#hubungi input[name=service][value="website-ui"]').check();
      await page.locator('#hubungi #inquiry-name').fill('Ujian Client');
      await page.locator('#hubungi #inquiry-contact').fill('test@example.com');
      await page.locator('#hubungi #inquiry-message').fill('Saya mahu bincang website bisnes untuk kedai saya.');
      await page.evaluate(() => {
        window.__waDraftForAudit = '';
        window.open = (url) => {
          window.__waDraftForAudit = String(url);
          return null;
        };
      });
      await page.locator('#hubungi button[type=submit]').click();
      const captured = await page.evaluate(() => window.__waDraftForAudit);
      if (!captured) throw Error('Borang tidak membuka draf WhatsApp');
      const url = new URL(captured);
      if (url.hostname !== 'wa.me' || url.pathname !== '/60107965236') throw Error('WhatsApp destination salah');
      const draft = url.searchParams.get('text') || '';
      for (const detail of ['Ujian Client', 'test@example.com', 'Website UI', 'kedai saya']) {
        if (!draft.includes(detail)) throw Error(`Butiran ${detail} hilang daripada draf`);
      }
      await page.locator('#hubungi a[href^="https://wa.me/"]').filter({ hasText: 'Buka WhatsApp semula' }).waitFor();
      if (!(await page.locator('#hubungi .form-notice').innerText()).includes('tekan Hantar')) throw Error('Status penghantaran tidak jelas');
    });
    await check('Pautan portfolio dan saluran contact sah', async () => {
      const urls = await page.locator('.project-card-preview-link, .project-card-domain, #hubungi .whatsapp-link[href], #hubungi .email-channel').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')));
      if (!urls.length || urls.some((url) => !url || (!url.startsWith('https://') && !url.startsWith('mailto:')))) throw Error('Pautan luar tidak sah');
      return `${urls.length} pautan disemak tanpa membuka servis luar`;
    });
    await check('MIBOT FAQ, bio dan project brief', async () => {
      await page.getByRole('button', { name: 'Buka MIBOT', exact: true }).click();
      const dialog = page.getByRole('dialog', { name: 'MIBOT' });
      await dialog.getByRole('button', { name: 'Harga Website' }).click();
      if (!(await dialog.innerText()).includes('RM299')) throw Error('Harga tiada');
      await dialog.getByRole('button', { name: 'Sistem Full-Stack' }).click();
      await dialog.getByRole('button', { name: 'Coaching 1:1' }).click();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: 'Buka MIBOT', exact: true }).click();
      const fresh = page.getByRole('dialog', { name: 'MIBOT' });
      await fresh.getByRole('button', { name: 'Bincang Projek' }).click();
      if (!(await fresh.innerText()).includes('Servis apa')) throw Error('Project brief tidak bermula');
      await fresh.getByRole('button', { name: 'Website', exact: true }).click();
      await fresh.getByRole('button', { name: 'Ubah servis' }).click();
      await fresh.getByRole('button', { name: 'Website', exact: true }).click();
      await fresh.getByRole('button', { name: /Belum pasti/ }).click();
      await fresh.getByRole('button', { name: 'Ubah pakej' }).click();
      await fresh.getByRole('button', { name: 'Batal ringkasan projek' }).click();
      await page.keyboard.press('Escape');
      await page.getByRole('button', { name: 'Buka MIBOT', exact: true }).click();
      await dialog.getByRole('textbox', { name: 'Soalan anda' }).fill('siapa syahmi');
      await dialog.getByRole('button', { name: 'Hantar mesej' }).click();
      await page.waitForTimeout(3000);
      const bio = (await dialog.innerText()).includes('TVETMARA');
      return `Jawapan bio tepat: ${bio}`;
    });
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    const m = await mobile.newPage();
    m.on('pageerror', (error) => errors.push(error.message));
    await check('Mobile menu dan scroll overflow', async () => {
      await enter(m);
      const overflow = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (overflow > 2) throw Error(`Horizontal overflow ${overflow}px`);
      await m.getByRole('button', { name: 'Buka menu navigasi' }).click();
      await m.locator('.studio-nav a[href="#portfolio"]').click();
      await m.waitForURL('**/#portfolio');
    });
    await check('Mobile borang menghasilkan draf WhatsApp', async () => {
      await m.locator('#hubungi #inquiry-name').fill('Ujian Mobile');
      await m.locator('#hubungi #inquiry-contact').fill('0101234567');
      await m.locator('#hubungi #inquiry-message').fill('Saya mahu landing page untuk bisnes kecil.');
      await m.evaluate(() => {
        window.__waDraftForAudit = '';
        window.open = (url) => {
          window.__waDraftForAudit = String(url);
          return null;
        };
      });
      await m.locator('#hubungi button[type=submit]').click();
      const captured = await m.evaluate(() => window.__waDraftForAudit);
      const draft = captured ? new URL(captured) : null;
      if (draft?.hostname !== 'wa.me' || draft.pathname !== '/60107965236' || !draft.searchParams.get('text')?.includes('Ujian Mobile')) throw Error('Draf WhatsApp mobile tidak lengkap');
    });
    await check('Mobile MIBOT muat viewport', async () => {
      await m.getByRole('button', { name: 'Buka MIBOT', exact: true }).click();
      const box = await m.getByRole('dialog', { name: 'MIBOT' }).boundingBox();
      if (!box || box.x < -1 || box.x + box.width > 391 || box.y < -1 || box.y + box.height > 845) throw Error(JSON.stringify(box));
    });
    await check('Sapaan MIBOT muncul sekali sahaja per sesi', async () => {
      const isolated = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      const first = await isolated.newPage();
      try {
        await enter(first);
        await first.locator('.mibot-greeting').waitFor({ timeout: 4000 });
        await first.locator('.mibot-greeting').waitFor({ state: 'detached', timeout: 8000 });
        await first.reload({ waitUntil: 'domcontentloaded' });
        await first.waitForTimeout(2000);
        if (await first.locator('.mibot-greeting').count()) throw Error('Sapaan berulang selepas reload');
      } finally {
        await isolated.close();
      }
    });
    await desktop.close();
    await mobile.close();
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ checks, errors }, null, 2));
  if (checks.some((item) => !item.ok) || errors.length) process.exitCode = 1;
}
run().catch((error) => { console.error(error); process.exitCode = 1; });
