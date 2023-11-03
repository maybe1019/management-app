import React from 'react';

export interface useTransitionBufferStateProps<T> {
  isLoading?: boolean;
  data?: readonly T[];
  stateTransitionBuffer?: number;
  disableStateTransitionBuffer?: boolean;
}

/**
 * This useEffect hook adds a buffer to when the loading state is updated.
 * Its resolution is as follows:
 * - Time buffer will be added unless `disableStateTransitionBuffer` is set to true
 * - If setting loading to true, use buffer
 * - If setting loading to false, use buffer. While waiting, if data becomes available,
 * cancel the remaining time left on the buffer and update the loading state. If no data
 * and buffer time expires, update load state with empty data; which results in no results table view.
 * @param isLoading - the loading state from the request
 * @param data - the data from the request
 * @param stateTransitionBuffer - buffer time in seconds
 * @param disableStateTransitionBuffer - whether to disable buffer all together
 */
export const useTableLoadTransitionBuffer = ({
  isLoading = false,
  data = [],
  stateTransitionBuffer = 0.6,
  disableStateTransitionBuffer = false,
}: useTransitionBufferStateProps<any>): boolean => {
  const [internalIsLoading, setInternalIsLoading] =
    React.useState<boolean>(isLoading);

  React.useEffect(() => {
    const syncLoadState = (): void => setInternalIsLoading(isLoading);
    const whenDataAvailable = () =>
      new Promise(resolve => {
        if (data.length > 0) return resolve(data);
      });

    let timeoutId: null | ReturnType<typeof window.setTimeout> = null;

    if (disableStateTransitionBuffer) {
      syncLoadState();
    } else {
      timeoutId = setTimeout(() => {
        syncLoadState();
      }, stateTransitionBuffer * 1000);

      if (!isLoading) {
        whenDataAvailable().then(() => {
          if (timeoutId) clearTimeout(timeoutId);
          syncLoadState();
        });
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [data, disableStateTransitionBuffer, isLoading, stateTransitionBuffer]);

  return internalIsLoading;
};
