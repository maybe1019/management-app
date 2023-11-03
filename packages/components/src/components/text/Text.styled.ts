import styled from 'styled-components';
import { TextProps, TextColors } from './Text.types';

export const StyledText = styled.p<TextProps>`
  font-stretch: normal;
  letter-spacing: normal;
  margin-block-start: 0em;
  margin-block-end: 0em;
  ${({ theme, type }) => theme.typography[type!]};
  color: ${({ theme, color }) => theme.colors[color!]};
  text-align: ${({ align }) => align};
`;

export const StyledTextColorSelector = styled(StyledText)<TextColors>`
  ${({ color, light, dark, theme }) => {
    if (color) {
      return { color: theme.colors[color] };
    }
    if (dark) {
      return {
        color: theme.colors['medium-gray'],
      };
    }
    if (light) {
      return { color: theme.colors['dark'] };
    }
    return;
  }};
`;
