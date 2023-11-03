import { CognitoUser as CognitoUserBase } from 'amazon-cognito-identity-js';

export interface CognitoSession {
  idToken: IdToken;
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  clockDrift: number;
}

export type SliceWithReducerPath<T, K extends string> = T & { reducerPath: K };

export type CallBack = (...args: any) => void;
export interface CognitoUser extends CognitoUserBase {
  username: string;
  pool: Pool;
  Session?: null;
  client: Client;
  signInUserSession: SignInUserSession;
  authenticationFlowType: string;
  storage: Storage;
  keyPrefix: string;
  userDataKey: string;
  attributes?: Attributes;
  preferredMFA: string;
  challengeParam?: challengeParam;
}

export interface challengeParam {
  userAttributes: Attributes;
  requiredAttributes: string[];
}

export interface Pool {
  userPoolId: string;
  clientId: string;
  client: Client;
  advancedSecurityDataCollectionFlag: boolean;
  storage: Storage;
}
export interface Client {
  endpoint: string;
  fetchOptions: FetchOptions;
}

export type FetchOptions = Record<string, unknown>;
export type Storage = Record<string, unknown>;

export interface SignInUserSession {
  idToken: IdToken;
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  clockDrift: number;
}
export interface IdToken {
  jwtToken: string;
  payload: Payload;
}
export interface Payload {
  sub: string;
  iss: string;
  'custom:userid': string;
  'cognito:username': string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  name: string;
  'custom:orgid': string;
  'custom:portalid': string;
  exp: number;
  iat: number;
  family_name: string;
  email: string;
  ' custom:isAdmin': string;
}
export interface RefreshToken {
  token: string;
}
export interface AccessToken {
  jwtToken: string;
  payload: Payload1;
}
export interface Payload1 {
  sub: string;
  device_key: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
  client_id: string;
  username: string;
}
export interface Attributes {
  sub: string;
  'custom:userid': string;
  name: string;
  'custom:orgid': string;
  'custom:sid': string;
  family_name: string;
  email: string;
  'custom:isAdmin': string;
}

export interface APIGateWayResponse<T> {
  success: boolean;
  message?: string;
  value: T;
}
