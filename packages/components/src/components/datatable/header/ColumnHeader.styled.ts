import styled, { css } from 'styled-components';
import { HeaderProps } from './ColumnHeader.types';

export const HeaderSort = styled.button<HeaderProps>`
  align-items: center;
  background: unset;
  text-align: left;
  border: 0;
  white-space: nowrap;
  display: flex;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  height: 32px;
  padding: 8px;
  cursor: pointer;
  svg {
    path {
      fill: ${props => props.theme.colors.gray};
    }
  }
  ${({ width }) =>
    width &&
    css`
      width: ${typeof width === 'number' ? `${width}px` : width};
      min-width: ${typeof width === 'number' ? `${width}px` : width};
    `}
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
    `}
`;

export const TableColumnHeader = styled.div<HeaderProps>`
  padding: 8px;
  background: unset;
  text-align: left;
  border: 0;
  min-width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width};
  white-space: nowrap;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  ${({ width }) =>
    width &&
    css`
      width: ${typeof width === 'number' ? `${width}px` : width};
    `}
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
    `}
`;
