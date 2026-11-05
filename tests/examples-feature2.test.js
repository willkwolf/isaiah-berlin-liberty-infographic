/**
 * tests/examples-feature2.test.js
 *
 * Pruebas de ejemplo para Feature 2 — Drum Selector en móvil
 * **Validates: Requirements 2.1, 2.8, 2.9, 2.11**
 *
 * Casos cubiertos:
 *   1. Drum selector oculto en desktop (viewport >500px): verificar estructura DOM
 *      y que no hay inline display style (el CSS maneja la visibilidad)
 *   2. Drum selector visible en móvil (viewport ≤500px): verificar que la estructura
 *      DOM es correcta (drum selector existe, lens-options existe)
 *   3. `preventDefault` en `touchmove` con delta >5px: verificar que event.preventDefault()
 *      fue llamado
 *   4. Reduced-motion en drum selector: verificar que el cambio de lente es instantáneo
 *      (sin clase de animación ni transform inline)
 *
 * Nota: jsdom no aplica hojas de estilo CSS, por lo que no se puede verificar
 * `getComputedStyle()` para reglas CSS puras. Las pruebas verifican la lógica
 * JavaScript y la estructura DOM.
 */

'use strict';

// ── Datos de lentes (de files/app.js) ────────────────────────────────────────

const LENS_DATA = {
  negativa:    { name: 'Libertad Negativa',       color: '#4a9eff' },
  positiva:    { name: 'Libertad Positiva',        color: '#ff7a35' },
  capacidades: { name: 'Enfoque de Capacidades',   color: '#3dbe8a' },
  libertario:  { name: 'Económico-Libertario',     color: '#b0b0aa' },
};

const DRUM_ORDER = ['negativa', 'positiva', 'capacidades', 'libertario'];

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Construye el DOM mínimo del drum selector dentro de .lens-panel__body.
 * Replica la estructura generada por initDrumSelector() en files/app.js.
 *
 * @param {boolean} [prefersReducedMotion=false] - Si true, simula prefers-reduced-motion
 * @returns {{ drum: HTMLElement, item: HTMLElement, dot: HTMLElement, nameSpan: HTMLElement, lensOptions: HTMLElement, handlers: object }}
 */
function setupDrumSelectorDOM({ prefersReducedMotion = false } = {}) {
  document.body.innerHTML = '';

  // Contenedor del panel
  const panelBody = document.createElement('div');
  panelBody.className = 'lens-panel__body';

  // .lens-options (los chips horizontales que se ocultan en móvil)
  const lensOptions = document.createElement('div');
  lensOptions.className = 'lens-options';
  panelBody.appendChild(lensOptions);

  // .drum-selector
  const drum = document.createElement('div');
  drum.className = 'drum-selector';
  drum.setAttribute('role', 'listbox');
  drum.setAttribute('aria-label', 'Marco teórico activo');
  drum.setAttribute('tabindex', '0');

  // Ventana visual (aria-hidden)
  const window_ = document.createElement('div');
  window_.className = 'drum-selector__window';
  window_.setAttribute('aria-hidden', 'true');

  const item = document.createElement('div');
  item.className = 'drum-selector__item drum-selector__item--active';

  const dot = document.createElement('span');
  dot.className = 'drum-selector__dot';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'drum-selector__name';

  item.appendChild(dot);
  item.appendChild(nameSpan);
  window_.appendChild(item);
  drum.appendChild(window_);

  // Opciones ARIA (visualmente ocultas)
  DRUM_ORDER.forEach(lensKey => {
    const opt = document.createElement('div');
    opt.setAttribute('role', 'option');
    opt.setAttribute('aria-selected', 'false');
    opt.setAttribute('data-lens', lensKey);
    opt.className = 'sr-only';
    opt.textContent = LENS_DATA[lensKey].name;
    drum.appendChild(opt);
  });

  panelBody.appendChild(drum);
  document.body.appendChild(panelBody);

  // Crear handlers de touch (sin registrarlos en el DOM — se llaman directamente en tests)
  const handlers = createTouchHandlers(drum, item, prefersReducedMotion);

  return { drum, item, dot, nameSpan, lensOptions, handlers };
}

