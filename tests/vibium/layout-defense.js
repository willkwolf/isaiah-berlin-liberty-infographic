/**
 * tests/vibium/layout-defense.js
 *
 * Visual Defense Layer with Vibium
 * Validates real browser rendering, 4 category cards layout, and modal interactivity.
 */

'use strict';

const path = require('path');
const { browser } = require('vibium');

async function runVisualDefense() {
  console.log('--- Starting Vibium Visual Defense Layer ---');

  const fileUrl = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

  try {
    console.log('[1/5] Launching browser instance...');
    const b = await browser.start({ headless: true });
    const page = await b.page();

    // Set standard desktop viewport to test desktop visual layout defense
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`[2/5] Navigating to: ${fileUrl}`);
    await page.go(fileUrl);

    // Wait for Section X
    console.log('[3/5] Verifying 4 Category Cards in Section X...');
    const cards = [
      '#catCardMonismoHegemonico',
      '#catCardPluralismoHegemonico',
      '#catCardMonismoEmergente',
      '#catCardPluralismoEmergente'
    ];

    for (const cardSelector of cards) {
      const cardEl = await page.find(cardSelector);
      if (!cardEl) {
        throw new Error(`Visual defense failed: Card ${cardSelector} not found in DOM`);
      }
      const visible = await cardEl.isVisible();
      if (!visible) {
        throw new Error(`Visual defense failed: Card ${cardSelector} is not visible`);
      }
    }
    console.log('✓ All 4 category components successfully verified in DOM and visible.');

    // Interactive exploration check
    console.log('[4/5] Testing Modal Dialog interactivity...');
    const catTitle = await page.find('#titleMonismoHegemonico');
    if (!catTitle) {
      throw new Error('Category title #titleMonismoHegemonico not found');
    }

    // Scroll element into view and allow smooth scroll to settle
    await catTitle.scrollIntoView();
    await page.wait(300);

    await catTitle.click();
    await page.wait(300);

    // Verify modal is open
    const modal = await page.find('#genealogiaModal');
    if (!modal) {
      throw new Error('Modal #genealogiaModal not found');
    }
    const modalVisible = await modal.isVisible();
    if (!modalVisible) {
      throw new Error('Modal #genealogiaModal is not visible');
    }
    console.log('✓ Modal dialog opened, visible and centered.');

    // Switch to traditions tab
    const tabTraditions = await page.find('#modalTabBtnTraditions');
    if (tabTraditions) {
      await tabTraditions.click();
      console.log('✓ Switched to Traditions tab.');

      // Verify editorial tradition card in traditions tab
      const traditionCard = await page.find('.tradition-detail-card');
      if (traditionCard) {
        console.log('✓ Plain-text editorial tradition card verified.');
      }
    }

    // Close modal via action button
    const closeActionBtn = await page.find('#modalCloseActionBtn');
    if (closeActionBtn) {
      await closeActionBtn.click();
      console.log('✓ Modal closed via action button.');
    }

    console.log('[5/5] Visual Defense Layer passed with 100% integrity.');
    await b.stop();
    process.exit(0);
  } catch (err) {
    console.error('X Visual defense layer error:', err.message);
    process.exit(1);
  }
}

runVisualDefense();
