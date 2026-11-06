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
        // Force Spanish language and 'negativa' lens deterministically for assertions
        await page.evaluate(() => {
          if (window.setLanguage) window.setLanguage('es');
          if (window.setLens) window.setLens('negativa');
        });
        await page.waitForTimeout(150);
      });

      test('The Swap: Live Reading is DE FRENTE (on top), static details ABAJO (below), with full SVG size', async ({ page }) => {
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

          const details = document.querySelector('#powerNodeDetails');
          const detailsRect = details.getBoundingClientRect();

          return {
            docWidth,
            bodyScrollWidth,
            cardHeight: cardRect.height,
            svgWidth: svgRect.width,
            svgToCardGap: cardRect.top - svgRect.bottom,
            readingTop: readingRect.top,
            detailsTop: detailsRect.top
          };
        });

        // 1. Zero horizontal overflow
        expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.docWidth + 1);

        // 2. THE SWAP: Live reading is on top (de frente), static details are below
        expect(metrics.readingTop).toBeLessThan(metrics.detailsTop);

        // 3. SVG is not artificially shrunken
        expect(metrics.svgWidth).toBeGreaterThanOrEqual(280);

        // 4. Spatial proximity: Diagram and Card sit within comfortable budget
        expect(metrics.svgToCardGap).toBeLessThanOrEqual(50);
      });

      test('In-Place Node Touch: tapping Sociedad updates front reading for Sociedad and static details below', async ({ page }) => {
        await page.locator('#poder').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Tap Sociedad node
        await page.locator('.power-node[data-node="sociedad"]').click();
        await page.waitForTimeout(150);

        // Dynamic text in front updates to Sociedad analysis
        const frontText = await page.locator('#poderLensText').innerText();
        expect(frontText).toContain('Berlin');
        expect(frontText).toContain('normas informales');

        // Static details below update
        const detailsText = await page.locator('#powerNodeDetails').innerText();
        expect(detailsText).toContain('Sociedad');
        expect(detailsText).toContain('Coacción normativa-informal');

        // Tap Estado node
        await page.locator('.power-node[data-node="estado"]').click();
        await page.waitForTimeout(150);

        const frontTextEstado = await page.locator('#poderLensText').innerText();
        expect(frontTextEstado).toContain('El Estado posee el monopolio de la fuerza legal');
      });

      test('In-Place Lens Reactivity: changing lens chips updates front text immediately', async ({ page }) => {
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

      test('Dual interaction: switching chips while a node is active updates that node\'s front text', async ({ page }) => {
        await page.locator('#poder').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // 1. Select Sociedad node
        await page.locator('.power-node[data-node="sociedad"]').click();
        await page.waitForTimeout(150);

        // 2. Switch to Capacidades
        await page.evaluate(() => {
          window.setLens('capacidades');
        });
        await page.waitForTimeout(150);

        const frontText = await page.locator('#poderLensText').innerText();
        expect(frontText).toContain('Para Sen, las normas sociales, estigmas y exclusiones culturales');
        expect(await page.locator('#powerLensName').innerText()).toBe('Enfoque de Capacidades');
      });
    });
  }
});
