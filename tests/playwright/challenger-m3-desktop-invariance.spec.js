// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const DESKTOP_VIEWPORTS = [
  { name: 'Desktop 1280x800', width: 1280, height: 800 },
  { name: 'Standard Laptop 1366x768', width: 1366, height: 768 },
  { name: 'Desktop Full HD 1920x1080', width: 1920, height: 1080 },
  { name: 'Desktop Breakpoint Boundary 769x800', width: 769, height: 800 }
];

test.describe('Challenger M3-2: Strict Desktop Invariance & Regression Verification', () => {

  for (const vp of DESKTOP_VIEWPORTS) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {

      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
      });

      test('Requirement 1: Mobile-specific controls are completely invisible (display: none)', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        // 1. All disclosure summaries (.berlin-card__summary) must have display: none
        const summaries = page.locator('.berlin-card__summary');
        const summaryCount = await summaries.count();
        expect(summaryCount).toBeGreaterThan(0);
        for (let i = 0; i < summaryCount; i++) {
          const display = await summaries.nth(i).evaluate(el => window.getComputedStyle(el).display);
          expect(display).toBe('none');
          await expect(summaries.nth(i)).toBeHidden();
        }

        // 2. Mobile tabs in Section VI (.dialogue-mobile-tabs) must have display: none
        const dialogueTabs = page.locator('.dialogue-mobile-tabs');
        if (await dialogueTabs.count() > 0) {
          const display = await dialogueTabs.evaluate(el => window.getComputedStyle(el).display);
          expect(display).toBe('none');
          await expect(dialogueTabs).toBeHidden();
        }

        // 3. Mobile drag handle (.lens-wheel__handle) must have display: none
        const dragHandles = page.locator('.lens-wheel__handle');
        const handleCount = await dragHandles.count();
        if (handleCount > 0) {
          for (let i = 0; i < handleCount; i++) {
            const display = await dragHandles.nth(i).evaluate(el => window.getComputedStyle(el).display);
            expect(display).toBe('none');
            await expect(dragHandles.nth(i)).toBeHidden();
          }
        }

        // 4. Slider mobile hint (.slider-mobile-hint) must have display: none
        const sliderHints = page.locator('.slider-mobile-hint');
        if (await sliderHints.count() > 0) {
          const display = await sliderHints.evaluate(el => window.getComputedStyle(el).display);
          expect(display).toBe('none');
          await expect(sliderHints).toBeHidden();
        }

        // 5. Berlin mobile hint (.berlin-hint) must have display: none
        const berlinHints = page.locator('.berlin-hint');
        if (await berlinHints.count() > 0) {
          const display = await berlinHints.evaluate(el => window.getComputedStyle(el).display);
          expect(display).toBe('none');
          await expect(berlinHints).toBeHidden();
        }
      });

      test('Requirement 2A: Section II renders both cards side-by-side with examples 100% open', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const berlinSection = page.locator('#berlin');
        await berlinSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const cardNeg = page.locator('#berlinNeg');
        const cardPos = page.locator('#berlinPos');

        await expect(cardNeg).toBeVisible();
        await expect(cardPos).toBeVisible();

        const boxNeg = await cardNeg.boundingBox();
        const boxPos = await cardPos.boundingBox();

        expect(boxNeg).not.toBeNull();
        expect(boxPos).not.toBeNull();

        if (boxNeg && boxPos) {
          // Both cards render side-by-side horizontally: Neg on left, Pos on right
          expect(boxNeg.x + boxNeg.width).toBeLessThanOrEqual(boxPos.x + 10);
          // Top alignment within reasonable layout tolerance (< 15px)
          expect(Math.abs(boxNeg.y - boxPos.y)).toBeLessThan(15);
        }

        // Verify disclosures are open
        const disclosures = page.locator('#berlinSplit .berlin-card__disclosure');
        const count = await disclosures.count();
        expect(count).toBe(2);

        for (let i = 0; i < count; i++) {
          const isOpen = await disclosures.nth(i).evaluate(el => el.hasAttribute('open'));
          expect(isOpen).toBe(true);

          // Verify example lists inside disclosures are visible and expanded
          const exampleList = disclosures.nth(i).locator('.berlin-card__examples');
          await expect(exampleList).toBeVisible();
          const listHeight = await exampleList.evaluate(el => el.getBoundingClientRect().height);
          expect(listHeight).toBeGreaterThan(100);
        }

        // Verify all 6 dilemma items are visible and readable
        const examples = page.locator('#berlinSplit .berlin-example');
        expect(await examples.count()).toBe(6);
        for (let i = 0; i < 6; i++) {
          await expect(examples.nth(i)).toBeVisible();
        }
      });

      test('Requirement 2B: Section VI renders both debate columns side-by-side', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const econSection = page.locator('#economia');
        await econSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const grid = page.locator('#economia .dialogue-grid');
        await expect(grid).toBeVisible();

        const colDefense = page.locator('#dialogueColDefense');
        const colCritique = page.locator('#dialogueColCritique');

        await expect(colDefense).toBeVisible();
        await expect(colCritique).toBeVisible();

        const boxDef = await colDefense.boundingBox();
        const boxCrit = await colCritique.boundingBox();

        expect(boxDef).not.toBeNull();
        expect(boxCrit).not.toBeNull();

        if (boxDef && boxCrit) {
          // Defense on left, Critique on right
          expect(boxDef.x + boxDef.width).toBeLessThanOrEqual(boxCrit.x + 10);
          // Top alignment within reasonable tolerance
          expect(Math.abs(boxDef.y - boxCrit.y)).toBeLessThan(15);
        }

        // Verify CSS grid-template-columns has 2 columns
        const gridColumns = await grid.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
        const colTracks = gridColumns.trim().split(/\s+/);
        expect(colTracks.length).toBe(2);

        // Verify all 6 debate cards (3 in defense, 3 in critique) are visible
        const cards = grid.locator('.dialogue-card');
        expect(await cards.count()).toBe(6);
        for (let i = 0; i < 6; i++) {
          await expect(cards.nth(i)).toBeVisible();
        }
      });

      test('Adversarial Interaction: Comparison toggle and viewport resize maintain 100% open state', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const berlinSection = page.locator('#berlin');
        await berlinSection.scrollIntoViewIfNeeded();

        // Click Negativa toggle button
        const btnNeg = page.locator('.berlin-toggle-btn[data-side="negativa"]');
        await btnNeg.click();
        await page.waitForTimeout(200);

        // Click Ambas (Comparar) toggle button
        const btnAmbas = page.locator('.berlin-toggle-btn[data-side="ambas"]');
        await btnAmbas.click();
        await page.waitForTimeout(200);

        // Both cards must be visible and both disclosures must still be open
        const disclosures = page.locator('#berlinSplit .berlin-card__disclosure');
        expect(await disclosures.nth(0).evaluate(el => el.hasAttribute('open'))).toBe(true);
        expect(await disclosures.nth(1).evaluate(el => el.hasAttribute('open'))).toBe(true);

        // Simulate resize event within desktop range
        await page.setViewportSize({ width: vp.width - 20, height: vp.height });
        await page.evaluate(() => window.dispatchEvent(new Event('resize')));
        await page.waitForTimeout(200);

        // Must still remain 100% open
        expect(await disclosures.nth(0).evaluate(el => el.hasAttribute('open'))).toBe(true);
        expect(await disclosures.nth(1).evaluate(el => el.hasAttribute('open'))).toBe(true);
      });

    });
  }

});
