---
name: Interactive Dashboard Features (Calculators & Games)
description: MVP design for adding 3 interactive calculators and games to the dashboard to increase engagement and virality
type: spec
date: 2026-03-25
---

# Interactive Dashboard Features — Design Spec

## Overview

This spec outlines the design for adding **3 interactive, ludic, and shareable components** to the impots.tax dashboard to increase engagement and viral potential. The dashboard will be reorganized into a **4-act narrative structure**, with each act ending or including an interactive element.

**Goals:**
- Increase user engagement (interactive calculators + games)
- Increase virality (shareable results, mini-leaderboards, OG images)
- MVP scope: build, test, iterate quickly (~3-4 weeks)
- Maintain the satirical "command center" aesthetic

---

## 1. Architecture: 4-Act Narrative Structure

The dashboard is reorganized into a linear narrative flow:

### Act 1: "Le Choc" (The Shock)
**Existing panels + New interactive:**
- Hero: "Journey of 100€" (existing)
- **NEW:** "Calcule ta Charge Fiscale Totale" (interactive calculator)

**Purpose:** Hook the user immediately with a personalized shock: "Here's how much of your salary actually disappears."

---

### Act 2: "Les Détails" (The Details)
**Existing panels:**
- Tax Brackets (Impôt sur le revenu)
- Corporate Tax (Impôt sur les sociétés)
- Flat Tax / PFU
- TVA
- Fuel Tax
- Behavioral Tax

**NEW Interactive (in middle):**
- **"Guess the Tax"** (quiz game)

**Purpose:** Educate through gameplay. Break up the panel-heavy section with a ludic pause.

---

### Act 3: "Le Dilemme" (The Dilemma)
**Existing panels:**
- Salary Contributions (Cotisations & URSSAF)
- Welfare System (Système social)

**NEW Interactive:**
- **"Impact d'une Augmentation"** (interactive calculator)

**Purpose:** Drive home the absurdity: "Why doesn't my raise actually raise my standard of living?"

---

### Act 4: "Le Contexte" (The Context)
**Existing panels:**
- OECD Comparison
- Macro Indicators
- Timeline
- Ticker

**Purpose:** Zoom out to global/macro perspective. France's place in the world's tax systems.

---

## Visual Separation

Each act is separated by a **visual divider** (thin tricolore stripe + spacing) to signal narrative progression.

---

## 2. The 3 Interactive Components

### 2.1 "Calcule ta Charge Fiscale Totale" (Calculate Total Tax Burden)

**Location:** Act 1, immediately after Journey of 100€

**What it does:**
User enters salary + family situation. Component shows, in real-time, the full breakdown of taxes and the net/purchasing power remaining.

**Inputs:**
- **Slider:** Salaire brut (range: 1 500€ → 10 000€, step: 50€)
- **Dropdown:** Situation familiale
  - Célibataire (0 parts)
  - Marié·e (1.5 parts)
  - + 1 enfant (2 parts)
  - + 2 enfants (2.5 parts)
  - + 3+ enfants (progressive)

*Rationale: Simplified family situation. Real IR calculation uses quotient familial; we abstract to common cases.*

**Output (animated, real-time):**
```
SALAIRE BRUT: 2 500€

Déductions:
  Cotisations sociales:      -234€ (9.36%)
  CSG/CRDS:                   -102€ (4.08%)
  Impôt sur le revenu:        -185€ (7.4%)
  ─────────────────────────────
  SALAIRE NET:               1 979€ (79.16%)

Si tu dépenses tout ton net:
  TVA moyenne (16.7%):        -330€
  ─────────────────────────────
  VRAI POUVOIR D'ACHAT:      1 649€ (65.96%)
```

**Shareability:**
- Button: "Partager ma charge fiscale" → opens share menu
- Pre-written share options:
  - Copy to clipboard (with line breaks for readability)
  - Generate OG image (dynamic, shareable on social)
  - Pre-filled tweet: `"J'ai un salaire brut de 2500€, mais je ne garde que 1649€ de pouvoir d'achat réel. #ImpostTax"`

**Data Sources:**
- IR brackets: `lib/tax-data.ts` (2026 barème)
- Social contributions: `lib/tax-data.ts` (URSSAF 2025)
- VAT average: ~16.7% (simplified; actual depends on spending)
- Inflation: `lib/tax-data.ts` (optional, for purchasing power)

