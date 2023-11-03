export const CRITICAL = 'CRITICAL';
export const HIGH = 'HIGH';
export const MEDIUM = 'MEDIUM';
export const LOW = 'LOW';
export const SUPPRESSED = 'suppressed';

type COLORS = 'critical' | 'red' | 'orange' | 'green';

export const PRIORITY_COLORS: Record<string, COLORS> = {
  CRITICAL: 'critical',
  HIGH: 'red',
  MEDIUM: 'orange',
  LOW: 'green',
};
