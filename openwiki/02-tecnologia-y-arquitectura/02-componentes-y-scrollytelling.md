# Dominio II: Tecnología y Arquitectura — Componentes DOM y Motor de Scrollytelling

## 1. Visión General de la Interfaz

La interfaz de usuario de **Anatomía de la Libertad** está concebida como un **ensayo hipertextual y scrollytelling** donde la narración filosófica guía al lector a través de once secciones numeradas (I a XI). A medida que el usuario se desplaza verticalmente, el sistema detecta la posición de lectura y reconfigura los componentes interactivos.

```mermaid
flowchart TD
    subgraph UIComponents["Ecosistema de Componentes DOM"]
        TN["1. Top Navigation (.top-nav)<br/>Barra superior colapsable con anclas romanas I a XI"]
        SC["2. Skip Link (.skip-link)<br/>Acceso directo al contenido para lectores de pantalla"]
        ST["3. Motor de Scrollytelling (IntersectionObserver)<br/>Acumulador de intersecciones activas"]
        LP["4. Selector de Lentes Teóricas<br/>Desktop: Panel lateral / Móvil: Ruleta horizontal"]
        SE["5. Secciones I a XI (.section)<br/>Bloques narrativos y laboratorios interactivos"]
        GE["6. Explorador de Genealogía (Sección X)<br/>Matriz de 4 categorías, 23 tradiciones y modal accesible"]
    end
```

---

## 2. Barra de Navegación Superior (`.top-nav`)

* **Markup Canónico:** `<nav class="top-nav" aria-label="Secciones" id="topNav">`
* **Controles y Enlaces:**
  * Enlaces numerados en numeración romana (`I` a `XI`), cada uno con atributo `title` descriptivo del tema de la sección.
  * Selector bilingüe de idioma en el Hero (`.hero-language-switch`: `ES` / `EN`).
  * Conmutador de tema de color (`#colorModeBtn`: icono sol/luna).
* **Comportamiento Inteligente al Desplazamiento (`Scroll Collapse`):**
  * Para maximizar el área de lectura en pantallas pequeñas, la barra superior detecta la dirección del desplazamiento:
    * **Desplazamiento descendente:** Añade la clase `.top-nav--collapsed` (`transform: translateY(-100%)`), ocultando la barra suavemente.
    * **Desplazamiento ascendente:** Retira la clase `.top-nav--collapsed`, desplegando de inmediato la barra para facilitar el salto entre secciones.

---

## 3. El Motor de Scrollytelling y el Acumulador de Intersección

El motor de scrollytelling se implementa mediante la API nativa `IntersectionObserver` en `app.js`.

### 3.1. Corrección del Defecto Histórico de Lote
En versiones preliminares del sistema, el observador utilizaba una comprobación simple del tipo `entries.some(e => e.isIntersecting)`. Esto causaba un defecto visual crítico: cuando el navegador despachaba múltiples entradas en un mismo ciclo de animación (por ejemplo, al desplazarse rápido entre dos secciones), una entrada saliente con `isIntersecting: false` podía sobreescribir la entrada entrante con `isIntersecting: true`, haciendo que el panel de lentes desapareciera intempestivamente.

### 3.2. Arquitectura de Conjunto Activo (`Active Intersection Set`)
El código actual resuelve este problema mediante un acumulador determinista en memoria:

```javascript
// app.js — Arquitectura del acumulador
const activeIntersectingSections = new Set();

const scrollytellingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.id;
    if (entry.isIntersecting) {
      activeIntersectingSections.add(sectionId);
    } else {
      activeIntersectingSections.delete(sectionId);
    }
  });

  // El panel permanece visible y activo si al menos una sección relevante intersecta
  const shouldBeVisible = activeIntersectingSections.size > 0;
  updateLensVisibility(shouldBeVisible);
}, {
  root: null,
  threshold: 0.2 // Umbral del 20% de visibilidad del contenedor
});
```

---

## 4. Selector de Lentes: Panel Lateral vs. Ruleta Horizontal

El componente de cambio de marco teórico cuenta con dos implementaciones acopladas al estado global `state.currentLens`:

