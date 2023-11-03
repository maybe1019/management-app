import { Page } from '@playwright/test';

const scrollToBottomOfVirtualList = async (page: Page, prev: any) => {
  await page.waitForSelector('.react-fluid-table-row');
  const items = await page.$$('.react-fluid-table-row');
  const lastItemRendered = items[items.length - 1];
  const next = await lastItemRendered.getAttribute('data-index'); // row-items have data-index attributes revealing their true index
  if (next === prev) return;
  await lastItemRendered.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100); // going straight to the next eval wasn't catching the newly rendered row items
  await scrollToBottomOfVirtualList(page, next);
};

export default scrollToBottomOfVirtualList;
