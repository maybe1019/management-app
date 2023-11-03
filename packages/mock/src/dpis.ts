import faker from 'faker';

export interface IDpi {
  id: string;
  name: string;
  org_id: string;
  dp: string;
  verified: boolean;
  policies: string[];
}

export const generateDPI = (): IDpi => ({
  id: faker.finance.bic(),
  name: faker.finance.accountName(),
  org_id: faker.finance.accountName(),
  dp: faker.finance.currencyCode(),
  verified: faker.random.boolean(),
  policies: Array(10)
    .fill(0)
    .map(() => faker.random.uuid()),
});

export const dpisData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateDPI());
