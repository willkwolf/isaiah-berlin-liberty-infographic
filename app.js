/**
 * ANATOMÍA DE LA LIBERTAD — app.js
 * SPA estática sobre marcos teóricos de la libertad política
 * Berlin, Sen, Hayek/Friedman — sin resolver la tensión.
 */

'use strict';

const I18N = window.I18N_CONTENT || { defaultLanguage: 'es', supportedLanguages: ['es'], locales: {} };

// ═══════════════════════════════════════════════
// DATA — Mock estructurado (no necesita API)
// ═══════════════════════════════════════════════

const LENS_DATA = {
  negativa: {
    name: 'Libertad Negativa',
    author: 'Berlin',
    color: '#4a9eff',
    bodyClass: 'lens-negativa',
    interpretations: {
      berlin:    'Desde este marco, la diferencia entre libertad negativa y positiva es la más políticamente urgente. La expansión del Estado para garantizar libertad positiva amenaza directamente el espacio de no-interferencia.',
      conflicto: 'El sacrificio de libertad negativa para lograr igualdad es real y costoso. Cada impuesto redistributivo es una restricción al individuo. El "equilibrio" es una ilusión temporal.',
      poder:     'El Estado es la fuente primaria de coacción legítima — pero toda coacción requiere justificación. El mercado y la sociedad también coartan, pero de manera más difusa y menos transparente.',
      limites:   'La distinción entre incapacidad y coacción es precisa: si no puedo pagar algo, no soy víctima de coacción estatal directa. Ampliar "coacción" a toda restricción material diluye el concepto hasta hacerlo inútil.',
      economia:  'Hayek y Friedman son los defensores más coherentes de este marco: la no-interferencia del Estado maximiza la libertad negativa. El mercado libre es la extensión institucional de este principio.',
      sen:       'Sen confunde incapacidad con falta de libertad. Su marco, aunque humanamente atractivo, puede justificar intervenciones estatales que destruyen más libertad (negativa) de la que crean.',
      colombia:  'Colombia tiene libertad formal razonablemente garantizada (Freedom in the World: 69/100), pero las restricciones más graves provienen del conflicto armado y del narcotráfico — agentes que coartan directamente. El IDH es un indicador irrelevante para medir libertad negativa.',
    }
  },
  positiva: {
    name: 'Libertad Positiva',
    author: 'Berlin',
    color: '#ff7a35',
    bodyClass: 'lens-positiva',
    interpretations: {
      berlin:    'La libertad negativa sin capacidad real es vacía. Un analfabeto es "libre" de leer la Constitución en sentido negativo — nadie lo impide. Pero esa libertad es una farsa si no puede ejercerla.',
      conflicto: 'Sacrificar algo de libertad negativa para construir capacidades reales puede ampliar la libertad positiva de millones. El conflicto existe, pero no es simétrico en consecuencias.',
      poder:     'El Estado no solo restringe: habilita. La educación pública, la salud y la infraestructura son condiciones de posibilidad de la autodeterminación real. El poder puede ser emancipador.',
      limites:   'La distinción física/coacción pierde algo importante: si un sistema institucional produce sistemáticamente incapacidad para grupos específicos, eso debe ser políticamente relevante, independientemente del agente intencional.',
      economia:  'El mercado libre sin correcciones reproduce y amplifica las desigualdades de punto de partida. La libertad positiva requiere instituciones que redistribuyan capacidades, no solo oportunidades formales.',
      sen:       'Sen es el sucesor intelectual más riguroso de la libertad positiva. Su enfoque de capacidades operacionaliza lo que la libertad positiva de Berlin dejaba abstracto.',
      colombia:  'El IDH de Colombia (0.754) revela que la libertad formal coexiste con privaciones reales masivas. El Coeficiente de Gini de 0.54 indica que la libertad positiva está distribuida profundamente de manera desigual. La Economic Freedom no captura esto.',
    }
  },
  capacidades: {
    name: 'Enfoque de Capacidades',
    author: 'Sen',
    color: '#3dbe8a',
    bodyClass: 'lens-capacidades',
    interpretations: {
      berlin:    'Sen reformula a Berlin: la pregunta no es solo «¿quién te impide?» sino «¿qué puedes realmente hacer y ser?». La distinción negativa/positiva es útil pero insuficiente — hay privaciones que ninguna categoría captura bien.',
      conflicto: 'El conflicto igualdad-libertad no es tan radical si lo reformulamos en términos de capacidades: igualar capacidades básicas no es sacrificar libertad, sino crearla. La pobreza extrema no es "equilibrio" — es privación de libertad.',
      poder:     'El poder se ejerce también a través de la privación de capacidades: sin educación, sin salud, sin movilidad, el individuo no puede ser agente real de su propia vida. El Estado tiene responsabilidad positiva.',
      limites:   'La distinción física/coerción importa menos que la pregunta: ¿puede esta persona funcionar plenamente? Si un sistema institucional produce sistemáticamente incapacidad, el debate sobre "quién tiene la culpa" es secundario.',
      economia:  'El mercado puede ser eficiente sin ser justo en términos de capacidades. El PIB per cápita puede crecer mientras las capacidades básicas de millones se erosionan. La eficiencia de Hayek no es suficiente.',
      sen:       'Este es el marco propio. La libertad real no es ausencia de cadenas: es capacidad de funcionar. La salud, la educación, la participación política, la integridad corporal son capacidades básicas sin las cuales la libertad es nominal.',
      colombia:  'El IPM de Colombia (≈ 18.6%) revela privaciones multidimensionales que el Freedom Index ignora completamente. La capacidad real varía dramáticamente entre Bogotá y la Amazonia, entre estratos 1 y 6. El mismo país, mundos distintos.',
    }
  },
  libertario: {
    name: 'Económico-Libertario',
    author: 'Hayek / Friedman',
    color: '#b0b0aa',
    bodyClass: 'lens-libertario',
    interpretations: {
      berlin:    'Berlin, aunque liberal, no fue libertario. Desde este marco, la distinción negativa/positiva resuelve la cuestión: solo la libertad negativa es políticamente legítima. La positiva es paternalismo con buenas intenciones.',
      conflicto: 'El supuesto conflicto igualdad-libertad tiene una solución obvia: maximizar la libertad (negativa) y dejar que el mercado genere crecimiento que eventualmente beneficia a todos — la teoría del derrame.',
      poder:     'El Estado debe limitarse al monopolio de la violencia legítima para proteger contratos y propiedad. Toda expansión más allá es tiranía potencial. El mercado no ejerce coacción — ofrece opciones.',
      limites:   'La distinción física/coacción es exactamente correcta. El Estado no debe intervenir en incapacidades naturales o resultados de mercado. La pobreza no es coacción — es ausencia de recursos que el mercado puede generar.',
      economia:  'Este es el marco propio. La Economic Freedom of the World de Colombia (65.6/100, puesto 94) indica espacio para reducir regulación, gasto público y barreras al comercio. La libertad económica es condición de la prosperidad.',
      sen:       'El enfoque de capacidades de Sen justifica intervenciones estatales masivas con evidencia empírica siempre disputable. El riesgo: construir aparatos burocráticos que generan dependencia en lugar de autonomía real.',
      colombia:  'El principal problema de Colombia, desde este marco, es la debilidad institucional que impide hacer cumplir contratos y proteger derechos de propiedad, no la falta de redistribución. La Economic Freedom (65.6) muestra burocracia excesiva y corrupción como obstáculos reales a la libertad económica.',
    }
  }
};

