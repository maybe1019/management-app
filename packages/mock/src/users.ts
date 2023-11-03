import faker from 'faker';

export interface User {
  id: string;
  email: string;
  full_name: string;
  account_owner: boolean;
  mfa: boolean;
  roles: string[];
  orgs: string[];
  create_datetime: Date;
  deactivate_datetime: Date | null;
  last_login_datetime: Date | null;
  last_password_change_datetime: Date | null;
}

export const generateUser = (): User => ({
  id: faker.finance.bic(),
  email: faker.internet.email(),
  full_name: faker.finance.accountName(),
  account_owner: faker.random.boolean(),
  mfa: faker.random.boolean(),
  roles: [...new Array(10)].map(() => faker.finance.accountName()),
  orgs: [...new Array(10)].map(() => faker.finance.accountName()),
  create_datetime: faker.date.past(),
  deactivate_datetime: null,
  last_login_datetime: faker.date.recent(),
  last_password_change_datetime: null,
});

export const generateUsers = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateUser());
