const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const VIEWPORTS = [
  { name: 'Mobile XS (320px)', width: 320, height: 568, isMobile: true },
  { name: 'Mobile Standard (375px)', width: 375, height: 667, isMobile: true },
  { name: 'Mobile Modern (390px)', width: 390, height: 844, isMobile: true },
  { name: 'Tablet (768px)', width: 768, height: 1024, isMobile: true },
  { name: 'Desktop HD (1280px)', width: 1280, height: 720, isMobile: false },
  { name: 'Desktop Full HD (1920px)', width: 1920, height: 1080, isMobile: false }
];

test.describe('Multi-Device Responsive, Contrast & Theme Audit Suite', () => {

  for (const vp of VIEWPORTS) {
    test.describe(`Viewport: ${vp.name}`, () => {

      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(200);
      });

      test('Component proportions, bounding boxes & zero horizontal overflow', async ({ page }) => {
        const metrics = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const bodyScrollWidth = document.body.scrollWidth;

          // 1. Republican callout
          const rep = document.querySelector('.berlin-republican-callout');
          const repRect = rep ? rep.getBoundingClientRect() : null;
          const repTitle = rep ? rep.querySelector('.republican-title') : null;
          const repTitleSize = repTitle ? parseFloat(window.getComputedStyle(repTitle).fontSize) : 0;

          // 2. Conflict disclaimer
          const conflictDisc = document.querySelector('#conflictModelDisclaimer');
          const conflictDiscRect = conflictDisc ? conflictDisc.getBoundingClientRect() : null;
          const conflictDiscSize = conflictDisc ? parseFloat(window.getComputedStyle(conflictDisc).fontSize) : 0;

          // 3. Sen conversion box & cards
          const senBox = document.querySelector('.sen-conversion-box');
          const senBoxRect = senBox ? senBox.getBoundingClientRect() : null;
          const senGrid = document.querySelector('.sen-conversion-grid');
          const senCards = Array.from(document.querySelectorAll('.sen-conv-card')).map(card => {
            const r = card.getBoundingClientRect();
            return { width: r.width, height: r.height, left: r.left, right: r.right };
          });

          // 4. Cierre dual epigraph (Montaigne & Popper)
          const dual = document.querySelector('.cierre-dual-epigraph');
          const dualRect = dual ? dual.getBoundingClientRect() : null;

          return {
            docWidth,
            bodyScrollWidth,
            hasHorizontalScroll: bodyScrollWidth > docWidth + 1,
            repRect: repRect ? { left: repRect.left, right: repRect.right, width: repRect.width } : null,
            repTitleSize,
            conflictDiscRect: conflictDiscRect ? { left: conflictDiscRect.left, right: conflictDiscRect.right } : null,
            conflictDiscSize,
            senBoxRect: senBoxRect ? { left: senBoxRect.left, right: senBoxRect.right, width: senBoxRect.width } : null,
            senCardsCount: senCards.length,
            senCards,
            dualRect: dualRect ? { left: dualRect.left, right: dualRect.right, width: dualRect.width } : null
          };
        });

        // Zero page-level horizontal overflow
        expect(metrics.hasHorizontalScroll, `Horizontal scroll detected on ${vp.name}`).toBe(false);

        // Republican Callout
        expect(metrics.repRect).not.toBeNull();
        expect(metrics.repRect.left).toBeGreaterThanOrEqual(0);
        expect(metrics.repRect.right).toBeLessThanOrEqual(vp.width + 2);
        expect(metrics.repTitleSize).toBeGreaterThanOrEqual(14);

        // Conflict Disclaimer
        expect(metrics.conflictDiscRect).not.toBeNull();
        expect(metrics.conflictDiscRect.left).toBeGreaterThanOrEqual(0);
        expect(metrics.conflictDiscRect.right).toBeLessThanOrEqual(vp.width + 2);
        expect(metrics.conflictDiscSize).toBeGreaterThanOrEqual(12);

        // Sen Conversion Box & Grid
        expect(metrics.senBoxRect).not.toBeNull();
        expect(metrics.senBoxRect.left).toBeGreaterThanOrEqual(0);
        expect(metrics.senBoxRect.right).toBeLessThanOrEqual(vp.width + 2);
        expect(metrics.senCardsCount).toBe(3);

        for (const card of metrics.senCards) {
          expect(card.left).toBeGreaterThanOrEqual(0);
          expect(card.right).toBeLessThanOrEqual(vp.width + 2);
        }

        // Cierre Dual Epigraph
        expect(metrics.dualRect).not.toBeNull();
        expect(metrics.dualRect.left).toBeGreaterThanOrEqual(0);
        expect(metrics.dualRect.right).toBeLessThanOrEqual(vp.width + 2);
      });

      test('Responsive grid adapts columns appropriately (1 col on mobile, 3 cols on desktop)', async ({ page }) => {
        const gridColumns = await page.evaluate(() => {
          const grid = document.querySelector('.sen-conversion-grid');
          if (!grid) return null;
          const style = window.getComputedStyle(grid);
          return style.gridTemplateColumns.split(' ').length;
        });

        expect(gridColumns).not.toBeNull();
        if (vp.width <= 768) {
          expect(gridColumns, `Expected 1 column on mobile (${vp.name})`).toBe(1);
        } else {
          expect(gridColumns, `Expected 3 columns on desktop (${vp.name})`).toBe(3);
        }

        const dualColumns = await page.evaluate(() => {
          const grid = document.querySelector('.cierre-dual-epigraph');
          if (!grid) return null;
          const style = window.getComputedStyle(grid);
          return style.gridTemplateColumns.split(' ').length;
        });
        expect(dualColumns).not.toBeNull();
        if (vp.width <= 768) {
          expect(dualColumns, `Expected 1 column on mobile (${vp.name})`).toBe(1);
        } else {
          expect(dualColumns, `Expected 2 columns on desktop (${vp.name})`).toBe(2);
        }
      });

      test('Light mode and Dark mode apply correct theme contrasts without clipping', async ({ page }) => {
        // Explicitly activate Light Mode
        await page.evaluate(() => {
          if (typeof setColorMode === 'function') {
            setColorMode('light', { manual: true });
          }
        });
        await page.waitForTimeout(100);

        const lightModeData = await page.evaluate(() => {
          const isLight = document.body.classList.contains('light-mode');
          function getRgb(el) {
            if (!el) return null;
            const color = window.getComputedStyle(el).color;
            const match = color.match(/\d+/g);
            return match ? match.slice(0, 3).map(Number) : null;
          }

          return {
            isLight,
            repTitleRgb: getRgb(document.querySelector('.republican-title')),
            repDescRgb: getRgb(document.querySelector('.republican-desc')),
            senTitleRgb: getRgb(document.querySelector('.sen-conversion-title')),
            senDescRgb: getRgb(document.querySelector('.sen-conversion-desc')),
            conflictDiscRgb: getRgb(document.querySelector('#conflictModelDisclaimer'))
          };
        });

        expect(lightModeData.isLight).toBe(true);
        const avg = rgb => rgb ? (rgb[0] + rgb[1] + rgb[2]) / 3 : 255;
        // In light mode, text must be dark (average RGB < 120)
        expect(avg(lightModeData.repTitleRgb)).toBeLessThan(100);
        expect(avg(lightModeData.repDescRgb)).toBeLessThan(110);
        expect(avg(lightModeData.senTitleRgb)).toBeLessThan(100);
        expect(avg(lightModeData.senDescRgb)).toBeLessThan(110);
        expect(avg(lightModeData.conflictDiscRgb)).toBeLessThan(120);

        // Explicitly activate Dark Mode
        await page.evaluate(() => {
          if (typeof setColorMode === 'function') {
            setColorMode('dark', { manual: true });
          }
        });
        await page.waitForTimeout(100);

        const darkModeData = await page.evaluate(() => {
          const isDark = !document.body.classList.contains('light-mode');
          function getRgb(el) {
            if (!el) return null;
            const color = window.getComputedStyle(el).color;
            const match = color.match(/\d+/g);
            return match ? match.slice(0, 3).map(Number) : null;
          }

          return {
            isDark,
            repTitleRgb: getRgb(document.querySelector('.republican-title')),
            repDescRgb: getRgb(document.querySelector('.republican-desc')),
            senTitleRgb: getRgb(document.querySelector('.sen-conversion-title')),
            senDescRgb: getRgb(document.querySelector('.sen-conversion-desc'))
          };
        });

        expect(darkModeData.isDark).toBe(true);
        // In dark mode, text must be bright (average RGB > 180)
        expect(avg(darkModeData.repTitleRgb)).toBeGreaterThan(180);
        expect(avg(darkModeData.repDescRgb)).toBeGreaterThan(180);
        expect(avg(darkModeData.senTitleRgb)).toBeGreaterThan(180);
        expect(avg(darkModeData.senDescRgb)).toBeGreaterThan(180);
      });

      test('Bilingual i18n switch dynamically updates new components in-place', async ({ page }) => {
        const enBtn = page.locator('.language-btn[data-lang="en"]');
        const esBtn = page.locator('.language-btn[data-lang="es"]');

        if (await enBtn.count() > 0) {
          // Switch to English
          await enBtn.click();
          await page.waitForTimeout(150);

          const enTexts = await page.evaluate(() => ({
            repTitle: document.querySelector('#republicanTitle')?.textContent,
            senTitle: document.querySelector('#senConversionTitle')?.textContent,
            conflictDisc: document.querySelector('#conflictModelDisclaimer')?.textContent,
            colombiaSub: document.querySelector('#colombiaSubtitle')?.textContent
          }));

          expect(enTexts.repTitle).toContain('Republican Liberty');
          expect(enTexts.senTitle).toContain("Sen's Three Conversion Factors");
          expect(enTexts.conflictDisc).toContain('Epistemological notice');
          expect(enTexts.colombiaSub).toContain('The same data');

          // Switch back to Spanish
          await esBtn.click();
          await page.waitForTimeout(150);

          const esTexts = await page.evaluate(() => ({
            repTitle: document.querySelector('#republicanTitle')?.textContent,
            senTitle: document.querySelector('#senConversionTitle')?.textContent,
            conflictDisc: document.querySelector('#conflictModelDisclaimer')?.textContent
          }));

          expect(esTexts.repTitle).toContain('Libertad Republicana');
          expect(esTexts.senTitle).toContain('Los Tres Factores de Conversión');
          expect(esTexts.conflictDisc).toContain('Nota epistemológica');
        }
      });

    });
  }
});
