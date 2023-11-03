export type Generic = Record<string, any>;

export type Sorts<T extends Generic> =
  | [keyof T, 'ASC' | 'DESC' | '']
  | [undefined, undefined]
  | [];

export interface UseSortingProps<T> {
  tableId: string;
  defaultSorts?: Sorts<T>;
}

// export interface UseSortingStoreProps extends Pick<UseSortingProps, 'tableId' | 'defaultSorts'>

export interface LocalStorageSort<T> {
  [key: string]: Sorts<T>;
}
