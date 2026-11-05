# Product & Feature Backlog — Anatomía de la Libertad
**Framework:** Agile Business Analysis (BABOK® / Scrum Alliance standard)  
**Project:** *Anatomía de la Libertad — Isaiah Berlin Infografía Educativa*  
**Architecture Baseline:** Zero-Build, Vanilla ES6+, CSS3 Modern Variables, Semantic SVG, WCAG 2.1 AA Compliant.  
**Version:** 1.1.0  
**Status:** Active Backlog  

---

## 1. Visión y Criterios de Priorización

Este backlog documenta iniciativas y requerimientos avanzados identificados durante la auditoría epistemológica y pedagógica de pares (*Peer Review Audit*). Cada iniciativa está estructurada como una **User Story** con criterios de aceptación en formato **Gherkin (Given-When-Then)**, estimación en **Story Points (Fibonacci)** y clasificación de prioridad **MoSCoW**.

### Matriz de Priorización
| Epic ID | Nombre del Epic | Prioridad MoSCoW | Valor Pedagógico | Story Points |
| :--- | :--- | :--- | :--- | :--- |
| **EPIC-01** | Nodo de Coerción Algorítmica y Tecnocapitalismo | Should Have | Alto (Frontera contemporánea) | 8 SP |
| **EPIC-02** | Evaluación Metacognitiva Interactiva (Bloom) | Could Have | Muy Alto (Retención y evaluación formativa) | 13 SP |
| **EPIC-03** | Línea de Tiempo Dinámica con Filtro por Siglos | Could Have | Medio-Alto (Exploración genealógica) | 5 SP |
| **EPIC-04** | PWA Offline & Exportación para Archivo Duradero (30 Años) | Should Have | Crítico (Resistencia a obsolescencia) | 5 SP |

---

## EPIC-01: Nodo de Coerción Algorítmica y Asimetría Tecnocapitalista (Sección IV — Poder)

### Justificación de Negocio / Pedagógica
En el siglo XXI, la coacción sobre el individuo ya no se limita al monopolio de la fuerza estatal, la jerarquía corporativa o el precio de mercado. Los sistemas algorítmicos automatizados de recomendación, filtrado crediticio, perfilamiento conductual y vigilancia de plataformas constituyen una forma de coerción estructural no contemplada en la clásica taxonomía de Berlin. Integrar este 5.º nodo complementa la tríada Estado-Mercado-Empresa sin violar la premisa berliniana de agencia intencional.

### User Story US-POW-01: Quinto Nodo Algorítmico Interactivo
**Como** estudiante o investigador de ciencias políticas y sociología digital,  
**Quiero** visualizar un nodo interactivo de *«Algoritmos / Plataformas Digitales»* dentro del grafo de poder de la Sección IV,  
**Para** comprender cómo las arquitecturas de vigilancia digital, el diseño conductual persuasivo y la filtración predictiva condicionan la no-interferencia y la autonomía del individuo.

#### Criterios de Aceptación (Gherkin)
```gherkin
Scenario: Renderizado responsivo del 5.º nodo en el grafo SVG
  Given que el usuario navega a la Sección IV ("Poder y obediencia")
  When el grafo SVG `#powerDiagram` se inicializa en cualquier resolución (desde 320px hasta 1920px)
  Then debe mostrarse un nodo con etiqueta "Plataformas" y subtítulo "algoritmo / perfil"
  And debe mantener proporciones legibles (font-size >= 10.5px, sin desbordamiento de círculo)
  And las aristas dirigidas hacia "Individuo", "Estado" y "Mercado" deben usar marcadores de flecha ajustados sin solaparse.

Scenario: Interacción y cambio de lente sobre el nodo Plataformas
  Given que el nodo "Plataformas" está visible
  When el usuario hace clic o navega con teclado (Enter / Espacio) sobre dicho nodo
  Then el panel descriptivo `#powerDetail` debe desplegar la justificación teórica (Shoshana Zuboff, Nick Srnicek)
  And al cambiar el lente teórico (Negativo, Positivo, Sen, Libertario), el texto interpretativo debe recalibrar el diagnóstico de coacción algorítmica.

Scenario: Soporte bilingüe y accesibilidad WCAG 2.1 AA
  Given que el usuario alterna el idioma a inglés ('en')
  When se renderiza el nodo algorítmico
  Then la etiqueta visual debe traducir a "Platforms" y "algorithm / profile"
  And el atributo `aria-label` debe ser "Digital Platforms: Algorithmic coercion and behavioral profiling".
