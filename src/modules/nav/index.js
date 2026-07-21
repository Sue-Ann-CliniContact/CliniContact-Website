import { define, injectCSS } from '../../core/mount.js';
import { openContact } from '../contact/index.js';
import { NAV_LINKS, PARTICIPANT_LINK, LOGO_SRC } from './nav.data.js';
import css from './nav.css';

const CARET = `<svg class="ccn-caret" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M7 10l5 5 5-5H7z"/></svg>`;

const menuItem = ({ label, href, note }) =>
  `<a href="${href}">${label}${note ? `<span class="ccn-note">${note}</span>` : ''}</a>`;

/** Rich product row: funnel stage, name, one-line description, "included" tag. */
const megaItem = ({ stage, label, href, note, included }) => `
  <a class="ccn-mega-item" href="${href}">
    <span class="ccn-mega-stage">${stage || ''}</span>
    <span class="ccn-mega-name">${label}${included ? '<span class="ccn-mega-tag">Included</span>' : ''}</span>
    <span class="ccn-mega-note">${note || ''}</span>
  </a>`;

function desktopLinks() {
  return NAV_LINKS.map((item, i) => {
    if (!item.children) return `<a class="ccn-link" href="${item.href}" role="menuitem">${item.label}</a>`;

    const body = item.mega
      ? `<div class="ccn-mega-grid">${item.children.map(megaItem).join('')}</div>
         ${item.footer ? `<a class="ccn-mega-foot" href="${item.footer.href}">${item.footer.label} <span aria-hidden="true">&rarr;</span></a>` : ''}`
      : item.children.map(menuItem).join('');

    return `
      <div class="ccn-dd${item.mega ? ' ccn-dd-mega' : ''}" data-dd>
        <button type="button" aria-haspopup="true" aria-expanded="false" id="ccn-dd-${i}">
          ${item.label}${CARET}
        </button>
        <div class="ccn-menu" role="menu" aria-labelledby="ccn-dd-${i}">
          ${body}
        </div>
      </div>`;
  }).join('');
}

function mobileLinks() {
  return NAV_LINKS.map((item) => {
    if (!item.children) return `<a href="${item.href}">${item.label}</a>`;
    return `
      <button class="ccn-mobile-link" type="button" data-mobile-dd aria-expanded="false">
        ${item.label}${CARET}
      </button>
      <div class="ccn-mobile-dd">
        ${item.children.map((c) => `<a href="${c.href}">${c.label}</a>`).join('')}
        ${item.footer ? `<a href="${item.footer.href}">${item.footer.label} &rarr;</a>` : ''}
      </div>`;
  }).join('');
}

function navMarkup() {
  return `
    <div class="ccn-bar">
      <div class="ccn-inner">
        <div class="ccn-brand">
          <a class="ccn-logo" href="https://www.clinicontact.com" aria-label="CliniContact home">
            <img src="${LOGO_SRC}" alt="CliniContact" />
          </a>
        </div>

        <nav class="ccn-links" role="menubar" aria-label="Main">
          ${desktopLinks()}
        </nav>

        <div class="ccn-actions">
          <a class="ccn-btn secondary" href="${PARTICIPANT_LINK.href}"${PARTICIPANT_LINK.external ? ' target="_blank" rel="noopener"' : ''}>${PARTICIPANT_LINK.label}</a>
          <!-- Highest-visibility CTA on every page. "Request a quote" asks for
               scope rather than calendar time, so it converts better than
               "Contact us" or "Book a demo". The footer keeps "Contact us" as a
               plain utility link. -->
          <button class="ccn-btn primary" type="button" data-cc-contact>Request a quote</button>
          <button class="ccn-burger" type="button" data-burger aria-label="Menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
        </div>
      </div>

      <div class="ccn-mobile" data-mobile>
        <div class="ccn-mobile-inner">
          ${mobileLinks()}
          <a class="ccn-participant" href="${PARTICIPANT_LINK.href}" target="_blank" rel="noopener">Looking to join a study?</a>
        </div>
      </div>
    </div>
  `;
}

function mount(el, data = {}) {
  injectCSS('nav', css);
  el.classList.add('cc-nav');
  el.innerHTML = navMarkup();

  const mobile = el.querySelector('[data-mobile]');
  const burger = el.querySelector('[data-burger]');

  /**
   * Dark nav over a dark hero, resolving to the light bar on scroll.
   *
   * Opt-in per page via `data-cc-dark` on the embed, e.g.
   *   <div data-cc="nav" data-cc-dark></div>
   * The homepage sets it (dark hero); Solutions, Our Work and How We Partner do
   * not (they open light, where a navy bar would look broken).
   *
   * Deliberately an explicit attribute rather than sniffing for a `.cc-hero` in
   * the DOM: that would depend on mount order and on requestAnimationFrame,
   * which can stall (background tabs, heavy first paint), leaving the nav in the
   * wrong state. The page author already knows whether its hero is dark.
   */
  if (data.ccDark !== undefined) {
    el.classList.add('is-dark');
    const THRESHOLD = 40;
    const syncTop = () => el.classList.toggle('at-top', window.scrollY < THRESHOLD);
    syncTop();
    window.addEventListener('scroll', syncTop, { passive: true });
  }

  // Desktop dropdowns
  const dropdowns = [...el.querySelectorAll('[data-dd]')];
  dropdowns.forEach((dd) => {
    const btn = dd.querySelector('button');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !dd.classList.contains('open');
      // Only one dropdown open at a time.
      dropdowns.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      dd.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  const closeAll = () => {
    dropdowns.forEach((dd) => {
      dd.classList.remove('open');
      dd.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  };

  // One document listener for the whole nav instead of one per dropdown.
  document.addEventListener('mousedown', (e) => {
    if (!el.contains(e.target)) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  // Mobile menu
  burger.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  el.querySelectorAll('[data-mobile-dd]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /**
   * Close the mobile menu after tapping a link. Without this, same-page hash
   * links (About, How We Partner) leave the panel open covering the section
   * the user just jumped to — the old embed had this bug.
   */
  mobile.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      mobile.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact button is handled by the global [data-cc-contact] delegate, but
  // keep a direct binding so the nav works even if init order changes.
  el.querySelector('[data-cc-contact]').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openContact();
  });
}

define('nav', mount);
