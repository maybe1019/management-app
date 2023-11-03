import React from 'react';
import { useHistory } from 'react-router-dom';
import { GridItem, Flex, useMediaQuery } from '@chakra-ui/react';
import { TableGW, ColumnSortFunction } from '@secberus/components';
import {
  camelToSnakeObjectKeys,
  useDeepEffect,
  useIsLoading,
} from '@secberus/utils';
import {
  CategoryType,
  getDefaultPaginatedResponse,
  ListPoliciesApiArg,
  ListPoliciesApiResponse,
  Policy,
  policiesApi,
} from '@secberus/services';
import { MissingResourcesGuard } from '../../../../components/Placeholder/MissingResourcesGuard';
import { useGetRiskPosture } from '../../../../hooks';
import { policyColumns } from '../RiskPosture.columns';
import { useSorting } from '../../../../features/sorting';
import { HoveredExpanderCell } from '../../../../components';
import { useWidgets } from '../../../../features/widgets';
import { Filter } from '../../../../features/filter-panel/FilterPanel.component';
import { useAppPagination } from '../../../../hooks/useAppPagination';

type PoliciesProps = {
  filters: Partial<Record<Filter, string[]>>;
  onChange?: (result: ListPoliciesApiResponse) => void;
  onWidgetClick?: (type: string, data: any) => void;
};
export const Policies = ({
  filters,
  onChange,
  onWidgetClick,
}: PoliciesProps) => {
  const history = useHistory();
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  const [
    getPolicies,
    {
      data: policies = getDefaultPaginatedResponse<Policy>(),
      isUninitialized,
      isLoading,
      isFetching,
    },
  ] = policiesApi.useLazyListPoliciesQuery();

  useDeepEffect(() => {
    onChange?.(policies as any);
  }, [policies]);

  const getPoliciesByPage = React.useCallback(
    async (data: ListPoliciesApiArg) => getPolicies(data, true),
    [getPolicies]
  );

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<Policy>({
    tableId: 'riskposture-policies',
  });

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState: resetPaginationState,
  } = useAppPagination({
    tableId: 'risk-policies',
    limitProps: {
      page: policies.cursor.page ?? 0,
      limit: policies.cursor.limit ?? 10,
      total: policies.cursor.total ?? 0,
      isLoading,
    },
    navProps: {
      leftDisabled:
        isLoading ||
        isFetching ||
        !policies.cursor.page ||
        policies.cursor.page <= 1,
      rightDisabled:
        isLoading ||
        isFetching ||
        !policies.cursor.page ||
        !policies.cursor.pages ||
        policies.cursor.page >= policies.cursor.pages,
    },
    pages: policies.cursor.pages,
  });

  React.useEffect(() => {
    const { tag, showPassing, ...rest } = filters;
    getPoliciesByPage({
      ...rest,
      // @ts-expect-error not all params supported/typed
      tag,
      page: page || undefined,
      limit: limit || undefined,
      subscribed: 'true',
      onlyFailed: String(!!showPassing),
      categoryType: 'SECURITY',
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : undefined,
    });
  }, [getPoliciesByPage, limit, page, filters, sortCol, sortDir]);

  const { postureData } = useGetRiskPosture(
    camelToSnakeObjectKeys({
      ...filters,
      tags: filters.tag ?? [],
      category_type: ['SECURITY'] as CategoryType[],
    })
  );

  const widgets = useWidgets({
    widgets: ['risk', 'violations', 'policy'],
    posture: postureData,
    onClick: onWidgetClick,
  });

  const isTableLoading = useIsLoading([isUninitialized, isFetching, isLoading]);

  //@ts-expect-error poorly typed
  const handleRowClick = (record, index, event) => {
    history.push(`policy/details/${record.id}`);
  };
  const handleSort: ColumnSortFunction<Policy> = arg => {
    onSortingChange(arg);
    resetPaginationState();
  };
  return (
    <>
      <MissingResourcesGuard resources={['dataSources', 'policies']}>
        <GridItem height="100%" colSpan={5} padding="32px 32px 24px 32px">
          <Flex justify="left" gap="20px" wrap="wrap" sx={{ gap: '20px' }}>
            {widgets}
          </Flex>
        </GridItem>
        <GridItem
          colSpan={5}
          rowSpan={16}
          paddingBottom="32px"
          paddingLeft="32px"
          paddingRight="32px"
        >
          <TableGW<Policy>
            isLoading={isTableLoading}
            columns={policyColumns}
            scroll={{ x: isLargerThan1200 ? 0 : 884 }}
            data={policies.results}
            sortColumn={sortCol}
            sortDirection={sortDir}
            onSort={handleSort}
            key="policies-table"
            onRow={(record, index) => ({
              onClick: handleRowClick.bind(null, record, index),
            })}
            rowHoverBehavior={{
              cursor: 'pointer',
              injectedStyles: HoveredExpanderCell,
            }}
          />
          {PaginationComponent}
        </GridItem>
      </MissingResourcesGuard>
    </>
  );
};
