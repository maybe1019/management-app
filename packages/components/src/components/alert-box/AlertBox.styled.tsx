import styled from 'styled-components';
import { AlertBoxProps } from './AlertBox.types';

export const AlertBoxContainer = styled.div<{
  margin?: AlertBoxProps['margin'];
}>`
  display: flex;
  gap: 16px;
  margin: ${({ margin }) => margin};
  padding: 24px;
  width: 100%;
  border-radius: 8px;
  .alert-box {
    &__icon {
      flex-shrink: 0;
    }
  }
  &.error {
    background-color: ${({ theme }) => theme.colors['light-red']};
  }
  &.warning {
    background-color: ${({ theme }) => theme.colors['light-orange']};
  }
  &.info {
    background-color: ${({ theme }) => theme.colors['light-blue']};
  }
  &.success {
    background-color: ${({ theme }) => theme.colors['light-green']};
  }
  background-color: ${({ theme }) => theme.colors['light-gray']};
`;

export const AlertBoxTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
