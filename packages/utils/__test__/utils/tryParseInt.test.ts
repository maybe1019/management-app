import { tryParseInt } from '../../src/utils/tryParseInt';

const getRand = () => 2147483647 / Math.random();

test('tryParseInt exists', () => {
    expect(tryParseInt).toBeTruthy();
});

test('tryParseInt returns undefined on an invalid number', () => {
    const response = tryParseInt("abc");
    expect(response).toBe(null);
});

test('tryParseInt will return valid integers', () => {
    for (let i = 0; i <= 1000; i++) {
        let randomNum = getRand();
        expect(tryParseInt(`${randomNum}`)).toEqual(Math.floor(randomNum))
    }
});
