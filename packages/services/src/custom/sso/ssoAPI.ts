import { Hub, Auth } from 'aws-amplify';
import { createEnvAwareLogger } from '@secberus/utils';

export const CUSTOM_SSO_EVENTS = {
  ssoSignInFailure: 'CUSTOM_signIn_failure',
  ssoSignInSuccess: 'CUSTOM_ssoSignIn_success',
};

const dispatchSSOEvent = (event: string, data: any, message: string) => {
  Hub.dispatch(
    'sso',
    { event, data, message },
    'SSO',
    Symbol.for('@@amplify_default')
  );
};

export const federatedSignIn = async (idpName: string) => {
  const logger = createEnvAwareLogger();
  try {
    await Auth.federatedSignIn({
      customProvider: idpName!,
    });
    return true;
  } catch (err) {
    logger.log(`err`, err);
    dispatchSSOEvent(
      CUSTOM_SSO_EVENTS.ssoSignInFailure,
      err,
      `Something went wrong signing in`
    );
    return false;
  }
};
