import { Page } from '@playwright/test';
import { test, expect } from '../../../../fixtures/baseFixtures';

//Functions

export const createAnException = async (page: Page) => {
  await page.click('a:has-text("Exception")');

  await page.click('[placeholder="Describe the exception"]');
  await page.fill('[placeholder="Describe the exception"]', 'Test Exception');

  await page.click('[placeholder="Enter value"]');
  await page.fill('[placeholder="Enter value"]', 'foo');

  await page.click('text=ValueIs >> [placeholder="Enter value"]');
  await page.fill('text=ValueIs >> [placeholder="Enter value"]', 'bar');

  await page.click('text=Create new rule group');
  await page.waitForResponse(/exceptions/i);

  const toast = page.locator('#snackBar');
  await expect(toast).toContainText('Exception successfully created.');
};

export const deleteAnException = async (page: Page) => {
  await page.click('a:has-text("Exception")');

  await page.click(
    'text=Exception rule group Create set of rules to determine which violations to suppre >> :nth-match(button, 2)'
  );
  await page.click(':nth-match(:text("Delete"), 5)');

  const toast = page.locator('#snackBar');
  await expect(toast).toContainText('Exception successfully deleted.');
};

export const navigateTab = async (page: Page, selector: string) => {
  await page.click(`a[href*="${selector}"]`);

  const selectorReg = new RegExp(selector, 'i');
  await page.waitForURL(selectorReg);

  expect(page.url()).toMatch(`${selector}`);
};

const selectPolicyToEdit = async (page: Page, policyName: string) => {
  await page.click(`text=${policyName}`);

  await page.waitForSelector('a[href*="exceptions"]');
  await page.click('button[data-test-id="buttonDropdown"]');
};

export const clonePolicy = async (page: Page, policyName: string) => {
  await selectPolicyToEdit(page, policyName);

  await page.click('li[id="clone"]');

  await page.click('text=Save');

  const toast = page.locator('#snackBar');
  await expect(toast).toContainText('Policy created successfully.');
};

export const deletePolicy = async (page: Page) => {
  await page.click('text=Delete');

  await Promise.all([
    page.waitForNavigation({ url: /policies/i }),
    page.click('text=DeleteCancel >> button'),
  ]);
};

export const selectedPolicySelectors = {
  datasource_id: 'label[for^=datasource_id]',
  exceptions: 'label[for^=suppressed]',
};

//Fixture

type SelectedPolicyFixtures = {
  selectedPolicyPage: Page;
};

const selectedPolicyTest = test.extend<SelectedPolicyFixtures>({
  selectedPolicyPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForURL(/risk-posture/i);
    await page.click('a:has-text("Policies")');

    await page.waitForSelector('a[href*="policy/details"]');
    await page.click('a[href*="policy/details"]');

    await use(page);
  },
});

export default selectedPolicyTest;
