import styled from 'styled-components';
import { ListItemProps } from './ListItem.types';

export const StyledListItem = styled.li<ListItemProps>`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 10px;
  height: fit-content;
  cursor: pointer;
  outline: none;
  overflow: scroll hidden;
  text-overflow: ellipsis;
  padding: 12px 16px;
  min-height: ${({ rowHeight }) => `${rowHeight}px`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  &:hover {
    background: ${({ theme }) => theme.colors['light-gray']};
  }
  &:active {
    background: ${({ theme }) => theme.colors['medium-gray']};
  }
  &.selected {
    p {
      color: ${({ theme }) => theme.colors.blue};
    }
    & > svg {
      & > path {
        stroke: ${({ theme }) => theme.colors.blue};
      }
    }
  }
`;
