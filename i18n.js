'use strict';

window.I18N_CONTENT = {
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en'],
  locales: {
    en: {
      meta: {
        title: 'Anatomy of Liberty',
        description: 'An interactive exploration of Isaiah Berlin\'s concepts of liberty, political pluralism, and the tensions between freedom, equality, and power.'
      },
      ui: {
        languageLabel: 'Language',
        panelAriaLabel: 'Theoretical lens selector',
        panelHint: 'The data stay the same.<br/>The interpretation changes.',
        lensGroupAriaLabel: 'Choose theoretical lens',
        collapseLabel: 'Collapse lens selector',
        expandLabel: 'Expand lens selector',
        lensActiveAnnouncement: 'Active lens: {name} ({author})',
        coach: {}
      },
      staticContent: [],
      lenses: {},
      conflictNotes: [],
      canvasValues: [],
      powerNodes: {},
      market: {},
      sen: {},
      colombia: {},
      systemNarratives: {}
    }
  }
};

Object.assign(window.I18N_CONTENT.locales.en.ui.coach, {
  berlin: 'Try another lens here to compare Berlin\'s two concepts without leaving the section.',
  conflicto: 'This trade-off changes meaning under each lens. Tap here to compare the loss.',
  poder: 'Power looks different from each framework. Tap the lens to reinterpret this map.',
  limites: 'This distinction becomes sharper or blurrier depending on the lens. You can test that here.',
  economia: 'Switch the lens here to see how the same market picture supports different political conclusions.',
  sen: 'This section becomes richer when you compare Berlin, Sen, and libertarian readings side by side.',
  colombia: 'The dashboard is designed to be re-read with the lens. Tap here to change the diagnosis.',
  default: 'You can use the lens here to reinterpret this section.'
});

