import faker from 'faker';

export const generateRandomKeyValues = (k = 3): Record<string, any> => {
  const randomKeys: Record<string, any> = {};
  let key = '';
  for (let i = 0; i <= k; i++) {
    key = `${faker.company.bsBuzz()}:${faker.company.bsBuzz()}`;
    randomKeys[key.toString()] = faker.company.catchPhraseDescriptor();
  }
  return randomKeys;
};
