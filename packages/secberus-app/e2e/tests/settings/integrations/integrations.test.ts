import integrationsTest, { validateNewIntegration } from './integrations.utils';

/*
  @Author: Avery Brown
  @Note: Majority of the tests in this file need to be skipped for now due to the need for a proper url vs mock data for the webhooks. Only email and RedMine 
  can be properly tested with complete mock data as a consequence
*/

//Email
integrationsTest('Integrations: Create Email', async ({ integrationsPage }) => {
  //Open Email Model
  await integrationsPage.click('button:has-text("Email")');

  //Fill in Respective Fields
  await integrationsPage.click('input[name="name"]');
  await integrationsPage.fill('input[name="name"]', 'Playwright Email Test');

  await integrationsPage.click('input[name="emails"]');
  await integrationsPage.fill(
    'input[name="emails"]',
    'playwrightFakeFakerton@gmail.com'
  );

  const saveButton = await integrationsPage.locator('button:has-text("Save")');
  await saveButton.click();

  //Validate New Integration Creation
  await validateNewIntegration(
    integrationsPage,
    '[data-test-id="Playwright Email Test"]'
  );

  //Clean Up
  await integrationsPage.click('data-test-id=Playwright Email Test');
  await integrationsPage.click('button:has-text("Delete")');
  await integrationsPage.click('text=DeleteCancel >> button');
});

//Jira
integrationsTest('Integrations: Create Jira', async ({ integrationsPage }) => {
  integrationsTest.skip();
  //Open Jira Modal
  await integrationsPage.click('button:has-text("Jira")');

  //Fill in Respective Fields
  await integrationsPage.click('input[name="name"]');
  await integrationsPage.fill('input[name="name"]', 'Playwright Jira Test');

  await integrationsPage.click('input[name="url"]');
  await integrationsPage.fill(
    'input[name="url"]',
    'https://playwrightnotrealwebhooktesttest.atlassian.net'
  );

  await integrationsPage.click('input[name="username"]');
  await integrationsPage.fill(
    'input[name="username"]',
    'playwrightFakeFakerton@gmail.com'
  );

  await integrationsPage.click('input[name="api_token"]');
  await integrationsPage.fill('input[name="api_token"]', '123_fake_api_token');

  await integrationsPage.click('input[name="project"]');
  await integrationsPage.fill('input[name="project"]', 'Playwright Project');

  await integrationsPage.click('input[name="issue_type"]');
  await integrationsPage.fill('input[name="issue_type"]', 'Issue Type 5');

  const saveButton = await integrationsPage.locator('button:has-text("Save")');
  await saveButton.hover();
  await saveButton.click();
  await integrationsPage.waitForSelector('Integration successfully created');

  //Validate New Integration Creation
  await validateNewIntegration(
    integrationsPage,
    '[data-test-id="Playwright Jira Test"]'
  );

  //Clean Up
  await integrationsPage.click('data-test-id=Playwright Jira Test');
  await integrationsPage.click('button:has-text("Delete")');
  await integrationsPage.click('text=DeleteCancel >> button');
});

//Jira OAuth
integrationsTest(
  'Integrations: Create Jira OAuth',
  async ({ integrationsPage }) => {
    integrationsTest.skip();
    //Open Jira OAuth Modal
    await integrationsPage.click('button:has-text("Jira OAuth")');

    //Fill in Respective Fields
    await integrationsPage.click('input[name=name]');
    await integrationsPage.fill(
      'input[name=name]',
      ' Playwright Jira OAuth Test'
    );

    await integrationsPage.click('input[name=url]');
    await integrationsPage.fill(
      'input[name=url]',
      'https://playwrightnotrealwebhooktesttest.atlassian.net'
    );

    await integrationsPage.click('input[name=project]');
    await integrationsPage.fill('input[name=project]', 'Playwright Project');

    await integrationsPage.click('input[name="issue_type"]');
    await integrationsPage.fill('input[name="issue_type"]', 'Issue Type 5');

    const saveButton = await integrationsPage.locator(
      'button:has-text("Save")'
    );
    await saveButton.click();

    //Validate New Integration Creation
    await validateNewIntegration(
      integrationsPage,
      '[data-test-id="Playwright Jira OAuth Test"]'
    );

    //Clean Up
    await integrationsPage.click('data-test-id=Playwright Jira OAuth Test');
    await integrationsPage.click('button:has-text("Delete")');
    await integrationsPage.click('text=DeleteCancel >> button');
  }
);

