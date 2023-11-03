import { Page } from '@playwright/test';
export interface FilterOption {
  author: 'Author';
  categories: 'Categories';
  ds: 'Data sourcesClear >> svg';
  exceptions: 'ExceptionsClear >> svg';
  frameworks: 'Frameworks';
  resource_data: 'Resource dataClear >> svg';
  policies: 'PoliciesClear >> svg';
  resourceType: 'Resource Type';
  tag: 'Resource tagsClear >> svg';
  severity: 'Severity';
  status: 'Status';
}

export type CheckBoxFilterGroup =
  | 'author'
  | 'categories'
  | 'ds'
  | 'exceptions'
  | 'frameworks'
  | 'resourceType'
  | 'status';

export interface TestSeverityFilterGroupProps {
  testName: string;
  navigationFunction: () => Promise<Page>;
  severityLevel: SeverityOptions;
  severityUrlChange: RegExp;
}

export interface SeveritySelectors {
  critical: string;
  high: string;
  medium: string;
  low: string;
}

export type SeverityOptions = 'critical' | 'high' | 'medium' | 'low';
