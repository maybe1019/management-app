import styled from 'styled-components';
import type { ColorProperties, TypographyProperties } from '../../../types';

export const LogoWrapper = styled.div<{ iconColor?: ColorProperties }>`
  &.iconColor {
    & > svg {
      & > path {
        fill: ${({ theme, iconColor }) => theme.colors[iconColor ?? 'dark']};
      }
    }
  }
`;

export const StyledBaseBadge = styled.div<{
  dark?: boolean;
  color?: string;
  background?: string;
  light?: boolean;
  badgeColor?: string;
  padding?: string;
  typography?: TypographyProperties;
}>`
  display: flex;
  gap: 0 6px;
  padding: ${({ padding }) => padding};
  ${({ typography, theme }) =>
    typography ? theme.typography[typography] : theme.typography['small-bold']};
  background: ${({ theme, dark, background, light, badgeColor }) => {
    if (badgeColor) return theme.colors[badgeColor];
    if (background) return theme.colors[background];
    if (light) return theme.colors['light-gray'];
    return theme.colors[dark ? 'dark' : 'medium-gray'];
  }};
  color: ${({ theme, dark, color }) => {
    if (color) return theme.colors[color];
    return theme.colors[dark ? 'white' : 'dark'];
  }};
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  align-items: center;
  white-space: nowrap;
  & svg {
    height: 24px;
    width: 24px;
  }
  &.transparent {
    background: transparent;
    padding: 0px 4px;
  }
  &.pill {
    padding: 4px 8px;
    border-radius: 16px;
  }
`;
