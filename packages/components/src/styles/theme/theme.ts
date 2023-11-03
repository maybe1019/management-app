import { CSSObject } from 'styled-components';
import { DefaultTheme } from '../../styled'; //  should be imported from styled components
import { changeAlphaValue } from '../../utils';

const getCSSProps = (props: CSSObject) => props;

export const themeColors = {
  red: '#DC3545',
  purple: '#AF26D1',
  blue: '#0273E2',
  orange: '#F3932E',
  green: '#35B589',
  'light-red': '#FEE4E4',
  'light-purple': '#F3DBFF',
  'light-blue': '#DEEEFE',
  'light-orange': '#FDEDE1',
  'light-green': '#E1F4D9',
  white: '#FFFFFF',
  transparent: 'transparent',
  'light-gray': '#F1F6FA',
  'medium-gray': '#DFE7EF',
  gray: '#6A6A88',
  dark: '#1E1E32',
  'dark-gray': '#323246',
  'extra-dark': '#111122',
  'dark-red': '#5A3A4A',
  'dark-purple': '#4C2E6B',
  'dark-blue': '#32466A',
  'dark-green': '#316854',
};

export const themeColorsRGBA = {
  red: 'rgba(220, 53, 69, 1)',
  purple: 'rgba(175, 38, 209, 1)',
  blue: 'rgba(2, 115, 226, 1)',
  orange: 'rgba(243, 147, 46)',
  green: 'rgba(109, 232, 136, 1)',
  'light-red': 'rgba(254, 228, 228, 1)',
  'light-purple': 'rgba(243, 219, 255, 1)',
  'light-blue': 'rgba(222, 238, 254, 1)',
  'light-orange': 'rgba(253, 237, 225, 1)',
  'light-green': 'rgba(225, 244, 217, 1)',
  white: 'rgba(255, 255, 255, 1)',
  'light-gray': 'rgba(241, 246, 250, 1)',
  'medium-gray': 'rgba(223, 231, 239, 1)',
  gray: 'rgba(106, 106, 136, 1)',
  dark: 'rgba(30, 30, 50, 1)',
  'dark-gray': 'rgba(50, 50, 70, 1)',
  'extra-dark': 'rgba(17, 17, 34, 1)',
  'dark-red': 'rgba(90, 58, 74, 1)',
  'dark-purple': 'rgba(76, 46, 107, 1)',
  'dark-blue': 'rgba(50, 70, 106, 1)',
  'dark-green': 'rgba(49, 104, 84, 1)',
  transparent: 'rgba(0, 0, 0, 0)',
};

export const themeColorsGradient = {
  purple: 'linear-gradient(180deg, #8E01B0 0%, #B41EFF 50%, #CE6DFF 100%)',
  red: 'linear-gradient(180deg, #DB1B2E 0%, #DC3545 50%, #FF8087 100%)',
  orange: 'linear-gradient(0deg, #FFC385 0%, #F49B3E 50%, #F1853B 100%)',
  green: 'linear-gradient(0deg, #35B589 0%, #39B68B 49.43%, #10857E 100%)',
  blue: 'linear-gradient(0deg, #46A3FF 0%, #2794FF 35.10%, #0468CA 100%)',
};

export const svg = {
  loginBg: `url('/login-bg.png')`, // this will / should be an SVG in the future.
};

export const transparent = {
  mid: {
    dark: 'rgba(30, 30, 50, 0.5)',
  },
};

export const shadows = {
  default: '0px 8px 24px rgba(0, 0, 0, 0.08)',
  button: '0px 4px 4px -4px rgba(0, 30, 65, 0.32)',
  buttonHover: '0px 4px 4px -4px rgba(0, 30, 65, 0.52)',
  'submenu-selected': 'inset -4px 0px 0px rgba(3, 66, 134, 0.5)',
};

export const colorThemes = {
  primary: getCSSProps({
    color: themeColors.dark,
    contrastText: themeColors.white,
  }),
  secondary: getCSSProps({
    color: themeColors.white,
    contrastText: themeColors.dark,
  }),
};

