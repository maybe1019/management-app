import { BrowserType, chromium, firefox } from 'playwright';
import { baseUrl } from '../constants';

const login = async (browserChoice: BrowserType) => {
  //start proper browswer
  const browser = await browserChoice.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${baseUrl}/auth/entry`);

  //enter username info
  await page.click('[placeholder="name@company.com"]');
  await page.fill('[placeholder="name@company.com"]', 'jason+t1@secberus.com');
  await Promise.all([page.waitForNavigation(), page.click('text=Next')]);

  //enter password info
  await page.click('[placeholder="***"]');
  await page.fill('[placeholder="***"]', 'Secberus123$');
  await Promise.all([page.waitForNavigation(), page.click('text=Login')]);

  return page;
};

export const chromiumLogin = async () => await login(chromium);
export const firefoxLogin = async () => await login(firefox);
