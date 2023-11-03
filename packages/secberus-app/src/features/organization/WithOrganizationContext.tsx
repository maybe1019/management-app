import React from 'react';
import { LoadingOverlay } from '@secberus/components';
import { WithOrgInjectedToken } from '../../app/core/wrappers/WithOrgInjectedToken';
import { useDetectOrg } from './useDetectOrg';

export const WithOrganizationContext: React.FC = ({ children }) => {
  const { isLoading, orgId } = useDetectOrg();

  if (isLoading) return <LoadingOverlay />;
  return <WithOrgInjectedToken id={orgId}>{children}</WithOrgInjectedToken>;
};
