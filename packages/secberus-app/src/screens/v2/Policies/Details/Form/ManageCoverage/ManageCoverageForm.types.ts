import { Datasource } from '@secberus/services';
import { AnyFn } from '@secberus/utils';

export interface ManageCoverageFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  policyId: string;
  policyDataSources: Datasource[];
}

export interface useManageCoverageFormColumnsProps {
  selected?: string[];
  isAllOnPageSelected: boolean;
  handleSelectAllOnPage: AnyFn;
  handleSelectRow: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
