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
  height: 100%;
  .policiesScore {
    ${({ theme }) => theme.typography.bold}
  }
  .scoreChange {
    ${({ theme }) => ({
      ...theme.typography.caption,
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
  background-image: ${props => props.theme.gradients.blue};
  background-size: cover;
  svg {
    height: 24px;
    width: 24px;
    path {
      stroke: white;
    }
  }
`;
