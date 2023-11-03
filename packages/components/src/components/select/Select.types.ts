import { AnyFn } from '@secberus/utils';
import React from 'react';

export interface SelectOption {
  id?: string;
  name?: string;
  [key: string]: any;
}

export type SelectValueType = SelectOption | keyof SelectOption | undefined;

export interface SelectProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  direction?: 'DOWN' | 'UP';
  reverseDirection?: boolean;
  options: SelectOption[];
  displayKey?: string;
  valueKey?: string;
  onChange?: (value: any) => void;
  nest?: string;
  value?: SelectValueType;
  placeholder?: string;
  error?: { message: string };
  dark?: boolean;
  maxTriggerWidth?: number;
  rowHeight?: number;
  maxRows?: number;
  loading?: boolean;
  returnType?: 'id' | 'object';
  transformName?: (name: string) => string;
  actionItem?: {
    onClick: () => void;
    render?: React.ReactNode;
    as?: React.FC;
    label?: string;
    icon?: React.ReactNode;
  };
  id?: string;
  hasIcon?: boolean;
  onToggle?: (isOpen: boolean) => void;
  menuPortalTarget?: HTMLElement | null;
  closeMenuOnScroll?: boolean;
  onMenuClose?: AnyFn;
}