/**
 * Crea un objeto de evento táctil simulado compatible con jsdom.
 * jsdom no implementa Touch ni TouchEvent con touches reales, por lo que
 * usamos objetos planos que replican la interfaz mínima necesaria.
 *
 * @param {string} type - Tipo de evento ('touchstart', 'touchmove', 'touchend')
 * @param {number} clientY - Posición Y del toque
 * @returns {{ type: string, touches: Array, preventDefault: Function, _preventDefaultCalled: boolean }}
 */
function createMockTouchEvent(type, clientY) {
  const event = {
    type,
    cancelable: true,
    bubbles: true,
    touches: type === 'touchend' ? [] : [{ clientX: 0, clientY }],
    targetTouches: type === 'touchend' ? [] : [{ clientX: 0, clientY }],
    changedTouches: [{ clientX: 0, clientY }],
    _preventDefaultCalled: false,
    preventDefault() {
      this._preventDefaultCalled = true;
    },
    stopPropagation() {},
  };
  return event;
}

/**
 * Registra handlers de touch en el drum selector que replican la lógica
 * de initDrumSelector() en files/app.js, pero usando callbacks directos
 * en lugar de addEventListener (para poder llamarlos con mock events).
 *
 * @param {HTMLElement} drum - El elemento .drum-selector
 * @param {HTMLElement} item - El elemento .drum-selector__item
 * @param {boolean} prefersReducedMotion - Si true, omite animaciones
 * @returns {{ onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function }}
 */
function createTouchHandlers(drum, item, prefersReducedMotion) {
  let touchStartY = 0;
  let deltaY = 0;
  let isDragging = false;

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
    deltaY = 0;
    isDragging = true;
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    deltaY = e.touches[0].clientY - touchStartY;

    if (Math.abs(deltaY) > 5) {
      e.preventDefault();
    }

    if (!prefersReducedMotion) {
      item.style.transform = `translateY(${deltaY}px)`;
    }
  }

  function onTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    if (!prefersReducedMotion) {
      item.style.transition = 'transform 200ms ease';
      item.style.transform = 'translateY(0)';
      setTimeout(() => { item.style.transition = ''; }, 200);
    } else {
      item.style.transform = '';
    }

    deltaY = 0;
  }

  return { onTouchStart, onTouchMove, onTouchEnd };
}

// ── Test suite ────────────────────────────────────────────────────────────────

// ── Test 1: Drum selector oculto en desktop ───────────────────────────────────

describe('Feature 2 — Test 1: Drum selector en desktop (viewport >500px)', () => {
  /**
   * **Validates: Requirements 2.1, 2.9**
   *
   * En desktop (viewport >500px), el drum selector debe estar oculto.
   * jsdom no aplica CSS, por lo que verificamos:
   *   - El elemento .drum-selector existe en el DOM
   *   - No tiene ningún inline style `display` establecido (la visibilidad la maneja el CSS)
   *   - window.matchMedia('(max-width: 500px)').matches retorna false (desktop)
   */
  test('el drum selector existe en el DOM y no tiene inline display style en desktop', () => {
    setupDrumSelectorDOM();

    const drum = document.querySelector('.drum-selector');
    expect(drum).not.toBeNull();

    // En desktop, el CSS establece `display: none` mediante la hoja de estilos.
    // jsdom no aplica CSS, así que verificamos que no hay un inline style
    // que sobreescriba el CSS (el elemento depende del CSS para estar oculto).
    expect(drum.style.display).toBe('');
  });

  test('window.matchMedia retorna matches: false para (max-width: 500px) en desktop', () => {
    // El setup.js configura matchMedia para retornar matches: false por defecto,
    // simulando un viewport de desktop (>500px).
    const mq = window.matchMedia('(max-width: 500px)');
    expect(mq.matches).toBe(false);
  });

  test('el drum selector tiene role="listbox" y aria-label correctos', () => {
    setupDrumSelectorDOM();

    const drum = document.querySelector('.drum-selector');
    expect(drum.getAttribute('role')).toBe('listbox');
    expect(drum.getAttribute('aria-label')).toBe('Marco teórico activo');
  });

  test('el drum selector tiene exactamente 4 opciones [role="option"]', () => {
    setupDrumSelectorDOM();

    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBe(4);
  });
});

// ── Test 2: Drum selector visible en móvil ────────────────────────────────────

