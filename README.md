# impots.tax

Satirical dashboard presenting real French tax data in a "command center" aesthetic.

Real data. Dramatic presentation. Every number is true — that's the joke.

## Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 (dark mode only)
- **i18n**: next-intl 4.x (FR default, EN at `/en/`)
- **Deployment**: Docker → GitHub Actions → GHCR → Coolify (Hetzner CX23)

## Development

```bash
npm install
npm run dev
```

## Documentation

- `CLAUDE.md` — Full project guide for Claude Code (conventions, architecture, rules)
- `docs/tax-data-2025.md` — Source of truth for all fiscal data (sourced, dated)

## License

TBD
