import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOverlay } from '@secberus/components';
import { policiesApi2 } from '@secberus/services';
import { ManageExceptions } from './ManageExceptions';
import { ErrorBoundary } from '../../../../../utils/wrappers/ErrorBoundaries';
import { useIsLoading } from '@secberus/utils';

const ManageExceptionsContainer = () => {
  const { policyId } = useParams();
  const { data: policy, isLoading: isPolicyLoading } =
    policiesApi2.useGetPolicyQuery({
      id: policyId,
    });
  const isLoading = useIsLoading([isPolicyLoading]);

  if (isLoading) return <LoadingOverlay />;
  return <ManageExceptions policy={policy} />;
};
const WithBoundary = () => (
  <ErrorBoundary>
    <ManageExceptionsContainer />
  </ErrorBoundary>
);

export { WithBoundary as ManageExceptionsScreen };