// Datos Colombia — Mock calibrado con fuentes reales (2023-2024)
const COLOMBIA_DATA = {
  indicators: [
    {
      id: 'economic_freedom',
      source: 'Fraser Institute',
      name: 'Economic Freedom of the World',
      value: 65.6,
      rank: '94 / 165',
      max: 100,
      unit: '/ 100',
      description: 'Mide tamaño del gobierno, sistema legal, acceso a dinero sólido, libertad de comercio e internacional y regulación.',
      color_by_lens: {
        negativa: '#b0b0aa',
        positiva: '#ff7a35',
        capacidades: '#3dbe8a',
        libertario: '#b0b0aa'
      }
    },
    {
      id: 'freedom_world',
      source: 'Freedom House',
      name: 'Freedom in the World',
      value: 69,
      rank: 'Parcialmente Libre',
      max: 100,
      unit: '/ 100',
      description: 'Evalúa derechos políticos y libertades civiles. Colombia puntúa alto en pluralismo pero bajo en estado de derecho y corrupción.',
      color_by_lens: {
        negativa: '#4a9eff',
        positiva: '#ff7a35',
        capacidades: '#3dbe8a',
        libertario: '#b0b0aa'
      }
    },
    {
      id: 'hdi',
      source: 'PNUD',
      name: 'Índice de Desarrollo Humano',
      value: 0.754,
      rank: '91 / 193',
      max: 1,
      unit: '(0-1)',
      description: 'Combina esperanza de vida (73.8 años), educación (media 8.9 años) e Ingreso Nacional Bruto per cápita ($15,720 PPA).',
      color_by_lens: {
        negativa: '#4a9eff',
        positiva: '#ff7a35',
        capacidades: '#3dbe8a',
        libertario: '#b0b0aa'
      }
    }
  ],
  readings: {
    negativa:    'Colombia garantiza razonablemente la libertad negativa en sus instituciones formales (Freedom: 69/100). El problema central son los actores no-estatales — grupos armados, narcotráfico — que ejercen coacción directa sobre comunidades. El IDH de 0.754 es irrelevante para este diagnóstico. La Economic Freedom (65.6) señala que el Estado regula más de lo necesario.',
    positiva:    'La libertad positiva real de los colombianos está profundamente estratificada. El IDH de 0.754 promedia situaciones radicalmente distintas: el Gini de 0.54 indica que la capacidad de autodeterminación es un privilegio de pocos. La libertad formal (Freedom 69/100) coexiste con exclusión estructural de millones.',
    capacidades: 'El IPM de Colombia (≈ 18.6%) revela privaciones multidimensionales que ningún índice único captura. La Economic Freedom (65.6) mide libertad de transacción, no libertad de funcionar. El IDH (0.754) promedia realidades radicalmente distintas por región y estrato. El diagnóstico real exige desagregar por territorio y población.',
    libertario:  'El índice relevante es la Economic Freedom (65.6 / 94° puesto): Colombia tiene exceso de regulación, corrupción sistémica que distorsiona contratos y propiedad, y un gasto público que no genera retornos. La reforma prioritaria es institucional: hacer cumplir reglas del juego, no redistribuir más. El Freedom in the World (69) confirma que el problema no es falta de derechos formales sino de su aplicación.'
  }
};

// Capacidades de Sen — mock pedagógico
const SEN_CAPACIDADES = [
  { id: 'salud',       icon: '🫀', name: 'Salud',          weight: 20, desc: 'Vivir una vida de duración normal, sin enfermedad prevenible.' },
  { id: 'educacion',   icon: '📚', name: 'Educación',      weight: 18, desc: 'Leer, razonar, participar en la vida cívica y cultural.' },
  { id: 'movilidad',   icon: '🚶', name: 'Movilidad',      weight: 12, desc: 'Moverse libremente en el espacio físico y geográfico.' },
  { id: 'participacion',icon:'🗳', name: 'Participación',  weight: 14, desc: 'Participar en decisiones políticas que afectan tu vida.' },
  { id: 'trabajo',     icon: '⚒',  name: 'Trabajo digno',  weight: 16, desc: 'Trabajar en condiciones humanas, sin explotación.' },
  { id: 'afiliacion',  icon: '🤝', name: 'Afiliación',     weight: 12, desc: 'Vivir con y para otros, sin humillación ni discriminación.' },
  { id: 'juego',       icon: '🎭', name: 'Juego / Cultura', weight: 8, desc: 'Reír, jugar, participar en la vida recreativa y cultural.' },
];

// Datos power diagram
const POWER_NODE_DATA = {
  individuo: {
    name: 'Individuo',
    type: 'Sujeto político',
    desc: 'El individuo es a la vez objeto y origen de la legitimidad política. Recibe restricciones de todos los demás nodos y es la unidad en cuyo nombre se justifican.',
    mechanism: 'Mecanismo de restricción recibida: ley (Estado), precio (Mercado), norma social (Sociedad). Toda la tensión de los marcos teóricos se concentra aquí.'
  },
  estado: {
    name: 'Estado',
    type: 'Coacción legal-racional (Weber)',
    desc: 'Monopolio legítimo de la violencia. Restringe al individuo mediante ley, regulación, impuestos, pena. Su restricción es la más visible y la más debatida políticamente.',
    mechanism: 'Mecanismo: norma jurídica + amenaza de sanción. Para Berlin, es la fuente principal de restricción a la libertad negativa. Para Sen, también puede ser la fuente principal de habilitación.'
  },
  mercado: {
    name: 'Mercado',
    type: 'Coacción estructural-difusa',
    desc: 'Restringe mediante el precio: si no puedes pagar, no accedes. Para Hayek, esto no es coacción sino coordinación descentralizada. Para Sen, es una restricción real de capacidades.',
    mechanism: 'Mecanismo: sistema de precios + exclusión por insolvencia. Diferencia clave: no hay agente intencional — o hay un sistema que produce restricciones sin planificarlas.'
  },
  sociedad: {
    name: 'Sociedad',
    type: 'Coacción normativa-informal',
    desc: 'Restringe mediante norma social, expectativa, estigma y exclusión cultural. Es la coacción más invisible: nadie la impone formalmente, pero sus efectos sobre la libertad real son profundos.',
    mechanism: 'Mecanismo: presión de conformidad, exclusión social, prejuicio. Para Berlin, es menos relevante que la restricción estatal. Para Sen, sus efectos en capacidades son tan reales como cualquier ley.'
  }
};

// Narrativas sistema cerrado/plural
const SYSTEM_NARRATIVES = {
  closed: {
    title: 'Sistema cerrado — monismo de valores',
    content: `Hay un valor supremo: la Libertad (o la Igualdad, o la Razón, o Dios). Todos los demás valores son derivados o instrumentales respecto a él. Los conflictos aparentes son errores cognitivos o estados transicionales — una vez que todos entiendan el valor supremo, el conflicto se disuelve.`,
    implications: [
      'Existe una respuesta correcta a cada pregunta política.',
      'El desacuerdo es síntoma de ignorancia o mala fe.',
      'Una autoridad que conozca el valor supremo puede imponerlo legítimamente.',
      'Los que resisten lo hacen porque no han alcanzado la comprensión correcta.',
    ],
    warning: 'Esta estructura lógica ha sostenido proyectos tan distintos como el marxismo-leninismo, el fundamentalismo religioso y el ultraliberalismo de mercado. El contenido varía. La forma es la misma.'
  },
  plural: {
    title: 'Sistema plural — pluralismo de valores',
    content: `Existen múltiples valores genuinamente importantes — libertad, igualdad, seguridad, excelencia, solidaridad — y son irreduciblemente incompatibles entre sí. No hay un "valor maestro" que los reconcilie. Toda elección política implica sacrificar algo real.`,
    implications: [
      'No hay respuesta perfecta: solo intercambios (trade-offs).',
      'El desacuerdo político es inevitable y en muchos casos legítimo.',
      'La prudencia política consiste en gestionar pérdidas, no eliminar conflicto.',
      'La humildad sobre la propia posición no es debilidad — es racionalidad.',
    ],
    warning: 'Pluralismo no es relativismo. Puedes reconocer que múltiples valores son genuinos sin concluir que todos los compromisos son igualmente válidos o que la distinción entre buenas y malas políticas desaparece.'
  }
};

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════

