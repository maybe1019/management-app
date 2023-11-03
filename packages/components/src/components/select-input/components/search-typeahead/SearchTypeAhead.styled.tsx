import Downshift from 'downshift';
import styled from 'styled-components';
import { ColorProperties } from '../../../../types';
import { DropdownList } from '../../../button-dropdown/ButtonDropdown.styled';
import { BaseStyledInput } from '../../../text-input/base/BaseInput.styled';

type OuterInputProps = { backgroundColor: ColorProperties };

export const OuterInput = styled(BaseStyledInput)<OuterInputProps>`
  display: flex;
  gap: 4px;
  min-height: 20px;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  background: ${({ backgroundColor }) => backgroundColor};

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
  max-width: unset;
  z-index: 999;
  position: absolute;
`;

export const StyledDownShift = styled(Downshift)`
  width: 100%;
  border-radius: 38px;
`;

export const Container = styled.div`
  position: relative;
`;
