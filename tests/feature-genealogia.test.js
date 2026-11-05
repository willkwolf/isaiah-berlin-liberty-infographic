/**
 * tests/feature-genealogia.test.js
 *
 * Automated regression test suite for Feature:
 * Section X «Genealogía del poder: cómo organizamos la libertad»
 *
 * Validates:
 *   1. Semantic section insertion and placement between #comparacion and #cierre.
 *   2. Top-nav contract (X: #genealogia, XI: #cierre).
 *   3. Four independent navigable visual components (no rigid 2D Cartesian matrix required).
 *   4. Zero emojis contract across Section X, category cards, modal dialog, and datasets.
 *   5. Centered accessible modal dialog with tabbed views (WCAG 2.1 AA).
 *   6. Tab 1: Conceptual definition, mechanisms, neutral value trade-offs, lens reading, epistemic caveat.
 *   7. Tab 2: All 23 historical traditions normalized with full fields and academic references.
 *   8. Interactive exploration: sample pills, explore button, card click, focus restoration.
 *   9. Keyboard navigation (prev/next category cycling, Escape dismiss, arrow shortcuts).
 *  10. Navigation state safety: modal opening/closing never mutates window.location.hash.
 *  11. Bilingual parity and zero emojis in English/Spanish datasets.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const {
  CATEGORY_IDS,
  CATEGORY_TAGS,
  EXPECTED_TRADITIONS_COUNT,
  EMOJI_REGEX
} = require('./fixtures/genealogia-fixtures');

describe('Feature: Genealogía del Poder (Section X - 4 Category Components & Tabbed Modal)', () => {
  let html;
  let appCode;
  let i18nCode;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../files/index.html');
    const appPath = path.resolve(__dirname, '../files/app.js');
    const i18nPath = path.resolve(__dirname, '../files/i18n.js');

    html = fs.readFileSync(htmlPath, 'utf8');
    appCode = fs.readFileSync(appPath, 'utf8');
    i18nCode = fs.readFileSync(i18nPath, 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  test('Section X exists in DOM with proper semantic attributes and placement', () => {
    const genealogiaSection = document.getElementById('genealogia');
    expect(genealogiaSection).not.toBeNull();
    expect(genealogiaSection.tagName).toBe('SECTION');
    expect(genealogiaSection.getAttribute('data-lens-context')).toBe('genealogia');

    const sections = Array.from(document.querySelectorAll('section.section'));
    const sectionIds = sections.map(s => s.id);
    const idxComparacion = sectionIds.indexOf('comparacion');
    const idxGenealogia = sectionIds.indexOf('genealogia');
    const idxCierre = sectionIds.indexOf('cierre');

    expect(idxComparacion).toBeGreaterThanOrEqual(0);
    expect(idxGenealogia).toBe(idxComparacion + 1);
    expect(idxCierre).toBe(idxGenealogia + 1);
  });

  test('Top navigation contains links for X (Genealogía) and XI (Cierre)', () => {
    const navLinks = Array.from(document.querySelectorAll('.top-nav__link'));
    const linkGenealogia = navLinks.find(a => a.getAttribute('href') === '#genealogia');
    const linkCierre = navLinks.find(a => a.getAttribute('href') === '#cierre');

    expect(linkGenealogia).toBeDefined();
    expect(linkGenealogia.textContent.trim()).toBe('X');

    expect(linkCierre).toBeDefined();
    expect(linkCierre.textContent.trim()).toBe('XI');
  });

  test('Section X header, 4 independent category components, and closing exist in DOM', () => {
    expect(document.getElementById('genealogia-title')).not.toBeNull();
    expect(document.getElementById('genealogia-subtitle')).not.toBeNull();
    expect(document.getElementById('genealogiaLensText')).not.toBeNull();
    expect(document.getElementById('genealogiaLeadText')).not.toBeNull();

    // Explorer container and header
    const explorer = document.getElementById('genealogiaExplorer');
    expect(explorer).not.toBeNull();
    expect(explorer.getAttribute('role')).toBe('region');
    expect(document.getElementById('explorerTitle')).not.toBeNull();
    expect(document.getElementById('explorerDesc')).not.toBeNull();
    expect(document.getElementById('explorerCaveat')).not.toBeNull();
    expect(document.getElementById('explorerCaveatText')).not.toBeNull();

    // 4 Independent Category Cards
    expect(document.getElementById('catCardMonismoHegemonico')).not.toBeNull();
    expect(document.getElementById('catCardPluralismoHegemonico')).not.toBeNull();
    expect(document.getElementById('catCardMonismoEmergente')).not.toBeNull();
    expect(document.getElementById('catCardPluralismoEmergente')).not.toBeNull();

    // Guided interaction tooltips on all 4 cards
    expect(document.querySelectorAll('.category-card__chips-guide')).toHaveLength(4);

    // Repetitive explore buttons successfully eliminated
    expect(document.querySelector('.category-explore-btn')).toBeNull();
    expect(document.getElementById('btnExploreMonismoHegemonico')).toBeNull();

    // Closing section
    expect(document.getElementById('genealogiaClosingTitle')).not.toBeNull();
    expect(document.getElementById('genealogiaClosingText')).not.toBeNull();
    expect(document.getElementById('genealogiaClosingQuote')).not.toBeNull();
  });

  test('ZERO EMOJIS contract: Section X DOM and modal contain zero emojis', () => {
    const genealogiaSection = document.getElementById('genealogia');
    const modalBackdrop = document.getElementById('genealogiaModalBackdrop');

    expect(genealogiaSection).not.toBeNull();
    expect(modalBackdrop).not.toBeNull();

    expect(EMOJI_REGEX.test(genealogiaSection.textContent)).toBe(false);
    expect(EMOJI_REGEX.test(modalBackdrop.textContent)).toBe(false);
  });

  test('Modal dialog complies with accessibility standards (WCAG 2.1 AA)', () => {
    const backdrop = document.getElementById('genealogiaModalBackdrop');
    const modal = document.getElementById('genealogiaModal');

    expect(backdrop).not.toBeNull();
    expect(modal).not.toBeNull();

    expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    expect(modal.getAttribute('role')).toBe('dialog');
    expect(modal.getAttribute('aria-modal')).toBe('true');
    expect(modal.getAttribute('aria-labelledby')).toBe('modalCategoryTitle');
    expect(modal.getAttribute('aria-describedby')).toBe('modalCategoryContext');
    expect(modal.getAttribute('tabindex')).toBe('-1');

    // Header, Tabs, Panels, and Footer controls
    expect(document.getElementById('modalCategoryTitle')).not.toBeNull();
    expect(document.getElementById('modalCategoryContext')).not.toBeNull();
    expect(document.getElementById('modalCategoryBadge')).not.toBeNull();
    expect(document.getElementById('modalTraditionsCount')).not.toBeNull();
    expect(document.getElementById('modalPrevBtn')).not.toBeNull();
    expect(document.getElementById('modalNextBtn')).not.toBeNull();
    expect(document.getElementById('modalCloseBtn')).not.toBeNull();
    expect(document.getElementById('modalTabBtnOverview')).not.toBeNull();
    expect(document.getElementById('modalTabBtnTraditions')).not.toBeNull();
    expect(document.getElementById('modalViewOverview')).not.toBeNull();
    expect(document.getElementById('modalViewTraditions')).not.toBeNull();
    expect(document.getElementById('modalCloseActionBtn')).not.toBeNull();
  });

  test('app.js defines GENEALOGIA_CATEGORIES (4 entries) and GENEALOGIA_ARCHITECTURES (23 entries)', () => {
    const sandbox = {
      window: { localStorage: { getItem: () => null, setItem: () => {} } },
      document,
      localStorage: { getItem: () => null, setItem: () => {} },
      navigator: { language: 'es' }
    };

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      appCode + '\nreturn { GENEALOGIA_CATEGORIES, GENEALOGIA_ARCHITECTURES, GENEALOGIA_QUADRANTS, state };'
    );

    const exports = runner(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.navigator);

    expect(exports.GENEALOGIA_CATEGORIES).toBeDefined();
    expect(exports.GENEALOGIA_CATEGORIES).toHaveLength(4);

    exports.GENEALOGIA_CATEGORIES.forEach((cat, idx) => {
      expect(cat.id).toBe(CATEGORY_IDS[idx]);
      expect(cat.tag).toBe(CATEGORY_TAGS[idx]);
      expect(cat.badge).toBeDefined();
      expect(cat.title).toBeDefined();
      expect(cat.subtitle).toBeDefined();
      expect(cat.summary).toBeDefined();
      expect(cat.powerMechanism).toBeDefined();
      expect(cat.coercionForm).toBeDefined();
      expect(cat.tradeoffs).toBeDefined();
      expect(cat.caveat).toBeDefined();
      expect(Array.isArray(cat.traditions)).toBe(true);

      const allCatText = Object.values(cat).filter(v => typeof v === 'string').join(' ');
      expect(EMOJI_REGEX.test(allCatText)).toBe(false);
    });

    expect(exports.GENEALOGIA_ARCHITECTURES).toBeDefined();
    expect(exports.GENEALOGIA_ARCHITECTURES).toHaveLength(EXPECTED_TRADITIONS_COUNT);

    exports.GENEALOGIA_ARCHITECTURES.forEach(arch => {
      expect(arch.id).toBeDefined();
      expect(arch.name).toBeDefined();
      expect(arch.period).toBeDefined();
      expect(arch.context).toBeDefined();
      expect(arch.authority).toBeDefined();
      expect(arch.mechanism).toBeDefined();
      expect(arch.justification).toBeDefined();
      expect(arch.gainers).toBeDefined();
      expect(arch.costBearers).toBeDefined();
      expect(arch.counterweights).toBeDefined();
      expect(arch.lensReading).toBeDefined();
      expect(arch.reference).toBeDefined();

      const combinedText = Object.values(arch).join(' ');
      expect(EMOJI_REGEX.test(combinedText)).toBe(false);
    });
  });

  test('app.js initializes explorer and opens tabbed modal with sample pills and buttons', () => {
    const sandbox = {
      window: { localStorage: { getItem: () => null, setItem: () => {} } },
      document,
      localStorage: { getItem: () => null, setItem: () => {} },
      navigator: { language: 'es' }
    };

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      appCode + '\nreturn { renderGenealogia, renderGenealogiaExplorer, openGenealogiaCategoryModal, closeGenealogiaCategoryModal, switchGenealogiaModalTab, state };'
    );

    const exports = runner(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.navigator);
    exports.renderGenealogiaExplorer();

    // Verify sample pills rendered in each card
    const samplesQ1 = document.querySelectorAll('#samplesMonismoHegemonico .sample-tradition-pill');
    const samplesQ2 = document.querySelectorAll('#samplesPluralismoHegemonico .sample-tradition-pill');
    const samplesQ3 = document.querySelectorAll('#samplesMonismoEmergente .sample-tradition-pill');
    const samplesQ4 = document.querySelectorAll('#samplesPluralismoEmergente .sample-tradition-pill');

    expect(samplesQ1.length).toBeGreaterThanOrEqual(3);
    expect(samplesQ2.length).toBeGreaterThanOrEqual(3);
    expect(samplesQ3.length).toBeGreaterThanOrEqual(3);
    expect(samplesQ4.length).toBeGreaterThanOrEqual(3);

    // Initial modal state
    const backdrop = document.getElementById('genealogiaModalBackdrop');
    expect(backdrop.classList.contains('is-open')).toBe(false);

    // Open via category card 1
    const catCard1 = document.getElementById('catCardMonismoHegemonico');
    catCard1.click();

    expect(backdrop.classList.contains('is-open')).toBe(true);
    expect(backdrop.getAttribute('aria-hidden')).toBe('false');
    expect(document.body.classList.contains('modal-open')).toBe(true);
    expect(exports.state.activeGenealogiaCategory).toBe('monismo_hegemonico');
    expect(exports.state.activeGenealogiaModalTab).toBe('overview');

    // Overview tab should be active
    const tabOverview = document.getElementById('modalTabBtnOverview');
    const tabTraditions = document.getElementById('modalTabBtnTraditions');
    expect(tabOverview.classList.contains('is-active')).toBe(true);
    expect(tabTraditions.classList.contains('is-active')).toBe(false);

    const viewOverview = document.getElementById('modalViewOverview');
    expect(viewOverview.hasAttribute('hidden')).toBe(false);

    // Switch to traditions tab
    exports.switchGenealogiaModalTab('traditions');
    expect(tabOverview.classList.contains('is-active')).toBe(false);
    expect(tabTraditions.classList.contains('is-active')).toBe(true);
    expect(viewOverview.hasAttribute('hidden')).toBe(true);

    const viewTraditions = document.getElementById('modalViewTraditions');
    expect(viewTraditions.hasAttribute('hidden')).toBe(false);
    expect(viewTraditions.querySelectorAll('.tradition-detail-card').length).toBeGreaterThanOrEqual(5);

    // Close modal
    exports.closeGenealogiaCategoryModal();
    expect(backdrop.classList.contains('is-open')).toBe(false);
    expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    expect(document.body.classList.contains('modal-open')).toBe(false);
  });

  test('Modal navigation cycles through categories and Escape closes modal', () => {
    const sandbox = {
      window: { localStorage: { getItem: () => null, setItem: () => {} } },
      document,
      localStorage: { getItem: () => null, setItem: () => {} },
      navigator: { language: 'es' }
    };

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      appCode + '\nreturn { initGenealogia, openGenealogiaCategoryModal, closeGenealogiaCategoryModal, state };'
    );

    const exports = runner(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.navigator);
    exports.initGenealogia();

    exports.openGenealogiaCategoryModal('monismo_hegemonico');
    expect(exports.state.activeGenealogiaCategory).toBe('monismo_hegemonico');

    // Click Next button -> moves to pluralismo_hegemonico
    const nextBtn = document.getElementById('modalNextBtn');
    nextBtn.click();
    expect(exports.state.activeGenealogiaCategory).toBe('pluralismo_hegemonico');

    // Click Next button -> moves to monismo_emergente
    nextBtn.click();
    expect(exports.state.activeGenealogiaCategory).toBe('monismo_emergente');

    // Click Next button -> moves to pluralismo_emergente
    nextBtn.click();
    expect(exports.state.activeGenealogiaCategory).toBe('pluralismo_emergente');

    // Click Next button -> cycles back to monismo_hegemonico
    nextBtn.click();
    expect(exports.state.activeGenealogiaCategory).toBe('monismo_hegemonico');

    // Click Prev button -> moves back to pluralismo_emergente
    const prevBtn = document.getElementById('modalPrevBtn');
    prevBtn.click();
    expect(exports.state.activeGenealogiaCategory).toBe('pluralismo_emergente');

    // Escape closes modal
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escEvent);

    const backdrop = document.getElementById('genealogiaModalBackdrop');
    expect(backdrop.classList.contains('is-open')).toBe(false);
  });

  test('Modal opening and closing never modifies window.location.hash', () => {
    const initialHash = window.location.hash;

    const sandbox = {
      window: { location: { hash: initialHash }, localStorage: { getItem: () => null, setItem: () => {} } },
      document,
      localStorage: { getItem: () => null, setItem: () => {} },
      navigator: { language: 'es' }
    };

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      appCode + '\nreturn { openGenealogiaCategoryModal, closeGenealogiaCategoryModal };'
    );

    const exports = runner(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.navigator);

    exports.openGenealogiaCategoryModal('pluralismo_hegemonico');
    expect(sandbox.window.location.hash).toBe(initialHash);

    exports.closeGenealogiaCategoryModal();
    expect(sandbox.window.location.hash).toBe(initialHash);
  });

  test('Focus is restored to the initiating element when modal closes', () => {
    const sandbox = {
      window: { localStorage: { getItem: () => null, setItem: () => {} } },
      document,
      localStorage: { getItem: () => null, setItem: () => {} },
      navigator: { language: 'es' }
    };

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      appCode + '\nreturn { renderGenealogiaExplorer, openGenealogiaCategoryModal, closeGenealogiaCategoryModal, state };'
    );

    const exports = runner(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.navigator);
    exports.renderGenealogiaExplorer();

    const triggerPill = document.querySelector('#samplesPluralismoHegemonico .sample-tradition-pill');
    triggerPill.focus();
    const focusSpy = jest.spyOn(triggerPill, 'focus');

    exports.openGenealogiaCategoryModal('pluralismo_hegemonico', triggerPill.dataset.tradition);
    expect(exports.state.lastFocusedElement).toBe(triggerPill);

    exports.closeGenealogiaCategoryModal();
    expect(focusSpy).toHaveBeenCalled();
  });

  test('Bilingual parity: English i18n contains 4 categories, 23 architectures, and zero emojis', () => {
    const sandbox = {
      window: {
        I18N_CONTENT: { locales: { en: {} } },
        localStorage: { getItem: () => null, setItem: () => {} }
      }
    };

    const runner = new Function('window', i18nCode + '\nreturn window.I18N_CONTENT.locales.en;');
    const en = runner(sandbox.window);

    expect(en.genealogia).toBeDefined();
    expect(en.genealogia.categories).toBeDefined();
    expect(en.genealogia.categories).toHaveLength(4);

    en.genealogia.categories.forEach((cat, idx) => {
      expect(cat.id).toBe(CATEGORY_IDS[idx]);
      expect(cat.tag).toBe(CATEGORY_TAGS[idx]);
      expect(cat.badge).toBeDefined();
      expect(cat.title).toBeDefined();
      expect(cat.subtitle).toBeDefined();
      expect(cat.summary).toBeDefined();
      expect(cat.powerMechanism).toBeDefined();
      expect(cat.coercionForm).toBeDefined();
      expect(cat.tradeoffs).toBeDefined();
      expect(cat.caveat).toBeDefined();

      const combinedText = Object.values(cat).join(' ');
      expect(EMOJI_REGEX.test(combinedText)).toBe(false);
    });

    expect(en.genealogia.architectures).toHaveLength(EXPECTED_TRADITIONS_COUNT);
    en.genealogia.architectures.forEach(arch => {
      expect(arch.id).toBeDefined();
      expect(arch.name).toBeDefined();
      expect(arch.period).toBeDefined();
      expect(arch.authority).toBeDefined();
      expect(arch.mechanism).toBeDefined();
      expect(arch.tradeoffs || arch.gainers).toBeDefined();

      const combinedText = Object.values(arch).join(' ');
      expect(EMOJI_REGEX.test(combinedText)).toBe(false);
    });
  });

  test('Plain-Text Editorial Modal Architecture: Tab 2 renders clean tradition dossier cards without button clutter', () => {
    const sandbox = {
      window: { localStorage: { getItem: () => null, setItem: () => {} } },
      document,
      localStorage: { getItem: () => null, setItem: () => {} },
      navigator: { language: 'es' }
    };

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      appCode + '\nreturn { openGenealogiaCategoryModal, closeGenealogiaCategoryModal, switchGenealogiaModalTab, state };'
    );

    const exports = runner(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.navigator);
    exports.openGenealogiaCategoryModal('monismo_hegemonico', 'imperio_tributario', 'traditions');

    const viewTraditions = document.getElementById('modalViewTraditions');
    expect(viewTraditions).not.toBeNull();

    // 1. Verify absence of button toolbar clutter
    const quickNav = viewTraditions.querySelector('.tradition-quick-nav');
    expect(quickNav).toBeNull();

    // 2. Dossier card rendered exclusively in isolated mode
    const cards = Array.from(viewTraditions.querySelectorAll('.tradition-detail-card'));
    expect(cards.length).toBe(1);
    expect(document.getElementById('genealogiaModal').classList.contains('is-isolated-chip')).toBe(true);

    // 3. Highlighted card
    const targetCard = document.getElementById('traditionCard-imperio_tributario');
    expect(targetCard).not.toBeNull();
    expect(targetCard.classList.contains('is-highlighted')).toBe(true);

    // 4. Plain-text editorial structure
    const counter = targetCard.querySelector('.tradition-editorial-counter');
    expect(counter).not.toBeNull();
    expect(counter.textContent).toContain('1 /');

    const title = targetCard.querySelector('.tradition-editorial-title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Imperio tributario');

    const period = targetCard.querySelector('.tradition-editorial-period');
    expect(period).not.toBeNull();
    expect(period.textContent.length).toBeGreaterThan(5);

    const context = targetCard.querySelector('.tradition-editorial-context');
    expect(context).not.toBeNull();
    expect(context.textContent.length).toBeGreaterThan(10);

    // 5. Editorial characteristic fields with typographic glyphs
    const fields = targetCard.querySelectorAll('.tradition-editorial-field');
    expect(fields.length).toBeGreaterThanOrEqual(6);

    const fieldLabels = Array.from(targetCard.querySelectorAll('.field-label')).map(el => el.textContent);
    expect(fieldLabels).toContain('Forma de autoridad');
    expect(fieldLabels).toContain('Mecanismo de restricción');
    expect(fieldLabels).toContain('Justificación alegada');
    expect(fieldLabels).toContain('Quién gana capacidad de decisión');
    expect(fieldLabels).toContain('Quién soporta los costes');
    expect(fieldLabels).toContain('Contrapesos y límites institucionales');

    // 6. Academic references present
    const refBody = targetCard.querySelector('.field-body--ref');
    expect(refBody).not.toBeNull();
    expect(refBody.textContent).toContain('Tilly');

    exports.closeGenealogiaCategoryModal();
  });

  test('Focus Trap: Keyboard Tab and Shift+Tab wrap within open modal', () => {
    const sandbox = {
      window: { localStorage: { getItem: () => null, setItem: () => {} } },
      document,
      localStorage: { getItem: () => null, setItem: () => {} },
      navigator: { language: 'es' }
    };

    const runner = new Function(
      'window', 'document', 'localStorage', 'navigator',
      appCode + '\nreturn { initGenealogia, openGenealogiaCategoryModal, closeGenealogiaCategoryModal };'
    );

    const exports = runner(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.navigator);
    exports.initGenealogia();
    exports.openGenealogiaCategoryModal('monismo_hegemonico');

    const modal = document.getElementById('genealogiaModal');
    const focusableSelectors = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => !el.hasAttribute('hidden') && el.closest('[hidden]') === null && el.style.display !== 'none');
    expect(focusables.length).toBeGreaterThanOrEqual(4);

    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    // Focus last element and press Tab -> should wrap to first
    lastEl.focus();
    expect(document.activeElement).toBe(lastEl);

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(tabEvent);
    expect(document.activeElement).toBe(firstEl);

    // Focus first element and press Shift+Tab -> should wrap to last
    firstEl.focus();
    expect(document.activeElement).toBe(firstEl);

    const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    document.dispatchEvent(shiftTabEvent);
    expect(document.activeElement).toBe(lastEl);

    exports.closeGenealogiaCategoryModal();
  });
});
