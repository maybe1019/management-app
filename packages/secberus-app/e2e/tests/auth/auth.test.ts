import { expect } from '../../fixtures/baseFixtures';
import authTest, { logBackIn } from './auth.utils';

authTest('Auth: Log Out and In', async ({ authPage }) => {
  //enter username info
  await authPage.click('[placeholder="name@company.com"]');
  await authPage.fill(
    '[placeholder="name@company.com"]',
    'jason+t1@secberus.com'
  );
  await authPage.click('text=Next');

  //enter password info
  await authPage.click('[placeholder="***"]');
  await authPage.fill('[placeholder="***"]', 'Secberus123$');
  await Promise.all([
    authPage.waitForResponse('**/resources'),
    authPage.click('text=Login'),
  ]);

  await authPage.context().storageState({ path: './state.json' });

  expect(authPage.$('Risk Posture'));
});

authTest('Auth: Log Out and Reset Password', async ({ authPage }) => {
  await authPage.click('a[href="/auth/forgot"]');

  await authPage.waitForSelector('text="Back to sign in"');
  expect(authPage.url()).toContain('forgot');

  await logBackIn(authPage);
});
