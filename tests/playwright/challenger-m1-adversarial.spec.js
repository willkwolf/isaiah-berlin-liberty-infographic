// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

// ═════════════════════════════════════════════════════════════════════════════
// CHALLENGER 1 ADVERSARIAL STRESS SUITE: MILESTONE 1 (R1)
// ═════════════════════════════════════════════════════════════════════════════

test.describe('Adversarial Suite 1: Direct Entry & Reload Scroll Determinism', () => {

  test('ADV-1.1: Direct cold start lands deterministically at (0, 0) across all standard viewports', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568, name: 'iPhone SE 1st gen' },
      { width: 375, height: 667, name: 'iPhone SE Standard' },
      { width: 390, height: 844, name: 'iPhone 12/13/14' },
      { width: 428, height: 926, name: 'iPhone 14 Pro Max' },
      { width: 1366, height: 768, name: 'Standard Laptop' },
      { width: 1920, height: 1080, name: 'Desktop Full HD' }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForTimeout(100);

      const restoration = await page.evaluate(() => history.scrollRestoration);
      expect(restoration, `[${vp.name}] scrollRestoration must be manual`).toBe('manual');

      const scrollCoords = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
      expect(scrollCoords.x, `[${vp.name}] scrollX must be 0`).toBe(0);
      expect(scrollCoords.y, `[${vp.name}] scrollY must be 0`).toBe(0);

      const title = page.locator('#problema-title');
      await expect(title, `[${vp.name}] #problema-title must be visible`).toBeVisible();
      const box = await title.boundingBox();
      expect(box, `[${vp.name}] #problema-title bounding box`).not.toBeNull();
      if (box) {
        expect(box.y, `[${vp.name}] #problema-title Y position must be >= 0`).toBeGreaterThanOrEqual(0);
        expect(box.y, `[${vp.name}] #problema-title Y position must be within viewport fold`).toBeLessThan(vp.height);
      }
    }
  });

  test('ADV-1.2: Multi-round consecutive reloads after deep scroll deterministically reset to (0, 0)', async ({ page }) => {
    await page.goto(FILE_URL);
    await page.waitForTimeout(200);

    const scrollOffsets = [1200, 2500, 3800, 5000, 1800];

    for (let round = 0; round < scrollOffsets.length; round++) {
      const targetY = scrollOffsets[round];
      // Scroll deeply into the page
      await page.evaluate((y) => window.scrollTo({ top: y, left: 0, behavior: 'instant' }), targetY);
      await page.waitForTimeout(100);

      const preReloadY = await page.evaluate(() => window.scrollY);
      expect(preReloadY, `Round ${round + 1} scroll pre-condition`).toBeGreaterThan(500);

      // Perform full page reload
      await page.reload();
      await page.waitForTimeout(200);

      const postReloadCoords = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
      expect(postReloadCoords.x, `Round ${round + 1} post-reload scrollX must be 0`).toBe(0);
      expect(postReloadCoords.y, `Round ${round + 1} post-reload scrollY must be 0`).toBe(0);

      const titleVisible = await page.locator('#problema-title').isVisible();
      expect(titleVisible, `Round ${round + 1} hero title visible at (0,0)`).toBe(true);
    }
  });

  test('ADV-1.3: Browser history back/forward traversal resets direct entries to (0, 0)', async ({ page }) => {
    await page.goto(FILE_URL);
    await page.waitForTimeout(300);

    // Scroll down to middle section
    await page.evaluate(() => window.scrollTo({ top: 3000, left: 0, behavior: 'instant' }));
    await page.waitForTimeout(100);
    const scrollPos = await page.evaluate(() => window.scrollY);
    expect(scrollPos).toBeGreaterThan(1000);

    // Navigate away to a blank page
    await page.goto('about:blank');
    expect(page.url()).toBe('about:blank');

    // Traverse back to app
    await page.goBack();
    await page.waitForTimeout(300);

    // Verify deterministically landed at (0, 0)
    const backCoords = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
    expect(backCoords.x).toBe(0);
    expect(backCoords.y).toBe(0);

    // Hero title is in viewport
    const heroBox = await page.locator('#problema-title').boundingBox();
    expect(heroBox).not.toBeNull();
    if (heroBox) {
      expect(heroBox.y).toBeGreaterThanOrEqual(0);
    }
  });
});

