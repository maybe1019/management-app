/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import {
  LambdaErrorResponse,
  SecberusApiResponseError,
} from '../baseQuery/definitions';

export const CUSTOM_REQUEST_EVENTS = {
  responseReceieved: 'CUSTOM_response_received',
  responseError: 'CUSTOM_response_error',
} as const;

export type CustomRequestEvents =
  typeof CUSTOM_REQUEST_EVENTS[keyof typeof CUSTOM_REQUEST_EVENTS];

export const requestBroadcastChannel = () =>
  new BroadcastChannel('REQUEST_EVENTS');

type BroadcastMessage<T = CustomRequestEvents> = {
  event: T;
  url: string;
  responseHeaders: Headers;
  requestHeaders: Headers;
};
type RequestBroadcastChannelMessageError =
  | (
      | LambdaErrorResponse['data']
      | (SecberusApiResponseError['status'] & SecberusApiResponseError['data'])
    ) &
      BroadcastMessage<typeof CUSTOM_REQUEST_EVENTS.responseError>;

type RequestBroadcastChannelMessageResponse = BroadcastMessage<
  typeof CUSTOM_REQUEST_EVENTS['responseReceieved']
> & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  result: object;
};

export type RequestBroadcastChannelMessage =
  | RequestBroadcastChannelMessageError
  | RequestBroadcastChannelMessageResponse;

export type RequestBroadcastChannelOnMessage = (
  ev: MessageEvent<RequestBroadcastChannelMessage>
) => void;

type UseRequestBroadcastChannelArg = {
  onMessage: RequestBroadcastChannelOnMessage;
};

/**
 * Initializes Broadcast Channel for cross-tab communication of request events.
 * This Broadcast channel allows us to easily pass messages between our fetch wrapper and a consumer.
 *
 * 
 * ## Usage
 * 
 * ### Initialize
 *
 * Initialize early on in your App's render cycle:
 *
 * ```tsx
const onMessage: RequestBroadcastChannelOnMessage = ev => {
  switch (event) {
    case REQUEST_EVENTS.error:
      notify(event.message)
      break;
    default:
      break;
  }
};

const App = () => {
  useRequestBroadcastChannel({ onMessage });
  return <RestApp />;
};

 * ```
 *
 * ### Posting messages
 * 
 * ```ts
 * const channel = RequestBroadcastChannel();
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
export const useRequestBroadcastChannel = ({
  onMessage,
}: UseRequestBroadcastChannelArg) => {
  const bc = requestBroadcastChannel();

  React.useEffect(() => {
    bc.onmessage = onMessage;
  }, [bc, onMessage]);

  React.useEffect(() => {
    return () => {
      bc.close();
    };
  }, [bc]);
};
