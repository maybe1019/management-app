import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Router as ReactRouterDomRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@secberus/components';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from '../../store/storeWebConfig';
import { ErrorBoundary } from './ErrorBoundaries';
import RouteListener from './RouteListener';
import { WithNotifications } from '../../components/Notification/WithNotifications';
import WithConnections from '../../components/Connections/WithConnections';
import WithBroadcastChannels from './BroadcastChannel/WithBroadcastChannels';
import useLoader from '../../hooks/useLoader';
import WithLoader from './WithLoader';
import ComponentToCallHook from './ComponentToCallHook';
import { LayoutComponent } from '../../features/layout/Layout.component';
import { AmplifyWrapper } from '../../features/auth/components';
import { CacheBuster } from '../../features/cache-buster/CacheBuster.component';
import { CACHE_BUSTING_ENABLED } from '../../constants';
import { WithFindSelf } from '../../app/core/wrappers/WithFindSelf';
import { WithResources } from '../../app/core/wrappers/WithResources';
import { WithAuthGatedUserContext } from '../../app/core/wrappers/WithUserContext';
import { SessionProvider } from './SessionProvider';
import { createGlobalStyle } from 'styled-components';

/**
 * @description Allows us to customize CSS variables of different packages.
 * It is required to be a global style for the root configuration to work.
 * Do not apply any other styling than the configurations of variables here!
 */
const GlobalVariableConfig = createGlobalStyle`
  :root {
    --focus-border: ${({ theme }) => theme.colors['blue']} !important;
    --separator-border: ${({ theme }) =>
      theme.colors['medium-gray']} !important;
    --sash-hover-size: 4px;
  }
`;

const Wrapper = ({ children, store, persistor }) => {
  return (
    <Provider store={store}>
      <WithLoader>
        <PersistGate
          persistor={persistor}
          loading={
            <ComponentToCallHook hook={useLoader} args={['persist', true]} />
          }
        >
          <ThemeProvider theme={theme}>
            <GlobalVariableConfig />
            <ChakraProvider>
              <ReactRouterDomRouter history={history}>
                <AmplifyWrapper>
                  <WithConnections>
                    <ErrorBoundary>
                      <RouteListener>
                        <WithNotifications>
                          <WithBroadcastChannels>
                            <WithAuthGatedUserContext>
                              <SessionProvider>
                                <WithFindSelf>
                                  <WithResources>
                                    <LayoutComponent>
                                      <ErrorBoundary>
                                        <Suspense
                                          fallback={
                                            <ComponentToCallHook
                                              hook={useLoader}
                                              args={['suspense', true]}
                                            />
                                          }
                                        >
                                          {children}
                                        </Suspense>
                                      </ErrorBoundary>
                                    </LayoutComponent>
                                  </WithResources>
                                </WithFindSelf>
                              </SessionProvider>
                            </WithAuthGatedUserContext>
                          </WithBroadcastChannels>
                          <CacheBuster enable={CACHE_BUSTING_ENABLED} />
                        </WithNotifications>
                      </RouteListener>
                    </ErrorBoundary>
                  </WithConnections>
                </AmplifyWrapper>
              </ReactRouterDomRouter>
            </ChakraProvider>
          </ThemeProvider>
        </PersistGate>
      </WithLoader>
    </Provider>
  );
};

export default Wrapper;
