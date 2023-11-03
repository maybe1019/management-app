import { test } from '../../fixtures/baseFixtures';
import { Page } from '@playwright/test';

export const opsSelectors = {
  datasource_id: 'label[for^=datasource_id]',
  categories: 'label:has-text("Access Control: Authentication")',
  resourceType: 'label[for^=resource_id]',
};

type OpsFixtures = {
  opsPage: Page;
};

const opsTest = test.extend<OpsFixtures>({
  opsPage: async ({ page }, use) => {
    await page.goto('/');

    await page.waitForURL(/risk-posture/i);
    await page.click('a:has-text("Ops")');

    await page.waitForURL(/ops/i);

    await use(page);
  },
});

export default opsTest;
