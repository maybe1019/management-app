import { chromium } from '@playwright/test';
import { baseUrl } from '../constants';

async function globalSetup() {
  //start proper browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 2048, height: 1120 },
    baseURL: baseUrl,
  });

  const page = await context.newPage();
  await page.goto(`/auth/entry`);

  //enter username info
  await page.fill('input[name="username"]', 'jason+t1@secberus.com');
  await Promise.all([page.waitForNavigation(), page.click('text=Next')]);

  //enter password info
  await page.fill('input[name="password"]', 'Secberus123$');

  await page.click('text=Login');

  const watchForAuth = page.waitForFunction(() => {
    const state = JSON.parse(window.localStorage['persist:root']);
    const { orgIsInjected } = JSON.parse(state.authentication);
    return orgIsInjected;
  });
  await watchForAuth;

  await page.context().storageState({ path: 'state.json' });
  await page.pause();
  await browser.close();
}

export default globalSetup;
