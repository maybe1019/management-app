import React from 'react';
import { exceptionsApi, Exception } from '@secberus/services';
import { useNotify } from '../../../../../../store';

export const useDeleteExceptions = () => {
  const [deleteException, { isLoading: isExceptionDeleting, isSuccess }] =
    exceptionsApi.useDeleteExceptionMutation();
  const { notifySuccess } = useNotify();

  const handleDeleteException = React.useCallback(
    async (exceptionId: Exception['id']) => {
      await deleteException({
        exceptionId: exceptionId,
      });
    },
    [deleteException]
  );

  React.useEffect(() => {
    if (isSuccess) {
      notifySuccess('Exception successfully deleted.');
    }
  }, [isSuccess, notifySuccess]);

  return {
    isExceptionDeleting,
    handleDeleteException,
  };
};
