import { define, injectCSS } from '../../core/mount.js';
import { submitPdfLead } from '../../core/api.js';
import { DOCS, WORK_STATS, AREA_COLORS } from './work.data.js';
import css from './work.css';

const esc = (s) =>
  String(s ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

const areaStyle = (area) =>
  AREA_COLORS[area] || { color: 'rgba(15,23,42,.70)', bg: 'rgba(15,23,42,.06)', border: 'rgba(15,23,42,.12)' };

function mount(el) {
  injectCSS('work', css);
  el.classList.add('cc-work');

  let activeArea = 'All';
  let activeDoc = null;

  el.innerHTML = `
    <div class="cw-wrap">
      <div class="cw-head">
        <div class="cw-kicker"><span class="cw-dot"></span>Our Work</div>
        <div class="cw-title">Case studies &amp; insights that build <span class="grad">enrollment confidence</span>.</div>
        <p class="cw-sub">Explore real recruitment outcomes and practical insights. Open any PDF instantly, and download with a quick email (optional).</p>
        <div class="cw-divider"></div>
      </div>

      <div class="cw-stats">
        ${WORK_STATS.map(
          (s) => `<div class="cw-stat">
            <b><span class="cw-count" data-value="${s.value}" data-suffix="${esc(s.suffix)}">0</span></b>
            <span>${esc(s.label)}</span>
          </div>`
        ).join('')}
      </div>

      <div class="cw-filters" data-filters aria-label="Filter by therapeutic area"></div>
      <div class="cw-grid" data-grid></div>
    </div>

    <div class="cw-modal" data-viewer aria-hidden="true">
      <div class="cw-modal-card" role="dialog" aria-modal="true" aria-label="PDF viewer">
        <div class="cw-modal-head">
          <b data-viewer-title>Loading…</b>
          <button class="cw-x" type="button" data-viewer-close aria-label="Close">&#10005;</button>
        </div>
        <div class="cw-frame-wrap"><iframe class="cw-frame" data-frame title="PDF"></iframe></div>
        <div class="cw-modal-actions">
          <button class="cw-btn" type="button" data-viewer-download>Download</button>
          <button class="cw-btn primary" type="button" data-viewer-close>Close</button>
        </div>
      </div>
    </div>

    <div class="cw-modal" data-gate aria-hidden="true">
      <div class="cw-gate" role="dialog" aria-modal="true" aria-label="Download request">
        <div class="cw-modal-head">
          <b data-gate-title>Get the PDF</b>
          <button class="cw-x" type="button" data-gate-close aria-label="Close">&#10005;</button>
        </div>
        <div class="cw-gate-body">
          <p>Enter your details to get the download link.</p>
          <form class="cw-form" data-form novalidate>
            <div class="cw-field">
              <label for="cw-name">Name</label>
              <input id="cw-name" name="name" placeholder="Full name" required autocomplete="name" />
            </div>
            <div class="cw-field">
              <label for="cw-email">Email</label>
              <input id="cw-email" name="email" type="email" placeholder="name@company.com" required autocomplete="email" />
            </div>
            <div class="cw-check cw-span2">
              <!-- name="consent" matters: without it the value never reaches the
                   backend, so consent is enforced in the UI but never recorded. -->
              <input type="checkbox" id="cw-consent" name="consent" value="yes" required />
              <label for="cw-consent" style="margin:0; font-weight:800;">
                I consent to CliniContact storing my details for resource follow-ups.
              </label>
            </div>
            <div class="cw-hp" aria-hidden="true"><label>Website<input name="cw_website" tabindex="-1" autocomplete="off" /></label></div>
            <input type="hidden" name="doc_title" data-doc-title />
            <input type="hidden" name="doc_url" data-doc-url />
            <input type="hidden" name="doc_type" data-doc-type />
            <input type="hidden" name="doc_area" data-doc-area />
            <input type="hidden" name="doc_indication" data-doc-indication />
            <div class="cw-span2" style="display:flex; gap:10px; justify-content:flex-end; align-items:center;">
              <button class="cw-btn" type="button" data-gate-close>Cancel</button>
              <button class="cw-btn primary" type="submit" data-submit>Get download</button>
            </div>
            <div class="cw-toast cw-span2" data-toast></div>
          </form>
          <div class="cw-note" style="margin-top:10px;">If the in-page download is blocked, you can still open the PDF directly after submitting.</div>
        </div>
      </div>
    </div>
  `;

  const q = (sel) => el.querySelector(sel);
  const grid = q('[data-grid]');
  const filters = q('[data-filters]');
  const viewer = q('[data-viewer]');
  const gate = q('[data-gate]');
  const frame = q('[data-frame]');
  const form = q('[data-form]');
  const toast = q('[data-toast]');
  const submitBtn = q('[data-submit]');

  const lockScroll = (on) => { document.body.style.overflow = on ? 'hidden' : ''; };

  // ---- rendering -----------------------------------------------------------

  const card = (d, idx) => {
    const a = areaStyle(d.area);
    const pill = d.indication
      ? `<span class="cw-pill" style="color:${a.color};background:${a.bg};border-color:${a.border}">${esc(d.indication)}</span>`
      : '';
    return `
      <article class="cw-card">
        <div class="cw-body">
          <div class="cw-meta"><span class="cw-pill">${esc(d.type)}</span>${pill}</div>
          <div class="cw-card-title">${esc(d.title)}</div>
          <div class="cw-desc">${esc(d.desc)}</div>
        </div>
        <div class="cw-actions">
          <button class="cw-btn ghost" type="button" data-copy="${idx}" title="Copy a direct link to this case study">Copy link</button>
          <button class="cw-btn" type="button" data-open="${idx}">Open</button>
          <button class="cw-btn primary" type="button" data-download="${idx}">Download</button>
        </div>
      </article>`;
  };

  function renderFilters() {
    const areas = [...new Set(DOCS.map((d) => d.area).filter(Boolean))].sort();
    if (areas.length < 2) { filters.innerHTML = ''; return; }
    filters.innerHTML = ['All', ...areas]
      .map((a) => `<button class="cw-chip${a === activeArea ? ' active' : ''}" type="button" data-area="${esc(a)}">${esc(a)}</button>`)
      .join('');
  }

  function renderGrid() {
    const items = DOCS.map((d, i) => ({ d, i })).filter((x) => activeArea === 'All' || x.d.area === activeArea);
    grid.innerHTML = items.length
      ? items.map((x) => card(x.d, x.i)).join('')
      : `<div class="cw-card" style="grid-column:1/-1; min-height:auto;"><div class="cw-body">
           <div class="cw-card-title">Nothing here yet</div>
           <div class="cw-desc">No case studies match this therapeutic area.</div></div></div>`;
  }

  const render = () => { renderFilters(); renderGrid(); };
  render();

  // ---- viewer / gate -------------------------------------------------------

  function openViewer(doc) {
    activeDoc = doc;
    q('[data-viewer-title]').textContent = doc.title || 'PDF';
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    frame.src = doc.url;
  }
  function closeViewer() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');
    frame.src = 'about:blank';
    lockScroll(false);
  }

  function openGate(doc) {
    activeDoc = doc;
    q('[data-gate-title]').textContent = `Get the PDF: ${doc.title || ''}`.trim();
    gate.classList.add('open');
    gate.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    q('[data-doc-title]').value = doc.title || '';
    q('[data-doc-url]').value = doc.url || '';
    q('[data-doc-type]').value = doc.type || '';
    q('[data-doc-area]').value = doc.area || '';
    q('[data-doc-indication]').value = doc.indication || '';
    toast.classList.remove('show');
    toast.textContent = '';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Get download';
  }
  function closeGate() {
    gate.classList.remove('open');
    gate.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    form.reset();
  }

  // ---- events --------------------------------------------------------------

  el.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('[data-viewer-close]')) return closeViewer();
    if (t.closest('[data-gate-close]')) return closeGate();
    if (t.closest('[data-viewer-download]')) { if (activeDoc) { closeViewer(); openGate(activeDoc); } return; }

    const areaChip = t.closest('[data-area]');
    if (areaChip) { activeArea = areaChip.dataset.area; render(); return; }

    const openBtn = t.closest('[data-open]');
    if (openBtn) return openViewer(DOCS[+openBtn.dataset.open]);

    const dlBtn = t.closest('[data-download]');
    if (dlBtn) return openGate(DOCS[+dlBtn.dataset.download]);

    const copyBtn = t.closest('[data-copy]');
    if (copyBtn) return copyLink(DOCS[+copyBtn.dataset.copy], copyBtn);
  });

  viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
  gate.addEventListener('click', (e) => { if (e.target === gate) closeGate(); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (viewer.classList.contains('open')) closeViewer();
    if (gate.classList.contains('open')) closeGate();
  });

  // ---- copy link -----------------------------------------------------------

  function copyLink(doc, btn) {
    const link = `${window.location.origin}${window.location.pathname}?study=${encodeURIComponent(doc.slug || '')}`;
    const done = () => {
      const original = btn.textContent;
      btn.textContent = 'Link copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link).then(done).catch(() => window.prompt('Copy this link:', link));
    } else {
      window.prompt('Copy this link:', link);
    }
  }

  // ---- gate submit ---------------------------------------------------------

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!activeDoc) return;

    const payload = Object.fromEntries(new FormData(form).entries());
    if (payload.cw_website) return; // honeypot
    delete payload.cw_website;

    if (!payload.name || !payload.email || !payload.consent) {
      toast.classList.add('show');
      toast.textContent = 'Please add your name, email, and consent to continue.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    try {
      await submitPdfLead(payload);
      toast.classList.add('show');
      toast.innerHTML = `Success. <a href="${esc(activeDoc.url)}" target="_blank" rel="noopener" style="font-weight:950; color:${'rgba(50,87,235,.95)'};">Click here to download</a>.`;
      submitBtn.textContent = 'Done';
    } catch (err) {
      console.error(err);
      toast.classList.add('show');
      toast.textContent = 'Couldn’t submit right now. Please try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get download';
    }
  });

  // ---- counters ------------------------------------------------------------

  const counters = [...el.querySelectorAll('.cw-count')];
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (!ent.isIntersecting) return;
          animate(ent.target, parseFloat(ent.target.dataset.value || '0'), ent.target.dataset.suffix || '');
          obs.unobserve(ent.target);
        });
      },
      { threshold: 0.35 }
    );
    counters.forEach((c) => obs.observe(c));
  } else {
    counters.forEach((c) => { c.textContent = c.dataset.value + (c.dataset.suffix || ''); });
  }

  function animate(node, to, suffix) {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = to + suffix;
      return;
    }
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      node.textContent = (t < 1 ? Math.round(to * (1 - Math.pow(1 - t, 3))) : to) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ---- deep link: ?study=<slug> -------------------------------------------

  const studyQuery = new URLSearchParams(window.location.search).get('study');
  if (studyQuery) {
    const s = studyQuery.toLowerCase();
    const doc =
      DOCS.find((d) => (d.slug || '').toLowerCase() === s) ||
      DOCS.find((d) =>
        (d.title || '').toLowerCase().includes(s) ||
        (d.indication || '').toLowerCase().includes(s) ||
        (d.area || '').toLowerCase().includes(s)
      );
    // A retired study (e.g. one pulled for citation reasons) simply no longer
    // resolves — old shared links land on the library instead of erroring.
    if (doc) setTimeout(() => openViewer(doc), 400);
  }
}

define('work', mount);
