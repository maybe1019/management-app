import faker from 'faker';
import { generateRequirement, IRequirement } from './requirements';

export interface ICompliance {
  name: string;
  descrption: string;
  url: string;
  id: string;
  requirements: IRequirement[];
}

export const generateCompliance = () => ({
  name: faker.finance.accountName(),
  description: faker.hacker.phrase(),
  url: 'http://example.com',
  id: faker.random.uuid(),
  requirements: Array(30)
    .fill(0)
    .map(() => generateRequirement()),
});

export const compliancesData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateCompliance());
