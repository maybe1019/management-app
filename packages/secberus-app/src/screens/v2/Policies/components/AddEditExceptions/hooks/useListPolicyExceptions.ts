import { exceptionsApi, Policy } from '@secberus/services';

export const useListPolicyExceptions = (id: Policy['id']) => {
  const {
    data: policyExceptions,
    isLoading: isPolicyExceptionsLoading,
    isFetching: isPolicyExceptionsFetching,
  } = exceptionsApi.useListPolicyExceptionsQuery(
    {
      policyId: id!,
    },
    {
      skip: !id,
    }
  );

  return {
    policyExceptions,
    isPolicyExceptionsLoading,
    isPolicyExceptionsFetching,
  };
};
