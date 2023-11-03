import organizationsTest, { checkForOrganization } from './organizations.utils';

organizationsTest.describe(
  'Organizations: Create, Edit, Delete an Organization -',
  () => {
    organizationsTest(
      'Organizations: Create An Organization',
      async ({ organizationsPage }) => {
        //Open Organization Modal
        await organizationsPage.click('button:has-text("Organization")');

        //Fill in Respective Fields
        await organizationsPage.click('input[name=name]');
        await organizationsPage.fill('input[name=name]', 'A Playwright Test');

        await organizationsPage.click('[placeholder="Description"]');
        await organizationsPage.fill(
          '[placeholder="Description"]',
          'A test organization'
        );

        await organizationsPage.click('button:has-text("Submit")');

        await organizationsPage.goto('/settings/organizations');

        //Check For Organization Creation
        await checkForOrganization(
          organizationsPage,
          'text=A Playwright Test',
          true
        );
      }
    );

    organizationsTest(
      'Organizations: Edit An Organization',
      async ({ organizationsPage }) => {
        //Open Organization Modal
        await organizationsPage.click('data-test-id=A Playwright Test');

        //Fill in Respective Fields
        await organizationsPage.click('input[name=name]');
        await organizationsPage.fill(
          'input[name=name]',
          'A Playwright Test Edited'
        );

        await organizationsPage.click('button:has-text("Save Changes")');

        await organizationsPage.goto('/settings/organizations');

        //Check For Organization Edit
        await checkForOrganization(
          organizationsPage,
          'text=A Playwright Test Edited',
          true
        );
      }
    );

    organizationsTest(
      'Organizations: Delete An Organization',
      async ({ organizationsPage }) => {
        await organizationsPage.click('data-test-id=A Playwright Test Edited');

        await organizationsPage.click('button:has-text("Delete")');
        await organizationsPage.click('text=DeleteCancel >> button');

        //Check For Removal of Organization
        await checkForOrganization(
          organizationsPage,
          'text=A Playwright Test Edited',
          false
        );
      }
    );
  }
);
