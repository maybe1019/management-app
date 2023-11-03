import { expect } from '../../fixtures/baseFixtures';
import settingsTest from './settings.utils';

settingsTest('Settings: Navigate To Page', async ({ settingsPage }) => {
  expect(settingsPage.url()).toMatch(/settings/i);
});
