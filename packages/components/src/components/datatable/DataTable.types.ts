// @ts-nocheck
import React from 'react';
import {
  ColumnProps as RFTColumnProps,
  RowRenderProps,
} from 'react-fluid-table';

export interface IColumn {
  key: string;
  cellContent: React.ElementType;
  width: string;
  title: React.FC | string;
}

export type IRow = Record<string, any>;
export interface IStyling {
  rowStyles?: IStylingData;
}

export interface IStylingData {
  borderBottom?: boolean;
  color?: string;
  height?: string;
  'font-weight'?: number;
}

export interface IExpandableTable extends IStyling {
  data: IRow[];
  columns: TableColumnProps[];
  expanded: boolean;
  maxLength?: number;
  idKey?: string;
}

export interface ITableData {
  width?: number | string;
}

export interface TableColumnProps<T = any> extends RFTColumnProps {
  key: Extract<keyof T, string> | 'action';
  sort?: (
    ascending: boolean,
    sortData: T[],
    id?: Extract<keyof T, string> | string
  ) => T[];
  className?: string;
  title?: string | React.ElementType | JSX.Element;
  link?: boolean;
  path?: string;
  cellContent?: ({ row }: { row: T }) => React.ReactElement | null;
  disableSort?: boolean;
}

export type PlaceholderType = 'filter' | 'empty' | 'loading' | 'noresults';

export interface DataTableProps<DataType = void> {
  isLoading?: boolean;
  data?: IRow[];
  rowRenderer?: React.ComponentType<RowRenderProps>;
  getRow?: ({ id }: { id: string }) => DataType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: TableColumnProps<any>[];
  height?: number | string;
  width?: number | string;
  rowHeight?: number;
  tooltips?: React.FC[];
  alternatingRowColor?: boolean;
  className?: string;
  defaultSortBy?: DefaultSortBy<DataType>;
  virtualized?: boolean;
  expanded?: boolean;
  maxLength?: number;
  rowStyles?: IStylingData;
  placeholder?: PlaceholderType;
  linkOpts?: linkOptsType;
  idKey?: string;
}

export type DefaultSortBy<T = string> =
  | string
  | {
      id: T;
      dir: 'asc' | 'desc';
    };

export type linkOptsType = {
  colKey: string;
  get: (id: string) => string;
  ignore?: string[];
};

export type PlaceholderContent = {
  message?: string | JSX.Element | React.ReactNode;
  iconProps?: {
    width?: number;
    height?: number;
    margin?: string;
  };
};
