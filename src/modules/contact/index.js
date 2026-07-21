import { injectCSS } from '../../core/mount.js';
import { PRICING_FORM } from '../pricing/pricing.data.js';
import css from './modal.css';

/**
 * "Request a quote" modal.
 *
 * Previously a built-in name/email/persona form that POSTed to /api/lead. Now
 * it embeds the hosted pricing/demo form (forms.clinicontact.com/pricing) in an
 * iframe, so there is a single lead form to maintain and it opens in a modal
 * rather than navigating away from the page.
 *
 * Module name and exports (openContact/closeContact/initContact) are unchanged
 * so nav, chat and the global [data-cc-contact] delegate keep working.
 *
 * The form host sends no X-Frame-Options / frame-ancestors, so it embeds fine.
 * A fallback "open in a new tab" link covers any browser that still blocks it.
 */

let modal = null;
let frame = null;
let lastFocused = null;

function build() {
  injectCSS('contact-modal', css);

  modal = document.createElement('div');
  modal.className = 'cc-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Request a quote');
  modal.innerHTML = `
    <div class="cc-modal-card">
      <div class="cc-modal-head">
        <div>
          <h2>Request a quote</h2>
          <p>Tell us about your study and we'll come back with pricing.</p>
        </div>
        <div class="cc-modal-head-actions">
          <a class="cc-modal-ext" href="${PRICING_FORM}" target="_blank" rel="noopener" title="Open in a new tab">Open in new tab &#8599;</a>
          <button class="cc-x" type="button" data-close aria-label="Close">&#10005;</button>
        </div>
      </div>
      <div class="cc-modal-body">
        <div class="cc-modal-loading" data-loading>Loading form…</div>
        <iframe class="cc-modal-frame" data-frame title="Request a quote form" loading="lazy"></iframe>
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
 * @param {string} [source] optional context (e.g. "horizon") appended as a
 *   ?source= param, so the form can attribute where the request came from if it
 *   chooses to read it. Harmless if ignored.
 */
export function openContact(source) {
  if (!modal) build();
  lastFocused = document.activeElement;

  const loading = modal.querySelector('[data-loading]');
  loading.style.display = '';
  const url = source ? `${PRICING_FORM}?source=${encodeURIComponent(source)}` : PRICING_FORM;
  // (Re)load each open so the form starts fresh.
  frame.src = url;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('[data-close]').focus();
}

export function closeContact() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // Stop the framed form running while closed.
  frame.src = 'about:blank';
  lastFocused?.focus?.();
}

/** `?contact=true` / `?openContact=1` deep-links straight into the modal. */
function shouldAutoOpen() {
  const p = new URLSearchParams(window.location.search);
  const truthy = (v) => v === 'true' || v === '1';
  return truthy(p.get('contact')) || truthy(p.get('openContact'));
}

export function initContact() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeContact();
  });

  /**
   * Any element opts in with data-cc-contact. Its value, if any, is passed as
   * the source: <button data-cc-contact="horizon">. `data-cc-open-contact` is
   * the legacy hero attribute, still supported.
   */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-cc-contact], [data-cc-open-contact]');
    if (trigger) {
      e.preventDefault();
      openContact(trigger.getAttribute('data-cc-contact') || undefined);
    }
  });

  if (shouldAutoOpen()) openContact();
}
