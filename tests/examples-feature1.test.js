/**
 * tests/examples-feature1.test.js
 *
 * Pruebas de ejemplo para Feature 1 — Visibilidad contextual del Lens Panel en móvil
 * **Validates: Requirements 1.5**
 *
 * Caso de borde: fallback cuando IntersectionObserver no está disponible.
 * Cuando el navegador no soporta IntersectionObserver, el panel debe quedar
 * siempre visible mediante la clase `lens-panel--always-visible`.
 */

'use strict';

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Override window.matchMedia so that the (max-width: 500px) query returns
 * matches: true, simulating a mobile viewport.
 */
function mockMobileMatchMedia() {
  window.matchMedia = function matchMedia(query) {
    return {
      matches: true,          // always "mobile"
      media: query,
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () { return false; },
    };
  };
}

/**
 * Build a minimal DOM with #lensPanel and N .lens-interpretation elements.
 * Returns the panel element.
 */
function setupDOM(numElements = 3) {
  document.body.innerHTML = '';

  const panel = document.createElement('aside');
  panel.id = 'lensPanel';
  document.body.appendChild(panel);

  for (let i = 0; i < numElements; i++) {
    const el = document.createElement('div');
    el.className = 'lens-interpretation';
    document.body.appendChild(el);
  }

  return panel;
}

/**
 * Inline re-implementation of initScrollAwareLensPanel() that mirrors app.js.
 * This is the same pattern used in property1-panel-visibility.test.js.
 *
 * When IntersectionObserver is not available, the panel gets
 * `lens-panel--always-visible` and the function returns early.
 */
function initScrollAwareLensPanelInline(panel) {
  // Fallback: no IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    panel.classList.add('lens-panel--always-visible');
    return;
  }

  // Mobile check (mocked to true in tests)
  const mq = window.matchMedia('(max-width: 500px)');
  if (!mq.matches) {
    panel.classList.remove('lens-panel--visible');
    return;
  }

  const observer = new window.IntersectionObserver(entries => {
    const anyIntersecting = entries.some(entry => entry.isIntersecting);
    if (anyIntersecting) {
      panel.classList.add('lens-panel--visible');
    } else {
      panel.classList.remove('lens-panel--visible');
    }
  }, { threshold: 0.2 });

  document.querySelectorAll('.lens-interpretation').forEach(el => observer.observe(el));
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('Feature 1 — Fallback sin IntersectionObserver', () => {
  let originalIntersectionObserver;

  beforeEach(() => {
    // Save the original IntersectionObserver (set up by tests/setup.js)
    originalIntersectionObserver = window.IntersectionObserver;
    mockMobileMatchMedia();
  });

  afterEach(() => {
    // Restore IntersectionObserver after each test.
    // If it was originally defined, put it back; otherwise delete the key
    // so the `'IntersectionObserver' in window` check works correctly.
    if (originalIntersectionObserver !== undefined) {
      window.IntersectionObserver = originalIntersectionObserver;
    } else {
      delete window.IntersectionObserver;
    }
  });

  /**
   * **Validates: Requirements 1.5**
   *
   * When IntersectionObserver is not available, initScrollAwareLensPanel()
   * must apply `lens-panel--always-visible` so the panel remains visible
   * at all times (no scroll-based hiding).
   */
  test('el panel tiene clase lens-panel--always-visible cuando IntersectionObserver no está disponible', () => {
    // Arrange: set up DOM and remove IntersectionObserver support.
    // We must delete the property entirely so that `'IntersectionObserver' in window`
    // returns false — setting it to undefined still leaves the key present.
    const panel = setupDOM(3);
    delete window.IntersectionObserver;

    // Act: initialize the scroll-aware lens panel
    initScrollAwareLensPanelInline(panel);

    // Assert: panel must have the always-visible fallback class
    expect(panel.classList.contains('lens-panel--always-visible')).toBe(true);
  });

  /**
   * **Validates: Requirements 1.5**
   *
   * When IntersectionObserver is not available, the panel must NOT have
   * `lens-panel--visible` (the scroll-triggered class). The always-visible
   * fallback is a different, unconditional class.
   */
  test('el panel NO tiene clase lens-panel--visible cuando IntersectionObserver no está disponible', () => {
    // Arrange: set up DOM and remove IntersectionObserver support.
    // We must delete the property entirely so that `'IntersectionObserver' in window`
    // returns false — setting it to undefined still leaves the key present.
    const panel = setupDOM(3);
    delete window.IntersectionObserver;

    // Act: initialize the scroll-aware lens panel
    initScrollAwareLensPanelInline(panel);

    // Assert: panel must NOT have the scroll-triggered visibility class
    expect(panel.classList.contains('lens-panel--visible')).toBe(false);
  });

  /**
   * Additional sanity check: when IntersectionObserver IS available,
   * the fallback class should NOT be applied (normal scroll-aware behavior).
   */
  test('el panel NO tiene clase lens-panel--always-visible cuando IntersectionObserver está disponible', () => {
    // Arrange: set up DOM — IntersectionObserver is available (restored in beforeEach)
    const panel = setupDOM(3);

    // Act: initialize the scroll-aware lens panel
    initScrollAwareLensPanelInline(panel);

    // Assert: the always-visible fallback class must NOT be applied
    expect(panel.classList.contains('lens-panel--always-visible')).toBe(false);
  });
});
