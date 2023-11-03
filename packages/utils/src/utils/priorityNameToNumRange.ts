export type PriorityName = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type PriorityNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const priorityNameToNumRange = (
  name: PriorityName
): { low: PriorityNum; high: PriorityNum } => {
  switch (name) {
    case 'LOW':
      return { low: 1, high: 2 };
    case 'MEDIUM':
      return { low: 3, high: 6 };
    case 'HIGH':
      return { low: 7, high: 8 };
    case 'CRITICAL':
      return { low: 9, high: 10 };
    default:
      return { low: 1, high: 10 };
  }
};
