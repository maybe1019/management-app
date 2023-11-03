import React from 'react';
import { Grid, GridItem, Flex, Spinner } from '@chakra-ui/react';
import { Text, TileSelect, PageHeader, TableGW } from '@secberus/components';
import { useHistory, Switch } from 'react-router-dom';
import { Datasource } from '@secberus/services';
import { ErrorBoundary } from '../../utils/wrappers/ErrorBoundaries';
import { SpinnerContainer } from '../settings/Settings.styled';
import { usePermissions } from '../../app/rbac/definitions';
import { useSorting } from '../sorting';
import { HoveredExpanderCell } from '../../components';
import { ButtonGroup } from './Forms/Forms.styled';
import { formOptions, useFormRoutes } from './DataSources.utils';
import { SectionText } from './DataSources.styled';
import { useGetDataSourceList } from './hooks/useGetDataSourceList';
import { useConnectedDataSourcesColumns } from './Datasources.columns';

const DataSources = () => {
  const tableId = 'datasource-list';
  const history = useHistory();
  const formRoutes = useFormRoutes();
  const { canRead, canCreate } = usePermissions('datasources');

  const {
    isLoading: dataSourcesIsLoading,
    isFetching: dataSourcesIsFetching,
    isUninitialized: dataSourcesIsUninitialized,
    getDataSourcesByPage,
    page,
    limit,
    resetState: resetPagination,
    PaginationComponent,
    dataSources = { results: [] },
  } = useGetDataSourceList(tableId);

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<Datasource>({
    tableId,
    defaultSorts: ['name', 'ASC'],
  });

  React.useEffect(() => {
    if (!page || !limit) return;
    getDataSourcesByPage({
      page,
      limit,
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
    });
  }, [page, getDataSourcesByPage, limit, sortCol, sortDir]);

  const handleRowClick = (record: Datasource) => {
    const datasource = record.datasource_type_id.toLowerCase();
    // Show edit instructions for GitHub, navigate to details page for all others
    history.push(
      `/settings/data-sources${
        datasource === 'github' ? '/form/github/edit' : '/data-source/details'
      }/${record.id}`
    );
  };

  const handleSort = (arg: any) => {
    onSortingChange(arg);
    resetPagination();
  };

  const columns = useConnectedDataSourcesColumns({});

  return (
    <>
      <Grid
        h="100%"
        w="100%"
        templateColumns="repeat(6, 1fr)"
        paddingBottom="8px"
      >
        <GridItem rowSpan={1} colSpan={6}>
          <PageHeader title="Data sources" align="space-between" />
        </GridItem>
        {canCreate && (
          <GridItem
            rowSpan={1}
            colSpan={6}
            paddingTop="32px"
            paddingLeft="32px"
            paddingBottom="8px"
          >
            <Flex direction="column">
              <SectionText>Add new data source</SectionText>
              <ButtonGroup>
                {Object.entries(formOptions).map(([formType, formObj]) => {
                  const { logo, label } = formObj;
                  const Component = logo;
                  return (
                    <TileSelect
                      key={formType}
                      label={label}
                      onClick={() =>
                        history.push(`/settings/data-sources/form/${formType}`)
                      }
                    >
                      <Component />
                    </TileSelect>
                  );
                })}
              </ButtonGroup>
            </Flex>
          </GridItem>
        )}
        <GridItem rowSpan={10} colSpan={6} padding="32px">
          <Flex direction="column">
            <SectionText>Connected data sources</SectionText>
            {dataSourcesIsUninitialized || dataSourcesIsLoading ? (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            ) : (
              <>
                {dataSources?.results?.length ? (
                  <>
                    <TableGW<Datasource>
                      isLoading={dataSourcesIsFetching}
                      data={dataSources?.results ?? []}
                      onSort={handleSort}
                      sortColumn={sortCol}
                      sortDirection={sortDir}
                      columns={columns}
                      rowClassName={() =>
                        !canRead ? 'rc-table-cell-no-hover' : ''
                      }
                      onRow={(record: Datasource, index) =>
                        canRead
                          ? {
                              onClick: handleRowClick.bind(null, record, index),
                            }
                          : {}
                      }
                      rowHoverBehavior={{
                        cursor: 'pointer',
                        injectedStyles: HoveredExpanderCell,
                      }}
                    />
                    {PaginationComponent}
                  </>
                ) : (
                  <Text type="small-regular">
                    There are no connected data sources. Add one above to get
                    started.
                  </Text>
                )}
              </>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Switch>{formRoutes}</Switch>
    </>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <DataSources />
  </ErrorBoundary>
);

export default WithBoundary;
