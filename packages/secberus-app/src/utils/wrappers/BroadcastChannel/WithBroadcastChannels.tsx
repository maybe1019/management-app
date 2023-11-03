import React from 'react';
import * as Sentry from '@sentry/react';
import { createEnvAwareLogger, parseJwt } from '@secberus/utils';
import {
  CUSTOM_AUTH_EVENTS,
  useAuthBroadcastChannel,
  AuthBroadcastChannelOnMessage,
  RequestBroadcastChannelOnMessage,
  useRequestBroadcastChannel,
} from '@secberus/services';
import {
  logout,
  sessionExpired,
} from '../../../features/auth/hooks/useAmplifyAuthListener';
import {
  OrgBroadcastChannelOnMessage,
  ORG_EVENTS,
  useOrgBroadcastChannel,
} from '../../../features/organization/orgListener';
import { notifyError, RootState } from '../../../store';
import './broadcastchannel'; // polyfill
import { store } from '../../../store/storeWebConfig';

const logger = createEnvAwareLogger();

const onAuthMessage: AuthBroadcastChannelOnMessage = ({
  data: { event, message },
}) => {
  logger.log({ event, message });
  switch (event) {
    case CUSTOM_AUTH_EVENTS.signOut:
      logout();
      break;
    case CUSTOM_AUTH_EVENTS.sessionExpired:
      sessionExpired();
      break;
    default:
      break;
  }
};

const onOrgMessage: OrgBroadcastChannelOnMessage = ({
  data: { event, message },
}) => {
  switch (event) {
    case ORG_EVENTS.userOrgChange:
      logger.log({ event, message });
      break;
    case ORG_EVENTS.orgInit:
      logger.log({ event, message });
      break;
    default:
      break;
  }
};

const onRequestMessage: RequestBroadcastChannelOnMessage = ({ data }) => {
  logger.log(data);

  if (data.event === 'CUSTOM_response_error') {
    if ('errorMessage' in data) notifyError();
    else notifyError(`${data.title} - ${data.detail}`);

    const sentryPayload = {
      error: new Error(data.event),
      tags: {
        context: window.location.href,
        // @ts-expect-error
        ...data,
      },
    };

    logger.log('data sent to sentry:', sentryPayload);

    Sentry.captureException(sentryPayload.error, {
      tags: sentryPayload.tags,
    });
  }
};

const WithBroadcastChannels: React.FC = ({ children }) => {
  useAuthBroadcastChannel({ onMessage: onAuthMessage });
  useOrgBroadcastChannel({ onMessage: onOrgMessage });
  useRequestBroadcastChannel({ onMessage: onRequestMessage });

  return <>{children}</>;
};

export default WithBroadcastChannels;
