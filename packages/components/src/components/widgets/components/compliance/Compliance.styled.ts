import styled, { css } from 'styled-components';
import { ComplianceContainerProps } from './Compliance.types';

export const ComplianceContainer = styled.div<ComplianceContainerProps>`
  display: flex;
  gap: 0 38px;
  justify-content: space-between;
  align-items: flex-end;
  .trend-text {
    text-align: right;
  }
  // When trend chart present, shift up to compensate for default 6px top padding for active dot
  ${({ showTrendChart }) =>
    showTrendChart &&
    css`
      transform: translateY(-6px);
    `};
`;

export const ComplianceDonutContainer = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
`;

export const ComplianceTrendContainer = styled.div`
  min-width: 190px;
  width: 100%;
  height: 86px;
`;