export const breakpoints = {
  mobileS: '(min-width: 320px)',
  mobileM: '(min-width: 375px)',
  mobileL: '(min-width: 425px)',
  tablet: '(min-width: 768px)',
  laptop: '(min-width: 1024px)',
  laptopM: '(min-width: 1200px)',
  laptopL: '(min-width: 1440px)',
  desktop: '(min-width: 2560px)',
  desktopL: '(min-width: 2560px)',
  tabletMax: '(max-width: 768px)',
  mobileSMax: '(max-width: 320px)',
  mobileMMax: '(max-width: 375px)',
  mobileLMax: '(max-width: 425px)',
  laptopMax: '(max-width: 1024px)',
  laptopMMax: '(max-width: 1200px)',
  laptopLMax: '(max-width: 1440px)',
  desktopMax: '(max-width: 2560px)',
  desktopLMax: '(max-width: 2560px)',
};

export const typography = {
  // heading styles
  xlarge: getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '64px',
    lineHeight: '72px',
  }),
  large: getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '40px',
    lineHeight: '48px',
  }),
  medium: getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '32px',
    lineHeight: '40px',
  }),
  small: getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '24px',
    lineHeight: '32px',
  }),
  xsmall: getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
  }),
  // text styles
  bold: getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '29px',
  }),
  regular: getCSSProps({
    fontFamily: '"Eina 01", sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '29px',
  }),
  'small-bold': getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '15px',
    lineHeight: '24px',
  }),
  'small-regular': getCSSProps({
    fontFamily: '"Eina 01", sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '24px',
  }),
  'xsmall-bold': getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '13px',
    lineHeight: '22px',
  }),
  'xsmall-regular': getCSSProps({
    fontFamily: '"Eina 01", sans-serif',
    fontStyle: 'normal',
    fontSize: '13px',
    lineHeight: '22px',
  }),
  caption: getCSSProps({
    fontFamily: '"Eina 01-Bold", sans-serif',
    fontStyle: 'normal',
    fontSize: '11px',
    lineHeight: '16px',
  }),
  code: getCSSProps({
    fontFamily: '"Monaco", monospace',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '24px',
  }),
  'small-code': getCSSProps({
    fontFamily: '"Monaco", monospace',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
  }),
};

const buttonProps = {
  default: {
    base: getCSSProps({
      paddingRight: '16px',
      paddingLeft: '16px',
      border: '1px solid transparent',
      borderRadius: '8px',
      lineHeight: '24px',
      fontSize: '18px',
      ...typography['small-bold'],
    }),
    disabled: getCSSProps({
      background: themeColors['light-gray'],
      color: themeColors.gray,
      boxShadow: 'unset',
      borderColor: 'transparent',
      pointerEvents: 'none',
    }),
  },
  primary: {
    base: getCSSProps({
      background: themeColors.blue,
      color: themeColors.white,
      boxShadow: shadows.button,
    }),
    hover: getCSSProps({
      boxShadow: shadows.buttonHover,
      background: changeAlphaValue(themeColorsRGBA.blue, '0.8'),
    }),
    active: getCSSProps({
      boxShadow: 'none',
      background: '#025EBA',
      color: themeColors.white,
    }),
  },
  destructive: {
    base: getCSSProps({
      background: themeColors.red,
      color: themeColors.white,
      boxShadow: shadows.button,
    }),
    hover: getCSSProps({
      boxShadow: shadows.buttonHover,
      background: changeAlphaValue(themeColorsRGBA.red, '0.8'),
    }),
    active: getCSSProps({
      boxShadow: 'none',
      background: '#C82A39',
      color: themeColors.white,
    }),
  },
  secondary: {
    base: getCSSProps({
      background: themeColors.white,
      color: themeColors.dark,
      borderColor: themeColors['medium-gray'],
      boxShadow: shadows.button,
    }),
    hover: getCSSProps({
      background: themeColors['light-gray'],
      boxShadow: shadows.buttonHover,
    }),
    active: getCSSProps({
      borderColor: themeColors.gray,
      background: themeColors['light-gray'],
      boxShadow: 'unset',
    }),
  },
  tertiary: {
    base: getCSSProps({
      background: 'transparent',
      color: themeColors.dark,
    }),
    hover: getCSSProps({
      background: themeColors['light-gray'],
      borderColor: themeColors['medium-gray'],
    }),
    active: getCSSProps({
      borderColor: themeColors.gray,
      background: themeColors['medium-gray'],
    }),
  },
  quaternary: {
    base: getCSSProps({
      background: themeColors['dark-gray'],
      color: themeColors.white,
      boxShadow: shadows.button,
    }),
    hover: getCSSProps({
      boxShadow: '0px 0px 0px 2px rgba(30, 30, 50, 0.07)',
    }),
    active: getCSSProps({
      background: themeColors['medium-gray'],
      boxShadow: 'unset',
    }),
  },
  icon: {
    base: getCSSProps({
      borderRadius: '50%',
      padding: '12px',
    }),
    small: getCSSProps({
      height: '32px',
      width: '32px',
    }),
  },
};

