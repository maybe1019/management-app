import styled from 'styled-components';
import { InputPropsColors, IconWrapperProps } from './TextInputWrapper.types';

export const LabelContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
  align-items: center;
`;

export interface StyledInputProps {
  borderRadius: string;
}

export const StyledInputContainer = styled.div<InputPropsColors>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
  line-height: 1.3;
  width: 100%;
  &.dark {
    input,
    textarea {
      background: ${({ theme }) => theme.colors['dark-gray']};
      color: ${({ theme }) => theme.colors.white};
      &.disabled,
      :read-only {
        pointer-events: none;
        color: ${({ theme }) => theme.colors['gray']};
        &::placeholder {
          color: ${({ theme }) => theme.colors['gray']};
        }
      }
    }
    ${LabelContainer} {
      svg > * {
        stroke: ${({ theme }) => theme.colors.white};
      }
    }
  }

  &.light {
    input,
    textarea {
      background: ${({ theme }) => theme.colors.white};
    }
  }

  &.disabled {
    input,
    textarea {
      pointer-events: none;
      color: ${({ theme }) => theme.colors['gray']};
      &::placeholder {
        color: ${({ theme }) => theme.colors['gray']};
      }
    }
  }
  input:read-only {
    pointer-events: none;
    color: ${({ theme }) => theme.colors['gray']};
    &::placeholder {
      color: ${({ theme }) => theme.colors['gray']};
    }
  }

  ${({
    backgroundColor,
    textColor,
    disabledColor,
    placeholderColor,
    theme,
  }) => {
    const _disabledColor = disabledColor ?? 'gray';
    const _placeholderColor = placeholderColor ?? 'gray';
    if (backgroundColor || textColor) {
      return `
        input, textarea {
          ${
            backgroundColor
              ? `background: ${theme.colors[backgroundColor]};`
              : ''
          }
          ${textColor ? `color: ${theme.colors[textColor]};` : ''}
          &::placeholder {
            ${
              _placeholderColor
                ? `color: ${theme.colors[_placeholderColor]}`
                : ''
            };
          }
          &.disabled {
            pointer-events: none;
            ${_disabledColor ? `color: ${theme.colors[_disabledColor]}` : ''};
            &::placeholder {
              ${_disabledColor ? `color: ${theme.colors[_disabledColor]}` : ''};
            }
          }
        }
      `;
    }
    return;
  }}
`;

/**
 * A HOC that intended to wrap BaseInput directly to implement an icon that can
 * be positioned to the left or right of the input.
 */
export const WithIcon = styled.div<IconWrapperProps>`
  position: relative;
  width: inherit;
  .input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    path {
      fill: ${({ theme }) => theme.colors.gray};
    }
  }
  ${({ placement }) => {
    switch (placement) {
      case 'left':
      case 'right':
        return `
          input {
            padding-${placement}: 48px;
          }
          .input-icon {
            ${placement}: 16px;
          }
        `;
      default:
        return ``;
    }
  }}
`;
