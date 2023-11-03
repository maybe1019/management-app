import React from 'react';
import {
  NavItemHorizontalSpacing,
  NavItemVerticalSpacing,
  NavItemPlacement,
} from '@secberus/components';
import { RoleItem } from '../../app/rbac/roleFilter';

export interface NavItem extends RoleItem {
  placement?: NavItemPlacement;
  horizontalSpacing?: NavItemHorizontalSpacing;
  verticalSpacing?: NavItemVerticalSpacing;
  title: string;
  id: string;
  to?: string;
  render?: React.FC;
  alignLeft?: boolean;
  alignRight?: boolean;
  onClick?: () => void;
  icon?: any;
}
