import { AnyFn } from '@secberus/utils';
import React from 'react';
import { ButtonVariants } from '../../types';
import { ButtonProps } from '../button/Button.types';

export interface Option {
  id: string;
  name?: string;
  destructive?: boolean;
  show?: boolean;
  onClick?: AnyFn;
}

export interface ButtonDropdownProps
  extends Pick<ButtonProps, 'icon' | 'size'> {
  className?: string;
  label?: string | React.ReactNode;
  name?: string;
  alignRight?: boolean;
  displayKey?: string;
  disabled?: boolean;
  variant?: ButtonVariants;
  options: Option[];
  rowHeight?: number;
  maxRows?: number;
  onSelect?: (option: Option) => void;
  optionDisplay?: (option: any) => React.ReactNode;
  listWidth?: string;
  listTop?: string;
}
