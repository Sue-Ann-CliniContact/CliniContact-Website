import { define, injectCSS } from '../../core/mount.js';
import { SOLUTIONS_PAGE } from './solutions.data.js';
import { PRODUCTS_PAGE, HARD_PROTOCOLS } from './products.data.js';
import { SCREENSHOTS } from './screenshots.js';
import css from './sections.css';

/**
 * Generic alternating copy/media sections.
 *
 * Ported from the Solutions page embed, but driven by data instead of hardcoded
 * markup — the Horizon / Bridge / Smart Screener / Vision sections are new
 * entries in a data file, not new code.
 *
 * Pick content with `data-cc-page`:  <div data-cc="sections" data-cc-page="solutions"></div>
 */

const PAGES = { solutions: SOLUTIONS_PAGE, products: PRODUCTS_PAGE };

const cta = (c) => {
  const rel = c.external ? ' target="_blank" rel="noopener"' : '';
  const arrow = c.arrow ? ` <span aria-hidden="true">${c.arrow}</span>` : '';
  const cls = `ccx-btn${c.primary ? ' primary' : ''}`;
  return c.contact
    ? `<button type="button" class="${cls}" data-cc-contact>${c.label}${arrow}</button>`
    : `<a class="${cls}" href="${c.href}"${rel}>${c.label}${arrow}</a>`;
};

