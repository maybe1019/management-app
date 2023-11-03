import { expect } from '../../../fixtures/baseFixtures';
import frameworksTest from './frameworks.utils';

frameworksTest('Frameworks: Toggle Framework', async ({ frameworksPage }) => {
  await frameworksPage.click('text=OffOn >> span');
  expect(frameworksPage.waitForSelector('label >> text=Off'));

  await frameworksPage.click('text=OffOn >> span');
});