**Tech Implementation:**
- React component, `'use client'` (client-side calculations)
- State: `salaryBrut`, `familySituation`
- Calculations: pure JS (no API)
- Animations: CSS transitions on slider input
- Share: Canvas or html2canvas for OG image generation

**Translations:**
- All labels, explanations, share messages in `messages/fr.json` and `messages/en.json`
- Namespace: `interactiveCalculators`

---

### 2.2 "Guess the Tax" (Quiz Game)

**Location:** Act 2, mid-section (after Tax Brackets, before or integrated with TVA panel)

**What it does:**
User answers 5-10 rapid-fire questions about French taxes. Earn points, see score, optionally compete on a mini-leaderboard.

**Format:**
Multiple choice questions (4 options per question). Questions randomized from a pool of ~20-30.

**Example Questions:**
1. "Une baguette coûte 1€ HT. Quel est le montant de TVA?" → Options: 0,16€ / 0,20€ / 0,30€ / 0,50€ → **Correct: 0,20€ (20%)**
2. "Cotisations sociales sur un salaire de 3 000€ bruts?" → ~280€ / ~400€ / ~600€ / ~800€ → **~280€ (9.3%)**
3. "Taux PFU en 2026 sur les plus-values crypto?" → 30% / **31.4%** / 36% / 45%
4. "Montant moyen du RSA mensuel (célibataire)?" → **~647€** / 800€ / 1 000€ / 1 500€
5. ... and more

**Game Mechanics:**
- **Scoring:** +10 pts per correct answer, -2 per incorrect (or 0 points if wrong, depends on UX preference)
- **Timer (optional):** 10 seconds per question. Creates urgency, increases replayability.
- **Feedback:** Immediate ✅ / ❌ with brief explanation
  - "Correct! La TVA sur la plupart des biens est 20%."
  - "Raté! La CDHR a un taux minimum de 20%, mais ce n'est pas le PFU."
- **Final Score:** Display prominently, encourages screenshot + share

**Leaderboard (lightweight):**
- Top 3 scores of the day, stored in localStorage
- Name entry (optional): user can enter their name or be "Anonymous"
- Reset daily at midnight (or weekly, TBD)

**Shareability:**
- "Share Score" button generates:
  - Text: `"J'ai obtenu 95/100 au Fiscal Quiz 🎯 Can you beat my score? [link]"`
  - Link encodes: score in URL param or hash (e.g., `/dashboard?quiz-score=95`)
  - Friend clicks link → sees the score + can attempt the quiz

**Data:**
- Questions stored in `lib/tax-data.ts` under `GUESS_THE_TAX_QUESTIONS`
- Each question: `{ id, question, options[], correctIndex, explanation }`
- Translations: question text + explanations in `messages/fr.json` / `messages/en.json`

**Tech Implementation:**
- React component, `'use client'`
- State: `currentQuestion`, `score`, `answered`, `timerSeconds`
- useEffect for timer
- localStorage for leaderboard
- Optional: Web Audio API for ding/buzzer sound on answer

---

### 2.3 "Impact d'une Augmentation" (Impact of a Raise)

**Location:** Act 3, after Salary Contributions / Welfare System panels

**What it does:**
User enters a raise amount. Component shows, animatedly, what that raise *actually* becomes after taxes, and how inflation erodes it.

**Inputs:**
- **Slider:** Montant d'augmentation (range: 100€ → 5 000€, step: 50€)
- **Context (optional):** Base salary (if not derived from previous calculator)

**Output (highly visual and animated):**
```
AUGMENTATION BRUTE: +1 000€

Ça se transforme en...
  Cotisations sociales supplémentaires:  -93€ (9.3%)
  Impôt IR supplémentaire:              -120€ (12%)
  ─────────────────────────────────────────────
  GAIN NET:                             +787€ (78.7%)

Mais attendez... il y a l'inflation 🔥
  Inflation annuelle (2.1%):              -33€
  ─────────────────────────────────────────────
  POUVOIR D'ACHAT RÉEL:                 +650€ (65%)

En 2 ans, l'inflation aura rongé ce gain.
Dans 4 ans? Zéro. C'est juste un mirage.
```

**Visual Element (CRITICAL):**
- **Decomposition Bar:** Animated horizontal bar showing the original raise (100%) shrinking as each deduction is applied.
- Example: Bar starts at full width (1 000€), then:
  - First segment "Cotisations" pulls out: bar shrinks to 906€
  - Second segment "IR" pulls out: bar shrinks to 787€
  - Final segment "Inflation" pulls out: bar shrinks to 650€
