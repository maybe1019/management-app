import faker from 'faker';
import { generateRule, IRule } from './rules';
import { generateDPI, IDpi } from './dpis';

export interface IPolicy {
  id: string;
  org_id: string;
  name: string;
  description: string;
  secberus_managed: boolean;
  subscribed: boolean;
  rules: IRule[];
  dpis: IDpi[];
  status: {
    rules_passed: number;
    rules_failed: number;
    rules_error: number;
    rules_percentage_passed: number;
    alerts_critical: number;
    alerts_high: number;
    alerts_medium: number;
    alerts_low: number;
    alerts_quiet: number;
    exec_datetime: Date;
  };
  schedule: {
    trigger: string;
    trigger_type: string;
    enabled: boolean;
    timezone: string;
    start_datetime: Date;
    end_datetime: Date;
    id: string;
    name: string;
    first_run_datetime: Date;
    next_run_datetime: Date;
    last_run_datetime: Date;
  };
  risk_trend: {
    time_span: number;
    time_measure: string;
    data: string[];
  };
}

export const generatePolicy = (): IPolicy => ({
  id: faker.random.uuid(),
  org_id: faker.random.uuid(),
  name: faker.finance.accountName(),
  description: faker.hacker.phrase(),
  secberus_managed: faker.random.boolean(),
  subscribed: faker.random.boolean(),
  rules: Array(15)
    .fill(0)
    .map(() => generateRule()),
  dpis: Array(15)
    .fill(0)
    .map(() => generateDPI()),
  status: {
    rules_passed: Math.floor(Math.random() * 17) + 1,
    rules_failed: Math.floor(Math.random() * 17) + 1,
    rules_error: Math.floor(Math.random() * 17) + 1,
    rules_percentage_passed: Math.floor(Math.random() * 100) + 1,
    alerts_critical: Math.floor(Math.random() * 17) + 1,
    alerts_high: Math.floor(Math.random() * 17) + 1,
    alerts_medium: Math.floor(Math.random() * 17) + 1,
    alerts_low: Math.floor(Math.random() * 17) + 1,
    alerts_quiet: Math.floor(Math.random() * 17) + 1,
    exec_datetime: faker.date.future(),
  },
  schedule: {
    trigger: '15m',
    trigger_type: 'interval',
    enabled: faker.random.boolean(),
    timezone: 'UTC',
    start_datetime: faker.date.past(),
    end_datetime: faker.date.future(),
    id: faker.random.uuid(),
    name: faker.hacker.adjective(),
    first_run_datetime: faker.date.past(),
    next_run_datetime: faker.date.future(),
    last_run_datetime: faker.date.past(),
  },
  risk_trend: {
    time_span: 0,
    time_measure: 'string',
    data: [],
  },
});

export const policiesData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generatePolicy());
