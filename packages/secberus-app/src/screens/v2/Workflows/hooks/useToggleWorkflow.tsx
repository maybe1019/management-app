import React from 'react';
import { workflowsApi, DisableWorkflowApiArg } from '@secberus/services';
import { useNotify } from '../../../../store';

interface ToggleWorkflow {
  args: DisableWorkflowApiArg;
  enabled: boolean;
}
export const useToggleWorkflow = () => {
  const { notifySuccess } = useNotify();

  const [enableWorkflow, { isSuccess: isEnableSuccess }] =
    workflowsApi.useEnableWorkflowMutation();
  const [disableWorkflow, { isSuccess: isDisableSuccess }] =
    workflowsApi.useDisableWorkflowMutation();
  const toggleWorkflow = React.useCallback(
    async ({ args, enabled }: ToggleWorkflow) => {
      if (enabled) {
        await disableWorkflow(args);
      } else {
        await enableWorkflow(args);
      }
    },
    [disableWorkflow, enableWorkflow]
  );
  React.useEffect(() => {
    if (isEnableSuccess) {
      notifySuccess('Workflow successfully enabled.');
    }
  }, [isEnableSuccess, notifySuccess]);

  React.useEffect(() => {
    if (isDisableSuccess) {
      notifySuccess('Workflow successfully disabled');
    }
  }, [isDisableSuccess, notifySuccess]);

  return { toggleWorkflow };
};
