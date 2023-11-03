import { Hub, Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { createEnvAwareLogger } from '@secberus/utils';
import { CallBack } from '../../definitions';
import { authBroadcastChannel, CUSTOM_AUTH_EVENTS } from '../../messaging';

const logger = createEnvAwareLogger();

export const dispatchAuthEvent = (
  event: string,
  data: any,
  message: string
): void => {
  Hub.dispatch(
    'auth',
    { event, data, message },
    'Auth',
    Symbol.for('@@amplify_default')
  );
  const bc = authBroadcastChannel();
  bc.postMessage({ event, message });
};

/**
 * Undocumented method to force refresh cognito session
 */
export const forceRefreshToken = async () => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = (await Auth.currentSession()) as any;
    const { idToken } = await new Promise((resolve, reject) => {
      cognitoUser.refreshSession(
        currentSession.refreshToken,
        (error: any, session: any) => {
          if (error) return reject(error);
          return resolve(session);
        }
      );
    });
    return idToken as { jwtToken: string };
  } catch (err) {
    logger.error(err);
    // dispach message session expired
    dispatchAuthEvent(
      CUSTOM_AUTH_EVENTS.sessionExpired,
      err,
      `Session has expired`
    );
    return null;
  }
};

type Signout = ({
  onSuccess,
  onError,
}: {
  onSuccess?: CallBack;
  onError?: CallBack;
}) => Promise<boolean>;
export const signOut: Signout = async ({ onSuccess, onError } = {}) => {
  try {
    // thunkApi.dispatch(setHardLoading(true));
    // TODO purge persisted storage
    const user = await Auth.currentUserPoolUser();
    // Amplify handles cleaning session
    await new Promise<void>((res, reject) => {
      user.globalSignOut({
        onSuccess: () => {
          user.signOut();
          dispatchAuthEvent(
            CUSTOM_AUTH_EVENTS.signOut,
            user,
            `A user has been signed out`
          );
          onSuccess && onSuccess(user);
          res();
        },
        onFailure: (e: any) => {
          logger.error(e);
          onError && onError(e);
          reject('Sign out failure. May already have been signed out');
        },
      });
    });
    return true;
  } catch (err) {
    // If cognito log out fails, assume session is invalid and clear storage.

    // dispatch sign out message
    dispatchAuthEvent(
      CUSTOM_AUTH_EVENTS.signOutFailure,
      err,
      `Something went wrong signing out`
    );
    onError && onError(err);
    return false;
  }
};

export type AuthError = {
  code?: string;
  message: string;
  name?: string;
};
export type SignInResponse =
  | (CognitoUser & { challengeName?: 'NEW_PASSWORD_REQUIRED' })
  | AuthError;

export const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<SignInResponse> => {
  try {
    const user = (await Auth.signIn(username, password)) as CognitoUser;

    if (!user) throw new Error('Something went wrong signing in');
    return user;
  } catch (err) {
    dispatchAuthEvent(
      CUSTOM_AUTH_EVENTS.signInFailure,
      err,
      `Something went wrong signing in`
    );
    return err as AuthError;
  }
};

export const completeNewPassword = async ({
  user,
  newPassword,
}: {
  user: CognitoUser;
  newPassword: string;
}): Promise<SignInResponse> => {
  return await Auth.completeNewPassword(user, newPassword)
    .then((user) => {
      if (!user) throw new Error('Something went wrong signing in');
      return user;
    })
    .catch((err) => {
      dispatchAuthEvent(
        CUSTOM_AUTH_EVENTS.signInFailure,
        err,
        `Something went wrong signing in`
      );
      return err as AuthError;
    });
};

type ForgotPasswordResponse = {
  AttributeName: string;
  DeliveryMedium: string;
  Destination: string;
};
export const forgotPassword = async ({
  username,
}: {
  username: string;
}): Promise<{ err: AuthError } | ForgotPasswordResponse> => {
  return await Auth.forgotPassword(username)
    .then((res) => {
      if (!res) throw new Error('Something went wrong resetting password');
      return res;
    })
    .catch((err) => {
      logger.error(err);
      return { err };
    });
};

export const forgotPasswordSubmit = async ({
  username,
  code,
  newPassword,
}: {
  username: string;
  code: string;
  newPassword: string;
}): Promise<{ err: AuthError } | void | string> => {
  return await Auth.forgotPasswordSubmit(username, code, newPassword).catch(
    (err) => {
      logger.error(err);
      return { err };
    }
  );
};

export const changePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}): Promise<AuthError | 'SUCCESS'> => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  return await Auth.changePassword(cognitoUser, oldPassword, newPassword)
    .then((user) => {
      if (!user) throw new Error('Something went wrong signing in');
      return user;
    })
    .catch((err) => {
      logger.error(err);
      return err as AuthError;
    });
};

export const AmplifyAuth = Auth;
export const AmplifyHub = Hub;
