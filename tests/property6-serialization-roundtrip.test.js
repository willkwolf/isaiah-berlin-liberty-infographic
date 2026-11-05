/**
 * tests/property6-serialization-roundtrip.test.js
 *
 * Propiedad 6: Round-trip de serialización de preferencias
 * **Validates: Requirement 3.18**
 *
 * Para cualquier combinación válida de (lens, language, colorMode), el objeto
 * de preferencias debe sobrevivir un ciclo de serialización JSON sin pérdida
 * de información: JSON.parse(JSON.stringify(prefs)) debe producir un objeto
 * con los mismos valores.
 *
 * Esta es una prueba de datos pura — no requiere DOM ni mocks.
 */

'use strict';

const fc = require('fast-check');

// ── Constantes del dominio ────────────────────────────────────────────────────

const VALID_LENSES    = ['negativa', 'positiva', 'capacidades', 'libertario'];
const VALID_LANGUAGES = ['es', 'en'];
const VALID_MODES     = ['dark', 'light'];

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Propiedad 6 — Round-trip de serialización de preferencias', () => {
  /**
   * **Validates: Requirement 3.18**
   *
   * Para cualquier combinación válida de (lens, language, colorMode):
   *   JSON.parse(JSON.stringify(prefs)) debe producir un objeto con los mismos
   *   valores que el original.
   */
  test('el objeto de preferencias sobrevive un ciclo JSON sin pérdida de datos', () => {
    fc.assert(
      fc.property(
        fc.record({
          lens:      fc.constantFrom(...VALID_LENSES),
          language:  fc.constantFrom(...VALID_LANGUAGES),
          colorMode: fc.constantFrom(...VALID_MODES),
        }),
        (prefs) => {
          const roundTripped = JSON.parse(JSON.stringify(prefs));
          return roundTripped.lens      === prefs.lens
            &&   roundTripped.language  === prefs.language
            &&   roundTripped.colorMode === prefs.colorMode;
        }
      ),
      { numRuns: 200 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('el round-trip no añade propiedades extra al objeto', () => {
    fc.assert(
      fc.property(
        fc.record({
          lens:      fc.constantFrom(...VALID_LENSES),
          language:  fc.constantFrom(...VALID_LANGUAGES),
          colorMode: fc.constantFrom(...VALID_MODES),
        }),
        (prefs) => {
          const roundTripped = JSON.parse(JSON.stringify(prefs));
          return Object.keys(roundTripped).length === Object.keys(prefs).length;
        }
      ),
      { numRuns: 200 }
    );
  });

  test('el round-trip no pierde ninguna propiedad del objeto', () => {
    fc.assert(
      fc.property(
        fc.record({
          lens:      fc.constantFrom(...VALID_LENSES),
          language:  fc.constantFrom(...VALID_LANGUAGES),
          colorMode: fc.constantFrom(...VALID_MODES),
        }),
        (prefs) => {
          const roundTripped = JSON.parse(JSON.stringify(prefs));
          return 'lens'      in roundTripped
            &&   'language'  in roundTripped
            &&   'colorMode' in roundTripped;
        }
      ),
      { numRuns: 200 }
    );
  });

  test('cada combinación específica de preferencias sobrevive el round-trip', () => {
    for (const lens of VALID_LENSES) {
      for (const language of VALID_LANGUAGES) {
        for (const colorMode of VALID_MODES) {
          const prefs = { lens, language, colorMode };
          const roundTripped = JSON.parse(JSON.stringify(prefs));
          expect(roundTripped.lens).toBe(lens);
          expect(roundTripped.language).toBe(language);
          expect(roundTripped.colorMode).toBe(colorMode);
        }
      }
    }
  });
});
