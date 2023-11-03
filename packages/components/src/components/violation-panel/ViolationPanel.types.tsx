import { Dispatch, SetStateAction } from 'react';
import {
  Policy,
  PolicyCategory,
  Violation,
  GetViolationsApiArg,
} from '@secberus/services';

export interface ToggleMarkExceptionProps {
  violationId: string;
  isSupressed: boolean;
}

export interface ViolationPanelTimeProps {
  firstDetected?: string | null;
  lastDetected?: string | null;
  exposure?: string | null;
}

export interface ViolationPanelPaginationProps {
  loading?: boolean;
  showControls: boolean;
  page: number;
  limit: number;
  total: number;
  currentIndex: number;
}

export interface ViolationPanelCallbackProps {
  notifyLinkCopySuccess: () => void;
  toggleMarkException: (violationId: string, isSupressed: boolean) => void;
  handlePaginate: (
    operation: 'increment' | 'decrement',
    violationId: string
  ) => void;
  setShowRemediation: Dispatch<SetStateAction<boolean>>;
  setShowResourceData: Dispatch<SetStateAction<boolean>>;
}

export interface ViolationPanelProps {
  isLoading?: boolean;
  isVisible: boolean;
  onClose?: () => void;
  data: {
    startingPage: number;
    isLoading: boolean;
    violationId: string;
    showRemediation: boolean;
    showResourceData: boolean;
    showMarkException: boolean;
    resourceType?: string;
    violations?: Violation[];
    violation?: Violation;
    category?: PolicyCategory;
    policy?: Policy;
    tableFilters?: GetViolationsApiArg;
    time: ViolationPanelTimeProps;
    pagination: ViolationPanelPaginationProps;
    callbacks: ViolationPanelCallbackProps;
  };
}

export interface SeverityBarProps {
  priority: string | null;
}
