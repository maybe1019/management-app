/* eslint-disable camelcase */
import faker from 'faker';
import { generateIntegrations, Integrations } from './integrations';

export const AlertFiltersKeys = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const;
export type AlertFiltersType = typeof AlertFiltersKeys;

export const DataProviderFilterKeys = ['AWS', 'AZ', 'GCP'] as const;
export type DataProviderFilterType = typeof DataProviderFilterKeys;

export const ActionsKeys = ['new_violation'] as const;
export type ActionsTuple = typeof ActionsKeys;
export type ActionsType = ActionsTuple[number];

export const PolicyCategoryFilterKeys = [
  'Security_Best_Practices',
  'Access_Control_Authentication',
  'Audit_Logging',
  'Access_Control_Prohibit_Public_Access',
  'Encryption_Key_Management',
  'Access_Control_Password_Management',
  'Operations_Best_Practices',
  'Audit_Monitoring',
  'Security_Web_Application_Firewall',
  'Access_Control_Least_Privilege',
  'Encryption_Data_in_Transit',
  'Security_Network_Ports',
  'Operations_Backup_and_Disaster_Recovery',
  'Encryption_Data_at_Rest',
] as const;

export type PolicyCategoryFilterType = typeof PolicyCategoryFilterKeys;

export const AvailableFilters = [
  PolicyCategoryFilterKeys,
  AlertFiltersKeys,
  DataProviderFilterKeys,
].flat();

export type FilterTuple = typeof AvailableFilters;
export type FilterType = FilterTuple[number];

export interface Workflow {
  types: ActionsType[];
  filters: FilterType[];
  integrations: Integrations[];
  id: string;
}

const Factory = (): Workflow => ({
  types: [ActionsKeys[Math.floor(Math.random() * ActionsKeys.length)]],
  filters: [
    ...Array(Math.floor(Math.random() * 3) + 1)
      .fill('')
      .map(
        () =>
          AvailableFilters[Math.floor(Math.random() * AvailableFilters.length)]
      ),
  ],
  integrations: generateIntegrations(3),
  id: faker.random.uuid(),
});

export const generateWorkflows = (count: number): Workflow[] =>
  Array(count).fill(0).map(Factory);
