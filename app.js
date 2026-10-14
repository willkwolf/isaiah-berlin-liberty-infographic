/**
 * ANATOMÍA DE LA LIBERTAD — app.js
 * SPA estática sobre marcos teóricos de la libertad política
 * Berlin, Sen, Hayek/Friedman — sin resolver la tensión.
 */

'use strict';

// Feature F1: Manual scroll restoration & deterministic top landing
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  try {
    history.scrollRestoration = 'manual';
  } catch (_) {}
}

function resetScrollToTop() {
  if (typeof window !== 'undefined' && window.location && !window.location.hash) {
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch (_) {
        window.scrollTo(0, 0);
      }
    }
  }
}

resetScrollToTop();

// Feature F12: Declare mobile tokens and safe-area insets in DOM stylesheet
function initMobileTokens() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('mobile-safe-area-tokens')) {
    const style = document.createElement('style');
    style.id = 'mobile-safe-area-tokens';
    style.textContent = `
      @media (max-width: 768px) {
        :root {
          --safe-area-inset-top: env(safe-area-inset-top, 0px);
          --safe-area-inset-right: env(safe-area-inset-right, 0px);
          --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
          --safe-area-inset-left: env(safe-area-inset-left, 0px);
        }
      }
    `;
    const target = document.head || document.documentElement;
    if (target) {
      target.appendChild(style);
    }
  }
}

initMobileTokens();

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
      genealogia: 'Desde este marco, la genealogía del poder es la historia del esfuerzo por arrancar al poder político cotas inviolables de no-interferencia. Ninguna justificación sagrada, imperial o colectivista excusa la coerción arbitraria. El constitucionalismo y la dispersión del poder son valiosos no porque redistribuyan riqueza, sino porque limitan al soberano.',
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
      genealogia: 'Este recorrido demuestra que la libertad no es un estado natural de no-interferencia, sino una conquista institucional. La educación pública, los derechos laborales y el Estado social no disminuyen la libertad: la crean al emancipar a los ciudadanos de la servidumbre feudal o la dependencia económica privada.',
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
      genealogia: 'Las instituciones deben juzgarse por qué capacidades sustantivas habilitan o truncan en la práctica cotidiana. Un orden imperial destruye agencia por extracción violenta; un mercado desregulado puede destruirla por insolvencia y desnutrición. La legitimación formal importa menos que la vida real de las personas.',
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
      genealogia: 'La lección histórica es meridiana: el poder concentrado engendra tiranía independientemente de sus buenas intenciones declaradas. Solo la división estricta del monopolio estatal, el imperio de la ley y el respeto irrestricto a los derechos de propiedad descentralizados permiten coordinar pacíficamente sociedades complejas.',
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
  { id: 'salud',       icon: '◈', name: 'Salud',          weight: 20, desc: 'Vivir una vida de duración normal, sin enfermedad prevenible.' },
  { id: 'educacion',   icon: '◈', name: 'Educación',      weight: 18, desc: 'Leer, razonar, participar en la vida cívica y cultural.' },
  { id: 'movilidad',   icon: '◈', name: 'Movilidad',      weight: 12, desc: 'Moverse libremente en el espacio físico y geográfico.' },
  { id: 'participacion',icon:'◈', name: 'Participación',  weight: 14, desc: 'Participar en decisiones políticas que afectan tu vida.' },
  { id: 'trabajo',     icon: '◈', name: 'Trabajo digno',  weight: 16, desc: 'Trabajar en condiciones humanas, sin explotación.' },
  { id: 'afiliacion',  icon: '◈', name: 'Afiliación',     weight: 12, desc: 'Vivir con y para otros, sin humillación ni discriminación.' },
  { id: 'juego',       icon: '◈', name: 'Juego / Cultura', weight: 8, desc: 'Reír, jugar, participar en la vida recreativa y cultural.' },
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
    warning: 'Esta estructura lógica ha sostenido proyectos históricos diversos bajo la bandera de dogmas absolutos, sean de planificación colectiva, pureza teocrática o visiones absolutistas de mercado. El contenido varía. La forma de demandar conformidad total es la misma.'
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

// Casos de estudio para el Laboratorio de Fronteras (Sección V)
const LIMITS_LAB_CASES = [
  {
    id: 'pasaje',
    title: 'Pasaje de autobús',
    scenario: 'Un ciudadano de bajos recursos en Bogotá no puede pagar el pasaje de autobús para ir a trabajar.',
    analysis: {
      berlin: {
        verdict: 'INCAPACIDAD',
        class: 'neutral',
        desc: 'No hay un agente humano específico impidiéndole subir de forma deliberada. Por ende, no es coacción directa ni falta de libertad política. Es una restricción de recursos materiales.'
      },
      sen: {
        verdict: 'PRIVACIÓN DE LIBERTAD',
        class: 'alert',
        desc: 'Es una falta de libertad efectiva. La imposibilidad de moverse libremente para trabajar anula una capacidad básica. La distinción sobre "quién tiene la culpa" es secundaria ante la pérdida de agencia.'
      },
      hayek: {
        verdict: 'ESCASEZ NATURAL',
        class: 'neutral',
        desc: 'Es un problema de escasez y falta de recursos económicos, no de coacción. El mercado libre, si no es distorsionado, es la mejor vía para generar los ingresos que permitan pagarlo.'
      }
    }
  },
  {
    id: 'domingo',
    title: 'Cierre dominical',
    scenario: 'Una ley prohíbe por motivos regulatorios abrir establecimientos comerciales los días domingos.',
    analysis: {
      berlin: {
        verdict: 'COERCIÓN DIRECTA',
        class: 'alert',
        desc: 'Es coacción política real y explícita. El Estado utiliza la amenaza de sanción legal para interferir directamente con la decisión voluntaria de comerciar del individuo.'
      },
      sen: {
        verdict: 'RESTRICCIÓN DE AGENCIA',
        class: 'alert',
        desc: 'Representa una limitación en la capacidad de decidir libremente los tiempos de trabajo y desarrollo cultural, aunque el impacto total en capacidades básicas sea menor.'
      },
      hayek: {
        verdict: 'COERCIÓN ESTATAL',
        class: 'alert',
        desc: 'Coerción estatal arbitraria que deforma el orden espontáneo del mercado. Destruye la libertad de comercio y la autonomía contractual de los ciudadanos.'
      }
    }
  },
  {
    id: 'licencia',
    title: 'Licencia costosa',
    scenario: 'El Estado fija mediante regulación un costo de un millón de dólares para la licencia de espectro radioeléctrico.',
    analysis: {
      berlin: {
        verdict: 'COERCIÓN ESTATAL',
        class: 'alert',
        desc: 'Es coacción directa sobre quienes quieren emitir pero no pueden debido a la barrera artificial impuesta deliberadamente por el Estado.'
      },
      sen: {
        verdict: 'BARRERA DE PARTICIPACIÓN',
        class: 'alert',
        desc: 'Privación de la capacidad de participación pública, expresión y comunicación cívica para sectores que no disponen de gran capital.'
      },
      hayek: {
        verdict: 'COERCIÓN / BARRERA',
        class: 'alert',
        desc: 'Es un privilegio monopólico creado por ley que restringe la libre competencia y coarta el ingreso de nuevos competidores al mercado.'
      }
    }
  },
  {
    id: 'rampa',
    title: 'Falta de rampas',
    scenario: 'Una persona en silla de ruedas no puede ingresar a una alcaldía municipal porque el edificio carece de rampas de acceso.',
    analysis: {
      berlin: {
        verdict: 'INCAPACIDAD FISICA',
        class: 'neutral',
        desc: 'Aunque es un hecho social lamentable, desde la libertad negativa pura es una incapacidad física o técnica del sujeto, no un acto de coacción intencional humana.'
      },
      sen: {
        verdict: 'PRIVACIÓN DE AGENCIA',
        class: 'alert',
        desc: 'Es una violación de la libertad real. La falta de infraestructura adaptada anula la capacidad básica de movilidad y de interactuar con las instituciones cívicas sin humillación.'
      },
      hayek: {
        verdict: 'FALTA DE INFRAESTRUCTURA',
        class: 'neutral',
        desc: 'Es una deficiencia en la provisión de bienes públicos por parte del municipio, pero no califica como coacción al individuo si no hay una ley que le prohíba el ingreso.'
      }
    }
  }
];

// ═══════════════════════════════════════════════
// GENEALOGÍA DEL PODER — MATRIZ CARTESIANA Y ARQUITECTURAS
// ═══════════════════════════════════════════════