/** A section's media panel: product screenshot, video, or fallback illustration. */
function mediaFor(s) {
  const shot = s.screenshot && SCREENSHOTS[s.screenshot];
  if (shot) {
    // Native width/height prevent layout shift while the image loads.
    return `<a class="ccx-shot${shot.dark ? ' is-dark' : ''}" href="${shot.src}" target="_blank" rel="noopener"
        data-ratio="${(shot.h / shot.w).toFixed(4)}" aria-label="${shot.alt}, open full size">
        <img src="${shot.src}" alt="${shot.alt}" width="${shot.w}" height="${shot.h}" loading="lazy" />
        <span class="ccx-shot-hint">Open full size &#8599;</span>
      </a>`;
  }
  if (s.video) {
    return `<div class="ccx-video"><iframe src="${s.video.src}" title="${s.video.title}" loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
  }
  return `<div class="ccx-illustration">${s.illustration || ''}</div>`;
}

/**
 * Old anchor ids from the previous Solutions page, kept as empty targets so the
 * nav dropdown and any shared links still land in the right place.
 */
const aliasAnchors = (s) =>
  (s.aliases || []).map((a) => `<span id="${a}" class="ccx-alias" aria-hidden="true"></span>`).join('');

/**
 * "At organization scale" callout. Marks where a product stops being a
 * single-site tool and becomes an org-level, per-site capability — the
 * distinction between the academic/site buyer and the network/SMO/CRO/sponsor
 * buyer.
 */
/**
 * "At organization scale" callout. Rendered full-width below the copy/media
 * grid (not inside the copy column) so it does not make one side taller than
 * the other — which is what made the Horizon section look lopsided.
 */
const scaleBlock = (scale) =>
  !scale
    ? ''
    : `<div class="ccx-scale">
        <div class="ccx-scale-label">${scale.label}</div>
        <div class="ccx-scale-cols">
          <p class="ccx-scale-body">${scale.body}</p>
          <ul class="ccx-scale-points">
            ${scale.points.map((p) => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      </div>`;

/**
 * Each product/audience section is its own full-width band with an alternating
 * background, rather than a card in a centered column. This is what makes the
 * page read as flowing edge-to-edge instead of a stack of centered blocks, and
 * it gives each section a distinct backdrop so they stand apart.
 */
const section = (s, i) => {
  const reverse = s.reverse ?? i % 2 === 1;
  const band = i % 2 === 0 ? 'ccx-band-a' : 'ccx-band-b';
  return `
    ${aliasAnchors(s)}
    <section id="${s.id}" class="cc-fullbleed ccx-band ${band}${reverse ? ' reverse' : ''} reveal">
      <div class="ccx-band-inner">
        <div class="ccx-inner">
          <div class="ccx-copy">
            <div class="ccx-eyebrow">${s.eyebrow}</div>
            <h2 class="ccx-title">${s.title}</h2>
            <p class="ccx-desc">${s.desc}</p>
            <ul class="ccx-bullets">
              ${s.bullets.map((b) => `<li class="ccx-li"><div class="ccx-check">&#10003;</div><span>${b}</span></li>`).join('')}
            </ul>
            ${s.ctas?.length ? `<div class="ccx-cta-row">${s.ctas.map(cta).join('')}</div>` : ''}
          </div>
          <div class="ccx-media">
            ${mediaFor(s)}
          </div>
        </div>
        ${scaleBlock(s.scale)}
      </div>
    </section>`;
};

/**
 * Difficulty-led proof strip — a full-width dark band, same structure and
 * padding as the product bands so its spacing is consistent. No volume metrics.
 */
function proofMarkup(p) {
  return `
    <section class="cc-fullbleed ccx-band ccx-band-dark">
      <div class="ccx-band-inner ccx-header">
        <p class="ccx-kicker reveal">${p.kicker}</p>
        <h2 class="ccx-h1 reveal">${p.heading}</h2>
        <p class="ccx-sub reveal">${p.sub}</p>
        <div class="ccx-proof">
          ${p.items
            .map(
              (i) => `<a class="ccx-proof-item reveal" href="/our-work?study=${i.study}">
                <b>${i.stat}</b><span>${i.label}</span>
              </a>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
}

function mount(el, data) {
  const page = PAGES[data.ccPage || 'solutions'];
  if (!page) {
    console.warn(`[cc] no sections data for page "${data.ccPage}"`);
    return;
  }

  injectCSS('sections', css);
  el.classList.add('cc-sections');

  el.innerHTML = `
    <div class="cc-fullbleed ccx-band ccx-header-band">
      <div class="ccx-band-inner ccx-header">
        <p class="ccx-kicker reveal">${page.kicker}</p>
        <h1 class="ccx-h1 reveal">${page.heading}</h1>
        <p class="ccx-sub reveal">${page.sub}</p>
        ${
          page.showJumps
            ? `<div class="ccx-jumps">${page.sections
                .map((s) => `<a class="ccx-chip reveal" href="#${s.id}"><span class="ccx-dot"></span> ${s.eyebrow}</a>`)
                .join('')}</div>`
            : ''
        }
      </div>
    </div>
    ${page.sections.map(section).join('')}
  `;

  /**
   * A screenshot shorter than the frame cap has nothing to fade, so drop the
   * gradient — otherwise it renders as a stray band across the bottom.
   *
   * Computed from the known intrinsic ratio and the frame's own width, not from
   * the loaded image: with loading="lazy" the image may not have arrived yet,
   * and a load-dependent check leaves the fade wrong until it does. Whether a
   * crop happens is a function of column width, so this re-runs on resize.
   */
  const shots = [...el.querySelectorAll('.ccx-shot')];
  if (shots.length) {
    const sync = () => {
      shots.forEach((frame) => {
        const ratio = parseFloat(frame.dataset.ratio || '0');
        const cap = parseFloat(getComputedStyle(frame).maxHeight);
        if (!ratio || !Number.isFinite(cap)) return;
        frame.classList.toggle('is-short', frame.clientWidth * ratio < cap - 1);
      });
    };
    sync();
    if ('ResizeObserver' in window) new ResizeObserver(sync).observe(el);
    else window.addEventListener('resize', sync, { passive: true });
  }

  // Smooth in-page anchors. Only intercept links whose target actually exists,
  // and let everything else behave natively — a cross-page link like
  // /#How-We-Work must not be swallowed.
  el.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = el.querySelector(id) || document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  /**
   * Enable the reveal animation only now that JS is confirmed running. Content
   * is visible by default, so a failed bundle degrades to a plain page instead
   * of a blank one.
   */
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  el.setAttribute('data-reveal', '');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  el.querySelectorAll('.reveal').forEach((r) => io.observe(r));
}

define('sections', mount);

function mountProof(el) {
  injectCSS('sections', css);
  el.classList.add('cc-sections');
  el.innerHTML = proofMarkup(HARD_PROTOCOLS);

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  el.setAttribute('data-reveal', '');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  el.querySelectorAll('.reveal').forEach((r) => io.observe(r));
}

define('proof', mountProof);
