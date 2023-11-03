import { expect } from '../../../../fixtures/baseFixtures';
import * as MSBar from '../../../../pageObjects/MSBar';
import { CheckBoxFilterGroup } from '../../../../pageObjects/MSBar';
import * as compliance from '../../compliance.utils';
import requirementTest, * as _ from './requirement.utils';

//Navigation Tests
requirementTest(
  'Requirement: Toggle  Violations View',
  async ({ requirementPage }) => {
    await requirementPage.click('a[href*="violations"]');
    await requirementPage.waitForURL(/violations/i);
    expect(requirementPage.url()).toMatch(/violations/i);
  }
);

//Filter By CheckBox Filter Groups
requirementTest(
  'Requirement: Filter By Data Source',
  async ({ requirementPage }) => {
    await MSBar.testCheckboxFilterGroup(
      requirementPage,
      'ds' as CheckBoxFilterGroup,
      compliance.complianceSelectors,
      'datasource_id',
      /datasource_id/i
    );
  }
);
requirementTest(
  'Requirement: Filter By Resource Type',
  async ({ requirementPage }) => {
    await MSBar.testCheckboxFilterGroup(
      requirementPage,
      'resourceType' as CheckBoxFilterGroup,
      compliance.complianceSelectors,
      'resourceType',
      /resource_id/i
    );
  }
);

//Filter By Violation Payload
requirementTest(
  'Requirement: Filter Payload By Key Only',
  async ({ requirementPage }) => {
    await _.testReqPayloadFilterGroup(
      requirementPage,
      MSBar.filterDataByPayloadKey
    );
  }
);
requirementTest(
  'Requirement: Filter Payload By Value Only',
  async ({ requirementPage }) => {
    await _.testReqPayloadFilterGroup(
      requirementPage,
      MSBar.filterDataByPayloadValue
    );
  }
);
requirementTest(
  'Requirement: Filter Payload By Pair',
  async ({ requirementPage }) => {
    await _.testReqPayloadFilterGroup(
      requirementPage,
      MSBar.filterDataByPayloadPair
    );
  }
);

//Action Tests
requirementTest('Requirement: Generate Report', async ({ requirementPage }) => {
  await requirementPage.waitForSelector('text=Generate report');
  await requirementPage.click('text=Generate report');

  const isPresent = await requirementPage.locator('data-test-id=printDialog');
  expect(isPresent).toBeTruthy();
});
