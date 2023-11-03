import { snakeToCamelObjectKeys } from '../../src';

const snakeObj = {
  test_1: '1',
  test_2: '2',
  test_3: {
    test_4: '4',
  },
};

test('snakeObj contains snake_cased keys', () => {
  const testHasSnakeKey = snakeObj.test_1;
  expect(testHasSnakeKey).toBeTruthy();
});

test('snakeToCamelObjectKeys converts to camelcase', () => {
  const shouldHaveCamelKeys = snakeToCamelObjectKeys(snakeObj);
  const testHasCamelKey = shouldHaveCamelKeys.test1;

  expect(testHasCamelKey).toBeTruthy();
});

test('nested keys are also camelCased', () => {
  const shouldHaveCamelKeys = snakeToCamelObjectKeys(snakeObj);
  const testNestedHasCamelKey = shouldHaveCamelKeys.test3.test4;

  expect(testNestedHasCamelKey).toBeTruthy();
});