const toggleButtonProps = {
  default: {
    base: getCSSProps({
      padding: '14px',
      lineHeight: '24px',
      borderRadius: '24px',
    }),
    disabled: getCSSProps({
      color: themeColors['light-gray'],
      contrastText: themeColors.gray,
    }),
  },
  primary: {
    base: getCSSProps({
      background: themeColors.dark,
      color: themeColors.white,
      boxShadow: shadows.default,
    }),
    hover: getCSSProps({
      color: themeColors['dark-gray'],
      contrastText: themeColors.white,
      shadow: shadows.default,
    }),
    active: getCSSProps({
      color: themeColors.dark,
      contrastText: themeColors.white,
    }),
  },
  secondary: {
    base: getCSSProps({
      color: themeColors.white,
      contrastText: themeColors.dark,
      shadow: shadows.button,
    }),
    hover: getCSSProps({
      color: themeColors['dark-gray'],
      contrastText: themeColors.dark,
      shadow: shadows.button,
      border: `2px solid ${themeColors['light-gray']}`,
    }),
    active: getCSSProps({
      color: themeColors.white,
      contrastText: themeColors.dark,
    }),
  },
};

const snackBarProps = {
  default: {
    base: getCSSProps({
      padding: '16px 0px 0px 24px',
      shadow: shadows.default,
      borderRadius: '32px',
      width: '360px',
    }),
    action: getCSSProps({
      width: '400px',
    }),
    icon: getCSSProps({
      width: '400px',
    }),
  },
  primary: {
    base: getCSSProps({
      color: themeColors.dark,
      contrastText: themeColors.white,
      shadow: shadows.default,
    }),
  },
};

const navBarProps = {
  default: {
    base: getCSSProps({
      height: '72px',
    }),
  },
  primary: {
    base: {
      color: themeColors.dark,
      contrastText: themeColors.white,
    },
  },
};

const iconProps = {
  default: {
    base: {
      height: '24px',
      width: '24px',
    },
    small: {
      height: '16px',
      width: '16px',
    },
  },
};

const badgeProps = {
  default: {
    base: getCSSProps({
      padding: '4px 0px 0px 8px',
      height: '32px',
    }),
  },
};

const widgetProps = {
  default: {
    base: getCSSProps({
      padding: '16px 0px 0px 16px',
      height: '104px',
      minWidth: '232px',
    }),
  },
};

export const componentProps = {
  button: buttonProps,
  toggleButton: toggleButtonProps,
  snackBar: snackBarProps,
  navBar: navBarProps,
  icon: iconProps,
  badge: badgeProps,
  widget: widgetProps,
};

export const tableSpacing = {
  compact: {
    padding: '8px 16px',
    fontSize: '13px',
    lineHeight: '22px',
    actionRowMinHeight: '48px',
  },
  normal: {
    padding: '16px',
    fontSize: '15px',
    lineHeight: '24px',
    actionRowMinHeight: '48px',
  },
};

export const theme: DefaultTheme = {
  breakpoints,
  components: componentProps,
  rgbaColors: themeColorsRGBA,
  gradients: themeColorsGradient,
  colors: themeColors,
  themes: colorThemes,
  shadows,
  typography,
  svg,
  transparent,
  tableSpacing,
  tableSpacingPreference: 'compact',
};
