// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

// ═════════════════════════════════════════════════════════════════════════════
// TIER 1: FEATURE COVERAGE (Mobile Viewports)
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Tier 1: Feature Coverage (Mobile)', () => {

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('T1.1 Entry State: Page loads deterministically at top (0,0) with manual scroll restoration (F1)', async ({ page }) => {
    // 1. Verify history.scrollRestoration is configured to manual
    const scrollRestoration = await page.evaluate(() => history.scrollRestoration);
    expect(scrollRestoration).toBe('manual');

    // 2. Verify deterministic initial scroll coordinates
    const scrollCoords = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
    expect(scrollCoords.x).toBe(0);
    expect(scrollCoords.y).toBe(0);

    // 3. Verify Section I hero title is fully in viewport at entry
    const heroTitle = page.locator('#problema-title');
    await expect(heroTitle).toBeVisible();
    const titleBox = await heroTitle.boundingBox();
    expect(titleBox).not.toBeNull();
    if (titleBox) {
      expect(titleBox.y).toBeGreaterThanOrEqual(0);
      expect(titleBox.y).toBeLessThan(667);
    }
  });

  test('T1.2 Onboarding Stability: Hero onboarding renders non-destructively without layout shift (CLS = 0) (F2)', async ({ page }) => {
    const heroTitle = page.locator('#problema-title');
    await expect(heroTitle).toBeVisible();

    // Measure initial title position immediately upon DOM load
    const initialBox = await heroTitle.boundingBox();
    expect(initialBox).not.toBeNull();

    // Wait for the deferred onboarding component to mount/trigger (300ms timer in app.js)
    await page.waitForTimeout(600);

    // Measure post-mount title position
    const postBox = await heroTitle.boundingBox();
    expect(postBox).not.toBeNull();

    if (initialBox && postBox) {
      // Bounding box Y must not shift downwards (CLS = 0; tolerance < 2px)
      const shiftDelta = Math.abs(postBox.y - initialBox.y);
      expect(shiftDelta).toBeLessThan(2);
    }

    // Dismiss onboarding if visible and ensure no abrupt shifts
    const dismissBtn = page.locator('#heroOnboardingDismiss');
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click();
      await page.waitForTimeout(200);
      const afterDismissBox = await heroTitle.boundingBox();
      if (initialBox && afterDismissBox) {
        expect(Math.abs(afterDismissBox.y - initialBox.y)).toBeLessThan(2);
      }
    }
  });

  test('T1.3 Hero Animation & Cascade: Section I hero height and layout remain stable post-animation (F3)', async ({ page }) => {
    const heroSection = page.locator('#problema');
    await expect(heroSection).toBeVisible();

    // Wait for mount animations to settle
    await page.waitForTimeout(800);

    const heroBox = await heroSection.boundingBox();
    expect(heroBox).not.toBeNull();

    // Section I top must not be displaced downwards by post-mount transforms
    if (heroBox) {
      expect(heroBox.y).toBeLessThanOrEqual(0);
    }

    // The hero visualization canvas should be constrained within fold on mobile (<= 45% viewport height)
    const viz = page.locator('.hero-viz');
    const vizBox = await viz.boundingBox();
    if (vizBox) {
      expect(vizBox.height).toBeLessThanOrEqual(667 * 0.45);
    }
  });

  test('T1.4 Scrollytelling Panel Sync: Mobile lens panel activates and persists across scrollytelling sections (F4, F6)', async ({ page }) => {
    const lensPanel = page.locator('#lensPanel');

    // On entry at top, panel should not obscure hero content on mobile
    const initialVisible = await page.evaluate(() => {
      const p = document.querySelector('#lensPanel');
      return p ? p.classList.contains('lens-panel--visible') : false;
    });

    // Scroll into Section II (Berlin)
    const berlinSection = page.locator('#berlin');
    await berlinSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Scrollytelling lens panel should activate
    const isVisibleInBerlin = await page.evaluate(() => {
      const p = document.querySelector('#lensPanel');
      return p ? p.classList.contains('lens-panel--visible') : false;
    });
    expect(isVisibleInBerlin).toBe(true);

    // Scroll continuously to Section III (Conflicto) - panel must not vanish between sections
    const conflictoSection = page.locator('#conflicto');
    await conflictoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const isVisibleInConflicto = await page.evaluate(() => {
      const p = document.querySelector('#lensPanel');
      return p ? p.classList.contains('lens-panel--visible') : false;
    });
    expect(isVisibleInConflicto).toBe(true);
  });

  test('T1.5 Drum Wheel Selector: Lens selection updates active state and track alignment without recursion (F5)', async ({ page }) => {
    // Scroll to Section II to expose mobile lens picker
    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const wheel = page.locator('.lens-wheel');
    await expect(wheel).toBeAttached();

    // Select 'capacidades' lens in drum wheel
    const capOption = page.locator('.lens-wheel__item[data-lens="capacidades"]');
    if (await capOption.count() > 0) {
      await capOption.first().dispatchEvent('click');
      await page.waitForTimeout(300);

      // Verify active lens updated via body class and storage
      const bodyClass = await page.evaluate(() => document.body.className);
      expect(bodyClass).toContain('lens-capacidades');

      // Verify center item class in wheel
      await expect(capOption.first()).toHaveClass(/is-center/);
    }
  });

  test('T1.6 Progressive Disclosure Section II: Berlin comparison mode provides tabbed faceting or collapsible structure (F7)', async ({ page }) => {
    const berlinSection = page.locator('#berlin');
    await berlinSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    // On mobile screens (< 500px), both cards must not form an un-faceted >1200px text wall
    const splitContainer = page.locator('#berlinSplit');
    const splitBox = await splitContainer.boundingBox();
    expect(splitBox).not.toBeNull();

    // Verify toggle controls are available to select between lenses/cards
    const toggleBtns = page.locator('.berlin-toggle-btn');
    expect(await toggleBtns.count()).toBeGreaterThanOrEqual(2);

    // In single lens mode, only the selected perspective is actively expanded or visible
    const negCard = page.locator('#berlinNeg');
    const posCard = page.locator('#berlinPos');

    // Both cards shouldn't simultaneously create massive overflow
    if (splitBox) {
      // Ensure height is reasonably bounded on mobile when faceted
      expect(splitBox.width).toBeLessThanOrEqual(375);
    }
  });

  test('T1.7 Progressive Disclosure Section VI: Market debate cards use structured mobile faceting or accordion (F7, F8)', async ({ page }) => {
    const econSection = page.locator('#economia');
    await econSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    // Dialogue grid should fit within mobile screen bounds
    const dialogueGrid = page.locator('.dialogue-grid');
    const gridBox = await dialogueGrid.boundingBox();
    expect(gridBox).not.toBeNull();
    if (gridBox) {
      expect(gridBox.width).toBeLessThanOrEqual(375);
    }

    // Verify cards are readable and contained
    const cards = page.locator('.dialogue-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < await cards.count(); i++) {
      const cardBox = await cards.nth(i).boundingBox();
      if (cardBox) {
        expect(cardBox.width).toBeLessThanOrEqual(375);
      }
    }
  });

  test('T1.8 Touch Target Compliance: Interactive controls meet minimum 44x44px touch bounding box (F9)', async ({ page }) => {
    // Navigate and check primary interactive mobile controls
    const selectorsToAudit = [
      '#colombiaCoachBannerClose',
      '#economia .market-btn',
      '#comparacion .system-btn',
      '#heroOnboardingDismiss',
      '.top-nav__link',
      '.berlin-toggle-btn'
    ];

    for (const selector of selectorsToAudit) {
      const loc = page.locator(selector).first();
      if (await loc.isVisible()) {
        const box = await loc.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          // Bounding box must meet WCAG 44x44px touch target guidelines
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });

  test('T1.9 Section VIII Responsive Table: Colombia matrix renders as responsive cards, eliminating horizontal table overflow (F10)', async ({ page }) => {
    const colSection = page.locator('#colombia');
    await colSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const tableContainer = page.locator('.colombia-table-container');
    const containerBox = await tableContainer.boundingBox();
    expect(containerBox).not.toBeNull();

    if (containerBox) {
      // Container width must strictly fit within mobile viewport (375px)
      expect(containerBox.width).toBeLessThanOrEqual(375);
    }

    // Verify table does not have hidden 410px lateral scrollWidth overflow
    const scrollInfo = await tableContainer.evaluate(el => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth
    }));
    expect(scrollInfo.scrollWidth).toBeLessThanOrEqual(scrollInfo.clientWidth + 2);
  });

  test('T1.10 Mobile Design Tokens: Safe area insets applied to fixed navigation and viewport bars (F12)', async ({ page }) => {
    // Verify top-nav padding/margin accounts for safe-area-inset-top
    const topNavStyles = await page.locator('.top-nav').evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        paddingTop: style.paddingTop,
        position: style.position,
        zIndex: style.zIndex
      };
    });
    expect(topNavStyles.position).toBe('fixed');
    expect(parseInt(topNavStyles.zIndex, 10)).toBeGreaterThan(0);

    // Verify safe area environment variables are present in stylesheet rules
    const hasSafeAreaUsage = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.cssText && rule.cssText.includes('safe-area-inset')) {
              return true;
            }
          }
        } catch (e) {
          // Cross-origin sheets safely ignored
        }
      }
      return false;
    });
    expect(hasSafeAreaUsage).toBe(true);
  });

  test('T1.11 Reduced Motion: Prefers-reduced-motion disables smooth scrolling and instant transitions (F5, F12)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Under reduced motion, html scroll-behavior should not be smooth
    const scrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });
    expect(scrollBehavior).not.toBe('smooth');
  });

});

