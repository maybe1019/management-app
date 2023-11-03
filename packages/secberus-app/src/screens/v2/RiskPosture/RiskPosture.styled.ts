import styled from 'styled-components/macro';
import { RiskBadge, ViolationsBadge } from '@secberus/components';

export const StyledViolationsBadge = styled(ViolationsBadge)`
  border-radius: 16px;
`;

export const StyledRiskBadge = styled(RiskBadge)`
  padding: 4px 8px;
  border-radius: 16px;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  grid-gap: 20px;
`;

export const RiskPostureHeader = styled.div`
  padding-bottom: 40px;
  padding-top: 40px;
`;

export const RiskPosturePolicyCell = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  display: flex;
  align-items: center;
  min-width: 0;
  & > p {
    ${({ theme }) => theme.typography.smallBold}
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
    margin-bottom: 0em;
    margin-top: 0em;
  }
`;

export const RiskPostureCategoryCell = styled.span`
  ${({ theme }) => theme.typography['small-regular']};
  color: ${({ theme }) => theme.colors.dark};
  white-space: normal;
`;

export const ScreenPadding = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  height: calc(100vh - 72px);
`;

export const RiskPosturePoliciesCell = styled.div`
  display: flex;
  ${props => props.theme.typography['xsmall-regular']};
  color: ${props => props.theme.colors['extra-dark']};
`;

export const RiskPosturePoliciesCellNumerator = styled.span`
  ${props => props.theme.typography['xsmall-bold']}
  color: ${props => props.theme.colors['extra-dark']};
`;

export const RiskPosturePoliciesCellDenominator = styled.span`
  color: ${props => props.theme.colors['extra-dark']};
`;

export const DivisonSign = styled.div`
  margin-left: 4px;
  margin-right: 4px;
  color: ${props => props.theme.colors['extra-dark']};
`;

export const RiskPosturePriorityCell = styled.span`
  ${props => props.theme.typography['xsmall-regular']}
  color: ${({ theme }) => theme.colors['extra-dark']};
`;

export const FilterContainer = styled.div`
  margin-left: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
`;