test.describe('Adversarial Suite 2: Zero CLS & Bounding Box Invariance across Screen Widths', () => {

  const mobileWidths = [
    { width: 320, height: 568, name: '320px (iPhone SE 1st)' },
    { width: 375, height: 667, name: '375px (iPhone SE standard)' },
    { width: 390, height: 844, name: '390px (iPhone 12/13/14)' },
    { width: 428, height: 926, name: '428px (iPhone 14 Pro Max)' },
    { width: 768, height: 1024, name: '768px (Tablet portrait)' }
  ];

  for (const mw of mobileWidths) {
    test(`ADV-2.1 [${mw.name}]: Bounding box stability of #problema-title and intro paragraphs before/after 300ms onboarding`, async ({ page }) => {
      await page.setViewportSize({ width: mw.width, height: mw.height });
      await page.goto(FILE_URL);

      // Immediate pre-mount measurements (before 300ms timer)
      const titleLoc = page.locator('#problema-title');
      const thesisLoc = page.locator('.hero-content__thesis');
      const secondaryLoc = page.locator('.hero-content__secondary');

      await expect(titleLoc).toBeVisible();
      await expect(thesisLoc).toBeVisible();
      await expect(secondaryLoc).toBeVisible();

      const preTitleBox = await titleLoc.boundingBox();
      const preThesisBox = await thesisLoc.boundingBox();
      const preSecondaryBox = await secondaryLoc.boundingBox();

      expect(preTitleBox, `Pre-mount title box at ${mw.name}`).not.toBeNull();
      expect(preThesisBox, `Pre-mount thesis box at ${mw.name}`).not.toBeNull();
      expect(preSecondaryBox, `Pre-mount secondary box at ${mw.name}`).not.toBeNull();

      // Wait 800ms for onboarding timer (300ms) to trigger and mount
      await page.waitForTimeout(800);

      // Verify onboarding card is visible
      const onboardingCard = page.locator('#heroOnboarding');
      await expect(onboardingCard).toBeVisible();

      // Post-mount measurements
      const postTitleBox = await titleLoc.boundingBox();
      const postThesisBox = await thesisLoc.boundingBox();
      const postSecondaryBox = await secondaryLoc.boundingBox();

      // 1. Strict Y coordinate check (Zero layout shift on hero text elements: delta < 1px)
      if (preTitleBox && postTitleBox) {
        const deltaYTitle = Math.abs(postTitleBox.y - preTitleBox.y);
        expect(deltaYTitle, `[${mw.name}] #problema-title delta Y must be < 1px`).toBeLessThan(1);
      }

      if (preThesisBox && postThesisBox) {
        const deltaYThesis = Math.abs(postThesisBox.y - preThesisBox.y);
        expect(deltaYThesis, `[${mw.name}] .hero-content__thesis delta Y must be < 1px`).toBeLessThan(1);
      }

      if (preSecondaryBox && postSecondaryBox) {
        const deltaYSecondary = Math.abs(postSecondaryBox.y - preSecondaryBox.y);
        expect(deltaYSecondary, `[${mw.name}] .hero-content__secondary delta Y must be < 1px`).toBeLessThan(1);
      }

      // 2. Inspect onboarding element layout properties (must be fixed overlay on mobile <= 768px)
      const onboardingComputed = await onboardingCard.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          position: style.position,
          zIndex: parseInt(style.zIndex, 10),
          bottom: style.bottom
        };
      });
      expect(onboardingComputed.position, `[${mw.name}] Onboarding card must be position: fixed`).toBe('fixed');
      expect(onboardingComputed.zIndex, `[${mw.name}] Onboarding card z-index must be >= 1000`).toBeGreaterThanOrEqual(1000);

      // 3. Verify touch target of dismiss button (>= 44x44px)
      const dismissBtn = page.locator('#heroOnboardingDismiss');
      await expect(dismissBtn).toBeVisible();
      const btnBox = await dismissBtn.boundingBox();
      expect(btnBox, `Dismiss button bounding box at ${mw.name}`).not.toBeNull();
      if (btnBox) {
        expect(btnBox.height, `[${mw.name}] Dismiss button height >= 44px`).toBeGreaterThanOrEqual(44);
        expect(btnBox.width, `[${mw.name}] Dismiss button width >= 44px`).toBeGreaterThanOrEqual(44);
      }

      // 4. Dismiss onboarding and verify layout remains invariant
      await dismissBtn.click();
      await page.waitForTimeout(200);

      const postDismissTitleBox = await titleLoc.boundingBox();
      if (preTitleBox && postDismissTitleBox) {
        const dismissDeltaY = Math.abs(postDismissTitleBox.y - preTitleBox.y);
        expect(dismissDeltaY, `[${mw.name}] Post-dismiss title delta Y must be < 1px`).toBeLessThan(1);
      }
    });
  }
});

