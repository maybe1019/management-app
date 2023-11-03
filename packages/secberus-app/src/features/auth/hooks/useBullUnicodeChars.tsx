/**
 * Generates a string of bullet unicode characters to use as password placeholder text.
 * @param length
 */
export const useBullUnicodeChars = (length = 12) => {
  let str = '';

  for (let i = 0; i < length; i += 1) {
    str += '\u2022';
  }

  return str;
};
