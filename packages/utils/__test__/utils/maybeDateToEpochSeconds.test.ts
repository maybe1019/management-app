import { maybeDateToEpochSeconds } from '../../src';

const DATE_FIXTURE = 830930400123;
test('Converts date object to 3 decimal float', () => {
    const testDate = new Date(DATE_FIXTURE);
    const result = maybeDateToEpochSeconds(testDate);
    expect(result).toBeCloseTo(830930400.123);
});

test('Converts date object to string with a 3 decimal float', () => {
    const testDate = new Date(DATE_FIXTURE);
    const result = maybeDateToEpochSeconds(testDate, { stringify: true });
    expect(result).toEqual("830930400.123");
})

test('Returns undefined for invalid values from dates', () => {
    const fix1 = undefined;
    const fix2 = 12940124;
    const fix3 = "eduardo likes oysters";
    expect(maybeDateToEpochSeconds(fix1)).toBeUndefined();
    expect(maybeDateToEpochSeconds(fix2)).toBeUndefined();
    expect(maybeDateToEpochSeconds(fix3)).toBeUndefined();
})
