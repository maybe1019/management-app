import styled from 'styled-components';
import { RiskScoreMain } from './RiskScore.types';

export const RiskScoreCircle = styled.div<RiskScoreMain>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors['light-blue']};
  svg {
    path {
      stroke: ${({ theme }) => theme.colors.blue};
    }
    stroke: ${({ theme }) => theme.colors.blue};
  }
`;

export const RiskScoreContainer = styled.div`
  display: flex;
  gap: 0 40px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const RiskScoreCircleContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
`;

export const RiskScoreTrendContainer = styled.div`
  min-width: 190px;
  width: 100%;
  height: 60px;
`;

export const RiskScoreDenotation = styled.div`
  margin-left: 8px;
  .scoreValue {
    ${({ theme }) => {
      return {
        ...theme.typography.bold,
        color: theme.colors.dark,
      };
    }}
    margin: 0;
    padding: 0;
  }
  .scoreOutOf {
    &:before {
      content: '/ ';
    }
    ${({ theme }) => {
      return {
        ...theme.typography['xsmall-bold'],
        color: theme.colors.gray,
      };
    }}
    margin: 0;
    padding: 0;
  }
`;
