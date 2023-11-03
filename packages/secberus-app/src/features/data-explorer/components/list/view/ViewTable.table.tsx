import React from 'react';
import { TableGW } from '@secberus/components';
import { secberusApi, explorerApi } from '@secberus/services';
import { Box } from '@chakra-ui/react';
import { useTableParser } from '../hooks/useTableParser';
import { useRunQueryByPage } from '../../../hooks';
import { DataExplorerResultsProps } from '../../results/types/DataExplorerResults.types';
import { handleSortBy, useSorting } from '../../../../sorting';
import { ErrorBoundary } from '../../../../../utils/wrappers/ErrorBoundaries';

export const ViewTableComponent = ({
  id,
  query,
}: Pick<secberusApi.GetViewApiArg, 'id'> &
  Partial<Pick<secberusApi.View, 'query'>>) => {
  const { data, ...getViewQuery } = explorerApi.useGetViewQuery(
    { id },
    {
      skip: !!query,
    }
  );
  const {
    PaginationComponent,
    getQueryDataByPage,
    isLoading,
    limit,
    page,
    results,
    resetState,
  } = useRunQueryByPage({ tableId: 'view_data_explorer_query_results' });
  const {
    resetState: resetSorts,
    onSortingChange,
    sorts,
  } = useSorting({
    tableId: 'view-dynamic-table',
  });

  React.useEffect(() => {
    resetState();
    resetSorts();
    //eslint-disable-next-line
  }, [data?.query]);

  const handleSort = (args: any[]) => {
    onSortingChange(args);
    resetState();
  };
  React.useEffect(() => {
    const sortBy = sorts as string[];
    const executable = query || data?.query;
    if (query || !getViewQuery.isLoading || !getViewQuery.isUninitialized)
      getQueryDataByPage({
        sqlQuery: {
          query: executable as string,
        },
        page,
        limit,
        sortBy: sortBy.filter(sort => !!sort),
      });
  }, [
    sorts,
    query,
    data?.query,
    getQueryDataByPage,
    page,
    limit,
    getViewQuery.isLoading,
    getViewQuery.isUninitialized,
  ]);

  const { columns } = useTableParser(results);

  return (
    <Box height="100%" width="100%" overflowY="auto">
      <Box padding="40px 40px 0px 40px" maxWidth="100%">
        <Box overflowX="auto">
          <TableGW<any>
            columns={columns}
            data={results}
            isLoading={isLoading}
            key="view_query_result_explorer_data"
            onSort={handleSort}
          />
        </Box>
      </Box>
      <Box padding="0px 40px 72px 40px">{PaginationComponent}</Box>
    </Box>
  );
};

export const ViewTable = (
  props: Pick<secberusApi.GetViewApiArg, 'id'> &
    Partial<Pick<secberusApi.View, 'query'>>
) => {
  return (
    <ErrorBoundary
      height="100%"
      message="Something unexpected went wrong trying to load this view."
    >
      <ViewTableComponent {...props} />
    </ErrorBoundary>
  );
};
