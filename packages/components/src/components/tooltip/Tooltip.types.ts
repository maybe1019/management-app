export interface ToolTipProps {
  id: string;
  place?: 'top' | 'right' | 'left' | 'bottom';
  longText?: boolean;
  usePortal?: boolean;
  portalElementId?: string;
}
