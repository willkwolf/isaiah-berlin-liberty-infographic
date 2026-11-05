/**
 * tests/test-svg-experiments.js
 * Multi-viewport empirical test comparing 4 SVG layout configurations (Juegos)
 * across mobile, tablet, and desktop using Playwright.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: 'iPhone SE 1st (320px)', width: 320, height: 568, isMobile: true },
  { name: 'Android Small (360px)', width: 360, height: 640, isMobile: true },
  { name: 'iPhone SE/8 (375px)', width: 375, height: 667, isMobile: true },
  { name: 'iPhone 12/13/14 (390px)', width: 390, height: 844, isMobile: true },
  { name: 'iPhone Pro Max (428px)', width: 428, height: 926, isMobile: true },
  { name: 'Tablet iPad (768px)', width: 768, height: 1024, isMobile: false },
  { name: 'Desktop HD (1280px)', width: 1280, height: 800, isMobile: false },
  { name: 'Desktop Full HD (1920px)', width: 1920, height: 1080, isMobile: false }
];

// Define the 4 configurations ("Juegos") for conflictCurveSvg
const CONFIGURATIONS = {
  juego1_baseline: {
    name: 'Juego 1: Original Baseline (500x120 hardcoded)',
    render: (val, lens, isMobile) => {
      const W = 500, H = 120;
      const pad = { l: 68, r: 25, t: 18, b: 24 };
      const pw = W - pad.l - pad.r;
      const ph = H - pad.t - pad.b;
      function px(x) { return pad.l + (x / 100) * pw; }
      function py(y) { return pad.t + ph - (y / 100) * ph; }
      const pts = [];
      for (let x = 0; x <= 100; x += 2) {
        let y = Math.pow(x / 100, 2.2) * 100;
        pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
      }
      const curY = Math.pow(val / 100, 2.2) * 100;
      return `
        <svg id="testSvg" viewBox="0 0 ${W} ${H}" style="width:100%; height:120px; display:block;">
          <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1"/>
          <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1"/>
          <text id="lblY" x="${pad.l - 6}" y="${pad.t - 4}" fill="#6b7280" font-size="8" font-family="IBM Plex Mono" text-anchor="middle">Costo / Pérdida</text>
          <text id="lblX" x="${pad.l + pw}" y="${pad.t + ph + 16}" fill="#6b7280" font-size="8" font-family="IBM Plex Mono" text-anchor="end">Igualdad</text>
          <polyline points="${pts.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2"/>
          <line x1="${px(val)}" y1="${py(curY)}" x2="${px(val)}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>
          <line x1="${pad.l}" y1="${py(curY)}" x2="${px(val)}" y2="${py(curY)}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>
          <circle cx="${px(val)}" cy="${py(curY)}" r="4.5" fill="#f0ece0" stroke="#4a9eff" stroke-width="2"/>
          <text id="lblVal" x="${px(val) + (val > 65 ? -10 : 10)}" y="${py(curY) - 8}" fill="#4a9eff" font-size="9" font-family="IBM Plex Mono" font-weight="600" text-anchor="${val > 65 ? 'end' : 'start'}">${val}%: ${Math.round(curY)}% Pérdida</text>
          <text id="lblTitle" x="${pad.l + 10}" y="${pad.t + 12}" fill="#4a9eff" font-size="9" font-family="IBM Plex Mono" font-weight="600" opacity="0.75">Curva de Libertad Negativa</text>
        </svg>
      `;
    }
  },

  juego2_unified_responsive: {
    name: 'Juego 2: Unified Proportional (500x170, height:auto, scaled fonts)',
    render: (val, lens, isMobile) => {
      const W = 500, H = 170;
      const pad = { l: 65, r: 25, t: 30, b: 32 };
      const pw = W - pad.l - pad.r;
      const ph = H - pad.t - pad.b;
      function px(x) { return pad.l + (x / 100) * pw; }
      function py(y) { return pad.t + ph - (y / 100) * ph; }
      const pts = [];
      for (let x = 0; x <= 100; x += 2) {
        let y = Math.pow(x / 100, 2.2) * 100;
        pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
      }
      const curY = Math.pow(val / 100, 2.2) * 100;
      return `
        <svg id="testSvg" viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; aspect-ratio:500/170; display:block;">
          <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1.5"/>
          <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1.5"/>
          <text id="lblY" x="${pad.l}" y="${pad.t - 10}" fill="#6b7280" font-size="14" font-family="IBM Plex Mono" text-anchor="start" font-weight="500">Costo / Pérdida</text>
          <text id="lblX" x="${pad.l + pw}" y="${pad.t + ph + 24}" fill="#6b7280" font-size="14" font-family="IBM Plex Mono" text-anchor="end" font-weight="500">Igualdad</text>
          <polyline points="${pts.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2.5"/>
          <line x1="${px(val)}" y1="${py(curY)}" x2="${px(val)}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
          <line x1="${pad.l}" y1="${py(curY)}" x2="${px(val)}" y2="${py(curY)}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
          <circle cx="${px(val)}" cy="${py(curY)}" r="5" fill="#f0ece0" stroke="#4a9eff" stroke-width="2.5"/>
          <text id="lblVal" x="${px(val) + (val > 65 ? -10 : 10)}" y="${py(curY) - 10}" fill="#4a9eff" font-size="14" font-family="IBM Plex Mono" font-weight="600" text-anchor="${val > 65 ? 'end' : 'start'}">${val}%: ${Math.round(curY)}% Pérdida</text>
          <text id="lblTitle" x="${pad.l + pw - 5}" y="${pad.t + 16}" fill="#4a9eff" font-size="13" font-family="IBM Plex Mono" font-weight="600" opacity="0.8" text-anchor="end">Curva de Libertad Negativa</text>
        </svg>
      `;
    }
  },

  juego3_adaptive_breakpoint: {
    name: 'Juego 3: Adaptive Breakpoint (Mobile 360x180 vs Desktop 560x180)',
    render: (val, lens, isMobile) => {
      // Mobile (<500px) gets dedicated mobile-proportional coordinate system
      // Desktop gets expansive landscape coordinate system
      const W = isMobile ? 360 : 560;
      const H = isMobile ? 180 : 180;
      const pad = isMobile 
        ? { l: 56, r: 18, t: 32, b: 34 }
        : { l: 65, r: 25, t: 30, b: 32 };
      const pw = W - pad.l - pad.r;
      const ph = H - pad.t - pad.b;
      function px(x) { return pad.l + (x / 100) * pw; }
      function py(y) { return pad.t + ph - (y / 100) * ph; }
      const pts = [];
      for (let x = 0; x <= 100; x += 2) {
        let y = Math.pow(x / 100, 2.2) * 100;
        pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
      }
      const curY = Math.pow(val / 100, 2.2) * 100;
      const fAxis = isMobile ? 12 : 13;
      const fVal = isMobile ? 12 : 13;
      const fTitle = isMobile ? 11 : 12;

      return `
        <svg id="testSvg" viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; aspect-ratio:${W}/${H}; display:block;">
          <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1.25"/>
          <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1.25"/>
          <text id="lblY" x="${pad.l}" y="${pad.t - 8}" fill="#6b7280" font-size="${fAxis}" font-family="IBM Plex Mono" text-anchor="start" font-weight="500">Costo / Pérdida</text>
          <text id="lblX" x="${pad.l + pw}" y="${pad.t + ph + 22}" fill="#6b7280" font-size="${fAxis}" font-family="IBM Plex Mono" text-anchor="end" font-weight="500">Igualdad</text>
          <polyline points="${pts.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2"/>
          <line x1="${px(val)}" y1="${py(curY)}" x2="${px(val)}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>
          <line x1="${pad.l}" y1="${py(curY)}" x2="${px(val)}" y2="${py(curY)}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>
          <circle cx="${px(val)}" cy="${py(curY)}" r="4.5" fill="#f0ece0" stroke="#4a9eff" stroke-width="2"/>
          <text id="lblVal" x="${px(val) + (val > 65 ? -8 : 8)}" y="${py(curY) - 8}" fill="#4a9eff" font-size="${fVal}" font-family="IBM Plex Mono" font-weight="600" text-anchor="${val > 65 ? 'end' : 'start'}">${val}%: ${Math.round(curY)}% Pérdida</text>
          <text id="lblTitle" x="${pad.l + pw}" y="${pad.t - 8}" fill="#4a9eff" font-size="${fTitle}" font-family="IBM Plex Mono" font-weight="600" opacity="0.8" text-anchor="end">Curva de Libertad Negativa</text>
        </svg>
      `;
    }
  },

  juego4_tufte_pill_adaptive: {
    name: 'Juego 4: Tufte Precision Adaptive (Anti-collision pill badge, Tufte range markers)',
    render: (val, lens, isMobile) => {
      const W = isMobile ? 350 : 580;
      const H = isMobile ? 190 : 200;
      const pad = isMobile 
        ? { l: 52, r: 16, t: 36, b: 36 }
        : { l: 64, r: 24, t: 38, b: 38 };
      const pw = W - pad.l - pad.r;
      const ph = H - pad.t - pad.b;
      function px(x) { return pad.l + (x / 100) * pw; }
      function py(y) { return pad.t + ph - (y / 100) * ph; }
      const pts = [];
      for (let x = 0; x <= 100; x += 2) {
        let y = Math.pow(x / 100, 2.2) * 100;
        pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
      }
      const curY = Math.pow(val / 100, 2.2) * 100;
      const fAxis = isMobile ? 12 : 13;
      const fVal = isMobile ? 11.5 : 12.5;
      const fTitle = isMobile ? 11 : 12;

      // Smart anchor to never clip badge text
      const anchorEnd = val > 60;
      const textX = anchorEnd ? px(val) - 10 : px(val) + 10;
      const textAnchor = anchorEnd ? 'end' : 'start';
      const textY = Math.max(pad.t + 12, Math.min(pad.t + ph - 8, py(curY) - 10));

      return `
        <svg id="testSvg" viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; aspect-ratio:${W}/${H}; display:block;">
          <!-- Axes (Tufte subtle frame) -->
          <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1.25"/>
          <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1.25"/>

          <!-- Axis Labels with generous margin -->
          <text id="lblY" x="${pad.l}" y="${pad.t - 14}" fill="#9ca3af" font-size="${fAxis}" font-family="IBM Plex Mono" text-anchor="start" font-weight="600">Costo / Pérdida ↑</text>
          <text id="lblX" x="${pad.l + pw}" y="${pad.t + ph + 24}" fill="#9ca3af" font-size="${fAxis}" font-family="IBM Plex Mono" text-anchor="end" font-weight="600">Igualdad →</text>

          <!-- Trajectory Curve -->
          <polyline points="${pts.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Intersection Guides -->
          <line x1="${px(val)}" y1="${py(curY)}" x2="${px(val)}" y2="${pad.t + ph}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
          <line x1="${pad.l}" y1="${py(curY)}" x2="${px(val)}" y2="${py(curY)}" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>

          <!-- Current value dot -->
          <circle cx="${px(val)}" cy="${py(curY)}" r="4.5" fill="#1e293b" stroke="#4a9eff" stroke-width="2.5"/>

          <!-- Value annotation -->
          <text id="lblVal" x="${textX}" y="${textY}" fill="#4a9eff" font-size="${fVal}" font-family="IBM Plex Mono" font-weight="600" text-anchor="${textAnchor}">
            ${val}% eq: ${Math.round(curY)}% pérdida
          </text>

          <!-- Top-right curve title -->
          <text id="lblTitle" x="${pad.l + pw}" y="${pad.t - 14}" fill="#4a9eff" font-size="${fTitle}" font-family="IBM Plex Mono" font-weight="600" opacity="0.85" text-anchor="end">Curva de Libertad Negativa</text>
        </svg>
      `;
    }
  }
};

async function evaluateConfigInViewport(page, configKey, vp, sliderVal = 50) {
  const isMobile = vp.width < 500;
  const cfg = CONFIGURATIONS[configKey];
  const svgHtml = cfg.render(sliderVal, 'negativa', isMobile);

  const testDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f172a; color: #f8fafc; font-family: 'IBM Plex Mono', monospace; padding: 1rem; }
        .container {
          width: 100%;
          max-width: ${vp.width < 768 ? '100%' : '650px'};
          margin: 0 auto;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="container" id="container">
        ${svgHtml}
      </div>
    </body>
    </html>
  `;

  await page.setContent(testDoc, { waitUntil: 'load' });
  await page.waitForTimeout(100);

  return await page.evaluate(() => {
    const svg = document.querySelector('#testSvg');
    const container = document.querySelector('#container');
    const svgBox = svg.getBoundingClientRect();
    const contBox = container.getBoundingClientRect();

    const texts = Array.from(svg.querySelectorAll('text')).map(t => {
      const r = t.getBoundingClientRect();
      const style = window.getComputedStyle(t);
      return {
        id: t.id || 'unnamed',
        content: t.textContent.trim().replace(/\s+/g, ' '),
        renderedPx: parseFloat(style.fontSize),
        w: Math.round(r.width * 10) / 10,
        h: Math.round(r.height * 10) / 10,
        clippedLeft: r.left < svgBox.left - 0.5,
        clippedRight: r.right > svgBox.right + 0.5,
        clippedTop: r.top < svgBox.top - 0.5,
        clippedBottom: r.bottom > svgBox.bottom + 0.5
      };
    });

    const minFontPx = Math.min(...texts.map(t => t.renderedPx));
    const maxFontPx = Math.max(...texts.map(t => t.renderedPx));
    const clippedCount = texts.filter(t => t.clippedLeft || t.clippedRight || t.clippedTop || t.clippedBottom).length;
    const illegibleCount = texts.filter(t => t.renderedPx < 11).length;

    return {
      svgWidth: Math.round(svgBox.width),
      svgHeight: Math.round(svgBox.height),
      aspectRatio: (svgBox.width / (svgBox.height || 1)).toFixed(2),
      minFontPx: Math.round(minFontPx * 10) / 10,
      maxFontPx: Math.round(maxFontPx * 10) / 10,
      clippedCount,
      illegibleCount,
      texts
    };
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  console.log('========================================================================================');
  console.log('   EXPERIMENTO MULTI-VIEWPORT: EVALUACIÓN DE PROPORCIONES SVG (JUEGOS 1 - 4)');
  console.log('========================================================================================\n');

  const matrix = {};

  for (const cfgKey of Object.keys(CONFIGURATIONS)) {
    matrix[cfgKey] = {};
    console.log(`\n----------------------------------------------------------------------------------------`);
    console.log(`EVALUANDO: ${CONFIGURATIONS[cfgKey].name}`);
    console.log(`----------------------------------------------------------------------------------------`);

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2
      });

      const metrics = await evaluateConfigInViewport(page, cfgKey, vp, 50);
      matrix[cfgKey][vp.name] = metrics;

      const status = metrics.illegibleCount === 0 && metrics.clippedCount === 0 ? '✓ PASS' : '❌ FAIL';
      console.log(`[${vp.name}] SVG: ${metrics.svgWidth}x${metrics.svgHeight}px (Ratio: ${metrics.aspectRatio}) | Fonts: ${metrics.minFontPx}px - ${metrics.maxFontPx}px | Illegible: ${metrics.illegibleCount} | Clipped: ${metrics.clippedCount} => ${status}`);

      await page.close();
    }
  }

  await browser.close();

  // Print comparison summary
  console.log('\n========================================================================================');
  console.log('                               RESUMEN COMPARATIVO');
  console.log('========================================================================================');
  console.log('Configuración\t\t\t\tMobile (320px)\t\tStandard (375px)\tDesktop (1280px)\tResultado');
  console.log('----------------------------------------------------------------------------------------');
  for (const [key, results] of Object.entries(matrix)) {
    const m320 = results['iPhone SE 1st (320px)'];
    const m375 = results['iPhone SE/8 (375px)'];
    const d1280 = results['Desktop HD (1280px)'];
    const passAll = Object.values(results).every(r => r.illegibleCount === 0 && r.clippedCount === 0);
    console.log(`${key.padEnd(25)}\t${m320.minFontPx}px (${m320.aspectRatio})\t\t${m375.minFontPx}px (${m375.aspectRatio})\t\t${d1280.minFontPx}px (${d1280.aspectRatio})\t\t${passAll ? 'APROBADO' : 'FALLO'}`);
  }
}

run().catch(console.error);
