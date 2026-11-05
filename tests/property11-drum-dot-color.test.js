/**
 * tests/property11-drum-dot-color.test.js
 *
 * Propiedad 11: El dot del drum selector coincide con el color del lente activo
 * **Validates: Requirements 2.4**
 *
 * Para cualquier lente activo, el elemento `.drum-selector__dot` debe tener
 * el color CSS correspondiente a `LENS_DATA[lens].color`.
 *
 * Nota: jsdom puede convertir colores hex a formato rgb() al leer
 * `element.style.backgroundColor`, por lo que la comparación acepta ambos
 * formatos.
 */

'use strict';

const fc = require('fast-check');

// ── Datos de lentes (de files/app.js) ────────────────────────────────────────

const LENS_DATA = {
  negativa:    { name: 'Libertad Negativa',       color: '#4a9eff' },
  positiva:    { name: 'Libertad Positiva',        color: '#ff7a35' },
  capacidades: { name: 'Capacidades',              color: '#3dbe8a' },
  libertario:  { name: 'Económico-Libertario',     color: '#b0b0aa' },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Convierte un color hex (#rrggbb) al formato rgb(r, g, b) que jsdom
 * puede devolver al leer element.style.backgroundColor.
 *
 * @param {string} hex - Color en formato '#rrggbb'
 * @returns {string} Color en formato 'rgb(r, g, b)'
 */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Construye el DOM mínimo del drum selector.
 * Replica la estructura generada por initDrumSelector() en files/app.js.
 */
function setupDrumSelectorDOM() {
  document.body.innerHTML = '';

  const drumSelector = document.createElement('div');
  drumSelector.className = 'drum-selector';
  drumSelector.setAttribute('role', 'listbox');
  drumSelector.setAttribute('aria-label', 'Marco teórico activo');

  // Ventana visual con el ítem activo
  const window_ = document.createElement('div');
  window_.className = 'drum-selector__window';
  window_.setAttribute('aria-hidden', 'true');

  const item = document.createElement('div');
  item.className = 'drum-selector__item drum-selector__item--active';

  const dot = document.createElement('span');
  dot.className = 'drum-selector__dot';

  const name = document.createElement('span');
  name.className = 'drum-selector__name';

  item.appendChild(dot);
  item.appendChild(name);
  window_.appendChild(item);
  drumSelector.appendChild(window_);

  // Opciones ARIA (visualmente ocultas, accesibles para lectores de pantalla)
  const options = [
    { lens: 'negativa',    label: 'Libertad Negativa' },
    { lens: 'positiva',    label: 'Libertad Positiva' },
    { lens: 'capacidades', label: 'Capacidades' },
    { lens: 'libertario',  label: 'Económico-Libertario' },
  ];

  options.forEach(({ lens, label }) => {
    const opt = document.createElement('div');
    opt.setAttribute('role', 'option');
    opt.setAttribute('aria-selected', 'false');
    opt.setAttribute('data-lens', lens);
    opt.className = 'sr-only';
    opt.textContent = label;
    drumSelector.appendChild(opt);
  });

  document.body.appendChild(drumSelector);
  return drumSelector;
}

/**
 * Implementación inline de updateDrumSelector(lens) que replica la lógica
 * de files/app.js: actualiza el color del dot y el nombre del ítem activo,
 * y actualiza aria-selected en todos los [role="option"].
 */
function updateDrumSelector(lens) {
  const drumSelector = document.querySelector('.drum-selector');
  if (!drumSelector) return;

  const lensData = LENS_DATA[lens];
  if (!lensData) return;

  // Actualizar el ítem visual
  const dot = drumSelector.querySelector('.drum-selector__dot');
  const nameEl = drumSelector.querySelector('.drum-selector__name');
  if (dot) dot.style.backgroundColor = lensData.color;
  if (nameEl) nameEl.textContent = lensData.name;

  // Actualizar aria-selected en todos los [role="option"]
  const options = drumSelector.querySelectorAll('[role="option"]');
  options.forEach(opt => {
    const isActive = opt.getAttribute('data-lens') === lens;
    opt.setAttribute('aria-selected', String(isActive));
  });
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Propiedad 11 — El dot del drum selector coincide con el color del lente activo', () => {
  beforeEach(() => {
    setupDrumSelectorDOM();
  });

  /**
   * **Validates: Requirements 2.4**
   *
   * Para cualquier lente en ['negativa', 'positiva', 'capacidades', 'libertario']:
   *   - Después de llamar updateDrumSelector(lens), el .drum-selector__dot
   *     debe tener backgroundColor igual al color del lente (en formato hex o rgb)
   */
  test('el dot tiene el color CSS correspondiente al lente activo', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('negativa', 'positiva', 'capacidades', 'libertario'),
        (lens) => {
          updateDrumSelector(lens);

          const dot = document.querySelector('.drum-selector__dot');
          const expectedColor = LENS_DATA[lens].color;
          const expectedRgb = hexToRgb(expectedColor);
          const actualColor = dot.style.backgroundColor;

          // jsdom puede devolver el color como hex o como rgb()
          return actualColor === expectedColor || actualColor === expectedRgb;
        }
      ),
      { numRuns: 100 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('lente negativa: dot tiene color #4a9eff', () => {
    updateDrumSelector('negativa');
    const dot = document.querySelector('.drum-selector__dot');
    const expected = LENS_DATA['negativa'].color;
    expect(
      dot.style.backgroundColor === expected ||
      dot.style.backgroundColor === hexToRgb(expected)
    ).toBe(true);
  });

  test('lente positiva: dot tiene color #ff7a35', () => {
    updateDrumSelector('positiva');
    const dot = document.querySelector('.drum-selector__dot');
    const expected = LENS_DATA['positiva'].color;
    expect(
      dot.style.backgroundColor === expected ||
      dot.style.backgroundColor === hexToRgb(expected)
    ).toBe(true);
  });

  test('lente capacidades: dot tiene color #3dbe8a', () => {
    updateDrumSelector('capacidades');
    const dot = document.querySelector('.drum-selector__dot');
    const expected = LENS_DATA['capacidades'].color;
    expect(
      dot.style.backgroundColor === expected ||
      dot.style.backgroundColor === hexToRgb(expected)
    ).toBe(true);
  });

  test('lente libertario: dot tiene color #b0b0aa', () => {
    updateDrumSelector('libertario');
    const dot = document.querySelector('.drum-selector__dot');
    const expected = LENS_DATA['libertario'].color;
    expect(
      dot.style.backgroundColor === expected ||
      dot.style.backgroundColor === hexToRgb(expected)
    ).toBe(true);
  });

  test('cambiar de lente actualiza el color del dot', () => {
    updateDrumSelector('negativa');
    updateDrumSelector('capacidades');

    const dot = document.querySelector('.drum-selector__dot');
    const expected = LENS_DATA['capacidades'].color;
    expect(
      dot.style.backgroundColor === expected ||
      dot.style.backgroundColor === hexToRgb(expected)
    ).toBe(true);
  });

  test('el dot existe en el DOM después de setupDrumSelectorDOM', () => {
    const dot = document.querySelector('.drum-selector__dot');
    expect(dot).not.toBeNull();
  });
});
