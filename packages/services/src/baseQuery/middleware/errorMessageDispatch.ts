import { BaseQueryEnhancer, FetchArgs } from '@reduxjs/toolkit/dist/query';
import {
  HttpStatusCode,
  requestBroadcastChannel,
  RequestBroadcastChannelMessage,
} from '../..';
import { HandledError } from '../utils/handledError';
import { isError } from '../utils/isError';

import type { SecberusAPIResponse, ExtraOptions } from '../definitions';
import { CUSTOM_REQUEST_EVENTS } from '../../messaging/requestChannel';

export type RequestErrorMessageOptions = {
  muteError?: boolean | HttpStatusCode | HttpStatusCode[];
};

const detectMutedError = (
  error: HttpStatusCode,
  mute: boolean | HttpStatusCode | HttpStatusCode[] | undefined
) => {
  if (!mute) return false;
  if (typeof mute === 'boolean' && !!error) return true;
  if (Array.isArray(mute) && mute.some((err) => err === error)) return true;
  if (!Array.isArray(error) && mute === error) {
    return true;
  }
  return false;
};

export const errorMessageDispatch: BaseQueryEnhancer<
  unknown,
  ExtraOptions,
  ExtraOptions | void
> = (baseQuery) => async (args: string | FetchArgs, api, extraOptions) => {
  try {
    const result = (await baseQuery(
      args,
      api,
      extraOptions
    )) as SecberusAPIResponse;

    if (
      isError(result) &&
      !detectMutedError(result.error.status, extraOptions?.muteError)
    ) {
      // In this case, we will sign out and notify the user of an expired session. Additional message is redundant.
      if (result.error.status === 401) return result;
      const bc = requestBroadcastChannel();

      bc.postMessage({
        event: CUSTOM_REQUEST_EVENTS.responseError,
        url: (result as any)?.meta.request.url,
        requestHeaders: Object.fromEntries(
          (result as any)?.meta?.request.headers
        ),
        responseHeaders: Object.fromEntries(
          (result as any)?.meta?.response.headers
        ),
        ...result.error.data,
      } as RequestBroadcastChannelMessage);
    }

    return result;
  } catch (e) {
    // @ts-ignore
    if (e.throwImmediately) {
      if (e instanceof HandledError) {
        return e.value;
      }

      // We don't know what this is, so we have to rethrow it
      throw e;
    }
  }
};
