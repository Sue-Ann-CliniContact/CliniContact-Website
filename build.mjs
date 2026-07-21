import * as esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

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
  console.log(`built dist/cc.min.js — ${(bytes / 1024).toFixed(1)} kB`);
}