window.I18N_CONTENT.locales.en.staticContent.push(
  { selector: '.lens-panel', type: 'attr', attr: 'aria-label', value: 'Theoretical lens selector' },
  { selector: '#languageSwitchLabel', type: 'text', value: 'Language' },
  { selector: '.lens-panel__hint', type: 'html', value: 'The data stay the same.<br/>The interpretation changes.' },
  { selector: '.lens-options', type: 'attr', attr: 'aria-label', value: 'Choose theoretical lens' },
  { selector: '.lens-btn[data-lens="negativa"] .lens-btn__name', type: 'text', value: 'Negative Liberty' },
  { selector: '.lens-btn[data-lens="positiva"] .lens-btn__name', type: 'text', value: 'Positive Liberty' },
  { selector: '.lens-btn[data-lens="capacidades"] .lens-btn__name', type: 'text', value: 'Capabilities' },
  { selector: '.lens-btn[data-lens="libertario"] .lens-btn__name', type: 'text', value: 'Economic-Libertarian' },
  { selector: '.top-nav__link[href="#problema"]', type: 'attr', attr: 'title', value: 'I: Starting Point' },
  { selector: '.top-nav__link[href="#berlin"]', type: 'attr', attr: 'title', value: 'II: Berlin' },
  { selector: '.top-nav__link[href="#conflicto"]', type: 'attr', attr: 'title', value: 'III: Conflict' },
  { selector: '.top-nav__link[href="#poder"]', type: 'attr', attr: 'title', value: 'IV: Power' },
  { selector: '.top-nav__link[href="#limites"]', type: 'attr', attr: 'title', value: 'V: Limits' },
  { selector: '.top-nav__link[href="#economia"]', type: 'attr', attr: 'title', value: 'VI: Economy' },
  { selector: '.top-nav__link[href="#sen"]', type: 'attr', attr: 'title', value: 'VII: Sen' },
  { selector: '.top-nav__link[href="#colombia"]', type: 'attr', attr: 'title', value: 'VIII: Colombia' },
  { selector: '.top-nav__link[href="#comparacion"]', type: 'attr', attr: 'title', value: 'IX: Comparison' },
  { selector: '.top-nav__link[href="#cierre"]', type: 'attr', attr: 'title', value: 'X: Closing' },
  { selector: '#problema .hero-content__pre', type: 'text', value: 'Starting point' },
  { selector: '#problema-title', type: 'html', value: 'Anatomy<br/><em>of liberty</em>' },
  { selector: '#problema .hero-content__thesis', type: 'html', value: 'Politics is not the management of consensus. It is the administration of <strong>irreducible disagreement</strong>.' },
  { selector: '#problema .hero-content__secondary', type: 'html', value: 'When there is agreement on means and ends, we have a <strong>technical problem</strong>. When the values in tension are genuinely incompatible, we have a <strong>political problem</strong>. This distinction is not semantic: it defines what kind of solution is possible and what kind of authority may impose it.' },
  { selector: '#problema .hero-cta', type: 'text', value: 'Begin exploration ↓' },
  { selector: '#problema .viz-caption', type: 'text', value: 'Values that cannot be maximized simultaneously' },
  { selector: '#berlin-title', type: 'html', value: 'Isaiah Berlin<br/><em>and the two concepts</em>' },
  { selector: '#berlin .section__subtitle', type: 'text', value: 'A distinction Berlin considered not merely academic, but politically urgent.' },
  { selector: '#berlin .berlin-toggle-btn[data-side="negativa"]', type: 'text', value: 'Negative Liberty' },
  { selector: '#berlin .berlin-toggle-btn[data-side="positiva"]', type: 'text', value: 'Positive Liberty' },
  { selector: '#berlin .berlin-toggle-btn[data-side="ambas"]', type: 'text', value: 'Compare' },
  { selector: '#berlinNeg .berlin-card__tag', type: 'text', value: 'Negative Liberty' },
  { selector: '#berlinNeg .berlin-card__title', type: 'html', value: '“Free <em>from</em>”' },
  { selector: '#berlinNeg .berlin-card__core', type: 'text', value: 'Absence of external interference. You are free if no one prevents you from acting.' },
  { selector: '#berlinNeg .berlin-card__question', type: 'html', value: 'Central question: <em>How much room does the individual have without anyone obstructing them?</em>' },
  { selector: '#berlinNeg .berlin-example:nth-child(1) .berlin-example__label', type: 'text', value: 'Free speech' },
  { selector: '#berlinNeg .berlin-example:nth-child(1) .berlin-example__detail', type: 'text', value: 'The state does not censor you. But if you have no platform, does it matter?' },
  { selector: '#berlinNeg .berlin-example:nth-child(2) .berlin-example__label', type: 'text', value: 'Free market' },
  { selector: '#berlinNeg .berlin-example:nth-child(2) .berlin-example__detail', type: 'text', value: 'Without state regulation. But private power also coerces.' },
  { selector: '#berlinNeg .berlin-example:nth-child(3) .berlin-example__label', type: 'text', value: 'Freedom of movement' },
  { selector: '#berlinNeg .berlin-example:nth-child(3) .berlin-example__detail', type: 'text', value: 'Without legal barriers. But what if you cannot pay the fare?' },
  { selector: '#berlinNeg .berlin-card__tension', type: 'html', value: '<strong>Internal tension:</strong> It defines freedom without an agent and ignores asymmetries of actual power.' },
  { selector: '#berlinPos .berlin-card__tag', type: 'text', value: 'Positive Liberty' },
  { selector: '#berlinPos .berlin-card__title', type: 'html', value: '“Free <em>to</em>”' },
  { selector: '#berlinPos .berlin-card__core', type: 'text', value: 'Real capacity for self-determination. Being the owner of your own life and decisions.' },
  { selector: '#berlinPos .berlin-card__question', type: 'html', value: 'Central question: <em>Who governs my life? Am I the author of my own actions?</em>' },
  { selector: '#berlinPos .berlin-example:nth-child(1) .berlin-example__label', type: 'text', value: 'Public education' },
  { selector: '#berlinPos .berlin-example:nth-child(1) .berlin-example__detail', type: 'text', value: 'It gives real capacity to choose. At what cost in negative liberty?' },
  { selector: '#berlinPos .berlin-example:nth-child(2) .berlin-example__label', type: 'text', value: 'Social welfare' },
  { selector: '#berlinPos .berlin-example:nth-child(2) .berlin-example__detail', type: 'text', value: 'It expands real options. It requires fiscal coercion.' },
  { selector: '#berlinPos .berlin-example:nth-child(3) .berlin-example__label', type: 'text', value: 'Social rights' },
  { selector: '#berlinPos .berlin-example:nth-child(3) .berlin-example__detail', type: 'text', value: 'Freedom as enablement, not only as non-interference.' },
  { selector: '#berlinPos .berlin-card__tension', type: 'html', value: '<strong>Danger warned by Berlin:</strong> It may justify paternalism or impose a “higher self.”' },
  { selector: '.lens-interpretation__label', type: 'text', value: 'Under this framework:' }
);

