import { define, injectCSS } from '../../core/mount.js';
import { PARTNER_LOGOS } from './logos.data.js';
import css from './logos.css';

function mount(el, data) {
  injectCSS('logos', css);
  el.classList.add('cc-logos');

  const title = data.ccTitle || 'Trusted by research teams at leading institutions';
  const sub =
    data.ccSub ||
    'Academic medical centres, hospital systems, and university research groups rely on CliniContact to fill their studies.';

  el.innerHTML = `
    <div class="ccl-inner">
      <div class="ccl-head">
        <span class="ccl-eyebrow">Partner institutions</span>
        <h2 class="ccl-title">${title}</h2>
        <p class="ccl-sub">${sub}</p>
      </div>
      <div class="ccl-grid">
        ${PARTNER_LOGOS.map(
          (l) => `<div class="ccl-item"><img src="${l.src}" alt="${l.name}" loading="lazy" /></div>`
        ).join('')}
      </div>
    </div>
  `;
}

define('logos', mount);
