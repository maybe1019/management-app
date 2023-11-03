import React from 'react';
import { AlertBox, TableGW } from '@secberus/components';
import { Box } from '@chakra-ui/react';
import { useTableParser } from '../hooks/useTableParser';
import { useRunQueryByPage } from '../../../hooks';
import { DataExplorerResultsProps } from '../../results/types/DataExplorerResults.types';
import { useSorting } from '../../../../sorting';
import { ErrorBoundary } from '../../../../../utils/wrappers/ErrorBoundaries';

const STRIP_INVALID_QUERY_STRING = /(invalid\squery\s)/i;

const QueryTableComponent = ({
  queryArgs,
}: Pick<DataExplorerResultsProps, 'queryArgs'>) => {
  const {
    PaginationComponent,
    getQueryDataByPage,
    isLoading,
    limit,
    page,
    results,
    resetState,
    errors,
  } = useRunQueryByPage({ tableId: 'data_explorer_query_results' });

  const isError = errors?.isError;
  const errorMessage: string | undefined =
    errors?.isError && errors?.error?.status === 400 //@ts-expect-error Unknown type
      ? errors?.error?.data?.detail.replace(STRIP_INVALID_QUERY_STRING, '') ||
        undefined
      : undefined;

  const {
    resetState: resetSorts,
    onSortingChange,
    sorts,
  } = useSorting({
    tableId: 'dynamic-table',
  });

  React.useEffect(() => {
    resetState();
    resetSorts();
    //eslint-disable-next-line
  }, [queryArgs.parameters, queryArgs.query]);

  const handleSort = (args: any[]) => {
    onSortingChange(args);
    resetState();
  };

  React.useEffect(() => {
    const sortBy = sorts as string[];
    if (queryArgs.query)
      getQueryDataByPage({
        sqlQuery: {
          query: queryArgs.query,
          parameters: queryArgs.parameters,
        },
        page,
        limit,
        sortBy: sortBy.filter(sort => !!sort),
      });
  }, [
    queryArgs.parameters,
    sorts,
    queryArgs.query,
    getQueryDataByPage,
    page,
    limit,
  ]);

  const { columns } = useTableParser(results);

  if (isError) {
    return (
      <Box height="100%" width="100%" overflowY="auto">
        <Box padding="40px 40px 0px" maxWidth="100%">
          <AlertBox
            type="error"
            title="Invalid query"
            message={
              errorMessage ||
              'Something went wrong, please check your query for errors.'
            }
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box height="100%" width="100%" overflowY="auto" pb="72px">
      <Box padding="40px 40px 0px" maxWidth="100%">
        <Box overflowX="auto">
          <TableGW<any>
            columns={columns}
            data={results}
            isLoading={isLoading}
            key="query_result_explorer_data"
            onSort={handleSort}
          />
        </Box>
      </Box>
      <Box padding="0px 40px 72px 40px">{PaginationComponent}</Box>
    </Box>
  );
};

export const QueryTable = ({
  queryArgs,
}: Pick<DataExplorerResultsProps, 'queryArgs'>) => {
  return (
    <ErrorBoundary height="100%" message="Something unexpected went wrong.">
      <QueryTableComponent queryArgs={queryArgs} />
    </ErrorBoundary>
  );
};
