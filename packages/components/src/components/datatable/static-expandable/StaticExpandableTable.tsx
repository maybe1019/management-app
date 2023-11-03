import React from 'react';
import { TableColumnProps, IExpandableTable } from '../DataTable.types';
import {
  Table,
  TableHeaders,
  TableRow,
  TableData,
} from './StaticExpandableTable.styled';

export const StaticExpandableTable = (props: IExpandableTable) => {
  const { columns, data, expanded, maxLength, rowStyles, idKey } = props;

  const rows = expanded ? data : data.slice(0, maxLength);

  if (!data) return null;

  return (
    <Table>
      <tbody>
        <TableHeaders>
          {columns.map(({ header }) => {
            return <>{header}</>;
          })}
        </TableHeaders>
        {rows.map(row => {
          const rowId = row[idKey ?? 'id'];
          return (
            <TableRow key={row[rowId]} rowStyles={rowStyles}>
              {columns.map(({ key, width, content }: TableColumnProps) => {
                return (
                  <TableData key={row[rowId] + key} width={width}>
                    {content}
                  </TableData>
                );
              })}
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
};
