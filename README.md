# CliniContact Website

Site code for clinicontact.com. Everything builds into **one JS file** that Webflow loads
once per page. Webflow embeds become tiny mount points, so the 10,000-character embed
limit stops being a constraint.

## How it works

```
src/ ──build──> dist/cc.min.js ──CDN──> Webflow page
```

1. One `<script>` tag in Webflow **Page Settings → Custom Code → Before `</body>`**
2. Each section is a mount point embed, ~35 characters: `<div data-cc="nav"></div>`
3. All JS *and* CSS live in the bundle (CSS is injected at runtime — no second request)

## Previewing the redesign

```bash
npm install && npm run build
python3 -m http.server 8899
```

Then open:

| Page | URL |
| --- | --- |
| Redesigned homepage | http://localhost:8899/test/redesign.html |
| Solutions (by audience) | http://localhost:8899/test/solutions.html |
| How We Partner | http://localhost:8899/test/partner.html |
| Our Work | http://localhost:8899/test/work.html |

Nothing live, safe to click through. `local.html` and `chat.html` are component harnesses.

Note the chat will show "service temporarily unavailable" on localhost — the backend
only allows clinicontact.com origins. That is CORS, not a bug, and it resolves on the
real domain.

## Local development

```bash
npm install
npm run dev     # watch mode, rebuilds on save
npm run build   # minified production build
```

Then serve the repo and open the harness, which simulates a Webflow page:

```bash
python3 -m http.server 8899
# http://localhost:8899/test/local.html
```

## Deploying

Commit `dist/cc.min.js` (it is intentionally **not** gitignored), then load it via jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/CliniContact/CliniContact-Website@main/dist/cc.min.js"></script>
```

`@main` always serves latest but is cached ~12h. For instant cache-busting, tag a release
and pin the version — `@v0.1.0` — which is served immutably and is the safer habit:

```bash
git tag v0.1.0 && git push --tags
```

## Adding a module

1. Create `src/modules/<name>/index.js`
2. Import its CSS and call `injectCSS('<name>', css)`
3. Register with `define('<name>', mountFn)`
4. Import it from `src/main.js`
5. Drop `<div data-cc="<name>"></div>` into a Webflow embed

## Shared wiring

| Thing | Where |
| --- | --- |
| Backend URL, lead endpoint, thank-you URL | `src/core/api.js` |
| Brand tokens (colors, fonts, radius) | `src/core/tokens.css` |
| Nav links & product structure | `src/modules/nav/nav.data.js` |
| Contact modal | `src/modules/contact/` |

### Contact modal

Page-level singleton. Any element on any page opens it — no extra embed, no extra JS:

```html
<button data-cc-contact>Request a proposal</button>
```

Also available as `window.CC.openContact()`, and deep-linkable via `?contact=true`.

## Canonical behaviours

The homepage and Solutions page each shipped their own copy of the nav, and the two
drifted. Both now run the same module; where they disagreed, this is what won and why.

| Behaviour | Canonical | Why |
| --- | --- | --- |
| Persona value for sites | `Research Site or Investigator Network` | Matches the homepage and the B2B modal. The Solutions copy sent `Research Site or Investigator`, splitting one segment across two values in Monday. |
| On successful submit | Redirect to `/thank-you` | Almost certainly the conversion trigger in GA/Ads. The Solutions copy stayed on the page, so its leads never fired a conversion. |
| `?contact=true` | Always opens the modal | The Solutions copy omitted the check entirely, so campaign deep-links silently no-opped. |
| Persona option count | 6 | Recovered from the orphaned B2B modal; the live nav offered 4 and had no academic option. |

If the redirect is ever swapped for stay-on-page, set up a replacement conversion
trigger first — otherwise lead measurement goes dark.

## Migration safety

The old embeds used `<div id="cc-nav">`. That id still mounts the new nav, so pages can be
migrated one at a time instead of in a single sweep. See `LEGACY_IDS` in `src/core/mount.js`.

## Status

| Module | Embed | State |
| --- | --- | --- |
| Nav | `data-cc="nav"` | product-shaped now (`NAV_LINKS = PRODUCT_NAV`). "Platform" is a mega-menu that teaches the products; "Pricing" is a top-level link. Add `data-cc-dark` on dark-hero pages (homepage). Old capability nav kept as `CURRENT_NAV` for rollback. |
| Contact modal | *(none — global)* | ported, extracted from nav |
| Stats / Our Results | `data-cc="stats"` | ported |
| Footer | `data-cc="footer"` | ported (homepage + Solutions were identical) |
| Alternating sections | `data-cc="sections" data-cc-page="solutions"` | ported, data-driven — product pages are new data, not new code |
| Our Work / case studies | `data-cc="work"` | ported; Navidea removed, consent now recorded |
| Hero (redesigned) | `data-cc="hero"` | new — journey spine, no enrollment promise |
| Partner logos | `data-cc="logos"` | new — 12 institutions |
| Product sections | `data-cc="sections" data-cc-page="products"` | new — Horizon / Bridge / Screener / Vision |
| Protocol-complexity proof | `data-cc="proof"` | new — replaces volume stats |
| How We Partner | `data-cc="partner"` | new — engagement model |
| Pricing | `data-cc="pricing"` | new — Pricing page only, not the homepage |
| Participant off-ramp | `data-cc="participant"` | new — routes to Beacon |
| Newsletter | `data-cc="newsletter"` | links to the "Protocol to Patients" LinkedIn newsletter (no backend) |
| B2B chat assistant | `data-cc="chat"` | ported, but cut from the redesign (stale copy, largest block on the page) |

## Copy rules

- **US spelling** throughout. URL slugs keep their original form where already public.
- **No enrollment promises.** Sites consent and enroll; CliniContact delivers prescreened,
  verified referrals. The endpoint of every claim is the handoff.
- **No volume metrics.** No "N conditions", "N patients reached", or case-study counts.
  Lead with protocol difficulty and speed, both independent of company size.
- **No competitor named on-site.** State the differentiator as a category fact instead.
- **"Referrals", not "leads"** — "leads" is marketing vocabulary, not clinical research.
- **Integrations are bespoke per engagement**, not off-the-shelf connectors. Word them as a
  handoff built with the client's data team during onboarding.
