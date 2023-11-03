import { ReportType } from './Reports.types';

export const REPORT_TYPES: ReportType[] = ['COMPLIANCE', 'OVERVIEW'];

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  COMPLIANCE: 'Compliance summary',
  OVERVIEW: 'Overview report',
};
