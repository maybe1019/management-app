import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/baseFixtures';

export const checkForOrgSelector = async (page: Page, orgSelector: string) => {
  const currentOrg = await page.locator(orgSelector);
  const isPresent = await currentOrg.isVisible();

  expect(isPresent).toBeTruthy();
};

type OrganizationContextFixtures = {
  organizationContextPage: Page;
};

const organizationContextTest = test.extend<OrganizationContextFixtures>({
  organizationContextPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForURL(/risk-posture/i);

    await page.waitForSelector('text=Clear');

    await use(page);
  },
});

export default organizationContextTest;
