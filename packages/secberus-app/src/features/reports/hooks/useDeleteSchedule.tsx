import React from 'react';
import { reportSchedulesApi } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../store';

export const useDeleteSchedule = () => {
  const logger = createEnvAwareLogger();
  const [deleteSchedule, { isSuccess, isLoading }] =
    reportSchedulesApi.useDeleteReportScheduleMutation();

  const { notifySuccess } = useNotify();

  const handleDelete = React.useCallback(
    async (id: string) => {
      const resp = await deleteSchedule({ reportId: id });
      if ('error' in resp) {
        logger.error(resp.error);
      } else {
        notifySuccess(`Report successfully disabled`);
      }
      return resp;
    },
    [deleteSchedule, logger, notifySuccess]
  );

  return { handleDelete, isSuccess, isLoading };
};
