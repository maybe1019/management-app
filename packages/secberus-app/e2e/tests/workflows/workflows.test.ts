import { expect } from '../../fixtures/baseFixtures';
import workflowTest, * as _ from './workflows.utils';

//Navigation Tests
workflowTest('Workflows: Navigate To Page', async ({ workflowPage }) => {
  expect(workflowPage.url()).toMatch(/workflows/i);
});

//Action Tests

workflowTest.describe('Workflows: Create, Edit, Delete a Workflow -', () => {
  workflowTest(
    'Workflows: Create A Workflow',
    async ({ createdIntegrationPage }) => {
      //Open Workflow Modal
      await createdIntegrationPage.click('"New workflow"');
      await createdIntegrationPage.waitForResponse(/integrations/i);
      await createdIntegrationPage
        .locator('text=Data sourcesClear >> svg')
        .waitFor({ state: 'visible' });

      //Fill in Respective Fields
      await createdIntegrationPage
        .locator('[placeholder="Short name to identify workflow"]')
        .fill('Playwright testflow');

      await _.selectWorkflowFilterByCheckbox(
        createdIntegrationPage,
        'text=Data sourcesClear >> svg',
        'datasource_id'
      );
      await _.selectWorkflowFilterByCheckbox(
        createdIntegrationPage,
        'text=CategoryClear >> svg',
        'categories'
      );

      await Promise.all([
        createdIntegrationPage.click('text=Resource dataClear >> svg'),
        createdIntegrationPage
          .locator('text=Resource dataClear:Add >> [placeholder="Key"]')
          .fill('boo'),
      ]);

      await createdIntegrationPage
        .locator('text=Resource dataClear:Add >> [placeholder="Value"]')
        .fill('boo');
      await createdIntegrationPage.locator('text=Add').nth(0).click();

      await Promise.all([
        createdIntegrationPage.click('text=Resource tagsClear >> svg'),
        createdIntegrationPage
          .locator('text=Resource tagsClear:Add >> [placeholder="Key"]')
          .fill('foo'),
      ]);

      await createdIntegrationPage
        .locator('text=Resource tagsClear:Add >> [placeholder="Value"]')
        .fill('bar');
      await createdIntegrationPage.locator('text=Add').nth(1).click();

      await createdIntegrationPage.click('text=SeverityClear >> svg');
      await _.selectWorkflowSeverity(createdIntegrationPage);

      await Promise.all([
        createdIntegrationPage.click(
          'div[role="button"]:has-text("Select integration")'
        ),
        createdIntegrationPage
          .locator(
            'li:first-of-type:below(div[role="button"]:has-text("Select integration"))'
          )
          .click(),
      ]);

      await createdIntegrationPage
        .locator('"Save workflow"')
        .click({ force: true });
      await createdIntegrationPage.waitForResponse(/workflow/i);

      //Check For New Workflow
      await _.checkForWorkflow(
        createdIntegrationPage,
        'text="Playwright testflow"',
        true
      );
    }
  );

  workflowTest('Workflows: Edit A Workflow', async ({ workflowPage }) => {
    await workflowPage.click(
      '[data-test-id="editWorkflow[Playwright testflow]"]'
    );
    await workflowPage.waitForResponse(/integrations/i);
    await workflowPage
      .locator('[placeholder="Short name to identify workflow"]')
      .fill('Playwright edited');

    await workflowPage.click('button:has-text("Update workflow")');
    await workflowPage.waitForResponse(/workflow/i);
    //Check For Edited Workflow
    await _.checkForWorkflow(workflowPage, 'text="Playwright edited"', true);
  });

  workflowTest('Workflows: Delete A Workflow', async ({ workflowPage }) => {
    await workflowPage.click(
      '[data-test-id="editWorkflow[Playwright edited]"]'
    );
    await workflowPage.waitForResponse(/integrations/i);

    await workflowPage.click('"Delete"');
    await workflowPage.click('text=DeleteCancel >> button');

    //Check For Removal of Workflow
    await _.checkForWorkflow(workflowPage, 'text="Playwright edited"', false);
    await _.cleanUpIntegration(workflowPage, 'workflowIntegrationTest');
  });
});
