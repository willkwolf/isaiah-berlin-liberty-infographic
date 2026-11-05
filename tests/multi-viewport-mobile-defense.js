const { chromium } = require('playwright');
const path = require('path');

const VIEWPORTS = [
  { name: 'iPhone SE (375x667)', width: 375, height: 667 },
  { name: 'iPhone 14 (390x844)', width: 390, height: 844 },
  { name: 'Large Mobile (414x896)', width: 414, height: 896 },
  { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const fileUrl = 'file:///' + path.resolve(__dirname, '../files/index.html').replace(/\\/g, '/');

  let totalFailures = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Testing Viewport: ${vp.name} ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.width < 768,
      hasTouch: true
    });
    const page = await context.newPage();
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    // 1. Check Document Horizontal Overflow
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerW = await page.evaluate(() => window.innerWidth);
    if (scrollW > innerW) {
      console.error(`❌ OVERFLOW in ${vp.name}: scrollWidth=${scrollW}px > window.innerWidth=${innerW}px`);
      totalFailures++;
    } else {
      console.log(`✓ Horizontal containment: ${scrollW}px <= ${innerW}px`);
    }

    // 2. Check section inner widths (must not be collapsed to < 280px on 375px+)
    const sectionWidths = await page.evaluate(() => {
      const inners = Array.from(document.querySelectorAll('.section__inner'));
      return inners.map(el => {
        const sec = el.closest('section');
        return {
          id: sec ? sec.id : 'unknown',
          width: Math.round(el.getBoundingClientRect().width)
        };
      });
    });

    const collapsedSections = sectionWidths.filter(s => s.width < (vp.width * 0.75));
    if (collapsedSections.length > 0) {
      console.error(`❌ Collapsed sections found in ${vp.name}:`, collapsedSections);
      totalFailures++;
    } else {
      console.log(`✓ Section widths healthy in ${vp.name} (avg: ${Math.round(sectionWidths.reduce((a, b) => a + b.width, 0) / sectionWidths.length)}px, min: ${Math.min(...sectionWidths.map(s => s.width))}px)`);
    }

    // 3. Check Section X Cards
    const catCard = page.locator('#catCardMonismoHegemonico');
    const catBox = await catCard.boundingBox();
    if (!catBox || catBox.width < (vp.width * 0.75)) {
      console.error(`❌ Category Card squished in ${vp.name}: width=${catBox ? catBox.width : 0}px`);
      totalFailures++;
    } else {
      console.log(`✓ Category Card healthy: width=${Math.round(catBox.width)}px`);
    }

    // 4. Test Modal Dialog tabs and clipping
    await catCard.click();
    await page.waitForTimeout(400);

    const modalTabsClipping = await page.evaluate(() => {
      const tabs = document.querySelector('.genealogia-modal__tabs');
      if (!tabs) return { error: 'tabs not found' };
      const btns = Array.from(tabs.querySelectorAll('.modal-tab-btn'));
      return {
        tabsScrollWidth: tabs.scrollWidth,
        tabsClientWidth: tabs.clientWidth,
        isClipped: tabs.scrollWidth > tabs.clientWidth + 2,
        btnHeights: btns.map(b => Math.round(b.getBoundingClientRect().height))
      };
    });

    if (modalTabsClipping.isClipped) {
      console.error(`❌ Modal tabs overflowing in ${vp.name}: scrollWidth=${modalTabsClipping.tabsScrollWidth} > clientWidth=${modalTabsClipping.tabsClientWidth}`);
      totalFailures++;
    } else {
      console.log(`✓ Modal tabs fully visible without overflow: ${modalTabsClipping.tabsScrollWidth}px / ${modalTabsClipping.tabsClientWidth}px`);
    }

    // Close modal
    const closeBtn = page.locator('#modalCloseBtn');
    await closeBtn.click();
    await page.waitForTimeout(200);

    await context.close();
  }

  await browser.close();

  if (totalFailures === 0) {
    console.log('\n========================================');
    console.log('✓ ALL MULTI-VIEWPORT TESTS PASSED (0 FAILURES)');
    console.log('========================================');
    process.exit(0);
  } else {
    console.error(`\n❌ FAILED with ${totalFailures} issues.`);
    process.exit(1);
  }
})();
