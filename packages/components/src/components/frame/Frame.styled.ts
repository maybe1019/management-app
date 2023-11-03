import styled from 'styled-components';
import { Text } from '../text/Text.component';
import { FrameMain } from './Frame.types';

export const StyledText = styled(Text)<FrameMain>`
  padding: 16px 20px;
`;

export const FrameContainer = styled.div<FrameMain>`
  width: calc(
    100% - ${({ borderSize }) => `${borderSize ? borderSize : '2'}px`}
  );
  padding: 16px;
  border-radius: 16px;
  ${({ theme, borderSize, borderColor }) =>
    borderSize && borderColor
      ? `border: ${borderSize}px solid ${theme.colors[borderColor]};`
      : ''}
  ${({ backgroundColor, theme }) => {
    if (backgroundColor) {
      return `background: ${theme.colors[backgroundColor]};`;
    }
    return;
  }}
  ${({ isVisible }) => (!isVisible ? 'display: none;' : '')} &.primary {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors['dark-gray']};
  }
  &.secondary {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.dark};
    border: 1px solid ${({ theme }) => theme.colors['dark-gray']};
  }
  &.tertiary {
    color: ${({ theme }) => theme.colors.dark};
    background: ${({ theme }) => theme.colors.white};
  }
`;
