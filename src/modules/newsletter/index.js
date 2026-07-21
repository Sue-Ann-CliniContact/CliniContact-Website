import { define, injectCSS } from '../../core/mount.js';
import { NEWSLETTER_URL } from '../../core/api.js';
import css from './newsletter.css';

/**
 * Newsletter band.
 *
 * Was an on-site email-capture form, which needed a backend endpoint that was
 * never built. Replaced with a link to the LinkedIn newsletter ("Protocol to
 * Patients"): no backend, no consent handling, and LinkedIn owns delivery. The
 * module name and `data-cc="newsletter"` mount point are unchanged.
 */
function mount(el) {
  injectCSS('newsletter', css);
  el.classList.add('cc-news');

  el.innerHTML = `
    <div class="ccn-inner">
      <div>
        <span class="ccn-eyebrow">Protocol to Patients · our newsletter</span>
        <h2 class="ccn-title">Enrollment operations, in your feed.</h2>
        <p class="ccn-sub">
          Protocol-level recruitment tactics, IRB and Diversity Action Plan changes worth
          knowing about, and what is actually moving enrollment for research teams —
          published on LinkedIn.
        </p>
      </div>
      <a class="ccn-btn" href="${NEWSLETTER_URL}" target="_blank" rel="noopener">
        Subscribe on LinkedIn <span aria-hidden="true">&#8599;</span>
      </a>
    </div>
  `;
}

define('newsletter', mount);
