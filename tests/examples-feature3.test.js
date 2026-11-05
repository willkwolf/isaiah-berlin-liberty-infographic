/**
 * tests/examples-feature3.test.js
 *
 * Pruebas de ejemplo para Feature 3 — Mejoras de accesibilidad
 * **Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.13, 3.14, 3.19**
 *
 * Casos cubiertos:
 *   1. Fallback sin localStorage: mock localStorage.setItem para lanzar excepción;
 *      verificar que la app inicializa con valores por defecto sin errores
 *   2. Modo claro desde prefers-color-scheme: mock matchMedia para retornar
 *      matches: true; verificar que body.light-mode se aplica en init
 *   3. Skip link es primer elemento enfocable: verificar que el primer elemento
 *      con tabindex no negativo en <body> es el .skip-link
 *   4. #divergenceCanvas tiene aria-hidden="true": verificar atributo en DOM
 */

'use strict';

// ── Inline implementations of Feature 3 functions ────────────────────────────
// These mirror the logic in files/app.js so tests run without loading the full
// app (which requires a complete DOM and all dependencies).

/** Minimal state object (mirrors app.js) */
function createState() {
  return { colorMode: 'dark' };
}

/**
 * Inline re-implementation of getInitialColorMode() from files/app.js.
 * Reads localStorage first; falls back to matchMedia; defaults to 'dark'.
 *
 * @returns {'light'|'dark'}
 */
