import React from 'react';
import { selectIsAuthenticated, selectUserId } from '@secberus/services';
import { LoadingOverlay } from '@secberus/components';
import { useTypedSelector } from '../../../store/RootStateType';
import { WithOrganizationContext } from '../../../features/organization/WithOrganizationContext';
import { WithAuthGate } from '../../services/auth/WithAuthGate';

const WithUserContext: React.FC = ({ children }) => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const userId = useTypedSelector(selectUserId);

  if (!userId && isAuthenticated) return <LoadingOverlay />;
  return <WithOrganizationContext>{children}</WithOrganizationContext>;
};

export const WithAuthGatedUserContext: React.FC = ({ children }) => (
  <WithAuthGate component={WithUserContext}>{children}</WithAuthGate>
);
