import { orderBy } from 'lodash';
import { nestedSort } from '../Compliances.util';

export const handleControlPoliciesSort = (
  data: any[],
  col: string,
  dir: 'desc' | 'asc'
) => {
  switch (col) {
    case 'name': {
      return orderBy(data, 'name', [dir]);
    }
    case 'severity': {
      return orderBy(data, 'severity', [dir]);
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
