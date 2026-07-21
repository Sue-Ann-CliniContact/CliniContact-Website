import { define, injectCSS } from '../../core/mount.js';
import { TESTIMONIALS, PUBLISHABLE } from './testimonials.data.js';
import css from './testimonials.css';

const esc = (s) =>
  String(s ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

/** Byline from name (if named) or role, plus organization. */
const attribution = (t) => {
  const who = t.name || t.role || '';
  return [who, t.org].filter(Boolean).map(esc).join(' &middot; ');
};

const card = (t) => `
  <figure class="cct-card">
    <div class="cct-quote-mark" aria-hidden="true">&ldquo;</div>
    <blockquote class="cct-quote">${esc(t.quote)}</blockquote>
    <figcaption class="cct-by">${attribution(t)}</figcaption>
  </figure>
`;

function mount(el) {
  injectCSS('testimonials', css);
  el.classList.add('cc-testimonials');

  // Consent gate: only 'named' or 'anonymous' entries are ever rendered.
  const items = TESTIMONIALS.filter((t) => PUBLISHABLE.includes(t.consent));
  if (!items.length) {
    el.remove();
    return;
  }

  el.innerHTML = `
    <div class="cct-inner">
      <div class="cct-head">
        <p class="cct-kicker">In their words</p>
        <h2 class="cct-title">Research teams on working with us.</h2>
      </div>
      <div class="cct-grid">
        ${items.map(card).join('')}
      </div>
    </div>
  `;
}

define('testimonials', mount);