window.I18N_CONTENT.locales.en.staticContent.push(
  { selector: '#conflicto-title', type: 'html', value: 'The unresolved<br/><em>conflict</em>' },
  { selector: '#conflicto .section__subtitle', type: 'html', value: 'Berlin was explicit: equality and liberty are genuinely incompatible values. This is not an implementation problem. It is a <strong>tragic conflict</strong>.' },
  { selector: '#conflicto .conflict-pole--left .conflict-pole__label', type: 'text', value: 'Equality' },
  { selector: '#conflicto .conflict-pole--left .conflict-pole__sub', type: 'html', value: 'active redistribution<br/>guaranteed goods' },
  { selector: '#conflicto .conflict-pole--right .conflict-pole__label', type: 'text', value: 'Liberty' },
  { selector: '#conflicto .conflict-pole--right .conflict-pole__sub', type: 'html', value: 'non-interference<br/>individual autonomy' },
  { selector: '#conflicto #conflictSlider', type: 'attr', attr: 'aria-label', value: 'Slide between equality and liberty' },
  { selector: '#conflicto .slider-track-labels span:nth-child(1)', type: 'text', value: 'Max equality' },
  { selector: '#conflicto .slider-track-labels span:nth-child(2)', type: 'text', value: 'Unstable balance' },
  { selector: '#conflicto .slider-track-labels span:nth-child(3)', type: 'text', value: 'Max liberty' },
  { selector: '#conflicto .loss-row:nth-child(1) .loss-row__label', type: 'text', value: 'Negative liberty restricted' },
  { selector: '#conflicto .loss-row:nth-child(2) .loss-row__label', type: 'text', value: 'Equality sacrificed' },
  { selector: '#poder-title', type: 'html', value: 'Power<br/><em>and obedience</em>' },
  { selector: '#poder .section__subtitle', type: 'html', value: 'Berlin distinguishes: coercion implies an intentional human agent. <em>“Why should I obey?”</em> is the fundamental political question.' },
  { selector: '#powerDiagram', type: 'attr', attr: 'aria-label', value: 'Diagram of power relations' },
  { selector: '.power-node[data-node="individuo"]', type: 'attr', attr: 'aria-label', value: 'Individual: political subject' },
  { selector: '.power-node[data-node="estado"]', type: 'attr', attr: 'aria-label', value: 'State: monopoly of force' },
  { selector: '.power-node[data-node="mercado"]', type: 'attr', attr: 'aria-label', value: 'Market: coordination through price' },
  { selector: '.power-node[data-node="sociedad"]', type: 'attr', attr: 'aria-label', value: 'Society: norm and culture' },
  { selector: '.power-node[data-node="individuo"] .power-node__text', type: 'text', value: 'Individual' },
  { selector: '.power-node[data-node="individuo"] .power-node__sub', type: 'text', value: 'political subject' },
  { selector: '.power-node[data-node="estado"] .power-node__text', type: 'text', value: 'State' },
  { selector: '.power-node[data-node="estado"] .power-node__sub', type: 'text', value: 'monopoly of force' },
  { selector: '.power-node[data-node="mercado"] .power-node__text', type: 'text', value: 'Market' },
  { selector: '.power-node[data-node="mercado"] .power-node__sub', type: 'text', value: 'price / contract' },
  { selector: '.power-node[data-node="sociedad"] .power-node__text', type: 'text', value: 'Society' },
  { selector: '.power-node[data-node="sociedad"] .power-node__sub', type: 'text', value: 'norm / culture' },
  { selector: '#limites-title', type: 'html', value: 'Incapacity<br/><em>versus coercion</em>' },
  { selector: '#limites .section__subtitle', type: 'text', value: 'A distinction Berlin considers fundamental: not every restriction is a lack of political freedom.' },
  { selector: '#limites .limits-card--physical .limits-card__title', type: 'text', value: '“You cannot fly”' },
  { selector: '#limites .limits-card--physical .limits-card__body', type: 'text', value: 'A physical limit. There is no human agent preventing you. Berlin is explicit: natural incapacity is not a lack of political freedom. If you could fly, nobody would be forbidding it.' },
  { selector: '#limites .limits-card--physical .limits-card__verdict', type: 'html', value: '<strong>Incapacity.</strong> It is not a lack of political freedom. It is a natural fact.' },
  { selector: '#limites .limits-card--coercion .limits-card__title', type: 'text', value: '“They do not let you move”' },
  { selector: '#limites .limits-card--coercion .limits-card__body', type: 'html', value: 'There is an intervening agent: state, institution, or another individual. This <em>is</em> coercion, and therefore a lack of political freedom. The relevant question is <em>who</em> imposes the restriction.' },
  { selector: '#limites .limits-card--coercion .limits-card__verdict', type: 'html', value: '<strong>Coercion.</strong> It is a lack of freedom. It requires political justification.' },
  { selector: '#limites .limits-complication__title', type: 'text', value: 'The crack Berlin never fully closes' },
  { selector: '#limites .limits-complication p', type: 'html', value: 'What if you cannot pay for transportation? That is not a physical limit. There is an institutional system that organizes scarcity. Is that coercion? <strong>Sen will say it matters</strong>, regardless of whether there is an intentional agent. Berlin would say it depends on whether there is deliberate human intervention.' },
  { selector: '#economia-title', type: 'html', value: 'Hayek &amp; Friedman<br/><em>liberty as non-interference</em>' },
  { selector: '#economia .section__subtitle', type: 'text', value: 'For economic liberalism, the free market is the best mechanism of decentralized coordination and the strongest guarantee of individual liberty.' },
  { selector: '#economia .econ-quote:nth-child(1) p', type: 'text', value: '“Competition is the only form of organization that does not require the control of social forces by a central authority.”' },
  { selector: '#economia .econ-quote:nth-child(1) cite', type: 'html', value: 'Friedrich Hayek, <em>The Road to Serfdom</em> (1944)' },
  { selector: '#economia .econ-quote:nth-child(2) p', type: 'text', value: '“Only a society that uses the market mechanism can combine economic freedom with efficiency.”' },
  { selector: '#economia .econ-quote:nth-child(2) cite', type: 'html', value: 'Milton Friedman, <em>Capitalism and Freedom</em> (1962)' },
  { selector: '#economia .market-viz__title', type: 'text', value: 'Ideal market vs. empirical evidence' },
  { selector: '#economia .market-btn[data-market="ideal"]', type: 'text', value: 'Ideal model' },
  { selector: '#economia .market-btn[data-market="real"]', type: 'text', value: 'Empirical evidence' },
  { selector: '#marketSvg', type: 'attr', attr: 'aria-label', value: 'Comparison of ideal and real market' },
  { selector: '#economia .econ-critique__title', type: 'text', value: 'The critique' },
  { selector: '#economia .critique-item:nth-child(1) p', type: 'text', value: 'The market is not neutral: it reflects and amplifies preexisting asymmetries of power.' },
  { selector: '#economia .critique-item:nth-child(2) p', type: 'text', value: 'State “non-interference” is itself a political decision with clear winners and losers.' },
  { selector: '#economia .critique-item:nth-child(3) p', type: 'text', value: 'Formal liberty without real resources may be empty. Sen will call this “freedom without capability.”' }
);

