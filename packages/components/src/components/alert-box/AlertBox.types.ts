import { CSSProperties } from 'react';

export type AlertBoxType = 'error' | 'warning' | 'info' | 'success';

export interface AlertBoxError {
  title: string;
  message?: string;
}

export interface AlertBoxProps extends AlertBoxError {
  margin?: CSSProperties['margin'];
  type: AlertBoxType;
  withIcon?: boolean;
}
