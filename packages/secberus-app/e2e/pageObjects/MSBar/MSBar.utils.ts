import { Page } from '@playwright/test';
import type { Payload } from '../../types';
import type { FilterOption, SeveritySelectors } from './MSBar.types';

export const FILTER_OPTIONS: FilterOption = {
  author: 'Author',
  categories: 'Categories',
  ds: 'Data sourcesClear >> svg',
  exceptions: 'ExceptionsClear >> svg',
  frameworks: 'Frameworks',
  policies: 'PoliciesClear >> svg',
  resource_data: 'Resource dataClear >> svg',
  tag: 'Resource tagsClear >> svg',
  resourceType: 'Resource Type',
  severity: 'Severity',
  status: 'Status',
};

export const SEVERITY_SELECTORS: SeveritySelectors = {
  critical: 'text=Critical',
  high: 'text=High',
  medium: 'text=Medium',
  low: 'div[name*=LOW]',
};

export const VIOLATION_PAYLOAD_MOCK_DATA: Payload[] = [
  { field: 'Key', value: 'missing_alarm' },
  { field: 'Value', value: 'RootAccountUsageEventCount' },
];

export const TAG_MOCK_DATA: Payload[] = [
  { field: 'Key', value: 'foo' },
  { field: 'Value', value: 'bar' },
];

export const TOOLTIP_TEXT =
  'text=Supported operators are key:, :value or key:value. Eg.: region: or :us-east-1 or';

export const selectFilterSelection = async (
  page: Page,
  category: keyof FilterOption
) => {
  await page.click(`text=${FILTER_OPTIONS[category]}`);
};

export const makeDropdownSelection = async (
  page: Page,
  dropdownPlaceholder: string
) => {
  await page.click(dropdownPlaceholder, { force: true });

  await page.fill(dropdownPlaceholder, 'Ensure');
  await page.press(dropdownPlaceholder, 'Enter');
};

export const deleteDropdownSelectionViaSVG = async (page: any) => {
  await page.click(`text=Ensure >> svg`);
};
