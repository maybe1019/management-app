export type None = null | undefined;

export type MaybeNull<T> = T | None;

export type Nullish<T> = { [P in keyof T]: MaybeNull<T[P]> };