const GENEALOGIA_CATEGORIES = [
  {
    id: 'monismo_hegemonico',
    alias: 'monismo_hegemonico',
    tag: '1',
    badge: 'Monismo Hegemónico',
    theme: 'amber',
    badgeClass: 'badge--amber',
    title: 'Monistas hegemónicos',
    subtitle: 'Dominio institucional consolidado y soberanía unificada',
    summary: 'Concepciones que subordinan toda discrepancia a una sola instancia rectora o fin supremo (corona, fe revelada, razón de Estado). Concentran la autoridad para garantizar certidumbre y orden indivisible.',
    powerMechanism: 'Monopolio coercitivo, aparato burocrático centralizado, leva militar forzosa y codificación dogmática de la ley sin consentimiento estamental.',
    coercionForm: 'Subordinación penal obligatoria, proscripción de herejías o deslealtades, y absorción jerárquica de las jurisdicciones locales bajo el centro de mando.',
    tradeoffs: 'Maximiza estabilidad territorial, predictibilidad y movilización colectiva; a costa de anular la autonomía individual, suprimir el pluralismo ético y subordinar a poblaciones periféricas.',
    caveat: 'La hegemonía no es eterna ni universal: imperios que fueron hegemónicos sufrieron fragmentación y declive; su posición depende estrictamente del periodo y el espacio geopolítico.',
    traditions: ['imperio_tributario', 'teocracia', 'monarquia', 'califato', 'confucianismo', 'nacionalismo_autoritario']
  },
  {
    id: 'pluralismo_hegemonico',
    alias: 'pluralismo_consolidado',
    tag: '2',
    badge: 'Pluralismo Hegemónico',
    theme: 'blue',
    badgeClass: 'badge--blue',
    title: 'Pluralistas hegemónicos',
    subtitle: 'Institucionalización de contrapesos, derechos y división de poderes',
    summary: 'Tradiciones consolidadas que asumen la irreductibilidad de valores incompatibles y distribuyen la autoridad entre jurisdicciones autónomas, tribunales independientes y cartas constitucionales.',
    powerMechanism: 'Imperio de la ley, frenos y contrapesos constitucionales, elecciones periódicas, judicatura independiente y representación deliberativa.',
    coercionForm: 'Coerción tasada por reglas de debido proceso y control judicial mutuo; sin embargo, puede excluir de facto a sectores marginados o ser capturada por élites consolidadas.',
    tradeoffs: 'Maximiza garantías frente a la tiranía, protección de minorías reconocidas y espacios de no-interferencia; a costa de lentitud decisional, parálisis legislativa y posibles bloqueos corporativos.',
    caveat: 'El pluralismo institucionalizado corre el riesgo constante de degradarse hacia oligarquías cerradas si los contrapesos pierden vitalidad cívica y deliberativa.',
    traditions: ['republicanismo', 'liberalismo', 'democracia_constitucional', 'federalismo', 'ciudad_estado', 'tradiciones_feudales']
  },
  {
    id: 'monismo_emergente',
    alias: 'monismo_marginal',
    tag: '3',
    badge: 'Monismo Emergente',
    theme: 'crimson',
    badgeClass: 'badge--crimson',
    title: 'Monistas emergentes',
    subtitle: 'Corrientes contestatarias, vanguardias radicales o en ruptura',
    summary: 'Vanguardias revolucionarias, nacionalismos radicales o teocracias insurgentes que impugnan el orden vigente en nombre de una verdad definitiva, rechazando el compromiso pluralista como debilidad.',
    powerMechanism: 'Disciplina conspirativa o de partido único, movilización de masas, propaganda redentora y pretensión de encarnar la voluntad auténtica del «pueblo» o la «historia».',
    coercionForm: 'Coerción interna vertical e implacable contra la desviación ideológica; combate abierto contra el pluralismo institucional al que califica de farsa burguesa o decadente.',
    tradeoffs: 'Maximiza cohesión combativa, audacia estratégica y horizonte de transformación radical; a costa de suprimir la disidencia interna y sentar las bases para nuevas autocracias de Estado.',
    caveat: 'Una vanguardia insurgente que triunfa se transforma a menudo en monismo hegemónico autoritario (como se constató repetidamente en las revoluciones del siglo XX).',
    traditions: ['fascismo', 'marxismo_leninismo', 'teocracia_radical', 'conservadurismo_autoritario', 'nacionalismo_etnico']
  },
  {
    id: 'pluralismo_emergente',
    alias: 'pluralismo_emergente',
    tag: '4',
    badge: 'Pluralismo Emergente',
    theme: 'emerald',
    badgeClass: 'badge--emerald',
    title: 'Pluralistas emergentes',
    subtitle: 'Autonomías comunitarias, bienes comunes y diversidad desde abajo',
    summary: 'Movimientos que defienden la coexistencia horizontal y descentralizada de proyectos de vida autónomos sin recurrir al monopolio coactivo del Estado (bienes comunes, feminismo interseccional, autogobierno indígena).',
    powerMechanism: 'Asambleas de base, mandatos revocables, pactos federativos voluntarios, acción comunitaria directa y cogestión horizontal de recursos compartidos.',
    coercionForm: 'Sanción social comunitaria y límites consensuados, careciendo de aparato punitivo profesional; alta vulnerabilidad ante la coacción estatal o corporativa.',
    tradeoffs: 'Maximiza autonomía participativa, inclusión interseccional y resistencia a la concentración jerárquica; a costa de dificultades de escala y fragilidad defensiva ante agresiones externas.',
    caveat: 'Estas corrientes operan predominantemente en los márgenes de la estatalidad; su estabilidad depende fuertemente de la cohesión comunitaria y la presión del entorno.',
    traditions: ['anarquismo', 'feminismo_interseccional', 'ecologismo_radical', 'multiculturalismo', 'movimientos_indigenas', 'comunalismo']
  }
];

const GENEALOGIA_QUADRANTS = {
  monismo_hegemonico: GENEALOGIA_CATEGORIES[0],
  monismo_marginal: GENEALOGIA_CATEGORIES[2],
  pluralismo_consolidado: GENEALOGIA_CATEGORIES[1],
  pluralismo_emergente: GENEALOGIA_CATEGORIES[3]
};

