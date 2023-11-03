import React from 'react';
import { Grid, GridItem, Flex, Box } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { PlusDark, Filter } from '@secberus/icons';
import { useDeepEffect, useIsLoading } from '@secberus/utils';
import {
  ColumnSortFunction,
  LoadingOverlay,
  PageHeader,
  TableGW,
  Button,
} from '@secberus/components';
import { policiesApi2, secberusApi_Policy } from '@secberus/services';
import { useDispatch } from 'react-redux';
import { ErrorBoundary } from '../../../utils/wrappers/ErrorBoundaries';
import { useTableFilters } from '../../../features/filters';
import { RightButtonContainer } from '../../../features/page-header';
import { HoveredExpanderCell } from '../../../components';
import { useSorting } from '../../../features/sorting';
import { usePermissions } from '../../../app/rbac/definitions';
import { useAppPagination } from '../../../hooks/useAppPagination';
import { ExpandInput } from '../../../features/filter-panel/expand-input/ExpandInput.component';
import { useTableSelect } from '../../../components/TableSelect/useTableSelect.component';
import { attributesActions } from '../../../features/attributes/slice';
import { setDraftPolicy } from '../../../features/policy-editor/slice';
import { useGetAllPolicies, useGetPolicyPage } from './hooks/usePolicyRequests';
import { usePolicyColumns } from './Policies.columns';

