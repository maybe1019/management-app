import styled from 'styled-components';
import { ValueDisplayContainerProps } from './ValueDisplay.types';

export const ValueDisplayContainer = styled.div<ValueDisplayContainerProps>`
  box-sizing: border-box;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
  width: 152px;
  padding: 12px 10px 12px 20px;
  border-radius: 24px 0px 0px 24px;
`;
