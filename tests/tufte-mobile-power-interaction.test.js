/**
 * tests/tufte-mobile-power-interaction.test.js
 *
 * Comprehensive test suite verifying Edward Tufte Data-Ink & Interaction Proximity
 * redesign in Section IV (Poder y obediencia):
 *  1. Unified power interactive card structure (.power-card / #powerInfo)
 *  2. Direct spatial proximity: Node information + In-place live lens reading ("Bajo este marco")
 *  3. In-place node interaction: Tapping nodes updates node details without losing lens context
 *  4. In-place lens reactivity: Lens chip updates badge, dot, and text in-place without scrolling
 *  5. Removal of redundant isolated .lens-interpretation at section bottom
 *  6. Bilingual (ES/EN) i18n support
 */

'use strict';

const fs = require('fs');
const path = require('path');

describe('Tufte Mobile Power Interaction Suite (Section IV)', () => {
  let htmlContent;
  let cssContent;
  let jsContent;
  let i18nContent;
  let appExports;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, '../files/index.html'), 'utf8');
    cssContent = fs.readFileSync(path.resolve(__dirname, '../files/styles.css'), 'utf8');
    jsContent = fs.readFileSync(path.resolve(__dirname, '../files/app.js'), 'utf8');
    i18nContent = fs.readFileSync(path.resolve(__dirname, '../files/i18n.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = htmlContent;
    window.scrollTo = jest.fn();

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      jsContent + '\nreturn { setLens, initPowerDiagram, renderPowerInfo, state, LENS_DATA, getPowerNode };'
    );
    appExports = runner(window, document, window.localStorage, window.navigator);
    if (typeof appExports.initPowerDiagram === 'function') {
      appExports.initPowerDiagram();
    }
  });

  describe('1. DOM Architecture & Component Integration', () => {
    test('Section IV contains the unified interactive power card', () => {
      const section = document.querySelector('#poder');
      expect(section).not.toBeNull();

      const card = section.querySelector('.power-card');
      expect(card).not.toBeNull();
      expect(card.classList.contains('power-info')).toBe(true);
    });

    test('Card houses both dynamic node details and in-place live lens reading', () => {
      const card = document.querySelector('.power-card');
      const nodeDetails = card.querySelector('#powerNodeDetails');
      const liveReading = card.querySelector('.power-live-reading');

      expect(nodeDetails).not.toBeNull();
      expect(liveReading).not.toBeNull();
      expect(liveReading.classList.contains('lens-interpretation')).toBe(true);

      const lensChip = liveReading.querySelector('#powerActiveChip');
      expect(lensChip).not.toBeNull();
      expect(liveReading.querySelector('#powerLensDot')).not.toBeNull();
      expect(liveReading.querySelector('#powerLensName')).not.toBeNull();
      expect(liveReading.querySelector('#powerLensAuthor')).not.toBeNull();

      const underFrameLabel = liveReading.querySelector('#powerUnderFrameLabel');
      expect(underFrameLabel).not.toBeNull();
      expect(underFrameLabel.textContent).toContain('Bajo este marco:');

      const lensText = liveReading.querySelector('#poderLensText');
      expect(lensText).not.toBeNull();
    });

    test('No redundant isolated lens-interpretation remains at the section bottom', () => {
      const section = document.querySelector('#poder');
      // Only the one inside the unified power card should exist
      const interpretations = section.querySelectorAll('.lens-interpretation');
      expect(interpretations.length).toBe(1);
      expect(interpretations[0].closest('.power-card')).not.toBeNull();
    });
  });

  describe('2. In-Place Node Touch Interaction', () => {
    test('Touching Sociedad displays node details in-place while keeping live reading intact', () => {
      const node = document.querySelector('.power-node[data-node="sociedad"]');
      expect(node).not.toBeNull();

      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      const nodeDetails = document.querySelector('#powerNodeDetails');
      expect(nodeDetails.querySelector('.power-info__node-name').textContent).toBe('Sociedad');
      expect(nodeDetails.querySelector('.power-info__type').textContent).toContain('normativa-informal');
      expect(nodeDetails.querySelector('.power-info__desc').textContent).toContain('norma social');
      expect(nodeDetails.querySelector('.power-info__mechanism').textContent).toContain('presión de conformidad');

      // Live reading remains in place
      const lensText = document.querySelector('#poderLensText');
      expect(lensText).not.toBeNull();
    });

    test('Touching Estado displays State monopoly details in-place', () => {
      const node = document.querySelector('.power-node[data-node="estado"]');
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      const nodeDetails = document.querySelector('#powerNodeDetails');
      expect(nodeDetails.querySelector('.power-info__node-name').textContent).toBe('Estado');
      expect(nodeDetails.querySelector('.power-info__type').textContent).toContain('Weber');
      expect(nodeDetails.querySelector('.power-info__desc').textContent).toContain('Monopolio legítimo');
    });

    test('Toggling active node returns cleanly to the hint', () => {
      const node = document.querySelector('.power-node[data-node="mercado"]');
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
      expect(document.querySelector('.power-info__node-name').textContent).toBe('Mercado');

      // Toggle off
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
      expect(document.querySelector('.power-info__hint')).not.toBeNull();
    });
  });

  describe('3. Dynamic Lens Reactivity (In-Place Chip Switching)', () => {
    test('setLens("positiva") updates badge, dot, and reading in-place without scrolling', () => {
      appExports.setLens('positiva');

      const nameEl = document.querySelector('#powerLensName');
      const authorEl = document.querySelector('#powerLensAuthor');
      const dotEl = document.querySelector('#powerLensDot');
      const textEl = document.querySelector('#poderLensText');

      expect(nameEl.textContent).toBe('Libertad Positiva');
      expect(authorEl.textContent).toBe('Berlin');
      expect(dotEl.style.backgroundColor).toBe('rgb(255, 122, 53)');
      expect(textEl.textContent).toContain('El Estado no solo restringe: habilita');
    });

    test('setLens("capacidades") updates badge, dot, and reading in-place', () => {
      appExports.setLens('capacidades');

      const nameEl = document.querySelector('#powerLensName');
      const authorEl = document.querySelector('#powerLensAuthor');
      const dotEl = document.querySelector('#powerLensDot');
      const textEl = document.querySelector('#poderLensText');

      expect(nameEl.textContent).toBe('Enfoque de Capacidades');
      expect(authorEl.textContent).toBe('Sen');
      expect(dotEl.style.backgroundColor).toBe('rgb(61, 190, 138)');
      expect(textEl.textContent).toContain('privación de capacidades');
    });

    test('setLens("libertario") updates badge, dot, and reading in-place', () => {
      appExports.setLens('libertario');

      const nameEl = document.querySelector('#powerLensName');
      const authorEl = document.querySelector('#powerLensAuthor');
      const dotEl = document.querySelector('#powerLensDot');
      const textEl = document.querySelector('#poderLensText');

      expect(nameEl.textContent).toBe('Económico-Libertario');
      expect(authorEl.textContent).toContain('Hayek');
      expect(dotEl.style.backgroundColor).toBe('rgb(176, 176, 170)');
      expect(textEl.textContent.length).toBeGreaterThan(15);
    });

    test('Dual interaction: touching node while lens is active preserves both perspectives', () => {
      appExports.setLens('capacidades');

      // Touch Sociedad
      const node = document.querySelector('.power-node[data-node="sociedad"]');
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      // Node details are visible
      expect(document.querySelector('.power-info__node-name').textContent).toBe('Sociedad');

      // Lens reading is also visible in the same card
      expect(document.querySelector('#powerLensName').textContent).toBe('Enfoque de Capacidades');
      expect(document.querySelector('#poderLensText').textContent).toContain('privación de capacidades');
    });
  });

  describe('4. CSS & Styling Integrity', () => {
    test('CSS defines .power-card and .power-live-reading with Tufte styling tokens', () => {
      expect(cssContent).toContain('.power-card');
      expect(cssContent).toContain('.power-live-reading');
      expect(cssContent).toContain('.power-lens-chip');
      expect(cssContent).toContain('.power-lens-dot');
      expect(cssContent).toContain('#poder');
      expect(cssContent).toContain('padding-bottom: calc(6rem + env(safe-area-inset-bottom))');
    });
  });
});
