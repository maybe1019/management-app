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
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { layout } from '../features/layout/slice/layout';
import { orgContext } from '../features/organization/slice';
import { attributesContext } from '../features/attributes/slice';
import { policyEditorReducer } from '../features/policy-editor/slice';
import uiReducer from './reducers/ui';
import navReducer from './reducers/nav';
import filtersReducer from './reducers/filters';
import workers from './reducers/workers';
import { notificationReducer } from './index';

const uiPersistConfig = {
  key: 'ui',
  storage,
};

export const rootReducer = combineReducers({
  [dataSourceApi.reducerPath]: dataSourceApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [complianceFrameworksApi.reducerPath]: complianceFrameworksApi.reducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  [workflowsApi.reducerPath]: workflowsApi.reducer,
  [policiesApi.reducerPath]: policiesApi.reducer,
  [policiesApi2.reducerPath]: policiesApi2.reducer,
  [reportSchedulesApi.reducerPath]: reportSchedulesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [ssoApi.reducerPath]: ssoApi.reducer,
  [logsApi.reducerPath]: logsApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  orgContext,
  attributesContext,
  policyEditorContext: policyEditorReducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [ssoSlice.reducerPath]: ssoSlice.reducer,
  [ssoApi2.reducerPath]: ssoApi2.reducer,
  [userAttributesSlice.reducerPath]: userAttributesSlice.reducer,
  [secberusApiGW.reducerPath]: secberusApiGW.reducer,
  [secberusApi.secberusApi.reducerPath]: secberusApi.secberusApi.reducer,
  filters: filtersReducer,
  nav: navReducer,
  ui: persistReducer(uiPersistConfig, uiReducer),
  workers,
  layout,
  notification: notificationReducer,
});
