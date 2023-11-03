import styled, { css, keyframes } from 'styled-components';
import { styledScrollbar } from '../../css';
import { ListContainerProps, ListBodyProps, ListItemProps } from './List.types';

const activeStyles = css`
  p,
  span {
    color: ${({ theme }) => theme.colors.blue};
  }
  & > svg {
    & > path {
      stroke: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const growDown = keyframes`
  0% {
      transform: scaleY(0);
  }
  80% {
      transform: scaleY(1.1);
  }
  100% {
      transform: scaleY(1);
  }
`;

export const ListContainer = styled.div<ListContainerProps>`
  width: ${({ width }) => (width ? width : '240px')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : '0'};
  box-shadow: ${({ elevation }) =>
    elevation ? '0px 8px 24px rgba(0, 0, 0, 0.08)' : 'none'};
  overflow: hidden;
  animation: ${({ disableAnimation }) =>
    disableAnimation
      ? 'none'
      : css`
          ${growDown} ease-in-out 0.2s
        `};
  transform-origin: top center;
`;

export const ListBody = styled.ul<ListBodyProps>`
  ${styledScrollbar(false)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  list-style: none;
  max-height: ${({ rowHeight = 48, maxRows = 7 }) =>
    `${rowHeight * maxRows}px`};
  overflow: auto;
  ${({ theme }) => theme.typography['small-bold']};
`;

export const ListFooter = styled.div`
  display: flex;
  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.08);
`;

export const ListItem = styled.li<ListItemProps>`
  display: flex;
  white-space: normal;
  padding: 12px 16px;
  min-height: ${({ rowHeight }) => (rowHeight ? `${rowHeight}px` : '48px')};
  height: auto;
  justify-content: space-between;
  align-items: center;
  outline: none;
  box-sizing: border-box;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
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
    ${activeStyles};
  }
  &.destructive p {
    color: ${({ theme }) => theme.colors.red};
  }
  &.disabled {
    pointer-events: none;
    & p {
      color: ${({ theme }) => theme.colors['gray']};
    }
    & svg {
      & > path {
        fill: ${({ theme }) => theme.colors['gray']};
      }
    }
    & > .dark {
      & p {
        color: ${({ theme }) => theme.colors['dark-gray']};
        opacity: 0.24;
      }
      & svg {
        opacity: 0.24;
      }
    }
  }
  & .list-item-icon {
    flex-shrink: 0;
  }
`;

export const StyledActionItem = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  height: inherit;
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    ${activeStyles};
  }
`;
