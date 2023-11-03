/**
 * Specify which fields should be optional
 *
 * @typeParam T - The type or interface we want to modify
 * @typeParam K - string or string union type specifying which fields we would like to make optional
 *
 * ### Usage
 * ```ts
 * type Example = {
 *  required: number;
 *  makeOptional: number;
 * }
 * // error thrown here. Property 'makeOptional' is missing in type '{ required: number; }' but required in type 'Example'.
 * const a: Example = { required: 1 }
 *
 * // no error
 * const b: PartialPartial<Example, 'makeOptional'> = { required: 1 }
 * ```
 *
 */
export type PartialPartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
