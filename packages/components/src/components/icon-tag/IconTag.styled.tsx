import styled from 'styled-components';
import { IconTagCSS } from './IconTag.types';

export const IconTagContainer = styled.div<IconTagCSS>`
  height: ${({ height }) => height || '32px'};
  padding: ${({ padding }) => padding || '8px 0px 8px 8px'};
  margin: ${({ margin }) => margin || '0px'};
  display: flex;
  align-items: center;
  gap: 8px;
`;
