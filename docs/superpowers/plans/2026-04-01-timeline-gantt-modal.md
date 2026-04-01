# Timeline Gantt Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the vertical timeline component with an interactive Gantt modal that displays 8 key fiscal events in a horizontal bar chart, opening on click like other dashboard panels.

**Architecture:** 
1. Update `TIMELINE_EVENTS` data in `lib/tax-data.ts` to include 8 curated events with color and displayValue fields
2. Create new `TimelineGanttModal` component that renders the horizontal Gantt chart
3. Create new `TimelinePanel` component that wraps the modal trigger (replacing the old Timeline component)
4. Update dashboard to use the new TimelinePanel
5. Add styles for Gantt visualization (barred background, glows, responsive layout)

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Next.js App Router, next-intl

---

## File Structure

**Modified:**
- `lib/tax-data.ts` — Update TIMELINE_EVENTS with 8 events + color/displayValue
- `components/dashboard/timeline.tsx` — Rename to `timeline-panel.tsx`, refactor to use modal
- `messages/fr.json` — Add/update timeline event translations
- `messages/en.json` — Add/update timeline event translations

**Created:**
- `components/dashboard/timeline-gantt-modal.tsx` — Gantt chart modal component
- `styles/gantt.css` — Gantt-specific styling (optional if using Tailwind only)

---

## Tasks

### Task 1: Update TIMELINE_EVENTS data structure

**Files:**
- Modify: `lib/tax-data.ts:405-418`

- [ ] **Step 1: Read current TIMELINE_EVENTS to understand structure**

Read `lib/tax-data.ts` lines 405-418 to see the existing timeline data.

- [ ] **Step 2: Update TIMELINE_EVENTS to 8 key events with new fields**

Replace the `TIMELINE_EVENTS` array with:

```typescript
export const TIMELINE_EVENTS: TimelineEvent[] = [
  { 
    year: 1914, 
    key: "ir1914",
    color: "#00ff88",
    displayValue: "2%"
  },
  { 
    year: 1945, 
    key: "secu1945",
    color: "#00d4ff",
    displayValue: "Cotisations"
  },
  { 
    year: 1954, 
    key: "tva1954",
    color: "#ffb020",
    displayValue: "16.85%"
  },
  { 
    year: 1991, 
    key: "csg1991",
    color: "#ff2d2d",
    displayValue: "9.2%"
  },
  { 
    year: 1996, 
    key: "crds1996",
    color: "#ff9500",
    displayValue: "0.5%"
  },
  { 
    year: 2018, 
    key: "pfu2018",
    color: "#00ffff",
    displayValue: "30%"
  },
  { 
    year: 2019, 
    key: "carbon2019",
    color: "#9d4edd",
    displayValue: "44.60€/t"
  },
  { 
    year: 2026, 
    key: "cdhr2026",
    color: "#ff2d2d",
    displayValue: "CSG+10.6%"
  },
];
```

- [ ] **Step 3: Update TimelineEvent interface to include new fields**

Find the `TimelineEvent` interface (likely near the TIMELINE_EVENTS definition). Update it to:

```typescript
export interface TimelineEvent {
  year: number;
  key: string;
  color: string;
  displayValue: string;
}
```

- [ ] **Step 4: Run TypeScript check to verify no errors**

```bash
npm run type-check
```

