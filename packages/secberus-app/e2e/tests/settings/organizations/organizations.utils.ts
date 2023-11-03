import { Page } from '@playwright/test';
import settingsTest from '../settings.utils';
import { expect } from '../../../fixtures/baseFixtures';

type OrganizationsFixtures = {
  organizationsPage: Page;
};

export const checkForOrganization = async (
  page: Page,
  organization: string,
  isExpected: boolean
) => {
  await page.goto('settings/organizations');
  await page.waitForResponse(/orgs/i);

  if (isExpected) {
    await page.waitForSelector(organization);
  }
  if (!isExpected) {
    await page.waitForURL(/organization/i);
  }

  const newOrg = await page.locator(`${organization} >> nth=0`);
  const isPresent = await newOrg.isVisible();

  if (isExpected) {
    expect(isPresent).toBeTruthy();
    return;
  }

  expect(isPresent).toBeFalsy();
  return;
};

const organizationsTest = settingsTest.extend<OrganizationsFixtures>({
  organizationsPage: async ({ settingsPage }, use) => {
    await settingsPage.click('a[href="/settings/organizations"]');
    await settingsPage.waitForURL(/organizations/i);
    await use(settingsPage);
  },
});

export default organizationsTest;
