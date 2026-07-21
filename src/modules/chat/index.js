import { define, injectCSS } from '../../core/mount.js';
import { sendChat } from '../../core/api.js';
import { openContact } from '../contact/index.js';
import css from './chat.css';

/**
 * CliniContact B2B assistant.
 *
 * The original embed shipped its own contact modal using the same element ids
 * as the nav's (#cc-modal, #cc-form, #cc-submit). Because getElementById returns
 * the first match, this script bound a *second* submit handler to the nav's
 * form — so every contact submission POSTed to /api/lead twice and created
 * duplicate leads. Here the chip just calls the shared modal, so there is one
 * modal and one handler by construction.
 */

const SESSION_KEY = 'cc_b2b_session_id';
const MAX_HISTORY = 10;
const NUDGE_AFTER_TURNS = 3;
const ROTATE_MS = 2600;

const SERVICES = [
  { icon: 'S', title: 'Smart Screeners', desc: 'Study-specific pre-qualification so your team spends time on likely eligible participants.' },
  { icon: 'V', title: 'Lead Validation', desc: 'Multi-factor checks to prioritize contactable, high-integrity submissions before handoff.' },
  { icon: 'H', title: 'Clean Handoff Workflow', desc: 'Structured handoff to site teams with an eligibility-first process.' },
  { icon: 'O', title: 'Multi-Channel Outreach', desc: 'We support digital outreach strategies aligned to your enrollment goals.' },
  { icon: 'C', title: 'Compliance-Aligned Operations', desc: 'EU data storage + HIPAA & GDPR compliant workflows (company-provided).' },
];

const GREETING =
  "Hi — I’m CliniContact’s B2B site support assistant. Ask me about Smart Screeners, lead validation, handoff workflow, compliance, or how we typically scope recruitment for a study.";

const getSession = () => {
  try { return localStorage.getItem(SESSION_KEY) || ''; } catch { return ''; }
};
const setSession = (id) => {
  if (!id) return;
  try { localStorage.setItem(SESSION_KEY, id); } catch { /* private mode */ }
};

function mount(el) {
  injectCSS('chat', css);
  el.classList.add('cc-chat');

  el.innerHTML = `
    <div class="ccc-shell">
      <div class="ccc-grid">
        <div class="ccc-panel">
          <div class="ccc-brand">
            <div class="ccc-brand-left"><span class="ccc-dot"></span><span>CliniContact • Researcher Support</span></div>
            <button type="button" class="ccc-chip" data-cc-contact>Click to contact us &rarr;</button>
          </div>
          <div style="padding: 4px 6px 0;">
            <div class="ccc-left-title">What CliniContact helps with</div>
            <p class="ccc-left-sub">A quick overview of the services teams use us for—rotating live while you chat.</p>
          </div>
          <div class="ccc-services" data-services>
            ${SERVICES.map(
              (s, i) => `<div class="ccc-service${i === 0 ? ' active' : ''}" data-i="${i}">
                <div class="ccc-ico">${s.icon}</div>
                <div><h4>${s.title}</h4><p>${s.desc}</p></div>
              </div>`
            ).join('')}
          </div>
        </div>

        <div class="ccc-panel">
          <div class="ccc-chat">
            <div class="ccc-chat-header">
              <div class="ccc-chat-title"><b>Recruitment Specialist</b><span>FAQ + sales support</span></div>
              <div class="ccc-status"><span class="ccc-pulse"></span><span>Online</span></div>
            </div>
            <div class="ccc-messages" data-messages role="log" aria-live="polite"></div>
            <div class="ccc-input">
              <label class="ccc-sr" for="ccc-input">Message</label>
              <input id="ccc-input" data-input placeholder="Ask about Smart Screeners, validation, handoff, compliance, or pricing approach…" />
              <button class="ccc-send" type="button" data-send aria-label="Send">Send</button>
            </div>
            <div class="ccc-foot">CliniContact • Researcher Assistant</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const messagesEl = el.querySelector('[data-messages]');
  const inputEl = el.querySelector('[data-input]');
  const sendBtn = el.querySelector('[data-send]');
  const servicesEl = el.querySelector('[data-services]');

  // ---- rotating services ---------------------------------------------------

  let activeIdx = 0;
  const timer = setInterval(() => {
    activeIdx = (activeIdx + 1) % SERVICES.length;
    servicesEl.querySelectorAll('.ccc-service').forEach((n, i) => n.classList.toggle('active', i === activeIdx));
  }, ROTATE_MS);

  // The original left this interval running forever, including once the element
  // was off-screen. Pause when it isn't visible.
  if ('IntersectionObserver' in window) {
    let paused = false;
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === paused) paused = !paused;
      },
      { threshold: 0 }
    ).observe(el);
  }
  window.addEventListener('pagehide', () => clearInterval(timer), { once: true });

  // ---- messages ------------------------------------------------------------

  const history = [];
  let turns = 0;
  let nudged = false;

  function addMsg(role, text) {
    const row = document.createElement('div');
    row.className = `ccc-row ${role === 'user' ? 'user' : 'bot'}`;
    const bubble = document.createElement('div');
    bubble.className = `ccc-bubble ${role === 'user' ? 'user' : 'bot'}`;
    // textContent, never innerHTML — the reply is remote content.
    bubble.textContent = text;
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    history.push({ role, text });
    if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);
    return bubble;
  }

  addMsg('bot', GREETING);

  async function send() {
    const message = (inputEl.value || '').trim();
    if (!message) return;

    inputEl.value = '';
    addMsg('user', message);
    sendBtn.disabled = true;

    const placeholder = addMsg('bot', '…');

    try {
      const data = await sendChat({ message, history, sessionId: getSession() });
      if (data.session_id) setSession(data.session_id);
      placeholder.textContent =
        data.reply || 'I can help with that — what’s your study indication and target geography?';

      turns += 1;
      if (!nudged && (data.showLeadForm || turns >= NUDGE_AFTER_TURNS)) {
        nudged = true;
        addMsg('bot', 'If you’d like, click “Click to contact us →” and we’ll route you to the right enrollment specialist.');
      }
    } catch (err) {
      console.error(err);
      placeholder.textContent =
        'The service is temporarily unavailable. Please refresh or click “Click to contact us →”.';
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  sendBtn.addEventListener('click', send);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); send(); }
  });

  // Belt-and-braces: the chip is handled by the global [data-cc-contact]
  // delegate, but bind directly so ordering can never break it.
  el.querySelector('[data-cc-contact]').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openContact();
  });
}

define('chat', mount);
