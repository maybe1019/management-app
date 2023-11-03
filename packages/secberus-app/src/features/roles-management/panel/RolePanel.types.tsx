import { AccessRole } from '@secberus/services';

export interface RolePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export interface RolePanelComponentProps {
  isLoading?: boolean;
  onClose: () => void;
  role?: AccessRole;
}
