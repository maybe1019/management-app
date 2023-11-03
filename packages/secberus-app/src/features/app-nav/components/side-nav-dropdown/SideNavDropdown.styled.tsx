import styled, { css, keyframes } from 'styled-components';
import { Text } from '@secberus/components';
import { ChevronDownDark } from '@secberus/icons';
import {
  DropdownListProps,
  SideNavDropdownProps,
} from './SideNavDropdown.types';

const emptyKeyframe = keyframes``;

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

const TextOverflowEllpsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
`;

const chevronBase = css`
  width: 20px;
  height: 20px;
  path {
    stroke: ${({ theme: { colors } }) => colors.gray};
  }
`;

export const Container = styled.div<
  Pick<SideNavDropdownProps, 'variant' | 'dividerTop' | 'dividerBottom'>
>`
  display: grid;
  grid-template-columns: 90% 10%;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  width: 100%;
  border-top: ${({ theme: { colors }, variant, dividerTop }) =>
    dividerTop
      ? `1px solid ${
          variant === 'dark' ? colors['medium-gray'] : colors['extra-dark']
        }`
      : 'none'};
  border-bottom: ${({ theme: { colors }, variant, dividerBottom }) =>
    dividerBottom
      ? `1px solid ${
          variant === 'dark' ? colors['medium-gray'] : colors['extra-dark']
        }`
      : 'none'};

  & .main-icon {
    flex-shrink: 0;
    circle {
      stroke: ${({ theme: { colors }, variant }) =>
        variant === 'dark' ? colors.dark : colors.white};
    }
    path {
      fill: ${({ theme: { colors }, variant }) =>
        variant === 'dark' ? colors.dark : colors.white};
    }
  }
  &:hover {
    p,
    span {
      color: ${({ theme: { colors } }) => colors.blue};
    }
    & .main-icon {
      circle {
        stroke: ${({ theme: { colors } }) => colors.blue};
      }
      path {
        fill: ${({ theme: { colors } }) => colors.blue};
      }
    }
  }
`;

export const DropdownList = styled.div<DropdownListProps>`
  position: absolute;
  left: 0;
  z-index: 200;
  box-sizing: border-box;
  padding-inline-start: 0;
  overflow: auto;
  margin-block-start: 0;
  width: fit-content;
  height: fit-content;
  box-shadow: ${({ elevation }) =>
    elevation ? '0px 8px 24px rgba(0, 0, 0, 0.08)' : 'none'};
  animation: ${({ direction }) => {
      return direction === 'UP' ? emptyKeyframe : growDown;
    }}
    ease-in-out 0.2s;
  transform-origin: top center;
  ${({ direction, offset, rowHeight = 48, maxRows }) => {
    if (direction === 'UP') {
      return {
        left: `${offset?.left ?? 0}px`,
        top: `calc(-100% - ${rowHeight * 2 + 4 + (offset?.bottom ?? 0)}px)`,
      };
    }
    return {
      left: `${offset?.left ?? 0}px`,
      top: `calc(100% + ${offset?.top ?? 0})`,
    };
  }}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  flex-basis: 0;
  flex-grow: 0;
`;

export const MainText = styled(Text)<Pick<SideNavDropdownProps, 'variant'>>`
  ${TextOverflowEllpsis};
  ${({ theme: { typography } }) => typography['small-bold']};
  color: ${({ theme: { colors }, variant }) =>
    variant === 'dark' ? colors.dark : colors.white};
`;

export const SubText = styled.span<Pick<SideNavDropdownProps, 'variant'>>`
  ${TextOverflowEllpsis};
  ${({ theme: { typography } }) => typography['xsmall-regular']};
  margin-top: -2px;
  color: ${({ theme: { colors }, variant }) =>
    variant === 'dark' ? colors['dark-gray'] : colors['medium-gray']};
`;

export const StyledChevronDown = styled(ChevronDownDark)<
  Pick<DropdownListProps, 'direction'>
>`
  flex-shrink: 0;
  ${chevronBase};
  ${({ direction }) => ({
    transform: direction === 'UP' ? 'rotate(180deg)' : 'none',
  })}
`;
