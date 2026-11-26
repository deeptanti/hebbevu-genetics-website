# hebbevugenetics.com

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Vercel.
Source of truth: `HEBBEVU-GENETICS-BRIEF.md` + `src-docs/Genetics website content.docx` (the client doc wins where they differ).

```bash
npm install
npm run dev            # http://localhost:3000
npm run check:tokens   # design-system guard (also runs before every build)
npm run build
```

## Sitemap

```
/                                   Home
├── /services                       Path A vs Path B
│   ├── /ivf-your-donors            Path A: your cows, our lab
│   ├── /buy-embryos                Path B: our herd's genetics
│   │   ├── /sex-sorted
│   │   └── /conventional
│   ├── /embryo-transfer            Transfer, surrogates, confirmation
│   ├── /is-ivf-right-for-you       The honest qualifier
│   └── /pricing                    How pricing works (structure, no ₹)
├── /the-lab
│   ├── /how-ivf-works   /facility   /results   /research
├── /breeds
│   ├── /gir /sahiwal /ongole /kankrej /rathi /jaffarabadi /holstein-friesian
│   └── /compare
├── /about
│   ├── /story   /team   /partners   /farm
├── /knowledge
│   ├── /<article-slug> ×7   /faqs   /glossary
├── /book                           Primary conversion (phone-first + WhatsApp)
├── /contact
├── /hi  /hi/services  /hi/breeds  /hi/book     (translation pending)
├── /legal/privacy  /legal/terms                (content pending)
└── /careers → careers.hebbevu.com  (redirect)
Legacy redirects from the content doc: /blogs, /blog/:slug, /about-us, /our-services, /our-breeds, /contact-us, /founders-brief
```

## Layout

| Path | What |
|---|---|
| `app/globals.css` | The design system **is** the Tailwind theme. Default theme not imported: only tokens exist. |
| `components/typography` | `Heading` (display/h1/h2/h3), `Text` (stat/subheading/body/label/small), `Pending` |
| `components/ui` | The eleven §6 components + `Card`, `Icon`, `MediaPlaceholder` |
| `components/layout` | `SiteHeader`, `SiteFooter`, `Logo`, `Section`, `Container`, `PageHero`, `Breadcrumbs`, `Analytics` |
| `components/blocks` | Page blocks composed from ui: `StatsBand`, `FeatureGrid`, `FaqList`, `EnquiryForm`, `ArticleBody`… |
| `content/` | All copy and data, typed. `articles.ts` is parsed from the client doc. |
| `scripts/check-tokens.mjs` | Fails on arbitrary values, style props, raw hex, or `stone` on any control. |

## System rules

- **No em dashes, anywhere.** House style. `check:tokens` fails the build if one appears. Rewrite with a comma, colon or full stop.
- **One hero.** Every page uses `PageHero`: full-bleed photo or video, white H1, actions passed as data. `tall` for section landing pages, `compact` for detail pages. Portrait photos auto-frame on the upper-middle; display size only for short titles.
- **Page anatomy.** Hero, then a white section, then strictly alternating white/mist sections (bark only via `StatsBand`), then `CTABand` last. Every page has a visual beyond text; no boxed single-line tiles (use `StepList` / numerals).

- **Tokens only.** `p-13`, `bg-red-500`, `rounded-xl` don't exist. `p-[13px]` fails `check:tokens`.
- **`stone` is decorative.** Form borders, focus rings and button edges are `graphite` (or `mist` on dark). Guarded by the script.
- **Borders before shadows.** Cards: `stone` hairline, no shadow, hover → `graphite` border. `shadow-md` only on the scrolled nav and dropdowns, and `shadow-lg` only on the mobile drawer.
- **One primary `Button` per section. One `CTABand` (deep) per page, placed last.**
- **Don't override component classes with conflicting utilities** (`className="mb-0"`). `cn()` doesn't merge classes, so use the props (`flush`, `framed`).
- Type: `display` = Playfair 700, `clamp(44px, 5.6vw, 84px)`, line-height 1.06, tracking −0.02em. Below 768px, h1/h2/h3/stat drop one step.
- Icons: **Phosphor duotone**, 24px, `currentColor` (brown on light, mist on dark), usually inside an `IconTile`. Lucide remains only for small UI glyphs (chevrons, menu).
- **Motion** (added at client request: overrides the brief's "nothing moves"): one soft easing (`--ease-out-soft`), reveals once per element on first view, and everything stops under `prefers-reduced-motion`. Interactive pieces live in `components/visuals`: `PathChooser`, `IvfTimeline`, `YieldChart`, `PhotoStrip`, `Ticker`.
- Two derived tints were added: `clay` and `sand` (brown on white). They're used for decorative fills only, never text.

## Photography & media

- `public/photos` + `content/media.ts`: ~45 photos, always rendered through `<Photo>` (or `PageHero banner`). Sources:
  1. The earlier site build (psquaresolutions.in/genetics7).
  2. The client's Drive folder "HG Website creatives": 1920px banners, page banners, high-res founders/calves, lab shots.
  Resized to ≤1920px, metadata stripped. Alt text describes only what is visible; only the founders and doctors are named.
- `public/video/breed-*.mp4`: Gir, Kankrej, Ongole and Jaffarabadi loops converted from the client's GIFs (40–66 MB → 1–3 MB), with poster frames.
- `public/brand/icons`: the client's own line-art icons, made transparent in brown and mist variants (`<BrandIcon>`).
- `/about/gallery`: filterable grid + lightbox of every photo, plus the breed clips.

## Waiting on the client

Lab figures + sample sizes · photography still missing: the lab/facility, OPU and transfer in progress, and portraits for Anupama, Susha, Dr. Raju, Dr. Yoganarendra, Dr. Atish, Dr. Aryan and Venna Varsha · horizontal & reversed logo, vectors · Hindi copy · privacy/terms · lead destination for the enquiry form · GTM / Meta Pixel IDs (`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`) · confirmation that +91 80505 39391 is on WhatsApp.
