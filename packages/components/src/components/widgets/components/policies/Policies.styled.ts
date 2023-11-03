import styled from 'styled-components';
import { PoliciesCircleMain } from './Policies.types';

export const PoliciesScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const PoliciesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: flex-end;
  height: 100%;
  .policiesScore {
    ${({ theme }) => theme.typography.bold}
  }
  .scoreChange {
    ${({ theme }) => ({
      ...theme.typography['xsmall-bold'],
      color: theme.colors.gray,
    })}
  }
  .spacingRight {
    margin-right: 8px;
  }
`;
export const PoliciesCircle = styled.div<PoliciesCircleMain>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors['medium-gray']};
  background-size: cover;
  svg {
    height: 24px;
    width: 24px;
  }
`;

export const ProgressMargin = styled.div`
  margin-left: 24px;
`;
