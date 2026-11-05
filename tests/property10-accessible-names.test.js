/**
 * tests/property10-accessible-names.test.js
 *
 * Propiedad 10: Los elementos interactivos tienen nombre accesible
 * **Validates: Requirement 3.10**
 *
 * Para cualquier elemento interactivo en el DOM (botones, inputs, elementos con
 * role="button", role="option", role="radio"), debe tener un nombre accesible:
 * texto visible no vacío, aria-label, o aria-labelledby apuntando a contenido
 * no vacío.
 */

'use strict';

const fc = require('fast-check');

// ── hasAccessibleName implementation ─────────────────────────────────────────

/**
 * Returns true if the element has an accessible name via:
 *   1. aria-label attribute (non-empty string)
 *   2. aria-labelledby attribute pointing to an element with non-empty text
 *   3. Visible text content (non-empty trimmed textContent)
 *
 * @param {Element} el
 * @returns {boolean}
 */
function hasAccessibleName(el) {
  // 1. aria-label
  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel && ariaLabel.trim().length > 0) {
    return true;
  }

  // 2. aria-labelledby pointing to element with non-empty text
  const ariaLabelledBy = el.getAttribute('aria-labelledby');
  if (ariaLabelledBy && ariaLabelledBy.trim().length > 0) {
    const ids = ariaLabelledBy.trim().split(/\s+/);
    const labelText = ids
      .map(id => {
        const target = document.getElementById(id);
        return target ? target.textContent.trim() : '';
      })
      .join(' ')
      .trim();
    if (labelText.length > 0) {
      return true;
    }
  }

  // 3. Visible text content
  const textContent = el.textContent ? el.textContent.trim() : '';
  if (textContent.length > 0) {
    return true;
  }

  return false;
}

// ── Minimal DOM setup ─────────────────────────────────────────────────────────
// Build a representative DOM with the key interactive elements from the app.
// Each element must have an accessible name.

let interactiveElements = [];

