/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

export const CUSTOM_AUTH_EVENTS = {
  signInFailure: 'CUSTOM_signIn_failure',
  signOutFailure: 'CUSTOM_signOut_failure',
  sessionExpired: 'CUSTOM_sessionExpired',
  signOut: 'CUSTOM_signOut',
  ssoSignInSuccess: 'CUSTOM_ssoSignIn_success',
} as const;

export type CustomAuthEvents =
  typeof CUSTOM_AUTH_EVENTS[keyof typeof CUSTOM_AUTH_EVENTS];

export const authBroadcastChannel = () => new BroadcastChannel('AUTH_UPDATE');

export type AuthBroadcastChannelMessageEvent = MessageEvent<{
  event: CustomAuthEvents;
  message: string;
}>;
export type AuthBroadcastChannelOnMessage = (
  ev: AuthBroadcastChannelMessageEvent
) => void;

type UseAuthBroadcastChannelArg = {
  onMessage: AuthBroadcastChannelOnMessage;
};

/**
 * Initializes Broadcast Channel for cross-tab communication of auth events.
 * The Broadcast channel allows us to monitor the user's session across tabs, and,
 * on a log out event, log out of all tab sessions, providing a much more secure session.
 *
 * 
 * ## Usage
 * 
 * ### Initialize
 *
 * Initialize early on in your App's render cycle:
 *
 * ```tsx
const onMessage: AuthBroadcastChannelOnMessage = ev => {
  switch (event) {
    case CUSTOM_AUTH_EVENTS.signOut:
      logout();
      break;
    default:
      break;
  }
};

const App = () => {
  useAuthBroadcastChannel({ onMessage });
  return <RestApp />;
};

 * ```
 *
 * ### Posting messages
 * 
 * ```ts
 * const channel = authBroadcastChannel();
 * channel.postMessage({ event: 'SOME_EVENT', message: 'it happened' });
 * ```
 * 
 * ### Closing the channel
 * 
 * The channel will need to be closed any time you want an entirely new instance of the channel, 
 * e.g. unmounting the app or another high level component.
 * 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
 */
export const useAuthBroadcastChannel = ({
  onMessage,
}: UseAuthBroadcastChannelArg) => {
  const authChannel = authBroadcastChannel();

  React.useEffect(() => {
    authChannel.onmessage = onMessage;
  }, [authChannel, onMessage]);

  React.useEffect(() => {
    return () => {
      authChannel.close();
    };
  }, [authChannel]);
};