const GENEALOGIA_ARCHITECTURES = [
  // ── Q1: DOMINIO UNIFORME (Monismo hegemónico) ──────────────────────────────────
  {
    id: 'imperio_tributario',
    quadrantId: 'monismo_hegemonico',
    quadrantLabel: 'Dominio Uniforme · Monismo hegemónico',
    name: 'Imperio tributario',
    period: 'Antigüedad a Imperios Modernos (Roma, Persia, Han, Otomanos)',
    context: 'Grandes espacios multiétnicos cohesionados por dinastías palaciegas y extracción fiscal metropolitana.',
    authority: 'Monarquía dinástica centralizada, burocracia palaciega y aristocracia armada.',
    mechanism: 'Tributo fiscal obligatorio, leva militar forzosa, monopolio punitivo y subordinación provincial.',
    justification: 'Paz universal (Pax Romana/Augusta), orden cósmico sagrado y protección frente a la barbarie exterior.',
    gainers: 'Corte metropolitana, recaudadores de rentas imperiales y nobleza armada central.',
    costBearers: 'Poblaciones campesinas tributarias, provincias periféricas conquistadas y siervos o esclavos.',
    counterweights: 'Insurrecciones provinciales, fragmentación por distancia geográfica y límites logísticos de coacción.',
    lensReading: 'Berlin advertiría que la paz imperial sacrifica por completo la libertad negativa individual. Para Sen, la extracción tributaria forzosa anula las capacidades básicas del campesinado periférico.',
    reference: 'Tilly, C. (1990). Coercion, Capital, and European States; Burbank & Cooper (2010). Empires in World History.'
  },
  {
    id: 'teocracia',
    quadrantId: 'monismo_hegemonico',
    quadrantLabel: 'Dominio Uniforme · Monismo hegemónico',
    name: 'Teocracia',
    period: 'Estados sacerdotales antiguos, Califatos, Papado medieval, Ginebra calvinista',
    context: 'Órdenes políticos donde la verdad revelada y el dogma constituyen la fuente suprema de validez legal.',
    authority: 'Jerarquías eclesiásticas, ulemas, papado o gobernantes investidos de soberanía divina.',
    mechanism: 'Ley canónica o sharía obligatoria, interdicción de herejías, censura dogmática e inquisición penal.',
    justification: 'Salvación colectiva del alma, preservación de la ortodoxia y concordancia con la ley divina trascendente.',
    gainers: 'Casta sacerdotal, teólogos oficiales y gobernantes legitimados como guardianes de la fe.',
    costBearers: 'Disidentes doctrinales, minorías religiosas, librepensadores y mujeres bajo códigos patriarcales.',
    counterweights: 'Cismas doctrinales, revueltas heréticas populares y fricción entre poderes temporales y espirituales.',
    lensReading: 'Ejemplo arquetípico del «yo superior» advertido por Berlin: la coacción se justifica falazmente como salvación del alma del coaccionado.',
    reference: 'Berman, H. J. (1983). Law and Revolution; Weber, M. (1922). Economía y sociedad.'
  },
  {
    id: 'monarquia',
    quadrantId: 'monismo_hegemonico',
    quadrantLabel: 'Dominio Uniforme · Monismo hegemónico',
    name: 'Monarquía',
    period: 'Siglos XVI a XVIII (Monarquías absolutistas europeas: Francia, España, Prusia)',
    context: 'Centralización de la soberanía indivisible en la Corona para superar la fragmentación feudal y religiosa.',
    authority: 'Monarca soberano por derecho divino con prerrogativa de legislar sin consentimiento estamental.',
    mechanism: 'Cartas de sello reales, ejército permanente, monopolio fiscal y subordinación de tribunales locales.',
    justification: 'Razón de Estado, superación de la guerra civil de todos contra todos (Hobbes) y orden indivisible.',
    gainers: 'La Corona, nobleza cortesana y aparato burocrático unificado del Estado naciente.',
    costBearers: 'Campesinado pechero, burguesía mercantil carente de representación y regiones forales despojadas.',
    counterweights: 'Parlamentos judiciales con derecho de reconvención, crisis de deuda fiscal y rebeliones antifiscales.',
    lensReading: 'La no-interferencia privada está sujeta a la voluntad arbitraria del soberano; ausencia radical de libertad política en sentido liberal.',
    reference: 'Bodin, J. (1576). Les Six Livres de la République; Anderson, P. (1974). Lineages of the Absolutist State.'
  },
  {
    id: 'califato',
    quadrantId: 'monismo_hegemonico',
    quadrantLabel: 'Dominio Uniforme · Monismo hegemónico',
    name: 'Califato histórico',
    period: 'Califatos Rashidun, Omeya, Abasí y Otomano (Siglos VII a XX)',
    context: 'Espacio imperial transcontinental gobernado bajo la premisa de la indivisibilidad de la comunidad islámica.',
    authority: 'Califa como sucesor político del Profeta y protector de la fe, auxiliado por visires y cadíes.',
    mechanism: 'Pacto de dhimma con tributo especial (jizya) para minorías confesionales y ley religiosa unificada.',
    justification: 'Aplicación de la justicia divina en la tierra, defensa militar de la umma y paz confesional regulada.',
    gainers: 'Élite patricia musulmana, juristas de las escuelas legales y mercaderes metropolitanos.',
    costBearers: 'Poblaciones tributarias no musulmanas, esclavos y corrientes teológicas consideradas heréticas.',
    counterweights: 'Autonomía de las escuelas jurídicas (madhabs), rebeliones tribales y límites territoriales de comunicación.',
    lensReading: 'Coexistencia reglamentada con subordinación civil: tolerancia condicional que no equivale a igualdad de derechos ni libertad republicana.',
    reference: 'Crone, P. (2004). God\'s Rule: Government and Islam; Hourani, A. (1991). A History of the Arab Peoples.'
  },
  {
    id: 'confucianismo',
    quadrantId: 'monismo_hegemonico',
    quadrantLabel: 'Dominio Uniforme · Monismo hegemónico',
    name: 'Confucianismo imperial',
    period: 'Dinastías Han a Qing (China, 206 a.C. - 1912)',
    context: 'Imperio burocrático de letrados organizado sobre la ética del deber moral jerárquico y la armonía cósmica.',
    authority: 'Emperador («Hijo del Cielo») secundado por mandarines letrados seleccionados por examen meritocrático.',
    mechanism: 'Código penal confuciano, examen imperial obligatorio, piedad filial coercitiva y vigilancia vecinal.',
    justification: 'Mandato del Cielo (Tianming), armonía cósmica y preservación de la benevolencia ritual (ren/li).',
    gainers: 'Burocracia letrada de mandarines (shi), clanes terratenientes y la dinastía reinante.',
    costBearers: 'Campesinado sujeto a corveas, comerciantes moralmente estigmatizados y mujeres enclaustradas.',
    counterweights: 'Doctrina de pérdida del Mandato del Cielo ante hambrunas o catástrofes, memoriales de censura oficial.',
    lensReading: 'Monismo moral perfecto: no se concibe la autonomía individual fuera de la armonía colectiva asignada por la jerarquía cósmica.',
    reference: 'Fairbank, J. K. (1992). China: A New History; Schwartz, B. (1985). The World of Thought in Ancient China.'
  },
  {
    id: 'nacionalismo_autoritario',
    quadrantId: 'monismo_hegemonico',
    quadrantLabel: 'Dominio Uniforme · Monismo hegemónico',
    name: 'Nacionalismo autoritario',
    period: 'Siglos XIX y XX (Régimen de Bismarck, Estado Novo en Portugal, dictaduras militares)',
    context: 'Modernización conservadora que unifica el aparato estatal subordinando el pluralismo social al poder militar.',
    authority: 'Ejecutivo centralizado autocrático respaldado por el ejército regular y oligarquías industriales.',
    mechanism: 'Censura de prensa, proscripción selectiva de sindicatos obreros, estados de excepción y policía política.',
    justification: 'Unidad nacional orgánica, estabilidad frente a la anarquía partisana y grandeza geopolítica.',
    gainers: 'Élite militar, burocracia estatal y grandes corporaciones protegidas del conflicto laboral.',
    costBearers: 'Movimientos sindicales, minorías culturales no asimiladas y oposición parlamentaria democrática.',
    counterweights: 'Huelgas laborales espontáneas, fracturas internas castrenses y presiones diplomáticas foráneas.',
    lensReading: 'El Estado absorbe la lealtad cívica reduciendo la libertad negativa a concesiones discrecionales del poder.',
    reference: 'Linz, J. J. (2000). Totalitarian and Authoritarian Regimes; Gellner, E. (1983). Nations and Nationalism.'
  },

  // ── Q2: AUTORIDAD CENTRALIZADA (Monismo marginal o declinante) ──────────────────
  {
    id: 'fascismo',
    quadrantId: 'monismo_marginal',
    quadrantLabel: 'Autoridad Centralizada · Monismo marginal o declinante',
    name: 'Fascismo',
    period: 'Periodo de entreguerras (Italia 1922-1943, Nacionalsocialismo alemán 1933-1945)',
    context: 'Movilización totalitaria de masas impulsada por un partido paramilitar que destruye el Estado de derecho.',
    authority: 'Caudillo carismático infalible (Duce/Führer) y partido único con vocación de control social absoluto.',
    mechanism: 'Terror paramilitar, policía secreta (Gestapo/OVRA), campos de internamiento y corporativismo obligatorio.',
    justification: 'Renacimiento mítico de la nación (palingenesia), pureza biológica racial y primacía total del Estado.',
    gainers: 'Cúpula partidista, oficiales de seguridad y consorcios industriales bélicos cartelizados.',
    costBearers: 'Minorías perseguidas, disidentes políticos, sindicatos libres y ciudadanía privada de toda privacidad.',
    counterweights: 'Inexistentes en el orden legal interno; únicamente derrotas bélicas o sabotaje clandestino.',
    lensReading: 'El clímax del monismo destructivo: aniquilación radical tanto de la libertad negativa como de cualquier capacidad real autónoma.',
    reference: 'Paxton, R. O. (2004). The Anatomy of Fascism; Arendt, H. (1951). The Origins of Totalitarianism.'
  },
  {
    id: 'marxismo_leninismo',
    quadrantId: 'monismo_marginal',
    quadrantLabel: 'Autoridad Centralizada · Monismo marginal o declinante',
    name: 'Marxismo-leninismo',
    period: 'Siglo XX (URSS 1917-1991, Bloque Oriental, China maoísta)',
    context: 'Vanguardia revolucionaria que fusiona el Estado y la economía para forzar la transición histórica al comunismo.',
    authority: 'Partido comunista de vanguardia, comité central y burocracia planificadora centralizada (Gosplán).',
    mechanism: 'Planificación económica imperativa, colectivización forzosa, censura ideológica absoluta y purgas penales.',
    justification: 'Dictadura del proletariado, erradicación de la explotación de clase y construcción del Hombre Nuevo.',
    gainers: 'Nomenclatura partidista, cuadros técnicos leales y obreros con movilidad en el aparato burocrático.',
    costBearers: 'Campesinado desposeído, disidentes intelectuales, creyentes religiosos y clases propietarias expropiadas.',
    counterweights: 'Economía sumergida informal (mercado negro), resistencia pasiva laboral y faccionalismo burocrático.',
    lensReading: 'Berlin dedicó gran parte de su obra a alertar cómo la promesa de emancipación positiva degenera en la tiranía del partido que sabe lo que al obrero le «conviene».',
    reference: 'Berlin, I. (1969). Four Essays on Liberty; Fitzpatrick, S. (1999). Everyday Stalinism.'
  },
  {
    id: 'teocracia_radical',
    quadrantId: 'monismo_marginal',
    quadrantLabel: 'Autoridad Centralizada · Monismo marginal o declinante',
    name: 'Teocracia radical',
    period: 'Fines del siglo XX a la actualidad (República Islámica de Irán, Emirato Talibán)',
    context: 'Regímenes contemporáneos que colocan la interpretación clerical ultraconservadora por encima de la soberanía popular.',
    authority: 'Líder supremo clerical o consejo de ulemas armados con poder de veto sobre cualquier institución electa.',
    mechanism: 'Policía de costumbres morales, veto a candidaturas por pureza religiosa, tribunales revolucionarios y censura.',
    justification: 'Soberanía de Dios sobre la soberanía humana, purificación cultural contra Occidente y virtud obligatoria.',
    gainers: 'Clero gobernante, milicias de custodia moral y fundaciones religiosas exentas de control público.',
    costBearers: 'Mujeres despojadas de autonomía corporal, minorías religiosas, juventudes disidentes y sectores laicos.',
    counterweights: 'Masivas protestas populares en las calles, huelgas sectoriales y desobediencia civil cotidiana.',
    lensReading: 'La coerción moral invasiva suprime la esfera de privacidad individual que para Berlin define la esencia de la libertad civil.',
    reference: 'Arjomand, S. A. (1988). The Turban for the Crown; Roy, O. (1994). The Failure of Political Islam.'
  },
  {
    id: 'conservadurismo_autoritario',
    quadrantId: 'monismo_marginal',
    quadrantLabel: 'Autoridad Centralizada · Monismo marginal o declinante',
    name: 'Conservadurismo autoritario',
    period: 'Siglos XIX a XXI (Zarismo tardío, régimen de Putin, democracias iliberales contemporáneas)',
    context: 'Régimen híbrido que conserva formalidades electorales mientras asfixia a la oposición independiente.',
    authority: 'Líder fuerte o coalición oligárquico-militar que instrumentaliza los tribunales para blindar el poder.',
    mechanism: 'Leyes de «agentes extranjeros», captura oligárquica de medios de comunicación e inhabilitación judicial opositora.',
    justification: 'Defensa de los valores civilizatorios tradicionales, estabilidad social y rechazo al cosmopolitismo foráneo.',
    gainers: 'Oligarcas afines al mandatario, estamentos de seguridad del Estado y jerarquías eclesiales oficiales.',
    costBearers: 'Prensa independiente, activistas de derechos humanos, partidos opositores y minorías sociales.',
    counterweights: 'Voto de protesta, redes sociales descentralizadas, fuga de talento y sanciones económicas internacionales.',
    lensReading: 'Erosión sutil de la libertad negativa: las leyes formalmente no prohiben votar, pero manipulan las condiciones para que no exista opción real.',
    reference: 'Levitsky, S. & Ziblatt, D. (2018). How Democracies Die; Diamond, L. (2002). Thinking About Hybrid Regimes.'
  },
  {
    id: 'nacionalismo_etnico',
    quadrantId: 'monismo_marginal',
    quadrantLabel: 'Autoridad Centralizada · Monismo marginal o declinante',
    name: 'Nacionalismo étnico',
    period: 'Siglos XIX a XXI (Balcanes 1990s, Ruanda 1994, Birmania/Rohingya)',
    context: 'Poder estatal o miliciano capturado por una identidad etnonacional que busca expulsar o someter a las demás.',
    authority: 'Caudillos militares etnonacionales y aparatos estatales que subordinan la ciudadanía al linaje de sangre.',
    mechanism: 'Despojo de ciudadanía, expulsión forzosa de tierras, violencia paramilitar sistemática y leyes segregacionistas.',
    justification: 'Preservación de la pureza étnica, destino ancestral sagrado y venganza de agravios históricos míticos.',
    gainers: 'Élite militar del grupo mayoritario, especuladores de tierras despojadas y demagogos identitarios.',
    costBearers: 'Poblaciones minoritarias perseguidas, desplazados forzosos y ciudadanos defensores de la convivencia.',
    counterweights: 'Justicia penal internacional (Tribunales de La Haya), sanciones globales y resistencia armada local.',
    lensReading: 'Monismo identitario: la identidad particular se transforma en un absoluto que cancela cualquier derecho humano universal.',
    reference: 'Mann, M. (2005). The Dark Side of Democracy; Ignatieff, M. (1993). Blood and Belonging.'
  },

  // ── Q3: HEGEMONÍA PLURALISTA (Pluralismo consolidado) ──────────────────────────
  {
    id: 'republicanismo',
    quadrantId: 'pluralismo_consolidado',
    quadrantLabel: 'Hegemonía Pluralista · Pluralismo consolidado',
    name: 'Republicanismo',
    period: 'Roma republicana, Florencia renacentista, Maquiavelo, Harrington, Pettit',
    context: 'Comunidad cívica deliberativa que define la libertad como la ausencia de dominación arbitraria (no-dominación).',
    authority: 'Ciudadanía participativa organizada en magistraturas rotativas sujetas al imperio de la ley común.',
    mechanism: 'Obligaciones cívicas compartidas, milicias de ciudadanos, control de magistrados y leyes contra monopolios.',
    justification: 'Vivir libres de la voluntad arbitraria de un amo («libertas» frente al dominus) y fomento del bien común.',
    gainers: 'Cuerpo ciudadano activo protegido de abusos oligárquicos o tiranías individuales.',
    costBearers: 'Sectores históricamente excluidos de la condición de ciudadanía en las épocas clásicas (esclavos, siervos, mujeres).',
    counterweights: 'Tribunos populares con poder de veto, rotación obligatoria de cargos y rendición de cuentas pública.',
    lensReading: 'Matiz clave para Berlin y Skinner: la libertad como no-dominación exige instituciones activas que impidan que un actor privado o estatal adquiera poder despótico.',
    reference: 'Pettit, P. (1997). Republicanism: A Theory of Freedom and Government; Skinner, Q. (1998). Liberty Before Liberalism.'
  },
  {
    id: 'liberalismo',
    quadrantId: 'pluralismo_consolidado',
    quadrantLabel: 'Hegemonía Pluralista · Pluralismo consolidado',
    name: 'Liberalismo',
    period: 'Siglos XVII a XXI (Locke, Montesquieu, Constant, Stuart Mill, Rawls)',
    context: 'Filosofía política que proclama la prioridad de la autonomía individual y los derechos inalienables.',
    authority: 'Gobierno representativo limitado por una constitución escrita y la división de los poderes del Estado.',
    mechanism: 'Habeas corpus, libertad de conciencia, libre contratación mercantil, prensa libre y sufragio legal.',
    justification: 'Cada persona es un fin en sí misma libre de definir su plan de vida mientras no dañe a los demás.',
    gainers: 'Individuos protegidos en su privacidad, minorías religiosas o ideológicas y emprendedores económicos.',
    costBearers: 'Poblaciones desaventajadas cuando la igualdad formal oculta abismos en la capacidad real de agencia (crítica de Sen).',
    counterweights: 'Control judicial de constitucionalidad, elecciones competitivas y pluralismo de opinión pública.',
    lensReading: 'Núcleo de la libertad negativa según Berlin: delimitar un espacio inviolable alrededor de cada ser humano.',
    reference: 'Locke, J. (1689). Second Treatise of Government; Mill, J. S. (1859). On Liberty; Berlin, I. (1958).'
  },
  {
    id: 'democracia_constitucional',
    quadrantId: 'pluralismo_consolidado',
    quadrantLabel: 'Hegemonía Pluralista · Pluralismo consolidado',
    name: 'Democracia constitucional',
    period: 'Posguerra al Siglo XXI (Sistemas democráticos occidentales e internacionales)',
    context: 'Síntesis de soberanía popular mayoritaria y límites constitucionales contramayoritarios rígidos.',
    authority: 'Poder público legitimado por urnas pero subordinado a una Constitución y a tribunales constitucionales.',
    mechanism: 'Sufragio universal, alternancia pacífica, tutela judicial efectiva, derechos civiles y sociales garantizados.',
    justification: 'Autogobierno popular con protección irrestricta de las minorías frente a la tiranía de la mayoría.',
    gainers: 'Ciudadanía universal con garantías procesales, minorías políticas y sociedad civil organizada.',
    costBearers: 'Gobernantes impacientes ante frenos institucionales; lentitud en reformas estructurales urgentes.',
    counterweights: 'Cortes constitucionales independientes, control parlamentario, defensorías del pueblo y prensa libre.',
    lensReading: 'Institucionaliza el pluralismo berliniano: reconoce el conflicto irreducible de valores y establece reglas para tramitarlo sin violencia.',
    reference: 'Dahl, R. (1989). Democracy and Its Critics; Habermas, J. (1992). Faktizität und Geltung.'
  },
  {
    id: 'federalismo',
    quadrantId: 'pluralismo_consolidado',
    quadrantLabel: 'Hegemonía Pluralista · Pluralismo consolidado',
    name: 'Federalismo',
    period: 'Siglos XVIII a XXI (Estados Unidos, Suiza, Alemania, Canadá)',
    context: 'Poder político fragmentado y compartido territorialmente entre un gobierno central y unidades federadas autónomas.',
    authority: 'Soberanía multinivel donde los estados o cantones retienen competencias exclusivas de gobierno.',
    mechanism: 'Constitución federal rígida, tribunal supremo arbitral, doble cámara legislativa y autonomía fiscal local.',
    justification: 'Prevenir la concentración tiránica del poder mediante su dispersión geográfica y respetar diversidades locales.',
    gainers: 'Comunidades regionales, identidades provinciales y ciudadanos que gozan de cercanía a sus autoridades.',
    costBearers: 'Ciertas desigualdades territoriales entre regiones ricas y pobres si no hay mecanismos de nivelación fiscal.',
    counterweights: 'Senado federal de representación territorial, tribunales de resolución de conflictos competenciales.',
    lensReading: 'Para Berlin y Hayek, la división territorial del monopolio estatal es el mayor antídoto institucional frente al monismo centralista.',
    reference: 'Madison, J. et al. (1788). The Federalist Papers; Elazar, D. J. (1987). Exploring Federalism.'
  },
  {
    id: 'ciudad_estado',
    quadrantId: 'pluralismo_consolidado',
    quadrantLabel: 'Hegemonía Pluralista · Pluralismo consolidado',
    name: 'Ciudad-estado',
    period: 'Polis griega clásica, Venecia, Florencia, Liga Hanseática',
    context: 'Enclaves urbanos autónomos donde el autogobierno cívico florece a pequeña escala frente a los imperios territoriales.',
    authority: 'Asambleas de ciudadanos, consejos de mercaderes y magistraturas rotativas o sorteadas.',
    mechanism: 'Participación directa en asambleas, fueros comunales, milicia urbana y estatutos gremiales.',
    justification: '«El aire de la ciudad hace libre» (Stadtluft macht frei); autogobierno directo y soberanía de los vecinos.',
    gainers: 'Patriciado cívico, artesanos libres y corporaciones comerciales urbanas.',
    costBearers: 'Trabajadores sin estatuto de ciudadanía, campesinado dependiente exterior y extranjeros no censados.',
    counterweights: 'Elección por sorteo, rendición de cuentas estricta de magistrados (dokimasia) y rivalidades internas.',
    lensReading: 'Libertad positiva de participación directa en los asuntos públicos, con riesgos de exclusión para quienes no integran el censo cívico.',
    reference: 'Hansen, M. H. (1991). The Athenian Democracy; Pocock, J. G. A. (1975). The Machiavellian Moment.'
  },
  {
    id: 'tradiciones_feudales',
    quadrantId: 'pluralismo_consolidado',
    quadrantLabel: 'Hegemonía Pluralista · Pluralismo consolidado',
    name: 'Tradiciones feudales',
    period: 'Siglos XII a XVI (Magna Carta 1215, Fueros de Aragón y Navarra, Cortes medievales)',
    context: 'Orden policéntrico donde monarcas, nobles, obispados y villas pactaban límites normativos contractuales.',
    authority: 'Señores territoriales, cabildos eclesiásticos y monarcas precarios sometidos a la costumbre inmemorial.',
    mechanism: 'Cartas de libertades feudales (fueros), pactos solemnes de vasallaje y juicios por pares estamentales.',
    justification: 'Nadie, ni el rey, está por encima de la costumbre tradicional pactada («rex sub lege»).',
    gainers: 'Barones feudales, villas con cartas de franquicia y estamentos con fueros propios.',
    costBearers: 'Campesinos siervos atados a la tierra sin libertad de movimiento ni apelación ante tribunales reales.',
    counterweights: 'Derecho feudal de resistencia legítima ante el monarca perjuro, asambleas de barones y cortes estamentales.',
    lensReading: 'Pluralismo jurisdiccional que limitó al rey absoluto, pero cuya dispersión de poder sirvió históricamente para consolidar privilegios oligárquicos.',
    reference: 'Bloch, M. (1961). Feudal Society; Strayer, J. (1970). On the Medieval Origins of the Modern State.'
  },

  // ── Q4: PLURALISMO EMERGENTE (Diversidad radical) ───────────────────────────────
  {
    id: 'anarquismo',
    quadrantId: 'pluralismo_emergente',
    quadrantLabel: 'Pluralismo Emergente · Diversidad radical',
    name: 'Anarquismo',
    period: 'Siglos XIX a XXI (Bakunin, Kropotkin, Comuna de París, Cataluña 1936, Rojava, Chiapas)',
    context: 'Proyectos de autoorganización voluntaria que niegan la legitimidad de cualquier monopolio coercitivo del Estado y del capital.',
    authority: 'Asambleas de base horizontales, federación voluntaria de comunidades y delegados revocables sin mandato libre.',
    mechanism: 'Acción directa, apoyo mutuo descentralizado, propiedad colectiva de los medios de producción y autogestión.',
    justification: 'La libertad individual solo es plena cuando florece en la libertad igual de los demás; el Estado es intrínsecamente opresivo.',
    gainers: 'Trabajadores autogestionados, comunidades locales sin burocracias coercitivas y librepensadores.',
    costBearers: 'Dificultades en coordinación económica a gran escala y extrema vulnerabilidad ante ataques de ejércitos regulares estatales.',
    counterweights: 'Consenso asambleario, mandatos imperativos revocables y disolución instantánea de jerarquías.',
    lensReading: 'Máxima aspiración de libertad positiva (autogobierno directo) y negativa (cero coerción estatal), que en la práctica histórica enfrenta el dilema trágico de la escala y la autodefensa armada.',
    reference: 'Kropotkin, P. (1902). Mutual Aid; Graeber, D. (2004). Fragments of an Anarchist Anthropology.'
  },
  {
    id: 'feminismo_interseccional',
    quadrantId: 'pluralismo_emergente',
    quadrantLabel: 'Pluralismo Emergente · Diversidad radical',
    name: 'Feminismo interseccional',
    period: 'Fines del siglo XX a la actualidad (Crenshaw, bell hooks, Angela Davis, Silvia Federici)',
    context: 'Crítica radical a la concepción abstracta de libertad que ignora las opresiones de género, raza y clase.',
    authority: 'Pedagogías horizontales, redes de cuidado comunitario y justicia transformativa no punitiva.',
    mechanism: 'Visibilización del trabajo de reproducción no remunerado, desarticulación de violencias estructurales y paridad comunitaria.',
    justification: 'No existe libertad política real si la dominación patriarcal privada confina a la mitad de la población a la servidumbre doméstica.',
    gainers: 'Mujeres diversas, identidades disidentes y sectores subalternos históricamente excluidos de la esfera pública.',
    costBearers: 'Privilegios estructurales de las jerarquías androcéntricas y corporaciones dependientes de cuidados invisibles.',
    counterweights: 'Asambleas feministas de base, contraloría cívica de políticas públicas y redes de solidaridad mutua.',
    lensReading: 'Conecta con Sen y la libertad positiva: demuestra que la «no-interferencia» estatal en el hogar encubría la coacción y desposesión privada de capacidades de millones de mujeres.',
    reference: 'Crenshaw, K. (1989). Demarginalizing the Intersection of Race and Sex; hooks, b. (2000). Feminism Is for Everybody.'
  },
  {
    id: 'ecologismo_radical',
    quadrantId: 'pluralismo_emergente',
    quadrantLabel: 'Pluralismo Emergente · Diversidad radical',
    name: 'Ecologismo radical',
    period: 'Siglos XX y XXI (Bookchin, Shiva, Ostrom, movimientos por la justicia climática)',
    context: 'Pensamiento que sitúa la libertad humana dentro de los límites biofísicos de la biosfera y los bienes comunes.',
    authority: 'Gobernanza biorregional comunitaria, asambleas ecológicas y derechos jurídicos reconocidos a la naturaleza.',
    mechanism: 'Gestión colectiva de cuencas y bosques comunales (commons), decrecimiento extractivista y desobediencia ecológica.',
    justification: 'La libertad infinita de explotación mercantil destruye las bases ecológicas de la vida humana y futura.',
    gainers: 'Generaciones futuras, comunidades locales guardianas de ecosistemas y especies no humanas.',
    costBearers: 'Industrias fósiles y extractivistas, rentistas financieros y patrones de consumo hipermercantilizados.',
    counterweights: 'Reglas consuetudinarias de uso y sanción graduada (Ostrom), auditorías ecosistémicas y tutela judicial ambiental.',
    lensReading: 'Introduce una frontera ineludible al liberalismo clásico: la libertad negativa de contaminar o agotar el agua es coacción directa contra la supervivencia de terceros.',
    reference: 'Ostrom, E. (1990). Governing the Commons; Bookchin, M. (1982). The Ecology of Freedom.'
  },
  {
    id: 'multiculturalismo',
    quadrantId: 'pluralismo_emergente',
    quadrantLabel: 'Pluralismo Emergente · Diversidad radical',
    name: 'Multiculturalismo',
    period: 'Fines del siglo XX a la actualidad (Charles Taylor, Will Kymlicka, Bhikhu Parekh)',
    context: 'Reconocimiento de que las sociedades modernas albergan cosmovisiones culturales distintas que merecen acomodación justa.',
    authority: 'Instituciones públicas pluralistas que incorporan derechos colectivos y estatutos diferenciados de grupo.',
    mechanism: 'Educación intercultural bilingüe, escaños reservados, exenciones normativas por credo y fondos de preservación cultural.',
    justification: 'La cultura propia es el marco donde los individuos ejercen su capacidad de elegir con sentido; la ceguera neutral asimila forzosamente.',
    gainers: 'Minorías culturales, comunidades migrantes y pueblos históricamente estigmatizados.',
    costBearers: 'Rechazo de sectores asimilacionistas; posibles tensiones si prácticas comunitarias colisionan con derechos individuales.',
    counterweights: 'Diálogo intercultural en tribunales de derechos fundamentales y cláusulas de salida voluntaria individual.',
    lensReading: 'Encarna el pluralismo valorativo de Berlin: no hay una cultura universal superior que pueda imponer legítimamente sus formas a las demás.',
    reference: 'Kymlicka, W. (1995). Multicultural Citizenship; Taylor, C. (1992). Multiculturalism and "The Politics of Recognition".'
  },
  {
    id: 'movimientos_indigenas',
    quadrantId: 'pluralismo_emergente',
    quadrantLabel: 'Pluralismo Emergente · Diversidad radical',
    name: 'Movimientos indígenas',
    period: 'Resistencia histórica de 500 años a la actualidad (Pueblos del Cauca/CRIC, Zapatismo, Primeras Naciones)',
    context: 'Pueblos originarios que defienden la soberanía territorial, el autogobierno ancestral y cosmovisiones del Buen Vivir.',
    authority: 'Autoridades tradicionales, cabildos ancestrales, guardias indígenas comunitarias y asambleas territoriales.',
    mechanism: 'Jurisdicción especial indígena, control territorial propio, derecho propio consuetudinario y mingas colectivas.',
    justification: 'Preexistencia histórica y territorial anterior a los Estados-nación; armonía comunitaria y cuidado de la Madre Tierra.',
    gainers: 'Pueblos originarios, protección comunitaria de páramos y selvas, y dignidad colectiva de pueblos ancestrales.',
    costBearers: 'Avaricia de multinacionales extractivas, latifundios acaparadores y hegemonismo centralista del Estado.',
    counterweights: 'Mandatos soberanos de las asambleas comunitarias, consulta previa vinculante y armonización constitucional.',
    lensReading: 'Pluralismo jurídico formal: demuestra que un Estado puede albergar más de un sistema de justicia sin desintegrarse, enriqueciendo las capacidades de sus pueblos.',
    reference: 'Rivera Cusicanqui, S. (2010). Ch\'ixinakax utxiwa; Bonfil Batalla, G. (1987). México Profundo.'
  },
  {
    id: 'comunalismo',
    quadrantId: 'pluralismo_emergente',
    quadrantLabel: 'Pluralismo Emergente · Diversidad radical',
    name: 'Comunalismo',
    period: 'Siglos XX y XXI (Usos y costumbres en Oaxaca, comunalismo kurdo/confederalismo democrático, comunas)',
    context: 'Organización social donde el tejido comunitario vivo es la unidad política soberana de deliberación y trabajo.',
    authority: 'Asamblea general comunitaria donde todas las decisiones se toman por consenso o deliberación directa.',
    mechanism: 'Trabajo comunitario obligatorio no remunerado (tequio/fagina), cargos rotativos por servicio civil y soberanía alimentaria.',
    justification: 'La persona solo existe en y para la comunidad; superación de la soledad individualista capitalista y del estatismo autoritario.',
    gainers: 'La comunidad cohesionada, familias con redes seguras de respaldo mutuo y autodefensa local.',
    costBearers: 'Individuos con deseos disidentes que sufren una densa presión comunitaria de conformidad.',
    counterweights: 'Asambleas soberanas periódicas, control vecinal directo y rendición de cuentas inmediata de comisionados.',
    lensReading: 'Tensión clásica de Berlin: altísima libertad comunitaria colectiva que en ocasiones puede reducir el espacio de no-interferencia privada del individuo que desea discrepar.',
    reference: 'Díaz, Floriberto (2001). Comunidad y Comunalidad; Bookchin, M. (2015). The Next Revolution.'
  }
];

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
  activeLabCase: 'pasaje',
  senActiveCaps: new Set(),
  conflictValue: 50,
  lensGuideSeen: new Set(),
  activeLensGuide: null,
  activeGenealogiaTimeline: 'imperios',
  activeGenealogiaFilter: 'all',
  activeGenealogiaLab: 'impuestos_educacion',
  activeGenealogiaCategory: 'monismo_hegemonico',
  activeGenealogiaModalTab: 'overview',
  activeGenealogiaArchitecture: null,
  lastFocusedElement: null,
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
    genealogiaLensText:'genealogia',
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

  // Update open genealogia modal reading if active
  if (state.activeGenealogiaArchitecture) {
    renderGenealogiaModalContent(state.activeGenealogiaArchitecture);
  }
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
  renderLimitsLab();
  updateColombiaDashboard();
  renderSystemNarrative();
  renderGenealogia();
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

  function isMobileViewport() {
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  }

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

    // Progressive disclosure management on mobile
    const disclosures = qsa('.berlin-card__disclosure', split);
    if (isMobileViewport()) {
      if (side === 'ambas') {
        // In comparison mode on mobile: collapse examples by default so cards shrink to ~640px (< 1 screen)
        disclosures.forEach(d => d.removeAttribute('open'));
      } else {
        // In single lens mode on mobile: keep examples expanded for full immersion
        disclosures.forEach(d => d.setAttribute('open', ''));
      }
    } else {
      // Desktop: keep examples open
      disclosures.forEach(d => d.setAttribute('open', ''));
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => setSide(btn.dataset.side));
  });

  // Mobile initializes to single concept mode (or active lens), desktop starts with 'ambas'
  const initialSide = isMobileViewport()
    ? (state.currentLens === 'positiva' ? 'positiva' : 'negativa')
    : 'ambas';

  setSide(initialSide);

  // Resize handler to ensure examples are restored when expanding to desktop
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('resize', () => {
      if (!isMobileViewport()) {
        const disclosures = qsa('.berlin-card__disclosure', split);
        disclosures.forEach(d => d.setAttribute('open', ''));
      }
    });
  }
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
  const noteText = getConflictNote(val);
  slider.setAttribute('aria-valuetext', `${val}% — ${noteText}`);
  
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
    nodes.forEach(n => {
      n.classList.remove('active');
      n.setAttribute('aria-pressed', 'false');
    });
    infoPanel.innerHTML = isEnglish()
      ? '<p class="power-info__hint">Click or tap a node to see the kind of restriction it exerts on the individual.</p>'
      : '<p class="power-info__hint">Haz clic o toca un nodo para ver el tipo de restricción que ejerce sobre el individuo.</p>';
    updatePowerDiagramEdges(state.currentLens);
    return;
  }

  nodes.forEach(n => {
    const isActive = n.dataset.node === state.activePowerNode;
    n.classList.toggle('active', isActive);
    n.setAttribute('aria-pressed', String(isActive));
  });
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

