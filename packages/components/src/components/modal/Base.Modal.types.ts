export interface BaseModalOptions {
  useBackground?: boolean;
  fixedOverScreen?: boolean;
  closeIcon?: boolean;
  useAnimation?: boolean;
  portal?: boolean;
}

export interface BaseModalProps {
  handleClose?: (...args: any[]) => unknown;
  title?: string;
  className?: string;
  loading?: boolean;
  options?: BaseModalOptions;
  isVisible?: boolean;
  variant?: 'default' | 'light';
  overlayZIndex?: number;
  root?: string;
}

export type BaseModalOverlayProps = Pick<
  BaseModalProps,
  'isVisible' | 'options' | 'overlayZIndex' | 'className'
>;

export type BaseModalContainerProps = Pick<BaseModalOptions, 'fixedOverScreen'>;
