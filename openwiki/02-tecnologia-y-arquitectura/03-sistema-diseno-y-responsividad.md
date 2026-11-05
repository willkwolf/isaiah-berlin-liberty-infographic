# Dominio II: Tecnología y Arquitectura — Sistema de Diseño, Temas y Responsividad

## 1. Tokens de Diseño y Variables CSS (`CSS Custom Properties`)

El sistema visual de **Anatomía de la Libertad** está gobernado por variables CSS nativas declaradas en `:root` dentro de `files/styles.css`. No se utilizan preprocesadores (ni Sass ni Less), permitiendo la reactividad en tiempo de ejecución:

```css
:root {
  /* Tipografía */
  --font-serif: 'Crimson Pro', Georgia, serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --font-mono: 'SF Mono', Monaco, Consolas, 'Liberation Mono', monospace;

  /* Colores de las Lentes Teóricas */
  --clr-lens-negativa: #4a9eff;
  --clr-lens-positiva: #ff7a35;
  --clr-lens-capacidades: #3dbe8a;
  --clr-lens-libertario: #b0b0aa;
  --clr-accent: var(--clr-lens-negativa);

  /* Superficies en Modo Oscuro (Por defecto) */
  --bg-primary: #0c0d10;
  --bg-secondary: #14161b;
  --bg-surface: #1c1f26;
  --text-primary: #f0ece0;
  --text-secondary: #9a9b9e;
  --border-subtle: #2b2f38;
  --lens-panel-width: 220px;
}
```

---

## 2. Sistema de Temas (Claro / Oscuro) y Prevención de Destellos (FOUC)

El sitio cuenta con soporte nativo para **Modo Claro** y **Modo Oscuro** con sincronización automática con la luz solar y preferencia del usuario.

### 2.1. Reglas de Transición de Tema
1. **Detección Automática por Horario:** Si el usuario no ha fijado una preferencia manual (`site-color-manual !== '1'`), el sistema aplica automáticamente Modo Claro entre las 07:00 y las 20:00 (hora local del usuario), y Modo Oscuro durante la noche.
2. **Preferencia Manual Persistente:** El botón `#themeToggleBtn` permite al usuario fijar su preferencia personal. Se persiste en `localStorage`:
   * `site-color-scheme`: `'light'` o `'dark'`.
   * `site-color-manual`: `'1'`.

### 2.2. El Script Anti-Flicker Sincrónico en el `<head>`
Para evitar el molesto destello visual (FOUC — *Flash of Unstyled Content*) que ocurre cuando un script asíncrono aplica el tema tras el render inicial del DOM, el `<head>` de `index.html` ejecuta una función auto-invocable sincrónica antes de que el navegador procese el `<body>`:

```html
<script>
  (function() {
    try {
      var manual = localStorage.getItem('site-color-manual');
      var scheme = localStorage.getItem('site-color-scheme');
      var now = new Date();
      var hour = now.getHours();
      var isDay = hour >= 7 && hour < 20;
      var isLight = (manual === '1' && scheme === 'light') || (!manual && isDay);
      if (isLight) {
        document.documentElement.classList.add('light-mode', 'pre-light');
      }
    } catch(e) {}
  })();
</script>
```

---

## 3. Arquitectura Responsive y Blindaje Multi-Viewport

La interfaz garantiza legibilidad y estabilidad geométrica en todos los dispositivos, desde teléfonos móviles compactos de 320 px hasta pantallas de escritorio Ultra HD.

### 3.1. Breakpoints Estandarizados
* **Escritorio Completo (> 1400 px / 1920×1080):** Contenedor central de lectura con ancho máximo de 900 px, espaciado generoso y panel de lentes visible de forma permanente.
* **Escritorio Estándar (861 px – 1400 px):** Reajuste elástico de márgenes laterales.
* **Tabletas y Dispositivos Medianos (501 px – 860 px):** Transición de panel lateral a barra flotante.
* **Móviles (≤ 500 px / ≤ 480 px):** Activación de la Ruleta Horizontal de Lentes (`Horizontal Lens Wheel`), apilamiento vertical de tarjetas y colapso de navegación.

### 3.2. Contrato de Cero Desbordamiento Horizontal (`Zero Horizontal Overflow`)
En dispositivos móviles, cualquier desbordamiento horizontal (`scrollWidth > clientWidth`) destruye la experiencia de scrollytelling al permitir desplazamientos diagonales involuntarios.
* **Regla Obligatoria:** En todos los viewports auditados (320px, 375px, 390px, 428px), el documento y cada una de las secciones (I a X) deben verificar estrictamente:
  $$\text{scrollWidth} \equiv \text{clientWidth}$$
* **Transformación de la Tabla de Colombia (Sección VIII):** La matriz analítica original de 697 px de ancho fue reconvertida mediante `@media (max-width: 768px)` en tarjetas verticales responsivas vinculadas a la lente activa, eliminando los 410 px de desbordamiento horizontal oculto.