function initMarketDebateMobileTabs() {
  const tabBtns = qsa('.dialogue-mobile-tabs .dialogue-tab-btn');
  const grid = qs('.dialogue-grid');
  if (!tabBtns.length || !grid) return;

  function setPerspective(perspective) {
    tabBtns.forEach(btn => {
      const active = btn.dataset.perspective === perspective;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    grid.classList.remove('show-defense', 'show-critique');
    grid.classList.add(`show-${perspective}`);
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setPerspective(btn.dataset.perspective);
    });
  });

  if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
    setPerspective('defense');
  }
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
      <span class="sen-cap-btn__status" aria-hidden="true"></span>
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

  // Calculate Capacidades Reales (Sen) score based on weights
  let activeWeightSum = 0;
  let totalWeightSum = 0;
  capabilities.forEach(cap => {
    totalWeightSum += cap.weight;
    if (activeIds.has(cap.id)) {
      activeWeightSum += cap.weight;
    }
  });
  const senScore = totalWeightSum > 0 ? Math.round((activeWeightSum / totalWeightSum) * 100) : 0;

  // Calculate No-Interferencia (Berlin/Hayek) score
  // Purely pedagogical model: each state-provided capability subtracts from negative liberty.
  // 100% at 0 active capabilities, and drops to 30% if all capabilities are active.
  const negScore = Math.max(30, 100 - Math.round(senScore * 0.7));

  // Update DOM tradeoff bars if they exist
  const tradeoffSenFill = qs('#tradeoffSenFill');
  const tradeoffSenVal = qs('#tradeoffSenVal');
  const tradeoffNegFill = qs('#tradeoffNegFill');
  const tradeoffNegVal = qs('#tradeoffNegVal');

  if (tradeoffSenFill) tradeoffSenFill.style.width = senScore + '%';
  if (tradeoffSenVal) tradeoffSenVal.textContent = senScore + '%';
  if (tradeoffNegFill) tradeoffNegFill.style.width = negScore + '%';
  if (tradeoffNegVal) tradeoffNegVal.textContent = negScore + '%';

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
// LABORATORIO DE FRONTERAS (SECCIÓN V)
// ═══════════════════════════════════════════════

