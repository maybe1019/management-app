import { Page } from '@playwright/test';
import { test } from '../../fixtures/baseFixtures';

type AuthFixtures = {
  authPage: Page;
};

const authTest = test.extend<AuthFixtures>({
  authPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForNavigation({
      url: /risk-posture/i,
    });
    await page.click('button:has-text("Logout")');

    await page.waitForSelector('text=Sign In');

    await use(page);
  },
});

export const logBackIn = async (page: Page) => {
  await page.goto('/auth/entry');

  await page.context().storageState({ path: './state.json' });

  //enter username info
  await page.click('[placeholder="name@company.com"]');
  await page.fill('[placeholder="name@company.com"]', 'jason+t1@secberus.com');
  await Promise.all([page.waitForNavigation(), page.click('text=Next')]);

  //enter password info
  await page.click('[placeholder="***"]');
  await page.fill('[placeholder="***"]', 'Secberus123$');
  await Promise.all([
    page.waitForResponse('**/resources'),
    page.click('text=Login'),
  ]);

  await page.context().storageState({ path: './state.json' });
};

export default authTest;
