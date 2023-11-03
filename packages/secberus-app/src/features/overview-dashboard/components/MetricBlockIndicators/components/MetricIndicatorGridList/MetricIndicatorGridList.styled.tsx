import styled from 'styled-components';

export const DashboardMetricBlockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 24px;
  .metric_container {
    flex-basis: calc(50% - 12px);
    min-width: 190px;
  }
`;
