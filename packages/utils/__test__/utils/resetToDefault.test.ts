//NOTE: util got moved to components package

//import { resetToDefault } from '../../src/utils/resetToDefault';

test.skip('Reset To Default: Default Values are in correct format', () => {
  //const results = resetToDefault(sampleData, defaultOptions);
  //expect(results).toMatchObject(objectToMatch);
});

// const objectToMatch = {
//   datasource_id: { abc: false, '123': false, xyz: false, d4eKIKuefy3U: false },
//   severity_label: {
//     CRITICAL: false,
//     HIGH: false,
//     LOW: false,
//     MEDIUM: false,
//   },
//   show_passing: {
//     true: false,
//   },
//   category_id: { CzKNR5fCK5wt: false, m8AAKE8a8yrR: false },
//   resource_id: {
//     Vmbp9UWanDkZEYXfPUJ6nk: false,
//     Y8WWrtsxWYy4yKPhSncSkH: false,
//     '2Qi2iGbCYeRx6gJd4GPRHo': false,
//   },
//   tag: {},
//   resource_data: {},
// };

// const defaultOptions = {
//   secberus_managed: { true: false },
//   datasource_id: false,
//   severity_label: {
//     CRITICAL: false,
//     HIGH: false,
//     LOW: false,
//     MEDIUM: false,
//   },
//   suppressed: { true: false },
//   subscribed: {
//     true: false,
//   },
//   show_passing: {
//     true: false,
//   },
//   category_id: false,
//   compliance_id: false,
//   resource_id: false,
//   tag: {},
//   resource_data: {},
// };

// const sampleData = {
//   filters: [
//     {
//       field: 'show_passing',
//       label: 'Show passing',
//       values: [
//         {
//           id: 'true',
//           label: 'Show passing policies',
//         },
//       ],
//     },
//     {
//       field: 'datasource_id',
//       label: 'Data sources',
//       type: 'dataSource',
//       values: [
//         {
//           id: 'abc',
//           name: 'dev-playground-role',
//           datasource_type_id: 'AWS',
//           verified: false,
//           org_id: 'mytest25',
//         },
//         {
//           id: '123',
//           name: 'secberus-dev',
//           datasource_type_id: 'AWS',
//           verified: true,
//           org_id: 'mytest25',
//         },
//         {
//           id: 'xyz',
//           name: 'secberus_azure',
//           datasource_type_id: 'Azure',
//           verified: true,
//           org_id: 'mytest25',
//         },
//         {
//           id: 'd4eKIKuefy3U',
//           name: 'Production-PeakCap02',
//           datasource_type_id: 'GCP',
//           verified: false,
//           org_id: 'mytest25',
//         },
//       ],
//     },
//     {
//       field: 'severity_label',
//       label: 'Severity',
//       type: 'severity',
//       values: [
//         {
//           id: 'CRITICAL',
//           label: 'Critical',
//           value: 'CRITICAL',
//         },
//         {
//           id: 'HIGH',
//           label: 'High',
//           value: 'HIGH',
//         },
//         {
//           id: 'MEDIUM',
//           label: 'Medium',
//           value: 'MEDIUM',
//         },
//         {
//           id: 'LOW',
//           label: 'Low',
//           value: 'LOW',
//         },
//       ],
//     },
//     {
//       field: 'category_id',
//       label: 'Categories',
//       values: [
//         {
//           id: 'CzKNR5fCK5wt',
//           name: 'Access Control: Authentication',
//           description: 'Access Control: Authentication',
//           category_type: 'SECURITY',
//           secberus_managed: true,
//           policy_count: 9,
//         },
//         {
//           id: 'm8AAKE8a8yrR',
//           name: 'Access Control: Least Privilege',
//           description: 'Access Control: Least Privilege',
//           category_type: 'SECURITY',
//           secberus_managed: true,
//           policy_count: 26,
//         },
//       ],
//     },
//     {
//       field: 'resource_id',
//       label: 'Resource type',
//       type: 'dataSource',
//       values: [
//         {
//           id: 'Vmbp9UWanDkZEYXfPUJ6nk',
//           name: 'aws_apigatewayv2_stage',
//           description: 'API Gateway V2 Stage',
//           identifier: ['region', 'api_id', 'stage_name'],
//           query: 'SELECT * FROM aws_apigatewayv2_api_stages',
//           example_data: {},
//           datasource_types: ['AWS'],
//           hidden: false,
//         },
//         {
//           id: 'Y8WWrtsxWYy4yKPhSncSkH',
//           name: 'aws_apigateway_client_certificate',
//           description: 'API Gateway Client Certificate',
//           identifier: ['region', 'client_certificate_id'],
//           query: 'SELECT * FROM aws_apigateway_client_certificates;',
//           example_data: {},
//           datasource_types: ['AWS'],
//           hidden: false,
//         },
//         {
//           id: '2Qi2iGbCYeRx6gJd4GPRHo',
//           name: 'aws_apigateway_rest_api',
//           description: 'API Gateway REST API',
//           identifier: ['region', 'resource_id'],
//           query: 'SELECT * FROM aws_apigateway_rest_apis',
//           example_data: {},
//           datasource_types: ['AWS'],
//           hidden: false,
//         },
//       ],
//     },
//     {
//       field: 'tag',
//       label: 'Resource tags',
//       type: 'search-key-value',
//     },
//     {
//       field: 'resource_data',
//       label: 'Resource data',
//       type: 'search-key-value',
//       tooltipInfo:
//         'Supported operators are key:, :value or key:value. Eg.: region: or :us-east-1 or region:us-east-1',
//     },
//   ],
// };

export {};
