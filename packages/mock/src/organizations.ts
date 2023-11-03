import faker from 'faker';

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export const generateOrganization = (): Organization => ({
  id: faker.finance.bic(),
  name: faker.finance.accountName(),
  description: faker.finance.accountName(),
});

export const generateOrganizations = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateOrganization());
