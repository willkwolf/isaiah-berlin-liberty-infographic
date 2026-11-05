// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    headless: true,
    trace: 'off',
    screenshot: 'off'
  },
  projects: [
    {
      name: 'Desktop Full HD (1920x1080)',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'Standard Laptop (1366x768)',
      use: {
        viewport: { width: 1366, height: 768 }
      }
    },
    {
      name: 'Mobile (375x667)',
      use: {
        viewport: { width: 375, height: 667 },
        isMobile: true
      }
    }
  ]
});
