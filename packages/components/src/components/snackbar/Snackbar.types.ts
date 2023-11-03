export type SnackTypes = 'default' | 'action' | 'fail' | 'success';

export interface SnackbarMain {
  remove: () => void;
  duration: number;
  opacity: number;
  id: string | number;
  type?: SnackTypes;
  dismiss?: boolean;
  actionProps?: {
    onClick: () => void;
    label: JSX.Element | string;
  };
}
