/**
 * Module registry.
 *
 * Webflow embeds are just mount points — `<div data-cc="nav"></div>`. Each
 * module registers itself here, and mountAll() wires up whatever is on the page.
 * An embed that stays under ~40 characters never hits Webflow's 10k limit.
 */

const registry = new Map();
const injected = new Set();

/** Register a module under a name used by `data-cc="<name>"`. */
export function define(name, factory) {
  registry.set(name, factory);
}

/** Inject a stylesheet once per page, no matter how many modules ask for it. */
export function injectCSS(id, css) {
  if (injected.has(id)) return;
  injected.add(id);
  const style = document.createElement('style');
  style.dataset.ccStyle = id;
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Legacy mount points from the old embeds used bare ids (`<div id="cc-nav">`).
 * Mapping them here means the old embeds keep working during migration — you
 * can move pages over one at a time instead of in a single risky sweep.
 */
const LEGACY_IDS = { 'cc-nav': 'nav' };

function mountEl(el, name) {
  if (el.dataset.ccMounted) return;
  const factory = registry.get(name);
  if (!factory) {
    console.warn(`[cc] no module registered for "${name}"`);
    return;
  }
  el.dataset.ccMounted = '1';
  try {
    factory(el, { ...el.dataset });
  } catch (err) {
    // A broken module must never take down the rest of the page.
    console.error(`[cc] module "${name}" failed to mount`, err);
  }
}

export function mountAll(root = document) {
  root.querySelectorAll('[data-cc]').forEach((el) => mountEl(el, el.dataset.cc));
  for (const [id, name] of Object.entries(LEGACY_IDS)) {
    const el = root.getElementById?.(id) ?? root.querySelector(`#${id}`);
    if (el) mountEl(el, name);
  }
}

export function ready(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}