window.I18N_CONTENT.locales.en.staticContent.push(
  { selector: '#sen-title', type: 'html', value: 'Amartya Sen<br/><em>liberty as real capability</em>' },
  { selector: '#sen .section__subtitle', type: 'html', value: 'Sen rejects measuring liberty through income or resources. The question is: <strong>what can this person actually do and be?</strong>' },
  { selector: '#sen .sen-intro-quote p', type: 'text', value: '“Development can be seen as a process of expanding the real freedoms that people enjoy.”' },
  { selector: '#sen .sen-intro-quote cite', type: 'html', value: 'Amartya Sen, <em>Development as Freedom</em> (1999)' },
  { selector: '#sen .sen-caps-intro', type: 'text', value: 'Activate or deactivate capabilities to see how effective freedom changes:' },
  { selector: '#sen .sen-profile-label', type: 'text', value: 'Capabilities Profile' },
  { selector: '#sen #senProfileDesc', type: 'text', value: 'Activate capabilities in the grid to evaluate the person\'s effective freedom profile.' },
  { selector: '#sen #senProfileBadge', type: 'text', value: 'No basic capabilities' },
  { selector: '#sen .sen-indices__title', type: 'text', value: 'Measurement in practice' },
  { selector: '#sen .sen-index-card:nth-child(1) .sen-index-full', type: 'text', value: 'Human Development Index' },
  { selector: '#sen .sen-index-card:nth-child(1) p', type: 'text', value: 'It combines life expectancy, education, and income. It measures more than GDP, but it is still a rough proxy for real capabilities.' },
  { selector: '#sen .sen-index-card:nth-child(1) .sen-index-limit', type: 'text', value: 'Limit: it does not capture internal inequality, agency, or political freedoms.' },
  { selector: '#sen .sen-index-card:nth-child(2) .sen-index-full', type: 'text', value: 'Multidimensional Poverty Index' },
  { selector: '#sen .sen-index-card:nth-child(2) p', type: 'text', value: 'It measures simultaneous deprivations in health, education, and living standards. It is closer to Sen\'s spirit.' },
  { selector: '#sen .sen-index-card:nth-child(2) .sen-index-limit', type: 'text', value: 'Limit: thresholds are conventional, not derived from theory.' },
  { selector: '#colombia-title', type: 'html', value: 'Colombia<br/><em>under three indices</em>' },
  { selector: '#colombia .section__subtitle', type: 'text', value: 'The same data. Three indices. Four possible readings. Change the lens and watch the diagnosis change radically.' },
  { selector: '#colombia .colombia-reading__title', type: 'text', value: 'Diagnosis under the active framework' },
  { selector: '#colombia .colombia-reading__warning', type: 'text', value: 'Epistemic warning: each index was built from prior theoretical assumptions. Changing the framework is not cheating. It is recognizing that indices are not neutral.' },
  { selector: '#comparacion-title', type: 'html', value: 'Monism<br/><em>versus pluralism</em>' },
  { selector: '#comparacion .section__subtitle', type: 'text', value: 'Berlin warned: the greatest danger is not intellectual error, but the certainty of having found the only true value.' },
  { selector: '#systemClosedBtn', type: 'text', value: 'Closed system' },
  { selector: '#systemPluralBtn', type: 'text', value: 'Plural system' },
  { selector: '#comparacion .superior-self__title', type: 'text', value: 'The “higher self” and the dangerous structure of the argument' },
  { selector: '#comparacion .superior-self > p:nth-of-type(1)', type: 'text', value: 'Berlin identifies the following reasoning as the gateway to modern authoritarianism:' },
  { selector: '#comparacion .superior-self__list li:nth-child(1)', type: 'text', value: 'There is a “real self” or “rational self” different from my current and imperfect desires.' },
  { selector: '#comparacion .superior-self__list li:nth-child(2)', type: 'text', value: 'Someone may know better than I do what that real self would want.' },
  { selector: '#comparacion .superior-self__list li:nth-child(3)', type: 'html', value: 'Therefore, coercing me to do what my real self would want is, in fact, <em>liberating</em> me.' },
  { selector: '#comparacion .superior-self__conclusion', type: 'html', value: 'This logic has justified both state socialism and certain theocracies. The problem is not in the conclusion but in the <strong>structure of the argument</strong>.' },
  { selector: '#cierre .cierre-epigraph', type: 'text', value: '“Out of the crooked timber of humanity no straight thing was ever made.”' },
  { selector: '#cierre .cierre-attribution', type: 'html', value: 'Immanuel Kant, <em>Idea for a Universal History</em> (1784)' },
  { selector: '#cierre .cierre-thesis:nth-child(1) p', type: 'text', value: 'Genuinely important values are incompatible with one another. There is no system that maximizes them all at once.' },
  { selector: '#cierre .cierre-thesis:nth-child(2) p', type: 'text', value: 'Every index and every measurement presupposes a theoretical framework. That framework is a choice, not a neutral fact.' },
  { selector: '#cierre .cierre-thesis:nth-child(3) p', type: 'text', value: 'Pluralism is not relativism. You can recognize incompatible values without concluding that all of them are worth the same.' },
  { selector: '#cierre .cierre-thesis:nth-child(4) p', type: 'text', value: 'Epistemic humility is not political paralysis. It is the condition for avoiding irreversible mistakes.' },
  { selector: '#cierre .cierre-coda', type: 'html', value: 'This tension is not resolved.<br/><strong>It is inhabited.</strong>' },
  { selector: '#footerEyebrow', type: 'text', value: 'Credits and continuity' },
  { selector: '#footerSummary', type: 'text', value: 'This editorial artifact aims to return complexity to the concept of liberty and offer a navigable tool for discussing it beyond political slogans.' },
  { selector: '#footerWorkLabel', type: 'text', value: 'Public scholarship' },
  { selector: '#footerWorkTitle', type: 'text', value: 'More work on Isaiah Berlin from a Colombian perspective' },
  { selector: '#footerWorkCopy', type: 'text', value: 'Continue the exploration in my Spotify podcast, where these ideas are grounded in Colombian debates, vocabulary, and conflicts.' },
  { selector: '#footerSpotifyLink', type: 'text', value: 'Listen on Spotify' },
  { selector: '#footerSourcesLabel', type: 'text', value: 'Sources and context' },
  { selector: '#footerSourcesTitle', type: 'text', value: 'Read more and explore the source notebooks' },
  { selector: '#footerSourcesCopy', type: 'text', value: 'The README explains the infographic\'s motivation, visual architecture, and central questions. The source notebooks open a deeper path into the research material.' },
  { selector: '#footerReadmeLink', type: 'text', value: 'Read README' },
  { selector: '#footerNotebookLink', type: 'text', value: 'Open source notebooks' },
  { selector: '#footerRightsLabel', type: 'text', value: 'Use and license' },
  { selector: '#footerRightsTitle', type: 'text', value: 'Creative Commons for educational circulation' },
  { selector: '#footerRightsCopy', type: 'text', value: 'Content prepared in March 2026. A Creative Commons BY-NC-SA 4.0 license is proposed so the material can be shared, cited, and adapted with attribution, without commercial use, and under the same license.' },
  { selector: '#footerMetaDate', type: 'text', value: 'Prepared: March 2026' }
);

