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
  { selector: '.top-nav__link[href="#genealogia"]', type: 'attr', attr: 'title', value: 'X: Genealogy' },
  { selector: '.top-nav__link[href="#cierre"]', type: 'attr', attr: 'title', value: 'XI: Closing' },
  { selector: '#genealogia-title', type: 'html', value: 'Genealogy of Power<br/><em>how we organize liberty</em>' },
  { selector: '#genealogia-subtitle', type: 'text', value: 'From single order to coexistence of orders: a history of restrictions, autonomies, and compromises.' },
  { selector: '#genealogiaLeadText', type: 'text', value: 'Not all restrictions on liberty stem from the same principle. Some institutions concentrate authority in the name of a truth, a faith, a nation, or a historical project. Others distribute power among jurisdictions, rights, communities, and individuals. No architecture eliminates all conflicts: each one decides who may restrict what, with what justification, and at what cost.' },
  { selector: '#genealogiaTimelineHeading', type: 'text', value: '1. Institutional configurations in contest' },
  { selector: '#genealogiaTimelineDesc', type: 'text', value: 'Institutions do not follow a unilinear or teleological path toward a predetermined end. They coexist, collide, and transform according to who accumulates legitimacy and force.' },
  { selector: '#genealogiaMatrixHeading', type: 'text', value: '2. Matrix: Authority concentration and historical position' },
  { selector: '#genealogiaMatrixDesc', type: 'text', value: 'Two distinct analytical dimensions: (A) concentration of authority and monist claim vs. distribution and coexistence of orders; (B) relative historical position (hegemony, subordination, emergence, or decline), which depends on territorial and temporal context, not on doctrine.' },
  { selector: '#matrixFilterAll', type: 'text', value: 'All configurations' },
  { selector: '#matrixFilterConc', type: 'text', value: 'Concentrated order (Monist)' },
  { selector: '#matrixFilterDist', type: 'text', value: 'Coexistence (Pluralist)' },
  { selector: '#genealogiaLabHeading', type: 'text', value: '3. Laboratory of restrictions: Mechanisms and costs' },
  { selector: '#genealogiaLabDesc', type: 'text', value: 'Each case distinguishes four levels: ideological legitimation, institutional distribution of authority, concrete mechanism of restriction, and effective consequences.' },
  { selector: '#genealogiaClosingTitle', type: 'text', value: 'The inescapable compromise: Reconciling conflicting values' },
  { selector: '#genealogiaClosingText', type: 'text', value: 'Isaiah Berlin insisted that political decisions confront legitimate values that clash irreducibly. Pluralism is not relativism: acknowledging that multiple genuine goods exist does not imply that every institution is legitimate. A pluralist architecture can also exclude or fragment, while a common collective rule may limit a particular conduct precisely to protect the liberties and capabilities of others.' },
  { selector: '#genealogiaClosingEyebrow', type: 'text', value: 'Guiding question of the genealogy' },
  { selector: '#genealogiaClosingQuote', type: 'text', value: '“What liberty is restricted, to protect which, who decides, and how can that decision be challenged?”' },
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
  { selector: '#limitsLabTag', type: 'text', value: 'Conceptual Laboratory' },
  { selector: '#limitsLabTitle', type: 'text', value: 'Coercion or Incapacity? Classify Real-World Scenarios' },
  { selector: '#limitsLabSubtitle', type: 'text', value: 'Tap each lab card to see how Berlin, Sen, and Hayek react to the same dilemma.' },
  { selector: '#limitsLabTabs button[data-case="pasaje"] .lab-tab__name', type: 'text', value: 'Bus fare' },
  { selector: '#limitsLabTabs button[data-case="domingo"] .lab-tab__name', type: 'text', value: 'Sunday closing' },
  { selector: '#limitsLabTabs button[data-case="licencia"] .lab-tab__name', type: 'text', value: 'Costly license' },
  { selector: '#limitsLabTabs button[data-case="rampa"] .lab-tab__name', type: 'text', value: 'Lack of ramps' },
  { selector: '#labScenarioLabel', type: 'text', value: 'Scenario under analysis:' },
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
  { selector: '#econDialogueTitle', type: 'text', value: 'The Free Market Debate' },
  { selector: '#econDefenseTitle', type: 'text', value: 'The Liberal Argument' },
  { selector: '#econDefense1', type: 'html', value: '<strong>Shield against serfdom:</strong> The free market disperses economic power, preventing any central entity from controlling the lives and choices of individuals.' },
  { selector: '#econDefense2', type: 'html', value: '<strong>Voluntary coordination:</strong> The price system coordinates the decentralized knowledge of millions of people voluntarily, without central coercion.' },
  { selector: '#econDefense3', type: 'html', value: '<strong>Prosperity of choices:</strong> Economic growth derived from free competition multiplies the actual life options available to all through innovation.' },
  { selector: '#econCritiqueTitle', type: 'text', value: 'The Interventionist Critique' },
  { selector: '#econCritique1', type: 'html', value: '<strong>Asymmetries of factual power:</strong> The market does not operate in a vacuum: it reflects and amplifies drastic differences in initial bargaining power and inherited wealth.' },
  { selector: '#econCritique2', type: 'html', value: '<strong>State non-interference:</strong> The decision not to regulate is itself a political choice with defined winners and losers, not a natural state of neutrality.' },
  { selector: '#econCritique3', type: 'html', value: '<strong>Empty formal freedom:</strong> The formal freedom to contract or trade is useless for those who lack the basic material conditions to survive (freedom without capability).' }
);

