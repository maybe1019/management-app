import { expect } from '../../fixtures/baseFixtures';
import * as MSBar from '../../pageObjects/MSBar';
import { CheckBoxFilterGroup, SeverityOptions } from '../../pageObjects/MSBar';
import policyTest, * as _ from './policy.utils';

//Navigation Tests
policyTest('Policy: Navigate To Page', async ({ policyPage }) => {
  expect(policyPage.url()).toMatch(/policies/i);
});
policyTest('Policy: Navigate to Policy', async ({ policyPage }) => {
  await policyPage.click('a[href*="policy/details"]');
  await policyPage.waitForURL(/violations/i);

  expect(policyPage.url()).toMatch(/policy\/details/i);
  expect(policyPage.url()).toMatch(/violations/i);
});
policyTest(
  'Policy: Navigate to Edit Policy From Data Table',
  async ({ policyPage }) => {
    await policyPage.click('a[href*="form/details"]');
    await policyPage.waitForURL(/form\/details/i);

    expect(policyPage.url()).toMatch(/form\/details/i);
  }
);
policyTest('Policy: Navigate to Create New Policy', async ({ policyPage }) => {
  await policyPage.click('text=New policy');
  await policyPage.waitForURL(/form\/details/i);

  expect(policyPage.url()).toMatch(/form\/details/i);
});

//Filter By CheckBox Filter Groups
policyTest('Policy: Filter By Author', async ({ policyPage }) => {
  await MSBar.testCheckboxFilterGroup(
    policyPage,
    'author' as CheckBoxFilterGroup,
    _.policyPageSelectors,
    'author',
    /secberus_managed/i
  );
});
policyTest('Policy: Filter By Status', async ({ policyPage }) => {
  await MSBar.testCheckboxFilterGroup(
    policyPage,
    'status' as CheckBoxFilterGroup,
    _.policyPageSelectors,
    'status',
    /subscribed/i
  );
});
policyTest('Policy: Filter By Categories', async ({ policyPage }) => {
  await MSBar.testCheckboxFilterGroup(
    policyPage,
    'categories' as CheckBoxFilterGroup,
    _.policyPageSelectors,
    'categories',
    /category_id/i
  );
});
policyTest('Policy: Filter By Frameworks', async ({ policyPage }) => {
  await MSBar.testCheckboxFilterGroup(
    policyPage,
    'frameworks' as CheckBoxFilterGroup,
    _.policyPageSelectors,
    'frameworks',
    /compliance_id/i
  );
});
policyTest('Policy: Filter By Resource Type', async ({ policyPage }) => {
  await MSBar.testCheckboxFilterGroup(
    policyPage,
    'resourceType' as CheckBoxFilterGroup,
    _.policyPageSelectors,
    'resourceType',
    /resource_id/i
  );
});

//Filter By Severity Filter Groups
policyTest('Policy: Filter By Severity (Critical)', async ({ policyPage }) => {
  await MSBar.testSeverityFilterGroup(
    policyPage,
    'critical' as SeverityOptions,
    /CRITICAL/i
  );
});
policyTest('Policy: Filter By Severity (High)', async ({ policyPage }) => {
  await MSBar.testSeverityFilterGroup(
    policyPage,
    'high' as SeverityOptions,
    /HIGH/i
  );
});
policyTest('Policy: Filter By Severity (Medium)', async ({ policyPage }) => {
  await MSBar.testSeverityFilterGroup(
    policyPage,
    'medium' as SeverityOptions,
    /MEDIUM/i
  );
});
policyTest('Policy: Filter By Severity (Low)', async ({ policyPage }) => {
  await MSBar.testSeverityFilterGroup(
    policyPage,
    'low' as SeverityOptions,
    /LOW/i
  );
});

//Action Tests
policyTest('Policy: Search For Term', async ({ policyPage }) => {
  await policyPage.click('[placeholder="Filter by policy name"]');
  await policyPage.fill('[placeholder="Filter by policy name"]', 'Editor');
  await policyPage.click('[data-test-id="submitInputSearchValue"]');

  await policyPage.waitForResponse(/name/i);

  expect(policyPage.url()).toMatch(/name/i);
});

policyTest.describe('Policy: Create, Edit, Delete a Policy -', () => {
  policyTest.setTimeout(90000);

  policyTest('Create A New Policy', async ({ policyPage }) => {
    //Create the New Policy
    await policyPage.click('text=New policy');
    await policyPage.waitForURL(/form\/details/i);
    expect(policyPage.url()).toMatch(/form\/details/i);

    await _.fillInNewPolicyFields(
      policyPage,
      'Playwright test policy',
      '"I\'m testing policy creation and edits": "I\'m pretty great"',
      'AWS',
      "If you're reading this, the test failed somewhere."
    );
    await policyPage.goto('/policies');

    // Navigate to main page and search for new policy
    await policyPage.goto('/policies');
    await _.searchForElement(policyPage, '"Playwright test policy"');

    //Validate Existence of Policy
    await _.checkForPolicySelector(policyPage, 'text="Playwright test policy"');
  });

  policyTest('Edit Policy Details', async ({ policyPage }) => {
    await _.searchForElement(policyPage, '"Playwright test policy"');

    await policyPage.click('"Playwright test policy"');
    expect(policyPage.url()).toMatch(/violations/i);

    await policyPage.click('[data-test-id="editPolicyButton"]');

    //Edit Custom Policy Values
    await _.fillInNewPolicyFields(
      policyPage,
      'Playwright Edited',
      '"Im THE code": "Im even better"',
      'Azure',
      "This is the policy you're looking for :)"
    );
    await policyPage.goto('/policies');
    await _.searchForElement(policyPage, '"Playwright Edited"');

    await policyPage.waitForURL(/name/i);
    await policyPage.waitForSelector('text="Playwright Edited"');

    //Validate Existance of Policy
    await _.checkForPolicySelector(policyPage, 'text="Playwright Edited"');
  });

  policyTest('Delete Policy', async ({ policyPage }) => {
    await _.searchForElement(policyPage, '"Playwright Edited"');

    await policyPage.click('"Playwright Edited"');
    await policyPage.waitForURL(/violations/i);

    expect(policyPage.url()).toMatch(/violations/i);

    //Delete Existing Policy
    await _.deletePolicy(policyPage);
    await policyPage.waitForResponse(/rules/i);

    //Validate Deletion of Policy
    await policyPage.waitForSelector('text="No results available"');
    await _.checkForPolicySelector(policyPage, 'text="No results available"');
  });
});
