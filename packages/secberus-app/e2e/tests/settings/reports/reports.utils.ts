import { Page } from '@playwright/test';
import settingsTest from '../settings.utils';

type ReportsFixtures = {
  reportsPage: Page;
};

const reportsTest = settingsTest.extend<ReportsFixtures>({
  reportsPage: async ({ settingsPage }, use) => {
    await settingsPage.click('a[href="/settings/reports"]');
    await settingsPage.waitForResponse(/integrations/i);
    await use(settingsPage);
  },
});

export default reportsTest;
