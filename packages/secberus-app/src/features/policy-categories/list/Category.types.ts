import { PolicyCategory } from '@secberus/services';

export interface CategoryColumnProps {
  editProps: {
    handleClick: (row: PolicyCategory) => void;
  };
}
