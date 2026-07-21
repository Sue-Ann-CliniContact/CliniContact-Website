import { ILLUSTRATIONS } from './illustrations.js';

// Smart Screener keeps the generic illustration only as a fallback behind its
// video; the other three now use real product screenshots.
void ILLUSTRATIONS;

/**
 * The four products, ordered along the enrollment journey.
 *
 * Positioning rules applied here:
 *  - No volume claims. Nothing of the form "N conditions" or "N patients
 *    reached" — that is the one comparison a smaller company loses, and it
 *    invites a competitor to answer with a bigger number.
 *  - Speed and difficulty instead. Both are independent of company size.
 *  - Every number is specific and sourced to a real study or Horizon's own
 *    published figures.
 */

const YT_SCREENER = 'https://www.youtube-nocookie.com/embed/pYD6Fc3VNM0?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3';

/* Absolute — a relative /our-work 404s in local preview and on any subdomain. */
const WORK = 'https://www.clinicontact.com/our-work';

export const PRODUCTS_PAGE = {
  kicker: 'The platform',
  heading: 'Four modules across the recruitment funnel.',
  sub: 'Each module stands alone. Run together they hand off without re-keying: Horizon runs study startup and digital recruitment, Bridge opens community referral pathways, Smart Screener applies your I/E criteria, and Vision holds the participant record your coordinators work from.',
  showJumps: false,
  sections: [
    {
      id: 'horizon',
      eyebrow: 'Horizon · Study startup & digital recruitment',
      title: 'Protocol in. A recruitment package — and the campaigns to run it.',
      desc: 'Give Horizon a ClinicalTrials.gov link, a protocol PDF, or pasted protocol text. In about an hour you have the recruitment asset pack, the study-specific marketing strategy, and — where community reach matters — the Bridge outreach strategy, every compliance flag cited to its source. Then we run it: you set your ad spend, and we build and manage the digital campaigns to that strategy. It is managed digital recruitment, not a folder of materials handed back to you.',
      bullets: [
        'Recruitment package and study-specific marketing strategy in about an hour',
        'We build and manage the digital ad campaigns — you set the ad spend, no management fee',
        'Site-level scoping and protocol amendments applied at intake',
        // Two different measures, deliberately kept apart: ~1 hour is generation
        // time; 9 days is elapsed time through IRB readiness, which includes
        // human review and submission. Conflating them would be an overclaim.
        'IRB-ready in 9 days, with 86% first-pass approval',
      ],
      screenshot: 'horizonIntake',
      scale: {
        label: 'At organization scale',
        body: 'Import every site from the protocol and Horizon builds a recruitment profile for each — materials matched to the population around that site, held to one standard across all of them, and managed centrally. Marketing strategy runs across sites so you can see cost-per and expected yield site by site.',
        points: [
          'Site profiles created automatically from the study protocol',
          'Population-matched materials, one standard across every site',
          'Cross-site marketing strategy with per-site cost and expectations',
        ],
      },
      ctas: [
        { label: 'Watch the walkthrough', href: 'https://horizonai.clinicontact.com/walkthrough/general', primary: true, external: true, arrow: '→' },
        { label: 'Request a quote', contact: true },
      ],
    },
    {
      id: 'bridge',
      reverse: true,
      eyebrow: 'Bridge · Referral pathways',
      title: 'Open referral pathways into underrepresented populations.',
      desc: 'Paid media reaches participants already searching. Bridge reaches the ones who are not — through advocacy organizations, community clinics and provider networks matched to your indication and each site’s catchment area. It is how a Diversity Action Plan gets executed rather than stated, with partner-level reporting a sponsor can put in front of a reviewer.',
      bullets: [
        'Partner organizations matched by indication and site catchment area',
        'Executes against FDA Diversity Action Plan commitments',
        'Compliant outreach to advocacy groups, clinics and provider networks',
        'Partner-level referral and engagement reporting',
      ],
      screenshot: 'bridgeDashboard',
      scale: {
        label: 'At organization scale',
        body: 'One program runs across your sites, with a reporting dashboard for each — so every site sees the population around it, and the organization sees all of them. The organization carries the program fee; each site gets its own relevant view.',
        points: [
          'One program, a per-site reporting dashboard for each location',
          'Each site sees its local population; the organization sees every site',
          'Organization-wide fee, site-relevant dashboards',
        ],
      },
      ctas: [
        { label: 'See a live outreach strategy', href: 'https://bridge-beacon.org/share/strategy/3/d0901b32e0b94eaaf48717ab/', primary: true, external: true, arrow: '→' },
        { label: 'Read the UMass Boston study', href: `${WORK}?study=umass-boston-neurovascular`, arrow: '↘' },
      ],
    },
    {
      id: 'smart-screener',
      eyebrow: 'Smart Screener · Prescreening',
      title: 'Apply your I/E criteria before anyone reaches a coordinator.',
      desc: 'Branching logic built directly from your inclusion and exclusion criteria, with SMS one-time-passcode verification and IP validation for decentralized studies. Every record arrives carrying its prescreen outcome and the criterion that excluded it — and those outcomes feed back into the ad targeting, so the campaigns learn to optimize for qualified referrals in real time, not just raw lead volume.',
      bullets: [
        'Branching logic built from your inclusion/exclusion criteria',
        'SMS OTP verification and IP validation for decentralized studies',
        'eConsent with e-signature where the protocol calls for it',
        'Eligibility outcomes train the targeting toward qualified, in real time',
      ],
      illustration: ILLUSTRATIONS.screening,
      video: { src: YT_SCREENER, title: 'Smart Screener walkthrough' },
      ctas: [
        { label: 'Try a live screener', href: 'https://forms.clinicontact.com/form/example', primary: true, external: true, arrow: '→' },
      ],
    },
    {
      id: 'vision',
      reverse: true,
      eyebrow: 'Vision · Participant record',
      title: 'One participant record — or routed straight into your system of record.',
      desc: 'Inbound SMS and email resolve against the correct participant across every study, so outreach history sits in one chronological thread rather than across coordinator inboxes. And where your team already works in REDCap, Qualtrics or CRIO, we build the handoff with your data team during onboarding — prescreened referrals land in your system of record with their eligibility outcome attached, so nothing is re-keyed.',
      bullets: [
        // Scoped per engagement, not an off-the-shelf connector — worded so a
        // technical reviewer is not misled into expecting a prebuilt integration.
        'Handoff into your system of record — REDCap, Qualtrics, CRIO or your own',
        'Reporting and analytics generated automatically for every study',
        'Two-way SMS and email resolved to the participant record',
        'Role-scoped access and full audit trail for coordinators, sponsors and monitors',
      ],
      screenshot: 'visionConsole',
      ctas: [
        { label: 'See Vision', href: 'https://vision.clinicontact.com/', primary: true, external: true, arrow: '→' },
        { label: 'Request a quote', contact: true },
      ],
    },
  ],
};

