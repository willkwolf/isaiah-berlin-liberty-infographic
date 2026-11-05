// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

// ═════════════════════════════════════════════════════════════════════════════
// CHALLENGER 2 ADVERSARIAL STRESS SUITE:
// DESKTOP REGRESSION PROTECTION (R5) & SECTION I HERO ANIMATION INTEGRITY
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Challenger 2 Suite 1: Desktop Regression Protection (R5)', () => {

  const desktopProfiles = [
    { name: 'Standard Laptop (1366x768)', width: 1366, height: 768 },
    { name: 'Desktop Full HD (1920x1080)', width: 1920, height: 1080 }
  ];

  for (const dp of desktopProfiles) {
    test(`DESK-1.1 [${dp.name}]: Lens panel retains bit-for-bit 220px width and side-docked positioning`, async ({ page }) => {
      await page.setViewportSize({ width: dp.width, height: dp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // 1. Verify CSS custom property --lens-panel-width is 220px
      const cssProp = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--lens-panel-width').trim();
      });
      expect(cssProp).toBe('220px');

      // 2. Verify #lensPanel element layout and rendered width
      const lensPanel = page.locator('#lensPanel');
      await expect(lensPanel).toBeVisible();

      const panelBox = await lensPanel.boundingBox();
      expect(panelBox, 'Lens panel bounding box').not.toBeNull();
      if (panelBox) {
        expect(Math.round(panelBox.width)).toBe(220);
        // On desktop, panel is docked at right margin: x + width ~ viewport width
        expect(panelBox.x + panelBox.width).toBeGreaterThanOrEqual(dp.width - 2);
      }
    });

    test(`DESK-1.2 [${dp.name}]: Section I Hero renders side-by-side grid with active canvas`, async ({ page }) => {
      await page.setViewportSize({ width: dp.width, height: dp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // 1. Verify .section--hero .section__inner has grid display with 2 columns
      const innerGrid = page.locator('.section--hero .section__inner');
      await expect(innerGrid).toBeVisible();

      const gridStyles = await innerGrid.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          display: s.display,
          gridTemplateColumns: s.gridTemplateColumns,
          gap: s.gap
        };
      });
      expect(gridStyles.display).toBe('grid');
      // Should have two distinct column tracks (e.g. "450px 450px" or similar)
      const cols = gridStyles.gridTemplateColumns.trim().split(/\s+/);
      expect(cols.length).toBe(2);

      // 2. Verify both .hero-content and .hero-viz are simultaneously visible
      const heroContent = page.locator('.hero-content');
      const heroViz = page.locator('.hero-viz');
      await expect(heroContent).toBeVisible();
      await expect(heroViz).toBeVisible();

      // 3. Verify .hero-viz computed display is 'flex' on desktop
      const vizDisplay = await heroViz.evaluate((el) => window.getComputedStyle(el).display);
      expect(vizDisplay).toBe('flex');

      // 4. Verify side-by-side spatial arrangement (viz in column 1, content in column 2)
      const contentBox = await heroContent.boundingBox();
      const vizBox = await heroViz.boundingBox();
      expect(contentBox).not.toBeNull();
      expect(vizBox).not.toBeNull();

      if (contentBox && vizBox) {
        // Both occupy distinct horizontal columns (side-by-side)
        expect(vizBox.x).toBeLessThan(contentBox.x);
        expect(contentBox.x).toBeGreaterThanOrEqual(vizBox.x + vizBox.width * 0.5);
      }

      // 5. Verify #divergenceCanvas dimensions
      const canvas = page.locator('#divergenceCanvas');
      await expect(canvas).toBeVisible();
      const canvasBox = await canvas.boundingBox();
      expect(canvasBox).not.toBeNull();
      if (canvasBox) {
        expect(canvasBox.width).toBeGreaterThan(200);
        expect(canvasBox.height).toBeGreaterThan(200);
        // Canvas must remain within Section I bounds
        const heroSection = page.locator('#problema');
        const heroBox = await heroSection.boundingBox();
        if (heroBox) {
          expect(canvasBox.y + canvasBox.height).toBeLessThanOrEqual(heroBox.y + heroBox.height + 5);
        }
      }
    });

    test(`DESK-1.3 [${dp.name}]: Container bounds strictly adhere to desktop max-width <= 920px`, async ({ page }) => {
      await page.setViewportSize({ width: dp.width, height: dp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // Check all section inner containers
      const innerContainers = page.locator('.section__inner');
      const count = await innerContainers.count();
      expect(count).toBeGreaterThan(5);

      for (let i = 0; i < count; i++) {
        const box = await innerContainers.nth(i).boundingBox();
        if (box) {
          // Desktop constraint: min(900px, calc(100vw - 220px - 2.5rem)) plus padding tolerance <= 920px
          expect(box.width, `Container ${i} width at ${dp.name}`).toBeLessThanOrEqual(920);
        }
      }

      // Zero lateral overflow on desktop
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(dp.width);
    });

    test(`DESK-1.4 [${dp.name}]: Hero onboarding is in-flow card on desktop, NOT fixed mobile banner`, async ({ page }) => {
      await page.setViewportSize({ width: dp.width, height: dp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // Wait 600ms for 300ms onboarding timer to show onboarding card
      await page.waitForTimeout(600);

      const onboarding = page.locator('#heroOnboarding');
      await expect(onboarding).toBeVisible();

      // On desktop, onboarding position must NOT be 'fixed'
      const pos = await onboarding.evaluate((el) => window.getComputedStyle(el).position);
      expect(pos).not.toBe('fixed');
    });
  }
});

test.describe('Challenger 2 Suite 2: Section I Hero Animation Integrity (No Flash, FOUC, or Jitter)', () => {

  test('ANIM-2.1: Section I (#problema) mounts immediately with opacity: 1 and transform: none (No FOUC/Flash)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });

    // Track opacity and transform states continuously from script execution
    await page.addInitScript(() => {
      window.__heroStateSnapshots = [];
      const observer = new MutationObserver(() => {
        const hero = document.getElementById('problema');
        if (hero) {
          const style = window.getComputedStyle(hero);
          window.__heroStateSnapshots.push({
            opacity: style.opacity,
            transform: style.transform,
            inlineOpacity: hero.style.opacity,
            inlineTransform: hero.style.transform
          });
        }
      });
      observer.observe(document.documentElement, { attributes: true, subtree: true, childList: true });
    });

    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Section I hero style check
    const heroStyles = await page.evaluate(() => {
      const hero = document.getElementById('problema');
      if (!hero) return null;
      return {
        inlineOpacity: hero.style.opacity,
        inlineTransform: hero.style.transform,
        computedOpacity: window.getComputedStyle(hero).opacity,
        computedTransform: window.getComputedStyle(hero).transform
      };
    });

    expect(heroStyles).not.toBeNull();
    if (heroStyles) {
      expect(heroStyles.inlineOpacity).toBe('1');
      expect(heroStyles.inlineTransform).toBe('none');
      expect(heroStyles.computedOpacity).toBe('1');
    }

    // Verify snapshot log never recorded opacity 0 on #problema
    const snapshots = await page.evaluate(() => window.__heroStateSnapshots || []);
    for (const snap of snapshots) {
      if (snap.inlineOpacity) {
        expect(snap.inlineOpacity).not.toBe('0');
      }
    }
  });

  test('ANIM-2.2: Section I hero text elements exhibit zero layout jitter during initial 1000ms', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // PerformanceObserver for LayoutShift
    await page.addInitScript(() => {
      window.__heroShifts = 0;
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__heroShifts += entry.value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (_) {}
    });

    await page.goto(FILE_URL);

    const title = page.locator('#problema-title');
    await expect(title).toBeVisible();

    const boxImmediate = await title.boundingBox();
    expect(boxImmediate).not.toBeNull();

    // Sample positions across the first 1000ms (intervals: 100ms, 300ms, 500ms, 800ms, 1000ms)
    const samples = [100, 200, 300, 300, 200];
    let prevBox = boxImmediate;

    for (const waitTime of samples) {
      await page.waitForTimeout(waitTime);
      const curBox = await title.boundingBox();
      expect(curBox).not.toBeNull();
      if (prevBox && curBox) {
        const deltaY = Math.abs(curBox.y - prevBox.y);
        // Absolute stability: deltaY must be 0px (tolerance < 1px)
        expect(deltaY, `Layout jitter check after ${waitTime}ms`).toBeLessThan(1);
      }
      prevBox = curBox;
    }

    // Verify cumulative layout shift score meets excellent Core Web Vitals threshold (<= 0.05, well below 0.1)
    const totalCls = await page.evaluate(() => window.__heroShifts || 0);
    expect(totalCls).toBeLessThanOrEqual(0.05);
  });
});

