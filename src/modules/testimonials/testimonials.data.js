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

export const TESTIMONIALS = [
  {
    id: 'fishman',
    consent: 'named', // "Use my full name and organization"
    name: 'Loren Fishman',
    org: 'Sciatica.org',
    role: 'Physician / Principal Investigator',
    segment: 'academic',
    score: 10,
    // Respondent wrote "Clinicare"; the bracketed correction is the only edit.
    // Confirm with him before publishing, or drop the first clause entirely.
    quote:
      '[CliniContact] has been forthright, fast, seamless and most important: effective. They raised more subjects in 3 months than I had in 2 years.',
    pullStat: 'More subjects in 3 months than in the prior 2 years',
  },
  {
    id: 'bond',
    consent: 'named', // "Use my first name and organization"
    name: null, // TODO: survey captured no first name — ask before publishing.
    org: 'Bond Solutions Group',
    role: null,
    segment: 'sponsor',
    score: 9,
    quote:
      'CliniContact was a great partner. They listened to what my needs were and curated a unique and specific plan for what I was aiming to accomplish. The process was easy, fun, and straightforward.',
  },
  {
    id: 'temple-anon',
    consent: 'anonymous', // "Use anonymously"
    name: null,
    org: 'Clinical Research Site',
    role: 'Research Coordinator',
    segment: 'academic',
    score: 10,
    quote:
      'They consistently make the process seamless and accommodating, and we wouldn’t use anyone else to help promote our research studies.',
  },
  {
    id: 'ucla-anon',
    consent: 'anonymous', // "Use anonymously"
    name: null,
    org: 'Clinical Research Site',
    role: 'Principal Investigator',
    segment: 'academic',
    score: 8,
    quote:
      'CliniContact made our participant recruitment fast and stress-free! Staff were highly collaborative and communicative. Highly recommend!',
    // HOLD BEFORE PUBLISHING: same respondent rated their *second* campaign a
    // Passive 8 and reported it "much slower than expected" with no clear
    // explanation. Publishing a glowing quote while they are actively
    // dissatisfied risks them seeing it. Resolve the open campaign first.
    hold: true,
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
