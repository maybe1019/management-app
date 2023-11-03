import React from 'react';
import { Grid, GridItem, Flex, Box } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Text,
  LoadingOverlay,
  PageHeader,
  TableGW,
  ColumnSortFunction,
  Button,
} from '@secberus/components';
import { secberusApi_Policy } from '@secberus/services';
import { camelToSnakeObjectKeys } from '@secberus/utils';
import { Filter as FilterIcon } from '@secberus/icons';
import { useWidgets } from '../../widgets';
import { useTableFilters } from '../../filters';
import { useGetRiskPosture } from '../../../hooks';
import { HoveredExpanderCell } from '../../../components';
import { ErrorBoundary } from '../../../utils/wrappers/ErrorBoundaries';
import { RightButtonContainer } from '../../page-header';
import { useSorting } from '../../sorting';
import { ExpandInput } from '../../filter-panel/expand-input/ExpandInput.component';
import { Filter } from '../../filter-panel/FilterPanel.component';
import { useGetCategoryPage } from './hooks/useGetCategoryPage';
import { policyColumns } from './Detail.column';

const CategoryDetails = () => {
  const history = useHistory();
  // todo: error handling for invalid category id
  const { id } = useParams<{ id: string }>();

  const [queryParams, setQueryParams] = React.useState(
    {} as Partial<Record<Filter | 'name', string[] | undefined>>
  );

  // pull out params risk posture doesn't like
  const { showPassing, subscribed, ...restParams } = queryParams;

  const { postureData = { categories: [] }, isPostureUninitialized } =
    useGetRiskPosture(camelToSnakeObjectKeys(restParams));

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<secberusApi_Policy>({
    tableId: 'category-policies',
  });

  const {
    cursor,
    category,
    page,
    pageLimit,
    isFetching,
    policies,
    PaginationComponent,
    getPoliciesByPage,
    getCategory,
    isLoading: isPageLoading,
    resetPaginationState,
  } = useGetCategoryPage();

  const {
    filterPanel: FilterPanel,
    tagBar: TagBar,
    addFilter,
    toggleOpen,
  } = useTableFilters({
    resultCount: cursor?.total ?? 0,
    onChange: (filters = {}) => {
      setQueryParams(filters);
    },
    filters: [
      'resourceId',
      'severityLabel',
      'showPassing',
      'datasourceId',
      'resourceData',
      'name',
    ],
  });

  const handleSort: ColumnSortFunction<secberusApi_Policy> = arg => {
    onSortingChange(arg);
    resetPaginationState();
  };

  const handleRowClick = (record: secberusApi_Policy) => {
    history.push(`/risk-posture/policy/details/${record.id}/violations`);
  };

  React.useEffect(() => {
    getCategory({ categoryId: id });
  }, [getCategory, id]);

  React.useEffect(
    // re-request if query params change or the page changes via lazy hook
    () => {
      getPoliciesByPage({
        ...queryParams,
        // @ts-expect-error multi value search params not yet supported in types
        categoryId: id,
        page: page ? Number(page) : undefined,
        limit: pageLimit ? Number(pageLimit) : undefined,
        sortBy: sortCol && sortDir ? [`${sortCol}:${sortDir}`] : undefined,
      });
    },
    [queryParams, getPoliciesByPage, page, pageLimit, sortCol, sortDir, id]
  );

  const widgets = useWidgets({
    widgets:
      category?.category_type === 'SECURITY'
        ? ['risk', 'violations', 'policy']
        : ['policy', 'occurrence'],
    posture: postureData,
  });

  if (isPageLoading || isPostureUninitialized) return <LoadingOverlay />;

  return (
    <Box w="100%">
      {FilterPanel}
      <Box height="100%" bg="#dfe7ef" padding="40px">
        <Flex wrap="wrap" direction="column" sx={{ gap: '24px' }}>
          <Flex justify="space-between" sx={{ gap: '12px' }}>
            <Text type="medium">{category?.name}</Text>
          </Flex>
        </Flex>
      </Box>
      <Flex w="100%" padding="0px">
        <PageHeader title="Risk posture">
          <RightButtonContainer>
            <ExpandInput
              onChange={val => {
                return addFilter(['name', val ? [val] : []]);
              }}
              value={queryParams.name as unknown as string}
              id="policy-search"
            />
            <Button
              icon
              variant="secondary"
              desc="Filters"
              onClick={toggleOpen}
            >
              <FilterIcon />
            </Button>
          </RightButtonContainer>
        </PageHeader>
      </Flex>
      {TagBar}
      <Flex
        wrap="wrap"
        sx={{ gap: '20px' }}
        w="100%"
        padding="32px 32px 24px 32px"
      >
        {widgets}
      </Flex>
      <GridItem height="100%">
        <Grid
          h="100%"
          templateRows="repeat(18, 1fr)"
          templateColumns="repeat(6, 1fr)"
          paddingBottom="0px"
        >
          <GridItem
            colSpan={6}
            rowSpan={18}
            paddingTop="24px"
            paddingLeft="32px"
            paddingRight="32px"
            paddingBottom="8px"
          >
            <TableGW<secberusApi_Policy>
              isLoading={isFetching}
              scroll={{ x: 1600 }}
              columns={policyColumns}
              data={policies}
              sortDirection={sortDir}
              sortColumn={sortCol}
              onSort={handleSort}
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
        </Grid>
      </GridItem>
    </Box>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <CategoryDetails />
  </ErrorBoundary>
);

export { WithBoundary as CategoryDetailsScreen };

export default WithBoundary;
