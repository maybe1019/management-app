import { Page } from '@playwright/test';
import { test } from '../../fixtures/baseFixtures';

type SettingsFixtures = {
  settingsPage: Page;
};

const settingsTest = test.extend<SettingsFixtures>({
  settingsPage: async ({ page }, use) => {
    await page.goto('/settings');
    await page.waitForResponse(/datasources/i);

    await use(page);
  },
});

export default settingsTest;
