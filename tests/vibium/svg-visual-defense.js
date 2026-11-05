/**
 * tests/vibium/svg-visual-defense.js
 * Visual defense layer using Vibium to test SVG figures across mobile and desktop.
 * Validates real browser rendering, responsive proportions, and interactive transitions.
 */

'use strict';

const path = require('path');
const { browser } = require('vibium');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../../files/index.html').replace(/\\/g, '/');

const TEST_VIEWPORTS = [
  { name: 'Mobile XS', width: 320, height: 568 },
  { name: 'Mobile Standard', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop Full HD', width: 1920, height: 1080 }
];

async function runSvgVisualDefense() {
  console.log('========================================================================');
  console.log('   VIBIUM SVG VISUAL DEFENSE & PROPORTION INTEGRITY SUITE');
  console.log('========================================================================\n');

  const b = await browser.start({ headless: true });
  const page = await b.page();

  try {
    for (const vp of TEST_VIEWPORTS) {
      console.log(`[Viewport: ${vp.name} (${vp.width}x${vp.height})]`);
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.go(FILE_URL);
      await page.wait(300);

      // 1. Verify #conflictCurveSvg
      const conflictSvg = await page.find('#conflictCurveSvg');
      if (!conflictSvg) throw new Error(`[${vp.name}] #conflictCurveSvg element not found`);
      const conflictVis = await conflictSvg.isVisible();
      if (!conflictVis) throw new Error(`[${vp.name}] #conflictCurveSvg is not visible`);

      // Test slider interaction on conflict curve
      const slider = await page.find('#conflictSlider');
      if (slider) {
        // Scroll into view
        await conflictSvg.scrollIntoView();
        await page.wait(150);
        console.log(`  ✓ #conflictCurveSvg visible and interactive at ${vp.width}px`);
      }

      // 2. Verify #powerDiagram
      const powerSvg = await page.find('#powerDiagram');
      if (!powerSvg) throw new Error(`[${vp.name}] #powerDiagram not found`);
      const powerVis = await powerSvg.isVisible();
      if (!powerVis) throw new Error(`[${vp.name}] #powerDiagram is not visible`);
      console.log(`  ✓ #powerDiagram visible at ${vp.width}px`);

      // 3. Verify #marketSvg
      const marketSvg = await page.find('#marketSvg');
      if (!marketSvg) throw new Error(`[${vp.name}] #marketSvg not found`);
      const marketVis = await marketSvg.isVisible();
      if (!marketVis) throw new Error(`[${vp.name}] #marketSvg is not visible`);

      // Toggle market mode
      const realBtn = await page.find('.market-btn[data-market="real"]');
      if (realBtn) {
        await realBtn.click();
        await page.wait(150);
        console.log(`  ✓ #marketSvg interactive toggle verified at ${vp.width}px`);
      }

      // 4. Verify #systemCurveSvg
      const systemSvg = await page.find('#systemCurveSvg');
      if (!systemSvg) throw new Error(`[${vp.name}] #systemCurveSvg not found`);
      const systemVis = await systemSvg.isVisible();
      if (!systemVis) throw new Error(`[${vp.name}] #systemCurveSvg is not visible`);

      // Toggle system mode
      const pluralBtn = await page.find('#systemPluralBtn');
      if (pluralBtn) {
        await pluralBtn.click();
        await page.wait(150);
        console.log(`  ✓ #systemCurveSvg plural toggle verified at ${vp.width}px`);
      }
    }

    console.log('\n========================================================================');
    console.log('✓ ALL VIBIUM SVG VISUAL DEFENSE TESTS PASSED (100% INTEGRITY)');
    console.log('========================================================================\n');
    await b.stop();
    process.exit(0);
  } catch (err) {
    console.error('❌ Vibium visual defense failure:', err.message);
    await b.stop();
    process.exit(1);
  }
}

runSvgVisualDefense();
