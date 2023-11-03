import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ChevronDownDark, ChevronRightDark } from '@secberus/icons';
import {
  NavItemProps,
  NavItemIconProps,
  NavItemExpandableBodyProps,
  NavItemWrapperProps,
} from './NavItem.types';

const base = css<NavItemProps>`
  height: 100%;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  ${props =>
    css`
      margin-left: ${props.alignRight && 'auto'};
      margin-right: ${props.alignLeft && 'auto'};
      display: ${props.visibleAfter && 'none'};
    `}
  @media ${props => props.visibleAfter} {
    display: flex;
  }
  text-align: unset;
  .margin {
    &--dense {
      padding-left: 8px;
      padding-right: 8px;
    }
    &--normal {
      padding-left: 20px;
      padding-right: 20px;
    }
    &--none {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export const NavItemWrapper = styled.div<NavItemWrapperProps>`
  ${({ horizontalSpacing }) => {
    switch (horizontalSpacing) {
      case 'dense':
        return `padding-left: 8px; padding-right: 8px;`;
      case 'normal':
        return `padding-left: 20px; padding-right: 20px;`;
      case 'none':
        return `padding-left: 0px; padding-right: 0px;`;
      default:
        return '';
    }
  }}
  ${({ verticalSpacing }) => css`
    padding-top: ${verticalSpacing?.top ? verticalSpacing.top : 0}px;
    padding-bottom: ${verticalSpacing?.bottom ? verticalSpacing.bottom : 0}px;
  `}
`;

export const StyledNavLink = styled(NavLink)<NavItemProps>`
  ${base};
  &:hover {
    text-decoration: none;
  }
  text-decoration: none;
  &.active,
  &:focus {
    p {
      color: ${props =>
        props.parentNavLink
          ? props.theme.colors.white
          : props.theme.colors.blue};
    }
  }
  &:hover {
    p {
      color: ${props => props.theme.colors.blue};
    }
  }
  ${props =>
    css`
      display: ${props.parentNavLink && 'flex'};
      justify-content: ${props.parentNavLink && 'space-between'};
      align-items: ${props.parentNavLink && 'center'};
      padding: ${props.parentNavLink && 0};
    `}
`;

export const StyledNavButton = styled.button<NavItemProps>`
  ${base};
  &:hover {
    p {
      color: ${props => props.theme.colors.blue};
    }
  }
`;

export const StyledNavItem = styled.div<NavItemProps>`
  ${base};
`;

export const StyledNavItemExpandableBody = styled.div<NavItemExpandableBodyProps>`
  padding-top: 8px;
  ${props =>
    css`
      padding-top: ${!props.open && 0};
      height: ${!props.open && 0};
      overflow: ${!props.open && 'hidden'};
    `}
  > * {
    padding-left: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export const StyledNavItemIcon = styled.div<NavItemIconProps>`
  ${props =>
    css`
      padding-right: ${props.paddingRight && '12px'};
    `};
`;

const chevronBase = css`
  width: 20px;
  height: 20px;
  path {
    stroke: ${({ theme: { colors } }) => colors.gray};
  }
`;

export const StyledChevronDown = styled(ChevronDownDark)`
  ${chevronBase};
`;

export const StyledChevronRight = styled(ChevronRightDark)`
  ${chevronBase};
`;
