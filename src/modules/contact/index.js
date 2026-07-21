import { injectCSS } from '../../core/mount.js';
import { submitLead, THANK_YOU_URL, PARTICIPANT_URL } from '../../core/api.js';
import css from './modal.css';

/**
 * Contact modal, extracted from the nav embed.
 *
 * It used to live inside the nav, which meant only the nav button could open
 * it. Now it's a page-level singleton: any CTA anywhere can call openContact(),
 * so "Request a proposal" and per-product CTAs all reuse one form.
 */

let modal = null;
let lastFocused = null;

const TOPICS = [
  ['I need help with participant recruitment', 'Help with participant recruitment'],
  ['I want to participate in a research study', 'Participate in a study'],
];

/**
 * Selecting this used to submit a sales lead to /api/lead, so members of the
 * public looking to join a study landed on the sponsor/CRO board — polluting
 * the pipeline and, worse, leaving people who wanted to take part in research
 * waiting on a sales follow-up that was never the right response. Choosing it
 * now hands off to Beacon instead of collecting anything.
 */
const PARTICIPANT_TOPIC = 'I want to participate in a research study';

/**
 * Full persona list, recovered from the orphaned B2B modal.
 *
 * The live nav modal only offered four options and dropped "Academic or
 * Grant-Funded Researcher" entirely — so academic leads, a core segment, were
 * self-selecting into "Other". Values match the strings the backend and Monday
 * board already expect from the B2B modal.
 */
const PERSONAS = [
  ['Research Site or Investigator Network', 'Research Site or Investigator Network'],
  ['Academic or Grant-Funded Researcher', 'Academic or Grant-Funded Researcher'],
  ['Contract Research Organization', 'Contract Research Organization'],
  ['Pharma or Biotech Company', 'Pharma or Biotech Company'],
  ['Other Research Sponsor', 'Other Research Sponsor'],
  ['Other', 'Other'],
];

const options = (pairs) =>
  pairs.map(([value, label]) => `<option value="${value}">${label}</option>`).join('');

function build() {
  injectCSS('contact-modal', css);

  modal = document.createElement('div');
  modal.className = 'cc-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Contact CliniContact');
  modal.innerHTML = `
    <div class="cc-modal-card">
      <div class="cc-modal-head">
        <div>
          <h2>Contact CliniContact</h2>
          <p>We'll route you to the right enrollment specialist.</p>
        </div>
        <button class="cc-x" type="button" data-close aria-label="Close">&#10005;</button>
      </div>
      <form class="cc-form" novalidate>
        <div class="cc-field">
          <label for="cc-name">Full Name</label>
          <input id="cc-name" name="name" required placeholder="John Doe" autocomplete="name" />
        </div>
        <div class="cc-field">
          <label for="cc-email">Email</label>
          <input id="cc-email" name="email" type="email" required placeholder="john@company.com" autocomplete="email" />
        </div>
        <div class="cc-field">
          <label for="cc-phone">Phone</label>
          <input id="cc-phone" name="phone" placeholder="+1..." autocomplete="tel" />
        </div>
        <div class="cc-field">
          <label for="cc-org">Organization</label>
          <input id="cc-org" name="organization" placeholder="Company Name" autocomplete="organization" />
        </div>
        <div class="cc-field cc-span2">
          <label for="cc-topic">Topic</label>
          <select id="cc-topic" name="contact_about" required>
            <option value="" disabled selected>Select a topic</option>
            ${options(TOPICS)}
          </select>
        </div>
        <div class="cc-field cc-span2">
          <label for="cc-persona">Your Role</label>
          <select id="cc-persona" name="persona" required>
            <option value="" disabled selected>Select one</option>
            ${options(PERSONAS)}
          </select>
        </div>
        <div class="cc-hp" aria-hidden="true">
          <label>Website<input name="cc_website" tabindex="-1" autocomplete="off" /></label>
        </div>
        <div class="cc-status cc-span2" data-status></div>
        <div class="cc-span2" style="display:flex; gap:10px; margin-top:10px;">
          <button type="submit" class="cc-submit">Submit Request</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('[data-close]').addEventListener('click', closeContact);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeContact();
  });
  modal.querySelector('form').addEventListener('submit', onSubmit);

  // Hand participants off the moment they identify themselves, rather than
  // letting them fill in a sales form first.
  modal.querySelector('#cc-topic').addEventListener('change', (e) => {
    if (e.target.value === PARTICIPANT_TOPIC) showParticipantHandoff();
  });

  return modal;
}

function showParticipantHandoff() {
  const card = modal.querySelector('.cc-modal-card');
  card.innerHTML = `
    <div class="cc-modal-head">
      <div>
        <h2>Looking to join a study?</h2>
        <p>You're in the right place — just not on the right page.</p>
      </div>
      <button class="cc-x" type="button" data-close aria-label="Close">&#10005;</button>
    </div>
    <p class="cc-handoff-body">
      This page is for research teams and sponsors. To find studies currently looking for
      participants, explained in plain language, visit Beacon. Browsing is free, there's no
      obligation, and you choose whether to contact a study team.
    </p>
    <div class="cc-handoff-actions">
      <a class="cc-submit" href="${PARTICIPANT_URL}" target="_blank" rel="noopener">
        Find studies on Beacon &#8599;
      </a>
      <button type="button" class="cc-handoff-back" data-back>Back to the contact form</button>
    </div>
  `;
  card.querySelector('[data-close]').addEventListener('click', closeContact);
  card.querySelector('[data-back]').addEventListener('click', () => {
    // Rebuild from scratch so the form returns in a clean state.
    modal.remove();
    modal = null;
    openContact();
  });
}

async function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = form.querySelector('.cc-submit');
  const status = form.querySelector('[data-status]');

  const payload = Object.fromEntries(new FormData(form).entries());

  // Honeypot: a real person never fills a field they cannot see.
  if (payload.cc_website) return;
  delete payload.cc_website;

  if (!payload.name || !payload.email || !payload.contact_about || !payload.persona) {
    status.textContent = 'Please fill in all required fields.';
    status.style.display = 'block';
    return;
  }

  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = 'Sending...';
  status.style.display = 'none';

  try {
    await submitLead(payload);
    btn.textContent = 'Success!';
    window.location.href = THANK_YOU_URL;
  } catch (err) {
    console.error(err);
    status.textContent = 'Something went wrong. Please try again or email support@clinicontact.com.';
    status.style.display = 'block';
    btn.disabled = false;
    btn.textContent = original;
  }
}

export function openContact() {
  if (!modal) build();
  lastFocused = document.activeElement;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('#cc-name')?.focus();
}

export function closeContact() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  lastFocused?.focus?.();
}

/** `?contact=true` / `?openContact=1` deep-links straight into the form. */
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
   * Any element on any page can opt in with data-cc-contact.
   *
   * `data-cc-open-contact` is the legacy attribute from the hero embed, which
   * opened the modal by poking `#cc-modal.classList.add('open')` directly.
   * Supporting it here means the old hero keeps working un-edited during
   * migration.
   */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-cc-contact], [data-cc-open-contact]');
    if (trigger) {
      e.preventDefault();
      openContact();
    }
  });

  if (shouldAutoOpen()) openContact();
}
