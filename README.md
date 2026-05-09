# Anatomía de la Libertad

Una infografía interactiva sobre los marcos teóricos de la libertad política: Berlin, Sen, Hayek/Friedman. Diseñada como artefacto editorial navegable, no como resumen estático.

Link: https://willkwolf.github.io/isaiah-berlin-liberty-infographic/

---

## Motivación

La motivación central de esta infografía es desmitificar el concepto de libertad, especialmente cuando es reducido, apropiado o instrumentalizado por sectores políticos como si tuviera un único significado obvio.

Isaiah Berlin es útil precisamente porque interrumpe esa simplificación. Su trabajo ayuda a mostrar que la libertad no es un eslogan, no es una marca política y no es un único resultado de política pública. Es un campo de interpretación en disputa, ligado al poder, la igualdad, la capacidad, la coacción, las instituciones y el conflicto.

Este proyecto convierte esa tensión filosófica en un formato que puede explorarse sección por sección, lente por lente, con un interés particular en cómo estos debates resuenan en Colombia.

### Conexión con el Dataísmo

El proyecto también dialoga con la pregunta que el dataísmo plantea de fondo: si los datos son la nueva forma de autoridad epistémica, ¿qué ocurre cuando los mismos datos producen diagnósticos radicalmente distintos según el marco teórico que los lee? Esta infografía es una respuesta práctica a esa pregunta. Los índices de Colombia (IDH, IPM, Economic Freedom, Freedom in the World) no cambian. Lo que cambia es la interpretación — y esa diferencia no es un error de lectura, sino el núcleo del problema político.

El dataísmo tiende a asumir que más datos producen más claridad. Berlin diría que el problema no es la cantidad de datos sino la pluralidad irreducible de los valores que los organizan.

---

## Qué intenta hacer esta infografía

Esta infografía está construida para darle al usuario un artefacto práctico para navegar comprensiones en competencia sobre la libertad.

Está pensada para ayudar al lector a preguntarse:

- ¿Qué cambia cuando la libertad se entiende como no-interferencia, autodeterminación, capacidad o libertad económica?
- ¿De dónde viene realmente la coacción: del Estado, del mercado, de la sociedad, o de combinaciones de los tres?
- ¿Pueden armonizarse igualdad y libertad, o son con frecuencia intercambios trágicos?
- ¿Qué ocurre cuando los mismos indicadores empíricos se leen desde marcos teóricos distintos?
- ¿Cómo puede Berlin ayudarnos a resistir las simplificaciones ideológicas de la libertad?

---

## Arquitectura visual

La infografía está organizada como una secuencia de scrollytelling con un lente teórico fijo que reinterpreta secciones clave en tiempo real.

Su arquitectura visual tiene cuatro capas principales:

- **Columna narrativa:** diez secciones que van desde el problema del desacuerdo hasta Berlin, el conflicto, el poder, los límites, la economía, Sen, Colombia, el pluralismo y el cierre.
- **Sistema de lentes:** el usuario puede alternar entre libertad negativa, libertad positiva, capacidades y una lectura económico-libertaria.
- **Diagramas interactivos:** sliders, toggles, gráficos, diagramas de nodos y controles de capacidades convierten distinciones abstractas en contrastes legibles.
- **Cierre editorial:** la sección final y el footer ubican la pieza dentro de un proyecto de divulgación más amplio, invitan a una lectura más profunda y conectan el artefacto con su infraestructura de fuentes.

---

## Exploración de fuentes

Para trabajo de fuentes más profundo y rastros de investigación, usa el cuaderno de NotebookLM:

- Cuaderno de fuentes: https://notebooklm.google.com/notebook/5ce143e6-2b6f-41e3-a96d-eb58c6fbb2a1

Este repositorio es el artefacto público. El cuaderno es el lugar para continuar explorando notas, referencias y material de apoyo detrás de la infografía.

---

## Más contexto

Más trabajo de divulgación sobre Isaiah Berlin, anclado en preguntas y debates colombianos, está disponible en el podcast de Spotify de William Camilo Artunduaga Viana:

- Podcast en Spotify: https://open.spotify.com/show/4hRC6rIFVIozooGV6OdWOI?si=e500cb9f38684cc2

---

## Internacionalización (i18n)

El sitio soporta español e inglés de forma nativa. El sistema de i18n está implementado en `i18n.js` como un objeto `window.I18N_CONTENT` que carga el locale `en` sobre el contenido estático en español del HTML.

El cambio de idioma es en tiempo real: no recarga la página. Cada sección, etiqueta ARIA, texto de interpretación de lente y copia de la interfaz tiene su traducción al inglés registrada en `i18n.js`.

