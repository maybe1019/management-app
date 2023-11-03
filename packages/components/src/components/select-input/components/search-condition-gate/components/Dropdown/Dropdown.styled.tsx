import styled from 'styled-components';
import { DropdownButtonProps, DropdownSelectProps } from './Dropdown.types';

export const DropdownContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  position: relative;
`;

export const DropdownButton = styled.button<DropdownButtonProps>`
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
  color: ${({ theme, color }) => theme.colors[color]};
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.typography['small-bold']};
  font-weight: 600;
  line-height: 24px;
  width: 152px;
  height: 48px;
  padding: 12px 12px 12px 20px;
  border: ${({ theme, isOpen, backgroundColor }) =>
    `${
      isOpen
        ? `1px solid ${theme.colors.blue}`
        : `1px solid ${theme.colors[backgroundColor]}`
    }`};
  border-radius: 24px 0px 0px 24px;
  margin-left: ${({ labelMargin }) => labelMargin};
  position: relative;
  span {
    max-width: calc(100% - 24px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  svg {
    height: 24px;
    width: 24px;
    margin-right: 0px;

    path {
      stroke: ${({ theme, color, isOpen }) =>
        `${isOpen ? theme.colors.blue : theme.colors[color]}`};
    }
  }

  &:focus {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}}`};
  }
  &:active {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}}`};
  }
`;

// Disabled because wont lint in vscode if formatted
// eslint-disable-next-line
export const ListContainer = styled.ul<Pick<DropdownSelectProps, 'maxHeight'>>`
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  width: 265px;
  padding-left: 0px;
  margin-top: 0;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ maxHeight }) => (maxHeight ? { maxHeight } : {})}
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);

  list-style: none;

  li:last-child {
    border-bottom: none;
  }
`;

export const ListItem = styled.li`
  width: 265px;
  padding: 12px 16px;
  cursor: pointer;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;

  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};

  &:hover {
    background-color: ${({ theme }) => theme.colors['medium-gray']};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors['medium-gray']};
  }
`;