const state = {
  currentLens: 'negativa',
  currentLanguage: I18N.defaultLanguage || 'es',
  berlinSide: 'negativa',
  marketMode: 'ideal',
  systemMode: 'closed',
  activePowerNode: null,
  senActiveCaps: new Set(),
  conflictValue: 50,
  lensGuideSeen: new Set(),
  activeLensGuide: null,
  lensGuideTimer: null,
  onboardingVisible: false,
  colorMode: 'dark',
};

// ═══════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════

function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function lerp(a, b, t) { return a + (b - a) * t; }

function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }

const originalStaticContent = new Map();

function getEnglishLocale() {
  return I18N?.locales?.en || null;
}

function isEnglish() {
  return state.currentLanguage === 'en' && Boolean(getEnglishLocale());
}

function getSupportedLanguage(lang) {
  if (!lang) return I18N.defaultLanguage || 'es';
  const normalized = String(lang).toLowerCase();
  const short = normalized.slice(0, 2);
  return (I18N.supportedLanguages || ['es']).includes(short) ? short : (I18N.defaultLanguage || 'es');
}

function getPreferredLanguage() {
  try {
    const saved = localStorage.getItem('site-language');
    if (saved) return getSupportedLanguage(saved);
  } catch {}
  return getSupportedLanguage(navigator.language);
}

function persistLanguage(lang) {
  try {
    localStorage.setItem('site-language', lang);
  } catch {}
}

function persistLens(lens) {
  try {
    localStorage.setItem('site-lens', lens);
  } catch {}
}

function getPreferredLens() {
  try {
    const saved = localStorage.getItem('site-lens');
    if (saved && LENS_DATA[saved]) return saved;
  } catch {}
  // First visit: start at 'positiva' (visual center of the 4-item wheel)
  return 'positiva';
}

function hasSeenOnboarding() {
  try {
    return localStorage.getItem('site-onboarding-seen') === 'true';
  } catch {
    return false;
  }
}

function persistOnboardingSeen() {
  try {
    localStorage.setItem('site-onboarding-seen', 'true');
  } catch {}
}

function getLensDefinition(lens) {
  if (isEnglish()) return getEnglishLocale().lenses[lens] || LENS_DATA[lens];
  return LENS_DATA[lens];
}

function getCanvasValues() {
  return isEnglish() ? getEnglishLocale().canvasValues : [
    { label: 'Libertad', angle: -60, color: '#4a9eff' },
    { label: 'Igualdad', angle: 60, color: '#3dbe8a' },
    { label: 'Seguridad', angle: 180, color: '#ff7a35' },
    { label: 'Eficiencia', angle: 0, color: '#b0b0aa' },
    { label: 'Solidaridad', angle: 120, color: '#ff7a35' },
    { label: 'Autonomía', angle: -120, color: '#4a9eff' },
  ];
}

function getConflictNotes() {
  return isEnglish() ? getEnglishLocale().conflictNotes : CONFLICT_NOTES;
}

function getPowerNode(nodeId) {
  if (isEnglish()) return getEnglishLocale().powerNodes[nodeId] || POWER_NODE_DATA[nodeId];
  return POWER_NODE_DATA[nodeId];
}

function getMarketLocale() {
  return isEnglish()
    ? getEnglishLocale().market
    : {
        axis: { price: 'P', quantity: 'Q' },
        ideal: {
          caption: 'Modelo ideal: curvas simétricas, un único equilibrio eficiente, información perfecta, cero externalidades. Este es el modelo del manual — no el mundo real.',
          demand: 'Demanda',
          supply: 'Oferta',
          equilibrium: 'Equilibrio'
        },
        real: {
          caption: 'Evidencia empírica: mercados reales presentan poder oligopólico, externalidades no internalizadas, información asimétrica y barreras de entrada. El modelo ideal es útil como referencia, no como descripción.',
          demand: 'Demanda',
          supplyReal: 'Oferta real',
          supplyIdeal: 'Oferta ideal',
          oligopoly: 'Costo oligopolio',
          note: 'Externalidades, poder de mercado, información asimétrica, bienes públicos — no aparecen en el modelo ideal.'
        }
      };
}

function getSenCapabilities() {
  return isEnglish() ? getEnglishLocale().sen.capabilities : SEN_CAPACIDADES;
}

function getSenLocale() {
  return isEnglish()
    ? getEnglishLocale().sen
    : {
        meterLabel: 'Libertad efectiva estimada',
        caveat: 'Nota: estos porcentajes son pedagógicos. Sen rechaza agregar capacidades en un solo índice — la composición importa tanto como el total.',
        messages: {
          zero: 'Sin capacidades básicas activas: libertad formal puede existir, pero la libertad real es nula.',
          low: 'Privación severa de capacidades. En términos de Sen, esta persona no es libre en ningún sentido sustantivo.',
          mid: 'Capacidades parciales. La libertad efectiva existe pero está gravemente limitada.',
          high: 'Capacidades sustanciales. La persona puede funcionar, pero aún hay déficits importantes.',
          full: 'Capacidades plenas. Este es el ideal normativo de Sen — pocas personas en el mundo lo alcanzan.'
        }
      };
}

function getColombiaContent() {
  return isEnglish()
    ? getEnglishLocale().colombia
    : {
        indicators: COLOMBIA_DATA.indicators,
        readings: COLOMBIA_DATA.readings
      };
}

function getSystemNarratives() {
  return isEnglish() ? getEnglishLocale().systemNarratives : SYSTEM_NARRATIVES;
}

function getCoachCopy(sectionId) {
  if (isEnglish()) return getEnglishLocale().ui.coach[sectionId] || getEnglishLocale().ui.coach.default;
  const copy = {
    berlin: 'Prueba otro lente aquí para comparar los dos conceptos de Berlin sin salir de la sección.',
    conflicto: 'Este trade-off cambia de sentido según el marco. Toca aquí para releer la pérdida.',
    poder: 'El poder se ve distinto desde cada marco. Toca el lente para reinterpretar este mapa.',
    limites: 'Esta distinción se vuelve más nítida o más borrosa según el lente. Puedes probarlo aquí.',
    economia: 'Cambia el lente aquí para ver cómo la misma escena económica sostiene conclusiones políticas distintas.',
    sen: 'Esta sección se enriquece mucho cuando comparas Berlin, Sen y la lectura libertaria lado a lado.',
    colombia: 'Este tablero está hecho para releerse con el lente. Toca aquí para cambiar el diagnóstico.',
    default: 'Puedes usar el lente aquí para reinterpretar esta sección.'
  };
  return copy[sectionId] || copy.default;
}

function captureStaticContent() {
  const entries = getEnglishLocale()?.staticContent || [];
  entries.forEach(entry => {
    qsa(entry.selector).forEach((node, index) => {
      const key = `${entry.type}:${entry.selector}:${entry.attr || ''}:${index}`;
      if (originalStaticContent.has(key)) return;
      if (entry.type === 'html') originalStaticContent.set(key, node.innerHTML);
      else if (entry.type === 'attr') originalStaticContent.set(key, node.getAttribute(entry.attr) || '');
      else originalStaticContent.set(key, node.textContent || '');
    });
  });
}

function applyStaticTranslations(lang) {
  const english = getEnglishLocale();
  const entries = english?.staticContent || [];
  captureStaticContent();

  entries.forEach(entry => {
    qsa(entry.selector).forEach((node, index) => {
      const key = `${entry.type}:${entry.selector}:${entry.attr || ''}:${index}`;
      if (lang === 'en') {
        if (entry.type === 'html') node.innerHTML = entry.value;
        else if (entry.type === 'attr') node.setAttribute(entry.attr, entry.value);
        else node.textContent = entry.value;
      } else {
        const original = originalStaticContent.get(key);
        if (original == null) return;
        if (entry.type === 'html') node.innerHTML = original;
        else if (entry.type === 'attr') node.setAttribute(entry.attr, original);
        else node.textContent = original;
      }
    });
  });
}

