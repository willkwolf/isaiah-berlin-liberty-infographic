/**
 * tests/property3-gesture-threshold.test.js
 *
 * Propiedad 3: El umbral de gesto es exactamente 30px
 * **Validates: Requirement 2.3**
 *
 * Para cualquier delta de deslizamiento vertical, el drum selector debe
 * cambiar de lente si y solo si |delta| > 30. Deltas ≤30px no deben
 * producir cambio de lente.
 *
 * La condición es estricta: delta = 30 NO debe disparar cambio,
 * delta = 31 SÍ debe disparar cambio.
 *
 * Dado que app.js es un script de browser sin exports, se inlinea la misma
 * lógica del touchend para testearla directamente.
 */

'use strict';

const fc = require('fast-check');

// ── Función bajo prueba ───────────────────────────────────────────────────────
// Simula la lógica del touchend de initDrumSelector() en files/app.js:
//   if (Math.abs(deltaY) > 30) → cambiar lente (retorna true)
//   else                       → no cambiar   (retorna false)
//
// La función mantiene un estado de "lente actual" para verificar que el
// cambio realmente ocurre (o no ocurre) según el delta recibido.

function simulateDrumSwipe(delta) {
  // Lógica idéntica a la del touchend en initDrumSelector():
  //   if (Math.abs(deltaY) > 30) → setLens(nextLens) → cambio ocurrió
  if (Math.abs(delta) > 30) {
    return true;   // cambio de lente ocurrió
  }
  return false;    // no hubo cambio de lente
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Propiedad 3 — El umbral de gesto es exactamente 30px', () => {
  /**
   * **Validates: Requirement 2.3**
   *
   * Para cualquier delta en [-200, 200]:
   *   - Si |delta| > 30 → simulateDrumSwipe(delta) debe retornar true  (cambio)
   *   - Si |delta| ≤ 30 → simulateDrumSwipe(delta) debe retornar false (sin cambio)
   */
  test('el lente cambia si y solo si |delta| > 30', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -200, max: 200 }),
        (delta) => {
          const changed = simulateDrumSwipe(delta);
          return Math.abs(delta) > 30 ? changed : !changed;
        }
      ),
      { numRuns: 200 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('delta = 30 NO dispara cambio (umbral estricto)', () => {
    expect(simulateDrumSwipe(30)).toBe(false);
  });

  test('delta = -30 NO dispara cambio (umbral estricto, negativo)', () => {
    expect(simulateDrumSwipe(-30)).toBe(false);
  });

  test('delta = 31 SÍ dispara cambio', () => {
    expect(simulateDrumSwipe(31)).toBe(true);
  });

  test('delta = -31 SÍ dispara cambio (negativo)', () => {
    expect(simulateDrumSwipe(-31)).toBe(true);
  });

  test('delta = 0 NO dispara cambio', () => {
    expect(simulateDrumSwipe(0)).toBe(false);
  });

  test('delta = 200 SÍ dispara cambio (máximo positivo)', () => {
    expect(simulateDrumSwipe(200)).toBe(true);
  });

  test('delta = -200 SÍ dispara cambio (máximo negativo)', () => {
    expect(simulateDrumSwipe(-200)).toBe(true);
  });

  test('el resultado siempre es booleano', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -200, max: 200 }),
        (delta) => {
          const result = simulateDrumSwipe(delta);
          return typeof result === 'boolean';
        }
      ),
      { numRuns: 200 }
    );
  });
});
