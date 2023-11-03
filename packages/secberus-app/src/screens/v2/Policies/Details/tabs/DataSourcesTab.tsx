import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text, Button, TableGW, DetailHeader } from '@secberus/components';
import { Datasource, policiesApi } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { DataTextWrapper } from '../Details.styled';
import { useSorting } from '../../../../../features/sorting';
import { ManageCoverageFormComponent } from '../Form/ManageCoverage/ManageCoverageForm.component';
import { HoveredExpanderCell } from '../../../../../components';
import { usePermissions } from '../../../../../app/rbac/definitions';
import { notifySuccess } from '../../../../../store';
import { GithubForm } from '../../../../../features/datasources/components/github/components/Github.form';
import { useRunPolicy } from '../../hooks/useRunPolicy';
import { useGetPolicyDatasources } from './hooks/useGetPolicyDatasources';
import {
  useDatasourceTabColumns,
  UseDatasourceTabColumnsProps,
} from './hooks/useDatasourceTabColumns';

export const DataSourcesTab = ({
  policyId,
  subscribed,
}: {
  policyId: string;
  subscribed: boolean;
}) => {
  const tableId = 'policy-coverage-data-sources-list';
  const [formOpen, setFormOpen] = React.useState(false);
  const [toggleEditGithubModal, setToggleEditGithubModal] =
    React.useState(false);

  const { runPolicy, RunPolicyModal } = useRunPolicy();
  const { canUpdate: canUpdatePolicy } = usePermissions('policies');

  const {
    isUninitialized,
    isLoading,
    isFetching,
    getPolicyDataSourcesByPage,
    page,
    limit,
    resetState: resetPagination,
    PaginationComponent,
    policyDataSources,
  } = useGetPolicyDatasources(tableId);

  const [updatePolicyDataSources, updatePolicyDataSourcesQuery] =
    policiesApi.useUpdatePolicyDatasourcesMutation();

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<Datasource>({
    tableId,
  });

  const handleSort = (arg: any) => {
    onSortingChange(arg);
    resetPagination();
  };

  const isTableLoading = useIsLoading([isUninitialized, isLoading, isFetching]);

  const handleRunPolicy: UseDatasourceTabColumnsProps['handleRunPolicy'] =
    React.useCallback(
      args => {
        runPolicy({ ...args, policyId });
      },
      [policyId, runPolicy]
    );

  const handleRemoveCoverage = React.useCallback(
    (datasourceId: Datasource['id']) => {
      const idList = policyDataSources?.results.map(d => d.id as string) ?? [];
      updatePolicyDataSources({
        policyId,
        policyDatasourceIds: {
          datasource_ids: idList.filter(id => id !== datasourceId),
        },
      });
    },
    [policyDataSources?.results, policyId, updatePolicyDataSources]
  );

  React.useEffect(() => {
    getPolicyDataSourcesByPage({
      policyId,
      page,
      limit,
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : undefined,
    });
  }, [getPolicyDataSourcesByPage, limit, page, policyId, sortCol, sortDir]);

  React.useEffect(() => {
    if (updatePolicyDataSourcesQuery.isSuccess) {
      notifySuccess('Successfully updated covered Data sources');
    }
  }, [updatePolicyDataSourcesQuery.isSuccess]);

  const columns = useDatasourceTabColumns({
    handleRunPolicy,
    handleRemoveCoverage,
    setToggleEditGithubModal,
  });

  return (
    <>
      <DetailHeader title="Coverage">
        {subscribed && (
          <Flex alignItems="center" sx={{ gap: 8 }}>
            {canUpdatePolicy && (
              <Button onClick={() => setFormOpen(true)}>Manage coverage</Button>
            )}
          </Flex>
        )}
      </DetailHeader>
      {subscribed ? (
        <>
          <Box padding="0px 32px 32px">
            <DataTextWrapper>
              <Text type="small-regular">
                This policy is applied to the data sources listed below. The
                policy will run against the data collected to determine if there
                are violations after scheduled scans, and when changes are
                detected.
              </Text>
            </DataTextWrapper>
            <TableGW
              isLoading={isTableLoading}
              data={policyDataSources?.results ?? []}
              onSort={handleSort}
              sortColumn={sortCol}
              sortDirection={sortDir}
              columns={columns}
              emptyText="No data sources"
              rowHoverBehavior={{
                cursor: 'pointer',
                injectedStyles: HoveredExpanderCell,
              }}
            />
            {PaginationComponent}
          </Box>
          <ManageCoverageFormComponent
            isOpen={formOpen}
            onRequestClose={() => setFormOpen(false)}
            policyId={policyId}
            policyDataSources={policyDataSources?.results ?? []}
          />
        </>
      ) : (
        <Box padding="0px 32px 32px">
          <DataTextWrapper>
            <Text type="small-regular">
              This policy is currently inactive, disabling data source scans. To
              view and manage the data sources this policy is set up to scan,
              activate the policy by setting the status to "On."
            </Text>
          </DataTextWrapper>
        </Box>
      )}
      <RunPolicyModal />
      <GithubForm
        visible={toggleEditGithubModal}
        onRequestClose={() => setToggleEditGithubModal(false)}
      />
    </>
  );
};
