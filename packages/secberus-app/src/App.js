import React from 'react';
import { persistor, store } from './store/storeWebConfig';
import Wrappers from './utils/wrappers';
import { Router } from './app/routing/Router.component';
import { addNotification } from './store';
import { forceRefreshToken } from '@secberus/services';

import * as Sentry from '@sentry/react';
import { Integrations as SentryIntegrations } from '@sentry/tracing';
import { createEnvAwareLogger, parseJwt } from '@secberus/utils';

const useDebugHelpers = () => {
  const enable =
    process.env.REACT_APP_DEPLOYED_ENV !== 'prod' || window.SCBRS_DEBUG;
  React.useEffect(() => {
    const logger = createEnvAwareLogger();
    if (!enable) return;
    window.store = store;
    window.makeToast = ({
      message = 'this is a test',
      count = 1,
      type,
      delay = 1000,
    } = {}) => {
      for (let x = 0; x < count; x++)
        setTimeout(() => {
          store.dispatch(
            addNotification({
              type: type ?? x % 2 ? 'success' : 'fail',
              message: `${message} - ${x}`,
            })
          );
        }, x * delay);
    };
    window.forceRefresh = () => store.dispatch(forceRefreshToken());
    window.logAccessToken = () => {
      const key = Object.keys(localStorage).find(k => k.includes('access'));
      logger.log('key', localStorage[key]);
    };
    window.revokeAccessToken = () => {
      const key = Object.keys(localStorage).find(k => k.includes('access'));
      logger.log('before', localStorage[key]);
      localStorage[key] = '';
      logger.log('key', localStorage[key]);
    };
    window.revokeRefreshToken = () => {
      const key = Object.keys(localStorage).find(k => k.includes('refresh'));
      logger.log('before', localStorage[key]);
      localStorage[key] = '';
      logger.log('after', localStorage[key]);
    };
    window.parseJWT = parseJwt;
  }, [enable]);
};

if (process.env.REACT_APP_DEPLOYED_ENV) {
  Sentry.init({
    normalizeDepth: 4,
    dsn: `https://1721708dd13548c18dbe81c4c8f979f2@o272608.ingest.sentry.io/5277648`,
    environment: process.env.REACT_APP_DEPLOYED_ENV,
    release: `secberus-app@${process.env.REACT_APP_VERSION}`,
    integrations: [
      new SentryIntegrations.BrowserTracing({
        // eslint-disable-next-line no-restricted-globals
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
      }),
    ],
    tracesSampleRate: 1.0,
  });
}

const App = () => {
  useDebugHelpers();
  return (
    <Wrappers store={store} persistor={persistor}>
      <Router />
    </Wrappers>
  );
};

export default App;
