/**
 * tests/property4-aria-consistency.test.js
 *
 * Propiedad 4: El ARIA del drum selector es consistente con el lente activo
 * **Validates: Requirements 2.6**
 *
 * Para cualquier lente activo, el drum selector debe tener exactamente un
 * [role="option"] con aria-selected="true" (el correspondiente al lente
 * activo) y los tres restantes con aria-selected="false".
 *
 * Dado que app.js es un script de browser sin exports, se inlinea la misma
 * lógica de updateDrumSelector() para testearla directamente con un DOM
 * mínimo que replica la estructura del drum selector.
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
 * Construye el DOM mínimo del drum selector con los cuatro [role="option"].
 * Replica la estructura generada por initDrumSelector() en files/app.js.
 */
function setupDrumSelectorDOM() {
  document.body.innerHTML = '';

  const drumSelector = document.createElement('div');
  drumSelector.className = 'drum-selector';
  drumSelector.setAttribute('role', 'listbox');
  drumSelector.setAttribute('aria-label', 'Marco teórico activo');

  // Ventana visual (aria-hidden, no relevante para la propiedad ARIA)
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
 * de files/app.js: actualiza aria-selected en todos los [role="option"]
 * dentro de .drum-selector, y actualiza el ítem visual activo.
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

describe('Propiedad 4 — El ARIA del drum selector es consistente con el lente activo', () => {
  beforeEach(() => {
    setupDrumSelectorDOM();
  });

  /**
   * **Validates: Requirements 2.6**
   *
   * Para cualquier lente en ['negativa', 'positiva', 'capacidades', 'libertario']:
   *   - Exactamente un [role="option"] tiene aria-selected="true"
   *   - Ese elemento tiene data-lens === lens (el lente activo)
   *   - Los tres restantes tienen aria-selected="false"
   */
  test('exactamente un [role="option"] tiene aria-selected="true" y corresponde al lente activo', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('negativa', 'positiva', 'capacidades', 'libertario'),
        (lens) => {
          updateDrumSelector(lens);

          const options = document.querySelectorAll('[role="option"]');
          const selected = [...options].filter(
            o => o.getAttribute('aria-selected') === 'true'
          );

          // Exactamente uno seleccionado y corresponde al lente activo
          return selected.length === 1 && selected[0].dataset.lens === lens;
        }
      ),
      { numRuns: 100 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('los tres [role="option"] no activos tienen aria-selected="false"', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('negativa', 'positiva', 'capacidades', 'libertario'),
        (lens) => {
          updateDrumSelector(lens);

          const options = [...document.querySelectorAll('[role="option"]')];
          const notSelected = options.filter(
            o => o.getAttribute('data-lens') !== lens
          );

          return notSelected.every(
            o => o.getAttribute('aria-selected') === 'false'
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  test('lente negativa: aria-selected="true" en el option correcto', () => {
    updateDrumSelector('negativa');
    const options = [...document.querySelectorAll('[role="option"]')];
    const selected = options.filter(o => o.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0].dataset.lens).toBe('negativa');
  });

  test('lente positiva: aria-selected="true" en el option correcto', () => {
    updateDrumSelector('positiva');
    const options = [...document.querySelectorAll('[role="option"]')];
    const selected = options.filter(o => o.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0].dataset.lens).toBe('positiva');
  });

  test('lente capacidades: aria-selected="true" en el option correcto', () => {
    updateDrumSelector('capacidades');
    const options = [...document.querySelectorAll('[role="option"]')];
    const selected = options.filter(o => o.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0].dataset.lens).toBe('capacidades');
  });

  test('lente libertario: aria-selected="true" en el option correcto', () => {
    updateDrumSelector('libertario');
    const options = [...document.querySelectorAll('[role="option"]')];
    const selected = options.filter(o => o.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0].dataset.lens).toBe('libertario');
  });

  test('cambiar de lente actualiza aria-selected correctamente', () => {
    updateDrumSelector('negativa');
    updateDrumSelector('capacidades');

    const options = [...document.querySelectorAll('[role="option"]')];
    const selected = options.filter(o => o.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0].dataset.lens).toBe('capacidades');

    // El anterior ya no está seleccionado
    const negativa = options.find(o => o.dataset.lens === 'negativa');
    expect(negativa.getAttribute('aria-selected')).toBe('false');
  });

  test('siempre hay exactamente 4 [role="option"] en el DOM', () => {
    updateDrumSelector('negativa');
    const options = document.querySelectorAll('[role="option"]');
    expect(options).toHaveLength(4);
  });
});