window.I18N_CONTENT.locales.en.canvasValues.push(
  { label: 'Liberty', angle: -60, color: '#4a9eff', desc: 'Absence of external locks or interference.' },
  { label: 'Equality', angle: 60, color: '#3dbe8a', desc: 'Fair distribution and resource equity.' },
  { label: 'Security', angle: 180, color: '#ff7a35', desc: 'Collective protection against risks and threats.' },
  { label: 'Efficiency', angle: 0, color: '#b0b0aa', desc: 'Optimal coordination of resources and markets.' },
  { label: 'Solidarity', angle: 120, color: '#ff7a35', desc: 'Cohesion, mutual support, and civic fraternity.' },
  { label: 'Autonomy', angle: -120, color: '#4a9eff', desc: 'Real capacity to choose one\'s own destiny.' }
);

window.I18N_CONTENT.locales.en.conflictNotes.push(
  { range: [0, 20], text: 'Absolute equality requires total control over distribution and, therefore, an extreme restriction of individual autonomy and market outcomes.' },
  { range: [21, 40], text: 'High redistribution with strong regulation. Negative liberty is significantly constrained. Is the cost worth the gain in capability? It depends on the framework.' },
  { range: [41, 59], text: 'Zone of unstable balance. Contemporary democracies live here, and none of them is truly satisfied with the compromise.' },
  { range: [60, 79], text: 'Market order with minimal correction. High negative liberty, low redistribution. Power asymmetries tend to deepen over time.' },
  { range: [80, 100], text: 'Maximum negative liberty: no interference. Market results are sovereign. For Sen, this may coexist with severe capability deprivation.' }
);