test.describe('Challenger 2 Suite 3: Mobile Hero Visualization Canvas Fold & Constraint Defense', () => {

  const mobileProfiles = [
    { name: '320px (iPhone SE 1st)', width: 320, height: 568 },
    { name: '375px (iPhone SE Standard)', width: 375, height: 667 },
    { name: '390px (iPhone 12/13/14)', width: 390, height: 844 },
    { name: '428px (iPhone 14 Pro Max)', width: 428, height: 926 }
  ];

  for (const mp of mobileProfiles) {
    test(`MOB-3.1 [${mp.name}]: Hero visualization canvas is strictly display: none and does not inflate fold`, async ({ page }) => {
      await page.setViewportSize({ width: mp.width, height: mp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // 1. Verify .hero-viz has computed display 'none'
      const heroViz = page.locator('.hero-viz');
      const vizDisplay = await heroViz.evaluate((el) => window.getComputedStyle(el).display);
      expect(vizDisplay).toBe('none');

      // 2. Verify #divergenceCanvas is NOT visible
      const canvas = page.locator('#divergenceCanvas');
      await expect(canvas).toBeHidden();

      // 3. Verify Section I title is at top of viewport
      const title = page.locator('#problema-title');
      await expect(title).toBeVisible();
      const titleBox = await title.boundingBox();
      expect(titleBox).not.toBeNull();
      if (titleBox) {
        expect(titleBox.y).toBeGreaterThanOrEqual(0);
        expect(titleBox.y).toBeLessThan(350);
      }

      // 4. Verify CTA link is reachable and within reasonable fold reach
      const cta = page.locator('a.hero-cta');
      await expect(cta).toBeVisible();
      const ctaBox = await cta.boundingBox();
      expect(ctaBox).not.toBeNull();
      if (ctaBox) {
        // Without canvas inflation, CTA is located within ~850px from top
        expect(ctaBox.y).toBeLessThan(850);
      }

      // 5. Zero horizontal overflow on mobile viewport
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(mp.width);
    });
  }
});

test.describe('Challenger 2 Suite 4: Adversarial Stress & Dynamic Invariance Harness', () => {

  test('STRESS-4.1: Viewport resize from Desktop (1920x1080) to Mobile (375x667) and back to Desktop', async ({ page }) => {
    // 1. Start on Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    const heroViz = page.locator('.hero-viz');
    let vizDisplay = await heroViz.evaluate((el) => window.getComputedStyle(el).display);
    expect(vizDisplay).toBe('flex');

    // 2. Dynamically resize to Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);

    vizDisplay = await heroViz.evaluate((el) => window.getComputedStyle(el).display);
    expect(vizDisplay).toBe('none');

    const onboarding = page.locator('#heroOnboarding');
    const onbPos = await onboarding.evaluate((el) => window.getComputedStyle(el).position);
    expect(onbPos).toBe('fixed');

    // 3. Dynamically resize back to Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(200);

    vizDisplay = await heroViz.evaluate((el) => window.getComputedStyle(el).display);
    expect(vizDisplay).toBe('flex');

    const panelBox = await page.locator('#lensPanel').boundingBox();
    expect(panelBox).not.toBeNull();
    if (panelBox) {
      expect(Math.round(panelBox.width)).toBe(220);
    }
  });

  test('STRESS-4.2: Repeated reload cycle (5 iterations) maintains deterministic (0,0) scroll and layout', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    for (let cycle = 1; cycle <= 5; cycle++) {
      // Scroll down a bit
      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(50);

      // Reload
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(100);

      // Verify deterministic (0, 0)
      const coords = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
      expect(coords.x, `Cycle ${cycle} scrollX`).toBe(0);
      expect(coords.y, `Cycle ${cycle} scrollY`).toBe(0);

      // Verify hero is fully visible
      const title = page.locator('#problema-title');
      await expect(title).toBeVisible();
    }
  });

  test('STRESS-4.3: Dark/Light color mode toggle retains Section I Hero rendering fidelity', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    const colorBtn = page.locator('#colorModeBtn');
    await expect(colorBtn).toBeVisible();

    // Initial color mode state on body
    let isLight = await page.evaluate(() => document.body.classList.contains('light-mode'));

    // Toggle mode
    await colorBtn.click();
    await page.waitForTimeout(200);

    let isLightAfter = await page.evaluate(() => document.body.classList.contains('light-mode'));
    expect(isLightAfter).not.toBe(isLight);

    // Section I elements and canvas remain completely intact
    await expect(page.locator('#problema-title')).toBeVisible();
    await expect(page.locator('.hero-viz')).toBeVisible();
    await expect(page.locator('#divergenceCanvas')).toBeVisible();

    // Toggle back
    await colorBtn.click();
    await page.waitForTimeout(200);
    let isLightRevert = await page.evaluate(() => document.body.classList.contains('light-mode'));
    expect(isLightRevert).toBe(isLight);
  });
});
