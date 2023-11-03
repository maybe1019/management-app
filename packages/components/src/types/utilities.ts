export type TerminalTypes = string | string | boolean | null | undefined;

export type TerminalRecursivePropertyNames<T> = {
  [K in keyof T]: T[K] extends TerminalTypes
    ? K
    : TerminalRecursivePropertyNames<T[K]>;
}[keyof T];

export type PropertyNames<T> = {
  [K in keyof T]: K;
}[keyof T];

export type PropertyValues<T> = {
  [K in keyof T]: T[K];
}[keyof T];

export type PickUnion<T, U extends T> = U;