- Animation timing: staggered, smooth, ~2 seconds total (reveals the tragic reality)
- Color coding: green (original) → yellow (deductions) → red (final)

**Shareability:**
- Button: "Partager l'arnaque" (Share the scam)
- OG Image: Shows the before/after with bold numbers
- Tweet: `"Mon augmentation de +1 000€ devient +650€ de pouvoir d'achat réel. On se fout de nous. #ImpostTax"`

**Data:**
- IR brackets: `lib/tax-data.ts`
- Social contributions: `lib/tax-data.ts`
- Inflation rate: `lib/tax-data.ts` (INFLATION_RATE_2026)

**Tech Implementation:**
- React component, `'use client'`
- State: `augmentationAmount`
- Animations: CSS @keyframes or Framer Motion (if lightweight) for bar decomposition
- Canvas or SVG for the visual bar breakdown
- Share: OG image generation (Canvas → PNG)

---

## 3. Data Flow & Reusability

**Centralized Data:**
All fiscal numbers come from `lib/tax-data.ts`. This is the single source of truth.

**What we add to `tax-data.ts`:**
```typescript
// New: Questions for Guess the Tax
export const GUESS_THE_TAX_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Une baguette coûte 1€ HT. Quel est le montant de TVA?",
    options: ["0,16€", "0,20€", "0,30€", "0,50€"],
    correctIndex: 1,
    explanation: "La TVA sur la majorité des biens est 20%.",
  },
  // ... 20-30 more questions
];

// Inflation rate (if not already present)
export const INFLATION_RATE_2026 = 2.1; // %

// (IR brackets, social contributions, VAT rates already exist)
```

**Reusable Components:**
- `<TaxCalculator base={...}>` — Generic calculator (inputs, outputs, formatting)
- `<Quiz questions={...}>` — Generic quiz wrapper
- `<DecompositionBar values={...} labels={...}>` — Animated decomposition bar
- `<ShareButton data={...}>` — Generic share button with OG image generation
- `<QuizQuestion question={...} onAnswer={...}>` — Single quiz card

**Internationalization:**
- Keys added to `messages/fr.json` and `messages/en.json`
- Namespace: `interactiveCalculators`, `interactiveGames`
- All user-facing text (sliders, button labels, feedback, explanations) is translated

---

## 4. UX & Design Considerations

### Visual Design
- **Integration:** Each component fits the dark "command center" aesthetic
  - Dark background, monospace data numbers, accent colors (cyan, red, amber, green)
  - Borders slightly thicker or more prominent (indicates interactivity)
  - Hover state: subtle glow or border color shift
  - Active state: cursor changes to pointer

- **Micro-interactions:**
  - Slider: smooth drag, number updates in real-time
  - Quiz: button press → instant feedback color (green ✅ / red ❌)
  - Decomposition bar: animates on load or slider change
  - Animations are GPU-accelerated (transform, opacity only)

### Mobile Responsiveness
- **Sliders:** Touch-friendly (large targets, good spacing)
- **Quiz:** Full-width cards, large buttons, readable question text
- **Decomposition bar:** Responsive width, scales with viewport
- **Share button:** Mobile-optimized (tap, copy to clipboard for mobile web)

### Accessibility
- **WCAG AA compliance** (dark mode + accent colors tested for contrast)
- **Keyboard navigation:** All interactive elements accessible via Tab
- **ARIA labels:**
  - Sliders: `aria-label="Salaire brut (euros)"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
  - Quiz: form fieldsets with legends
  - Buttons: descriptive labels (not just "Go" or "Click")
- **Screen readers:** Explanatory text + results read clearly

### Performance
- **Client-side only:** No API calls, pure JS calculations
- **Fast renders:** Calculations are synchronous and instant
- **Lazy loading (optional):** OG images generated on-demand (not pre-rendered)
- **Animations:** 60fps, GPU-accelerated

---

## 5. Technical Implementation

### Tech Stack
- **React 19** with hooks (`useState`, `useEffect`)
- **Next.js 16** App Router (server/client components)
- **Tailwind CSS 4** for styling
- **TypeScript** (strict mode)
- **next-intl 4.x** for i18n

### New File Structure
```
components/
  dashboard/
    interactive-charge-fiscale.tsx       # Act 1
    interactive-guess-the-tax.tsx        # Act 2
    interactive-augmentation-impact.tsx  # Act 3
    shared/
      tax-calculator-base.tsx            # Reusable
      decomposition-bar.tsx              # Act 3 animation
      share-button.tsx                   # All components
      quiz-question-card.tsx             # Act 2

