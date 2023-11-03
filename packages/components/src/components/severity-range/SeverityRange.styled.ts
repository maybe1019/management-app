import styled from 'styled-components';
import { getSeverityColorObject } from '../../utils/getSeverityColorObject';
import { SeverityBoxProps } from './SeverityRange.types';

export const SeverityContainer = styled.div`
  display: flex;
  flex-direction: column;
  & .SeverityRange__label {
    margin-bottom: 10px;
  }
`;

export const SeverityBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const SeverityInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  &.selected {
    & .SeverityRange__Radio {
      border-width: 6px;
    }
  }
  &.selected {
    &.dark {
      & p {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const SeverityRadio = styled.div<SeverityBoxProps>`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-bottom: 4px;
  box-sizing: border-box;
  cursor: pointer;
  border: ${({ index }) => {
    const colors = getSeverityColorObject(index);
    return `2px solid ${colors.main}`;
  }};
  & .selected {
    border-width: 6px;
  }
`;
