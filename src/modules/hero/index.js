import { define, injectCSS } from '../../core/mount.js';
import css from './hero.css';

/**
 * Homepage hero.
 *
 * Two constraints shape the copy:
 *
 * 1. No enrollment promise. CliniContact delivers prescreened, verified
 *    referrals; the site consents and enrolls. Headlining "enrolled" commits to
 *    an outcome outside their control, which is both a commercial risk and
 *    something sponsors will push on. The endpoint is the site handoff.
 * 2. No competitor reference. Naming a rival on your own homepage reads
 *    defensively and gives them oxygen. The differentiator — that most vendors
 *    engage only after materials clear IRB — is stated as a category fact.
 *
 * Also carries no volume metrics; scale is the comparison CliniContact loses.
 */

/**
 * `accent` is a bright variant of each product's signature colour (the product
 * sections use darker, text-safe versions of the same hues on white). Bright is
 * needed here because the badges sit on the dark navy hero.
 */
const STAGES = [
  {
    stage: 'Startup & digital recruitment',
    name: 'Horizon',
    desc: 'Recruitment package built, then campaigns we run to your ad spend.',
    href: '#horizon',
    accent: '#4ba0f8',
  },
  {
    stage: 'Referral pathways',
    name: 'Bridge',
    desc: 'Community and provider networks matched to your catchment area.',
    href: '#bridge',
    accent: '#2dd4bf',
  },
  {
    stage: 'Prescreening',
    name: 'Smart Screener',
    desc: 'Your I/E criteria applied before a coordinator is involved.',
    href: '#smart-screener',
    accent: '#a78bfa',
  },
  {
    stage: 'Participant record',
    name: 'Vision',
    desc: 'Every message and outcome on one auditable timeline.',
    href: '#vision',
    accent: '#fb923c',
  },
];

const PILLS = ['HIPAA & GDPR aligned', '21 CFR Part 11 aware workflows', 'Central & local IRB', 'Decentralised and site-based'];

function mount(el) {
  injectCSS('hero', css);
  el.classList.add('cc-hero');

  el.innerHTML = `
    <div class="cc-fullbleed">
      <div class="cch-bg">
        <div class="cch-inner">
          <span class="cch-kicker"><span class="cch-dot"></span>Recruitment operations for clinical research</span>

          <h1 class="cch-h1">From protocol to <span class="accent">prescreened referral</span>.</h1>

          <p class="cch-sub">
            Most recruitment partners get involved only after your materials clear IRB. We engage earlier,
            right at the protocol: study startup, referral pathways to underrepresented populations, and
            inclusion/exclusion prescreening. By the time we hand off to your coordinators, they receive a
            qualified, verified record.
          </p>

          <!--
            CTA ladder, lowest friction first. "Request a quote" asks for scope,
            not calendar time — it converts better than "book a demo" because
            nobody has to commit to a call to find out what this costs.
          -->
          <div class="cch-actions">
            <button type="button" class="cch-btn primary" data-cc-contact>Request a quote</button>
            <a class="cch-btn" href="#horizon">See the platform <span aria-hidden="true">&darr;</span></a>
          </div>

          <div class="cch-spine">
            ${STAGES.map(
              (s, i) => `
              <a class="cch-step" href="${s.href}" style="--accent:${s.accent}">
                <span class="cch-step-n">${i + 1}</span>
                <span class="cch-step-stage">${s.stage}</span>
                <span class="cch-step-name">${s.name}</span>
                <p class="cch-step-desc">${s.desc}</p>
              </a>`
            ).join('')}
          </div>

          <div class="cch-pills">
            ${PILLS.map((p) => `<span class="cch-pill">${p}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Smooth-scroll the in-page product links.
  el.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

define('hero', mount);
