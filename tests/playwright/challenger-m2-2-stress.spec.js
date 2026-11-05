// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

// ═════════════════════════════════════════════════════════════════════════════
// CHALLENGER M2-2 ADVERSARIAL STRESS TEST SUITE:
// TOUCH CONTAINMENT, DESKTOP VIEWPORT FIDELITY, AND VERTICAL SCROLL CONTINUITY
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Challenger M2-2 Suite 1: Touch Containment & Gesture Isolation', () => {

  const mobileViewports = [
    { name: 'iPhone SE (320x568)', width: 320, height: 568 },
    { name: 'iPhone Standard (375x667)', width: 375, height: 667 },
    { name: 'iPhone Modern (390x844)', width: 390, height: 844 },
    { name: 'Pro Max (428x926)', width: 428, height: 926 },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 }
  ];

  for (const vp of mobileViewports) {
    test(`TOUCH-1.1 [${vp.name}]: #conflictSlider and .lens-wheel__track have touch containment applied`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // 1. #conflictSlider must have touch-action: pan-y on screens <= 768px
      const slider = page.locator('#conflictSlider');
      await expect(slider).toBeAttached();
      const sliderTouchAction = await slider.evaluate(el => window.getComputedStyle(el).touchAction);
      expect(sliderTouchAction).toBe('pan-y');

      // 2. .lens-wheel__track must have overscroll-behavior-y: contain on screens <= 768px
      const track = page.locator('.lens-wheel__track');
      if (await track.count() > 0) {
        const trackOverscroll = await track.evaluate(el => window.getComputedStyle(el).overscrollBehaviorY);
        expect(trackOverscroll).toBe('contain');
      }
    });
  }

  const desktopViewports = [
    { name: 'iPad Landscape (1024x768)', width: 1024, height: 768 },
    { name: 'Standard Laptop (1366x768)', width: 1366, height: 768 },
    { name: 'Full HD Desktop (1920x1080)', width: 1920, height: 1080 }
  ];

  for (const dv of desktopViewports) {
    test(`TOUCH-1.2 [${dv.name}]: Desktop viewports (>768px) do NOT leak mobile touch containment overrides`, async ({ page }) => {
      await page.setViewportSize({ width: dv.width, height: dv.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // On desktop, #conflictSlider must NOT have pan-y override (standard desktop behavior)
      const slider = page.locator('#conflictSlider');
      await expect(slider).toBeAttached();
      const sliderTouchAction = await slider.evaluate(el => window.getComputedStyle(el).touchAction);
      expect(sliderTouchAction).not.toBe('pan-y');

      // On desktop, .lens-wheel must be completely hidden (display: none)
      const wheel = page.locator('.lens-wheel');
      if (await wheel.count() > 0) {
        const wheelDisplay = await wheel.evaluate(el => window.getComputedStyle(el).display);
        expect(wheelDisplay).toBe('none');
      }
    });
  }

  test('TOUCH-1.3: Conflict Slider interactive manipulation does not disrupt vertical page scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    const conflicto = page.locator('#conflicto');
    await conflicto.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const scrollYBefore = await page.evaluate(() => window.scrollY);

    // Manipulate slider through full spectrum: 0, 25, 50, 75, 100
    const slider = page.locator('#conflictSlider');
    await expect(slider).toBeVisible();

    for (const val of ['10', '40', '70', '95', '50']) {
      await slider.fill(val);
      await slider.dispatchEvent('input');
      await slider.dispatchEvent('change');
      await page.waitForTimeout(50);
    }

    const scrollYAfter = await page.evaluate(() => window.scrollY);
    // Manipulation must not cause unintended page scroll jumps (> 15px)
    expect(Math.abs(scrollYAfter - scrollYBefore)).toBeLessThan(15);
  });

});

