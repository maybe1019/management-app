import React from 'react';
import { AmplifyAuth, selectSSOClientId } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useAuthListener } from '../hooks/useAmplifyAuthListener';
import { amplifyConfig } from '../../../app/amplify.config';
import { useTypedSelector } from '../../../store/RootStateType';

export const AmplifyWrapper: React.FC = ({ children }) => {
  const logger = createEnvAwareLogger();
  const ssoClientId = useTypedSelector(selectSSOClientId);
  const authConfig = ssoClientId
    ? {
        ...amplifyConfig.Auth,
        userPoolWebClientId: ssoClientId,
      }
    : amplifyConfig.Auth;

  logger.log({ authConfig });

  AmplifyAuth.configure(authConfig);

  useAuthListener();

  return <>{children}</>;
};