test.describe('Adversarial Suite 3: Anchor Hash Navigation Integrity', () => {

  const anchorTargets = [
    { hash: '#berlin', expectedId: 'berlin', name: 'Section II Berlin' },
    { hash: '#colombia', expectedId: 'colombia', name: 'Section VIII Colombia Matrix' },
    { hash: '#genealogia', expectedId: 'genealogia', name: 'Section IX Genealogia' },
    { hash: '#sen', expectedId: 'sen', name: 'Section VII Sen' },
    { hash: '#poder', expectedId: 'poder', name: 'Section IV Poder' },
    { hash: '#limites', expectedId: 'limites', name: 'Section V Limites' },
    { hash: '#economia', expectedId: 'economia', name: 'Section VI Economia' }
  ];

  for (const target of anchorTargets) {
    test(`ADV-3.1 [${target.name}]: Direct URL navigation with ${target.hash} preserves hash and does not forcibly reset to (0,0)`, async ({ page }) => {
      await page.goto(FILE_URL + target.hash);
      await page.waitForTimeout(400);

      // Verify hash remains intact in URL
      const currentUrl = page.url();
      expect(currentUrl).toContain(target.hash);

      // Verify resetScrollToTop() did not forcibly collapse scroll to top (scrollY > 0 for sections below fold)
      const scrollCoords = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
      expect(scrollCoords.y, `Direct navigation to ${target.hash} must not be forcibly reset to 0`).toBeGreaterThan(0);

      // Target element is rendered in document
      const targetElement = page.locator('#' + target.expectedId);
      await expect(targetElement).toBeVisible();
    });
  }

  test('ADV-3.2: In-page hero CTA anchor navigation smoothly reaches target without reset', async ({ page }) => {
    await page.goto(FILE_URL);
    await page.waitForTimeout(300);

    // Click "Comenzar exploración ↓" CTA link to #berlin
    const cta = page.locator('a.hero-cta');
    await expect(cta).toBeVisible();
    await cta.click();

    // Allow smooth scroll to settle
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY, 'In-page CTA click must scroll down past hero').toBeGreaterThan(200);

    const berlinEl = page.locator('#berlin');
    const box = await berlinEl.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.y).toBeLessThan(300);
    }
  });

  test('ADV-3.3: In-page top-nav links accurately navigate to sections without top-reset interference', async ({ page }) => {
    await page.goto(FILE_URL);
    await page.waitForTimeout(300);

    const navLinks = ['#berlin', '#conflicto', '#poder', '#limites'];
    for (const hash of navLinks) {
      const link = page.locator(`.top-nav a[href="${hash}"]`);
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForTimeout(600);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY, `Navigation to ${hash} must scroll into page`).toBeGreaterThan(200);
    }
  });
});

test.describe('Adversarial Suite 4: Desktop Regression Protection Guardrails', () => {

  const desktopViewports = [
    { width: 1366, height: 768, name: 'Standard Laptop (1366x768)' },
    { width: 1920, height: 1080, name: 'Desktop Full HD (1920x1080)' }
  ];

  for (const dv of desktopViewports) {
    test(`ADV-4.1 [${dv.name}]: Hero visualization canvas remains visible and intact on desktop`, async ({ page }) => {
      await page.setViewportSize({ width: dv.width, height: dv.height });
      await page.goto(FILE_URL);
      await page.waitForTimeout(300);

      // 1. Verify .hero-viz computed display is NOT none
      const heroViz = page.locator('.hero-viz');
      await expect(heroViz).toBeVisible();
      const display = await heroViz.evaluate((el) => window.getComputedStyle(el).display);
      expect(display, `[${dv.name}] .hero-viz display must not be none`).not.toBe('none');

      // 2. Verify canvas has width and height > 0
      const canvas = page.locator('#divergenceCanvas');
      await expect(canvas).toBeVisible();
      const canvasBox = await canvas.boundingBox();
      expect(canvasBox).not.toBeNull();
      if (canvasBox) {
        expect(canvasBox.width).toBeGreaterThan(100);
        expect(canvasBox.height).toBeGreaterThan(100);
      }

      // 3. Verify section container bounds (#problema .section__inner)
      const sectionInner = page.locator('#problema .section__inner');
      const innerBox = await sectionInner.boundingBox();
      expect(innerBox).not.toBeNull();
      if (innerBox) {
        expect(innerBox.width).toBeGreaterThan(600);
      }
    });
  }
});
