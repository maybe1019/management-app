import React, { CSSProperties } from 'react';
import { AnyFn } from '@secberus/utils';
import { ColorsMain } from '../../types';

export interface ListContainerProps {
  portal?: boolean;
  elevation?: boolean;
  borderRadius?: number;
  width?: CSSProperties['width'];
  disableAnimation?: boolean;
}

export interface ListBodyProps {
  rowHeight?: number;
  maxRows?: number;
}

export interface ListOption {
  id: string;
  label: string;
  show?: boolean;
  onClick?: AnyFn;
  icon?: JSX.Element;
  destructive?: boolean;
}

export interface ListActionItemProps extends Omit<ListOption, 'id'> {
  onClick: AnyFn;
  as?: React.FC;
}

export type ListSelectedType = Partial<ListOption> | string;

export interface ListProps {
  options: ListOption[];
  elevation?: ListContainerProps['elevation'];
  borderRadius?: ListContainerProps['borderRadius'];
  width?: ListContainerProps['width'];
  rowHeight?: ListBodyProps['rowHeight'];
  maxRows?: ListBodyProps['maxRows'];
  menuPortalTarget?: HTMLElement | null;
  controlRef?: React.RefObject<HTMLElement | null>;
  selected?: ListSelectedType;
  onSelected?: (
    e: React.MouseEvent<HTMLElement>,
    value: ListSelectedType
  ) => void;
  selectedColor?: ColorsMain;
  selectedReturnType?: 'object' | 'id';
  actionItem?: ListActionItemProps;
  transformLabel?: (name: string) => string;
  disableAnimation?: ListContainerProps['disableAnimation'];
}

export interface ListItemProps {
  rowHeight?: ListBodyProps['rowHeight'];
}
