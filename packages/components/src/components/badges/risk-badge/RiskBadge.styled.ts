import styled from 'styled-components';
import { BaseBadge } from '../base-badge/BaseBadge.component';
import { Text } from '../../text';

export const StyledRiskBadge = styled(BaseBadge)`
  width: fit-content;
  ${({ theme }) => theme.typography['small-bold']};
  background: ${({ theme }) => theme.colors['light-blue']};
  &.dark {
    background: ${({ theme }) => theme.colors['dark-blue']};
    & > p {
      color: ${({ theme }) => theme.colors.white};
    }
    & > svg {
      & > path {
        stroke: ${({ theme }) => theme.colors.white};
      }
    }
  }
  &.light {
    background: ${({ theme }) => theme.colors.white};
    & > p {
      color: ${({ theme }) => theme.colors.blue};
    }
    & > svg {
      & > path {
        stroke: ${({ theme }) => theme.colors.blue};
      }
    }
  }
  & > svg {
    & > path {
      stroke: ${({ theme }) => theme.colors.blue};
    }
  }
  ${({ background, theme }) =>
    background && {
      background: theme.colors[background || 'medium-gray'],
    }}
`;

export const RiskText = styled(Text)`
  color: ${({ theme }) => theme.colors.blue};
`;
