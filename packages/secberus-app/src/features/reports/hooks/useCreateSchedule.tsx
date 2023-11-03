import React from 'react';
import { reportSchedulesApi, CreateReportSchedule } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../store';

export const useCreateSchedule = () => {
  const logger = createEnvAwareLogger();
  const [createSchedule, { isSuccess, isLoading }] =
    reportSchedulesApi.useCreateReportScheduleMutation();

  const { notifySuccess } = useNotify();

  const handleCreate = React.useCallback(
    async (reportPost: CreateReportSchedule) => {
      const resp = await createSchedule({ createReportSchedule: reportPost });
      if ('error' in resp) {
        logger.error(resp.error);
      } else {
        notifySuccess(`Report successfully enabled`);
      }
      return resp;
    },
    [createSchedule, logger, notifySuccess]
  );

  return { handleCreate, isSuccess, isLoading };
};
