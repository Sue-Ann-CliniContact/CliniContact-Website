const CDN = 'https://cdn.prod.website-files.com/652e0fad859f7ef17ca4e62c';

/**
 * Real product screenshots.
 *
 * Ratios vary a lot (Horizon 2.43 landscape, Vision 0.94 and Bridge 0.96 both
 * portrait), and the two dashboards are far too dense to read at ~500px column
 * width. Rather than shrink them into illegibility, each is shown top-anchored
 * in a fixed-height frame with a fade at the cut, and links out to the full
 * image. A prospect sees a credible product surface and can open the detail if
 * they want it.
 */
export const SCREENSHOTS = {
  horizonIntake: {
    src: `${CDN}/6a5e7bfb176b34ed9f1d4410_Screenshot%202026-07-20%20at%2021.44.30.png`,
    alt: 'Horizon new-study intake: paste a ClinicalTrials.gov link, upload a protocol PDF, or paste protocol text',
    w: 1630,
    h: 670,
  },
  visionConsole: {
    src: `${CDN}/6a5e7bfdcf236c0a42ed1438_Screenshot%202026-07-20%20at%2021.49.03.png`,
    alt: 'Vision participant console: find a participant by study, site, condition or age range, with the Vision AI assistant',
    w: 830,
    h: 884,
    dark: true,
  },
  bridgeDashboard: {
    src: `${CDN}/6a5e7cea8f9e4d57e87f2d4b_Screenshot%202026-07-20%20at%2021.54.06.png`,
    alt: 'Bridge partner outreach dashboard: open, reply and click rates, partner interaction breakdown, outreach footprint map and eligibility-adjusted reach estimate',
    w: 920,
    h: 960,
  },
};
