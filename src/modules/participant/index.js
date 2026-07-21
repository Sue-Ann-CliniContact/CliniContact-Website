import { define, injectCSS } from '../../core/mount.js';
import { PARTICIPANT_URL } from '../../core/api.js';
import css from './participant.css';

/**
 * Participant off-ramp.
 *
 * Members of the public land on this B2B site regularly looking to join a
 * study. Without a visible route out, they either bounce or fill in the sales
 * contact form. This band gives them an obvious, low-key exit to Beacon.
 *
 * Deliberately understated: it must be findable by someone looking for it
 * without competing for attention with the sponsor/CRO narrative.
 */
function mount(el) {
  injectCSS('participant', css);
  el.classList.add('cc-participant');

  el.innerHTML = `
    <div class="ccp-inner">
      <div class="ccp-copy">
        <h2 class="ccp-title">Looking to take part in research yourself?</h2>
        <p class="ccp-sub">
          This site is for research teams and sponsors. Beacon lists studies currently
          looking for participants, explained in plain language, free to browse, with no
          obligation to contact anyone.
        </p>
      </div>
      <a class="ccp-btn" href="${PARTICIPANT_URL}" target="_blank" rel="noopener">
        Find studies on Beacon <span aria-hidden="true">&#8599;</span>
      </a>
    </div>
  `;
}

define('participant', mount);
