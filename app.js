/**
 * ANATOMÍA DE LA LIBERTAD — app.js
 * SPA estática sobre marcos teóricos de la libertad política
 * Berlin, Sen, Hayek/Friedman — sin resolver la tensión.
 */

'use strict';

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
  berlinSide: 'negativa',
  marketMode: 'ideal',
  systemMode: 'closed',
  activePowerNode: null,
  senActiveCaps: new Set(),
  conflictValue: 50,
};

// ═══════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════

function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function lerp(a, b, t) { return a + (b - a) * t; }

function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }

// ═══════════════════════════════════════════════
// LENS SYSTEM
// ═══════════════════════════════════════════════

function setLens(lens) {
  if (!LENS_DATA[lens]) return;
  state.currentLens = lens;

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
  const interp = LENS_DATA[lens].interpretations;
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
  if (announce) announce.textContent = `Marco activo: ${LENS_DATA[lens].name} (${LENS_DATA[lens].author})`;
}

// ═══════════════════════════════════════════════
// LENS PANEL TOGGLE
// ═══════════════════════════════════════════════

function initLensPanel() {
  const panel = qs('#lensPanel');
  const btn = qs('#lensToggleBtn');

  btn?.addEventListener('click', () => {
    const collapsed = panel.classList.toggle('collapsed');
    btn.setAttribute('aria-expanded', String(!collapsed));
    btn.setAttribute('aria-label', collapsed ? 'Expandir selector de lente' : 'Colapsar selector de lente');
  });

  qsa('.lens-btn').forEach(btn => {
    btn.addEventListener('click', () => setLens(btn.dataset.lens));
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLens(btn.dataset.lens); }
    });
  });
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

  // Values that diverge from a center point
  const values = [
    { label: 'Libertad', angle: -60, color: '#4a9eff' },
    { label: 'Igualdad', angle: 60, color: '#3dbe8a' },
    { label: 'Seguridad', angle: 180, color: '#ff7a35' },
    { label: 'Eficiencia', angle: 0, color: '#b0b0aa' },
    { label: 'Solidaridad', angle: 120, color: '#ff7a35' },
    { label: 'Autonomía', angle: -120, color: '#4a9eff' },
  ];

  let t = 0;

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

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
  return CONFLICT_NOTES.find(n => val >= n.range[0] && val <= n.range[1])?.text || '';
}

function initConflictSlider() {
  const slider = qs('#conflictSlider');
  if (!slider) return;

  function update(val) {
    state.conflictValue = val;
    const negRestriction = val; // más libertad → más restricción a igualdad, menos a negativa
    const eqSacrificed = 100 - val;

    // lossBarNeg: cuánta libertad negativa se sacrifica (inverted: slider izquierda = max igualdad = max restricción lib neg)
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

  slider.addEventListener('input', () => update(+slider.value));
  update(50);
}

// ═══════════════════════════════════════════════
// SECTION IV — POWER DIAGRAM
// ═══════════════════════════════════════════════

function initPowerDiagram() {
  const nodes = qsa('.power-node');
  const infoPanel = qs('#powerInfo');
  if (!infoPanel) return;

  function activateNode(nodeId) {
    if (state.activePowerNode === nodeId) {
      // deselect
      state.activePowerNode = null;
      nodes.forEach(n => n.classList.remove('active'));
      infoPanel.innerHTML = '<p class="power-info__hint">Haz clic en un nodo para ver el tipo de restricción que ejerce sobre el individuo.</p>';
      return;
    }

    state.activePowerNode = nodeId;
    nodes.forEach(n => n.classList.toggle('active', n.dataset.node === nodeId));

    const data = POWER_NODE_DATA[nodeId];
    if (data) {
      infoPanel.innerHTML = `
        <div class="power-info__node-name">${data.name}</div>
        <div class="power-info__type">${data.type}</div>
        <p class="power-info__desc">${data.desc}</p>
        <p class="power-info__mechanism">${data.mechanism}</p>
      `;
    }
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => activateNode(node.dataset.node));
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateNode(node.dataset.node); }
    });
  });
}

// ═══════════════════════════════════════════════
// SECTION VI — MARKET SVG
// ═══════════════════════════════════════════════

