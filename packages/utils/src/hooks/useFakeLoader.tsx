import React from 'react';
import { getRandomInt } from '../utils';

/**
 * Fake loading. Simply returns true after a random time.
 * @param maxWaitTime - time in seconds
 * @param minWaitTime
 */
export const useFakeLoader = (
  maxWaitTime: number,
  minWaitTime = 1
): [boolean] => {
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const timeout = getRandomInt(maxWaitTime, minWaitTime) * 1000;
    setTimeout(() => {
      setLoading(false);
    }, timeout);
  }, [maxWaitTime, minWaitTime]);
  return [loading];
};
