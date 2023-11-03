import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonProps } from './Button.types';

export const StyledLink = styled(Link)`
  width: fit-content;
  text-decoration: none;
`;

export const ButtonBaseStyles = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: unset;
  position: relative;
  transition: all 0.3s;
  font-family: 'Eina 01', sans-serif;
  outline: none;
  width: fit-content;
  white-space: nowrap;
  height: 40px;
  ${({ theme }) => theme.components.button.default.base};
  &.small {
    padding: initial 16px;
    height: 32px;
    ${({ theme }) => theme.typography['xsmall-bold']};
  }
`;

export const ButtonVariantStyles = css`
  &.primary {
    ${({ theme }) => theme.components.button.primary.base};
    &:hover {
      ${({ theme }) => theme.components.button.primary.hover};
    }
    &:active {
      ${({ theme }) => theme.components.button.primary.active};
    }
  }
  &.destructive {
    ${({ theme }) => theme.components.button.destructive.base};
    &:hover {
      ${({ theme }) => theme.components.button.destructive.hover};
    }
    &:active {
      ${({ theme }) => theme.components.button.destructive.active};
    }
  }
  &.secondary {
    ${({ theme }) => theme.components.button.secondary.base};
    &:hover {
      ${({ theme }) => theme.components.button.secondary.hover};
    }
    &:active {
      ${({ theme }) => theme.components.button.secondary.active};
    }
  }
  &.tertiary {
    ${({ theme }) => theme.components.button.tertiary.base};
    &:hover {
      ${({ theme }) => theme.components.button.tertiary.hover};
    }
    &:active {
      ${({ theme }) => theme.components.button.tertiary.active};
    }
  }
  &.quaternary {
    ${({ theme }) => theme.components.button.quaternary.base};
    &:hover {
      ${({ theme }) => theme.components.button.quaternary.hover};
    }
    &:active {
      ${({ theme }) => theme.components.button.quaternary.active};
    }
  }
`;

export const StyledButton = styled.button<ButtonProps>`
  ${ButtonBaseStyles};

  & svg {
    margin-right: 8px;
    height: 24px;
    width: 24px;
    & path {
      transition: all 0.3s;
    }
  }

  &.small svg {
    width: 20px;
    height: 20px;
  }

  ${ButtonVariantStyles};

  &.icon {
    ${({ theme }) => theme.components.button.icon.base};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    & svg {
      flex-shrink: 0;
      margin-right: unset;
      height: 24px;
      width: 24px;
    }
    &.small {
      ${({ theme }) => theme.components.button.icon.small};
      width: 32px;
      height: 32px;
      & svg {
        height: 20px;
        width: 20px;
      }
    }
  }
  &:disabled,
  &.disabled {
    ${({ theme }) => theme.components.button.default.disabled};
    & > svg {
      & > path {
        stroke: ${({ theme }) => theme.colors.gray};
      }
    }
  }
  &.endIcon {
    & > svg {
      margin-left: 8px;
      margin-right: 0px;
    }
  }
  && {
    ${({ theme, color }) =>
      color &&
      css`
        color: ${theme.colors[color]};
      `};
    ${({ theme, background }) =>
      background &&
      css`
        background: ${theme.colors[background]};
      `};
  }
  &.dropdown-button-container {
    ${({ theme }) => theme.components.button.icon.base};
    padding: 0;
    & svg {
      margin-right: unset;
      height: 24px;
      width: 24px;
    }
    &.small {
      ${({ theme }) => theme.components.button.icon.small};
      padding: 4px;
    }
  }

  &.hidden {
    display: none;
  }
`;

export const ButtonLoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    z-index: 99;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.white};
    opacity: 0.25; // further reduce already disabled state by 25%
  }
  & .btn-spinner {
    z-index: 100;
    color: ${props => props.theme.colors.dark};

    .small & {
      width: 18px;
      height: 18px;
    }

    .large & {
      width: 30px;
      height: 30px;
    }
  }
`;
