import styled from 'styled-components';
import { ButtonBaseStyles, ButtonVariantStyles } from '../button/Button.styled';
import { SplitButtonProps } from './SplitButton.types';

export const SplitButtonBase = styled.div<SplitButtonProps>`
  position: relative;
  display: flex;
  align-items: stretch;
`;

export const StyledButton = styled.button<SplitButtonProps>`
  ${ButtonBaseStyles};
  ${ButtonVariantStyles};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const DropdownTrigger = styled.div`
  ${ButtonBaseStyles};
  ${ButtonVariantStyles};
  border-left: 1px solid ${props => props.theme.colors.dark};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 8px;

  svg path {
    fill: ${props => props.theme.colors.dark};
  }

  &.small {
    padding: 4px;
  }

  &.primary,
  &.destructive,
  &.quaternary,
  &.create {
    border-left: 1px solid ${props => props.theme.colors.white};
    svg path {
      fill: ${props => props.theme.colors.white};
    }
  }

  &.secondary {
    border-left-color: transparent;
  }

  &.tertiary {
    border-left: 1px solid ${props => props.theme.colors['medium-gray']};
  }
`;
