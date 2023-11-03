import React from 'react';
import { getDefaultPaginatedResponse, explorerApi } from '@secberus/services';
import { ColumnSortFunction, TableGW, Text } from '@secberus/components';
import { SavedSqlQuery } from '@secberus/services/dist/store/injections/secberusApi.generated';
import { Box } from '@chakra-ui/react';
import { useHistory, useLocation, generatePath } from 'react-router-dom';
import {
  HoveredExpanderCell,
  OverlayExpanderCell,
} from '../../../../../components';
import { useAppPaginationHelper } from '../../../../../hooks/useAppPagination';
import { PanelContentProps } from '../DataExplorerPanel.component';
import { dataExplorerPaths } from '../../../routes';
import { useSorting } from '../../../../sorting';

export const QueriesPanelContent = ({ open, onClose }: PanelContentProps) => {
  const location = useLocation();
  const history = useHistory();
  const tableId = 'explorer-panel-queries';
  const [
    listSavedQueries,
    {
      data: savedQueries = getDefaultPaginatedResponse<SavedSqlQuery>(),
      ...listSavedQueriesQuery
    },
  ] = explorerApi.useLazyListSavedQueriesQuery({});

  const handleRowClick = (record: SavedSqlQuery) => {
    const pushLocation = generatePath(
      dataExplorerPaths.dataExplorerManagement,
      {
        viewType: 'query',
        queryId: record.id,
      }
    );
    history.push(pushLocation);
    onClose?.();
  };

  const { PaginationComponent, page, limit, resetPagination } =
    useAppPaginationHelper({
      tableId,
      responseCursor: savedQueries.cursor,
      isLoading: listSavedQueriesQuery.isLoading,
      isFetching: listSavedQueriesQuery.isFetching,
    });

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting({
    tableId,
    defaultSorts: ['name', 'ASC'],
  });

  const handleSort: ColumnSortFunction<SavedSqlQuery> = args => {
    onSortingChange(args);
    resetPagination();
  };

  React.useEffect(() => {
    if (open) {
      listSavedQueries({
        page: Number(page) || undefined,
        limit: Number(limit) || undefined,
        sortBy: sortCol && sortDir ? [`${sortCol}:${sortDir}`] : undefined,
      });
    }
  }, [listSavedQueries, limit, page, open, sortCol, sortDir]);

  return (
    <Box marginTop="48px">
      <TableGW<SavedSqlQuery>
        isLoading={
          listSavedQueriesQuery.isLoading || listSavedQueriesQuery.isFetching
        }
        data={savedQueries?.results ?? []}
        onSort={handleSort}
        sortDirection={sortDir}
        sortColumn={sortCol}
        columns={[
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sort: true,
            ellipsis: true,
            render: (_val, row) => (
              <OverlayExpanderCell buttonText="Open query">
                <Text type="xsmall-regular" color="extra-dark">
                  {row?.name ?? '-'}
                </Text>
              </OverlayExpanderCell>
            ),
          },
        ]}
        rowHoverBehavior={{
          cursor: 'pointer',
          injectedStyles: HoveredExpanderCell,
        }}
        onRow={(record, index) => ({
          onClick: handleRowClick.bind(null, record, index),
        })}
      />
      {PaginationComponent}
    </Box>
  );
};
