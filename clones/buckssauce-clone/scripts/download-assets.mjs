// Downloads all target-site assets (images, product bottles, produce, mascots,
// ingredient icons, wings, review avatars) + the custom font + favicon into public/.
// Parses the recon output at .extract/out/assets.json so nothing is hand-curated.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/BHQIMBP16/Developer/my-clone';
const OUT_IMG = path.join(ROOT, 'public/images');
const OUT_ICON = path.join(ROOT, 'public/icons');
const OUT_FONT = path.join(ROOT, 'public/fonts');
const OUT_SEO = path.join(ROOT, 'public/seo');
for (const d of [OUT_IMG, OUT_ICON, OUT_FONT, OUT_SEO]) fs.mkdirSync(d, { recursive: true });

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const ORIGIN = 'https://buckssauce.com';

function cleanBase(u) {
  const noQ = u.split('?')[0];
  let base = noQ.substring(noQ.lastIndexOf('/') + 1);
  // strip Prismic hash prefix like "aaclqVxvIZEnjSXh_"
  base = base.replace(/^[A-Za-z0-9]{12,20}_/, '');
  return base;
}

// Resolve each recon image entry to {url, dir, name}
function resolve(entry) {
  let src = entry.src;
  if (!src) return null;
  // Next.js optimizer: unwrap to the original local asset on the origin
  if (src.includes('/_next/image?')) {
    const m = src.match(/[?&]url=([^&]+)/);
    if (m) {
      const real = decodeURIComponent(m[1]);
      if (real.startsWith('/')) {
        const name = cleanBase(real);
        return { url: ORIGIN + real, dir: OUT_IMG, name };
      }
      if (real.startsWith('http')) return { url: real, dir: OUT_IMG, name: cleanBase(real) };
    }
  }
  const name = cleanBase(src);
  if (name.endsWith('.svg')) {
    // fetch raw svg (drop the Prismic format/compress query so we keep vector)
    return { url: src.split('?')[0], dir: OUT_ICON, name };
  }
  // Prismic raster: keep highest-res variant already in src (w=1920)
  return { url: src, dir: OUT_IMG, name };
}

const reconAssets = JSON.parse(fs.readFileSync(path.join(ROOT, '.extract/out/assets.json'), 'utf8'));
const jobs = new Map(); // dedupe by dir+name
for (const img of reconAssets.images) {
  const r = resolve(img);
  if (r && r.name) jobs.set(r.dir + '/' + r.name, r);
}

// Explicit extras: font, favicon, og image
jobs.set('font-pep', { url: `${ORIGIN}/_next/static/media/PeperoncinoSans_Regular_fixed-s.p.982fe238.woff`, dir: OUT_FONT, name: 'PeperoncinoSans-Regular.woff' });
jobs.set('favicon', { url: `${ORIGIN}/favicon.png`, dir: OUT_SEO, name: 'favicon.png' });
jobs.set('og', { url: 'https://images.prismic.io/buckssauce/aacbFlxvIZEnjSPO_hf_20260302_131340_609fc70f-564f-416c-97ec-aa20bdc5bc0e1.png?auto=format,compress&w=1200', dir: OUT_SEO, name: 'og-image.png' });

async function download({ url, dir, name }) {
  const dest = path.join(dir, name);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: ORIGIN + '/' } });
    if (!res.ok) return `FAIL ${res.status} ${name}`;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    return `ok  ${name} (${(buf.length / 1024).toFixed(0)}kb)`;
  } catch (e) {
    return `ERR ${name} ${e.message.slice(0, 50)}`;
  }
}

const list = [...jobs.values()];
console.log(`Downloading ${list.length} assets...`);
const results = [];
const CONC = 5;
for (let i = 0; i < list.length; i += CONC) {
  const batch = list.slice(i, i + CONC);
  results.push(...await Promise.all(batch.map(download)));
}
results.forEach(r => console.log(r));
const fails = results.filter(r => !r.startsWith('ok')).length;
console.log(`\nDone. ${results.length - fails} ok, ${fails} failed.`);
