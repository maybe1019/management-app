import { TextProps } from '../../text';

export type ConnectionStatus = { message: string; reason?: string | undefined };

export type ConnectionStatusType =
  | 'success'
  | 'partial'
  | 'failure'
  | 'default';

export type ConnectionStatusIconSizeVariant = 'small' | 'medium';

export type ConnectionStatusIconSizeMap = {
  icon: number;
  iconContainer: number;
};

export interface ConnectionStatusBadgeProps {
  type: ConnectionStatusType;
  status: ConnectionStatus;
  iconSize?: ConnectionStatusIconSizeVariant | ConnectionStatusIconSizeMap;
  iconTextSpacing?: number;
  statusBadgeProps?: Partial<ConnectionStatusBadgeProps>;
  statusMessageTextProps?: Partial<TextProps>;
  statusReasonTextProps?: Partial<TextProps>;
}

export interface IconContainerProps {
  type: ConnectionStatusType;
  size?: number;
}
