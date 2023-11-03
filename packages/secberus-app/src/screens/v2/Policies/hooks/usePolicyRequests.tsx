import React from 'react';
import {
  policiesApi2,
  secberusApi_Policy,
  secberusApi_ListPoliciesApiArg,
  secberusApi_CreatePolicyApiArg,
  secberusApi_UpdatePolicyApiArg,
  getDefaultPaginatedResponse,
} from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useDispatch } from 'react-redux';
import { useNotify } from '../../../../store';
import { setDraftPolicyNull } from '../../../../features/policy-editor/slice';

const logger = createEnvAwareLogger();

export const useGetAllPolicies = () => {
  const [
    listAllPolicies,
    {
      data: policies = getDefaultPaginatedResponse<secberusApi_Policy>(),
      ...listAllPoliciesQuery
    },
  ] = policiesApi2.useLazyListPoliciesQuery();

  const getAllPolicies = React.useCallback(
    async (data: secberusApi_ListPoliciesApiArg) => {
      return await listAllPolicies(data, true);
    },
    [listAllPolicies]
  );

  React.useEffect(() => {
    if (listAllPoliciesQuery.isError) {
      logger.error(listAllPoliciesQuery.error);
    }
  }, [listAllPoliciesQuery.isError, listAllPoliciesQuery.error]);

  return {
    isUninitialized: listAllPoliciesQuery.isUninitialized,
    isLoading: listAllPoliciesQuery.isLoading,
    isFetching: listAllPoliciesQuery.isFetching,
    getAllPolicies,
    policies,
  };
};

export const useGetPolicyPage = () => {
  const [
    listPolicies,
    {
      data: policies = getDefaultPaginatedResponse<secberusApi_Policy>(),
      ...listPoliciesQuery
    },
  ] = policiesApi2.useLazyListPoliciesQuery();

  const getPoliciesByPage = React.useCallback(
    async (data: secberusApi_ListPoliciesApiArg) => {
      return await listPolicies(data, true);
    },
    [listPolicies] //, itemsPerPage, page, location.search]
  );

  React.useEffect(() => {
    if (listPoliciesQuery.isError) {
      logger.error(listPoliciesQuery.error);
    }
  }, [listPoliciesQuery.isError, listPoliciesQuery.error]);

  return {
    isUninitialized: listPoliciesQuery.isUninitialized,
    isLoading: listPoliciesQuery.isLoading,
    isFetching: listPoliciesQuery.isFetching,
    getPoliciesByPage,
    policies,
  };
};

export const useCreatePolicy = () => {
  const dispatch = useDispatch();
  const { notifySuccess, notifyError } = useNotify();

  const [createPolicy, { isLoading, isSuccess, isError, error }] =
    policiesApi2.useCreatePolicyMutation();

  const handleCreate = React.useCallback(
    (data: secberusApi_CreatePolicyApiArg) => createPolicy(data),
    [createPolicy]
  );

  React.useEffect(() => {
    if (isSuccess) notifySuccess('Policy created successfully');
    // Get rid of draftState so policy & explorer doesn't have old state
    dispatch(setDraftPolicyNull());
  }, [dispatch, isSuccess, notifySuccess]);

  React.useEffect(() => {
    if (isError) {
      logger.error(error);
      notifyError(
        'Something went wrong when creating this policy. Please try again.'
      );
    }
  }, [error, isError, notifyError]);

  return {
    handleCreate,
    isLoading,
  };
};

export const useUpdatePolicy = () => {
  const dispatch = useDispatch();
  const { notifySuccess } = useNotify();

  const [updatePolicy, { isLoading, isSuccess, isError, error }] =
    policiesApi2.useUpdatePolicyMutation();

  const handleUpdate = React.useCallback(
    (data: secberusApi_UpdatePolicyApiArg) => updatePolicy(data),
    [updatePolicy]
  );

  React.useEffect(() => {
    if (isSuccess) notifySuccess('Policy updated successfully');
    // Get rid of draftState so policy & explorer doesn't have old state
    dispatch(setDraftPolicyNull());
  }, [dispatch, isSuccess, notifySuccess]);

  React.useEffect(() => {
    if (isError) {
      logger.error(error);
    }
  }, [error, isError]);

  return {
    handleUpdate,
    isLoading,
  };
};

export const useDeletePolicy = (name?: secberusApi_Policy['name']) => {
  const dispatch = useDispatch();
  const { notifySuccess, notifyError } = useNotify();

  const [deletePolicy, { isLoading, isSuccess, isError, error }] =
    policiesApi2.useDeletePolicyMutation();

  const handleDelete = React.useCallback(
    async (id: secberusApi_Policy['id']) => {
      if (id) await deletePolicy({ id });
      else {
        notifyError(
          'Something went wrong when deleting this policy. Please try again.'
        );
      }
    },
    [deletePolicy, notifyError]
  );

  React.useEffect(() => {
    if (isSuccess)
      notifySuccess(`Policy ${name ? `"${name}" ` : ''}deleted successfully`);
    // Get rid of draftState so policy & explorer doesn't have old state
    dispatch(setDraftPolicyNull());
  }, [dispatch, isSuccess, name, notifySuccess]);

  React.useEffect(() => {
    if (isError) {
      logger.error(error);
      notifyError(
        'Something went wrong when deleting this policy. Please try again.'
      );
    }
  }, [error, isError, notifyError]);

  return {
    handleDelete,
    isLoading,
  };
};
