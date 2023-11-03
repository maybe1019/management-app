import { Page } from '@playwright/test';
import settingsTest from '../settings.utils';
import { expect } from '../../../fixtures/baseFixtures';

type IntegrationsFixtures = {
  integrationsPage: Page;
};

export const validateNewIntegration = async (
  page: Page,
  newIntegration: string
) => {
  await page.goto('settings/integrations');
  await page.waitForSelector(newIntegration);

  const newSource = await page.locator(newIntegration);
  const isPresent = await newSource.isVisible();
  expect(isPresent).toBeTruthy();
};

const integrationsTest = settingsTest.extend<IntegrationsFixtures>({
  integrationsPage: async ({ settingsPage }, use) => {
    await settingsPage.click('a[href="/settings/integrations"]');
    await settingsPage.waitForURL(/integrations/i);
    await use(settingsPage);
  },
});

export default integrationsTest;
