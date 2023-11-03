import { expect } from '../../fixtures/baseFixtures';
import organizationContextTest, {
  checkForOrgSelector,
} from './organizationContext.utils';

organizationContextTest(
  'Organization Context: Dropdown Select',
  async ({ organizationContextPage }) => {
    await organizationContextPage.click('text=mytest25');
    await organizationContextPage.click('li:has-text("foofoo2")');

    await organizationContextPage.waitForResponse(/risk-posture/i);

    //Check for URL and Text Change
    expect(organizationContextPage.url()).toContain('GS7CJwvcMqrkA8LPTmRSsV');
    await checkForOrgSelector(organizationContextPage, 'text=foofoo2');
  }
);
