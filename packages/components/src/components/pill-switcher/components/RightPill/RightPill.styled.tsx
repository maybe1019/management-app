import styled from 'styled-components';
import { Text } from '../../../';
import {
  ButtonDropdownContainer,
  DropdownList,
} from '../../../button-dropdown/ButtonDropdown.styled';

type RightPillProps = { width: string };

export const PillContainer = styled(ButtonDropdownContainer)``;

export const PillText = styled(Text)`
  ${({ theme }) => theme.typography['small-regular']};
  color: ${({ theme }) => theme.colors['extra-dark']};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const RightPillButton = styled.button<RightPillProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: unset;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: 40px;
  outline: none;
  padding: 8px 16px;
  position: relative;
  transition: all 0.3s;
  width: ${({ width }) => width};
  white-space: nowrap;
  gap: 24px;

  &:hover {
    color: ${({ theme }) => theme.colors.gray};
  }

  &:active {
    color: ${({ theme }) => theme.colors.gray};
    border: 1px solid ${({ theme }) => theme.colors.blue};
    path: ${({ theme }) => theme.colors.blue};
  }
`;

export const PillDropdownList = styled(DropdownList)<RightPillProps>`
  margin-top: 3px;
  min-width: 110px;
  width: ${({ width }) => width};
`;
