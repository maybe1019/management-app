import React from 'react';
import { getDefaultPaginatedResponse, explorerApi } from '@secberus/services';
import { ColumnSortFunction, TableGW, Text } from '@secberus/components';
import { View } from '@secberus/services/dist/store/injections/secberusApi.generated';
import { Box } from '@chakra-ui/react';
import { generatePath, useHistory } from 'react-router-dom';
import { useDeepEffect } from '@secberus/utils';
import {
  HoveredExpanderCell,
  OverlayExpanderCell,
} from '../../../../../components';
import { useAppPaginationHelper } from '../../../../../hooks/useAppPagination';
import { PanelContentProps } from '../DataExplorerPanel.component';
import { useSorting } from '../../../../sorting';
import { dataExplorerPaths } from '../../../routes';
import { AuthorCell } from '../../../../../components/Cells/AuthorCell';

export const ViewsPanelContent = ({ open, onClose }: PanelContentProps) => {
  const history = useHistory();
  const tableId = 'explorer-panel-views';
  const [
    listViews,
    { data: views = getDefaultPaginatedResponse<View>(), ...listViewsQuery },
  ] = explorerApi.useLazyListViewsQuery({});

  const handleRowClick = (record: View) => {
    const pushLocation = generatePath(
      dataExplorerPaths.dataExplorerManagement,
      {
        viewType: 'view',
        queryId: record.id,
      }
    );

    history.push(pushLocation);
    onClose?.();
  };

  const { PaginationComponent, page, limit, resetPagination } =
    useAppPaginationHelper({
      tableId,
      responseCursor: views.cursor,
      isLoading: listViewsQuery.isLoading,
      isFetching: listViewsQuery.isFetching,
    });

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting({
    tableId,
    defaultSorts: ['name', 'ASC'],
  });

  const handleSort: ColumnSortFunction<View> = args => {
    onSortingChange(args);
    resetPagination();
  };

  useDeepEffect(() => {
    if (open) {
      listViews(
        {
          page: Number(page) || undefined,
          limit: Number(limit) || undefined,
          sortBy: sortCol && sortDir ? [`${sortCol}:${sortDir}`] : undefined,
        },
        true
      );
    }
  }, [listViews, limit, page, open, sortCol, sortDir]);

  return (
    <Box marginTop="48px">
      <TableGW
        isLoading={listViewsQuery.isLoading || listViewsQuery.isFetching}
        data={views?.results ?? []}
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
              <OverlayExpanderCell buttonText="Open view">
                <Text type="xsmall-regular" color="extra-dark">
                  {row?.name ?? '-'}
                </Text>
              </OverlayExpanderCell>
            ),
          },
          {
            key: 'secberus_managed',
            title: 'Author',
            ellipsis: true,
            sort: true,
            width: 160,
            render: (_val, row, _idx) =>
              Object.prototype.hasOwnProperty.call(row, 'secberus_managed') ? (
                <AuthorCell
                  secberusManaged={row?.secberus_managed}
                  textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
                />
              ) : (
                <>-</>
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
