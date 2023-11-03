import styled, { CSSProperties } from 'styled-components';
import { styledOnHoverScrollbar } from '../../css';
import { NavigationVariant } from './Navigation.types';

interface NavigationWrapperProps extends CSSProperties {
  preventScroll?: boolean;
  variant?: NavigationVariant;
}

export const NavigationWrapper = styled.div<NavigationWrapperProps>`
  padding: 0;
  height: 100%;
  border-right: 1px solid ${({ theme: { colors }, variant }) =>
    variant === 'light' ? colors['medium-gray'] : 'transparent'};
  background-color: ${({ theme: { colors }, variant }) =>
    variant === 'light' ? colors['light-gray'] : colors.dark}};
`;

export const NavigationScrollbox = styled.div<NavigationWrapperProps>`
  ${({ variant }) => styledOnHoverScrollbar(variant !== 'light')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  width: 232px;
  height: inherit;
  // Using preventScroll helps maintain organization select z-index while select
  // is expanded. It is also applied to the Layout component
  overflow-y: ${({ preventScroll }) => (preventScroll ? 'unset' : 'auto')};
  overflow-x: hidden;
  background: ${({ theme: { colors }, variant }) =>
    variant === 'light' ? colors['light-gray'] : colors.dark};
`;

export const NavigationBody = styled.div`
  flex: 1;
  justify-content: flex-start;
`;

export const NavigationFooter = styled.div``;

export const NavItemsWrapper = styled.div`
  padding-bottom: 24px;

  &:nth-child(1) {
    // Nav items in footer
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
  }
`;
