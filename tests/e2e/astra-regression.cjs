const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const BASE = process.env.BASE_URL || 'http://localhost:3461';
const result = { checks: [], errors: [], measurements: [] };
const check = (name, condition) => { assert.ok(condition, name); result.checks.push(name); console.log('PASS', name); };
const routes = ['/', '/servis', '/portfolio', '/harga', '/coaching', '/tentang', '/hubungi'];
const names = ['01-home','02-services','03-portfolio','04-pricing','05-coaching','06-about','07-contact'];
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  page.on('pageerror',e=>result.errors.push(e.message));
  const go=route=>page.goto(BASE+route,{waitUntil:'networkidle'});
  const total=async value=>check('Estimate '+value,(await page.getByTestId('estimate').textContent())===value);
  await go('/harga'); await total('RM1,745');
  await page.getByRole('checkbox',{name:/Animasi Lanjutan/}).check(); await total('RM2,145');
  await page.getByRole('checkbox',{name:/Bahasa Kedua/}).check(); await total('RM2,395');
  await page.getByRole('radio',{name:/Landing/}).check(); await total('RM1,295');
  await page.getByRole('radio',{name:/Premium/}).check(); await total('RM3,645');
  await page.getByRole('link',{name:'EN',exact:true}).click(); await page.waitForURL('**/en/harga**'); await total('RM3,645');
  check('Language state persists',await page.getByRole('checkbox',{name:/Advanced Animation/}).isChecked());
  await page.getByRole('radio',{name:/Business/}).check();
  await page.getByRole('checkbox',{name:/Second Language/}).uncheck(); await total('RM2,145');
  await page.getByRole('link',{name:'Request a Quote',exact:true}).click();
  await page.waitForURL('**/en/hubungi**');
  check('Quote handoff total', (await page.getByTestId('quote-summary').textContent()).includes('RM2,145'));
  check('English document language',await page.evaluate(()=>document.documentElement.lang)==='en');
  let requests=0; page.on('request',r=>{if(r.url().endsWith('/api/inquiries'))requests++});
  await page.getByRole('button',{name:'Prepare Inquiry'}).click();
  check('Empty fields rejected',await page.locator('.field-error').count()===3 && requests===0);
  await page.getByLabel('2. NAME').fill('QA Example');
  await page.getByLabel('3. EMAIL / WHATSAPP').fill('invalid-address');
  await page.getByLabel('4. TELL ME YOUR IDEA').fill('Local automated inquiry verification, never sent.');
  await page.getByRole('button',{name:'Prepare Inquiry'}).click();
  check('Invalid contact rejected',await page.locator('#error-contact').isVisible() && requests===0);
  await page.getByLabel('3. EMAIL / WHATSAPP').fill('qa@example.com');
  const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/inquiries'));
  await page.getByRole('button',{name:'Prepare Inquiry'}).click();
  const response=await responsePromise;
  check('Provider unavailable is HTTP 503',response.status()===503);
  const fallback=page.getByRole('link',{name:'Open Email to Send'});
  await fallback.waitFor();
  check('Email handoff retains quote',decodeURIComponent(await fallback.getAttribute('href')).includes('RM2,145'));
  check('No fabricated delivery',!(await response.json()).success && (await page.locator('.form-notice').textContent()).includes('has not been sent'));
  check('Unconfigured WhatsApp is disabled',await page.getByRole('button',{name:'Chat WhatsApp'}).isDisabled());
  await go('/hubungi?service=website-ui&package=business&addons=animation&estimate=1');
  check('Spoofed URL estimate recomputed',(await page.getByTestId('quote-summary').textContent()).includes('RM2,145'));
  await go('/harga'); await page.getByRole('link',{name:'Bincang Projek',exact:true}).click();
  check('Full-stack handoff',(await page.getByTestId('quote-summary').textContent()).includes('RM3,250') && await page.getByRole('radio',{name:'Sistem Lengkap'}).isChecked());
  await go('/coaching');
  await page.getByRole('radio',{name:'Mentor Projek',exact:true}).check();
  await page.getByRole('radio',{name:'90 min',exact:true}).check();
  await page.getByRole('link',{name:'EN',exact:true}).click(); await page.waitForURL('**/en/coaching**');
  check('Coaching language state',await page.getByRole('radio',{name:'Project Mentor',exact:true}).isChecked()&&await page.getByRole('radio',{name:'90 min',exact:true}).isChecked());
  await page.getByRole('link',{name:'Ask About Coaching',exact:true}).click();
  check('Coaching handoff',(await page.getByTestId('coaching-summary').textContent()).includes('90 min'));
  await go('/portfolio');
  check('Portfolio catalog lists Nemo projects',await page.locator('.project-card').count()===23);
  await page.getByRole('searchbox').fill('Lamborghini');
  check('Portfolio search narrows to Lamborghini',await page.locator('.project-card').count()===1&&(await page.locator('.project-card h3').innerText())==='Lamborghini');
  await page.getByRole('searchbox').fill('');
  await page.getByRole('button',{name:/On hold/}).click();
  check('Portfolio status filter shows on-hold work',await page.locator('.project-card').count()===8);
  await page.getByRole('button',{name:/All/}).click();
  const api=await page.request.post(BASE+'/api/inquiries',{data:{service:'website-ui',name:'QA Example',contact:'qa@example.com',message:'Validation only; no delivery.',packageId:'business',addons:['animation','animation'],estimatedTotal:1}});
  check('API ignores spoofed and duplicate quote totals',api.status()===503 && decodeURIComponent((await api.json()).directMailto).includes('RM2145'));
  check('API rejects malformed JSON',(await page.request.post(BASE+'/api/inquiries',{data:'{broken',headers:{'content-type':'application/json'}})).status()===400);
  check('API caps payload',(await page.request.post(BASE+'/api/inquiries',{data:'x'.repeat(18000)})).status()===413);
  for(const width of [1440,1920,768,390]) {
    await page.setViewportSize({width,height:width===1920?1080:width===768?1024:width===390?844:900});
    for(const locale of ['ms','en'])for(const route of routes){
      const url=(locale==='en'?'/en':'')+(route==='/'?(locale==='en'?'':'/'):route);
      const res=await go(url);
      const measurement=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,headings:[...document.querySelectorAll('h1 .display-line')].map(e=>{const r=e.getBoundingClientRect();return {text:e.textContent,left:r.left,right:r.right,width:innerWidth};}),controls:[...document.querySelectorAll('main .studio-button')].map(e=>{const r=e.getBoundingClientRect();return {text:e.textContent,left:r.left,right:r.right,width:innerWidth};})}));
      check(locale+' '+route+' '+width+' responsive route',res.status()===200&&!measurement.overflow&&measurement.headings.every(h=>h.left>=-1&&h.right<=h.width+1)&&measurement.controls.every(h=>h.left>=-1&&h.right<=h.width+1));
      result.measurements.push({locale,route,width,...measurement});
    }
    if(width<1024){await go('/');await page.getByRole('button',{name:'Buka menu navigasi'}).click();check('Menu opens '+width,await page.locator('.studio-nav').isVisible());await page.keyboard.press('Escape');check('Escape closes menu '+width,!(await page.locator('.studio-nav').isVisible()));await page.getByRole('button',{name:'Buka menu navigasi'}).click();await page.locator('.studio-nav').getByRole('link',{name:'Servis',exact:true}).click();await page.waitForURL('**/servis');check('Mobile navigation '+width,(await page.locator('h1').textContent()).includes('BINA IDEA'));}
  }
  // Exercise route lifecycle, forward/reverse scroll and both motion settings.
  for(const motion of ['no-preference','reduce']){
    await page.emulateMedia({reducedMotion:motion});await page.setViewportSize({width:1440,height:900});
    for(let i=0;i<routes.length;i++){
      await go(routes[i]);await page.waitForTimeout(1300);
      const height=await page.evaluate(()=>document.documentElement.scrollHeight);
      for(let y=0;y<height;y+=700){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(70);}
      for(let y=height;y>0;y-=700){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(70);}
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(650);
      check(motion+' '+routes[i]+' reverse scroll',await page.locator('h1').isVisible()&&await page.locator('.display-line').first().evaluate(e=>Number(getComputedStyle(e).opacity)>0.9));
      const dir='docs/qa/screenshots/astra-v2/motion/'+motion;fs.mkdirSync(dir,{recursive:true});await page.screenshot({path:dir+'/'+names[i]+'.png'});
    }
    await go('/');await page.locator('.studio-nav').getByRole('link',{name:'Servis',exact:true}).click();await page.waitForURL('**/servis');await page.goBack();await page.waitForTimeout(1300);check(motion+' browser back',(await page.locator('h1').textContent()).includes('WEB YANG'));await page.goForward();await page.waitForTimeout(1300);check(motion+' browser forward',(await page.locator('h1').textContent()).includes('BINA IDEA'));
  }
  check('No JavaScript runtime errors',result.errors.length===0);
  await browser.close();
}
main().then(()=>{fs.writeFileSync('docs/qa/astra-regression-results.json',JSON.stringify(result,null,2));console.log('COMPLETE',result.checks.length,'checks');}).catch(e=>{result.failure=e.stack;fs.writeFileSync('docs/qa/astra-regression-results.json',JSON.stringify(result,null,2));console.error(e);process.exit(1)});
