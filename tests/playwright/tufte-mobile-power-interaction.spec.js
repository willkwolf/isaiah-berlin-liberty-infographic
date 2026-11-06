const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const MOBILE_VIEWPORTS = [
  { name: 'Mobile XS (320px)', width: 320, height: 568 },
  { name: 'iPhone SE (375px)', width: 375, height: 667 },
  { name: 'iPhone 14 (390px)', width: 390, height: 844 },
  { name: 'Android Flagship (412px)', width: 412, height: 915 }
];

test.describe('Tufte Mobile Power Interaction & Spatial Proximity Suite (Section IV)', () => {

  for (const vp of MOBILE_VIEWPORTS) {
    test.describe(`Viewport: ${vp.name}`, () => {

      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(150);
        // Force Spanish language deterministically for assertions
        await page.evaluate(() => {
          if (window.setLanguage) window.setLanguage('es');
        });
        await page.waitForTimeout(150);
      });

      test('Unified Card Proportions, Zero Horizontal Overflow & Spatial Proximity', async ({ page }) => {
        // Scroll to Section IV
        await page.locator('#poder').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const metrics = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const bodyScrollWidth = document.body.scrollWidth;

          const card = document.querySelector('.power-card');
          const cardRect = card.getBoundingClientRect();

          const svg = document.querySelector('#powerDiagram');
          const svgRect = svg.getBoundingClientRect();

          const reading = document.querySelector('.power-live-reading');
          const readingRect = reading.getBoundingClientRect();

          return {
            docWidth,
            bodyScrollWidth,
            cardHeight: cardRect.height,
            svgToCardGap: cardRect.top - svgRect.bottom,
            readingHeight: readingRect.height
          };
        });

        // 1. Zero horizontal overflow
        expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.docWidth + 1);

        // 2. Spatial proximity: Diagram and Card sit within tight budget (< 50px gap)
        expect(metrics.svgToCardGap).toBeLessThanOrEqual(50);

        // 3. Reading is visible and populated
        expect(metrics.readingHeight).toBeGreaterThan(30);
      });

      test('In-Place Node Touch: tapping Sociedad & Estado updates details without navigation', async ({ page }) => {
        await page.locator('#poder').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Tap Sociedad node
        await page.locator('.power-node[data-node="sociedad"]').click();
        await page.waitForTimeout(150);

        const sociedadText = await page.locator('#powerNodeDetails').innerText();
        expect(sociedadText).toContain('Sociedad');
        expect(sociedadText).toContain('norma social');

        // Verify live reading remains visible in same card
        const readingVisible = await page.locator('.power-live-reading').isVisible();
        expect(readingVisible).toBe(true);

        // Tap Estado node
        await page.locator('.power-node[data-node="estado"]').click();
        await page.waitForTimeout(150);

        const estadoText = await page.locator('#powerNodeDetails').innerText();
        expect(estadoText).toContain('Estado');
        expect(estadoText).toContain('Monopolio legítimo');
      });

      test('In-Place Lens Reactivity: changing lens chips updates badge and reading in-place', async ({ page }) => {
        await page.locator('#poder').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Switch to Positiva
        await page.evaluate(() => {
          window.setLens('positiva');
        });
        await page.waitForTimeout(150);

        expect(await page.locator('#powerLensName').innerText()).toBe('Libertad Positiva');
        expect(await page.locator('#poderLensText').innerText()).toContain('El Estado no solo restringe: habilita');

        // Switch to Capacidades
        await page.evaluate(() => {
          window.setLens('capacidades');
        });
        await page.waitForTimeout(150);

        expect(await page.locator('#powerLensName').innerText()).toBe('Enfoque de Capacidades');
        expect(await page.locator('#poderLensText').innerText()).toContain('privación de capacidades');

        // Switch to Libertario
        await page.evaluate(() => {
          window.setLens('libertario');
        });
        await page.waitForTimeout(150);

        expect(await page.locator('#powerLensName').innerText()).toBe('Económico-Libertario');
        expect((await page.locator('#poderLensText').innerText()).length).toBeGreaterThan(15);
      });
    });
  }
});
