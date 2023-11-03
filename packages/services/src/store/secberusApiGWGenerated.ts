import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithPlugins } from '../baseQuery/baseQuery';

export const secberusApiGWGenerated = createApi({
  baseQuery: baseQueryWithPlugins,
  endpoints: () => ({}),
  reducerPath: 'secberusApiGW',
  tagTypes: [
    'AccessPolicy',
    'Category',
    'ComplianceFramework',
    'DataSource',
    'DataSourceType',
    'Exception',
    'Explorer',
    'ExplorerTables',
    'ExplorerViews',
    'ExplorerQueries',
    'Integration',
    'Log',
    'Metrics',
    'Organization',
    'Policy',
    'Report',
    'Role',
    'SSO',
    'User',
    'Violation',
    'Workflow',
  ],
});