/**
 * Difficulty-led proof, replacing the volume stats.
 *
 * A CRO does not care how many studies have been run; it cares whether its own
 * hard protocol can enrol. Each item below is a real published case study.
 */
export const HARD_PROTOCOLS = {
  kicker: 'Protocol complexity',
  heading: 'Built for protocols that stall in recruitment.',
  sub: 'Restrictive eligibility, controlled substances, pediatric assent, multi-arm allocation. These are the protocols teams bring to us after a first recruitment approach underdelivers.',
  items: [
    { stat: 'Schedule I', label: 'Controlled-substance protocol — psilocybin with SAINT rTMS for treatment-resistant depression. Prescreen gates applied upfront so most submissions never reached study staff.', study: 'dell-trd-psilocybin' },
    { stat: '9 I/E criteria', label: 'Moderate-to-severe opioid use disorder. Ineligible respondents excluded, with reason, ahead of site handoff.', study: 'oud-oklahoma' },
    { stat: '2-arm allocation', label: 'CANNHEART — five eligibility gates confirmed and each candidate routed to the correct study arm before coordinator contact.', study: 'cannheart-miami' },
    { stat: '8-section prescreen', label: 'Early life stress and depression at McLean. Sites received fully characterized candidate records rather than contact details.', study: 'mclean-early-life-stress' },
  ],
};