Object.assign(window.I18N_CONTENT.locales.en.lenses, {
  negativa: {
    name: 'Negative Liberty',
    author: 'Berlin',
    interpretations: {
      berlin: 'From this framework, the distinction between negative and positive liberty is the most politically urgent one. Expanding the state to guarantee positive liberty directly threatens the space of non-interference.',
      conflicto: 'The sacrifice of negative liberty in order to achieve equality is real and costly. Every redistributive tax is a restriction on the individual. “Balance” is a temporary illusion.',
      poder: 'The state is the primary source of legitimate coercion, but all coercion requires justification. Market and society also constrain, though in a more diffuse and less transparent way.',
      limites: 'The distinction between incapacity and coercion is precise: if I cannot afford something, I am not the victim of direct state coercion. Expanding coercion to every material restriction dilutes the concept until it becomes useless.',
      economia: 'Hayek and Friedman are the most coherent defenders of this framework: state non-interference maximizes negative liberty. The free market is the institutional extension of this principle.',
      sen: 'Sen confuses incapacity with lack of freedom. His framework, however humane, may justify state interventions that destroy more negative liberty than they create.',
      colombia: 'From a negative-liberty reading, Colombia\'s central problems are coercive actors, insecurity, and institutional weakness rather than the absence of material provision.'
    }
  },
  positiva: {
    name: 'Positive Liberty',
    author: 'Berlin',
    interpretations: {
      berlin: 'Negative liberty without real capacity is empty. An illiterate person is “free” to read the constitution because no one stops them, but that freedom is fiction if they cannot exercise it.',
      conflicto: 'Sacrificing some negative liberty to build real capacities may expand the positive liberty of millions. The conflict exists, but its consequences are not symmetrical.',
      poder: 'The state does not only restrict; it also enables. Public education, health care, and infrastructure create the conditions for real self-determination. Power can be emancipatory.',
      limites: 'The physical/coercive distinction misses something important: if an institutional order systematically produces incapacity for specific groups, that fact is politically relevant regardless of intention.',
      economia: 'An uncorrected market reproduces and amplifies unequal starting points. Positive liberty requires institutions that redistribute capacities, not merely formal opportunities.',
      sen: 'Sen is the most rigorous successor to positive liberty. His capabilities approach operationalizes what Berlin left more abstract.',
      colombia: 'From a positive-liberty reading, formal rights coexist with severe inequalities in the real capacity to choose, move, learn, and plan one\'s life.'
    }
  },
  capacidades: {
    name: 'Capabilities Approach',
    author: 'Sen',
    interpretations: {
      berlin: 'Sen reformulates Berlin: the question is not only who stops you, but what you can actually do and be. The negative/positive distinction is useful yet insufficient.',
      conflicto: 'The equality-liberty conflict is less radical when reframed through capabilities. Equalizing basic capabilities is not the sacrifice of liberty but one way of creating it.',
      poder: 'Power is also exercised through the deprivation of capabilities. Without education, health, and mobility, the individual cannot be the real agent of their own life.',
      limites: 'The distinction between physical limits and coercion matters less than the question: can this person function fully? If an institutional system reproduces incapacity, the debate over blame is secondary.',
      economia: 'Markets can be efficient without being just in terms of capabilities. GDP may rise while basic human functioning erodes. Hayekian efficiency is not enough.',
      sen: 'This is the framework\'s own language. Real freedom is not the absence of chains. It is the capability to function in ways one has reason to value.',
      colombia: 'From a capabilities reading, national averages conceal deep territorial and social asymmetries. Freedom must be read through functioning, not through formal permissions alone.'
    }
  },
  libertario: {
    name: 'Economic-Libertarian',
    author: 'Hayek / Friedman',
    interpretations: {
      berlin: 'Berlin, though liberal, was not libertarian. From this framework the distinction settles the issue: only negative liberty is politically legitimate. Positive liberty is paternalism with good intentions.',
      conflicto: 'The supposed equality-liberty conflict has an obvious answer here: maximize negative liberty and let markets generate the growth that eventually benefits everyone.',
      poder: 'The state should be limited to protecting property, contracts, and basic order. Beyond that, every expansion is a potential tyranny. Markets do not coerce. They offer choices.',
      limites: 'The distinction between coercion and incapacity is exactly right. Poverty is not coercion. It is a lack of resources that markets, under the right rules, can generate.',
      economia: 'This is the framework\'s native ground. Economic freedom is treated as the condition for prosperity, coordination, and individual choice.',
      sen: 'Sen\'s capabilities approach justifies large-scale intervention through empirical claims that remain contestable. The risk is bureaucracy that replaces autonomy with dependence.',
      colombia: 'From an economic-libertarian reading, the key obstacles are overregulation, corruption, weak rule enforcement, and barriers that distort exchange and property rights.'
    }
  }
});