function updateLanguageButtons() {
  qsa('.language-btn').forEach(btn => {
    const active = btn.dataset.lang === state.currentLanguage;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function syncLensPanelToggle() {
  const panel = qs('#lensPanel');
  const btn = qs('#lensToggleBtn');
  if (!panel || !btn) return;
  const collapsed = panel.classList.contains('collapsed');
  const english = getEnglishLocale();
  const collapseLabel = isEnglish() ? english.ui.collapseLabel : 'Colapsar selector de lente';
  const expandLabel = isEnglish() ? english.ui.expandLabel : 'Expandir selector de lente';
  btn.setAttribute('aria-expanded', String(!collapsed));
  btn.setAttribute('aria-label', collapsed ? expandLabel : collapseLabel);
}

function setLensPanelCollapsed(collapsed) {
  const panel = qs('#lensPanel');
  if (!panel) return;
  panel.classList.toggle('collapsed', collapsed);
  syncLensPanelToggle();
}

function hideLensCoach(markSeen = true) {
  const coach = qs('#lensCoach');
  const panel = qs('#lensPanel');
  if (state.lensGuideTimer) {
    clearTimeout(state.lensGuideTimer);
    state.lensGuideTimer = null;
  }
  if (markSeen && state.activeLensGuide) state.lensGuideSeen.add(state.activeLensGuide);
  panel?.classList.remove('is-guided');
  if (!coach) {
    state.activeLensGuide = null;
    return;
  }
  coach.classList.remove('is-visible');
  setTimeout(() => {
    if (!coach.classList.contains('is-visible')) coach.hidden = true;
  }, 180);
  state.activeLensGuide = null;
}

function showLensCoach(sectionId) {
  const coach = qs('#lensCoach');
  const text = qs('#lensCoachText');
  const panel = qs('#lensPanel');
  if (!coach || !text || !panel) return;
  if (state.onboardingVisible) return;
  if (state.lensGuideSeen.has(sectionId)) return;
  hideLensCoach(false);
  state.activeLensGuide = sectionId;
  text.textContent = getCoachCopy(sectionId);
  coach.hidden = false;
  panel.classList.add('is-guided');
  requestAnimationFrame(() => coach.classList.add('is-visible'));
  state.lensGuideTimer = setTimeout(() => hideLensCoach(true), 4200);
}

function getOnboardingCopy() {
  const isMobile = window.matchMedia('(max-width: 500px)').matches;
  if (isEnglish()) {
    return {
      eyebrow: 'First visit',
      title: isMobile ? 'Use the language switch above and the lens chips below.' : 'Use the language switch above and the lens panel on the right.',
      body: isMobile
        ? 'On mobile, the bottom chips let you reinterpret each section quickly without leaving the reading flow.'
        : 'On desktop, the right-side lens lets you reread each section from Berlin, Sen, or a libertarian frame in one tap.',
      button: 'Got it'
    };
  }

  return {
    eyebrow: 'Primer vistazo',
    title: isMobile
      ? 'Usa el selector de idioma arriba y los chips del lente abajo.'
      : 'Usa el selector de idioma arriba y el panel de lentes a la derecha.',
    body: isMobile
      ? 'En móvil, los chips inferiores te dejan reinterpretar cada sección rápido sin romper el flujo de lectura.'
      : 'En escritorio, el panel lateral te permite releer cada sección desde Berlin, Sen o una lectura libertaria con un solo toque.',
    button: 'Entendido'
  };
}

function renderOnboarding() {
  const eyebrow = qs('#heroOnboardingEyebrow');
  const title = qs('#heroOnboardingTitle');
  const body = qs('#heroOnboardingBody');
  const button = qs('#heroOnboardingDismiss');
  const copy = getOnboardingCopy();
  if (eyebrow) eyebrow.textContent = copy.eyebrow;
  if (title) title.textContent = copy.title;
  if (body) body.textContent = copy.body;
  if (button) button.textContent = copy.button;
}

function showOnboarding() {
  const card = qs('#heroOnboarding');
  const panel = qs('#lensPanel');
  const languageSwitch = qs('.hero-language-switch');
  if (!card || hasSeenOnboarding()) return;
  state.onboardingVisible = true;
  renderOnboarding();
  card.hidden = false;
  panel?.classList.add('is-guided');
  languageSwitch?.classList.add('is-guided');
}

function hideOnboarding({ persist = true } = {}) {
  const card = qs('#heroOnboarding');
  const panel = qs('#lensPanel');
  const languageSwitch = qs('.hero-language-switch');
  if (persist) persistOnboardingSeen();
  state.onboardingVisible = false;
  card?.setAttribute('hidden', '');
  panel?.classList.remove('is-guided');
  languageSwitch?.classList.remove('is-guided');
}

// ═══════════════════════════════════════════════
// LENS SYSTEM
// ═══════════════════════════════════════════════

function setLens(lens) {
  if (!LENS_DATA[lens]) return;
  if (state.onboardingVisible) hideOnboarding();
  state.currentLens = lens;
  persistLens(lens);

  // Update body class
  const classes = Object.values(LENS_DATA).map(d => d.bodyClass);
  document.body.classList.remove(...classes);
  document.body.classList.add(LENS_DATA[lens].bodyClass);

  // Update lens buttons
  qsa('.lens-btn').forEach(btn => {
    const active = btn.dataset.lens === lens;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-checked', String(active));
  });

  // Update all interpretation texts
  const interp = getLensDefinition(lens).interpretations;
  const map = {
    berlinLensText:    'berlin',
    conflictLensText:  'conflicto',
    poderLensText:     'poder',
    limitesLensText:   'limites',
    economiaLensText:  'economia',
    senLensText:       'sen',
  };
  Object.entries(map).forEach(([elId, key]) => {
    const el = qs(`#${elId}`);
    if (el) el.textContent = interp[key] || '';
  });

  // Colombia
  updateColombiaDashboard();

  // Announce
  const announce = qs('#lensAnnounce');
  if (announce) {
    if (isEnglish()) {
      const def = getLensDefinition(lens);
      announce.textContent = getEnglishLocale().ui.lensActiveAnnouncement
        .replace('{name}', def.name)
        .replace('{author}', def.author);
    } else {
      announce.textContent = `Marco activo: ${LENS_DATA[lens].name} (${LENS_DATA[lens].author})`;
    }
  }

  hideLensCoach();

  // Update drum selector (Feature 2)
  updateDrumSelector(lens);
}

// ═══════════════════════════════════════════════
// LENS PANEL TOGGLE
// ═══════════════════════════════════════════════

function initLensPanel() {
  const panel = qs('#lensPanel');
  const btn = qs('#lensToggleBtn');
  const header = qs('.lens-panel__header');

  btn?.addEventListener('click', () => {
    if (state.onboardingVisible) hideOnboarding();
    setLensPanelCollapsed(!panel.classList.contains('collapsed'));
    hideLensCoach();
  });

  header?.addEventListener('click', e => {
    if (e.target === btn) return;
    if (panel?.classList.contains('collapsed')) {
      if (state.onboardingVisible) hideOnboarding();
      setLensPanelCollapsed(false);
      hideLensCoach();
    }
  });

  qsa('.lens-btn').forEach(btn => {
    btn.addEventListener('click', () => setLens(btn.dataset.lens));
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLens(btn.dataset.lens); }
    });
  });

  syncLensPanelToggle();
}

function initLanguageControls() {
  qsa('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.onboardingVisible) hideOnboarding();
      setLanguage(btn.dataset.lang);
    });
  });
  updateLanguageButtons();
}

