import styled from 'styled-components/macro';

export const ErrorPage = styled.div`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
  align-content: center;
  grid-template-rows: repeat(3, 100px);
  align-items: center;
  justify-content: center;
  gap: 36px;
  * {
    justify-self: center;
  }
`;
