import styled from 'styled-components';
import { CheckboxLabelProps } from './Checkbox.types';

export const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  &.gutterBottom {
    padding-bottom: 8px;
  }
  &.disabled {
    pointer-events: none;
    & span {
      border: ${({ theme }) => `2px solid ${theme.colors['medium-gray']}`};
    }
    & label {
      color: ${({ theme }) => theme.colors['medium-gray']};
    }
  }
  &:focus {
    outline: none;
  }
  &:hover {
    & span {
      border: ${({ theme }) => `2px solid ${theme.colors.dark}`};
    }
  }
  &.hidden {
    display: none;
  }
  svg {
    flex-shrink: 0;
  }
`;

export const Label = styled.label<CheckboxLabelProps>`
  ${({ theme, labelType }) => theme.typography[labelType!]};
  line-height: 1;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: unset;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Checkmark = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 1px;
  width: 18px;
  min-width: 18px;
  height: 18px;
  border: ${({ theme }) => `2px solid ${theme.colors.gray}`};
  border-radius: 4px;
  transition: border 0.3s;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  &.indeterminate {
    background: ${({ theme }) => theme.colors.dark};
    border: ${({ theme }) => `2px solid ${theme.colors.dark}`};
    &.disabled {
      background: ${({ theme }) => theme.colors['medium-gray']};
      border: ${({ theme }) => `2px solid ${theme.colors['medium-gray']}`};
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 6px;
    left: 3px;
    width: 8px;
    height: 2px;
    background: white;
    box-sizing: content-box;
    border-radius: 4px;
  }
`;

export const CheckboxInput = styled.input`
  margin: 0px;
  width: 0px;
  height: 0px;
  opacity: 0;
  outline: none;
  cursor: pointer;
  position: absolute;
  &:checked {
    + label > span {
      background: ${({ theme }) => theme.colors.dark};
      border: ${({ theme }) => `2px solid ${theme.colors.dark}`};
      &.disabled {
        background: ${({ theme }) => theme.colors['medium-gray']};
        border: ${({ theme }) => `2px solid ${theme.colors['medium-gray']}`};
      }
      &:before {
        content: '';
        position: absolute;
        top: 6px;
        left: 3px;
        width: 2px;
        height: 6px;
        background: white;
        transform: rotate(-45deg);
        box-sizing: content-box;
        border-radius: 4px;
      }
      &:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 8px;
        width: 2px;
        height: 10px;
        border-radius: 4px;
        background: white;
        transform: rotate(45deg);
        box-sizing: content-box;
      }
    }
  }
`;
