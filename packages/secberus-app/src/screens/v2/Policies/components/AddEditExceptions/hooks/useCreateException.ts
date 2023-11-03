import React from 'react';
import { exceptionsApi, CreateException } from '@secberus/services';
import { useNotify } from '../../../../../../store';

export const useCreateExceptions = () => {
  const [createException, { isLoading: isExceptionCreating, isSuccess }] =
    exceptionsApi.useCreateExceptionMutation();
  const { notifySuccess } = useNotify();
  const handleCreateException = React.useCallback(
    async (exceptionData: CreateException) => {
      await createException({
        createException: exceptionData,
      });
    },
    [createException]
  );

  React.useEffect(() => {
    if (isSuccess) {
      notifySuccess('Exception successfully created.');
    }
  }, [isSuccess, notifySuccess]);

  return {
    isExceptionCreating,
    handleCreateException,
  };
};
