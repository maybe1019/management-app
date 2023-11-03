export type CamelToSnake<
  T extends string,
  P extends string = ''
> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? CamelToSnake<
      R,
      `${P}${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}`
    >
  : P;

export type CamelKeysToSnakeNoRecursion<T> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K];
};

export type CamelKeysToSnake<T> = T extends readonly any[]
  ? { [K in keyof T]: CamelKeysToSnake<T[K]> }
  : T extends Record<string, unknown>
  ? {
      [K in keyof T as CamelToSnake<
        Extract<K, string>
      >]: CamelKeysToSnakeNoRecursion<T[K]>;
    }
  : T;
