import React from 'react';
import { reportSchedulesApi, UpdateReportSchedule } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../store';

export const useUpdateSchedule = () => {
  const logger = createEnvAwareLogger();
  const [updateSchedule, { isSuccess, isLoading }] =
    reportSchedulesApi.useUpdateReportScheduleMutation();

  const { notifySuccess } = useNotify();

  const handleUpdate = React.useCallback(
    async (id: string, reportPut: UpdateReportSchedule) => {
      const resp = await updateSchedule({
        reportId: id,
        updateReportSchedule: reportPut,
      });
      if ('error' in resp) {
        logger.error(resp.error);
      } else {
        notifySuccess(`Report successfully updated`);
      }
      return resp;
    },
    [logger, notifySuccess, updateSchedule]
  );

  return { handleUpdate, isSuccess, isLoading };
};
