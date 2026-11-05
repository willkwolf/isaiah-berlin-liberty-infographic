/**
 * tests/setup.js
 * DOM stubs for running property-based tests outside the browser.
 * jsdom (via testEnvironment: "jsdom") handles most DOM APIs automatically.
 * This file adds the missing globals that jsdom doesn't provide by default.
 */

'use strict';

// ── window.matchMedia stub ──────────────────────────────────────────────────
// jsdom does not implement matchMedia; provide a minimal mock that returns
// a MediaQueryList-like object with matches: false by default.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = function matchMedia(query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {},       // deprecated but still used
      removeListener: function () {},    // deprecated but still used
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () { return false; },
    };
  };
}

// ── IntersectionObserver stub ───────────────────────────────────────────────
// jsdom does not implement IntersectionObserver; provide a minimal mock that
// stores the callback and exposes a helper to trigger it manually in tests.
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class IntersectionObserverMock {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options || {};
      this.observedElements = [];
      // Register on window so tests can trigger callbacks
      if (!window._intersectionObservers) {
        window._intersectionObservers = [];
      }
      window._intersectionObservers.push(this);
    }

    observe(element) {
      this.observedElements.push(element);
    }

    unobserve(element) {
      this.observedElements = this.observedElements.filter(el => el !== element);
    }

    disconnect() {
      this.observedElements = [];
    }

    // Helper: trigger the callback with synthetic entries
    trigger(entries) {
      this.callback(entries, this);
    }
  }

  window.IntersectionObserver = IntersectionObserverMock;
}

// ── localStorage stub ───────────────────────────────────────────────────────
// jsdom provides localStorage, but reset it before each test to avoid
// cross-test contamination.
beforeEach(() => {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
  // Reset the IntersectionObserver registry between tests
  if (typeof window !== 'undefined') {
    window._intersectionObservers = [];
  }
});
