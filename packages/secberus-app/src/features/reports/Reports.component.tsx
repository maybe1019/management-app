import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { Text, PageHeader, Button } from '@secberus/components';
import { ReportSchedule, dataSourceApi } from '@secberus/services';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { PlusDark } from '@secberus/icons';
import { useSorting } from '../sorting';
import { useHasPermissions } from '../../app/abac/hooks/useHasPermissions';
import { MissingResourcesGuard } from '../../components/Placeholder/MissingResourcesGuard';
import { Report, ReportHeader } from './Reports.styled';
import { useGetReportsPage } from './hooks';
import { ReportsTable } from './Reports.table';
import { ReportsPanel } from './Reports.panel';
import { reportsPaths } from './routes';

import { useFormRoutes } from './forms/formRoutes';

export const Reports = () => {
  const tableId = 'reports-list';
  const history = useHistory();
  const {
    data: dataSources = { results: [] },
    isLoading: isDataSourcesLoading,
  } = dataSourceApi.useListDatasourcesQuery({});

  const { url, path } = useRouteMatch();

  const formRoutes = useFormRoutes();

  const canCreateReports = useHasPermissions('api:report-schedules:create');

  const {
    isLoading,
    getReportsByPage,
    page,
    PaginationComponent,
    resetState: resetPagination,
    limit,
    reports,
  } = useGetReportsPage({ tableId });

  const { onSortingChange, sorts } = useSorting<ReportSchedule>({
    tableId,
  });

  React.useEffect(() => {
    getReportsByPage({
      page,
      limit,
      sortBy: sorts[0] && sorts[1] ? `${sorts[0]}:${sorts[1]}` : undefined,
    });
  }, [page, limit, getReportsByPage, sorts]);

  const handleSort = (args: any) => {
    onSortingChange(args);
    resetPagination();
  };

  const handleRowClick = (record: ReportSchedule) => {
    history.push(`${reportsPaths.base}/details/${record.id}`);
  };

  return (
    <>
      <Box overflow="auto" h="100%">
        <Box w="100%">
          <PageHeader title="Reports">
            {!isDataSourcesLoading ? (
              canCreateReports && dataSources?.results?.length ? (
                <Button
                  color="light"
                  onClick={() => {
                    history.push('/reports/add');
                  }}
                >
                  <PlusDark /> New report
                </Button>
              ) : null
            ) : (
              <Spinner />
            )}
          </PageHeader>
        </Box>
        <Box padding="32px">
          <MissingResourcesGuard resources={['dataSources']}>
            <Report>
              <ReportHeader>
                <Text type="xsmall">Scheduled reports</Text>
              </ReportHeader>
              <ReportsTable
                handleRowClick={handleRowClick}
                data={reports}
                sorts={sorts}
                onSort={handleSort}
                isLoading={isLoading}
              />
            </Report>
            {PaginationComponent}
          </MissingResourcesGuard>
        </Box>
      </Box>
      <Switch>
        {formRoutes}
        <Route path={`${path}/details/:reportId`}>
          <ReportsPanel
            {...{
              isVisible: true,
              onClose: () => {
                history.push(url);
              },
            }}
          />
        </Route>
      </Switch>
    </>
  );
};