lib/
  tax-data.ts                            # Add GUESS_THE_TAX_QUESTIONS, INFLATION_RATE
```

### Key Features per Component

**"Calcule ta Charge Fiscale Totale":**
- Calculations: IR brackets (quotient familial), social contributions, VAT average
- State: `salaryBrut`, `familySituation`
- Share: html2canvas or Canvas API for OG image

**"Guess the Tax":**
- Randomize questions: shuffle pool, pick 5-10
- Timer: setInterval for countdown
- Leaderboard: localStorage with daily reset logic
- Accessibility: form structure for questions

**"Impact d'une Augmentation":**
- Calculations: apply IR brackets + social contributions to raise, then subtract inflation
- Animations: staggered reveal of decomposition bar (CSS @keyframes or JS timeline)
- Visual: SVG or Canvas bar (responsive scaling)

### Internationalization
Add to `messages/fr.json` and `messages/en.json`:
- Calculator labels ("Salaire brut", "Situation familiale")
- Quiz questions (all 20-30 + explanations)
- Button labels ("Partager", "Vérifier réponse", "Recommencer")
- Share messages (pre-filled tweets, explanations)

### Testing Strategy
- **Unit tests:**
  - Tax calculations (IR brackets, social contributions, VAT, inflation)
  - Quiz scoring logic
  - Decomposition bar calculations
- **Component tests:**
  - Slider interactions (input → output update)
  - Quiz flow (answer → feedback → next question)
  - Share button (OG image generation)
- **E2E tests (optional for MVP):**
  - Full user flow: interact with calculator → share result
  - Quiz: complete game → see score → share leaderboard

### Deployment & Infrastructure
- **No infrastructure changes:** All components are client-side
- **No backend:** Leaderboard is localStorage (single-user, not global)
- **Image generation:** Client-side (Canvas) or (optional V2) server-side API `/api/share-image`
- **Deploy:** Standard Next.js build, no additional services needed

---

## 6. Timeline & MVP Scope

**Estimated effort:** 3-4 weeks (2-3 weeks with focused development, 1 week for polish + testing)

**Parallel tracks (can be done simultaneously):**
1. **Calculator (Act 1):** ~1 week (inputs + calculations + share)
2. **Quiz (Act 2):** ~1 week (question pool + quiz flow + leaderboard)
3. **Raise Impact (Act 3):** ~1.5 weeks (calculations + decomposition bar animation + share)
4. **Shared components:** ~1 week (tax-calculator-base, share-button, etc.)
5. **Translations:** ~1 week (all i18n keys)
6. **Integration & testing:** ~1 week (ensuring everything fits the dashboard flow)

**MVP ship date:** Ready by end of April 2026 (assuming start mid-late March)

---

## 7. Success Criteria

**Engagement:**
- Average session duration increases by 30%+ (from current baseline)
- Users interact with at least 2 of the 3 components per session

**Virality:**
- "Share" button click rate: ≥20% of users who view a component
- Referral traffic from shared links: ≥10% of total traffic

**Data integrity:**
- All calculations verified against official sources (Loi de finances 2026, URSSAF 2025, INSEE inflation)
- No user reports of incorrect numbers (or quick fixes if found)

**User feedback:**
- Positive sentiment on social shares ("This is so cool!" / "I didn't realize...")
- Feature requests for deeper features (V2: global leaderboards, account login, more games)

---

## 8. Future Enhancements (V2+)

- **Persistent leaderboards** (database instead of localStorage)
- **User accounts** (login → track personal history of calculations)
- **More quiz questions** (100+, categorized by difficulty)
- **Advanced simulators** (scenario-based: "What if I started a business?")
- **Social integration** (Discord/Slack embeds for shared results)
- **Accessibility:** Sonification (audio cues for quiz feedback)

---

## Approval & Next Steps

**Design approved:** ✅ (to be confirmed by user)

**Next:** Invoke `writing-plans` skill to generate detailed implementation plan with task breakdown, dependencies, and testing strategy.
