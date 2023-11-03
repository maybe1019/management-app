import { HttpStatusCode } from '..';
import type { RequestErrorMessageOptions, StaggerOptions } from './middleware';

export type ResponseErrorData = {
  detail: string;
  requestid: string;
  title: string;
};

export type SecbrusApiResponseData = {
  message: string;
  success: boolean;
  value: any;
};

export type SecberusApiResponseError = {
  status: HttpStatusCode;
  data: ResponseErrorData | LambdaErrorResponseData;
};

export type SecberusAPIResponse<Error = SecberusApiResponseError> = {
  data: SecbrusApiResponseData;
  error?: Error;
};

export type LambdaErrorResponse = {
  data: LambdaErrorResponseData;
};

export interface UrlProxy {
  proxy?: string;
}

export type ExtraOptions =
  | (RequestErrorMessageOptions & StaggerOptions & UrlProxy)
  | undefined;

export type LambdaErrorResponseData = {
  errorMessage: string;
  errorType: string;
  requestId: string;
  stackTrace: string[];
};
