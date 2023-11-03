import { Dispatch, SetStateAction } from 'react';
import { ReportSchedule } from '@secberus/services';

export interface ReportsPanelCallbackProps {
  setShowSources: Dispatch<SetStateAction<boolean>>;
  handleEditReport: () => void;
}

export interface ReportsPanelProps {
  isLoading?: boolean;
  isVisible: boolean;
  onClose?: () => void;
  data?: {
    report?: ReportSchedule;
    reportType?: string;
    reportOwner?: string;
    canEdit?: boolean;
    showSources?: boolean;
    callbacks?: ReportsPanelCallbackProps;
  };
}
