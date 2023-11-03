/* eslint-disable camelcase */
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { PlusDark } from '@secberus/icons';
import { Button, TableGW, PageHeader } from '@secberus/components';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../../utils/wrappers/ErrorBoundaries';
import { RightButtonContainer } from '../../../features/page-header';
import { useSorting } from '../../../features/sorting';
import WorkflowModal from './Workflow.modal';
import { useColumns } from './Workflows.columns';
import { categoriesApi, dataSourceApi } from '@secberus/services';
import { useToggleWorkflow, useGetWorkflowsPage } from './hooks';
import { useIsLoading } from '@secberus/utils';
import { HoveredExpanderCell } from '../../../components';
import { useHasPermissions } from '../../../app/abac/hooks/useHasPermissions';

export const Workflows = () => {
  const { t } = useTranslation();
  const workflowPagedata = t('pagedata.workflows', { returnObjects: true });
  const { toggleWorkflow } = useToggleWorkflow();

  const allowCreateEditWorkflow = useHasPermissions(
    'api:workflows:create',
    'api:workflows:update',
    'api:workflows:read'
  );

  const {
    workflows,
    isWorkflowsLoading,
    isWorkflowsFetching,
    getWorkflowsByPage,
    page,
    PaginationComponent,
    resetState: resetPagination,
    limit,
  } = useGetWorkflowsPage();

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting({
    tableId: 'workflows-list',
  });

  React.useEffect(() => {
    getWorkflowsByPage({
      page,
      limit,
      //@ts-expect-error type incorrectly generated as can accept string[]
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
    });
  }, [page, limit, getWorkflowsByPage, sortCol, sortDir]);

  const handleSort = args => {
    onSortingChange(args);
    resetPagination();
  };

  const {
    isUninitialized: isCategoriesUninitialized,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    data: categories = { results: [] },
  } = categoriesApi.useListCategoriesQuery({
    limit: 1000,
  });

  const {
    isUninitialized: isDataSourcesUninitialized,
    isLoading: isDataSourcesLoading,
    isFetching: isDataSourcesFetching,
    data: dataSources = { results: [] },
  } = dataSourceApi.useListDatasourcesQuery({
    limit: 500,
  });

  const [formData, setFormData] = React.useState();
  const [visible, setVisible] = React.useState(false);

  const internalData = React.useMemo(() => {
    return workflows.results.map(workflow => {
      return {
        ...workflow,
        context: {
          dataSources: dataSources.results,
          categories: categories.results,
        },
      };
    });
  }, [categories.results, dataSources.results, workflows.results]);

  const handleClose = () => {
    setVisible(false);
    setFormData();
  };

  const handleRowClick = (record, index, event) => {
    setVisible(true);
    setFormData(record);
  };

  const handleToggleWorkflow = React.useCallback(
    async row => {
      toggleWorkflow({
        args: {
          workflowId: row.id,
        },
        enabled: row.enabled,
      });
    },
    [toggleWorkflow]
  );

  const columns = useColumns({
    statusProps: {
      handleChange: handleToggleWorkflow,
    },
    values: {
      categories: categories?.results,
      dataSources: dataSources?.results,
    },
    omitColumns: !allowCreateEditWorkflow ? ['status'] : [],
  });

  const isTableLoading = useIsLoading([
    isCategoriesUninitialized,
    isCategoriesLoading,
    isCategoriesFetching,
    isDataSourcesUninitialized,
    isDataSourcesLoading,
    isDataSourcesFetching,
    isWorkflowsLoading,
    isWorkflowsFetching,
  ]);

  return (
    <Flex h="100%" w="100%" direction="column">
      <Flex w="100%" padding="0px">
        <PageHeader title="Workflows">
          <RightButtonContainer>
            {allowCreateEditWorkflow && (
              <Button
                className="contained-rounded"
                onClick={() => setVisible(true)}
              >
                <PlusDark width={20} height={20} />{' '}
                {workflowPagedata.buttons.add}
              </Button>
            )}
          </RightButtonContainer>
        </PageHeader>
      </Flex>
      <Box h="100%" w="100%" padding="32px">
        <TableGW
          rowKey="id"
          scroll={{ x: 1400 }}
          isLoading={isTableLoading}
          columns={columns}
          data={internalData}
          rowHeight={56}
          sortColumn={sortCol}
          sortDirection={sortDir}
          onSort={handleSort}
          onRow={
            allowCreateEditWorkflow
              ? (record, index) => ({
                  onClick: handleRowClick.bind(null, record, index),
                })
              : undefined
          }
          rowHoverBehavior={
            allowCreateEditWorkflow
              ? {
                  cursor: 'pointer',
                  injectedStyles: HoveredExpanderCell,
                }
              : { background: 'default' }
          }
        />
        {PaginationComponent}
      </Box>
      {visible && (
        <WorkflowModal
          onClose={handleClose}
          visible={visible}
          formData={formData}
        />
      )}
    </Flex>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <Workflows />
  </ErrorBoundary>
);

export { WithBoundary as WorkflowsScreen };
