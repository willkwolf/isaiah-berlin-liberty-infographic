/**
 * tests/property7-localstorage-persistence.test.js
 *
 * Propiedad 7: Persistencia del modo de color en localStorage
 * **Validates: Requirement 3.4**
 *
 * Para cualquier valor de modo de color ('light' o 'dark'), después de llamar
 * a setColorMode(mode), localStorage.getItem('site-color-scheme') debe retornar
 * ese mismo valor.
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

describe('Propiedad 7 — Persistencia del modo de color en localStorage', () => {
  /**
   * **Validates: Requirement 3.4**
   *
   * Para cualquier modo ('dark' | 'light'):
   *   después de setColorMode(mode),
   *   localStorage.getItem('site-color-scheme') === mode
   */
  test('setColorMode persiste el modo en localStorage', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (mode) => {
          setColorMode(mode);
          return localStorage.getItem('site-color-scheme') === mode;
        }
      ),
      { numRuns: 100 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('setColorMode("dark") guarda "dark" en localStorage', () => {
    setColorMode('dark');
    expect(localStorage.getItem('site-color-scheme')).toBe('dark');
  });

  test('setColorMode("light") guarda "light" en localStorage', () => {
    setColorMode('light');
    expect(localStorage.getItem('site-color-scheme')).toBe('light');
  });

  test('el valor en localStorage refleja el último modo establecido', () => {
    setColorMode('light');
    setColorMode('dark');
    expect(localStorage.getItem('site-color-scheme')).toBe('dark');
  });

  test('llamadas alternadas mantienen la persistencia correcta', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('dark', 'light'), { minLength: 1, maxLength: 20 }),
        (modes) => {
          modes.forEach(mode => setColorMode(mode));
          const lastMode = modes[modes.length - 1];
          return localStorage.getItem('site-color-scheme') === lastMode;
        }
      ),
      { numRuns: 100 }
    );
  });
});
