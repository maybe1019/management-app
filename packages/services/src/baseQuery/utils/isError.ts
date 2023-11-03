import {
  LambdaErrorResponse,
  SecberusAPIResponse,
  SecberusApiResponseError,
} from '../definitions';

export const isError = (
  res: SecberusAPIResponse | LambdaErrorResponse
): res is Required<SecberusAPIResponse<SecberusApiResponseError>> =>
  'error' in res;
