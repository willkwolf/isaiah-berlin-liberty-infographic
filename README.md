# Anatomía de la Libertad / Anatomy of Liberty

> **Una infografía interactiva, laboratorio analítico y ensayo hipertextual sobre los marcos teóricos de la libertad política y su tensión empírica en Colombia.**  
> *An interactive infographic, analytical lab, and hypertextual essay on the theoretical frameworks of political liberty and their empirical tension in Colombia.*

[![Sitio Web Publicado](https://img.shields.io/badge/Sitio_Web-En_Vivo-4a9eff?style=for-the-badge&logo=githubpages)](https://willkwolf.github.io/isaiah-berlin-liberty-infographic/)
[![Licencia: CC BY-NC-SA 4.0](https://img.shields.io/badge/Licencia-CC_BY--NC--SA_4.0-lightgrey?style=for-the-badge)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
[![Arquitectura Zero-Build](https://img.shields.io/badge/Arquitectura-Zero--Build_Vanilla-3dbe8a?style=for-the-badge)](./openwiki/02-tecnologia-y-arquitectura/01-arquitectura-zero-build.md)
[![Accesibilidad: WCAG 2.1 AA](https://img.shields.io/badge/Accesibilidad-WCAG_2.1_AA-ff7a35?style=for-the-badge)](./openwiki/02-tecnologia-y-arquitectura/03-sistema-diseno-y-responsividad.md)
[![Tests: 125/125 Passed](https://img.shields.io/badge/Tests-125%2F125_Passing-brightgreen?style=for-the-badge)](./openwiki/03-contratos-y-tests/02-infraestructura-y-metodologia-de-tests.md)
[![OpenWiki Doc](https://img.shields.io/badge/Documentación-OpenWiki-blueviolet?style=for-the-badge)](./openwiki/README.md)

---

## 🌐 Índice / Table of Contents

* 🇪🇸 **[Versión en Español](#-español)**
  * [1. ¿Qué es Anatomía de la Libertad?](#1-qué-es-anatomía-de-la-libertad)
  * [2. Los Cuatro Marcos Teóricos (Lentes de Interpretación)](#2-los-cuatro-marcos-teóricos-lentes-de-interpretación)
  * [3. El Dilema Empírico: Los Mismos Datos, Cuatro Juicios Morales](#3-el-dilema-empírico-los-mismos-datos-cuatro-juicios-morales)
  * [4. Experiencia Interactiva y Scrollytelling](#4-experiencia-interactiva-y-scrollytelling)
  * [5. Arquitectura Técnica Zero-Build](#5-arquitectura-técnica-zero-build)
  * [6. OpenWiki: Centro Documental y Gobernanza](#6-openwiki-centro-documental-y-gobernanza)
  * [7. Suites de Pruebas y Aseguramiento de Calidad](#7-suites-de-pruebas-y-aseguramiento-de-calidad)
  * [8. Cómo Citar y Ecosistema de Fuentes](#8-cómo-citar-y-ecosistema-de-fuentes)
* 🇬🇧 **[English Version](#-english)**
  * [1. What is Anatomy of Liberty?](#1-what-is-anatomy-of-liberty)
  * [2. The Four Theoretical Lenses](#2-the-four-theoretical-lenses)
  * [3. The Empirical Dilemma: Same Data, Four Moral Verdicts](#3-the-empirical-dilemma-same-data-four-moral-verdicts)
  * [4. Interactive Architecture & Scrollytelling](#4-interactive-architecture--scrollytelling)
  * [5. Zero-Build Technical Philosophy](#5-zero-build-technical-philosophy)
  * [6. OpenWiki: Living Knowledge Base & Governance](#6-openwiki-living-knowledge-base--governance)
  * [7. Test Infrastructure & Quality Assurance](#7-test-infrastructure--quality-assurance)
  * [8. How to Cite & Academic Ecosystem](#8-how-to-cite--academic-ecosystem)

---

# 🇪🇸 Español

## 1. ¿Qué es Anatomía de la Libertad?

En el debate político contemporáneo, la palabra **«libertad»** suele reducirse a una consigna propagandística o a un eslogan partidista simplificado. Quienes la invocan asumen con frecuencia que su significado es unívoco, transparente y evidente por sí mismo.

**Anatomía de la Libertad** interrumpe deliberadamente esa ilusión. Diseñada como un artefacto pedagógico computacional y ensayo visual interactivo, la plataforma guía al lector a través de las tensiones irreductibles que atraviesan la filosofía política occidental:

* ¿Es la libertad simplemente la ausencia de cadenas y leyes que me prohíban actuar (**libertad negativa**)?
* ¿O exige el autogobierno consciente, la madurez cívica y la capacidad real de moldear mi propio destino (**libertad positiva**)?
* ¿De qué sirve el permiso legal de comprar pan o viajar a quien carece de recursos materiales, educación y salud para hacerlo (**enfoque de capacidades**)?
* ¿Cómo se articula la libertad con el orden espontáneo del mercado, el derecho de propiedad y la limitación estricta del poder estatal (**lectura libertaria**)?

---

## 2. Los Cuatro Marcos Teóricos (Lentes de Interpretación)

La interfaz permite al usuario alternar en cualquier momento entre cuatro perspectivas filosóficas fundamentales:

```mermaid
flowchart LR
    subgraph Lentes["Marcos Teóricos de la Libertad"]
        direction TB
        L1["🔵 Libertad Negativa<br/>(Isaiah Berlin, 1958)"]
        L2["🟠 Libertad Positiva<br/>(Isaiah Berlin, 1958)"]
        L3["🟢 Enfoque de Capacidades<br/>(Amartya Sen, 1999)"]
        L4["⚪ Perspectiva Libertaria<br/>(Hayek, 1960 / Friedman, 1962)"]
    end

    L1 --- T1["¿Cuánto espacio tengo sin interferencia de otros?"]
    L2 --- T2["¿Quién me gobierna? ¿Soy amo de mi vida?"]
    L3 --- T3["¿Qué oportunidades sustantivas tengo para ser y hacer?"]
    L4 --- T4["¿Hay coacción sobre mi propiedad y mis contratos?"]
```

1. **Libertad Negativa (Isaiah Berlin):** La inmunidad frente a la interferencia deliberada de otros seres humanos o del Estado. Berlin enfatiza que la incapacidad física o la escasez natural no equivalen a coacción política. Su máxima virtud es blindar una frontera inviolable de autonomía individual.
2. **Libertad Positiva (Isaiah Berlin):** El anhelo de autodeterminación, soberanía democrática y autogobierno cívico. Berlin advierte aquí sobre la **pendiente resbaladiza del «yo superior»**: el riesgo histórico de que el Estado o un partido iluminado asuma encarnar la «verdadera razón» del ciudadano, justificando la tiranía bajo la fórmula rousseauniana de *«obligar al hombre a ser libre»*.
3. **Enfoque de Capacidades (Amartya Sen & Martha Nussbaum):** Supera la trampa de la libertad puramente formal. Evalúa no sólo si la ley prohíbe algo, sino si el individuo cuenta con los **factores de conversión** (educación, salud, infraestructura, ausencia de discriminación) que le permiten transformar bienes materiales en realizaciones efectivas.
4. **Perspectiva Libertaria y de Mercado (Friedrich Hayek & Milton Friedman):** Concibe el mercado y el sistema de precios libres como un **orden espontáneo (*catalaxia*)** que procesa el conocimiento disperso de millones de individuos. Defiende que la libertad económica es la base y el escudo protector insustituible de la libertad política.

### La Tesis Fundamental de Berlin: El Pluralismo de Valores
Frente al monismo moral (la creencia ilustrada de que todos los valores nobles pueden coexistir sin pérdidas en una sociedad perfecta), Berlin demuestra que **los valores humanos últimos (libertad, igualdad, justicia, seguridad) son objetivos, plurales e inconmensurables**. Toda decisión política implica ganancias y pérdidas trágicas reales: maximizar la igualdad redistributiva exige limitar ciertas libertades negativas; maximizar la no-interferencia puede erosionar las capacidades básicas de los más vulnerables.

---

## 3. El Dilema Empírico: Los Mismos Datos, Cuatro Juicios Morales

Para evitar que el análisis permanezca en la estratosfera teórica, la plataforma somete estos cuatro marcos a un examen riguroso con **datos empíricos oficiales de Colombia**:

| Dimensión Empírica (Colombia) | Lectura Negativa (Berlin) | Lectura Positiva (Berlin) | Lectura Capacidades (Sen) | Lectura Libertaria (Hayek/Friedman) |
| :--- | :--- | :--- | :--- | :--- |
| **Pobreza Multidimensional (IPM: ~12.1%)** | Mientras no provenga de leyes prohibitivas, es escasez material, no opresión política. | Privación grave de libertad: quien carece de agua y techo no es soberano de su vida. | Falla crítica de factores de conversión en regiones periféricas desatendidas. | Consecuencia predecible de trabas regulatorias y falta de titulación de tierras. |
| **Informalidad Laboral (>55%)** | Las personas tienen libertad legal para emprender o trabajar en la calle sin ser encarceladas. | La informalidad expulsa a millones de la ciudadanía plena y de la protección colectiva. | Amputación de la agencia al carecer de seguridad social protectora y ahorro formal. | Respuesta defensiva del mercado ante un salario mínimo y sobrecostos parafiscales asfixiantes. |
| **Índice de Desarrollo Humano (IDH: ~0.758)** | Indica estabilidad institucional básica que preserva la vida y los derechos negativos. | Insuficiente: profundas asimetrías territoriales impiden el autogobierno equitativo. | Avances en promedio, pero con graves fracturas en libertades instrumentales periféricas. | Demuestra que la iniciativa privada y la integración comercial expanden el bienestar. |

> **Lección Epistemológica Central:** Los números en pantalla no cambian; cambia la interpretación valorativa. Esa discrepancia no es un error de medición, sino el corazón irresoluble de la deliberación política democrática.

---

## 4. Experiencia Interactiva y Scrollytelling

La aplicación está diseñada para una inmersión cognitiva fluida tanto en computadores de escritorio como en teléfonos móviles:

* **Top Navigation Inteligente:** Barra superior con anclas en numeración romana (I a X) que se colapsa automáticamente al desplazarse hacia abajo para maximizar el área de lectura, y reaparece al subir.
* **Ruleta Horizontal de Lentes (Móvil):** En pantallas pequeñas, el selector se convierte en una ruleta táctil docked en la parte inferior con gradientes de difusión en los extremos, enfoque automático sin toques reiterados (*zero-tap focus*) y un ancho de $260\text{ px}$ que elimina truncamientos de texto.
* **Chip Lateral Permanente (Escritorio):** En pantallas $> 768\text{ px}$, el panel lateral derecho (`220 px`) ofrece acceso constante a las cuatro lentes y al botón colapsable.
* **Modo Claro / Oscuro Sincrónico:** Conmutación automática según la luz solar (07:00 a 20:00) o manual con persistencia en `localStorage`, respaldada por un script sincrónico en `<head>` que previene el destello blanco/oscuro (FOUC).
* **Internacionalización Instantánea:** Alternancia en caliente entre Español e Inglés sin recargar la página mediante el motor `files/i18n.js`.
* **Sección X (Genealogía del Poder):** Cuatro tarjetas elásticas interactivas con modales accesibles y trampa de foco (`focus trap`) para explorar las dimensiones coercitiva, de mercado, social y simbólica del poder.

---

## 5. Arquitectura Técnica Zero-Build

Frente a la fragilidad de los bundlers y dependencias que caducan, el proyecto adopta la filosofía **Zero-Build**:

* **Estándares Web Puros:** HTML5 semántico, CSS3 con custom properties y JavaScript ES6+ vanilla.
* **Sin Servidor en Producción:** Despliegue 100% estático en GitHub Pages administrado por GitHub Actions (`.github/workflows/deploy.yml`).
* **Rutas Relativas Universales:** Enlaces relativos estrictos que garantizan que el sitio funcione en cualquier subdominio o directorio local.
* **Rendimiento:** Tiempos de carga ultra-rápidos y puntajes de 100/100 en Google Lighthouse.

---

## 6. OpenWiki: Centro Documental y Gobernanza

El proyecto cuenta con un sistema documental estructurado bajo el directorio [`openwiki/`](./openwiki/README.md), organizado por dominios:

* 📚 **[Dominio I: Marco Teórico](./openwiki/01-marco-teorico/)**: Fundamentos de Berlin, Enfoque de Sen, Tesis Libertaria, Dilema Colombiano y Fuentes.
* 💻 **[Dominio II: Tecnología y Arquitectura](./openwiki/02-tecnologia-y-arquitectura/)**: Zero-build, componentes DOM, CSS responsive, motor de traducción i18n y gráficos SVG.
* 🛡️ **[Dominio III: Contratos, Tests y Agentes](./openwiki/03-contratos-y-tests/)**: Contratos de interfaz y DOM, metodología de tests, matriz de verificación de features (F1 a F15) y políticas del sistema.

### Visualizador Interactivo de Documentación
Para explorar la documentación como una wiki web completa con búsqueda y modo oscuro:
* Abra directamente en su navegador: [`openwiki/index.html`](./openwiki/index.html)
* O ejecute mediante CLI:
  ```bash
  npm run wiki:visualize
  ```

---

## 7. Suites de Pruebas y Aseguramiento de Calidad

El proyecto implementa una rigurosa metodología de pruebas de caja opaca en 4 niveles:

```bash
# Ejecutar pruebas unitarias, de accesibilidad (axe-core) y de propiedades (fast-check)
npm test

# Ejecutar auditoría E2E multi-viewport en Chromium (Playwright)
npm run test:playwright

# Ejecutar pruebas de defensa visual de layout (Vibium)
npm run test:vibium

# Ejecutar la matriz completa de pruebas (100% pass)
npm run test:all
```

---

## 8. Cómo Citar y Ecosistema de Fuentes

### Cuaderno de Fuentes y Contenido Sonoro
* **Cuaderno Semántico en NotebookLM:** [Notas de investigación y análisis documental](https://notebooklm.google.com/notebook/5ce143e6-2b6f-41e3-a96d-eb58c6fbb2a1)
* **Podcast en Spotify:** [Anatomía de la Libertad: Isaiah Berlin en Colombia](https://open.spotify.com/show/4hRC6rIFVIozooGV6OdWOI?si=e500cb9f38684cc2)

### Citación Académica (APA 7.ª edición)
> Artunduaga Viana, W. C. (2026). *Anatomía de la Libertad: Una infografía interactiva sobre marcos teóricos de la libertad política y su tensión empírica en Colombia* [Visualización web interactiva y ensayo hipertextual]. GitHub. https://willkwolf.github.io/isaiah-berlin-liberty-infographic/

### Formato BibTeX
```bibtex
@software{artunduaga2026libertad,
  author    = {Artunduaga Viana, William Camilo},
  title     = {Anatomía de la Libertad},
  year      = {2026},
  publisher = {GitHub},
  url       = {https://willkwolf.github.io/isaiah-berlin-liberty-infographic/},
  note      = {Ensayo hipertextual bilingüe sobre filosofía política y teoría de la libertad}
}
```

---

# 🇬🇧 English

## 1. What is Anatomy of Liberty?

In contemporary political discourse, the word **"freedom"** (or **"liberty"**) is routinely degraded into a partisan slogan or an oversimplified moral banner. Political factions invoke it while presupposing that its meaning is uniform, self-evident, and indisputable.

**Anatomy of Liberty** (*Anatomía de la Libertad*) deliberately dismantles that illusion. Engineered as an interactive computational pedagogical artefact and hypertextual essay, this platform guides readers through the profound and irreconcilable fault lines of Western political philosophy:

* Is liberty merely the absence of external chains, physical coercion, and prohibitive legislation (**negative liberty**)?
* Or does it demand conscious self-mastery, civic maturity, and the substantive power to author one's own destiny (**positive liberty**)?
* What is the practical value of legal permission to purchase bread or travel abroad if an individual lacks the physical health, literacy, or material resources to do so (**capabilities approach**)?
* How does individual freedom coordinate with spontaneous market orders, private property rights, and strict constitutional limits on state planning (**libertarian perspective**)?

---

## 2. The Four Theoretical Lenses

The application interface allows users to switch fluidly between four seminal philosophical lenses:

```mermaid
flowchart LR
    subgraph Lenses["Theoretical Lenses of Liberty"]
        direction TB
        L1["🔵 Negative Liberty<br/>(Isaiah Berlin, 1958)"]
        L2["🟠 Positive Liberty<br/>(Isaiah Berlin, 1958)"]
        L3["🟢 Capabilities Approach<br/>(Amartya Sen, 1999)"]
        L4["⚪ Libertarian View<br/>(Hayek, 1960 / Friedman, 1962)"]
    end

    L1 --- T1["How much area is left for me without interference?"]
    L2 --- T2["Who governs me? Am I master of my own life?"]
    L3 --- T3["What substantive opportunities do I actually have?"]
    L4 --- T4["Is there coercion over my property and contracts?"]
```

1. **Negative Liberty (Isaiah Berlin):** Non-interference by other human beings or by the state. Berlin rigorously argues that natural human frailty or physical incapacity is not political un-freedom unless intentionally caused by human arrangements. Its paramount objective is safeguarding an inviolable minimum sphere of private personal autonomy.
2. **Positive Liberty (Isaiah Berlin):** The aspiration towards collective self-determination, democratic autonomy, and personal self-realization. Here Berlin identifies the dangerous **slippery slope of the "higher self"**: the historic propensity of churches, ideological vanguards, or totalitarian states to claim to embody the citizen's "real rational will", justifying violent coercion under Rousseau's paradox of *"forcing men to be free"*.
3. **Capabilities Approach (Amartya Sen & Martha Nussbaum):** Resolves the limitation of purely formal negative freedom. It evaluates whether individuals possess the actual **conversion factors** (healthcare, quality schooling, public infrastructure, non-discrimination) needed to convert primary goods into substantive human functionings.
4. **Libertarian & Free-Market Perspective (Friedrich Hayek & Milton Friedman):** Conceives the free-price system and competitive markets as a decentralized **spontaneous order (*catallaxy*)** that aggregates tacit, local knowledge that no central planning board could ever compute. It asserts that economic freedom is both an end in itself and an indispensable institutional bulwark for civil and political liberty.

### Berlin's Core Insight: Value Pluralism
Rejecting Enlightenment moral monism (the belief that all true human virtues can be harmoniously maximized simultaneously without loss), Berlin demonstrates that **ultimate human values (liberty, equality, justice, fraternity, mercy) are objective, plural, and incommensurable**. Political life inevitably involves tragic trade-offs: maximizing economic redistribution unavoidably curtails certain negative liberties; maximizing unregulated contract freedom may diminish the substantive capabilities of vulnerable citizens.

---

## 3. The Empirical Dilemma: Same Data, Four Moral Verdicts

Rather than staying in abstract philosophical discourse, the project confronts these four lenses with **calibrated official empirical datasets from Colombia**:

| Empirical Dimension (Colombia) | Negative Lens (Berlin) | Positive Lens (Berlin) | Capabilities Lens (Sen) | Libertarian Lens (Hayek/Friedman) |
| :--- | :--- | :--- | :--- | :--- |
| **Multidimensional Poverty (MPI: ~12.1%)** | Unless caused by deliberate legal prohibitions, it represents material scarcity, not political coercion. | Severe deprivation of liberty: those without clean water or shelter cannot govern their own lives. | Direct failure of conversion factors and substantive freedoms in remote territorial departments. | Predictable outcome of bureaucratic barriers, state monopolies, and informal land titles. |
| **Labor Informality (>55%)** | Workers retain full legal freedom to trade or work in street markets without state incarceration. | Informality casts millions outside substantive democratic citizenship and social solidarity. | Cripples agency by depriving workers of formal credit, safety nets, and institutional dignity. | Natural market defense against an inflated statutory minimum wage and onerous payroll taxes. |
| **Human Development Index (HDI: ~0.758)** | Reflects legal stability enabling longer life expectancies without fatal human interference. | Insufficient: extreme territorial disparities (Chocó vs Bogotá) negate equal civic autonomy. | Positive baseline gains, but severely fractured across peripheral instrumental freedoms. | Proof that private enterprise, property rights, and trade integration elevate living standards. |

> **Key Epistemic Lesson:** The empirical figures on the screen remain mathematically identical. What changes is the normative, ethical interpretation. That divergence is not a measurement error; it is the permanent, irreconcilable reality of democratic politics.

---

## 4. Interactive Architecture & Scrollytelling

Engineered for seamless, high-performance cognitive exploration across mobile and desktop environments:

* **Smart Top Navigation:** Roman numeral anchors (I through X) with scroll-aware collapse on downward movement (maximizing screen real estate) and instant auto-expansion on upward scroll.
* **Horizontal Mobile Lens Wheel:** Bottom-docked horizontal drum carousel with edge diffusion gradients, zero-tap programmatic focus, inertia snap, and a $260\text{ px}$ expanded container ensuring zero text truncation on 320px/375px screens.
* **Permanent Desktop Side Chip:** Persistent $220\text{ px}$ side panel on viewports $> 768\text{ px}$ with ARIA-compliant collapse button and instant lens controls.
* **Synchronous Dark/Light Theme:** Daylight-aware auto-toggle (07:00 to 20:00) with manual override stored in `localStorage`, backed by a synchronous `<head>` script that eliminates Flash of Unstyled Content (FOUC).
* **Instant Bilinguality:** In-place bilingual toggling between Spanish and English without page reload, powered by the reactive DOM patcher in `files/i18n.js`.
* **Section X (Genealogy of Power):** Four modular elastic cards with accessible modal dialogs and keyboard focus traps to explore coercive, market, social, and symbolic power.

---

## 5. Zero-Build Technical Philosophy

Rejecting fragile toolchains and vulnerable dependencies, the project embraces **Zero-Build Web Standards**:

* **Native Platform Technologies:** Semantic HTML5, native CSS3 with custom properties, and vanilla modern ES6+ JavaScript.
* **No Server Processes:** 100% static client-side execution hosted on GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).
* **Strict Relative Links:** Fully portable relative resource references across scripts, styles, and anchors.
* **Longevity & Speed:** Zero vulnerability surface, instant First Contentful Paint, and 100/100 Lighthouse performance metrics.

---

## 6. OpenWiki: Living Knowledge Base & Governance

The project maintains an authoritative, source-grounded documentation wiki structured in [`openwiki/`](./openwiki/README.md) across three distinct domains:

* 📚 **[Domain I: Theoretical Framework](./openwiki/01-marco-teorico/)**: Berlin's Foundations, Sen's Capabilities, Libertarian Model, Colombian Empirical Dilemma, and Research Sources.
* 💻 **[Domain II: Technology & Architecture](./openwiki/02-tecnologia-y-arquitectura/)**: Zero-build design, DOM components, responsive CSS cascade, i18n translation engine, and SVG graphics.
* 🛡️ **[Domain III: Contracts, Testing & Agent Governance](./openwiki/03-contratos-y-tests/)**: Interface & DOM contracts, 4-tier testing hierarchy, feature verification catalog (F1-F15), and system guardrails.

### Interactive Web Documentation Viewer
To browse the documentation as an interactive documentation website with full-text search and dark mode:
* Open directly in any web browser: [`openwiki/index.html`](./openwiki/index.html)
* Or launch via the OpenWiki CLI:
  ```bash
  npm run wiki:visualize
  ```

---

## 7. Test Infrastructure & Quality Assurance

Quality assurance is governed by a requirement-driven, opaque-box 4-tier testing hierarchy:

```bash
# Run unit tests, WCAG 2.1 AA accessibility audit (axe-core), and property-based tests (fast-check)
npm test

# Run cross-viewport E2E mobile audit in real Chromium (Playwright)
npm run test:playwright

# Run layout visual defense tests (Vibium)
npm run test:vibium

# Run the complete test matrix (100% pass guarantee)
npm run test:all
```

---

## 8. How to Cite & Academic Ecosystem

### Research Notebook & Audio Podcast
* **NotebookLM Research Workspace:** [Research notebook & bibliographic cross-references](https://notebooklm.google.com/notebook/5ce143e6-2b6f-41e3-a96d-eb58c6fbb2a1)
* **Spotify Podcast Series:** [Anatomy of Liberty: Isaiah Berlin in Colombia](https://open.spotify.com/show/4hRC6rIFVIozooGV6OdWOI?si=e500cb9f38684cc2)

### Academic Citation (APA 7th Edition)
> Artunduaga Viana, W. C. (2026). *Anatomy of Liberty: An interactive infographic on theoretical frameworks of political liberty and their empirical tension in Colombia* [Interactive web visualization and hypertextual essay]. GitHub. https://willkwolf.github.io/isaiah-berlin-liberty-infographic/

### BibTeX Format
```bibtex
@software{artunduaga2026libertad,
  author    = {Artunduaga Viana, William Camilo},
  title     = {Anatomy of Liberty},
  year      = {2026},
  publisher = {GitHub},
  url       = {https://willkwolf.github.io/isaiah-berlin-liberty-infographic/},
  note      = {Bilingual interactive hypertext essay on political philosophy and liberty theory}
}
```

### License
Distributed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.
