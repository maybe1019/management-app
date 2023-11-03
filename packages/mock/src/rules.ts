import faker from 'faker';
import { generateResource, IResource } from './resources';

export interface IRule {
  label: string;
  description: string;
  summary: string;
  logic: string;
  remediation_steps: string;
  alert_summary_tmpl: string;
  priority: number;
  id: string;
  secberus_managed: boolean;
  resources: IResource[];
  policies: string[];
  alert_count: number;
}

export const generateRule = (): IRule => ({
  label: faker.finance.accountName(),
  description: faker.hacker.phrase(),
  summary: faker.hacker.phrase(),
  logic: faker.lorem.paragraph(),
  remediation_steps: faker.lorem.paragraphs(),
  alert_summary_tmpl: faker.hacker.phrase(),
  priority: Math.floor(Math.random() * 9) + 1,
  id: faker.finance.bic(),
  secberus_managed: faker.random.boolean(),
  resources: Array(Math.floor(Math.random() * 3) + 1)
    .fill(0)
    .map(() => generateResource()),
  policies: Array(Math.floor(Math.random() * 3) + 1)
    .fill(0)
    .map(() => faker.finance.bic()),
  alert_count: Math.floor(Math.random() * 9) + 1,
});

export const rulesData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateRule());
