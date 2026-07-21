import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const watch = process.argv.includes('--watch');

/**
 * Stamp the bundle's content hash onto every <script src> in test/*.html, so a
 * new build gets a new URL (…/cc.min.js?v=<hash>) and reviewers never get a
 * stale cached copy from the GitHub Pages / browser cache. Same content ⇒ same
 * hash ⇒ no spurious churn.
 */
function stampCacheBust() {
  const hash = createHash('sha256').update(readFileSync('dist/cc.min.js')).digest('hex').slice(0, 10);
  for (const f of readdirSync('test').filter((n) => n.endsWith('.html'))) {
    const path = `test/${f}`;
    const src = readFileSync(path, 'utf8');
    const next = src.replace(/(\.\.\/dist\/cc\.min\.js)(\?v=[a-f0-9]+)?/g, `$1?v=${hash}`);
    if (next !== src) writeFileSync(path, next);
  }
  return hash;
}

/**
 * Everything bundles into ONE file — JS and CSS together. CSS is imported as
 * text and injected at runtime, so Webflow only ever needs a single <script>
 * tag. No second request, no flash of unstyled content.
 */
const options = {
  entryPoints: ['src/main.js'],
  outfile: 'dist/cc.min.js',
  bundle: true,
  format: 'iife',
  target: ['es2019'],
  loader: { '.css': 'text' },
  minify: !watch,
  sourcemap: watch,
  legalComments: 'none',
  banner: { js: '/* CliniContact site bundle — built from github.com/CliniContact/CliniContact-Website */' },
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('watching src/ → dist/cc.min.js');
} else {
  const result = await esbuild.build({ ...options, metafile: true });
  const bytes = Object.values(result.metafile.outputs)[0].bytes;
  const hash = stampCacheBust();
  console.log(`built dist/cc.min.js — ${(bytes / 1024).toFixed(1)} kB (cache-bust v=${hash})`);
}
