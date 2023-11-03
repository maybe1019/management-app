import { Page } from '@playwright/test';
import { test } from '../../fixtures/baseFixtures';

export const riskPostureSelectors = {
  datasource_id: 'label[for^=datasource_id]',
  categories: 'label:has-text("Access Control: Authentication")',
  resourceType: 'label[for^=resource_id]',
};

type RiskPostureFixtures = {
  riskPosturePage: Page;
};

const riskPostureTest = test.extend<RiskPostureFixtures>({
  riskPosturePage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForNavigation({
      url: /risk-posture/i,
    });

    await use(page);
  },
});

export default riskPostureTest;
