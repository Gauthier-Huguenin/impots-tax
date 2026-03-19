# GitHub Public Integration — Design Spec

**Date**: 2026-03-19
**Status**: Approved
**Scope**: Prepare impots.tax repository for public release on GitHub

## Context

The impots.tax repository is going public. The site needs to be visibly connected ("married") to its GitHub repo through a prominent CTA, proper open-source hygiene files, and a clean security posture.

## Security Audit Result

A full audit of the git history, environment variables, CI/CD workflows, and configuration files found **no secrets or sensitive data**. The repository is safe to make public as-is.

Key findings:
- No API keys, tokens, or passwords in code or git history
- `.env` files properly gitignored, none committed
- GitHub Actions uses `secrets.*` for all sensitive values (Coolify webhook/token, Umami config)
- Only public URLs in source code (Stripe payment link, social links)
- Security headers properly configured in `next.config.ts`

## Changes

### 1. GitHub Star Button in Header

**Location**: `components/layout/header.tsx`

Add a "★ Star" button between the X/Twitter icon and the Donate button. Inspired by n8n's GitHub star button — a small outlined button with star icon + "Star" text, no live counter.

- Small pill/outlined button: border border-gray-700, rounded, px-2 py-0.5
- Star icon (★) + "Star" text, monospace, text-xs
- Color: gray-400 base, hover to white or favorable green (matches dashboard palette)
- Links to `siteConfig.social.github`, `target="_blank"`, `rel="noopener noreferrer"`
- `aria-label="Star on GitHub"`
- "Star" label is not translated — universal GitHub terminology
- Hidden on very small screens (`hidden sm:flex`) to avoid header overflow on mobile
- The footer already has a GitHub link with icon + text label. No changes needed there.

### 1b. Header Cleanup

**Location**: `components/layout/header.tsx`

Remove two elements to make room for the Star button:
- Remove the tricolore micro-stripe (blue/white/red bars, lines 81-85)
- Remove the data year display ("DONNÉES 2025", lines 68-70)

### 2. CONTRIBUTING.md

**Location**: `CONTRIBUTING.md` (repo root)
**Language**: English (open-source convention)

Contents:
- How to contribute (fork → feature branch → PR workflow)
- Where to find tax data (`docs/tax-data-2025.md` is source of truth)
- Key rule: all fiscal data must be sourced and dated
- Link to the "Suggest a tax" issue template
- Reminder that FR/EN translations must stay in sync
- Development setup instructions (clone, npm install, npm run dev)
- Mention of `npm run type-check` and `npm run lint` requirement before PRs

### 3. Issue Template — Suggest a Tax

**Location**: `.github/ISSUE_TEMPLATE/suggest-a-tax.yml`
**Format**: YAML form (not markdown)

Fields:
- **Tax name** (required, text input)
- **Description** (required, textarea) — what is this tax, who pays it, how much
- **Sources** (required, textarea) — official links, legislation references
- **Preferred language** (dropdown: French / English / No preference)

Intro text with satirical tone: "In France, there's always another tax hiding somewhere. Help us track them all."

### 4. Pull Request Template

**Location**: `.github/PULL_REQUEST_TEMPLATE.md`

Minimal checklist:
- What: brief description of the change
- Why: motivation/context
- Checklist:
  - [ ] `npm run type-check` and `npm run lint` pass
  - [ ] Translations added in both `fr.json` and `en.json`
  - [ ] Fiscal data is sourced and dated (if applicable)

## Out of Scope

- No GitHub stars counter (avoids external API dependency)
- No CODE_OF_CONDUCT.md (minimal approach)
- No additional issue templates beyond "Suggest a tax"
- No changes to footer (already has GitHub link)
- No git history rewriting (audit confirmed clean)

## Files Modified

| File | Action |
|------|--------|
| `components/layout/header.tsx` | Add GitHub Star button |
| `CONTRIBUTING.md` | Create |
| `.github/ISSUE_TEMPLATE/suggest-a-tax.yml` | Create |
| `.github/PULL_REQUEST_TEMPLATE.md` | Create |

## Dependencies

None. All changes are independent and can be implemented in any order.