### 4.1. Versión de Escritorio (> 768 px): `Lens_Panel`
* **Elemento DOM:** `<aside class="lens-panel" id="lensPanel" role="navigation" aria-label="Selector de marco teórico">`
* **Comportamiento:**
  * Barra lateral fija a la derecha (ancho: `220px`), alineada con la grilla del contenido principal.
  * Botón colapsable con accesibilidad ARIA (`#lensToggleBtn` con `aria-expanded="true"` y `aria-controls="lensPanelBody"`).
  * Cuatro botones con roles de radio (`role="radio"` dentro de `role="radiogroup"`).
  * Indicadores visuales de color:
    * `negativa`: `#4a9eff` (Azul)
    * `positiva`: `#ff7a35` (Naranja)
    * `capacidades`: `#3dbe8a` (Verde esmeralda)
    * `libertario`: `#b0b0aa` (Gris platino)

### 4.2. Versión Móvil (≤ 768 px / ≤ 500 px): `Horizontal Lens Wheel`
* **Elemento DOM:** `<div class="lens-wheel-container" id="lensWheelContainer">`
* **Innovaciones Ergonómicas:**
  * **Difusión en Bordes (Edge Diffusion):** Emplea máscaras CSS de gradiente lineal (`mask-image: linear-gradient(...)`) a izquierda y derecha, indicando visualmente que hay más opciones disponibles al deslizar.
  * **Enfoque Cero-Tap (Zero-Tap Focus):** Al desplazarse por el carrusel táctil, el elemento central se selecciona automáticamente con debouncing sin requerir que el usuario pulse la pantalla de forma repetitiva.
  * **Ancho Expandido a 260 px:** Garantiza que los nombres de los autores y conceptos («Libertad Negativa», «Amartya Sen», etc.) no sufran truncamientos antiestéticos en pantallas de 320 px o 375 px.
  * **Ajuste a Zonas Seguras:** Incorpora `padding-bottom: max(0.75rem, env(safe-area-inset-bottom))` para evitar colisiones con las barras de navegación por gestos de iOS y Android.

---

## 5. Sección X: Genealogía del Poder (`.genealogia-explorer`)

La Sección X (`#genealogia`, «Genealogía del poder: cómo organizamos la libertad») estructura la investigación institucional mediante una **matriz tipológica de cuatro categorías** articuladas en `.genealogia-categories-grid`:

1. **Categoría 1: Monistas Hegemónicos (`monismo_hegemonico`):** Dominio institucional consolidado y soberanía unificada (imperio tributario, teocracia, monarquía absolutista, califato, confucianismo, nacionalismo autoritario).
2. **Categoría 2: Pluralistas Hegemónicos (`pluralismo_hegemonico`):** Institucionalización de contrapesos y división de poderes (republicanismo cívico, liberalismo clásico, democracia constitucional, federalismo, ciudad-estado, tradiciones feudales).
3. **Categoría 3: Monistas Emergentes (`monismo_emergente`):** Corrientes contestatarias y vanguardias radicales (fascismo, marxismo-leninismo, teocracia insurgente, conservadurismo autoritario, nacionalismo étnico).
4. **Categoría 4: Pluralistas Emergentes (`pluralismo_emergente`):** Autonomías comunitarias y bienes comunes (anarquismo, feminismo interseccional, ecologismo radical/commons, multiculturalismo, movimientos indígenas/derecho propio, comunalismo).

### 5.1. Diálogo Modal Accesible (`#genealogiaModal`)
Al hacer clic en cualquier tradición o categoría, el sistema abre un diálogo modal con:
* **Control de Foco y Teclado:** Trampa de foco (`focus trap`), navegación secuencial entre categorías con flechas (`←`, `→`), cierre con tecla `Escape` o botón dedicado, y restauración del foco al elemento activador.
* **Vistas por Pestañas:**
  * **Pestaña 1 (`#modalViewOverview`):** Fundamentos, mecanismos coercitivos, relatos de legitimación, beneficiarios, perjudicados y trade-offs.
  * **Pestaña 2 (`#modalViewTraditions`):** Catálogo de tradiciones históricas asociadas con fichas individuales y referencias bibliográficas canónicas.
* **Blindaje Responsive:** Scroll vertical independiente con `overscroll-behavior: contain` y cero desbordamiento horizontal en resoluciones móviles.
