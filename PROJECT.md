# Project: Mobile-First UX Audit & Scrollytelling Optimization ("Dos conceptos de libertad")

## Architecture
- **Application Type**: Pure Zero-Build Client Static Single-Page Application (SPA).
- **Core Production Files**: Located in `files/`
  - `files/index.html`: Semantic markup, section structures (I to X), onboarding dialogs, interactive controls.
  - `files/styles.css`: Desktop-first design tokens, layout cascade, media queries (`max-width: 1400px`, `860px`, `768px`, `500px`, `480px`).
  - `files/app.js`: State management (`state.currentLens`), UI rendering, IntersectionObserver scrollytelling, drum wheel picker, event listeners.
  - `files/i18n.js`: Internationalization strings (ES/EN) and bilingual text content.
- **Testing Architecture**:
  - Unit & Property Testing: Jest + Axe-core + Fast-Check (`tests/*.test.js`, 16 suites / 125 tests).
  - Cross-Viewport E2E Testing: Playwright (`tests/playwright/*.spec.js`, `playwright.config.js`).
  - Visual Defense: Vibium (`tests/vibium/layout-defense.js`).
  - Mobile Viewport Scripts: `tests/multi-viewport-mobile-defense.js`, `tests/font-scale-evaluator.js`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Manual Scroll Restoration | Set `history.scrollRestoration = 'manual'` and ensure entry loads at `(0, 0)` without scroll jumps on reload or history traversal. | M1 | Survey 1 (R1) |