Para añadir un nuevo idioma:
1. Añadir el código de idioma al array `supportedLanguages` en `i18n.js`.
2. Crear un objeto `locales.<código>` con la misma estructura que `locales.en`.
3. Registrar las entradas de `staticContent`, `lenses`, `conflictNotes`, `canvasValues`, `powerNodes`, `market`, `sen`, `colombia` y `systemNarratives`.

El idioma preferido se persiste en `localStorage` bajo la clave `site-language`.

---

## Licencia

Este proyecto presenta la infografía bajo un enfoque Creative Commons BY-NC-SA 4.0 para circulación educativa, citación y adaptación con atribución, uso no comercial y términos de compartir-igual.

---
---

# Anatomy of Liberty

An interactive infographic about the theoretical frameworks of political liberty: Berlin, Sen, Hayek/Friedman. Designed as a navigable editorial artifact rather than a static summary.

---

## Motivation

The main motivation behind this infographic is to demystify the concept of liberty, especially when it is reduced, appropriated, or weaponized by political sectors as if it had only one obvious meaning.

Isaiah Berlin is useful precisely because he interrupts that simplification. His work helps show that liberty is not a slogan, not a branding device, and not a single policy outcome. It is a contested field of interpretation tied to power, equality, capacity, coercion, institutions, and conflict.

This project turns that philosophical tension into a format that can be explored section by section, lens by lens, with a particular interest in how these debates resonate in Colombia.

### Connection to Dataism

The project also speaks to a question that dataism raises at its core: if data is the new form of epistemic authority, what happens when the same data produces radically different diagnoses depending on the theoretical framework reading it? This infographic is a practical answer to that question. Colombia's indices (HDI, MPI, Economic Freedom, Freedom in the World) do not change. What changes is the interpretation — and that difference is not a reading error. It is the heart of the political problem.

Dataism tends to assume that more data produces more clarity. Berlin would say the problem is not the quantity of data but the irreducible plurality of the values that organize it.

---

## What This Infographic Tries To Do

This infographic is built to give the user a practical artifact for navigating competing understandings of liberty.

It is meant to help the reader ask:

- What changes when liberty is understood as non-interference, self-mastery, capability, or economic freedom?
- Where does coercion really come from: the state, the market, society, or combinations of all three?
- Can equality and liberty be harmonized, or are they often tragic trade-offs?
- What happens when the same empirical indicators are read through different theoretical frameworks?
- How can Berlin help us resist ideological oversimplifications of freedom?

---

## Visual Architecture

The infographic is organized as a scrollytelling sequence with a fixed theoretical lens that reinterprets key sections in real time.

Its visual architecture has four main layers:

- **Narrative spine:** ten sections move from the problem of disagreement to Berlin, conflict, power, limits, economy, Sen, Colombia, pluralism, and closure.
- **Lens system:** the user can switch between negative liberty, positive liberty, capabilities, and an economic-libertarian reading.
- **Interactive diagrams:** sliders, toggles, charts, node diagrams, and capability controls turn abstract distinctions into readable contrasts.
- **Editorial closure:** the final section and footer locate the piece within a broader divulgation project, invite deeper reading, and connect the artifact to its source infrastructure.

---

## Source Exploration

For deeper source work and research trails, use the NotebookLM notebook:

- Source notebook: https://notebooklm.google.com/notebook/5ce143e6-2b6f-41e3-a96d-eb58c6fbb2a1

This repository is the public-facing artifact. The notebook is the place to continue exploring notes, references, and supporting material behind the infographic.

---

## More Context

More divulgation work on Isaiah Berlin, grounded in Colombian questions and debates, is available in William Camilo Artunduaga Viana's Spotify podcast:

- Spotify podcast: https://open.spotify.com/show/4hRC6rIFVIozooGV6OdWOI?si=e500cb9f38684cc2

---

## Internationalization (i18n)

The site natively supports Spanish and English. The i18n system is implemented in `i18n.js` as a `window.I18N_CONTENT` object that loads the `en` locale on top of the Spanish static HTML content.

Language switching is real-time — no page reload. Every section, ARIA label, lens interpretation text, and UI copy has its English translation registered in `i18n.js`.

To add a new language:
1. Add the language code to the `supportedLanguages` array in `i18n.js`.
2. Create a `locales.<code>` object with the same structure as `locales.en`.
3. Register entries for `staticContent`, `lenses`, `conflictNotes`, `canvasValues`, `powerNodes`, `market`, `sen`, `colombia`, and `systemNarratives`.

The preferred language is persisted in `localStorage` under the key `site-language`.

---

## License

This project currently presents the infographic under a Creative Commons BY-NC-SA 4.0 approach for educational circulation, citation, and adaptation with attribution, non-commercial use, and share-alike terms.
