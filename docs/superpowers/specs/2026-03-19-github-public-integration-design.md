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

### 1. GitHub Button in Header

**Location**: `components/layout/header.tsx`

Add a GitHub icon link between the X/Twitter icon and the Donate button.

- SVG icon, same size as X icon (`h-4 w-4`)
- Same styling: `text-gray-400 transition-colors hover:text-gray-200`
- Links to `siteConfig.social.github`, opens in new tab
- `aria-label="GitHub"`
- Icon only, no text — consistent with the X icon treatment

The footer already has a GitHub link with icon + text label. No changes needed there.

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
- Mention of `npm run type-check` requirement before PRs

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
  - [ ] `npm run type-check` passes
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
| `components/layout/header.tsx` | Add GitHub icon link |
| `CONTRIBUTING.md` | Create |
| `.github/ISSUE_TEMPLATE/suggest-a-tax.yml` | Create |
| `.github/PULL_REQUEST_TEMPLATE.md` | Create |

## Dependencies

None. All changes are independent and can be implemented in any order.