| F2 | Deterministic Hero Initial Render | Eliminate layout shift (CLS) from deferred 300ms `#heroOnboarding` injection by maintaining layout stability or modal/sheet presentation. | M1 | Survey 1 (R1) |
| F3 | Hero Animation & Cascade Fix | Prevent post-mount `initFadeIn()` transform shifts on Section I Hero; fix CSS cascade override on `.hero-viz` so hero height does not inflate past fold on mobile. | M1 | Survey 1 (R1) |
| F4 | IntersectionObserver State Accumulator | Replace faulty `entries.some()` batch check in `initScrollAwareLensPanel` with an active intersection `Set` so mobile lens panel does not vanish unexpectedly. | M2 | Survey 1 (R2) |
| F5 | Scrollytelling Drum Selector Debouncing & Sync | Decouple programmatic drum scrolling from scroll listener in `updateDrumSelector` to prevent circular re-invocation of `setLens()`; add reduced-motion support. | M2 | Survey 1 (R2) |
| F6 | Narrative Pacing & Checkpoints | Synchronize interactive widgets with corresponding narrative text blocks; establish clear pause checkpoints without competing gestures. | M2 | Survey 1 (R2) |
| F7 | Progressive Disclosure in Dense Sections | Implement mobile-first progressive disclosure / tabbed faceting for Section II comparison mode (>1200px text wall) and Section VI market debate cards. | M3 | Survey 2 (R3) |
| F8 | Interaction Affordance & Cognitive Clarification | Clarify user affordance cues (what the user can do and what insight they gain); streamline dense philosophical argumentation without semantic loss. | M3 | Survey 2 (R3) |
| F9 | Touch Target Compliance (>= 44x44px) | Upgrade sub-44px controls (`#colombiaCoachBannerClose`, `.market-btn`, `.system-btn`, `#heroOnboardingDismiss`, `.top-nav__link`, `#conflictSlider`) in mobile queries. | M4 | Survey 2 (R4) |
| F10 | Section VIII Colombia Matrix Responsive Layout | Transform 697px wide `#colombiaTable` into responsive stacked mobile cards / active-lens viewport to eliminate 410px hidden overflow and 2D lateral panning. | M4 | Survey 2 (R4) |
| F11 | Zero Horizontal Overflow Defense | Guarantee `scrollWidth === clientWidth` on all sections across 320px, 375px, 390px, and 428px viewport widths. | M4 | Survey 2 (R4) |
| F12 | Mobile Design Tokens & Safe Area Insets | Add mobile CSS tokens with safe area support (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`), scalable typography, and AA compliant color tokens. | M4 | Survey 2 (R4) |
| F13 | Desktop Regression Protection Guardrails | Enforce strict isolation: 100% bit-for-bit invariance of base CSS selectors and desktop viewports (1366x768, 1920x1080); mobile changes scoped to `@media`. | M5 | Survey 3 (R5) |
| F14 | Comprehensive 4-Tier E2E Mobile Test Suite | Build requirement-driven opaque-box E2E test suite covering Tiers 1-4 across 320px, 375px, 390px, 428px and desktop viewports, publishing `TEST_READY.md`. | M0 | Survey 3 (E2E Track) |
| F15 | Final Verification & Audit Deliverable Table | Execute full test matrix (`npm test`, `npm run test:playwright`, `npm run test:vibium`), verify desktop 100% fidelity, and deliver formatted markdown audit table. | M5 | Original Request |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M0 | E2E Testing Track | Design test runner & 4-tier E2E tests in Playwright (Tiers 1-4, multi-viewport 320/375/390/428px + desktop), publish `TEST_READY.md`. | None | DONE |
| M1 | Initial Viewport & Entry State Integrity (R1) | Fix entry scroll jump, manual restoration, hero layout shift (CLS), onboarding placement, and hero visualization cascade override. | None | DONE |
| M2 | Scrollytelling & Narrative Continuity (R2) | Fix `IntersectionObserver` active set logic, drum selector recursion, narrative synchronization, and reduced-motion scrolling. | M1 | DONE |
| M3 | Cognitive & Semantic UX Clarification (R3) | Progressive disclosure in Section II and Section VI, interaction affordance cues, documented semantic adjustments. | M2 | DONE |
| M4 | Responsive Design System & Mobile Tokens (R4) | Minimum 44x44px touch targets, Section VIII responsive stacked matrix, zero horizontal overflow across 320-428px, safe area insets. | M3 | DONE |
| M5 | Final Milestone: 100% E2E Pass & Desktop Verification (R5) | Pass 100% of E2E tests (Phase 1), perform Tier 5 adversarial testing (Phase 2), verify bit-for-bit desktop fidelity, and compile final audit report table. | M0, M4 | DONE |

## Interface Contracts
### CSS Cascading Isolation Contract (Desktop Protection)
- All new mobile rules and overrides MUST be enclosed within `@media (max-width: 500px)` or `@media (max-width: 768px)` blocks at the end of `files/styles.css`.
- NO base selector rules outside media queries may be altered.
- Base variables like `--lens-panel-width: 220px;` and desktop container bounds `.section__inner` (min(900px, calc(100vw - 220px - 2.5rem))) MUST remain bit-for-bit intact on screens > 768px.

### JavaScript Runtime Mobile Scoping Contract
- Mobile-specific runtime behaviors (e.g., bottom sheet lens wheel adjustments, mobile accordion toggles) MUST be guarded with `window.matchMedia('(max-width: 500px)').matches` or `window.matchMedia('(max-width: 768px)').matches`.
- Desktop event listeners, keyboard navigation (`ArrowUp`/`ArrowDown`), and desktop lens panel interactions must function identically.

### Scroll Restoration & Layout Shift Contract
- `history.scrollRestoration = 'manual'` configured immediately upon script execution.
- If no anchor hash is present, `window.scrollTo(0, 0)` executes deterministically on direct entry and reload.
- Onboarding elements must not cause Cumulative Layout Shift (CLS = 0) of the hero header or introductory text.

## Code Layout
- `files/index.html`: Web application DOM structure.
- `files/styles.css`: Complete styling rules (desktop-first base, mobile media queries).
- `files/app.js`: Application logic and interaction handling.
- `files/i18n.js`: Bilingual dictionary and translation engine.
- `tests/playwright/`: Playwright test specifications and end-to-end verification suites.
- `tests/`: Jest unit tests, property tests, and accessibility tests.
- `tests/vibium/`: Vibium visual regression defense layer.
