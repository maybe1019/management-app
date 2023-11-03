import { AnyURL } from '../../src';

const validHttpFixtures = [
  'http://hello.world',
  'http://secberus.io/abc?def=ghi',
  'http://www.world.com',
];
const invalidHttpFixtures = [
  'aaaaaaa?',
  'mttps:/abc.def',
  'ttp://notvalid.com',
];
const validHttpsFixtures = [
  'https://hello.world',
  'https://secberus.io/abc?def=ghi',
  'https://www.world.com',
];
const invalidHttpsFixtures = [
  'htts://aaaaaaa?',
  'abc.def',
  'ttps://notvalid.com',
];

test('matches HTTP urls properly', () => {
  const matches = validHttpFixtures.map(f => f.match(AnyURL));
  matches.forEach((m, index) => {
    expect(m?.[0]).toEqual(validHttpFixtures[index]);
  });
});

test('matches HTTPS urls properly', () => {
  const matches = validHttpsFixtures.map(f => f.match(AnyURL));
  matches.forEach((m, index) => {
    expect(m?.[0]).toEqual(validHttpsFixtures[index]);
  });
});

test('fails to match invalid URLs properly', () => {
  const matches = invalidHttpFixtures.map(f => f.match(AnyURL));
  matches.forEach(m => expect(m).toEqual(null));
});

test('fails to match invalid URLs properly', () => {
  const matches = invalidHttpsFixtures.map(f => f.match(AnyURL));
  matches.forEach(m => expect(m).toEqual(null));
});
