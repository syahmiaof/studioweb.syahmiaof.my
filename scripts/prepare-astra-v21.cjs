const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const generatedRoot = 'C:/Users/USER/.codex/generated_images/01a17479-1c72-7b21-834e-c08f5f6d0ea7';
// Coordinates refer to the untouched approved 1672 x 941 canvas (Contact: 1671).
// Only these regions may receive inpainted pixels; everything else stays original.
const pages = [
 {slug:'01-home', generated:'328efc5f-be53-4f37-8d07-74c614fc6f8b', bottom:789, regions:[[60,126,415,29],[58,166,705,290],[65,461,675,33],[61,513,505,66],[1526,194,131,112],[1423,409,125,48],[52,722,34,40]]},
 {slug:'02-services', generated:'fbd953fa-2640-4538-a9d0-1600e6c680e6',bottom:941, regions:[[59,109,151,29],[58,144,786,311],[62,457,702,33],[87,531,313,78],[450,533,59,58],[88,637,245,109],[87,745,380,32],[90,792,275,67],[573,527,370,88],[951,532,55,58],[573,635,310,114],[575,744,270,34],[581,791,285,67]]},
 {slug:'03-portfolio',generated:'53294dcd-33ed-4bbd-a758-9ed049229e0a',bottom:855,regions:[[61,126,238,30],[58,164,513,291],[63,462,595,31],[62,513,286,65],[731,143,123,56]],polygons:[[[404,552],[746,494],[748,538],[405,595]],[[1258,383],[1537,412],[1539,458],[1255,430]]]},
 {slug:'04-pricing',generated:'64034d64-0e43-46be-9f3b-8c731cd6c3b7',bottom:941,regions:[[58,109,154,29],[58,143,602,311],[57,452,555,42],[823,120,747,147],[824,251,747,521],[849,809,692,83]]},
 {slug:'05-coaching',generated:'f31bad58-68f3-4c22-93be-269112b02733',bottom:941,regions:[[59,109,213,29],[59,145,564,361],[62,507,610,34],[69,552,662,329]]},
 {slug:'06-about',generated:'5aba4c9c-68bf-422e-80f2-5f176a374827',bottom:941,regions:[[59,109,227,29],[58,143,568,398],[60,542,670,94],[61,650,805,234],[1358,763,143,40]]},
 {slug:'07-contact',generated:'6b8e63b8-56df-4851-a61b-ebc11deb9aee',leftGenerated:'4372a4a0-402a-4d76-8058-c83ded958f33',bottom:884,regions:[[61,149,193,31],[58,188,660,302],[62,492,559,36],[61,536,412,124],[936,163,558,123],[936,255,563,48],[939,289,558,545]]},
];
const output='public/assets/astra-v21', derived='design/derived/astra-v21';
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
// Workspace copies make regeneration possible without the original tool cache.
function inpaintSource(id, archivedPath) {
 const cachedPath=path.join(generatedRoot,`exec-${id}.png`);
 const selected=fs.existsSync(cachedPath)?cachedPath:archivedPath;
 if(path.resolve(selected)!==path.resolve(archivedPath))fs.copyFileSync(selected,archivedPath);
 return selected;
}
function polygonInside(x,y,points){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if(((a[1]>y)!==(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))inside=!inside;}return inside;}
async function main(){
 fs.mkdirSync(output,{recursive:true});fs.mkdirSync(derived,{recursive:true});
 const inventory=[];
 for(const p of pages){
  const source=fs.readFileSync(`design/references/${p.slug}.png`);
  const meta=await sharp(source).metadata();
  const genPath=inpaintSource(p.generated,`${derived}/${p.slug}-inpaint-source.png`);
  const genMeta=await sharp(genPath).metadata();
  const original=await sharp(source).removeAlpha().raw().toBuffer();
  const clean=await sharp(genPath).resize(meta.width,meta.height,{fit:'fill'}).removeAlpha().raw().toBuffer();
  if(p.leftGenerated){
   const leftPath=inpaintSource(p.leftGenerated,`${derived}/${p.slug}-left-inpaint-source.png`);
   const leftPixels=await sharp(leftPath).resize(meta.width,meta.height,{fit:'fill'}).removeAlpha().raw().toBuffer();
   for(let y=0;y<meta.height;y++)leftPixels.copy(clean,y*meta.width*3,y*meta.width*3,(y*meta.width+800)*3);
  }
  const pixels=Buffer.from(original), mask=Buffer.alloc(meta.width*meta.height);
  let edited=0;
  for(let y=0;y<meta.height;y++)for(let x=0;x<meta.width;x++){
   let alpha=0;
   for(const [left,top,width,height] of p.regions){
    if(x>=left&&x<left+width&&y>=top&&y<top+height){
     alpha=Math.max(alpha,Math.min(1,(Math.min(x-left,left+width-1-x,y-top,top+height-1-y)+1)/4));
    }
   }
   for(const poly of p.polygons||[])if(polygonInside(x,y,poly))alpha=1;
   if(alpha){edited++;mask[y*meta.width+x]=Math.round(alpha*255);for(let c=0;c<3;c++){const i=(y*meta.width+x)*3+c;pixels[i]=Math.round(original[i]*(1-alpha)+clean[i]*alpha);}}
  }
  await sharp(mask,{raw:{width:meta.width,height:meta.height,channels:1}}).png().toFile(`${derived}/${p.slug}-edit-mask.png`);
  const raw={width:meta.width,height:meta.height,channels:3};
  await sharp(pixels,{raw}).png().toFile(`${derived}/${p.slug}-clean-master.png`);
  // Header and footer UI are separate HTML. Crop their baked pixels entirely.
  const height=p.bottom-77;
  await sharp(pixels,{raw}).extract({left:0,top:77,width:meta.width,height}).webp({quality:96,effort:6}).toFile(`${output}/${p.slug}-plate.webp`);
  inventory.push({source:`design/references/${p.slug}.png`,sourceSHA256:hash(source),width:meta.width,height:meta.height,sourceBytes:source.length,sourceAlpha:!!meta.hasAlpha,generatedWidth:genMeta.width,generatedHeight:genMeta.height,regions:p.regions,polygons:p.polygons||[],editedPixels:edited,preservedPixels:meta.width*meta.height-edited,target:`${output}/${p.slug}-plate.webp`,targetWidth:meta.width,targetHeight:height,targetBytes:fs.statSync(`${output}/${p.slug}-plate.webp`).size,method:'Localized inpaint composite; original pixels outside edit mask unchanged; header/footer cropped away.'});
  console.log(p.slug,meta.width+'x'+meta.height,'->',meta.width+'x'+height);
 }
 // Deliberate mobile art windows: exact source artwork, no separate re-created character.
 await sharp(`${derived}/06-about-clean-master.png`).extract({left:0,top:77,width:640,height:460}).webp({quality:96,effort:6}).toFile(`${output}/concrete-surface.webp`);
 const mobile=[['01-home',690,77,982,712],['02-services',1000,77,672,864],['05-coaching',760,77,912,864],['06-about',710,77,962,864],['04-pricing',0,490,780,451],['07-contact',0,77,903,807]];
 for(const [slug,left,top,width,height] of mobile){await sharp(`${derived}/${slug}-clean-master.png`).extract({left,top,width,height}).webp({quality:96,effort:6}).toFile(`${output}/${slug}-mobile.webp`);}
 // Archival project previews retain text INSIDE the showcased sites, never studio captions.
 for(const [name,left,top,width,height] of [['symi',710,90,640,540],['lamborghini',335,499,430,356],['uberpokmi',1232,383,440,472]]){
  await sharp(`${derived}/03-portfolio-clean-master.png`).extract({left,top,width,height}).webp({quality:96}).toFile(`${output}/project-${name}.webp`);
 }
 fs.writeFileSync('docs/qa/astra-v21/asset-manifest.json',JSON.stringify(inventory,null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1});
