import { test } from './fixtures/baseFixtures';
import { baseUrl } from './constants';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('pipeline: directs to Risk posture', async ({ page }) => {
  await page.waitForSelector('text=Risk posture');
});
