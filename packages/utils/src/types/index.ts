import { KebabOrSnakeToCamel } from './KebabOrSnakeToCamel';

export * from './Nullable';
export * from './SnakeToCamelCase';
export * from './KeysToCamelCase';
export * from './AnyFn';
export * from './PartialPartial';
export * from './ReplaceType';
export * from './CamelToSnake';
export * from './FixedArray';
export * from './ArrayValueType';
export * from './KebabToCamelCase';
export * from './KebabOrSnakeToCamel';
export * from './typeGuards';

export type KebabOrSnakeToTitle<T extends string> =
  T extends `${infer P1}${infer P2}`
    ? `${Uppercase<P1>}${KebabOrSnakeToCamel<P2>}`
    : never;

export type StringWithAutoComplete<T> = T | (string & Record<never, never>);
