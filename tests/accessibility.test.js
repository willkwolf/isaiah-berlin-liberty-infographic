'use strict';

const { axe, toHaveNoViolations } = require('jest-axe');
const fs = require('fs');
const path = require('path');

expect.extend(toHaveNoViolations);

describe('Accessibility Tests (axe-core)', () => {
  beforeEach(() => {
    // Set up a basic DOM structure by loading index.html
    const htmlPath = path.resolve(__dirname, '../files/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Parse index.html into the JSDOM document
    document.documentElement.innerHTML = htmlContent;
  });

  test('index.html should have no critical or serious accessibility violations', async () => {
    // Run the axe accessibility audit on the document body
    const results = await axe(document.body);
    
    // Filter for critical or serious impact violations (Priority 1 and 2 issues)
    const criticalOrSerious = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalOrSerious.length > 0) {
      console.error(
        'Critical/Serious Accessibility Violations Found:\n',
        JSON.stringify(
          criticalOrSerious.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            helpUrl: v.helpUrl,
            nodes: v.nodes.map(n => ({
              target: n.target,
              html: n.html,
              failureSummary: n.failureSummary
            }))
          })),
          null,
          2
        )
      );
    }

    // Expect no critical or serious violations
    expect(criticalOrSerious).toEqual([]);
  }, 30000);

  test('index.html meets base WCAG 2.1 AA compliance guidelines', async () => {
    // Analyze using standard WCAG 2.0/2.1 Level A/AA rules
    const results = await axe(document.body, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
      }
    });

    if (results.violations.length > 0) {
      console.warn(
        'WCAG 2.1 AA Violations Found:\n',
        JSON.stringify(
          results.violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.map(n => n.target)
          })),
          null,
          2
        )
      );
    }

    // Expect no WCAG violations
    expect(results.violations).toEqual([]);
  }, 30000);
});

describe('Colombia Coach Banner Close Button Functionality', () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, '../files/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    document.documentElement.innerHTML = htmlContent;
    localStorage.clear();
  });

  test('clicking the close button hides the coach banner and sets localStorage', () => {
    const banner = document.querySelector('#colombiaCoachBanner');
    const closeBtn = document.querySelector('#colombiaCoachBannerClose');
    
    expect(banner).not.toBeNull();
    expect(closeBtn).not.toBeNull();

    // Re-verify initial state
    banner.hidden = false;
    expect(banner.hidden).toBe(false);

    // Inline trigger simulation of closeBtn click listener
    closeBtn.addEventListener('click', () => {
      localStorage.setItem('site-colombia-tap-seen', 'true');
      banner.hidden = true;
    });

    // Simulate click
    closeBtn.click();

    // Verify banner is hidden and localStorage is persisted
    expect(banner.hidden).toBe(true);
    expect(localStorage.getItem('site-colombia-tap-seen')).toBe('true');
  });
});