### 3.3. Cumplimiento de WCAG 2.1 AA y Zonas Táctiles (Touch Targets)
* **Objetivos Táctiles Mínimos (WCAG 2.5.5):** Todos los elementos interactivos móviles (botones de lentes, selector de idioma, botón de cerrar de coach banners, conmutadores de tema y enlaces de navegación) poseen un área táctil mínima de **$44 \times 44 \text{ px}$**.
* **Zonas Seguras del Dispositivo (Safe Areas):** Se utilizan las funciones CSS `env(safe-area-inset-top)` y `env(safe-area-inset-bottom)` para evitar que los controles queden cubiertos por el *notch* de la cámara o la barra inferior de gestos.

---

## 4. Políticas de Diseño para Nuevos Componentes (Taxonomía, Tamaños y Contraste)

Toda nueva incorporación o extensión conceptual al DOM debe integrarse bajo las directrices del sistema de diseño para preservar la coherencia narrativa, el ritmo visual y la accesibilidad universal.

### 4.1. Taxonomía de Componentes y Reciclaje de Estilos
1. **Llamadas y Notas Doctrinales (`.philosophical-callout` / `.berlin-republican-callout`):**
   * **Propósito:** Perspectivas teóricas complementarias o de frontera (ej. Libertad Republicana de Skinner/Pettit).
   * **Estructura:** Superficie `var(--clr-surface)`, borde sutil `var(--clr-border)` con acento lateral `border-left: 3px solid var(--clr-accent)` y radio `var(--radius)`.
   * **Tipografía:** Título en `var(--font-serif)` ($\le 1.0 \text{ rem}$), etiqueta en `var(--font-mono)` ($\le 0.75 \text{ rem}$) y cuerpo en `var(--font-sans)` ($0.84 \text{ rem}$).
2. **Pies Epistemológicos de Diagramas (`.viz-model-disclaimer`):**
   * **Propósito:** Advertencias metodológicas bajo visualizaciones y curvas heurísticas (Secciones III y IX).
   * **Estructura:** Fondo transparente, línea superior divisoria discontinua `border-top: 1px dashed var(--clr-border)` y espaciado compacto.
   * **Tipografía:** Texto descriptivo en `var(--font-sans)` ($0.74 \text{ rem}$) en color `var(--clr-text-dim)` con etiqueta `em` en `var(--font-mono)` ($0.70 \text{ rem}$).
3. **Matrices y Tarjetas de Taxonomía Conceptual (`.sen-conversion-box` / `.sen-conv-card`):**
   * **Propósito:** Desgloses categoriales estructurados (ej. Factores de conversión personales, ambientales y sociales de Amartya Sen).
   * **Estructura:** Contenedor contenedor en `var(--clr-surface)` con grilla de 3 columnas en escritorio y colapso elástico a 1 columna en pantallas $\le 768 \text{ px}$. Tarjetas hijas en `var(--clr-bg-2)` con borde superior de color acento representativo (`border-top: 2px solid var(--clr-cap)`).

### 4.2. Escala Proporcional y Reglas Anti-Patrones
* **Base Tipográfica:** Dado que `html { font-size: 21px; }`, el valor $1 \text{ rem} = 21 \text{ px}$. Por tanto, títulos internos de tarjetas no deben exceder $1.1 \text{ rem}$ ($23.1 \text{ px}$) para evitar jerarquías infladas o discordantes.
* **Prohibición de Colores Hexadecimales Fijos:** Está estrictamente prohibido utilizar colores oscuros o claros hardcodeados (como `rgba(30, 41, 59, ...)` o `#f8fafc`). Todos los fondos y tipografías deben derivar de los tokens del sistema (`--clr-surface`, `--clr-bg-2`, `--clr-text*`).
* **Blindaje de Contraste Bimodal (WCAG 2.1 AA):**
  * En **Modo Oscuro**, todos los textos deben superar $\ge 4.5:1$ de ratio contra `--clr-surface` y `--clr-bg-2`.
  * En **Modo Claro**, los acentos y etiquetas deben recalibrarse a tonos oscuros (ej. `#075985` para azul republicano y `#065f46` para verde de capacidades), garantizando ratios de contraste $\ge 5.4:1$.

---

## 5. Matriz de Verificación Automatizada Multi-Dispositivo

El conjunto de pruebas automatizadas garantiza que cada componente añadido pase por el mismo rigor de evaluación:

| Suite de Pruebas | Archivo de Especificación | Criterios Validados |
| :--- | :--- | :--- |
| **Diseño y Contraste Matemático** | `tests/new-components-design-and-contrast.test.js` | Ausencia de anti-patrones, jerarquía tipográfica $\le 1.1\text{ rem}$, fórmulas WCAG de luminancia relativa y contraste $\ge 4.5:1$ en modo claro y oscuro, sincronización i18n completa. |
| **Responsividad Multi-Dispositivo** | `tests/playwright/new-components-multidevice.spec.js` | Viewports de 320px a 1920px (Mobile XS, Standard, Modern, Tablet, HD, Full HD); verificación de cero scroll horizontal, transiciones de grilla de 1 a 3 columnas, y conmutación de tema sin saltos visuales. |
| **Accesibilidad Integral** | `tests/accessibility.test.js` | 0 violaciones críticas o serias con `axe-core` sobre el DOM renderizado bajo WCAG 2.1 AA. |
