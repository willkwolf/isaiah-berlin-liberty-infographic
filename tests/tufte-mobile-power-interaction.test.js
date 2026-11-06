/**
 * tests/tufte-mobile-power-interaction.test.js
 *
 * Comprehensive test suite verifying Edward Tufte Data-Ink & Interaction Proximity
 * redesign in Section IV (Poder y obediencia):
 *  1. Full natural size for SVG diagram & nodes (no artificial shrinking)
 *  2. The Swap: Dynamic reading ("Bajo este marco") DE FRENTE (on top), static node details ABAJO (below)
 *  3. In-place node touch: Tapping a node displays that node's specific lens reading in front, and static breakdown below
 *  4. In-place lens reactivity: Changing lens chips updates badge and text in front immediately
 *  5. Dual interaction: Combining node touch and lens switching updates the in-front reading seamlessly
 */

'use strict';

const fs = require('fs');
const path = require('path');

describe('Tufte Mobile Power Interaction Suite (Section IV - In-Place Swap)', () => {
  let htmlContent;
  let cssContent;
  let jsContent;
  let appExports;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, '../files/index.html'), 'utf8');
    cssContent = fs.readFileSync(path.resolve(__dirname, '../files/styles.css'), 'utf8');
    jsContent = fs.readFileSync(path.resolve(__dirname, '../files/app.js'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = htmlContent;
    window.scrollTo = jest.fn();

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      jsContent + '\nreturn { setLens, initPowerDiagram, renderPowerInfo, updatePowerLiveReading, state, LENS_DATA, POWER_NODE_LENS_READINGS };'
    );
    appExports = runner(window, document, window.localStorage, window.navigator);
    if (typeof appExports.initPowerDiagram === 'function') {
      appExports.initPowerDiagram();
    }
  });

  describe('1. DOM Architecture & The Swap (Live Reading DE FRENTE, Static ABAJO)', () => {
    test('Section IV contains the unified interactive power card', () => {
      const section = document.querySelector('#poder');
      expect(section).not.toBeNull();

      const card = section.querySelector('.power-card');
      expect(card).not.toBeNull();
      expect(card.classList.contains('power-info')).toBe(true);
    });

    test('The Swap: .power-live-reading is positioned BEFORE #powerNodeDetails inside the card', () => {
      const card = document.querySelector('.power-card');
      const children = Array.from(card.children);

      const liveReadingIndex = children.findIndex(el => el.classList.contains('power-live-reading'));
      const nodeDetailsIndex = children.findIndex(el => el.id === 'powerNodeDetails');

      expect(liveReadingIndex).toBeGreaterThanOrEqual(0);
      expect(nodeDetailsIndex).toBeGreaterThanOrEqual(0);

      // Crucial: Live reading is in front / on top, static details are below!
      expect(liveReadingIndex).toBeLessThan(nodeDetailsIndex);
    });

    test('Live reading in front contains active chip, lead label, and dynamic text', () => {
      const liveReading = document.querySelector('.power-live-reading');
      expect(liveReading.querySelector('#powerActiveChip')).not.toBeNull();
      expect(liveReading.querySelector('#powerLensDot')).not.toBeNull();
      expect(liveReading.querySelector('#powerLensName')).not.toBeNull();
      expect(liveReading.querySelector('#powerLensAuthor')).not.toBeNull();
      expect(liveReading.querySelector('#powerUnderFrameLabel')).not.toBeNull();
      expect(liveReading.querySelector('#poderLensText')).not.toBeNull();
    });

    test('SVG retains full natural width and is not artificially shrunken in mobile CSS', () => {
      expect(cssContent).not.toContain('max-height: 220px');
      expect(cssContent).toContain('.power-svg');
    });
  });

  describe('2. In-Place Node Touch Interaction with Front Lens Reading', () => {
    test('Touching Sociedad updates the in-front reading for Sociedad under active lens', () => {
      const node = document.querySelector('.power-node[data-node="sociedad"]');
      expect(node).not.toBeNull();

      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      // Text in front updates to Sociedad analysis
      const textEl = document.querySelector('#poderLensText');
      expect(textEl.textContent).toContain('Para Berlin');
      expect(textEl.textContent).toContain('normas informales');

      // Static breakdown below updates
      const nodeDetails = document.querySelector('#powerNodeDetails');
      expect(nodeDetails.querySelector('.power-info__node-name').textContent).toBe('Sociedad');
      expect(nodeDetails.querySelector('.power-info__type').textContent).toContain('normativa-informal');
    });

    test('Touching Estado updates the in-front reading for Estado', () => {
      const node = document.querySelector('.power-node[data-node="estado"]');
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      const textEl = document.querySelector('#poderLensText');
      expect(textEl.textContent).toContain('El Estado posee el monopolio de la fuerza legal');

      const nodeDetails = document.querySelector('#powerNodeDetails');
      expect(nodeDetails.querySelector('.power-info__node-name').textContent).toBe('Estado');
    });

    test('Toggling off active node resets in-front reading to global section synthesis', () => {
      const node = document.querySelector('.power-node[data-node="mercado"]');
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
      expect(document.querySelector('#poderLensText').textContent).toContain('mercado');

      // Toggle off
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
      expect(document.querySelector('.power-info__hint')).not.toBeNull();
      expect(document.querySelector('#poderLensText').textContent).toContain('El Estado es la fuente primaria');
    });
  });

  describe('3. Dynamic Lens Reactivity (Changing Chips Changes Front Text)', () => {
    test('Switching lens to Positiva updates front text immediately', () => {
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

    test('Switching lens to Capacidades updates front text immediately', () => {
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

    test('Dual interaction: switching chips while a node is selected updates that node\'s interpretation in front', () => {
      // 1. Touch Sociedad
      const node = document.querySelector('.power-node[data-node="sociedad"]');
      node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      // 2. Switch to Capacidades
      appExports.setLens('capacidades');

      // The text in front must speak specifically about Sociedad under Capacidades!
      const textEl = document.querySelector('#poderLensText');
      expect(textEl.textContent).toContain('Para Sen, las normas sociales, estigmas y exclusiones culturales');

      // 3. Switch to Libertario
      appExports.setLens('libertario');
      expect(textEl.textContent).toContain('Las normas sociales y costumbres evolucionan de forma descentralizada');
    });
  });
});
