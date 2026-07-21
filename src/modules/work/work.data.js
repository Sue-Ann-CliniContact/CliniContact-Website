/**
 * Our Work — case study library.
 *
 * `products` on each entry maps the study to the product it proves. It is not
 * rendered yet; it exists so the product pages can pull real case-study
 * evidence instead of inventing claims. Note the distribution: Smart Screener
 * and Bridge are heavily evidenced, Horizon and Vision have nothing.
 */

const CDN = 'https://cdn.prod.website-files.com/652e0fad859f7ef17ca4e62c';

/**
 * Headline stats.
 *
 * These are generic, uncited industry claims inherited from the original embed.
 * Recommend replacing with CliniContact's own numbers, which are stronger and
 * defensible: NPS 91 with zero detractors across 11 clients, 421 participants
 * screened in a single McLean study, 8 therapeutic areas, 12 published studies.
 * Left as-is here because changing public claims is a content decision.
 */
export const WORK_STATS = [
  { value: 80, suffix: '%', label: 'of studies experience enrollment delays' },
  { value: 30, suffix: '%', label: 'of study timelines can be lost to recruitment setbacks' },
  { value: 3, suffix: '×', label: 'faster screening when validation is automated' },
  { value: 24, suffix: ' hrs', label: 'typical response time for routing enrollment support' },
];

export const AREA_COLORS = {
  'Mental Health': { color: '#0d9488', bg: 'rgba(13,148,136,.10)', border: 'rgba(13,148,136,.20)' },
  Neurology: { color: '#4f46e5', bg: 'rgba(79,70,229,.10)', border: 'rgba(79,70,229,.20)' },
  Addiction: { color: '#b45309', bg: 'rgba(180,83,9,.10)', border: 'rgba(180,83,9,.22)' },
  Cardiovascular: { color: '#e11d48', bg: 'rgba(225,29,72,.09)', border: 'rgba(225,29,72,.20)' },
  Neurodevelopmental: { color: '#7c3aed', bg: 'rgba(124,58,237,.10)', border: 'rgba(124,58,237,.20)' },
  Nutrition: { color: '#16a34a', bg: 'rgba(22,163,74,.10)', border: 'rgba(22,163,74,.20)' },
  Rheumatology: { color: '#0891b2', bg: 'rgba(8,145,178,.10)', border: 'rgba(8,145,178,.20)' },
  'Pediatrics': { color: '#0284c7', bg: 'rgba(2,132,199,.10)', border: 'rgba(2,132,199,.20)' },
};

/**
 * REMOVED: "Navidea · Rheumatoid Arthritis Research" (slug navidea-ra).
 *
 * The original embed carried the comment "FLAGGED: Navidea is on the 'do not
 * cite' list" while still rendering the card and serving the PDF ungated. It is
 * omitted here deliberately. Do not re-add without written clearance — and note
 * the PDF may still be reachable at its Webflow CDN URL until deleted there.
 */
