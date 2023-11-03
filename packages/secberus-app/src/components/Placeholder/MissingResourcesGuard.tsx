import React from 'react';
import { LoadingOverlay } from '@secberus/components';
import {
  dataSourceApi,
  complianceFrameworksApi,
  policiesApi2,
} from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { DashboardPlaceholder } from '..';

type MissingResourcesAttributes = 'dataSources' | 'policies' | 'frameworks';

interface MissingResourcesGuardProps {
  resources: MissingResourcesAttributes[];
}

export const MissingResourcesGuard: React.FC<MissingResourcesGuardProps> = ({
  children,
  resources,
}) => {
  const {
    data: dataSources = { results: [] },
    isLoading: isDataSourcesLoading,
  } = dataSourceApi.useListDatasourcesQuery({});
  const { data: frameworks = [], isLoading: isFrameworksLoading } =
    complianceFrameworksApi.useGetComplianceFrameworksQuery({
      enabled: 'true',
    });
  const { data: policies = { results: [] }, isLoading: isPoliciesLoading } =
    policiesApi2.useListPoliciesQuery({
      subscribed: true,
    });

  const isLoading = useIsLoading([
    isDataSourcesLoading,
    isFrameworksLoading,
    isPoliciesLoading,
  ]);

  if (isLoading) return <LoadingOverlay />;

  if (!dataSources?.results.length && resources?.includes('dataSources'))
    return <DashboardPlaceholder missingType="datasources" />;

  if (!frameworks.length && resources?.includes('frameworks'))
    return <DashboardPlaceholder missingType="frameworks" />;

  if (!policies?.results.length && resources?.includes('policies'))
    return <DashboardPlaceholder missingType="policies" />;

  return <>{children}</>;
};
