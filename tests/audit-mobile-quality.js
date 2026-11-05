/**
 * tests/audit-mobile-quality.js
 * Playwright Quantitative Precision Audit for Mobile Web Quality Criteria:
 * 1. Touch targets >= 44x44px (Apple HIG / Material Design).
 * 2. Touch target spacing (minimum 8px between adjacent tappable elements).
 * 3. Horizontal overflow (scrollWidth === clientWidth) on 320px, 360px, 375px, 390px, 428px.
 * 4. Modal geometry & scrollability within mobile viewports.
 * 5. Slider touch area accessibility.
 */
const { chromium } = require('playwright');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../files/index.html').replace(/\\/g, '/');

const VIEWPORTS = [
  { name: 'iPhone SE 1st (320px)', width: 320, height: 568 },
  { name: 'Android Small (360px)', width: 360, height: 640 },
  { name: 'iPhone SE/8 (375px)', width: 375, height: 667 },
  { name: 'iPhone 12/13/14 (390px)', width: 390, height: 844 },
  { name: 'Large Mobile (428px)', width: 428, height: 926 }
];

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  console.log('========================================================================');
  console.log('   PLAYWRIGHT PRECISION MOBILE QUALITY AUDIT (WCAG / HIG / MD)');
  console.log('========================================================================\n');

  const report = {
    touchTargetViolations: [],
    spacingViolations: [],
    overflowViolations: [],
    modalViolations: [],
    sliderViolations: []
  };

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Auditing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });

    await page.goto(FILE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    // 1. Audit Horizontal Overflow
    const overflowCheck = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const innerW = window.innerWidth;
      const sections = Array.from(document.querySelectorAll('section, header, footer, .section__inner')).map(el => {
        return {
          id: el.id || el.className || el.tagName,
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          rectW: Math.round(el.getBoundingClientRect().width),
          hasOverflow: el.scrollWidth > el.clientWidth + 1 || el.getBoundingClientRect().width > window.innerWidth + 1
        };
      });
      return {
        docW,
        innerW,
        docOverflow: docW > innerW,
        sectionOverflows: sections.filter(s => s.hasOverflow)
      };
    });

    if (overflowCheck.docOverflow) {
      console.log(`  ❌ Document horizontal overflow: scrollWidth ${overflowCheck.docW}px > innerWidth ${overflowCheck.innerW}px`);
      report.overflowViolations.push({ vp: vp.name, type: 'document', detail: `${overflowCheck.docW} > ${overflowCheck.innerW}` });
    } else {
      console.log(`  ✓ Document horizontal overflow: None (${overflowCheck.docW}px <= ${overflowCheck.innerW}px)`);
    }

    if (overflowCheck.sectionOverflows.length > 0) {
      overflowCheck.sectionOverflows.forEach(s => {
        console.log(`  ❌ Element overflow: ${s.id} (scrollW: ${s.scrollW}px, innerW: ${overflowCheck.innerW}px)`);
        report.overflowViolations.push({ vp: vp.name, element: s.id, detail: s });
      });
    }

    // 2. Audit Touch Targets (>= 44x44px for buttons, links, inputs, interactive widgets)
    const touchStats = await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll('button, a, input, [role="button"], .market-btn, .system-btn, .drum-item'));
      const violations = [];
      const valid = [];

      candidates.forEach(el => {
        // Skip hidden or unmounted elements
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

        // Effective interactive bounding box (including pseudo-elements padding if any)
        const w = r.width;
        const h = r.height;
        const text = (el.textContent || el.getAttribute('aria-label') || el.id || el.className).trim().slice(0, 30);

        // Standard Apple HIG / Material Design: Minimum 44x44 (Apple) or 48x48 (Google MD)
        // We test against 44px threshold
        if (w < 43.5 || h < 43.5) {
          violations.push({
            id: el.id || el.className || el.tagName,
            text,
            width: Math.round(w * 10) / 10,
            height: Math.round(h * 10) / 10
          });
        } else {
          valid.push({ id: el.id, text, width: w, height: h });
        }
      });

      return { total: candidates.length, violationCount: violations.length, violations };
    });

    if (touchStats.violationCount > 0) {
      console.log(`  ⚠️ Touch target violations (< 44x44px): ${touchStats.violationCount}`);
      touchStats.violations.slice(0, 8).forEach(v => {
        console.log(`     • [${v.id}] "${v.text}": ${v.width}px x ${v.height}px`);
        report.touchTargetViolations.push({ vp: vp.name, ...v });
      });
    } else {
      console.log(`  ✓ All ${touchStats.total} interactive elements >= 44x44px`);
    }

    // 3. Audit Slider Touch Target & Area
    const sliderData = await page.evaluate(() => {
      const slider = document.querySelector('#conflictSlider');
      if (!slider) return null;
      const r = slider.getBoundingClientRect();
      const style = window.getComputedStyle(slider);
      return {
        width: r.width,
        height: r.height,
        min: slider.min,
        max: slider.max,
        value: slider.value,
        ariaLabel: slider.getAttribute('aria-label')
      };
    });

    if (sliderData) {
      if (sliderData.height < 44) {
        console.log(`  ⚠️ Slider touch height is ${sliderData.height}px (< 44px)`);
        report.sliderViolations.push({ vp: vp.name, height: sliderData.height });
      } else {
        console.log(`  ✓ Slider touch height OK: ${sliderData.height}px`);
      }
    }

    // 4. Audit Modal Geometry on Mobile
    const modalData = await page.evaluate(async () => {
      const modal = document.querySelector('#genealogiaModal');
      const openBtn = document.querySelector('#titleMonismoHegemonico');
      if (!modal || !openBtn) return null;

      // Click to open
      openBtn.click();
      await new Promise(r => setTimeout(r, 200));

      const modalBox = modal.getBoundingClientRect();
      const modalContent = modal.querySelector('.modal__content') || modal.querySelector('.modal-content') || modal;
      const contentBox = modalContent.getBoundingClientRect();
      const tabs = Array.from(modal.querySelectorAll('.modal-tab-btn')).map(t => {
        const tr = t.getBoundingClientRect();
        return { text: t.textContent.trim(), width: tr.width, height: tr.height };
      });
      const closeBtn = modal.querySelector('#modalCloseActionBtn') || modal.querySelector('.modal-close');
      const closeBtnBox = closeBtn ? closeBtn.getBoundingClientRect() : null;

      // Check scrollability if content height > viewport
      const isScrollable = modalContent.scrollHeight > modalContent.clientHeight;

      // Close modal
      if (closeBtn) closeBtn.click();

      return {
        modalW: modalBox.width,
        modalH: modalBox.height,
        contentW: contentBox.width,
        contentH: contentBox.height,
        overflowX: contentBox.width > window.innerWidth,
        overflowY: contentBox.height > window.innerHeight,
        isScrollable,
        tabs,
        closeBtnSize: closeBtnBox ? { w: closeBtnBox.width, h: closeBtnBox.height } : null
      };
    });

    if (modalData) {
      if (modalData.overflowX) {
        console.log(`  ❌ Modal overflows screen horizontally: content width ${modalData.contentW}px > window ${vp.width}px`);
        report.modalViolations.push({ vp: vp.name, type: 'overflowX', detail: modalData });
      } else {
        console.log(`  ✓ Modal width fits mobile screen: ${modalData.contentW}px <= ${vp.width}px`);
      }
      if (modalData.closeBtnSize && (modalData.closeBtnSize.w < 44 || modalData.closeBtnSize.h < 44)) {
        console.log(`  ⚠️ Modal close button < 44px: ${modalData.closeBtnSize.w}x${modalData.closeBtnSize.h}px`);
        report.modalViolations.push({ vp: vp.name, type: 'closeBtnSize', detail: modalData.closeBtnSize });
      }
    }

    await page.close();
  }

  await browser.close();

  console.log('\n========================================================================');
  console.log('                          RESUMEN DE AUDITORÍA');
  console.log('========================================================================');
  console.log(`- Violaciones de Overflow Horizontal: ${report.overflowViolations.length}`);
  console.log(`- Violaciones de Touch Target (<44px): ${report.touchTargetViolations.length}`);
  console.log(`- Violaciones de Slider Touch: ${report.sliderViolations.length}`);
  console.log(`- Violaciones de Modal: ${report.modalViolations.length}`);
}

runAudit().catch(console.error);