Expected: No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add lib/tax-data.ts
git commit -m "refactor(data): update timeline events to 8 key events with gantt fields"
```

---

### Task 2: Create TimelineGanttModal component

**Files:**
- Create: `components/dashboard/timeline-gantt-modal.tsx`

- [ ] **Step 1: Create the modal component file**

Create `components/dashboard/timeline-gantt-modal.tsx` with this structure:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { TIMELINE_EVENTS } from "@/lib/tax-data";

interface TimelineGanttModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimelineGanttModal({ isOpen, onClose }: TimelineGanttModalProps) {
  const t = useTranslations("timeline");

  if (!isOpen) return null;

  // Calculate bar width percentage (years since 1914 / 112 years * 100)
  const calculateBarWidth = (year: number): number => {
    const yearsSince1914 = year - 1914;
    const totalYears = 2026 - 1914;
    return (yearsSince1914 / totalYears) * 100;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded border-2 border-blanc bg-panel p-6 m-4">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between border-b border-blanc/20 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-widest text-blanc">
              {t("title")}
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              1914 → 2026 • Les jalons qui ont façonné l'extraction
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-muted hover:text-blanc transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Gantt Chart */}
        <div className="mb-4">
          {/* Timeline axis */}
          <div className="mb-3 flex justify-between px-10 font-mono text-xs font-bold text-muted">
            <span>1900</span>
            <span>1920</span>
            <span>1940</span>
            <span>1960</span>
            <span>1980</span>
            <span>2000</span>
            <span>2020</span>
          </div>

          {/* Gantt bars */}
          <div className="space-y-2.5 px-10">
            {TIMELINE_EVENTS.map((event) => (
              <div key={event.key} className="flex items-center gap-3">
                {/* Label */}
                <div className="w-24 flex-shrink-0">
                  <div
                    className="font-mono text-xs font-bold"
                    style={{ color: event.color }}
                  >
                    {event.year} {event.key.split(/(?=[A-Z])/).slice(0, -1).join("").toUpperCase()}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-muted">
                    {t(event.key as "ir1914")}
                  </div>
                </div>

                {/* Bar */}
                <div className="flex-1 relative h-1.5 bg-slate-900 rounded">
                  <div
                    className="h-full rounded transition-all"
                    style={{
                      width: `${calculateBarWidth(event.year)}%`,
                      backgroundColor: event.color,
                      boxShadow: `0 0 6px ${event.color}40`,
                    }}
                  />
                </div>

                {/* Value */}
                <div className="w-20 flex-shrink-0 text-right">
                  <div
                    className="font-mono text-xs font-bold"
                    style={{ color: event.color }}
                  >
                    {event.displayValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/timeline-gantt-modal.tsx
git commit -m "feat(dashboard): create timeline gantt modal component"
```

---

### Task 3: Create TimelinePanel component (refactor old Timeline)

**Files:**
- Modify: `components/dashboard/timeline.tsx` → `components/dashboard/timeline-panel.tsx`

- [ ] **Step 1: Rename and refactor timeline.tsx**

Rename the file `timeline.tsx` to `timeline-panel.tsx` and replace its content:

```typescript
"use client";

import { useState } from "react";
import { TimelineGanttModal } from "./timeline-gantt-modal";

export function TimelinePanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="rounded border-2 border-blanc bg-panel p-5 cursor-pointer hover:border-blanc/80 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <h2 className="font-display text-base font-bold uppercase tracking-widest text-blanc">
          CHRONOLOGIE FISCALE
        </h2>
        <p className="mt-2 font-mono text-xs text-muted">
          Cliquez pour voir la chronologie complète
        </p>
      </div>

      <TimelineGanttModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 2: Update import in dashboard page**

Find where `Timeline` is imported in the dashboard (likely `app/[locale]/page.tsx`) and update:
- Old: `import { Timeline } from "@/components/dashboard/timeline";`
- New: `import { TimelinePanel } from "@/components/dashboard/timeline-panel";`

Also update the usage:
- Old: `<Timeline />`
- New: `<TimelinePanel />`

- [ ] **Step 3: Run TypeScript check**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/page.tsx components/dashboard/timeline-panel.tsx
git commit -m "refactor(dashboard): convert timeline to modal trigger panel"
```

---

### Task 4: Delete old timeline.tsx

**Files:**
- Delete: `components/dashboard/timeline.tsx`

- [ ] **Step 1: Remove the old file**

```bash
rm components/dashboard/timeline.tsx
```

- [ ] **Step 2: Verify no imports reference it**

```bash
grep -r "from.*timeline\"" components/ app/ --include="*.tsx" --include="*.ts"
```

