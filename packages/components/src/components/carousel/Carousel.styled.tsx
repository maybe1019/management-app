import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: calc(100% - 88px);
  display: flex;
  overflow-x: hidden;
  gap: 8px;
`;

export const CarouselControlContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 40px 4px 8px;
  justify-content: left;
  align-items: center;
  box-shadow: -3px 0px 3px 0px rgba(30, 30, 50, 0.04);
`;
