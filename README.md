# impots.tax

**Centre de Commandement Fiscal** — Tableau de bord satirique présentant les vraies données fiscales françaises dans une esthétique "salle de guerre".

Données réelles. Présentation dramatique. Chaque nombre est vrai — c'est ça la blague.

🌐 **[impots.tax](https://impots.tax)** — also available [in English](https://impots.tax/en/)

---

## Features

- **The Journey of 100€** — From employer cost (~230€) to real purchasing power (~108€): the full extraction path, visualized
- **18 tax modules** — Income tax, corporate tax, flat tax, VAT, fuel taxes, behavioral taxes, salary contributions, welfare system, property tax, rental tax, inheritance, capital gains, highway & railway tolls, OECD comparison, macro indicators
- **Every number is sourced** — Official data from Loi de finances, URSSAF, OECD, INSEE, DGFiP
- **Bilingual** — French (default) and English (`/en/`)
- **Dark mode only** — Command center aesthetic with scanlines, pulsing alerts, and scrolling tickers

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| i18n | next-intl 4.x |
| Runtime | Node.js 22 |
| Container | Docker (node:22-alpine) |

## Getting Started

```bash
git clone https://github.com/Gauthier-Huguenin/impots-tax.git
cd impots-tax
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Base URL (`https://impots.tax`) |
| `NEXT_PUBLIC_UMAMI_URL` | No | Umami analytics instance URL |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | No | Umami website ID |
| `NEXT_PUBLIC_WEBHOOK_URL` | No | n8n webhook URL for report form (creates GitHub issues) |

## Self-Hosting with Docker

```bash
docker build -t impots-tax .
docker run -p 3000:3000 impots-tax
```

The Dockerfile uses a multi-stage build with `node:22-alpine` and Next.js standalone output.

## Project Structure

```
app/[locale]/             # i18n pages (FR default, EN prefixed)
  page.tsx                # Main dashboard
  [module]/page.tsx       # Detail pages (income-tax, vat, flat-tax, ...)
components/
  dashboard/              # Dashboard panels
  detail/                 # Detail page components
  ui/                     # Shared primitives (Panel, GaugeCircle, DataTable, ...)
lib/
  tax-data.ts             # Centralized fiscal data (sourced, dated)
  i18n/                   # Routing & locale config
messages/                 # fr.json, en.json
docs/
  tax-data-2025.md        # Source of truth for all fiscal data
```

## Data Sources

All fiscal data is documented in [`docs/tax-data-2025.md`](docs/tax-data-2025.md) with sources and dates. Primary references:

- **Loi de finances** — Income tax brackets, rates
- **URSSAF** — Social contributions
- **OECD Revenue Statistics** — International comparisons
- **INSEE** — GDP, debt, macro indicators
- **DGFiP** — Tax revenue figures

## Report & Ticketing

A "Report a problem" button in the footer lets visitors submit bug reports, data corrections, feature requests, or tax suggestions directly from the site.

The form sends a JSON payload to an [n8n](https://n8n.io/) webhook, which automatically creates a GitHub issue in the repository with the correct label and formatted body. No account required for visitors — the pipeline handles everything.

Set `NEXT_PUBLIC_WEBHOOK_URL` to enable it (see [Environment Variables](#environment-variables)).

To set up your own pipeline, import the n8n workflow template [`docs/n8n-report-workflow.json`](docs/n8n-report-workflow.json) into your n8n instance and replace the `YOUR_*` placeholders with your GitHub credentials, repository, and webhook path.

## Contributing

Contributions are welcome — especially corrections to fiscal data, new tax modules, and translation improvements.

1. Fork the repo
2. Create a branch (`git checkout -b feature/new-tax-module`)
3. Commit your changes
4. Open a pull request

## License

MIT — see [LICENSE](LICENSE).

### Attribution

If you reuse or adapt this project, please credit the original author:

> **impots.tax** by [Gauthier Huguenin](https://github.com/Gauthier-Huguenin) — [impots.tax](https://impots.tax)
