export const workflowFilters = values => ({
  filters: [
    {
      field: 'filters.datasource_id',
      label: 'Data sources',
      type: 'dataSource',
      values: values.dataSources,
      maxHeight: '200px',
      expanded: false,
    },
    {
      field: 'filters.category_id',
      label: 'Category',
      type: 'checkbox',
      values: values.categories,
      maxHeight: '200px',
      expanded: false,
    },
    {
      field: 'filters.resource.data',
      label: 'Resource data',
      type: 'search-key-value',
    },
    {
      field: 'filters.tags.data',
      label: 'Resource tags',
      type: 'search-key-value',
    },
    {
      field: 'filters.severity_label',
      label: 'Severity',
      type: 'severity',
      values: [
        { id: 'CRITICAL', label: 'Critical', value: 'CRITICAL' },
        { id: 'HIGH', label: 'High', value: 'HIGH' },
        { id: 'MEDIUM', label: 'Medium', value: 'MEDIUM' },
        { id: 'LOW', label: 'Low', value: 'LOW' },
      ],
      maxHeight: '100px',
      expanded: false,
    },
  ],
});

export const STRING_COMPARATORS = [
  'matches',
  'not_matches',
  'oneof',
  'prefix',
  'suffix',
  'regex',
];

export const NUMBER_COMPARATORS = ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'];

export const ARRAY_COMPARATORS = [
  'contains',
  'missing',
  'is_empty',
  'is_not_empty',
];

export const ALL_COMPARATORS = [
  ...STRING_COMPARATORS,
  ...NUMBER_COMPARATORS,
  ...ARRAY_COMPARATORS,
];

// todo: type this
export const WORKFLOW_BLOCKLIST = ['SPLUNK', 'SUMOLOGIC'];
