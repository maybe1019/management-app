import styled from 'styled-components';
import { BaseBadge } from '../base-badge/BaseBadge.component';

interface StyledBadgeProps {
  violations?: number;
}

export const StyledViolationsBadge = styled(BaseBadge)<StyledBadgeProps>`
  white-space: nowrap;
  flex-wrap: nowrap;
  background: ${({ theme }) => {
    return theme.colors['medium-gray'];
  }};
  & path,
  circle {
    stroke: ${({ theme }) => {
      return theme.colors.gray;
    }};
  }
  & > p {
    color: ${({ theme }) => {
      return theme.colors.dark;
    }};
  }
  &.dark {
    background: ${({ theme }) => {
      return theme.colors['dark-gray'];
    }};
    & > p {
      color: ${({ theme }) => theme.colors.white};
    }
    & path,
    circle {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }
  &.light {
    background: ${({ theme }) => theme.colors['light-gray']};
    & > p {
      color: ${({ theme }) => theme.colors.dark};
    }
    & path,
    circle {
      stroke: ${({ theme }) => {
        return theme.colors.gray;
      }};
    }
  }
`;