function drawMarketSvg(mode) {
  const svg = qs('#marketSvg');
  const caption = qs('#marketCaption');
  if (!svg) return;

  const W = 520, H = 240;
  const pad = { l: 50, r: 20, t: 30, b: 40 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  // Quantity axis: 0..10
  // Price axis: 0..100

  function px(q) { return pad.l + (q / 10) * pw; }
  function py(p) { return pad.t + ph - (p / 100) * ph; }

  let svgContent = `
    <!-- Axes -->
    <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${pad.t + ph}" stroke="#2a2a35" stroke-width="1.5"/>
    <line x1="${pad.l}" y1="${pad.t + ph}" x2="${pad.l + pw}" y2="${pad.t + ph}" stroke="#2a2a35" stroke-width="1.5"/>
    <text x="${pad.l - 8}" y="${pad.t}" fill="#8a8878" font-size="10" font-family="IBM Plex Mono" text-anchor="middle">P</text>
    <text x="${pad.l + pw}" y="${pad.t + ph + 15}" fill="#8a8878" font-size="10" font-family="IBM Plex Mono">Q</text>
  `;

  if (mode === 'ideal') {
    // Perfect supply/demand curves crossing at equilibrium
    // Demand: P = 90 - 7Q
    // Supply: P = 10 + 7Q
    // Equilibrium: 90-7Q = 10+7Q → Q=5.71, P=49.97

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

    svgContent += `
      <polyline points="${demandPath.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2"/>
      <polyline points="${supplyPath.join(' ')}" fill="none" stroke="#3dbe8a" stroke-width="2"/>
      <!-- Equilibrium point -->
      <circle cx="${px(eq_q)}" cy="${py(eq_p)}" r="5" fill="#f0ece0"/>
      <line x1="${px(eq_q)}" y1="${py(eq_p)}" x2="${px(eq_q)}" y2="${py(0)}" stroke="#f0ece0" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
      <line x1="${pad.l}" y1="${py(eq_p)}" x2="${px(eq_q)}" y2="${py(eq_p)}" stroke="#f0ece0" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
      <!-- Labels -->
      <text x="${px(10) + 6}" y="${py(90 - 70)}" fill="#4a9eff" font-size="11" font-family="IBM Plex Mono">Demanda</text>
      <text x="${px(8)}" y="${py(10 + 56)}" fill="#3dbe8a" font-size="11" font-family="IBM Plex Mono">Oferta</text>
      <text x="${px(eq_q) + 8}" y="${py(eq_p) - 6}" fill="#f0ece0" font-size="10" font-family="IBM Plex Mono">Equilibrio</text>
    `;

    if (caption) caption.textContent = 'Modelo ideal: curvas simétricas, un único equilibrio eficiente, información perfecta, cero externalidades. Este es el modelo del manual — no el mundo real.';

  } else {
    // Real market: multiple equilibria, monopoly power, externalities
    // Demand still roughly linear but with kink (sticky prices)
    const demandPath = [];
    for (let q = 0; q <= 10; q += 0.5) {
      // Kinked demand curve
      const pd = q < 4 ? 88 - 5 * q : 70 - 9 * (q - 4);
      if (pd >= 0 && pd <= 100) demandPath.push(`${px(q)},${py(pd)}`);
    }

    // Supply with market power — oligopoly, not perfect competition
    const supplyPath = [];
    for (let q = 0; q <= 10; q += 0.5) {
      const ps = 30 + 4 * q + (q > 6 ? 8 * (q - 6) : 0); // cost increases sharply after capacity
      if (ps >= 0 && ps <= 100) supplyPath.push(`${px(q)},${py(ps)}`);
    }

    // Shadow "ideal" supply faint
    const idealSupplyPath = [];
    for (let q = 0; q <= 10; q += 0.5) {
      const ps = 10 + 7 * q;
      if (ps >= 0 && ps <= 100) idealSupplyPath.push(`${px(q)},${py(ps)}`);
    }

    svgContent += `
      <!-- Ideal supply faint -->
      <polyline points="${idealSupplyPath.join(' ')}" fill="none" stroke="#3dbe8a" stroke-width="1" stroke-dasharray="5,4" opacity="0.3"/>
      <polyline points="${demandPath.join(' ')}" fill="none" stroke="#4a9eff" stroke-width="2"/>
      <polyline points="${supplyPath.join(' ')}" fill="none" stroke="#ff7a35" stroke-width="2"/>
      <!-- Welfare loss area hint -->
      <text x="${pad.l + 8}" y="${pad.t + 16}" fill="#ff7a35" font-size="10" font-family="IBM Plex Mono">Costo oligopolio</text>
      <text x="${px(7.5)}" y="${py(82)}" fill="#4a9eff" font-size="11" font-family="IBM Plex Mono">Demanda</text>
      <text x="${px(6)}" y="${py(58)}" fill="#ff7a35" font-size="11" font-family="IBM Plex Mono">Oferta real</text>
      <text x="${px(7.5)}" y="${py(55)}" fill="#3dbe8a" font-size="10" font-family="IBM Plex Mono" opacity="0.5">Oferta ideal</text>
      <!-- Annotations -->
      <text x="${pad.l + 5}" y="${H - 8}" fill="#8a8878" font-size="9" font-family="IBM Plex Mono">Externalidades, poder de mercado, información asimétrica, bienes públicos — no aparecen en el modelo ideal.</text>
    `;

    if (caption) caption.textContent = 'Evidencia empírica: mercados reales presentan poder oligopólico, externalidades no internalizadas, información asimétrica y barreras de entrada. El modelo ideal es útil como referencia, no como descripción.';
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

function initSenCapacidades() {
  const grid = qs('#senCapsGrid');
  if (!grid) return;

  // Build buttons
  SEN_CAPACIDADES.forEach(cap => {
    const btn = document.createElement('button');
    btn.className = 'sen-cap-btn';
    btn.dataset.id = cap.id;
    btn.title = cap.desc;
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = `
      <span class="sen-cap-btn__icon">${cap.icon}</span>
      <span class="sen-cap-btn__name">${cap.name}</span>
      <span class="sen-cap-btn__weight">Peso: ${cap.weight}%</span>
    `;
    btn.addEventListener('click', () => toggleCap(cap.id));
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(cap.id); }});
    grid.appendChild(btn);
  });

  function toggleCap(id) {
    if (state.senActiveCaps.has(id)) {
      state.senActiveCaps.delete(id);
    } else {
      state.senActiveCaps.add(id);
    }
    updateSenMeter();
  }

  function updateSenMeter() {
    let total = 0;
    SEN_CAPACIDADES.forEach(cap => {
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

    if (bar) bar.style.width = total + '%';
    if (val) val.textContent = total + '%';

    let msg = '';
    if (total === 0) msg = 'Sin capacidades básicas activas: libertad formal puede existir, pero la libertad real es nula.';
    else if (total < 30) msg = 'Privación severa de capacidades. En términos de Sen, esta persona no es libre en ningún sentido sustantivo.';
    else if (total < 60) msg = 'Capacidades parciales. La libertad efectiva existe pero está gravemente limitada.';
    else if (total < 85) msg = 'Capacidades sustanciales. La persona puede funcionar, pero aún hay déficits importantes.';
    else msg = 'Capacidades plenas. Este es el ideal normativo de Sen — pocas personas en el mundo lo alcanzan.';

    if (caveat) caveat.textContent = `⚠ Nota: estos porcentajes son pedagógicos. Sen rechaza agregar capacidades en un solo índice — la composición importa tanto como el total.`;
  }

  updateSenMeter();
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

  dash.innerHTML = COLOMBIA_DATA.indicators.map(ind => {
    const pct = (ind.value / ind.max) * 100;
    const barColor = ind.color_by_lens[lens] || lensColor;
    return `
      <div class="colombia-indicator">
        <div class="colombia-indicator__source">${ind.source}</div>
        <div class="colombia-indicator__name">${ind.name}</div>
        <div class="colombia-indicator__value" style="color:${barColor}">${ind.value}</div>
        <div class="colombia-indicator__rank">${ind.rank}</div>
        <div class="colombia-indicator__bar-track">
          <div class="colombia-indicator__bar" style="width:${pct}%;background:${barColor}"></div>
        </div>
        <div class="colombia-indicator__scale">Escala: ${ind.unit}</div>
      </div>
    `;
  }).join('');

  if (reading) {
    reading.textContent = COLOMBIA_DATA.readings[lens] || '';
  }
}

// ═══════════════════════════════════════════════
// SECTION IX — SYSTEM TOGGLE
// ═══════════════════════════════════════════════

function initSystemToggle() {
  const closedBtn = qs('#systemClosedBtn');
  const pluralBtn = qs('#systemPluralBtn');
  const narrative = qs('#systemNarrative');
  if (!narrative) return;

  function setSystem(mode) {
    state.systemMode = mode;
    closedBtn?.classList.toggle('active', mode === 'closed');
    pluralBtn?.classList.toggle('active', mode === 'plural');
    closedBtn?.setAttribute('aria-pressed', String(mode === 'closed'));
    pluralBtn?.setAttribute('aria-pressed', String(mode === 'plural'));

    const data = SYSTEM_NARRATIVES[mode];
    narrative.innerHTML = `
      <h4>${data.title}</h4>
      <p>${data.content}</p>
      <ul>${data.implications.map(i => `<li>${i}</li>`).join('')}</ul>
      <p style="margin-top:1rem;font-size:0.82rem;color:var(--clr-text-dim);border-top:1px solid var(--clr-border);padding-top:0.75rem;font-style:italic">${data.warning}</p>
    `;
  }

  closedBtn?.addEventListener('click', () => setSystem('closed'));
  pluralBtn?.addEventListener('click', () => setSystem('plural'));
  setSystem('closed');
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
  // Set initial lens
  document.body.classList.add('lens-negativa');

  // Initialize all components
  initLensPanel();
  initScrollSpy();
  initDivergenceCanvas();
  initBerlinToggle();
  initConflictSlider();
  initPowerDiagram();
  initMarketToggle();
  initSenCapacidades();
  updateColombiaDashboard();
  initSystemToggle();
  initFadeIn();

  // Set initial interpretations
  setLens('negativa');

  console.log('Anatomía de la Libertad — iniciada.');
  console.log('Marco actual:', state.currentLens);
});
