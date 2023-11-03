// import * as Sentry from '@sentry/react';
// import { Integrations as SentryIntegrations } from '@sentry/tracing';
import thunk from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import analytics from '../customMiddleware/analytics';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import {
  secberusApiGW,
  secberusApi,
  dataSourceApi,
  workflowsApi,
  categoriesApi,
  policiesApi,
  policiesApi2,
  complianceFrameworksApi,
  userAttributesSlice,
  reportSchedulesApi,
  userApi,
  rolesApi,
  ssoApi,
  ssoApi2,
  logsApi,
  organizationApi,
  uploadApi,
  authSlice,
  ssoSlice,
} from '@secberus/services';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'authentication',
    'organizations',
    'users',
    'layout',
    'filters',
    'orgContext',
    'userAttributes',
    'sso',
  ],
  stateReconciler: autoMergeLevel2,
};

export const resettableReducer = (state, action) => {
  if (action?.type === 'store/reset') {
    storage.removeItem('persist:root');
    const { notification } = state;
    // preserve notifications on log out so we can tell the user why they may have been logged out
    state = { notification };
  }

  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, resettableReducer);

// Workers reducer is passing both non serializable AND making state mutations. Worker mgmt should be rmd from redux in future but for now ignoring.
export const createStore = options =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false, // disable this as our state is rather large currently and it affects dev perf
        serializableCheck: {
          // redux checks against non-seriazable values.. but redux-persist requires them.
          // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            'WORKER_SET_ATTRIBUTE',
          ],
          ignoredPaths: ['ui', 'workers'],
          ignoredActionPaths: ['ui', 'workers'],
        },
      }).concat(
        thunk,
        analytics,
        secberusApi.secberusApi.middleware,
        secberusApiGW.middleware,
        dataSourceApi.middleware,
        workflowsApi.middleware,
        categoriesApi.middleware,
        policiesApi.middleware,
        organizationApi.middleware,
        uploadApi.middleware,
        policiesApi2.middleware,
        reportSchedulesApi.middleware,
        userApi.middleware,
        rolesApi.middleware,
        ssoApi.middleware,
        ssoApi2.middleware,
        logsApi.middleware,
        complianceFrameworksApi.middleware
      ),
    ...options,
  });

export const store = createStore();
setupListeners(store.dispatch);
export const persistor = persistStore(store);
export const history = createBrowserHistory();
