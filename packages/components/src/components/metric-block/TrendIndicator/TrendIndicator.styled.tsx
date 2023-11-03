import styled from 'styled-components';
import { Text } from '../../';
import { theme } from '../../../styles/theme';

type MetricTrendProp = {
  noChange?: boolean;
  hasColor?: boolean;
  arrowDirection?: 'up' | 'down';
  isInverted?: boolean;
};

export const InfoLoadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 23px;
`;

export const SpinnerWrapper = styled.div`
  padding-top: 18px;
  text-align: center;
`;

export const MetricSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MetricCount = styled(Text)`
  ${({ theme }) => theme.typography.small};
`;

const RED = `background: ${theme.gradients.red}`;
const GREEN = `background: ${theme.gradients.green}`;

const setColor = (
  theme: any,
  hasColor?: boolean,
  isInverted?: boolean,
  arrowDirection?: 'up' | 'down'
): string | undefined => {
  if (hasColor && isInverted) {
    return arrowDirection === 'up' ? RED : GREEN;
  }
  if (hasColor) {
    return arrowDirection === 'up' ? GREEN : RED;
  }
  return;
};

export const MetricTrend = styled.div<MetricTrendProp>`
  display: flex;
  align-items: center;
  gap: 8px;

  & svg {
    & path {
      stroke: ${({ theme, hasColor, noChange = false }) =>
        hasColor || noChange ? theme.colors.white : theme.colors.dark};
      stroke-width: 3px;
    }
    background: ${({ theme }) => theme.colors['medium-gray']};
    border-radius: 50%;

    ${({ theme, hasColor, isInverted, arrowDirection }) =>
      setColor(theme, hasColor, isInverted, arrowDirection)}
  }
`;

export const MetricTrendText = styled.div`
  ${({ theme }) => theme.typography['small-regular']};
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;
