import { AnyDomain } from '../../src';

const validHttpFixtures = {
  args: [
    'http://hello.world',
    'http://secberus.io/abc?def=ghi',
    'http://www.world.com/',
    'http://www.world.wide.com.website/',
  ],
  matches: [
    'http://hello.world',
    'http://secberus.io',
    'http://www.world.com',
    'http://www.world.wide.com.website',
  ],
};
const validHttpsFixtures = {
  args: [
    'https://hello.world',
    'https://secberus.io/abc?def=ghi',
    'https://www.world.com/',
    'https://www.world.wide.com.website/',
  ],
  matches: [
    'https://hello.world',
    'https://secberus.io',
    'https://www.world.com',
    'https://www.world.wide.com.website',
  ],
};
test('matches HTTP urls properly', () => {
  const matches = validHttpFixtures.args.map(f => f.match(AnyDomain));
  matches.forEach((m, index) => {
    expect(m?.[0]).toEqual(validHttpFixtures.matches[index]);
  });
});

test('matches HTTPS urls properly', () => {
  const matches = validHttpsFixtures.args.map(f => f.match(AnyDomain));
  matches.forEach((m, index) => {
    expect(m?.[0]).toEqual(validHttpsFixtures.matches[index]);
  });
});
