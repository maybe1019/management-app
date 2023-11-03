import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/baseFixtures';
interface WorkflowFilterSelectors {
  [key: string]: string;
  datasource_id: string;
  categories: string;
}

const workflowFilterSelectors: WorkflowFilterSelectors = {
  datasource_id: 'label[for*=datasource_id]',
  categories: 'label[for*=category_id]',
};

export const selectWorkflowFilterByCheckbox = async (
  page: Page,
  filterGroup: string,
  selector: string
) => {
  await page.locator(filterGroup).click({ force: true });
  await page
    .locator(workflowFilterSelectors[selector])
    .nth(0)
    .click({ force: true });
};

export const selectWorkflowSeverity = async (page: Page) => {
  await page.click('#workflow_modal_filter_container >> text=critical', {
    force: true,
  });
};

export const checkForWorkflow = async (
  page: Page,
  workflow: string,
  isExpected: boolean
) => {
  await page.goto('/workflows');

  if (isExpected) {
    await page.waitForSelector(workflow);
  }
  if (!isExpected) {
    await page.waitForURL(/workflows/i);
  }

  const newWorkflow = await page.locator(workflow);
  const isPresent = await newWorkflow.isVisible();

  if (isExpected) {
    expect(isPresent).toBeTruthy();
    return;
  }

  expect(isPresent).toBeFalsy();
  return;
};

export const cleanUpIntegration = async (
  page: Page,
  integrationName: string
) => {
  await page.goto('settings/integrations');
  const integration = await page.locator(`data-test-id=${integrationName}`);
  await integration.scrollIntoViewIfNeeded();
  await integration.click({ force: true });

  await page.click('button:has-text("Delete")');

  await Promise.all([
    await page.click('text=DeleteCancel >> button'),
    await page.waitForResponse(/integrations/i),
  ]);

  await expect(page.locator('#snackBar')).toContainText(
    'Integration deleted successfully'
  );
};

type WorkflowFixtures = {
  createdIntegrationPage: Page;
  workflowPage: Page;
};

const workflowTest = test.extend<WorkflowFixtures>({
  workflowPage: async ({ page }, use) => {
    await page.goto('/workflows');
    await page.waitForURL(/workflows/i);

    await use(page);
  },
  createdIntegrationPage: async ({ page }, use) => {
    await page.goto('settings/integrations');
    await page.waitForURL(/integration/i);

    await page.click('button:has-text("Email")');
    await page
      .locator('[placeholder="Integration name"]')
      .fill('workflowIntegrationTest');
    await page.locator('input[name="emails"]').fill('playwright@secberus.com');

    await Promise.all([
      await page.click('text=Save'),
      await page.waitForResponse(/integrations/i),
    ]);

    await expect(page.locator('#snackBar')).toContainText(
      'Integration created successfully'
    );

    await page.goto('/workflows');
    await page.waitForURL(/workflows/i);

    await use(page);
  },
});

export default workflowTest;
