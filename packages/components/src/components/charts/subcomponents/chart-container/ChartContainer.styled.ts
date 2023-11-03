import styled, { css } from 'styled-components';
import { ChartContainerProps } from './ChartContainer.types';

export const StyledContainer = styled.div<ChartContainerProps>`
  width: 100%;
  height: inherit;
  border-width: 0;
  transition: 1s all;
  ${({ fill }) =>
    fill &&
    css`
      background-color: ${fill};
    `};
  ${({ stroke }) =>
    stroke &&
    css`
      border-color: ${stroke};
      border-style: solid;
    `};
  ${({ strokeWidth }) =>
    strokeWidth &&
    css`
      border-width: ${strokeWidth}px;
    `};
`;
