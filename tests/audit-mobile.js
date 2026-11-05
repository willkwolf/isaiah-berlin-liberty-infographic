const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  const fileUrl = 'file:///' + path.resolve(__dirname, '../files/index.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  // 1. Check page-level horizontal overflow
  const bodyScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const windowWidth = await page.evaluate(() => window.innerWidth);
  console.log(`Document scrollWidth: ${bodyScrollWidth}px | window.innerWidth: ${windowWidth}px`);
  if (bodyScrollWidth > windowWidth) {
    console.error(`🚨 HORIZONTAL OVERFLOW DETECTED: ${bodyScrollWidth} > ${windowWidth}`);
  }

  // 2. Find any elements whose right edge exceeds window.innerWidth
  const overflowingElements = await page.evaluate(() => {
    const results = [];
    const elements = document.querySelectorAll('*');
    const winWidth = window.innerWidth;
    elements.forEach(el => {
      // ignore hidden or script/style/svg-defs
      if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE', 'BR'].includes(el.tagName)) return;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

      if (rect.right > winWidth + 1.5 && rect.width > 0 && rect.height > 0) {
        results.push({
          tag: el.tagName,
          id: el.id || '',
          className: el.className || '',
          rectRight: Math.round(rect.right),
          rectWidth: Math.round(rect.width),
          textSnippet: (el.textContent || '').trim().slice(0, 40)
        });
      }
    });
    return results;
  });

  console.log(`Elements extending beyond viewport width (${overflowingElements.length}):`);
  overflowingElements.slice(0, 15).forEach((item, i) => {
    console.log(` [${i+1}] <${item.tag} class="${item.className}" id="${item.id}"> right=${item.rectRight}px w=${item.rectWidth}px "${item.textSnippet}"`);
  });

  // 3. Find elements with text-overflow: ellipsis or nowrap or clipped text
  const clippedTextElements = await page.evaluate(() => {
    const results = [];
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE', 'BR', 'SVG', 'PATH'].includes(el.tagName)) return;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return;

      const hasEllipsis = style.textOverflow === 'ellipsis';
      const isNowrap = style.whiteSpace === 'nowrap';
      const isOverflowHidden = style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden';

      // Check if text is clipped
      const isHorizontallyClipped = el.scrollWidth > el.clientWidth + 1;
      const isVerticallyClipped = el.scrollHeight > el.clientHeight + 1 && (style.maxHeight !== 'none' || style.height !== 'auto');

      if ((hasEllipsis || isHorizontallyClipped || (isVerticallyClipped && isOverflowHidden)) && el.textContent.trim().length > 0) {
        // Exclude lens-panel when intentionally collapsed or wheel track
        if (el.closest('.lens-wheel') || el.closest('.lens-options')) return;
        results.push({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          whiteSpace: style.whiteSpace,
          textOverflow: style.textOverflow,
          overflow: style.overflow,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          text: el.textContent.trim().slice(0, 60)
        });
      }
    });
    return results;
  });

  console.log(`\nElements with text clipping / ellipsis (${clippedTextElements.length}):`);
  clippedTextElements.slice(0, 20).forEach((item, i) => {
    console.log(` [${i+1}] <${item.tag} class="${item.className}"> sW=${item.scrollWidth}/cW=${item.clientWidth} sH=${item.scrollHeight}/cH=${item.clientHeight} whiteSpace=${item.whiteSpace} ellipsis=${item.textOverflow} text="${item.text}"`);
  });

  // 4. Audit section paddings and margins on mobile
  const sectionMetrics = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections.map(s => {
      const rect = s.getBoundingClientRect();
      const style = window.getComputedStyle(s);
      const inner = s.querySelector('.section__inner');
      const innerStyle = inner ? window.getComputedStyle(inner) : null;
      return {
        id: s.id,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        innerWidth: inner ? Math.round(inner.getBoundingClientRect().width) : null,
        innerPadLeft: innerStyle ? innerStyle.paddingLeft : null,
        innerPadRight: innerStyle ? innerStyle.paddingRight : null
      };
    });
  });

  console.log('\nSection layout metrics on mobile:');
  sectionMetrics.forEach(s => {
    console.log(` Section #${s.id}: pad=[${s.paddingTop}, ${s.paddingRight}, ${s.paddingBottom}, ${s.paddingLeft}], innerW=${s.innerWidth}px, innerPad=[L:${s.innerPadLeft}, R:${s.innerPadRight}]`);
  });

  // 5. Test Section X cards and Modal on mobile
  console.log('\nAuditing Section X and Modal at 375px:');
  const cat1 = page.locator('#catCardMonismoHegemonico');
  await cat1.scrollIntoViewIfNeeded();
  const cat1Box = await cat1.boundingBox();
  console.log('Category 1 Card BoundingBox:', cat1Box);

  // Open modal via category card
  await cat1.click();
  await page.waitForTimeout(500);

  const modal = page.locator('#genealogiaModal');
  const modalVisible = await modal.isVisible();
  const modalBox = await modal.boundingBox();
  console.log(`Modal visible: ${modalVisible}, modalBox:`, modalBox);

  // Check modal text clipping or overflow
  const modalClipping = await page.evaluate(() => {
    const modal = document.querySelector('#genealogiaModal');
    if (!modal) return [];
    const elements = modal.querySelectorAll('*');
    const res = [];
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (el.scrollWidth > el.clientWidth + 2 && style.overflow !== 'visible') {
        res.push({
          tag: el.tagName,
          className: el.className,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          text: el.textContent.trim().slice(0, 50)
        });
      }
    });
    return res;
  });

  console.log(`Modal clipped elements (${modalClipping.length}):`, modalClipping);

  // Close modal
  const closeBtn = page.locator('#modalCloseBtn');
  await closeBtn.click();
  await page.waitForTimeout(300);

  await browser.close();
  console.log('\n--- Audit Complete ---');
})();
