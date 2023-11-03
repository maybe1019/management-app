import { Page } from '@playwright/test';
import { test } from '../../../../fixtures/baseFixtures';
import { testReqPayloadFilterGroup } from '../requirement/requirement.utils';

type SubRequirementFixtures = {
  subRequirementPage: Page;
};

const subRequirementTest = test.extend<SubRequirementFixtures>({
  subRequirementPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForNavigation({
      url: /risk-posture/i,
    });
    await page.click('a:has-text("Compliance")');

    await page.waitForURL(/compliances/i);
    await page.click('a[href*="compliances/subrequirement/details"]');

    await use(page);
  },
});

export default subRequirementTest;

export const testSubPayloadFilterGroup = (page: Page, payloadFunction: any) =>
  testReqPayloadFilterGroup(page, payloadFunction);
