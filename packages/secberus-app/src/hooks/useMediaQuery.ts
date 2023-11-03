/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {
  createEnvAwareLogger,
  isClient,
  isApiSupported,
} from '@secberus/utils';

const errorMessage =
  'matchMedia is not supported, this could happen both because window.matchMedia is not supported by' +
  " your current browser or you're using the useMediaQuery hook whilst server side rendering.";

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
const useMediaQuery = (mediaQuery: string) => {
  const logger = createEnvAwareLogger();
  if (!isClient || !isApiSupported('matchMedia')) {
    logger.warn(errorMessage);
    return null;
  }

  const [isVerified, setIsVerified] = React.useState(
    !!window.matchMedia(mediaQuery).matches
  );

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

    mediaQueryList.addListener(documentChangeHandler);

    documentChangeHandler();
    return () => {
      mediaQueryList.removeListener(documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
};

export default useMediaQuery;
