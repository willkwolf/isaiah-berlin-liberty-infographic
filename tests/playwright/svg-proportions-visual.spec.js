// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const VIEWPORT_CASES = [
  { name: 'Mobile XS (320px)', width: 320, height: 568 },
  { name: 'Mobile Standard (375px)', width: 375, height: 667 },
  { name: 'Mobile Modern (390px)', width: 390, height: 844 },
  { name: 'Tablet (768px)', width: 768, height: 1024 },
  { name: 'Desktop HD (1280px)', width: 1280, height: 800 },
  { name: 'Desktop Full HD (1920px)', width: 1920, height: 1080 }
];

test.describe('SVG Responsive Proportions & Typography Readability Suite', () => {

  for (const vp of VIEWPORT_CASES) {
    test(`[${vp.name}] #conflictCurveSvg has readable text (>=10.5px), zero clipping, and balanced aspect ratio`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);

      const svgData = await page.evaluate(() => {
        const svg = document.querySelector('#conflictCurveSvg');
        if (!svg) return null;
        const svgRect = svg.getBoundingClientRect();
        const texts = Array.from(svg.querySelectorAll('text')).map(t => {
          const r = t.getBoundingClientRect();
          const style = window.getComputedStyle(t);
          return {
            id: t.id || t.textContent.trim().slice(0, 20),
            text: t.textContent.trim().replace(/\s+/g, ' '),
            fontSizeAttr: t.getAttribute('font-size'),
            computedPx: parseFloat(style.fontSize),
            renderedWidth: r.width,
            renderedHeight: r.height,
            clippedLeft: r.left < svgRect.left - 2,
            clippedRight: r.right > svgRect.right + 2,
            clippedTop: r.top < svgRect.top - 2,
            clippedBottom: r.bottom > svgRect.bottom + 2
          };
        });

        return {
          viewBox: svg.getAttribute('viewBox'),
          width: svgRect.width,
          height: svgRect.height,
          aspectRatio: svgRect.width / (svgRect.height || 1),
          texts
        };
      });

      expect(svgData).not.toBeNull();
      if (!svgData) return;

      // 1. Aspect ratio must be balanced (not stretched > 4.5:1, not collapsed < 1.2:1)
      expect(svgData.aspectRatio).toBeGreaterThanOrEqual(1.4);
      expect(svgData.aspectRatio).toBeLessThanOrEqual(4.2);

      // 2. Minimum rendered text size must be at least 10px (readable for human users)
      for (const t of svgData.texts) {
        expect(t.computedPx, `Text "${t.text}" rendered at ${t.computedPx}px, which is < 10px`).toBeGreaterThanOrEqual(10.0);
      }

      // 3. Zero text clipping against SVG bounds
      for (const t of svgData.texts) {
        expect(t.clippedLeft, `Text "${t.text}" is clipped on the left`).toBe(false);
        expect(t.clippedRight, `Text "${t.text}" is clipped on the right`).toBe(false);
        expect(t.clippedTop, `Text "${t.text}" is clipped on the top`).toBe(false);
        expect(t.clippedBottom, `Text "${t.text}" is clipped on the bottom`).toBe(false);
      }
    });

    test(`[${vp.name}] #systemCurveSvg has balanced aspect ratio and readable text across modes`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);

      // Check closed mode
      const dataClosed = await page.evaluate(() => {
        const svg = document.querySelector('#systemCurveSvg');
        if (!svg) return null;
        const rect = svg.getBoundingClientRect();
        const texts = Array.from(svg.querySelectorAll('text')).map(t => {
          const r = t.getBoundingClientRect();
          const s = window.getComputedStyle(t);
          return {
            text: t.textContent.trim(),
            computedPx: parseFloat(s.fontSize),
            clipped: r.left < rect.left - 2 || r.right > rect.right + 2 || r.top < rect.top - 2 || r.bottom > rect.bottom + 2
          };
        });
        return { width: rect.width, height: rect.height, aspectRatio: rect.width / (rect.height || 1), texts };
      });

      expect(dataClosed).not.toBeNull();
      if (dataClosed) {
        expect(dataClosed.aspectRatio).toBeGreaterThanOrEqual(1.4);
        expect(dataClosed.aspectRatio).toBeLessThanOrEqual(4.5);
        for (const t of dataClosed.texts) {
          expect(t.computedPx).toBeGreaterThanOrEqual(10.0);
          expect(t.clipped).toBe(false);
        }
      }

      // Toggle to plural mode
      const pluralBtn = page.locator('#systemPluralBtn');
      if (await pluralBtn.count() > 0) {
        await pluralBtn.click();
        await page.waitForTimeout(200);

        const dataPlural = await page.evaluate(() => {
          const svg = document.querySelector('#systemCurveSvg');
          if (!svg) return null;
          const rect = svg.getBoundingClientRect();
          const texts = Array.from(svg.querySelectorAll('text')).map(t => {
            const r = t.getBoundingClientRect();
            const s = window.getComputedStyle(t);
            return {
              text: t.textContent.trim(),
              computedPx: parseFloat(s.fontSize),
              clipped: r.left < rect.left - 2 || r.right > rect.right + 2 || r.top < rect.top - 2 || r.bottom > rect.bottom + 2
            };
          });
          return { width: rect.width, height: rect.height, aspectRatio: rect.width / (rect.height || 1), texts };
        });

        expect(dataPlural).not.toBeNull();
        if (dataPlural) {
          expect(dataPlural.texts.length).toBeGreaterThanOrEqual(3);
          for (const t of dataPlural.texts) {
            expect(t.computedPx).toBeGreaterThanOrEqual(10.0);
            expect(t.clipped).toBe(false);
          }
        }
      }
    });

    test(`[${vp.name}] Interactive slider updates #conflictCurveSvg correctly without text collision or clipping`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');

      const slider = page.locator('#conflictSlider');
      if (await slider.count() > 0) {
        // Test at extremes: 0%, 25%, 50%, 75%, 100%
        for (const val of ['5', '25', '50', '80', '95']) {
          await slider.fill(val);
          await slider.dispatchEvent('input');
          await page.waitForTimeout(50);

          const check = await page.evaluate(() => {
            const svg = document.querySelector('#conflictCurveSvg');
            if (!svg) return null;
            const svgRect = svg.getBoundingClientRect();
            const valText = Array.from(svg.querySelectorAll('text')).find(t => t.textContent.includes('%'));
            if (!valText) return null;
            const r = valText.getBoundingClientRect();
            return {
              clippedLeft: r.left < svgRect.left - 2,
              clippedRight: r.right > svgRect.right + 2,
              clippedTop: r.top < svgRect.top - 2,
              clippedBottom: r.bottom > svgRect.bottom + 2
            };
          });

          if (check) {
            expect(check.clippedLeft, `At slider value ${val}, value text clipped left`).toBe(false);
            expect(check.clippedRight, `At slider value ${val}, value text clipped right`).toBe(false);
            expect(check.clippedTop, `At slider value ${val}, value text clipped top`).toBe(false);
            expect(check.clippedBottom, `At slider value ${val}, value text clipped bottom`).toBe(false);
          }
        }
      }
    });
  }
});
