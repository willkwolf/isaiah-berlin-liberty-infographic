// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const DESKTOP_VIEWPORTS = [
  { name: 'Desktop 1280x800', width: 1280, height: 800 },
  { name: 'Standard Laptop 1366x768', width: 1366, height: 768 },
  { name: 'Desktop Full HD 1920x1080', width: 1920, height: 1080 }
];

test.describe('Adversarial Desktop Regression & Viewport Invariance Suite', () => {

  for (const vp of DESKTOP_VIEWPORTS) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {

      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
      });

      test('Entry State & CLS = 0: loads deterministically at (0,0) without layout shift', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        // Verify deterministic entry coordinates
        const scrollCoords = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
        expect(scrollCoords.x).toBe(0);
        expect(scrollCoords.y).toBe(0);

        // Verify history.scrollRestoration
        const scrollRestoration = await page.evaluate(() => history.scrollRestoration);
        expect(scrollRestoration).toBe('manual');

        // Hero title initial position
        const heroTitle = page.locator('#problema-title');
        await expect(heroTitle).toBeVisible();
        const initialBox = await heroTitle.boundingBox();
        expect(initialBox).not.toBeNull();

        // Wait 700ms for deferred animations or onboarding initialization
        await page.waitForTimeout(700);

        const postBox = await heroTitle.boundingBox();
        expect(postBox).not.toBeNull();
        if (initialBox && postBox) {
          // CLS must be strictly zero (< 1px)
          const deltaY = Math.abs(postBox.y - initialBox.y);
          expect(deltaY).toBeLessThan(1);
        }
      });

      test('Mobile Overlays Invariance: No mobile overlays obstruct viewport or capture clicks', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        // 1. Mobile drum wheel must NOT be displayed on desktop
        const wheelDisplay = await page.locator('.lens-wheel').evaluate(el => window.getComputedStyle(el).display);
        expect(wheelDisplay).toBe('none');

        // 2. Hero onboarding must NOT be fixed overlay on desktop
        const onboarding = page.locator('#heroOnboarding');
        const count = await onboarding.count();
        if (count > 0 && await onboarding.isVisible()) {
          const onboardingPos = await onboarding.evaluate(el => window.getComputedStyle(el).position);
          expect(onboardingPos).not.toBe('fixed');

          // Must be located within Section I, not pinned at viewport bottom
          const box = await onboarding.boundingBox();
          const heroBox = await page.locator('#problema').boundingBox();
          if (box && heroBox) {
            expect(box.y).toBeLessThan(heroBox.y + heroBox.height);
          }
        }

        // 3. Desktop lens panel must be side-docked and 220px wide
        const lensPanel = page.locator('#lensPanel');
        await expect(lensPanel).toBeVisible();
        const panelBox = await lensPanel.boundingBox();
        expect(panelBox).not.toBeNull();
        if (panelBox) {
          expect(Math.round(panelBox.width)).toBe(220);
          expect(panelBox.x + panelBox.width).toBeGreaterThanOrEqual(vp.width - 2);
        }

        // 4. Hero viz canvas is visible and alongside hero content
        const heroViz = page.locator('.hero-viz');
        const heroContent = page.locator('.hero-content');
        await expect(heroViz).toBeVisible();
        await expect(heroContent).toBeVisible();

        const vizBox = await heroViz.boundingBox();
        const contentBox = await heroContent.boundingBox();
        if (vizBox && contentBox) {
          // Must render side-by-side in grid
          expect(vizBox.x).toBeLessThan(contentBox.x);
        }
      });

      test('Horizontal Overflow Defense: Zero lateral scroll across all sections', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        // Verify document level overflow
        const docDimensions = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          innerWidth: window.innerWidth
        }));
        expect(docDimensions.scrollWidth).toBeLessThanOrEqual(vp.width);

        // Check each section individually
        const sectionIds = [
          'problema', 'berlin', 'conflicto', 'poder', 'limites',
          'economia', 'sen', 'colombia', 'comparacion', 'genealogia', 'cierre'
        ];

        for (const id of sectionIds) {
          const sectionEl = page.locator(`#${id}`);
          await sectionEl.scrollIntoViewIfNeeded();
          await page.waitForTimeout(100);

          const overflow = await sectionEl.evaluate(el => ({
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth
          }));
          expect(overflow.scrollWidth, `Section #${id} horizontal overflow`).toBeLessThanOrEqual(overflow.clientWidth + 1);
        }
      });

      test('Desktop Bounds Protection: .section__inner adheres to desktop constraint', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const inners = page.locator('.section__inner');
        const count = await inners.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < Math.min(count, 5); i++) {
          const innerBox = await inners.nth(i).boundingBox();
          if (innerBox) {
            // Must adhere to min(900px, calc(100vw - 220px - 2.5rem))
            expect(innerBox.width).toBeLessThanOrEqual(920);
          }
        }
      });

      test('Section X Category Cards: 4 cards render properly with complete content & desktop grid', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const genealogia = page.locator('#genealogia');
        await genealogia.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const cardSelectors = [
          '#catCardMonismoHegemonico',
          '#catCardPluralismoHegemonico',
          '#catCardMonismoEmergente',
          '#catCardPluralismoEmergente'
        ];

        for (const sel of cardSelectors) {
          const card = page.locator(sel);
          await expect(card).toBeVisible();

          const box = await card.boundingBox();
          expect(box, `Bounding box for ${sel}`).not.toBeNull();
          if (box) {
            expect(box.width).toBeGreaterThanOrEqual(250);
            expect(box.height).toBeGreaterThanOrEqual(180);
          }

          // Check inner elements
          await expect(card.locator('.category-card__title')).toBeVisible();
          await expect(card.locator('.category-card__badge')).toBeVisible();
          await expect(card.locator('.category-card__summary')).toBeVisible();
        }

        // Verify grid multi-column presentation
        const grid = page.locator('#genealogiaCategoriesGrid');
        const gridDisplay = await grid.evaluate(el => {
          const s = window.getComputedStyle(el);
          return {
            display: s.display,
            gridTemplateColumns: s.gridTemplateColumns
          };
        });
        expect(gridDisplay.display).toBe('grid');
        const cols = gridDisplay.gridTemplateColumns.trim().split(/\s+/);
        expect(cols.length).toBeGreaterThanOrEqual(2);
      });

      test('Section X Modal Interactivity: Open, centering, tab switching, and closure across all methods', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const genealogia = page.locator('#genealogia');
        await genealogia.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // 1. Open modal by clicking #titleMonismoHegemonico
        const titleBtn = page.locator('#titleMonismoHegemonico');
        await titleBtn.scrollIntoViewIfNeeded();
        await titleBtn.click();
        await page.waitForTimeout(300);

        // Verify modal backdrop and modal dialog
        const backdrop = page.locator('#genealogiaModalBackdrop');
        const modal = page.locator('#genealogiaModal');
        await expect(backdrop).toHaveClass(/is-open/);
        await expect(modal).toBeVisible();

        // 2. Centering verification
        const modalBox = await modal.boundingBox();
        expect(modalBox).not.toBeNull();
        if (modalBox) {
          expect(modalBox.x).toBeGreaterThan(0);
          expect(modalBox.y).toBeGreaterThan(0);
          expect(modalBox.x + modalBox.width).toBeLessThanOrEqual(vp.width);
          expect(modalBox.y + modalBox.height).toBeLessThanOrEqual(vp.height);

          // Centered within 35px horizontal tolerance
          const expectedCenterX = (vp.width - modalBox.width) / 2;
          expect(Math.abs(modalBox.x - expectedCenterX)).toBeLessThan(35);
        }

        // 3. Tab switching: Traditions tab
        const tabTraditions = page.locator('#modalTabBtnTraditions');
        await expect(tabTraditions).toBeVisible();
        await tabTraditions.click();
        await page.waitForTimeout(200);

        const traditionsPanel = page.locator('#modalViewTraditions');
        await expect(traditionsPanel).toBeVisible();
        expect(await traditionsPanel.getAttribute('hidden')).toBeNull();

        // Check tradition detail cards inside
        const traditionCards = page.locator('.tradition-detail-card');
        expect(await traditionCards.count()).toBeGreaterThan(0);

        // Switch back to Overview tab
        const tabOverview = page.locator('#modalTabBtnOverview');
        await tabOverview.click();
        await page.waitForTimeout(200);
        await expect(page.locator('#modalViewOverview')).toBeVisible();

        // 4. Modal Category Navigation (Next / Prev buttons)
        const nextBtn = page.locator('#modalNextBtn');
        const currentTitle = await page.locator('#modalCategoryTitle').textContent();
        await nextBtn.click();
        await page.waitForTimeout(200);
        const nextTitle = await page.locator('#modalCategoryTitle').textContent();
        expect(nextTitle).not.toBe(currentTitle);

        // Previous button returns
        const prevBtn = page.locator('#modalPrevBtn');
        await prevBtn.click();
        await page.waitForTimeout(200);
        const backTitle = await page.locator('#modalCategoryTitle').textContent();
        expect(backTitle).toBe(currentTitle);

        // 5. Close method A: Action button (#modalCloseActionBtn)
        const closeActionBtn = page.locator('#modalCloseActionBtn');
        await closeActionBtn.click();
        await page.waitForTimeout(300);
        await expect(backdrop).not.toHaveClass(/is-open/);

        // 6. Re-open and close method B: Close icon (&times;)
        await titleBtn.click();
        await page.waitForTimeout(300);
        await expect(backdrop).toHaveClass(/is-open/);
        await page.locator('#modalCloseBtn').click();
        await page.waitForTimeout(300);
        await expect(backdrop).not.toHaveClass(/is-open/);

        // 7. Re-open and close method C: Escape key
        await titleBtn.click();
        await page.waitForTimeout(300);
        await expect(backdrop).toHaveClass(/is-open/);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        await expect(backdrop).not.toHaveClass(/is-open/);

        // 8. Re-open and close method D: Click outside (backdrop)
        await titleBtn.click();
        await page.waitForTimeout(300);
        await expect(backdrop).toHaveClass(/is-open/);
        // Click at top-left corner outside modal dialog (x: 20, y: 20)
        await page.mouse.click(20, 20);
        await page.waitForTimeout(300);
        await expect(backdrop).not.toHaveClass(/is-open/);
      });

      test('Section VIII Colombia Table: Renders desktop layout with full columns', async ({ page }) => {
        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        const table = page.locator('#colombiaTable');
        await table.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        await expect(table).toBeVisible();

        // Verify table headers exist and are visible
        const ths = table.locator('th');
        expect(await ths.count()).toBeGreaterThanOrEqual(3);

        // Verify table rows (3 indices: e.g., Freedom House, Fraser, etc.)
        const rows = table.locator('tbody tr');
        expect(await rows.count()).toBe(3);
      });

      test('Adversarial Full Journey: Zero console errors or unhandled exceptions across full read', async ({ page }) => {
        const consoleErrors = [];
        page.on('pageerror', err => consoleErrors.push(err.message));
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await page.goto(FILE_URL);
        await page.waitForLoadState('domcontentloaded');

        // Scroll continuously from top to bottom
        const sections = [
          '#problema', '#berlin', '#conflicto', '#poder', '#limites',
          '#economia', '#sen', '#colombia', '#comparacion', '#genealogia', '#cierre'
        ];

        for (const s of sections) {
          await page.locator(s).scrollIntoViewIfNeeded();
          await page.waitForTimeout(100);
        }

        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);

        expect(consoleErrors).toHaveLength(0);
      });

    });
  }

});
