export type KebabOrSnakeToCamel<S extends string> =
  S extends `${infer P1}-${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${KebabOrSnakeToCamel<P3>}`
    : S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${KebabOrSnakeToCamel<P3>}`
    : Lowercase<S>;
