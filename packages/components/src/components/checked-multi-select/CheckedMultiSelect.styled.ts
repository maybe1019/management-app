import styled from 'styled-components';
import {
  DropdownList,
  ListItem,
} from '../button-dropdown/ButtonDropdown.styled';
import { Text } from '../text';
import { StyledDropdownListProps } from './CheckedMultiSelect.types';

export const Label = styled(Text)`
  margin-bottom: 4px;
  ${({ theme }) => theme.typography['xsmall-bold']};
`;

export const MultiSelectContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.3s;
  padding-right: 16px;
  height: 40px;
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  box-shadow: ${({ theme }) => theme.shadows.button};
  background: ${({ theme }) => theme.colors.white};
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors['gray']}`};
    box-shadow: ${({ theme }) => theme.shadows.buttonHover};
  }
  &.active {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
    outline: ${({ theme }) => `4px solid ${theme.colors['light-blue']}`};
  }
  & .multi-select-label {
  }
  & input,
  input:focus,
  input:hover {
    border: unset;
    outline: unset;
    cursor: pointer;
    height: 100%;
  }
  & input:read-only {
    background: white;
  }
  & input {
    text-overflow: ellipsis;
  }
`;

export const DropdownButton = styled.span`
  //right: 8px;
  //bottom: 0;
  //border-radius: 0px 8px 8px 0px;
  //box-shadow: unset;
  //background: transparent;
  //&.icon {
  //  padding: 8px 16px;
  //}
  flex-shrink: 0;
`;

export const StyledDropdownList = styled(DropdownList)<StyledDropdownListProps>`
  width: 100%;
  left: 0;
  top: 100%;
  max-width: unset;
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : '175px')};
  display: unset;
`;

export const StyledListItem = styled(ListItem)`
  ${({ theme }) => theme.typography['small-regular']};
  justify-content: flex-start;
  padding: 12px 16px;
  & .select-all-checkbox,
  .multi-select-checkbox {
    padding-bottom: 0px;
    && {
    }
    .multi-select-checkbox-icon {
      margin-right: 8px;
    }
  }
  & .select-all-checkbox > label {
    ${({ theme }) => theme.typography['small-bold']};
  }
  & .multi-select-checkbox > label {
    ${({ theme }) => theme.typography['small-regular']};
  }
`;