test.describe('Challenger M2-2 Suite 2: Multi-Resolution Desktop Regression Matrix', () => {

  const fullDesktopMatrix = [
    { name: '1024x768 (Small Desktop / iPad Landscape)', width: 1024, height: 768 },
    { name: '1280x800 (13-inch WXGA Laptop)', width: 1280, height: 800 },
    { name: '1366x768 (Standard HD Laptop)', width: 1366, height: 768 },
    { name: '1440x900 (14-inch MacBook)', width: 1440, height: 900 },
    { name: '1600x900 (HD+ Laptop / Desktop)', width: 1600, height: 900 },
    { name: '1920x1080 (Full HD 1080p Desktop)', width: 1920, height: 1080 },
    { name: '2560x1440 (QHD 2K Desktop)', width: 2560, height: 1440 }
  ];

  for (const res of fullDesktopMatrix) {
    test(`DESK-2.1 [${res.name}]: Side lens panel docking, content max-width and zero overflow`, async ({ page }) => {
      await page.setViewportSize({ width: res.width, height: res.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // 1. Zero horizontal overflow across root document
      const docMetrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth
      }));
      expect(docMetrics.scrollWidth).toBeLessThanOrEqual(docMetrics.innerWidth);
      expect(docMetrics.bodyScrollWidth).toBeLessThanOrEqual(docMetrics.innerWidth);

      // 2. Desktop lens panel is visible and docked
      const lensPanel = page.locator('#lensPanel');
      await expect(lensPanel).toBeVisible();
      const panelBox = await lensPanel.boundingBox();
      expect(panelBox).not.toBeNull();
      if (panelBox) {
        expect(panelBox.width).toBeGreaterThanOrEqual(200);
        // Docked to the right side
        expect(panelBox.x + panelBox.width).toBeGreaterThanOrEqual(res.width - 2);
      }

      // 3. Desktop chips (.lens-options) are visible, wheel (.lens-wheel) is hidden
      const lensOptions = page.locator('.lens-options');
      await expect(lensOptions).toBeVisible();
      const wheel = page.locator('.lens-wheel');
      if (await wheel.count() > 0) {
        await expect(wheel).toBeHidden();
      }

      // 4. Content bounds adherence: .section__inner <= 920px
      const innerContainers = page.locator('.section__inner');
      const innerCount = await innerContainers.count();
      for (let i = 0; i < Math.min(innerCount, 4); i++) {
        const box = await innerContainers.nth(i).boundingBox();
        if (box) {
          expect(box.width).toBeLessThanOrEqual(920);
        }
      }

      // 5. Hero visualization visible side-by-side
      const heroViz = page.locator('.hero-viz');
      await expect(heroViz).toBeVisible();
      const heroDisplay = await heroViz.evaluate(el => window.getComputedStyle(el).display);
      expect(heroDisplay).not.toBe('none');

      // 6. Section VIII Colombia table renders as full desktop table
      const colombiaTable = page.locator('#colombiaTable');
      await colombiaTable.scrollIntoViewIfNeeded();
      await expect(colombiaTable).toBeVisible();
      const tableTagName = await colombiaTable.evaluate(el => el.tagName.toLowerCase());
      expect(tableTagName).toBe('table');
    });
  }

});

