import {
  BadgeIcon,
  ColorProperties,
  TypographyProperties,
} from '../../../types';
import { BaseBadgeIconMap } from './BaseBadge.component';

export type BaseBadgeIconMapType = keyof typeof BaseBadgeIconMap;

export interface BaseBadgeProps {
  dark?: boolean;
  label?: string | React.ReactNode | JSX.Element;
  iconMap?: BaseBadgeIconMapType;
  icon?: BadgeIcon;
  className?: string;
  transparent?: boolean;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  light?: boolean;
  color?: string;
  background?: ColorProperties;
  badgeColor?: ColorProperties;
  padding?: string;
  iconColor?: ColorProperties;
  typography?: TypographyProperties;
  pill?: boolean;
}
