import { expect } from '../../../fixtures/baseFixtures';
import usersTest from './users.utils';

usersTest.describe('User Workflow - ', () => {
  usersTest('Users: Create A New User', async ({ usersPage }) => {
    await usersPage.click('text=New user');

    await usersPage.click('[placeholder="Johnny"]');
    await usersPage.fill('[placeholder="Johnny"]', 'Playwright');

    await usersPage.click('[placeholder="Applesprout"]');
    await usersPage.fill('[placeholder="Applesprout"]', 'TestUserino');

    await usersPage.click('[placeholder="orga@acme.org"]');
    await usersPage.fill(
      '[placeholder="orga@acme.org"]',
      'playwright@secberus.com'
    );

    await usersPage.click('button:has-text("Create")');

    const newUser = usersPage.locator('Playwright TestUserino');
    expect(newUser).toBeTruthy();
  });

  usersTest('Users: Edit A User', async ({ usersPage }) => {
    await usersPage.click(
      'text=Playwright TestUserinoplaywright@secberus.com >> button'
    );

    await usersPage.click('[placeholder="Johnny"]');
    await usersPage.fill('[placeholder="Johnny"]', 'Rando');

    await usersPage.click('[placeholder="Applesprout"]');
    await usersPage.fill('[placeholder="Applesprout"]', 'Tester');

    await usersPage.click('button:has-text("Save Changes")');

    const newUser = usersPage.locator('Rando Tester');
    expect(newUser).toBeTruthy();
  });

  usersTest('Users: Delete A User', async ({ usersPage }) => {
    const testUser = usersPage.locator('text=Rando Tester');
    await usersPage.click('text=Rando Testerplaywright@secberus.com >> button');

    await usersPage.click('text=Delete user');
    await expect(testUser).not.toBeVisible();
  });
});
