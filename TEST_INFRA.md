# Test Infrastructure & E2E Verification Architecture

## 1. Test Philosophy

The testing framework for the **Mobile-First UX Audit & Scrollytelling Optimization** project adheres strictly to an **opaque-box, requirement-driven 4-tier testing methodology**.

- **Opaque-Box Testing**: Tests treat the web application as a complete system executed in real browser runtimes (Chromium/Playwright). Tests inspect observable DOM structure, bounding boxes, scroll metrics, accessibility attributes, and visual stability without relying on private implementation details or mocking runtime internals.
- **Requirement-Driven Verification**: Every test case directly derives from the authoritative requirements specified in `ORIGINAL_REQUEST.md` (R1 to R5) and `PROJECT.md` Feature Inventory (F1 to F15). No test exists without an explicit contractual basis.
- **Progressive Testability & Defect Exposure**: The test suite is designed to serve as an authoritative oracle across project milestones. At baseline (Milestone 0), tests targeting un-implemented mobile optimizations are expected to fail (RED), accurately highlighting diagnosed defects (scroll jumps, layout shift, wide table overflows, sub-44px touch targets). As Milestones 1 through 5 are completed, these tests will progressively transition to GREEN without test code modification.
- **Zero Production Mutation**: The test suite operates strictly in `tests/playwright/` without altering production assets in `files/`.

---

## 2. 4-Tier Testing Methodology Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TIER 4: REAL-WORLD SCENARIOS                        │
│   Full 10-section narrative mobile journey (I-XI) + Desktop 100%      │
│   fidelity regression guards (1366x768, 1920x1080)                    │
├────────────────────────────────────────────────────────────────────────┤
│                TIER 3: CROSS-FEATURE COMBINATIONS                      │
│   Multi-section lens switching, modal dialog scroll isolation,         │
│   dark/light theme switching with text contrast defense               │
├────────────────────────────────────────────────────────────────────────┤
│                 TIER 2: BOUNDARY & CORNER CASES                        │
│   Exact viewports (320px, 375px, 390px, 428px), reload stability,      │
│   direct hash navigation, rapid drum gestures, section containment    │
├────────────────────────────────────────────────────────────────────────┤
│                   TIER 1: FEATURE COVERAGE                             │
│   Entry (0,0), onboarding non-destructive CLS, scrollytelling sync,   │
│   drum wheel, progressive disclosure II & VI, touch targets >= 44px,   │
│   responsive table cards, safe-area tokens, reduced motion             │
└────────────────────────────────────────────────────────────────────────┘
```

- **Tier 1 — Feature Coverage**: Comprehensive contract tests for each distinct feature in the mobile audit inventory. Validates individual UI components, accessibility constraints, responsive adaptations, and motion preferences.
- **Tier 2 — Boundary & Corner Cases**: Rigorous stress-testing across exact hardware mobile viewport widths (320px, 375px, 390px, 428px), browser lifecycle events (page reload, direct anchor navigation), fast user gestures, and strict section-level horizontal overflow prevention (`scrollWidth === clientWidth`).
- **Tier 3 — Cross-Feature Combinations**: Multi-feature state interactions, verifying that interacting with one feature (e.g., opening and closing modal dialogs in Section X, or switching theoretical lenses) does not corrupt global state, reset vertical scroll position, or break accessibility.
- **Tier 4 — Real-World Scenarios**: End-to-end user flows simulating a reader progressing through Berlin's entire essay across all 10 sections, combined with rigorous desktop regression defense at 1366x768 and 1920x1080 to ensure desktop layout remains 100% invariant.

---

## 3. Feature Inventory Mapping

| Feature ID | Feature Name | Mapped Tier & Scenario IDs | Description | Target Milestone |
|---|---|---|---|---|
| **F1** | Manual Scroll Restoration | T1.1, T2.5, T2.6 | Enforce `history.scrollRestoration = 'manual'`, deterministically load entry at (0, 0), and preserve position on reload. | M1 |
| **F2** | Deterministic Hero Initial Render | T1.2 | Eliminate Cumulative Layout Shift (CLS = 0) from deferred 300ms onboarding box. | M1 |
| **F3** | Hero Animation & Cascade Fix | T1.3 | Prevent post-mount translateY shift in Section I; constrain hero visualization canvas within fold on mobile. | M1 |
| **F4** | IntersectionObserver State Accumulator | T1.4, T3.1 | Ensure mobile lens panel remains visible across scrollytelling sections without premature vanishing. | M2 |
| **F5** | Scrollytelling Drum Selector Sync | T1.5, T2.7, T3.1 | Decouple drum scrolling from selection to prevent circular recursion; support debounced rapid gestures. | M2 |
| **F6** | Narrative Pacing & Checkpoints | T1.4, T2.6, T3.1, T4.1 | Synchronize interactive widgets with corresponding narrative text blocks; maintain scroll stability. | M2 |
| **F7** | Progressive Disclosure (Sec II & VI) | T1.6, T1.7 | Provide tabbed faceting / collapsible disclosure in dense Section II (>1200px text wall) and Section VI market cards. | M3 |
| **F8** | Interaction Affordance & Clarification | T1.7, T4.1 | Clarify interactive affordances and ensure readable progression through dense philosophical text. | M3 |
| **F9** | Touch Target Compliance (>= 44x44px) | T1.8 | Ensure all mobile buttons, tabs, sliders, and dismiss targets meet or exceed 44x44px touch bounding box. | M4 |
| **F10** | Section VIII Colombia Matrix Responsive | T1.9 | Convert 697px wide table into responsive stacked cards / active-lens viewport, eliminating 410px hidden overflow. | M4 |
| **F11** | Zero Horizontal Overflow Defense | T2.1, T2.2, T2.3, T2.4, T2.8 | Guarantee `scrollWidth === clientWidth` on document and across all sections at 320px, 375px, 390px, 428px. | M4 |
| **F12** | Mobile Design Tokens & Safe Areas | T1.10, T1.11, T3.3 | Enforce safe area insets (`env(safe-area-inset-top)`), AA contrast, and reduced-motion rules. | M4 |
| **F13** | Desktop Regression Protection Guardrails | T3.2, T4.2, T4.3 | Guarantee 100% bit-for-bit fidelity of desktop layout, sidebar width (220px), and table grids at 1366px and 1920px. | M5 |
| **F14** | Comprehensive 4-Tier E2E Mobile Suite | T1.1 – T4.3 (All) | Playwright E2E test suite covering Tiers 1-4, multi-viewport defense, and readiness reporting. | M0 |
| **F15** | Final Verification & Audit Deliverables | Final Matrix Execution | Full verification across test suites and generation of final structured audit evidence table. | M5 |

---

## 4. Test Architecture & Runner Invocation

### 4.1 Technology Stack
- **Test Runner**: Playwright (`@playwright/test` v1.64+)
- **Execution Mode**: Headless Chromium
- **Target URL**: Zero-build local static entrypoint (`file:///.../files/index.html`)
- **Assertions**: Playwright `expect` with strict web-first locators and DOM property evaluators

