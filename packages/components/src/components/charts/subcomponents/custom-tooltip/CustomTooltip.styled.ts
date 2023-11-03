import styled, { css } from 'styled-components';
import { StyledTooltipProps } from './CustomTooltip.types';

export const StyledTooltip = styled.div<StyledTooltipProps>`
  ${({ isPortaled, x, y }) =>
    isPortaled &&
    css`
      position: fixed;
      bottom: unset;
      left: ${x}px;
      top: ${y}px;
      width: min-content;
      max-width: max-content;
    `};

  width: auto;
  padding: 6px 16px;
  background: ${({ theme }) => theme.colors['dark-gray']};
  border-radius: 8px;
  transform: translateY(-15px);

  ::after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid ${({ theme }) => theme.colors['dark-gray']};
  }

  .dateText {
    min-width: max-content;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
