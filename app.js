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
      },
      evaluations: {
        negativa: 'Exceso de regulación',
        positiva: 'Privilegio de capital',
        capacidades: 'Transacción nominal',
        libertario: 'Exceso de burocracia'
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
      },
      evaluations: {
        negativa: 'Parcialmente Libre',
        positiva: 'Libertad formal desigual',
        capacidades: 'Privación de agencia',
        libertario: 'Propiedad insegura'
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
      },
      evaluations: {
        negativa: 'Métrica irrelevante',
        positiva: 'Promedio oculta brechas',
        capacidades: 'Privación regional invisible',
        libertario: 'Proxy de crecimiento'
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
    { label: 'Libertad', angle: -60, color: '#4a9eff', desc: 'Ausencia de trabas o interferencia externa.' },
    { label: 'Igualdad', angle: 60, color: '#3dbe8a', desc: 'Distribución justa y equidad de recursos.' },
    { label: 'Seguridad', angle: 180, color: '#ff7a35', desc: 'Protección colectiva ante riesgos y amenazas.' },
    { label: 'Eficiencia', angle: 0, color: '#b0b0aa', desc: 'Coordinación óptima de recursos y mercado.' },
    { label: 'Solidaridad', angle: 120, color: '#ff7a35', desc: 'Cohesión, apoyo mutuo y fraternidad cívica.' },
    { label: 'Autonomía', angle: -120, color: '#4a9eff', desc: 'Capacidad real de elegir el propio destino.' },
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

  // Dynamic curves & arrows (Tufte visual integrity and dynamic flow)
  drawConflictCurveSvg(state.conflictValue);
  updatePowerDiagramEdges(lens);

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

  let rotationAngle = 0;
  let mouseX = -999, mouseY = -999;
  let centerRadius = 6; // Animatable center circle radius

  // Track mouse coordinates on the canvas
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    // Account for high-DPI scaling (canvas.width vs rect.width)
    mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = -999;
    mouseY = -999;
  });

  // Helper to draw wrapped text centered inside a canvas area
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const totalHeight = lines.length * lineHeight;
    let startY = y - totalHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i].trim(), x, startY + i * lineHeight);
    }
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const values = getCanvasValues();

    const cx = w / 2, cy = h / 2;
    const maxR = 120;
    const progress = 0.85; // Static high-tension factor
    const r = progress * maxR;

    // 1. Elegantly slow cosmic rotation (0.00045 radians per frame)
    // Altering the coordinates over time while keeping relative distances constant
    rotationAngle += 0.00045;

    // 2. Proximity calculation to find the hovered node
    let hoveredIdx = -1;
    let minDistance = 25; // Focus activation boundary in pixels

    values.forEach((v, idx) => {
      const rad = (v.angle - 90) * Math.PI / 180 + rotationAngle;
      const x = cx + Math.cos(rad) * r;
      const y = cy + Math.sin(rad) * r;
      const dist = Math.hypot(mouseX - x, mouseY - y);
      if (dist < minDistance) {
        minDistance = dist;
        hoveredIdx = idx;
      }
    });

    // 3. Smooth expansion/collapse transition of the center circle
    const targetCenterRadius = hoveredIdx !== -1 ? 65 : 6;
    centerRadius = lerp(centerRadius, targetCenterRadius, 0.12);

    // 4. Draw Concentric Guidelines (dashed baseline reference)
    const levels = [0.35, 0.65, 0.95];
    levels.forEach(lvl => {
      ctx.beginPath();
      ctx.arc(cx, cy, lvl * maxR, 0, Math.PI * 2);
      ctx.strokeStyle = state.colorMode === 'light' ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.75;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 5. Draw Axis Lines, Tension Webs, and Nodes
    values.forEach((v, idx) => {
      const rad = (v.angle - 90) * Math.PI / 180 + rotationAngle;
      const x = cx + Math.cos(rad) * r;
      const y = cy + Math.sin(rad) * r;

      const isHovered = idx === hoveredIdx;

      // Axis line from center
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = isHovered ? v.color + '88' : v.color + '26';
      ctx.lineWidth = isHovered ? 2 : 0.85;
      ctx.stroke();

      // Tension Web connection to the next node
      const nextVal = values[(idx + 1) % values.length];
      const nextRad = (nextVal.angle - 90) * Math.PI / 180 + rotationAngle;
      const nextX = cx + Math.cos(nextRad) * r;
      const nextY = cy + Math.sin(nextRad) * r;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
      ctx.strokeStyle = state.colorMode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Node highlighting with beautiful aura
      if (isHovered) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = v.color + '33'; // Semi-transparent glow ring
        ctx.fill();
        ctx.restore();
      }

      // Main node dot
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? 5.5 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = v.color;
      ctx.fill();

      // Clean floating typography labels (Tufte style)
      ctx.font = isHovered ? 'bold 14px "IBM Plex Mono", monospace' : '14px "IBM Plex Mono", monospace';
      ctx.fillStyle = state.colorMode === 'light' 
        ? (isHovered ? '#000000' : '#4b5563') 
        : (isHovered ? '#ffffff' : v.color + 'dd');

      ctx.textAlign = x > cx ? 'left' : x < cx - 10 ? 'right' : 'center';
      const labelX = x + (x > cx ? 10 : x < cx - 10 ? -10 : 0);
      const labelY = y + (y > cy ? 15 : -8);
      ctx.fillText(v.label, labelX, labelY);
    });

    // 6. Center Glossary Circle & Translucent Card Overlay
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
    if (hoveredIdx !== -1) {
      // Glow shadow for the expanded center glossary card
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 15;
      ctx.fillStyle = state.colorMode === 'light' ? 'rgba(238, 237, 232, 0.95)' : 'rgba(14, 14, 16, 0.95)';
      ctx.strokeStyle = values[hoveredIdx].color + '44';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = state.colorMode === 'light' ? '#4b5563' : '#d4d0c8';
      ctx.fill();
    }
    ctx.restore();

    // 7. Write description inside the expanded glossary circle
    if (hoveredIdx !== -1 && centerRadius > 55) {
      const activeVal = values[hoveredIdx];
      ctx.fillStyle = state.colorMode === 'light' ? '#000000' : '#ffffff';
      ctx.font = 'bold 12px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(activeVal.label.toUpperCase(), cx, cy - 22);

      ctx.fillStyle = state.colorMode === 'light' ? '#4b5563' : '#a1a1aa';
      ctx.font = '11px "IBM Plex Sans", sans-serif';
      wrapText(ctx, activeVal.desc, cx, cy + 8, 98, 15);
    }

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
  
  // Dynamic non-linear trajectory chart (Tufte multivariate + integrity)
  drawConflictCurveSvg(val);
}

