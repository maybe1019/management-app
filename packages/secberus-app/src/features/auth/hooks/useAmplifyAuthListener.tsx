/* eslint-disable no-case-declarations */
import React from 'react';
import {
  CognitoUser,
  authSlice,
  AmplifyHub,
  selectIDPName,
  selectSSOClientId,
  userAttributesSlice,
  federatedSignIn,
  CUSTOM_AUTH_EVENTS,
  signOut,
  ssoApi2,
} from '@secberus/services';
import * as Sentry from '@sentry/react';
import { PURGE } from 'redux-persist';
import { createEnvAwareLogger } from '@secberus/utils';
import { store } from '../../../store/storeWebConfig';
import { useTypedSelector } from '../../../store/RootStateType';
import { addNotification } from '../../../store';
import AppRedirectUrl from '../../../utils/AppRedirectUrl';

const logger = createEnvAwareLogger();

export const logout = () => {
  store.dispatch({ type: 'store/reset' });
  // purge persisted storage on logout
  store.dispatch({
    type: PURGE,
    key: 'root',
    result: () => null,
  });
};

export const sessionExpired = () => {
  logger.error('Session expired');
  // @ts-expect-error dont need
  signOut();
  store.dispatch(
    addNotification({
      type: 'fail',
      value: 'Your session has expired',
    })
  );
};

const initListener = (idpName?: string) => {
  const authCallback = ({ payload: { event, data, message } }: any) => {
    logger.log(event, data, message);
    switch (event) {
      case 'signIn':
        const userData: CognitoUser = data;

        let attributes: Partial<NonNullable<CognitoUser['attributes']>> = {};

        if (typeof userData.challengeParam !== 'undefined') {
          attributes = userData.challengeParam.userAttributes;
        } else if (typeof userData.attributes !== 'undefined') {
          attributes = userData.attributes;
        } else if (typeof userData.signInUserSession.idToken !== 'undefined') {
          attributes = userData.signInUserSession.idToken.payload;
        }

        const {
          'custom:sid': accountId,
          'custom:userid': userId,
          email,
          name,
        } = attributes;

        store.dispatch(
          userAttributesSlice.actions.init({
            'custom:sid': accountId,
            'custom:userid': userId,
            email,
            name,
          })
        );
        store.dispatch(authSlice.actions.authorize());

        console.log('signIn:::', userData);
        break;
      case 'signIn_failure':
        const dataMsg = data?.message;
        // This is being included as a bypass to handle redirecting from Github with github app installation search params, where github's 'code' param will intersect with Amplify Auth listening for a 'code' param, triggering a >non-breaking< auth attempt.
        // see: https://github.com/aws-amplify/amplify-js/issues/9208
        if (
          dataMsg?.includes(
            "at 'logins' failed to satisfy constraint: Map value must satisfy constraint: [Member must have length less than or equal to 50000, Member must have length greater than or equal to 1]"
          )
        )
          return;
        // allow the login screen to handle this without a notification
        else if (dataMsg?.includes('Temporary password has expired')) return;
        else if (dataMsg?.includes('PROVIDER_LINKED_REAUTH')) {
          if (!idpName) {
            const msg = 'idp name not found in init auth listener';
            logger.error(msg);
            throw new Error(msg);
          }
          federatedSignIn(idpName);
        } else {
          store.dispatch(
            addNotification({
              type: 'fail',
              value:
                dataMsg === 'Incorrect username or password.'
                  ? dataMsg
                  : 'Something went wrong signing in. Please try again or contact support',
            })
          );
          Sentry.captureException({
            message: dataMsg,
            context: window.location.href,
            description: 'User had an issue signing in',
            name: event,
          });
        }
        break;
      case CUSTOM_AUTH_EVENTS.signOut:
        logout();
        AppRedirectUrl.remove();
        break;
      case CUSTOM_AUTH_EVENTS.sessionExpired:
        logger.error(event, data, message);
        sessionExpired();
        break;
      case CUSTOM_AUTH_EVENTS.signOutFailure:
        logger.error(event, data, message);
        logout();
        break;
      case CUSTOM_AUTH_EVENTS.ssoSignInSuccess:
        // loginCallback({ email: { email: 'test@secberus-demo.com' } });
        console.log('ssoSignInSuccess Callbackback data:::', data);
        store.dispatch(
          ssoApi2.endpoints.loginCallback.initiate({
            email: { email: data?.attributes.email },
          })
        );
        break;
    }
  };
  AmplifyHub.listen('auth', authCallback);
  return authCallback;
};

export const useAuthListener = () => {
  const idpName = useTypedSelector(selectIDPName);
  const ssoClientId = useTypedSelector(selectSSOClientId);
  React.useEffect(() => {
    const cb = initListener(idpName);
    return () => AmplifyHub.remove('auth', cb);
  }, [ssoClientId, idpName]);
};