function setLanguage(lang, { persist = true } = {}) {
  const nextLang = getSupportedLanguage(lang);
  state.currentLanguage = nextLang;
  if (persist) persistLanguage(nextLang);

  document.documentElement.lang = nextLang;
  const description = qs('meta[name="description"]');
  const english = getEnglishLocale();
  if (nextLang === 'en' && english) {
    document.title = english.meta.title;
    description?.setAttribute('content', english.meta.description);
  } else {
    document.title = 'Anatomía de la Libertad';
    description?.setAttribute('content', 'Una exploración interactiva de los marcos teóricos de la libertad política: Berlin, Sen, Hayek.');
  }

  applyStaticTranslations(nextLang);
  updateLanguageButtons();
  syncLensPanelToggle();
  drawMarketSvg(state.marketMode);
  renderPowerInfo();
  renderSenCapabilities();
  updateColombiaDashboard();
  renderSystemNarrative();
  updateConflictSlider(state.conflictValue);
  setLens(state.currentLens);
  if (state.onboardingVisible) renderOnboarding();
}

function initLensGuidance() {
  const sections = qsa('[data-lens-context]');
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const context = visible.target.dataset.lensContext;
    if (!context || state.lensGuideSeen.has(context)) return;
    showLensCoach(context);
  }, { threshold: [0.4, 0.7] });

  sections.forEach(section => observer.observe(section));
}

function initOnboarding() {
  const dismissBtn = qs('#heroOnboardingDismiss');
  dismissBtn?.addEventListener('click', () => hideOnboarding());
  if (!hasSeenOnboarding()) {
    window.setTimeout(() => {
      if (!hasSeenOnboarding()) showOnboarding();
    }, 300);
  }
}

// ═══════════════════════════════════════════════
// TOP NAV — scroll spy
// ═══════════════════════════════════════════════

