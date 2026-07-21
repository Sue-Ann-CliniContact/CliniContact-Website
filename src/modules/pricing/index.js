import { define, injectCSS } from '../../core/mount.js';
import { TIERS, ENTERPRISE, ALWAYS_INCLUDED, ENTRY_LABEL } from './pricing.data.js';
import css from './pricing.css';

const isAnchor = (price) => /^[$\d]/.test(price);

const tierCard = (t) => `
  <div class="ccpr-card${t.featured ? ' featured' : ''}">
    ${t.badge ? `<span class="ccpr-badge">${t.badge}</span>` : ''}
    <h3 class="ccpr-name">${t.name}</h3>
    <p class="ccpr-tagline">${t.tagline}</p>
    <div>
      ${isAnchor(t.price) ? '<div class="ccpr-from">From</div>' : ''}
      <div class="ccpr-price"><b>${t.price}</b><span>${t.unit}</span></div>
    </div>
    <p class="ccpr-pnote">${t.priceNote}</p>
    <ul class="ccpr-features">
      ${t.features.map((f) => `<li>${f}</li>`).join('')}
    </ul>
    <button class="ccpr-btn" type="button" data-cc-contact="${t.id}">${t.cta}</button>
  </div>
`;

function mount(el) {
  injectCSS('pricing', css);
  el.classList.add('cc-pricing');

  el.innerHTML = `
    <div class="ccpr-bg">
      <div class="ccpr-inner">
        <div class="ccpr-head">
          <p class="ccpr-kicker">Pricing</p>
          <h1 class="ccpr-h1">Pick a starting point. Add more when you're ready.</h1>
          <p class="ccpr-sub">Start with the pressure point that matters most. Every package can expand, and the entry tiers below scale to a flat fee as you add studies and sites. Whatever your budget, we build the plan around it and give you an honest picture of what to expect, before you spend rather than after.</p>

          <div class="ccpr-included">
            <span class="ccpr-included-lead">In every package</span>
            ${ALWAYS_INCLUDED.map((i) => `<span class="ccpr-inc">${i.name} <span>${i.note}</span></span>`).join('')}
          </div>
        </div>

        <p class="ccpr-entry-label">${ENTRY_LABEL}</p>
        <div class="ccpr-grid">
          ${TIERS.map(tierCard).join('')}
        </div>

        <div class="ccpr-ent">
          <div>
            <div class="ccpr-ent-eyebrow">${ENTERPRISE.eyebrow}</div>
            <h3 class="ccpr-ent-name">${ENTERPRISE.name}</h3>
            <p class="ccpr-ent-desc">${ENTERPRISE.desc}</p>
            <div class="ccpr-models">
              ${ENTERPRISE.models.map((m) => `<span class="ccpr-model">${m}</span>`).join('')}
            </div>
          </div>
          <ul class="ccpr-ent-inc">
            ${ENTERPRISE.includes.map((i) => `<li>${i}</li>`).join('')}
          </ul>
          <button class="ccpr-ent-btn" type="button" data-cc-contact="enterprise">${ENTERPRISE.cta}</button>
        </div>

        <p class="ccpr-foot">Smart Screener and Vision are included with any package; they are not sold separately. Horizon and Bridge can be combined. The prices above are starting points for a single study at a single site; networks, SMOs, CROs and sponsors get a custom model scoped to their portfolio.</p>
      </div>
    </div>
  `;
}

define('pricing', mount);
