import faker from 'faker';
import moment from 'moment';
import { generateDPI, IDpi } from './dpis';

enum STATUS {
  OPEN,
  FIXED,
  CLOSED,
}

export interface IAlert {
  id: string;
  rule_name: string;
  rule_id: string;
  rule_priority: number;
  policy_id: string;
  payload: Record<string, any>;
  status: string;
  dpis: IDpi[];
  create_timestamp: string;
  risk_score: number;
  suppressed: boolean;
  remediation_plans: string[];
  update_timestamp: null;
  close_timestamp: null;
  tags: string[];
  comments: null;
}

export const generateAlert = () => ({
  id: faker.random.uuid(),
  rule_name: faker.finance.accountName(),
  rule_id: faker.finance.bic(),
  rule_priority: Math.floor(Math.random() * 9) + 1,
  policy_id: faker.finance.bic(),
  payload: {},
  status: STATUS[Math.floor(Math.random() * 3)],
  dpis: Array(Math.floor(Math.random() * 3) + 1)
    .fill(0)
    .map(() => generateDPI()),
  create_timestamp: moment(faker.date.recent()).format('X'),
  risk_score: Math.floor(Math.random() * 9) + 1,
  suppressed: faker.random.boolean(),
  remediation_plans: [],
  update_timestamp: null,
  close_timestamp: null,
  tags: [],
  comments: null,
});

export const alertsData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateAlert());
