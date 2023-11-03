import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { theme } from '../styles/theme';
import { changeAlphaValue } from '../utils';

const baseScrollBar = css`
  ::-webkit-scrollbar {
    width: 8px;

    :horizontal {
      height: 8px;
    }
  }
  scrollbar-width: thin;
  scrollbar-color: transparent;
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    width: 8px;

    :horizontal {
      min-height: 8px;
    }

    :vertical {
      min-height: 48px;
    }
  }
`;

export const styledScrollbar = (
  hasDarkBg = false
): FlattenInterpolation<ThemeProps<typeof css>> => css`
  ${baseScrollBar}

  ::-webkit-scrollbar-thumb {
    transition: background-color 2s;
    border: ${() =>
      hasDarkBg ? 'none' : `1px solid ${theme?.colors['light-gray']}`};
    background-color: ${() =>
      changeAlphaValue(
        theme.rgbaColors[hasDarkBg ? 'medium-gray' : 'extra-dark'],
        '0.28'
      )};

    &:hover {
      background-color: ${() =>
        changeAlphaValue(
          theme.rgbaColors[hasDarkBg ? 'medium-gray' : 'extra-dark'],
          '0.5'
        )};
    }
  }
`;

export const styledOnHoverScrollbar = (
  hasDarkBg = false
): FlattenInterpolation<ThemeProps<typeof css>> => css`
  ${baseScrollBar}

  ::-webkit-scrollbar-thumb {
    transition: background-color 2s;
    background-color: transparent;
    border: none;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      border: ${() =>
        hasDarkBg ? 'none' : `1px solid ${theme?.colors['light-gray']}`};
      background-color: ${() =>
        changeAlphaValue(
          theme.rgbaColors[hasDarkBg ? 'medium-gray' : 'extra-dark'],
          '0.28'
        )};

      &:hover {
        border: ${() =>
          hasDarkBg ? 'none' : `1px solid ${theme?.colors['light-gray']}`};
        background-color: ${() =>
          changeAlphaValue(
            theme.rgbaColors[hasDarkBg ? 'medium-gray' : 'extra-dark'],
            '0.5'
          )};
      }
    }
  }
`;
