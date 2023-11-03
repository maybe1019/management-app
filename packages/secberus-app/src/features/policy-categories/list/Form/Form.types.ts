import { PolicyCategory } from '@secberus/services';

export type PolicyCategoryWithCustomPolicyCount = PolicyCategory &
  Record<'policy_count', number>;

export interface CategoryFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editData?: PolicyCategoryWithCustomPolicyCount;
}

export interface MigrationForm {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string;
}

export interface DeleteCategoryTextProps {
  policy_count: number;
  category_name: string;
}

export type CategoryFormFields = Pick<PolicyCategory, 'name' | 'category_type'>;
