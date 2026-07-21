/**
 * How We Partner — the engagement model.
 *
 * The old page was four capability tabs, which is what the products now cover.
 * This answers what a prospect actually wants before signing: what happens
 * first, how long it takes, what they have to provide, and what comes back.
 *
 * Timings are deliberately expressed as ranges and tied to the dependency that
 * drives them. Nothing here promises an enrollment number.
 */

export const PARTNER_PAGE = {
  kicker: 'How we partner',
  heading: 'What the first ninety days actually look like.',
  sub: 'No long procurement cycle and no platform migration. Most engagements start with one study, prove the handoff, then widen.',

  phases: [
    {
      n: 1,
      window: 'Week 1',
      title: 'Protocol intake and feasibility',
      body: 'We take your protocol — a registry link, the PDF, or pasted text — and work through inclusion/exclusion criteria, site catchment areas, and where the enrollment pressure actually sits. You get a written view of which criteria will constrain recruitment before anything is built.',
      you: 'Protocol, target sites, current enrollment position',
      us: 'Feasibility read and criteria map',
    },
    {
      n: 2,
      window: 'Weeks 1–2',
      title: 'Recruitment package and IRB submission',
      body: 'Horizon generates the package in about an hour — participant-facing assets, marketing strategy, and the Bridge outreach strategy where community reach applies — against sponsor playbooks and the relevant IRB ruleset, with every compliance flag cited to its source. The remaining time in this window is your review and the submission itself, not our production.',
      you: 'Review and sign-off; IRB submission through your usual route',
      us: 'Recruitment package, marketing and outreach strategy, compliance citations',
    },
    {
      n: 3,
      window: 'On IRB approval',
      title: 'Screener build and system handoff',
      body: 'Your I/E criteria become branching screener logic with SMS one-time-passcode verification. In parallel we build the referral handoff into whatever your team already works in — REDCap, Qualtrics, CRIO, or Vision — and scope that with your data team so referrals arrive where coordinators already are.',
      you: 'A data contact for the handoff, and screening-log requirements',
      us: 'Built screener, tested handoff, agreed referral format',
    },
    {
      n: 4,
      window: 'Ongoing',
      title: 'Outreach, prescreening and real-time optimization',
      body: 'Recruitment runs across paid channels and, where representation targets apply, Bridge partner networks. Every referral is prescreened, and those eligibility outcomes feed back into the targeting — so the Smart Screener teaches the campaigns to optimize for qualified referrals, not just lead volume. We watch it in real time, and you see the same numbers we do.',
      you: 'Site feedback on referral quality',
      us: 'Prescreened referrals, real-time optimization toward qualified',
    },
  ],

  principles: [
    {
      title: 'We work with your budget and tell you the truth',
      body: 'We build a plan around the budget you have, and we give you an honest picture of what it can realistically expect — before you spend it, not after. Consent and enrollment happen at your site, so we do not promise enrollment numbers; we commit to what we control: verified, prescreened referrals that meet your criteria, and straight reporting on what each channel delivers.',
    },
    {
      title: 'Your systems stay your systems',
      body: 'No platform migration and no forced tooling change. The referral handoff is built into the system of record your team already uses, so adopting us does not create a new data pathway to justify.',
    },
    {
      title: 'Start with one study',
      body: 'Most engagements begin with a single study at a single site. If the handoff does not work for your coordinators, the exit cost is one study — not a portfolio commitment.',
    },
    {
      title: 'The screening log is yours',
      body: 'Every exclusion carries its reason, retained in a form your monitors and auditors can work from. Prescreening should reduce site burden without creating a documentation gap.',
    },
  ],
};
