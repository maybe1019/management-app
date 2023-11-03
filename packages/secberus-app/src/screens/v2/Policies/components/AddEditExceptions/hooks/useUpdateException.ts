import React from 'react';
import { exceptionsApi, UpdateExceptionApiArg } from '@secberus/services';
import { useNotify } from '../../../../../../store';

export const useUpdateExceptions = () => {
  const [updateException, { isLoading: isExceptionUpdating, isSuccess }] =
    exceptionsApi.useUpdateExceptionMutation();
  const { notifySuccess } = useNotify();
  const handleUpdateException = React.useCallback(
    async (payload: UpdateExceptionApiArg) => {
      await updateException(payload);
    },
    [updateException]
  );

  React.useEffect(() => {
    if (isSuccess) {
      notifySuccess('Exception successfully updated.');
    }
  }, [isSuccess, notifySuccess]);

  return {
    isExceptionUpdating,
    handleUpdateException,
  };
};
