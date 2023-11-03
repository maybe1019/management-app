/* eslint-disable @typescript-eslint/ban-types */
import {
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query';
import { createEnvAwareLogger } from '@secberus/utils';
import { formatMultiValueSearchParams, stripUndefined } from '../utils';
import { API_BASE_URL } from '../constants';
import { handleLambdaError } from './utils/handleLambdaErrors';
import { addBaseHeaders } from './utils/addBaseHeaders';
import {
  errorMessageDispatch,
  requestMessageDispatch,
  reAuth,
  retry,
} from './middleware';
import type { ExtraOptions } from './definitions';

const PREVENT_RETRY: FetchBaseQueryError['status'][] = [400, 401, 403, 404];

const logger = createEnvAwareLogger();

const fetchArgsWithMultiValueSearchParams = (
  arg: string | FetchArgs
): string | FetchArgs => {
  if (typeof arg === 'string' || !arg.params) return arg;
  const { url, params, ...restArg } = arg;
  const query = formatMultiValueSearchParams(stripUndefined(params));

  return {
    url: url + `?${query}`,
    ...restArg,
  };
};

/**
 * @param args
 * @param api
 * @param extraOptions Add URL proxies, mute specific errors
 * @returns Can't type an await properly... MaybePromise<QueryReturnValue<Result, Error, Meta>>
 */
const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions,
  {}
> = async (args: string | FetchArgs, api, extraOptions = {}) => {
  const modifiedArgs = fetchArgsWithMultiValueSearchParams(args);

  const result = await fetchBaseQuery({
    baseUrl: `${API_BASE_URL}${
      extraOptions?.proxy ? `/${extraOptions.proxy}` : ''
    }`,
    prepareHeaders: addBaseHeaders,
  })(modifiedArgs, api, extraOptions);

  try {
    // bail out of re-tries immediately if unauthorized,
    // because we know successive re-retries would be redundant
    if (result.error?.status && PREVENT_RETRY.includes(result.error.status)) {
      retry.fail(result.error);
    }
  } catch (e) {
    logger.log('retry prevented:', result);
  }

  const handledResult = handleLambdaError(result as any);

  return handledResult;
};

// TODO: compose functions while preserving type
export const baseQueryWithPlugins = errorMessageDispatch(
  requestMessageDispatch(reAuth(retry(baseQuery, { maxRetries: 3 })))
);
