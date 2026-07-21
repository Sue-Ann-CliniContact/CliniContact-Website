import { injectCSS } from '../../core/mount.js';
import { CONTACT_FORM } from '../../core/api.js';
import { PRICING_FORM } from '../pricing/pricing.data.js';
import css from './modal.css';

/**
 * Hosted-form modal.
 *
 * One modal element serves both hosted forms, loaded in an iframe so nothing
 * navigates away:
 *   - data-cc-contact   → the pricing/quote form   ("Request a quote")
 *   - data-cc-contactus → the general contact form  ("Contact us", footer)
 *
 * Module name and exports (openContact/closeContact/initContact) are unchanged
 * so nav, chat and the global delegate keep working. Neither form host sends
 * X-Frame-Options / frame-ancestors, so both embed fine; an "open in new tab"
 * link covers any browser that still blocks framing.
 */

const FORMS = {
  quote: {
    url: PRICING_FORM,
    title: 'Request a quote',
    subtitle: "Tell us about your study and we'll come back with pricing.",
  },
  contact: {
    url: CONTACT_FORM,
    title: 'Contact us',
    subtitle: "Send us a message and we'll get back to you.",
  },
};

let modal = null;
let frame = null;
let lastFocused = null;

function build() {
  injectCSS('contact-modal', css);

  modal = document.createElement('div');
  modal.className = 'cc-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="cc-modal-card">
      <div class="cc-modal-head">
        <div>
          <h2 data-title></h2>
          <p data-subtitle></p>
        </div>
        <div class="cc-modal-head-actions">
          <a class="cc-modal-ext" data-ext target="_blank" rel="noopener" title="Open in a new tab">Open in new tab &#8599;</a>
          <button class="cc-x" type="button" data-close aria-label="Close">&#10005;</button>
        </div>
      </div>
      <div class="cc-modal-body">
        <div class="cc-modal-loading" data-loading>Loading form…</div>
        <iframe class="cc-modal-frame" data-frame title="Form" loading="lazy"></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  frame = modal.querySelector('[data-frame]');
  const loading = modal.querySelector('[data-loading]');
  frame.addEventListener('load', () => {
    if (frame.src && frame.src !== 'about:blank') loading.style.display = 'none';
  });

  modal.querySelector('[data-close]').addEventListener('click', closeContact);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeContact();
  });

  return modal;
}

/**
 * @param {'quote'|'contact'} kind which hosted form to load
 * @param {string} [source] optional context appended as ?source= for attribution
 */
function openForm(kind, source) {
  if (!modal) build();
  const cfg = FORMS[kind] || FORMS.quote;
  lastFocused = document.activeElement;

  modal.setAttribute('aria-label', cfg.title);
  modal.querySelector('[data-title]').textContent = cfg.title;
  modal.querySelector('[data-subtitle]').textContent = cfg.subtitle;
  modal.querySelector('[data-ext]').href = cfg.url;

  const loading = modal.querySelector('[data-loading]');
  loading.style.display = '';
  frame.src = source ? `${cfg.url}?source=${encodeURIComponent(source)}` : cfg.url;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('[data-close]').focus();
}

/** "Request a quote" — the pricing form. Kept as the primary export name. */
export function openContact(source) {
  openForm('quote', source);
}

/** "Contact us" — the general contact form. */
export function openContactUs(source) {
  openForm('contact', source);
}

export function closeContact() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  frame.src = 'about:blank';
  lastFocused?.focus?.();
}

/** `?contact=true` / `?openContact=1` deep-links straight into the quote form. */
function shouldAutoOpen() {
  const p = new URLSearchParams(window.location.search);
  const truthy = (v) => v === 'true' || v === '1';
  return truthy(p.get('contact')) || truthy(p.get('openContact'));
}

export function initContact() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeContact();
  });

  // Delegated triggers. A value on the attribute passes through as ?source=.
  // data-cc-open-contact is the legacy hero attribute → quote form.
  document.addEventListener('click', (e) => {
    const quote = e.target.closest('[data-cc-contact], [data-cc-open-contact]');
    const contact = e.target.closest('[data-cc-contactus]');
    if (contact) {
      e.preventDefault();
      openContactUs(contact.getAttribute('data-cc-contactus') || undefined);
    } else if (quote) {
      e.preventDefault();
      openContact(quote.getAttribute('data-cc-contact') || undefined);
    }
  });

  if (shouldAutoOpen()) openContact();
}