### 4.2 Runner Commands

```bash
# Execute the complete Mobile Audit E2E Suite (all projects)
npx playwright test tests/playwright/mobile-audit.spec.js

# Execute Mobile Audit suite targeting mobile viewport specifically
npx playwright test tests/playwright/mobile-audit.spec.js --project="Mobile (375x667)"

# Execute Desktop Regression tests specifically
npx playwright test tests/playwright/mobile-audit.spec.js --project="Desktop Full HD (1920x1080)"

# Run all Playwright specs (including existing genealogia.spec.js defense)
npm run test:playwright

# Run full project verification suite (Jest + Playwright + Vibium)
npm run test:all
```

---

## 5. Scenario Descriptions & Coverage Counts

### Tier 1: Feature Coverage (11 Scenarios)
1. **T1.1 Entry State Determinism (F1)**: Direct navigation loads deterministically at top `(0, 0)` with `history.scrollRestoration = 'manual'`. Section I hero header `#problema-title` is fully in view without downward displacement.
2. **T1.2 Onboarding Non-Destructive Layout (CLS = 0) (F2)**: `#heroOnboarding` (triggered after 300ms) does not displace hero title `#problema-title` (`delta Y < 2px`). Dismiss button dismisses cleanly.
3. **T1.3 Hero Animation & Cascade Stability (F3)**: Section I Hero is immune to post-mount translateY jumps; `#divergenceCanvas` / `.hero-viz` height is constrained within fold on mobile.
4. **T1.4 Scrollytelling Lens Panel Sync (F4)**: Mobile `#lensPanel` activates when intersecting scrollytelling sections and maintains visibility throughout narrative reading without premature vanishing.
5. **T1.5 Scrollytelling Drum Wheel Selection (F5)**: Selecting a lens in `.lens-wheel` updates `state.currentLens`, centers the item in track, and avoids circular re-invocation loops.
6. **T1.6 Progressive Disclosure in Section II (F7)**: Section II comparison mode provides tabbed faceting or collapsible details on mobile, preventing un-faceted >1200px text walls.
7. **T1.7 Progressive Disclosure in Section VI (F7, F8)**: Market debate cards in Section VI provide structured mobile faceting or collapsible accordions.
8. **T1.8 Touch Target Compliance >= 44x44px (F9)**: All mobile interactive controls (`#colombiaCoachBannerClose`, `.market-btn`, `.system-btn`, `#heroOnboardingDismiss`, `.top-nav__link`, `#conflictSlider`, `.berlin-toggle-btn`) meet or exceed 44x44px.
9. **T1.9 Section VIII Colombia Table Responsive Layout (F10)**: `#colombiaTable` is rendered as responsive stacked cards or active-lens cards on mobile, with width bounded by viewport.
10. **T1.10 Mobile Safe Area Insets (F12)**: Navigation headers and fixed panels incorporate `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`.
11. **T1.11 Reduced Motion Compliance (F5, F12)**: Under `prefers-reduced-motion: reduce`, smooth scrolling is disabled and animations are instant.

