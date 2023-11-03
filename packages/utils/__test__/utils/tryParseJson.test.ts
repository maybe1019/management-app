import { tryParseJson } from '../../src/utils/tryParseJson';

const testObject = {
  value: 'something',
  abc: ['def', 'ghi'],
};

test('tryParsingJson exists', () => {
  expect(tryParseJson).toBeTruthy();
});

test('tryParsingJson returns undefined on invalid json', () => {
  const response = tryParseJson('{coleman+oldrin=4evr');
  expect(response).toBe(undefined);
  expect(tryParseJson('"{coleman+oldrin=4evr"')).toEqual("{coleman+oldrin=4evr")
});

test('tryParsingJson will return valid JSON', () => {
  const __testObject = JSON.stringify(testObject);
  expect(tryParseJson(__testObject)).toEqual(testObject);
  expect(tryParseJson('false')).toBeFalsy();
  expect(tryParseJson('"false"')).toEqual('false');
});
