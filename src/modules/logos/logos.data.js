const CDN = 'https://cdn.prod.website-files.com/652e0fad859f7ef17ca4e62c';

/**
 * Partner institutions, pulled from the live homepage's logo strip.
 *
 * These do heavy lifting in the redesign. CliniContact cannot win a volume
 * comparison against OpenClinica, but an institutional wall of this quality
 * signals something volume cannot: these organizations cleared CliniContact
 * through their own review. Alt text added — the originals were all alt="".
 */
export const PARTNER_LOGOS = [
  { name: 'Harvard Medical School', src: `${CDN}/688b036f5785c8eea335eb38_harvard%20medical%20school%20logo-p-500.png` },
  { name: 'Stanford Medicine', src: `${CDN}/67934a8bec8e4247f21076e1_Stanford_Medicine_V-web-p-500.png` },
  { name: "Brigham & Women's Hospital", src: `${CDN}/696712d83f48d4a7f45323c4_Brigham_%26_Women%27s_Hospital_MGB_Logo.svg-p-500.png` },
  { name: 'Beth Israel Deaconess Medical Center', src: `${CDN}/65659ad60dc3cffa146a03da_bidmc_stk_logo_rgb_aw_150dpi-p-500.png` },
  { name: 'Vanderbilt University', src: `${CDN}/65f432adc8b32115b45e265b_vanderbilt-university-vector-logo%20(1).png` },
  { name: 'University of Michigan', src: `${CDN}/671538a09cd82faa93c289c6_University-of-Michigan-Logo-p-500.webp` },
  { name: 'Rutgers University', src: `${CDN}/68a4d784ca10c648447cc171_rutgers-university-logo-zgsol3fpbxvbs4dp-p-500.png` },
  { name: 'Brown University School of Public Health', src: `${CDN}/68bfbb8048910982bad5b372_Brown_University_School_of_Public_Health_logo.svg.png` },
  { name: 'McGill Centre for Psychedelic Research and Therapy', src: `${CDN}/698041f27ed85a62c99e06cb_RGB_formal_Charmaine_and_Gordon_McGill_Center_for_Psychedelic_Research_and_Therapy-p-500.png` },
  { name: 'University of Alabama at Birmingham', src: `${CDN}/697a003343c6f0ba3e6db443_UAB_Monogram_Color.svg` },
  { name: 'University of Miami', src: `${CDN}/691f0be20d8b6da83d7cb9aa_Miami-University-Logo-p-500.png` },
  { name: 'University of Maryland', src: `${CDN}/6715f7035c5d9f9e1151becc_logos-maryland.webp` },
];
