import { mountAll, ready, injectCSS } from './core/mount.js';
import { initContact, openContact, closeContact } from './modules/contact/index.js';
import tokens from './core/tokens.css';

// Modules self-register with define() on import.
import './modules/nav/index.js';
import './modules/hero/index.js';
import './modules/logos/index.js';
import './modules/newsletter/index.js';
import './modules/participant/index.js';
import './modules/partner/index.js';
import './modules/pricing/index.js';
import './modules/testimonials/index.js';
import './modules/stats/index.js';
import './modules/sections/index.js';
import './modules/work/index.js';
import './modules/chat/index.js';
import './modules/footer/index.js';

/**
 * Measure the scrollbar so .cc-fullbleed can subtract it from 100vw. Re-measured
 * on resize because scrollbars appear and disappear as content height changes.
 */
function measureScrollbar() {
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--cc-sbw', `${Math.max(0, sbw)}px`);
}

ready(() => {
  injectCSS('tokens', tokens);
  measureScrollbar();
  window.addEventListener('resize', measureScrollbar, { passive: true });
  initContact();
  mountAll();
});

// Small public surface so Webflow-side snippets and other embeds can call in.
window.CC = { openContact, closeContact, mountAll };
