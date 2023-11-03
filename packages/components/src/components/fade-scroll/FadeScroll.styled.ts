import styled from 'styled-components';

export const FadeScrollContainer = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FadeLeft = styled.span`
  height: 100%;
  width: 25%;
  right: 0;
  top: 0;
  position: absolute;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgb(255, 255, 255)
  );
`;

export const FadeBottom = styled.span`
  width: 95%;
  height: 25%;
  left: 0;
  bottom: 0;
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgb(255, 255, 255) 100%
  );
`;
