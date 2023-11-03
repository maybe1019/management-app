import React from 'react';
import {
  policiesApi2,
  secberusApi_ListPoliciesApiArg,
  secberusApi_Policy,
  getDefaultPaginatedResponse,
} from '@secberus/services';

export const useGetRiskPolicies = () => {
  const [
    getPolicies,
    {
      data: policies = getDefaultPaginatedResponse<secberusApi_Policy>(),
      ...listPoliciesQuery
    },
  ] = policiesApi2.useLazyListPoliciesQuery();

  const getPoliciesByPage = React.useCallback(
    async (data: secberusApi_ListPoliciesApiArg) => getPolicies(data, true),
    [getPolicies]
  );

  return {
    isPostureLoading: listPoliciesQuery.isLoading,
    isPostureFetching: listPoliciesQuery.isFetching,
    getPoliciesByPage,
    cursor: policies.cursor,
    policies: policies.results,
  };
};
