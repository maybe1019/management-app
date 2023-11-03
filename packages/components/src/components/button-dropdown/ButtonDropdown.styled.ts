import styled, { keyframes } from 'styled-components';

export interface DropdownListProps {
  rowHeight?: number;
  maxRows?: number;
  alignRight?: boolean;
  listWidth?: string;
  listTop?: string;
}

export interface ListItemProps {
  rowHeight?: number;
}

export const ButtonDropdownContainer = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
`;

const growDown = keyframes`
  0% {
      transform: scaleY(0)
  }
  80% {
      transform: scaleY(1.1)
  }
  100% {
      transform: scaleY(1)
  }
`;

export const DropdownList = styled.ul<DropdownListProps>`
  right: ${({ alignRight }) => (alignRight ? '0px' : 'unset')};
  min-width: 130px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  top: ${({ listTop = '100%' }) => listTop};
  z-index: 200;
  width: ${({ listWidth }) => listWidth ?? 'fit-content'};
  box-sizing: border-box;
  background: white;
  list-style: none;
  padding-inline-start: 0px;
  max-height: ${({ rowHeight = 48, maxRows = 7 }) =>
    `${rowHeight * maxRows}px`};
  overflow: auto;
  margin-block-start: 0em;
  animation: ${growDown} 0.2s ease-in-out;
  transform-origin: top center;
  ${({ theme }) => theme.typography['small-bold']};
`;

export const ListItem = styled.li<ListItemProps>`
  display: flex;
  white-space: normal;
  height: fit-content;
  justify-content: space-between;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  cursor: pointer;
  outline: none;
  padding: 12px;
  box-sizing: border-box;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${({ theme }) => theme.colors['light-gray']};
  }
  &:active {
    background: ${({ theme }) => theme.colors['medium-gray']};
  }
  &.selected {
    p,
    span {
      color: ${({ theme }) => theme.colors.blue};
    }
    & > svg {
      & > path {
        stroke: ${({ theme }) => theme.colors.blue};
      }
    }
  }
`;
