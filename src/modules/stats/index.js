import { define, injectCSS } from '../../core/mount.js';
import css from './stats.css';

/**
 * "Our Results" counters.
 *
 * The original embed declared its navy palette on :root, which leaked
 * --cc-text: #EAF0FF across the whole page and forced other sections into
 * !important overrides. Everything here is scoped to .cc-stats.
 */

export const STATS = [
  { value: 132, suffix: '+', label: 'Conditions' },
  { value: 284, suffix: 'M', label: 'Patients Reached' },
  { value: 112, suffix: '%', label: 'Increase in Randomizations' },
  { value: 14, suffix: '+', label: 'Hours Saved for Research Teams Weekly' },
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function animate(el, target, suffix, reduced) {
  if (reduced) {
    el.textContent = `${target}${suffix}`;
    return;
  }
  const duration = 1150;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = `${Math.round(target * easeOutCubic(p))}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function mount(el) {
  injectCSS('stats', css);
  el.classList.add('cc-stats');

  el.innerHTML = `
    <div class="ccs-inner">
      <div class="ccs-header"><div class="ccs-kicker">Our Results</div></div>
      <div class="ccs-grid" role="list">
        ${STATS.map(
          (s) => `
          <div class="ccs-stat" role="listitem">
            <div class="ccs-value"><span class="ccs-count" data-target="${s.value}" data-suffix="${s.suffix}">0</span></div>
            <div class="ccs-label">${s.label}</div>
          </div>`
        ).join('')}
      </div>
    </div>
  `;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let started = false;

  function start() {
    if (started) return;
    started = true;

    el.querySelectorAll('.ccs-stat').forEach((card, i) => {
      if (reduced) card.classList.add('is-visible');
      else setTimeout(() => card.classList.add('is-visible'), i * 90);
    });

    el.querySelectorAll('.ccs-count').forEach((c) => {
      animate(c, Number(c.dataset.target || 0), c.dataset.suffix || '', reduced);
    });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
  } else {
    start();
  }
}

define('stats', mount);
