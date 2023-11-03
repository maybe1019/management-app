import React from 'react';
import { secberusApi_Policy, policiesApi2 } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../../../../store';

const logger = createEnvAwareLogger();

export const useSubscribePolicy = ({
  id,
  name,
}: {
  id: NonNullable<secberusApi_Policy['id']>;
  name: secberusApi_Policy['name'];
}) => {
  const [subscribePolicy, { isError, error, isSuccess, data: response }] =
    policiesApi2.usePolicySubscriptionsMutation();

  const { notify } = useNotify();

  const handleSubscribe = React.useCallback(
    () =>
      subscribePolicy({
        policySubscriptionList: [{ policy_id: id, enabled: true }],
      }),
    [subscribePolicy, id]
  );

  React.useEffect(() => {
    if (isSuccess)
      notify({
        type: 'success',
        message: `Subscribed ${name}`,
      });

    if (isError) {
      notify({
        type: 'fail',
        message: `Something went wrong. Please try again or contact support.`,
      });
      logger.error(error);
    }
  }, [response, error, isError, isSuccess, notify, name]);

  return { handleSubscribe, isSuccess };
};

export const useUnsubscribePolicy = ({
  id,
  name,
}: {
  id: NonNullable<secberusApi_Policy['id']>;
  name: secberusApi_Policy['name'];
}) => {
  const [unsubscribePolicy, { isError, error, isSuccess, data: response }] =
    policiesApi2.usePolicySubscriptionsMutation();

  const { notify } = useNotify();

  const handleUnsubscribe = React.useCallback(
    () =>
      unsubscribePolicy({
        policySubscriptionList: [{ policy_id: id, enabled: false }],
      }),
    [unsubscribePolicy, id]
  );

  React.useEffect(() => {
    if (isSuccess)
      notify({
        type: 'success',
        message: `Unsubscribed ${name}`,
      });

    if (isError) {
      notify({
        type: 'fail',
        message: `Something went wrong. Please try again or contact support.`,
      });
      logger.error(error);
    }
  }, [response, error, isError, isSuccess, notify, name]);

  return { handleUnsubscribe, isSuccess };
};
