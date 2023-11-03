import { expect } from '../../../../fixtures/baseFixtures';
import * as MSBar from '../../../../pageObjects/MSBar';
import { CheckBoxFilterGroup } from '../../../../pageObjects/MSBar';
import * as compliance from '../../compliance.utils';
import subRequirementTest, * as _ from './subrequirement.utils';

//Navigation Tests
subRequirementTest(
  'SubRequirement: Toggle Violations View',
  async ({ subRequirementPage }) => {
    await subRequirementPage.click('a[href*="violations"]');
    await subRequirementPage.waitForURL(/violations/i);
    expect(subRequirementPage.url()).toMatch(/violations/i);
  }
);

//Filter By CheckBox Filter Groups
subRequirementTest(
  'SubRequirement: Filter By Data Source',
  async ({ subRequirementPage }) => {
    await MSBar.testCheckboxFilterGroup(
      subRequirementPage,
      'ds' as CheckBoxFilterGroup,
      compliance.complianceSelectors,
      'datasource_id',
      /datasource_id/i
    );
  }
);
subRequirementTest(
  'SubRequirement: Filter By Resource Type',
  async ({ subRequirementPage }) => {
    await MSBar.testCheckboxFilterGroup(
      subRequirementPage,
      'resourceType' as CheckBoxFilterGroup,
      compliance.complianceSelectors,
      'resourceType',
      /resource_id/i
    );
  }
);

//Filter By Violation Payload
subRequirementTest(
  'SubRequirement: Filter Payload By Key Only',
  async ({ subRequirementPage }) => {
    await _.testSubPayloadFilterGroup(
      subRequirementPage,
      MSBar.filterDataByPayloadKey
    );
  }
);
subRequirementTest(
  'SubRequirement: Filter Payload By Value Only',
  async ({ subRequirementPage }) => {
    await _.testSubPayloadFilterGroup(
      subRequirementPage,
      MSBar.filterDataByPayloadValue
    );
  }
);
subRequirementTest(
  'SubRequirement: Filter Payload By Pair',
  async ({ subRequirementPage }) => {
    await _.testSubPayloadFilterGroup(
      subRequirementPage,
      MSBar.filterDataByPayloadPair
    );
  }
);

//Action Tests
subRequirementTest(
  'SubRequirement: Generate Report',
  async ({ subRequirementPage }) => {
    await subRequirementPage.waitForSelector('text=Generate report');
    await subRequirementPage.click('text=Generate report');

    const isPresent = await subRequirementPage.locator(
      'data-test-id=printDialog'
    );
    expect(isPresent).toBeTruthy();
  }
);
