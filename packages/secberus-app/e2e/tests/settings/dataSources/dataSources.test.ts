import dataSourceTest, { validateNewDataSource } from './dataSources.utils';
import gcpCredentials from './ gcp-data-source-creds.json';

dataSourceTest(
  'Data Source: Create An AWS DataSource',
  async ({ dataSourcePage }) => {
    //Open AWS Modal
    await dataSourcePage.click('button:has-text("AWS")');

    //Fill in Respective Fields
    await dataSourcePage.click('[placeholder="e.g. Production"]');
    await dataSourcePage.fill(
      '[placeholder="e.g. Production"]',
      'Playwright AWS Test'
    );

    await dataSourcePage.click('[placeholder="Select region"]');
    await dataSourcePage.click('li:has-text("us-east-1")');

    await dataSourcePage.click('input[name*=role_arn]');
    await dataSourcePage.fill(
      'input[name*=role_arn]',
      'secretKeyDontCopyThis!'
    );

    await dataSourcePage.click('button:has-text("Connect")');

    //Validate New Source Creation
    await validateNewDataSource(
      dataSourcePage,
      '[data-test-id="Playwright AWS Test"]'
    );

    //Clean Up
    await dataSourcePage.click('data-test-id=Playwright AWS Test');
    await dataSourcePage.click('text=Remove data source');
    await dataSourcePage.click('text=DeleteCancel >> button');
  }
);

dataSourceTest(
  'Data Source: Create An Azure DataSource',
  async ({ dataSourcePage }) => {
    //Open Azure Modal
    await dataSourcePage.click('button:has-text("Azure")');

    //Fill in Respective Fields
    await dataSourcePage.click('[placeholder="e.g. Production"]');
    await dataSourcePage.fill(
      '[placeholder="e.g. Production"]',
      'Playwright Azure Test'
    );

    await dataSourcePage.click('input[name="data.client_id"]');
    await dataSourcePage.fill(
      'input[name="data.client_id"]',
      'applicationClientId'
    );

    await dataSourcePage.click('input[name="data.tenant_id"]');
    await dataSourcePage.fill('input[name="data.tenant_id"]', 'tenantId');

    await dataSourcePage.click('input[name="data.subscription_id"]');
    await dataSourcePage.fill(
      'input[name="data.subscription_id"]',
      'subscriptionId'
    );

    await dataSourcePage.click('textarea[name="data.client_secret"]');
    await dataSourcePage.fill(
      'textarea[name="data.client_secret"]',
      'secretKey'
    );

    await dataSourcePage.click('button:has-text("Connect")');

    //Validate New Source Creation
    await validateNewDataSource(
      dataSourcePage,
      '[data-test-id="Playwright Azure Test"]'
    );

    //clean up
    await dataSourcePage.click('data-test-id=Playwright Azure Test');
    await dataSourcePage.click('text=Remove data source');
    await dataSourcePage.click('text=DeleteCancel >> button');
  }
);

dataSourceTest(
  'Data Source: Create An GCP DataSource',
  async ({ dataSourcePage }) => {
    //Extract Sample Values
    const {
      type,
      project_id,
      private_key_id,
      private_key,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url,
    } = JSON.parse(JSON.stringify(gcpCredentials));

    //Open GCP Modal
    await dataSourcePage.click('button:has-text("GCP")');

    //Fill in Respective Fields
    await dataSourcePage.click('[placeholder="e.g. Production"]');
    await dataSourcePage.fill(
      '[placeholder="e.g. Production"]',
      'Playwright GCP Test'
    );

    await dataSourcePage.click('input[name="data.projects"]');
    await dataSourcePage.fill('input[name="data.projects"]', 'us-east1-b');

    await dataSourcePage.click('text=enter fields manually');

    await dataSourcePage.click('input[name="data.creds.type"]');
    await dataSourcePage.fill('input[name="data.creds.type"]', type);

    await dataSourcePage.click('input[name="data.creds.project_id"]');
    await dataSourcePage.fill(
      'input[name="data.creds.project_id"]',
      project_id
    );

    await dataSourcePage.click('input[name="data.creds.private_key_id"]');
    await dataSourcePage.fill(
      'input[name="data.creds.private_key_id"]',
      private_key_id
    );

    await dataSourcePage.click('input[name="data.creds.client_email"]');
    await dataSourcePage.fill(
      'input[name="data.creds.client_email"]',
      client_email
    );

    await dataSourcePage.click('input[name="data.creds.client_id"]');
    await dataSourcePage.fill('input[name="data.creds.client_id"]', client_id);

    await dataSourcePage.click('input[name="data.creds.auth_uri"]');
    await dataSourcePage.fill('input[name="data.creds.auth_uri"]', auth_uri);

    await dataSourcePage.click('input[name="data.creds.token_uri"]');
    await dataSourcePage.fill('input[name="data.creds.token_uri"]', token_uri);

    await dataSourcePage.click(
      'input[name="data.creds.auth_provider_x509_cert_url"]'
    );
    await dataSourcePage.fill(
      'input[name="data.creds.auth_provider_x509_cert_url"]',
      auth_provider_x509_cert_url
    );

    await dataSourcePage.click(
      'textarea[name="data.creds.client_x509_cert_url"]'
    );
    await dataSourcePage.fill(
      'textarea[name="data.creds.client_x509_cert_url"]',
      client_x509_cert_url
    );

    await dataSourcePage.click('textarea[name="data.creds.private_key"]');
    await dataSourcePage.fill(
      'textarea[name="data.creds.private_key"]',
      private_key
    );

    await dataSourcePage.click('button:has-text("Connect")');

    //Validate New Source Creation
    await validateNewDataSource(
      dataSourcePage,
      '[data-test-id="Playwright GCP Test"]'
    );

    //clean up
    await dataSourcePage.click('data-test-id=Playwright GCP Test');
    await dataSourcePage.click('text=Remove data source');
    await dataSourcePage.click('text=DeleteCancel >> button');
  }
);
