import styled from 'styled-components';
import { ComplianceCircleMain } from './Compliance.types';

export const ComplianceScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
`;

export const ComplianceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  .complianceScore {
    ${({ theme }) => theme.typography.bold}
  }
`;
export const ComplianceCircle = styled.div<ComplianceCircleMain>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-image: ${({ theme, compliance }) => {
    if (compliance >= 0 && compliance < 10) {
      return theme.gradients.red;
    }
    if (compliance >= 10 && compliance < 40) {
      return theme.gradients.purple;
    }
    if (compliance >= 40 && compliance < 70) {
      return theme.gradients.blue;
    }
    return theme.gradients.green;
  }};
  svg {
    path {
      stroke: white;
    }
  }
`;
