import React from 'react';
import * as Sentry from '@sentry/react';
import { Auth } from 'aws-amplify';
import {
  CUSTOM_AUTH_EVENTS,
  dispatchAuthEvent,
  selectEmail,
} from '@secberus/services';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useTypedSelector } from '../../../store';
import { LoadingFormComponent } from './Loading.component';

const errorExists = (url: string) => url.match(/(err|error|ERROR|ERR)/g);

export const SSOCallbackComponent: React.FC = () => {
  const location = window.location.href;
  const [user, setUser] = React.useState<CognitoUser | undefined>();
  const userEmail = useTypedSelector(selectEmail);

  React.useEffect(() => {
    (async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser);
    })();
  }, [user]);

  React.useEffect(() => {
    console.log('userEmail:::', userEmail);
  }, [userEmail]);

  React.useEffect(() => {
    if (errorExists(location)) {
      Sentry.captureException({
        context: {
          description: 'SSO sign in failure',
          context: window.location.href,
          message: `This may contain the error: ${window.location.search}`,
        },
      });
    } else {
      // Execute one-time login callback for successful sso logins only
      if (user) {
        dispatchAuthEvent(
          CUSTOM_AUTH_EVENTS.ssoSignInSuccess,
          { user },
          'SSO Sign in success'
        );
      }
    }
  }, [location, user]);

  return <LoadingFormComponent message="Authorizing..." />;
};