//MS Teams
integrationsTest(
  'Integrations: Create MS Teams',
  async ({ integrationsPage }) => {
    integrationsTest.skip();
    //Open MS Teams
    await integrationsPage.click('button:has-text("MS Teams")');

    //Fill in Respective Fields
    await integrationsPage.click('input[name=name]');
    await integrationsPage.fill(
      'input[name=name]',
      ' Playwright MS Teams Test'
    );

    await integrationsPage.click('input[name=url]');
    await integrationsPage.fill(
      'input[name=url]',
      'https://playwrightnotrealwebhooktesttest.atlassian.net'
    );

    const saveButton = await integrationsPage.locator(
      'button:has-text("Save")'
    );
    await saveButton.click();

    //Validate New Integration Creation
    await validateNewIntegration(
      integrationsPage,
      '[data-test-id="Playwright MS Teams Test"]'
    );
    //Clean Up
    await integrationsPage.click('data-test-id=Playwright MS Teams Test');
    await integrationsPage.click('button:has-text("Delete")');
    await integrationsPage.click('text=DeleteCancel >> button');
  }
);

//Pager Duty
integrationsTest(
  'Integrations: Create Pager Duty',
  async ({ integrationsPage }) => {
    integrationsTest.skip();
    //Open Pager Duty Modal
    await integrationsPage.click('button:has-text("Pager Duty")');

    //Fill in Respective Fields
    await integrationsPage.click('input[name=name]');
    await integrationsPage.fill(
      'input[name=name]',
      ' Playwright Pager Duty Test'
    );

    await integrationsPage.click('input[name=routing_key]');
    await integrationsPage.fill('input[name=routing_key]', 'playwrightTestKey');

    const saveButton = await integrationsPage.locator(
      'button:has-text("Save")'
    );
    await saveButton.click();

    //Validate New Integration Creation
    await validateNewIntegration(
      integrationsPage,
      '[data-test-id="Playwright Pager Duty Test"]'
    );

    //Clean Up
    await integrationsPage.click('data-test-id=Playwright Pager Duty Test');
    await integrationsPage.click('button:has-text("Delete")');
    await integrationsPage.click('text=DeleteCancel >> button');
  }
);

//RedMine
integrationsTest(
  'Integrations: Create RedMine',
  async ({ integrationsPage }) => {
    //Open RedMine Modal
    await integrationsPage.click('button:has-text("RedMine")');

    //Fill in Respective Fields
    await integrationsPage.click('input[name=name]');
    await integrationsPage.fill('input[name=name]', ' Playwright RedMine Test');

    await integrationsPage.click('input[name="emails"]');
    await integrationsPage.fill(
      'input[name="emails"]',
      'playwrightFakeFakerton@gmail.com'
    );

    await integrationsPage.click('input[name=table]');
    await integrationsPage.fill('input[name=table]', 'tableValue');

    await integrationsPage.click('input[name=status]');
    await integrationsPage.fill('input[name=status]', 'statusValue');

    await integrationsPage.click('input[name=tracker]');
    await integrationsPage.fill('input[name=tracker]', 'trackerValue');

    await integrationsPage.click('input[name=category]');
    await integrationsPage.fill('input[name=category]', 'categoryValue');

    await integrationsPage.click('input[name=priority]');
    await integrationsPage.fill('input[name=priority]', 'priorityValue');

    await integrationsPage.click('input[name=assigned_to]');
    await integrationsPage.fill('input[name=assigned_to]', 'Assignee');

    const saveButton = await integrationsPage.locator(
      'button:has-text("Save")'
    );
    await saveButton.click();

    //Validate New Integration Creation
    await validateNewIntegration(
      integrationsPage,
      '[data-test-id="Playwright RedMine Test"]'
    );

    //Clean Up
    await integrationsPage.click('data-test-id=Playwright RedMine Test');
    await integrationsPage.click('button:has-text("Delete")');
    await integrationsPage.click('text=DeleteCancel >> button');
  }
);

