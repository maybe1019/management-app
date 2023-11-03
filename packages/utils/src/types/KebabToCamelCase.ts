// Here we are saying IF S is of type string AND S matches part1_part2*(part3),
// lowercase part1 match, uppercase part2 match, and recursively call CamelCase on the remainder(part3).
// e.g. IF typeof 'kebab-case-long-string === 'string' AND matches kebab-case,
// return CamelCase('kebab-case-long-string') => ('kebabCase' + (CamelCase('-long-string') => 'LongString')) => 'kebabCaseLongString'
export type KebabToCamel<S extends string> =
  S extends `${infer P1}-${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${KebabToCamel<P3>}`
    : Lowercase<S>;