function getLimitsLabCases() {
  const english = getEnglishLocale();
  return isEnglish() && english?.limitsLab ? english.limitsLab.cases : LIMITS_LAB_CASES;
}

function renderLimitsLab() {
  const cases = getLimitsLabCases();
  const activeCaseId = state.activeLabCase || 'pasaje';
  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0];

  const scenarioText = qs('#labScenarioText');
  const verdictsContainer = qs('#labVerdicts');
  const tabs = qsa('.lab-tab');

  // Update tabs active state
  tabs.forEach(tab => {
    const isActive = tab.dataset.case === activeCaseId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  if (scenarioText) {
    scenarioText.textContent = activeCase.scenario;
  }

  if (verdictsContainer) {
    verdictsContainer.innerHTML = '';
    const authors = [
      { key: 'berlin', name: 'Isaiah Berlin', frame: isEnglish() ? 'Negative Liberty' : 'Libertad Negativa' },
      { key: 'sen', name: 'Amartya Sen', frame: isEnglish() ? 'Capabilities' : 'Capacidades' },
      { key: 'hayek', name: 'Friedrich Hayek', frame: isEnglish() ? 'Libertarian' : 'Libertario' }
    ];

    authors.forEach(auth => {
      const data = activeCase.analysis[auth.key];
      const card = document.createElement('div');
      card.className = 'lab-verdict-card';
      
      const badgeClass = data.class === 'alert' ? 'lab-verdict-card__badge--alert' : 'lab-verdict-card__badge--neutral';

      card.innerHTML = `
        <div class="lab-verdict-card__author">${auth.name}</div>
        <div style="font-size:0.7rem; color:var(--clr-text-dim); margin-top:-2px;">${auth.frame}</div>
        <div style="margin-top:4px;">
          <span class="lab-verdict-card__badge ${badgeClass}">${data.verdict}</span>
        </div>
        <p class="lab-verdict-card__desc" style="margin-top:6px; font-size:0.84rem; line-height:1.6;">${data.desc}</p>
      `;
      verdictsContainer.appendChild(card);
    });
  }
}

function initLimitsLab() {
  const tabs = qsa('.lab-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeLabCase = tab.dataset.case;
      renderLimitsLab();
    });
    tab.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        state.activeLabCase = tab.dataset.case;
        renderLimitsLab();
      }
    });
  });

  renderLimitsLab();
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
                      data-label="${headers[i+1]}" 
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
  const activeIntersectingElements = new Set();

  function createObserver() {
    if (observer) {
      observer.disconnect();
      activeIntersectingElements.clear();
    }

    if (!mq.matches) {
      // Desktop: remove mobile visibility classes, let CSS handle it
      panel.classList.remove('lens-panel--visible');
      return;
    }

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeIntersectingElements.add(entry.target);
        } else {
          activeIntersectingElements.delete(entry.target);
        }
      });

      if (activeIntersectingElements.size > 0) {
        showLensPanel();
      } else {
        hideLensPanel();
      }
    }, { threshold: [0, 0.2] });

    qsa('[data-lens-context], .lens-interpretation').forEach(el => observer.observe(el));
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

