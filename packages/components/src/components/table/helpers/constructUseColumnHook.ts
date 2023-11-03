/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ColumnProps } from '@secberus-oss/react-fluid-table';

type Overrides<DataType, Extra extends string = 'select'> = {
  // eslint-disable-next-line prettier/prettier
  [key in keyof DataType as keyof DataType | Extra]?: Partial<ColumnProps<DataType>>;
};

/**
 * A helper for constructing our DataTable columns object array that supports passing values
 *
 * @typeParam DataType - The type of data in your table
 * @returns A hook that accepts values to be passed to columns by key
 *
 */
export const constructUseRFTColumnsHook =
  <DataType, ExtraColumnKeys extends string>(
    cols: ColumnProps<DataType, ExtraColumnKeys>[],
    deps?: unknown[]
  ) =>
  (overrides?: Partial<Overrides<DataType, ExtraColumnKeys>>) =>
    React.useMemo(() => {
      return cols.map(col =>
        overrides && typeof overrides[col.key] !== 'undefined'
          ? { ...col, ...overrides[col.key] }
          : col
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overrides, ...(deps ?? [])]);
