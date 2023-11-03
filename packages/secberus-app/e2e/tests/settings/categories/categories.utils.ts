import { Page } from '@playwright/test';
import { expect } from '../../../fixtures/baseFixtures';
import {
  fillInNewPolicyFields,
  searchForElement,
} from '../../policy/policy.utils';
import settingsTest from '../settings.utils';

export const createCustomCategoryInAPolicy = async (page: Page) => {
  //Open New Category Modal
  await page.click('text=New Category');

  //Name Custom Category
  await page.click('[placeholder="e.g. Audit Logging"]');
  await page.fill(
    '[placeholder="e.g. Audit Logging"]',
    'A Playwright Custom Policy Category'
  );

  //Add A Description TO Public Category
  await page.click('input[name="description"]');
  await page.fill('input[name="description"]', 'A Custom Category For Tests');

  //Assigns type to Category
  await page.click('input[name=category_type]');

  //Saves New Category/Closes Modal
  await page.click(':nth-match(:text("Save"), 2)', { force: true });
  await page.waitForResponse(/categories/i);
};

export const assignCategoryToPolicy = async (page: Page) => {
  //Select Custom Category Created
  await page.click('label:has-text("A Playwright Custom Policy Category")');

  //Saves Category to Policy
  await page.click('text=Save');
};

type CategoriesFixtures = {
  categoriesPage: Page;
  preCreatePolicyPage: Page;
  preExistingPolicyPage: Page;
};

const categoriesTest = settingsTest.extend<CategoriesFixtures>({
  categoriesPage: async ({ settingsPage }, use) => {
    await settingsPage.click('a[href="/settings/categories"]');
    await settingsPage.waitForURL(/categories/i);
    await use(settingsPage);
  },
  preCreatePolicyPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForURL(/risk-posture/i);

    //Navigate to Policy Page
    await page.click('a:has-text("Policies")');
    await page.waitForResponse(/policies/i);

    //Select Pre-existing Policy Specific To Certain Tests
    await page.click('text=New policy');
    await page.waitForURL(/form\/details/i);
    expect(page.url()).toMatch(/form\/details/i);

    await fillInNewPolicyFields(
      page,
      'Playwright category policy',
      '"I\'m testing category creation within a policy": "I\'m pretty great"',
      'AWS',
      "If you're reading this, the test failed somewhere."
    );

    await page.goto('/policies');

    //Navigate to policy created for test
    await searchForElement(page, '"Playwright category policy"');
    await page.click('"Playwright category policy"');

    await use(page);
  },
  preExistingPolicyPage: async ({ page }, use) => {
    await page.goto('/policies');

    //Navigate to policy created for test
    await searchForElement(page, '"Playwright category policy"');
    await page.click('"Playwright category policy"');

    await use(page);
  },
});

export default categoriesTest;
