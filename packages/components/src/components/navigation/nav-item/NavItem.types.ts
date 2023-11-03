import { breakpoints } from '../../../styles/theme';
import { PropertyValues } from '../../../types';
import { NavigationVariant, NavItemMain } from '../Navigation.types';

export type NavItemPlacement = 'primary' | 'secondary' | 'footer';

export type NavItemHorizontalSpacing = 'none' | 'dense' | 'normal';

export interface NavItemVerticalSpacing {
  top?: number;
  bottom?: number;
}

export interface NavItemWrapperProps {
  horizontalSpacing?: NavItemHorizontalSpacing;
  verticalSpacing?: NavItemVerticalSpacing;
}

export interface NavItemProps {
  variant?: NavigationVariant;
  placement?: NavItemPlacement;
  horizontalSpacing?: NavItemHorizontalSpacing;
  verticalSpacing?: NavItemVerticalSpacing;
  to?: string;
  onActiveChange?: (to: string) => void;
  activeItem?: string;
  id?: string;
  onClick?: (arg: any) => any;
  alignRight?: boolean;
  alignLeft?: boolean;
  render?: React.FC;
  visibleAfter?: PropertyValues<typeof breakpoints>;
  icon?: any;
  nested?: NavItemMain[];
  parentNavLink?: boolean;
  external?: boolean;
}

export interface NavItemIconProps {
  paddingRight?: string;
}

export interface NavItemExpandableProps {
  to?: string;
  open: boolean;
  title: any;
  children: JSX.Element | JSX.Element[];
}

export interface NavItemExpandableBodyProps {
  open: boolean;
}
