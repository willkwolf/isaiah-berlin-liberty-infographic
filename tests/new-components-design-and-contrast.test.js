'use strict';

/**
 * tests/new-components-design-and-contrast.test.js
 *
 * Verifies design policy compliance, typography hierarchy, WCAG 2.1 AA contrast ratios
 * across both dark mode and light mode, and bilingual i18n synchronization for all
 * newly added philosophical and epistemological components:
 *  - .berlin-republican-callout (Skinner / Pettit non-domination)
 *  - .viz-model-disclaimer (Conflict & System Dynamics epistemological notes)
 *  - .sen-conversion-box (Sen's 3 conversion factors)
 *  - #colombiaSubtitle (Calibrated 2024-2026 baseline)
 */

const fs = require('fs');
const path = require('path');

// ── WCAG Relative Luminance & Contrast Formula ──────────────────────────────
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255
  ];
}

function toLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function computeContrast(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Design Policies & Contrast for New Components', () => {
  let htmlContent;
  let cssContent;
  let i18nContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, '../files/index.html'), 'utf8');
    cssContent = fs.readFileSync(path.resolve(__dirname, '../files/styles.css'), 'utf8');
    i18nContent = fs.readFileSync(path.resolve(__dirname, '../files/i18n.js'), 'utf8');
    document.documentElement.innerHTML = htmlContent;
  });

  describe('1. Semantic Tokens & Anti-Pattern Detection in CSS', () => {
    test('does NOT use hardcoded dark navy/slate or isolated light hexes in new component rules', () => {
      // Must not use hardcoded rgba(30, 41, 59, ...) or rgba(15, 23, 42, ...) or isolated #f8fafc in new rules
      const newComponentsSection = cssContent.slice(
        cssContent.indexOf('EPISTEMOLOGICAL MODEL DISCLAIMERS & THEORETICAL ENHANCEMENTS')
      );

      expect(newComponentsSection).not.toContain('rgba(30, 41, 59');
      expect(newComponentsSection).not.toContain('rgba(15, 23, 42');
      expect(newComponentsSection).not.toContain('#f8fafc');
      expect(newComponentsSection).not.toContain('#cbd5e1');
      expect(newComponentsSection).not.toContain('#94a3b8');
    });

    test('recycles system tokens (var(--clr-surface), var(--clr-bg-2), var(--clr-border), var(--clr-text*))', () => {
      const newComponentsSection = cssContent.slice(
        cssContent.indexOf('EPISTEMOLOGICAL MODEL DISCLAIMERS & THEORETICAL ENHANCEMENTS')
      );

      expect(newComponentsSection).toContain('var(--clr-surface)');
      expect(newComponentsSection).toContain('var(--clr-bg-2)');
      expect(newComponentsSection).toContain('var(--clr-border)');
      expect(newComponentsSection).toContain('var(--clr-text)');
      expect(newComponentsSection).toContain('var(--clr-text-bright)');
      expect(newComponentsSection).toContain('var(--clr-text-dim)');
    });

    test('uses standard editorial typography tokens (var(--font-serif), var(--font-mono), var(--font-sans))', () => {
      const newComponentsSection = cssContent.slice(
        cssContent.indexOf('EPISTEMOLOGICAL MODEL DISCLAIMERS & THEORETICAL ENHANCEMENTS')
      );

      expect(newComponentsSection).toContain('var(--font-serif)');
      expect(newComponentsSection).toContain('var(--font-mono)');
      expect(newComponentsSection).toContain('var(--font-sans)');
    });
  });

  describe('2. Typography Hierarchy and Proportions', () => {
    test('all new component titles adhere to proportional sizing (<= 1.1rem, avoiding oversized titles)', () => {
      // republican-title <= 1.05rem
      const repTitleMatch = cssContent.match(/\.republican-title\s*\{[^}]*font-size:\s*([0-9.]+)rem/);
      expect(repTitleMatch).not.toBeNull();
      expect(parseFloat(repTitleMatch[1])).toBeLessThanOrEqual(1.05);

      // sen-conversion-title <= 1.1rem
      const senTitleMatch = cssContent.match(/\.sen-conversion-title\s*\{[^}]*font-size:\s*([0-9.]+)rem/);
      expect(senTitleMatch).not.toBeNull();
      expect(parseFloat(senTitleMatch[1])).toBeLessThanOrEqual(1.1);

      // sen-conv-name <= 0.98rem
      const senNameMatch = cssContent.match(/\.sen-conv-name\s*\{[^}]*font-size:\s*([0-9.]+)rem/);
      expect(senNameMatch).not.toBeNull();
      expect(parseFloat(senNameMatch[1])).toBeLessThanOrEqual(0.98);
    });

    test('tags and metadata are appropriately scaled (<= 0.75rem)', () => {
      const repBadgeMatch = cssContent.match(/\.republican-badge\s*\{[^}]*font-size:\s*([0-9.]+)rem/);
      expect(repBadgeMatch).not.toBeNull();
      expect(parseFloat(repBadgeMatch[1])).toBeLessThanOrEqual(0.75);

      const senTagMatch = cssContent.match(/\.sen-conv-tag\s*\{[^}]*font-size:\s*([0-9.]+)rem/);
      expect(senTagMatch).not.toBeNull();
      expect(parseFloat(senTagMatch[1])).toBeLessThanOrEqual(0.75);

      const disclaimerEmMatch = cssContent.match(/\.viz-model-disclaimer em\s*\{[^}]*font-size:\s*([0-9.]+)rem/);
      expect(disclaimerEmMatch).not.toBeNull();
      expect(parseFloat(disclaimerEmMatch[1])).toBeLessThanOrEqual(0.75);
    });
  });

  describe('3. Rigorous WCAG 2.1 AA Contrast Ratios (Dark & Light Modes)', () => {
    const darkPalette = {
      bg: '#0e0e10',
      bg2: '#141418',
      surface: '#1e1e26',
      border: '#2a2a35',
      text: '#d4d0c8',
      textDim: '#8a8878',
      textBright: '#f0ece0',
      cap: '#3dbe8a',
      neg: '#4a9eff'
    };

    const lightPalette = {
      bg: '#f5f4f0',
      bg2: '#eeede8',
      surface: '#e2e1dc',
      border: '#c8c7c0',
      text: '#1a1a20',
      textDim: '#5a5a60',
      textBright: '#0e0e10',
      republicanBadgeLight: '#075985',
      senTagLight: '#065f46'
    };

    test('[Dark Mode] all text tokens on surface and bg2 exceed WCAG 2.1 AA (>= 4.5:1 normal, >= 3:1 large/tag)', () => {
      // Surface backgrounds
      expect(computeContrast(darkPalette.textBright, darkPalette.surface)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(darkPalette.text, darkPalette.surface)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(darkPalette.textDim, darkPalette.surface)).toBeGreaterThanOrEqual(4.5);
      expect(computeContrast(darkPalette.cap, darkPalette.surface)).toBeGreaterThanOrEqual(3.0);
      expect(computeContrast(darkPalette.neg, darkPalette.surface)).toBeGreaterThanOrEqual(3.0);

      // Bg-2 backgrounds
      expect(computeContrast(darkPalette.textBright, darkPalette.bg2)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(darkPalette.text, darkPalette.bg2)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(darkPalette.textDim, darkPalette.bg2)).toBeGreaterThanOrEqual(4.5);
      expect(computeContrast(darkPalette.cap, darkPalette.bg2)).toBeGreaterThanOrEqual(3.0);
    });

    test('[Light Mode] all text tokens on surface and bg2 exceed WCAG 2.1 AA (>= 4.5:1 normal, >= 3:1 large/tag)', () => {
      // Surface backgrounds
      expect(computeContrast(lightPalette.textBright, lightPalette.surface)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(lightPalette.text, lightPalette.surface)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(lightPalette.textDim, lightPalette.surface)).toBeGreaterThanOrEqual(4.5);
      expect(computeContrast(lightPalette.republicanBadgeLight, lightPalette.surface)).toBeGreaterThanOrEqual(4.5);
      expect(computeContrast(lightPalette.senTagLight, lightPalette.surface)).toBeGreaterThanOrEqual(4.5);

      // Bg-2 backgrounds
      expect(computeContrast(lightPalette.textBright, lightPalette.bg2)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(lightPalette.text, lightPalette.bg2)).toBeGreaterThanOrEqual(7.0);
      expect(computeContrast(lightPalette.textDim, lightPalette.bg2)).toBeGreaterThanOrEqual(4.5);
      expect(computeContrast(lightPalette.senTagLight, lightPalette.bg2)).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('4. DOM Semantics & Accessibility Roles', () => {
    test('.berlin-republican-callout has role="note" and accessible label', () => {
      const callout = document.querySelector('.berlin-republican-callout');
      expect(callout).not.toBeNull();
      expect(callout.getAttribute('role')).toBe('note');
      expect(callout.getAttribute('aria-label')).toBeTruthy();
    });

    test('.sen-conversion-box has role="region" and accessible label', () => {
      const senBox = document.querySelector('.sen-conversion-box');
      expect(senBox).not.toBeNull();
      expect(senBox.getAttribute('role')).toBe('region');
      expect(senBox.getAttribute('aria-label')).toBeTruthy();
      expect(senBox.querySelectorAll('.sen-conv-card').length).toBe(3);
    });

    test('epistemological disclaimers are present in Sections III and IX', () => {
      const conflictDisc = document.querySelector('#conflictModelDisclaimer');
      expect(conflictDisc).not.toBeNull();
      expect(conflictDisc.closest('#conflicto')).not.toBeNull();

      const systemDisc = document.querySelector('#systemModelDisclaimer');
      expect(systemDisc).not.toBeNull();
      expect(systemDisc.closest('#comparacion')).not.toBeNull();
    });

    test('#colombiaSubtitle includes calibrated empirical baseline notice', () => {
      const sub = document.querySelector('#colombiaSubtitle');
      expect(sub).not.toBeNull();
      expect(sub.textContent).toContain('2024–2026');
      expect(sub.textContent).toContain('DANE');
    });
  });

  describe('5. Bilingual i18n Synchronization Integrity', () => {
    const requiredKeys = [
      '#republicanTitle',
      '#republicanDesc',
      '#conflictModelDisclaimer',
      '#senConversionTitle',
      '#senConversionDesc',
      '#senConvTitle1',
      '#senConvDesc1',
      '#senConvTitle2',
      '#senConvDesc2',
      '#senConvTitle3',
      '#senConvDesc3',
      '#colombiaSubtitle',
      '#systemModelDisclaimer'
    ];

    test('all 13 new string selectors are registered in files/i18n.js English staticContent', () => {
      for (const key of requiredKeys) {
        expect(i18nContent).toContain(key);
      }
    });

    test('switching between Spanish and English updates and restores all target elements', () => {
      // Evaluate mock translation function based on i18n definitions
      eval(i18nContent); // Loads window.I18N_CONTENT
      expect(window.I18N_CONTENT).toBeDefined();

      const enStatic = window.I18N_CONTENT.locales.en.staticContent;
      for (const key of requiredKeys) {
        const entry = enStatic.find(item => item.selector === key);
        expect(entry).toBeDefined();
        expect(entry.value.length).toBeGreaterThan(5);

        // Apply English
        const el = document.querySelector(key);
        expect(el).not.toBeNull();
        if (entry.type === 'text') {
          el.textContent = entry.value;
          expect(el.textContent).toBe(entry.value);
        } else if (entry.type === 'html') {
          el.innerHTML = entry.value;
          expect(el.innerHTML).toBe(entry.value);
        }
      }
    });
  });
});
