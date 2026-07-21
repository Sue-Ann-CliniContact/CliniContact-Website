/**
 * Inline SVG illustrations for the alternating sections.
 *
 * Gradient ids are namespaced (ccx-g1 …) because SVG <defs> ids are global to
 * the document — two embeds that both defined "g1" would silently steal each
 * other's gradients once they share a page.
 */

const GRAD = (id) => `
  <defs>
    <linearGradient id="${id}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="rgba(50,87,235,.95)"/>
      <stop offset="1" stop-color="rgba(75,160,248,.92)"/>
    </linearGradient>
  </defs>`;

const svg = (body) =>
  `<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;

/**
 * Recruitment funnel.
 *
 * Modelled on the reference the team liked, but the solid stages stop at
 * "Referred" — the handoff CliniContact controls — and "Enrolled" is shown
 * faded and captioned as the site's outcome, not ours. This keeps the visual
 * they wanted without putting an enrollment commitment on the page.
 *
 * Stage names only, no conversion counts: hard numbers would imply a
 * conversion-rate promise that varies by protocol.
 */
const FUNNEL_STAGES = [
  { label: 'Reached', h: 320, us: true },
  { label: 'Pre-screened', h: 250, us: true },
  { label: 'Qualified', h: 180, us: true },
  { label: 'Referred', h: 120, us: true },
  { label: 'Enrolled', h: 120, us: false },
];

const funnelSvg = () => {
  const barW = 150;
  const gap = 24;
  const baseY = 430;
  let x = 40;
  const bars = FUNNEL_STAGES.map((s) => {
    const y = baseY - s.h;
    const fill = s.us ? 'url(#ccxFunnel)' : 'rgba(15,23,42,.10)';
    const labelColor = s.us ? '#0b1220' : 'rgba(15,23,42,.55)';
    const dash = s.us ? '' : ' stroke="rgba(15,23,42,.28)" stroke-width="2" stroke-dasharray="6 5"';
    const block = `
      <rect x="${x}" y="${y}" width="${barW}" height="${s.h}" rx="12" fill="${fill}"${dash}/>
      <text x="${x + barW / 2}" y="${baseY + 26}" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="17" font-weight="800" fill="${labelColor}">${s.label}</text>`;
    x += barW + gap;
    return block;
  }).join('');

  // Divider between what we deliver (through Referred) and the site's outcome.
  const dividerX = 40 + 4 * (barW + gap) - gap / 2;
  const enrolledX = 40 + 4 * (barW + gap) + barW / 2;
  const referredMidX = 40 + 3 * (barW + gap) + barW / 2;

  return `<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Recruitment funnel: reached, pre-screened, qualified, then referred to the site. Enrollment is the site's own outcome.">
    <defs>
      <linearGradient id="ccxFunnel" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#4BA0F8"/>
        <stop offset="1" stop-color="#3257EB"/>
      </linearGradient>
    </defs>
    <line x1="${dividerX}" y1="60" x2="${dividerX}" y2="${baseY}" stroke="rgba(15,23,42,.16)" stroke-width="2" stroke-dasharray="4 6"/>
    <text x="${referredMidX}" y="46" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="11" font-weight="800" fill="rgba(50,87,235,.9)" letter-spacing="1">WE DELIVER</text>
    <text x="${enrolledX}" y="46" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="11" font-weight="800" fill="rgba(15,23,42,.4)" letter-spacing="1">YOUR SITE</text>
    ${bars}
    <text x="${enrolledX}" y="${baseY + 46}" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="11" font-weight="600" fill="rgba(15,23,42,.42)">your outcome, not our claim</text>
  </svg>`;
};

/** Study-startup timeline: protocol → materials → IRB → approved, compressed. */
const irbTimelineSvg = () => {
  const steps = [
    { x: 90, label: 'Protocol', sub: 'Day 0' },
    { x: 320, label: 'Materials', sub: '~1 hour' },
    { x: 550, label: 'IRB review', sub: '1.2 cycles' },
    { x: 780, label: 'Approved', sub: 'Day 9' },
  ];
  const y = 210;
  const line = `<line x1="90" y1="${y}" x2="780" y2="${y}" stroke="rgba(50,87,235,.25)" stroke-width="4"/>`;
  const nodes = steps.map((s, i) => `
    <circle cx="${s.x}" cy="${y}" r="${i === 3 ? 18 : 13}" fill="${i === 3 ? 'url(#ccxT)' : '#fff'}" stroke="url(#ccxT)" stroke-width="4"/>
    ${i === 3 ? `<path d="M${s.x - 7} ${y} l5 5 l9 -11" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
    <text x="${s.x}" y="${y - 34}" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="17" font-weight="800" fill="#0b1220">${s.label}</text>
    <text x="${s.x}" y="${y + 44}" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="13" font-weight="700" fill="rgba(50,87,235,.9)">${s.sub}</text>
  `).join('');
  return `<svg viewBox="0 0 870 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Study startup timeline: protocol to IRB-approved recruitment materials in about nine days">
    <defs><linearGradient id="ccxT" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#4BA0F8"/><stop offset="1" stop-color="#3257EB"/></linearGradient></defs>
    <rect x="60" y="290" width="360" height="40" rx="10" fill="rgba(50,87,235,.08)"/>
    <text x="240" y="315" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="14" font-weight="800" fill="rgba(50,87,235,.95)">CliniContact: ~9 days</text>
    <rect x="450" y="290" width="360" height="40" rx="10" fill="rgba(15,23,42,.05)"/>
    <text x="630" y="315" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="14" font-weight="700" fill="rgba(15,23,42,.4)">Industry norm: 6–10 weeks</text>
    ${line}${nodes}
  </svg>`;
};

