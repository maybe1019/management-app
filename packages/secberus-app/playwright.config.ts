import { PlaywrightTestConfig } from '@playwright/test';
import { baseUrl } from './e2e/constants';

const config: PlaywrightTestConfig = {
  outputDir: './e2e/test-results',
  globalSetup: './e2e/fixtures/global-setup.ts',
  use: {
    viewport: { width: 1660, height: 1120 },
    video: 'retain-on-failure',
    storageState: 'state.json',
    baseURL: baseUrl,
  },
  timeout: 60000,
};

export default config;
