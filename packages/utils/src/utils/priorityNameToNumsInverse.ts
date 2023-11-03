import { PriorityName, PriorityNum } from './priorityNameToNumRange';

const LOW: PriorityNum[] = [1, 2, 3];
const MEDIUM: PriorityNum[] = [4, 5, 6];
const HIGH: PriorityNum[] = [7, 8];
const CRITICAL: PriorityNum[] = [9, 10];

const priorities = {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
};

export const priorityNameToNumsInverse = (
  names: PriorityName[]
): PriorityNum[] => {
  const nums = names.reduce((acc: PriorityNum[], current: PriorityName) => {
    acc.push(...priorities[current]);
    return acc;
  }, []);

  const inversed = [...LOW, ...MEDIUM, ...HIGH, ...CRITICAL].filter(
    val => !nums.includes(val)
  );
  return inversed;
};
