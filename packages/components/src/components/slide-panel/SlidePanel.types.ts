import { ReactElement, CSSProperties, ReactNode } from 'react';

export interface SlidePanelProps {
  isVisible: boolean;
  onClose?: (e?: MouseEvent) => void;
  children: ReactElement;
  unmount?: boolean;
  clickaway?: boolean;
  key?: string;
}

export interface ModalOptionsProps {
  useBackground?: boolean;
  fixedOverScreen?: boolean;
  useAnimation?: boolean;
  isVisible?: boolean;
}

export interface ModalProps {
  options?: ModalOptionsProps;
  isVisible?: boolean;
  variant?: 'default' | 'light';
  fixedOverScreen?: boolean;
}

export interface SlidePanelBlockSectionProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
}

export interface SlidePanelToggleBoxProps {
  show: boolean;
  gridColumn?: CSSProperties['gridColumn'];
}

export interface SlidePanelGridRowProps {
  label: string;
  children: ReactNode;
  isLoading?: boolean;
}
