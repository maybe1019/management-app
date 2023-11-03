import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithPlugins } from '../baseQuery/baseQuery';

export const secberusApiGenerated = createApi({
  baseQuery: baseQueryWithPlugins,
  endpoints: () => ({}),
  reducerPath: 'secberusApi',
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
