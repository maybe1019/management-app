import { Auth } from 'aws-amplify';
import { dispatchAuthEvent, CUSTOM_AUTH_EVENTS } from '../..';
import { X_API_KEY } from '../../constants';
import { CognitoSession } from '../../definitions';

const baseHeaders = {
  'Content-type': 'application/json;',
  'Content-Type': 'application/json',
  'x-api-key': X_API_KEY,
};

type AddBaseHeadersOpts = {
  headers: Headers;
};

/**
 * @param headers - Headers object which will accept the base headers
 */
export const addBaseHeaders = async (
  arg: Headers | AddBaseHeadersOpts,
  { getState }: { getState: () => unknown }
): Promise<Headers> => {
  const headers = arg instanceof Headers ? arg : arg.headers;

  const {
    authentication: { isAuthenticated },
  } = getState() as any;

  Object.entries(baseHeaders).forEach(([key, val]) => {
    headers.set(key, val);
  });

  // Amplify returns the wrong types here
  try {
    const {
      idToken: { jwtToken },
    } = (await Auth.currentSession()) as unknown as CognitoSession;
    headers.set('Authorization', jwtToken);
  } catch (e) {
    if (isAuthenticated) {
      dispatchAuthEvent(
        CUSTOM_AUTH_EVENTS.sessionExpired,
        e,
        `Session has expired`
      );
    }
  }

  return headers;
};
