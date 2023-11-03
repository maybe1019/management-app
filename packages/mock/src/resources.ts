import faker from 'faker';

export interface IResource {
  id: string;
  name: string;
  dp: string;
  required: boolean;
}

export const generateResource = (): IResource => ({
  id: faker.finance.bic(),
  name: faker.hacker.adjective(),
  dp: faker.hacker.abbreviation(),
  required: faker.random.boolean(),
});

export const resourcesData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateResource());
