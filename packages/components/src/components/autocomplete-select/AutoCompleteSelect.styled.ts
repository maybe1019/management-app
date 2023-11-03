import Downshift from 'downshift';
import styled from 'styled-components';
import {
  DropdownList,
  ListItem,
} from '../button-dropdown/ButtonDropdown.styled';
import { BaseStyledInput } from '../text-input/base/BaseInput.styled';

export const InnerInput = styled(BaseStyledInput)`
  &&& {
    border-radius: 0px !important;
    background: none;
    padding: 0;
    outline: none;
    width: 100%;
    flex: 1;
    min-width: 100px;
    height: 100%;
    border-style: none;
    margin-left: 4px;
    height: 32px;
  }
`;

export const OuterInput = styled(BaseStyledInput)<{ focused: boolean }>`
  && {
    border: ${({ theme, focused }) =>
      focused && `1px solid ${theme.colors.blue}`};
  }
  display: flex;
  gap: 4px;
  height: 100%;
  min-height: 24px;
  padding: 16px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  & button {
    padding-right: 36px;
    padding-left: 12px;
    height: 32px;
    svg {
      position: absolute;
      height: 24px;
      width: 24px;
      right: 4px;
    }
  }
`;

export const StyledDropdownList = styled(DropdownList)`
  width: 100%;
  left: 0;
  top: 100%;
  max-width: unset;
  max-height: 120px;
  display: unset;
`;

export const StyledListItem = styled(ListItem)``;

export const StyledDownShift = styled(Downshift)`
  width: 100%;
`;
