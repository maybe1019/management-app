import React from 'react';
import { Resource, secberusApiGW } from '@secberus/services';
import { LoadingOverlay } from '@secberus/components';
import { WithAuthGate } from '../../services/auth/WithAuthGate';

export const ResourcesContext = React.createContext<Record<string, Resource>>(
  {}
);

const WithResources: React.FC = ({ children }) => {
  const { data: resources = [], isLoading } =
    secberusApiGW.useListResourcesQuery({});

  const resourceMap = React.useMemo(
    () =>
      resources?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, Resource>),
    [resources]
  );

  if (isLoading) return <LoadingOverlay />;

  return (
    <ResourcesContext.Provider value={resourceMap}>
      {children}
    </ResourcesContext.Provider>
  );
};

const WithAuthGatedResources: React.FC = ({ children }) => (
  <WithAuthGate component={WithResources}>{children}</WithAuthGate>
);

export { WithAuthGatedResources as WithResources };