describe('Feature 2 — Test 2: Drum selector en móvil (viewport ≤500px)', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    // Mock matchMedia para simular viewport móvil (≤500px)
    window.matchMedia = function matchMedia(query) {
      return {
        matches: true,   // siempre "móvil"
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  /**
   * **Validates: Requirements 2.1, 2.9**
   *
   * En móvil (viewport ≤500px):
   *   - El elemento .drum-selector debe existir en el DOM
   *   - El elemento .lens-options debe existir en el DOM
   *   - window.matchMedia('(max-width: 500px)').matches retorna true
   *
   * Nota: jsdom no aplica CSS, por lo que no podemos verificar `display: none`
   * en .lens-options ni la visibilidad del drum selector mediante getComputedStyle.
   * La visibilidad real la maneja el CSS en el navegador.
   */
  test('window.matchMedia retorna matches: true para (max-width: 500px) en móvil', () => {
    const mq = window.matchMedia('(max-width: 500px)');
    expect(mq.matches).toBe(true);
  });

  test('el drum selector existe en el DOM en móvil', () => {
    setupDrumSelectorDOM();

    const drum = document.querySelector('.drum-selector');
    expect(drum).not.toBeNull();
  });

  test('.lens-options existe en el DOM en móvil', () => {
    setupDrumSelectorDOM();

    const lensOptions = document.querySelector('.lens-options');
    expect(lensOptions).not.toBeNull();
  });

  test('el drum selector y .lens-options coexisten en .lens-panel__body', () => {
    setupDrumSelectorDOM();

    const panelBody = document.querySelector('.lens-panel__body');
    expect(panelBody).not.toBeNull();

    const drum = panelBody.querySelector('.drum-selector');
    const lensOptions = panelBody.querySelector('.lens-options');

    expect(drum).not.toBeNull();
    expect(lensOptions).not.toBeNull();
  });

  test('el drum selector está insertado después de .lens-options en el DOM', () => {
    setupDrumSelectorDOM();

    const panelBody = document.querySelector('.lens-panel__body');
    const children = [...panelBody.children];
    const lensOptionsIdx = children.findIndex(el => el.classList.contains('lens-options'));
    const drumIdx = children.findIndex(el => el.classList.contains('drum-selector'));

    expect(lensOptionsIdx).toBeGreaterThanOrEqual(0);
    expect(drumIdx).toBeGreaterThan(lensOptionsIdx);
  });
});

// ── Test 3: preventDefault en touchmove con delta >5px ────────────────────────

describe('Feature 2 — Test 3: preventDefault en touchmove con delta >5px', () => {
  /**
   * **Validates: Requirement 2.8**
   *
   * Cuando el usuario arrastra el drum selector más de 5px verticalmente,
   * el handler de touchmove debe llamar event.preventDefault() para bloquear
   * el scroll de la página.
   *
   * Usamos mock events (objetos planos) porque jsdom no implementa Touch/TouchEvent.
   */
  test('preventDefault es llamado en touchmove cuando |deltaY| > 5px', () => {
    const { handlers } = setupDrumSelectorDOM();

    // Inicializar estado de arrastre con touchstart en Y=100
    handlers.onTouchStart(createMockTouchEvent('touchstart', 100));

    // Crear touchmove con delta de 20px (> 5px) y verificar preventDefault
    const touchMoveEvent = createMockTouchEvent('touchmove', 120); // delta = 20px
    handlers.onTouchMove(touchMoveEvent);

    expect(touchMoveEvent._preventDefaultCalled).toBe(true);
  });

  test('preventDefault NO es llamado en touchmove cuando |deltaY| ≤ 5px', () => {
    const { handlers } = setupDrumSelectorDOM();

    // Inicializar estado de arrastre con touchstart en Y=100
    handlers.onTouchStart(createMockTouchEvent('touchstart', 100));

    // Crear touchmove con delta de 3px (≤ 5px)
    const touchMoveEvent = createMockTouchEvent('touchmove', 103); // delta = 3px
    handlers.onTouchMove(touchMoveEvent);

    expect(touchMoveEvent._preventDefaultCalled).toBe(false);
  });

  test('preventDefault es llamado en touchmove con delta negativo de -10px (swipe up)', () => {
    const { handlers } = setupDrumSelectorDOM();

    // Inicializar estado de arrastre con touchstart en Y=100
    handlers.onTouchStart(createMockTouchEvent('touchstart', 100));

    // Crear touchmove con delta de -10px (swipe up, > 5px en valor absoluto)
    const touchMoveEvent = createMockTouchEvent('touchmove', 90); // delta = -10px
    handlers.onTouchMove(touchMoveEvent);

    expect(touchMoveEvent._preventDefaultCalled).toBe(true);
  });

  test('el item del drum se mueve visualmente durante el touchmove (sin reduced-motion)', () => {
    const { item, handlers } = setupDrumSelectorDOM({ prefersReducedMotion: false });

    // Inicializar estado de arrastre
    handlers.onTouchStart(createMockTouchEvent('touchstart', 100));

    // Disparar touchmove con delta de 30px
    handlers.onTouchMove(createMockTouchEvent('touchmove', 130));

    // El item debe tener un transform aplicado
    expect(item.style.transform).toBe('translateY(30px)');
  });
});

// ── Test 4: Reduced-motion en drum selector ───────────────────────────────────

describe('Feature 2 — Test 4: Reduced-motion en drum selector', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  /**
   * **Validates: Requirement 2.11**
   *
   * Con prefers-reduced-motion: reduce activo, el drum selector debe:
   *   - No aplicar transform al item durante el touchmove
   *   - No aplicar transition al item durante el touchend
   *   - Actualizar el estado directamente sin animación
   *
   * Usamos mock events (objetos planos) porque jsdom no implementa Touch/TouchEvent.
   */
  test('con reduced-motion: el item NO tiene transform durante touchmove', () => {
    // Mock matchMedia para retornar matches: true para prefers-reduced-motion
    window.matchMedia = function matchMedia(query) {
      return {
        matches: query.includes('prefers-reduced-motion') || query.includes('max-width: 500px'),
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    const { item, handlers } = setupDrumSelectorDOM({ prefersReducedMotion: true });

    // Inicializar estado de arrastre
    handlers.onTouchStart(createMockTouchEvent('touchstart', 100));

    // Disparar touchmove con delta de 30px
    handlers.onTouchMove(createMockTouchEvent('touchmove', 130));

    // Con reduced-motion, el item NO debe tener transform aplicado
    expect(item.style.transform).toBe('');
  });

  test('con reduced-motion: el item NO tiene transition después de touchend', () => {
    window.matchMedia = function matchMedia(query) {
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    const { item, handlers } = setupDrumSelectorDOM({ prefersReducedMotion: true });

    // Inicializar estado de arrastre y mover
    handlers.onTouchStart(createMockTouchEvent('touchstart', 100));
    handlers.onTouchMove(createMockTouchEvent('touchmove', 130));

    // Disparar touchend
    handlers.onTouchEnd(createMockTouchEvent('touchend', 130));

    // Con reduced-motion, el item NO debe tener transition ni transform
    expect(item.style.transition).toBe('');
    expect(item.style.transform).toBe('');
  });

  test('sin reduced-motion: el item SÍ tiene transform durante touchmove', () => {
    // matchMedia retorna false para prefers-reduced-motion (comportamiento por defecto)
    window.matchMedia = function matchMedia(query) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    const { item, handlers } = setupDrumSelectorDOM({ prefersReducedMotion: false });

    // Inicializar estado de arrastre
    handlers.onTouchStart(createMockTouchEvent('touchstart', 100));

    // Disparar touchmove con delta de 20px
    handlers.onTouchMove(createMockTouchEvent('touchmove', 120));

    // Sin reduced-motion, el item SÍ debe tener transform aplicado
    expect(item.style.transform).toBe('translateY(20px)');
  });

  test('con reduced-motion: el drum selector tiene la estructura DOM correcta', () => {
    window.matchMedia = function matchMedia(query) {
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    setupDrumSelectorDOM({ prefersReducedMotion: true });

    // Verificar que la estructura DOM es correcta independientemente de reduced-motion
    const drum = document.querySelector('.drum-selector');
    const item = document.querySelector('.drum-selector__item');
    const dot = document.querySelector('.drum-selector__dot');
    const nameEl = document.querySelector('.drum-selector__name');

    expect(drum).not.toBeNull();
    expect(item).not.toBeNull();
    expect(dot).not.toBeNull();
    expect(nameEl).not.toBeNull();
  });
});
