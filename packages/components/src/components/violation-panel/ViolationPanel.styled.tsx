import styled from 'styled-components';
import { getSeverityColorObject } from '../../utils/getSeverityColorObject';
import { SeverityBarProps } from './ViolationPanel.types';

export const SeverityBar = styled.div<SeverityBarProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-image: ${({ theme, priority }) =>
      getSeverityColorObject(priority, theme.colors.transparent).gradient};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  grid-gap: 8px;
  margin-top: 24px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TableWrapper = styled.div`
  margin-top: 24px;
`;