```

---

## EPIC-02: Evaluación Metacognitiva Interactiva Basada en Taxonomía de Bloom (Sección XI — Cierre)

### Justificación de Negocio / Pedagógica
Actualmente, el sitio web ofrece una experiencia expositiva e interactiva (lentes, simuladores, mapas conceptuales). Para garantizar transferencia de aprendizaje de orden superior (análisis, evaluación y creación según Bloom), se requiere un módulo de autoevaluación formativa de dilemas ético-políticos que devuelva retroalimentación razonada según el lente seleccionado.

### User Story US-BLOOM-01: Simulador de Dilemas Políticos Trágicos
**Como** docente o autodidacta de teoría política,  
**Quiero** resolver casos hipotéticos interactivos (ej. vacunación obligatoria, regulación de precios de alimentos, anonimato digital),  
**Para** contrastar mis propias intuiciones contra los diagnósticos formales de Berlin, Hayek y Sen sin caer en trampas monistas.

#### Criterios de Aceptación (Gherkin)
```gherkin
Scenario: Presentación de dilema formativo
  Given que el usuario finaliza la navegación por las secciones I a X
  When accede al módulo `#bloomAssessment` en la Sección XI
  Then se presenta un caso práctico trágico con 4 opciones de resolución
  And cada opción representa la aplicación rigurosa de uno de los 4 marcos teóricos.

Scenario: Retroalimentación formativa inmediata sin calificación punitiva
  Given que el usuario selecciona una resolución
  When presiona "Analizar resolución"
  Then el sistema NO debe mostrar un veredicto de "correcto/incorrecto"
  And debe desglosar qué valor se maximiza (ej. bienestar colectivo) y qué valor se sacrifica trágicamente (ej. no-interferencia individual)
  And debe citar el principio berliniano correspondiente (inconmensurabilidad de valores).
```

---

## EPIC-03: Línea de Tiempo y Filtro Histórico por Épocas (Sección X — Genealogía)

### Justificación de Negocio / Pedagógica
La sección de Genealogía de Poder contiene una matriz analítica de 4 cuadrantes y 6 casos de estudio. Para audiencias escolares o universitarias, un selector cronológico por épocas (Antigüedad, Medioevo, Modernidad Temprana, Ilustración, Siglo XX, Era Digital) facilitaría la comprensión del carácter no teleológico de la historia.

### User Story US-GEN-01: Filtro Cronológico y Animación Temporal
**Como** historiador o estudiante,  
**Quiero** filtrar los casos de la matriz genealógica por época histórica y deslizar una línea de tiempo horizontal,  
**Para** aislar cómo las tensiones entre órdenes monistas y coexistencias pluralistas han mutado a lo largo de los siglos.

#### Criterios de Aceptación (Gherkin)
```gherkin
Scenario: Filtrado por época
  Given que el usuario visualiza la matriz `#genealogiaMatrixGrid`
  When activa el filtro "Siglo XX (Totalitarismos vs. Estados de Bienestar)"
  Then las tarjetas ajenas a esa era se atenúan visualmente (`opacity: 0.25`)
  And las tarjetas pertinentes se destacan con foco accesible `aria-current="true"`
  And el contador accesible anuncia "Mostrando 2 de 6 configuraciones históricas".
```

---

## EPIC-04: Resistencia a la Obsolescencia y Archivo Offline a 30 Años (PWA & Static Export)

### Justificación de Negocio / Pedagógica
Siguiendo el criterio de durabilidad temporal a 30 años establecido en el *Peer Review Audit*, el recurso no debe depender de servidores externos, CDNs que puedan expirar o conexiones a internet continuas. Debe ser un artefacto web autosuficiente, archivable en bibliotecas digitales y ejecutable desde cualquier soporte local.

### User Story US-PWA-01: Empaquetado como Progressive Web App Offline-First
**Como** curador de conocimiento o bibliotecario digital,  
**Quiero** que el sitio web funcione íntegramente sin conexión a internet y pueda guardarse como PWA,  
**Para** garantizar su preservación como artefacto pedagógico inmutable en repositorios patrimoniales.

#### Criterios de Aceptación (Gherkin)
```gherkin
Scenario: Instalación offline mediante Service Worker local
  Given que el usuario accede al sitio por primera vez con conexión
  When se registra el `service-worker.js` local (sin dependencias npm externas)
  Then todos los assets (HTML, CSS, JS, fuentes tipográficas incrustadas WOFF2) se almacenan en Cache Storage
  And en subsiguientes cargas con `navigator.onLine === false`, el sitio opera al 100% sin degradación funcional.

Scenario: Exportación de documento autocontenido (Single-File Bundle)
  Given que un investigador desea archivar la infografía en Zenodo o un repositorio institucional
  When ejecuta el script de empaquetado `npm run bundle:offline`
  Then se genera un único archivo `dist/anatomia-de-la-libertad.single.html` con CSS, JS y SVGs inlined
  And no realiza ninguna petición de red externa (`0 requests`).
```

---

## Registro de Gestión Técnica & Restricciones
- **Zero-Build:** No introducir empaquetadores complejos (Webpack, Vite, Turbopack) como dependencia obligatoria para el funcionamiento en producción; el código base debe ejecutarse directamente desde GitHub Pages o un navegador local (`file://`).
- **Control de Exclusiones:** El repositorio mantiene limpio su árbol de trabajo exclusivamente mediante `.git/info/exclude`. Bajo ningún motivo se deben crear o rastrear archivos `.gitignore` ni directorios `.agents`.
- **Compatibilidad de Navegadores:** Mantener compatibilidad con ES6+ estándar, Safari iOS >= 14, Chromium >= 90, Firefox >= 90.
