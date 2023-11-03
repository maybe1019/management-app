import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronDown } from '@secberus/icons';
import { styledScrollbar } from '../../css';
import { SelectProps } from './Select.types';

interface SelectValueProps extends React.HTMLAttributes<HTMLElement> {
  maxTriggerWidth?: number;
  arrowColor: 'white' | 'gray';
  buttonShadow?: boolean;
}

interface SelectListProps {
  rowHeight: number;
  maxRows: number;
  reverseDirection?: boolean;
  direction?: SelectProps['direction'];
}

interface ListItemProps {
  rowHeight?: number;
}

export const StyledChevronDown = styled(ChevronDown)<
  Pick<SelectProps, 'direction'>
>`
  width: ${({ direction }) => ({
    transform: direction === 'UP' ? 'rotate(180deg)' : 'none',
  })};
`;

export const StyledSelectContainer = styled.div`
  display: flex;
  white-space: nowrap;
  flex-direction: column;
  position: relative;
  height: fit-content;
  ${({ theme }) => theme.typography['small-bold']};
  & .Select__label {
    margin-bottom: 4px;
  }
  & .Select__validation {
    margin-bottom: unset;
  }
  &.disabled {
    pointer-events: none;
    & p {
      color: ${({ theme }) => theme.colors['extra-dark']};
    }
  }
`;

export const SelectValue = styled.div<SelectValueProps>`
  display: flex;
  min-width: 240px;
  ${({ maxTriggerWidth }) =>
    maxTriggerWidth &&
    `
    min-width: unset;
    width: 240px;
    max-width: ${maxTriggerWidth}px;
  `}
  padding: 8px 16px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.3s;
  ${({ theme }) => theme.typography['small-regular']};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  box-shadow: ${({ theme }) => theme.shadows.button};
  & > svg {
    flex-shrink: 0;
    margin-left: 8px;
  }
  .error & {
    border: ${({ theme }) => `1px solid ${theme.colors.red}`};
  }
  &.disabled {
    background: ${({ theme }) => theme.colors['light-gray']};
    border-color: transparent;
    box-shadow: none;
    outline: none;
    color: ${({ theme }) => theme.colors['extra-dark']};
  }
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors['gray']}`};
    box-shadow: ${({ theme }) => theme.shadows.buttonHover};
  }
  &.active {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
    outline: ${({ theme }) => `4px solid ${theme.colors['light-blue']}`};
  }
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
const emptyKeyframe = keyframes``;

export const SelectList = styled.div<SelectListProps>`
  position: absolute;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  left: 0px;
  z-index: 200;
  min-width: 240px;
  width: 100%;
  box-sizing: border-box;
  background: white;
  list-style: none;
  padding-inline-start: 0px;
  max-height: ${({ rowHeight = 48, maxRows }) => `${rowHeight * maxRows}px`};
  overflow: auto;
  margin-block-start: 0em;
  animation: ${({ direction, reverseDirection }) => {
      return direction === 'UP' && !reverseDirection ? emptyKeyframe : growDown;
    }}
    ease-in-out 0.2s;
  transform-origin: top center;
  ${({ direction, rowHeight = 48, reverseDirection }) => {
    if (direction === 'UP' && !reverseDirection) {
      return {
        top: `calc(-100% - ${rowHeight * 2 + 4}px)`,
      };
    }
    return {
      top: '100%',
    };
  }}

  ${styledScrollbar()};
`;

export const ListItemWithIcon = styled.li<ListItemProps>`
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

export const ListItem = styled.li<ListItemProps>`
  display: grid;
  grid-template-columns: 90% 10%;
  align-items: center;
  white-space: normal;
  overflow: hidden;
  height: fit-content;
  min-height: ${({ rowHeight }) => `${rowHeight}px`};
  justify-content: space-between;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  cursor: pointer;
  outline: none;
  padding: 12px 16px;
  box-sizing: border-box;
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

export const HiddenInput = styled.input`
  display: none;
`;

export const TextContainer = styled.span`
  width: 90%;
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }
`;

interface ActionItemProps {
  onClick: () => void;
}

export const ActionListItem = styled(ListItem)<ActionItemProps>`
  position: sticky;
  bottom: 0;
  background: white;
  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.08);
  border-bottom: unset;
`;

export const ActionOption = styled.p`
  color: ${({ theme }) => theme.colors['dark-gray']};
  ${({ theme }) => theme.typography['small-bold']};
  padding-left: 8px;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 24px;
    width: 24px;
    & path {
      stroke: ${({ theme }) => theme.colors['dark-gray']};
    }
  }
`;
