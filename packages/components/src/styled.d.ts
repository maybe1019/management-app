// import 'styled-components';
import {
  ColorsMain,
  ShadowsMain,
  TypographyMain,
  BreakPointMain,
  ComponentsMain,
  ColorThemeMain,
  SvgMain,
  TransparencyMain,
  GradientsMain, TableSpacingType, TableSpacingProps
} from './types';

// do not declare from here yet

// declare module 'styled-components' {
export interface DefaultTheme {
  colors: ColorsMain;
  rgbaColors: ColorsMain;
  gradients: Pick<ColorsMain, GradientsMain>;
  typography: TypographyMain;
  shadows: ShadowsMain;
  breakpoints: BreakPointMain;
  components: ComponentsMain;
  themes: ColorThemeMain;
  svg: SvgMain;
  transparent: TransparencyMain;
  /**
   * Ideally, instead of storing constants for table spacing, we should be
   * changing a spacing multiplier that applies to everything in the app.
   * However, we are only concerned with the spacing in tables for now.
   * @drew
   */
  tableSpacing: Record<TableSpacingType, TableSpacingProps>;
  tableSpacingPreference: TableSpacingType;
}
// }
