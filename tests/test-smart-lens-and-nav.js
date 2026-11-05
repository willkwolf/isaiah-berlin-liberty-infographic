const { chromium } = require('playwright');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, '../files/index.html').replace(/\\/g, '/');

async function testSmartLensAndNav() {
  console.log('========================================================================');
  console.log('   VERIFYING SMART LENS VISIBILITY & TOP-NAV SCROLL AUTO-COLLAPSE');
  console.log('========================================================================\n');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await page.goto(FILE_URL);
  await page.waitForTimeout(400);

  // Dismiss onboarding if present
  await page.evaluate(() => {
    const d = document.getElementById('heroOnboardingDismiss');
    if (d && d.offsetParent !== null) d.click();
  });
  await page.waitForTimeout(200);

  // 1. Verify Top-Nav visible at top
  const initialNavVisible = await page.evaluate(() => {
    const nav = document.querySelector('.top-nav');
    return !nav.classList.contains('top-nav--hidden');
  });
  console.log('1. Top-Nav visible at scroll 0:', initialNavVisible);
  if (!initialNavVisible) throw new Error('Top-Nav should be visible at top of page');

  // 2. Verify Lens Panel is HIDDEN at Hero / #problema
  let lensPanelVisible = await page.evaluate(() => {
    const p = document.getElementById('lensPanel');
    return p.classList.contains('lens-panel--visible');
  });
  console.log('2. Lens Panel hidden in #problema:', !lensPanelVisible);
  if (lensPanelVisible) throw new Error('Lens Panel should be hidden in #problema');

  // 3. Scroll to #berlin (non-reactive section): Lens Panel should REMAIN HIDDEN
  await page.evaluate(() => document.getElementById('berlin').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(300);
  lensPanelVisible = await page.evaluate(() => document.getElementById('lensPanel').classList.contains('lens-panel--visible'));
  console.log('3. Lens Panel hidden in #berlin (non-reactive):', !lensPanelVisible);
  if (lensPanelVisible) throw new Error('Lens Panel should be hidden in #berlin');

  // Also check that .lens-interpretation in #berlin is hidden
  const berlinInterpHidden = await page.evaluate(() => {
    const el = document.querySelector('#berlin .lens-interpretation');
    return !el || window.getComputedStyle(el).display === 'none';
  });
  console.log('   - Trivial interpretation callout hidden in #berlin:', berlinInterpHidden);
  if (!berlinInterpHidden) throw new Error('#berlin .lens-interpretation should be hidden');

  // 4. Scroll to #conflicto (reactive SVG curve section): Lens Panel should BECOME VISIBLE!
  await page.evaluate(() => document.getElementById('conflicto').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(350);
  lensPanelVisible = await page.evaluate(() => document.getElementById('lensPanel').classList.contains('lens-panel--visible'));
  console.log('4. Lens Panel SHOWN in #conflicto (reactive SVG curve):', lensPanelVisible);
  if (!lensPanelVisible) throw new Error('Lens Panel should be visible in #conflicto');

  // 5. Scroll to #limites (non-reactive cases): Lens Panel should HIDE AGAIN!
  await page.evaluate(() => document.getElementById('limites').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(350);
  lensPanelVisible = await page.evaluate(() => document.getElementById('lensPanel').classList.contains('lens-panel--visible'));
  console.log('5. Lens Panel hidden in #limites (non-reactive):', !lensPanelVisible);
  if (lensPanelVisible) throw new Error('Lens Panel should be hidden in #limites');

  // 6. Scroll to #poder (reactive network graph section): Lens Panel should BECOME VISIBLE!
  await page.evaluate(() => document.getElementById('poder').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(350);
  lensPanelVisible = await page.evaluate(() => document.getElementById('lensPanel').classList.contains('lens-panel--visible'));
  console.log('6. Lens Panel SHOWN in #poder (reactive power graph):', lensPanelVisible);
  if (!lensPanelVisible) throw new Error('Lens Panel should be visible in #poder');

  // 7. Scroll to #colombia (reactive matrix section): Lens Panel should BECOME VISIBLE!
  await page.evaluate(() => document.getElementById('colombia').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(350);
  lensPanelVisible = await page.evaluate(() => document.getElementById('lensPanel').classList.contains('lens-panel--visible'));
  console.log('7. Lens Panel SHOWN in #colombia (reactive matrix):', lensPanelVisible);
  if (!lensPanelVisible) throw new Error('Lens Panel should be visible in #colombia');

  // 8. Scroll to #cierre (non-reactive closing section): Lens Panel should HIDE!
  await page.evaluate(() => document.getElementById('cierre').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(350);
  lensPanelVisible = await page.evaluate(() => document.getElementById('lensPanel').classList.contains('lens-panel--visible'));
  console.log('8. Lens Panel hidden in #cierre (closing section):', !lensPanelVisible);
  if (lensPanelVisible) throw new Error('Lens Panel should be hidden in #cierre');

  // 9. Test Top-Nav Scroll Hide on Downward Scroll & Reveal on Upward Scroll
  console.log('\n--- Testing Top-Nav Smart Scroll Dynamics ---');
  await page.evaluate(() => window.scrollTo({ top: 100, behavior: 'instant' }));
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
  await page.waitForTimeout(150);

  const navHiddenOnScrollDown = await page.evaluate(() => {
    return document.querySelector('.top-nav').classList.contains('top-nav--hidden');
  });
  console.log('9. Top-Nav collapsed on downward scroll (delta > 3):', navHiddenOnScrollDown);
  if (!navHiddenOnScrollDown) throw new Error('Top-Nav should hide on scroll down');

  // Rapid upward scroll (e.g. from 300 to 220, delta = -80)
  await page.evaluate(() => window.scrollTo({ top: 220, behavior: 'instant' }));
  await page.waitForTimeout(150);

  const navRevealedOnScrollUp = await page.evaluate(() => {
    return !document.querySelector('.top-nav').classList.contains('top-nav--hidden');
  });
  console.log('10. Top-Nav revealed on rapid upward scroll:', navRevealedOnScrollUp);
  if (!navRevealedOnScrollUp) throw new Error('Top-Nav should reveal on rapid upward scroll');

  console.log('\n========================================================================');
  console.log('✓ ALL SMART VISIBILITY & SCROLL DYNAMICS PASSED 100%!');
  console.log('========================================================================\n');

  await browser.close();
}

testSmartLensAndNav().catch(err => {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
});
