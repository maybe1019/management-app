import { PriorityName, PriorityNum } from './priorityNameToNumRange';

export const priorityNameToNums = (name: PriorityName): PriorityNum[] => {
  switch (name) {
    case 'LOW':
      return [1, 2, 3];
    case 'MEDIUM':
      return [4, 5, 6];
    case 'HIGH':
      return [7, 8];
    case 'CRITICAL':
      return [9, 10];
    default:
      return [];
  }
};
