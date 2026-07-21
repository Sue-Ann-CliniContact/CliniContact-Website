/**
 * Pricing.
 *
 * Packaging (from Sue-Ann): Smart Screener and Vision are never sold
 * separately — they come included with Horizon or Bridge. Horizon and Bridge
 * can be combined. Anchors are "from" prices; everything above the entry tier
 * is scoped to a quote.
 *
 * Confirmed prices:
 *   Horizon — from $800/mo, one study at one site. Ad spend is the client's own
 *             budget, set separately. NO management or optimization fee.
 *   Bridge  — from $1,200 per indication, across multiple sites.
 *
 * The demo/pricing form is the CTA target for every tier.
 */

export const PRICING_FORM = 'https://forms.clinicontact.com/pricing';

/** Included in every package — this is the core of the "combo it" story. */
export const ALWAYS_INCLUDED = [
  { name: 'Smart Screener', note: 'I/E prescreening, SMS OTP, eConsent' },
  { name: 'Vision', note: 'participant record + automatic per-study reporting' },
];

export const TIERS = [
  {
    id: 'horizon',
    name: 'Horizon',
    tagline: 'Study startup & digital recruitment',
    price: '$800',
    unit: '/month',
    priceNote: 'One study, one site. We build and manage the campaigns; you set the ad spend, with no management fee on it.',
    features: [
      'Recruitment package + study-specific marketing strategy in ~1 hour',
      'Managed digital ad campaigns run to your strategy',
      'IRB-ready in 9 days · 86% first-pass approval',
      'Smart Screener + Vision included',
    ],
    cta: 'Start with Horizon',
  },
  {
    id: 'combo',
    name: 'Horizon + Bridge',
    tagline: 'The complete recruitment engine',
    price: 'Scoped',
    unit: 'to your studies',
    priceNote: 'Study startup and community reach together, priced to your site and study count.',
    features: [
      'Everything in Horizon and Bridge',
      'Study startup plus community referral pathways',
      'One participant record across both',
      'Smart Screener + Vision included',
    ],
    cta: 'Request pricing',
    featured: true,
    badge: 'Most complete',
  },
  {
    id: 'bridge',
    name: 'Bridge',
    tagline: 'Community & referral pathways',
    price: '$1,200',
    unit: '/indication',
    priceNote: 'Per indication, across multiple sites. Built for Diversity Action Plan reach.',
    features: [
      'Partner networks matched to your indication',
      'Executes against Diversity Action Plan targets',
      'Partner-level referral and engagement reporting',
      'Smart Screener + Vision included',
    ],
    cta: 'Start with Bridge',
  },
];

/**
 * The entry tiers above are for a single study at a single site — academics,
 * individual sites, and one-off trials. Everything organizational is a custom
 * model built with the buyer, which is what this band frames.
 */
export const ENTRY_LABEL = 'For a single study at a single site: academics, individual sites and trials';

/**
 * Enterprise band, framed as a consultative custom model rather than a fixed
 * tier — that is genuinely how networks, SMOs, CROs and sponsors are priced.
 */
export const ENTERPRISE = {
  eyebrow: 'Site networks · SMOs · CROs · Sponsors',
  name: 'We build the pricing model with you.',
  desc: 'Running across many sites, studies or indications is never one-size-fits-all. We scope a flat-fee model around your portfolio: Horizon site profiles managed centrally, Bridge programs with per-site dashboards, and organization-wide Vision, so the economics fit how you actually operate.',
  models: [
    'Flat fee per site, across multiple studies',
    'Flat fee per study, across multiple sites',
    'Per-indication programs with per-site reporting',
  ],
  includes: [
    'Horizon site profiles created from the protocol, managed at org level',
    'Bridge per-site dashboards with an organization-wide view',
    'Organization-wide Vision with sponsor and monitor access',
    'System-of-record integration · dedicated strategist · no per-seat or setup fees',
  ],
  cta: 'Build a custom quote',
};
