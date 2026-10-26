const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),sharp=require('sharp');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
 const originalFiles=fs.readdirSync('design/originals').filter(n=>n.endsWith('.png'));
 const inventory=[];
 for(const name of originalFiles){const p='design/originals/'+name,b=fs.readFileSync(p),m=await sharp(b).metadata();inventory.push({file:p,width:m.width,height:m.height,bytes:b.length,alpha:m.hasAlpha,sha256:hash(b),incomingIdentical:hash(fs.readFileSync('design/incoming/'+name))===hash(b)});}
 const plates=JSON.parse(fs.readFileSync('docs/qa/astra-v21/asset-manifest.json'));
 for(const p of plates){const slug=path.basename(p.source,'.png');const [original,master,mask]=await Promise.all([sharp(p.source).removeAlpha().raw().toBuffer(),sharp(`design/derived/astra-v21/${slug}-clean-master.png`).removeAlpha().raw().toBuffer(),sharp(`design/derived/astra-v21/${slug}-edit-mask.png`).greyscale().raw().toBuffer()]);let differences=0;for(let i=0;i<mask.length;i++)if(mask[i]===0&&(original[i*3]!==master[i*3]||original[i*3+1]!==master[i*3+1]||original[i*3+2]!==master[i*3+2]))differences++;p.outsideMaskDifferentPixels=differences;p.originalFile=inventory.find(a=>a.sha256===p.sourceSHA256)?.file;p.sourceHashStillMatches=hash(fs.readFileSync(p.source))===p.sourceSHA256;}
 const derivatives=[];for(const name of fs.readdirSync('public/assets/astra-v21')){const p='public/assets/astra-v21/'+name,m=await sharp(p).metadata();derivatives.push({file:p,width:m.width,height:m.height,bytes:fs.statSync(p).size,alpha:m.hasAlpha});}
 const report={originals:inventory,plates,derivatives,totalDerivativeBytes:derivatives.reduce((s,x)=>s+x.bytes,0)};fs.writeFileSync('docs/qa/astra-v21/source-integrity.json',JSON.stringify(report,null,2));console.log(JSON.stringify({originals:inventory.length,allOriginalsPreserved:inventory.every(x=>x.incomingIdentical),allReferencesMapped:plates.every(x=>x.originalFile),outsideMaskDifferences:plates.map(x=>x.outsideMaskDifferentPixels),bytes:report.totalDerivativeBytes}));
})().catch(e=>{console.error(e);process.exitCode=1});
