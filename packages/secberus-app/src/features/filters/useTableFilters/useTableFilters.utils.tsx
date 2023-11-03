import {
  SecberusSymbolLight,
  UserLight,
  SwitchOn,
  SwitchOff,
} from '@secberus/icons';
import { FilterValues, FilterField, FilterOpt } from './useTableFilters.types';

export const defaultOptions = {
  secberus_managed: { true: false, false: false },
  datasource_id: false,
  datasource_type: false,
  severity_label: {
    CRITICAL: false,
    HIGH: false,
    LOW: false,
    MEDIUM: false,
  },
  suppressed: { true: false, false: false },
  subscribed: { true: false, false: false },
  show_passing: {
    true: false,
  },
  category_id: false,
  compliance_id: false,
  resource_id: false,
  tag: {},
  resource_data: {},
};

export const getFilterOptions = ({
  values,
  fields = [],
}: {
  values?: FilterValues;
  fields: FilterField[];
}) => {
  const opts: (Record<string, any> & FilterOpt)[] = [
    {
      field: 'secberus_managed',
      label: 'Author',
      values: [
        {
          id: 'true',
          label: 'Secberus',
          value: true,
          icon: SecberusSymbolLight,
        },
        { id: 'false', label: 'Custom', value: false, icon: UserLight },
      ],
    },
    {
      field: 'show_passing',
      label: 'Show passing',
      values: [
        {
          id: 'true',
          label: 'Show passing policies',
        },
      ],
    },
    {
      field: 'datasource_type',
      label: 'Data source type',
      type: 'dataSourceType',
      values: [...(values?.datasource_type ?? [])].sort((a, b) => {
        const nameA = a?.name.toUpperCase();
        const nameB = b?.name.toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }),
    },
    {
      field: 'datasource_id',
      label: 'Data source name',
      type: 'dataSource',
      values: [...(values?.datasource_id ?? [])].sort((a, b) => {
        const nameA = a?.name.toUpperCase();
        const nameB = b?.name.toUpperCase();
        const typeA = a?.datasource_type_id.toUpperCase();
        const typeB = b?.datasource_type_id.toUpperCase();

        if (typeA < typeB) return -1;
        if (typeA > typeB) return 1;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }),
    },
    {
      field: 'suppressed',
      label: 'Exceptions',
      values: [
        { id: 'false', label: 'Active violations', value: 'active' },
        { id: 'true', label: 'Exceptions', value: 'suppressed' },
      ],
    },
    {
      field: 'severity_label',
      label: 'Severity',
      type: 'severity',
      values: [
        { id: 'CRITICAL', label: 'Critical', value: 'CRITICAL' },
        { id: 'HIGH', label: 'High', value: 'HIGH' },
        { id: 'MEDIUM', label: 'Medium', value: 'MEDIUM' },
        { id: 'LOW', label: 'Low', value: 'LOW' },
      ],
    },
    {
      field: 'subscribed',
      label: 'Status',
      values: [
        { id: 'true', label: 'On', value: true, icon: SwitchOn },
        { id: 'false', label: 'Off', value: false, icon: SwitchOff },
      ],
    },
    {
      field: 'category_id',
      label: 'Categories',
      values: [...(values?.category_id ?? [])].sort((a, b) => {
        const nameA = a?.name.toUpperCase();
        const nameB = b?.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }),
    },
    {
      field: 'compliance_id',
      label: 'Frameworks',
      values: [...(values?.compliance_id ?? [])].sort((a, b) => {
        const nameA = a?.name!.toUpperCase();
        const nameB = b?.name!.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }),
    },
    {
      field: 'resource_id',
      label: 'Resource type',
      type: 'dataSource',
      values: [...(values?.resource_id ?? [])].sort((a, b) => {
        const nameA = a?.name.toUpperCase();
        const nameB = b?.name.toUpperCase();
        const typeA = a?.datasource_types?.[0].toUpperCase() as string;
        const typeB = b?.datasource_types?.[0].toUpperCase() as string;

        if (typeA < typeB) return -1;
        if (typeA > typeB) return 1;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }),
    },
    {
      field: 'tag',
      label: 'Resource tags',
      type: 'search-key-value',
    },
    {
      field: 'resource_data',
      label: 'Resource data',
      type: 'search-key-value',
      tooltipInfo:
        'Supported operators are key:, :value or key:value. Eg.: region: or :us-east-1 or region:us-east-1',
    },
  ];

  const picked = opts.filter(a => fields.includes(a.field));

  return picked;
};
