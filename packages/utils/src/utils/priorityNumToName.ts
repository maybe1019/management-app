import { PriorityName, PriorityNum } from './priorityNameToNumRange';

export const priorityNumToName = (num: PriorityNum): PriorityName => {
  switch (true) {
    case num < 4:
      return 'LOW';
    case num < 7:
      return 'MEDIUM';
    case num < 9:
      return 'HIGH';
    default:
      return 'CRITICAL';
  }
};
