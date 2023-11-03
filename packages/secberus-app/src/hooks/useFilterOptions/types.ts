export type KeyNames =
  | 'category_id'
  | 'datasource_id'
  | 'datasource_type'
  | 'resource_data'
  | 'severity_label'
  | 'resource_id';

export type FilterData = Record<KeyNames, Record<string, boolean>>;
export interface DpiType {
  dp: string;
  id: string;
  name: string;
  org_id: string;
  verified: boolean;
}
export interface ResourceType {
  description: string;
  dp: string;
  example_data: any;
  id: string;
  name: string;
  score: number;
}