function drawConflictCurveSvg(val) {
  const svg = qs('#conflictCurveSvg');
  if (!svg) return;

  const W = 500, H = 120;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const pad = { l: 68, r: 25, t: 18, b: 24 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  function px(x) { return pad.l + (x / 100) * pw; }
  function py(y) { return pad.t + ph - (y / 100) * ph; }

  const lens = state.currentLens;
  const activeColor = LENS_DATA[lens].color;

  let points = [];
  let currentY = 50;

  for (let x = 0; x <= 100; x += 2) {
    let y = 50;
    if (lens === 'negativa') {
      y = Math.pow(x / 100, 2.2) * 100;
    } else if (lens === 'capacidades') {
      y = Math.sqrt(x / 100) * 80 + (x > 80 ? (x - 80) * 1.0 : 0);
    } else if (lens === 'positiva') {
      y = Math.sin((x / 100) * Math.PI / 2) * 75;
    } else {
      y = x;
    }
    points.push(`${px(x)},${py(y)}`);
    if (x === Math.round(val / 2) * 2) {
      currentY = y;
    }
  }

  const labelX = isEnglish() ? 'Equality' : 'Igualdad';
  const labelY = isEnglish() ? 'Loss / Cost' : 'Costo / Pérdida';
  const curveLabel = isEnglish()
    ? `${LENS_DATA[lens].name} Curve`
    : `Curva de ${LENS_DATA[lens].name}`;

  const axisColor = '#6b7280';
  const axisStroke = '#4b5563';

  let svgContent = `
    <!-- Axes -->
    <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1"/>
    <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1"/>

    <!-- Axis Labels -->
    <text x="${pad.l - 6}" y="${pad.t - 4}" fill="${axisColor}" font-size="8" font-family="IBM Plex Mono" text-anchor="middle">${labelY}</text>
    <text x="${pad.l + pw}" y="${pad.t + ph + 16}" fill="${axisColor}" font-size="8" font-family="IBM Plex Mono" text-anchor="end">${labelX}</text>

    <!-- Trajectory Curve -->
    <polyline points="${points.join(' ')}" fill="none" stroke="${activeColor}" stroke-width="2"/>

    <!-- Intersection Guide lines -->
    <line x1="${px(val)}" y1="${py(currentY)}" x2="${px(val)}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>
    <line x1="${pad.l}" y1="${py(currentY)}" x2="${px(val)}" y2="${py(currentY)}" stroke="${axisStroke}" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>

    <!-- Current value dot -->
    <circle cx="${px(val)}" cy="${py(currentY)}" r="4.5" fill="#f0ece0" stroke="${activeColor}" stroke-width="2"/>

    <!-- Text annotation -->
    <text x="${px(val) + (val > 65 ? -10 : 10)}" y="${py(currentY) - 8}" fill="${activeColor}" font-size="9" font-family="IBM Plex Mono" font-weight="600" text-anchor="${val > 65 ? 'end' : 'start'}">
      ${val}%: ${Math.round(currentY)}% ${isEnglish() ? 'Loss' : 'Pérdida'}
    </text>

    <!-- Curve indicator label -->
    <text x="${pad.l + 10}" y="${pad.t + 12}" fill="${activeColor}" font-size="9" font-family="IBM Plex Mono" font-weight="600" opacity="0.75">${curveLabel}</text>
  `;

  svg.innerHTML = svgContent;
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
  updatePowerDiagramEdges(state.currentLens);
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
    updatePowerDiagramEdges(state.currentLens);
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
  
  updatePowerDiagramEdges(state.currentLens);
}

function updatePowerDiagramEdges(lens) {
  const edgesGroup = qs('#powerEdges');
  if (!edgesGroup) return;

  // Circle coordinates and radii exactly matched to DOM elements
  const nodes = {
    estado:    { x: 250, y: 80,  r: 36 },
    individuo: { x: 250, y: 210, r: 44 },
    mercado:   { x: 140, y: 320, r: 36 },
    sociedad:  { x: 360, y: 320, r: 36 }
  };

  const connections = [
    { from: 'estado',    to: 'individuo' },
    { from: 'mercado',   to: 'individuo' },
    { from: 'sociedad',  to: 'individuo' },
    { from: 'estado',    to: 'mercado'   },
    { from: 'estado',    to: 'sociedad'  },
    { from: 'mercado',   to: 'sociedad'  }
  ];

  let html = '';

  connections.forEach(conn => {
    const n1 = nodes[conn.from];
    const n2 = nodes[conn.to];

    const dx = n2.x - n1.x;
    const dy = n2.y - n1.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / d;
    const uy = dy / d;

    // Start exactly at boundary of source circle
    const x1 = n1.x + ux * n1.r;
    const y1 = n1.y + uy * n1.r;

    // End exactly at boundary of destination circle, leaving 6px for arrowhead
    const arrowPadding = 6;
    const x2 = n2.x - ux * (n2.r + arrowPadding);
    const y2 = n2.y - uy * (n2.r + arrowPadding);

    let strokeColor = 'var(--clr-border)';
    let strokeWidth = 1.5;
    let dashArray = '';
    let markerId = 'arrowhead';

    const isActive = !state.activePowerNode || 
                     (state.activePowerNode === conn.from) || 
                     (state.activePowerNode === conn.to);

    if (lens === 'negativa') {
      if (conn.from === 'estado' && conn.to === 'individuo') {
        strokeColor = 'var(--clr-neg)';
        strokeWidth = 3;
      } else if (conn.from === 'sociedad' && conn.to === 'individuo') {
        strokeColor = 'rgba(74, 158, 255, 0.4)';
        strokeWidth = 2;
      }
    } else if (lens === 'positiva') {
      if (conn.from === 'estado' && conn.to === 'individuo') {
        strokeColor = 'var(--clr-pos)';
        strokeWidth = 3;
        dashArray = '5,3'; // Represents active positive enablement
      } else if (conn.from === 'sociedad' && conn.to === 'individuo') {
        strokeColor = 'rgba(255, 122, 53, 0.6)';
        strokeWidth = 2.5;
      } else if (conn.from === 'mercado' && conn.to === 'individuo') {
        strokeColor = 'rgba(255, 122, 53, 0.6)';
        strokeWidth = 2.5;
      }
    } else if (lens === 'capacidades') {
      if (conn.from === 'estado' && conn.to === 'individuo') {
        strokeColor = 'var(--clr-cap)';
        strokeWidth = 3;
        dashArray = '6,3'; // Capability-building provision
      } else if (conn.from === 'mercado' && conn.to === 'individuo') {
        strokeColor = 'rgba(61, 190, 138, 0.7)';
        strokeWidth = 3; // Severe capability deprivation
      } else if (conn.from === 'sociedad' && conn.to === 'individuo') {
        strokeColor = 'rgba(61, 190, 138, 0.6)';
        strokeWidth = 2.5;
      }
    } else if (lens === 'libertario') {
      if (conn.from === 'estado' && conn.to === 'individuo') {
        strokeColor = '#e05555'; // Hostile coercion/interference
        strokeWidth = 3;
      } else if (conn.from === 'mercado' && conn.to === 'individuo') {
        strokeColor = 'var(--clr-lib)';
        strokeWidth = 3;
        markerId = 'arrowhead-double'; // Bidirectional voluntary contract
      } else if (conn.from === 'estado' && conn.to === 'mercado') {
        strokeColor = '#e05555';
        strokeWidth = 2;
        dashArray = '3,3';
      }
    }

    const opacity = state.activePowerNode 
      ? (isActive ? 1.0 : 0.25)
      : 0.85;

    html += `
      <line class="power-edge" 
            x1="${x1}" y1="${y1}" 
            x2="${x2}" y2="${y2}" 
            stroke="${strokeColor}" 
            stroke-width="${strokeWidth}" 
            ${dashArray ? `stroke-dasharray="${dashArray}"` : ''} 
            marker-end="url(#${markerId})" 
            opacity="${opacity}" 
            style="transition: stroke 0.35s, stroke-width 0.35s, opacity 0.35s;" />
    `;
  });

  edgesGroup.innerHTML = html;
}

// ═══════════════════════════════════════════════
// SECTION VI — MARKET SVG
// ═══════════════════════════════════════════════

function drawMarketSvg(mode) {
  const svg = qs('#marketSvg');
  const caption = qs('#marketCaption');
  if (!svg) return;
  const locale = getMarketLocale();

  // Layout: wider viewBox, generous right padding so labels never clip
  const W = 620, H = 290;
  const pad = { l: 68, r: 20, t: 44, b: 60 };
  const pw = W - pad.l - pad.r;   // 532 — plot width
  const ph = H - pad.t - pad.b;   // 186 — plot height

  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  function px(q) { return pad.l + (q / 10) * pw; }
  function py(p) { return pad.t + ph - (p / 100) * ph; }

  const priceLabel = isEnglish() ? 'Precio (P)' : 'Precio (P)';
  const quantLabel = isEnglish() ? 'Cantidad (Q)' : 'Cantidad (Q)';

  const axisColor  = '#6b7280';
  const axisStroke = '#4b5563';

  // Tufte Range Frame: axes only extend as far as the actual data range (e.g. from lowest price to highest price represented)
  const minYVal = mode === 'ideal' ? py(90) : py(88);
  const maxYVal = py(10);
  const minXVal = px(0);
  const maxXVal = px(9.0);

  let svgContent = `
    <!-- Axes (Tufte Range Frames - interrupted to show actual data boundaries) -->
    <line x1="${pad.l}" y1="${minYVal}" x2="${pad.l}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1.25"/>
    <line x1="${pad.l}" y1="${pad.t + ph}" x2="${maxXVal}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1.25"/>
    <!-- Axis labels — inside viewBox and floating cleanly -->
    <text x="${pad.l - 8}" y="${pad.t - 10}" fill="${axisColor}" font-size="12" font-family="IBM Plex Mono" text-anchor="middle" font-weight="500">${priceLabel}</text>
    <text x="${pad.l + pw}" y="${pad.t + ph + 22}" fill="${axisColor}" font-size="12" font-family="IBM Plex Mono" text-anchor="end" font-weight="500">${quantLabel}</text>
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

    // Demand label: upper-right area, anchored end so it stays inside
    const dLx = px(9.0), dLy = py(90 - 7 * 9.0) - 8;
    // Supply label: lower-right area
    const sLx = px(9.0), sLy = py(10 + 7 * 9.0) + 18;
    // Equilibrium label: left of the point
    const eLx = px(eq_q) - 10, eLy = py(eq_p) - 10;

    svgContent += `
      <polyline points="${demandPath.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2"/>
      <polyline points="${supplyPath.join(' ')}" fill="none" stroke="#3dbe8a" stroke-width="2"/>
      <!-- Equilibrium dashed guides -->
      <line x1="${px(eq_q)}" y1="${py(eq_p)}" x2="${px(eq_q)}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="0.75" stroke-dasharray="4,3" opacity="0.5"/>
      <line x1="${pad.l}" y1="${py(eq_p)}" x2="${px(eq_q)}" y2="${py(eq_p)}" stroke="${axisStroke}" stroke-width="0.75" stroke-dasharray="4,3" opacity="0.5"/>
      <circle cx="${px(eq_q)}" cy="${py(eq_p)}" r="4.5" fill="#f0ece0" stroke="${axisStroke}" stroke-width="1.5"/>
      <!-- Demand label - cleanly floating text (no border box) -->
      <text x="${dLx - 2}" y="${dLy}" fill="#4a9eff" font-size="11" font-family="IBM Plex Mono" font-weight="600" text-anchor="end">${locale.ideal.demand}</text>
      <!-- Supply label - cleanly floating text -->
      <text x="${sLx + 2}" y="${sLy}" fill="#3dbe8a" font-size="11" font-family="IBM Plex Mono" font-weight="600" text-anchor="start">${locale.ideal.supply}</text>
      <!-- Equilibrium label - cleanly floating text -->
      <text x="${eLx - 2}" y="${eLy}" fill="${axisColor}" font-size="10" font-family="IBM Plex Mono" text-anchor="end">${locale.ideal.equilibrium}</text>
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

    // Split the long note into two lines
    const noteText = locale.real.note;
    const noteMid  = Math.floor(noteText.length / 2);
    const noteBreak = noteText.lastIndexOf(' ', noteMid);
    const noteLine1 = noteText.slice(0, noteBreak);
    const noteLine2 = noteText.slice(noteBreak + 1);

    // Demand label: upper-left of the crossing zone
    const dLx = px(4.5), dLy = py(88 - 5 * 4.5) - 10;
    // Supply label: below the crossing zone, separated vertically
    const sLx = px(5.5), sLy = py(30 + 4 * 5.5) + 22;
    // Ideal supply label: mid-chart, above the dashed line
    const iLx = px(3.5), iLy = py(10 + 7 * 3.5) - 8;

    svgContent += `
      <polyline points="${idealSupplyPath.join(' ')}" fill="none" stroke="#3dbe8a" stroke-width="0.75" stroke-dasharray="5,4" opacity="0.35"/>
      <polyline points="${demandPath.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2"/>
      <polyline points="${supplyPath.join(' ')}" fill="none" stroke="#ff7a35" stroke-width="2"/>
      <!-- Oligopoly label top-left (floating text) -->
      <text x="${pad.l + 12}" y="${pad.t + 19}" fill="#ff7a35" font-size="10" font-family="IBM Plex Mono" font-weight="600">${locale.real.oligopoly}</text>
      <!-- Demand label - cleanly floating text -->
      <text x="${dLx - 2}" y="${dLy}" fill="#4a9eff" font-size="11" font-family="IBM Plex Mono" font-weight="600" text-anchor="end">${locale.real.demand}</text>
      <!-- Supply real label - cleanly floating text -->
      <text x="${sLx + 2}" y="${sLy}" fill="#ff7a35" font-size="11" font-family="IBM Plex Mono" font-weight="600" text-anchor="start">${locale.real.supplyReal}</text>
      <!-- Ideal supply label - cleanly floating text -->
      <text x="${iLx}" y="${iLy}" fill="#3dbe8a" font-size="9" font-family="IBM Plex Mono" opacity="0.6" text-anchor="start">${locale.real.supplyIdeal}</text>
      <!-- Bottom note — two lines -->
      <text fill="${axisColor}" font-size="9" font-family="IBM Plex Mono">
        <tspan x="${pad.l + 5}" y="${H - 22}">${noteLine1}</tspan>
        <tspan x="${pad.l + 5}" dy="13">${noteLine2}</tspan>
      </text>
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
  const activeIds = state.senActiveCaps;

  // Update capability button states
  capabilities.forEach(cap => {
    const btn = qs(`.sen-cap-btn[data-id="${cap.id}"]`);
    if (btn) {
      const active = activeIds.has(cap.id);
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    }
  });

  const badge = qs('#senProfileBadge');
  const desc = qs('#senProfileDesc');
  const radar = qs('#senProfileRadar');
  const caveat = qs('#senFreedomCaveat');

  let badgeText = '';
  let descText = '';

  const hasHealth = activeIds.has('salud');
  const hasEducation = activeIds.has('educacion');
  const hasWork = activeIds.has('trabajo');
  const hasParticipation = activeIds.has('participacion');
  const hasMobility = activeIds.has('movilidad');

  if (activeIds.size === 0) {
    badgeText = isEnglish() ? 'Null Real Freedom' : 'Sin libertad real';
    descText = isEnglish()
      ? 'The individual lacks all basic capabilities. Formal negative liberty might exist, but actual agency is non-existent.'
      : 'El individuo carece de toda capacidad básica. La libertad formal puede existir, pero la agencia real es nula.';
  } else if ((hasHealth || hasEducation) && !hasWork && !hasParticipation) {
    badgeText = isEnglish() ? 'Frustrated Agency' : 'Agencia Frustrada';
    descText = isEnglish()
      ? 'The person is educated or healthy, but has no options for dignified work or civic voice. The capabilities cannot be actualized.'
      : 'La persona posee salud o educación, pero carece de opciones de trabajo digno y de participación cívica. Las capacidades están bloqueadas.';
  } else if ((hasWork || hasMobility) && !hasHealth && !hasEducation) {
    badgeText = isEnglish() ? 'Paternalistic Survival' : 'Supervivencia Paternalista';
    descText = isEnglish()
      ? 'The individual can move and produce economic value, but without health and education, they cannot act as a self-determined agent.'
      : 'El individuo puede moverse y trabajar para producir valor, pero sin salud y educación es incapaz de actuar con autonomía real.';
  } else if (activeIds.size >= 5) {
    badgeText = isEnglish() ? 'Robust Capabilities' : 'Capacidades Robustas';
    descText = isEnglish()
      ? 'A highly developed capabilities profile. The person possesses real, substantial freedoms to lead the life they have reason to value.'
      : 'Un perfil de capacidades altamente desarrollado. La persona cuenta con libertades reales sólidas para habitar el mundo autónomamente.';
  } else {
    badgeText = isEnglish() ? 'Fragmented Freedom' : 'Libertad Fragmentada';
    descText = isEnglish()
      ? 'The profile shows partial capabilities. Some dimensions of functioning are secured, but severe deprivations persist.'
      : 'El perfil muestra capacidades fragmentadas. Algunas dimensiones básicas están cubiertas, pero persisten privaciones graves.';
  }

  if (badge) badge.textContent = badgeText;
  if (desc) desc.textContent = descText;

  // Render minimal profile radar dots
  if (radar) {
    radar.innerHTML = capabilities.map(cap => {
      const active = activeIds.has(cap.id);
      const dotColor = active ? 'var(--clr-cap)' : 'var(--clr-border)';
      const opacity = active ? '1' : '0.4';
      return `
        <div class="sen-radar-item" style="opacity:${opacity}">
          <span class="sen-radar-dot" style="background-color:${dotColor}"></span>
          <span class="sen-radar-name">${cap.name}</span>
        </div>
      `;
    }).join('');
  }

  if (caveat) {
    caveat.textContent = isEnglish()
      ? 'Note: These qualitative profiles reflect Sen\'s insistence that capabilities cannot be aggregated into a single numeric average.'
      : 'Nota: Estos perfiles cualitativos reflejan la insistencia de Sen en que las capacidades no deben promediarse en un índice lineal.';
  }
}

function initSenCapacidades() {
  renderSenCapabilities();
}

// ═══════════════════════════════════════════════
// SECTION VIII — COLOMBIA DASHBOARD
// ═══════════════════════════════════════════════

function updateColombiaCoachBanner() {
  const banner = qs('#colombiaCoachBanner');
  const text = qs('#colombiaCoachBannerText');
  if (!banner) return;

  let seen = false;
  try {
    seen = localStorage.getItem('site-colombia-tap-seen') === 'true';
  } catch (e) {
    console.warn('LocalStorage is not available:', e);
  }

  if (seen) {
    banner.hidden = true;
    return;
  }

  if (text) {
    text.textContent = isEnglish()
      ? 'First time here? Tap any column in the table to instantly switch the theoretical framework.'
      : '¿Primera vez aquí? Toca cualquier columna de la tabla para cambiar de marco teórico e interpretar el país.';
  }

  banner.hidden = false;
}

function initColombiaCoachBanner() {
  const banner = qs('#colombiaCoachBanner');
  const closeBtn = qs('#colombiaCoachBannerClose');
  if (!banner) return;

  closeBtn?.addEventListener('click', () => {
    try {
      localStorage.setItem('site-colombia-tap-seen', 'true');
    } catch (e) {
      console.warn('LocalStorage is not available:', e);
    }
    banner.hidden = true;
  });

  updateColombiaCoachBanner();
}

function updateColombiaDashboard() {
  const table = qs('#colombiaTable');
  const reading = qs('#colombiaLensReading');
  const subtitle = qs('#colombia-subtitle-indices');
  if (!table) return;

  const lens = state.currentLens;
  const content = getColombiaContent();

  // Dynamic Title: "Colombia bajo {N} índices" / "Colombia under {N} indices"
  const indicatorsCount = COLOMBIA_DATA.indicators.length;
  if (subtitle) {
    subtitle.innerHTML = isEnglish()
      ? `under ${indicatorsCount} indices`
      : `bajo ${indicatorsCount} índices`;
  }

  const headers = isEnglish()
    ? ['Indicator / Index', 'Negative Liberty', 'Positive Liberty', 'Capabilities', 'Economic-Libertarian']
    : ['Indicador / Índice', 'Libertad Negativa', 'Libertad Positiva', 'Capacidades', 'Económico-Libertario'];

  // Map rows dynamically merging local numerical facts with translation data
  const rows = COLOMBIA_DATA.indicators.map(ind => {
    const trans = isEnglish()
      ? content.indicators.find(ti => ti.id === ind.id)
      : null;

    let formattedVal = ind.value;
    if (ind.id === 'hdi') {
      formattedVal = ind.value + ' (0-1)';
    } else {
      formattedVal = ind.value + ' / 100';
    }

    return {
      id: ind.id,
      name: trans ? trans.name : ind.name,
      value: formattedVal,
      evaluations: trans ? trans.evaluations : ind.evaluations
    };
  });

  const columnsKeys = ['negativa', 'positiva', 'capacidades', 'libertario'];

  let html = `
    <thead>
      <tr>
        <th>${headers[0]}</th>
        ${columnsKeys.map((colKey, i) => {
          const isActive = colKey === lens;
          const activeClass = isActive ? 'class="active-column-header"' : '';
          const label = isEnglish()
            ? `Switch to ${headers[i+1]} framework`
            : `Cambiar a marco ${headers[i+1]}`;

          return `<th ${activeClass} 
                      data-lens="${colKey}" 
                      role="button" 
                      tabindex="0" 
                      aria-label="${label}" 
                      aria-selected="${isActive ? 'true' : 'false'}">${headers[i+1]}</th>`;
        }).join('')}
      </tr>
    </thead>
    <tbody>
  `;

  rows.forEach(row => {
    html += `
      <tr>
        <td class="table-indicator-name">
          <strong>${row.name}</strong>
          <span class="table-indicator-val">${row.value}</span>
        </td>
        ${columnsKeys.map((colKey, i) => {
          const isActive = colKey === lens;
          const activeClass = isActive ? 'class="active-column-cell"' : '';
          const label = isEnglish()
            ? `Interpret indicator under ${headers[i+1]}`
            : `Interpretar indicador bajo marco ${headers[i+1]}`;

          return `<td ${activeClass} 
                      data-lens="${colKey}" 
                      role="button" 
                      tabindex="0" 
                      aria-label="${label}">${row.evaluations[colKey]}</td>`;
        }).join('')}
      </tr>
    `;
  });

  html += `</tbody>`;
  table.innerHTML = html;

  // Add keyboard and click event listeners for each interactive column element
  qsa('th[data-lens], td[data-lens]', table).forEach(el => {
    const triggerAction = () => {
      // Mark coach guide as seen
      try {
        localStorage.setItem('site-colombia-tap-seen', 'true');
      } catch (e) {
        console.warn('LocalStorage is not available:', e);
      }
      const banner = qs('#colombiaCoachBanner');
      if (banner) banner.hidden = true;

      setLens(el.dataset.lens);
    };

    el.addEventListener('click', triggerAction);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerAction();
      }
    });
  });

  if (reading) {
    reading.textContent = content.readings[lens] || '';
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

  // Draw visual curves illustrating value monism vs pluralism
  drawSystemCurveSvg(state.systemMode);
}

function drawSystemCurveSvg(mode) {
  const svg = qs('#systemCurveSvg');
  if (!svg) return;

  const W = 500, H = 120;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const pad = { l: 50, r: 50, t: 20, b: 20 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  const axisStroke = '#4b5563';
  const axisColor = '#6b7280';

  let svgContent = `
    <!-- Axes -->
    <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1" opacity="0.25"/>
    <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="${axisStroke}" stroke-width="1" opacity="0.4"/>
  `;

  // Helper to calculate bell curve points
  function getBellPoints(mean, stdDev, amp) {
    const pts = [];
    for (let x = 0; x <= 100; x += 2) {
      const exponent = -Math.pow((x - mean) / stdDev, 2) / 2;
      const y = amp * Math.exp(exponent);
      pts.push(`${pad.l + (x / 100) * pw},${pad.t + ph - (y / 100) * ph}`);
    }
    return pts.join(' ');
  }

  if (mode === 'closed') {
    // Single isolated high peak representing Value Monism
    const points = getBellPoints(50, 9, 85);
    const label = isEnglish() ? 'Supreme Value (Monism)' : 'Valor Supremo (Monismo)';
    svgContent += `
      <polyline points="${points}" fill="none" stroke="var(--clr-accent)" stroke-width="2.5"/>
      <text x="${pad.l + pw/2}" y="${pad.t + 10}" fill="var(--clr-accent)" font-size="10" font-family="IBM Plex Mono" font-weight="600" text-anchor="middle">${label}</text>
    `;
  } else {
    // Three colliding/overlapping bell curves representing Value Pluralism
    const p1 = getBellPoints(28, 12, 60);
    const p2 = getBellPoints(50, 12, 65);
    const p3 = getBellPoints(72, 12, 60);

    const l1 = isEnglish() ? 'Equality' : 'Igualdad';
    const l2 = isEnglish() ? 'Liberty' : 'Libertad';
    const l3 = isEnglish() ? 'Security' : 'Seguridad';

    svgContent += `
      <polyline points="${p1}" fill="none" stroke="var(--clr-cap)" stroke-width="2" opacity="0.8"/>
      <polyline points="${p2}" fill="none" stroke="var(--clr-neg)" stroke-width="2" opacity="0.8"/>
      <polyline points="${p3}" fill="none" stroke="var(--clr-pos)" stroke-width="2" opacity="0.8"/>

      <text x="${pad.l + (28/100)*pw}" y="${pad.t + ph - (60/100)*ph - 8}" fill="var(--clr-cap)" font-size="9" font-family="IBM Plex Mono" font-weight="500" text-anchor="middle">${l1}</text>
      <text x="${pad.l + (50/100)*pw}" y="${pad.t + ph - (65/100)*ph - 8}" fill="var(--clr-neg)" font-size="9" font-family="IBM Plex Mono" font-weight="500" text-anchor="middle">${l2}</text>
      <text x="${pad.l + (72/100)*pw}" y="${pad.t + ph - (60/100)*ph - 8}" fill="var(--clr-pos)" font-size="9" font-family="IBM Plex Mono" font-weight="500" text-anchor="middle">${l3}</text>
    `;
  }

  svg.innerHTML = svgContent;
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
  initColombiaCoachBanner();
  initLensGuidance();
  initOnboarding();
  initFadeIn();

  // Set initial interpretations
  setLens(initialLens);
  setLanguage(state.currentLanguage, { persist: false });

  console.log('Anatomía de la Libertad — iniciada.');
  console.log('Marco actual:', state.currentLens);
});