export const DOCS = [
  {
    type: 'Case Study', area: 'Mental Health', indication: 'Major Depressive Disorder',
    slug: 'ut-austin-mdd',
    title: 'UT Austin · Major Depressive Disorder',
    desc: 'Reaching symptom-aware adults across Austin and tripling the monthly flow of pre-qualified participants for the UT Austin Mood Disorders Lab.',
    url: `${CDN}/6a3bcda20e53c714b966c6e5_Clinicontact%20utaustin%20mdd%20case%20study.pdf`,
    products: ['smart-screener'],
  },
  {
    type: 'Case Study', area: 'Neurology', indication: "Parkinson's Disease",
    slug: 'unlv-parkinsons',
    title: "UNLV · Parkinson's Disease Research",
    desc: "Bilingual, community-rooted outreach that reached African American and Hispanic adults with Parkinson's across Las Vegas for UNLV's Gait and Balance Laboratory.",
    url: `${CDN}/6a3bcd3219a038e2effaf2c7_Clinicontact%20unlv%20parkinsons%20case%20study.pdf`,
    products: ['bridge'],
  },
  {
    type: 'Case Study', area: 'Addiction', indication: 'Opioid Use Disorder',
    slug: 'oud-oklahoma',
    title: 'Opioid Use Disorder · Moderate to Severe (Oklahoma)',
    desc: 'Pre-qualifying candidates against a nine-criteria clinical screen for a moderate-to-severe opioid use disorder trial, with ineligible contacts filtered before they reached the site.',
    url: `${CDN}/6a3bcd6783b9db8e3a5cb140_OPIOID%20USE%20DISORDER%20%C2%B7%20MODERATE%20TO%20SEVERE.pdf`,
    products: ['smart-screener'],
  },
  {
    type: 'Case Study', area: 'Cardiovascular', indication: 'Exercise Physiology',
    slug: 'umass-boston-neurovascular',
    title: 'UMass Boston · Neurovascular Exercise Physiology',
    desc: 'Two hard-to-reach African American cohorts recruited for a racial health-equity physiology study, with representation that held up in the funnel, not just the materials.',
    url: `${CDN}/6a3bcd4a3ca654fa998d42dc_UMass%20Boston%20%C2%B7%20Neurovascular%20Exercise%20Physiology%20Lab.pdf`,
    products: ['bridge'], // strongest Diversity Action Plan evidence in the library
  },
  {
    type: 'Case Study', area: 'Mental Health', indication: 'Depression',
    slug: 'mclean-early-life-stress',
    title: 'McLean Hospital · Early Life Stress & Depression',
    desc: 'Running 421 women through an eight-section clinical screener so the site received fully characterized candidates, not contact cards, before its first call.',
    url: `${CDN}/6a3bd5fc4133008983067642_mclean%20early%20life%20stress%20case%20study.pdf`,
    products: ['smart-screener'],
  },
  {
    type: 'Case Study', area: 'Pediatrics', indication: 'Pediatric Insomnia',
    // Slug intentionally keeps the original British spelling: it is a public URL
    // (?study=…) that may already have been shared. Display copy is US.
    slug: 'plano-paediatric-insomnia',
    title: 'Pediatric Insomnia · Plano TX',
    desc: "Reaching protective caregivers for a placebo-controlled pediatric trial, qualifying the child and walking parents through the blood draws and daily diary before the site's first call.",
    url: `${CDN}/6a3bfae3c4c8854beea0152a_Pediatric%20insomnia%20plano%20case%20study.pdf`,
    products: ['smart-screener'],
  },
  {
    type: 'Case Study', area: 'Mental Health', indication: 'Treatment-Resistant Depression',
    slug: 'dell-trd-psilocybin',
    title: 'Dell Medical School · Treatment-Resistant Depression',
    desc: 'Reaching treatment-exhausted adults across Austin for a Schedule I psilocybin and SAINT rTMS protocol, with the screener front-loading the gates so most submissions never reached staff.',
    url: `${CDN}/6a3c1d2e4acac454805d9f75_trd%20psilocybin%C2%B7%20AUSTIN%2C%20TEXAS.pdf`,
    products: ['smart-screener'],
  },
  {
    type: 'Case Study', area: 'Cardiovascular', indication: 'HIV · Heart Health',
    slug: 'cannheart-miami',
    title: 'University of Miami · CANNHEART (HIV & Heart Health)',
    desc: 'Confirming five eligibility gates and routing each candidate to the correct study arm before staff made contact, for a two-arm study of cannabis use and heart health in people living with HIV.',
    url: `${CDN}/6a3c221feb0e653d10573435_CANNHEART%C2%B7%20MIAMI%2C%20FL.pdf`,
    products: ['smart-screener', 'vision'],
  },
  {
    type: 'Case Study', area: 'Neurodevelopmental', indication: 'Autism Spectrum Disorder',
    slug: 'vumc-asd',
    title: 'VUMC · ASD Case Study (2025)',
    desc: 'How targeted outreach and validation supported ASD recruitment.',
    url: `${CDN}/69959bb6771b5987dd06df66_VUMC%20ASD%20Case%20Study%20(2025).pdf`,
    products: ['smart-screener'],
  },
  {
    type: 'Case Study', area: 'Nutrition', indication: 'Nutrition Research',
    slug: 'ummc-spirulina',
    title: 'UMMC · Spirulina Research Study (2025)',
    desc: 'Recruitment approach and learnings from a Spirulina research study.',
    url: `${CDN}/69959bb6cca994895b18e221_Case%20Study%20-%20UMMC%20Spirulina%20Research%20Study%20(2025).pdf`,
    products: [],
  },
  {
    type: 'Case Study', area: 'Pediatrics', indication: 'Child & Young Adult',
    slug: 'temple-project-lite',
    title: 'Temple University · Project LITe (2024)',
    desc: 'Child and young adult recruitment campaign highlights and results.',
    url: `${CDN}/69959bb698d4fcdcb5aee82a_Case%20Study%20-%20Temple%20University%20%20Child%20%20Young%20Adult%20Research%20Study%20Project%20LITe%20(2024)%20(3).pdf`,
    products: [],
  },
];
