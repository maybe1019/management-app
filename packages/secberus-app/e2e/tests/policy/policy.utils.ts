import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/baseFixtures';

export const policyPageSelectors = {
  author: 'label[for^=secberus_managed]',
  status: 'label[for^=subscribed]',
  categories: 'label:has-text("Access Control: Authentication")',
  frameworks: 'label[for^=compliance_id]',
  resourceType: 'label[for^=resource_id]',
};

export const searchForElement = async (page: Page, searchTerm: string) => {
  await page.click('[placeholder="Filter by policy name"]');
  await page.fill('[placeholder="Filter by policy name"]', searchTerm);
  await page.click('[placeholder="Filter by policy name"]');
  await page.keyboard.press('Enter');

  await page.waitForResponse(/name/i);
  await page.waitForSelector(`text=${searchTerm}`);
};

export const fillInNewPolicyFields = async (
  page: Page,
  name: string,
  policyLogic: string,
  dataSource: string,
  steps: string
) => {
  await page.waitForResponse(/compliance-frameworks/i);

  await page.click('textarea[name=name]');
  await page.fill('textarea[name=name]', name);

  await page.click('label:has-text("Security: Network Ports")');

  const frameworkButton = await page.locator('text=Add framework');
  frameworkButton.click();

  await page.click('text=Privilege Management');
  await page.click('button:has-text("Add to compliance")');

  await page.click('textarea[name="remediation_steps"]');
  await page.fill('textarea[name="remediation_steps"]', steps);

  await page.click('a:has-text("Policy editor")');

  const textEditor = await page.locator('div.view-lines');
  await textEditor.click();
  await page.keyboard.type(policyLogic);

  await page.click(`text=${dataSource}`);
  await page.click('li:first-of-type');
  await page.click('text="Save"');
};

export const deletePolicy = async (page: Page) => {
  await page.click('[data-test-id="editPolicyButton"]');
  await page.click('text=Delete');
  const confirmDelete = page.locator('text=DeleteCancel >> button');
  await confirmDelete.first().click();
};

export const checkForPolicySelector = async (page: Page, policy: string) => {
  const newPolicy = await page.locator(policy);
  const isPresent = await newPolicy.isVisible();

  expect(isPresent).toBeTruthy();
};

type PolicyFixtures = {
  policyPage: Page;
};

const policyTest = test.extend<PolicyFixtures>({
  policyPage: async ({ page }, use) => {
    await page.goto('/policies');
    await page.waitForURL(/policies/i);

    await use(page);
  },
});

export default policyTest;
