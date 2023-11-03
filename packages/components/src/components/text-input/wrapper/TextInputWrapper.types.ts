import { FieldError } from 'react-hook-form';
import { ColorProperties } from '../../../types/index';

export interface InputPropsColors {
  textColor?: ColorProperties;
  backgroundColor?: ColorProperties;
  placeholderColor?: ColorProperties;
  disabledColor?: ColorProperties;
}

export interface InputWrapperProps
  extends InputPropsColors,
    Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  className?: string;
  label?: string;
  name?: string;
  error?: FieldError | { message: string };
  dark?: boolean;
  light?: boolean;
  tooltipInfo?: string;
  noMargin?: boolean;
  borderRadius?: string;
  prefix?: string;
  justIcon?: boolean;
  helperText?: string;
  icon?: JSX.Element;
  iconPlacement?: 'left' | 'right';
}

export interface IconWrapperProps {
  placement?: string;
}
