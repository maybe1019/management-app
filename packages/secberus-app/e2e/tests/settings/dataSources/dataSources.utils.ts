import { Page } from '@playwright/test';
import { expect } from '../../../fixtures/baseFixtures';

import settingsTest from '../settings.utils';

type DataSourceFixtures = {
  dataSourcePage: Page;
};

export const validateNewDataSource = async (
  page: Page,
  newDataSource: string
) => {
  await page.goto('settings/data-sources');
  await page.waitForSelector(newDataSource);

  const newSource = await page.locator(newDataSource);
  const isPresent = await newSource.isVisible();
  expect(isPresent).toBeTruthy();
};

const dataSourceTest = settingsTest.extend<DataSourceFixtures>({
  dataSourcePage: async ({ settingsPage }, use) => {
    await use(settingsPage);
  },
});

export default dataSourceTest;
