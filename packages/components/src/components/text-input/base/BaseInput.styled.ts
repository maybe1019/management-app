import styled, { css } from 'styled-components';
import { BaseInputProps } from './BaseInput.types';

export const InputFocusStyles = css`
  &:focus {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
    outline: ${({ theme }) => `4px solid ${theme.colors['light-blue']}`};
  }
`;

export const BaseStyledInput = styled.input<
  Pick<BaseInputProps, 'borderRadius'>
>`
  ${({ theme }) => theme.typography['small-bold']};
  background: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  border-radius: ${({ borderRadius = '8px' }) => borderRadius};
  padding: 8px 16px;
  height: 40px;
  max-height: 40px;
  width: 100%;
  box-sizing: border-box;
  ${({ theme }) => theme.typography['small-regular']};
  outline: none;
  color: ${({ theme }) => theme.colors['extra-dark']};
  transition: border 0.3s;

  &::placeholder {
    border-color: ${({ theme }) => theme.colors.gray};
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray};
  }
  ${InputFocusStyles};
  &:disabled,
  :read-only {
    border-color: transparent;
    background: ${({ theme }) => `${theme.colors['light-gray']}`};
  }

  .error &:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.red};

    &:focus {
      border: ${({ theme }) => `1px solid ${theme.colors.red}`};
      outline: ${({ theme }) => `4px solid ${theme.colors['light-red']}`};
    }
  }
`;
