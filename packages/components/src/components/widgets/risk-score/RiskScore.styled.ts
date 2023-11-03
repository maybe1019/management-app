// TODO: See if this file actually is used
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
  background-image: ${({ score, theme }) => {
    switch (true) {
      case score && score >= 40 && score < 70:
        return theme.gradients.blue;
      case score && score >= 70 && score < 90:
        return theme.gradients.purple;
      case score && score >= 90:
        return theme.gradients.red;
      default:
        return theme.gradients.green;
    }
  }};
  svg {
    path {
      stroke: white;
    }
    stroke: white;
  }
`;

export const RiskScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
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
        ...theme.typography.caption,
        color: theme.colors.gray,
      };
    }}
    margin: 0;
    padding: 0;
  }
`;
