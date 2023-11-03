import { expect } from '../../fixtures/baseFixtures';
import * as MSBar from '../../pageObjects/MSBar';
import { CheckBoxFilterGroup } from '../../pageObjects/MSBar';
import activityLogTest, * as _ from './activityLog.utils';

//Navigation Tests
activityLogTest(
  'Activity Log: Navigate To Page',
  async ({ activityLogPage }) => {
    expect(activityLogPage.url()).toMatch(/activity-log/i);
  }
);

//Filter By CheckBox Filter Groups
activityLogTest(
  'Activity Log: Filter By Data Source',
  async ({ activityLogPage }) => {
    await MSBar.testCheckboxFilterGroup(
      activityLogPage,
      'ds' as CheckBoxFilterGroup,
      _.activityLogSelectors,
      'datasource_id',
      /datasource_id/i
    );
  }
);
activityLogTest(
  'Activity Log: Filter By Categories',
  async ({ activityLogPage }) => {
    await MSBar.testCheckboxFilterGroup(
      activityLogPage,
      'categories' as CheckBoxFilterGroup,
      _.activityLogSelectors,
      'categories',
      /category_id/i
    );
  }
);

//Filter By Policy
activityLogTest(
  'Activity Log: Filter By Policy',
  async ({ activityLogPage }) => {
    await MSBar.selectFilterSelection(activityLogPage, 'policies');

    await MSBar.makeDropdownSelection(
      activityLogPage,
      _.activityLogSelectors['policy']
    );
    expect(activityLogPage.url()).toMatch(/policy_id/i);

    await MSBar.deleteDropdownSelectionViaSVG(activityLogPage);
    await activityLogPage.waitForURL(/activity-log/i);
    expect(activityLogPage.url()).not.toMatch(/policy_id/i);
  }
);
