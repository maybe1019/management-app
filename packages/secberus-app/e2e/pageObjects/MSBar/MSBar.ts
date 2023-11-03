import { Page, expect } from '@playwright/test';
import { clickAndFillInput } from '../../utils';
import {
  SEVERITY_SELECTORS,
  VIOLATION_PAYLOAD_MOCK_DATA,
  TAG_MOCK_DATA,
  selectFilterSelection,
} from './MSBar.utils';
import { CheckBoxFilterGroup, SeverityOptions } from './MSBar.types';

export const testCheckboxFilterGroup = async (
  page: Page,
  filterGroupName: CheckBoxFilterGroup,
  selectorGroup: any,
  filterSelector: string,
  urlChange: RegExp
) => {
  await filterDataByCheckboxGroup(
    filterGroupName,
    selectorGroup[filterSelector],
    page
  );

  const selectedBox = await page.$(`${selectorGroup[filterSelector]}`);

  if (selectedBox) {
    expect(page.url()).toMatch(urlChange);

    await page.click(`${selectorGroup[filterSelector]}`, { force: true });
    expect(page.url()).not.toMatch(urlChange);
    return;
  }
};

export const filterDataByCheckboxGroup = async (
  filterGroup: CheckBoxFilterGroup,
  firstChild: string,
  page: Page
) => {
  await selectFilterSelection(page, filterGroup);
  await page.click(`${firstChild}`, { force: true });
};

export const testSeverityFilterGroup = async (
  page: Page,
  severityLevel: SeverityOptions,
  severityUrlChange: RegExp
) => {
  await selectFilterSelection(page, 'severity');
  await filterDataBySeverity(severityLevel, page);

  await page.waitForResponse(/severity_label/i);
  expect(page.url()).toMatch(/severity_label/i);
  expect(page.url()).toMatch(severityUrlChange);
};

export const filterDataBySeverity = async (
  severity: SeverityOptions,
  page: Page
) => {
  await page.click(SEVERITY_SELECTORS[severity], { force: true });
};

export const filterDataByPayloadKey = async (page: Page) => {
  await Promise.all([
    await clickAndFillInput(page, VIOLATION_PAYLOAD_MOCK_DATA[0], 2),
  ]);
};

export const filterDataByPayloadValue = async (page: Page) => {
  await Promise.all([
    await clickAndFillInput(page, VIOLATION_PAYLOAD_MOCK_DATA[1], 2),
  ]);
};

export const filterDataByPayloadPair = async (page: Page) => {
  await Promise.all([
    await clickAndFillInput(page, VIOLATION_PAYLOAD_MOCK_DATA[0], 2),
    await clickAndFillInput(page, VIOLATION_PAYLOAD_MOCK_DATA[1], 2),
  ]);
};

export const filterDataByTag = async (page: Page) => {
  await Promise.all([
    await clickAndFillInput(page, TAG_MOCK_DATA[0], 1),
    await clickAndFillInput(page, TAG_MOCK_DATA[1], 1),
  ]);
};

export const testSearchBarFilterGroup = async (
  page: Page,
  filterGroup: 'resource_data' | 'tag',
  payloadFunction: any,
  position: number
) => {
  await selectFilterSelection(page, filterGroup);
  await payloadFunction(page);

  await page.click(`:nth-match(:text("Add"), ${position})`);
  await page.waitForURL(new RegExp(`${filterGroup}`, 'i'));

  expect(page.url()).toMatch(new RegExp(`${filterGroup}`, 'i'));
};

export const clearPayloadSelection = async (page: Page) => {
  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Violation PayloadClear >> div'),
  ]);
};