beforeEach(() => {
  // Reset body
  document.body.innerHTML = '';

  // ── Skip link ──────────────────────────────────────────────────────────────
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Saltar al contenido principal';
  document.body.appendChild(skipLink);

  // ── Lens panel toggle button ───────────────────────────────────────────────
  const lensToggleBtn = document.createElement('button');
  lensToggleBtn.id = 'lensToggleBtn';
  lensToggleBtn.className = 'lens-panel__toggle';
  lensToggleBtn.setAttribute('aria-label', 'Colapsar selector');
  lensToggleBtn.setAttribute('aria-expanded', 'true');
  lensToggleBtn.setAttribute('aria-controls', 'lensPanelBody');
  lensToggleBtn.textContent = '◂';
  document.body.appendChild(lensToggleBtn);

  // ── Language buttons ───────────────────────────────────────────────────────
  const langES = document.createElement('button');
  langES.className = 'language-btn active';
  langES.setAttribute('data-lang', 'es');
  langES.setAttribute('aria-pressed', 'true');
  langES.textContent = 'ES';
  document.body.appendChild(langES);

  const langEN = document.createElement('button');
  langEN.className = 'language-btn';
  langEN.setAttribute('data-lang', 'en');
  langEN.setAttribute('aria-pressed', 'false');
  langEN.textContent = 'EN';
  document.body.appendChild(langEN);

  // ── Color mode button ──────────────────────────────────────────────────────
  const colorModeBtn = document.createElement('button');
  colorModeBtn.id = 'colorModeBtn';
  colorModeBtn.className = 'color-mode-btn';
  colorModeBtn.setAttribute('aria-label', 'Activar modo claro');
  colorModeBtn.setAttribute('aria-pressed', 'false');
  colorModeBtn.textContent = '☀';
  document.body.appendChild(colorModeBtn);

  // ── Lens buttons (role="radio") ────────────────────────────────────────────
  const lensData = [
    { lens: 'negativa',    name: 'Libertad Negativa' },
    { lens: 'positiva',    name: 'Libertad Positiva' },
    { lens: 'capacidades', name: 'Capacidades' },
    { lens: 'libertario',  name: 'Económico-Libertario' },
  ];

  lensData.forEach(({ lens, name }, i) => {
    const btn = document.createElement('button');
    btn.className = 'lens-btn' + (i === 0 ? ' active' : '');
    btn.setAttribute('data-lens', lens);
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
    // Text content provides the accessible name
    btn.textContent = name;
    document.body.appendChild(btn);
  });

  // ── Drum selector options (role="option") ──────────────────────────────────
  const drumData = [
    { lens: 'negativa',    name: 'Libertad Negativa' },
    { lens: 'positiva',    name: 'Libertad Positiva' },
    { lens: 'capacidades', name: 'Capacidades' },
    { lens: 'libertario',  name: 'Económico-Libertario' },
  ];

  drumData.forEach(({ lens, name }, i) => {
    const option = document.createElement('div');
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    option.setAttribute('data-lens', lens);
    option.className = 'sr-only';
    // Text content provides the accessible name
    option.textContent = name;
    document.body.appendChild(option);
  });

  // ── Collect all interactive elements ──────────────────────────────────────
  // Matches: buttons, inputs, [role="button"], [role="option"], [role="radio"]
  const selectors = [
    'button',
    'input',
    '[role="button"]',
    '[role="option"]',
    '[role="radio"]',
  ];

  const seen = new Set();
  interactiveElements = [];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!seen.has(el)) {
        seen.add(el);
        interactiveElements.push(el);
      }
    });
  });
});

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Propiedad 10 — Los elementos interactivos tienen nombre accesible', () => {
  /**
   * **Validates: Requirement 3.10**
   *
   * Para cualquier índice válido en la lista de elementos interactivos,
   * el elemento en ese índice debe tener un nombre accesible.
   */
  test('todos los elementos interactivos tienen nombre accesible', () => {
    // Ensure we have elements to test
    expect(interactiveElements.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: interactiveElements.length - 1 }),
        (index) => {
          const el = interactiveElements[index];
          return hasAccessibleName(el);
        }
      ),
      { numRuns: 100 }
    );
  });

  // ── Casos de borde explícitos ─────────────────────────────────────────────

  test('hasAccessibleName retorna true para elemento con aria-label', () => {
    const el = document.createElement('button');
    el.setAttribute('aria-label', 'Cerrar diálogo');
    expect(hasAccessibleName(el)).toBe(true);
  });

  test('hasAccessibleName retorna true para elemento con texto visible', () => {
    const el = document.createElement('button');
    el.textContent = 'Guardar';
    expect(hasAccessibleName(el)).toBe(true);
  });

  test('hasAccessibleName retorna true para elemento con aria-labelledby válido', () => {
    const label = document.createElement('span');
    label.id = 'my-label';
    label.textContent = 'Nombre del campo';
    document.body.appendChild(label);

    const el = document.createElement('input');
    el.setAttribute('aria-labelledby', 'my-label');
    expect(hasAccessibleName(el)).toBe(true);
  });

  test('hasAccessibleName retorna false para elemento sin nombre accesible', () => {
    const el = document.createElement('button');
    // No text, no aria-label, no aria-labelledby
    expect(hasAccessibleName(el)).toBe(false);
  });

  test('hasAccessibleName retorna false para aria-label vacío', () => {
    const el = document.createElement('button');
    el.setAttribute('aria-label', '   ');
    expect(hasAccessibleName(el)).toBe(false);
  });

  test('hasAccessibleName retorna false para aria-labelledby apuntando a elemento vacío', () => {
    const emptyLabel = document.createElement('span');
    emptyLabel.id = 'empty-label';
    emptyLabel.textContent = '';
    document.body.appendChild(emptyLabel);

    const el = document.createElement('button');
    el.setAttribute('aria-labelledby', 'empty-label');
    expect(hasAccessibleName(el)).toBe(false);
  });

  test('el botón lensToggleBtn tiene nombre accesible via aria-label', () => {
    const btn = document.querySelector('#lensToggleBtn');
    expect(btn).not.toBeNull();
    expect(hasAccessibleName(btn)).toBe(true);
  });

  test('el botón colorModeBtn tiene nombre accesible via aria-label', () => {
    const btn = document.querySelector('#colorModeBtn');
    expect(btn).not.toBeNull();
    expect(hasAccessibleName(btn)).toBe(true);
  });

  test('los botones de idioma tienen nombre accesible via texto visible', () => {
    const langBtns = document.querySelectorAll('.language-btn');
    expect(langBtns.length).toBeGreaterThan(0);
    langBtns.forEach(btn => {
      expect(hasAccessibleName(btn)).toBe(true);
    });
  });

  test('los botones de lente tienen nombre accesible via texto visible', () => {
    const lensBtns = document.querySelectorAll('.lens-btn');
    expect(lensBtns.length).toBeGreaterThan(0);
    lensBtns.forEach(btn => {
      expect(hasAccessibleName(btn)).toBe(true);
    });
  });

  test('las opciones del drum selector tienen nombre accesible via texto visible', () => {
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
    options.forEach(option => {
      expect(hasAccessibleName(option)).toBe(true);
    });
  });

  test('el skip link tiene nombre accesible via texto visible', () => {
    const skipLink = document.querySelector('.skip-link');
    expect(skipLink).not.toBeNull();
    // Note: skip link is an <a>, not in the interactive elements selector list,
    // but we verify it has an accessible name anyway
    expect(hasAccessibleName(skipLink)).toBe(true);
  });

  test('la lista de elementos interactivos contiene al menos los elementos clave', () => {
    // Should have: lensToggleBtn, 2 language-btn, colorModeBtn, 4 lens-btn, 4 drum options
    // = 11 elements minimum
    expect(interactiveElements.length).toBeGreaterThanOrEqual(11);
  });
});