Object.assign(window.I18N_CONTENT.locales.en.powerNodes, {
  individuo: {
    name: 'Individual',
    type: 'Political subject',
    desc: 'The individual is both the object and the source of political legitimacy. They receive constraints from all other nodes, and all of them are justified in their name.',
    mechanism: 'Mechanism of received restriction: law (state), price (market), social norm (society). The whole tension among the frameworks converges here.'
  },
  estado: {
    name: 'State',
    type: 'Legal-rational coercion (Weber)',
    desc: 'It holds the legitimate monopoly of violence. It restricts the individual through law, regulation, taxation, and punishment. Its restriction is the most visible and politically disputed.',
    mechanism: 'Mechanism: legal rule plus threat of sanction. For Berlin, it is the principal source of restriction on negative liberty. For Sen, it can also be the principal source of enablement.'
  },
  mercado: {
    name: 'Market',
    type: 'Diffuse structural coercion',
    desc: 'It restricts through price: if you cannot pay, you cannot access. For Hayek this is coordination, not coercion. For Sen, it is a real restriction of capability.',
    mechanism: 'Mechanism: price system plus exclusion through insolvency. The key dispute is whether a system without a single intentional agent can still constrain freedom in a politically relevant way.'
  },
  sociedad: {
    name: 'Society',
    type: 'Informal normative coercion',
    desc: 'It restricts through social expectation, stigma, cultural exclusion, and norms of conformity. It is the least visible form of restriction, yet often one of the deepest.',
    mechanism: 'Mechanism: pressure to conform, symbolic exclusion, prejudice. For Berlin it matters less than state restriction. For Sen its effects on real capability are equally serious.'
  }
});

Object.assign(window.I18N_CONTENT.locales.en.market, {
  axis: { price: 'P', quantity: 'Q' },
  ideal: {
    caption: 'Ideal model: symmetric curves, one efficient equilibrium, perfect information, and zero externalities. This is the textbook model, not the world itself.',
    demand: 'Demand',
    supply: 'Supply',
    equilibrium: 'Equilibrium'
  },
  real: {
    caption: 'Empirical evidence: real markets display oligopolistic power, non-internalized externalities, asymmetrical information, and barriers to entry. The ideal model is a benchmark, not a description.',
    demand: 'Demand',
    supplyReal: 'Real supply',
    supplyIdeal: 'Ideal supply',
    oligopoly: 'Oligopoly cost',
    note: 'Externalities, market power, asymmetrical information, and public goods do not appear in the ideal model.'
  }
});

