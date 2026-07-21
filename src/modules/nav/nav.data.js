/**
 * Nav structure as data. Desktop and mobile both render from this, so a link
 * change happens in one place instead of two blocks of duplicated markup.
 */

const SITE = 'https://www.clinicontact.com';

/** Current live nav — capability-shaped. Ported as-is so nothing changes yet. */
export const CURRENT_NAV = [
  { label: 'Home', href: SITE },
  { label: 'About', href: `${SITE}/#cc-about` },
  {
    label: 'Solutions',
    children: [
      { label: 'Virtual & Remote Enrollment', href: `${SITE}/our-solutions#virtual-remote-enrollment` },
      { label: 'Advanced Smart Screening', href: `${SITE}/our-solutions#advanced-smart-screening` },
      { label: 'High-Complexity Recruitment', href: `${SITE}/our-solutions#high-complexity-criteria` },
      { label: 'Technology & Automation', href: `${SITE}/our-solutions#technology-automation` },
    ],
  },
  { label: 'How We Partner', href: `${SITE}/#How-We-Work` },
  { label: 'Our Work', href: `${SITE}/our-work` },
];

/**
 * Product-shaped nav for the redesign. Named products instead of capabilities,
 * ordered along the recruitment funnel. The Products entry renders as a mega-
 * menu (`mega: true`): each item shows its funnel stage, name and a one-line
 * description, so the dropdown itself does the product-teaching — the pattern
 * the team liked on a competitor's site.
 */
export const PRODUCT_NAV = [
  { label: 'Home', href: SITE },
  {
    label: 'Platform',
    mega: true,
    children: [
      { stage: 'Startup & digital recruitment', label: 'Horizon', href: `${SITE}/#horizon`, note: 'Recruitment package built, then digital campaigns we run for you.' },
      { stage: 'Referral pathways', label: 'Bridge', href: `${SITE}/#bridge`, note: 'Community and provider networks for underrepresented reach.' },
      { stage: 'Prescreening', label: 'Smart Screener', href: `${SITE}/#smart-screener`, note: 'Your I/E criteria applied before a coordinator is involved.', included: true },
      { stage: 'Participant record', label: 'Vision', href: `${SITE}/#vision`, note: 'One timeline per participant, automatic per-study reporting.', included: true },
    ],
    footer: { label: 'Compare packages & pricing', href: `${SITE}/pricing` },
  },
  { label: 'Solutions', href: `${SITE}/our-solutions` },
  { label: 'Pricing', href: `${SITE}/pricing` },
  { label: 'How We Partner', href: `${SITE}/#How-We-Work` },
  { label: 'Our Work', href: `${SITE}/our-work` },
];

/**
 * Live nav now uses the product-shaped structure. The old capability nav is
 * retained above as CURRENT_NAV for reference / rollback.
 */
export const NAV_LINKS = PRODUCT_NAV;

/**
 * Prospective participants go straight to Beacon rather than to the old
 * /our-research-participation page — Beacon lists live studies in plain
 * language, which is what someone clicking this actually wants.
 */
export const PARTICIPANT_LINK = {
  label: 'Join a study',
  href: 'https://bridge-beacon.org/discover/',
  external: true,
};

export const LOGO_SRC =
  'https://cdn.prod.website-files.com/652e0fad859f7ef17ca4e62c/663e58bbd400ff9b4fd76061_Vector.png';
