import React from 'react';
import { LogoProps } from '../logo';
import { breakpoints } from '../../styles/theme';
import { PropertyValues } from '../../types';
import {
  NavItemHorizontalSpacing,
  NavItemVerticalSpacing,
  NavItemPlacement,
} from './nav-item';

export type NavigationVariant = 'dark' | 'light';

export interface NavItemMain {
  id?: string;
  to?: string;
  title: string;
  placement?: NavItemPlacement;
  horizontalSpacing?: NavItemHorizontalSpacing;
  verticalSpacing?: NavItemVerticalSpacing;
  alignRight?: boolean;
  alignLeft?: boolean;
  render?: React.FC;
  visibleAfter?: PropertyValues<typeof breakpoints>;
  onClick?: (arg: any) => any;
  icon?: any;
  children?: NavItemMain[];
  external?: boolean;
}

export interface NavigationMain {
  variant?: NavigationVariant;
  appLogoUrl: string;
  items: NavItemMain[];
  active?: string;
  onChange?: (to: string) => any;
  preventScroll?: boolean;
  AppLogo?: React.FC<LogoProps> | null;
}

export interface NavItemsProps {
  variant?: NavigationVariant;
  items: NavItemMain[] | undefined;
  active?: string;
  onChange?: (to: string) => any;
}
