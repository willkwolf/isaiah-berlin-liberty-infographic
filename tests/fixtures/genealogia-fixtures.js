/**
 * tests/fixtures/genealogia-fixtures.js
 *
 * Centralized test fixtures for Feature:
 * Section X «Genealogía del poder: cómo organizamos la libertad»
 *
 * Provides:
 *   - Category definitions (4 independent components)
 *   - Standard viewports for layout defense
 *   - Edge-case text payloads (tildes, special typographical glyphs, long strings)
 *   - Zero emojis validator
 */

'use strict';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080, name: 'Desktop Full HD' },
  laptop: { width: 1366, height: 768, name: 'Standard Laptop' },
  mobile: { width: 375, height: 667, name: 'Mobile iPhone SE' }
};

const CATEGORY_IDS = [
  'monismo_hegemonico',
  'pluralismo_hegemonico',
  'monismo_emergente',
  'pluralismo_emergente'
];

const CATEGORY_TAGS = ['1', '2', '3', '4'];

const EXPECTED_TRADITIONS_COUNT = 23;

const TYPOGRAPHICAL_GLYPHS = ['§', '¶', '◈', '▸', '↗', '⤸', '⌁', '→', '←'];

// Strict regex matching Unicode emojis
const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

const TEST_EDGE_PAYLOADS = {
  tildesAndAccents: 'Concepción genealógica: análisis de dominación, coacción, garantías institucionales y autonomía cívica.',
  specialGlyphs: '§ Autoridad · ¶ Justificación · ◈ Marco teórico · ▸ Mecanismo coactivo',
  longDescription: 'A lo largo de las transformaciones institucionales de la modernidad temprana y contemporánea, las configuraciones de poder han oscilado entre la pretensión de armonía unívoca y el reconocimiento de la inconmensurabilidad trágica de los valores humanos fundamentales sin jerarquía moral universal impuesta.'
};

module.exports = {
  VIEWPORTS,
  CATEGORY_IDS,
  CATEGORY_TAGS,
  EXPECTED_TRADITIONS_COUNT,
  TYPOGRAPHICAL_GLYPHS,
  EMOJI_REGEX,
  TEST_EDGE_PAYLOADS
};