/** Partner-network map: a central program with community org nodes across regions. */
const partnerMapSvg = () => {
  const hub = { x: 435, y: 210 };
  const nodes = [
    { x: 140, y: 110, r: 20 }, { x: 250, y: 250, r: 15 }, { x: 180, y: 320, r: 12 },
    { x: 660, y: 120, r: 18 }, { x: 740, y: 240, r: 22 }, { x: 630, y: 320, r: 14 },
    { x: 420, y: 80, r: 13 }, { x: 470, y: 350, r: 16 },
  ];
  const links = nodes.map((n) => `<line x1="${hub.x}" y1="${hub.y}" x2="${n.x}" y2="${n.y}" stroke="rgba(50,87,235,.22)" stroke-width="2.5"/>`).join('');
  const dots = nodes.map((n) => `
    <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="rgba(75,160,248,.16)" stroke="rgba(75,160,248,.5)" stroke-width="2.5"/>
    <circle cx="${n.x}" cy="${n.y}" r="${n.r * 0.4}" fill="rgba(50,87,235,.85)"/>`).join('');
  return `<svg viewBox="0 0 870 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Partner network: community organizations across regions connected to one recruitment program">
    <defs><linearGradient id="ccxM" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#4BA0F8"/><stop offset="1" stop-color="#3257EB"/></linearGradient></defs>
    ${links}${dots}
    <circle cx="${hub.x}" cy="${hub.y}" r="40" fill="url(#ccxM)"/>
    <circle cx="${hub.x}" cy="${hub.y}" r="40" fill="none" stroke="rgba(75,160,248,.35)" stroke-width="8"/>
    <path d="M${hub.x - 15} ${hub.y} l10 10 l18 -20" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${hub.x}" y="${hub.y + 74}" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="14" font-weight="800" fill="#0b1220">Your program</text>
  </svg>`;
};

