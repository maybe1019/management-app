/**
 * @typeParam T - The type or interface we want to modify
 * @typeParam K - string name of field(s) we would like to replace
 * @typeParam V - new value we want the original types to be.
 */
export type ReplaceType<T, K extends keyof T, V> = Omit<T, K> & Record<K, V>;
