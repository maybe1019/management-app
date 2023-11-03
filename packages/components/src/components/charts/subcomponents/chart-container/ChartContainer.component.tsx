import React from 'react';
import { ChartContainerProps } from './ChartContainer.types';
import { StyledContainer } from './ChartContainer.styled';

export const ChartContainer: React.FC<ChartContainerProps> = props => (
  <StyledContainer {...props}>{props.children}</StyledContainer>
);
