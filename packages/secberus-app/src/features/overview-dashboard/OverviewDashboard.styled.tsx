import styled from 'styled-components';

export const DashboardColumn = styled.div`
  flex: 1;
`;

export const DashboardContainer = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: stretch;
  max-width: 1800px;
  ${DashboardColumn} {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex-basis: calc(50% - 24px);
    min-width: 400px;
  }
`;