const Policies = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [queryParams, setQueryParams] = React.useState<{ name?: string }>({});
  const [actionButtonState, setActionButtonState] = React.useState({
    activate: true,
    deactivate: true,
  });
  const { canUpdate: canTogglePolicy } = usePermissions('policies');
  const [setSubscription, { isLoading: isSubscribing }] =
    policiesApi2.usePolicySubscriptionsMutation();

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<secberusApi_Policy>({
    tableId: 'policies',
    defaultSorts: ['name', 'ASC'],
  });

  const {
    getAllPolicies,
    isUninitialized: isAllPoliciesUninitialized,
    isLoading: isAllPoliciesLoading,
    policies: allPolicies,
  } = useGetAllPolicies();

  const {
    getPoliciesByPage,
    isUninitialized: isPoliciesUninitialized,
    isLoading: isPoliciesPageLoading,
    isFetching: isPoliciesPageFetching,
    policies,
  } = useGetPolicyPage();

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState: resetPagination,
  } = useAppPagination({
    tableId: 'policies',
    limitProps: {
      page: policies.cursor.page ?? 0,
      limit: policies.cursor.limit ?? 10,
      total: policies.cursor.total ?? 0,
      isLoading: isPoliciesPageLoading,
    },
    navProps: {
      leftDisabled:
        isPoliciesPageLoading ||
        isPoliciesPageFetching ||
        !policies.cursor.page ||
        policies.cursor.page <= 1,
      rightDisabled:
        isPoliciesPageLoading ||
        isPoliciesPageFetching ||
        !policies.cursor.page ||
        !policies.cursor.pages ||
        policies.cursor.page >= policies.cursor.pages,
    },
    pages: policies.cursor.pages,
  });

  const {
    filterPanel: FilterPanel,
    toggleOpen,
    tagBar: TagBar,
    addFilter,
  } = useTableFilters({
    resultCount: policies.cursor?.total ?? 0,
    filters: [
      'secberusManaged',
      'datasourceType',
      'severityLabel',
      'subscribed',
      'categoryId',
      'complianceId',
      'resourceId',
      'name',
      'datasourceId',
    ],
    onChange: (filters = {}) => {
      // @ts-expect-error unsure of type here
      setQueryParams(filters);
    },
    entityType: 'policies',
  });

  useDeepEffect(() => {
    getPoliciesByPage({
      ...queryParams,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy: sortCol && sortDir ? [`${sortCol}:${sortDir}`] : undefined,
    });
  }, [queryParams, page, limit, sortCol, sortDir, getPoliciesByPage]);

  /**
   * The backend handles the toggling, so we send the existing "enabled" value
   * instead of the intended state. Using `unwrap()` extracts the actual result
   * of the mutations below; this value is what is being returned from the Promise.
   */
  const handleChange = React.useCallback(
    async (policyId, checked) => {
      return await setSubscription({
        policySubscriptionList: [{ policy_id: policyId, enabled: !checked }],
      }).unwrap();
    },
    [setSubscription]
  );

  const handleRowClick = (record: secberusApi_Policy) => {
    history.push(`/policies/policy/details/${record.id}/details`);
  };

  const handleActivatePolicies = async (idList: string[]) => {
    await setSubscription({
      policySubscriptionList: idList.map(id => ({
        policy_id: id,
        enabled: true,
      })),
    });
  };

  const handleDeactivatePolicies = async (idList: string[]) => {
    await setSubscription({
      policySubscriptionList: idList.map(id => ({
        policy_id: id,
        enabled: false,
      })),
    });
  };

  const {
    selected,
    isAllOnPageSelected,
    selectAllOnPage,
    deselectAllOnPage,
    TableSelectActionBar,
    handleSelectRow,
    resetSelected,
  } = useTableSelect({
    records: policies,
    recordType: 'policies',
    handleSelectAll: () =>
      (allPolicies?.results ?? [])?.map(o => o.id as string) ?? [],
    actions: [
      {
        id: 'activate',
        text: 'Activate',
        show: actionButtonState.activate,
        onClick: () => handleActivatePolicies(selected),
      },
      {
        id: 'deactivate',
        text: 'Deactivate',
        show: actionButtonState.deactivate,
        onClick: () => handleDeactivatePolicies(selected),
      },
    ],
  });

  const handleSort: ColumnSortFunction<secberusApi_Policy> = args => {
    onSortingChange(args);
    resetPagination();
    resetSelected();
  };

  const handleNewPolicy = () => {
    // Get rid of draft state so policy & explorer opens with no saved state
    dispatch(setDraftPolicy(null));
    dispatch(
      attributesActions.querySet({
        explorerQuery: '',
      })
    );

    // Navigate to the policy editor
    history.push(`policies/form/details`);
  };

  const checkAllSelectedIs = React.useCallback(
    (isSubscribed: boolean) =>
      selected.length > 0
        ? selected.every(id =>
            (allPolicies?.results ?? [])
              .filter((p: secberusApi_Policy) => p.subscribed === isSubscribed)
              .map((p: secberusApi_Policy) => p.id)
              .includes(id)
          )
        : false,
    [allPolicies?.results, selected]
  );

  const policyColumns = usePolicyColumns({
    selected,
    secberusManagedProps: { handleChange },
    canTogglePolicy,
    isAllOnPageSelected,
    handleSelectAllOnPage: isAllOnPageSelected
      ? deselectAllOnPage
      : selectAllOnPage,
    handleSelectRow,
    omitColumns: !canTogglePolicy ? ['select'] : undefined,
  });

  const isPageLoading = useIsLoading([
    isAllPoliciesUninitialized || isAllPoliciesLoading,
    isPoliciesUninitialized || isPoliciesPageLoading,
  ]);

  const isTableLoading = useIsLoading([isPoliciesPageFetching, isSubscribing]);

  React.useEffect(() => {
    getAllPolicies({
      ...queryParams,
      limit: 1000,
      sortBy: sortCol && sortDir ? [`${sortCol}:${sortDir}`] : undefined,
    });
  }, [getAllPolicies, queryParams, sortCol, sortDir]);

  React.useEffect(() => {
    const allSelectedSubscribed = checkAllSelectedIs(true);
    const allSelectedNotSubscribed = checkAllSelectedIs(false);

    setActionButtonState(prev => ({
      ...prev,
      activate: !allSelectedSubscribed,
      deactivate: !allSelectedNotSubscribed,
    }));
  }, [checkAllSelectedIs]);

  if (isPageLoading) return <LoadingOverlay />;

  return (
    <Flex h="100%" w="100%" direction="column">
      <Box w="100%">{FilterPanel}</Box>
      <Box w="100%">
        <Grid
          w="100%"
          h="100%"
          templateRows="auto"
          templateColumns="repeat(1, 1fr)"
        >
          <GridItem height="100%" rowSpan={1} colSpan={5}>
            <Flex w="100%" padding="0px">
              <PageHeader title="Policies">
                <RightButtonContainer>
                  <ExpandInput
                    onChange={val => {
                      return addFilter(['name', val ? [val] : []]);
                    }}
                    value={queryParams.name}
                    placeholder="Search by policy name or ID"
                    id="policy-search"
                  />
                  <Button
                    icon
                    variant="secondary"
                    desc="Filters"
                    onClick={toggleOpen}
                  >
                    <Filter />
                  </Button>
                  <Button onClick={handleNewPolicy}>
                    <PlusDark /> New policy
                  </Button>
                </RightButtonContainer>
              </PageHeader>
            </Flex>
          </GridItem>
          <GridItem height="100%" rowSpan={1} colSpan={5}>
            {TagBar}
          </GridItem>

          <GridItem height="100%" rowSpan={5} colSpan={5} padding="32px">
            <TableSelectActionBar />
            <TableGW<secberusApi_Policy>
              className="with-select-cell-first"
              columns={policyColumns}
              scroll={{ x: 1424 }}
              data={policies?.results ?? []}
              onSort={handleSort}
              isLoading={isTableLoading}
              sortDirection={sortDir}
              sortColumn={sortCol}
              selectedRows={selected}
              onRow={(record, index) => ({
                onClick: handleRowClick.bind(null, record, index),
              })}
              rowHoverBehavior={{
                cursor: 'pointer',
                injectedStyles: HoveredExpanderCell,
                asLink: true,
              }}
            />
            {PaginationComponent}
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <Policies />
  </ErrorBoundary>
);

export { WithBoundary as PoliciesScreen };

export default WithBoundary;
