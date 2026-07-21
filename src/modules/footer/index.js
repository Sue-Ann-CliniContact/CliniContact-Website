import { define, injectCSS } from '../../core/mount.js';
import { LOGO_SRC } from '../nav/nav.data.js';
import { SOCIAL } from '../../core/api.js';
import css from './footer.css';

const SITE = 'https://www.clinicontact.com';
const PHONE = '+1 (267) 495-4353';
const PHONE_TEL = '+12674954353';
const EMAIL = 'support@clinicontact.com';

const ICONS = {
  shield: `<path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm0 19.82C8.13 19.66 5 15.09 5 11.2V6.3l7-3.11 7 3.11v4.9c0 3.89-3.13 8.46-7 9.62Zm-1-6.82 6-6-1.41-1.41L11 11.17 8.41 8.59 7 10l4 4Z"/>`,
  doc: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7V3.5L18.5 9H15ZM8 13h8v2H8v-2Zm0 4h8v2H8v-2Zm0-8h5v2H8V9Z"/>`,
  user: `<path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2-8 4.5V21h16v-2.5C20 16 16.42 14 12 14Z"/>`,
  shieldPlain: `<path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm0 19.82C8.13 19.66 5 15.09 5 11.2V6.3l7-3.11 7 3.11v4.9c0 3.89-3.13 8.46-7 9.62Z"/>`,
  linkedin: `<path d="M20.45 20.45h-3.55v-5.56c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.66H9.38V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45Z"/>`,
  facebook: `<path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.77-1.62 1.56V12h2.76l-.44 2.88h-2.32v6.99A10 10 0 0 0 22 12Z"/>`,
  up: `<path fill="currentColor" d="M12 4 4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12 12 4Z"/>`,
};

const icon = (name, cls = 'ccf-ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

function mount(el) {
  injectCSS('footer', css);
  el.classList.add('cc-footer');

  el.innerHTML = `
    <div class="cc-fullbleed">
      <div class="ccf-wrap">
        <div class="ccf-inner">
          <div class="ccf-card">
            <div class="ccf-grid">
              <div class="ccf-col">
                <div class="ccf-brand">
                  <div class="ccf-logo"><img src="${LOGO_SRC}" alt="CliniContact logo" loading="lazy" /></div>
                  <p class="ccf-sub">
                    Enrollment partner for research teams: targeted outreach, smart screening,
                    and validated handoff to your site.
                  </p>
                  <div class="ccf-actions">
                    <button type="button" class="ccf-btn primary" data-cc-contactus>
                      Contact us <span aria-hidden="true">&rarr;</span>
                    </button>
                    <a class="ccf-btn" href="tel:${PHONE_TEL}">Call <span aria-hidden="true">&#9742;</span></a>
                  </div>
                  <div class="ccf-small">
                    <div><b>Phone:</b> ${PHONE}</div>
                    <div><b>Email:</b> ${EMAIL}</div>
                  </div>
                </div>
              </div>

              <div class="ccf-col">
                <h4>Quick links</h4>
                <div class="ccf-links">
                  <a class="ccf-link" href="${SITE}/privacy-policy">${icon('shield')}Privacy Policy</a>
                  <a class="ccf-link" href="${SITE}/privacy-notice">${icon('doc')}Privacy Notice</a>
                </div>
              </div>

              <div class="ccf-col">
                <h4>Connect</h4>
                <div class="ccf-links" style="margin-bottom:12px;">
                  <a class="ccf-link" href="${SOCIAL.linkedinNewsletter}" target="_blank" rel="noopener">${icon('doc')}Protocol to Patients newsletter</a>
                  <div class="ccf-link ccf-static">${icon('user')}US &amp; UK customers</div>
                  <div class="ccf-link ccf-static">${icon('shieldPlain')}HIPAA &amp; GDPR aligned workflows</div>
                </div>
                <div class="ccf-social" aria-label="Social links">
                  <a href="${SOCIAL.linkedin}" target="_blank" rel="noopener" aria-label="CliniContact LinkedIn">${icon('linkedin', '')}</a>
                  <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="CliniContact Facebook">${icon('facebook', '')}</a>
                </div>
              </div>
            </div>

            <div class="ccf-bottom">
              <div>&copy; <span data-year></span> CliniContact. All rights reserved.</div>
              <div class="ccf-bottom-links">
                <a href="${SITE}/privacy-policy">Privacy Policy</a>
                <a href="${SITE}/privacy-notice">Privacy Notice</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ccf-top" data-top>
      <button type="button" aria-label="Back to top">${icon('up', 'ccf-upico')}Back to top</button>
    </div>
  `;

  el.querySelector('[data-year]').textContent = String(new Date().getFullYear());

  const top = el.querySelector('[data-top]');
  const onScroll = () => top.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

define('footer', mount);
