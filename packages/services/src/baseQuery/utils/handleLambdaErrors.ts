import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { isObject } from '@secberus/utils';

type SecbrusApiResponseData = {
  message: string;
  success: boolean;
  value: any;
};

type ErrorReponseData = {
  errorMessage: string;
  errorType: string;
  requestId: string;
  stackTrace: string[];
};

const isLambdaError = (
  res: QueryReturnValue<SecbrusApiResponseData | ErrorReponseData>
): res is QueryReturnValue<ErrorReponseData> =>
  !!res && !!res.data && isObject(res.data) && 'errorMessage' in res.data;

type BaseQueryResultParser<
  T = QueryReturnValue<
    SecbrusApiResponseData | ErrorReponseData,
    FetchBaseQueryError,
    any
  >
> = (result: T) => T;

export const handleLambdaError: BaseQueryResultParser = (result) =>
  isLambdaError(result)
    ? {
        error: { status: 500, data: result.data },
        meta: { ...(result.meta as any), status: 500, ok: false },
      }
    : result;
