import { getStringPercent } from '../../src';

const getNumberOfZeroes = (numZeroes: number): string => {
  let zeroes = '';
  for(let i = 1; i<=numZeroes; i++) {
    zeroes = zeroes + '0'
  }
  return zeroes;
}

test('Converts accurately to two decimal places', () => {
  const percentage = getStringPercent(32, 100, 2);
  expect(percentage).toEqual('32.00%');
});

test('Floors if zero decimal places', () => {
  const roundDown = getStringPercent(32.22, 100);
  expect(roundDown).toEqual('32%');
  const roundUp = getStringPercent(69.99, 100, 0);
  expect(roundUp).toEqual('70%');
});

test('Handles dividing by zero, clamps to number (toFixed maxes at 100 decimal points btw)', () => {
  const test = getStringPercent(32, 0);
  expect(test).toEqual('100%');
  expect(getStringPercent(32, 0, 0, 1000)).toEqual('1000%');
  expect(getStringPercent(32, 0, 0, Infinity)).toEqual('Infinity%');
});

test('Handles decimal points accurately (1 - 100).', () => {
  let randomZeroes:number;
  for(let i = 0; i<=10; i++){
    randomZeroes = Math.floor(99 * Math.random()) + 1;
    expect(getStringPercent(32, 0, randomZeroes)).toEqual(`100.${getNumberOfZeroes(randomZeroes)}%`);
  }
})