### Tier 2: Boundary & Corner Cases (8 Scenarios)
12. **T2.1 Viewport Boundary 320px (F11)**: Strict zero horizontal overflow (`scrollWidth === clientWidth`) across all sections on iPhone SE 1st gen.
13. **T2.2 Viewport Boundary 375px (F11)**: Strict zero horizontal overflow on standard iPhone SE 2nd/3rd gen.
14. **T2.3 Viewport Boundary 390px (F11)**: Strict zero horizontal overflow on iPhone 12/13/14 modern portrait.
15. **T2.4 Viewport Boundary 428px (F11)**: Strict zero horizontal overflow on large mobile portrait (iPhone 14 Plus / Pro Max).
16. **T2.5 Reload Scroll Offset Stability (F1)**: Page reload with manual restoration lands deterministically at top without erratic layout shift.
17. **T2.6 Direct Hash Navigation Framing (F1, F6)**: Direct anchor navigation (e.g. `#colombia`) lands cleanly below fixed `.top-nav` without title occlusion.
18. **T2.7 Rapid Drum Gestures & Race Condition Defense (F5)**: Rapid sequential lens switches settle deterministically on the final target lens without callback deadlock.
19. **T2.8 Section Containment Integrity (F11)**: Every section element (#problema to #cierre) strictly satisfies `section.scrollWidth <= section.clientWidth + 1`.

### Tier 3: Cross-Feature Combinations (3 Scenarios)
20. **T3.1 Lens Switching Across Scrollytelling Sections (F4, F5, F6)**: Switching theoretical lenses while scrolled into scrollytelling sections dynamically updates interpretation texts without resetting or jumping vertical scroll position.
21. **T3.2 Modal Dialog Scroll & State Isolation (F6, F13)**: Opening and closing Section X modal dialog preserves exact background scroll position and active lens selection.
22. **T3.3 Theme & Contrast Switching Defense (F12)**: Dark/light mode switching preserves readable WCAG text contrast across headings and text blocks.

### Tier 4: Real-World Scenarios (3 Scenarios)
23. **T4.1 Mobile End-to-End User Journey (F6, F8)**: Complete reader journey through all 10 sections of Berlin's essay from Section I (Problema) to Section XI (Cierre), exercising interactive controls with zero uncaught JavaScript errors.
24. **T4.2 Desktop Regression Defense at 1366x768 (F13)**: Standard laptop layout verifies 100% desktop fidelity, side-by-side hero layout, desktop lens panel width (220px), and full tabular `#colombiaTable`.
25. **T4.3 Desktop Regression Defense at 1920x1080 (F13)**: Full HD layout verifies container bounds `.section__inner`, multi-column layouts, and complete desktop style preservation.

---

## 6. Total Coverage Summary
- **Tier 1 Scenarios**: 11
- **Tier 2 Scenarios**: 8
- **Tier 3 Scenarios**: 3
- **Tier 4 Scenarios**: 3
- **Total Unique Scenarios**: **25**
- **Test File Path**: `tests/playwright/mobile-audit.spec.js`
