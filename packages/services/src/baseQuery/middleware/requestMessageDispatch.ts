import { BaseQueryEnhancer, FetchArgs } from '@reduxjs/toolkit/dist/query';
import { HandledError } from '../utils/handledError';
import { requestBroadcastChannel } from '../..';
import type { SecberusAPIResponse, ExtraOptions } from '../definitions';
import {
  CUSTOM_REQUEST_EVENTS,
  RequestBroadcastChannelMessage,
} from '../../messaging/requestChannel';

export const requestMessageDispatch: BaseQueryEnhancer<
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

    const bc = requestBroadcastChannel();
    bc.postMessage({
      event: CUSTOM_REQUEST_EVENTS.responseReceieved,
      requestHeaders: Object.fromEntries(
        (result as any)?.meta?.request.headers
      ),
      responseHeaders: Object.fromEntries(
        (result as any)?.meta?.response.headers
      ),
      result: result.data,
      url: (result as any)?.meta.request.url,
    } as RequestBroadcastChannelMessage);

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
