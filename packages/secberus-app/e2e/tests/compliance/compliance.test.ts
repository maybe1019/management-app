import { expect } from '../../fixtures/baseFixtures';
import * as MSBar from '../../pageObjects/MSBar';
import { CheckBoxFilterGroup } from '../../pageObjects/MSBar';
import complianceTest, * as _ from './compliance.utils';

//Navigation Tests
complianceTest('Compliance: Navigate To Page', async ({ compliancePage }) => {
  expect(compliancePage.url()).toMatch(/compliances/i);
});
complianceTest(
  'Compliance: View Framework Settings Page',
  async ({ compliancePage }) => {
    await compliancePage.click(':nth-match(div[role="button"], 2)');
    await compliancePage.waitForSelector('li[id=selectActionItem]');
    await compliancePage.click('li[id=selectActionItem]', {
      force: true,
    });
    await compliancePage.waitForURL(/frameworks/i);

    expect(compliancePage.url()).toMatch(/settings\/frameworks/i);
  }
);
complianceTest(
  'Compliance: Navigate To Requirement Page',
  async ({ compliancePage }) => {
    await compliancePage.click('a[href*="compliances/requirement/details"]');
    await compliancePage.waitForURL(/requirement\/details/i);

    expect(compliancePage.url()).toMatch(/requirement\/details/i);
  }
);
complianceTest(
  'Compliance: Navigate To Policy Through Requirement Page',
  async ({ compliancePage }) => {
    complianceTest.setTimeout(90000);

    await compliancePage.click('a[href*="compliances/requirement/details"]');
    await compliancePage.click('a[href*="subrequirement/details"]');
    await compliancePage.click('a[href*="policy/details"]');

    await compliancePage.waitForURL(/violation/i);

    expect(compliancePage.url()).toMatch(/requirement\/details/i);
    expect(compliancePage.url()).toMatch(/subrequirement\/details/i);
    expect(compliancePage.url()).toMatch(/policy\/details/i);
    expect(compliancePage.url()).toMatch(/violation/i);
  }
);
complianceTest(
  'Compliance: Navigate To SubRequirement Page',
  async ({ compliancePage }) => {
    await compliancePage.click('a[href*="compliances/subrequirement/details"]');
    await compliancePage.waitForURL(/subrequirement\/details/i);

    expect(compliancePage.url()).toMatch(/subrequirement\/details/i);
  }
);
complianceTest(
  'Compliance: Navigate To Policy Through SubRequirement Page',
  async ({ compliancePage }) => {
    complianceTest.setTimeout(90000);

    await compliancePage.click('a[href*="compliances/subrequirement/details"]');
    await compliancePage.click('a[href*="policy/details"]');
    await compliancePage.waitForURL(/violation/i);

    expect(compliancePage.url()).toMatch(/subrequirement\/details/i);
    expect(compliancePage.url()).toMatch(/policy\/details/i);
    expect(compliancePage.url()).toMatch(/violation/i);
  }
);

//Filter By CheckBox Filter Groups
complianceTest(
  'Compliance: Filter By Data Source',
  async ({ compliancePage }) => {
    await MSBar.testCheckboxFilterGroup(
      compliancePage,
      'ds' as CheckBoxFilterGroup,
      _.complianceSelectors,
      'datasource_id',
      /datasource_id/i
    );
  }
);
complianceTest(
  'Compliance: Filter By Resource Type',
  async ({ compliancePage }) => {
    await MSBar.testCheckboxFilterGroup(
      compliancePage,
      'resourceType' as CheckBoxFilterGroup,
      _.complianceSelectors,
      'resourceType',
      /resource_id/i
    );
  }
);

//Filter By Violation Payload
complianceTest(
  'Compliance: Filter Payload By Key Only',
  async ({ compliancePage }) => {
    await _.testCompliancePayloadFilterGroup(
      compliancePage,
      MSBar.filterDataByPayloadKey
    );
  }
);
complianceTest(
  'Compliance: Filter Payload By Value Only',
  async ({ compliancePage }) => {
    await _.testCompliancePayloadFilterGroup(
      compliancePage,
      MSBar.filterDataByPayloadValue
    );
  }
);
complianceTest(
  'Compliance: Filter Payload By Pair',
  async ({ compliancePage }) => {
    await _.testCompliancePayloadFilterGroup(
      compliancePage,
      MSBar.filterDataByPayloadPair
    );
  }
);

//Action Tests
complianceTest(
  'Compliance: Select New Framework',
  async ({ compliancePage }) => {
    complianceTest.setTimeout(90000);

    await compliancePage.click(
      ':nth-match(div[class*=Select__validation], 2)',
      {
        force: true,
      }
    );
    await compliancePage.click('li:near(li[class*=selected])');

    await compliancePage.waitForResponse(/audit/i);

    expect(compliancePage.url()).toMatch(/framework_id/i);
  }
);
complianceTest('Compliance: Generate Report', async ({ compliancePage }) => {
  await compliancePage.waitForSelector('text=Generate report');
  await compliancePage.click('text=Generate report');

  const isPresent = await compliancePage.locator('data-test-id=printDialog');
  expect(isPresent).toBeTruthy();
});
