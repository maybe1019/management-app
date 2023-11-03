import React from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import {
  DataTableColumnHeader,
  DataTableCellContent,
  Text,
  Input,
} from '@secberus/components';
import _ from 'lodash';

export interface IColumn {
  key: any;
  cellContent: React.ReactType;
  width: string;
  title: React.FC | string;
}

export interface IRow {
  id: string;
  [key: string]: string;
}

export interface IStyling {
  rowStyles?: IStylingData;
  tableDataStyles?: CSSProperties;
}

export interface IStylingData {
  borderBottom?: boolean;
  color?: string;
  height?: string;
}

export interface IExpandableTable extends IStyling {
  data: Array<IRow>;
  columns: Array<IColumn>;
  expanded: boolean;
  maxLength: number;
  searchKey?: string;
  className?: string;
}

export interface ITableData {
  width: string;
}

const Table = styled.table`
  width: 100%;
  grid-area: 2 / 2;
`;

const TableRow = styled.tr`
  display: flex;
  align-items: center;
  ${({ rowStyles }: IStyling) => css`
    ${rowStyles?.borderBottom
      ? `border-bottom: 1px solid ${rowStyles.color || '#F1F6FA'};`
      : ``};
    height: ${rowStyles?.height ? rowStyles.height : '48px'};
  `}
  border-bottom: 1px solid #f1f6fa;
`;

const TableData = styled.td`
  min-width: ${(props: ITableData) => props.width}px;
  width: ${(props: ITableData) => (props.width ? `${props.width}px` : '100%')};
  padding: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const TableHeaders = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f1f6fa;
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
  align-items: flex-end;
`;

const SearchInput = styled(Input)`
  width: 35%;
  margin-left: auto;
  .validation {
    margin-bottom: 4px;
  }
  align-self: center;
`;

const isEqual = (prev: any, next: any) => _.isEqual(prev, next);

export const ExpandableTable = React.memo((props: IExpandableTable) => {
  const {
    columns,
    data,
    expanded,
    maxLength,
    rowStyles,
    tableDataStyles,
    searchKey,
    className,
  } = props;

  const [search, setSearch] = React.useState<string | null>(null);

  const rows = expanded ? data : data.slice(0, maxLength);
  const filteredRows =
    searchKey && search
      ? rows.filter(row => row[searchKey].toLowerCase().includes(search))
      : rows;

  const filterRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  if (!data) return null;

  return (
    <Table className={className}>
      <TableHeaders className="table-header">
        {columns.map(({ width, title }) => {
          return (
            <DataTableColumnHeader
              width={width}
              disableSort
              className="table-col-header"
            >
              <Text type="caption" color="gray">
                {title}
              </Text>
            </DataTableColumnHeader>
          );
        })}
        {searchKey && (
          <SearchInput placeholder="Search" onChange={filterRows} />
        )}
      </TableHeaders>
      <div>
        {data.length < 1
          ? [0, 1, 2].map(() => {
              return (
                <TableRow rowStyles={rowStyles}>
                  {columns.map(({ key, width }: IColumn) => {
                    return <TableData key={key} width={width} />;
                  })}
                </TableRow>
              );
            })
          : filteredRows.map(row => {
              return (
                <TableRow key={row.id} rowStyles={rowStyles}>
                  {columns.map(({ key, width, cellContent }: IColumn) => {
                    const Cell = cellContent ?? DataTableCellContent;
                    return (
                      <TableData
                        key={row.id + key}
                        width={width}
                        style={tableDataStyles}
                      >
                        <Cell row={row} target={key} key={row.id + key} />
                      </TableData>
                    );
                  })}
                </TableRow>
              );
            })}
      </div>
    </Table>
  );
}, isEqual);
