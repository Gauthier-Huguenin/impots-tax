# impots.tax - Project Guide

## Communication

- **Always speak to the user in French.** Code, commit messages, comments, and technical identifiers stay in English, but all conversation and explanations must be in French.
- **After every change, check if `CLAUDE.md` or `README.md` need updating** (new files, changed architecture, new conventions, modified project structure). Keep project documentation always up to date.

## Overview

Satirical dashboard website presenting real French tax data in a "command center" / OSINT aesthetic, inspired by World Monitor. The tone is "libertarian-tech Twitter" — real data, dramatic presentation. Bilingual: French (default, no URL prefix) / English (`/en/`).

- **Domain**: impots.tax
- **Target audience**: French taxpayers (primary), American libertarian-tech Twitter (secondary)
- **Content**: Real fiscal data from official sources (OECD, INSEE, URSSAF, DGFiP, Loi de finances)
- **Tone**: Factual data, satirical framing. No fake numbers, no invented statistics.

## Product Specification

### Central Element: "The Journey of 100€"

The hero panel of the dashboard. Shows the full path from employer cost to real purchasing power:

Employer cost (~230€) → Employer contributions (~54€) → Gross salary (~176€) → Employee contributions (~26€) → Net salary before tax (~150€) → Income tax (~20€) → Net salary (~130€) → VAT on spending (~22€) → **Real purchasing power (~108€)**

This is the largest, most visual panel. It's what hooks people in.

### Main Modules (dashboard panels, each clickable to a detail page)

1. **Impôt sur le revenu** — Progressive tax brackets (0% to 45%)
2. **Impôt sur les sociétés** — Corporate tax (25% standard, 15% PME)
3. **Flat Tax / PFU** — Capital gains, dividends, crypto (30% → 31.4% in 2026)
4. **TVA** — Value added tax (20% / 10% / 5.5% / 2.1%)
5. **Taxes carburant** — Fuel tax breakdown (~55% of pump price is taxes)
6. **Taxes comportementales** — Tobacco (~82% taxes), alcohol, sugar
7. **Salaires & Cotisations** — Complete salary breakdown:
   - Employee contributions (CSG, CRDS, pension, etc.)
   - Employer contributions (health, family, unemployment, etc.)
   - URSSAF role and breakdown
   - Other costs (AGIRC-ARRCO, AT/MP, FNAL, etc.)
8. **Système social** — French welfare system:
   - RSA (minimum income, ~647€/month)
   - AAH (disability allowance, ~1033€/month)
   - Chômage / ARE (unemployment insurance)
   - AME (healthcare for undocumented immigrants, ~1.2B€ budget)

### Property & Real Estate Modules

9. **Taxe foncière** — Property tax: calculation, rates by city, €55B revenue, +30% in 10 years
10. **LMNP & Airbnb** — Furnished rental tax regime, loi Le Meur, micro-BIC changes, depreciation reintegration

### Wealth Transfer Modules

11. **Succession & Donation** — Inheritance tax (5% to 45% direct line, 60% non-relatives), assurance-vie, €16.6B revenue
12. **Plus-values hors PEA** — Capital gains on foreign stocks (S&P 500), CTO vs PEA comparison, flat tax 30→31.4%

### Infrastructure Tax Modules

13. **Péages autoroutiers** — Highway tolls: €11.9B revenue, €4.4B profits, concession system, end dates 2031-2036
14. **Péages ferroviaires** — Railway tolls: >€7B revenue, 40% of TGV ticket price, +4%/year increases

### Auxiliary Modules

15. **Comparaison internationale** — OECD tax-to-GDP rankings, France vs major economies
16. **Indicateurs macro** — Public debt/GDP, spending/GDP, deficit, key figures

### Site Structure

- **Homepage** (`/`): Dashboard with all panels in summary view, "Journey of 100€" as hero
- **Detail pages** (`/[module-slug]`): One page per module with full data, explanations, sources
- **Language toggle**: FR/EN on every page

