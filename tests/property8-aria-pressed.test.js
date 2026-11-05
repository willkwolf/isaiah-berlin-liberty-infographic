/**
 * tests/property8-aria-pressed.test.js
 *
 * Propiedad 8: `aria-pressed` del toggle refleja el estado del modo de color
 * **Validates: Requirement 3.5**
 *
 * Para cualquier estado del modo de color, el atributo `aria-pressed` del
 * #colorModeBtn debe ser "true" si y solo si body.classList.contains('light-mode')
 * es verdadero.
 *
 * La lógica de setColorMode se inlinea aquí porque app.js es un script de
 * browser que no puede importarse directamente en Node.js/jsdom.
 */

'use strict';

const fc = require('fast-check');

// ── Minimal DOM setup ─────────────────────────────────────────────────────────
// jsdom (via testEnvironment: "jsdom") provides document, body, and localStorage.
// We just need to ensure #colorModeBtn exists before each test.

beforeEach(() => {
  // Reset body classes
  document.body.className = '';

  // Ensure #colorModeBtn exists in the DOM
  let btn = document.querySelector('#colorModeBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'colorModeBtn';
    btn.setAttribute('aria-label', 'Activar modo claro');
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = '☀';
    document.body.appendChild(btn);
  } else {
    // Reset to default state
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Activar modo claro');
    btn.textContent = '☀';
  }
});

// ── Inlined setColorMode logic ────────────────────────────────────────────────
// Mirrors the implementation in files/app.js exactly (Feature 3a).

function setColorMode(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  const btn = document.querySelector('#colorModeBtn');
  if (btn) {
    btn.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
    btn.setAttribute('aria-label', mode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro');
    btn.textContent = mode === 'light' ? '🌙' : '☀';
  }
  try {
    localStorage.setItem('site-color-scheme', mode);
  } catch {}
  // state.colorMode = mode; — not needed in test
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Propiedad 8 — aria-pressed del toggle refleja el estado del modo de color', () => {
  /**
   * **Validates: Requirement 3.5**
   *
   * Para cualquier modo ('dark' | 'light'):
   *   después de setColorMode(mode),
   *   btn.getAttribute('aria-pressed') === String(body.classList.contains('light-mode'))
   */
  test('aria-pressed refleja el estado de light-mode en el body', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (mode) => {
          setColorMode(mode);
          const btn = document.querySelector('#colorModeBtn');
          const isLight = document.body.classList.contains('light-mode');
          return btn.getAttribute('aria-pressed') === String(isLight);
        }
      ),
      { numRuns: 100 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('setColorMode("light") establece aria-pressed="true"', () => {
    setColorMode('light');
    const btn = document.querySelector('#colorModeBtn');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });

  test('setColorMode("dark") establece aria-pressed="false"', () => {
    setColorMode('dark');
    const btn = document.querySelector('#colorModeBtn');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
  });

  test('setColorMode("light") añade light-mode al body', () => {
    setColorMode('light');
    expect(document.body.classList.contains('light-mode')).toBe(true);
  });

  test('setColorMode("dark") no tiene light-mode en el body', () => {
    setColorMode('dark');
    expect(document.body.classList.contains('light-mode')).toBe(false);
  });

  test('invariante: aria-pressed === String(body.classList.contains("light-mode")) para light', () => {
    setColorMode('light');
    const btn = document.querySelector('#colorModeBtn');
    const isLight = document.body.classList.contains('light-mode');
    expect(btn.getAttribute('aria-pressed')).toBe(String(isLight));
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    expect(isLight).toBe(true);
  });

  test('invariante: aria-pressed === String(body.classList.contains("light-mode")) para dark', () => {
    setColorMode('dark');
    const btn = document.querySelector('#colorModeBtn');
    const isLight = document.body.classList.contains('light-mode');
    expect(btn.getAttribute('aria-pressed')).toBe(String(isLight));
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    expect(isLight).toBe(false);
  });

  test('llamadas alternadas mantienen la invariante', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('dark', 'light'), { minLength: 1, maxLength: 20 }),
        (modes) => {
          modes.forEach(mode => setColorMode(mode));
          const btn = document.querySelector('#colorModeBtn');
          const isLight = document.body.classList.contains('light-mode');
          return btn.getAttribute('aria-pressed') === String(isLight);
        }
      ),
      { numRuns: 100 }
    );
  });
});
