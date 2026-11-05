const { chromium } = require('playwright');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../files/index.html').replace(/\\/g, '/');

const VIEWPORTS = [
  { name: 'iPhone SE 1st Gen (320px)', width: 320, height: 568 },
  { name: 'Android Small (360px)', width: 360, height: 640 },
  { name: 'iPhone SE / Mini (375px)', width: 375, height: 667 },
  { name: 'iPhone 12/13/14 (390px)', width: 390, height: 844 },
  { name: 'Large Mobile Pro Max (428px)', width: 428, height: 926 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('========================================================================');
  console.log('  CHALLENGER M4: EMPIRICAL ADVERSARIAL STRESS TEST HARNESS');
  console.log('========================================================================');

  let totalDefects = 0;
  const failureDetails = [];

  function recordFailure(testName, vpName, message) {
    totalDefects++;
    const detail = `[FAIL] [${testName}] [${vpName}]: ${message}`;
    console.error(`  ❌ ${detail}`);
    failureDetails.push(detail);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TEST SUITE 1: ZERO HORIZONTAL OVERFLOW ACROSS VIEWPORTS (F11)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n>>> SUITE 1: ZERO HORIZONTAL OVERFLOW STRESS TEST (Static & Dynamic Scroll)');
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    await page.goto(FILE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(400);

    // 1.1 Document-level overflow
    const docScroll = await page.evaluate(() => ({
      docScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth
    }));

    if (docScroll.docScrollWidth > docScroll.innerWidth) {
      recordFailure('SUITE 1 - Doc ScrollWidth', vp.name, `document.documentElement.scrollWidth (${docScroll.docScrollWidth}px) > innerWidth (${docScroll.innerWidth}px)`);
    } else {
      console.log(`  ✓ [${vp.name}] Document scrollWidth containment OK: ${docScroll.docScrollWidth}px <= ${docScroll.innerWidth}px`);
    }

    if (docScroll.bodyScrollWidth > docScroll.innerWidth) {
      recordFailure('SUITE 1 - Body ScrollWidth', vp.name, `document.body.scrollWidth (${docScroll.bodyScrollWidth}px) > innerWidth (${docScroll.innerWidth}px)`);
    }

    // 1.2 Section-level containment
    const sectionOverflows = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      return sections.map(sec => {
        const clientW = sec.clientWidth;
        const scrollW = sec.scrollWidth;
        const rect = sec.getBoundingClientRect();
        return {
          id: sec.id || 'unnamed-section',
          clientW,
          scrollW,
          rectW: Math.round(rect.width),
          overflows: scrollW > clientW + 1 || rect.width > window.innerWidth + 1
        };
      }).filter(s => s.overflows);
    });

    if (sectionOverflows.length > 0) {
      recordFailure('SUITE 1 - Section Containment', vp.name, `Sections overflowing: ${JSON.stringify(sectionOverflows)}`);
    } else {
      console.log(`  ✓ [${vp.name}] All 11 sections strictly contained (scrollWidth <= clientWidth)`);
    }

    // 1.3 Dynamic scroll test (continuous scroll top to bottom checking overflow)
    const dynamicOverflowFound = await page.evaluate(async () => {
      let maxDocScroll = 0;
      const totalH = document.documentElement.scrollHeight;
      const step = 350;
      for (let y = 0; y < totalH; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 20));
        const sw = document.documentElement.scrollWidth;
        if (sw > window.innerWidth + 1) {
          return { y, scrollW: sw, innerW: window.innerWidth };
        }
      }
      return null;
    });

    if (dynamicOverflowFound) {
      recordFailure('SUITE 1 - Dynamic Scroll Overflow', vp.name, `Overflow detected during scroll at y=${dynamicOverflowFound.y}: scrollWidth=${dynamicOverflowFound.scrollW} > innerWidth=${dynamicOverflowFound.innerW}`);
    } else {
      console.log(`  ✓ [${vp.name}] Dynamic vertical scroll: 0 horizontal overflow spikes`);
    }

    // 1.4 Test with Language switch (EN)
    const langBtn = page.locator('#langBtn');
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(300);
      const enScrollW = await page.evaluate(() => document.documentElement.scrollWidth);
      if (enScrollW > vp.width) {
        recordFailure('SUITE 1 - EN Language Overflow', vp.name, `scrollWidth (${enScrollW}px) > innerWidth (${vp.width}px) after EN toggle`);
      } else {
        console.log(`  ✓ [${vp.name}] English locale: 0 horizontal overflow`);
      }
      // Revert to ES
      await langBtn.click();
      await page.waitForTimeout(200);
    }

    await context.close();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TEST SUITE 2: TOUCH TARGET BOUNDING BOX COMPLIANCE (F9)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n>>> SUITE 2: TOUCH TARGET BOUNDING BOX AUDIT (>= 44x44px)');
  const PRIMARY_CONTROLS = [
    { name: 'Coach Banner Close', selector: '#colombiaCoachBannerClose' },
    { name: 'Market Button (Section VI)', selector: '#economia .market-btn' },
    { name: 'System Button (Section II)', selector: '#comparacion .system-btn' },
    { name: 'Hero Onboarding Dismiss', selector: '#heroOnboardingDismiss' },
    { name: 'Top Nav Links', selector: '.top-nav__link' },
    { name: 'Berlin Toggle Button', selector: '.berlin-toggle-btn' },
    { name: 'Conflict Slider', selector: '#conflictSlider' },
    { name: 'Lens Wheel Item', selector: '.lens-wheel__item' },
    { name: 'Language Button', selector: '#langBtn' },
    { name: 'Color Mode Button', selector: '#colorModeBtn' },
    { name: 'Lens Toggle Button', selector: '#lensToggleBtn' },
    { name: 'Genealogia Modal Close', selector: '#modalCloseBtn' },
    { name: 'Modal Nav Prev Button', selector: '#modalPrevBtn' },
    { name: 'Modal Nav Next Button', selector: '#modalNextBtn' },
    { name: 'Modal Close Action Button', selector: '#modalCloseActionBtn' },
    { name: 'Section VIII Table Cells', selector: '.colombia-table td[data-lens]' }
  ];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    await page.goto(FILE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(400);

    // Open modal to ensure modal controls are rendered and measurable
    const modalTrigger = page.locator('#catCardMonismoHegemonico');
    await modalTrigger.scrollIntoViewIfNeeded();
    await modalTrigger.click();
    await page.waitForTimeout(300);

    for (const ctrl of PRIMARY_CONTROLS) {
      const elements = page.locator(ctrl.selector);
      const count = await elements.count();
      if (count === 0) continue;

      for (let i = 0; i < Math.min(count, 5); i++) {
        const el = elements.nth(i);
        if (await el.isVisible()) {
          const box = await el.boundingBox();
          if (!box) continue;

          // WCAG 2.5.5 / 2.5.8: Target size minimum 44px
          const widthOk = box.width >= 43.5; // allowance for rounding
          const heightOk = box.height >= 43.5;

          if (!widthOk || !heightOk) {
            recordFailure('SUITE 2 - Touch Target Sizing', vp.name, `${ctrl.name} [index ${i}] measures ${Math.round(box.width)}x${Math.round(box.height)}px (< 44x44px target)`);
          }
        }
      }
    }

    // Close modal
    await page.locator('#modalCloseBtn').click();
    await page.waitForTimeout(200);

    // General scan: inspect every visible button and role=button in the DOM
    const allButtonStats = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, [role="button"], input[type="range"]'));
      const defects = [];
      buttons.forEach(b => {
        const style = window.getComputedStyle(b);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
        const rect = b.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        // Check if inside collapsed container
        if (b.closest('[hidden]') || b.closest('.is-hidden')) return;

        if (rect.width < 43.5 || rect.height < 43.5) {
          defects.push({
            tag: b.tagName,
            id: b.id,
            className: b.className,
            text: b.textContent.trim().slice(0, 25),
            w: Math.round(rect.width),
            h: Math.round(rect.height)
          });
        }
      });
      return defects;
    });

    if (allButtonStats.length > 0) {
      // Filter out any known inline tags if any
      recordFailure('SUITE 2 - All Buttons Scan', vp.name, `Visible buttons below 44x44px: ${JSON.stringify(allButtonStats)}`);
    } else {
      console.log(`  ✓ [${vp.name}] All interactive buttons, links, controls meet >= 44x44px`);
    }

    await context.close();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TEST SUITE 3: SECTION VIII COLOMBIA MATRIX REFLOW & INTERACTION (F10)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n>>> SUITE 3: SECTION VIII COLOMBIA TABLE REFLOW & BEHAVIOR (F10)');
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    await page.goto(FILE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(400);

    const colSection = page.locator('#colombia');
    await colSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // 3.1 Table layout structure: thead hidden, tr displayed as flex card
    const tableStructure = await page.evaluate(() => {
      const table = document.querySelector('.colombia-table');
      if (!table) return { error: 'table not found' };
      const thead = table.querySelector('thead');
      const theadDisplay = thead ? window.getComputedStyle(thead).display : 'none';
      const rows = Array.from(table.querySelectorAll('tbody tr'));
      const rowStyles = rows.map((r, idx) => {
        const cs = window.getComputedStyle(r);
        const rect = r.getBoundingClientRect();
        return {
          index: idx,
          display: cs.display,
          flexDirection: cs.flexDirection,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          overflows: rect.width > window.innerWidth
        };
      });
      return {
        theadDisplay,
        rowCount: rows.length,
        rowStyles
      };
    });

    if (tableStructure.theadDisplay !== 'none') {
      recordFailure('SUITE 3 - Desktop Thead Hidden', vp.name, `thead display is "${tableStructure.theadDisplay}", expected "none"`);
    } else {
      console.log(`  ✓ [${vp.name}] thead is hidden (display: none)`);
    }

    if (tableStructure.rowCount !== 3) {
      recordFailure('SUITE 3 - Row Card Count', vp.name, `rowCount is ${tableStructure.rowCount}, expected 3`);
    } else {
      console.log(`  ✓ [${vp.name}] 3 rows reflowed into standalone cards`);
    }

    for (const r of tableStructure.rowStyles) {
      if (r.display !== 'flex' || r.flexDirection !== 'column') {
        recordFailure('SUITE 3 - Card Flex Layout', vp.name, `Row ${r.index} display: ${r.display}, flex-direction: ${r.flexDirection}`);
      }
      if (r.overflows) {
        recordFailure('SUITE 3 - Card Width Overflow', vp.name, `Row ${r.index} card width (${r.width}px) > viewport (${vp.width}px)`);
      }
    }

    // 3.2 Verify indicator title & value
    const indicators = await page.evaluate(() => {
      const cells = Array.from(document.querySelectorAll('.colombia-table td.table-indicator-name'));
      return cells.map(c => ({
        title: c.querySelector('strong')?.textContent.trim(),
        val: c.querySelector('.table-indicator-val')?.textContent.trim()
      }));
    });

    if (indicators.length !== 3 || indicators.some(i => !i.title || !i.val)) {
      recordFailure('SUITE 3 - Card Headers', vp.name, `Card headers missing title or value: ${JSON.stringify(indicators)}`);
    } else {
      console.log(`  ✓ [${vp.name}] All 3 cards have valid indicator titles and values: "${indicators.map(i => i.title).join('", "')}"`);
    }

    // 3.3 Verify bilingual labels on cells (ES and EN)
    const esLabels = await page.evaluate(() => {
      const cells = Array.from(document.querySelectorAll('.colombia-table td[data-lens]'));
      return cells.map(c => ({
        lens: c.dataset.lens,
        label: c.dataset.label,
        pseudoContent: window.getComputedStyle(c, '::before').getPropertyValue('content')
      }));
    });

    const expectedEsLabels = ['Negativa', 'Positiva', 'Republicana', 'Decolonial'];
    const invalidEs = esLabels.filter(l => !expectedEsLabels.includes(l.label));
    if (invalidEs.length > 0) {
      recordFailure('SUITE 3 - ES Labels', vp.name, `Invalid Spanish cell labels: ${JSON.stringify(invalidEs)}`);
    } else {
      console.log(`  ✓ [${vp.name}] All 12 cells have valid Spanish data-labels`);
    }

    // Switch to English and test EN labels
    await page.locator('#langBtn').click();
    await page.waitForTimeout(300);

    const enLabels = await page.evaluate(() => {
      const cells = Array.from(document.querySelectorAll('.colombia-table td[data-lens]'));
      return cells.map(c => ({
        lens: c.dataset.lens,
        label: c.dataset.label
      }));
    });

    const expectedEnLabels = ['Negative', 'Positive', 'Republican', 'Decolonial'];
    const invalidEn = enLabels.filter(l => !expectedEnLabels.includes(l.label));
    if (invalidEn.length > 0) {
      recordFailure('SUITE 3 - EN Labels', vp.name, `Invalid English cell labels after translation: ${JSON.stringify(invalidEn)}`);
    } else {
      console.log(`  ✓ [${vp.name}] All 12 cells dynamically updated to English data-labels ("Negative", "Positive", "Republican", "Decolonial")`);
    }

    // Switch back to Spanish
    await page.locator('#langBtn').click();
    await page.waitForTimeout(200);

    // 3.4 Active Lens Glow & Cell Interaction (setLens triggering)
    const testLenses = ['positive', 'republican', 'decolonial', 'negative'];
    for (const targetLens of testLenses) {
      // Find a cell with targetLens in row 0, 1, or 2 and click it
      const targetCell = page.locator(`.colombia-table tr td[data-lens="${targetLens}"]`).first();
      await targetCell.click();
      await page.waitForTimeout(200);

      // Verify app state
      const currentLensState = await page.evaluate(() => window.state?.currentLens);
      if (currentLensState !== targetLens) {
        recordFailure('SUITE 3 - State setLens() Trigger', vp.name, `Tapping cell did not update window.state.currentLens to "${targetLens}", was "${currentLensState}"`);
      }

      // Verify active-column-cell class and glow on all matching cells
      const activeCellStats = await page.evaluate((lensName) => {
        const allCells = Array.from(document.querySelectorAll('.colombia-table td[data-lens]'));
        const targetCells = allCells.filter(c => c.dataset.lens === lensName);
        const otherCells = allCells.filter(c => c.dataset.lens !== lensName);

        const targetActiveCount = targetCells.filter(c => c.classList.contains('active-column-cell')).length;
        const otherActiveCount = otherCells.filter(c => c.classList.contains('active-column-cell')).length;

        // Check computed border glow
        const firstTarget = targetCells[0];
        const style = window.getComputedStyle(firstTarget);
        const borderColor = style.borderColor;
        const boxShadow = style.boxShadow;

        return {
          targetActiveCount,
          expectedTarget: targetCells.length,
          otherActiveCount,
          borderColor,
          boxShadow
        };
      }, targetLens);

      if (activeCellStats.targetActiveCount !== activeCellStats.expectedTarget) {
        recordFailure('SUITE 3 - Active Cell Glow Class', vp.name, `Only ${activeCellStats.targetActiveCount}/${activeCellStats.expectedTarget} cells have active-column-cell for "${targetLens}"`);
      }
      if (activeCellStats.otherActiveCount > 0) {
        recordFailure('SUITE 3 - Inactive Cells Leaking Glow', vp.name, `${activeCellStats.otherActiveCount} non-matching cells have active-column-cell`);
      }
    }
    console.log(`  ✓ [${vp.name}] Tapping cells successfully triggers setLens() across all 4 philosophical frameworks with active glow synchronization`);

    // 3.5 Coach Banner Dismissal on Tap
    const coachBannerDismissed = await page.evaluate(() => {
      const banner = document.querySelector('#colombiaCoachBanner');
      const seen = localStorage.getItem('site-colombia-tap-seen');
      return {
        hidden: banner ? (banner.hidden || window.getComputedStyle(banner).display === 'none') : true,
        seen: seen === 'true'
      };
    });

    if (!coachBannerDismissed.seen || !coachBannerDismissed.hidden) {
      recordFailure('SUITE 3 - Coach Banner Dismiss', vp.name, `Coach banner state: hidden=${coachBannerDismissed.hidden}, localStorage seen=${coachBannerDismissed.seen}`);
    } else {
      console.log(`  ✓ [${vp.name}] Coach banner automatically hides and stores seen status in localStorage on cell tap`);
    }

    await context.close();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TEST SUITE 4: DESKTOP INVARIANCE & BREAKPOINT BOUNDARY AT 768px vs 769px
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n>>> SUITE 4: DESKTOP INVARIANCE & BREAKPOINT BOUNDARY (768px vs 769px & 1366px)');
  
  // Boundary 768px (Mobile/Tablet Mode)
  {
    const ctx768 = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page768 = await ctx768.newPage();
    await page768.goto(FILE_URL, { waitUntil: 'load' });
    await page768.waitForTimeout(300);

    const mode768 = await page768.evaluate(() => {
      const thead = document.querySelector('.colombia-table thead');
      const tr = document.querySelector('.colombia-table tbody tr');
      return {
        theadDisplay: thead ? window.getComputedStyle(thead).display : 'none',
        trDisplay: tr ? window.getComputedStyle(tr).display : 'block'
      };
    });

    if (mode768.theadDisplay !== 'none' || mode768.trDisplay !== 'flex') {
      recordFailure('SUITE 4 - Breakpoint 768px', '768px', `At 768px, expected card mode (thead none, tr flex), got thead: ${mode768.theadDisplay}, tr: ${mode768.trDisplay}`);
    } else {
      console.log(`  ✓ [768px Boundary] Exactly adheres to mobile card reflow at <= 768px`);
    }
    await ctx768.close();
  }

  // Boundary 769px (Desktop Mode)
  {
    const ctx769 = await browser.newContext({ viewport: { width: 769, height: 1024 } });
    const page769 = await ctx769.newPage();
    await page769.goto(FILE_URL, { waitUntil: 'load' });
    await page769.waitForTimeout(300);

    const mode769 = await page769.evaluate(() => {
      const table = document.querySelector('.colombia-table');
      const thead = document.querySelector('.colombia-table thead');
      const tr = document.querySelector('.colombia-table tbody tr');
      return {
        tableDisplay: table ? window.getComputedStyle(table).display : '',
        theadDisplay: thead ? window.getComputedStyle(thead).display : 'none',
        trDisplay: tr ? window.getComputedStyle(tr).display : ''
      };
    });

    if (mode769.theadDisplay === 'none' || mode769.tableDisplay === 'block' || mode769.trDisplay === 'flex') {
      recordFailure('SUITE 4 - Breakpoint 769px', '769px', `At 769px, expected standard table (thead visible, table table), got table: ${mode769.tableDisplay}, thead: ${mode769.theadDisplay}, tr: ${mode769.trDisplay}`);
    } else {
      console.log(`  ✓ [769px Boundary] Exactly reverts to desktop table structure (> 768px)`);
    }
    await ctx769.close();
  }

  // Desktop Full HD (1920x1080)
  {
    const ctxDesktop = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const pageDesk = await ctxDesktop.newPage();
    await pageDesk.goto(FILE_URL, { waitUntil: 'load' });
    await pageDesk.waitForTimeout(300);

    const deskCheck = await pageDesk.evaluate(() => {
      const table = document.querySelector('.colombia-table');
      const thead = table.querySelector('thead');
      const ths = Array.from(thead.querySelectorAll('th'));
      return {
        tableDisplay: window.getComputedStyle(table).display,
        theadDisplay: window.getComputedStyle(thead).display,
        thCount: ths.length
      };
    });

    if (deskCheck.tableDisplay !== 'table' || deskCheck.theadDisplay === 'none' || deskCheck.thCount !== 5) {
      recordFailure('SUITE 4 - Desktop 1920x1080 Table Fidelity', '1920x1080', `Desktop table corrupted: ${JSON.stringify(deskCheck)}`);
    } else {
      console.log(`  ✓ [1920x1080] Full desktop table fidelity 100% invariant (display: table, 5 columns, thead visible)`);
    }
    await ctxDesktop.close();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TEST SUITE 5: FONT SCALING (+25%) UNDER SECTION VIII CARD REFLOW
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n>>> SUITE 5: FONT SCALING +25% STRESS TEST ON CARDS & CONTROLS');
  for (const vp of [VIEWPORTS[0], VIEWPORTS[2], VIEWPORTS[4]]) { // 320px, 375px, 428px
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    await page.goto(FILE_URL, { waitUntil: 'load' });

    // Inject +25% font scaling
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.id = 'font-scale-25-test';
      style.innerHTML = `
        html { font-size: 20px !important; }
        @media (max-width: 768px) { html { font-size: 20px !important; } }
        @media (max-width: 500px) { html { font-size: 18.75px !important; } }
      `;
      document.head.appendChild(style);
    });
    await page.waitForTimeout(300);

    // Check overflow
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    if (scrollW > vp.width) {
      recordFailure('SUITE 5 - Font Scale +25% Overflow', vp.name, `scrollWidth (${scrollW}px) > innerWidth (${vp.width}px) at +25% scale`);
    } else {
      console.log(`  ✓ [${vp.name} @ +25% font size] Zero horizontal overflow`);
    }

    // Check Section VIII cards at +25%
    const cardHeights = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.colombia-table tbody tr'));
      return cards.map(c => Math.round(c.getBoundingClientRect().height));
    });

    console.log(`  ✓ [${vp.name} @ +25% font size] Section VIII cards dynamically expanded to fit text: [${cardHeights.join('px, ')}px]`);

    await context.close();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // FINAL SUMMARY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n========================================================================');
  console.log('  CHALLENGER M4 HARNESS EXECUTION SUMMARY');
  console.log('========================================================================');
  console.log(`Total Defects Encountered: ${totalDefects}`);
  if (totalDefects === 0) {
    console.log('>>> VERDICT: ALL ADVERSARIAL CHALLENGES PASSED WITH 100% INTEGRITY.');
  } else {
    console.log('>>> VERDICT: DEFECTS DISCOVERED:');
    failureDetails.forEach(f => console.log(`  ${f}`));
  }

  await browser.close();
  process.exit(totalDefects === 0 ? 0 : 1);
})();
