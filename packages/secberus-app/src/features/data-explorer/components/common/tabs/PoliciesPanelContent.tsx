import React from 'react';
import { getDefaultPaginatedResponse, explorerApi } from '@secberus/services';
import { ColumnSortFunction, TableGW, Text } from '@secberus/components';
import { Policy } from '@secberus/services/dist/store/injections/secberusApi.generated';
import { Box } from '@chakra-ui/react';
import { generatePath, useHistory } from 'react-router-dom';
import {
  HoveredExpanderCell,
  OverlayExpanderCell,
} from '../../../../../components';
import { useAppPaginationHelper } from '../../../../../hooks/useAppPagination';
import { PanelContentProps } from '../DataExplorerPanel.component';
import { useSorting } from '../../../../sorting';
import { AuthorCell } from '../../../../../components/Cells/AuthorCell';
import { dataExplorerPaths } from '../../../routes';

export const PoliciesPanelContent = ({ open, onClose }: PanelContentProps) => {
  const tableId = 'explorer-panel-policies';
  const history = useHistory();
  const [
    listPolicies,
    {
      data: policies = getDefaultPaginatedResponse<Policy>(),
      ...listPoliciesQuery
    },
  ] = explorerApi.useLazyListPoliciesQuery({});

  const handleRowClick = (record: Policy) => {
    const pushLocation = generatePath(
      dataExplorerPaths.dataExplorerManagement,
      {
        viewType: 'policy',
        queryId: record.id,
      }
    );
    history.push(pushLocation);
    onClose?.();
  };

  const { PaginationComponent, page, limit, resetPagination } =
    useAppPaginationHelper({
      tableId,
      responseCursor: policies.cursor,
      isLoading: listPoliciesQuery.isLoading,
      isFetching: listPoliciesQuery.isFetching,
    });

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting({
    tableId,
    defaultSorts: ['name', 'ASC'],
  });

  const handleSort: ColumnSortFunction<Policy> = args => {
    onSortingChange(args);
    resetPagination();
  };

  React.useEffect(() => {
    if (open) {
      listPolicies({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        sortBy: sortCol && sortDir ? [`${sortCol}:${sortDir}`] : undefined,
      });
    }
  }, [listPolicies, limit, page, open, sortCol, sortDir]);

  return (
    <Box marginTop="48px">
      <TableGW
        isLoading={listPoliciesQuery.isLoading || listPoliciesQuery.isFetching}
        data={policies?.results ?? []}
        onSort={handleSort}
        sortDirection={sortDir}
        sortColumn={sortCol}
        columns={[
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            resize: true,
            sort: true,
            ellipsis: true,
            render: (_val, row) => (
              <OverlayExpanderCell buttonText="Open policy">
                <Text type="xsmall-regular" color="extra-dark">
                  {row?.name ?? '-'}
                </Text>
              </OverlayExpanderCell>
            ),
          },
          {
            resize: true,
            key: 'label',
            title: 'ID',
            width: 180,
            dataIndex: 'label',
            sort: true,
            render: (_val, row) => (
              <Text type="xsmall-regular" color="extra-dark">
                {row?.label ?? '-'}
              </Text>
            ),
          },
          {
            resize: true,
            key: 'secberus_managed',
            title: 'Author',
            width: 172,
            dataIndex: 'secberus_managed',
            sort: true,
            render: (_val, row) => (
              <AuthorCell
                secberusManaged={row?.secberus_managed}
                textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
              />
            ),
          },
        ]}
        rowClassName={record =>
          (record?.language || '').toLowerCase() === 'sql'
            ? ''
            : 'rc-table-cell-no-hover'
        }
        rowHoverBehavior={{
          cursor: 'pointer',
          injectedStyles: HoveredExpanderCell,
        }}
        onRow={(record, index) =>
          (record?.language || '').toLowerCase() === 'sql'
            ? {
                onClick: handleRowClick.bind(null, record, index),
              }
            : {}
        }
      />
      {PaginationComponent}
    </Box>
  );
};