export const ILLUSTRATIONS = {
  funnel: funnelSvg(),
  irbTimeline: irbTimelineSvg(),
  partnerMap: partnerMapSvg(),

  remote: svg(`${GRAD('ccx-g1')}
    <rect x="90" y="70" rx="34" ry="34" width="350" height="420" fill="rgba(255,255,255,.88)" stroke="rgba(15,23,42,.10)"/>
    <rect x="120" y="110" rx="18" ry="18" width="290" height="56" fill="rgba(15,23,42,.06)"/>
    <rect x="120" y="190" rx="18" ry="18" width="290" height="56" fill="rgba(15,23,42,.06)"/>
    <rect x="120" y="270" rx="18" ry="18" width="290" height="56" fill="rgba(15,23,42,.06)"/>
    <rect x="120" y="350" rx="18" ry="18" width="190" height="56" fill="url(#ccx-g1)"/>
    <circle cx="680" cy="210" r="120" fill="rgba(75,160,248,.16)"/>
    <rect x="560" y="150" rx="30" ry="30" width="280" height="200" fill="rgba(255,255,255,.88)" stroke="rgba(15,23,42,.10)"/>
    <path d="M560 250h280" stroke="rgba(15,23,42,.12)"/>
    <circle cx="610" cy="210" r="26" fill="url(#ccx-g1)"/>
    <rect x="650" y="195" rx="14" ry="14" width="160" height="28" fill="rgba(15,23,42,.06)"/>
    <rect x="650" y="245" rx="14" ry="14" width="120" height="28" fill="rgba(15,23,42,.06)"/>
    <path d="M455 260 C 500 260, 520 240, 548 230" stroke="url(#ccx-g1)" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="548" cy="230" r="10" fill="url(#ccx-g1)"/>`),

  screening: svg(`${GRAD('ccx-g2')}
    <rect x="110" y="80" rx="34" ry="34" width="680" height="360" fill="rgba(255,255,255,.88)" stroke="rgba(15,23,42,.10)"/>
    <rect x="150" y="120" rx="18" ry="18" width="420" height="62" fill="rgba(15,23,42,.06)"/>
    <rect x="150" y="206" rx="18" ry="18" width="520" height="62" fill="rgba(15,23,42,.06)"/>
    <rect x="150" y="292" rx="18" ry="18" width="360" height="62" fill="rgba(15,23,42,.06)"/>
    <rect x="595" y="120" rx="18" ry="18" width="155" height="62" fill="url(#ccx-g2)"/>
    <circle cx="720" cy="320" r="82" fill="rgba(75,160,248,.16)"/>
    <path d="M650 320h140" stroke="rgba(15,23,42,.12)" stroke-width="6" stroke-linecap="round"/>
    <circle cx="650" cy="320" r="10" fill="url(#ccx-g2)"/>
    <circle cx="720" cy="320" r="10" fill="url(#ccx-g2)"/>
    <circle cx="790" cy="320" r="10" fill="url(#ccx-g2)"/>
    <path d="M250 420 C 320 470, 420 470, 490 420" stroke="url(#ccx-g2)" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="250" cy="420" r="10" fill="url(#ccx-g2)"/>
    <circle cx="490" cy="420" r="10" fill="url(#ccx-g2)"/>`),

  criteria: svg(`${GRAD('ccx-g3')}
    <circle cx="300" cy="260" r="170" fill="rgba(75,160,248,.14)"/>
    <circle cx="300" cy="260" r="110" fill="rgba(50,87,235,.10)"/>
    <circle cx="300" cy="260" r="50" fill="rgba(255,255,255,.88)" stroke="rgba(15,23,42,.10)"/>
    <circle cx="300" cy="260" r="16" fill="url(#ccx-g3)"/>
    <rect x="520" y="130" rx="28" ry="28" width="300" height="260" fill="rgba(255,255,255,.88)" stroke="rgba(15,23,42,.10)"/>
    <rect x="560" y="170" rx="18" ry="18" width="220" height="44" fill="rgba(15,23,42,.06)"/>
    <rect x="560" y="230" rx="18" ry="18" width="190" height="44" fill="rgba(15,23,42,.06)"/>
    <rect x="560" y="290" rx="18" ry="18" width="240" height="44" fill="rgba(15,23,42,.06)"/>
    <path d="M380 260 C 460 260, 480 260, 520 260" stroke="url(#ccx-g3)" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="520" cy="260" r="10" fill="url(#ccx-g3)"/>`),

  automation: svg(`${GRAD('ccx-g4')}
    <rect x="120" y="120" rx="28" ry="28" width="280" height="280" fill="rgba(255,255,255,.88)" stroke="rgba(15,23,42,.10)"/>
    <rect x="160" y="160" rx="16" ry="16" width="200" height="44" fill="rgba(15,23,42,.06)"/>
    <rect x="160" y="220" rx="16" ry="16" width="200" height="44" fill="rgba(15,23,42,.06)"/>
    <rect x="160" y="280" rx="16" ry="16" width="130" height="44" fill="url(#ccx-g4)"/>
    <rect x="520" y="160" rx="28" ry="28" width="260" height="200" fill="rgba(255,255,255,.88)" stroke="rgba(15,23,42,.10)"/>
    <circle cx="560" cy="210" r="18" fill="url(#ccx-g4)"/>
    <rect x="590" y="195" rx="14" ry="14" width="150" height="30" fill="rgba(15,23,42,.06)"/>
    <circle cx="560" cy="260" r="18" fill="rgba(75,160,248,.18)" stroke="rgba(75,160,248,.35)"/>
    <rect x="590" y="245" rx="14" ry="14" width="110" height="30" fill="rgba(15,23,42,.06)"/>
    <path d="M400 260 C 455 260, 480 260, 520 260" stroke="url(#ccx-g4)" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="520" cy="260" r="10" fill="url(#ccx-g4)"/>
    <circle cx="760" cy="120" r="70" fill="rgba(75,160,248,.14)"/>
    <path d="M725 120h70" stroke="rgba(15,23,42,.12)" stroke-width="6" stroke-linecap="round"/>
    <path d="M760 85v70" stroke="rgba(15,23,42,.12)" stroke-width="6" stroke-linecap="round"/>
    <circle cx="760" cy="120" r="10" fill="url(#ccx-g4)"/>`),
};