function initScrollSpy() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.top-nav__link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = qs(`.top-nav__link[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

// ═══════════════════════════════════════════════
// SECTION I — DIVERGENCE CANVAS
// ═══════════════════════════════════════════════

function initDivergenceCanvas() {
  const canvas = qs('#divergenceCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let t = 0;

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const values = getCanvasValues();

    const cx = w / 2, cy = h / 2;
    const baseR = 28;
    const maxR = 120;
    const progress = (Math.sin(t * 0.008) + 1) / 2; // 0..1

    values.forEach(v => {
      const rad = (v.angle - 90) * Math.PI / 180;
      const r = lerp(baseR, maxR, progress);
      const x = cx + Math.cos(rad) * r;
      const y = cy + Math.sin(rad) * r;

      // Line from center
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = v.color + '55';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Node
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = v.color;
      ctx.fill();

      // Label
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.fillStyle = v.color + 'cc';
      ctx.textAlign = x > cx ? 'left' : x < cx - 10 ? 'right' : 'center';
      const labelX = x + (x > cx ? 8 : x < cx - 10 ? -8 : 0);
      const labelY = y + (y > cy ? 14 : -8);
      ctx.fillText(v.label, labelX, labelY);
    });

    // Center node
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#d4d0c8';
    ctx.fill();

    t++;
    requestAnimationFrame(draw);
  }

  draw();
}

// ═══════════════════════════════════════════════
// SECTION II — BERLIN TOGGLE
// ═══════════════════════════════════════════════

function initBerlinToggle() {
  const btns = qsa('.berlin-toggle-btn');
  const split = qs('#berlinSplit');
  if (!split) return;

  function setSide(side) {
    state.berlinSide = side;
    btns.forEach(b => {
      const active = b.dataset.side === side;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    split.classList.remove('show-one-neg', 'show-one-pos', 'show-both');
    if (side === 'negativa') split.classList.add('show-one-neg');
    else if (side === 'positiva') split.classList.add('show-one-pos');
    // 'ambas' leaves default grid
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => setSide(btn.dataset.side));
  });

  setSide('ambas'); // Start with both visible
}

// ═══════════════════════════════════════════════
// SECTION III — CONFLICT SLIDER
// ═══════════════════════════════════════════════

const CONFLICT_NOTES = [
  { range: [0, 20],   text: 'La igualdad absoluta requiere control total de la distribución — y por tanto, restricción extrema de la autonomía individual y de los resultados del mercado.' },
  { range: [21, 40],  text: 'Alta redistribución con regulación fuerte. La libertad negativa está significativamente restringida. ¿El costo vale la expansión de capacidades? Depende del marco.' },
  { range: [41, 59],  text: 'Zona de equilibrio inestable. Todas las sociedades democráticas contemporáneas operan aquí — y ninguna está satisfecha con el compromiso.' },
  { range: [60, 79],  text: 'Mercado con correcciones mínimas. Alta libertad negativa, baja redistribución. Las asimetrías de poder se amplifican con el tiempo.' },
  { range: [80, 100], text: 'Libertad negativa máxima: sin interferencia. Los resultados del mercado son soberanos. Para Sen, esto puede ser compatible con privación extrema de capacidades.' },
];

function getConflictNote(val) {
  return getConflictNotes().find(n => val >= n.range[0] && val <= n.range[1])?.text || '';
}

function updateConflictSlider(val) {
  const slider = qs('#conflictSlider');
  if (!slider) return;

  state.conflictValue = val;
  const negLoss = 100 - val;
  const eqLoss = val;

  const barNeg = qs('#lossBarNeg');
  const barEq  = qs('#lossBarEq');
  const valNeg = qs('#lossValNeg');
  const valEq  = qs('#lossValEq');
  const note   = qs('#conflictNote');

  if (barNeg) barNeg.style.width = negLoss + '%';
  if (barEq)  barEq.style.width = eqLoss + '%';
  if (valNeg) valNeg.textContent = negLoss + '%';
  if (valEq)  valEq.textContent = eqLoss + '%';
  if (note)   note.textContent = getConflictNote(val);

  slider.setAttribute('aria-valuenow', val);
}

function initConflictSlider() {
  const slider = qs('#conflictSlider');
  if (!slider) return;

  slider.addEventListener('input', () => updateConflictSlider(+slider.value));
  updateConflictSlider(50);
}

// ═══════════════════════════════════════════════
// SECTION IV — POWER DIAGRAM
// ═══════════════════════════════════════════════

function initPowerDiagram() {
  const nodes = qsa('.power-node');
  if (!nodes.length) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      if (state.activePowerNode === node.dataset.node) state.activePowerNode = null;
      else state.activePowerNode = node.dataset.node;
      renderPowerInfo();
    });
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (state.activePowerNode === node.dataset.node) state.activePowerNode = null;
        else state.activePowerNode = node.dataset.node;
        renderPowerInfo();
      }
    });
  });

  renderPowerInfo();
}

function renderPowerInfo() {
  const infoPanel = qs('#powerInfo');
  const nodes = qsa('.power-node');
  if (!infoPanel) return;

  if (!state.activePowerNode) {
    nodes.forEach(n => n.classList.remove('active'));
    infoPanel.innerHTML = isEnglish()
      ? '<p class="power-info__hint">Tap a node to see the kind of restriction it exerts on the individual.</p>'
      : '<p class="power-info__hint">Haz clic en un nodo para ver el tipo de restricción que ejerce sobre el individuo.</p>';
    return;
  }

  nodes.forEach(n => n.classList.toggle('active', n.dataset.node === state.activePowerNode));
  const data = getPowerNode(state.activePowerNode);
  if (!data) return;
  infoPanel.innerHTML = `
    <div class="power-info__node-name">${data.name}</div>
    <div class="power-info__type">${data.type}</div>
    <p class="power-info__desc">${data.desc}</p>
    <p class="power-info__mechanism">${data.mechanism}</p>
  `;
}

// ═══════════════════════════════════════════════
// SECTION VI — MARKET SVG
// ═══════════════════════════════════════════════

function drawMarketSvg(mode) {
  const svg = qs('#marketSvg');
  const caption = qs('#marketCaption');
  if (!svg) return;
  const locale = getMarketLocale();

  const W = 560, H = 260;
  const pad = { l: 60, r: 70, t: 36, b: 50 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  function px(q) { return pad.l + (q / 10) * pw; }
  function py(p) { return pad.t + ph - (p / 100) * ph; }

  // Axis label text — full words for clarity
  const priceLabel  = isEnglish() ? 'Price (P)' : 'Precio (P)';
  const quantLabel  = isEnglish() ? 'Quantity (Q)' : 'Cantidad (Q)';

  // Use a neutral dark color for axes/labels that works on both themes
  const axisColor   = '#6b7280';
  const axisStroke  = '#4b5563';

  let svgContent = `
    <!-- Axes -->
    <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1.5"/>
    <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1.5"/>
    <!-- Axis labels -->
    <text x="${pad.l - 10}" y="${pad.t - 8}" fill="${axisColor}" font-size="11" font-family="IBM Plex Mono" text-anchor="middle">${priceLabel}</text>
    <text x="${pad.l + pw + 4}" y="${pad.t + ph + 18}" fill="${axisColor}" font-size="11" font-family="IBM Plex Mono" text-anchor="start">${quantLabel}</text>
  `;

  if (mode === 'ideal') {
    const demandPath = [];
    const supplyPath = [];
    for (let q = 0; q <= 10; q += 0.5) {
      const pd = 90 - 7 * q;
      const ps = 10 + 7 * q;
      if (pd >= 0 && pd <= 100) demandPath.push(`${px(q)},${py(pd)}`);
      if (ps >= 0 && ps <= 100) supplyPath.push(`${px(q)},${py(ps)}`);
    }

    const eq_q = (90 - 10) / 14;
    const eq_p = 10 + 7 * eq_q;

    // Labels anchored well inside the plot
    const demandLabelX = px(8.5);
    const demandLabelY = py(90 - 7 * 8.5) - 8;
    const supplyLabelX = px(8.5);
    const supplyLabelY = py(10 + 7 * 8.5) + 16;
    // Equilibrium label: left of the point if near right edge
    const eqLabelX = px(eq_q) - 8;
    const eqLabelY = py(eq_p) - 10;

    svgContent += `
      <polyline points="${demandPath.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2.5"/>
      <polyline points="${supplyPath.join(' ')}" fill="none" stroke="#3dbe8a" stroke-width="2.5"/>
      <!-- Equilibrium dashed lines -->
      <line x1="${px(eq_q)}" y1="${py(eq_p)}" x2="${px(eq_q)}" y2="${py(0)}" stroke="${axisStroke}" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="${pad.l}" y1="${py(eq_p)}" x2="${px(eq_q)}" y2="${py(eq_p)}" stroke="${axisStroke}" stroke-width="1" stroke-dasharray="4,3"/>
      <!-- Equilibrium point -->
      <circle cx="${px(eq_q)}" cy="${py(eq_p)}" r="6" fill="#f0ece0" stroke="${axisStroke}" stroke-width="1"/>
      <!-- Curve labels with background for legibility -->
      <rect x="${demandLabelX - 42}" y="${demandLabelY - 13}" width="44" height="16" rx="3" fill="rgba(74,158,255,0.15)"/>
      <text x="${demandLabelX}" y="${demandLabelY}" fill="#4a9eff" font-size="12" font-family="IBM Plex Mono" font-weight="500" text-anchor="end">${locale.ideal.demand}</text>
      <rect x="${supplyLabelX - 2}" y="${supplyLabelY - 13}" width="44" height="16" rx="3" fill="rgba(61,190,138,0.15)"/>
      <text x="${supplyLabelX}" y="${supplyLabelY}" fill="#3dbe8a" font-size="12" font-family="IBM Plex Mono" font-weight="500" text-anchor="start">${locale.ideal.supply}</text>
      <rect x="${eqLabelX - 56}" y="${eqLabelY - 13}" width="58" height="16" rx="3" fill="rgba(107,114,128,0.2)"/>
      <text x="${eqLabelX}" y="${eqLabelY}" fill="${axisColor}" font-size="11" font-family="IBM Plex Mono" text-anchor="end">${locale.ideal.equilibrium}</text>
    `;

    if (caption) caption.textContent = locale.ideal.caption;

  } else {
    const demandPath = [];
    for (let q = 0; q <= 10; q += 0.5) {
      const pd = q < 4 ? 88 - 5 * q : 70 - 9 * (q - 4);
      if (pd >= 0 && pd <= 100) demandPath.push(`${px(q)},${py(pd)}`);
    }

    const supplyPath = [];
    for (let q = 0; q <= 10; q += 0.5) {
      const ps = 30 + 4 * q + (q > 6 ? 8 * (q - 6) : 0);
      if (ps >= 0 && ps <= 100) supplyPath.push(`${px(q)},${py(ps)}`);
    }

    const idealSupplyPath = [];
    for (let q = 0; q <= 10; q += 0.5) {
      const ps = 10 + 7 * q;
      if (ps >= 0 && ps <= 100) idealSupplyPath.push(`${px(q)},${py(ps)}`);
    }

    svgContent += `
      <polyline points="${idealSupplyPath.join(' ')}" fill="none" stroke="#3dbe8a" stroke-width="1" stroke-dasharray="5,4" opacity="0.35"/>
      <polyline points="${demandPath.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2.5"/>
      <polyline points="${supplyPath.join(' ')}" fill="none" stroke="#ff7a35" stroke-width="2.5"/>
      <!-- Labels with background rects -->
      <rect x="${pad.l + 6}" y="${pad.t + 4}" width="90" height="16" rx="3" fill="rgba(255,122,53,0.15)"/>
      <text x="${pad.l + 10}" y="${pad.t + 16}" fill="#ff7a35" font-size="11" font-family="IBM Plex Mono">${locale.real.oligopoly}</text>
      <rect x="${px(6.5) - 46}" y="${py(88 - 5 * 6.5) - 16}" width="48" height="16" rx="3" fill="rgba(74,158,255,0.15)"/>
      <text x="${px(6.5)}" y="${py(88 - 5 * 6.5) - 4}" fill="#4a9eff" font-size="12" font-family="IBM Plex Mono" font-weight="500" text-anchor="end">${locale.real.demand}</text>
      <rect x="${px(6.5) + 2}" y="${py(30 + 4 * 6.5) + 2}" width="60" height="16" rx="3" fill="rgba(255,122,53,0.15)"/>
      <text x="${px(6.5) + 4}" y="${py(30 + 4 * 6.5) + 14}" fill="#ff7a35" font-size="12" font-family="IBM Plex Mono" font-weight="500">${locale.real.supplyReal}</text>
      <text x="${px(5)}" y="${py(10 + 7 * 5) - 6}" fill="#3dbe8a" font-size="10" font-family="IBM Plex Mono" opacity="0.6" text-anchor="start">${locale.real.supplyIdeal}</text>
      <!-- Bottom note -->
      <text x="${pad.l + 5}" y="${H - 6}" fill="${axisColor}" font-size="9" font-family="IBM Plex Mono">${locale.real.note}</text>
    `;

    if (caption) caption.textContent = locale.real.caption;
  }

  svg.innerHTML = svgContent;
}

function initMarketToggle() {
  const btns = qsa('.market-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.marketMode = btn.dataset.market;
      btns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      drawMarketSvg(state.marketMode);
    });
  });
  drawMarketSvg('ideal');
}

// ═══════════════════════════════════════════════
// SECTION VII — SEN CAPACIDADES
// ═══════════════════════════════════════════════

function toggleCapability(id) {
  if (state.senActiveCaps.has(id)) state.senActiveCaps.delete(id);
  else state.senActiveCaps.add(id);
  updateSenMeter();
}

function renderSenCapabilities() {
  const grid = qs('#senCapsGrid');
  if (!grid) return;
  const capabilities = getSenCapabilities();

  grid.innerHTML = '';
  capabilities.forEach(cap => {
    const btn = document.createElement('button');
    btn.className = 'sen-cap-btn';
    btn.dataset.id = cap.id;
    btn.title = cap.desc;
    btn.setAttribute('aria-pressed', String(state.senActiveCaps.has(cap.id)));
    btn.innerHTML = `
      <span class="sen-cap-btn__icon">${cap.icon}</span>
      <span class="sen-cap-btn__name">${cap.name}</span>
      <span class="sen-cap-btn__weight">${isEnglish() ? 'Weight' : 'Peso'}: ${cap.weight}%</span>
    `;
    btn.addEventListener('click', () => toggleCapability(cap.id));
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCapability(cap.id); }});
    grid.appendChild(btn);
  });

  updateSenMeter();
}

function updateSenMeter() {
  const capabilities = getSenCapabilities();
  const locale = getSenLocale();
  let total = 0;

  capabilities.forEach(cap => {
    const btn = qs(`.sen-cap-btn[data-id="${cap.id}"]`);
    const active = state.senActiveCaps.has(cap.id);
    if (btn) {
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    }
    if (active) total += cap.weight;
  });

  const bar = qs('#senFreedomBar');
  const val = qs('#senFreedomVal');
  const caveat = qs('#senFreedomCaveat');
  const label = qs('#sen .sen-meter__label');

  if (bar) bar.style.width = total + '%';
  if (val) val.textContent = total + '%';
  if (label) label.textContent = locale.meterLabel;

  let msg = locale.messages.zero;
  if (total === 0) msg = locale.messages.zero;
  else if (total < 30) msg = locale.messages.low;
  else if (total < 60) msg = locale.messages.mid;
  else if (total < 85) msg = locale.messages.high;
  else msg = locale.messages.full;

  if (caveat) caveat.textContent = msg ? `${msg} ${locale.caveat}` : locale.caveat;
}

function initSenCapacidades() {
  renderSenCapabilities();
}

// ═══════════════════════════════════════════════
// SECTION VIII — COLOMBIA DASHBOARD
// ═══════════════════════════════════════════════

function updateColombiaDashboard() {
  const dash = qs('#colombiaDashboard');
  const reading = qs('#colombiaLensReading');
  if (!dash) return;

  const lens = state.currentLens;
  const lensColor = LENS_DATA[lens].color;
  const locale = getColombiaContent();

  dash.innerHTML = COLOMBIA_DATA.indicators.map(ind => {
    const localeIndicator = locale.indicators.find(item => item.id === ind.id) || ind;
    const pct = (ind.value / ind.max) * 100;
    const barColor = ind.color_by_lens[lens] || lensColor;
    return `
      <div class="colombia-indicator">
        <div class="colombia-indicator__source">${localeIndicator.source || ind.source}</div>
        <div class="colombia-indicator__name">${localeIndicator.name || ind.name}</div>
        <div class="colombia-indicator__value" style="color:${barColor}">${ind.value}</div>
        <div class="colombia-indicator__rank">${localeIndicator.rank || ind.rank}</div>
        <div class="colombia-indicator__bar-track">
          <div class="colombia-indicator__bar" style="width:${pct}%;background:${barColor}"></div>
        </div>
        <div class="colombia-indicator__scale">${isEnglish() ? 'Scale' : 'Escala'}: ${localeIndicator.unit || ind.unit}</div>
      </div>
    `;
  }).join('');

  if (reading) {
    reading.textContent = locale.readings[lens] || COLOMBIA_DATA.readings[lens] || '';
  }
}

// ═══════════════════════════════════════════════
// SECTION IX — SYSTEM TOGGLE
// ═══════════════════════════════════════════════

function initSystemToggle() {
  const closedBtn = qs('#systemClosedBtn');
  const pluralBtn = qs('#systemPluralBtn');
  if (!closedBtn || !pluralBtn) return;

  closedBtn.addEventListener('click', () => {
    state.systemMode = 'closed';
    renderSystemNarrative();
  });
  pluralBtn.addEventListener('click', () => {
    state.systemMode = 'plural';
    renderSystemNarrative();
  });
  renderSystemNarrative();
}

function renderSystemNarrative() {
  const narrative = qs('#systemNarrative');
  const closedBtn = qs('#systemClosedBtn');
  const pluralBtn = qs('#systemPluralBtn');
  if (!narrative) return;

  closedBtn?.classList.toggle('active', state.systemMode === 'closed');
  pluralBtn?.classList.toggle('active', state.systemMode === 'plural');
  closedBtn?.setAttribute('aria-pressed', String(state.systemMode === 'closed'));
  pluralBtn?.setAttribute('aria-pressed', String(state.systemMode === 'plural'));

  const data = getSystemNarratives()[state.systemMode];
  if (!data) return;
  narrative.innerHTML = `
    <h4>${data.title}</h4>
    <p>${data.content}</p>
    <ul>${data.implications.map(i => `<li>${i}</li>`).join('')}</ul>
    <p style="margin-top:1rem;font-size:0.82rem;color:var(--clr-text-dim);border-top:1px solid var(--clr-border);padding-top:0.75rem;font-style:italic">${data.warning}</p>
  `;
}

// ═══ FEATURE 1: SCROLL-AWARE LENS PANEL ═══

function showLensPanel() {
  const panel = qs('#lensPanel');
  if (panel) panel.classList.add('lens-panel--visible');
}

function hideLensPanel() {
  const panel = qs('#lensPanel');
  if (panel) panel.classList.remove('lens-panel--visible');
}

function initScrollAwareLensPanel() {
  const panel = qs('#lensPanel');
  if (!panel) return;

  // Only active on mobile (≤500px)
  const mq = window.matchMedia('(max-width: 500px)');

  // Fallback: no IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    panel.classList.add('lens-panel--always-visible');
    return;
  }

  let observer = null;

  function createObserver() {
    if (observer) observer.disconnect();

    if (!mq.matches) {
      // Desktop: remove mobile visibility classes, let CSS handle it
      panel.classList.remove('lens-panel--visible');
      return;
    }

    observer = new IntersectionObserver(entries => {
      const anyIntersecting = entries.some(entry => entry.isIntersecting);
      if (anyIntersecting) {
        showLensPanel();
      } else {
        hideLensPanel();
      }
    }, { threshold: 0.2 });

    qsa('.lens-interpretation').forEach(el => observer.observe(el));
  }

  // Initial setup
  createObserver();

  // Re-evaluate on resize with 100ms debounce
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      createObserver();
    }, 100);
  });
}

// ═══ FEATURE 2: WHEEL PICKER ═══

const DRUM_ORDER = ['negativa', 'positiva', 'capacidades', 'libertario'];

/**
 * Pure helper — returns the next drum index given a start index and swipe direction.
 * Kept for property-test compatibility.
 */
function getDrumNextIndex(startIndex, direction) {
  if (direction === 'up') return (startIndex + 3) % 4;
  return (startIndex + 1) % 4;
}

/**
 * Pure helper — returns the next drum index given a start index and keyboard key.
 * Kept for property-test compatibility.
 */
function getDrumKeyboardNextIndex(startIndex, key) {
  if (key === 'ArrowUp') return (startIndex + 3) % 4;
  return (startIndex + 1) % 4;
}

/**
 * Synchronise the wheel picker UI with the active lens.
 * Called from setLens() and at the end of initDrumSelector().
 */
function updateDrumSelector(lens) {
  const wheel = qs('.lens-wheel');
  if (!wheel) return;

  const lensData = LENS_DATA[lens];
  if (!lensData) return;

  const idx = DRUM_ORDER.indexOf(lens);
  if (idx === -1) return;

  // Mark center item
  qsa('.lens-wheel__item', wheel).forEach((item, i) => {
    item.classList.toggle('is-center', i === idx);
  });

  // Scroll the track so the active item is centered — without animation
  // when called programmatically (e.g. from setLens)
  const track = qs('.lens-wheel__track', wheel);
  if (track) {
    const ITEM_H = 44;
    // Each item is at offset: idx * ITEM_H (track has padding-top: 44px)
    // To center item idx, scrollTop = idx * ITEM_H
    track.scrollTo({ top: idx * ITEM_H, behavior: 'smooth' });
  }
}

/**
 * Build and insert the iOS-style wheel picker.
 * Called once from DOMContentLoaded.
 */
function initDrumSelector() {
  const body = qs('.lens-panel__body');
  if (!body) return;

  const ITEM_H = 44;

  // ── Build DOM ──────────────────────────────────────────────────────────────

  const wheel = document.createElement('div');
  wheel.className = 'lens-wheel';
  wheel.setAttribute('role', 'listbox');
  wheel.setAttribute('aria-label', 'Marco teórico activo');

  // Selection highlight band (purely decorative)
  const highlight = document.createElement('div');
  highlight.className = 'lens-wheel__highlight';
  highlight.setAttribute('aria-hidden', 'true');
  wheel.appendChild(highlight);

  // Scrollable track
  const track = document.createElement('div');
  track.className = 'lens-wheel__track';
  track.setAttribute('aria-hidden', 'true'); // screen readers use the listbox role on wheel

  DRUM_ORDER.forEach((lensKey, i) => {
    const lensData = LENS_DATA[lensKey];

    const item = document.createElement('div');
    item.className = 'lens-wheel__item';
    item.dataset.lens = lensKey;
    item.dataset.index = String(i);
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', 'false');
    item.id = `lens-wheel-opt-${lensKey}`;

    const dot = document.createElement('span');
    dot.className = 'lens-wheel__dot';
    dot.style.backgroundColor = lensData.color;
    dot.setAttribute('aria-hidden', 'true');

    const name = document.createElement('span');
    name.className = 'lens-wheel__name';
    name.textContent = lensData.name;

    const author = document.createElement('span');
    author.className = 'lens-wheel__author';
    author.textContent = lensData.author;

    item.appendChild(dot);
    item.appendChild(name);
    item.appendChild(author);
    track.appendChild(item);
  });

  wheel.appendChild(track);

  // Insert after .lens-options
  const lensOptions = qs('.lens-options', body);
  if (lensOptions && lensOptions.nextSibling) {
    body.insertBefore(wheel, lensOptions.nextSibling);
  } else {
    body.appendChild(wheel);
  }

  // ── Scroll → selection sync ────────────────────────────────────────────────
  // We use scroll-snap + a scroll-end listener to detect which item is centered.

  let scrollTimer = null;

  function onScrollEnd() {
    // Determine which item is closest to center
    const scrollTop = track.scrollTop;
    const centeredIdx = Math.round(scrollTop / ITEM_H);
    const clampedIdx = Math.max(0, Math.min(DRUM_ORDER.length - 1, centeredIdx));

    // Update visual center class
    qsa('.lens-wheel__item', track).forEach((item, i) => {
      item.classList.toggle('is-center', i === clampedIdx);
      item.setAttribute('aria-selected', String(i === clampedIdx));
    });

    // Fire setLens only if it actually changed
    if (DRUM_ORDER[clampedIdx] !== state.currentLens) {
      setLens(DRUM_ORDER[clampedIdx]);
    }
  }

  track.addEventListener('scroll', () => {
    // Debounce: fire after scroll settles (scroll-snap will snap it)
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(onScrollEnd, 80);
  }, { passive: true });

  // ── Tap on item → scroll to it ─────────────────────────────────────────────

  qsa('.lens-wheel__item', track).forEach((item, i) => {
    item.addEventListener('click', () => {
      track.scrollTo({ top: i * ITEM_H, behavior: 'smooth' });
    });
  });

  // ── Keyboard navigation ────────────────────────────────────────────────────

  wheel.setAttribute('tabindex', '0');

  wheel.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentIndex = DRUM_ORDER.indexOf(state.currentLens);
      const nextIndex = getDrumKeyboardNextIndex(currentIndex, 'ArrowDown');
      track.scrollTo({ top: nextIndex * ITEM_H, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = DRUM_ORDER.indexOf(state.currentLens);
      const nextIndex = getDrumKeyboardNextIndex(currentIndex, 'ArrowUp');
      track.scrollTo({ top: nextIndex * ITEM_H, behavior: 'smooth' });
    }
  });

  // ── Initial position ───────────────────────────────────────────────────────

  const initialIdx = DRUM_ORDER.indexOf(state.currentLens);
  // Use instant scroll on init (no animation)
  track.scrollTop = Math.max(0, initialIdx) * ITEM_H;

  // Mark initial center item
  qsa('.lens-wheel__item', track).forEach((item, i) => {
    item.classList.toggle('is-center', i === Math.max(0, initialIdx));
    item.setAttribute('aria-selected', String(i === Math.max(0, initialIdx)));
  });
}

// ═══ FEATURE 3: COLOR MODE TOGGLE ═══

/**
 * Read the user's preferred color mode.
 * Priority:
 *   1. Explicit manual toggle by user (site-color-manual = '1' in localStorage)
 *   2. Local hour: 07:00–20:00 = light, else dark
 *   3. System prefers-color-scheme fallback
 */
function getInitialColorMode() {
  try {
    const isManual = localStorage.getItem('site-color-manual') === '1';
    if (isManual) {
      const saved = localStorage.getItem('site-color-scheme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
  } catch {}
  // Auto: local hour
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 20) return 'light';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * Apply a color mode to the document and persist the preference.
 * @param {'light'|'dark'} mode
 */
function setColorMode(mode, { manual = false } = {}) {
  // Remove the pre-light class from <html> — JS now owns the color mode
  document.documentElement.classList.remove('pre-light');

  document.body.classList.toggle('light-mode', mode === 'light');

  const btn = qs('#colorModeBtn');
  if (btn) {
    btn.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
    btn.setAttribute('aria-label', mode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro');
    btn.textContent = mode === 'light' ? '🌙' : '☀';
  }

  try {
    localStorage.setItem('site-color-scheme', mode);
    // Only mark as manual when the user explicitly clicked the toggle
    if (manual) localStorage.setItem('site-color-manual', '1');
  } catch {}

  state.colorMode = mode;
}

/**
 * Initialise the color mode toggle button.
 * Reads the initial preference and wires up the click handler.
 */
function initColorModeToggle() {
  setColorMode(getInitialColorMode());

  const btn = qs('#colorModeBtn');
  btn?.addEventListener('click', () => {
    setColorMode(state.colorMode === 'light' ? 'dark' : 'light', { manual: true });
  });
}

// ═══════════════════════════════════════════════
// INTERSECTION OBSERVER — fade-in sections
// ═══════════════════════════════════════════════

function initFadeIn() {
  const sections = qsa('.section');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
      section.style.transition = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(24px)';
    s.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(s);
  });
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  state.currentLanguage = getPreferredLanguage();

  // Restore last lens (or 'positiva' on first visit — visual center of the wheel)
  const initialLens = getPreferredLens();
  state.currentLens = initialLens;
  document.body.classList.add(LENS_DATA[initialLens].bodyClass);

  // Initialize all components
  initLensPanel();
  initScrollAwareLensPanel();
  initDrumSelector();
  initColorModeToggle();
  initLanguageControls();
  initScrollSpy();
  initDivergenceCanvas();
  initBerlinToggle();
  initConflictSlider();
  initPowerDiagram();
  initMarketToggle();
  initSenCapacidades();
  updateColombiaDashboard();
  initSystemToggle();
  initLensGuidance();
  initOnboarding();
  initFadeIn();

  // Set initial interpretations
  setLens(initialLens);
  setLanguage(state.currentLanguage, { persist: false });

  console.log('Anatomía de la Libertad — iniciada.');
  console.log('Marco actual:', state.currentLens);
});
