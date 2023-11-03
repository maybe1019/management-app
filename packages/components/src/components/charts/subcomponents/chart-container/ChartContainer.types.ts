import { CSSProperties } from 'styled-components';

export interface ChartContainerProps {
  fill?: CSSProperties['backgroundColor'];
  stroke?: CSSProperties['borderColor'];
  strokeWidth?: CSSProperties['borderWidth'];
}
