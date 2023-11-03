import styled from 'styled-components';
import { ProgressComponentProps } from './ProgressBar.types';

export const ProgressContentContainer = styled.div`
  min-width: 180px;
  width: auto;
  margin-left: 16px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
  .ProgressContent_TextContainer {
    display: flex;
    justify-content: space-between;
    height: 22px;
  }
`;

// Prevents overflow for linters sake
// eslint-disable-next-line
export const ProgressBarContainer = styled.div<Pick<ProgressComponentProps, 'barBackground'>>`
  width: 100%;
  height: 8px;
  background: ${({ theme, barBackground }) =>
    theme.colors[barBackground || 'medium-gray']};
  border-radius: 8px;
  display: flex;
  align-items: left;
  justify-content: left;
  overflow: hidden;
`;

export const ProgressBar = styled.div<ProgressComponentProps>`
  width: ${({ percent }) => percent};
  border-radius: 8px;
  background: ${({ progressBackground, theme }) =>
    theme.colors[progressBackground || 'blue']};
  background-position: bottom center;
  background-size: cover;
`;
