/**
 * Client testimonials, from the off-boarding feedback survey (11 responses,
 * Dec 2024 – Jul 2026).
 *
 * CONSENT IS ENFORCED IN CODE. Every entry carries an explicit `consent` field,
 * and the module refuses to render anything that is not 'named' or 'anonymous'.
 * This is deliberate: the survey only began asking permission around Dec 2025,
 * so most historical respondents answered what they understood to be a private
 * off-boarding survey. Do not relax this check — get permission instead.
 */

/** Consent levels the renderer will publish. Anything else is filtered out. */
export const PUBLISHABLE = ['named', 'anonymous'];

/**
 * The four publishable quotes, with the attributions Sue-Ann approved for
 * display. Order here is the display order; the strongest (named, with a
 * concrete result) leads.
 */
export const TESTIMONIALS = [
  {
    id: 'fishman',
    consent: 'named', // full name + organization
    name: 'Dr. Loren Fishman, MD',
    org: 'Sciatica.org',
    quote:
      'CliniContact has been forthright, fast, seamless and most important: effective. They raised more subjects in 3 months than I had in 2 years.',
  },
  {
    id: 'temple-anon',
    consent: 'anonymous',
    role: 'Project Coordinator',
    org: 'Academic University',
    quote:
      'They consistently make the process seamless and accommodating, and we wouldn’t use anyone else to help promote our research studies.',
  },
  {
    id: 'ucla-anon',
    consent: 'anonymous',
    role: 'Assistant Professor',
    org: 'Academic University',
    quote:
      'CliniContact made our participant recruitment fast and stress-free! Staff were highly collaborative and communicative. Highly recommend!',
  },
  {
    id: 'bond',
    consent: 'anonymous', // respondent OK'd first name + org; displayed by role + org, which is less identifying
    role: 'Doctoral Student',
    org: 'Capella University',
    // "where" in the original was a typo for "were" — corrected, standard for a
    // published testimonial.
    quote:
      'CliniContact was a great partner. They listened to what my needs were and curated a unique and specific plan for what I was aiming to accomplish. The process was easy, fun, and straightforward.',
  },
];

/**
 * Aggregate metrics.
 *
 * DO NOT PUBLISH YET — the numbers previously here were wrong.
 *
 * The spreadsheet this was derived from was a curated subset ("I just gave you
 * the good ones"), not the full export. An earlier version of this file claimed
 * NPS 91 with zero detractors; that was an artifact of the selection, not a real
 * result. Sue-Ann's actual figure is 9.38/10 across 13 submissions for 2025–26.
 *
 * NPS cannot be derived from a mean — it needs the promoter/passive/detractor
 * split. Nothing here is publishable until the unfiltered export is loaded.
 */
export const SURVEY_METRICS = {
  publishable: false,
  averageScore: 9.38,
  responses: 13,
  period: '2025–2026',
  // Unknown until the full export lands. Do not guess.
  nps: null,
  promoters: null,
  passives: null,
  detractors: null,
  // Category averages below came from the same curated subset — recompute them
  // against the full export before using.
  ratings: null,
};

/**
 * Consent not yet obtained — these predate the permission question.
 *
 * DO NOT PUBLISH, including anonymously: the quotes contain identifying study
 * detail (institution, indication, enrollment volume) that makes them
 * re-identifiable within a small industry. Several are the strongest quotes in
 * the whole survey, so this list is a to-do, not a graveyard.
 */
export const PENDING_CONSENT = [
  { email: 'daniel.zweben@temple.edu', score: 10, note: 'Strongest academic quote: 200+ participants in under a year; says he will budget for recruitment in every future grant.' },
  { email: 'michelle.chen2@rutgers.edu', score: 10, note: 'Credible leads; recruitment finished a month early.' },
  { email: 'tmhudson@umc.edu', score: 10, note: 'Flexible, adjusted outreach to recruitment needs.' },
  { email: 'merrill.landers@unlv.edu', score: 10, note: 'Praises dashboard and targeted-ad productivity.' },
  { email: 'tjohnson@nccr.com', score: 10, note: 'Site network (NCCR), useful for the SMO segment.' },
  { email: 'archana.malagi@cshs.org', score: 9, note: 'Cedars-Sinai; quick to respond, implements changes immediately.' },
  { email: 'kmpita@fiu.edu', score: 9, note: 'Positive but paired with front-page usability criticism.' },
];
