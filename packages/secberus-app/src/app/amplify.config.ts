import { ROOT_URL } from '../store/api/constants';

const identityPoolId =
  process.env.REACT_APP_IDENTITY_POOL_ID ||
  'us-east-1:3a5e6c6a-bc7a-4fc9-9371-4c5850d2c9db';
const region = process.env.REACT_APP_AWS_REGION || 'us-east-1';
const userPoolId = process.env.REACT_APP_USER_POOL_ID || 'us-east-1_VFBSt1J87';
const userPoolWebClientId =
  process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || '5e5psmmlgk2qr2lrpc10563vs1';
const domain = process.env.REACT_APP_COGNITO_DOMAIN || 'sso-dev.secberus.io';
const redirectSignIn = ROOT_URL + '/auth/callback';
const redirectSignOut = ROOT_URL;
const responseType = 'code';

export const amplifyConfig = {
  Auth: {
    region,
    identityPoolId,
    userPoolId,
    userPoolWebClientId,
    oauth: {
      domain,
      scope: ['email', 'profile', 'openid'],
      redirectSignIn,
      redirectSignOut,
      responseType,
      mandatorySignIn: true,
    },
  },
};
