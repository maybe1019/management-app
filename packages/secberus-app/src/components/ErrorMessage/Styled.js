import styled from 'styled-components/macro';

export const ErrorContainer = styled.div`
  width: 100%;
  height: ${({ height = 'calc(100vh - 72px)' }) => height};
  display: grid;
  align-content: center;
  grid-template-rows: repeat(2, 100px);
  align-items: center;
  * {
    justify-self: center;
  }
`;
