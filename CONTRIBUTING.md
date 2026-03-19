# Contributing to impots.tax

Thanks for your interest in contributing! This project tracks French taxes with real data and satirical presentation.

## Getting Started

```bash
git clone https://github.com/Gauthier-Huguenin/impots-tax.git
cd impots-tax
npm install
npm run dev
```

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run checks: `npm run type-check && npm run lint`
5. Commit and push
6. Open a Pull Request

## Tax Data Rules

All fiscal data lives in `docs/tax-data-2025.md` — this is the single source of truth.

- Every number must have an official source and a date
- No invented or estimated statistics
- Official sources: Loi de finances, URSSAF, OECD Revenue Statistics, INSEE, DGFiP

## Translations

The site is bilingual (French + English). When adding or modifying text:

- Add keys in **both** `messages/fr.json` and `messages/en.json`
- Never add a key to only one language file

## Suggest a Tax

Found a tax we missed? [Open an issue](https://github.com/Gauthier-Huguenin/impots-tax/issues/new?template=suggest-a-tax.yml) using the "Suggest a Tax" template.
