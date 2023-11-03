import { STRING_COMPARATORS } from '../../../Workflows/Workflows.constants';

export const ComparatorItems = STRING_COMPARATORS.map(comparator => ({
  id: comparator,
  value: comparator,
}));