let isProgrammaticScroll = false;
let programmaticScrollTimer = null;

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

  // Mark center item and update ARIA selection
  qsa('.lens-wheel__item', wheel).forEach((item, i) => {
    item.classList.toggle('is-center', i === idx);
    item.setAttribute('aria-selected', String(i === idx));
  });

  // Scroll the track so the active item is centered
  const track = qs('.lens-wheel__track', wheel);
  if (track) {
    const ITEM_H = 44;
    const prefersReducedMotion = Boolean(
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    isProgrammaticScroll = true;
    clearTimeout(programmaticScrollTimer);
    track.scrollTo({ top: idx * ITEM_H, behavior });
    programmaticScrollTimer = setTimeout(() => {
      isProgrammaticScroll = false;
    }, prefersReducedMotion ? 50 : 250);
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

  // Drag handle indicator (mobile affordance)
  const handle = document.createElement('div');
  handle.className = 'lens-wheel__handle';
  handle.setAttribute('aria-hidden', 'true');
  wheel.appendChild(handle);

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
    if (isProgrammaticScroll) return;

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
    if (isProgrammaticScroll) return;
    // Debounce: fire after scroll settles (scroll-snap will snap it)
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(onScrollEnd, 80);
  }, { passive: true });

  // ── Tap on item → scroll to it ─────────────────────────────────────────────

  qsa('.lens-wheel__item', track).forEach((item, i) => {
    item.addEventListener('click', () => {
      const targetLens = item.dataset.lens || DRUM_ORDER[i];
      if (targetLens && targetLens !== state.currentLens) {
        setLens(targetLens);
      } else {
        updateDrumSelector(state.currentLens);
      }
    });
  });

  // ── Keyboard navigation ────────────────────────────────────────────────────

  wheel.setAttribute('tabindex', '0');

  wheel.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentIndex = DRUM_ORDER.indexOf(state.currentLens);
      const nextIndex = getDrumKeyboardNextIndex(currentIndex, 'ArrowDown');
      setLens(DRUM_ORDER[nextIndex]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = DRUM_ORDER.indexOf(state.currentLens);
      const nextIndex = getDrumKeyboardNextIndex(currentIndex, 'ArrowUp');
      setLens(DRUM_ORDER[nextIndex]);
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
  const sections = qsa('.section:not(#problema)');
  const heroSection = qs('#problema');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'none';
  }

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
// SECTION X — GENEALOGÍA DEL PODER
// ═══════════════════════════════════════════════

// ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════
// SECTION X — GENEALOGÍA DEL PODER (4 COMPONENTES & MODAL)
// ═══════════════════════════════════════════════

function getGenealogiaArchitectures() {
  const english = getEnglishLocale();
  return isEnglish() && english?.genealogia?.architectures ? english.genealogia.architectures : GENEALOGIA_ARCHITECTURES;
}

function getGenealogiaQuadrants() {
  const english = getEnglishLocale();
  return isEnglish() && english?.genealogia?.quadrants ? english.genealogia.quadrants : GENEALOGIA_QUADRANTS;
}

function getGenealogiaCategories() {
  const english = getEnglishLocale();
  if (isEnglish() && english?.genealogia?.categories) {
    return GENEALOGIA_CATEGORIES.map(baseCat => {
      const enCat = english.genealogia.categories.find(c => c.id === baseCat.id);
      return enCat ? { ...baseCat, ...enCat } : baseCat;
    });
  }
  return GENEALOGIA_CATEGORIES;
}

function getTraditionsForCategory(categoryId) {
  const categories = getGenealogiaCategories();
  const cat = categories.find(c => c.id === categoryId || c.alias === categoryId);
  const archs = getGenealogiaArchitectures();
  if (!cat) return [];
  return archs.filter(a => a.quadrantId === cat.id || a.quadrantId === cat.alias || (cat.traditions && cat.traditions.includes(a.id)));
}

function renderGenealogiaExplorer() {
  const categories = getGenealogiaCategories();

  const cardConfig = [
    {
      id: 'monismo_hegemonico',
      cardEl: qs('#catCardMonismoHegemonico'),
      samplesEl: qs('#samplesMonismoHegemonico'),
      titleEl: qs('#titleMonismoHegemonico'),
      subEl: qs('#subMonismoHegemonico'),
      badgeEl: qs('#badgeMonismoHegemonico'),
      sumEl: qs('#sumMonismoHegemonico'),
      featMecEl: qs('#featMecMonismoHegemonico'),
      featCompEl: qs('#featCompMonismoHegemonico')
    },
    {
      id: 'pluralismo_hegemonico',
      cardEl: qs('#catCardPluralismoHegemonico'),
      samplesEl: qs('#samplesPluralismoHegemonico'),
      titleEl: qs('#titlePluralismoHegemonico'),
      subEl: qs('#subPluralismoHegemonico'),
      badgeEl: qs('#badgePluralismoHegemonico'),
      sumEl: qs('#sumPluralismoHegemonico'),
      featMecEl: qs('#featMecPluralismoHegemonico'),
      featCompEl: qs('#featCompPluralismoHegemonico')
    },
    {
      id: 'monismo_emergente',
      cardEl: qs('#catCardMonismoEmergente'),
      samplesEl: qs('#samplesMonismoEmergente'),
      titleEl: qs('#titleMonismoEmergente'),
      subEl: qs('#subMonismoEmergente'),
      badgeEl: qs('#badgeMonismoEmergente'),
      sumEl: qs('#sumMonismoEmergente'),
      featMecEl: qs('#featMecMonismoEmergente'),
      featCompEl: qs('#featCompMonismoEmergente')
    },
    {
      id: 'pluralismo_emergente',
      cardEl: qs('#catCardPluralismoEmergente'),
      samplesEl: qs('#samplesPluralismoEmergente'),
      titleEl: qs('#titlePluralismoEmergente'),
      subEl: qs('#subPluralismoEmergente'),
      badgeEl: qs('#badgePluralismoEmergente'),
      sumEl: qs('#sumPluralismoEmergente'),
      featMecEl: qs('#featMecPluralismoEmergente'),
      featCompEl: qs('#featCompPluralismoEmergente')
    }
  ];

  cardConfig.forEach(cfg => {
    const cat = categories.find(c => c.id === cfg.id) || categories[0];
    if (!cat) return;

    if (cfg.titleEl) cfg.titleEl.textContent = cat.title;
    if (cfg.subEl) cfg.subEl.textContent = cat.subtitle;
    if (cfg.badgeEl) cfg.badgeEl.textContent = cat.badge;
    if (cfg.sumEl) cfg.sumEl.textContent = cat.summary;
    if (cfg.featMecEl) cfg.featMecEl.textContent = cat.powerMechanism;
    if (cfg.featCompEl) cfg.featCompEl.textContent = cat.tradeoffs;

    // Render sample tradition buttons with explicit interactive CTA and pressable affordance
    if (cfg.samplesEl) {
      const traditions = getTraditionsForCategory(cat.id);
      const ctaLabel = isEnglish() ? 'Ver' : 'Ver';
      cfg.samplesEl.innerHTML = traditions.map(t => `
        <button type="button" class="sample-tradition-pill" data-category="${cat.id}" data-tradition="${t.id}" title="${t.name}: ${t.period}" aria-label="${isEnglish() ? 'Ver ficha de' : 'Ver ficha de'} ${t.name}">
          <span class="sample-tradition-name">${t.name}</span>
          <span class="sample-tradition-cta" aria-hidden="true">
            <span class="cta-text">${ctaLabel}</span>
            <span class="cta-arrow">↗</span>
          </span>
        </button>
      `).join('');

      qsa('.sample-tradition-pill', cfg.samplesEl).forEach(pill => {
        pill.addEventListener('click', e => {
          e.stopPropagation();
          openGenealogiaCategoryModal(pill.dataset.category, pill.dataset.tradition, 'traditions');
        });
      });
    }

    // Wire card element interaction for whole-card navigation
    if (cfg.cardEl) {
      cfg.cardEl.onclick = e => {
        if (e.target.closest('button, a')) return;
        openGenealogiaCategoryModal(cat.id, null, 'overview');
      };
      cfg.cardEl.setAttribute('tabindex', '0');
      cfg.cardEl.setAttribute('role', 'article');
      cfg.cardEl.onkeydown = e => {
        if (e.target === cfg.cardEl && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          openGenealogiaCategoryModal(cat.id, null, 'overview');
        }
      };
    }
  });
}

