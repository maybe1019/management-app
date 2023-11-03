export const CRITICAL = 'critical';
export const HIGH = 'high';
export const MEDIUM = 'medium';
export const LOW = 'low';
export const SUPPRESSED = 'suppressed';

export const PRIORITIES = [CRITICAL, HIGH, MEDIUM, LOW];

export const PRIORITY_VALS = {
  critical: [9, 10],
  high: [7, 8],
  medium: [4, 5, 6],
  low: [1, 2, 3],
};
