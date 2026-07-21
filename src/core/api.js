/**
 * Single source of truth for backend wiring.
 *
 * Previously each embed hardcoded its own copy of the backend URL. When that
 * host changes, this is now the only line that changes.
 */

export const BACKEND = 'https://b2b-backend-qs11.onrender.com';

/** Absolute so it also works from horizonai./vision. subdomains. */
export const THANK_YOU_URL = 'https://www.clinicontact.com/thank-you';

/**
 * Where prospective study participants go.
 *
 * Beacon is the plain-language participant destination. Anyone arriving on the
 * B2B site looking to join a study should be handed off here rather than routed
 * into the sales pipeline.
 */
export const PARTICIPANT_URL = 'https://bridge-beacon.org/discover/';

/** "Protocol to Patients" — the LinkedIn newsletter, in place of on-site signup. */
export const NEWSLETTER_URL =
  'https://www.linkedin.com/newsletters/protocol-to-patients-7452356070964080640';

/** General contact form (footer "Contact us"). Distinct from the pricing/quote form. */
export const CONTACT_FORM = 'https://forms.clinicontact.com/contact-us';

/**
 * Company social presence — one source of truth. Add handles here as they are
 * confirmed; the footer and any other module should read from this rather than
 * hardcoding URLs.
 *
 * TODO(sue-ann): confirm whether X/Twitter, Instagram, and a YouTube channel
 * exist. The demo video (pYD6Fc3VNM0) lives on some YouTube account — if it is
 * an official channel, add it here.
 */
export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/clinicontact/',
  linkedinNewsletter: NEWSLETTER_URL,
  facebook: 'https://www.facebook.com/profile.php?id=61555868216084',
};

/** B2B assistant. Returns { reply, session_id, showLeadForm }. */
export async function sendChat({ message, history, sessionId }) {
  const res = await fetch(`${BACKEND}/api/b2b-chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, session_id: sessionId }),
  });
  if (!res.ok) throw new Error(`chat failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/** Gated PDF downloads on the Our Work page. Separate board from /api/lead. */
export async function submitPdfLead(payload) {
  const res = await fetch(`${BACKEND}/api/pdf-lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`pdf lead submit failed: ${res.status}`);
  return res;
}

// NOTE: the general /api/lead endpoint is no longer called from the site — the
// "Request a quote" flow now uses the hosted form at forms.clinicontact.com/pricing
// (see modules/contact). The PDF-download gate above still uses /api/pdf-lead.
