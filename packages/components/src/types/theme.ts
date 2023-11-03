import { CSSProperties } from 'styled-components';
import {
  breakpoints,
  colorThemes,
  themeColors,
  themeColorsRGBA,
  componentProps,
  shadows,
  typography,
  svg,
  transparent,
} from '../styles/theme';
import { PropertyNames } from './index';

// CSS queries
export type BreakPointMain = typeof breakpoints;

// Typography
export type TypographyMain = typeof typography;

export type TypographyProperties = PropertyNames<typeof typography>;

// Color themes
export type ColorThemeMain = typeof colorThemes;

export type ColorsMain = typeof themeColors;

export type RGBAColorProperties = PropertyNames<typeof themeColorsRGBA>;

export type ColorProperties = PropertyNames<typeof themeColors>;

export type TransparencyMain = typeof transparent;

export type GradientsMain = Extract<
  ColorProperties,
  'purple' | 'red' | 'orange' | 'green' | 'blue'
>;

export type ShadowsMain = typeof shadows;

export type SvgMain = typeof svg;
export type SvgKeys = keyof SvgMain;

// Components and Custom Variants
export type ComponentsMain = typeof componentProps;

export type ButtonVariants = PropertyNames<ComponentsMain['button']>;

export type TableSpacingType = 'compact' | 'normal';

export interface TableSpacingProps
  extends Pick<CSSProperties, 'padding' | 'fontSize' | 'lineHeight'> {
  actionRowMinHeight: CSSProperties['height'];
}
