import { test } from './fixtures/baseFixtures';
import { baseUrl } from './constants';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('pipeline: directs to sign in2', async ({ page }) => {
  test.skip();
  test.fail();
  await page.waitForSelector('text=Sign In FAIL');
});
