import styled, { css } from 'styled-components';
import { Text } from '@secberus/components';
import { AnimatedExpandIconProps } from './OrganizationSelect.types';

const TextOverflowEllpsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
`;

export const Container = styled.div`
  flex: 1;
  width: 100%;
  cursor: default;
`;

export const SelectTrigger = styled.div<React.HTMLAttributes<HTMLElement>>`
  display: grid;
  grid-template-columns: 90% 10%;
  padding: 8px 12px;
  width: 100%;
  height: auto;
  min-height: 58px;
  border-radius: 8px;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
  transition: border 0.3s;
  ${({ theme }) => theme.typography['small-bold']};
  background: ${({ theme }) => theme.colors['light-gray']};
  color: ${({ theme }) => theme.colors.dark};
  border: 1px solid transparent;
  & > svg {
    flex-shrink: 0;
    & > path {
      fill: ${({ theme }) => theme.colors.gray};
    }
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
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  }
  &.active {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
    & svg {
      & > path {
        fill: ${({ theme }) => theme.colors.blue};
      }
    }
  }
  &.dark {
    background: ${({ theme }) => theme.colors['dark-gray']};
    color: ${({ theme }) => theme.colors.white};
    &.disabled {
      color: ${({ theme }) => theme.colors['gray']};
    }
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  flex-basis: 0;
  flex-grow: 0;
`;

export const OrgName = styled(Text)`
  ${TextOverflowEllpsis};
  ${({ theme: { typography } }) => typography['small-bold']};
  color: #ffffff;
`;

export const AccountDisplayName = styled(Text)`
  ${TextOverflowEllpsis};
  ${({ theme: { typography } }) => typography['xsmall-bold']};
  margin-top: -4px;
  color: ${({ theme: { colors } }) => colors['medium-gray']};
`;

export const AnimatedIcon = styled.div<AnimatedExpandIconProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  & .icon {
    transition: all 0.3s;
    & > path {
      fill: ${({ theme }) => theme.colors.gray};
    }
    &.top-icon {
      transform: rotate(180deg);
    }
    ${({ open }) =>
      open &&
      css`
        &.top-icon {
          transform: rotate(180deg) translateY(-2px);
        }
        &.bottom-icon {
          position: absolute;
          z-index: 1;
          transform: translateY(-2px);
        }
      `};
  }
`;
