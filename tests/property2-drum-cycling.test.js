/**
 * tests/property2-drum-cycling.test.js
 *
 * Propiedad 2: El ciclado del drum selector es correcto y completo
 * **Validates: Requirements 2.2, 2.3**
 *
 * Para cualquier lente activo en DRUM_ORDER y cualquier dirección de
 * deslizamiento (arriba o abajo), el lente resultante debe ser el elemento
 * adyacente en el orden circular ['negativa', 'positiva', 'capacidades', 'libertario'].
 *
 * Dado que app.js es un script de browser sin exports, se inlinea la misma
 * lógica pura de getDrumNextIndex para testearla directamente.
 */

'use strict';

const fc = require('fast-check');

// ── Función pura bajo prueba ──────────────────────────────────────────────────
// Lógica idéntica a la implementada en files/app.js:
//   direction === 'up'   → (startIndex + 3) % 4   (equivale a retroceder 1 en circular)
//   direction === 'down' → (startIndex + 1) % 4   (avanzar 1 en circular)

function getDrumNextIndex(startIndex, direction) {
  if (direction === 'up') return (startIndex + 3) % 4;
  return (startIndex + 1) % 4;
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Propiedad 2 — Ciclado del drum selector es correcto y completo', () => {
  /**
   * **Validates: Requirements 2.2, 2.3**
   *
   * Para cualquier startIndex en [0, 3] y cualquier dirección ('up' | 'down'):
   *   - 'up'   → resultado debe ser (startIndex + 3) % 4
   *   - 'down' → resultado debe ser (startIndex + 1) % 4
   */
  test('el índice resultante es el adyacente correcto en el orden circular', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 3 }),
        fc.constantFrom('up', 'down'),
        (startIndex, direction) => {
          const expectedIndex = direction === 'up'
            ? (startIndex + 3) % 4
            : (startIndex + 1) % 4;
          const result = getDrumNextIndex(startIndex, direction);
          return result === expectedIndex;
        }
      ),
      { numRuns: 100 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('desde el índice 0, "up" cicla al índice 3 (wrap-around)', () => {
    expect(getDrumNextIndex(0, 'up')).toBe(3);
  });

  test('desde el índice 3, "down" cicla al índice 0 (wrap-around)', () => {
    expect(getDrumNextIndex(3, 'down')).toBe(0);
  });

  test('desde el índice 0, "down" avanza al índice 1', () => {
    expect(getDrumNextIndex(0, 'down')).toBe(1);
  });

  test('desde el índice 3, "up" retrocede al índice 2', () => {
    expect(getDrumNextIndex(3, 'up')).toBe(2);
  });

  test('el resultado siempre está en el rango [0, 3]', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 3 }),
        fc.constantFrom('up', 'down'),
        (startIndex, direction) => {
          const result = getDrumNextIndex(startIndex, direction);
          return result >= 0 && result <= 3;
        }
      ),
      { numRuns: 100 }
    );
  });
});