Object.assign(window.I18N_CONTENT.locales.en.sen, {
  capabilities: [
    { id: 'salud', icon: '🫀', name: 'Health', weight: 20, desc: 'Living a normal-length life without preventable disease.' },
    { id: 'educacion', icon: '📚', name: 'Education', weight: 18, desc: 'Reading, reasoning, and participating in civic and cultural life.' },
    { id: 'movilidad', icon: '🚶', name: 'Mobility', weight: 12, desc: 'Moving freely through physical and geographic space.' },
    { id: 'participacion', icon: '🗳', name: 'Participation', weight: 14, desc: 'Taking part in political decisions that affect your life.' },
    { id: 'trabajo', icon: '⚒', name: 'Decent work', weight: 16, desc: 'Working under human conditions, without exploitation.' },
    { id: 'afiliacion', icon: '🤝', name: 'Affiliation', weight: 12, desc: 'Living with and for others without humiliation or discrimination.' },
    { id: 'juego', icon: '🎭', name: 'Play / Culture', weight: 8, desc: 'Laughing, playing, and joining recreational and cultural life.' }
  ],
  meterLabel: 'Estimated effective freedom',
  caveat: 'Note: these percentages are pedagogical. Sen rejects reducing capabilities to a single index. Composition matters as much as the total.',
  messages: {
    zero: 'Without basic capabilities activated, formal liberty may exist, but real freedom is null.',
    low: 'Severe capability deprivation. In Sen\'s terms, this person is not substantively free.',
    mid: 'Partial capabilities. Effective freedom exists, but it is seriously constrained.',
    high: 'Substantial capabilities. The person can function, though important deficits remain.',
    full: 'Full capabilities. This is Sen\'s normative ideal, and very few people in the world fully reach it.'
  }
});

Object.assign(window.I18N_CONTENT.locales.en.colombia, {
  tableHeaders: ['Index', 'Negative Liberty', 'Positive Liberty', 'Capabilities', 'Economic-Libertarian'],
  indicators: [
    {
      id: 'economic_freedom',
      source: 'Fraser Institute',
      name: 'Economic Freedom of the World',
      unit: '/ 100',
      rank: '94 / 165',
      evaluations: {
        negativa: 'State overregulation',
        positiva: 'Capital privilege',
        capacidades: 'Nominal transaction',
        libertario: 'Excessive bureaucracy'
      }
    },
    {
      id: 'freedom_world',
      source: 'Freedom House',
      name: 'Freedom in the World',
      unit: '/ 100',
      rank: 'Partly Free',
      evaluations: {
        negativa: 'Partly Free (coerced)',
        positiva: 'Unequal formal freedom',
        capacidades: 'Agency deprivation',
        libertario: 'Insecure property rights'
      }
    },
    {
      id: 'hdi',
      source: 'UNDP',
      name: 'Human Development Index',
      unit: '(0-1)',
      rank: '91 / 193',
      evaluations: {
        negativa: 'Irrelevant metric',
        positiva: 'Average hides inequality',
        capacidades: 'Invisible regional gaps',
        libertario: 'Market growth proxy'
      }
    }
  ],
  readings: {
    negativa: 'From a negative-liberty reading, Colombia\'s central problems are coercive actors, insecurity, and institutional weakness rather than the absence of material provision.',
    positiva: 'From a positive-liberty reading, formal rights coexist with severe inequalities in the real capacity to choose, move, learn, and plan one\'s life.',
    capacidades: 'From a capabilities reading, national averages conceal deep territorial and social asymmetries. Freedom must be read through functioning, not through formal permissions alone.',
    libertario: 'From an economic-libertarian reading, the key obstacles are overregulation, corruption, weak rule enforcement, and barriers that distort exchange and property rights.'
  }
});

Object.assign(window.I18N_CONTENT.locales.en.systemNarratives, {
  closed: {
    title: 'Closed system and value monism',
    content: 'There is one supreme value: Liberty, Equality, Reason, God, or History. All other values are derivative or merely instrumental. Apparent conflicts are errors or transitional stages that will disappear once the supreme value is fully understood.',
    implications: [
      'There is one correct answer to every political question.',
      'Disagreement is a symptom of ignorance or bad faith.',
      'An authority that knows the supreme value may impose it legitimately.',
      'Those who resist do so because they have not yet reached proper understanding.'
    ],
    warning: 'This structure has supported projects as different as Marxism-Leninism, religious fundamentalism, and extreme market dogmatism. The content changes. The form remains.'
  },
  plural: {
    title: 'Plural system and value pluralism',
    content: 'There are multiple genuinely important values such as liberty, equality, security, excellence, and solidarity, and they are irreducibly incompatible with one another. There is no master value that finally reconciles them.',
    implications: [
      'There is no perfect answer, only trade-offs.',
      'Political disagreement is inevitable and often legitimate.',
      'Prudence means managing losses, not erasing conflict.',
      'Humility about one\'s own position is not weakness. It is rationality.'
    ],
    warning: 'Pluralism is not relativism. You may recognize multiple genuine values without concluding that every compromise is equally valid or that all distinctions collapse.'
  }
});
