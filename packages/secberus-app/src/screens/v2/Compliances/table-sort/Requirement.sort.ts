import {
  isControl,
  MaybeComplianceControlOrFrameworkAugmentedWithTracking,
} from '../../../../utils/flattenFramework';
import { nestedSort, isPassing } from '../Compliances.util';

export const handleRequirementControlSort = (
  data: any[],
  col: string,
  dir: 'desc' | 'asc'
) => {
  switch (col) {
    case 'id': {
      return nestedSort(
        data,
        [
          (val: MaybeComplianceControlOrFrameworkAugmentedWithTracking) =>
            isPassing(val.violation_count as number),
        ],
        [dir]
      );
    }
    case 'description': {
      return nestedSort(
        data,
        [
          (val: MaybeComplianceControlOrFrameworkAugmentedWithTracking) => {
            const label = isControl(val) ? val.identifier : val.name;
            return label!.toLowerCase();
          },
        ],
        [dir]
      );
    }
    case 'failed_policy_count': {
      return nestedSort(data, 'failed_policy_count', [
        dir === 'asc' ? 'desc' : 'asc',
      ]);
    }
    case 'policy_count': {
      return nestedSort(data, 'policy_count', [dir === 'asc' ? 'desc' : 'asc']);
    }
    case 'violation_count': {
      return nestedSort(data, 'violation_count', [
        dir === 'asc' ? 'desc' : 'asc',
      ]);
    }
    default: {
      return data;
    }
  }
};
