import { expect } from '../../fixtures/baseFixtures';
import * as MSBar from '../../pageObjects/MSBar';
import { CheckBoxFilterGroup, SeverityOptions } from '../../pageObjects/MSBar';
import opsTest, * as _ from './ops.utils';

//Navigation Tests
opsTest('Ops: Navigate To Page', async ({ opsPage }) => {
  expect(opsPage.url()).toMatch(/ops/i);
});
opsTest('Ops: Switch to Category Page', async ({ opsPage }) => {
  await opsPage.click('text=Category');
  await opsPage.waitForURL(/category/i);
  expect(opsPage.url()).toMatch(/ops\/category/i);
});
opsTest('Ops: Navigate to Policy', async ({ opsPage }) => {
  await opsPage.click('span[class^="Opsstyled__RiskPosturePolicyCell"]');
  await opsPage.waitForURL(/policy\/details/i);

  expect(opsPage.url()).toMatch(/policy\/details/i);
  expect(opsPage.url()).toMatch(/violations/i);
});
opsTest('Ops: Navigate to Category', async ({ opsPage }) => {
  await opsPage.click('text=Category');
  await opsPage.waitForURL(/category/i);
  expect(opsPage.url()).toMatch(/ops\/category/i);

  await opsPage.click('span[class^="Opsstyled__RiskPostureCategoryCell"]');
  await opsPage.waitForURL(/category\/details/i);
  expect(opsPage.url()).toMatch(/category\/details/i);
  expect(opsPage.url()).toMatch(/details/i);
});

//Filter By CheckBox Filter Groups
opsTest('Ops: Filter By Data Source', async ({ opsPage }) => {
  await MSBar.testCheckboxFilterGroup(
    opsPage,
    'ds' as CheckBoxFilterGroup,
    _.opsSelectors,
    'datasource_id',
    /datasource_id/i
  );
});
opsTest('Ops: Filter By Categories', async ({ opsPage }) => {
  await MSBar.testCheckboxFilterGroup(
    opsPage,
    'categories' as CheckBoxFilterGroup,
    _.opsSelectors,
    'categories',
    /category_id/i
  );
});
opsTest('Ops: Filter By Resource Type', async ({ opsPage }) => {
  await MSBar.testCheckboxFilterGroup(
    opsPage,
    'resourceType' as CheckBoxFilterGroup,
    _.opsSelectors,
    'resourceType',
    /resource_id/i
  );
});

//Filter By Severity Filter Groups
opsTest('Ops: Filter By Severity (Critical)', async ({ opsPage }) => {
  await MSBar.testSeverityFilterGroup(
    opsPage,
    'critical' as SeverityOptions,
    /CRITICAL/i
  );
});
opsTest('Ops: Filter By Severity (High)', async ({ opsPage }) => {
  await MSBar.testSeverityFilterGroup(
    opsPage,
    'high' as SeverityOptions,
    /HIGH/i
  );
});
opsTest('Ops: Filter By Severity (Medium)', async ({ opsPage }) => {
  await MSBar.testSeverityFilterGroup(
    opsPage,
    'medium' as SeverityOptions,
    /MEDIUM/i
  );
});
opsTest('Ops: Filter By Severity (Low)', async ({ opsPage }) => {
  await MSBar.testSeverityFilterGroup(
    opsPage,
    'low' as SeverityOptions,
    /LOW/i
  );
});
