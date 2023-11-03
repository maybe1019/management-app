import React from 'react';
import { TabBar, DetailHeader, LoadingOverlay } from '@secberus/components';
import { dataSourceApi, secberusApi_Policy } from '@secberus/services';
import {
  DataSourcesTab,
  EditorTab,
  RemediationTab,
  ViolationsTabComponent,
} from '../tabs';
import { HeaderButtons } from '../../components/HeaderButtons/HeaderButtons';
import { policyDetailsPath } from '../../../../../app/routing/paths';
import { usePermissions } from '../../../../../app/rbac/definitions';

export const WithHeader: React.FC<{
  headerString: string;
  policy: secberusApi_Policy;
}> = ({ headerString, policy, children }) => (
  <>
    <DetailHeader title={headerString}>
      <HeaderButtons policy={policy} />
    </DetailHeader>
    {children}
  </>
);

export type RequiredPolicy = Omit<secberusApi_Policy, 'id'> &
  Required<Pick<secberusApi_Policy, 'id' | 'controls'>>;

export const TabBarComponent: React.FC<{
  policy: RequiredPolicy;
}> = ({ policy }) => {
  const { canCreate, canUpdate, canDelete } = usePermissions('datasources');
  const {
    data: dataSources = { results: [] },
    isLoading: isDatasourcesLoading,
  } = dataSourceApi.useListDatasourcesQuery({ limit: '500' });

  const canViewCoverage = canCreate && canUpdate && canDelete;

  if (isDatasourcesLoading) {
    return <LoadingOverlay />;
  }

  return (
    <TabBar
      defaultTab="details"
      mode="light"
      tabs={{
        details: {
          title: 'Details',
          path: `${policyDetailsPath}/details`,
          route: 'details',
          component: (
            <EditorTab
              policy={policy}
              id={policy.id}
              policy_category_id={policy.policy_category_id!}
            />
          ),
        },
        violations: {
          title: 'Violations',
          path: `${policyDetailsPath}/violations`,
          route: `violations`,
          component: (
            <ViolationsTabComponent
              policy={policy}
              policyId={policy.id}
              violationCount={policy.total_violation_count}
              dataSourceTypes={policy.datasource_types!}
              dataSources={dataSources?.results}
            />
          ),
        },
        remediation: {
          title: 'Remediation',
          path: `${policyDetailsPath}/remediation`,
          route: `remediation`,
          component: (
            <RemediationTab remediationSteps={policy.remediation_steps} />
          ),
        },
        coverage: {
          title: 'Coverage',
          path: `${policyDetailsPath}/coverage`,
          route: `coverage`,
          show: canViewCoverage,
          component: (
            <DataSourcesTab
              policyId={policy.id}
              subscribed={policy.subscribed}
            />
          ),
        },
      }}
    />
  );
};
