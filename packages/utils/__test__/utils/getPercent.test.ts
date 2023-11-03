import { getPercent } from '../../src';

test('Accurately gets percentages', () => {
  const test = getPercent(398, 1000);
  expect(test).toBeCloseTo(39.8);
});

test('Doesnt crash with zero total, will clamp to a number', () => {
  const test = getPercent(100, 0);
  expect(test).toEqual(100);
  expect(getPercent(100, 0,2000)).toEqual(2000);
  expect(getPercent(100, 0, Infinity)).toEqual(Infinity);
});