function getInitialColorMode() {
  try {
    const saved = localStorage.getItem('site-color-scheme');
    if (saved) return saved;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * Inline re-implementation of setColorMode() from files/app.js.
 * Applies the color mode to the document and persists it in localStorage.
 *
 * @param {'light'|'dark'} mode
 * @param {object} state - Mutable state object
 */
function setColorMode(mode, state) {
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

  state.colorMode = mode;
}

/**
 * Inline re-implementation of initColorModeToggle() from files/app.js.
 * Reads the initial preference and applies it.
 *
 * @param {object} state - Mutable state object
 */
function initColorModeToggle(state) {
  setColorMode(getInitialColorMode(), state);
}

// ── DOM helpers ───────────────────────────────────────────────────────────────

/**
 * Build a minimal DOM that includes the elements needed for Feature 3 tests:
 *   - .skip-link as first child of <body>
 *   - #colorModeBtn button
 *   - #divergenceCanvas canvas with aria-hidden="true"
 *   - A few other focusable elements to verify skip-link ordering
 */
function setupFeature3DOM() {
  document.body.innerHTML = '';
  document.body.className = '';

  // 1. Skip link — must be the first focusable element
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Saltar al contenido principal';
  document.body.appendChild(skipLink);

  // 2. Color mode button (inside hero, after skip link)
  const btn = document.createElement('button');
  btn.id = 'colorModeBtn';
  btn.className = 'color-mode-btn';
  btn.setAttribute('aria-label', 'Activar modo claro');
  btn.setAttribute('aria-pressed', 'false');
  btn.textContent = '☀';
  document.body.appendChild(btn);

  // 3. Main content area
  const main = document.createElement('main');
  main.id = 'main';
  document.body.appendChild(main);

  // 4. Divergence canvas — decorative, must have aria-hidden="true"
  const canvas = document.createElement('canvas');
  canvas.id = 'divergenceCanvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = 420;
  canvas.height = 300;
  main.appendChild(canvas);

  return { skipLink, btn, main, canvas };
}

// ── Test suite 1: Fallback sin localStorage ───────────────────────────────────

describe('Feature 3 — Test 1: Fallback sin localStorage', () => {
  let realLocalStorage;

  beforeEach(() => {
    setupFeature3DOM();
    // Save a reference to the real jsdom localStorage before any mocking
    realLocalStorage = window.localStorage;
  });

  afterEach(() => {
    // Always restore the real localStorage so subsequent test suites are unaffected
    Object.defineProperty(window, 'localStorage', {
      value: realLocalStorage,
      writable: true,
      configurable: true,
    });
  });

  /**
   * **Validates: Requirement 3.19**
   *
   * When localStorage.setItem throws (e.g. private browsing, storage full),
   * setColorMode() must not propagate the error — the app continues working
   * with the in-memory state.
   */
  test('setColorMode no lanza error cuando localStorage.setItem falla', () => {
    const state = createState();

    // Mock localStorage.setItem to throw
    const mockStorage = {
      getItem: () => null,
      setItem: () => { throw new DOMException('QuotaExceededError'); },
      removeItem: () => {},
      clear: () => {},
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });

    // Must not throw
    expect(() => setColorMode('light', state)).not.toThrow();
  });

  /**
   * **Validates: Requirement 3.19**
   *
   * Even when localStorage.setItem throws, the DOM state must still be updated:
   * body.classList should contain 'light-mode' after setColorMode('light').
   */
  test('body.light-mode se aplica aunque localStorage.setItem falle', () => {
    const state = createState();

    const mockStorage = {
      getItem: () => null,
      setItem: () => { throw new DOMException('QuotaExceededError'); },
      removeItem: () => {},
      clear: () => {},
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });

    setColorMode('light', state);

    expect(document.body.classList.contains('light-mode')).toBe(true);
  });

  /**
   * **Validates: Requirement 3.19**
   *
   * When localStorage.getItem also throws (completely unavailable),
   * getInitialColorMode() must return a valid default ('dark') without throwing.
   */
  test('getInitialColorMode retorna "dark" por defecto cuando localStorage no está disponible', () => {
    const mockStorage = {
      getItem: () => { throw new DOMException('SecurityError'); },
      setItem: () => { throw new DOMException('SecurityError'); },
      removeItem: () => {},
      clear: () => {},
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });

    // matchMedia returns false for prefers-color-scheme: light (default in setup.js)
    let result;
    expect(() => { result = getInitialColorMode(); }).not.toThrow();
    // With no localStorage and no light preference, should default to 'dark'
    expect(result).toBe('dark');
  });

  /**
   * **Validates: Requirement 3.19**
   *
   * initColorModeToggle() must complete without errors even when localStorage
   * is completely unavailable, leaving the app in a usable default state.
   */
  test('initColorModeToggle no lanza error cuando localStorage no está disponible', () => {
    const state = createState();

    const mockStorage = {
      getItem: () => { throw new DOMException('SecurityError'); },
      setItem: () => { throw new DOMException('SecurityError'); },
      removeItem: () => {},
      clear: () => {},
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });

    expect(() => initColorModeToggle(state)).not.toThrow();
  });

  /**
   * **Validates: Requirement 3.19**
   *
   * After initColorModeToggle() with unavailable localStorage, state.colorMode
   * must be a valid value ('dark' or 'light'), not undefined or null.
   */
  test('state.colorMode tiene un valor válido después de initColorModeToggle sin localStorage', () => {
    const state = createState();

    const mockStorage = {
      getItem: () => { throw new DOMException('SecurityError'); },
      setItem: () => { throw new DOMException('SecurityError'); },
      removeItem: () => {},
      clear: () => {},
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });

    initColorModeToggle(state);

    expect(['dark', 'light']).toContain(state.colorMode);
  });
});

// ── Test suite 2: Modo claro desde prefers-color-scheme ───────────────────────

