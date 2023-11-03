import faker from 'faker';
import { generateControl, IControl } from './controls';

export interface IRequirement {
  ordinal: string;
  identifier: string;
  description: string;
  id: string;
  controls: IControl[];
  compliance_id: string;
}

export const generateRequirement = () => ({
  ordinal: '1(a)',
  identifier: faker.hacker.abbreviation(),
  description: faker.hacker.phrase(),
  id: faker.random.uuid(),
  controls: Array(5)
    .fill(0)
    .map(() => generateControl(1)),
  compliance_id: faker.random.uuid(),
});

export const requirementsData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateRequirement());