function openGenealogiaCategoryModal(categoryId, traditionId = null, initialTab = 'overview') {
  const categories = getGenealogiaCategories();
  const targetCat = categories.find(c => c.id === categoryId || c.alias === categoryId) || categories[0];
  if (!targetCat) return;

  state.activeGenealogiaCategory = targetCat.id;
  state.activeGenealogiaArchitecture = traditionId;
  const effectiveTab = traditionId ? 'traditions' : initialTab;
  state.activeGenealogiaModalTab = effectiveTab;
  state.lastFocusedElement = document.activeElement;

  renderGenealogiaCategoryModalContent(targetCat.id, traditionId, effectiveTab);

  const backdrop = qs('#genealogiaModalBackdrop');
  const modal = qs('#genealogiaModal');
  const modalBody = qs('#modalArchBody');
  const viewTraditions = qs('#modalViewTraditions');
  const viewOverview = qs('#modalViewOverview');

  if (backdrop && modal) {
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Strict scroll reset to ensure reader always starts at top
    if (modal) modal.scrollTop = 0;
    if (modalBody) modalBody.scrollTop = 0;
    if (viewTraditions) viewTraditions.scrollTop = 0;
    if (viewOverview) viewOverview.scrollTop = 0;

    modal.focus({ preventScroll: true });

    requestAnimationFrame(() => {
      if (modal) modal.scrollTop = 0;
      if (modalBody) modalBody.scrollTop = 0;
    });
  }
}

function closeGenealogiaCategoryModal() {
  const backdrop = qs('#genealogiaModalBackdrop');
  const modal = qs('#genealogiaModal');
  const modalBody = qs('#modalArchBody');

  if (backdrop) {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
  }
  if (modal) {
    modal.classList.remove('is-isolated-chip');
    modal.scrollTop = 0;
  }
  if (modalBody) {
    modalBody.scrollTop = 0;
  }
  document.body.classList.remove('modal-open');
  state.activeGenealogiaArchitecture = null;

  if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
    state.lastFocusedElement.focus({ preventScroll: true });
  }
}

function switchGenealogiaModalTab(tabKey) {
  state.activeGenealogiaModalTab = tabKey;
  const isOverview = tabKey === 'overview';

  const tabBtnOverview = qs('#modalTabBtnOverview');
  const tabBtnTraditions = qs('#modalTabBtnTraditions');
  const viewOverview = qs('#modalViewOverview');
  const viewTraditions = qs('#modalViewTraditions');

  if (tabBtnOverview) {
    tabBtnOverview.classList.toggle('is-active', isOverview);
    tabBtnOverview.setAttribute('aria-selected', String(isOverview));
  }
  if (tabBtnTraditions) {
    tabBtnTraditions.classList.toggle('is-active', !isOverview);
    tabBtnTraditions.setAttribute('aria-selected', String(!isOverview));
  }

  if (viewOverview) {
    viewOverview.classList.toggle('is-active', isOverview);
    if (isOverview) {
      viewOverview.removeAttribute('hidden');
    } else {
      viewOverview.setAttribute('hidden', '');
    }
  }
  if (viewTraditions) {
    viewTraditions.classList.toggle('is-active', !isOverview);
    if (!isOverview) {
      viewTraditions.removeAttribute('hidden');
    } else {
      viewTraditions.setAttribute('hidden', '');
    }
  }
}

