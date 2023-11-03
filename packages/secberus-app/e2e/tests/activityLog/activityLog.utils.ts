import { ActivityLogSelectors } from '../../specs/types/activityLog.type';
import { Page } from '@playwright/test';
import { test } from '../../fixtures/baseFixtures';

export const activityLogSelectors: ActivityLogSelectors = {
  datasource_id: 'label[for^=datasource_id]',
  categories: 'label:has-text("Access Control: Authentication")',
  policy: 'input[id^=downshift]',
};

type ActivityLogFixtures = {
  activityLogPage: Page;
};

const activityLogTest = test.extend<ActivityLogFixtures>({
  activityLogPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForURL(/risk-posture/i);
    await page.click('a:has-text("Activity Log")');

    await page.waitForSelector('text=Clear');

    await use(page);
  },
});

export default activityLogTest;
