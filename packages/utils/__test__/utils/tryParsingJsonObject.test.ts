import { tryParsingJsonObject } from '../../src/utils/tryToParseJsonObject';

const testObject = {
  value: 'something',
  abc: ['def', 'ghi'],
};

test('tryParsingJson exists', () => {
  expect(tryParsingJsonObject).toBeTruthy();
});

test('tryParsingJson returns undefined on invalid json', () => {
  const response = tryParsingJsonObject('{coleman+oldrin=4evr');
  expect(response).toBe(undefined);
});

test('tryParsingJson will return valid JSON', () => {
  const __testObject = JSON.stringify(testObject);
  let response = tryParsingJsonObject(__testObject);
  expect(response).toEqual(testObject);
  response = tryParsingJsonObject('false');
  expect(response).toEqual(undefined);
});

test('tryParsingJsonObject will return undefined for a non object', () => {
  expect(tryParsingJsonObject('true')).toEqual(undefined);
  expect(tryParsingJsonObject(JSON.stringify('hello'))).toEqual(undefined);
});