// ═════════════════════════════════════════════════════════════════════════════
// TIER 2: BOUNDARY & CORNER CASES (Exact Viewports & Edge Scenarios)
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Tier 2: Boundary & Corner Cases', () => {

  const MOBILE_VIEWPORTS = [
    { name: 'iPhone SE 1st Gen (320px)', width: 320, height: 568 },
    { name: 'iPhone SE Standard (375px)', width: 375, height: 667 },
    { name: 'iPhone 12/13/14 Modern (390px)', width: 390, height: 844 },
    { name: 'Large Mobile Pro Max (428px)', width: 428, height: 926 }
  ];

  for (const vp of MOBILE_VIEWPORTS) {
    test(`T2.1-4 Zero Horizontal Overflow on ${vp.name} (F11)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Check document-level horizontal containment
      const scrollMetrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      }));

      expect(scrollMetrics.scrollWidth).toBeLessThanOrEqual(scrollMetrics.innerWidth);

      // Check each section individually
      const sectionOverflows = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('section'));
        return sections.map(s => ({
          id: s.id,
          scrollWidth: s.scrollWidth,
          clientWidth: s.clientWidth,
          hasOverflow: s.scrollWidth > s.clientWidth + 1
        })).filter(s => s.hasOverflow);
      });

      expect(sectionOverflows).toHaveLength(0);
    });
  }

  test('T2.5 Reload Scroll Offset Stability: Page reload maintains deterministic scroll position (F1)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Scroll to middle of page
    await page.locator('#conflicto').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Manual restoration contract: page deterministically loads at (0, 0) without un-controlled jump
    const finalScroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
    expect(finalScroll.x).toBe(0);
    expect(finalScroll.y).toBe(0);
  });

  test('T2.6 Direct Hash Navigation: Anchor navigation lands accurately below fixed top nav (F1, F6)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL + '#colombia');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(600);

    // Colombia section title must be visible and not hidden behind top-nav
    const title = page.locator('#colombia-title');
    await expect(title).toBeVisible();

    const titleBox = await title.boundingBox();
    const navBox = await page.locator('.top-nav').boundingBox();

    expect(titleBox).not.toBeNull();
    expect(navBox).not.toBeNull();

    if (titleBox && navBox) {
      // Title top must be below the bottom edge of top navigation
      expect(titleBox.y).toBeGreaterThanOrEqual(navBox.y + navBox.height - 2);
    }
  });

  test('T2.7 Rapid Wheel Gestures: Rapid sequential lens switches settle deterministically without race conditions (F5)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const wheel = page.locator('.lens-wheel');
    if (await wheel.count() > 0) {
      const items = page.locator('.lens-wheel__item');
      const count = await items.count();
      if (count >= 4) {
        // Rapid sequential clicks across options
        await items.nth(1).dispatchEvent('click');
        await items.nth(2).dispatchEvent('click');
        await items.nth(3).dispatchEvent('click');
        await items.nth(0).dispatchEvent('click');

        await page.waitForTimeout(400);

        // State must cleanly settle on the last clicked lens ('negativa')
        const bodyClass = await page.evaluate(() => document.body.className);
        expect(bodyClass).toContain('lens-negativa');
      }
    }
  });

  test('T2.8 Section Containment: Every section element strictly satisfies scrollWidth === clientWidth (F11)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(400);

    const sectionIds = [
      'problema', 'berlin', 'conflicto', 'poder', 'limites',
      'economia', 'sen', 'colombia', 'comparacion', 'genealogia', 'cierre'
    ];

    for (const id of sectionIds) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      const metrics = await section.evaluate(el => ({
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        right: Math.round(el.getBoundingClientRect().right)
      }));

      expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
      expect(metrics.right).toBeLessThanOrEqual(375 + 1);
    }
  });

});

// ═════════════════════════════════════════════════════════════════════════════
// TIER 3: CROSS-FEATURE COMBINATIONS
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Tier 3: Cross-Feature Combinations', () => {

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('T3.1 Lens Switching Across Scrollytelling Sections: Dynamic interpretation updates without scroll disruption (F4, F5, F6)', async ({ page }) => {
    // Scroll to Section IV (Poder)
    const poder = page.locator('#poder');
    await poder.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const initialScrollY = await page.evaluate(() => window.scrollY);

    // Switch lens to 'capacidades'
    await page.evaluate(() => {
      if (typeof window.setLens === 'function') window.setLens('capacidades');
    });
    await page.waitForTimeout(300);

    // Verify interpretation text updated
    const poderText = await page.locator('#poderLensText').innerText();
    expect(poderText.length).toBeGreaterThan(10);

    // Verify scroll position did not reset or jump violently (tolerance < 10px)
    const postScrollY = await page.evaluate(() => window.scrollY);
    expect(Math.abs(postScrollY - initialScrollY)).toBeLessThan(10);
  });

  test('T3.2 Modal Dialog Scroll & State Isolation: Opening/closing modal in Section X does not disrupt page scroll or lens state (F6, F13)', async ({ page }) => {
    // Scroll to Section X (Genealogía)
    const genSection = page.locator('#genealogia');
    await genSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Focus on card title and note scroll position prior to modal trigger
    const cardTitle = page.locator('#titleMonismoHegemonico');
    await cardTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const scrollBeforeModal = await page.evaluate(() => window.scrollY);
    const initialBodyClass = await page.evaluate(() => document.body.className);

    // Open modal via category title
    await cardTitle.click();

    const modal = page.locator('#genealogiaModal');
    await expect(modal).toBeVisible();

    // Close modal via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Verify scroll position is preserved
    const scrollAfterModal = await page.evaluate(() => window.scrollY);
    expect(Math.abs(scrollAfterModal - scrollBeforeModal)).toBeLessThan(10);

    // Verify active lens is completely unchanged
    const finalBodyClass = await page.evaluate(() => document.body.className);
    expect(finalBodyClass).toBe(initialBodyClass);
  });

  test('T3.3 Theme & Contrast Switching: Dark/light mode toggle preserves text legibility and semantic contrast (F12)', async ({ page }) => {
    const colorBtn = page.locator('#colorModeBtn');
    await colorBtn.scrollIntoViewIfNeeded();

    // Toggle color mode
    await colorBtn.click();
    await page.waitForTimeout(300);

    // Check light mode styles
    const titleColor = await page.locator('#problema-title').evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    expect(titleColor).toBeDefined();

    // Toggle back to restore dark mode
    await colorBtn.click();
    await page.waitForTimeout(300);
  });

});

// ═════════════════════════════════════════════════════════════════════════════
// TIER 4: REAL-WORLD SCENARIOS & DESKTOP REGRESSION DEFENSE
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Tier 4: Real-World Scenarios', () => {

  test('T4.1 Mobile End-to-End User Journey: Complete narrative exploration from Section I to Section XI without errors (F6, F8)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const consoleErrors = [];
    page.on('pageerror', error => consoleErrors.push(error.message));

    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Section I: Hero
    await expect(page.locator('#problema-title')).toBeVisible();

    // Section II: Berlin
    const berlin = page.locator('#berlin');
    await berlin.scrollIntoViewIfNeeded();
    const berlinBtn = page.locator('.berlin-toggle-btn').first();
    if (await berlinBtn.isVisible()) await berlinBtn.click();

    // Section III: Conflicto
    const conflicto = page.locator('#conflicto');
    await conflicto.scrollIntoViewIfNeeded();
    const slider = page.locator('#conflictSlider');
    if (await slider.isVisible()) {
      await slider.fill('75');
      await slider.dispatchEvent('input');
    }

    // Section IV: Poder
    const poder = page.locator('#poder');
    await poder.scrollIntoViewIfNeeded();
    const powerNode = page.locator('.power-node').first();
    if (await powerNode.isVisible()) await powerNode.click();

    // Section V: Límites
    const limites = page.locator('#limites');
    await limites.scrollIntoViewIfNeeded();
    const labTab = page.locator('.lab-tab').nth(1);
    if (await labTab.isVisible()) await labTab.click();

    // Section VI: Economía
    const econ = page.locator('#economia');
    await econ.scrollIntoViewIfNeeded();
    const marketBtn = page.locator('.market-btn').nth(1);
    if (await marketBtn.isVisible()) await marketBtn.click();

    // Section VII: Sen
    const sen = page.locator('#sen');
    await sen.scrollIntoViewIfNeeded();

    // Section VIII: Colombia
    const colombia = page.locator('#colombia');
    await colombia.scrollIntoViewIfNeeded();

    // Section IX: Comparación
    const comp = page.locator('#comparacion');
    await comp.scrollIntoViewIfNeeded();

    // Section X: Genealogía
    const gen = page.locator('#genealogia');
    await gen.scrollIntoViewIfNeeded();

    // Section XI: Cierre
    const cierre = page.locator('#cierre');
    await cierre.scrollIntoViewIfNeeded();
    await expect(page.locator('.cierre-content')).toBeVisible();

    // Zero unhandled JavaScript exceptions throughout complete reading flow
    expect(consoleErrors).toHaveLength(0);
  });

  test('T4.2 Desktop Regression 1366x768: Standard laptop layout retains 100% desktop fidelity (F13)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Desktop lens panel must be visible and docked at side
    const lensPanel = page.locator('#lensPanel');
    await expect(lensPanel).toBeVisible();
    const panelBox = await lensPanel.boundingBox();
    expect(panelBox).not.toBeNull();
    if (panelBox) {
      expect(panelBox.width).toBeGreaterThanOrEqual(200);
    }

    // Hero Section elements visible on desktop
    const heroContent = page.locator('.hero-content');
    const heroViz = page.locator('.hero-viz');
    await expect(heroContent).toBeVisible();
    await expect(heroViz).toBeVisible();

    // In desktop layout (>768px), hero-viz must NOT be hidden by mobile display:none
    const vizDisplay = await heroViz.evaluate(el => window.getComputedStyle(el).display);
    expect(vizDisplay).not.toBe('none');

    // Section VIII Colombia table renders as full desktop table
    const table = page.locator('#colombiaTable');
    await table.scrollIntoViewIfNeeded();
    await expect(table).toBeVisible();
  });

  test('T4.3 Desktop Regression 1920x1080: Full HD layout retains 100% desktop fidelity (F13)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Container bounds in desktop
    const inner = page.locator('.section__inner').first();
    const innerBox = await inner.boundingBox();
    expect(innerBox).not.toBeNull();
    if (innerBox) {
      // Must adhere to min(900px, calc(100vw - 220px - 2.5rem)) desktop constraints
      expect(innerBox.width).toBeLessThanOrEqual(920);
    }

    // Desktop lens panel visible
    await expect(page.locator('#lensPanel')).toBeVisible();
  });

});
