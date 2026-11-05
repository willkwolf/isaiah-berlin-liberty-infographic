const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const MOBILE_VIEWPORTS = [
  { name: 'iPhone SE (375x667)', width: 375, height: 667 },
  { name: 'iPhone 12/13/14 (390x844)', width: 390, height: 844 },
  { name: 'Android Compact (360x640)', width: 360, height: 640 }
];

test.describe('Horizontal Lens Wheel & Zero-Tap UX Suite', () => {
  for (const vp of MOBILE_VIEWPORTS) {
    test(`[${vp.name}] Zero-tap visible dock, horizontal scroll track, edge diffusion, and touch/tap cycling`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(FILE_URL);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);

      // Dismiss onboarding overlay if present
      const dismissBtn = page.locator('#heroOnboardingDismiss');
      if (await dismissBtn.isVisible()) {
        await dismissBtn.click();
        await page.waitForTimeout(150);
      }

      // 1. In #problema (non-reactive), panel is hidden
      const lensPanel = page.locator('#lensPanel');
      await expect(lensPanel).not.toHaveClass(/lens-panel--visible/);

      // 2. Scroll to reactive section #conflicto
      await page.evaluate(() => {
        document.getElementById('conflicto').scrollIntoView({ behavior: 'instant', block: 'center' });
      });
      await page.waitForTimeout(400);

      // 3. ZERO-TAP VERIFICATION: Panel is immediately visible without tapping any toggle
      await expect(lensPanel).toHaveClass(/lens-panel--visible/);
      const isPanelVisible = await lensPanel.isVisible();
      expect(isPanelVisible).toBe(true);

      // 4. Verify compact dock height (~52px, NOT tall vertical 132px-196px)
      const panelBox = await lensPanel.boundingBox();
      expect(panelBox).not.toBeNull();
      expect(panelBox.height).toBeLessThanOrEqual(60);
      expect(panelBox.height).toBeGreaterThanOrEqual(44);

      // 5. Horizontal Wheel structure & edge diffusion
      const wheel = page.locator('.lens-wheel');
      await expect(wheel).toBeVisible();

      // Check CSS horizontal scroll properties
      const track = page.locator('.lens-wheel__track');
      await expect(track).toBeVisible();

      const trackStyles = await track.evaluate(el => {
        const s = window.getComputedStyle(el);
        return {
          display: s.display,
          flexDirection: s.flexDirection,
          overflowX: s.overflowX,
          touchAction: s.touchAction,
          scrollSnapType: s.scrollSnapType
        };
      });

      expect(trackStyles.display).toBe('flex');
      expect(trackStyles.flexDirection).toBe('row');
      expect(['scroll', 'auto']).toContain(trackStyles.overflowX);
      expect(trackStyles.touchAction).toContain('pan-x');

      // 6. Verify default active lens ('positiva') is center-highlighted
      const activeItem = page.locator('.lens-wheel__item.is-center');
      await expect(activeItem).toBeVisible();
      await expect(activeItem).toHaveAttribute('data-lens', 'positiva');
      await expect(activeItem).toHaveAttribute('aria-selected', 'true');

      // 7. Verify edge fade diffusion masks exist
      const maskStyles = await wheel.evaluate(el => {
        const s = window.getComputedStyle(el);
        return {
          maskImage: s.maskImage || s.webkitMaskImage || ''
        };
      });
      expect(maskStyles.maskImage.length).toBeGreaterThan(0);

      // 8. Test Direct Tap on Flanking Option ('negativa' -> item index 0)
      const negativaItem = page.locator('.lens-wheel__item[data-lens="negativa"]');
      await negativaItem.click();
      await page.waitForTimeout(400);

      // Now 'negativa' must be center, aria-selected, and body class updated
      await expect(page.locator('.lens-wheel__item.is-center')).toHaveAttribute('data-lens', 'negativa');
      await expect(negativaItem).toHaveAttribute('aria-selected', 'true');
      const bodyClassNegativa = await page.evaluate(() => document.body.className);
      expect(bodyClassNegativa).toContain('lens-negativa');

      // 9. Test Horizontal Swipe/Drag Gesture (simulate swipe left to move towards 'capacidades')
      // Touch/drag from right to left on track
      const trackBox = await track.boundingBox();
      const startX = trackBox.x + trackBox.width * 0.75;
      const endX = trackBox.x + trackBox.width * 0.25;
      const centerY = trackBox.y + trackBox.height * 0.5;

      await page.mouse.move(startX, centerY);
      await page.mouse.down();
      await page.mouse.move(endX, centerY, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(500);

      // Verify that lens snapped properly to a valid lens
      const currentLens = await page.evaluate(() => state.currentLens);
      expect(['negativa', 'positiva', 'capacidades', 'libertario']).toContain(currentLens);

      // 10. Test Tap on 'capacidades' explicitly to verify full loop
      const capItem = page.locator('.lens-wheel__item[data-lens="capacidades"]');
      await capItem.click();
      await page.waitForTimeout(400);

      await expect(page.locator('.lens-wheel__item.is-center')).toHaveAttribute('data-lens', 'capacidades');
      const bodyClassCap = await page.evaluate(() => document.body.className);
      expect(bodyClassCap).toContain('lens-capacidades');

      // 11. NO TRUNCATION / NO ELLIPSIS VERIFICATION:
      // All lens names must be complete without ellipsis or dots
      const itemTexts = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.lens-wheel__item'));
        return items.map(el => {
          const nameEl = el.querySelector('.lens-wheel__name');
          const authorEl = el.querySelector('.lens-wheel__author');
          const style = window.getComputedStyle(nameEl);
          return {
            name: nameEl ? nameEl.textContent.trim() : '',
            author: authorEl ? authorEl.textContent.trim() : '',
            textOverflow: style.textOverflow
          };
        });
      });

      for (const it of itemTexts) {
        expect(it.textOverflow).not.toBe('ellipsis');
        expect(it.name).not.toContain('...');
        expect(it.name.length).toBeGreaterThanOrEqual(10); // "Capacidades" = 11, "Libertad Negativa" = 17
      }
    });
  }

  // 12. DESKTOP FIDELITY INVARIANCE TEST
  test('[Desktop 1280x800] Desktop lens panel is permanently docked, 220px wide, and wheel is hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(300);

    const lensPanel = page.locator('#lensPanel');
    await expect(lensPanel).toBeVisible();

    const panelBox = await lensPanel.boundingBox();
    expect(panelBox).not.toBeNull();
    expect(Math.round(panelBox.width)).toBe(220);

    // Desktop chips (.lens-options) are visible
    const lensOptions = page.locator('.lens-options');
    await expect(lensOptions).toBeVisible();

    // Mobile wheel is completely hidden on desktop
    const wheel = page.locator('.lens-wheel');
    const wheelDisplay = await wheel.evaluate(el => window.getComputedStyle(el).display);
    expect(wheelDisplay).toBe('none');

    // Test collapse / expand toggle on desktop
    const toggleBtn = page.locator('#lensToggleBtn');
    await toggleBtn.click();
    await page.waitForTimeout(200);
    await expect(lensPanel).toHaveClass(/collapsed/);

    await toggleBtn.click();
    await page.waitForTimeout(200);
    await expect(lensPanel).not.toHaveClass(/collapsed/);
  });
});
