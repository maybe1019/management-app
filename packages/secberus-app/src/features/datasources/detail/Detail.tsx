import React from 'react';
import { Grid, GridItem, Flex, Box } from '@chakra-ui/react';
import { useParams, useHistory, Switch, Redirect } from 'react-router-dom';
import {
  Text,
  LoadingOverlay,
  TableGW,
  Button,
  ButtonDropdown,
} from '@secberus/components';
import { dataSourceApi, Resource } from '@secberus/services';
import { PenDark, Settings } from '@secberus/icons';
import { useWidgets } from '../../widgets';
import { HoveredExpanderCell } from '../../../components';
import { ErrorBoundary } from '../../../utils/wrappers/ErrorBoundaries';
import { useFormRoutes } from '../DataSources.utils';
import { DeleteDataSourceModal } from '../components/DeleteModal.component';
import { settingsPaths } from '../../settings/routes';
import { datasourcePaths } from '../routes';
import { ScanDataSourceModal } from '../components/ScanModal.component';
import { usePermissions } from '../../../app/rbac/definitions';
import { generateURL } from '../../../hooks/useQuery';
import { useDataSourceResourcesColumns } from './Detail.column';

const DatasourceDetails = () => {
  const history = useHistory();
  const formRoutes = useFormRoutes(true);
  const { datasourceId } = useParams<{ datasourceId: string }>();
  const [toggleScanModal, setToggleScanModal] = React.useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = React.useState(false);
  const { canScan, canUpdate, canDelete } = usePermissions('datasources');

  const {
    data: datasource,
    isUninitialized,
    isLoading,
    isFetching,
    isSuccess,
  } = dataSourceApi.useGetDatasourceResourcesQuery(
    { datasourceId },
    { skip: !datasourceId }
  );

  const stats = React.useMemo(() => {
    const count = datasource?.resources_count ?? 0;
    const collected = datasource?.resources_collected ?? 0;
    return {
      collected,
      notCollected: count - collected,
    };
  }, [datasource?.resources_collected, datasource?.resources_count]);

  const logsLink = React.useMemo(
    () =>
      generateURL('/logs', 'filter', {
        datasourceId: [datasourceId],
      }),
    [datasourceId]
  );

  const uniqueId = React.useMemo(() => {
    const type = datasource?.datasource_type_id.toLowerCase();
    let name = 'identifier',
      value = '';

    switch (type) {
      case 'aws':
        name = 'role arn';
        value = datasource?.data?.role_arn;
        break;
      case 'azure':
        name = 'subscription id';
        value = datasource?.data.subscription_id;
        break;
      case 'gcp':
        name = 'projects';
        value = datasource?.data?.projects.join(', ');
        break;
      default:
    }

    if (!value) {
      return '';
    }

    return `${name}: ${value}`;
  }, [datasource]);

  const columns = useDataSourceResourcesColumns({
    datasourceType: datasource?.datasource_type_id,
  });

  const handleRowClick = (record: Resource) => {
    history.push(logsLink);
  };

  const handleEdit = () => {
    history.push(
      `${
        history.location.pathname
      }/form/${datasource?.datasource_type_id.toLowerCase()}`
    );
  };

  const handleRemoveDataSource = (confirmed?: boolean) => {
    setToggleDeleteModal(false);

    if (confirmed) {
      history.push(
        `${settingsPaths.base}${datasourcePaths.datasourceManagement}`
      );
    }
  };

  const widgets = useWidgets({
    widgets: ['connection'],
    connection: {
      success: stats.collected,
      fail: stats.notCollected,
    },
  });

  if (isLoading || isUninitialized) {
    return <LoadingOverlay />;
  } else if (!isLoading && !isSuccess) {
    return (
      <Redirect
        to={`${settingsPaths.base}${datasourcePaths.datasourceManagement}`}
      />
    );
  }

  return (
    <>
      <Box w="100%">
        <Flex
          w="100%"
          wrap="wrap"
          direction="column"
          padding="32px"
          backgroundColor="#F1F6FA"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Flex direction="column">
              <Text type="medium">{datasource?.name}</Text>
              <Text type="small-regular" color="gray">
                {uniqueId}
              </Text>
            </Flex>
            <Flex alignItems="center" sx={{ gap: 8 }}>
              {canUpdate && (
                <Button onClick={handleEdit}>
                  <PenDark /> Edit
                </Button>
              )}
              <ButtonDropdown
                icon
                alignRight
                variant="secondary"
                listWidth="224px"
                label={<Settings />}
                options={[
                  {
                    id: 'view',
                    name: 'View activity log',
                    onClick: () => history.push(logsLink),
                  },
                  {
                    id: 'scan',
                    name: 'Scan data source',
                    show: canScan,
                    onClick: () => setToggleScanModal(true),
                  },
                  {
                    id: 'remove',
                    name: 'Remove data source',
                    destructive: true,
                    show: canDelete,
                    onClick: () => setToggleDeleteModal(true),
                  },
                ]}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex wrap="wrap" sx={{ gap: 20 }} w="100%" padding="32px 32px 24px">
          {widgets}
        </Flex>
        <GridItem height="100%">
          <Grid h="100%" templateColumns="repeat(6, 1fr)" paddingBottom="0px">
            <GridItem colSpan={6} padding="0px 32px 32px">
              <TableGW<Resource>
                rowKey="description"
                isLoading={isFetching}
                columns={columns}
                // @ts-expect-error badly typed backend response
                data={datasource?.resource_statuses ?? []}
                onRow={(record, index) => ({
                  onClick: handleRowClick.bind(null, record, index),
                })}
                rowHoverBehavior={{
                  cursor: 'pointer',
                  injectedStyles: HoveredExpanderCell,
                }}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Box>
      <Switch>{formRoutes}</Switch>
      <ScanDataSourceModal
        datasourceId={datasourceId}
        name={datasource?.name as string}
        open={toggleScanModal}
        onRequestClose={() => setToggleScanModal(false)}
      />
      <DeleteDataSourceModal
        datasourceId={datasourceId}
        name={datasource?.name as string}
        open={toggleDeleteModal}
        onRequestClose={handleRemoveDataSource}
      />
    </>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <DatasourceDetails />
  </ErrorBoundary>
);

export { WithBoundary as DatasourceDetailsScreen };

export default WithBoundary;
