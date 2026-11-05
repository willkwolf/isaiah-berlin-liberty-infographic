/**
 * tests/property5-keyboard-navigation.test.js
 *
 * Propiedad 5: La navegación por teclado cicla correctamente
 * **Validates: Requirement 2.7**
 *
 * Para cualquier lente activo, presionar ArrowDown debe activar el siguiente
 * lente en DRUM_ORDER (mod 4), y ArrowUp debe activar el anterior (mod 4).
 * La operación es equivalente al ciclado táctil.
 *
 * Dado que app.js es un script de browser sin exports, se inlinea la misma
 * lógica pura de getDrumKeyboardNextIndex para testearla directamente.
 */

'use strict';

const fc = require('fast-check');

// ── Función pura bajo prueba ──────────────────────────────────────────────────
// Lógica idéntica a la implementada en files/app.js:
//   key === 'ArrowUp'   → (startIndex + 3) % 4   (equivale a retroceder 1 en circular)
//   key === 'ArrowDown' → (startIndex + 1) % 4   (avanzar 1 en circular)

function getDrumKeyboardNextIndex(startIndex, key) {
  if (key === 'ArrowUp') return (startIndex + 3) % 4;
  return (startIndex + 1) % 4;
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Propiedad 5 — La navegación por teclado cicla correctamente', () => {
  /**
   * **Validates: Requirement 2.7**
   *
   * Para cualquier startIndex en [0, 3] y cualquier tecla ('ArrowDown' | 'ArrowUp'):
   *   - 'ArrowDown' → resultado debe ser (startIndex + 1) % 4
   *   - 'ArrowUp'   → resultado debe ser (startIndex + 3) % 4
   */
  test('el índice resultante es el adyacente correcto en el orden circular', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 3 }),
        fc.constantFrom('ArrowDown', 'ArrowUp'),
        (startIndex, key) => {
          const expectedIndex = key === 'ArrowDown'
            ? (startIndex + 1) % 4
            : (startIndex + 3) % 4;
          const result = getDrumKeyboardNextIndex(startIndex, key);
          return result === expectedIndex;
        }
      ),
      { numRuns: 100 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('desde el índice 0, ArrowUp cicla al índice 3 (wrap-around)', () => {
    expect(getDrumKeyboardNextIndex(0, 'ArrowUp')).toBe(3);
  });

  test('desde el índice 3, ArrowDown cicla al índice 0 (wrap-around)', () => {
    expect(getDrumKeyboardNextIndex(3, 'ArrowDown')).toBe(0);
  });

  test('desde el índice 0, ArrowDown avanza al índice 1', () => {
    expect(getDrumKeyboardNextIndex(0, 'ArrowDown')).toBe(1);
  });

  test('desde el índice 3, ArrowUp retrocede al índice 2', () => {
    expect(getDrumKeyboardNextIndex(3, 'ArrowUp')).toBe(2);
  });

  test('el resultado siempre está en el rango [0, 3]', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 3 }),
        fc.constantFrom('ArrowDown', 'ArrowUp'),
        (startIndex, key) => {
          const result = getDrumKeyboardNextIndex(startIndex, key);
          return result >= 0 && result <= 3;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('ArrowDown y ArrowUp son operaciones inversas entre sí', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 3 }),
        (startIndex) => {
          const afterDown = getDrumKeyboardNextIndex(startIndex, 'ArrowDown');
          const backUp = getDrumKeyboardNextIndex(afterDown, 'ArrowUp');
          return backUp === startIndex;
        }
      ),
      { numRuns: 100 }
    );
  });
});
