import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background: #111122;
  & .hide {
    display: none;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto;
  gap: 24px;
  background: #1e1e32;
  padding: 40px;
  position: relative;
  & > p {
    grid-column: 1/3;
  }
  & .addEditPolicy__close {
    grid-column: 3/4;
    margin-left: auto;
  }
`;
