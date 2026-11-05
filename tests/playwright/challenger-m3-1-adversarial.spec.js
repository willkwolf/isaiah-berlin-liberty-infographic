// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const MOBILE_VIEWPORTS = [
  { name: 'iPhone SE 1st Gen (320px)', width: 320, height: 568 },
  { name: 'iPhone SE Standard (375px)', width: 375, height: 667 },
  { name: 'iPhone 12/13/14 Modern (390px)', width: 390, height: 844 },
  { name: 'Large Mobile Pro Max (428px)', width: 428, height: 926 }
];

test.describe('Adversarial Suite M3: Empirical Cognitive UX & Progressive Disclosure Defense', () => {

  // ═══════════════════════════════════════════════════════════════════════════
  // ADV-3.1: MULTI-VIEWPORT TEXT WALL ELIMINATION IN SECTION II
  // ═══════════════════════════════════════════════════════════════════════════
  for (const vp of MOBILE_VIEWPORTS) {
    test(`ADV-3.1 [${vp.name}]: Section II eliminates continuous vertical text wall via single-mode & collapsible disclosures`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      const split = page.locator('#berlinSplit');
      await split.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      // 1. On mobile initial load, verify single concept mode is active by default
      const initialSplitClass = await split.getAttribute('class');
      expect(initialSplitClass).toMatch(/show-one-(neg|pos)/);

      // Measure height in single mode: must be well below full 2-card text wall (~1450px)
      const singleBox = await split.boundingBox();
      expect(singleBox).not.toBeNull();
      if (singleBox) {
        expect(singleBox.height).toBeLessThan(1050);
      }

      // 2. Switch to 'Comparar' (ambas) mode
      const compareBtn = page.locator('.berlin-toggle-btn[data-side="ambas"]');
      await compareBtn.click();
      await page.waitForTimeout(200);

      // Verify both cards are visible in compare mode
      await expect(page.locator('#berlinNeg')).toBeVisible();
      await expect(page.locator('#berlinPos')).toBeVisible();

      // Disclosures should be collapsed by default on mobile
      const disclosures = page.locator('.berlin-card__disclosure');
      const count = await disclosures.count();
      expect(count).toBe(2);

      for (let i = 0; i < count; i++) {
        const isOpen = await disclosures.nth(i).evaluate(el => el.hasAttribute('open'));
        expect(isOpen).toBe(false);
      }

      // Measure collapsed comparison height
      const collapsedBox = await split.boundingBox();
      expect(collapsedBox).not.toBeNull();

      // 3. Manually open both disclosures to measure unabridged text wall height
      for (let i = 0; i < count; i++) {
        await disclosures.nth(i).evaluate(el => el.setAttribute('open', ''));
      }
      await page.waitForTimeout(100);

      const expandedBox = await split.boundingBox();
      expect(expandedBox).not.toBeNull();

      if (collapsedBox && expandedBox) {
        // Collapsed disclosure must save at least 250px of vertical space
        const spaceSaved = expandedBox.height - collapsedBox.height;
        expect(spaceSaved).toBeGreaterThan(250);
        // Collapsed height must be at least 20% shorter than the expanded text wall
        expect(collapsedBox.height).toBeLessThan(expandedBox.height * 0.85);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADV-3.2: NATIVE <details>/<summary> INTERACTIVE BEHAVIOR & CHEVRON AFFORDANCE
  // ═══════════════════════════════════════════════════════════════════════════
  test('ADV-3.2: Native <summary> click & keyboard toggles disclosures cleanly with visual chevron feedback', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Switch to comparison mode where disclosures are collapsed
    await page.locator('.berlin-toggle-btn[data-side="ambas"]').click();
    await page.waitForTimeout(200);

    const negDisclosure = page.locator('#berlinNeg .berlin-card__disclosure');
    const negSummary = page.locator('#berlinNeg .berlin-card__summary');
    const summaryIcon = page.locator('#berlinNeg .berlin-card__summary-icon');

    // Verify initially closed
    expect(await negDisclosure.evaluate(el => el.hasAttribute('open'))).toBe(false);

    // Initial closed chevron rotation should be 0deg (or none)
    const initialTransform = await summaryIcon.evaluate(el => window.getComputedStyle(el).transform);

    // Click summary to expand
    await negSummary.click();
    await page.waitForTimeout(200);

    // Verify expanded
    expect(await negDisclosure.evaluate(el => el.hasAttribute('open'))).toBe(true);

    // In open state, chevron must have rotate(180deg) transform applied
    const openTransform = await summaryIcon.evaluate(el => window.getComputedStyle(el).transform);
    expect(openTransform).not.toBe('none');
    expect(openTransform).not.toBe(initialTransform);

    // Click summary again to collapse
    await negSummary.click();
    await page.waitForTimeout(200);
    expect(await negDisclosure.evaluate(el => el.hasAttribute('open'))).toBe(false);

    // Keyboard affordance test: focus summary and press Enter
    await negSummary.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    expect(await negDisclosure.evaluate(el => el.hasAttribute('open'))).toBe(true);

    // Keyboard affordance test: press Space to collapse
    await page.keyboard.press('Space');
    await page.waitForTimeout(200);
    expect(await negDisclosure.evaluate(el => el.hasAttribute('open'))).toBe(false);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ADV-3.3: SECTION VI MARKET DEBATE MOBILE TABS INTERACTION & FACETING
  // ═══════════════════════════════════════════════════════════════════════════
  for (const vp of MOBILE_VIEWPORTS) {
    test(`ADV-3.3 [${vp.name}]: Section VI mobile perspective tabs switch columns and eliminate stacked 6-card column`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      const econSection = page.locator('#economia');
      await econSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      // Verify mobile tabs are visible
      const mobileTabs = page.locator('.dialogue-mobile-tabs');
      await expect(mobileTabs).toBeVisible();

      const defenseTab = page.locator('.dialogue-tab-btn[data-perspective="defense"]');
      const critiqueTab = page.locator('.dialogue-tab-btn[data-perspective="critique"]');

      await expect(defenseTab).toBeVisible();
      await expect(critiqueTab).toBeVisible();

      const defCol = page.locator('#dialogueColDefense');
      const critCol = page.locator('#dialogueColCritique');

      // 1. Initial state: Defense active
      await expect(defenseTab).toHaveClass(/active/);
      expect(await defenseTab.getAttribute('aria-selected')).toBe('true');
      await expect(critiqueTab).not.toHaveClass(/active/);
      expect(await critiqueTab.getAttribute('aria-selected')).toBe('false');

      // Defense column is visible; Critique column is hidden
      await expect(defCol).toBeVisible();
      await expect(critCol).toBeHidden();

      const grid = page.locator('.dialogue-grid');
      const defenseHeight = (await grid.boundingBox())?.height || 0;

      // 2. Click Critique tab
      await critiqueTab.click();
      await page.waitForTimeout(200);

      await expect(critiqueTab).toHaveClass(/active/);
      expect(await critiqueTab.getAttribute('aria-selected')).toBe('true');
      await expect(defenseTab).not.toHaveClass(/active/);
      expect(await defenseTab.getAttribute('aria-selected')).toBe('false');

      // Critique column is visible; Defense column is hidden
      await expect(critCol).toBeVisible();
      await expect(defCol).toBeHidden();

      const critiqueHeight = (await grid.boundingBox())?.height || 0;

      // Both single-perspective views must be reasonable in height (< 1200px)
      expect(defenseHeight).toBeLessThan(1200);
      expect(critiqueHeight).toBeLessThan(1200);

      // 3. Switch back to Defense tab
      await defenseTab.click();
      await page.waitForTimeout(200);
      await expect(defCol).toBeVisible();
      await expect(critCol).toBeHidden();
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADV-3.4: COMPREHENSIVE ZERO HORIZONTAL OVERFLOW MATRIX ACROSS ALL STATES
  // ═══════════════════════════════════════════════════════════════════════════
  for (const vp of MOBILE_VIEWPORTS) {
    test(`ADV-3.4 [${vp.name}]: Strict zero horizontal overflow across all Section II & Section VI interactive states`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      const checkNoOverflow = async (stateName) => {
        const metrics = await page.evaluate(() => ({
          docScrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          windowInnerWidth: window.innerWidth,
          berlinScrollWidth: document.querySelector('#berlin')?.scrollWidth || 0,
          berlinClientWidth: document.querySelector('#berlin')?.clientWidth || 0,
          econScrollWidth: document.querySelector('#economia')?.scrollWidth || 0,
          econClientWidth: document.querySelector('#economia')?.clientWidth || 0,
        }));

        expect(metrics.docScrollWidth, `doc overflow in ${stateName} on ${vp.name}`).toBeLessThanOrEqual(metrics.windowInnerWidth);
        expect(metrics.bodyScrollWidth, `body overflow in ${stateName} on ${vp.name}`).toBeLessThanOrEqual(metrics.windowInnerWidth);
        expect(metrics.berlinScrollWidth, `berlin overflow in ${stateName} on ${vp.name}`).toBeLessThanOrEqual(metrics.berlinClientWidth + 1);
        expect(metrics.econScrollWidth, `econ overflow in ${stateName} on ${vp.name}`).toBeLessThanOrEqual(metrics.econClientWidth + 1);
      };

      // State 1: Default initial load
      await checkNoOverflow('Initial State');

      // State 2: Section II Negativa
      await page.locator('.berlin-toggle-btn[data-side="negativa"]').click();
      await page.waitForTimeout(100);
      await checkNoOverflow('Berlin Negativa');

      // State 3: Section II Positiva
      await page.locator('.berlin-toggle-btn[data-side="positiva"]').click();
      await page.waitForTimeout(100);
      await checkNoOverflow('Berlin Positiva');

      // State 4: Section II Ambas (collapsed)
      await page.locator('.berlin-toggle-btn[data-side="ambas"]').click();
      await page.waitForTimeout(100);
      await checkNoOverflow('Berlin Ambas (Collapsed)');

      // State 5: Section II Ambas (expanded disclosures)
      const summaries = page.locator('.berlin-card__summary');
      for (let i = 0; i < await summaries.count(); i++) {
        await summaries.nth(i).click();
      }
      await page.waitForTimeout(100);
      await checkNoOverflow('Berlin Ambas (Expanded)');

      // State 6: Section VI Defense Tab
      await page.locator('.dialogue-tab-btn[data-perspective="defense"]').click();
      await page.waitForTimeout(100);
      await checkNoOverflow('Econ Defense Tab');

      // State 7: Section VI Critique Tab
      await page.locator('.dialogue-tab-btn[data-perspective="critique"]').click();
      await page.waitForTimeout(100);
      await checkNoOverflow('Econ Critique Tab');
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADV-3.5: TOUCH TARGET SIZING COMPLIANCE (>= 44x44px)
  // ═══════════════════════════════════════════════════════════════════════════
  test('ADV-3.5: All Section II and Section VI interactive affordances satisfy >= 44x44px touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Section II toggle buttons
    const berlinToggleBtns = page.locator('.berlin-toggle-btn');
    for (let i = 0; i < await berlinToggleBtns.count(); i++) {
      const box = await berlinToggleBtns.nth(i).boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }

    // Section II summary disclosures
    await page.locator('.berlin-toggle-btn[data-side="ambas"]').click();
    await page.waitForTimeout(150);

    const summaries = page.locator('.berlin-card__summary');
    for (let i = 0; i < await summaries.count(); i++) {
      const box = await summaries.nth(i).boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }

    // Section VI dialogue mobile tabs
    const tabBtns = page.locator('.dialogue-tab-btn');
    for (let i = 0; i < await tabBtns.count(); i++) {
      const box = await tabBtns.nth(i).boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ADV-3.6: COGNITIVE AFFORDANCES, ARIA SEMANTICS & BILINGUAL INTEGRITY
  // ═══════════════════════════════════════════════════════════════════════════
  test('ADV-3.6: Cognitive cues, aria attributes and bilingual translation engine retain full integrity', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Ensure deterministic language testing by explicitly setting Spanish first
    await page.evaluate(() => {
      if (typeof window.setLanguage === 'function') window.setLanguage('es');
    });
    await page.waitForTimeout(200);

    // 1. Check Section II hint presence and aria-live attribute in Spanish
    const hint = page.locator('#berlinHint');
    await expect(hint).toBeVisible();
    expect(await hint.getAttribute('aria-live')).toBe('polite');
    const hintEsText = await hint.innerText();
    expect(hintEsText).toContain('Alterna entre conceptos');

    // 2. Check Conflict slider qualitative aria-valuetext
    const slider = page.locator('#conflictSlider');
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const initialAriaValueText = await slider.getAttribute('aria-valuetext');
    expect(initialAriaValueText).toBeTruthy();
    expect(initialAriaValueText).toContain('%');

    // Change slider value
    await slider.fill('25');
    await slider.dispatchEvent('input');
    await page.waitForTimeout(100);
    const updatedAriaValueText = await slider.getAttribute('aria-valuetext');
    expect(updatedAriaValueText).toContain('25%');

    // 3. Check Section VII Sen non-color indicators (WCAG 1.4.1)
    const senSection = page.locator('#sen');
    await senSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const capBtns = page.locator('.sen-cap-btn');
    expect(await capBtns.count()).toBeGreaterThan(0);
    const statusIndicator = page.locator('.sen-cap-btn .sen-cap-btn__status').first();
    await expect(statusIndicator).toBeAttached();

    // 4. Test Bilingual Toggle (ES -> EN -> ES)
    const langBtn = page.locator('#langToggleBtn');
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(300);

      // Verify hint translated to English
      const hintEnText = await hint.innerText();
      expect(hintEnText).toContain('Toggle between concepts');

      // Verify Section VI tab buttons translated
      const defenseTabEn = page.locator('.dialogue-tab-btn[data-perspective="defense"]');
      expect(await defenseTabEn.innerText()).toContain('The Liberal Argument');

      // Switch back to Spanish
      await langBtn.click();
      await page.waitForTimeout(300);
      expect(await hint.innerText()).toContain('Alterna entre conceptos');
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ADV-3.7: DESKTOP REGRESSION DEFENSE (1280x800 & 1920x1080)
  // ═══════════════════════════════════════════════════════════════════════════
  const DESKTOP_VIEWPORTS = [
    { name: 'Standard Desktop (1280x800)', width: 1280, height: 800 },
    { name: 'Full HD Desktop (1920x1080)', width: 1920, height: 1080 }
  ];

  for (const vp of DESKTOP_VIEWPORTS) {
    test(`ADV-3.7 [${vp.name}]: Strict desktop invariance (mobile summaries and tabs remain hidden)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      // 1. Summary elements must be strictly hidden on desktop
      const summaries = page.locator('.berlin-card__summary');
      const summaryCount = await summaries.count();
      for (let i = 0; i < summaryCount; i++) {
        await expect(summaries.nth(i)).toBeHidden();
        const display = await summaries.nth(i).evaluate(el => window.getComputedStyle(el).display);
        expect(display).toBe('none');
      }

      // Disclosures must be open on desktop
      const disclosures = page.locator('.berlin-card__disclosure');
      for (let i = 0; i < await disclosures.count(); i++) {
        expect(await disclosures.nth(i).evaluate(el => el.hasAttribute('open'))).toBe(true);
      }

      // 2. Section VI mobile tabs must be strictly hidden on desktop
      const mobileTabs = page.locator('.dialogue-mobile-tabs');
      await expect(mobileTabs).toBeHidden();
      const tabsDisplay = await mobileTabs.evaluate(el => window.getComputedStyle(el).display);
      expect(tabsDisplay).toBe('none');

      // Both dialogue columns must be simultaneously visible side-by-side
      const defCol = page.locator('#dialogueColDefense');
      const critCol = page.locator('#dialogueColCritique');
      await expect(defCol).toBeVisible();
      await expect(critCol).toBeVisible();

      // 3. Mobile hints must be strictly hidden
      await expect(page.locator('#berlinHint')).toBeHidden();
      await expect(page.locator('.slider-mobile-hint')).toBeHidden();
      await expect(page.locator('.lens-wheel__handle')).toBeHidden();
    });
  }

});
