import { ILLUSTRATIONS } from './illustrations.js';

const SITE = 'https://www.clinicontact.com';

/**
 * Solutions page — organized by who is buying, not by capability.
 *
 * The old page listed four capabilities (Virtual & Remote Enrollment, Advanced
 * Smart Screening, High-Complexity Criteria, Technology & Automation) that now
 * duplicate the product sections. Rather than delete the page, it answers the
 * question the product pages cannot: which combination fits my role.
 *
 * This is also how CliniContact serves four buyer types without a hero that
 * tries to speak to all of them at once — sites, academics, SMOs and sponsors
 * each get their own entry point.
 *
 * The old anchor ids are preserved as `aliases` so the existing nav dropdown,
 * inbound links and any shared URLs keep resolving.
 */
export const SOLUTIONS_PAGE = {
  kicker: 'Solutions',
  heading: 'Where you sit determines where we start.',
  sub: 'The same four modules, scoped differently. Most engagements begin with one pressure point and expand once the handoff is proven.',
  showJumps: true,
  sections: [
    {
      id: 'sites',
      aliases: ['virtual-remote-enrollment'],
      eyebrow: 'Research sites & investigators',
      title: 'Protect coordinator time before it is spent.',
      desc: 'Site staff lose hours to unreachable contacts and respondents who were never eligible. We apply your inclusion/exclusion criteria upstream, verify contactability by SMS one-time passcode, and hand across a queue that has already been filtered, with the exclusion reason attached to everything that did not pass.',
      bullets: [
        'Prescreening against your I/E criteria before handoff',
        'SMS OTP verification and IP validation on every submission',
        'eConsent with e-signature where your protocol calls for it',
        'Exclusion reasons retained for your screening log',
      ],
      illustration: ILLUSTRATIONS.funnel,
      ctas: [
        { label: 'Try a live screener', href: 'https://forms.clinicontact.com/form/example', primary: true, external: true, arrow: '→' },
      ],
    },
    {
      id: 'academic',
      aliases: ['advanced-smart-screening'],
      eyebrow: 'Academic & grant-funded research',
      title: 'Recruitment that fits a grant budget and an IRB calendar.',
      desc: 'Grant-funded studies rarely have a marketing function and cannot absorb a six-week materials cycle. Horizon turns a protocol into a complete recruitment package in about an hour, then runs the digital recruitment for you: you set the ad spend, we build and manage the campaigns. The referral handoff is built into the system your lab already uses, so adopting it does not mean a new data pathway to justify to your IRB.',
      bullets: [
        'Recruitment package and marketing strategy in about an hour',
        'Managed digital campaigns to your ad spend, no marketing function needed',
        'IRB-ready in 9 days; 86% first-pass approval, 1.2 review cycles',
        'Handoff built into REDCap, Qualtrics or CRIO during onboarding',
      ],
      illustration: ILLUSTRATIONS.irbTimeline,
      ctas: [
        { label: 'Watch the Horizon walkthrough', href: 'https://horizonai.clinicontact.com/walkthrough/general', primary: true, external: true, arrow: '→' },
      ],
    },
    {
      id: 'networks',
      aliases: ['technology-automation'],
      eyebrow: 'Site networks & SMOs',
      title: 'One participant view across every site and study.',
      desc: 'Running recruitment across multiple sites means outreach history fragments across coordinator inboxes and nobody can answer where a given participant actually is. Vision resolves inbound SMS and email against the right participant across every study, with role-scoped access so each site sees its own and the network sees all of it.',
      bullets: [
        'Cross-study participant record with a single search',
        'Role-scoped access for coordinators, sponsors and monitors',
        'Reporting and analytics generated automatically per study',
        'Reconciliation sweeps so no inbound message is dropped',
      ],
      illustration: ILLUSTRATIONS.automation,
      ctas: [
        { label: 'See Vision', href: 'https://vision.clinicontact.com/', primary: true, external: true, arrow: '→' },
      ],
    },
    {
      id: 'sponsors',
      aliases: ['high-complexity-criteria'],
      eyebrow: 'Sponsors & CROs',
      title: 'Evidence your Diversity Action Plan was executed, not just filed.',
      desc: 'A Diversity Action Plan commits you to enrollment targets a paid-media strategy alone rarely reaches. Bridge opens referral pathways through advocacy organizations, community clinics and provider networks matched to each site catchment area, and reports at partner level, so representation can be shown in the funnel rather than asserted in the plan.',
      bullets: [
        'Partner networks matched by indication and site catchment area',
        'Partner-level referral and engagement reporting',
        'Designed for restrictive eligibility and multi-arm protocols',
        'Deployed alongside your existing site and vendor mix',
      ],
      illustration: ILLUSTRATIONS.partnerMap,
      ctas: [
        { label: 'See a live outreach strategy', href: 'https://bridge-beacon.org/share/strategy/3/d0901b32e0b94eaaf48717ab/', primary: true, external: true, arrow: '→' },
        { label: 'Read the case studies', href: `${SITE}/our-work`, arrow: '↘' },
      ],
    },
  ],
};
