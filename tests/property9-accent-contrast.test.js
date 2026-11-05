'use strict';

/**
 * tests/property9-accent-contrast.test.js
 *
 * Property 9: Los colores de acento cumplen contraste ≥3:1 sobre fondo oscuro
 * Validates: Requirement 3.15
 *
 * Pure math test — no DOM setup needed.
 * Uses the WCAG relative luminance formula to compute contrast ratios.
 */

const fc = require('fast-check');

// ── WCAG Contrast Ratio Implementation ────────────────────────────────────────

/**
 * Convert a hex color string to an [R, G, B] array with values in [0, 1].
 * @param {string} hex - e.g. '#4a9eff' or '#0e0e10'
 * @returns {[number, number, number]}
 */
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
}

/**
 * Convert a single sRGB channel value to linear light.
 * WCAG formula: c_linear = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4
 * @param {number} c - sRGB channel value in [0, 1]
 * @returns {number} linear light value
 */
function toLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Compute the relative luminance of a hex color.
 * L = 0.2126 * R_linear + 0.7152 * G_linear + 0.0722 * B_linear
 * @param {string} hex
 * @returns {number} relative luminance in [0, 1]
 */
function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Compute the WCAG contrast ratio between two hex colors.
 * ratio = (L_lighter + 0.05) / (L_darker + 0.05)
 * @param {string} hex1
 * @param {string} hex2
 * @returns {number} contrast ratio ≥ 1
 */
function computeContrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── Property 9 ────────────────────────────────────────────────────────────────

/**
 * **Validates: Requirements 3.15**
 *
 * Property 9: For any accent color of a lens
 * (--clr-neg: #4a9eff, --clr-pos: #ff7a35, --clr-cap: #3dbe8a, --clr-lib: #b0b0aa)
 * against the default dark background (--clr-bg: #0e0e10),
 * the contrast ratio must be ≥ 3:1 per WCAG 1.4.11.
 */
describe('Property 9: Accent colors meet ≥3:1 contrast on dark background', () => {
  test('all accent colors have contrast ratio ≥ 3.0 against #0e0e10', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          { color: '#4a9eff', name: 'negativa' },
          { color: '#ff7a35', name: 'positiva' },
          { color: '#3dbe8a', name: 'capacidades' },
          { color: '#b0b0aa', name: 'libertario' }
        ),
        ({ color, name }) => {
          const ratio = computeContrastRatio(color, '#0e0e10');
          if (ratio < 3.0) {
            throw new Error(
              `Accent color '${name}' (${color}) has contrast ratio ${ratio.toFixed(2)} < 3.0 against #0e0e10`
            );
          }
          return ratio >= 3.0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
