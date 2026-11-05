// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

// ═════════════════════════════════════════════════════════════════════════════
// CHALLENGER 1 ADVERSARIAL STRESS SUITE: MILESTONE 2 (R2 SCROLLYTELLING & DRUM WHEEL)
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Adversarial Suite M2: Scrollytelling & Drum Wheel Empirical Stress', () => {

  test.beforeEach(async ({ page }) => {
    // Standard portrait mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(200);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 1: Rapid Lens Wheel Clicks Under High Frequency
  // ───────────────────────────────────────────────────────────────────────────
  test('ADV-2.1: Rapid burst clicks across lens items maintain strict state synchronization', async ({ page }) => {
    // Scroll to Section II (Berlin) to ensure mobile lens panel is active
    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const wheel = page.locator('.lens-wheel');
    await expect(wheel).toBeAttached();

    const items = page.locator('.lens-wheel__item');
    expect(await items.count()).toBe(4);

    // Sequence of 40 rapid-fire clicks alternating across all lenses with zero pause
    for (let round = 0; round < 10; round++) {
      for (let i = 0; i < 4; i++) {
        await items.nth(i).dispatchEvent('click');
      }
    }

    // Finally click 'capacidades' (index 2)
    await items.nth(2).dispatchEvent('click');

    // Wait for debounces and smooth scroll locks to settle
    await page.waitForTimeout(500);

    // 1. Verify persisted active lens in localStorage
    const savedLens = await page.evaluate(() => localStorage.getItem('site-lens'));
    expect(savedLens).toBe('capacidades');

    // 2. Verify body class
    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toContain('lens-capacidades');

    // 3. Verify exactly one item has .is-center and aria-selected="true"
    const centerCount = await page.locator('.lens-wheel__item.is-center').count();
    expect(centerCount).toBe(1);
    const centerLens = await page.locator('.lens-wheel__item.is-center').getAttribute('data-lens');
    expect(centerLens).toBe('capacidades');

    const ariaSelectedCount = await page.locator('.lens-wheel__item[aria-selected="true"]').count();
    expect(ariaSelectedCount).toBe(1);
    const selectedItemLens = await page.locator('.lens-wheel__item[aria-selected="true"]').getAttribute('data-lens');
    expect(selectedItemLens).toBe('capacidades');

    // 4. Verify all 7 narrative interpretation elements updated cleanly with content
    const interpretationIds = [
      'berlinLensText',
      'conflictLensText',
      'poderLensText',
      'limitesLensText',
      'economiaLensText',
      'senLensText',
      'genealogiaLensText'
    ];

    for (const id of interpretationIds) {
      const text = await page.locator(`#${id}`).innerText();
      expect(text.trim().length, `Interpretation #${id} must not be blank`).toBeGreaterThan(10);
    }
  });

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 2: Wheel Track Manual Drag vs Programmatic Scroll Interleaving
  // ───────────────────────────────────────────────────────────────────────────
  test('ADV-2.2: Interleaving manual track scroll and programmatic click does not cause feedback recursion', async ({ page }) => {
    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const track = page.locator('.lens-wheel__track');
    await expect(track).toBeAttached();

    // 1. Programmatically scroll track to top (0px, index 0: negativa)
    await track.evaluate(el => el.scrollTop = 0);
    await track.dispatchEvent('scroll');
    await page.waitForTimeout(150);

    // 2. Immediately click 'libertario' (item 3)
    const items = page.locator('.lens-wheel__item');
    await items.nth(3).dispatchEvent('click');

    // 3. While smooth scroll is in flight, fire manual intermediate scroll event
    await page.waitForTimeout(50);
    await track.evaluate(el => el.scrollTop = 44);
    await track.dispatchEvent('scroll');

    // 4. Click 'positiva' (item 1)
    await page.waitForTimeout(50);
    await items.nth(1).dispatchEvent('click');

    // Wait 500ms for all timers to settle
    await page.waitForTimeout(500);

    // Final state must settle cleanly on 'positiva'
    const finalLens = await page.evaluate(() => localStorage.getItem('site-lens'));
    expect(finalLens).toBe('positiva');

    const finalBodyClass = await page.evaluate(() => document.body.className);
    expect(finalBodyClass).toContain('lens-positiva');

    const centerLens = await page.locator('.lens-wheel__item.is-center').getAttribute('data-lens');
    expect(centerLens).toBe('positiva');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 3: High-Speed Continuous Fling & Rapid Scroll Back and Forth
  // ───────────────────────────────────────────────────────────────────────────
  test('ADV-2.3: High-speed continuous scroll flinging maintains correct lens panel visibility across sections', async ({ page }) => {
    const lensPanel = page.locator('#lensPanel');

    // Check at top (Hero): panel must be hidden
    let isVisible = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisible, 'Hero entry: lens panel must be hidden').toBe(false);

    // Fling scroll to Section II (Berlin)
    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    isVisible = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisible, 'Section II (Berlin): lens panel must be visible').toBe(true);

    // Scroll rapidly through all scrollytelling sections down to Colombia and Genealogía
    const scrollySections = ['#conflicto', '#poder', '#limites', '#economia', '#sen', '#colombia', '#genealogia'];
    for (const secId of scrollySections) {
      await page.locator(secId).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      isVisible = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
      expect(isVisible, `Section ${secId}: lens panel must remain visible`).toBe(true);
    }

    // Scroll to Cierre (Section XI): does not have data-lens-context
    await page.locator('#cierre').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    isVisible = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisible, 'Section XI (Cierre): lens panel must be hidden').toBe(false);

    // Fast fling all the way back up to Section I Hero (0, 0)
    await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    await page.waitForTimeout(300);
    isVisible = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisible, 'Back at Hero top: lens panel must be hidden').toBe(false);

    // Scroll back down to Section IV (Poder)
    await page.locator('#poder').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    isVisible = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisible, 'Section IV (Poder): lens panel must reactivate cleanly').toBe(true);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 4: Direct Anchor Hash Navigation Stress Matrix
  // ───────────────────────────────────────────────────────────────────────────
  test('ADV-2.4: Direct hash navigation directly into any section sets appropriate panel state', async ({ page }) => {
    const hashMatrix = [
      { hash: '#problema', expectedVisible: false },
      { hash: '#berlin', expectedVisible: true },
      { hash: '#conflicto', expectedVisible: true },
      { hash: '#poder', expectedVisible: true },
      { hash: '#limites', expectedVisible: true },
      { hash: '#economia', expectedVisible: true },
      { hash: '#sen', expectedVisible: true },
      { hash: '#colombia', expectedVisible: true },
      { hash: '#genealogia', expectedVisible: true },
      { hash: '#cierre', expectedVisible: false }
    ];

    for (const item of hashMatrix) {
      // Navigate via click or scrollIntoView on hash target
      const section = page.locator(item.hash);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);

      const isVisible = await page.evaluate(() => {
        const p = document.querySelector('#lensPanel');
        return p ? p.classList.contains('lens-panel--visible') : false;
      });

      expect(isVisible, `At ${item.hash} expected lens-panel--visible = ${item.expectedVisible}`).toBe(item.expectedVisible);
    }
  });

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 5: Rapid Viewport Resize & Breakpoint Flipping
  // ───────────────────────────────────────────────────────────────────────────
  test('ADV-2.5: Rapid resizing between mobile (375px) and desktop (1000px) does not leave zombie state', async ({ page }) => {
    // Position in Section II (Berlin)
    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    // Rapidly toggle viewport width across 500px boundary 10 times
    for (let i = 0; i < 5; i++) {
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(50);
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(50);
    }

    // Wait for 150ms resize debounce in initScrollAwareLensPanel
    await page.waitForTimeout(250);

    // On mobile (375px), in Section II, panel must be visible with mobile class
    let isVisible = await page.evaluate(() => {
      const p = document.querySelector('#lensPanel');
      return p ? p.classList.contains('lens-panel--visible') : false;
    });
    expect(isVisible, 'Mobile after resize frenzy: lens panel must be visible').toBe(true);

    // Switch to Desktop (1024px)
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(250);

    // On desktop, mobile class must be cleaned up
    const hasMobileClass = await page.evaluate(() => {
      const p = document.querySelector('#lensPanel');
      return p ? p.classList.contains('lens-panel--visible') : false;
    });
    expect(hasMobileClass, 'Desktop after resize: lens-panel--visible class must be removed').toBe(false);

    // Desktop panel must still be visible through CSS docking
    const desktopPanel = page.locator('#lensPanel');
    await expect(desktopPanel).toBeVisible();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 6: Prefers-Reduced-Motion Instantaneous Snapping
  // ───────────────────────────────────────────────────────────────────────────
  test('ADV-2.6: Prefers-reduced-motion executes instant drum scrolling without timer desync', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const items = page.locator('.lens-wheel__item');

    // Click 'libertario'
    await items.nth(3).dispatchEvent('click');

    // In reduced motion, timeout is 50ms instead of 250ms
    await page.waitForTimeout(100);

    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toContain('lens-libertario');

    const centerLens = await page.locator('.lens-wheel__item.is-center').getAttribute('data-lens');
    expect(centerLens).toBe('libertario');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 7: Keyboard Navigation Bound Testing
  // ───────────────────────────────────────────────────────────────────────────
  test('ADV-2.7: Rapid ArrowUp and ArrowDown cycling handles boundaries deterministically', async ({ page }) => {
    await page.locator('#berlin').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const wheel = page.locator('.lens-wheel');
    await wheel.focus();

    // Ensure started at 'negativa'
    const items = page.locator('.lens-wheel__item');
    await items.nth(0).dispatchEvent('click');
    await page.waitForTimeout(100);

    // ArrowUp from index 0 wraps to libertario (index 3)
    await wheel.press('ArrowUp');
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => localStorage.getItem('site-lens'))).toBe('libertario');

    // ArrowDown from index 3 wraps to negativa (index 0)
    await wheel.press('ArrowDown');
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => localStorage.getItem('site-lens'))).toBe('negativa');

    // Rapid cycling: 12 rapid ArrowDown presses
    for (let i = 0; i < 12; i++) {
      await wheel.press('ArrowDown');
    }
    await page.waitForTimeout(300);

    // 12 % 4 = 0, should still be 'negativa'
    expect(await page.evaluate(() => localStorage.getItem('site-lens'))).toBe('negativa');
    expect(await page.evaluate(() => document.body.className)).toContain('lens-negativa');
  });

});
