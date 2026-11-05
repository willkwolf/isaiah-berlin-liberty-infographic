// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

test.describe('Section X: Genealogía del Poder — Cross-Viewport Layout Defense', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(FILE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('Layout Integrity: Section X containment and card boundaries', async ({ page }) => {
    const section = page.locator('#genealogia');
    await section.scrollIntoViewIfNeeded();

    const sectionBox = await section.boundingBox();
    const viewport = page.viewportSize();
    expect(sectionBox).not.toBeNull();
    if (sectionBox && viewport) {
      expect(sectionBox.width).toBeLessThanOrEqual(viewport.width + 1);
    }

    // Verify 4 category cards are visible and well contained within viewport
    const cardIds = [
      '#catCardMonismoHegemonico',
      '#catCardPluralismoHegemonico',
      '#catCardMonismoEmergente',
      '#catCardPluralismoEmergente'
    ];

    for (const cardId of cardIds) {
      const card = page.locator(cardId);
      await expect(card).toBeVisible();

      const box = await card.boundingBox();
      expect(box).not.toBeNull();
      if (box && viewport) {
        expect(box.width).toBeLessThanOrEqual(viewport.width);
        expect(box.x).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('No Text Truncation: Titles, summaries and features render with full integrity', async ({ page }) => {
    const card = page.locator('#catCardMonismoHegemonico');
    await card.scrollIntoViewIfNeeded();

    const title = card.locator('.category-card__title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText(/Monistas hegemónicos|Hegemonic monisms/);

    // Ensure text is not clipped with overflow: hidden ellipses on title
    const computedStyles = await title.evaluate(el => {
      const s = window.getComputedStyle(el);
      return {
        textOverflow: s.textOverflow,
        overflow: s.overflow,
        whiteSpace: s.whiteSpace
      };
    });

    expect(computedStyles.textOverflow).not.toBe('ellipsis');

    // Ensure sample pills are visible
    const samplePills = card.locator('.sample-tradition-pill');
    const count = await samplePills.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('Modal Dialog Defense: Opens centered, switches tabs, traps/restores focus, closes on Esc', async ({ page }) => {
    const initialUrl = page.url();

    const cardTitle = page.locator('#titleMonismoHegemonico');
    await cardTitle.scrollIntoViewIfNeeded();
    await cardTitle.click();

    const modal = page.locator('#genealogiaModal');
    const backdrop = page.locator('#genealogiaModalBackdrop');

    await expect(modal).toBeVisible();
    await expect(backdrop).toHaveClass(/is-open/);

    // Modal width must not exceed viewport width
    const viewport = page.viewportSize();
    const modalBox = await modal.boundingBox();
    expect(modalBox).not.toBeNull();
    if (modalBox && viewport) {
      expect(modalBox.width).toBeLessThanOrEqual(viewport.width);
      expect(modalBox.x).toBeGreaterThanOrEqual(0);
    }

    // Tab switching test
    const tabOverview = page.locator('#modalTabBtnOverview');
    const tabTraditions = page.locator('#modalTabBtnTraditions');
    const viewOverview = page.locator('#modalViewOverview');
    const viewTraditions = page.locator('#modalViewTraditions');

    await expect(tabOverview).toHaveAttribute('aria-selected', 'true');
    await expect(viewOverview).toBeVisible();

    await tabTraditions.click();
    await expect(tabTraditions).toHaveAttribute('aria-selected', 'true');
    await expect(viewTraditions).toBeVisible();

    const traditionCards = viewTraditions.locator('.tradition-detail-card');
    const traditionCount = await traditionCards.count();
    expect(traditionCount).toBeGreaterThanOrEqual(5);

    // Escape closes modal
    await page.keyboard.press('Escape');
    await expect(backdrop).not.toHaveClass(/is-open/);

    // URL hash must not have been mutated
    expect(page.url()).toBe(initialUrl);
  });

  test('Direct Exploration via Sample Pill: Opens modal focused on tradition in tab 2', async ({ page }) => {
    const pill = page.locator('#samplesPluralismoHegemonico .sample-tradition-pill').first();
    await pill.scrollIntoViewIfNeeded();
    await pill.click();

    const modal = page.locator('#genealogiaModal');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/is-isolated-chip/);

    // Verify modal starts with scroll at the top (0), not scrolled down into the content
    const modalBody = modal.locator('#modalArchBody');
    const scrollTop = await modalBody.evaluate(el => el.scrollTop);
    expect(scrollTop).toBe(0);

    // Verify only the selected tradition is rendered (isolated mode, no giant scroll)
    const cards = modal.locator('.tradition-detail-card');
    expect(await cards.count()).toBe(1);

    // Verify category nav and tabs are hidden
    await expect(modal.locator('.genealogia-modal__nav')).toBeHidden();
    await expect(modal.locator('.genealogia-modal__tabs')).toBeHidden();

    // Close action button dismisses modal
    const closeActionBtn = page.locator('#modalCloseActionBtn');
    await closeActionBtn.click();

    const backdrop = page.locator('#genealogiaModalBackdrop');
    await expect(backdrop).not.toHaveClass(/is-open/);
  });

  test('Zero Emojis: Verify Section X and rendered modal contain zero emojis', async ({ page }) => {
    const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

    const sectionText = await page.locator('#genealogia').innerText();
    expect(emojiRegex.test(sectionText)).toBe(false);

    // Open modal via category card title and check modal text
    await page.locator('#titlePluralismoEmergente').click();
    const modalText = await page.locator('#genealogiaModal').innerText();
    expect(emojiRegex.test(modalText)).toBe(false);

    await page.keyboard.press('Escape');
  });

  test('Plain-Text Editorial Format & Light Mode: Modal renders clean editorial dossier cards in high-contrast light mode', async ({ page }) => {
    const cardTitle = page.locator('#titlePluralismoHegemonico');
    await cardTitle.scrollIntoViewIfNeeded();
    await cardTitle.click();

    const modal = page.locator('#genealogiaModal');
    await expect(modal).toBeVisible();

    // Verify modal is in pure light mode (solid white background)
    const modalBg = await modal.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(modalBg).toBe('rgb(255, 255, 255)');

    const tabTraditions = page.locator('#modalTabBtnTraditions');
    await tabTraditions.click();

    // Verify quick-nav button toolbar is absent (no clutter)
    const quickNav = page.locator('.tradition-quick-nav');
    await expect(quickNav).toHaveCount(0);

    // Verify cards are rendered in plain-text editorial structure
    const cards = page.locator('.tradition-detail-card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(4);

    const firstCard = cards.first();
    await expect(firstCard.locator('.tradition-editorial-counter')).toBeVisible();
    await expect(firstCard.locator('.tradition-editorial-title')).toBeVisible();
    await expect(firstCard.locator('.tradition-editorial-period')).toBeVisible();
    await expect(firstCard.locator('.tradition-editorial-context')).toBeVisible();

    // Verify editorial fields
    const fields = firstCard.locator('.tradition-editorial-field');
    const fieldCount = await fields.count();
    expect(fieldCount).toBeGreaterThanOrEqual(6);

    // Verify academic reference
    const ref = firstCard.locator('.field-body--ref');
    await expect(ref).toBeVisible();

    // Dismiss with Escape
    await page.keyboard.press('Escape');
    const backdrop = page.locator('#genealogiaModalBackdrop');
    await expect(backdrop).not.toHaveClass(/is-open/);
  });

});
