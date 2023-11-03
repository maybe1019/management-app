import React from 'react';
import { Box } from '@chakra-ui/react';
import { TableGW } from '@secberus/components';
import { useReportsColumns } from './Reports.columns';
import { HoveredExpanderCell } from '../../components';

export const ReportsTable = ({
  handleRowClick,
  data,
  sorts,
  isLoading,
  onSort,
}) => {
  const columns = useReportsColumns();

  return (
    <Box h="100%">
      <TableGW
        columns={columns}
        data={data}
        sortColumn={sorts?.[0]}
        sortDirection={sorts?.[1]}
        onSort={onSort}
        isLoading={isLoading}
        onRow={record => ({
          onClick: handleRowClick.bind(null, record),
        })}
        rowHoverBehavior={{
          cursor: 'pointer',
          injectedStyles: HoveredExpanderCell,
        }}
      />
    </Box>
  );
};
