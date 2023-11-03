import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/baseFixtures';
import * as MSBar from '../../pageObjects/MSBar';

type ComplianceFixtures = {
  compliancePage: Page;
};

const complianceTest = test.extend<ComplianceFixtures>({
  compliancePage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForNavigation({
      url: /risk-posture/i,
    });
    await page.click('a:has-text("Compliance")');

    await page.waitForResponse(/compliance/i);

    await use(page);
  },
});

export const complianceSelectors = {
  datasource_id: 'label[for^=datasource_id]',
  resourceType: 'label[for^=resource_id]',
};

export const testCompliancePayloadFilterGroup = async (
  page: Page,
  payloadFunction: any
) => {
  await MSBar.selectFilterSelection(page, 'resource_data');
  await payloadFunction(page);

  await page.click(':nth-match(:text("Add"), 2)');

  await Promise.all([
    page.click('a[href*="compliances/requirement/details"]'),
    page.waitForNavigation({ url: /resource_data/i }),
  ]);

  expect(page.url()).toMatch(/resource_data/i);
};

export default complianceTest;
