const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const MOBILE_VIEWPORTS = [
  { name: 'Mobile XS (320px)', width: 320, height: 568 },
  { name: 'iPhone SE (375px)', width: 375, height: 667 },
  { name: 'iPhone 14 (390px)', width: 390, height: 844 },
  { name: 'Android Flagship (412px)', width: 412, height: 915 }
];

test.describe('Tufte Mobile Conflict Interaction & Spatial Proximity Suite', () => {

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

      test('Unified Card Proportions, Zero Horizontal Overflow & Compact Height', async ({ page }) => {
        // Scroll to Section III
        await page.locator('#conflicto').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const metrics = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const bodyScrollWidth = document.body.scrollWidth;

          const card = document.querySelector('#conflictInteractiveCard');
          const cardRect = card.getBoundingClientRect();

          const slider = document.querySelector('#conflictSlider');
          const sliderRect = slider.getBoundingClientRect();

          const svg = document.querySelector('#conflictCurveSvg');
          const svgRect = svg.getBoundingClientRect();

          const reading = document.querySelector('.conflict-live-reading');
          const readingRect = reading.getBoundingClientRect();

          const bars = document.querySelector('.conflict-bars-grid');
          const barsRect = bars.getBoundingClientRect();

          const disclaimer = document.querySelector('#conflictModelDisclaimer');
          const disclaimerRect = disclaimer.getBoundingClientRect();
          const disclaimerFontSize = parseFloat(window.getComputedStyle(disclaimer).fontSize);

          return {
            docWidth,
            bodyScrollWidth,
            cardHeight: cardRect.height,
            sliderToSvgGap: svgRect.top - sliderRect.bottom,
            svgToReadingGap: readingRect.top - svgRect.bottom,
            readingToBarsGap: barsRect.top - readingRect.bottom,
            disclaimerHeight: disclaimerRect.height,
            disclaimerFontSize
          };
        });

        // 1. Zero horizontal overflow
        expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.docWidth + 1);

        // 2. Tufte spatial proximity: slider is directly above curve (< 45px gap)
        expect(metrics.sliderToSvgGap).toBeLessThanOrEqual(45);

        // 3. Dynamic reading is immediately below curve (< 25px gap)
        expect(metrics.svgToReadingGap).toBeLessThanOrEqual(25);

        // 4. Compact card height fits within mobile viewport budget (< 900px)
        expect(metrics.cardHeight).toBeLessThanOrEqual(900);

        // 5. Compact disclaimer is a micro-footnote (font size <= 12px, compact height <= 95px on 320px screens)
        expect(metrics.disclaimerFontSize).toBeLessThanOrEqual(12);
        expect(metrics.disclaimerHeight).toBeLessThanOrEqual(95);
      });

      test('Dynamic Lens Reactivity: switching lens updates badge, curve, and reading in-place', async ({ page }) => {
        await page.locator('#conflicto').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Switch to Positiva using setLens via page evaluation
        await page.evaluate(() => {
          window.setLens('positiva');
        });
        await page.waitForTimeout(150);

        const readingData = await page.evaluate(() => {
          const name = document.querySelector('#conflictLensName').textContent;
          const text = document.querySelector('#conflictLensText').textContent;
          const dotColor = window.getComputedStyle(document.querySelector('#conflictLensDot')).backgroundColor;
          return { name, text, dotColor };
        });

        expect(readingData.name).toBe('Libertad Positiva');
        expect(readingData.text).toContain('Sacrificar algo de libertad negativa');
        expect(readingData.dotColor).toBe('rgb(255, 122, 53)');

        // Switch to Capacidades
        await page.evaluate(() => {
          window.setLens('capacidades');
        });
        await page.waitForTimeout(150);

        const capData = await page.evaluate(() => {
          const name = document.querySelector('#conflictLensName').textContent;
          const text = document.querySelector('#conflictLensText').textContent;
          return { name, text };
        });

        expect(capData.name).toContain('Capacidades');
        expect(capData.text).toContain('capacidades');
      });

      test('Dynamic Slider Reactivity: slider updates values and trade-off note in-place', async ({ page }) => {
        await page.locator('#conflicto').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        await page.evaluate(() => {
          window.updateConflictSlider(85);
        });
        await page.waitForTimeout(150);

        const sliderData = await page.evaluate(() => {
          const negVal = document.querySelector('#lossValNeg').textContent;
          const eqVal = document.querySelector('#lossValEq').textContent;
          const note = document.querySelector('#conflictNote').textContent;
          return { negVal, eqVal, note };
        });

        expect(sliderData.negVal).toBe('15%');
        expect(sliderData.eqVal).toBe('85%');
        expect(sliderData.note).toContain('Libertad negativa máxima');
      });

      test('High Contrast of Loss Bar Labels and Values (WCAG AA Compliance)', async ({ page }) => {
        await page.locator('#conflicto').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const contrastData = await page.evaluate(() => {
          const label = document.querySelector('.loss-row__label');
          const val = document.querySelector('.loss-row__val');
          const labelStyle = window.getComputedStyle(label);
          const valStyle = window.getComputedStyle(val);
          return {
            labelColor: labelStyle.color,
            valColor: valStyle.color,
            labelWeight: labelStyle.fontWeight,
            valWeight: valStyle.fontWeight
          };
        });

        // Ensure text is not transparent or hidden and has strong weight
        expect(contrastData.labelColor).not.toBe('transparent');
        expect(contrastData.valColor).not.toBe('transparent');
        expect(parseInt(contrastData.labelWeight, 10)).toBeGreaterThanOrEqual(500);
        expect(parseInt(contrastData.valWeight, 10)).toBeGreaterThanOrEqual(600);
      });
    });
  }
});
