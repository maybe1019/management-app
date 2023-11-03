// Here we are saying IF S is of type string AND S matches part1_part2*(part3),
// lowercase part1 match, uppercase part2 match, and recursively call CamelCase on the remainder(part3).
// e.g. IF typeof 'snake_case_long_string === 'string' AND matches snake_case,
// return CamelCase('snake_case_long_string') => ('snakeCase' + (CamelCase('_long_string') => 'LongString')) => 'snakeCaseLongString'
export type SnakeToCamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeToCamelCase<P3>}`
    : Lowercase<S>;
