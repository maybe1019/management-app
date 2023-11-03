import { ColumnType, Key } from 'rc-table/lib/interface';
import { TableProps } from 'rc-table/lib/Table';
import {
  CSSProperties,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';
import { TableSpacingType } from '../../types';

type MaybeUndefined<T> = T | undefined | null | '';

export interface RCTableExtendedColumnType<T> extends ColumnType<T> {
  resize?: boolean;
  sort?: boolean;
}

export interface RCTableExtendedTableProps<T>
  extends Omit<TableProps<T>, 'data' | 'columns'> {
  columns: readonly RCTableExtendedColumnType<T>[];
  data: readonly T[];
  sortColumn?: MaybeUndefined<keyof T>;
  sortDirection?: MaybeUndefined<SortDirection>;
  isLoading?: boolean;
  onSort?: ColumnSortFunction<T>;
  rowHoverBehavior?: {
    cursor?: CSSProperties['cursor'];
    background?: string;
    injectedStyles?: FlattenInterpolation<ThemeProps<any>>;
    asLink?: boolean;
  };
  minRowHeight?: number;
  stateTransitionBuffer?: number;
  disableStateTransitionBuffer?: boolean;
  selectedRows?: Key[];
  spacing?: TableSpacingType;
}

export type ColumnSortFunction<DataType = Generic> = (
  arg: [col: Extract<keyof DataType, string> | null, dir: string | null]
) => void;

export interface Generic {
  [key: string]: any;
}

export type SortDirection = 'ASC' | 'DESC';

export type ExtendedTable = React.FC<
  RCTableExtendedTableProps<Record<string, any>>
>;
