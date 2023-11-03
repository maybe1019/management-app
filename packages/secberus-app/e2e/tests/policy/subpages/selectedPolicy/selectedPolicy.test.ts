import { expect } from '../../../../fixtures/baseFixtures';
import * as MSBar from '../../../../pageObjects/MSBar';
import { CheckBoxFilterGroup } from '../../../../pageObjects/MSBar';
import policyTest, * as policy from '../../policy.utils';
import selectedPolicyTest, * as _ from './selectedPolicy.utils';

selectedPolicyTest(
  'Selected Policy: Navigate Violation Tabs',
  async ({ selectedPolicyPage }) => {
    await expect(selectedPolicyPage.url()).toMatch(/policy\/details/i);
    await expect(selectedPolicyPage.url()).toMatch(/violations/i);

    await _.navigateTab(selectedPolicyPage, 'dataSources');
    await _.navigateTab(selectedPolicyPage, 'remediation');
    await _.navigateTab(selectedPolicyPage, 'logic');
    await _.navigateTab(selectedPolicyPage, 'activity-log');
  }
);

policyTest.describe(
  'Selected Policy: Additon and Removal of An Exception -',
  () => {
    policyTest.setTimeout(90000);

    policyTest('Add Exception', async ({ policyPage }) => {
      //Create the New Policy
      await policyPage.click('text=New policy');
      await policyPage.waitForURL(/form\/details/i);
      await expect(policyPage.url()).toMatch(/form\/details/i);

      await policy.fillInNewPolicyFields(
        policyPage,
        'Exception Test',
        '"I\'m testing exceptions": "I\'m pretty great"',
        'AWS',
        "If you're reading this, the test failed somewhere."
      );

      // Navigate to main page and search for new policy
      await policyPage.goto('/policies');
      await policy.searchForElement(policyPage, '"Exception Test"');

      await policyPage.click('text=Exception Test');

      await policyPage.click('data-test-id=editPolicyButton');

      await _.createAnException(policyPage);
    });

    policyTest('Remove Exception', async ({ policyPage }) => {
      await policy.searchForElement(policyPage, '"Exception Test"');

      await policyPage.click('"Exception Test"');
      expect(policyPage.url()).toMatch(/violations/i);

      await policyPage.click('data-test-id=editPolicyButton');

      await _.deleteAnException(policyPage);

      await policyPage.click('text=Delete');
      await policyPage.click('text=DeleteCancel >> button');

      await policy.searchForElement(policyPage, '"Exception Test"');

      await policyPage.click('"Exception Test"');
      await policy.deletePolicy(policyPage);
    });
  }
);

//Filter By CheckBox Filter Groups
selectedPolicyTest(
  'Selected Policy: Filter By Data Source',
  async ({ selectedPolicyPage }) => {
    await MSBar.testCheckboxFilterGroup(
      selectedPolicyPage,
      'ds' as CheckBoxFilterGroup,
      _.selectedPolicySelectors,
      'datasource_id',
      /datasource_id/i
    );
  }
);
selectedPolicyTest(
  'Selected Policy: Filter By Exception',
  async ({ selectedPolicyPage }) => {
    await MSBar.testCheckboxFilterGroup(
      selectedPolicyPage,
      'exceptions' as CheckBoxFilterGroup,
      _.selectedPolicySelectors,
      'exceptions',
      /suppressed/i
    );
  }
);

//Filter By Violation Payload
selectedPolicyTest(
  'Selected Policy: Filter Payload By Key Only',
  async ({ selectedPolicyPage }) => {
    await MSBar.testSearchBarFilterGroup(
      selectedPolicyPage,
      'resource_data',
      MSBar.filterDataByPayloadKey,
      2
    );
  }
);
selectedPolicyTest(
  'Selected Policy: Filter Payload By Value Only',
  async ({ selectedPolicyPage }) => {
    await MSBar.testSearchBarFilterGroup(
      selectedPolicyPage,
      'resource_data',
      MSBar.filterDataByPayloadValue,
      2
    );
  }
);
selectedPolicyTest(
  'Selected Policy: Filter Payload By Pair',
  async ({ selectedPolicyPage }) => {
    await MSBar.testSearchBarFilterGroup(
      selectedPolicyPage,
      'resource_data',
      MSBar.filterDataByPayloadPair,
      2
    );
  }
);

selectedPolicyTest(
  'Selected Policy: Filter By Tag',
  async ({ selectedPolicyPage }) => {
    await MSBar.testSearchBarFilterGroup(
      selectedPolicyPage,
      'tag',
      MSBar.filterDataByTag,
      1
    );
  }
);

policyTest('Selected Policy: Clone New Policy', async ({ policyPage }) => {
  await policy.fillInNewPolicyFields(
    policyPage,
    'Clone Test',
    '"I\'m testing clones": "Pretty cool huh"',
    'AWS',
    "If you're reading this, the test failed somewhere."
  );

  // Navigate to main page and search for new policy
  await policyPage.goto('/policies');
  await policy.searchForElement(policyPage, '"Clone Test"');

  await _.clonePolicy(policyPage, 'Clone Test');
  await _.deletePolicy(policyPage);

  await policyPage.click('"Clone Test');
  await policy.deletePolicy(policyPage);
});