function renderGenealogiaCategoryModalContent(categoryId, traditionId = null, tab = 'overview') {
  const categories = getGenealogiaCategories();
  const cat = categories.find(c => c.id === categoryId || c.alias === categoryId) || categories[0];
  if (!cat) return;

  const traditions = getTraditionsForCategory(cat.id);
  const badgeEl = qs('#modalCategoryBadge');
  const countEl = qs('#modalTraditionsCount');
  const titleEl = qs('#modalCategoryTitle');
  const contextEl = qs('#modalCategoryContext');
  const prevBtn = qs('#modalPrevBtn');
  const nextBtn = qs('#modalNextBtn');
  const modalEl = qs('#genealogiaModal');

  const isIsolated = Boolean(traditionId);
  if (modalEl) {
    modalEl.classList.toggle('is-isolated-chip', isIsolated);
  }

  if (badgeEl) {
    badgeEl.textContent = cat.badge;
    badgeEl.className = `genealogia-modal__badge ${cat.badgeClass || ('badge--' + cat.theme)}`;
  }
  if (countEl) {
    countEl.textContent = isEnglish()
      ? `${traditions.length} documented traditions`
      : `${traditions.length} tradiciones documentadas`;
  }
  if (titleEl) titleEl.textContent = cat.title;
  if (contextEl) contextEl.textContent = cat.subtitle;

  // Overview Panel (Tab 1)
  const viewOverview = qs('#modalViewOverview');
  if (viewOverview) {
    const activeLensName = LENS_DATA[state.currentLens]?.name || (isEnglish() ? 'Negative Liberty' : 'Libertad Negativa');
    const activeLensColor = LENS_DATA[state.currentLens]?.color || 'var(--clr-accent)';

    const lblSummary = isEnglish() ? 'Conceptual Framework' : 'Marco conceptual';
    const lblPowerMech = isEnglish() ? 'Power Organization Mechanism' : 'Mecanismo de organización del poder';
    const lblCoercion = isEnglish() ? 'Form of Liberty Restriction' : 'Forma de restricción de la libertad';
    const lblTradeoffs = isEnglish() ? 'Value Tensions and Trade-offs (Non-Hierarchical)' : 'Tensiones de valor y compromisos (Sin jerarquía moral)';
    const lblTradeoffsCopy = isEnglish()
      ? 'Isaiah Berlin demonstrated that fundamental human values (Liberty, Equality, Authority, and Autonomy) clash irreconcilably. No institutional architecture harmonizes all of them simultaneously:'
      : 'Isaiah Berlin demostró que los valores humanos fundamentales (Libertad, Igualdad, Autoridad y Autonomía) colisionan de forma irreductible. Ninguna arquitectura institucional los armoniza a todos a la vez:';
    const lblLensReading = isEnglish() ? 'Reading from Active Theoretical Lens' : 'Lectura desde el marco teórico activo';
    const lblCaveat = isEnglish() ? 'Epistemic and Historical Warning' : 'Advertencia heurística e histórica';

    let categoryLensAnalysis = '';
    if (state.currentLens === 'negativa') {
      categoryLensAnalysis = isEnglish()
        ? 'From Berlin\'s negative liberty lens, this category defines a specific boundary of state interference. While hegemonic monism crushes non-interference, pluralism establishes institutional barriers against state coercion, though it must vigilantly guard against private factions.'
        : 'Desde la libertad negativa de Berlin, esta categoría define una frontera específica de no-interferencia estatal. Mientras el monismo hegemónico suprime todo espacio de acción privada sin coacción, el pluralismo busca blindar al individuo frente al mandato arbitrario del Estado.';
    } else if (state.currentLens === 'positiva') {
      categoryLensAnalysis = isEnglish()
        ? 'From the positive liberty perspective (self-mastery and democratic self-governance), this category examines who wields genuine collective decision-making power and whether the civic body actively governs itself or remains subordinated to an external hierarchy.'
        : 'Desde la libertad positiva (autogobierno y realización colectiva), esta concepción examina quién ejerce la agencia decisional real y si la comunidad participa efectivamente en las decisiones públicas o permanece subordinada a un centro jerárquico.';
    } else if (state.currentLens === 'capacidades') {
      categoryLensAnalysis = isEnglish()
        ? 'Through Amartya Sen\'s capabilities lens, institutions in this category either expand or diminish substantive freedoms to be and do. Nominal legal rights are insufficient if structural coercion denies basic functionings.'
        : 'A través del marco de capacidades de Amartya Sen, las instituciones de esta categoría expanden o destruyen las libertades sustantivas reales (hacer y ser). Los derechos formales son estériles si las relaciones de poder privan a los sujetos de agencia básica.';
    } else {
      categoryLensAnalysis = isEnglish()
        ? 'Under the libertarian/spontaneous order framework (Hayek), this category demonstrates the contrast between centralized state coercion and voluntary contractual coordination among decentralized agents.'
        : 'Bajo la perspectiva del orden espontáneo y mercado libre (Hayek), esta categoría contrasta el monopolio de la planificación estatal con la coordinación descentralizada y voluntaria entre actores individuales.';
    }

    viewOverview.innerHTML = `
      <div class="category-overview-grid">
        <div class="category-overview-card category-overview-card--hero">
          <div class="category-overview-card__header">
            <span class="overview-card-tag">${lblSummary}</span>
          </div>
          <p class="category-overview-card__text">${cat.summary}</p>
        </div>

        <div class="category-overview-mechanisms">
          <div class="category-overview-card">
            <div class="category-overview-card__header">
              <span class="overview-card-tag">${lblPowerMech}</span>
            </div>
            <p class="category-overview-card__text">${cat.powerMechanism}</p>
          </div>
          <div class="category-overview-card">
            <div class="category-overview-card__header">
              <span class="overview-card-tag">${lblCoercion}</span>
            </div>
            <p class="category-overview-card__text">${cat.coercionForm}</p>
          </div>
        </div>

        <div class="category-overview-card category-overview-card--tradeoffs">
          <div class="category-overview-card__header">
            <span class="overview-card-tag">${lblTradeoffs}</span>
          </div>
          <p class="tradeoffs-intro-text">${lblTradeoffsCopy}</p>
          <div class="tradeoffs-box">
            <p class="category-overview-card__text"><strong>${isEnglish() ? 'Trade-off analysis:' : 'Análisis del compromiso:'}</strong> ${cat.tradeoffs}</p>
          </div>
        </div>

        <div class="category-overview-card category-overview-card--lens">
          <div class="category-overview-card__header">
            <span class="overview-card-tag">${lblLensReading}</span>
            <span class="overview-lens-badge" style="color: ${activeLensColor}; font-weight: 600;">${activeLensName}</span>
          </div>
          <p class="category-overview-card__text">${categoryLensAnalysis}</p>
        </div>

        <div class="category-overview-card category-overview-card--caveat">
          <div class="category-overview-card__header">
            <span class="overview-card-tag">${lblCaveat}</span>
          </div>
          <p class="category-overview-card__text">${cat.caveat}</p>
        </div>
      </div>
    `;
  }

  // Traditions Panel (Tab 2)
  const viewTraditions = qs('#modalViewTraditions');
  if (viewTraditions) {
    const lblAuthority = isEnglish() ? 'Form of authority' : 'Forma de autoridad';
    const lblMechanism = isEnglish() ? 'Restriction mechanism' : 'Mecanismo de restricción';
    const lblJustification = isEnglish() ? 'Claimed justification' : 'Justificación alegada';
    const lblGainers = isEnglish() ? 'Who gains decision power' : 'Quién gana capacidad de decisión';
    const lblCost = isEnglish() ? 'Who bears the costs' : 'Quién soporta los costes';
    const lblCounter = isEnglish() ? 'Counterweights & limits' : 'Contrapesos y límites institucionales';
    const lblLens = isEnglish() ? 'Reading on Liberty (Berlin)' : 'Lectura desde la libertad (Berlin)';
    const lblRef = isEnglish() ? 'Academic references' : 'Fuentes y referencias académicas';

    const targetTradition = traditionId ? traditions.find(t => t.id === traditionId) : null;
    const traditionsToRender = targetTradition ? [targetTradition] : traditions;

    const cardsHtml = traditionsToRender.map((item) => {
      const realIdx = traditions.findIndex(t => t.id === item.id);
      const displayIdx = realIdx !== -1 ? realIdx + 1 : 1;
      const isHighlighted = (traditionId === item.id);
      return `
        <article class="tradition-detail-card ${isHighlighted ? 'is-highlighted' : ''}" id="traditionCard-${item.id}" tabindex="0" data-tradition-id="${item.id}">
          <div class="tradition-editorial-header">
            <span class="tradition-editorial-counter">${displayIdx} / ${traditions.length}</span>
            <h4 class="tradition-editorial-title">${item.name}</h4>
            <div class="tradition-editorial-period">${item.period}</div>
            <p class="tradition-editorial-context">${item.context}</p>
          </div>

          <div class="tradition-spec-grid">
            <div class="tradition-editorial-field">
              <span class="field-label">${lblAuthority}</span>
              <p class="field-body">${item.authority}</p>
            </div>

            <div class="tradition-editorial-field">
              <span class="field-label">${lblMechanism}</span>
              <p class="field-body">${item.mechanism}</p>
            </div>

            <div class="tradition-editorial-field">
              <span class="field-label">${lblJustification}</span>
              <p class="field-body">${item.justification}</p>
            </div>

            <div class="tradition-editorial-field">
              <span class="field-label">${lblGainers}</span>
              <p class="field-body">${item.gainers}</p>
            </div>

            <div class="tradition-editorial-field">
              <span class="field-label">${lblCost}</span>
              <p class="field-body">${item.costBearers}</p>
            </div>

            <div class="tradition-editorial-field">
              <span class="field-label">${lblCounter}</span>
              <p class="field-body">${item.counterweights}</p>
            </div>
          </div>

          ${item.lensReading ? `
            <div class="tradition-editorial-field tradition-editorial-field--lens">
              <span class="field-label">${lblLens}</span>
              <p class="field-body">${item.lensReading}</p>
            </div>
          ` : ''}

          ${item.reference ? `
            <div class="tradition-editorial-field tradition-editorial-field--sources">
              <span class="field-label">${lblRef}</span>
              <p class="field-body field-body--ref">${item.reference}</p>
            </div>
          ` : ''}
        </article>
      `;
    }).join('');

    viewTraditions.innerHTML = `<div class="traditions-dossier-list">${cardsHtml}</div>`;

    const modalBody = qs('#modalArchBody');
    if (modalBody) modalBody.scrollTop = 0;

    if (traditionId) {
      setTimeout(() => {
        const highlightedEl = qs(`#traditionCard-${traditionId}`, viewTraditions);
        if (highlightedEl && typeof highlightedEl.focus === 'function') {
          highlightedEl.focus({ preventScroll: true });
        }
        if (modalBody) modalBody.scrollTop = 0;
      }, 30);
    }
  }

  switchGenealogiaModalTab(tab);

  const catKeys = ['monismo_hegemonico', 'pluralismo_hegemonico', 'monismo_emergente', 'pluralismo_emergente'];
  const currentCatIdx = catKeys.indexOf(cat.id);
  const prevCatIdx = (currentCatIdx - 1 + catKeys.length) % catKeys.length;
  const nextCatIdx = (currentCatIdx + 1) % catKeys.length;

  if (prevBtn) {
    prevBtn.onclick = () => {
      openGenealogiaCategoryModal(catKeys[prevCatIdx], null, state.activeGenealogiaModalTab);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      openGenealogiaCategoryModal(catKeys[nextCatIdx], null, state.activeGenealogiaModalTab);
    };
  }
}

// Backward compatibility aliases
function openGenealogiaModal(id) {
  const archs = getGenealogiaArchitectures();
  const arch = archs.find(a => a.id === id);
  if (arch) {
    const categories = getGenealogiaCategories();
    const cat = categories.find(c => c.id === arch.quadrantId || c.alias === arch.quadrantId || (c.traditions && c.traditions.includes(arch.id)));
    const catId = cat ? cat.id : 'monismo_hegemonico';
    openGenealogiaCategoryModal(catId, arch.id, 'traditions');
    return;
  }
  openGenealogiaCategoryModal(id, null, 'overview');
}

function closeGenealogiaModal() {
  closeGenealogiaCategoryModal();
}

function renderGenealogiaMatrix() {
  renderGenealogiaExplorer();
}

function syncActiveGenealogiaChip(id) {
  qsa('.sample-tradition-pill').forEach(pill => {
    const isActive = pill.dataset.tradition === id;
    pill.classList.toggle('is-active', isActive);
  });
}

function renderGenealogiaModalContent(id) {
  openGenealogiaModal(id);
}

function renderGenealogia() {
  renderGenealogiaExplorer();
  if (state.activeGenealogiaCategory) {
    renderGenealogiaCategoryModalContent(state.activeGenealogiaCategory, state.activeGenealogiaArchitecture, state.activeGenealogiaModalTab);
  }
}

function initGenealogia() {
  const backdrop = qs('#genealogiaModalBackdrop');
  const closeBtn = qs('#modalCloseBtn');
  const actionCloseBtn = qs('#modalCloseActionBtn');
  const tabBtnOverview = qs('#modalTabBtnOverview');
  const tabBtnTraditions = qs('#modalTabBtnTraditions');

  backdrop?.addEventListener('click', e => {
    if (e.target === backdrop) {
      closeGenealogiaCategoryModal();
    }
  });

  closeBtn?.addEventListener('click', closeGenealogiaCategoryModal);
  actionCloseBtn?.addEventListener('click', closeGenealogiaCategoryModal);

  tabBtnOverview?.addEventListener('click', () => switchGenealogiaModalTab('overview'));
  tabBtnTraditions?.addEventListener('click', () => switchGenealogiaModalTab('traditions'));

  if (window.__genealogiaKeydownHandler) {
    document.removeEventListener('keydown', window.__genealogiaKeydownHandler);
  }

  window.__genealogiaKeydownHandler = e => {
    const backdropEl = qs('#genealogiaModalBackdrop');
    if (!backdropEl || !backdropEl.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeGenealogiaCategoryModal();
      return;
    }

    if (e.key === 'Tab') {
      const modal = qs('#genealogiaModal');
      if (!modal) return;
      const focusableSelectors = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusables = qsa(focusableSelectors, modal).filter(el => {
        return !el.hasAttribute('hidden') && el.closest('[hidden]') === null && el.style.display !== 'none';
      });
      if (focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !modal.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !modal.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      return;
    }

    if (e.key === 'ArrowLeft') {
      const prevBtn = qs('#modalPrevBtn');
      if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      const nextBtn = qs('#modalNextBtn');
      if (nextBtn) nextBtn.click();
    }
  };

  document.addEventListener('keydown', window.__genealogiaKeydownHandler);

  renderGenealogia();
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  resetScrollToTop();

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
  initLimitsLab();
  initMarketToggle();
  initMarketDebateMobileTabs();
  initSenCapacidades();
  updateColombiaDashboard();
  initSystemToggle();
  initColombiaCoachBanner();
  initLensGuidance();
  initGenealogia();
  initOnboarding();
  initFadeIn();

  // Set initial interpretations
  setLens(initialLens);
  setLanguage(state.currentLanguage, { persist: false });

  console.log('Anatomía de la Libertad — iniciada.');
  console.log('Marco actual:', state.currentLens);
});

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('pageshow', () => {
    resetScrollToTop();
  });
}