//ServiceNow
integrationsTest(
  'Integrations: Create ServiceNow',
  async ({ integrationsPage }) => {
    integrationsTest.skip();
    //Open ServiceNow Modal
    await integrationsPage.click('button:has-text("ServiceNow")');

    //Fill in Respective Fields
    await integrationsPage.click('input[name=name]');
    await integrationsPage.fill(
      'input[name=name]',
      'Playwright ServiceNow Test'
    );

    await integrationsPage.click('input[name=client_id]');
    await integrationsPage.fill('input[name=client_id]', 'client_id');

    await integrationsPage.click('input[name=client_secret]');
    await integrationsPage.fill('input[name=client_secret]', 'client_secret');

    await integrationsPage.click('input[name=assigned_group]');
    await integrationsPage.fill('input[name=assigned_group]', 'assigned_group');

    await integrationsPage.click('input[name=client_secret]');
    await integrationsPage.fill('input[name=client_secret]', 'client_secret');

    await integrationsPage.click('text=Select a table');
    await integrationsPage.click('li:has-text("Incident")');

    await integrationsPage.click('input[name=assigned_to]');
    await integrationsPage.fill('input[name=assigned_to]', 'assigned_to');

    await integrationsPage.click('input[name=url]');
    await integrationsPage.fill(
      'input[name=url]',
      'https://notARealPlaywrightURL.service-now.com'
    );

    const saveButton = await integrationsPage.locator(
      'button:has-text("Save")'
    );
    await saveButton.click();

    //Validate New Integration Creation
    await validateNewIntegration(
      integrationsPage,
      '[data-test-id="Playwright ServiceNow Test"]'
    );
    //Clean Up
    await integrationsPage.click('data-test-id=Playwright ServiceNow Test');
    await integrationsPage.click('button:has-text("Delete")');
    await integrationsPage.click('text=DeleteCancel >> button');
  }
);

//Slack
integrationsTest('Integrations: Create Slack', async ({ integrationsPage }) => {
  integrationsTest.skip();
  //Open Slack Modal
  await integrationsPage.click('button:has-text("Slack")');

  //Fill in Respective Fields
  await integrationsPage.click('input[name=name]');
  await integrationsPage.fill('input[name=name]', 'Playwright Slack Test');

  await integrationsPage.click('input[name=url]');
  await integrationsPage.fill(
    'input[name=url]',
    'https://playwrightnotrealwebhooktesttest.net'
  );

  const saveButton = await integrationsPage.locator('button:has-text("Save")');
  await saveButton.click();

  //Validate New Integration Creation
  await validateNewIntegration(
    integrationsPage,
    '[data-test-id="Playwright Slack Test"]'
  );
  //Clean Up
  await integrationsPage.click('data-test-id=Playwright Slack Test');
  await integrationsPage.click('button:has-text("Delete")');
  await integrationsPage.click('text=DeleteCancel >> button');
});

//Webhook
integrationsTest(
  'Integrations: Create Webhook',
  async ({ integrationsPage }) => {
    integrationsTest.skip();
    //Open Webhook Modal
    await integrationsPage.click('button:has-text("Webhook")');

    //Fill in Respective Fields
    await integrationsPage.click('input[name=name]');
    await integrationsPage.fill('input[name=name]', 'Playwright Webhook Test');

    await integrationsPage.click('input[name=url]');
    await integrationsPage.fill(
      'input[name=url]',
      'https://playwrightnotrealwebhooktesttest.net'
    );

    const saveButton = await integrationsPage.locator(
      'button:has-text("Save")'
    );
    await saveButton.click();

    //Validate New Integration Creation
    await validateNewIntegration(
      integrationsPage,
      '[data-test-id="Playwright Webhook Test"]'
    );
    //Clean Up

    await integrationsPage.click('data-test-id=Playwright Webhook Test');
    await integrationsPage.click('button:has-text("Delete")');
    await integrationsPage.click('text=DeleteCancel >> button');
  }
);
