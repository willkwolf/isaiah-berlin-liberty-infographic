const { chromium } = require('playwright');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../files/index.html').replace(/\\/g, '/');

const VIEWPORTS = [
  { name: 'Mobile XS (320px)', width: 320, height: 568 },
  { name: 'Mobile iPhone SE/8 (375px)', width: 375, height: 667 },
  { name: 'Mobile Modern (390px)', width: 390, height: 844 },
  { name: 'Mobile Large (428px)', width: 428, height: 926 },
  { name: 'Tablet (768px)', width: 768, height: 1024 },
  { name: 'Desktop HD (1280px)', width: 1280, height: 800 },
  { name: 'Desktop Full HD (1920px)', width: 1920, height: 1080 }
];

const TARGET_SVGS = [
  '#conflictCurveSvg',
  '#systemCurveSvg',
  '#marketSvg',
  '#powerDiagram'
];

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height }
    });
    await page.goto(FILE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    console.log(`\n======================================================`);
    console.log(`VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`======================================================`);

    for (const selector of TARGET_SVGS) {
      const data = await page.evaluate((sel) => {
        const svg = document.querySelector(sel);
        if (!svg) return { exists: false };
        const svgRect = svg.getBoundingClientRect();
        const texts = Array.from(svg.querySelectorAll('text')).map(t => {
          const r = t.getBoundingClientRect();
          const computed = window.getComputedStyle(t);
          return {
            text: t.textContent.trim().replace(/\s+/g, ' '),
            fontSizeAttr: t.getAttribute('font-size'),
            computedPx: parseFloat(computed.fontSize),
            renderedWidth: Math.round(r.width * 10) / 10,
            renderedHeight: Math.round(r.height * 10) / 10,
            clippedLeft: r.left < svgRect.left - 0.5,
            clippedRight: r.right > svgRect.right + 0.5,
            clippedTop: r.top < svgRect.top - 0.5,
            clippedBottom: r.bottom > svgRect.bottom + 0.5
          };
        });

        return {
          exists: true,
          viewBox: svg.getAttribute('viewBox'),
          widthAttr: svg.getAttribute('width'),
          heightAttr: svg.getAttribute('height'),
          inlineStyle: svg.getAttribute('style'),
          svgRenderedWidth: Math.round(svgRect.width * 10) / 10,
          svgRenderedHeight: Math.round(svgRect.height * 10) / 10,
          aspectRatio: (svgRect.width / (svgRect.height || 1)).toFixed(2),
          texts
        };
      }, selector);

      if (!data.exists) {
        console.log(`[${selector}] Not found`);
        continue;
      }

      console.log(`\n[${selector}] viewBox="${data.viewBox}" | rendered: ${data.svgRenderedWidth}px x ${data.svgRenderedHeight}px (ratio: ${data.aspectRatio})`);
      if (data.inlineStyle) console.log(`  inline style: "${data.inlineStyle}"`);
      
      const illegible = data.texts.filter(t => t.computedPx < 10);
      const clipped = data.texts.filter(t => t.clippedLeft || t.clippedRight || t.clippedTop || t.clippedBottom);

      if (illegible.length > 0) {
        console.log(`  ❌ ${illegible.length} text elements are illegible (< 10px):`);
        illegible.forEach(t => {
          console.log(`     • "${t.text.slice(0, 35)}" => rendered: ${t.computedPx.toFixed(1)}px (attr: ${t.fontSizeAttr})`);
        });
      } else {
        console.log(`  ✓ All ${data.texts.length} texts >= 10px`);
      }

      if (clipped.length > 0) {
        console.log(`  ⚠️ ${clipped.length} text elements are clipped:`);
        clipped.forEach(t => {
          console.log(`     • "${t.text.slice(0, 35)}" => L:${t.clippedLeft} R:${t.clippedRight} T:${t.clippedTop} B:${t.clippedBottom}`);
        });
      } else {
        console.log(`  ✓ No texts clipped`);
      }

      console.log(`  Sample texts:`);
      data.texts.slice(0, 3).forEach(t => {
        console.log(`     • "${t.text.slice(0, 30)}" -> size: ${t.computedPx.toFixed(1)}px, w: ${t.renderedWidth}px, h: ${t.renderedHeight}px`);
      });
    }

    await page.close();
  }

  await browser.close();
}

run().catch(console.error);