### Data Reference

All fiscal data is centralized in `docs/tax-data-2025.md`. Claude Code MUST reference this file for any data displayed on the site. No numbers from memory.

## Tech Stack

- **Framework**: Next.js 16.1.x (App Router, stable) + React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with dark theme by default (dashboard aesthetic)
- **i18n**: next-intl 4.x — locales: `['fr', 'en']`, defaultLocale: `'fr'`, localePrefix: `'as-needed'`, localeDetection: `false`
- **URL routing**: French has no prefix (default), English is prefixed with `/en/`. Slugs are shared across languages (English slugs): `/income-tax`, `/corporate-tax`, `/flat-tax`, `/vat`, `/fuel-tax`, `/behavioral-tax`, `/salary-contributions`, `/welfare-system`, `/property-tax`, `/rental-tax`, `/inheritance-tax`, `/capital-gains`, `/highway-tolls`, `/railway-tolls`, `/comparison`, `/indicators`, `/suggest`, `/donate`. No translated URLs.
- **Package manager**: npm
- **Node.js**: 22 LTS (Docker base image: `node:22-alpine`)

## Infrastructure & Deployment

- **VPS**: Hetzner CX23 (4 vCPU, 8 Go RAM)
- **PaaS**: Coolify (self-hosted)
- **Container**: Docker multi-stage build (node:22-alpine), Next.js standalone output
- **CI/CD**: GitHub Actions builds Docker image → pushes to `ghcr.io/gauthier-huguenin/impots-tax` → triggers Coolify webhook
- **Deploy**: Coolify pulls pre-built image from GHCR and deploys (no build on VPS)
- **Domain**: impots.tax (SSL via Coolify/Let's Encrypt)
- **Repository**: Private GitHub repo `impots-tax`

## Project Structure

```
.github/workflows/        # GitHub Actions (Docker build & push to GHCR)
Dockerfile                # Multi-stage production build
docs/
  tax-data-2025.md        # Source of truth for all fiscal data (sourced, dated)
app/
  [locale]/               # i18n dynamic segment
    layout.tsx            # Locale layout with NextIntlClientProvider
    page.tsx              # Main dashboard page (hero + panels)
    [module-slug]/        # Detail pages: income-tax, corporate-tax, flat-tax, vat, fuel-tax, behavioral-tax, salary-contributions, welfare-system, property-tax, rental-tax, inheritance-tax, capital-gains, highway-tolls, railway-tolls
      page.tsx
    comparison/           # International comparison detail page
      page.tsx
    indicators/           # Macro indicators detail page
      page.tsx
    suggest/              # "Suggest a tax" contact form page
      page.tsx
    donate/               # Donation page (with satirical tax breakdown)
      page.tsx
  layout.tsx              # Root layout (html, body, fonts)
  api/suggest/            # POST endpoint for tax suggestion form
  robots.ts               # Dynamic robots.txt
  sitemap.ts              # Dynamic sitemap
components/
  layout/                 # Header, Footer, LanguageSwitcher, MobileMenu
  dashboard/              # Dashboard panels (JourneyOf100, TaxBrackets, SocialContributions, CorporateTax, FlatTax, OECDComparison, ThreatLevel, TVA, SalaryCost, FuelTax, BehavioralTax, WelfareSystem, MacroIndicators, Timeline, Ticker)
  detail/                 # Shared components for detail pages
  suggest/                # Tax suggestion form
  donate/                 # Donation page components (DonationBreakdown)
  ui/                     # Shared UI primitives (Panel, GaugeCircle, CompareBar, DataTable)
lib/
  i18n/
    routing.ts            # Shared routing config (single source of truth)
    config.ts             # Locale definitions and Locale type
    request.ts            # next-intl request config
  navigation.ts           # next-intl navigation helpers (Link, useRouter, usePathname)
  tax-data.ts             # Centralized tax data (brackets, rates, OECD stats) with year/source annotations
  url.ts                  # Server-side locale-aware URL helper (localePath)
  config.ts               # siteConfig (url, domain, social links)
messages/                 # fr.json, en.json (translation files)
proxy.ts                  # next-intl locale proxy (Next.js 16 convention, replaces middleware.ts)
styles/globals.css        # Tailwind directives + custom animations (scanlines, pulses, ticker scroll)
tailwind.config.ts        # Custom theme (dashboard color palette)
next.config.ts            # Next.js config (standalone output, next-intl plugin)
```

## Commands

```bash
npm run dev          # Local dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

## Dev Server

- **After delivering any change, always start the dev server** so the user can preview immediately without touching the terminal.
- **Before starting `npm run dev`**, kill any existing Next.js dev processes to avoid port incrementing (3001, 3002, etc.):
  ```bash
  pkill -f "next dev" 2>/dev/null; npm run dev
  ```
- Run the dev server in the background (`run_in_background: true`).

## Code Conventions

- **Server components by default**. Only add `'use client'` when client-side APIs are needed (clock, animations, language switcher).
- **Named exports** (not default exports).
- **TypeScript interfaces** for all component props.
- **File naming**: kebab-case for files, PascalCase for exports.
- **Imports**: Always use the `@/` alias for absolute imports.
- **Styling**: Tailwind utilities only (no CSS modules). Dark theme is the default — the entire site is dark. No need for `dark:` variants unless a light mode is added later.
- **Animations**: Pure CSS `@keyframes` in `globals.css`. GPU-accelerated only (transform, opacity). No Framer Motion.
- **Comments**: Minimal — prefer self-documenting code.

## i18n Rules

- Translation files: `messages/fr.json` and `messages/en.json`
- **Always add keys in BOTH language files** when creating/modifying translations.
- Namespaces: `metadata`, `header`, `threatLevel`, `journeyOf100`, `taxBrackets`, `corporateTax`, `flatTax`, `socialContributions`, `salaryCost`, `keyIndicators`, `oecdComparison`, `tva`, `fuelTax`, `behavioralTax`, `welfareSystem`, `propertyTax`, `rentalTax`, `inheritanceTax`, `capitalGains`, `highwayTolls`, `railwayTolls`, `timeline`, `ticker`, `suggest`, `donate`, `footer`
- Server components: `const t = await getTranslations({ locale, namespace: 'ns' })`
- Client components: `const t = useTranslations('ns')`
- Rich text: `t.rich('key', { strong: (chunks) => <strong>{chunks}</strong> })`
- **i18n routing**: `lib/i18n/routing.ts` is the single source of truth for locale config (`locales`, `defaultLocale`, `localePrefix`). Both `proxy.ts` and `lib/navigation.ts` import from it. Never duplicate these values.
- **localeDetection is OFF**: The middleware does NOT auto-detect locale from `Accept-Language` headers. This is intentional — with `localePrefix: 'as-needed'`, unprefixed URLs (FR) would be wrongly redirected to `/en/` for English browsers. Language is controlled only by URL prefix and the LanguageSwitcher.
- **Links (client components)**: Use `Link` from `@/lib/navigation` (locale-aware). Never use `next/link` with manual `/${locale}/` prefix — it breaks `localePrefix: 'as-needed'`.
- **Links (server components)**: Use `localePath()` from `lib/url.ts` to build locale-prefixed paths with `next/link`.
- **Server-to-client href handoff**: When a server component passes an `href` prop to a client component that uses `Link` from `@/lib/navigation`, pass the PLAIN path (e.g., `/about`) WITHOUT locale prefix. The client `Link` auto-prefixes. Using `localePath()` in this scenario causes double-prefixing on non-default locales (`/en/en/about` → 404). Only use `localePath()` when the href is consumed by `next/link` directly in a server component, or for absolute URLs (metadata, sitemap).

## Tax Data Rules

- **All fiscal data must be sourced and dated.** Every number in `lib/tax-data.ts` must have a comment with source and year.
- **No invented statistics.** If a number cannot be verified, mark it with `// [TODO: verify]`.
- **Update annually.** Tax brackets, rates, and OECD comparisons change yearly. The data year must be visible on the dashboard.
- Official sources: Loi de finances (for IR brackets), URSSAF (for social contributions), OECD Revenue Statistics (for international comparisons), INSEE (for GDP/debt data).

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Base URL (https://impots.tax) |

## Important Rules

- **Always run `npm run type-check` before considering work done.**
- Keep FR and EN translations in sync — never add a key to only one file.
- Use Next.js `Image` component for images (WebP format preferred).
- New pages must include `generateMetadata()` for SEO.
- `next.config.ts` output is `'standalone'` for Docker — do not change.
- Security headers should be configured in `next.config.ts`.

## Design System

The visual identity is a dark "command center" dashboard:

- **Dark mode only**. No light mode. The entire site is dark.
- **Mobile-first responsive**. Every panel, every page must work on mobile. Dashboard panels stack vertically on small screens.
- **Background**: Near-black (#0a0c10), panels slightly lighter (#0f1218)
- **Accent colors**: Red (#ff2d2d) for danger/high tax, Amber (#ffb020) for warning, Cyan (#00d4ff) for info, Green (#00ff88) for low/favorable
- **Typography**: Monospace for data (JetBrains Mono or Share Tech Mono), condensed sans-serif for titles (Oswald)
- **Effects**: Subtle scanlines overlay, pulsing borders on critical elements, scrolling ticker

### French Identity (without impersonation)

- **Tricolore**: Thin blue-white-red stripes at top/bottom of pages, as visual separators between sections, on panel borders. It must feel French and slightly "official parody", NOT like an actual government site.
- **No Marianne logo, no "République Française" branding, no .gouv.fr mimicry.** The parody comes from the format and tone, not from pretending to be official.
- The aesthetic should recall French administrative seriousness, but exaggerated through the "command center" lens.

### Tone & Voice

- **Ironic, deadpan, satirical.** The text reads like a serious government briefing or military intelligence report, but the content is absurd because the taxes themselves are absurd. The humor comes from the contrast between the format and the reality.
- **Vocabulary**: "threat level", "fiscal pressure index", "containment failure", "extraction rate", "citizen compliance metrics". Tax brackets are "escalation stages". OECD comparisons are "intelligence reports". The salary breakdown is a "field damage assessment".
- **USSR comparisons**: When France ranks #1 or has a notably extreme tax, do not hesitate to compare with the Soviet Union or other famously high-tax regimes. Example: "France's tax-to-GDP ratio (46.1%) exceeds the USSR's peak estimated extraction rate."
- **Everything stated is TRUE.** The satire comes from presentation, not fabrication. Every number is real, every source is cited. The joke is that reality needs no exaggeration.
- **Bilingual tone**: French version can be slightly more insider/cynical ("on est foutus"). English version is more wide-eyed/shocked ("wait, they tax WHAT?").

## Additional Pages

### Suggest a Tax (Contact Form)

- A page/modal where visitors can suggest a tax they think should be added to the dashboard.
- Tone: "Did we miss one? In France, there's always another tax hiding somewhere. Help us find it."
- Simple form: name (optional), email (optional), tax name, description.
- Webhook to n8n or simple email forwarding.

### Donate Page

- A donation page, entirely in humor.
- The joke: "I'm a micro-entrepreneur. Even on your donation, I'll be taxed. Here's the breakdown of what happens to your 10€."
- Show a live breakdown: donation amount → micro-entrepreneur social charges (~22%) → IR → what actually reaches the creator.
- Payment integration: TBD (Stripe, Ko-fi, or simple PayPal link).
- The page itself is a meta-commentary on the site's theme: you can't even give money in France without the state taking a cut.
