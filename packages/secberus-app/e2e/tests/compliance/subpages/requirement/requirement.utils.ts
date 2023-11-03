import { Page } from '@playwright/test';
import { test, expect } from '../../../../fixtures/baseFixtures';
import { selectFilterSelection } from '../../../../pageObjects/MSBar';

type RequirementFixtures = {
  requirementPage: Page;
};

const requirementTest = test.extend<RequirementFixtures>({
  requirementPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForURL(/risk-posture/i);
    await page.click('a:has-text("Compliance")');

    await page.waitForSelector('text=Clear');
    await page.click('a[href*="compliances/requirement/details"]');

    await use(page);
  },
});

export default requirementTest;

export const testReqPayloadFilterGroup = async (
  page: Page,
  payloadFunction: any
) => {
  await selectFilterSelection(page, 'resource_data');
  await payloadFunction(page);

  await page.click(':nth-match(:text("Add"), 2)');
  await page.waitForURL(/resource_data/i);

  expect(page.url()).toMatch(/resource_data/i);
};
