import { expect } from '../../../fixtures/baseFixtures';
import reportsTest from './reports.utils';

reportsTest('Reports: Can Adjust Report', async ({ reportsPage }) => {
  const checkedSelector = 'input[data-testid="RISK-as"]';

  if (await reportsPage.isChecked(checkedSelector)) {
    await reportsPage.click('text=OffOn >> span');
    await reportsPage.waitForResponse('**/report-schedules/*');
    expect(!(await reportsPage.isChecked(checkedSelector)));

    await reportsPage.click('text=OffOn >> span');
    await reportsPage.waitForResponse('**/report-schedules');
    expect(await reportsPage.isChecked(checkedSelector));
  } else if (!(await reportsPage.isChecked(checkedSelector))) {
    await reportsPage.click('text=OffOn >> span');
    await reportsPage.waitForResponse('**/report-schedules/*');
    expect(await reportsPage.isChecked(checkedSelector));

    await reportsPage.click('text=OffOn >> span');
    await reportsPage.waitForResponse('**/report-schedules');
    expect(!(await reportsPage.isChecked(checkedSelector)));
  }

  // todo: make more robust
  await reportsPage.click(
    'div[role="button"][id="RISK-as"]:has-text("Weekly")'
  );
  await reportsPage.click('li[id="DAILY"]');

  await reportsPage.waitForResponse('**/report-schedules/*');

  expect(reportsPage.$('Daily'));

  await reportsPage.click('div[role="button"][id="RISK-as"]:has-text("Daily")');

  await reportsPage.click('li[id="WEEKLY"]');

  await reportsPage.waitForResponse('**/report-schedules/*');

  expect(
    reportsPage.locator('div[role="button"][id="RISK-as"]:has-text("Weekly")')
  );

  await reportsPage.pause();
});
