import React from 'react';

export type OrgEvent = 'USER_ORG_CHANGE';

export const ORG_EVENTS = {
  userOrgChange: 'USER_ORG_CHANGE',
  orgInit: 'ORG_INITIALIZED',
};

export const orgBroadcastChannel = () => new BroadcastChannel('ORG_UPDATE');

export type OrgBroadcastChannelMessageEvent = MessageEvent<{
  event: OrgEvent;
  message: string;
}>;
export type OrgBroadcastChannelOnMessage = (
  ev: OrgBroadcastChannelMessageEvent
) => void;

type UseOrgBroadcastChannelArg = {
  onMessage: OrgBroadcastChannelOnMessage;
};

/**
 * Initializes Broadcast Channel for cross-tab communication of org change events.
 * The Broadcast channel allows us to monitor the user's org status across tabs.
 *
 * 
 * ## Usage
 * 
 * ### Initialize
 *
 * Initialize early on in your App's render cycle:
 *
 * ```tsx
const onMessage: OrgBroadcastChannelOnMessage = ev => {
  switch (event) {
    case ORG_EVENTS.userOrgChange:
      doStuff();
      break;
    default:
      break;
  }
};

const App = () => {
  useOrgBroadcastChannel({ onMessage });
  return <RestApp />;
};

 * ```
 *
 * ### Posting messages
 * 
 * ```ts
 * const channel = orgBroadcastChannel();
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
export const useOrgBroadcastChannel = ({
  onMessage,
}: UseOrgBroadcastChannelArg) => {
  const bc = orgBroadcastChannel();

  React.useEffect(() => {
    bc.onmessage = onMessage;
  }, [bc, onMessage]);

  React.useEffect(() => {
    return () => {
      bc.close();
    };
  }, [bc]);
};
