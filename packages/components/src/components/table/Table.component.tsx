import React from 'react';
import { Table as RFTable, TableProps } from '@secberus-oss/react-fluid-table';
import { TablePlaceholderComponent } from '../datatable';

interface ExtendedTableProps extends TableProps {
  isLoading?: boolean;
}

export const Table: React.FC<ExtendedTableProps> = props => {
  return (
    <>
      <RFTable fixed {...props} tableStyle={{ height: '100%' }} />
      {!props?.data?.length && !props.isLoading ? (
        <TablePlaceholderComponent />
      ) : null}
    </>
  );
};
