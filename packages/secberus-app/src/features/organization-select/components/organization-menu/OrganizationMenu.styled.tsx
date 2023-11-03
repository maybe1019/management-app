import styled, { css } from 'styled-components';
import { styledScrollbar } from '@secberus/components';
import type {
  DropdownListProps,
  ListItemProps,
} from './OrganizationMenu.types';

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

export const CardContainer = styled.div`
  position: absolute;
  left: 0;
  z-index: 1000;
  margin: 8px;
  width: 362px;
  max-width: 362px;
  height: auto;
  box-sizing: border-box;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;

export const CardBody = styled.div`
  padding: 16px 16px 0;
`;

export const CardFooter = styled.div`
  display: flex;
  padding: 14px 32px;
  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.08);
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  background-color: #ffffff;
`;

export const OrgsDropdownList = styled.ul<DropdownListProps>`
  ${styledScrollbar(false)};
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  list-style: none;
  max-height: ${({ maxHeight, rowHeight = 48, maxRows = 6 }) =>
    `${maxHeight ? maxHeight : rowHeight * maxRows}px`};
  overflow: auto;
  ${({ theme }) => theme.typography['small-bold']};
`;

export const OrgsListItem = styled.li<ListItemProps>`
  display: flex;
  white-space: normal;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
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
    ${activeStyles};
  }
`;

export const StyledActionItem = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
  &:hover {
    ${activeStyles};
  }
`;
