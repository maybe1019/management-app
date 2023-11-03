import {
  ComplianceFrameworkList,
  Datasource,
  DatasourceType,
  PolicyCategory,
  Resource,
  RiskPostureParams,
} from '@secberus/services';
import { KeysToCamelCase, AnyFn } from '@secberus/utils';

export type QueryParams = KeysToCamelCase<
  Omit<Record<FilterField, string[]>, 'severity_label'> &
    Pick<RiskPostureParams, 'severity_label'>
>;

export type FilterField =
  | 'secberus_managed'
  | 'severity_label'
  | 'subscribed'
  | 'category_id'
  | 'compliance_id'
  | 'resource_id'
  | 'show_passing'
  | 'suppressed'
  | 'resource_data'
  | 'tag'
  | 'datasource_id'
  | 'datasource_type';

export type FilterValues = {
  category_id: PolicyCategory[];
  compliance_id: ComplianceFrameworkList;
  resource_id: Resource[];
  datasource_id: Datasource[];
  datasource_type: DatasourceType[];
};

export type FilterOpt = {
  field: FilterField;
  label: string;
  tagLabel?: string;
  type?: string;
  values?: {
    id?: string;
    label?: string;
    value?: boolean | string;
    icon?: JSX.Element | React.ElementType;
  }[];
};

export type FilterRequestList = Partial<
  Pick<
    Record<FilterField, AnyFn>,
    | 'category_id'
    | 'compliance_id'
    | 'resource_id'
    | 'datasource_id'
    | 'datasource_type'
  >
>;
