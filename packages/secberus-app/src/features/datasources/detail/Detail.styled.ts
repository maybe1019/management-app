import styled from 'styled-components';

export const PageHeader = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr auto;
  padding: 40px;
  background: #dfe7ef;
  width: 100%;
  gap: 24px;
`;

export const DetailTableSectionContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  min-height: calc(100vh - 72px);
  min-height: unset;
  height: 100%;
  grid-template-rows: unset;
`;

export const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;
  min-height: calc(100vh - 72px);
`;
