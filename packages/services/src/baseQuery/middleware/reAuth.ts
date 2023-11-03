import { Auth } from 'aws-amplify';
import { BaseQueryEnhancer, FetchArgs } from '@reduxjs/toolkit/dist/query';
import { CognitoSession } from '../../definitions';
import { dispatchAuthEvent } from '../../custom';
import { HandledError } from '../utils/handledError';
import { isError } from '../utils/isError';
import { CUSTOM_AUTH_EVENTS } from '../../messaging';
import type { SecberusAPIResponse, ExtraOptions } from '../definitions';

export const reAuth: BaseQueryEnhancer<
  unknown,
  ExtraOptions,
  ExtraOptions | void
> = (baseQuery) => async (args: string | FetchArgs, api, extraOptions) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = (await baseQuery(
      args,
      api,
      extraOptions
    )) as SecberusAPIResponse;

    if (isError(result) && result.error.status === 401) {
      // try to get a new token
      try {
        const { idToken } =
          (await (Auth.currentSession() as unknown)) as CognitoSession;
        if (!idToken) throw Error('Refresh failed');
      } catch (e: any) {
        if (e.throwImmediately) {
          if (e instanceof HandledError) {
            return e.value;
          }

          // We don't know what this is, so we have to rethrow it
          throw e;
        }
        // dispach message session expired
        dispatchAuthEvent(
          CUSTOM_AUTH_EVENTS.sessionExpired,
          e,
          `Session has expired`
        );
        return result;
      }
    }

    return result;
  }
};
