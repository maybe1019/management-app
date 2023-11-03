import { CRITICAL, HIGH, LOW, MEDIUM } from './constants';

export const getPriorityStatusString = (
  priorityNum?: number,
  priorityVal?: string
): string | null => {
  let value = null;
  if (priorityVal) value = priorityVal.toUpperCase();
  if (priorityNum && priorityNum < 4) value = LOW;
  if (priorityNum && priorityNum >= 4 && priorityNum < 7) value = MEDIUM;
  if (priorityNum && priorityNum >= 7 && priorityNum < 9) value = HIGH;
  if (priorityNum && priorityNum >= 9) value = CRITICAL;
  return value;
};