Expected: No results (all imports should be updated to `timeline-panel`).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(dashboard): remove old timeline component"
```

---

### Task 5: Update translations (French)

**Files:**
- Modify: `messages/fr.json:209-223`

- [ ] **Step 1: Review current timeline translations**

Read `messages/fr.json` to see the current timeline namespace (around line 209).

- [ ] **Step 2: Update French translations to match 8 events**

Ensure the timeline namespace has these keys (update if missing):

```json
"timeline": {
  "title": "CHRONOLOGIE FISCALE",
  "ir1914": "Impôt sur le revenu",
  "secu1945": "Sécurité sociale",
  "tva1954": "Taxe valeur ajoutée",
  "csg1991": "Contribution sociale",
  "crds1996": "Remboursement dette sociale",
  "pfu2018": "Flat Tax (PFU)",
  "carbon2019": "Taxe carbone",
  "cdhr2026": "Minimum fiscal et hausse CSG"
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add messages/fr.json
git commit -m "i18n(fr): update timeline translations for gantt modal"
```

---

### Task 6: Update translations (English)

**Files:**
- Modify: `messages/en.json` (find timeline namespace)

- [ ] **Step 1: Find and review English timeline translations**

Search for the timeline namespace in `en.json`.

- [ ] **Step 2: Update English translations**

Ensure these keys exist with English translations:

```json
"timeline": {
  "title": "FISCAL TIMELINE",
  "ir1914": "Income tax",
  "secu1945": "Social security",
  "tva1954": "Value added tax",
  "csg1991": "Social contribution",
  "crds1996": "Social debt repayment",
  "pfu2018": "Flat tax (PFU)",
  "carbon2019": "Carbon tax",
  "cdhr2026": "Minimum tax & CSG increase"
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add messages/en.json
git commit -m "i18n(en): update timeline translations for gantt modal"
```

---

### Task 7: Test the implementation locally

**Files:**
- Test: All dashboard components

- [ ] **Step 1: Kill any existing Next.js processes and start dev server**

```bash
pkill -f "next dev" 2>/dev/null; npm run dev
```

Expected: Dev server starts on `http://localhost:3000` (or next available port).

- [ ] **Step 2: Open dashboard in browser**

Navigate to `http://localhost:3000` (or the URL shown in terminal).

- [ ] **Step 3: Verify Timeline panel is visible**

Look for a panel titled "CHRONOLOGIE FISCALE" with text "Cliquez pour voir la chronologie complète".

- [ ] **Step 4: Click the Timeline panel to open modal**

Click on the panel and verify:
- Modal appears as overlay
- Header shows "CHRONOLOGIE FISCALE"
- 8 Gantt bars are visible with correct colors
- Close button (✕) is in top right
- Bars have glow effects

- [ ] **Step 5: Test French/English toggle**

Click language toggle and verify:
- Titles and descriptions translate correctly
- Gantt bars remain the same

- [ ] **Step 6: Test responsive design**

Resize browser to test mobile (use DevTools):
- Modal should stack properly
- Gantt bars should remain readable
- No overflow issues

- [ ] **Step 7: Close modal**

Click the X button or click outside the modal to close it.

- [ ] **Step 8: Commit (no code changes, just marker)**

```bash
git commit --allow-empty -m "test: verify timeline gantt modal functionality"
```

---

### Task 8: Final verification and cleanup

**Files:**
- All modified files

- [ ] **Step 1: Run full TypeScript check**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 2: Run ESLint**

```bash
npm run lint
```

Expected: No errors or warnings in modified files.

- [ ] **Step 3: Verify no console errors**

In browser DevTools console, verify no errors related to timeline or modal.

- [ ] **Step 4: Final commit summary**

All changes should be committed. Verify:

```bash
git log --oneline -8
```

Should show 7 commits related to timeline refactor.

- [ ] **Step 5: Update CLAUDE.md if needed**

Check if `CLAUDE.md` needs updating (new timeline behavior, modal pattern, etc.). Update if required and commit.

---

## Success Criteria

✅ Timeline component replaced with TimelinePanel modal trigger
✅ 8 key fiscal events displayed in Gantt chart
✅ Horizontal bars with correct widths (years since 1914)
✅ Colors match design (green → red gradient)
✅ Glow effects on bars
✅ French and English translations working
✅ Modal opens on panel click (like other dashboard panels)
✅ Modal closes on X button
✅ Responsive design works on mobile
✅ No TypeScript/ESLint errors
✅ All commits follow conventional commit format