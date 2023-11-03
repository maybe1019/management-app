import faker from 'faker';

export type AccessPolicy = {
  id: string;
  name: string;
  secberus_managed: boolean;
};

export const generateAccessPolicy = (): AccessPolicy => {
  const accessPolicy = {
    id: faker.random.uuid(),
    name: faker.lorem.words(),
    logic: faker.lorem.paragraphs(),
    description: faker.lorem.sentence(),
    secberus_managed: faker.random.boolean(),
  };
  return accessPolicy;
};

export const generateAccessPolicyArray = (
  length: number
): Array<AccessPolicy> => Array.from({ length }, () => generateAccessPolicy());