test.describe('Challenger M2-2 Suite 3: Vertical Scrollytelling Continuity & Narrative Pacing Stress', () => {

  test('SCROLL-3.1 Desktop: Continuous vertical scrollytelling scroll across all 11 sections keeps lens panel stable without JS exceptions', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    const sectionIds = [
      'problema', 'berlin', 'conflicto', 'poder', 'limites',
      'economia', 'sen', 'colombia', 'comparacion', 'genealogia', 'cierre'
    ];

    const lensPanel = page.locator('#lensPanel');

    // Scroll through every section sequentially and verify panel stability
    for (const secId of sectionIds) {
      const sec = page.locator(`#${secId}`);
      await sec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);

      // Panel must stay visible and docked on desktop at all scroll depths
      await expect(lensPanel).toBeVisible();
      const panelBox = await lensPanel.boundingBox();
      expect(panelBox).not.toBeNull();
      if (panelBox) {
        expect(panelBox.width).toBeGreaterThanOrEqual(200);
      }
    }

    expect(errors).toHaveLength(0);
  });

  test('SCROLL-3.2 Mobile: Scrollytelling lens panel activation & persistence across scrollytelling sections', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(200);

    const lensPanel = page.locator('#lensPanel');

    // 1. At Section I Hero, lens panel should NOT have lens-panel--visible
    const isVisibleHero = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisibleHero).toBe(false);

    // 2. Scroll into Section II (Berlin) - scrollytelling active, lens panel must become visible
    const berlin = page.locator('#berlin');
    await berlin.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const isVisibleBerlin = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisibleBerlin).toBe(true);

    // 3. Scroll into Section III (Conflicto) - panel must remain visible
    const conflicto = page.locator('#conflicto');
    await conflicto.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const isVisibleConflicto = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisibleConflicto).toBe(true);

    // 4. Scroll into Section IV (Poder) - panel must remain visible
    const poder = page.locator('#poder');
    await poder.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const isVisiblePoder = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisiblePoder).toBe(true);

    // 5. Scroll back to Section I Hero (0, 0) - panel must hide cleanly
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(400);

    const isVisibleHeroReturn = await lensPanel.evaluate(el => el.classList.contains('lens-panel--visible'));
    expect(isVisibleHeroReturn).toBe(false);

    expect(errors).toHaveLength(0);
  });

  test('SCROLL-3.3 Stress: Violent rapid bidirectional scrolling and programmatic jumps do not destabilize runtime', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });

    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Execute 15 rapid random scroll jumps across document
    for (let i = 0; i < 15; i++) {
      const targetY = Math.floor(Math.random() * 7000);
      await page.evaluate(y => window.scrollTo(0, y), targetY);
      await page.waitForTimeout(40);
    }

    // Settle back at top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const finalY = await page.evaluate(() => window.scrollY);
    expect(finalY).toBe(0);

    // Desktop panel intact
    const lensPanel = page.locator('#lensPanel');
    await expect(lensPanel).toBeVisible();

    expect(errors).toHaveLength(0);
  });

  test('SCROLL-3.4 Stress: Rapid sequential lens switching settles deterministically with zero scroll jitter', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });

    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    const berlin = page.locator('#berlin');
    await berlin.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const scrollYInitial = await page.evaluate(() => window.scrollY);

    // Rapidly switch through all 4 desktop lens options
    const options = page.locator('.lens-btn');
    const optionCount = await options.count();
    expect(optionCount).toBe(4);

    for (let i = 0; i < optionCount; i++) {
      await options.nth(i).click();
      await page.waitForTimeout(50);
    }

    // Click back to option 0 (negativa)
    await options.nth(0).click();
    await page.waitForTimeout(200);

    // Lens state is negativa
    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toContain('lens-negativa');

    // Scroll jitter check: switching lenses must not shift scroll position by > 5px
    const scrollYFinal = await page.evaluate(() => window.scrollY);
    expect(Math.abs(scrollYFinal - scrollYInitial)).toBeLessThan(5);
  });

  test('SCROLL-3.5 Motion: prefers-reduced-motion triggers immediate transitions without animation lag', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    const berlin = page.locator('#berlin');
    await berlin.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const wheel = page.locator('.lens-wheel');
    if (await wheel.count() > 0) {
      const items = page.locator('.lens-wheel__item');
      if (await items.count() >= 4) {
        // Click 3rd item (capacidades)
        await items.nth(2).click();
        // Under reduced motion, settlement is fast (50ms timer)
        await page.waitForTimeout(100);

        const bodyClass = await page.evaluate(() => document.body.className);
        expect(bodyClass).toContain('lens-capacidades');
      }
    }
  });

});
