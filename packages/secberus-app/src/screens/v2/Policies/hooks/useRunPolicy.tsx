import React from 'react';
import { policiesApi, RunPolicyApiArg } from '@secberus/services';
import { RunPolicyModal as Modal } from '../components/RunPolicyModal/RunPolicyModal.component';

export interface UseRunPolicyReturnType {
  runPolicy: (props: RunPolicyApiArg) => Promise<void>;
  RunPolicyModal: () => JSX.Element;
}

export type HandleRunPolicyProps = RunPolicyApiArg & {
  datasourceName?: string;
};

export const useRunPolicy = (): UseRunPolicyReturnType => {
  const [open, setOpen] = React.useState(false);
  const [datasourceName, setDatasourceName] = React.useState<
    string | undefined
  >(undefined);
  const [runPolicy] = policiesApi.useRunPolicyMutation();

  const handleRunPolicy = React.useCallback(
    async ({ datasourceName: name, ...args }: HandleRunPolicyProps) => {
      if (name) {
        setDatasourceName(name);
      }

      setOpen(true);
      await runPolicy(args);
    },
    [runPolicy]
  );

  const handleModalClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const props = React.useMemo(
    () => ({
      open,
      name: datasourceName,
      onRequestClose: handleModalClose,
    }),
    [datasourceName, handleModalClose, open]
  );

  const RunPolicyModal = React.useCallback(() => <Modal {...props} />, [props]);

  return { runPolicy: handleRunPolicy, RunPolicyModal };
};