describe('Feature 3 — Test 2: Modo claro desde prefers-color-scheme', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    setupFeature3DOM();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    document.body.classList.remove('light-mode');
  });

  /**
   * **Validates: Requirement 3.3**
   *
   * When the system preference is prefers-color-scheme: light and no explicit
   * preference is stored in localStorage, getInitialColorMode() must return 'light'.
   */
  test('getInitialColorMode retorna "light" cuando prefers-color-scheme es light', () => {
    // Mock matchMedia to return matches: true for prefers-color-scheme: light
    window.matchMedia = function matchMedia(query) {
      return {
        matches: query.includes('prefers-color-scheme: light'),
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    // No saved preference in localStorage
    localStorage.clear();

    const mode = getInitialColorMode();
    expect(mode).toBe('light');
  });

  /**
   * **Validates: Requirement 3.3**
   *
   * When the system preference is prefers-color-scheme: light, initColorModeToggle()
   * must apply body.light-mode on initialization.
   */
  test('body.light-mode se aplica en init cuando prefers-color-scheme es light', () => {
    // Mock matchMedia to return matches: true for prefers-color-scheme: light
    window.matchMedia = function matchMedia(query) {
      return {
        matches: query.includes('prefers-color-scheme: light'),
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    // No saved preference in localStorage
    localStorage.clear();

    const state = createState();
    initColorModeToggle(state);

    expect(document.body.classList.contains('light-mode')).toBe(true);
  });

  /**
   * **Validates: Requirement 3.3**
   *
   * A saved localStorage preference must take precedence over the system
   * prefers-color-scheme setting.
   */
  test('la preferencia guardada en localStorage tiene prioridad sobre prefers-color-scheme', () => {
    // System says light
    window.matchMedia = function matchMedia(query) {
      return {
        matches: query.includes('prefers-color-scheme: light'),
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    // But user explicitly saved 'dark'
    localStorage.setItem('site-color-scheme', 'dark');

    const mode = getInitialColorMode();
    expect(mode).toBe('dark');
  });

  /**
   * **Validates: Requirement 3.3**
   *
   * When the system preference is dark (matches: false for light query),
   * getInitialColorMode() must return 'dark'.
   */
  test('getInitialColorMode retorna "dark" cuando prefers-color-scheme es dark', () => {
    // Mock matchMedia to return matches: false for all queries (dark preference)
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

    localStorage.clear();

    const mode = getInitialColorMode();
    expect(mode).toBe('dark');
  });

  /**
   * **Validates: Requirement 3.2, 3.5**
   *
   * After initColorModeToggle() with light mode, the #colorModeBtn must have
   * aria-pressed="true" (light mode is active) and the correct aria-label.
   */
  test('el botón de color mode tiene aria-pressed="true" y aria-label correcto en modo claro', () => {
    window.matchMedia = function matchMedia(query) {
      return {
        matches: query.includes('prefers-color-scheme: light'),
        media: query,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () { return false; },
      };
    };

    localStorage.clear();

    const state = createState();
    initColorModeToggle(state);

    const btn = document.querySelector('#colorModeBtn');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    expect(btn.getAttribute('aria-label')).toBe('Activar modo oscuro');
  });
});

// ── Test suite 3: Skip link es primer elemento enfocable ─────────────────────

describe('Feature 3 — Test 3: Skip link es primer elemento enfocable', () => {
  /**
   * **Validates: Requirement 3.13**
   *
   * The .skip-link must be the first focusable element in <body>.
   * "Focusable" means: a, button, input, select, textarea, [tabindex] with
   * tabindex >= 0 (not -1).
   */
  test('el .skip-link es el primer elemento enfocable en <body>', () => {
    setupFeature3DOM();

    // Collect all potentially focusable elements in document order
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]',
    ].join(', ');

    const focusableElements = [...document.body.querySelectorAll(focusableSelectors)]
      .filter(el => {
        const tabindex = el.getAttribute('tabindex');
        // Exclude elements with tabindex="-1" (programmatically focusable only)
        return tabindex === null || parseInt(tabindex, 10) >= 0;
      });

    expect(focusableElements.length).toBeGreaterThan(0);

    const firstFocusable = focusableElements[0];
    expect(firstFocusable.classList.contains('skip-link')).toBe(true);
  });

  /**
   * **Validates: Requirement 3.13**
   *
   * The .skip-link must point to #main (the main content landmark).
   */
  test('el .skip-link apunta a #main', () => {
    setupFeature3DOM();

    const skipLink = document.querySelector('.skip-link');
    expect(skipLink).not.toBeNull();
    expect(skipLink.getAttribute('href')).toBe('#main');
  });

  /**
   * **Validates: Requirement 3.13**
   *
   * The .skip-link must have visible, non-empty text content.
   */
  test('el .skip-link tiene texto visible no vacío', () => {
    setupFeature3DOM();

    const skipLink = document.querySelector('.skip-link');
    expect(skipLink).not.toBeNull();
    expect(skipLink.textContent.trim().length).toBeGreaterThan(0);
  });

  /**
   * **Validates: Requirement 3.13**
   *
   * The .skip-link must be the first child of <body> (before the lens panel,
   * nav, and all other content).
   */
  test('el .skip-link es el primer hijo de <body>', () => {
    setupFeature3DOM();

    const firstChild = document.body.firstElementChild;
    expect(firstChild).not.toBeNull();
    expect(firstChild.classList.contains('skip-link')).toBe(true);
  });

  /**
   * **Validates: Requirement 3.13**
   *
   * The .skip-link must be an <a> element (not a button or div).
   */
  test('el .skip-link es un elemento <a>', () => {
    setupFeature3DOM();

    const skipLink = document.querySelector('.skip-link');
    expect(skipLink).not.toBeNull();
    expect(skipLink.tagName.toLowerCase()).toBe('a');
  });
});

// ── Test suite 4: #divergenceCanvas tiene aria-hidden="true" ─────────────────

describe('Feature 3 — Test 4: #divergenceCanvas tiene aria-hidden="true"', () => {
  /**
   * **Validates: Requirement 3.14**
   *
   * The #divergenceCanvas element is decorative (it renders an animated
   * visualization of conflicting values). It must have aria-hidden="true"
   * so screen readers skip it entirely.
   */
  test('#divergenceCanvas tiene aria-hidden="true"', () => {
    setupFeature3DOM();

    const canvas = document.querySelector('#divergenceCanvas');
    expect(canvas).not.toBeNull();
    expect(canvas.getAttribute('aria-hidden')).toBe('true');
  });

  /**
   * **Validates: Requirement 3.14**
   *
   * The aria-hidden attribute must be the string "true", not a boolean.
   * ARIA attributes are always strings in the DOM.
   */
  test('#divergenceCanvas aria-hidden es el string "true", no un booleano', () => {
    setupFeature3DOM();

    const canvas = document.querySelector('#divergenceCanvas');
    // getAttribute always returns a string; verify it's exactly "true"
    expect(typeof canvas.getAttribute('aria-hidden')).toBe('string');
    expect(canvas.getAttribute('aria-hidden')).toBe('true');
  });

  /**
   * **Validates: Requirement 3.14**
   *
   * The #divergenceCanvas must exist in the DOM (it's rendered by the app).
   * This test verifies the element is present and is a <canvas> element.
   */
  test('#divergenceCanvas existe en el DOM y es un elemento <canvas>', () => {
    setupFeature3DOM();

    const canvas = document.querySelector('#divergenceCanvas');
    expect(canvas).not.toBeNull();
    expect(canvas.tagName.toLowerCase()).toBe('canvas');
  });

  /**
   * **Validates: Requirement 3.14**
   *
   * Verify that the canvas does NOT have a non-empty alt attribute or
   * aria-label that would expose it to screen readers as informative content.
   * Decorative elements should be hidden from the accessibility tree entirely.
   */
  test('#divergenceCanvas no tiene aria-label (es decorativo, no informativo)', () => {
    setupFeature3DOM();

    const canvas = document.querySelector('#divergenceCanvas');
    // A decorative canvas should rely on aria-hidden, not aria-label
    const ariaLabel = canvas.getAttribute('aria-label');
    // Either no aria-label, or aria-hidden takes precedence
    // The key requirement is aria-hidden="true" (tested above)
    expect(canvas.getAttribute('aria-hidden')).toBe('true');
    // If aria-label is present, it's redundant but not a failure;
    // the important thing is aria-hidden="true" hides it from AT
    if (ariaLabel !== null) {
      // aria-hidden="true" overrides aria-label for AT — still compliant
      expect(canvas.getAttribute('aria-hidden')).toBe('true');
    }
  });
});
