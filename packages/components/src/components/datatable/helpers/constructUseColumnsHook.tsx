/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { TableColumnProps } from '../DataTable.types';

export type Overrides<T extends string, J> = {
  [key in T]: Partial<TableColumnProps<J>>;
};

/**
 * A helper for constructing our DataTable columns object array
 *
 * @typeParam DataType - The type of data in your table
 * @returns A typed object array
 *
 */
export const constructUseColumnsHook =
  <DataType,>(cols: TableColumnProps<DataType>[], deps?: unknown[]) =>
  (
    overrides?: Partial<
      Overrides<Extract<keyof DataType, string> | 'action', DataType>
    >
  ) =>
    React.useMemo(() => {
      return cols.map(col =>
        overrides && typeof overrides[col.key] !== 'undefined'
          ? { ...col, ...overrides[col.key] }
          : col
      );
    }, [overrides, ...(deps ?? [])]);
