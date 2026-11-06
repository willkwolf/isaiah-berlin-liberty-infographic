/**
 * tests/tufte-mobile-conflict-interaction.test.js
 *
 * Comprehensive test suite verifying Edward Tufte Data-Ink & Interaction Proximity
 * redesign in Section III (El conflicto no resuelto):
 *  1. Unified instrument card structure (#conflictInteractiveCard)
 *  2. Direct proximity: Slider above curve, dynamic reading ("Bajo este marco")
 *     replacing old static disclaimer position directly below the curve
 *  3. Dynamic reactivity: Lens chip updates text and badge without scrolling
 *  4. High-contrast, space-saving loss bars
 *  5. Discreet, compact epistemological disclaimer footnote
 *  6. Bilingual (ES/EN) i18n support
 */

'use strict';

const fs = require('fs');
const path = require('path');

describe('Tufte Mobile Redesign & Spatial Interaction in Section III', () => {
  let htmlContent;
  let cssContent;
  let jsContent;
  let i18nContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, '../files/index.html'), 'utf8');
    cssContent = fs.readFileSync(path.resolve(__dirname, '../files/styles.css'), 'utf8');
    jsContent = fs.readFileSync(path.resolve(__dirname, '../files/app.js'), 'utf8');
    i18nContent = fs.readFileSync(path.resolve(__dirname, '../files/i18n.js'), 'utf8');
  });

  describe('1. DOM Architecture & Component Integration', () => {
    beforeEach(() => {
      document.documentElement.innerHTML = htmlContent;
    });

    test('Section III contains the unified interactive instrument card', () => {
      const section = document.querySelector('#conflicto');
      expect(section).not.toBeNull();

      const card = section.querySelector('#conflictInteractiveCard');
      expect(card).not.toBeNull();
      expect(card.classList.contains('conflict-card')).toBe(true);
    });

    test('Slider and poles are integrated at the top of the instrument card', () => {
      const card = document.querySelector('#conflictInteractiveCard');
      const controlsTop = card.querySelector('.conflict-controls-top');
      expect(controlsTop).not.toBeNull();

      const slider = controlsTop.querySelector('#conflictSlider');
      expect(slider).not.toBeNull();

      const poles = controlsTop.querySelector('.conflict-poles');
      expect(poles).not.toBeNull();
      expect(poles.querySelector('.conflict-pole--left')).not.toBeNull();
      expect(poles.querySelector('.conflict-pole--right')).not.toBeNull();
    });

    test('Figure SVG is positioned directly between top controls and dynamic reading', () => {
      const card = document.querySelector('#conflictInteractiveCard');
      const figureWrap = card.querySelector('.conflict-figure-wrap');
      expect(figureWrap).not.toBeNull();

      const svg = figureWrap.querySelector('#conflictCurveSvg');
      expect(svg).not.toBeNull();

      // Ensure the controls are before figure, and reading is after figure in DOM order
      const children = Array.from(card.children);
      const controlsIdx = children.findIndex(c => c.classList.contains('conflict-controls-top'));
      const figureIdx = children.findIndex(c => c.classList.contains('conflict-figure-wrap'));
      const readingIdx = children.findIndex(c => c.classList.contains('conflict-live-reading'));

      expect(controlsIdx).toBeLessThan(figureIdx);
      expect(figureIdx).toBeLessThan(readingIdx);
    });

    test('"Bajo este marco" and dynamic text are located in the focal reading area inside the card', () => {
      const card = document.querySelector('#conflictInteractiveCard');
      const reading = card.querySelector('.conflict-live-reading');
      expect(reading).not.toBeNull();
      expect(reading.classList.contains('lens-interpretation')).toBe(true);

      const lensChip = reading.querySelector('#conflictActiveChip');
      expect(lensChip).not.toBeNull();
      expect(reading.querySelector('#conflictLensDot')).not.toBeNull();
      expect(reading.querySelector('#conflictLensName')).not.toBeNull();
      expect(reading.querySelector('#conflictLensAuthor')).not.toBeNull();

      const underFrameLabel = reading.querySelector('#conflictUnderFrameLabel');
      expect(underFrameLabel).not.toBeNull();
      expect(underFrameLabel.textContent).toContain('Bajo este marco:');

      const lensText = reading.querySelector('#conflictLensText');
      expect(lensText).not.toBeNull();

      const note = reading.querySelector('#conflictNote');
      expect(note).not.toBeNull();
    });

    test('Loss bars and compact disclaimer are inside the card below the reading', () => {
      const card = document.querySelector('#conflictInteractiveCard');
      const barsGrid = card.querySelector('.conflict-bars-grid');
      expect(barsGrid).not.toBeNull();

      const rows = barsGrid.querySelectorAll('.loss-row');
      expect(rows.length).toBe(2);

      const disclaimer = card.querySelector('#conflictModelDisclaimer');
      expect(disclaimer).not.toBeNull();
      expect(disclaimer.classList.contains('conflict-disclaimer--compact')).toBe(true);
      expect(disclaimer.classList.contains('viz-model-disclaimer')).toBe(true);
    });

    test('No redundant isolated lens-interpretation remains at the section bottom', () => {
      const section = document.querySelector('#conflicto');
      // Only the one inside the conflict card should exist
      const interpretations = section.querySelectorAll('.lens-interpretation');
      expect(interpretations.length).toBe(1);
      expect(interpretations[0].closest('#conflictInteractiveCard')).not.toBeNull();
    });
  });

  describe('2. Dynamic Reactivity (app.js)', () => {
    let appExports;

    beforeEach(() => {
      document.documentElement.innerHTML = htmlContent;
      window.scrollTo = jest.fn();

      const runner = new Function(
        'window', 'document', 'localStorage', 'navigator',
        jsContent + '\nreturn { setLens, updateConflictSlider, state, LENS_DATA };'
      );
      appExports = runner(window, document, window.localStorage, window.navigator);
    });

    test('setLens updates #conflictLensName, #conflictLensDot, and #conflictLensText', () => {
      // Switch to Positiva
      appExports.setLens('positiva');

      const nameEl = document.querySelector('#conflictLensName');
      const dotEl = document.querySelector('#conflictLensDot');
      const textEl = document.querySelector('#conflictLensText');

      expect(nameEl.textContent).toBe('Libertad Positiva');
      expect(dotEl.style.backgroundColor).toBe('rgb(255, 122, 53)');
      expect(textEl.textContent).toContain('Sacrificar algo de libertad negativa');

      // Switch to Capacidades
      appExports.setLens('capacidades');
      expect(nameEl.textContent).toContain('Capacidades');
      expect(dotEl.style.backgroundColor).toBe('rgb(61, 190, 138)');
      expect(textEl.textContent).toContain('capacidades');

      // Switch to Libertario (Hayek / Friedman)
      appExports.setLens('libertario');
      expect(nameEl.textContent).toContain('Libertario');
      expect(dotEl.style.backgroundColor).toBe('rgb(176, 176, 170)');
      expect(textEl.textContent).toContain('mercado');
    });

    test('updateConflictSlider updates loss bars and #conflictNote', () => {
      appExports.updateConflictSlider(85);

      const valNeg = document.querySelector('#lossValNeg');
      const valEq = document.querySelector('#lossValEq');
      const note = document.querySelector('#conflictNote');

      expect(valNeg.textContent).toBe('15%');
      expect(valEq.textContent).toBe('85%');
      expect(note.textContent).toContain('Libertad negativa máxima');

      appExports.updateConflictSlider(50);
      expect(valNeg.textContent).toBe('50%');
      expect(valEq.textContent).toBe('50%');
      expect(note.textContent).toContain('inestable');
    });
  });

  describe('3. CSS Proportions & High Contrast Tokens', () => {
    test('styles.css contains rules for .conflict-card and .conflict-controls-top', () => {
      expect(cssContent).toContain('.conflict-card');
      expect(cssContent).toContain('.conflict-controls-top');
      expect(cssContent).toContain('.conflict-live-reading');
      expect(cssContent).toContain('.conflict-bars-grid');
      expect(cssContent).toContain('.conflict-disclaimer--compact');
    });

    test('mobile media query provides tight grid for loss rows and clearance for lens panel', () => {
      expect(cssContent).toContain('padding-bottom: calc(6rem');

      // Loss row on mobile uses 2-row grid to avoid truncation while remaining compact
      expect(cssContent).toContain('grid-template-columns: 1fr auto');
      expect(cssContent).toContain('grid-template-rows: auto auto');
    });

    test('compact disclaimer has font-size <= 0.75rem for em tag', () => {
      const match = cssContent.match(/\.conflict-disclaimer--compact em\s*\{[^}]*font-size:\s*([0-9.]+)rem/);
      expect(match).not.toBeNull();
      expect(parseFloat(match[1])).toBeLessThanOrEqual(0.75);
    });
  });

  describe('4. Bilingual i18n Synchronization', () => {
    test('i18n.js includes translations for #conflictUnderFrameLabel and #conflictTradeoffLabel', () => {
      expect(i18nContent).toContain('#conflictUnderFrameLabel');
      expect(i18nContent).toContain('Under this framework:');
      expect(i18nContent).toContain('#conflictTradeoffLabel');
      expect(i18nContent).toContain('Trade-off diagnosis:');
    });
  });
});
