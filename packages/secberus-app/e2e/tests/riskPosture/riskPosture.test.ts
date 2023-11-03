import { expect } from '../../fixtures/baseFixtures';
import * as MSBar from '../../pageObjects/MSBar';
import { CheckBoxFilterGroup, SeverityOptions } from '../../pageObjects/MSBar';
import riskPostureTest, * as _ from './riskPosture.utils';

//Navigation Tests
riskPostureTest(
  'Risk Posture: Navigate To Page',
  async ({ riskPosturePage }) => {
    expect(riskPosturePage.url()).toMatch(/risk-posture\/policy/i);
  }
);
riskPostureTest(
  'Risk Posture: Switch to Category Page',
  async ({ riskPosturePage }) => {
    await riskPosturePage.click('text=Category');
    await riskPosturePage.waitForURL(/category/i);
    expect(riskPosturePage.url()).toMatch(/risk-posture\/category/i);
  }
);
riskPostureTest(
  'Risk Posture: Navigate to Policy',
  async ({ riskPosturePage }) => {
    await riskPosturePage.click(
      'span[class^="RiskPosturestyled__RiskPosturePolicyCell"]'
    );

    await riskPosturePage.waitForURL(/violations/i);
    expect(riskPosturePage.url()).toMatch(/policy\/details/i);
    expect(riskPosturePage.url()).toMatch(/violations/i);
  }
);
riskPostureTest(
  'Risk Posture: Navigate to Category',
  async ({ riskPosturePage }) => {
    await riskPosturePage.click('text=Category');
    await riskPosturePage.waitForURL(/category/i);
    expect(riskPosturePage.url()).toMatch(/risk-posture\/category/i);

    await riskPosturePage.click(
      'span[class^="RiskPosturestyled__RiskPostureCategoryCell"]'
    );

    await riskPosturePage.waitForURL(/details/i);
    expect(riskPosturePage.url()).toMatch(/category\/details/i);
    expect(riskPosturePage.url()).toMatch(/details/i);
  }
);

//Filter By CheckBox Filter Groups
riskPostureTest(
  'Risk Posture: Filter By Data Source',
  async ({ riskPosturePage }) => {
    await MSBar.testCheckboxFilterGroup(
      riskPosturePage,
      'ds' as CheckBoxFilterGroup,
      _.riskPostureSelectors,
      'datasource_id',
      /datasource_id/i
    );
  }
);
riskPostureTest(
  'Risk Posture: Filter By Categories',
  async ({ riskPosturePage }) => {
    await MSBar.testCheckboxFilterGroup(
      riskPosturePage,
      'categories' as CheckBoxFilterGroup,
      _.riskPostureSelectors,
      'categories',
      /category_id/i
    );
  }
);
riskPostureTest(
  'Risk Posture: Filter By Resource Type',
  async ({ riskPosturePage }) => {
    await MSBar.testCheckboxFilterGroup(
      riskPosturePage,
      'resourceType' as CheckBoxFilterGroup,
      _.riskPostureSelectors,
      'resourceType',
      /resource_id/i
    );
  }
);

//Filter By Severity Filter Groups
riskPostureTest(
  'Risk Posture: Filter By Severity (Critical)',
  async ({ riskPosturePage }) => {
    await MSBar.testSeverityFilterGroup(
      riskPosturePage,
      'critical' as SeverityOptions,
      /CRITICAL/i
    );
  }
);
riskPostureTest(
  'Risk Posture: Filter By Severity (High)',
  async ({ riskPosturePage }) => {
    await MSBar.testSeverityFilterGroup(
      riskPosturePage,
      'high' as SeverityOptions,
      /HIGH/i
    );
  }
);
riskPostureTest(
  'Risk Posture: Filter By Severity (Medium)',
  async ({ riskPosturePage }) => {
    await MSBar.testSeverityFilterGroup(
      riskPosturePage,
      'medium' as SeverityOptions,
      /MEDIUM/i
    );
  }
);
riskPostureTest(
  'Risk Posture: Filter By Severity (Low)',
  async ({ riskPosturePage }) => {
    await MSBar.testSeverityFilterGroup(
      riskPosturePage,
      'low' as SeverityOptions,
      /LOW/i
    );
  }
);

//Filter By Violation Payload - "Resource Data"
riskPostureTest(
  'Risk Posture: Filter Payload By Key Only',
  async ({ riskPosturePage }) => {
    await MSBar.testSearchBarFilterGroup(
      riskPosturePage,
      'resource_data',
      MSBar.filterDataByPayloadKey,
      3
    );
  }
);
riskPostureTest(
  'Risk Posture: Filter Payload By Value Only',
  async ({ riskPosturePage }) => {
    await MSBar.testSearchBarFilterGroup(
      riskPosturePage,
      'resource_data',
      MSBar.filterDataByPayloadValue,
      3
    );
  }
);
riskPostureTest(
  'Risk Posture: Filter Payload By Pair',
  async ({ riskPosturePage }) => {
    await MSBar.testSearchBarFilterGroup(
      riskPosturePage,
      'resource_data',
      MSBar.filterDataByPayloadPair,
      3
    );
  }
);

//Filter By Tags
riskPostureTest('Risk Posture: Filter By Tag', async ({ riskPosturePage }) => {
  await MSBar.testSearchBarFilterGroup(
    riskPosturePage,
    'tag',
    MSBar.filterDataByTag,
    2
  );
});
