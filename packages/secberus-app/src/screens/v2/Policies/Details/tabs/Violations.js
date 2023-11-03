import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { match } from 'path-to-regexp';
import { Box, Flex } from '@chakra-ui/react';
import {
  Button,
  Text,
  TableGW,
  DetailHeader,
  LoadingOverlay,
} from '@secberus/components';
import { TableSummary } from '../Details.styled';
import { useColumns } from './Violations.columns';
import { violationsApi } from '@secberus/services';
import { useTableFilters } from '../../../../../features/filters';
import { Filter } from '@secberus/icons';
import { useGetViolationPage } from './hooks/useGetViolationsPage';
import { useSorting } from '../../../../../features/sorting';
import { ViolationPanel } from '../../../../../features/violation-panel';
import { HoveredExpanderCell } from '../../../../../components';
import { useHasPermissions } from '../../../../../app/abac/hooks/useHasPermissions';
import { ExportCSV } from '../../../../../features/export-csv/ExportCSV.component';
import { RightButtonContainer } from '../../../../../features/page-header';

export const ViolationsTabComponent = ({
  policy,
  policyId,
  violationCount,
  dataSources,
  dataSourceTypes,
}) => {
  const history = useHistory();
  const allowMarkException = useHasPermissions('api:violations:update');

  let { path, url } = useRouteMatch();

  const [queryParams, setQueryParams] = React.useState({
    datasource_id: dataSources.map(d => d.id),
  });

  /**
   * The isDirectLinkToViolation is used to disable pagination if a user is
   * viewing a violation directly from a url (e.g. clicking an email link)
   */
  const [isDirectLinkToViolation, setIsDirectLinkToViolation] = React.useState(
    () => {
      const fn = match(`${path}/:violationId`);
      const res = fn(window.location.pathname);
      return !!res?.params?.violationId;
    }
  );

  const {
    getViolationsByPage,
    resetState: resetPagination,
    PaginationComponent,
    isUninitialized,
    isLoading,
    isFetching,
    page,
    limit,
    data: { cursor, results: violations },
  } = useGetViolationPage({
    tableId: 'policy_details_violations',
  });

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting({
    tableId: 'policy_details_violations',
    defaultSorts: ['create_timestamp', 'ASC'],
  });

  React.useEffect(
    // re-request if query params change or the page changes via lazy hook
    () => {
      getViolationsByPage({
        page,
        limit,
        policyId,
        sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
        ...queryParams,
      });
    },
    [queryParams, getViolationsByPage, page, limit, policyId, sortCol, sortDir]
  );

  const {
    filterPanel: FilterPanel,
    tagBar: TagBar,
    toggleOpen,
  } = useTableFilters({
    onChange: setQueryParams,
    filters: ['suppressed', 'tag', 'resourceData', 'datasourceId'],
    resultCount: cursor?.total,
    prepareFilterData: (filter, values) => {
      if (filter === 'datasourceId') {
        return values
          .filter(d => dataSourceTypes.includes(d.datasource_type_id))
          .sort((a, b) => {
            const nameA = a?.name.toUpperCase();
            const nameB = b?.name.toUpperCase();
            const typeA = a?.datasource_type_id.toUpperCase();
            const typeB = b?.datasource_type_id.toUpperCase();

            if (typeA < typeB) return -1;
            if (typeA > typeB) return 1;
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
      }
      return values;
    },
  });

  const [suppressViolations] = violationsApi.useSuppressViolationsMutation();
  const [unsuppressViolations] =
    violationsApi.useUnsuppressViolationsMutation();

  const [selected, setSelected] = React.useState({});
  const totalSelected = React.useMemo(
    () => Object.values(selected).filter(s => s).length,
    [selected]
  );

  const onRowSelection = ({ target }) => {
    setSelected(prevState => ({
      ...prevState,
      [target.id]: target.checked,
    }));
  };

  const onSelectAll = ({ target }) => {
    const selection = violations.reduce((acc, alert) => {
      acc[alert.id] = target.checked;
      return acc;
    }, {});
    setSelected(selection);
  };

  const handleSort = (...args) => {
    onSortingChange(...args);
    resetPagination();
  };

  const handleSuppressViolations = async e => {
    const selectedIds = Object.keys(selected).filter(key => selected[key]);
    const suppress = e.target.id === 'suppress';
    suppress
      ? suppressViolations({ idList: selectedIds })
      : unsuppressViolations({ idList: selectedIds });
    setSelected({});
  };

  const handleRowClick = (record, index, event) => {
    history.push(`${url}/${record.id}`);
  };

  const columns = useColumns({
    selectProps: {
      onSelectAll,
      onChange: onRowSelection,
      entities: violations,
      selected,
    },
    omitColumns: !allowMarkException ? ['select'] : [],
  });

  const violationsWithSelected = React.useMemo(
    () => violations.map(v => ({ ...v, selected: selected[v.id] })),
    [violations, selected]
  );

  return (
    <>
      <Box w="100%">{FilterPanel}</Box>
      <DetailHeader title={'Violations'} marginBottom={'0px'}>
        <RightButtonContainer>
          <ExportCSV
            type="policyViolations"
            arg={{ ...queryParams, policyId }}
          />
          <Button icon variant="secondary" desc="Filters" onClick={toggleOpen}>
            <Filter />
          </Button>
        </RightButtonContainer>
      </DetailHeader>
      <Flex w="100%" marginBottom="32px">
        {TagBar}
      </Flex>
      <Box paddingLeft="32px" paddingRight="32px" w="0" minWidth="100%">
        {totalSelected ? (
          <TableSummary>
            <Text type="small-bold">{`${totalSelected} selected`}</Text>
            <Button
              id="suppress"
              disabled={!totalSelected}
              size="small"
              onClick={handleSuppressViolations}
            >
              Mark as exception
            </Button>
            <Button
              size="small"
              variant="secondary"
              disabled={!totalSelected}
              onClick={handleSuppressViolations}
            >
              Un-mark as exception
            </Button>
            <Text className="violations-total-count" type="small-bold">
              {`${violations.length} of ${violationCount ?? 0}`}
            </Text>
          </TableSummary>
        ) : null}
        <TableGW
          className="with-select-cell-first"
          scroll={{ x: 1200 }}
          isLoading={isLoading || isUninitialized || isFetching}
          columns={columns}
          data={violationsWithSelected}
          sortColumn={sortCol}
          sortDirection={sortDir}
          onSort={handleSort}
          rowClassName={record => (record.selected ? 'selected' : '')}
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
      <Switch>
        <Route path={`${path}/:violationId`}>
          <ViolationPanel
            {...{
              baseUrl: url,
              isVisible: true,
              onClose: () => {
                if (isDirectLinkToViolation) setIsDirectLinkToViolation(false);
                history.push(url);
              },
              data: {
                startingPage: Number(page),
                tableFilters: {
                  page,
                  limit,
                  policyId,
                  sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
                  ...queryParams,
                },
                pagination: { showControls: !isDirectLinkToViolation },
              },
            }}
          />
        </Route>
      </Switch>
    </>
  );
};
