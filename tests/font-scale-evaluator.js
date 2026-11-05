const { chromium } = require('playwright');
const path = require('path');

const SCALES = [
  { name: '+0% (Baseline)', factor: 1.00, mobilePx: 15, tabletPx: 16, desktopPx: 20 },
  { name: '+5%', factor: 1.05, mobilePx: 15.75, tabletPx: 16.8, desktopPx: 21 },
  { name: '+10%', factor: 1.10, mobilePx: 16.5, tabletPx: 17.6, desktopPx: 22 },
  { name: '+15%', factor: 1.15, mobilePx: 17.25, tabletPx: 18.4, desktopPx: 23 },
  { name: '+20%', factor: 1.20, mobilePx: 18.0, tabletPx: 19.2, desktopPx: 24 },
  { name: '+25%', factor: 1.25, mobilePx: 18.75, tabletPx: 20.0, desktopPx: 25 },
];

const VIEWPORTS = [
  { name: 'iPhone SE (375x667)', width: 375, height: 667, isMobile: true },
  { name: 'iPhone 14 (390x844)', width: 390, height: 844, isMobile: true },
  { name: 'Large Mobile (414x896)', width: 414, height: 896, isMobile: true },
  { name: 'Tablet (768x1024)', width: 768, height: 1024, isMobile: false },
  { name: 'Desktop (1366x768)', width: 1366, height: 768, isMobile: false }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const fileUrl = 'file:///' + path.resolve(__dirname, '../files/index.html').replace(/\\/g, '/');

  console.log('================================================================');
  console.log('  FONT SIZE SCALING & MOBILE READABILITY DEFENSE TEST SUITE');
  console.log('================================================================');

  const results = [];

  for (const scale of SCALES) {
    console.log(`\n>>> Evaluating Scale ${scale.name} (Mobile: ${scale.mobilePx}px, Desktop: ${scale.desktopPx}px)...`);
    let scaleIssues = 0;
    const details = [];

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile
      });
      const page = await context.newPage();
      await page.goto(fileUrl, { waitUntil: 'load' });

      // Apply the scale dynamically to test
      await page.evaluate((s) => {
        const style = document.createElement('style');
        style.id = 'dynamic-font-scale-test';
        style.innerHTML = `
          html { font-size: ${s.desktopPx}px !important; }
          @media (max-width: 768px) { html { font-size: ${s.tabletPx}px !important; } }
          @media (max-width: 500px) { html { font-size: ${s.mobilePx}px !important; } }
          @media (max-width: 480px) { html { font-size: ${s.mobilePx}px !important; } }
        `;
        document.head.appendChild(style);
      }, scale);

      await page.waitForTimeout(300);

      // 1. Horizontal Overflow Check
      const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerW = await page.evaluate(() => window.innerWidth);
      if (scrollW > innerW + 1) {
        scaleIssues++;
        details.push(`Horizontal overflow on ${vp.name}: ${scrollW}px > ${innerW}px`);
      }

      // 2. Section X Card Layout Integrity
      const cardBox = await page.locator('#catCardMonismoHegemonico').boundingBox();
      if (!cardBox || (vp.isMobile && cardBox.width < vp.width * 0.70)) {
        scaleIssues++;
        details.push(`Category Card squished on ${vp.name}: ${cardBox ? cardBox.width : 0}px`);
      }

      // 3. Test Text Truncation / Overflow on Genealogia elements
      const textClipping = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('#genealogia h2, #genealogia h3, #genealogia h4, #genealogia p, #genealogia span, #genealogia button'));
        const clipped = [];
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return;
          // Check if overflow is hidden and content overflows
          if (style.overflow === 'hidden' || style.overflowX === 'hidden') {
            if (el.scrollWidth > el.clientWidth + 3) {
              clipped.push({ tag: el.tagName, text: el.textContent.trim().slice(0, 30), scrollW: el.scrollWidth, clientW: el.clientWidth });
            }
          }
        });
        return clipped;
      });

      if (textClipping.length > 0) {
        scaleIssues += textClipping.length;
        details.push(`Text clipping in Section X on ${vp.name}: ${JSON.stringify(textClipping)}`);
      }

      // 4. Test Modal Interactivity & Clipping under this font size
      const pill = page.locator('#samplesMonismoHegemonico .sample-tradition-pill').first();
      await pill.click();
      await page.waitForTimeout(250);

      const modalClipping = await page.evaluate(() => {
        const modal = document.querySelector('#genealogiaModal');
        if (!modal) return { visible: false };
        const rect = modal.getBoundingClientRect();
        return {
          visible: rect.width > 0 && rect.height > 0,
          outOfBoundsX: rect.left < 0 || rect.right > window.innerWidth + 2,
          outOfBoundsY: rect.top < 0,
          modalWidth: Math.round(rect.width),
          viewportWidth: window.innerWidth
        };
      });

      if (!modalClipping.visible || modalClipping.outOfBoundsX) {
        scaleIssues++;
        details.push(`Modal out of bounds on ${vp.name}: ${JSON.stringify(modalClipping)}`);
      }

      // Close modal
      await page.locator('#modalCloseBtn').click();
      await page.waitForTimeout(150);

      await context.close();
    }

    results.push({
      scale: scale.name,
      factor: scale.factor,
      mobilePx: scale.mobilePx,
      desktopPx: scale.desktopPx,
      issues: scaleIssues,
      details
    });

    if (scaleIssues === 0) {
      console.log(`  ✓ PASSED: 0 layout defects, 0 truncations, 0 overflows.`);
    } else {
      console.log(`  ⚠ ISSUES (${scaleIssues}): ${details.join('; ')}`);
    }
  }

  console.log('\n================================================================');
  console.log('  TESTING SUMMARY ACROSS ALL SCALES (15% to 25% jumps of 5%)');
  console.log('================================================================');
  results.forEach(r => {
    console.log(`Scale ${r.scale.padEnd(16)} | Mobile: ${r.mobilePx}px | Issues: ${r.issues} ${r.issues === 0 ? '✓ OPTIMAL & SAFE' : '❌ DEFECTS'}`);
  });

  await browser.close();
})();