window.I18N_CONTENT.locales.en.staticContent.push(
  { selector: '#sen-title', type: 'html', value: 'Amartya Sen<br/><em>liberty as real capability</em>' },
  { selector: '#sen .section__subtitle', type: 'html', value: 'Sen rejects measuring liberty through income or resources. The question is: <strong>what can this person actually do and be?</strong>' },
  { selector: '#sen .sen-intro-quote p', type: 'text', value: '“Development can be seen as a process of expanding the real freedoms that people enjoy.”' },
  { selector: '#sen .sen-intro-quote cite', type: 'html', value: 'Amartya Sen, <em>Development as Freedom</em> (1999)' },
  { selector: '#sen .sen-caps-intro', type: 'text', value: 'Activate or deactivate capabilities to see how effective freedom changes:' },
  { selector: '#senProfileLabel', type: 'text', value: 'Trade-off Simulator' },
  { selector: '#tradeoffSenLabel', type: 'text', value: 'Real Capabilities (Sen)' },
  { selector: '#tradeoffNegLabel', type: 'text', value: 'Non-Interference (Berlin/Hayek)' },
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
  { selector: '#superiorSelfTitle', type: 'text', value: 'The Extremes of Monism: Dogmatic Deviations' },
  { selector: '#superiorSelfIntro', type: 'text', value: 'Isaiah Berlin warned that when any single value is elevated to an absolute and unique dogma, oppression is justified. Both concepts of liberty have their own dangerous slide when they become monistic:' },
  { selector: '#monismDangerPositiveTitle', type: 'text', value: 'Positive Liberty Deviation: The “Higher Self”' },
  { selector: '#monismDangerPositiveText', type: 'html', value: 'Occurs when assuming there is an ideal "rational self" and that the state or an enlightened leader knows better than the individual what they "really" want. Coercing them to act rationally is fallaciously labeled as <em>"liberating"</em> them.' },
  { selector: '#monismDangerPositiveConclusion', type: 'text', value: 'Historically, it has justified extreme paternalisms, teocracies, and state totalitarianisms.' },
  { selector: '#monismDangerNegativeTitle', type: 'text', value: 'Negative Liberty Deviation: The “Private Domination”' },
  { selector: '#monismDangerNegativeText', type: 'html', value: 'Occurs when assuming that state non-interference is the sole supreme good, ignoring drastic asymmetries of factual power. Absolute state abandonment is fallaciously labeled as <em>"liberty"</em>, even if it leaves the weak at the mercy of the strong.' },
  { selector: '#monismDangerNegativeConclusion', type: 'text', value: 'Historically, it has justified social Darwinism, labor exploitation, and boundless oligopolistic concentration.' },
  { selector: '#superiorSelfConclusion', type: 'html', value: 'The danger does not lie in the content of the chosen value, but in the <strong>structure of the monistic argument</strong>: the pretense that there is a single correct, harmonious answer for human organization.' },
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
  { selector: '#footerMetaDate', type: 'text', value: 'Prepared: March 2026' },
  // Ecosystem Stepper and Callout
  { selector: '#cierreEcosystemTag', type: 'text', value: 'Critical Thinking Path · Step 4' },
  { selector: '#cierreEcosystemTitle', type: 'text', value: 'Material limits of liberty: What height do you live at?' },
  { selector: '#cierreEcosystemText', type: 'text', value: 'Can a person be truly free if they lack the basic material conditions to act? Formal liberty crashes head-on with the real material gaps of our world.' },
  { selector: '#cierreEcosystemBtn', type: 'text', value: 'Discover the Global Wealth Scale ➔' },
  { selector: '#stepPathTitle', type: 'text', value: 'Critical Thinking Path' },
  { selector: '#stepPathSub', type: 'text', value: 'A network of interactive visualizations to explore economics and society' },
  { selector: '#stepTitle1', type: 'text', value: 'Understand' },
  { selector: '#stepProject1', type: 'text', value: 'Schools Map' },
  { selector: '#stepStatusExplore1', type: 'text', value: 'Explore ➔' },
  { selector: '#stepTitle2', type: 'text', value: 'Mix' },
  { selector: '#stepProject2', type: 'text', value: 'The Cocktail Bar' },
  { selector: '#stepStatusExplore2', type: 'text', value: 'Explore ➔' },
  { selector: '#stepTitle3', type: 'text', value: 'Contrast' },
  { selector: '#stepProject3', type: 'text', value: 'Philosophy of Liberty' },
  { selector: '#stepStatusHere', type: 'text', value: 'You are here' },
  { selector: '#stepTitle4', type: 'text', value: 'Scale' },
  { selector: '#stepProject4', type: 'text', value: 'Global Wealth Gap' },
  { selector: '#stepStatusExplore4', type: 'text', value: 'Explore ➔' },
  { selector: '#stepTitle5', type: 'text', value: 'Land' },
  { selector: '#stepProject5', type: 'text', value: 'Inequality in Colombia' },
  { selector: '#stepStatusExplore5', type: 'text', value: 'Explore ➔' },
  // Section X: Genealogía del poder
  { selector: '#genealogia-title', type: 'html', value: 'Genealogy of Power<br/><em>how we organize liberty</em>' },
  { selector: '#genealogia .section__subtitle', type: 'text', value: 'Every political order claims to defend liberty. What actually changes is who gets to decide, who bears the costs, and which reasons are declared legitimate.' },
  { selector: '#axisLabelMonismo', type: 'text', value: '▲ MONISM (One Supreme Organizing Principle) ▲' },
  { selector: '#axisLabelPluralismo', type: 'text', value: '▼ PLURALISM (Multiple Incommensurable Values) ▼' },
  { selector: '#axisLabelHegemonia', type: 'text', value: '◀ CONSOLIDATED HISTORICAL HEGEMONY' },
  { selector: '#axisLabelMarginalidad', type: 'text', value: 'MARGINALITY / RADICAL EMERGENCE ▶' },
  { selector: '#modalCloseActionBtn', type: 'text', value: 'Close' },
  { selector: '#genealogiaMethodologyNote', type: 'text', value: 'Pedagogical Cartography: This 2D matrix maps 23 institutional and theoretical architectures according to their value framework (Monism vs. Pluralism) and their historical degree of institutionalization. Tap any architecture to inspect its authority mechanisms, winners, losers, and academic sources in the modal dialog.' },
  { selector: '#genealogiaClosingTitle', type: 'text', value: 'The Historical Metamorphosis of Power' },
  { selector: '#genealogiaClosingText', type: 'text', value: 'Every political architecture constructs a legitimation narrative to naturalize its restrictions. When we examine history, freedom is never an abstract property: it is a precarious configuration of who has the power to restrict, who must obey, and what counterweights prevent the absolute domination of the weak.' },
  { selector: '#genealogiaClosingEyebrow', type: 'text', value: 'The Berlin Question for Any Political Architecture' },
  { selector: '#genealogiaClosingQuote', type: 'text', value: '«Who governs me, to what extent, and what inviolable space remains where I may act without interference?»' }
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
      colombia: 'From a negative-liberty reading, Colombia\'s central problems are coercive actors, insecurity, and institutional weakness rather than the absence of material provision.',
      genealogia: 'From this framework, the genealogy of power is the history of wresting inviolable spaces of non-interference from political authority. No sacred, imperial, or collectivist justification excuses arbitrary coercion. Constitutionalism and the dispersal of power are valuable not because they redistribute wealth, but because they limit the sovereign.'
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
      colombia: 'From a positive-liberty reading, formal rights coexist with severe inequalities in the real capacity to choose, move, learn, and plan one\'s life.',
      genealogia: 'This historical trajectory demonstrates that liberty is not a natural state of non-interference, but an institutional conquest. Public education, labor rights, and the welfare state do not diminish liberty: they create it by emancipating citizens from feudal servitude or private economic dependence.'
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
      colombia: 'From a capabilities reading, national averages conceal deep territorial and social asymmetries. Freedom must be read through functioning, not through formal permissions alone.',
      genealogia: 'Institutions must be judged by which substantive capabilities they enable or crush in everyday life. An imperial order destroys agency through violent extraction; an unregulated market may destroy it through insolvency and deprivation. Formal legitimation matters less than the actual lives people are able to lead.'
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
      colombia: 'From an economic-libertarian reading, the key obstacles are overregulation, corruption, weak rule enforcement, and barriers that distort exchange and property rights.',
      genealogia: 'The historical lesson is unequivocal: concentrated power breeds tyranny regardless of its declared benevolent intentions. Only the strict division of state monopoly, the rule of law, and the uncompromising defense of decentralized property rights allow complex societies to coordinate peacefully.'
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

window.I18N_CONTENT.locales.en.limitsLab = {
  cases: [
    {
      id: 'pasaje',
      title: 'Bus fare',
      scenario: 'A low-income citizen in Bogotá cannot afford the bus fare to go to work.',
      analysis: {
        berlin: {
          verdict: 'INCAPACITY',
          desc: 'There is no specific human agent deliberately preventing them from boarding. Hence, it is not direct coercion or lack of political freedom. It is a restriction of material resources.'
        },
        sen: {
          verdict: 'LACK OF FREEDOM',
          desc: 'It is a lack of effective freedom. The inability to move freely to work cancels a basic capability. Deciding "whose fault it is" is secondary to the actual loss of agency.'
        },
        hayek: {
          verdict: 'NATURAL SCARCITY',
          desc: 'It is a problem of scarcity and lack of economic resources, not coercion. The free market, if undistorted, is the best path to generate the income needed to pay for it.'
        }
      }
    },
    {
      id: 'domingo',
      title: 'Sunday closing',
      scenario: 'A law prohibits commercial establishments from opening on Sundays for regulatory reasons.',
      analysis: {
        berlin: {
          verdict: 'DIRECT COERCION',
          desc: 'It is real and explicit political coercion. The state uses the threat of legal sanction to directly interfere with the individual\'s voluntary decision to trade.'
        },
        sen: {
          verdict: 'AGENCY LIMITATION',
          desc: 'It represents a limitation in the capability to freely decide working hours and cultural development, though the total impact on basic capabilities is minor.'
        },
        hayek: {
          verdict: 'STATE COERCION',
          desc: 'Arbitrary state coercion that distorts the spontaneous market order. It destroys commercial freedom and the contractual autonomy of citizens.'
        }
      }
    },
    {
      id: 'licencia',
      title: 'Costly license',
      scenario: 'The state sets a one million dollar fee by regulation for a radio spectrum license.',
      analysis: {
        berlin: {
          verdict: 'STATE COERCION',
          desc: 'It is direct coercion on those who want to broadcast but cannot because of the artificial barrier deliberately imposed by the state.'
        },
        sen: {
          verdict: 'PARTICIPATION BARRIER',
          desc: 'Deprivation of the capability of public participation, expression, and civic communication for sectors that do not have large capital.'
        },
        hayek: {
          verdict: 'COERCION / BARRIER',
          desc: 'It is a monopoly privilege created by law that restricts free competition and coerces the entry of new competitors into the market.'
        }
      }
    },
    {
      id: 'rampa',
      title: 'Lack of ramps',
      scenario: 'A person in a wheelchair cannot enter a municipal city hall because the building lacks access ramps.',
      analysis: {
        berlin: {
          verdict: 'PHYSICAL INCAPACITY',
          desc: 'Although it is a regrettable social fact, from pure negative liberty it is a physical or technical incapacity of the subject, not an act of intentional human coercion.'
        },
        sen: {
          verdict: 'AGENCY DEPRIVATION',
          desc: 'It is a violation of real freedom. The lack of adapted infrastructure cancels the basic capability of mobility and of interacting with civic institutions without humiliation.'
        },
        hayek: {
          verdict: 'LACK OF INFRASTRUCTURE',
          desc: 'It is a deficiency in the provision of public goods by the municipality, but it does not qualify as coercion of the individual if there is no law forbidding entry.'
        }
      }
    }
  ]
};

window.I18N_CONTENT.locales.en.genealogia = {
  quadrants: {
    monismo_hegemonico: {
      name: 'Uniform Dominion',
      subtitle: 'Monist hegemony · Historical empires, sacred orders & absolute states'
    },
    monismo_marginal: {
      name: 'Centralized Authority',
      subtitle: 'Declining or marginal monism · Totalitarian regimes & autocracies'
    },
    pluralismo_consolidado: {
      name: 'Pluralist Hegemony',
      subtitle: 'Consolidated pluralism · Constitutional democracies, republics & federalism'
    },
    pluralismo_emergente: {
      name: 'Emergent Pluralism',
      subtitle: 'Radical diversity · Countercultures, commons, autonomies & bottom-up networks'
    }
  },
  architectures: [
    // ── Q1: UNIFORM DOMINION (Monist Hegemony) ──────────────────────────────────
    {
      id: 'imperio_tributario',
      quadrantId: 'monismo_hegemonico',
      quadrantLabel: 'Uniform Dominion · Monist hegemony',
      name: 'Tributary Imperial Order',
      period: 'Antiquity to early modernity (Roman, Persian, Ottoman, Incan empires)',
      context: 'Vast multi-ethnic domains organized around metropolitan extraction and supreme allegiance to the imperial center.',
      authority: 'Dynastic emperor, divinized monarch, or central court commanding bureaucratic and military apparatuses.',
      mechanism: 'Compulsory taxation, military levies, territorial administrative subordination, and punitive monopolies.',
      justification: 'Universal peace (Pax Augusta), sacred cosmic balance, and defense against external barbarian chaos.',
      gainers: 'Imperial court, metropole military nobility, and chartered tax-farming oligarchies.',
      costBearers: 'Peripheral tributary peasantries, conquered communities, and enslaved labor forces.',
      counterweights: 'Geographic logistical friction, peripheral anti-tax rebellions, and dynastic palace succession crises.',
      lensReading: 'Negative liberty is treated as a conditional concession from the center; subject populations lack political rights or independent legal redress.',
      reference: 'Tilly, C. (1990). Coercion, Capital, and European States; Burbank & Cooper (2010). Empires in World History.'
    },
    {
      id: 'teocracia',
      quadrantId: 'monismo_hegemonico',
      quadrantLabel: 'Uniform Dominion · Monist hegemony',
      name: 'Sacred Theocracy',
      period: 'Ancient Near East, Medieval Christendom, Papal States, Geneva of Calvin',
      context: 'Political communities where revealed dogma is the ultimate source of all civil and criminal validity.',
      authority: 'Priestly hierarchy, ecclesiastical councils, or divinely consecrated monarchs.',
      mechanism: 'Inquisitorial courts, canon law, bans on heresy, civic excommunication, and dogmatic censorship.',
      justification: 'Salvation of immortal souls, divine truth, and suppression of spiritual corruption.',
      gainers: 'Ecclesiastical castes, sacred jurists, and orthodox civil patrons.',
      costBearers: 'Theological dissidents, religious minorities, heretical thinkers, and women under moral policing.',
      counterweights: 'Internal theological schisms, reformist conciliar movements, and rival secular crowns.',
      lensReading: 'Pure positive monism: freedom is conceived only as voluntary obedience to divine commandment; error has no rights.',
      reference: 'Berman, H. J. (1983). Law and Revolution; Walzer, M. (1965). The Revolution of the Saints.'
    },
    {
      id: 'monarquia',
      quadrantId: 'monismo_hegemonico',
      quadrantLabel: 'Uniform Dominion · Monist hegemony',
      name: 'Absolutist Monarchy',
      period: '16th to 18th Centuries (Ancien Régime, Louis XIV, Philip II)',
      context: 'Centralization of indivisible sovereign authority to overcome feudal fragmentation and religious warfare.',
      authority: 'Sovereign monarch by divine right wielding sole lawgiving prerogative without estate consent.',
      mechanism: 'Letters de cachet, permanent standing armies, fiscal monopolies, and subordination of local courts.',
      justification: 'Raison d\'État, exit from the war of all against all (Hobbes), and unified public tranquility.',
      gainers: 'The Crown, courtly nobility, and unified administrative officers of the emergent modern state.',
      costBearers: 'Taxed peasantry, unrepresented mercantile bourgeoisie, and stripped regional chartered provinces.',
      counterweights: 'Judicial parliaments with remonstrance rights, fiscal insolvency crises, and popular food/tax riots.',
      lensReading: 'Private non-interference is fragile and contingent on the sovereign\'s arbitrary will; absence of liberal political liberty.',
      reference: 'Bodin, J. (1576). Six Books of the Commonwealth; Anderson, P. (1974). Lineages of the Absolutist State.'
    },
    {
      id: 'califato',
      quadrantId: 'monismo_hegemonico',
      quadrantLabel: 'Uniform Dominion · Monist hegemony',
      name: 'Historical Caliphate',
      period: 'Rashidun, Umayyad, Abbasid, and Ottoman Caliphates (7th to 20th Centuries)',
      context: 'Transcontinental imperial realm premised on the political and spiritual unity of the Islamic community.',
      authority: 'Caliph as political successor to the Prophet and guardian of the faith, aided by viziers and cadis.',
      mechanism: 'Dhimma pact with specific poll-tax (jizya) for protected confessions, sharia jurisprudence, and sultanic decrees.',
      justification: 'Enforcement of divine justice, defense of the umma against external foes, and regulated confessional peace.',
      gainers: 'Patrician Muslim nobility, jurists of the legal schools, and trans-Eurasian merchant networks.',
      costBearers: 'Tributary non-Muslim populations, chattel slaves, and theological sects classified as heretical.',
      counterweights: 'Juridical autonomy of the law schools (madhhabs), tribal uprisings, and distance constraints.',
      lensReading: 'Codified coexistence under institutional subordination: conditional tolerance that differs from equal civic rights or republican freedom.',
      reference: 'Crone, P. (2004). God\'s Rule: Government and Islam; Hourani, A. (1991). A History of the Arab Peoples.'
    },
    {
      id: 'confucianismo',
      quadrantId: 'monismo_hegemonico',
      quadrantLabel: 'Uniform Dominion · Monist hegemony',
      name: 'Imperial Confucianism',
      period: 'Han through Qing Dynasties (China, 206 BCE – 1912 CE)',
      context: 'Literati-led bureaucratic empire organized around moral duty, filial piety, and cosmic-social harmony.',
      authority: 'Emperor (Son of Heaven) served by mandarin scholar-officials selected through competitive imperial civil exams.',
      mechanism: 'Confucian penal code, mandatory imperial exams, compulsory filial submission, and neighborhood surveillance (baojia).',
      justification: 'Mandate of Heaven (Tianming), preservation of cosmic order, and ritual benevolence (ren and li).',
      gainers: 'Literati-gentry class (shi), landed kinship clans, and the ruling imperial lineage.',
      costBearers: 'Peasants subjected to corvée labor, culturally disparaged merchants, and secluded patriarchal women.',
      counterweights: 'Doctrine of losing the Mandate of Heaven upon floods/famines, and censorial remonstrances from senior officials.',
      lensReading: 'Structural moral monism: personal autonomy is unthinkable outside the role prescribed by collective ethical hierarchy.',
      reference: 'Fairbank, J. K. (1992). China: A New History; Schwartz, B. (1985). The World of Thought in Ancient China.'
    },
    {
      id: 'nacionalismo_autoritario',
      quadrantId: 'monismo_hegemonico',
      quadrantLabel: 'Uniform Dominion · Monist hegemony',
      name: 'Authoritarian Nationalism',
      period: '19th and 20th Centuries (Bismarckian Germany, Estado Novo in Portugal, Latin American military juntas)',
      context: 'Conservative modernization welding the state apparatus together by suppressing partisan and labor pluralism.',
      authority: 'Centralized autocracy supported by professional armed forces, secret police, and industrial monopolies.',
      mechanism: 'Press censorship, selective banning of independent trade unions, martial decrees, and political courts.',
      justification: 'Organic national unity, economic development without class warfare, and geopolitical defense.',
      gainers: 'Military high command, state technocracy, and protected industrial cartels.',
      costBearers: 'Organized labor unions, non-assimilated ethnic minorities, and democratic parliamentary dissidents.',
      counterweights: 'Spontaneous wildcat strikes, internal military factional splits, and foreign diplomatic pressure.',
      lensReading: 'The state absorbs civic allegiance, reducing negative freedom to discretionary privileges granted from above.',
      reference: 'Linz, J. J. (2000). Totalitarian and Authoritarian Regimes; Gellner, E. (1983). Nations and Nationalism.'
    },

    // ── Q2: CENTRALIZED AUTHORITY (Declining or Marginal Monism) ────────────────
    {
      id: 'fascismo',
      quadrantId: 'monismo_marginal',
      quadrantLabel: 'Centralized Authority · Declining or marginal monism',
      name: 'Fascism & National Socialism',
      period: 'Interwar era (Fascist Italy 1922-1943, Nazi Germany 1933-1945)',
      context: 'Mass totalitarian mobilization led by a paramilitarized party destroying constitutional democracy.',
      authority: 'Infallible charismatic dictator (Duce/Führer) backed by a single party seeking total societal coordination (Gleichschaltung).',
      mechanism: 'Paramilitary terror, secret state police (Gestapo/OVRA), concentration camps, forced syndicalism, and state racism.',
      justification: 'Mythic national rebirth (palingenesis), biological racial supremacy, and absolute devotion to the state.',
      gainers: 'Party hierarchy, secret police commanders, and cartelized military-industrial conglomerates.',
      costBearers: 'Targeted racial/ethnic minorities, political dissidents, independent labor unions, and citizens stripped of private life.',
      counterweights: 'Nonexistent within the internal legal order; solely military defeat or covert sabotage.',
      lensReading: 'The devastating climax of monism: total annihilation of both negative liberty and autonomous human agency.',
      reference: 'Paxton, R. O. (2004). The Anatomy of Fascism; Arendt, H. (1951). The Origins of Totalitarianism.'
    },
    {
      id: 'marxismo_leninismo',
      quadrantId: 'monismo_marginal',
      quadrantLabel: 'Centralized Authority · Declining or marginal monism',
      name: 'Marxism-Leninism',
      period: 'Soviet Union (1917-1991), Eastern Bloc, Maoist China, contemporary single-party states',
      context: 'Revolutionary state driven by a vanguard party claiming to embody historical necessity and class emancipation.',
      authority: 'Communist party vanguard, Politburo, Central Committee, and state security apparatus.',
      mechanism: 'Five-year economic central planning, state monopoly on all press/publishers, suppression of opposition, and gulag/laogai networks.',
      justification: 'Overcoming capitalist exploitation, proletarian class dictatorship, and construction of the socialist society.',
      gainers: 'Party-state nomenklatura, industrial planners, and upwardly mobile proletarian cadres.',
      costBearers: 'Expropriated bourgeois and kulaks, intellectual dissidents, autonomous workers, and uncooperative peasantry.',
      counterweights: 'Internal bureaucratic factional struggles, samizdat underground literature, and post-Stalin legal reforms.',
      lensReading: 'Archetype of Berlin\'s positive liberty inversion: coercing citizens in the name of their "true historical self" justifies totalitarian domination.',
      reference: 'Berlin, I. (1958). Two Concepts of Liberty; Fitzpatrick, S. (1999). Everyday Stalinism.'
    },
    {
      id: 'teocracia_radical',
      quadrantId: 'monismo_marginal',
      quadrantLabel: 'Centralized Authority · Declining or marginal monism',
      name: 'Radical Fundamentalist Theocracy',
      period: 'Post-1979 Islamic Republic of Iran, Taliban rule in Afghanistan, historical Münster commune',
      context: 'State sovereignty subordinated to an infallible clerical guardianship enforcing literalist religious codes.',
      authority: 'Supreme Jurisconsult (Velayat-e Faqih), Guardian Council, or supreme clerical emir.',
      mechanism: 'Religious morality police, corporal and capital punishments for blasphemy/apostasy, gender segregation, and media control.',
      justification: 'Absolute supremacy of divine revelation, spiritual purification against Western decadence, and sacred law.',
      gainers: 'Clerical establishment, Revolutionary Guards, and subsidized religious charities.',
      costBearers: 'Women stripped of civil autonomy, secular intellectuals, religious minorities, and sexual dissidents.',
      counterweights: 'Underground civic disobedience, brave street protests, economic sanctions, and clerical dissent.',
      lensReading: 'Zero sphere of private negative liberty: intimate life, attire, and conscience are policed by sovereign religious authority.',
      reference: 'Arjomand, S. A. (1988). The Turban for the Crown; Roy, O. (1994). The Failure of Political Islam.'
    },
    {
      id: 'conservadurismo_autoritario',
      quadrantId: 'monismo_marginal',
      quadrantLabel: 'Centralized Authority · Declining or marginal monism',
      name: 'Traditionalist Authoritarianism',
      period: 'Francoist Spain (1939-1975), Dollfuss regime in Austria, Metternichian restoration',
      context: 'Reactionary regime aimed at freezing modern social change, defending traditional hierarchy and church alliance.',
      authority: 'Military Caudillo, hereditary oligarchies, and high ecclesiastical authorities.',
      mechanism: 'Banning of left-wing parties and regional languages, military tribunals, censorship, and official corporatism.',
      justification: 'Preservation of Christian order, national unity, and prevention of atheist revolution.',
      gainers: 'Landed aristocracy, church hierarchy, armed forces, and conservative banking dynasties.',
      costBearers: 'Regional autonomists (Basques, Catalans), working-class left, progressive educators, and women under male tutelage.',
      counterweights: 'Vatican II theological modernization, clandestine student and labor strikes, and international economic isolation.',
      lensReading: 'Tradition is weaponized as a monist dogma against which individual autonomy is cast as moral subversion.',
      reference: 'Preston, P. (1993). Franco: A Biography; Linz, J. J. (1964). An Authoritarian Regime: The Case of Spain.'
    },
    {
      id: 'nacionalismo_etnico',
      quadrantId: 'monismo_marginal',
      quadrantLabel: 'Centralized Authority · Declining or marginal monism',
      name: 'Ethno-Nationalist Hegemonism',
      period: 'Apartheid South Africa (1948-1994), Balkan wars of the 1990s, modern illiberal ethno-states',
      context: 'State apparatus captured by a dominant ethnic or racial collective that deprives out-groups of equal status.',
      authority: 'Ruling ethno-national party, racial parliament, or chauvinistic executive.',
      mechanism: 'Racial segregation laws, disenfranchisement, discriminatory land allocations, and internal passport passes.',
      justification: 'Purity, demographic survival, and historical entitlement of the titular ethnic nation.',
      gainers: 'Members of the titular ethnic collective, favored racial businesses, and ethnic patronage networks.',
      costBearers: 'Excluded ethnic/racial populations, internal refugees, mixed families, and universalist liberals.',
      counterweights: 'International boycotts, armed resistance, civil disobedience, and demographic pressures.',
      lensReading: 'Full civic rights are made conditional on genetic or cultural lineage: complete negation of universal negative liberty.',
      reference: 'Smith, A. D. (1986). The Ethnic Origins of Nations; Mamdani, M. (2001). When Victims Become Killers.'
    },

    // ── Q3: PLURALIST HEGEMONY (Consolidated Pluralism) ─────────────────────────
    {
      id: 'republicanismo',
      quadrantId: 'pluralismo_consolidado',
      quadrantLabel: 'Pluralist Hegemony · Consolidated pluralism',
      name: 'Classical Republicanism',
      period: 'Roman Republic, Renaissance Florence, Dutch Republic, Atlantic revolutionary thought',
      context: 'Government of laws, not of men, centered on civic virtue, popular participation, and non-domination.',
      authority: 'Elected assemblies, rotating senates, dual consulates, and civic militias.',
      mechanism: 'Term limits, rotation in office, popular tribunes with veto power, and public civic scrutiny.',
      justification: 'The common good (res publica), prevention of tyranny, and preservation of civic liberty through active citizenship.',
      gainers: 'Active citizens, propertied freemen, and public institutions shielded from oligopoly.',
      costBearers: 'Citizens burdened with civic/military obligations; historically, women, resident foreigners, and slaves.',
      counterweights: 'Mutual branch vetoes, civic trials, popular referendums, and strict anti-bribery laws.',
      lensReading: 'Pettit and Skinner\'s liberty as non-domination: freedom is not mere non-interference, but living without being subject to arbitrary power.',
      reference: 'Pettit, P. (1997). Republicanism: A Theory of Freedom and Government; Skinner, Q. (1998). Liberty before Liberalism.'
    },
    {
      id: 'liberalismo',
      quadrantId: 'pluralismo_consolidado',
      quadrantLabel: 'Pluralist Hegemony · Consolidated pluralism',
      name: 'Classical Liberalism',
      period: '17th to 19th Centuries (Locke, Montesquieu, Adam Smith, J.S. Mill)',
      context: 'Defense of inviolable individual rights against state intrusion and ecclesiastical coercion.',
      authority: 'Limited representative government bound by rule of law and an independent judiciary.',
      mechanism: 'Constitutional bills of rights, separation of powers, free contracts, and habeas corpus guarantees.',
      justification: 'Natural individual rights (life, liberty, property) and epistemic diversity (Mill\'s marketplace of ideas).',
      gainers: 'Autonomous individuals, entrepreneurs, religious minorities, and independent press outlets.',
      costBearers: 'Disadvantaged workers vulnerable to market volatility; limits on rapid collective redistributive action.',
      counterweights: 'Independent constitutional courts, regular elections, private property shields, and freedom of speech.',
      lensReading: 'The quintessential core of Berlin\'s negative liberty: an inviolable private frontier within which no agent may coerce.',
      reference: 'Locke, J. (1689). Two Treatises of Government; Mill, J. S. (1859). On Liberty; Berlin, I. (1969).'
    },
    {
      id: 'democracia_constitucional',
      quadrantId: 'pluralismo_consolidado',
      quadrantLabel: 'Pluralist Hegemony · Consolidated pluralism',
      name: 'Constitutional Welfare Democracy',
      period: 'Post-WWII Western Europe, contemporary Nordic social democracies, Canada, Japan',
      context: 'Synthesizes universal suffrage, competitive elections, counter-majoritarian rights, and robust social welfare states.',
      authority: 'Elected parliaments, prime ministers/presidents, and supreme constitutional courts.',
      mechanism: 'Progressive taxation, universal healthcare and public education, free elections, and judicial review.',
      justification: 'Dignity of the person, equal democratic citizenship, and material baseline for real capability (Rawls).',
      gainers: 'Vulnerable and middle-class citizens, minority groups, and civic associations.',
      costBearers: 'High-income taxpayers, corporate monopolies subject to regulation, and executive impatience.',
      counterweights: 'Independent constitutional courts, ombudsman offices, free press, and active civil society.',
      lensReading: 'Sen\'s capabilities approach in practice: negative liberty is preserved while the state builds the infrastructure for effective positive agency.',
      reference: 'Rawls, J. (1971). A Theory of Justice; Habermas, J. (1996). Between Facts and Norms.'
    },
    {
      id: 'federalismo',
      quadrantId: 'pluralismo_consolidado',
      quadrantLabel: 'Pluralist Hegemony · Consolidated pluralism',
      name: 'Federalism & Decentralization',
      period: 'United States (1787), Swiss Confederation, Federal Republic of Germany, Australia',
      context: 'Institutional division of sovereignty between a central national federation and autonomous subnational states/cantons.',
      authority: 'Dual sovereignty: federal executive/congress and state/provincial governments.',
      mechanism: 'Territorial constitutions, bicameral congress with state representation, inter-jurisdictional subsidiarity, and exit mobility.',
      justification: 'Preventing tyranny through spatial dispersal of power, respecting local cultural pluralism, and institutional laboratories.',
      gainers: 'Regional communities, peripheral cultural majorities, and citizens with inter-state mobility.',
      costBearers: 'National administrative velocity; risk of regional inequality gaps and jurisdictional turf wars.',
      counterweights: 'Federal supreme courts, constitutional amendment thresholds, and state referendum vetoes.',
      lensReading: 'Berlinian pluralism built into spatial architecture: diverse value models can govern different territories without forcing nationwide uniform dogma.',
      reference: 'Hamilton, Madison, Jay (1788). The Federalist Papers; Elazar, D. (1987). Exploring Federalism.'
    },
    {
      id: 'ciudad_estado',
      quadrantId: 'pluralismo_consolidado',
      quadrantLabel: 'Pluralist Hegemony · Consolidated pluralism',
      name: 'Autonomous City-State',
      period: 'Ancient Athens, Venetian Republic, Hanseatic League, contemporary Singapore/Hong Kong (early)',
      context: 'Self-governing urban enclave thriving through international trade, naval mobility, and civic autonomy.',
      authority: 'Urban council, merchant assembly, doge, or civic municipality chartered against feudal territorial crowns.',
      mechanism: 'Commercial codes, municipal franchise charters, guild representation, and port customs administration.',
      justification: 'Civic independence, maritime commercial freedom, and self-defense against despotic agrarian empires.',
      gainers: 'Urban merchant guilds, shipping syndicates, skilled master artisans, and municipal magistrates.',
      costBearers: 'Unskilled migrant day laborers (popolo minuto), rural hinterlands, and indentured servants.',
      counterweights: 'Guild assembly vetoes, external commercial rivalries, and term-limited civic magistracies.',
      lensReading: 'Localized liberty as municipal sanctuary: "Stadtluft macht frei" (city air makes you free) was the historical antidote to feudal serfdom.',
      reference: 'Pirenne, H. (1925). Medieval Cities; Braudel, F. (1979). The Wheels of Commerce.'
    },
    {
      id: 'tradiciones_feudales',
      quadrantId: 'pluralismo_consolidado',
      quadrantLabel: 'Pluralist Hegemony · Consolidated pluralism',
      name: 'Feudal Polycentricity & Charters',
      period: '9th to 15th Centuries (Western Europe, Magna Carta 1215, Fueros of Spain)',
      context: 'Fragmented jurisdictional matrix without a single sovereign; mutual obligations regulated through charters and contracts.',
      authority: 'Baronial courts, ecclesiastical jurisdictions, chartered towns, and suzerain monarchs.',
      mechanism: 'Bilateral vassalage pacts, seigneurial rights, ecclesiastical sanctuary, and local chartered liberties (fueros).',
      justification: 'Reciprocal loyalty, ancient custom, and divine law limiting any kingly claim to absolute power.',
      gainers: 'Baronial nobility, monastic orders, and chartered city burgers defending ancient privileges.',
      costBearers: 'Unfree serfs bound to the soil, lacking rights of migration and subject to lordly monopolies.',
      counterweights: 'Fragmented polycentric jurisdictions: if a lord abused power, subjects could appeal to church courts or royal charters.',
      lensReading: 'Historical lesson: pluralism of authority does not automatically equal democratic freedom; decentralization can protect local oppression.',
      reference: 'Bloch, M. (1961). Feudal Society; Berman, H. J. (1983). Law and Revolution.'
    },

    // ── Q4: EMERGENT PLURALISM (Radical Diversity) ──────────────────────────────
    {
      id: 'anarquismo',
      quadrantId: 'pluralismo_emergente',
      quadrantLabel: 'Emergent Pluralism · Radical diversity',
      name: 'Libertarian Anarchism',
      period: '19th to 20th Centuries (Proudhon, Bakunin, Kropotkin, Spanish Civil War collectives 1936)',
      context: 'Abolition of the state and wage labor, organizing society through voluntary federations and mutual aid.',
      authority: 'Consensual horizontal assemblies, free associations, and revocable confederations without state coercion.',
      mechanism: 'Direct action, collective self-management, free contract among collectives, and mutualist credit.',
      justification: 'Intrinsic autonomy of human beings, solidarity without hierarchy, and rejection of coercive authority.',
      gainers: 'Self-organized workers, cooperative members, and local communities freed from state predation.',
      costBearers: 'State and capitalist elites stripped of privileges; challenges in scaling coordination during military conflict.',
      counterweights: 'Absolute horizontality, instant revocability of delegates, and universal right of free disassociation.',
      lensReading: 'Negative liberty taken to its radical limit: every centralized institution is treated as illicit domination, replaced by voluntary mutual capability.',
      reference: 'Kropotkin, P. (1902). Mutual Aid; Bakunin, M. (1873). Statism and Anarchy; Ward, C. (1973). Anarchy in Action.'
    },
    {
      id: 'feminismo_interseccional',
      quadrantId: 'pluralismo_emergente',
      quadrantLabel: 'Emergent Pluralism · Radical diversity',
      name: 'Intersectional Feminism',
      period: 'Late 20th to 21st Centuries (Black feminism, Combahee River Collective, Crenshaw, Butler)',
      context: 'Critique of how gender, race, class, and sexuality intersect to produce compound vectors of exclusion.',
      authority: 'Decentered horizontal networks, affinity groups, feminist strikes, and critical scholarship.',
      mechanism: 'Public feminist strikes, cultural denunciation of patriarchal violence, mutual care networks, and legislative reforms.',
      justification: 'Bodily self-determination, dismantling systemic patriarchal domination, and collective care.',
      gainers: 'Women, LGBTQ+ communities, racialized workers, and caretakers historically rendered invisible.',
      costBearers: 'Traditional patriarchal privileges, conservative religious establishments, and predatory corporate practices.',
      counterweights: 'Grassroots assembly consensus, peer accountability, and independent feminist counter-institutions.',
      lensReading: 'Unveils the illusion of negative liberty: non-interference in the public square is useless if patriarchal domination reigns in the home.',
      reference: 'Crenshaw, K. (1989). Demarginalizing the Intersection; hooks, b. (2000). Feminist Theory: From Margin to Center.'
    },
    {
      id: 'ecologismo_radical',
      quadrantId: 'pluralismo_emergente',
      quadrantLabel: 'Emergent Pluralism · Radical diversity',
      name: 'Social Ecology & Rights of Nature',
      period: '1970s to present (Bookchin, Vandana Shiva, Buen Vivir in Ecuador and Bolivia)',
      context: 'Reconceptualizes political freedom within planetary biocentric boundaries, recognizing legal personhood for ecosystems.',
      authority: 'Bioregional councils, indigenous environmental guardians, and Earth jurisprudence courts.',
      mechanism: 'Constitutional rights of rivers/mountains, moratoriums on extractive mining, agroecological commons, and climate litigation.',
      justification: 'Ecological survival of the biosphere, intergenerational climate justice, and liberation from anthropocentric exploitation.',
      gainers: 'Future human generations, vulnerable frontline communities, and non-human living species.',
      costBearers: 'Fossil fuel corporations, carbon-intensive consumer models, and extractive developmentalist states.',
      counterweights: 'Ecological carrying capacity metrics, public judicial injunctions, and indigenous river guardianships.',
      lensReading: 'Human capabilities (Sen) are materially impossible without ecological integrity; negative liberty cannot extend to destroying life-support systems.',
      reference: 'Bookchin, M. (1982). The Ecology of Freedom; Shiva, V. (2005). Earth Democracy; Gudynas, E. (2011).'
    },
    {
      id: 'multiculturalismo',
      quadrantId: 'pluralismo_emergente',
      quadrantLabel: 'Emergent Pluralism · Radical diversity',
      name: 'Critical Multiculturalism',
      period: 'Late 20th to 21st Centuries (Taylor, Kymlicka, Parekh, postcolonial studies)',
      context: 'Rejection of assimilationist monocultural states in favor of institutional polyphony and minority rights.',
      authority: 'Intercultural councils, autonomous ethnic school boards, and poly-ethnic consultative committees.',
      mechanism: 'Language rights, affirmative group representation, cultural exemptions, and differentiated citizenship statutes.',
      justification: 'Equal dignity of cultural identities, self-respect, and historical reparation for colonial homogenization.',
      gainers: 'Linguistic minorities, diaspora immigrant communities, and marginalized religious traditions.',
      costBearers: 'Monocultural nationalist claims; friction with strict universalist secularists.',
      counterweights: 'Intercultural dialogue forums, constitutional courts safeguarding individual human rights within minority groups.',
      lensReading: 'Direct embodiment of Berlin\'s value pluralism: distinct cultural ways of life possess genuine, non-reducible value that cannot be flattened into a single mould.',
      reference: 'Taylor, C. (1994). Multiculturalism: Examining the Politics of Recognition; Kymlicka, W. (1995). Multicultural Citizenship.'
    },
    {
      id: 'movimientos_indigenas',
      quadrantId: 'pluralismo_emergente',
      quadrantLabel: 'Emergent Pluralism · Radical diversity',
      name: 'Indigenous Autonomies & Guardias',
      period: '500+ years of resistance to contemporary (EZLN in Chiapas, Guardia Indígena in Colombia, Cauca CRIC)',
      context: 'Sovereign community self-defense and ancestral territory self-governance operating in tension with the state.',
      authority: 'Cabildos mayores, assemblies of traditional authorities, and unarmed community defense bodies (Guardia Indígena).',
      mechanism: 'Customary indigenous law (Derecho Mayor), territory defense with ceremonial batons (bastones de mando), and communal mingas.',
      justification: 'Ancestral prior occupation, ILO Convention 169, protection of Mother Earth, and collective cultural survival.',
      gainers: 'Indigenous nations, peasant minga communities, and local biodiversity reserves.',
      costBearers: 'Illegal armed groups, illegal miners, agribusiness monocultures, and central state extractivism.',
      counterweights: 'Direct communal assembly accountability, community mandatos, and revocability of cabildo governors.',
      lensReading: 'Radical collective liberty: agency is collective and relational, demonstrating that freedom can thrive through peaceful counter-power without state arms.',
      reference: 'CRIC (2004). Diez Tesis sobre la Autonomía Indígena; Stavenhagen, R. (2002). Indigenous Peoples and the State.'
    },
    {
      id: 'comunalismo',
      quadrantId: 'pluralismo_emergente',
      quadrantLabel: 'Emergent Pluralism · Radical diversity',
      name: 'Democratic Confederalism & Commons',
      period: 'Rojava (Autonomous Administration of North and East Syria 2012-present), Ostrom\'s Commons, Zapatista Caracoles',
      context: 'Polycentric democracy built from bottom-up commune councils, co-presidencies with gender parity, and shared commons.',
      authority: 'Neighborhood communes, cantonal cantons, and federated coordination boards without a nation-state.',
      mechanism: 'Consensual assemblies, cooperative ownership of resources, mandatory female co-chairs, and restorative community peace committees.',
      justification: 'Overcoming statism, patriarchy, and capitalism through democratic confederalism and bottom-up autonomy (Öcalan/Bookchin).',
      gainers: 'Women, multi-ethnic local residents (Kurds, Arabs, Assyrians), and communal cooperative producers.',
      costBearers: 'Sovereign nation-states claiming territorial monopoly, feudal clan chiefs, and private monopolists.',
      counterweights: 'Dual gender co-presidency, recallable delegates, decentralized armed defense, and commune vetos.',
      lensReading: 'Live experiment in Berlinian anti-monism: proving that a complex multi-ethnic society can reject centralized domination while defending pluralist liberty.',
      reference: 'Öcalan, A. (2011). Democratic Confederalism; Ostrom, E. (1990). Governing the Commons: The Evolution of Institutions.'
    }
  ]
};
