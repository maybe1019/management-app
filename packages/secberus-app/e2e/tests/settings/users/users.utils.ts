import { Page } from '@playwright/test';
import settingsTest from '../settings.utils';

type UsersFixtures = {
  usersPage: Page;
};

const usersTest = settingsTest.extend<UsersFixtures>({
  usersPage: async ({ settingsPage }, use) => {
    await settingsPage.click('a[href="/settings/users"]');
    await settingsPage.waitForResponse(/users/i);
    await use(settingsPage);
  },
});

export default usersTest;
