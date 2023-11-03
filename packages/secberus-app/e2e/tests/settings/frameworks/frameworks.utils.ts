import { Page } from '@playwright/test';
import settingsTest from '../settings.utils';

type FrameworksFixtures = {
  frameworksPage: Page;
};

const frameworksTest = settingsTest.extend<FrameworksFixtures>({
  frameworksPage: async ({ settingsPage }, use) => {
    await settingsPage.click('a[href="/settings/frameworks"]');
    await settingsPage.waitForURL(/frameworks/i);
    await use(settingsPage);
  },
});

export default frameworksTest;
