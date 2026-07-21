import { define, injectCSS } from '../../core/mount.js';
import { PARTNER_PAGE } from './partner.data.js';
import css from './partner.css';

function mount(el) {
  injectCSS('partner', css);
  el.classList.add('cc-partner');

  const p = PARTNER_PAGE;

  el.innerHTML = `
    <div class="ccpt-bg">
      <div class="ccpt-inner">
        <p class="ccpt-kicker">${p.kicker}</p>
        <h1 class="ccpt-h1">${p.heading}</h1>
        <p class="ccpt-sub">${p.sub}</p>

        <div class="ccpt-phases">
          ${p.phases
            .map(
              (ph) => `
            <div class="ccpt-phase">
              <div>
                <span class="ccpt-n">${ph.n}</span>
                <span class="ccpt-window">${ph.window}</span>
              </div>
              <div>
                <h2 class="ccpt-title">${ph.title}</h2>
                <p class="ccpt-body">${ph.body}</p>
              </div>
              <div class="ccpt-swap">
                <div><b>You provide</b><span>${ph.you}</span></div>
                <div><b>You receive</b><span>${ph.us}</span></div>
              </div>
            </div>`
            )
            .join('')}
        </div>

        <div class="ccpt-principles">
          ${p.principles
            .map((pr) => `<div class="ccpt-principle"><h3>${pr.title}</h3><p>${pr.body}</p></div>`)
            .join('')}
        </div>

        <div class="ccpt-cta">
          <button type="button" class="ccpt-btn" data-cc-contact>Request a quote</button>
        </div>
      </div>
    </div>
  `;
}

define('partner', mount);
