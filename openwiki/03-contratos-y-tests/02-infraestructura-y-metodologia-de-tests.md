# Dominio III: Contratos y Tests — Infraestructura y Metodología de Pruebas

## 1. Filosofía de Pruebas: Verificación de Caja Opaca Basada en Requisitos

El marco de aseguramiento de calidad de **Anatomía de la Libertad** sigue estrictamente el principio de **pruebas de caja opaca dirigidas por requisitos** (*opaque-box, requirement-driven verification*):

1. **Caja Opaca:** Las pruebas evalúan el sitio web como un sistema completo en ejecución dentro de navegadores reales (Chromium/Playwright) o simulados (JSDOM). Se audita la geometría visual observable, bounding boxes, scroll, accesibilidad ARIA y respuesta a eventos, sin apoyarse en variables internas privadas ni mocks invasivos.
2. **Cero Mutación en Producción:** Las herramientas de prueba residen exclusivamente en `tests/` y `package.json` en la raíz del repositorio, sin alterar el código de producción en `files/`.
3. **Pirámide de Verificación en 4 Niveles:** Toda funcionalidad está cubierta por un estrato específico de la pirámide de pruebas.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TIER 4: ESCENARIOS REALES E2E                        │
│   Recorrido narrativo completo a través de las 10 secciones (I a X)    │
│   + Blindaje de invarianza de escritorio (1366x768 y 1920x1080)        │
├────────────────────────────────────────────────────────────────────────┤
│                TIER 3: COMBINACIONES MULTI-FEATURE                     │
│   Interacción combinada: cambio de lente + modal + tema + idioma        │
├────────────────────────────────────────────────────────────────────────┤
│                 TIER 2: CASOS DE BORDE Y LÍMITES                       │
│   Viewports exactos (320px, 375px, 390px, 428px), recargas de página,  │
│   navegación por anclas (#), prevención estricta de scroll horizontal   │
├────────────────────────────────────────────────────────────────────────┤
│                   TIER 1: COBERTURA DE CARACTERÍSTICAS                 │
│   Pruebas unitarias de contratos DOM, accesibilidad axe-core,          │
│   pruebas de propiedades fast-check, targets táctiles >= 44x44px       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Herramientas y Frameworks de Auditoría

| Herramienta | Rol en el Proyecto | Archivos Clave |
| :--- | :--- | :--- |
| **Jest + JSDOM** | Ejecutor de pruebas unitarias y de integración rápida en memoria. | `package.json`, `tests/setup.js` |
| **axe-core / jest-axe** | Auditoría formal de accesibilidad WCAG 2.1 Niveles A y AA. | `tests/accessibility.test.js` |
| **fast-check** | Generación de pruebas basadas en propiedades (Property-Based Testing). | `tests/property*.test.js` |
| **Playwright** | Automatización E2E en Chromium con emulación de dispositivos y viewports reales. | `playwright.config.js`, `tests/playwright/*.spec.js` |
| **Vibium** | Defensa visual contra regresiones de layout y proporciones SVG. | `tests/vibium/*.js` |

---

## 3. Configuración del Entorno de Pruebas (`tests/setup.js`)

Dado que JSDOM carece de ciertas APIs modernas del navegador, `tests/setup.js` provee emulaciones ligeras:

```javascript
// Stubs estándar para JSDOM
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) { this.callback = callback; }
  observe() {}
  unobserve() {}
  disconnect() {}
};

window.matchMedia = window.matchMedia || function(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};

window.scrollTo = jest.fn();
```

---

## 4. Comandos de Ejecución

Todos los comandos se ejecutan desde la raíz del repositorio:

```bash
# 1. Ejecutar pruebas unitarias, de propiedades y de accesibilidad (Jest)
npm test

# 2. Ejecutar todas las suites de Playwright (E2E y visual)
npm run test:playwright

# 3. Ejecutar pruebas de defensa visual de layout (Vibium)
npm run test:vibium

# 4. Ejecutar pruebas de defensa visual de proporciones SVG
npm run test:vibium:svg

# 5. Ejecutar la matriz completa de pruebas del sistema
npm run test:all
```
