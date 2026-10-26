const {chromium}=require('playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://localhost:3461';
(async()=>{
 const browser=await chromium.launch(),report={base,environment:'Local production build, Chromium, unthrottled, fresh browser context per route. Laboratory samples, not field Core Web Vitals.',checks:[],samples:[]};
 const check=(label,ok)=>{assert.ok(ok,label);report.checks.push(label);console.log('PASS',label)};
 const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:1440,height:900}});
 await page.goto(base+'/harga');await page.getByRole('checkbox',{name:/Animasi Lanjutan/}).check();
 check('Production calculator Business plus advanced animation RM598',(await page.getByTestId('estimate').textContent())==='RM598');
 await page.getByRole('link',{name:'Dapatkan Sebut Harga',exact:true}).click();
 check('Production quote reaches contact',(await page.getByTestId('quote-summary').textContent()).includes('RM598'));
 await page.getByLabel('2. NAMA').fill('Local QA');await page.getByLabel('3. EMEL / WHATSAPP').fill('qa@example.com');await page.getByLabel('4. CERITAKAN IDEA ANDA').fill('Local production validation only; no message sent.');
 const pending=page.waitForResponse(r=>r.url().endsWith('/api/inquiries'));await page.getByRole('button',{name:'Sediakan Pertanyaan'}).click();const response=await pending;
 check('Production API truthfully unavailable',response.status()===503&&(await response.json()).success===false);
 check('Production email fallback rendered',await page.getByRole('link',{name:'Buka Emel untuk Hantar'}).isVisible());await page.close();
 for(const device of [{width:1440,height:900,dpr:1},{width:390,height:844,dpr:2}])for(const route of ['/','/servis','/portfolio','/harga','/coaching','/tentang','/hubungi']){
 const context=await browser.newContext({viewport:{width:device.width,height:device.height},deviceScaleFactor:device.dpr,reducedMotion:'no-preference'});
 await context.addInitScript(()=>{window.__qa={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__qa.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__qa.cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
 const p=await context.newPage();const res=await p.goto(base+route,{waitUntil:'networkidle',timeout:90000});await p.waitForTimeout(1400);
 const sample=await p.evaluate(()=>{const r=performance.getEntriesByType('resource'),n=performance.getEntriesByType('navigation')[0];return {...window.__qa,domContentLoaded:n.domContentLoadedEventEnd,load:n.loadEventEnd,resourceBytes:r.reduce((s,x)=>s+x.transferSize,0),imageBytes:r.filter(x=>x.name.includes('/_next/image')||/\.(webp|png)/.test(x.name)).reduce((s,x)=>s+x.transferSize,0),images:[...document.images].filter(x=>x.getBoundingClientRect().width>10).map(x=>({naturalWidth:x.naturalWidth,displayWidth:x.getBoundingClientRect().width,source:x.currentSrc})),overflow:document.documentElement.scrollWidth>innerWidth};});
 check(route+' '+device.width+' production render',res.status()===200&&!sample.overflow);report.samples.push({route,...device,...sample});await context.close();
 }
 await browser.close();fs.writeFileSync('docs/qa/astra-v21/production-performance.json',JSON.stringify(report,null,2));console.log('COMPLETE',report.checks.length,'production checks');
})().catch(e=>{console.error(e);process.exitCode=1});
