import { TableGW } from '@secberus/components';
import { Box, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useTableParser } from '../hooks/useTableParser';
import { useGetTableQuery } from '../../../hooks';
import { ErrorBoundary } from '../../../../../utils/wrappers/ErrorBoundaries';

const ScrollableCell = styled.div`
  * .scrollable-cell {
    max-width: 240px;
    overflow-x: scroll;
  }
`;
type ExplorerTableProps = {
  tableId: string;
};

export const ExplorerTableComponent = ({ tableId }: ExplorerTableProps) => {
  const {
    PaginationComponent,
    getTableDataByPage,
    isLoading,
    limit,
    page,
    resetState,
    results: table,
  } = useGetTableQuery({
    tableId: 'explorer_table',
  });

  useEffect(() => {
    getTableDataByPage({
      id: tableId,
      page: page,
      limit: limit,
    });
  }, [tableId, page, limit, getTableDataByPage]);

  const { columns } = useTableParser(table);

  return (
    <Box height="100%" width="100%" overflowY="auto" pb="72px">
      <Box padding="40px 40px 0px 40px" maxWidth="100%">
        <Box overflowX="auto">
          <ScrollableCell>
            <TableGW<any>
              isLoading={isLoading}
              columns={columns}
              scroll={{ x: columns?.length * 240 }}
              data={table}
              key={`${tableId}_explorer_data`}
              rowClassName="scrollable-cell"
            />
          </ScrollableCell>
        </Box>
      </Box>
      <Box padding="0px 40px 72px 40px">
        {PaginationComponent && PaginationComponent}
      </Box>
    </Box>
  );
};

export const ExplorerTable = (props: ExplorerTableProps) => {
  return (
    <ErrorBoundary height="100%" message="Something unexpected went wrong.">
      <ExplorerTableComponent {...props} />
    </ErrorBoundary>
  );
};
